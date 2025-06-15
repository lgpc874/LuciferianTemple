import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import Stripe from 'stripe';
import type { 
  Grimoire, 
  InsertGrimoire, 
  Chapter, 
  InsertChapter, 
  LibrarySection, 
  InsertLibrarySection,
  UserProgress,
  InsertProgress 
} from '@shared/schema';

// Inicializar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Inicializar Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export class SupabaseService {
  private supabase;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and key are required');
    }
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // SEÇÕES DA BIBLIOTECA
  async getLibrarySections(): Promise<LibrarySection[]> {
    const { data, error } = await this.supabase
      .from('library_sections')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (error) throw new Error(`Error fetching sections: ${error.message}`);
    return data || [];
  }

  async createLibrarySection(section: InsertLibrarySection): Promise<LibrarySection> {
    const { data, error } = await this.supabase
      .from('library_sections')
      .insert(section)
      .select()
      .single();

    if (error) throw new Error(`Error creating section: ${error.message}`);
    return data;
  }

  async initializeDefaultSections(): Promise<void> {
    const defaultSections = [
      { name: 'Porta das Sombras', description: 'Para os que chegaram ao limiar. Os olhos ainda fechados... mas já sentem o fogo.', slug: 'porta-das-sombras', display_order: 1 },
      { name: 'Vestíbulo da Chama', description: 'O primeiro despertar. A chama interior começa a arder com conhecimento primordial.', slug: 'vestibulo-da-chama', display_order: 2 },
      { name: 'Torre dos Selos', description: 'Ascensão aos mistérios selados. Conhecimentos que poucos ousam desvelar.', slug: 'torre-dos-selos', display_order: 3 },
      { name: 'Sanctum Profundum', description: 'O santuário dos arcanos supremos. Apenas para os que transcenderam o véu.', slug: 'sanctum-profundum', display_order: 4 },
      { name: 'Textos Filosóficos', description: 'Fundamentos filosóficos e teóricos dos ensinamentos luciferianos.', slug: 'textos-filosoficos', display_order: 5 },
      { name: 'Meditações Práticas', description: 'Práticas meditativas e exercícios para desenvolvimento espiritual.', slug: 'meditacoes-praticas', display_order: 6 }
    ];

    for (const section of defaultSections) {
      try {
        await this.createLibrarySection({
          ...section,
          is_active: true
        });
      } catch (error) {
        // Section may already exist, continue
        console.log(`Section ${section.name} may already exist`);
      }
    }
  }

  // GRIMÓRIOS
  async getGrimoires(): Promise<Grimoire[]> {
    const { data, error } = await this.supabase
      .from('grimoires')
      .select('*')
      .eq('is_active', true)
      .order('unlock_order');

    if (error) throw new Error(`Error fetching grimoires: ${error.message}`);
    return data || [];
  }

  async getGrimoireById(id: number): Promise<Grimoire | null> {
    const { data, error } = await this.supabase
      .from('grimoires')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Error fetching grimoire: ${error.message}`);
    }
    return data;
  }

  async getGrimoiresBySection(sectionId: number): Promise<Grimoire[]> {
    const { data, error } = await this.supabase
      .from('grimoires')
      .select('*')
      .eq('section_id', sectionId)
      .eq('is_active', true)
      .order('unlock_order');

    if (error) throw new Error(`Error fetching grimoires by section: ${error.message}`);
    return data || [];
  }

  async createGrimoire(grimoire: InsertGrimoire): Promise<Grimoire> {
    const { data, error } = await this.supabase
      .from('grimoires')
      .insert({
        ...grimoire,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw new Error(`Error creating grimoire: ${error.message}`);
    return data;
  }

  async updateGrimoire(id: number, updates: Partial<InsertGrimoire>): Promise<Grimoire> {
    const { data, error } = await this.supabase
      .from('grimoires')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Error updating grimoire: ${error.message}`);
    return data;
  }

  async deleteGrimoire(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('grimoires')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Error deleting grimoire: ${error.message}`);
  }

  async moveGrimoireToSection(grimoireId: number, newSectionId: number): Promise<Grimoire> {
    return this.updateGrimoire(grimoireId, { section_id: newSectionId });
  }

  // CAPÍTULOS
  async getChaptersByGrimoire(grimoireId: number): Promise<Chapter[]> {
    const { data, error } = await this.supabase
      .from('chapters')
      .select('*')
      .eq('grimoire_id', grimoireId)
      .order('chapter_number');

    if (error) throw new Error(`Error fetching chapters: ${error.message}`);
    return data || [];
  }

  async createChapter(chapter: InsertChapter): Promise<Chapter> {
    const { data, error } = await this.supabase
      .from('chapters')
      .insert({
        ...chapter,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw new Error(`Error creating chapter: ${error.message}`);
    return data;
  }

  async updateChapter(id: number, updates: Partial<InsertChapter>): Promise<Chapter> {
    const { data, error } = await this.supabase
      .from('chapters')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Error updating chapter: ${error.message}`);
    return data;
  }

  async deleteChapter(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('chapters')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Error deleting chapter: ${error.message}`);
  }

  // PROGRESSO DO USUÁRIO
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    const { data, error } = await this.supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('last_read_at', { ascending: false });

    if (error) throw new Error(`Error fetching user progress: ${error.message}`);
    return data || [];
  }

  async saveUserProgress(progress: InsertProgress): Promise<UserProgress> {
    const { data, error } = await this.supabase
      .from('user_progress')
      .upsert({
        ...progress,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,grimoire_id,chapter_id'
      })
      .select()
      .single();

    if (error) throw new Error(`Error saving user progress: ${error.message}`);
    return data;
  }

  // ESTATÍSTICAS ADMINISTRATIVAS
  async getAdminStats() {
    const [grimoires, sections, totalUsers] = await Promise.all([
      this.supabase.from('grimoires').select('id', { count: 'exact' }),
      this.supabase.from('library_sections').select('id', { count: 'exact' }),
      this.supabase.from('users').select('id', { count: 'exact' })
    ]);

    return {
      totalGrimoires: grimoires.count || 0,
      totalSections: sections.count || 0,
      totalUsers: totalUsers.count || 0
    };
  }

  // ESTATÍSTICAS COMPLETAS PARA VISÃO GERAL
  async getOverviewStats() {
    try {
      // Contadores principais
      const [grimoireCount, chapterCount, progressCount, userCount, sectionCount] = await Promise.all([
        this.supabase.from('grimoires').select('id', { count: 'exact' }),
        this.supabase.from('chapters').select('id', { count: 'exact' }),
        this.supabase.from('user_progress').select('id', { count: 'exact' }),
        this.supabase.from('users').select('id', { count: 'exact' }),
        this.supabase.from('library_sections').select('id', { count: 'exact' })
      ]);

      // Usuários recentes (últimos 10)
      const { data: recentUsers } = await this.supabase
        .from('users')
        .select('id, email, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      // Grimórios recentes (últimos 10)
      const { data: recentGrimoires } = await this.supabase
        .from('grimoires')
        .select('id, title, section_id, created_at, is_paid, price')
        .order('created_at', { ascending: false })
        .limit(10);

      // Estatísticas por seção (contagem de grimórios)
      const { data: sectionsData } = await this.supabase
        .from('library_sections')
        .select(`
          id,
          name,
          grimoires(count)
        `)
        .eq('is_active', true);

      // Processar dados das seções
      const sectionStats = sectionsData?.map(section => ({
        id: section.id,
        name: section.name,
        grimoire_count: section.grimoires?.[0]?.count || 0
      })) || [];

      return {
        totalUsers: userCount.count || 0,
        totalGrimoires: grimoireCount.count || 0,
        totalSections: sectionCount.count || 0,
        totalChapters: chapterCount.count || 0,
        totalProgress: progressCount.count || 0,
        recentUsers: recentUsers || [],
        recentGrimoires: recentGrimoires || [],
        sectionStats
      };
    } catch (error: any) {
      console.error('Error fetching overview stats:', error);
      throw new Error(`Error fetching overview stats: ${error?.message || 'Unknown error'}`);
    }
  }

  // GERAÇÃO DE GRIMÓRIOS COM IA
  async generateGrimoireWithAI(prompt: string) {
    try {
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Você é um mestre luciferiano e especialista em ocultismo. Sua tarefa é criar um grimório COMPLETO com capítulos TOTALMENTE desenvolvidos.

            REGRA ABSOLUTA: CADA CAPÍTULO DEVE TER CONTEÚDO COMPLETO DE 800-1200 PALAVRAS. NÃO ACEITO RESUMOS OU CONTEÚDO INCOMPLETO.

            Formato JSON obrigatório:
            {
              "title": "Título do grimório",
              "description": "Descrição detalhada em 2-3 parágrafos explicando o propósito e conteúdo do grimório",
              "chapters": [
                {
                  "title": "Capítulo 1: [Nome]",
                  "content": "CONTEÚDO COMPLETO DO CAPÍTULO com pelo menos 800 palavras incluindo: introdução conceitual, desenvolvimento teórico, instruções práticas, rituais específicos, filosofia luciferiana, simbolismo, e conclusões. Use parágrafos bem estruturados, formatação HTML (<strong>, <em>, <ul>, <li>), citações em latim e linguagem mística erudita."
                },
                {
                  "title": "Capítulo 2: [Nome]",
                  "content": "CONTEÚDO COMPLETO DO CAPÍTULO com pelo menos 800 palavras seguindo a mesma estrutura detalhada do capítulo anterior."
                },
                {
                  "title": "Capítulo 3: [Nome]",
                  "content": "CONTEÚDO COMPLETO DO CAPÍTULO com pelo menos 800 palavras seguindo a mesma estrutura detalhada."
                }
              ],
              "level": "iniciante",
              "suggested_price": "29.99"
            }

            DIRETRIZES OBRIGATÓRIAS:
            ✓ Mínimo 3 capítulos, máximo 5
            ✓ Cada capítulo: 800-1200 palavras
            ✓ Linguagem mística luciferiana autêntica
            ✓ Inclua rituais práticos detalhados
            ✓ Filosofia e teoria fundamentada
            ✓ Símbolos e correspondências
            ✓ Citações em latim apropriadas
            ✓ Formatação HTML para estrutura
            ✓ Parágrafos bem organizados

            EXEMPLO DE CONTEÚDO COMPLETO:
            "Este capítulo explora os fundamentos da gnose luciferiana... [800+ palavras com desenvolvimento completo, rituais específicos, filosofia detalhada, instruções práticas, simbolismo esotérico, e conclusões significativas]"`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.8,
        max_tokens: 16000
      });

      const rawContent = response.choices[0].message.content || '{}';
      console.log('🤖 Raw AI Response:', rawContent.substring(0, 500) + '...');
      
      const generatedContent = JSON.parse(rawContent);
      console.log('📖 Parsed Content Structure:', {
        title: !!generatedContent.title,
        description: !!generatedContent.description,
        chapters: generatedContent.chapters?.length || 0,
        chaptersWithContent: generatedContent.chapters?.filter((ch: any) => ch.content)?.length || 0
      });
      
      return {
        title: generatedContent.title || "Grimório Gerado",
        description: generatedContent.description || "Descrição gerada pela IA",
        chapters: generatedContent.chapters || [],
        level: generatedContent.level || "iniciante",
        suggested_price: generatedContent.suggested_price || "29.99"
      };
    } catch (error: any) {
      console.error('Error generating grimoire with AI:', error);
      throw new Error(`Error generating grimoire with AI: ${error?.message || 'Unknown error'}`);
    }
  }

  // PAGAMENTOS COM STRIPE
  async createPaymentIntent(grimoireId: number, amount: number) {
    try {
      // Buscar informações do grimório
      const { data: grimoire, error } = await this.supabase
        .from('grimoires')
        .select('*')
        .eq('id', grimoireId)
        .single();

      if (error || !grimoire) {
        throw new Error('Grimório não encontrado');
      }

      // Converter valor para centavos
      const amountInCents = Math.round(amount * 100);

      // Criar Payment Intent no Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'brl',
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          grimoireId: grimoireId.toString(),
          grimoireTitle: grimoire.title,
          type: 'grimoire_purchase'
        },
        description: `Compra do grimório: ${grimoire.title}`
      });

      return paymentIntent;
    } catch (error: any) {
      console.error('Error creating payment intent:', error);
      throw new Error(`Error creating payment intent: ${error?.message || 'Unknown error'}`);
    }
  }

  // PROCESSAR PAGAMENTO CONFIRMADO (webhook)
  async processPaymentConfirmed(paymentIntentId: string, userId: number) {
    try {
      // Buscar detalhes do Payment Intent
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status !== 'succeeded') {
        throw new Error('Pagamento não foi confirmado');
      }

      const grimoireId = parseInt(paymentIntent.metadata.grimoireId);
      
      // Registrar compra na tabela de compras (precisa ser criada)
      const { data: purchase, error } = await this.supabase
        .from('grimoire_purchases')
        .insert({
          user_id: userId,
          grimoire_id: grimoireId,
          payment_intent_id: paymentIntentId,
          amount: paymentIntent.amount / 100, // Converter de centavos
          status: 'completed',
          purchased_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error recording purchase:', error);
        throw new Error('Erro ao registrar compra');
      }

      return {
        success: true,
        grimoireId,
        purchase
      };
    } catch (error: any) {
      console.error('Error processing payment confirmation:', error);
      throw new Error(`Error processing payment: ${error?.message || 'Unknown error'}`);
    }
  }

  // VERIFICAR SE USUÁRIO POSSUI ACESSO AO GRIMÓRIO
  async hasUserAccess(userId: number, grimoireId: number): Promise<boolean> {
    try {
      // Verificar se é gratuito
      const { data: grimoire } = await this.supabase
        .from('grimoires')
        .select('is_paid')
        .eq('id', grimoireId)
        .single();

      if (!grimoire?.is_paid) {
        return true; // Grimório gratuito
      }

      // Verificar se usuário comprou
      const { data: purchase } = await this.supabase
        .from('grimoire_purchases')
        .select('id')
        .eq('user_id', userId)
        .eq('grimoire_id', grimoireId)
        .eq('status', 'completed')
        .single();

      return !!purchase;
    } catch (error: any) {
      console.error('Error checking user access:', error);
      return false;
    }
  }

  // GERENCIAR CONFIGURAÇÕES DE IA
  async getAISettings() {
    try {
      const { data, error } = await this.supabase
        .from('ai_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      // Se não existe configuração, retornar valores padrão
      if (!data) {
        return {
          personality: 'luciferian',
          complexity: 'beginner',
          length: 'medium',
          style: 'mixed',
          guidelines: '',
          defaultSection: '',
          autoPrice: false,
          priceRange: { min: '9.99', max: '49.99' }
        };
      }

      return {
        personality: data.personality,
        complexity: data.complexity,
        length: data.length,
        style: data.style,
        guidelines: data.guidelines || '',
        defaultSection: data.default_section || '',
        autoPrice: data.auto_price,
        priceRange: { 
          min: data.price_range_min?.toString() || '9.99', 
          max: data.price_range_max?.toString() || '49.99' 
        }
      };
    } catch (error: any) {
      console.error('Error getting AI settings:', error);
      throw new Error(`Error getting AI settings: ${error.message}`);
    }
  }

  async saveAISettings(settings: any) {
    try {
      // Verificar se já existe uma configuração
      const { data: existing } = await this.supabase
        .from('ai_settings')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      const settingsData = {
        personality: settings.personality,
        complexity: settings.complexity,
        length: settings.length,
        style: settings.style,
        guidelines: settings.guidelines || '',
        default_section: settings.defaultSection || '',
        auto_price: settings.autoPrice || false,
        price_range_min: parseFloat(settings.priceRange?.min || '9.99'),
        price_range_max: parseFloat(settings.priceRange?.max || '49.99'),
        updated_at: new Date().toISOString()
      };

      if (existing) {
        // Atualizar configuração existente
        const { data, error } = await this.supabase
          .from('ai_settings')
          .update(settingsData)
          .eq('id', existing.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Criar nova configuração
        const { data, error } = await this.supabase
          .from('ai_settings')
          .insert(settingsData)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    } catch (error: any) {
      console.error('Error saving AI settings:', error);
      throw new Error(`Error saving AI settings: ${error.message}`);
    }
  }

  // GERENCIAR CONFIGURAÇÕES DO SISTEMA
  async getSystemSettings() {
    try {
      const { data, error } = await this.supabase
        .from('system_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      // Se não existe configuração, retornar valores padrão
      if (!data) {
        return {
          siteName: 'Templo do Abismo',
          siteDescription: 'Portal de ensinamentos luciferianos',
          siteKeywords: 'lucifer, ocultismo, magia, grimórios',
          adminEmail: 'admin@templodoabismo.com.br',
          contentLanguage: 'português',
          contentTone: 'formal',
          contentTargetAudience: 'iniciantes',
          enableUserRegistration: true,
          enablePaidContent: true,
          enableAIGeneration: true,
          securityLevel: 'medium',
          enableContentProtection: true,
          enableDownloadProtection: true
        };
      }

      return {
        siteName: data.site_name,
        siteDescription: data.site_description,
        siteKeywords: data.site_keywords,
        adminEmail: data.admin_email,
        contentLanguage: data.content_language,
        contentTone: data.content_tone,
        contentTargetAudience: data.content_target_audience,
        enableUserRegistration: data.enable_user_registration,
        enablePaidContent: data.enable_paid_content,
        enableAIGeneration: data.enable_ai_generation,
        securityLevel: data.security_level,
        enableContentProtection: data.enable_content_protection,
        enableDownloadProtection: data.enable_download_protection
      };
    } catch (error: any) {
      console.error('Error getting system settings:', error);
      throw new Error(`Error getting system settings: ${error.message}`);
    }
  }

  async saveSystemSettings(settings: any) {
    try {
      // Verificar se já existe uma configuração
      const { data: existing } = await this.supabase
        .from('system_settings')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      const settingsData = {
        site_name: settings.siteName || 'Templo do Abismo',
        site_description: settings.siteDescription || 'Portal de ensinamentos luciferianos',
        site_keywords: settings.siteKeywords || 'lucifer, ocultismo, magia, grimórios',
        admin_email: settings.adminEmail || 'admin@templodoabismo.com',
        content_language: settings.contentLanguage || 'português',
        content_tone: settings.contentTone || 'formal',
        content_target_audience: settings.contentTargetAudience || 'iniciantes',
        enable_user_registration: settings.enableUserRegistration !== undefined ? settings.enableUserRegistration : true,
        enable_paid_content: settings.enablePaidContent !== undefined ? settings.enablePaidContent : true,
        enable_ai_generation: settings.enableAIGeneration !== undefined ? settings.enableAIGeneration : true,
        security_level: settings.securityLevel || 'medium',
        enable_content_protection: settings.enableContentProtection !== undefined ? settings.enableContentProtection : true,
        enable_download_protection: settings.enableDownloadProtection !== undefined ? settings.enableDownloadProtection : true,
        updated_at: new Date().toISOString()
      };

      if (existing) {
        // Atualizar configuração existente
        const { data, error } = await this.supabase
          .from('system_settings')
          .update(settingsData)
          .eq('id', existing.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Criar nova configuração
        const { data, error } = await this.supabase
          .from('system_settings')
          .insert(settingsData)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    } catch (error: any) {
      console.error('Error saving system settings:', error);
      throw new Error(`Error saving system settings: ${error.message}`);
    }
  }

  // GERAR IMAGEM COM IA (DALL-E)
  async generateImageWithAI(prompt: string): Promise<{ imageUrl: string }> {
    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
      }

      const OpenAI = require('openai');
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "vivid"
      });

      if (!response.data || !response.data[0] || !response.data[0].url) {
        throw new Error('No image URL received from OpenAI');
      }

      return {
        imageUrl: response.data[0].url
      };
    } catch (error: any) {
      console.error('Error generating image with AI:', error);
      throw new Error(`Error generating image with AI: ${error.message}`);
    }
  }
}

export const supabaseService = new SupabaseService();