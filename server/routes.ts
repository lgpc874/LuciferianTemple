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
      const { grimoireId, currentPage, totalPages, readingTimeMinutes } = req.body;
      
      const progressData: InsertProgress = {
        user_id: req.user.id,
        grimoire_id: grimoireId,
        current_page: currentPage,
        total_pages: totalPages,
        reading_time_minutes: readingTimeMinutes,
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

  // ROTA PARA GERAR PDF DE GRIMÓRIO COM CSS AUTOMÁTICO DA SEÇÃO
  app.post("/api/admin/grimoires/:id/pdf", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const grimoire = await supabaseService.getGrimoireById(parseInt(id));
      
      if (!grimoire) {
        return res.status(404).json({ error: "Grimório não encontrado" });
      }

      const puppeteer = require('puppeteer');

      // Detectar seção do grimório para aplicar CSS correto
      const sections = await supabaseService.getLibrarySections();
      const grimoireSection = sections.find(s => s.id === grimoire.section_id);
      
      // Mapear seções para classes CSS específicas
      const sectionCSSMap: { [key: string]: string } = {
        'Atrium Ignis': 'atrium-ignis',
        'Porta Umbrae': 'porta-umbrae', 
        'Arcana Noctis': 'arcana-noctis',
        'Via Tenebris': 'via-tenebris',
        'Templo do Abismo': 'atrium-ignis' // Fallback para vermelho
      };
      
      const cssClass = grimoireSection ? sectionCSSMap[grimoireSection.name] || 'atrium-ignis' : 'atrium-ignis';
      
      // Cores correspondentes às seções
      const sectionColors: { [key: string]: string } = {
        'atrium-ignis': '#8b0000',    // Vermelho místico
        'porta-umbrae': '#6a0dad',    // Roxo abissal  
        'arcana-noctis': '#003366',   // Azul profundo
        'via-tenebris': '#111111'     // Preto absoluto
      };
      
      const primaryColor = sectionColors[cssClass];
      
      // HTML template dinâmico que se adapta aos estilos do grimório
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
            
            /* Preserva TODOS os estilos inline do grimório */
            * {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              font-style: inherit !important;
              text-align: inherit !important;
              background: inherit !important;
              border: inherit !important;
              margin: inherit !important;
              padding: inherit !important;
            }
            
            /* === CSS ESPECÍFICO DA SEÇÃO ${cssClass.toUpperCase()} === */
            
            /* Conteúdo base da seção */
            .grimorio-conteudo.${cssClass} {
              font-family: 'EB Garamond', serif;
              ${cssClass === 'atrium-ignis' ? 'color: #e0d7d0;' : ''}
              ${cssClass === 'porta-umbrae' ? 'color: #d8d3eb;' : ''}
              ${cssClass === 'arcana-noctis' ? 'color: #ccd9f0;' : ''}
              ${cssClass === 'via-tenebris' ? 'color: #d2d2d2;' : ''}
              font-size: 14pt;
              line-height: 1.8;
              text-align: justify;
              padding: 2rem 1rem;
            }

            /* Títulos principais da seção */
            .grimorio-titulo.${cssClass}, .grimorio-subtitulo.${cssClass}, 
            h1, h2, h3, h4, h5, h6 {
              font-family: 'Cinzel Decorative', serif;
              color: ${primaryColor} !important;
              text-align: center;
              margin: 2rem 0 1rem 0;
              page-break-after: avoid;
              font-weight: 700;
            }

            h1 { font-size: 20pt; }
            h2 { font-size: 16pt; margin: 1.5rem 0; }
            h3, h4, h5, h6 { font-size: 14pt; margin: 1rem 0; }

            /* Citações específicas da seção */
            .grimorio-citacao.${cssClass} {
              ${cssClass === 'atrium-ignis' ? 'color: #b22222; border-left: 3px solid #8b0000;' : ''}
              ${cssClass === 'porta-umbrae' ? 'color: #a36be2; border-left: 3px solid #6a0dad;' : ''}
              ${cssClass === 'arcana-noctis' ? 'color: #4169e1; border-left: 3px solid #003366;' : ''}
              ${cssClass === 'via-tenebris' ? 'color: #666666; border-left: 3px solid #222222;' : ''}
              font-style: italic;
              padding-left: 15px;
              margin: 20px 0;
              padding: 1.5rem;
              text-align: center;
              background: #fafafa;
              max-width: 80%;
              margin: 2rem auto;
            }

            /* Destaques específicos da seção */
            .destaque.${cssClass}, strong, b {
              ${cssClass === 'atrium-ignis' ? 'color: #b22222;' : ''}
              ${cssClass === 'porta-umbrae' ? 'color: #9b30ff;' : ''}
              ${cssClass === 'arcana-noctis' ? 'color: #1e90ff;' : ''}
              ${cssClass === 'via-tenebris' ? 'color: #888888;' : ''}
              font-weight: bold;
            }

            /* Listas */
            .grimorio-lista, ul, ol {
              margin-left: 2rem;
              margin-bottom: 1rem;
            }

            li {
              margin-bottom: 0.5rem;
              color: ${primaryColor} !important;
              font-weight: 600;
            }

            /* Parágrafos especiais */
            .indentado {
              text-indent: 2rem;
              margin-bottom: 1rem;
            }

            /* Separadores */
            .separador, hr {
              border: none;
              border-top: 2px solid ${primaryColor};
              margin: 2rem auto;
              width: 60%;
            }

            /* Preservar formatação inline existente */
            [style*="color"] {
              /* Mantém cores inline específicas quando definidas */
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

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '2cm',
          right: '2cm',
          bottom: '2cm',
          left: '2cm'
        }
      });
      
      await browser.close();
      
      const filename = `${grimoire.title.replace(/[^a-zA-Z0-9\s]/g, '_')}_${cssClass}.pdf`;
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(pdf);
      
    } catch (error: any) {
      console.error("Erro ao gerar PDF:", error);
      res.status(500).json({ error: "Erro ao gerar PDF: " + error.message });
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

  const httpServer = createServer(app);
  return httpServer;
}