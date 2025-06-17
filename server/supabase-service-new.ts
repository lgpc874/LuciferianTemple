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
  InsertProgress,
  User,
  InsertUser,
  GrimoirePurchase,
  AISettings,
  SystemSettings
} from '@shared/schema';

// Inicializar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Inicializar Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export class SupabaseServiceNew {
  private supabase;
  private adminClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL || 'https://nqexwgnscvpfhuonbafr.supabase.co';
    const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZXh3Z25zY3ZwZmh1b25iYWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MjYzNDAsImV4cCI6MjA2NTMwMjM0MH0.Kx0FaGAPjCTY31F40zhVTKwiaJXswYpeX9Z75v4ZrBY';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZXh3Z25zY3ZwZmh1b25iYWZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTcyNjM0MCwiZXhwIjoyMDY1MzAyMzQwfQ.ERK-PGWpodJX4WC_84IYW4pwbwkfmcICFFS5oXBsGlk';
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.adminClient = createClient(supabaseUrl, serviceRoleKey);
  }

  // ======================
  // USUÁRIOS
  // ======================
  async getUserById(id: number): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) return null;
    return data;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const { data, error } = await this.adminClient
      .from('users')
      .insert(userData)
      .select()
      .single();

    if (error) throw new Error(`Erro ao criar usuário: ${error.message}`);
    return data;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User> {
    const { data, error } = await this.adminClient
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    return data;
  }

  // ======================
  // SEÇÕES DA BIBLIOTECA
  // ======================
  async getLibrarySections(): Promise<LibrarySection[]> {
    const { data, error } = await this.supabase
      .from('library_sections')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (error) throw new Error(`Erro ao buscar seções: ${error.message}`);
    return data || [];
  }

  async createLibrarySection(sectionData: InsertLibrarySection): Promise<LibrarySection> {
    const { data, error } = await this.adminClient
      .from('library_sections')
      .insert(sectionData)
      .select()
      .single();

    if (error) throw new Error(`Erro ao criar seção: ${error.message}`);
    return data;
  }

  async updateLibrarySection(id: number, updates: Partial<InsertLibrarySection>): Promise<LibrarySection> {
    const { data, error } = await this.adminClient
      .from('library_sections')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erro ao atualizar seção: ${error.message}`);
    return data;
  }

  async deleteLibrarySection(id: number): Promise<void> {
    const { error } = await this.adminClient
      .from('library_sections')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Erro ao deletar seção: ${error.message}`);
  }

  // ======================
  // GRIMÓRIOS
  // ======================
  async getGrimoires(): Promise<Grimoire[]> {
    const { data, error } = await this.supabase
      .from('grimoires')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erro ao buscar grimórios: ${error.message}`);
    return data || [];
  }

  async getGrimoireById(id: number): Promise<Grimoire | null> {
    const { data, error } = await this.supabase
      .from('grimoires')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }

  async getGrimoiresBySection(sectionId: number): Promise<Grimoire[]> {
    const { data, error } = await this.supabase
      .from('grimoires')
      .select('*')
      .eq('section_id', sectionId)
      .eq('is_published', true)
      .order('unlock_order');

    if (error) throw new Error(`Erro ao buscar grimórios da seção: ${error.message}`);
    return data || [];
  }

  async createGrimoire(grimoireData: InsertGrimoire): Promise<Grimoire> {
    const { data, error } = await this.adminClient
      .from('grimoires')
      .insert(grimoireData)
      .select()
      .single();

    if (error) throw new Error(`Erro ao criar grimório: ${error.message}`);
    return data;
  }

  async updateGrimoire(id: number, updates: Partial<InsertGrimoire>): Promise<Grimoire> {
    const { data, error } = await this.adminClient
      .from('grimoires')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erro ao atualizar grimório: ${error.message}`);
    return data;
  }

  async deleteGrimoire(id: number): Promise<void> {
    // Deletar capítulos relacionados primeiro
    await this.adminClient
      .from('chapters')
      .delete()
      .eq('grimoire_id', id);

    // Deletar progresso relacionado
    await this.adminClient
      .from('user_progress')
      .delete()
      .eq('grimoire_id', id);

    // Deletar o grimório
    const { error } = await this.adminClient
      .from('grimoires')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Erro ao deletar grimório: ${error.message}`);
  }

  // ======================
  // CAPÍTULOS
  // ======================
  async getChaptersByGrimoire(grimoireId: number): Promise<Chapter[]> {
    const { data, error } = await this.supabase
      .from('chapters')
      .select('*')
      .eq('grimoire_id', grimoireId)
      .eq('is_published', true)
      .order('chapter_order');

    if (error) throw new Error(`Erro ao buscar capítulos: ${error.message}`);
    return data || [];
  }

  async createChapter(chapterData: InsertChapter): Promise<Chapter> {
    const { data, error } = await this.adminClient
      .from('chapters')
      .insert(chapterData)
      .select()
      .single();

    if (error) throw new Error(`Erro ao criar capítulo: ${error.message}`);
    return data;
  }

  async updateChapter(id: number, updates: Partial<InsertChapter>): Promise<Chapter> {
    const { data, error } = await this.adminClient
      .from('chapters')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erro ao atualizar capítulo: ${error.message}`);
    return data;
  }

  async deleteChapter(id: number): Promise<void> {
    const { error } = await this.adminClient
      .from('chapters')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Erro ao deletar capítulo: ${error.message}`);
  }

  // ======================
  // PROGRESSO DO USUÁRIO
  // ======================
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    const { data, error } = await this.supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('last_read_at', { ascending: false });

    if (error) throw new Error(`Erro ao buscar progresso: ${error.message}`);
    return data || [];
  }

  async saveUserProgress(progressData: InsertProgress): Promise<UserProgress> {
    const { data, error } = await this.adminClient
      .from('user_progress')
      .upsert(progressData, {
        onConflict: 'user_id,grimoire_id'
      })
      .select()
      .single();

    if (error) throw new Error(`Erro ao salvar progresso: ${error.message}`);
    return data;
  }

  // ======================
  // CONFIGURAÇÕES DE IA
  // ======================
  async getAISettings(): Promise<AISettings | null> {
    const { data, error } = await this.supabase
      .from('ai_settings')
      .select('*')
      .eq('setting_name', 'global')
      .single();

    if (error) return null;
    return data;
  }

  async saveAISettings(settings: Partial<AISettings>): Promise<AISettings> {
    const { data, error } = await this.adminClient
      .from('ai_settings')
      .upsert({
        setting_name: 'global',
        ...settings
      }, {
        onConflict: 'setting_name'
      })
      .select()
      .single();

    if (error) throw new Error(`Erro ao salvar configurações IA: ${error.message}`);
    return data;
  }

  // ======================
  // CONFIGURAÇÕES DO SISTEMA
  // ======================
  async getSystemSettings(): Promise<SystemSettings[]> {
    const { data, error } = await this.supabase
      .from('system_settings')
      .select('*');

    if (error) throw new Error(`Erro ao buscar configurações: ${error.message}`);
    return data || [];
  }

  async saveSystemSettings(settings: { category: string; key: string; value: string; type?: string }[]): Promise<void> {
    const settingsData = settings.map(s => ({
      setting_category: s.category,
      setting_key: s.key,
      setting_value: s.value,
      setting_type: s.type || 'text'
    }));

    const { error } = await this.adminClient
      .from('system_settings')
      .upsert(settingsData, {
        onConflict: 'setting_category,setting_key'
      });

    if (error) throw new Error(`Erro ao salvar configurações: ${error.message}`);
  }

  // ======================
  // GERAÇÃO COM IA
  // ======================
  async generateGrimoireWithAI(prompt: string, sectionId?: number): Promise<{
    title: string;
    content: string;
    excerpt: string;
    estimated_read_time: number;
    word_count: number;
  }> {
    try {
      const aiSettings = await this.getAISettings();
      
      const systemPrompt = `Você é um especialista em ocultismo luciferiano criando grimórios autênticos.
      
Personalidade: ${aiSettings?.personality || 'luciferian'}
Complexidade: ${aiSettings?.complexity || 'beginner'}
Estilo: ${aiSettings?.style || 'mixed'}
Diretrizes: ${aiSettings?.guidelines || 'Mantenha linguagem acessível mas profunda'}

IMPORTANTE: Retorne APENAS um objeto JSON válido com as seguintes propriedades:
- title: string (título do grimório)
- content: string (conteúdo HTML completo do grimório)
- excerpt: string (resumo de 2-3 frases)
- estimated_read_time: number (tempo estimado em minutos)
- word_count: number (contagem de palavras)

O conteúdo deve ser um grimório completo e substancial em HTML formatado.`;

      const response = await openai.chat.completions.create({
        model: aiSettings?.model_name || 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: aiSettings?.max_tokens || 4000,
        temperature: Number(aiSettings?.temperature) || 0.7
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('Nenhum conteúdo gerado pela IA');

      // Parse do JSON retornado pela IA
      try {
        return JSON.parse(content);
      } catch {
        // Fallback se a IA não retornou JSON válido
        const wordCount = content.split(/\s+/).length;
        return {
          title: prompt.slice(0, 100),
          content: content,
          excerpt: content.slice(0, 200) + '...',
          estimated_read_time: Math.ceil(wordCount / 200),
          word_count: wordCount
        };
      }
    } catch (error: any) {
      throw new Error(`Erro na geração com IA: ${error.message}`);
    }
  }

  // ======================
  // ANALYTICS E ESTATÍSTICAS
  // ======================
  async getOverviewStats(): Promise<{
    totalUsers: number;
    totalGrimoires: number;
    totalSections: number;
    totalChapters: number;
    totalProgress: number;
    recentUsers: any[];
    recentGrimoires: any[];
    sectionStats: any[];
  }> {
    try {
      // Estatísticas gerais
      const [
        { count: totalUsers },
        { count: totalGrimoires },
        { count: totalSections },
        { count: totalChapters },
        { count: totalProgress }
      ] = await Promise.all([
        this.supabase.from('users').select('*', { count: 'exact', head: true }),
        this.supabase.from('grimoires').select('*', { count: 'exact', head: true }),
        this.supabase.from('library_sections').select('*', { count: 'exact', head: true }),
        this.supabase.from('chapters').select('*', { count: 'exact', head: true }),
        this.supabase.from('user_progress').select('*', { count: 'exact', head: true })
      ]);

      // Usuários recentes
      const { data: recentUsers } = await this.supabase
        .from('users')
        .select('id, email, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      // Grimórios recentes
      const { data: recentGrimoires } = await this.supabase
        .from('grimoires')
        .select('id, title, section_id, created_at, is_paid, price')
        .order('created_at', { ascending: false })
        .limit(5);

      // Estatísticas por seção
      const { data: sectionStats } = await this.supabase
        .rpc('get_section_stats');

      return {
        totalUsers: totalUsers || 0,
        totalGrimoires: totalGrimoires || 0,
        totalSections: totalSections || 0,
        totalChapters: totalChapters || 0,
        totalProgress: totalProgress || 0,
        recentUsers: recentUsers || [],
        recentGrimoires: recentGrimoires || [],
        sectionStats: sectionStats || []
      };
    } catch (error: any) {
      console.error('Erro ao buscar estatísticas:', error);
      return {
        totalUsers: 0,
        totalGrimoires: 0,
        totalSections: 0,
        totalChapters: 0,
        totalProgress: 0,
        recentUsers: [],
        recentGrimoires: [],
        sectionStats: []
      };
    }
  }

  // ======================
  // PAGAMENTOS
  // ======================
  async createPaymentIntent(grimoireId: number, amount: number): Promise<{ clientSecret: string }> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Converter para centavos
        currency: 'brl',
        metadata: {
          grimoire_id: grimoireId.toString()
        }
      });

      return { clientSecret: paymentIntent.client_secret! };
    } catch (error: any) {
      throw new Error(`Erro ao criar payment intent: ${error.message}`);
    }
  }

  async processPaymentConfirmed(paymentIntentId: string, userId: number): Promise<void> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded') {
        const grimoireId = parseInt(paymentIntent.metadata.grimoire_id);
        
        await this.adminClient
          .from('grimoire_purchases')
          .insert({
            user_id: userId,
            grimoire_id: grimoireId,
            payment_intent_id: paymentIntentId,
            amount: (paymentIntent.amount / 100).toString(),
            status: 'completed'
          });
      }
    } catch (error: any) {
      throw new Error(`Erro ao processar pagamento: ${error.message}`);
    }
  }

  async hasUserAccess(userId: number, grimoireId: number): Promise<boolean> {
    try {
      // Verificar se é gratuito
      const grimoire = await this.getGrimoireById(grimoireId);
      if (!grimoire?.is_paid) return true;

      // Verificar se usuário comprou
      const { data: purchase } = await this.supabase
        .from('grimoire_purchases')
        .select('id')
        .eq('user_id', userId)
        .eq('grimoire_id', grimoireId)
        .eq('status', 'completed')
        .single();

      return !!purchase;
    } catch {
      return false;
    }
  }

  // ======================
  // INICIALIZAÇÃO
  // ======================
  async initializeDefaultSections(): Promise<void> {
    const defaultSections = [
      { name: 'Atrium Ignis', description: 'Textos preparatórios para iniciantes no caminho luciferiano', sort_order: 1, color_scheme: '#8b0000' },
      { name: 'Porta Umbrae', description: 'Conhecimentos intermediários sobre magia e filosofia das sombras', sort_order: 2, color_scheme: '#6a0dad' },
      { name: 'Arcana Noctis', description: 'Segredos avançados de magia cerimonial e gnose luciferiana', sort_order: 3, color_scheme: '#003366' },
      { name: 'Via Tenebris', description: 'Caminhos superiores de maestria e transcendência', sort_order: 4, color_scheme: '#111111' },
      { name: 'Templo do Abismo', description: 'Santuário dos mistérios mais profundos canalizados das divindades primordiais', sort_order: 5, color_scheme: '#1a0a0a' }
    ];

    for (const section of defaultSections) {
      try {
        await this.createLibrarySection(section);
      } catch (error) {
        // Seção já existe, continuar
        console.log(`Seção ${section.name} já existe ou erro:`, error);
      }
    }
  }

  // ======================
  // DIAGNÓSTICO
  // ======================
  async testConnection(): Promise<{ status: string; details: any }> {
    try {
      const { data, error } = await this.adminClient
        .from('users')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        return {
          status: 'ERROR',
          details: {
            message: 'Erro na conexão',
            error: error.message
          }
        };
      }

      return {
        status: 'SUCCESS',
        details: {
          message: 'Conexão funcionando perfeitamente',
          admin_privileges: true
        }
      };
    } catch (error: any) {
      return {
        status: 'CRITICAL',
        details: {
          message: 'Falha crítica',
          error: error.message
        }
      };
    }
  }
}

export const supabaseServiceNew = new SupabaseServiceNew();