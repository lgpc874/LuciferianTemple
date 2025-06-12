import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { createClient } from '@supabase/supabase-js';
import { users, grimoires, chapters, userProgress, type User, type InsertUser, type Grimoire, type Chapter, type UserProgress, type InsertProgress } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  initializeDatabase(): Promise<void>;
  
  // Grimoire methods
  getGrimoires(): Promise<Grimoire[]>;
  getGrimoireById(id: number): Promise<Grimoire | undefined>;
  getChaptersByGrimoire(grimoireId: number): Promise<Chapter[]>;
  getChapterById(id: number): Promise<Chapter | undefined>;
  
  // User progress methods
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getUserProgressByGrimoire(userId: number, grimoireId: number): Promise<UserProgress[]>;
  saveReadingProgress(progress: InsertProgress): Promise<UserProgress>;
  markChapterCompleted(userId: number, chapterId: number, readingTime: number): Promise<UserProgress>;
  getUnlockedGrimoires(userId: number): Promise<number[]>;
  getUnlockedChapters(userId: number, grimoireId: number): Promise<number[]>;
}

export class SupabaseStorage implements IStorage {
  private supabaseClient: any = null;

  private getSupabaseClient() {
    if (!this.supabaseClient && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      this.supabaseClient = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY
      );
    }
    return this.supabaseClient;
  }

  async initializeDatabase(): Promise<void> {
    try {
      const client = this.getSupabaseClient();
      if (client) {
        // Test connection by attempting a simple query
        const { error } = await client.from('users').select('count', { count: 'exact', head: true });
        
        if (error && error.code === 'PGRST116') {
          console.log("Users table doesn't exist - please create it in Supabase dashboard");
          console.log("SQL: CREATE TABLE users (id SERIAL PRIMARY KEY, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL);");
        } else if (error) {
          throw new Error(`Supabase error: ${error.message}`);
        }
        
        console.log("Supabase connection established successfully");
      }
    } catch (error) {
      console.error("Supabase connection error:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    try {
      const client = this.getSupabaseClient();
      if (!client) return undefined;
      
      const { data, error } = await client
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return undefined; // No rows found
        console.error('Error fetching user:', error);
        return undefined;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const client = this.getSupabaseClient();
      if (!client) return undefined;
      
      const { data, error } = await client
        .from('users')
        .select('*')
        .eq('username', username)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return undefined; // No rows found
        console.error('Error fetching user by username:', error);
        return undefined;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const client = this.getSupabaseClient();
      if (!client) return undefined;
      
      const { data, error } = await client
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return undefined; // No rows found
        console.error('Error fetching user by email:', error);
        return undefined;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const client = this.getSupabaseClient();
    if (!client) throw new Error('Database connection failed');
    
    const { data, error } = await client
      .from('users')
      .insert(insertUser)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
    
    return data;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private grimoires: Map<number, Grimoire>;
  private chapters: Map<number, Chapter>;
  private userProgress: Map<string, UserProgress>;
  currentId: number;
  currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.grimoires = new Map();
    this.chapters = new Map();
    this.userProgress = new Map();
    this.currentId = 1;
    this.currentProgressId = 1;
    this.initializeGrimoires();
  }

  private initializeGrimoires() {
    // Inicializa grimórios com dados das categorias
    const grimoireCategories = [
      {
        id: 1,
        title: "Introdução ao Ocultismo",
        description: "Conceitos básicos para os buscadores do Despertar",
        category: "introducao-ocultismo",
        difficultyLevel: 1,
        unlockOrder: 1
      },
      {
        id: 2,
        title: "Lúcifer e o Caminho da Luz Negra",
        description: "Uma introdução ao luciferianismo filosófico e espiritual",
        category: "lucifer-luz-negra",
        difficultyLevel: 2,
        unlockOrder: 2
      },
      {
        id: 3,
        title: "Lilith e o Poder da Sombra Feminina",
        description: "O despertar da força oculta da Mãe Noturna",
        category: "lilith-sombra-feminina",
        difficultyLevel: 2,
        unlockOrder: 3
      },
      {
        id: 4,
        title: "Simbolismo e Sigilos",
        description: "O poder dos símbolos arcanos",
        category: "simbolismo-sigilos",
        difficultyLevel: 3,
        unlockOrder: 4
      },
      {
        id: 5,
        title: "Textos Filosóficos e Reflexões",
        description: "Escritos para provocar a alma e questionar os dogmas",
        category: "textos-filosoficos",
        difficultyLevel: 4,
        unlockOrder: 5
      },
      {
        id: 6,
        title: "Meditações e Práticas Simples",
        description: "Exercícios seguros para quem está começando",
        category: "meditacoes-praticas",
        difficultyLevel: 1,
        unlockOrder: 6
      }
    ];
    
    grimoireCategories.forEach((cat) => {
      const grimoire: Grimoire = {
        id: cat.id,
        title: cat.title,
        description: cat.description,
        coverImageUrl: `svg-${cat.category}`,
        category: cat.category,
        difficultyLevel: cat.difficultyLevel,
        unlockOrder: cat.unlockOrder,
        isActive: true,
        createdAt: new Date()
      };
      this.grimoires.set(grimoire.id, grimoire);

      // Cria capítulos de exemplo para cada grimório
      for (let i = 1; i <= 5; i++) {
        const chapterId = cat.id * 10 + i;
        const chapter: Chapter = {
          id: chapterId,
          grimoireId: cat.id,
          title: `Capítulo ${i}: ${this.getChapterTitle(cat.category, i)}`,
          content: this.getChapterContent(cat.category, i),
          chapterOrder: i,
          estimatedReadingTime: 10 + i * 2,
          unlockCriteria: i === 1 ? 'always_unlocked' : 'previous_chapter',
          createdAt: new Date()
        };
        this.chapters.set(chapterId, chapter);
      }
    });
  }

  private getChapterTitle(category: string, chapterNum: number): string {
    const titles: { [key: string]: string[] } = {
      'introducao-ocultismo': [
        'O Despertar da Consciência',
        'Símbolos e Significados',
        'A Natureza do Oculto',
        'Práticas Iniciais',
        'O Caminho Adiante'
      ],
      'lucifer-luz-negra': [
        'O Portador da Luz',
        'Filosofia Luciferiana',
        'A Rebelião Sagrada',
        'Iluminação através das Trevas',
        'O Conhecimento Proibido'
      ],
      'lilith-sombra-feminina': [
        'A Primeira Mulher',
        'O Poder da Noite',
        'Despertar da Sombra',
        'A Mãe das Trevas',
        'Integração dos Opostos'
      ],
      'simbolismo-sigilos': [
        'A Linguagem dos Símbolos',
        'Criação de Sigilos',
        'Ativação e Manifestação',
        'Geometria Sagrada',
        'Símbolos de Poder'
      ],
      'textos-filosoficos': [
        'Questionando a Realidade',
        'A Natureza do Bem e do Mal',
        'Liberdade e Responsabilidade',
        'O Caminho do Autoconhecimento',
        'Síntese Filosófica'
      ],
      'meditacoes-praticas': [
        'Preparação e Ambiente',
        'Técnicas de Respiração',
        'Visualização Básica',
        'Meditação em Movimento',
        'Integração Diária'
      ]
    };
    return titles[category]?.[chapterNum - 1] || `Capítulo ${chapterNum}`;
  }

  private getChapterContent(category: string, chapterNum: number): string {
    return `Este é o conteúdo do capítulo ${chapterNum} de ${category}. 
    
Aqui você encontrará ensinamentos profundos e práticos sobre este aspecto específico do conhecimento esotérico. 

[O conteúdo completo seria muito extenso para incluir aqui, mas este é um exemplo de como o sistema de progressão funciona]

Cada capítulo contém:
- Teoria fundamental
- Exercícios práticos
- Reflexões guiadas
- Material de aprofundamento

Continue lendo para desbloquear o próximo capítulo...`;
  }

  async initializeDatabase(): Promise<void> {
    // No-op for memory storage
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Grimoire methods
  async getGrimoires(): Promise<Grimoire[]> {
    return Array.from(this.grimoires.values()).sort((a, b) => a.unlockOrder - b.unlockOrder);
  }

  async getGrimoireById(id: number): Promise<Grimoire | undefined> {
    return this.grimoires.get(id);
  }

  async getChaptersByGrimoire(grimoireId: number): Promise<Chapter[]> {
    return Array.from(this.chapters.values())
      .filter(chapter => chapter.grimoireId === grimoireId)
      .sort((a, b) => a.chapterOrder - b.chapterOrder);
  }

  async getChapterById(id: number): Promise<Chapter | undefined> {
    return this.chapters.get(id);
  }

  // User progress methods
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.userId === userId);
  }

  async getUserProgressByGrimoire(userId: number, grimoireId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.userId === userId && progress.grimoireId === grimoireId);
  }

  async saveReadingProgress(progress: InsertProgress): Promise<UserProgress> {
    const id = this.currentProgressId++;
    const newProgress: UserProgress = {
      id,
      userId: progress.userId,
      grimoireId: progress.grimoireId,
      chapterId: progress.chapterId || null,
      progressType: progress.progressType,
      readingTime: progress.readingTime || null,
      completedAt: new Date()
    };
    
    const key = `${progress.userId}-${progress.grimoireId}-${progress.chapterId || 'general'}-${progress.progressType}`;
    this.userProgress.set(key, newProgress);
    return newProgress;
  }

  async markChapterCompleted(userId: number, chapterId: number, readingTime: number): Promise<UserProgress> {
    const chapter = await this.getChapterById(chapterId);
    if (!chapter) {
      throw new Error('Chapter not found');
    }

    return this.saveReadingProgress({
      userId,
      grimoireId: chapter.grimoireId,
      chapterId,
      progressType: 'chapter_completed',
      readingTime
    });
  }

  async getUnlockedGrimoires(userId: number): Promise<number[]> {
    const unlockedIds = [1]; // Primeiro grimório sempre desbloqueado
    
    const progress = await this.getUserProgress(userId);
    const completedGrimoires = progress
      .filter(p => p.progressType === 'grimoire_completed')
      .map(p => p.grimoireId);
    
    const grimoires = await this.getGrimoires();
    for (const grimoire of grimoires) {
      if (grimoire.unlockOrder <= completedGrimoires.length + 1) {
        if (!unlockedIds.includes(grimoire.id)) {
          unlockedIds.push(grimoire.id);
        }
      }
    }
    
    return unlockedIds;
  }

  async getUnlockedChapters(userId: number, grimoireId: number): Promise<number[]> {
    const chapters = await this.getChaptersByGrimoire(grimoireId);
    const progress = await this.getUserProgressByGrimoire(userId, grimoireId);
    
    const completedChapters = progress
      .filter(p => p.progressType === 'chapter_completed')
      .map(p => p.chapterId)
      .filter(id => id !== null) as number[];
    
    const unlockedIds = chapters.length > 0 ? [chapters[0].id] : [];
    
    for (let i = 0; i < chapters.length - 1; i++) {
      if (completedChapters.includes(chapters[i].id)) {
        unlockedIds.push(chapters[i + 1].id);
      }
    }
    
    return unlockedIds;
  }
}

