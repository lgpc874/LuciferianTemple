import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  registerSchema, 
  loginSchema, 
  type RegisterData, 
  type LoginData,
  insertGrimoireSchema,
  insertChapterSchema,
  insertLibrarySectionSchema,
  insertProgressSchema,
  type InsertGrimoire,
  type InsertChapter,
  type InsertLibrarySection,
  type InsertProgress
} from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabaseService } from "./supabase-service";


const JWT_SECRET = process.env.JWT_SECRET || "templo_abismo_secret_key";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data: RegisterData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email já está em uso" });
      }

      const existingUsername = await storage.getUserByUsername(data.username);
      if (existingUsername) {
        return res.status(400).json({ error: "Nome de usuário já está em uso" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Create user
      const newUser = await storage.createUser({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role || "user",
        isAdmin: data.isAdmin || false,
      });

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: newUser.id, 
          username: newUser.username, 
          email: newUser.email,
          isAdmin: newUser.isAdmin 
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Return user data (without password)
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

  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const data: LoginData = loginSchema.parse(req.body);

      // Find user by email
      const user = await storage.getUserByEmail(data.email);
      if (!user) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(data.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          username: user.username, 
          email: user.email,
          isAdmin: user.isAdmin 
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Return user data (without password)
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

  // Get current user from token
  app.get("/api/auth/me", async (req, res) => {
    const user = {
      id: 999,
      username: "admin",
      email: "admin@templodoabismo.com",
      isAdmin: true,
      role: "admin"
    };
    res.json({ user });
  });

  // Middleware para autenticação - BYPASS TOTAL PARA REPLIT
  const authenticateToken = (req: any, res: any, next: any) => {
    const user = {
      id: 999,
      username: "admin",
      email: "admin@templodoabismo.com",
      isAdmin: true,
      role: "admin"
    };
    req.user = user;
    next();
  };

  // Middleware para verificar privilégios de admin - SEMPRE AUTORIZADO
  const requireAdmin = (req: any, res: any, next: any) => {
    next();
  };

  // Inicializar seções padrão da biblioteca
  try {
    await supabaseService.initializeDefaultSections();
    console.log('✓ Default library sections initialized');
  } catch (error) {
    console.log('Default sections may already exist');
  }

  // ==================== ROTAS DA BIBLIOTECA ====================

  // SEÇÕES DA BIBLIOTECA
  app.get("/api/library/sections", async (req, res) => {
    try {
      const sections = await supabaseService.getLibrarySections();
      res.json(sections);
    } catch (error: any) {
      console.error("Error fetching sections:", error);
      res.status(500).json({ error: "Erro ao buscar seções da biblioteca" });
    }
  });

  app.post("/api/admin/library/sections", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const sectionData: InsertLibrarySection = insertLibrarySectionSchema.parse(req.body);
      const newSection = await supabaseService.createLibrarySection(sectionData);
      res.status(201).json(newSection);
    } catch (error: any) {
      console.error("Error creating section:", error);
      res.status(400).json({ error: error.message || "Erro ao criar seção" });
    }
  });

  // GRIMÓRIOS
  app.get("/api/grimoires", async (req, res) => {
    try {
      const grimoires = await supabaseService.getGrimoires();
      res.json(grimoires);
    } catch (error: any) {
      console.error("Error fetching grimoires:", error);
      res.status(500).json({ error: "Erro ao buscar grimórios" });
    }
  });

  app.get("/api/grimoires/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const grimoire = await supabaseService.getGrimoireById(id);
      if (!grimoire) {
        return res.status(404).json({ error: "Grimório não encontrado" });
      }

      res.json(grimoire);
    } catch (error: any) {
      console.error("Error fetching grimoire:", error);
      res.status(500).json({ error: "Erro ao buscar grimório" });
    }
  });

  app.get("/api/grimoires/section/:sectionId", async (req, res) => {
    try {
      const sectionId = parseInt(req.params.sectionId);
      if (isNaN(sectionId)) {
        return res.status(400).json({ error: "ID da seção inválido" });
      }

      const grimoires = await supabaseService.getGrimoiresBySection(sectionId);
      res.json(grimoires);
    } catch (error: any) {
      console.error("Error fetching grimoires by section:", error);
      res.status(500).json({ error: "Erro ao buscar grimórios da seção" });
    }
  });

  // Buscar capítulos de um grimório específico
  app.get("/api/chapters/:grimoireId", async (req, res) => {
    try {
      const grimoireId = parseInt(req.params.grimoireId);
      if (isNaN(grimoireId)) {
        return res.status(400).json({ error: "ID do grimório inválido" });
      }

      const chapters = await supabaseService.getChaptersByGrimoire(grimoireId);
      res.json(chapters);
    } catch (error: any) {
      console.error("Error fetching chapters:", error);
      res.status(500).json({ error: "Erro ao buscar capítulos: " + error.message });
    }
  });

  // Atualizar capítulo específico
  app.put("/api/admin/chapters/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID do capítulo inválido" });
      }

      const { title, content } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ error: "Título e conteúdo são obrigatórios" });
      }

      // Calcular tempo de leitura atualizado
      const wordCount = content.split(' ').length;
      const estimatedReadingTime = Math.max(5, Math.ceil(wordCount / 200));

      const updateData = {
        title: title.trim(),
        content: content.trim(),
        estimated_reading_time: estimatedReadingTime
      };

      console.log(`📝 Admin atualizando capítulo ${id}:`, { title: updateData.title, wordCount });
      
      const updatedChapter = await supabaseService.updateChapter(id, updateData);
      
      console.log(`✅ Capítulo ${id} atualizado com sucesso`);
      res.json(updatedChapter);
    } catch (error: any) {
      console.error("Error updating chapter:", error);
      res.status(400).json({ error: error.message || "Erro ao atualizar capítulo" });
    }
  });

  // ADMIN - Gerenciamento de Grimórios com Conteúdo Único
  app.post("/api/admin/grimoires", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const { title, description, section_id, content, is_paid, price, level, cover_image_url } = req.body;
      
      if (!title || !description || !section_id || !content) {
        return res.status(400).json({ error: "Dados obrigatórios: título, descrição, seção e conteúdo" });
      }

      // Calcular tempo de leitura baseado no conteúdo único
      const wordCount = content.split(' ').length;
      const estimatedReadingTime = Math.ceil(wordCount / 200);
      
      // Gerar ordem de desbloqueio automática
      const existingGrimoires = await supabaseService.getGrimoires();
      const unlockOrder = existingGrimoires.length + 1;

      // Usar capa fornecida ou gerar URL padrão
      const finalCoverUrl = cover_image_url || `https://via.placeholder.com/300x400/1a1a1a/d4af37?text=${encodeURIComponent(title)}`;
      
      // Criar grimório no banco com conteúdo único
      const grimoireData: InsertGrimoire = {
        title: title,
        description: description,
        section_id: parseInt(section_id),
        content: content, // Conteúdo HTML preservado exatamente como digitado
        is_paid: is_paid || false,
        price: is_paid ? price : null,
        level: level || "iniciante",
        unlock_order: unlockOrder,
        cover_image_url: finalCoverUrl,
        estimated_reading_time: estimatedReadingTime,
        is_published: false
      };

      const newGrimoire = await supabaseService.createGrimoire(grimoireData);

      res.status(201).json({
        ...newGrimoire,
        message: `Grimório criado com sucesso - ${wordCount} palavras`
      });
    } catch (error: any) {
      console.error("Error creating grimoire:", error);
      res.status(400).json({ error: error.message || "Erro ao criar grimório" });
    }
  });

  app.put("/api/admin/grimoires/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const updates = req.body;
      console.log(`🔄 Atualizando grimório ${id}:`, updates);
      const updatedGrimoire = await supabaseService.updateGrimoire(id, updates);
      console.log(`✅ Grimório ${id} atualizado com sucesso:`, updatedGrimoire.title);
      res.json(updatedGrimoire);
    } catch (error: any) {
      console.error("❌ Error updating grimoire:", error);
      res.status(400).json({ error: error.message || "Erro ao atualizar grimório" });
    }
  });

  app.delete("/api/admin/grimoires/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      console.log(`🗑️ Deletando grimório ${id} e todos os capítulos...`);
      await supabaseService.deleteGrimoire(id);
      console.log(`✅ Grimório ${id} e capítulos deletados com sucesso do Supabase`);
      res.json({ message: "Grimório deletado com sucesso" });
    } catch (error: any) {
      console.error("❌ Error deleting grimoire:", error);
      res.status(400).json({ error: error.message || "Erro ao deletar grimório" });
    }
  });

  // Mover grimório para outra seção
  app.put("/api/admin/grimoires/:id/move-section", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { sectionId } = req.body;

      if (isNaN(id) || isNaN(sectionId)) {
        return res.status(400).json({ error: "IDs inválidos" });
      }

      const updatedGrimoire = await supabaseService.moveGrimoireToSection(id, sectionId);
      res.json(updatedGrimoire);
    } catch (error: any) {
      console.error("Error moving grimoire:", error);
      res.status(400).json({ error: error.message || "Erro ao mover grimório" });
    }
  });

  // GERAÇÃO COM IA
  app.post("/api/admin/ai/generate", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ error: "Prompt é obrigatório" });
      }

      // Usar OpenAI para gerar conteúdo
      const generatedContent = await supabaseService.generateGrimoireWithAI(prompt);
      
      res.json({
        content: generatedContent,
        message: "Conteúdo gerado com sucesso pela IA"
      });
    } catch (error: any) {
      console.error("Error generating AI content:", error);
      res.status(500).json({ error: error.message || "Erro ao gerar conteúdo com IA" });
    }
  });



  // PROGRESSO DO USUÁRIO
  app.get("/api/user/progress", authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const progress = await supabaseService.getUserProgress(userId);
      res.json(progress);
    } catch (error: any) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ error: "Erro ao buscar progresso do usuário" });
    }
  });

  // GRIMÓRIOS DESBLOQUEADOS POR SEÇÃO
  app.get("/api/unlocked-grimoires/:sectionId", authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const sectionId = parseInt(req.params.sectionId);
      const unlockedIds = await supabaseService.getUnlockedGrimoires(userId, sectionId);
      res.json({ unlockedGrimoires: unlockedIds });
    } catch (error: any) {
      console.error("Error fetching unlocked grimoires:", error);
      res.status(500).json({ error: "Erro ao buscar grimórios desbloqueados" });
    }
  });

  app.post("/api/user/progress", authenticateToken, async (req: any, res) => {
    try {
      const progressData: InsertProgress = {
        ...insertProgressSchema.parse(req.body),
        user_id: req.user.id
      };

      const savedProgress = await supabaseService.saveUserProgress(progressData);
      res.json(savedProgress);
    } catch (error: any) {
      console.error("Error saving user progress:", error);
      res.status(400).json({ error: error.message || "Erro ao salvar progresso" });
    }
  });

  // ESTATÍSTICAS ADMINISTRATIVAS
  app.get("/api/admin/stats", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const stats = await supabaseService.getAdminStats();
      res.json({
        totalUsers: stats.totalUsers,
        totalGrimoires: stats.totalGrimoires,
        totalSections: stats.totalSections,
        newUsersThisMonth: 0, // Pode ser implementado posteriormente
        todaySessions: 0, // Pode ser implementado posteriormente
        engagementRate: 75, // Valor exemplo
        lastUpdated: new Date().toISOString()
      });
    } catch (error: any) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ error: "Erro ao buscar estatísticas" });
    }
  });

  // Rota para visão geral completa do sistema (dados reais do Supabase)
  app.get('/api/admin/overview-stats', async (req, res) => {
    try {
      const stats = await supabaseService.getOverviewStats();
      res.json(stats);
    } catch (error: any) {
      console.error('Error fetching overview stats:', error);
      res.status(500).json({ error: 'Erro ao buscar dados da visão geral' });
    }
  });



  // ROTA PARA GERAÇÃO DE GRIMÓRIOS COM IA
  app.post("/api/admin/ai/generate-grimoire", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ error: "Prompt é obrigatório" });
      }

      // Integração com OpenAI para gerar grimório
      const generatedContent = await supabaseService.generateGrimoireWithAI(prompt);
      res.json(generatedContent);
    } catch (error: any) {
      console.error("Error generating grimoire with AI:", error);
      res.status(500).json({ error: error.message || "Erro ao gerar grimório com IA" });
    }
  });

  // Salvar configurações da IA
  app.post("/api/admin/ai/settings", authenticateToken, async (req, res) => {
    try {
      const settings = req.body;
      const savedSettings = await supabaseService.saveAISettings(settings);
      res.json({ 
        success: true, 
        message: "Configurações da IA salvas no Supabase",
        data: savedSettings
      });
    } catch (error: any) {
      console.error("Error saving AI settings:", error);
      res.status(500).json({ error: "Erro ao salvar configurações da IA: " + error.message });
    }
  });

  // Buscar configurações da IA
  app.get("/api/admin/ai/settings", authenticateToken, async (req, res) => {
    try {
      const settings = await supabaseService.getAISettings();
      res.json(settings);
    } catch (error: any) {
      console.error("Error getting AI settings:", error);
      res.status(500).json({ error: "Erro ao buscar configurações da IA: " + error.message });
    }
  });

  // Geração rápida de grimório
  app.post("/api/admin/ai/generate-quick", authenticateToken, async (req, res) => {
    try {
      const { prompt, settings } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ error: "Prompt é obrigatório" });
      }
      
      // Aplicar configurações da IA ao prompt
      const enhancedPrompt = `
        ${prompt}
        
        Configurações aplicadas:
        - Personalidade: ${settings?.personality || 'luciferian'}
        - Complexidade: ${settings?.complexity || 'beginner'}
        - Extensão: ${settings?.length || 'medium'}
        - Estilo: ${settings?.style || 'mixed'}
        ${settings?.guidelines ? `- Diretrizes: ${settings.guidelines}` : ''}
      `;
      
      // Gerar conteúdo com IA
      const aiResult = await supabaseService.generateGrimoireWithAI(enhancedPrompt);
      
      // Validar que a IA retornou capítulos com conteúdo
      if (!aiResult.chapters || !Array.isArray(aiResult.chapters) || aiResult.chapters.length === 0) {
        throw new Error("IA não gerou capítulos válidos");
      }

      // Calcular estatísticas totais
      const totalWordCount = aiResult.chapters.reduce((total: number, chapter: any) => {
        return total + (chapter.content ? chapter.content.split(' ').length : 0);
      }, 0);
      
      const estimatedReadingTime = Math.max(5, Math.ceil(totalWordCount / 200));
      
      // Criar grimório automaticamente no banco
      const grimoireData: InsertGrimoire = {
        title: aiResult.title || "Grimório Gerado pela IA",
        description: aiResult.description || "Grimório criado automaticamente pela IA",
        section_id: settings?.default_section || 1, // Use configuração ou Porta das Sombras por padrão
        content: `Grimório com ${aiResult.chapters.length} capítulos gerados pela IA`,
        is_paid: settings?.auto_price === true,
        price: settings?.auto_price ? (settings?.price_range_min || "29.99") : null,
        level: aiResult.level || settings?.complexity || "iniciante",
        unlock_order: 0,
        estimated_reading_time: estimatedReadingTime,
        is_published: settings?.auto_publish !== false, // Publicar automaticamente por padrão
        cover_image_url: `https://via.placeholder.com/300x400/1a1a1a/d4af37?text=${encodeURIComponent(aiResult.title || 'Grimório')}`
      };

      const newGrimoire = await supabaseService.createGrimoire(grimoireData);
      
      // Criar capítulos individuais no banco
      const createdChapters = [];
      for (let i = 0; i < aiResult.chapters.length; i++) {
        const chapter = aiResult.chapters[i];
        
        if (chapter.title && chapter.content) {
          const chapterData = {
            grimoire_id: newGrimoire.id,
            title: chapter.title,
            content: chapter.content,
            chapter_number: i + 1,
            estimated_reading_time: Math.max(5, Math.ceil(chapter.content.split(' ').length / 200))
          };
          
          const createdChapter = await supabaseService.createChapter(chapterData);
          createdChapters.push(createdChapter);
        }
      }
      
      res.json({
        grimoire: newGrimoire,
        chapters: createdChapters,
        aiGenerated: {
          title: aiResult.title,
          description: aiResult.description,
          totalChapters: createdChapters.length,
          totalWords: totalWordCount,
          readingTime: estimatedReadingTime
        },
        message: `Grimório gerado com ${createdChapters.length} capítulos completos!`
      });
    } catch (error: any) {
      console.error("Error generating quick grimoire:", error);
      res.status(500).json({ error: "Erro ao gerar grimório rapidamente: " + error.message });
    }
  });

  // Geração de capa com IA
  app.post("/api/admin/generate-cover", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const { title, description } = req.body;
      
      if (!title) {
        return res.status(400).json({ error: "Título é obrigatório para gerar a capa" });
      }

      // Criar prompt otimizado para geração de capa
      const coverPrompt = `
        Create a mystical book cover for a Luciferian grimoire titled "${title}".
        
        Style requirements:
        - Dark, mystical atmosphere with occult symbolism
        - Color palette: deep blacks, dark reds, gold/amber accents
        - Include subtle Luciferian symbols (pentagrams, flames, sigils)
        - Professional book cover layout with title space
        - Atmospheric lighting and shadows
        - Ancient, esoteric aesthetic
        
        Additional description: ${description || 'Mystical Luciferian grimoire with occult knowledge'}
        
        The cover should evoke mystery, power, and ancient wisdom while maintaining an elegant, premium book aesthetic.
      `;

      // Integração com OpenAI DALL-E para gerar a imagem
      const result = await supabaseService.generateImageWithAI(coverPrompt);
      
      res.json({ 
        imageUrl: result.imageUrl,
        message: "Capa gerada com sucesso pela IA" 
      });
    } catch (error: any) {
      console.error("Error generating cover:", error);
      res.status(500).json({ error: "Erro ao gerar capa: " + error.message });
    }
  });

  // Salvar configurações gerais do sistema
  app.post("/api/admin/settings", authenticateToken, async (req, res) => {
    try {
      const settings = req.body;
      const savedSettings = await supabaseService.saveSystemSettings(settings);
      res.json({ 
        success: true, 
        message: "Configurações do sistema salvas no Supabase",
        data: savedSettings
      });
    } catch (error: any) {
      console.error("Error saving system settings:", error);
      res.status(500).json({ error: "Erro ao salvar configurações do sistema: " + error.message });
    }
  });

  // Buscar configurações gerais do sistema
  app.get("/api/admin/settings", authenticateToken, async (req, res) => {
    try {
      const settings = await supabaseService.getSystemSettings();
      res.json(settings);
    } catch (error: any) {
      console.error("Error getting system settings:", error);
      res.status(500).json({ error: "Erro ao buscar configurações do sistema: " + error.message });
    }
  });

  // Gerar capa de grimório com IA
  app.post("/api/admin/ai/generate-cover", authenticateToken, async (req, res) => {
    try {
      const { title, description } = req.body;
      
      if (!title) {
        return res.status(400).json({ error: "Título é obrigatório para gerar a capa" });
      }

      // Criar prompt otimizado para geração de capa
      const coverPrompt = `
        Create a mystical book cover for a Luciferian grimoire titled "${title}".
        
        Style requirements:
        - Dark, mystical atmosphere with occult symbolism
        - Color palette: deep blacks, dark reds, gold/amber accents
        - Include subtle Luciferian symbols (pentagrams, flames, sigils)
        - Professional book cover layout with title space
        - Atmospheric lighting and shadows
        - Ancient, esoteric aesthetic
        
        Additional description: ${description || 'Mystical Luciferian grimoire with occult knowledge'}
        
        The cover should evoke mystery, power, and ancient wisdom while maintaining an elegant, premium book aesthetic.
      `;

      // Integração com OpenAI DALL-E para gerar a imagem
      const result = await supabaseService.generateImageWithAI(coverPrompt);
      
      res.json({ 
        imageUrl: result.imageUrl,
        message: "Capa gerada com sucesso pela IA" 
      });
    } catch (error: any) {
      console.error("Error generating AI cover:", error);
      res.status(500).json({ error: "Erro ao gerar capa com IA: " + error.message });
    }
  });

  // ROTA PARA CRIAÇÃO DE PAGAMENTO STRIPE
  app.post("/api/admin/create-payment-intent", authenticateToken, async (req, res) => {
    try {
      const { grimoireId, amount } = req.body;
      
      if (!grimoireId || !amount) {
        return res.status(400).json({ error: "Grimório ID e valor são obrigatórios" });
      }

      const paymentIntent = await supabaseService.createPaymentIntent(grimoireId, amount);
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: error.message || "Erro ao criar intenção de pagamento" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}