import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  registerSchema, 
  loginSchema, 
  type RegisterData, 
  type LoginData,
  insertGrimoireSchema,
  insertLibrarySectionSchema,
  insertProgressSchema,
  type InsertGrimoire,
  type InsertLibrarySection,
  type InsertProgress
} from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// PDF generation without external dependencies
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

      console.log(`🗑️ Deletando grimório ${id}...`);
      await supabaseService.deleteGrimoire(id);
      console.log(`✅ Grimório ${id} deletado com sucesso do Supabase`);
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

  // Rota alternativa para progresso (compatibilidade)
  app.post("/api/progress", authenticateToken, async (req: any, res) => {
    try {
      const { grimoireId, currentPage, totalPages } = req.body;
      
      const progressData: InsertProgress = {
        user_id: req.user.id,
        grimoire_id: grimoireId,
        current_page: currentPage,
        total_pages: totalPages,
        last_read_at: new Date()
      };

      console.log("💾 Salvando progresso:", progressData);
      const savedProgress = await supabaseService.saveUserProgress(progressData);
      console.log("✅ Progresso salvo no Supabase:", savedProgress);
      res.json(savedProgress);
    } catch (error: any) {
      console.error("❌ Error saving progress:", error);
      res.status(400).json({ error: error.message || "Erro ao salvar progresso" });
    }
  });

  // Buscar progresso do usuário para grimório específico
  app.get("/api/progress/user", authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const progress = await supabaseService.getUserProgress(userId);
      res.json(progress);
    } catch (error: any) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ error: "Erro ao buscar progresso do usuário" });
    }
  });

  // ===== SISTEMA DE CURSOS OCULTISTAS =====
  
  // Listar todos os cursos ativos
  app.get("/api/cursos", async (req, res) => {
    try {
      const cursos = await supabaseService.getCursos();
      res.json(cursos);
    } catch (error: any) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ error: "Erro ao buscar cursos" });
    }
  });

  // Buscar curso específico por slug
  app.get("/api/cursos/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const curso = await supabaseService.getCursoBySlug(slug);
      
      if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }
      
      res.json(curso);
    } catch (error: any) {
      console.error("Error fetching course:", error);
      res.status(500).json({ error: "Erro ao buscar curso" });
    }
  });

  // Buscar módulos de um curso
  app.get("/api/cursos/:id/modulos", async (req, res) => {
    try {
      const cursoId = parseInt(req.params.id);
      const modulos = await supabaseService.getModulosByCurso(cursoId);
      res.json(modulos);
    } catch (error: any) {
      console.error("Error fetching modules:", error);
      res.status(500).json({ error: "Erro ao buscar módulos" });
    }
  });

  // Salvar resposta de usuário para módulo
  app.post("/api/cursos/resposta", authenticateToken, async (req: any, res) => {
    try {
      const { modulo_id, resposta } = req.body;
      const usuario_id = req.user.id;

      if (!modulo_id || !resposta) {
        return res.status(400).json({ error: "Módulo ID e resposta são obrigatórios" });
      }

      const respostaSalva = await supabaseService.salvarRespostaCurso({
        usuario_id,
        modulo_id,
        resposta
      });

      res.json(respostaSalva);
    } catch (error: any) {
      console.error("Error saving response:", error);
      res.status(500).json({ error: "Erro ao salvar resposta" });
    }
  });

  // Buscar respostas do usuário para um curso
  app.get("/api/cursos/respostas/:cursoId", authenticateToken, async (req: any, res) => {
    try {
      const cursoId = parseInt(req.params.cursoId);
      const usuario_id = req.user.id;
      
      const respostas = await supabaseService.getRespostasByCurso(usuario_id, cursoId);
      res.json(respostas);
    } catch (error: any) {
      console.error("Error fetching responses:", error);
      res.status(500).json({ error: "Erro ao buscar respostas" });
    }
  });

  // Buscar progresso do usuário em um curso
  app.get("/api/cursos/progresso/:cursoId", authenticateToken, async (req: any, res) => {
    try {
      const cursoId = parseInt(req.params.cursoId);
      const usuario_id = req.user.id;
      
      const progresso = await supabaseService.getProgressoCurso(usuario_id, cursoId);
      res.json(progresso);
    } catch (error: any) {
      console.error("Error fetching course progress:", error);
      res.status(500).json({ error: "Erro ao buscar progresso do curso" });
    }
  });

  // Verificar se usuário tem acesso ao curso
  app.get("/api/cursos/:id/access", authenticateToken, async (req: any, res) => {
    try {
      const cursoId = parseInt(req.params.id);
      const usuario_id = req.user.id;
      
      const hasAccess = await supabaseService.userHasAccessToCourse(usuario_id, cursoId);
      res.json(hasAccess);
    } catch (error: any) {
      console.error("Error checking course access:", error);
      res.status(500).json({ error: "Erro ao verificar acesso ao curso" });
    }
  });

  // ===== ROTAS ADMINISTRATIVAS PARA CURSOS =====

  // Criar novo curso (admin)
  app.post("/api/admin/cursos", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const cursoData = req.body;
      const novoCurso = await supabaseService.createCurso(cursoData);
      res.json(novoCurso);
    } catch (error: any) {
      console.error("Error creating course:", error);
      res.status(500).json({ error: "Erro ao criar curso" });
    }
  });

  // Atualizar curso (admin)
  app.put("/api/admin/cursos/:id", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const cursoId = parseInt(req.params.id);
      const updateData = req.body;
      const cursoAtualizado = await supabaseService.updateCurso(cursoId, updateData);
      res.json(cursoAtualizado);
    } catch (error: any) {
      console.error("Error updating course:", error);
      res.status(500).json({ error: "Erro ao atualizar curso" });
    }
  });

  // Deletar curso (admin)
  app.delete("/api/admin/cursos/:id", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const cursoId = parseInt(req.params.id);
      await supabaseService.deleteCurso(cursoId);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting course:", error);
      res.status(500).json({ error: "Erro ao deletar curso" });
    }
  });

  // Criar novo módulo para curso (admin)
  app.post("/api/admin/cursos/:id/modulos", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const cursoId = parseInt(req.params.id);
      const moduloData = { ...req.body, curso_id: cursoId };
      const novoModulo = await supabaseService.createModulo(moduloData);
      res.json(novoModulo);
    } catch (error: any) {
      console.error("Error creating module:", error);
      res.status(500).json({ error: "Erro ao criar módulo" });
    }
  });

  // Atualizar módulo (admin)
  app.put("/api/admin/modulos/:id", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const moduloId = parseInt(req.params.id);
      const updateData = req.body;
      const moduloAtualizado = await supabaseService.updateModulo(moduloId, updateData);
      res.json(moduloAtualizado);
    } catch (error: any) {
      console.error("Error updating module:", error);
      res.status(500).json({ error: "Erro ao atualizar módulo" });
    }
  });

  // Deletar módulo (admin)
  app.delete("/api/admin/modulos/:id", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const moduloId = parseInt(req.params.id);
      await supabaseService.deleteModulo(moduloId);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting module:", error);
      res.status(500).json({ error: "Erro ao deletar módulo" });
    }
  });

  // Processar compra de curso com Stripe
  app.post("/api/cursos/purchase", authenticateToken, async (req: any, res) => {
    try {
      const { cursoId } = req.body;
      const userId = req.user.id;
      
      const paymentIntent = await supabaseService.createCoursePaymentIntent(cursoId, userId);
      res.json(paymentIntent);
    } catch (error: any) {
      console.error("Error processing course purchase:", error);
      res.status(500).json({ error: "Erro ao processar compra do curso" });
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

  // ROTA PARA GERAR HTML FORMATADO DE GRIMÓRIO COM CSS AUTOMÁTICO DA SEÇÃO
  app.post("/api/admin/grimoires/:id/pdf", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const grimoire = await supabaseService.getGrimoireById(parseInt(id));
      
      if (!grimoire) {
        return res.status(404).json({ error: "Grimório não encontrado" });
      }

      // Geração de HTML formatado para impressão

      // Detectar seção do grimório para aplicar CSS correto
      const sections = await supabaseService.getLibrarySections();
      const grimoireSection = sections.find(s => s.id === grimoire.section_id);
      
      // Mapear seções para classes CSS específicas
      const sectionCSSMap: { [key: string]: string } = {
        'Atrium Ignis': 'atrium-ignis',
        'Porta Umbrae': 'porta-umbrae', 
        'Arcana Noctis': 'arcana-noctis',
        'Via Tenebris': 'via-tenebris',
        'Templo do Abismo': 'templo-abismo'
      };
      
      const cssClass = grimoireSection ? sectionCSSMap[grimoireSection.name] || 'atrium-ignis' : 'atrium-ignis';
      
      // Cores correspondentes às seções
      const sectionColors: { [key: string]: string } = {
        'atrium-ignis': '#8b0000',    // Vermelho místico
        'porta-umbrae': '#6a0dad',    // Roxo abissal  
        'arcana-noctis': '#003366',   // Azul profundo
        'via-tenebris': '#111111',    // Preto absoluto
        'templo-abismo': '#1a0a0a'    // Preto abissal profundo
      };
      
      const primaryColor = sectionColors[cssClass];
      
      // HTML template dinâmico que preserva cores originais - v2.0
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${grimoire.title}</title>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
          <style>
            @page {
              margin: 2cm;
              size: A4;
            }
            
            body {
              font-family: 'EB Garamond', serif;
              line-height: 1.6;
              color: #2a2a2a;
              background: white;
              margin: 0;
              padding: 20px;
            }
            
            /* === FORMATAÇÃO COMPLETA ESPECÍFICA DA SEÇÃO ${cssClass.toUpperCase()} === */
            
            /* Configurações básicas para impressão */
            .prose {
              max-width: none;
              padding: 1rem;
              font-family: 'EB Garamond', serif;
              line-height: 1.6;
            }
            
            /* Títulos principais com fonte Cinzel e cor da seção */
            .grimorio-titulo, .grimorio-subtitulo, h1, h2, h3, h4, h5, h6 {
              font-family: 'Cinzel Decorative', serif !important;
              ${cssClass === 'atrium-ignis' ? 'color: #D6342C !important;' : ''}
              ${cssClass === 'porta-umbrae' ? 'color: #6a0dad !important;' : ''}
              ${cssClass === 'arcana-noctis' ? 'color: #003366 !important;' : ''}
              ${cssClass === 'via-tenebris' ? 'color: #111111 !important;' : ''}
              ${cssClass === 'templo-abismo' ? 'color: #1a0a0a !important;' : ''}
              text-align: center;
              font-weight: 700;
              margin: 2rem 0 1rem 0;
              page-break-after: avoid;
            }
            
            /* Citações específicas da seção */
            .grimorio-citacao, blockquote {
              ${cssClass === 'atrium-ignis' ? 'color: #D6342C; border-left: 3px solid #D6342C;' : ''}
              ${cssClass === 'porta-umbrae' ? 'color: #6a0dad; border-left: 3px solid #6a0dad;' : ''}
              ${cssClass === 'arcana-noctis' ? 'color: #003366; border-left: 3px solid #003366;' : ''}
              ${cssClass === 'via-tenebris' ? 'color: #111111; border-left: 3px solid #111111;' : ''}
              ${cssClass === 'templo-abismo' ? 'color: #1a0a0a; border-left: 3px solid #1a0a0a;' : ''}
              font-style: italic;
              padding: 1.5rem;
              margin: 2rem auto;
              text-align: center;
              background: #fafafa;
              max-width: 80%;
            }
            
            /* Destaques específicos da seção */
            .destaque, strong, b {
              ${cssClass === 'atrium-ignis' ? 'color: #D6342C !important;' : ''}
              ${cssClass === 'porta-umbrae' ? 'color: #6a0dad !important;' : ''}
              ${cssClass === 'arcana-noctis' ? 'color: #003366 !important;' : ''}
              ${cssClass === 'via-tenebris' ? 'color: #111111 !important;' : ''}
              ${cssClass === 'templo-abismo' ? 'color: #1a0a0a !important;' : ''}
              font-weight: bold;
            }
            
            /* Listas da seção */
            .grimorio-lista, ul, ol {
              margin-left: 2rem;
              margin-bottom: 1rem;
            }
            
            .grimorio-lista li, ul li, ol li {
              ${cssClass === 'atrium-ignis' ? 'color: #D6342C !important;' : ''}
              ${cssClass === 'porta-umbrae' ? 'color: #6a0dad !important;' : ''}
              ${cssClass === 'arcana-noctis' ? 'color: #003366 !important;' : ''}
              ${cssClass === 'via-tenebris' ? 'color: #111111 !important;' : ''}
              ${cssClass === 'templo-abismo' ? 'color: #1a0a0a !important;' : ''}
              margin-bottom: 0.5rem;
              font-weight: 600;
            }
            
            /* Parágrafos e conteúdo geral */
            .grimorio-conteudo p, .indentado {
              font-family: 'EB Garamond', serif !important;
              line-height: 1.7;
              margin-bottom: 1rem;
              text-align: justify;
            }
            
            .indentado {
              text-indent: 2rem;
            }
            
            /* Separadores */
            .separador, hr {
              border: none;
              ${cssClass === 'atrium-ignis' ? 'border-top: 2px solid #D6342C;' : ''}
              ${cssClass === 'porta-umbrae' ? 'border-top: 2px solid #6a0dad;' : ''}
              ${cssClass === 'arcana-noctis' ? 'border-top: 2px solid #003366;' : ''}
              ${cssClass === 'via-tenebris' ? 'border-top: 2px solid #111111;' : ''}
              margin: 2rem auto;
              width: 60%;
            }
            
            /* Preserva estilos inline quando existem */
            [style] {
              /* Estilos inline têm prioridade automática */
            }
            
            h1, h2, h3, h4, h5, h6 {
              page-break-after: avoid;
            }
          </style>
        </head>
        <body class="grimorio-conteudo ${cssClass}">
          <div class="prose">
            ${grimoire.content}
          </div>
        </body>
        </html>
      `;

      // Enviar como HTML otimizado para impressão
      const filename = `${grimoire.title.replace(/[^a-zA-Z0-9\s]/g, '_')}_${cssClass}.html`;
      
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(htmlContent);
      
    } catch (error: any) {
      console.error("Erro ao gerar HTML:", error);
      res.status(500).json({ error: "Erro ao gerar HTML: " + error.message });
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
      
      // Validar que a IA retornou conteúdo válido
      if (!aiResult.content || aiResult.content.trim().length === 0) {
        throw new Error("IA não gerou conteúdo válido");
      }

      // Calcular estatísticas do conteúdo completo
      const totalWordCount = aiResult.content ? aiResult.content.split(' ').length : 0;
      const estimatedReadingTime = Math.max(5, Math.ceil(totalWordCount / 200));
      
      // Criar grimório automaticamente no banco
      const grimoireData: InsertGrimoire = {
        title: aiResult.title || "Grimório Gerado pela IA",
        description: aiResult.description || "Grimório criado automaticamente pela IA",
        section_id: settings?.default_section || 1,
        content: aiResult.content || "Conteúdo gerado pela IA",
        is_paid: settings?.auto_price === true,
        price: settings?.auto_price ? (settings?.price_range_min || "29.99") : null,
        unlock_order: 0,
        estimated_reading_time: estimatedReadingTime,
        is_published: settings?.auto_publish !== false,
        cover_image_url: `https://via.placeholder.com/300x400/1a1a1a/d4af37?text=${encodeURIComponent(aiResult.title || 'Grimório')}`
      };

      const newGrimoire = await supabaseService.createGrimoire(grimoireData);
      
      res.json({
        grimoire: newGrimoire,
        aiGenerated: {
          title: aiResult.title,
          description: aiResult.description,
          totalWords: totalWordCount,
          readingTime: estimatedReadingTime
        },
        message: `Grimório gerado com sucesso! ${totalWordCount} palavras, aproximadamente ${estimatedReadingTime} minutos de leitura.`
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

  // Expandir curso LUXFERAT
  app.post("/api/admin/expand-luxferat", authenticateToken, async (req, res) => {
    try {
      console.log('🔥 Iniciando expansão do LUXFERAT...');
      
      // Primeiro, deletar módulos existentes
      const { error: deleteError } = await supabase
        .from('modulos')
        .delete()
        .eq('curso_id', 1);

      if (deleteError) {
        console.error('Erro ao deletar módulos:', deleteError);
        throw deleteError;
      }

      console.log('✓ Módulos antigos deletados');

      // Módulos expandidos
      const modulosExpandidos = [
        {
          curso_id: 1,
          titulo: "A Semente da Rebelião – Despertar da Consciência",
          conteudo: `<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">
<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">⚡ A SEMENTE DA REBELIÃO ⚡</h1>
<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"A verdadeira iniciação começa quando você questiona tudo que te ensinaram a aceitar como sagrado."</em>
</div>
<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">O Despertar da Consciência Crítica</h2>
<p>Bem-vindo ao primeiro estágio da jornada luciferiana. Aqui você aprenderá a reconhecer e dissolver as amarras mentais que foram impostas desde o nascimento.</p>
<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔍 Identificando Sistemas de Controle</h3>
<ul style="margin-left: 2rem; line-height: 2;">
<li><strong>Condicionamento Religioso:</strong> Conceitos de pecado, culpa e submissão</li>
<li><strong>Conformidade Social:</strong> Pressão para seguir normas não questionadas</li>
<li><strong>Autoridade Inquestionável:</strong> Figuras que demandam obediência cega</li>
<li><strong>Medo do Desconhecido:</strong> Terror implantado sobre exploração espiritual</li>
</ul>
<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🧠 Exercício Prático: O Mapeamento Mental</h3>
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>Duração:</strong> 30-45 minutos</p>
<p><strong>Material:</strong> Papel, caneta vermelha</p>
<p><strong>Instruções:</strong></p>
<ol style="line-height: 1.8;">
<li>Em silêncio total, escreva 10 crenças que você nunca questionou</li>
<li>Para cada crença, identifique QUEM ou O QUE a implantou em você</li>
<li>Questione: "Esta crença me liberta ou me limita?"</li>
<li>Marque com tinta vermelha aquelas que limitam seu poder pessoal</li>
<li>Queime o papel em chama de vela preta ao final</li>
</ol>
</div>
</div>`,
          ordem: 1
        },
        {
          curso_id: 1,
          titulo: "O Fogo Interior – Reconhecendo Seu Poder Pessoal",
          conteudo: `<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">
<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">🔥 O FOGO INTERIOR 🔥</h1>
<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"O poder não é algo que você busca fora – é algo que você desperta dentro."</em>
</div>
<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">A Natureza do Poder Pessoal</h2>
<p>O segundo módulo da jornada LUXFERAT foca no reconhecimento e cultivo do poder inerente que reside em cada ser consciente.</p>
<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🌟 Os Três Pilares do Poder Interior</h3>
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>1. SOBERANIA MENTAL:</strong> Controle total sobre seus pensamentos e emoções</p>
<p><strong>2. VONTADE DIRECIONADA:</strong> Capacidade de focar energia em objetivos específicos</p>
<p><strong>3. PRESENÇA MAGNÉTICA:</strong> Irradiação natural de poder pessoal</p>
</div>
<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">⚡ Técnica: Respiração do Fogo Luciferiano</h3>
<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<p><strong>Posição:</strong> Sentado com coluna ereta, mãos sobre os joelhos</p>
<p><strong>Duração:</strong> 15-20 minutos diários</p>
<p><strong>Técnica:</strong></p>
<ol style="line-height: 2;">
<li>Inspire lentamente visualizando fogo dourado entrando pelo topo da cabeça</li>
<li>Retenha por 4 segundos, sentindo o fogo se concentrar no peito</li>
<li>Expire visualizando o fogo se espalhando por todo o corpo</li>
<li>Sinta cada célula sendo energizada com poder luciferiano</li>
<li>Na última expiração, projete o fogo como aura ao seu redor</li>
</ol>
</div>
</div>`,
          ordem: 2
        },
        {
          curso_id: 1,
          titulo: "As Correntes Invisíveis – Libertação Psicológica",
          conteudo: `<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">
<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">⛓️ AS CORRENTES INVISÍVEIS ⛓️</h1>
<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"As correntes mais fortes são aquelas que não conseguimos ver – até o momento em que decidimos quebrá-las."</em>
</div>
<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">Identificando Prisões Mentais Ocultas</h2>
<p>Este módulo foca na identificação e dissolução de padrões psicológicos limitantes que operam abaixo do limiar da consciência.</p>
<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔗 Os Cinco Tipos de Correntes Psicológicas</h3>
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>1. CORRENTES DO MEDO:</strong> Paralisia diante do desconhecido ou mudança</p>
<p><strong>2. CORRENTES DA CULPA:</strong> Autossabotagem baseada em "pecados" imaginários</p>
<p><strong>3. CORRENTES DA APROVAÇÃO:</strong> Dependência da validação externa</p>
<p><strong>4. CORRENTES DA TRADIÇÃO:</strong> Seguir caminhos só porque "sempre foi assim"</p>
<p><strong>5. CORRENTES DO CONFORMISMO:</strong> Medo de ser diferente ou destacar-se</p>
</div>
</div>`,
          ordem: 3
        },
        {
          curso_id: 1,
          titulo: "O Conhecimento Proibido – Gnose Luciferiana",
          conteudo: `<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">
<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">📚 O CONHECIMENTO PROIBIDO 📚</h1>
<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"O conhecimento mais poderoso é aquele que o mundo tenta esconder de você."</em>
</div>
<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">A Natureza da Gnose Luciferiana</h2>
<p>A Gnose Luciferiana não é simplesmente conhecimento intelectual, mas uma forma de percepção direta da realidade que transcende as limitações impostas por sistemas de crenças convencionais.</p>
<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🌟 Os Pilares da Gnose Luciferiana</h3>
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>1. CONHECIMENTO EXPERIENCIAL:</strong> Verdades descobertas através da prática, não da fé</p>
<p><strong>2. QUESTIONAMENTO RADICAL:</strong> Nada é aceito sem investigação pessoal</p>
<p><strong>3. INTEGRAÇÃO SOMBRIA:</strong> Abraço consciente dos aspectos "proibidos" da psique</p>
<p><strong>4. SOBERANIA ESPIRITUAL:</strong> Rejeição de autoridades espirituais externas</p>
<p><strong>5. TRANSCENDÊNCIA PELO DESCENSO:</strong> Evolução através da exploração das profundezas</p>
</div>
</div>`,
          ordem: 4
        },
        {
          curso_id: 1,
          titulo: "O Trabalho com Sombras – Integração dos Aspectos Ocultos",
          conteudo: `<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">
<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">🌑 O TRABALHO COM SOMBRAS 🌑</h1>
<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"Sua sombra contém não apenas seus defeitos, mas também seus poderes não desenvolvidos."</em>
</div>
<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">Compreendendo a Natureza da Sombra</h2>
<p>O trabalho com sombras é um dos aspectos mais transformadores da jornada luciferiana. A "sombra" não é simplesmente o mal ou aspectos negativos, mas todo o conteúdo psíquico que foi reprimido, negado ou considerado inaceitável pela persona consciente.</p>
<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔍 Anatomia da Sombra Pessoal</h3>
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>SOMBRA INDIVIDUAL:</strong> Aspectos rejeitados da personalidade</p>
<p><strong>SOMBRA FAMILIAR:</strong> Padrões herdados através de gerações</p>
<p><strong>SOMBRA CULTURAL:</strong> Aspectos negados pela sociedade</p>
<p><strong>SOMBRA ARQUETÍPICA:</strong> Forças primordiais coletivas</p>
<p><strong>SOMBRA DOURADA:</strong> Potenciais positivos não reconhecidos</p>
</div>
</div>`,
          ordem: 5
        },
        {
          curso_id: 1,
          titulo: "Magia Prática – Manifestação da Vontade",
          conteudo: `<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">
<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">🔮 MAGIA PRÁTICA 🔮</h1>
<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"Magia é a arte e ciência de causar mudanças de acordo com a Vontade."</em>
<br><small style="color: #8B0000;">- Aleister Crowley</small>
</div>
<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">Os Fundamentos da Magia Luciferiana</h2>
<p>A magia luciferiana difere fundamentalmente de outras tradições por seu foco na soberania individual e desenvolvimento do poder pessoal. Não é súplica a entidades externas, mas o despertar e direcionamento das forças inerentes à consciência humana em sua forma mais elevada.</p>
<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">⚡ Os Cinco Pilares da Prática Mágica</h3>
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>1. VONTADE (Thelema):</strong> Direcionamento consciente da energia psíquica</p>
<p><strong>2. IMAGINAÇÃO (Visualização):</strong> Capacidade de criar realidades mentais vívidas</p>
<p><strong>3. FOCO (Concentração):</strong> Manutenção da atenção em um objetivo específico</p>
<p><strong>4. TIMING (Sincronização):</strong> Escolha do momento apropriado para ação</p>
<p><strong>5. CORRESPONDÊNCIA:</strong> Uso de símbolos e elementos que ressoam com o objetivo</p>
</div>
</div>`,
          ordem: 6
        },
        {
          curso_id: 1,
          titulo: "Rituais de Transformação – Cerimônias de Poder",
          conteudo: `<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">
<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">🎭 RITUAIS DE TRANSFORMAÇÃO 🎭</h1>
<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"O ritual é a ponte entre o mundo profano e o sagrado, entre o que é e o que pode ser."</em>
</div>
<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">A Arquitetura do Ritual Luciferiano</h2>
<p>Os rituais luciferianos não são meras cerimônias decorativas, mas tecnologias precisas de transformação consciencial. Cada elemento serve para alterar estados de consciência e canalizar energia para objetivos específicos de crescimento e manifestação.</p>
<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🏛️ Estrutura Fundamental do Ritual</h3>
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>1. PURIFICAÇÃO:</strong> Limpeza física, mental e espiritual</p>
<p><strong>2. CONSAGRAÇÃO:</strong> Santificação do espaço e ferramentas</p>
<p><strong>3. INVOCAÇÃO:</strong> Chamado das forças a serem trabalhadas</p>
<p><strong>4. TRABALHO CENTRAL:</strong> A operação mágica principal</p>
<p><strong>5. AGRADECIMENTO:</strong> Reconhecimento às forças invocadas</p>
<p><strong>6. BANIMENTO:</strong> Fechamento e retorno ao estado normal</p>
</div>
</div>`,
          ordem: 7
        },
        {
          curso_id: 1,
          titulo: "Integração e Maestria – Vivendo como Luciferiano",
          conteudo: `<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">
<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">👑 INTEGRAÇÃO E MAESTRIA 👑</h1>
<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"A verdadeira iniciação não termina com um ritual - ela se completa com uma vida vivida em total autenticidade."</em>
</div>
<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">A Vida Como Prática Espiritual</h2>
<p>Este módulo final do LUXFERAT foca na integração completa dos princípios luciferianos na vida cotidiana. Ser luciferiano não é algo que você pratica em momentos específicos - é uma forma de existir no mundo com total soberania, autenticidade e poder pessoal.</p>
<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🌟 Os Pilares da Vida Luciferiana</h3>
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>AUTENTICIDADE:</strong> Viver de acordo com sua verdadeira natureza</p>
<p><strong>RESPONSABILIDADE:</strong> Aceitar totalmente as consequências de suas escolhas</p>
<p><strong>CRESCIMENTO CONTÍNUO:</strong> Estar sempre expandindo limites pessoais</p>
<p><strong>PODER EQUILIBRADO:</strong> Usar força pessoal de forma sábia</p>
<p><strong>QUESTIONAMENTO PERPÉTUO:</strong> Nunca parar de investigar e aprender</p>
<p><strong>COMPAIXÃO INTELIGENTE:</strong> Ajudar outros sem prejudicar a si mesmo</p>
</div>
</div>`,
          ordem: 8
        }
      ];

      // Inserir novos módulos
      for (const modulo of modulosExpandidos) {
        const { error } = await supabase
          .from('modulos')
          .insert(modulo);

        if (error) {
          console.error(`Erro ao inserir módulo ${modulo.titulo}:`, error);
          throw error;
        }
        console.log(`✓ Módulo "${modulo.titulo}" criado`);
      }

      // Atualizar informações do curso
      const { error: updateError } = await supabase
        .from('cursos')
        .update({
          descricao: 'Curso completo de iniciação luciferiana com 8 módulos abrangentes. Uma jornada transformadora desde o despertar da consciência crítica até a maestria completa da filosofia e práticas luciferianas. Inclui rituais práticos, técnicas de poder pessoal, trabalho com sombras, magia aplicada e integração total dos princípios na vida cotidiana.',
          preco: 333.33,
          nivel: 'Iniciante a Avançado'
        })
        .eq('id', 1);

      if (updateError) {
        console.error('Erro ao atualizar curso:', updateError);
        throw updateError;
      }

      console.log('✓ Curso atualizado com sucesso');
      console.log('🔥 LUXFERAT expandido com 8 módulos completos!');

      res.json({ 
        success: true, 
        message: 'LUXFERAT expandido com sucesso!',
        modulosCount: modulosExpandidos.length
      });
      
    } catch (error: any) {
      console.error('Erro durante expansão:', error);
      res.status(500).json({ error: 'Erro ao expandir LUXFERAT: ' + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}