// Use Supabase if DATABASE_URL is available, otherwise fallback to memory
// Create storage instance with smart fallback
class HybridStorage implements IStorage {
  private supabaseStorage: SupabaseStorage;
  private memStorage: MemStorage;
  private useSupabase: boolean = false;

  constructor() {
    this.supabaseStorage = new SupabaseStorage();
    this.memStorage = new MemStorage();
  }

  async initializeDatabase(): Promise<void> {
    if (process.env.DATABASE_URL) {
      try {
        await this.supabaseStorage.initializeDatabase();
        this.useSupabase = true;
        console.log("✓ Using Supabase storage");
      } catch (error) {
        console.warn("⚠️  Supabase failed, using memory storage");
        await this.memStorage.initializeDatabase();
        this.useSupabase = false;
      }
    } else {
      await this.memStorage.initializeDatabase();
      this.useSupabase = false;
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.useSupabase 
      ? this.supabaseStorage.getUser(id)
      : this.memStorage.getUser(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.useSupabase 
      ? this.supabaseStorage.getUserByUsername(username)
      : this.memStorage.getUserByUsername(username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.useSupabase 
      ? this.supabaseStorage.getUserByEmail(email)
      : this.memStorage.getUserByEmail(email);
  }

  async createUser(user: InsertUser): Promise<User> {
    return this.useSupabase 
      ? this.supabaseStorage.createUser(user)
      : this.memStorage.createUser(user);
  }
}

export const storage = new HybridStorage();
