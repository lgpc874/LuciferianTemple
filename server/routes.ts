import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerSchema, loginSchema, type RegisterData, type LoginData, insertProgressSchema, type InsertProgress } from "@shared/schema";
import { grimoireStore } from "./grimoire-data";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "templo_abismo_secret_key";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data: RegisterData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUserByEmail = await storage.getUserByEmail(data.email);
      if (existingUserByEmail) {
        return res.status(400).json({ error: "Email já está em uso" });
      }
      
      const existingUserByUsername = await storage.getUserByUsername(data.username);
      if (existingUserByUsername) {
        return res.status(400).json({ error: "Nome de usuário já está em uso" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);
      
      // Create user
      const user = await storage.createUser({
        username: data.username,
        email: data.email,
        password: hashedPassword
      });
      
      // Generate JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
      
      res.json({ 
        user: { id: user.id, username: user.username, email: user.email },
        token 
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ error: "Erro ao criar conta" });
    }
  });

  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const data: LoginData = loginSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(data.email);
      if (!user) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(data.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }
      
      // Generate JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
      
      res.json({ 
        user: { id: user.id, username: user.username, email: user.email },
        token 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ error: "Erro no login" });
    }
  });

  // Get current user endpoint
  app.get("/api/auth/me", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token não fornecido" });
      }
      
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
      
      const user = await storage.getUser(decoded.userId);
      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }
      
      res.json({ 
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (error) {
      console.error("Auth verification error:", error);
      res.status(401).json({ error: "Token inválido" });
    }
  });

  // Middleware para autenticação
  const authenticateToken = async (req: any, res: any, next: any) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token não fornecido" });
      }
      
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
      
      const user = await storage.getUser(decoded.userId);
      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }
      
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: "Token inválido" });
    }
  };

  // Middleware para verificar privilégios de admin
  const requireAdmin = async (req: any, res: any, next: any) => {
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }
    
    const isAdmin = req.user.email === "templo.admin@templodoabismo.com" || 
                   req.user.isAdmin === true ||
                   req.user.role === "admin";
    
    if (!isAdmin) {
      return res.status(403).json({ error: "Acesso negado - privilégios administrativos necessários" });
    }
    
    next();
  };

  // Rotas dos grimórios
  app.get("/api/grimoires", async (req, res) => {
    try {
      const grimoires = grimoireStore.getGrimoires();
      res.json(grimoires);
    } catch (error) {
      console.error("Error fetching grimoires:", error);
      res.status(500).json({ error: "Erro ao buscar grimórios" });
    }
  });

  app.get("/api/grimoires/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const grimoire = grimoireStore.getGrimoireById(id);
      
      if (!grimoire) {
        return res.status(404).json({ error: "Grimório não encontrado" });
      }
      
      res.json(grimoire);
    } catch (error) {
      console.error("Error fetching grimoire:", error);
      res.status(500).json({ error: "Erro ao buscar grimório" });
    }
  });

  app.get("/api/grimoires/:id/chapters", async (req, res) => {
    try {
      const grimoireId = parseInt(req.params.id);
      const chapters = grimoireStore.getChaptersByGrimoire(grimoireId);
      res.json(chapters);
    } catch (error) {
      console.error("Error fetching chapters:", error);
      res.status(500).json({ error: "Erro ao buscar capítulos" });
    }
  });

  // Rotas de progresso (requerem autenticação)
  app.get("/api/progress", authenticateToken, async (req: any, res) => {
    try {
      const progress = grimoireStore.getUserProgress(req.user.id);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ error: "Erro ao buscar progresso" });
    }
  });

  app.get("/api/progress/grimoire/:id", authenticateToken, async (req: any, res) => {
    try {
      const grimoireId = parseInt(req.params.id);
      const progress = grimoireStore.getUserProgressByGrimoire(req.user.id, grimoireId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching grimoire progress:", error);
      res.status(500).json({ error: "Erro ao buscar progresso do grimório" });
    }
  });

  app.post("/api/progress", authenticateToken, async (req: any, res) => {
    try {
      const progressData = insertProgressSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      const progress = grimoireStore.saveReadingProgress(progressData);
      res.json(progress);
    } catch (error) {
      console.error("Error saving progress:", error);
      res.status(400).json({ error: "Erro ao salvar progresso" });
    }
  });

  app.post("/api/progress/chapter/:id/complete", authenticateToken, async (req: any, res) => {
    try {
      const chapterId = parseInt(req.params.id);
      const readingTime = parseInt(req.body.readingTime) || 0;
      
      const progress = grimoireStore.markChapterCompleted(req.user.id, chapterId, readingTime);
      res.json(progress);
    } catch (error) {
      console.error("Error marking chapter complete:", error);
      res.status(400).json({ error: "Erro ao marcar capítulo como completo" });
    }
  });

  app.get("/api/unlocked/grimoires", authenticateToken, async (req: any, res) => {
    try {
      const unlockedIds = grimoireStore.getUnlockedGrimoires(req.user.id);
      res.json(unlockedIds);
    } catch (error) {
      console.error("Error fetching unlocked grimoires:", error);
      res.status(500).json({ error: "Erro ao buscar grimórios desbloqueados" });
    }
  });

  app.get("/api/unlocked/chapters/:grimoireId", authenticateToken, async (req: any, res) => {
    try {
      const grimoireId = parseInt(req.params.grimoireId);
      const unlockedIds = grimoireStore.getUnlockedChapters(req.user.id, grimoireId);
      res.json(unlockedIds);
    } catch (error) {
      console.error("Error fetching unlocked chapters:", error);
      res.status(500).json({ error: "Erro ao buscar capítulos desbloqueados" });
    }
  });

  // Admin routes
  app.get("/api/admin/users", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      // Return all users for admin (this would need implementation in storage)
      res.json({ message: "Admin access granted", admin: req.user.email });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  });

  app.post("/api/admin/unlock-all", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      // Admin can unlock all content for any user
      res.json({ message: "Admin pode desbloquear todo conteúdo" });
    } catch (error) {
      console.error("Error unlocking content:", error);
      res.status(500).json({ error: "Erro ao desbloquear conteúdo" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
