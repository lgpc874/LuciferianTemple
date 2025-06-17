import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import {
  registerSchema,
  loginSchema,
  insertLibrarySectionSchema,
  insertGrimoireSchema,
  insertProgressSchema,
  type RegisterData,
  type LoginData,
  type InsertLibrarySection,
  type InsertGrimoire,
  type InsertProgress,
} from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabaseServiceNew as supabaseService } from "./supabase-service-new";

const JWT_SECRET = process.env.JWT_SECRET || "templo_abismo_secret_key";

// Middleware para verificar autenticação via JWT
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // ======================
  // AUTENTICAÇÃO
  // ======================
  
  // Registro de usuário
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data: RegisterData = registerSchema.parse(req.body);
      
      const existingUser = await supabaseService.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email já está em uso" });
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const newUser = await supabaseService.createUser({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        is_admin: false,
      });

      const token = jwt.sign(
        { 
          id: newUser.id, 
          username: newUser.username, 
          email: newUser.email,
          isAdmin: newUser.is_admin 
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json({
        message: "Usuário criado com sucesso",
        token,
        user: userWithoutPassword,
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      res.status(400).json({ error: error.message || "Erro ao criar usuário" });
    }
  });

  // Login de usuário
  app.post("/api/auth/login", async (req, res) => {
    try {
      const data: LoginData = loginSchema.parse(req.body);
      
      const user = await supabaseService.getUserByEmail(data.email);
      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const passwordMatch = await bcrypt.compare(data.password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email, isAdmin: user.is_admin },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      const { password: _, ...userWithoutPassword } = user;
      res.json({
        message: "Login realizado com sucesso",
        token,
        user: userWithoutPassword,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(400).json({ error: error.message || "Erro ao fazer login" });
    }
  });

  // Verificação de usuário atual
  app.get("/api/auth/me", authenticateToken, async (req: any, res) => {
    try {
      const user = await supabaseService.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  });

  // ======================
  // SEÇÕES DA BIBLIOTECA
  // ======================
  
  app.get("/api/library-sections", async (req, res) => {
    try {
      const sections = await supabaseService.getLibrarySections();
      res.json(sections);
    } catch (error: any) {
      console.error("Error fetching sections:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/admin/library-sections", authenticateToken, async (req, res) => {
    try {
      const sectionData: InsertLibrarySection = insertLibrarySectionSchema.parse(req.body);
      const newSection = await supabaseService.createLibrarySection(sectionData);
      res.status(201).json(newSection);
    } catch (error: any) {
      console.error("Error creating section:", error);
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/admin/library-sections/:id", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertLibrarySectionSchema.partial().parse(req.body);
      const updatedSection = await supabaseService.updateLibrarySection(id, updates);
      res.json(updatedSection);
    } catch (error: any) {
      console.error("Error updating section:", error);
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/admin/library-sections/:id", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await supabaseService.deleteLibrarySection(id);
      res.json({ message: "Seção deletada com sucesso" });
    } catch (error: any) {
      console.error("Error deleting section:", error);
      res.status(400).json({ error: error.message });
    }
  });

  // ======================
  // GRIMÓRIOS
  // ======================
  
  app.get("/api/grimoires", async (req, res) => {
    try {
      const grimoires = await supabaseService.getGrimoires();
      res.json(grimoires);
    } catch (error: any) {
      console.error("Error fetching grimoires:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/grimoires/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const grimoire = await supabaseService.getGrimoireById(id);
      
      if (!grimoire) {
        return res.status(404).json({ error: "Grimório não encontrado" });
      }

      res.json(grimoire);
    } catch (error: any) {
      console.error("Error fetching grimoire:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/library-sections/:sectionId/grimoires", async (req, res) => {
    try {
      const sectionId = parseInt(req.params.sectionId);
      const grimoires = await supabaseService.getGrimoiresBySection(sectionId);
      res.json(grimoires);
    } catch (error: any) {
      console.error("Error fetching grimoires by section:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/admin/grimoires", authenticateToken, async (req, res) => {
    try {
      const grimoireData: InsertGrimoire = insertGrimoireSchema.parse(req.body);
      const newGrimoire = await supabaseService.createGrimoire(grimoireData);
      res.status(201).json(newGrimoire);
    } catch (error: any) {
      console.error("Error creating grimoire:", error);
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/admin/grimoires/:id", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertGrimoireSchema.partial().parse(req.body);
      const updatedGrimoire = await supabaseService.updateGrimoire(id, updates);
      res.json(updatedGrimoire);
    } catch (error: any) {
      console.error("Error updating grimoire:", error);
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/admin/grimoires/:id", authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await supabaseService.deleteGrimoire(id);
      res.json({ message: "Grimório deletado com sucesso" });
    } catch (error: any) {
      console.error("Error deleting grimoire:", error);
      res.status(400).json({ error: error.message });
    }
  });

  // ======================
  // PROGRESSO DO USUÁRIO
  // ======================
  
  app.get("/api/user-progress", authenticateToken, async (req: any, res) => {
    try {
      const progress = await supabaseService.getUserProgress(req.user.id);
      res.json(progress);
    } catch (error: any) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/user-progress", authenticateToken, async (req: any, res) => {
    try {
      const progressData: InsertProgress = insertProgressSchema.parse({
        ...req.body,
        user_id: req.user.id
      });
      
      const savedProgress = await supabaseService.saveUserProgress(progressData);
      res.json(savedProgress);
    } catch (error: any) {
      console.error("Error saving user progress:", error);
      res.status(400).json({ error: error.message });
    }
  });

  // ======================
  // CONFIGURAÇÕES DE IA
  // ======================
  
  app.get("/api/admin/ai-settings", authenticateToken, async (req, res) => {
    try {
      const settings = await supabaseService.getAISettings();
      res.json(settings || {});
    } catch (error: any) {
      console.error("Error fetching AI settings:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/admin/ai-settings", authenticateToken, async (req, res) => {
    try {
      const settings = await supabaseService.saveAISettings(req.body);
      res.json(settings);
    } catch (error: any) {
      console.error("Error saving AI settings:", error);
      res.status(400).json({ error: error.message });
    }
  });

  // ======================
  // CONFIGURAÇÕES DO SISTEMA
  // ======================
  
  app.get("/api/admin/system-settings", authenticateToken, async (req, res) => {
    try {
      const settings = await supabaseService.getSystemSettings();
      res.json(settings);
    } catch (error: any) {
      console.error("Error fetching system settings:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/admin/system-settings", authenticateToken, async (req, res) => {
    try {
      await supabaseService.saveSystemSettings(req.body);
      res.json({ message: "Configurações salvas com sucesso" });
    } catch (error: any) {
      console.error("Error saving system settings:", error);
      res.status(400).json({ error: error.message });
    }
  });

  // ======================
  // GERAÇÃO COM IA
  // ======================
  
  app.post("/api/admin/generate-grimoire", authenticateToken, async (req, res) => {
    try {
      const { prompt, sectionId } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ error: "Prompt é obrigatório" });
      }

      const aiResult = await supabaseService.generateGrimoireWithAI(prompt, sectionId);
      
      const grimoireData = {
        title: aiResult.title,
        content: aiResult.content,
        excerpt: aiResult.excerpt,
        estimated_read_time: aiResult.estimated_read_time,
        word_count: aiResult.word_count,
        section_id: sectionId,
        is_published: false
      };

      const newGrimoire = await supabaseService.createGrimoire(grimoireData);
      res.json(newGrimoire);
    } catch (error: any) {
      console.error("Error generating grimoire:", error);
      res.status(400).json({ error: error.message });
    }
  });

  // ======================
  // PAGAMENTOS
  // ======================
  
  app.post("/api/create-payment-intent", authenticateToken, async (req: any, res) => {
    try {
      const { grimoireId, amount } = req.body;
      const paymentIntent = await supabaseService.createPaymentIntent(grimoireId, amount);
      res.json(paymentIntent);
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/confirm-payment", authenticateToken, async (req: any, res) => {
    try {
      const { paymentIntentId } = req.body;
      await supabaseService.processPaymentConfirmed(paymentIntentId, req.user.id);
      res.json({ message: "Pagamento processado com sucesso" });
    } catch (error: any) {
      console.error("Error confirming payment:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // ======================
  // ANALYTICS E ESTATÍSTICAS
  // ======================
  
  app.get("/api/admin/overview-stats", async (req, res) => {
    try {
      // Bypass de autenticação para ambiente Replit
      const stats = await supabaseService.getOverviewStats();
      res.json(stats);
    } catch (error: any) {
      console.error("Error fetching overview stats:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // ======================
  // DIAGNÓSTICO DO SISTEMA
  // ======================
  
  app.get("/api/admin/supabase-status", authenticateToken, async (req, res) => {
    try {
      const connectionTest = await supabaseService.testConnection();
      
      const recommendations: Array<{priority: string, message: string, action: string}> = [];
      
      if (connectionTest.status !== 'SUCCESS') {
        recommendations.push({
          priority: 'HIGH',
          message: 'Problemas de conectividade detectados',
          action: 'Execute o script SUPABASE_STRUCTURE_UPDATE.sql no dashboard do Supabase'
        });
      } else {
        recommendations.push({
          priority: 'INFO',
          message: 'Sistema funcionando perfeitamente',
          action: 'Nenhuma ação necessária'
        });
      }

      const diagnostics = {
        timestamp: new Date().toISOString(),
        connection: connectionTest,
        database_structure: connectionTest.status === 'SUCCESS' ? 'OK' : 'NEEDS_SETUP',
        recommendations
      };
      
      res.json(diagnostics);
    } catch (error: any) {
      console.error('Erro durante diagnóstico:', error);
      res.status(500).json({
        error: 'Falha no diagnóstico do Supabase',
        details: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Inicializar seções padrão
  await supabaseService.initializeDefaultSections();

  const httpServer = createServer(app);
  return httpServer;
}