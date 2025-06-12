import { type Grimoire, type Chapter, type UserProgress, type InsertProgress } from "@shared/schema";

// Sistema simples de dados em memória para grimórios e progresso
class GrimoireDataStore {
  private grimoires: Map<number, Grimoire> = new Map();
  private chapters: Map<number, Chapter> = new Map();
  private userProgress: Map<string, UserProgress> = new Map();
  private progressIdCounter = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    const grimoireCategories = [
      {
        id: 1,
        title: "Introdução ao Ocultismo",
        description: "Conceitos fundamentais para iniciantes",
        category: "introducao-ocultismo",
        difficultyLevel: 1,
        unlockOrder: 1
      },
      {
        id: 2,
        title: "Lúcifer e o Caminho da Luz Negra",
        description: "Primeiras lições sobre o luciferianismo",
        category: "lucifer-luz-negra",
        difficultyLevel: 1,
        unlockOrder: 2
      },
      {
        id: 3,
        title: "Lilith e o Poder da Sombra Feminina",
        description: "Introdução aos mistérios da Mãe Noturna",
        category: "lilith-sombra-feminina",
        difficultyLevel: 1,
        unlockOrder: 3
      },
      {
        id: 4,
        title: "Simbolismo e Sigilos Básicos",
        description: "Primeiros passos com símbolos arcanos",
        category: "simbolismo-sigilos",
        difficultyLevel: 1,
        unlockOrder: 4
      },
      {
        id: 5,
        title: "Reflexões Filosóficas Iniciais",
        description: "Primeiras contemplações para novos buscadores",
        category: "textos-filosoficos",
        difficultyLevel: 1,
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

    // Inicializa grimórios
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

      // Cria capítulos para cada grimório
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

  // Métodos públicos
  getGrimoires(): Grimoire[] {
    return Array.from(this.grimoires.values()).sort((a, b) => a.unlockOrder - b.unlockOrder);
  }

  getGrimoireById(id: number): Grimoire | undefined {
    return this.grimoires.get(id);
  }

  getChaptersByGrimoire(grimoireId: number): Chapter[] {
    return Array.from(this.chapters.values())
      .filter(chapter => chapter.grimoireId === grimoireId)
      .sort((a, b) => a.chapterOrder - b.chapterOrder);
  }

  getChapterById(id: number): Chapter | undefined {
    return this.chapters.get(id);
  }

  getUserProgress(userId: number): UserProgress[] {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.userId === userId);
  }

  getUserProgressByGrimoire(userId: number, grimoireId: number): UserProgress[] {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.userId === userId && progress.grimoireId === grimoireId);
  }

  saveReadingProgress(progress: InsertProgress): UserProgress {
    const id = this.progressIdCounter++;
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

  markChapterCompleted(userId: number, chapterId: number, readingTime: number): UserProgress {
    const chapter = this.getChapterById(chapterId);
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

  getUnlockedGrimoires(userId: number): number[] {
    const unlockedIds = [1]; // Primeiro grimório sempre desbloqueado
    
    const progress = this.getUserProgress(userId);
    const completedGrimoires = progress
      .filter(p => p.progressType === 'grimoire_completed')
      .map(p => p.grimoireId);
    
    const grimoires = this.getGrimoires();
    for (const grimoire of grimoires) {
      if (grimoire.unlockOrder <= completedGrimoires.length + 1) {
        if (!unlockedIds.includes(grimoire.id)) {
          unlockedIds.push(grimoire.id);
        }
      }
    }
    
    return unlockedIds;
  }

  getUnlockedChapters(userId: number, grimoireId: number): number[] {
    const chapters = this.getChaptersByGrimoire(grimoireId);
    const progress = this.getUserProgressByGrimoire(userId, grimoireId);
    
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

// Singleton para manter os dados durante a sessão
export const grimoireStore = new GrimoireDataStore();