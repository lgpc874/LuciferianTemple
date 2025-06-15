import { createClient } from '@supabase/supabase-js';
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
      .order('display_order');

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
}

export const supabaseService = new SupabaseService();