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

  // Middleware para autenticação (suporta tanto Bearer token quanto sessão)
  const authenticateToken = async (req: any, res: any, next: any) => {
    try {
      let user = null;
      
      // Primeiro, tenta autenticação por Bearer token
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
        user = await storage.getUser(decoded.userId);
      }
      
      // Se não tem Bearer token, tenta autenticação por sessão
      if (!user && req.session?.userId) {
        user = await storage.getUser(req.session.userId);
      }
      
      if (!user) {
        return res.status(401).json({ error: "Token não fornecido ou usuário não encontrado" });
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

  // Create admin user endpoint (public for initial setup)
  app.post("/api/setup/admin", async (req, res) => {
    try {
      const adminEmail = "admin@templodoabismo.com";
      
      // Check if admin already exists
      const existingAdmin = await storage.getUserByEmail(adminEmail);
      if (existingAdmin) {
        return res.json({ 
          success: true, 
          message: "Usuário admin já existe",
          user: { id: existingAdmin.id, email: existingAdmin.email, isAdmin: existingAdmin.isAdmin }
        });
      }

      // Create admin user
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const adminUser = await storage.createUser({
        username: "admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        isAdmin: true
      });

      res.json({ 
        success: true, 
        message: "Usuário administrativo criado com sucesso",
        user: { id: adminUser.id, email: adminUser.email, isAdmin: adminUser.isAdmin },
        credentials: { email: adminEmail, password: "admin123" }
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
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

  // AI Grimoire Generation
  app.post("/api/admin/ai/generate-grimoire", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const { title, summary, category, difficultyLevel, chapterCount, style } = req.body;

      // Generate grimoire with OpenAI
      const openaiKey = process.env.OPENAI_API_KEY;
      if (!openaiKey) {
        return res.status(500).json({ error: "Chave da API OpenAI não configurada" });
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
          messages: [
            {
              role: "system",
              content: `Você é um especialista em ocultismo e filosofia luciferiana. Crie um grimório completo em português brasileiro com base nas especificações fornecidas. 

              Estruture o grimório com:
              1. Título e descrição detalhada
              2. ${chapterCount} capítulos com conteúdo substancial
              3. Cada capítulo deve ter pelo menos 1500 palavras
              4. Conteúdo formatado em HTML com <p>, <h3>, <h4>, <blockquote> e <ul>
              5. Estilo de escrita: ${style}
              6. Nível de dificuldade: ${difficultyLevel}
              
              Responda APENAS com um JSON válido no formato:
              {
                "title": "título do grimório",
                "description": "descrição detalhada",
                "category": "${category}",
                "difficultyLevel": ${difficultyLevel},
                "chapters": [
                  {
                    "title": "título do capítulo",
                    "content": "conteúdo HTML completo",
                    "chapterOrder": número,
                    "estimatedReadingTime": minutos
                  }
                ]
              }`
            },
            {
              role: "user",
              content: `Crie um grimório sobre: "${title}"
              
              Resumo do que deve conter: ${summary}
              
              Categoria: ${category}
              Nível de dificuldade: ${difficultyLevel}
              Número de capítulos: ${chapterCount}
              Estilo de escrita: ${style}
              
              O grimório deve ser educativo, profundo e apropriado para estudantes de ocultismo.`
            }
          ],
          response_format: { type: "json_object" },
          max_tokens: 4000,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro da API OpenAI: ${response.status} ${errorText}`);
      }

      const aiResult = await response.json();
      const grimoireData = JSON.parse(aiResult.choices[0].message.content);

      // Add generated grimoire to the system
      const newGrimoireId = Date.now();
      const newGrimoire = {
        id: newGrimoireId,
        title: grimoireData.title,
        description: grimoireData.description,
        category: grimoireData.category,
        difficultyLevel: grimoireData.difficultyLevel,
        coverImageUrl: `https://via.placeholder.com/300x400?text=${encodeURIComponent(grimoireData.title)}`,
        createdAt: new Date()
      };

      // Add chapters
      grimoireData.chapters.forEach((chapter: any, index: number) => {
        const chapterId = newGrimoireId * 100 + index + 1;
        grimoireStore.addChapter({
          id: chapterId,
          grimoireId: newGrimoireId,
          title: chapter.title,
          content: chapter.content,
          chapterOrder: chapter.chapterOrder || index + 1,
          estimatedReadingTime: chapter.estimatedReadingTime || 15,
          unlockCriteria: index === 0 ? "always" : "previous_chapter",
          createdAt: new Date()
        });
      });

      res.json({
        success: true,
        grimoire: newGrimoire,
        chapterCount: grimoireData.chapters.length,
        message: "Grimório gerado com sucesso pela IA"
      });
    } catch (error) {
      console.error("Erro ao gerar grimório:", error);
      res.status(500).json({ 
        error: "Falha ao gerar grimório",
        details: error instanceof Error ? error.message : "Erro desconhecido"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
