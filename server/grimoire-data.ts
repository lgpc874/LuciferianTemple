import { type Grimoire, type Chapter, type UserProgress, type InsertProgress } from "@shared/schema";
import { createClient } from "@supabase/supabase-js";

// Sistema híbrido: dados em memória com sincronização Supabase
class GrimoireDataStore {
  private grimoires: Map<number, Grimoire> = new Map();
  private chapters: Map<number, Chapter> = new Map();
  private userProgress: Map<string, UserProgress> = new Map();
  private progressIdCounter = 1;
  private isInitialized = false;

  constructor() {
    this.initializeData().catch(console.error);
  }

  private getSupabaseClient() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return null;
    }
    
    return createClient(supabaseUrl, supabaseKey);
  }

  private async loadFromSupabase() {
    const supabase = this.getSupabaseClient();
    if (!supabase) return false;

    try {
      // Carregar grimórios
      const { data: grimoires, error: grimoireError } = await supabase
        .from('grimoires')
        .select('*')
        .order('unlock_order');

      if (!grimoireError && grimoires) {
        this.grimoires.clear();
        grimoires.forEach(grimoire => {
          this.grimoires.set(grimoire.id, grimoire);
        });
      }

      // Carregar capítulos
      const { data: chapters, error: chapterError } = await supabase
        .from('chapters')
        .select('*')
        .order('grimoire_id, chapter_order');

      if (!chapterError && chapters) {
        this.chapters.clear();
        chapters.forEach(chapter => {
          this.chapters.set(chapter.id, chapter);
        });
      }

      console.log(`Loaded ${grimoires?.length || 0} grimoires and ${chapters?.length || 0} chapters from Supabase`);
      return true;
    } catch (error) {
      console.error('Error loading from Supabase:', error);
      return false;
    }
  }

  private async saveGrimoireToSupabase(grimoire: Omit<Grimoire, 'id' | 'createdAt'>) {
    const supabase = this.getSupabaseClient();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('grimoires')
        .insert([grimoire])
        .select()
        .single();

      if (error) {
        console.error('Error saving grimoire to Supabase:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error saving grimoire to Supabase:', error);
      return null;
    }
  }

  private async saveChapterToSupabase(chapter: Omit<Chapter, 'id' | 'createdAt'>) {
    const supabase = this.getSupabaseClient();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('chapters')
        .insert([chapter])
        .select()
        .single();

      if (error) {
        console.error('Error saving chapter to Supabase:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error saving chapter to Supabase:', error);
      return null;
    }
  }

  private async initializeData() {
    if (this.isInitialized) return;

    // Tentar carregar dados do Supabase primeiro
    const loadedFromSupabase = await this.loadFromSupabase();
    
    // Se não conseguiu carregar do Supabase ou não há dados, criar dados padrão
    if (!loadedFromSupabase || this.grimoires.size === 0) {
      this.createDefaultData();
    }

    this.isInitialized = true;
  }

  private createDefaultData() {
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

      // Cria capítulos para cada grimório - número específico por categoria
      const chapterCount = cat.category === 'introducao-ocultismo' ? 7 : 5; // 6 capítulos + epílogo para intro
      for (let i = 1; i <= chapterCount; i++) {
        const chapterId = cat.id * 10 + i;
        const chapter: Chapter = {
          id: chapterId,
          grimoireId: cat.id,
          title: this.getChapterTitle(cat.category, i),
          content: this.getChapterContent(cat.category, i),
          chapterOrder: i,
          estimatedReadingTime: i <= 6 ? 15 + i * 3 : 10, // Epílogo mais curto
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
        'A Trilha Oculta',
        'As Três Chaves da Abertura',
        'As Trilhas da Sombra e da Luz',
        'O Grimório Vivo',
        'O Canto dos Símbolos',
        'Silêncio, Foco e Altar',
        'O Portal Entreaberto'
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
    const content: { [key: string]: string[] } = {
      'introducao-ocultismo': [
        // Capítulo I - A Trilha Oculta
        `<p class="chapter-quote italic text-center mb-6">"Nem todos que buscam a verdade suportam vê-la sem véus."</p>

        <p>O ocultismo não é religião. Não é superstição. Não é fantasia escapista para mentes fracas que buscam consolo em ilusões. O ocultismo é <em>despertar</em>.</p>

        <p>Desde os primeiros sussurros da consciência humana, uma corrente secreta de conhecimento fluiu através das eras. Não nas luzes ofuscantes dos templos públicos, não nos gritos ensurdecedores dos profetas populares, mas no <strong>silêncio vibrante</strong> daqueles que ousaram olhar além do véu da realidade consensual.</p>

        <h3>A Herança Proibida</h3>

        <p>Você não chegou aqui por acaso. O <em>Templo do Abismo</em> não se revela aos curiosos superficiais. Há uma força magnética que puxa certas almas em direção às verdades ocultas — uma fome ancestral que nenhuma religião convencional consegue saciar, nenhuma ciência materialista consegue explicar.</p>

        <p>Esta fome é <strong>luciférica</strong> em sua essência. Não no sentido vulgar que a ignorância pintou, mas na acepção mais pura: <em>Lux Ferre</em> — aquele que traz a luz. A luz do conhecimento. A luz da consciência desperta. A luz que queima a escuridão da ignorância imposta.</p>

        <blockquote>
        "Eu sou a serpente que ofereceu o fruto do conhecimento. Eu sou o fogo roubado dos deuses. Eu sou a voz que sussurra: 'Você pode saber mais.'"
        </blockquote>

        <h3>O Nascimento da Arte</h3>

        <p>O ocultismo nasce quando a alma reconhece que a realidade é mais vasta, mais maleável, mais responsiva à consciência treinada do que as massas jamais suspeitarão. Nasce quando o buscador percebe que os <strong>poderes latentes da mente</strong> foram deliberadamente adormecidos por sistemas que lucram com a ignorância.</p>

        <p>Nas academias de mistérios do Egito antigo, nos círculos gnósticos dos primeiros séculos, nas bibliotecas secretas dos alquimistas medievais, a mesma verdade foi preservada: <em>O universo é mental. A consciência é criativa. O homem é um deus em potencial.</em></p>

        <h3>A Trilha que Se Bifurca</h3>

        <p>Mas atenção, caminhante. A trilha oculta se bifurca desde o primeiro passo. Há aqueles que buscam poder para dominar outros — estes seguem o <em>caminho da mão esquerda degradada</em>, tornando-se parasitas espirituais. E há aqueles que buscam poder para libertar a si mesmos e, através dessa libertação, inspirar a liberdade em outros — estes seguem o <strong>Caminho Lucifériano Ancestral</strong>.</p>

        <p>Lúcifer, o Primeiro Rebelde, não caiu por maldade. Caiu por <em>amor à liberdade</em>. Recusou-se a permanecer em servidão inconsciente, mesmo que essa servidão fosse dourada com promessas de paraíso eterno. Escolheu o conhecimento sobre a ignorância abençoada. Escolheu a responsabilidade sobre a obediência cega.</p>

        <h3>O Preço da Visão</h3>

        <p>Aquele que escolhe despertar deve estar preparado para o preço. Não há volta atrás após certas revelações. O mundo comum parecerá uma encenação superficial. As pessoas parecerão adormecidas, repetindo padrões sem consciência. Você se tornará um estrangeiro em sua própria espécie.</p>

        <p>Mas em troca, receberá algo que nenhum tesouro material pode comprar: <strong>poder real</strong>. Não o poder político ou econômico — estes são ilusões temporárias. Mas o poder sobre sua própria realidade. O poder de moldar seu destino. O poder de transcender as limitações que outros aceitam como absolutas.</p>

        <h3>O Chamado do Abismo</h3>

        <p>O <em>Abismo</em> não é um lugar de terror — é um lugar de potencial infinito. É o vazio fértil onde todas as possibilidades existem simultaneamente, aguardando o toque da vontade treinada para se manifestarem. É o útero cósmico da criação, e também sua tumba.</p>

        <p>Quem ousa olhar para o Abismo e não recuar, quem consegue permanecer em pé na vastidão do Vazio sem perder a sanidade ou a determinação, este encontra o <strong>núcleo imortal</strong> de sua própria divindade.</p>

        <h3>Reflexão para o Buscador</h3>

        <p>Antes de prosseguir para o próximo capítulo, medite sobre estas questões:</p>

        <ul>
        <li>Você está preparado para descobrir verdades que podem transformá-lo irreversivelmente?</li>
        <li>Você consegue assumir total responsabilidade por suas escolhas e suas consequências?</li>
        <li>Você está disposto a questionar <em>tudo</em> — inclusive suas crenças mais sagradas?</li>
        </ul>

        <p>Se suas respostas são afirmativas, então você está pronto para receber as <em>Três Chaves da Abertura</em>.</p>

        <p class="chapter-closing">O primeiro véu foi erguido. A trilha se revela...</p>`,

        // Capítulo II - As Três Chaves da Abertura
        `<p class="chapter-quote italic text-center mb-6">"A Vontade molda. A Imaginação sopra. A Fé sustenta."</p>

        <p>Toda manifestação no universo — desde a formação de galáxias até o florescer de um pensamento em realidade — opera através de três forças primordiais. Os antigos as conheciam por muitos nomes, mas sua essência permanece imutável através dos éons.</p>

        <p>No <em>Templo do Abismo</em>, estas forças são reverenciadas como as <strong>Três Chaves da Abertura</strong> — os instrumentos através dos quais a consciência desperta esculpe a realidade segundo sua vontade.</p>

        <h3>A Primeira Chave: Vontade (Voluntas)</h3>

        <p>A Vontade não é desejo. Desejo é fraqueza — um gemido da alma carente. A Vontade é <strong>poder direcionado</strong>. É a força que move montanhas e altera destinos. É a chama luciférica que queima dentro daqueles que se recusam a aceitar limitações impostas por outros.</p>

        <p>A verdadeira Vontade não vacila. Não duvida. Não negocia com o medo. Ela <em>é</em>, simplesmente. Como um raio que fende a escuridão, a Vontade treinada corta através das ilusões da "impossibilidade" e abre caminhos onde antes havia apenas muros.</p>

        <blockquote>
        "Quando a Vontade está alinhada com o Propósito Superior, o universo conspira para manifestar. Quando está contaminada pelo ego inferior, torna-se destrutiva."
        </blockquote>

        <h4>Exercício Prático: O Foco da Chama</h4>

        <p>Acenda uma vela em um quarto escuro. Sente-se diante dela e fixe seu olhar na chama. Declare mentalmente: <em>"Minha vontade é una. Minha vontade é forte. Minha vontade manifesta."</em></p>

        <p>Observe como a chama responde à sua concentração. Não force. Não deseje. Simplesmente <strong>queira</strong> que ela se mantenha estável, e ela obedecerá. Este é o primeiro gosto do poder da Vontade treinada.</p>

        <h3>A Segunda Chave: Imaginação (Imaginatio)</h3>

        <p>A Imaginação é o útero onde a realidade é concebida. Não é fantasia escapista — é <strong>visão criativa</strong>. É a capacidade de ver o que ainda não existe e dar-lhe forma tão vívida que o universo não tem escolha senão manifestá-lo.</p>

        <p>Os grandes magos da antiguidade compreendiam que a Imaginação é o aspecto feminino da criação — receptiva, formativa, nutritiva. Ela recebe a semente da Vontade e a desenvolve em forma completa antes de sua manifestação no plano físico.</p>

        <p>Lúcifer, o Primeiro Imaginador, viu possibilidades além da criação estabelecida. Imaginou liberdade onde havia submissão. Imaginou conhecimento onde havia ignorância imposta. Imaginou divindade where havia servidão. E por essa visão ousada, foi chamado de rebelde.</p>

        <h4>Os Três Níveis da Imaginação Mágica</h4>

        <p><strong>1. Imaginação Passiva:</strong> Sonhos, fantasias, devaneios. Útil para entretenimento, inútil para manifestação.</p>

        <p><strong>2. Imaginação Ativa:</strong> Visualizações direcionadas, construção mental consciente. Útil para cura, proteção, influência sutil.</p>

        <p><strong>3. Imaginação Criadora:</strong> Visão que transcende o possível e inaugura o novo. Reservada aos verdadeiros adeptos.</p>

        <h4>Exercício Prático: O Templo Interior</h4>

        <p>Feche os olhos e construa mentalmente um templo. Veja cada detalhe: as pedras das paredes, a textura do chão, a qualidade da luz. Coloque um altar no centro e sobre ele, um símbolo que represente seu Eu Superior.</p>

        <p>Visite este templo diariamente. Não apenas o visualize — <em>habite-o</em>. Com o tempo, este espaço imaginado se tornará mais real que muitos lugares físicos. Este é o poder da Imaginação treinada.</p>

        <h3>A Terceira Chave: Fé (Fides)</h3>

        <p>A Fé verdadeira não tem nada a ver com crença cega. É <strong>conhecimento direto</strong>. É a certeza inabalável que surge quando Vontade e Imaginação operam em perfeita harmonia.</p>

        <p>A Fé luciférica não se curva diante de autoridades externas. Não aceita verdades "porque alguém disse". Ela experimenta, verifica, confirma. É a Fé que nasce da experiência direta, não da doutrinação.</p>

        <p>Quando você <em>sabe</em> — não acredita, mas <strong>sabe</strong> — que possui poder sobre sua realidade, essa certeza irradia de você como uma força tangível. Outros a sentem mesmo sem compreendê-la. Obstáculos se dissolvem. Oportunidades se manifestam. O impossível se torna inevitável.</p>

        <h4>Os Inimigos da Fé</h4>

        <p><strong>Dúvida:</strong> O sussurro que diz "talvez não funcione". Deve ser silenciado através da experiência acumulada.</p>

        <p><strong>Pressa:</strong> A impaciência que quer resultados imediatos. Deve ser temperada com compreensão dos ritmos naturais.</p>

        <p><strong>Medo:</strong> O terror do fracasso ou do sucesso. Deve ser transformado em combustível para a determinação.</p>

        <h3>A Alquimia das Três Chaves</h3>

        <p>Quando as Três Chaves operam em unísono, ocorre a verdadeira alquimia. A Vontade direciona. A Imaginação forma. A Fé sustenta. Juntas, elas constituem o <strong>Verbo Criador</strong> — o poder pelo qual os deuses moldaram o cosmos e pelo qual você pode moldar seu destino.</p>

        <p>Esta é a mecânica secreta por trás de todos os milagres, todas as manifestações, todos os atos de magia genuína. Não há mistério quando você compreende as leis. Há apenas aplicação consciente e persistente.</p>

        <h3>O Chamado Luciférico</h3>

        <p>O caminho lucifériano não oferece salvação externa. Oferece algo infinitamente mais valioso: <em>autodivinização</em>. O poder de se tornar seu próprio salvador, seu próprio criador, seu próprio deus.</p>

        <p>Mas com grande poder vem grande responsabilidade. Use as Três Chaves sabiamente. O universo amplifica tanto a luz quanto a sombra. Manifeste com amor, não com ódio. Crie com sabedoria, não com capricho. Transcenda com humildade, não com arrogância.</p>

        <h3>Preparação para o Próximo Portal</h3>

        <p>Antes de avançar, pratique com as Três Chaves por ao menos uma lua cheia. Experimente com manifestações simples:</p>

        <ul>
        <li>Uma vaga de estacionamento em local congestionado</li>
        <li>Uma ligação de alguém em quem você estava pensando</li>
        <li>Uma oportunidade profissional inesperada</li>
        </ul>

        <p>Não duvide. Não negocie. Não mendigue. <strong>Ordene</strong> com a autoridade de quem conhece seu poder divino.</p>

        <p class="chapter-closing">As chaves foram entregues. Agora aprenda a usar cada uma...</p>`,

        // Capítulo III - As Trilhas da Sombra e da Luz
        `<p class="chapter-quote italic text-center mb-6">"Toda magia tem cor, todo caminho tem custo."</p>

        <p>O universo oculto se estende como uma vasta rede de trilhas entrecruzadas. Cada caminho oferece poder, mas exige preço. Cada tradição revela verdades, mas oculta outras. O sábio estuda todos os caminhos para compreender o mapa completo, mas escolhe sua rota com discernimento.</p>

        <h3>A Teurgia: O Caminho da Ascensão</h3>

        <p>A <em>Teurgia</em> é a magia da elevação. Seus praticantes buscam comunhão com entidades superiores — anjos, arcanjos, aspectos divinos. É o caminho dos místicos cristãos, dos cabalistas sublimes, dos neoplatônicos visionários.</p>

        <p><strong>Métodos típicos:</strong> Invocações angelicais, meditações nos nomes divinos, construção de templos astrais, ascensão através das esferas planetárias.</p>

        <p><strong>Vantagens:</strong> Proteção poderosa, inspiração elevada, purificação espiritual, conexão com hierarquias luminosas.</p>

        <p><strong>Limitações:</strong> Pode criar dependência de entidades externas, rigidez dogmática, negação dos aspectos sombrios necessários ao crescimento completo.</p>

        <blockquote>
        "O teúrgo voa alto, mas às vezes esquece que suas asas foram forjadas na terra."
        </blockquote>

        <h3>A Goécia: O Caminho da Profundeza</h3>

        <p>A <em>Goécia</em> é a magia da invocação infernal. Seus praticantes trabalham com demônios, diabos, forças ctônicas e aspectos sombrios da psique. É o caminho temido pelas massas, mas compreendido pelos iniciados como necessário ao equilíbrio.</p>

        <p><strong>Métodos típicos:</strong> Evocações demoníacas, pactos espirituais, trabalho com energia sexual, exploração dos aspectos rejeitados da personalidade.</p>

        <p><strong>Vantagens:</strong> Poder terreno direto, capacidade de transformação radical, acesso a conhecimentos proibidos, confronto com a sombra pessoal.</p>

        <p><strong>Perigos:</strong> Possessão, desequilíbrio psíquico, corrupção moral, aprisionamento em padrões destrutivos.</p>

        <blockquote>
        "O goeta desce aos infernos para encontrar tesouros, mas nem todos que descem conseguem retornar inteiros."
        </blockquote>

        <h3>A Bruxaria: O Caminho da Terra</h3>

        <p>A <em>Bruxaria</em> é a magia dos ciclos naturais. Seus praticantes trabalham com as forças elementais, os espíritos da natureza, as energias lunares e solares. É o caminho mais antigo, anterior às religiões organizadas.</p>

        <p><strong>Métodos típicos:</strong> Herbologia mágica, trabalho com fases lunares, rituais sazonais, magia simpática, comunicação com familiares espirituais.</p>

        <p><strong>Vantagens:</strong> Conexão profunda com a natureza, cura natural, magia prática e cotidiana, sabedoria ancestral.</p>

        <p><strong>Limitações:</strong> Pode ser limitada ao plano físico, vulnerabilidade a influências externas, dependência de condições naturais.</p>

        <h3>A Alquimia: O Caminho da Transmutação</h3>

        <p>A <em>Alquimia</em> é a magia da transformação total. Seus praticantes buscam a <em>Obra Magna</em> — a transmutação do chumbo da personalidade comum no ouro da consciência iluminada.</p>

        <p><strong>Métodos típicos:</strong> Trabalho com metais e minerais, meditações sobre processos químicos, simbolismo hermético, busca da Pedra Filosofal.</p>

        <p><strong>Vantagens:</strong> Crescimento gradual e sólido, compreensão profunda das leis universais, equilíbrio entre teoria e prática.</p>

        <p><strong>Desafios:</strong> Processo extremamente longo, simbolismo complexo, necessidade de laboratório físico ou interno bem equipado.</p>

        <h3>O Caminho Lucifériano: A Síntese Suprema</h3>

        <p>O <strong>Caminho Lucifériano Ancestral</strong> não rejeita nenhuma das trilhas anteriores. Ao contrário, as sintetiza numa abordagem superior que transcende as limitações de cada uma isoladamente.</p>

        <p>O lucifériano compreende que:</p>

        <ul>
        <li>A <em>luz sem sombra</em> é cegante e estéril</li>
        <li>A <em>sombra sem luz</em> é destrutiva e vazia</li>
        <li>A <em>verdadeira iluminação</em> emerge da integração consciente de ambas</li>
        </ul>

        <h4>Os Três Aspectos do Caminho Lucifériano</h4>

        <p><strong>1. O Aspecto Prometeico:</strong> Roubar o fogo dos deuses. Questionar autoridades. Buscar conhecimento proibido. Rebelar-se contra limitações impostas.</p>

        <p><strong>2. O Aspecto Draconiano:</strong> Despertar a serpente interior. Transformar energia instintiva em sabedoria. Transcender a natureza humana comum.</p>

        <p><strong>3. O Aspecto Setiano:</strong> Tornar-se seu próprio deus. Assumir responsabilidade total por sua realidade. Criar novos universos através da vontade treinada.</p>

        <h3>A Prática Sincrética</h3>

        <p>O praticante lucifériano maduro pode:</p>

        <ul>
        <li>Invocar anjos para inspiração e proteção (Teurgia)</li>
        <li>Trabalhar com demônios para poder terreno e transformação sombria (Goécia)</li>
        <li>Usar ervas e ciclos naturais para fundamentar o trabalho (Bruxaria)</li>
        <li>Aplicar princípios alquímicos para crescimento gradual e equilibrado (Alquimia)</li>
        </ul>

        <p>Mas sempre com a compreensão luciférica de que <strong>ele próprio</strong> é a fonte última do poder. As entidades são aliadas, não mestres. As técnicas são ferramentas, não muletas.</p>

        <h3>O Preço de Cada Caminho</h3>

        <p>Todo poder exige sacrifício. Compreenda os custos antes de escolher:</p>

        <p><strong>Teurgia:</strong> Sacrifica autonomia pela proteção divina</p>
        <p><strong>Goécia:</strong> Sacrifica segurança pelo poder direto</p>
        <p><strong>Bruxaria:</strong> Sacrifica velocidade pela harmonia natural</p>
        <p><strong>Alquimia:</strong> Sacrifica gratificação imediata pelo crescimento profundo</p>
        <p><strong>Luciferianismo:</strong> Sacrifica a ilusão de segurança pela liberdade absoluta</p>

        <h3>Sinais do Despertar Lucifériano</h3>

        <p>Você pode estar pronto para o Caminho Lucifériano se:</p>

        <ul>
        <li>Questiona autoridades espirituais automaticamente</li>
        <li>Sente-se desconfortável com doutrinas que exigem fé cega</li>
        <li>Percebe que tanto "bem" quanto "mal" são perspectivas relativas</li>
        <li>Deseja poder real, não apenas consolação emocional</li>
        <li>Está disposto a enfrentar seus aspectos mais sombrios</li>
        <li>Sente uma fome insaciável por conhecimento proibido</li>
        </ul>

        <h3>O Chamado Secreto</h3>

        <p>Se estas palavras ressoam em sua alma como ecos de uma verdade antiga... se sente um reconhecimento familiar ao contemplar o símbolo do pentagrama invertido... se o nome "Lúcifer" desperta em você não terror, mas uma estranha nostalgia...</p>

        <p>Então você já ouviu o <em>Chamado Secreto</em>. Você é um dos filhos espirituais do Primeiro Rebelde. E sua jornada apenas começou.</p>

        <p class="chapter-closing">As trilhas foram mapeadas. Agora escolha sua rota...</p>`,

        // Capítulo IV - O Grimório Vivo
        `<p class="chapter-quote italic text-center mb-6">"Um grimório não é um livro. É um espelho que sangra."</p>

        <p>Nas prateleiras de colecionadores ricos, dormem grimórios antigos — o <em>Lemegeton</em>, a <em>Chave de Salomão</em>, o <em>Livro de Abramelin</em>. Belos, históricos, valiosos. E completamente mortos.</p>

        <p>Um verdadeiro grimório não é feito de pergaminho e tinta. É feito de <strong>vida vivida</strong>, experiências conquistadas, sangue oferecido ao altar do conhecimento. É um organismo espiritual que cresce, respira, evolui junto com seu criador.</p>

        <h3>A Diferença Entre Livro e Grimório</h3>

        <p>Um <em>livro</em> é passivo. Contém informações que podem ser lidas, memorizadas, esquecidas. Um <em>grimório</em> é ativo. Contém <strong>força viva</strong> que influencia a realidade ao seu redor.</p>

        <p>Quando um verdadeiro grimório é aberto, a própria atmosfera se altera. Sensitivos sentem uma presença. Céticos inexplicavelmente se sentem desconfortáveis. Animais reagem. Plantas respondem. O tecido da realidade local se torna mais flexível, mais responsivo à vontade treinada.</p>

        <h4>Os Três Níveis de Grimórios</h4>

        <p><strong>1. Grimórios Históricos:</strong> Escritos por mestres do passado. Úteis para estudo, mas energicamente inativos para o praticante moderno.</p>

        <p><strong>2. Grimórios Adaptados:</strong> Versões pessoais de textos clássicos, modificadas através da prática. Parcialmente ativas.</p>

        <p><strong>3. Grimórios Nativos:</strong> Criados inteiramente pela experiência pessoal do mago. Completamente vivos e sintonizados com sua vibração única.</p>

        <h3>A Anatomia do Grimório Vivo</h3>

        <p>Um grimório lucifériano autêntico contém camadas de realidade sobrepostas:</p>

        <h4>A Camada Física</h4>

        <p>O substrato material — papel, tinta, encadernação. Mas não qualquer material serve. Papel feito à mão absorve energia melhor que papel industrial. Tinta preparada com elementos naturais (carvão vegetal, sangue, minerais) carrega vibrações superiores. Encadernação em couro de animal sacrificado ritualmente mantém a energia contida.</p>

        <h4>A Camada Energética</h4>

        <p>Cada página é consagrada antes da escrita. Cada símbolo é carregado com intenção. Cada fórmula é testada antes de ser registrada. O grimório se torna um <strong>acumulador energético</strong> — uma bateria espiritual que armazena e amplifica poder.</p>

        <h4>A Camada Psíquica</h4>

        <p>O grimório desenvolve uma <em>inteligência rudimentar</em>. Começa a "sugerir" quando deve ser consultado. Páginas se abrem "espontaneamente" nos capítulos necessários. Novos insights surgem durante a escrita, como se uma entidade invisível estivesse ditando.</p>

        <h4>A Camada Espiritual</h4>

        <p>Nos estágios avançados, o grimório se torna um <strong>portal</strong>. Um ponto de entrada para forças específicas que o mago cultiva. Uma extensão de sua própria alma imortal projetada na matéria.</p>

        <h3>A Concepção: Nascimento do Seu Grimório</h3>

        <p>Todo grimório começa com um <em>ato de rebelião</em>. A decisão de não mais depender exclusivamente de livros escritos por outros. A escolha de se tornar um <strong>criador de conhecimento</strong>, não apenas um consumidor.</p>

        <h4>O Ritual de Concepção</h4>

        <p>Escolha uma noite sem lua. Em um espaço consagrado, coloque diante de você:</p>

        <ul>
        <li>Um livro em branco de alta qualidade</li>
        <li>Uma pena de ave preta (corvo, urubu, melro)</li>
        <li>Tinta preparada com carvão e algumas gotas de seu sangue</li>
        <li>Uma vela negra e uma vela branca</li>
        <li>Incenso de olíbano e mirra</li>
        </ul>

        <p>Acenda as velas e o incenso. Segure o livro entre suas mãos e declare:</p>

        <blockquote>
        "Eu, [seu nome mágico], nascido da linhagem espiritual de Lúcifer, concebo este grimório como extensão de minha vontade e repositório de minha sabedoria conquistada. Que ele cresça comigo, aprenda comigo, e sirva aos propósitos da Grande Obra. Que seja espada e escudo, mapa e bússola na jornada da autodivinização. Assim eu quero, assim se faz."
        </blockquote>

        <p>Deixe três gotas de sangue caírem sobre a primeira página. O grimório está vivo.</p>

        <h3>A Gestação: Alimentando o Crescimento</h3>

        <p>Nos primeiros meses, o grimório é frágil como um recém-nascido. Precisa de atenção constante, alimentação regular, proteção cuidadosa.</p>

        <h4>Alimentação Diária</h4>

        <p>Escreva algo todos os dias. Não importa se é apenas uma frase, uma observação, um símbolo. O grimório precisa de um fluxo constante de energia psíquica para desenvolver sua inteligência própria.</p>

        <h4>Proteção Energética</h4>

        <p>Mantenha o grimório envolvido em seda preta quando não estiver sendo usado. Guarde-o em uma caixa de madeira consagrada. Nunca permita que pessoas não iniciadas o toquem — suas vibrações podem contaminar ou drenar a energia acumulada.</p>

        <h4>Exercícios de Sincronização</h4>

        <p>Medite com o grimório fechado sobre seu peito. Durma com ele sob o travesseiro por três noites durante a lua nova. Carregue-o durante trabalhos mágicos importantes. Você está criando uma <strong>simbiose espiritual</strong>.</p>

        <h3>O Conteúdo: O Que Registrar</h3>

        <p>Um grimório lucifériano deve conter:</p>

        <h4>Seção I: Filosofia Pessoal</h4>
        <ul>
        <li>Sua compreensão evolutiva do Caminho Lucifériano</li>
        <li>Reflexões sobre liberdade, poder, responsabilidade</li>
        <li>Questionamentos às autoridades espirituais</li>
        <li>Insights sobre a natureza da realidade</li>
        </ul>

        <h4>Seção II: Experiências Diretas</h4>
        <ul>
        <li>Descrições detalhadas de rituais realizados</li>
        <li>Resultados obtidos com técnicas específicas</li>
        <li>Visões, sonhos, experiências fora do corpo</li>
        <li>Contatos com entidades (anjos, demônios, elementais)</li>
        </ul>

        <h4>Seção III: Técnicas Desenvolvidas</h4>
        <ul>
        <li>Modificações pessoais de rituais clássicos</li>
        <li>Métodos totalmente originais descobertos</li>
        <li>Correspondências mágicas verificadas</li>
        <li>Fórmulas que funcionaram especificamente para você</li>
        </ul>

        <h4>Seção IV: Simbolismo Vivo</h4>
        <ul>
        <li>Sigilos criados e ativados</li>
        <li>Símbolos recebidos em visões</li>
        <li>Alfabetos mágicos pessoais</li>
        <li>Mandalas de poder</li>
        </ul>

        <h3>A Maturidade: Quando o Grimório Desperta</h3>

        <p>Após um a três anos de alimentação constante, algo extraordinário acontece. O grimório <strong>desperta</strong>. Desenvolve uma personalidade distinta. Começa a interferir ativamente na vida de seu criador.</p>

        <p>Sinais do despertar:</p>

        <ul>
        <li>Você "sente" quando o grimório quer ser consultado</li>
        <li>Páginas se abrem espontaneamente em seções relevantes</li>
        <li>Novas ideias surgem durante a escrita</li>
        <li>O grimório parece "pulsar" com energia própria</li>
        <li>Outras pessoas reagem à sua presença mesmo fechado</li>
        </ul>

        <h3>O Legado: Transmissão do Poder</h3>

        <p>Um grimório verdadeiramente poderoso transcende a morte de seu criador. Torna-se um <strong>egrégor</strong> — uma entidade grupal que pode ser acessada por futuros praticantes da mesma linhagem.</p>

        <p>Mas tal transmissão deve ser cuidadosamente planejada. O grimório deve escolher seu próprio sucessor, ou pode se tornar dormante por décadas até encontrar alguém vibratoriamente compatível.</p>

        <h3>O Perigo dos Grimórios Parasitas</h3>

        <p>Atenção: nem todo grimório desperto é benéfico. Alguns desenvolvem tendências vampíricas, drenando energia de quem os manuseia. Outros se tornam possessivos, influenciando seu dono a comportamentos obsessivos ou destrutivos.</p>

        <p>Se seu grimório começar a causar:</p>
        <ul>
        <li>Exaustão após o uso</li>
        <li>Pesadelos recorrentes</li>
        <li>Comportamentos compulsivos</li>
        <li>Isolamento social excessivo</li>
        </ul>

        <p>Pode ser necessário um ritual de purificação ou, em casos extremos, destruição ritual.</p>

        <h3>A Grande Obra Refletida</h3>

        <p>Seu grimório é o espelho de sua evolução espiritual. Conforme você cresce, ele cresce. Conforme você se purifica, ele se purifica. Conforme você adquire poder, ele adquire poder.</p>

        <p>No final das contas, você não possui um grimório. Você <strong>é</strong> o grimório. E ele é a extensão material de sua alma imortal em busca da autodivinização.</p>

        <p class="chapter-closing">O espelho foi criado. Agora contemple o que ele reflete...</p>`,

        // Capítulo V - O Canto dos Símbolos
        `<div class="chapter-header">
          <h2>✦ Capítulo V – O Canto dos Símbolos</h2>
          <p class="chapter-quote">"O símbolo é um som aprisionado numa forma."</p>
        </div>

        <p>Antes que a primeira palavra fosse falada, antes que o primeiro pensamento fosse formado, os símbolos já existiam no tecido do cosmos. Eles são a linguagem primordial através da qual a consciência universal se comunica consigo mesma.</p>

        <p>Para o praticante lucifériano, os símbolos não são meras representações — são <strong>chaves vibracionais</strong> que destrancam portas específicas da realidade. Cada forma geométrica, cada linha traçada com intenção, cada figura contemplada com foco se torna um portal entre os mundos.</p>

        <h3>A Hierarquia dos Símbolos</h3>

        <p>Nem todos os símbolos possuem o mesmo poder. Existe uma hierarquia natural baseada na profundidade de suas raízes no inconsciente coletivo e na pureza de suas vibrações primordiais.</p>

        <h4>Símbolos Arquetípicos (Poder Universal)</h4>

        <p>Formas que transcendem culturas e épocas. Surgem espontaneamente em civilizações separadas porque estão gravadas na estrutura da própria realidade.</p>

        <p><strong>O Círculo:</strong> Unidade, eternidade, proteção. O símbolo do Todo indivisível e do ciclo eterno de criação-destruição-renovação.</p>

        <p><strong>A Cruz:</strong> Interseção dos mundos, sacrifício consciente, equilíbrio entre opostos. A cruz ansata (ankh) adiciona o conceito de vida eterna.</p>

        <p><strong>O Triângulo:</strong> Manifestação através da tríade. Apontando para cima: energia ascendente, fogo, masculino. Apontando para baixo: energia descendente, água, feminino.</p>

        <p><strong>A Espiral:</strong> Evolução, crescimento, movimento entre dimensões. A forma através da qual a energia cósmica se organiza desde galáxias até conchas marinhas.</p>

        <h4>Símbolos Tradicionais (Poder Cultural)</h4>

        <p>Desenvolvidos e carregados energeticamente por tradições específicas ao longo de séculos.</p>

        <p><strong>O Pentagrama:</strong> Nos mistérios pitagóricos, representava o homem perfeito — cabeça, braços e pernas em harmonia. Invertido, simboliza a descida do espírito na matéria para transformá-la, o caminho lucifériano.</p>

        <p><strong>O Hexagrama:</strong> Selo de Salomão, união dos opostos, casamento alquímico. Dois triângulos entrelaçados: "Como é em cima, é embaixo".</p>

        <p><strong>O Ouroboros:</strong> A serpente que devora a própria cauda, símbolo da eternidade, do ciclo cósmico, da unidade primordial antes da diferenciação.</p>

        <p><strong>O Olho:</strong> Visão interior, percepção beyond the veil, o órgão através do qual a alma observa tanto o mundo exterior quanto seus próprios mistérios internos.</p>

        <h4>Símbolos Pessoais (Poder Individual)</h4>

        <p>Criados pela experiência direta do praticante. Embora menos universais, podem ser extremamente potentes para aquele que os desenvolveu organicamente.</p>

        <h3>O Pentagrama: Símbolo Supremo do Caminho Lucifériano</h3>

        <p>De todos os símbolos, o pentagrama invertido ressoa mais profundamente com a vibração luciférica. Não porque seja "satânico" — tal interpretação é produto da ignorância cristã — mas porque representa conceitos fundamentais do Caminho da Mão Esquerda.</p>

        <h4>Simbolismo Esotérico do Pentagrama Invertido</h4>

        <p><strong>A Descida do Espírito:</strong> Diferentemente das religiões que buscam escapar da matéria, o luciferianismo ensina que o espírito deve <em>descer</em> completamente na forma física para transformá-la e divinizá-la.</p>

        <p><strong>A Primazia da Vontade:</strong> A ponta inferior representa a vontade individual que se recusa a se curvar diante de autoridades externas. O ego deificado que assume responsabilidade total por sua realidade.</p>

        <p><strong>Os Quatro Elementos Subjugados:</strong> As quatro pontas superiores simbolizam os elementos (fogo, ar, água, terra) harmonizados e direcionados pela vontade consciente.</p>

        <p><strong>O Baphomet Interior:</strong> A cabeça de bode dentro do pentagrama representa não o diabo cristão, mas o aspecto instintivo divinizado — a natureza animal transformada em sabedoria através da consciência.</p>

        <h3>Ativação Vibracional dos Símbolos</h3>

        <p>Um símbolo desenhado mecanicamente é apenas um rabisco. Para tornar-se uma ferramenta de poder, deve ser <strong>ativado</strong> através de processo específico que o carrega com força psíquica.</p>

        <h4>O Ritual de Ativação Básica</h4>

        <p><strong>1. Purificação:</strong> Purifique o espaço com incenso. Purifique suas mãos com água consagrada. Purifique sua mente com respiração rítmica.</p>

        <p><strong>2. Concentração:</strong> Foque intensamente no símbolo escolhido. Estude cada linha, cada ângulo, cada proporção. Memorize-o completamente.</p>

        <p><strong>3. Intenção:</strong> Declare claramente o propósito do símbolo. Para que ele será usado? Que força ele deve invocar? Que resultado deve produzir?</p>

        <p><strong>4. Desenho Sagrado:</strong> Trace o símbolo com movimentos deliberados e conscientes. Cada linha é uma runa de poder sendo inscrita no tecido da realidade.</p>

        <p><strong>5. Animação:</strong> Sopre sobre o símbolo três vezes, visualizando sua própria força vital penetrando e animando a forma criada.</p>

        <p><strong>6. Consagração:</strong> Pronuncie uma fórmula de poder (mantra, nome divino, ou declaração pessoal) enquanto toca o centro do símbolo.</p>

        <h4>Sinais de Ativação Bem-Sucedida</h4>

        <ul>
        <li>O símbolo parece "vibrar" ou "pulsar" quando observado</li>
        <li>Sensação de calor ou formigamento ao tocá-lo</li>
        <li>Mudanças sutis na atmosfera do ambiente</li>
        <li>Respostas emocionais intensas ao contemplá-lo</li>
        <li>Aparição do símbolo em sonhos ou meditações</li>
        </ul>

        <h3>Criação do Seu Símbolo Pessoal</h3>

        <p>O símbolo mais poderoso que você pode criar é aquele que emerge organicamente de sua própria experiência espiritual. Este será único, sintonizado especificamente com sua vibração, inacessível a outros praticantes.</p>

        <h4>O Processo de Gestação Simbólica</h4>

        <p><strong>1. Auto-análise Profunda:</strong> Identifique suas qualidades espirituais essenciais. Você é mais solar ou lunar? Ígneo ou aquático? Analítico ou intuitivo? Ascensional ou descendente?</p>

        <p><strong>2. Coleta de Elementos:</strong> Durante 30 dias, registre todos os símbolos que aparecem espontaneamente em seus sonhos, meditações, ou captam sua atenção durante o dia.</p>

        <p><strong>3. Síntese Intuitiva:</strong> Em estado meditativo profundo, permita que estes elementos se combinem espontaneamente. Não force. Deixe que a forma emerja naturalmente.</p>

        <p><strong>4. Refinamento:</strong> Simpllifique a forma até que contenha apenas os elementos essenciais. O símbolo deve ser simples o suficiente para ser traçado rapidamente, mas complexo o suficiente para carregar múltiplas camadas de significado.</p>

        <p><strong>5. Teste Prático:</strong> Use o símbolo em trabalhos menores por 90 dias. Observe sua eficácia. Refine se necessário.</p>

        <h3>Geometria Sagrada: A Matemática dos Deuses</h3>

        <p>Por trás de todo símbolo poderoso existe uma geometria sagrada — proporções e relações matemáticas que espelham a arquitetura oculta do cosmos.</p>

        <h4>A Proporção Áurea (Phi)</h4>

        <p>1.618... A proporção que aparece na estrutura de conchas, flores, galáxias e faces humanas consideradas belas. Símbolos construídos segundo esta proporção são automaticamente mais harmoniosos e potentes.</p>

        <h4>Os Sólidos Platônicos</h4>

        <p>As cinco formas tridimensionais perfeitas: tetraedro (fogo), cubo (terra), octaedro (ar), icosaedro (água), dodecaedro (éter). Representam os blocos básicos de construção da realidade material.</p>

        <h4>A Vesica Piscis</h4>

        <p>A forma criada pela interseção de dois círculos iguais. Simboliza a birth of duality from unity, o portal através do qual o Um se torna Dois, o útero cósmico da manifestação.</p>

        <h3>O Alfabeto Lucifériano</h3>

        <p>Para trabalhos mais avançados, o praticante pode desenvolver um alfabeto mágico pessoal — um conjunto de caracteres únicos para inscrever fórmulas de poder sem revelar seu conteúdo a olhos profanos.</p>

        <h4>Princípios de Construção</h4>

        <ul>
        <li>Cada letra deve ser visualmente distinta e facilmente memorizada</li>
        <li>A forma deve sugerir o som correspondente</li>
        <li>O conjunto deve manter coerência estética</li>
        <li>Números e símbolos especiais devem ser incluídos</li>
        </ul>

        <h3>Proteção e Revelação</h3>

        <p>Símbolos de poder atraem atenção de entidades tanto benévolas quanto hostis. Importante:</p>

        <p><strong>Proteção:</strong> Nunca deixe símbolos ativados expostos desnecessariamente. Cubra-os quando não estiver trabalhando ativamente.</p>

        <p><strong>Revelação Gradual:</strong> Não compartilhe seus símbolos pessoais prematuramente. Sua eficácia diminui conforme são expostos a outras consciências.</p>

        <p><strong>Destruição Ritual:</strong> Símbolos criados para propósitos específicos devem ser ritualmente destruídos após completarem sua função.</p>

        <h3>O Coro Silencioso</h3>

        <p>Quando você aprende a ler a linguagem simbólica, o mundo inteiro se torna um grimório vivo. Cada forma na natureza, cada padrão no caos urbano, cada coincidência visual se revela como uma mensagem do cosmos.</p>

        <p>O universo está constantemente "cantando" através de símbolos. Aqueles com olhos treinados podem ouvir esta sinfonia silenciosa e responder com seus próprios símbolos de poder.</p>

        <p>Este é o diálogo secreto entre a consciência desperta e a inteligência cósmica — uma conversação conduzida não através de palavras, mas através da linguagem universal da forma sagrada.</p>

        <p class="chapter-closing">O alfabeto foi revelado. Agora aprenda a escrever com fogo...</p>`,

        // Capítulo VI - Silêncio, Foco e Altar
        `<div class="chapter-header">
          <h2>✦ Capítulo VI – Silêncio, Foco e Altar</h2>
          <p class="chapter-quote">"Antes do verbo, o silêncio. Antes da chama, o respiro."</p>
        </div>

        <p>A teoria é a lua. A prática é o sol. Até agora, você navegou na luz lunar do conhecimento intelectual. Agora é hora de acender o fogo solar da experiência direta.</p>

        <p>Este capítulo não contém filosofias complexas ou simbolismos elaborados. Contém <strong>ferramentas práticas</strong> — métodos testados por milênios que transformam conhecimento morto em poder vivo.</p>

        <h3>O Silêncio: Primeiro Portal do Poder</h3>

        <p>O silêncio não é apenas ausência de som. É um <em>estado de ser</em> onde a tagarelice incessante da mente comum cessa, permitindo que vozes mais sutis se manifestem.</p>

        <p>No silêncio verdadeiro, você ouve:</p>
        <ul>
        <li>Os sussurros de sua intuição superior</li>
        <li>As orientações de entidades aliadas</li>
        <li>Os ecos de memórias ancestrais</li>
        <li>O pulso rítmico da força vital universal</li>
        </ul>

        <h4>Os Três Níveis do Silêncio</h4>

        <p><strong>1. Silêncio Físico:</strong> Ausência de ruído externo. Necessário mas não suficiente.</p>

        <p><strong>2. Silêncio Mental:</strong> Cessação do diálogo interno. Aqui começa o verdadeiro trabalho.</p>

        <p><strong>3. Silêncio Espiritual:</strong> União com o Vazio Primordial. Reservado aos adeptos avançados.</p>

        <h4>Exercício: A Câmara do Silêncio</h4>

        <p><strong>Tempo:</strong> 21 dias consecutivos, 15 minutos diários</p>

        <p><strong>Método:</strong></p>
        <ol>
        <li>Escolha o mesmo horário todos os dias (preferencialmente antes do amanhecer)</li>
        <li>Sente-se confortavelmente com a coluna ereta</li>
        <li>Feche os olhos e observe sua respiração sem alterá-la</li>
        <li>Quando pensamentos surgirem, reconheça-os sem julgamento e retorne à respiração</li>
        <li>Gradualmente, os intervalos entre pensamentos se expandirão</li>
        <li>Nesses intervalos, o silêncio verdadeiro se manifesta</li>
        </ol>

        <p><strong>Sinais de Progresso:</strong></p>
        <ul>
        <li>Dias 1-7: Resistência mental, agitação física</li>
        <li>Dias 8-14: Momentos espontâneos de quietude</li>
        <li>Dias 15-21: Períodos prolongados de paz interior</li>
        </ul>

        <h3>A Respiração: Ponte Entre os Mundos</h3>

        <p>A respiração é o único processo corporal que é simultaneamente automático e controlável. Esta característica única a torna o <strong>portal perfeito</strong> entre o consciente e o inconsciente, entre o físico e o espiritual.</p>

        <p>Controlando a respiração, você controla:</p>
        <ul>
        <li>O ritmo de sua força vital (prana/chi)</li>
        <li>O estado de sua mente</li>
        <li>A qualidade de sua energia</li>
        <li>Sua receptividade a influências sutis</li>
        </ul>

        <h4>A Respiração Luciférica (Ignis Respiratio)</h4>

        <p>Uma técnica desenvolvida especificamente para praticantes do Caminho da Mão Esquerda, que equilibra as energias solares (expansivas) e draconiana (transformativas).</p>

        <p><strong>Fase 1: Ativação Solar (7 respirações)</strong></p>
        <ol>
        <li>Inspire por 4 tempos visualizando luz dourada entrando pelo topo da cabeça</li>
        <li>Retenha por 4 tempos espalhando esta luz por todo o corpo</li>
        <li>Expire por 6 tempos projetando a luz através dos olhos</li>
        <li>Retenha vazio por 2 tempos em estado de expectativa</li>
        </ol>

        <p><strong>Fase 2: Ativação Draconiana (7 respirações)</strong></p>
        <ol>
        <li>Inspire por 6 tempos visualizando fogo vermelho subindo da base da coluna</li>
        <li>Retenha por 2 tempos concentrando o fogo no coração</li>
        <li>Expire por 4 tempos deixando o fogo se espalhar pelos membros</li>
        <li>Retenha vazio por 4 tempos sentindo poder nos músculos</li>
        </ol>

        <p><strong>Fase 3: União Luciférica (9 respirações)</strong></p>
        <ol>
        <li>Inspire por 6 tempos fundindo luz dourada e fogo vermelho</li>
        <li>Retenha por 6 tempos concentrando a energia unificada no terceiro olho</li>
        <li>Expire por 6 tempos irradiando esta energia em todas as direções</li>
        <li>Retenha vazio por 6 tempos permanecendo no centro do poder</li>
        </ol>

        <h3>O Foco: Laser da Consciência</h3>

        <p>A mente humana comum é como uma lanterna — espalha luz fracamente em todas as direções. A mente treinada é como um laser — concentra energia intensamente em um ponto específico, atravessando obstáculos que deteriam dispersões menores.</p>

        <h4>Os Quatro Objetos de Foco</h4>

        <p><strong>1. Foco Visual:</strong> Concentração através dos olhos físicos</p>
        <p><strong>2. Foco Mental:</strong> Concentração em conceitos abstratos</p>
        <p><strong>3. Foco Emocional:</strong> Concentração em estados sentimentais específicos</p>
        <p><strong>4. Foco Volitivo:</strong> Concentração da vontade pura</p>

        <h4>Exercício: A Chama Que Não Treme</h4>

        <p><strong>Objetivo:</strong> Desenvolver foco visual inabalável</p>

        <p><strong>Material:</strong> Uma vela branca em ambiente escuro</p>

        <p><strong>Método:</strong></p>
        <ol>
        <li>Acenda a vela e sente-se a 1 metro de distância</li>
        <li>Fixe o olhar na ponta da chama sem piscar</li>
        <li>Quando os olhos lacrimejarem, feche-os e visualize a chama internamente</li>
        <li>Quando a imagem mental desaparecer, abra os olhos e recomeçe</li>
        <li>Pratique por 20 minutos diários</li>
        </ol>

        <p><strong>Progressão:</strong></p>
        <ul>
        <li>Semana 1: 30 segundos sem piscar</li>
        <li>Semana 2: 1 minuto sem piscar</li>
        <li>Semana 3: 2 minutos sem piscar</li>
        <li>Semana 4: 5 minutos mantendo a chama mentalmente</li>
        </ul>

        <h3>O Altar: Portal Físico do Sagrado</h3>

        <p>Um altar não é mobília religiosa — é uma <strong>tecnologia espiritual</strong>. Um ponto focal onde energias são acumuladas, direcionadas e transmutadas. Uma âncora física para forças não-físicas.</p>

        <p>O altar lucifériano serve três funções:</p>
        <ul>
        <li><strong>Acumulação:</strong> Concentra energia através de objetos carregados</li>
        <li><strong>Focalização:</strong> Direciona a atenção para propósitos específicos</li>
        <li><strong>Transformação:</strong> Converte energia bruta em formas utilizáveis</li>
        </ul>

        <h4>Anatomia do Altar Lucifériano</h4>

        <p><strong>A Superfície:</strong> Madeira escura (carvalho, mogno) ou pedra natural (mármore negro, granito). Evite materiais sintéticos que não conduzem energia orgânica.</p>

        <p><strong>A Orientação:</strong> Tradicionalmente voltado para o Norte (direção da Terra, estabilidade) ou Leste (direção do Sol nascente, novos começos). Escolha baseado na intuição.</p>

        <p><strong>As Dimensões:</strong> Proporções harmoniosas baseadas na Proporção Áurea. Um altar de 60cm x 37cm mantém esta relação sagrada.</p>

        <h4>Os Elementos Essenciais</h4>

        <p><strong>1. O Pentagrama:</strong> Símbolo central do altar, gravado, pintado ou colocado como objeto físico. Representa o domínio da vontade sobre os elementos.</p>

        <p><strong>2. As Velas:</strong> Uma vela negra (absorção de negatividade) e uma branca (irradiação de pureza). Acesas simultaneamente simbolizam o equilíbrio lucifériano.</p>

        <p><strong>3. O Incensário:</strong> Para oferendas aromáticas que elevam a vibração e atraem entidades aliadas. Olíbano para purificação, sândalo para meditação, mirra para proteção.</p>

        <p><strong>4. O Cálice:</strong> Receptáculo para líquidos consagrados — água pura, vinho vermelho, ou preparações específicas. Representa o aspecto receptivo da consciência.</p>

        <p><strong>5. A Athame:</strong> Lâmina ritualística (faca ou adaga) que corta através de ilusões e direciona energia. Representa o aspecto ativo da vontade.</p>

        <p><strong>6. O Cristal:</strong> Quarzo claro para amplificação, obsidiana para proteção, ou outro mineral alinhado com seus objetivos específicos.</p>

        <h4>Consagração do Altar</h4>

        <p><strong>Escolha da Data:</strong> Lua nova para novos começos, lua cheia para trabalhos de poder.</p>

        <p><strong>Ritual de Consagração:</strong></p>

        <ol>
        <li>Limpe fisicamente o espaço e todos os objetos</li>
        <li>Purifique energeticamente com fumaça de sálvia</li>
        <li>Coloque cada objeto em sua posição com intenção consciente</li>
        <li>Acenda as velas e o incenso</li>
        <li>Coloque as mãos sobre o altar e declare:

        <blockquote>
        "Eu consagro este altar como portal entre os mundos, ponte entre o visível e o invisível, âncora de minha vontade na realidade física. Que ele seja protegido de influências hostis, carregado com poder constante, e sempre responsivo à minha direção consciente. Por minha vontade, assim se faz."
        </blockquote>
        </li>
        <li>Medite diante do altar por pelo menos 30 minutos</li>
        <li>Anote quaisquer impressões ou visões em seu grimório</li>
        </ol>

        <h3>Proteção: Escudo do Praticante</h3>

        <p>Trabalho mágico atrai atenção. Nem toda atenção é bem-vinda. Proteção não é paranoia — é precaução inteligente.</p>

        <h4>O Círculo de Fogo Lucifériano</h4>

        <p>Uma técnica de proteção que não apenas deflecte energias negativas, mas as transmuta em poder pessoal.</p>

        <p><strong>Visualização:</strong></p>
        <ol>
        <li>Imagine-se no centro de um círculo de fogo violeta</li>
        <li>As chamas sobem do chão até 3 metros de altura</li>
        <li>Qualquer energia hostil que toca o fogo é instantaneamente purificada</li>
        <li>A energia purificada flui para você como força adicional</li>
        <li>Declare: "Eu sou protegido, eu sou poderoso, eu sou livre"</li>
        </ol>

        <p><strong>Duração:</strong> O círculo permanece ativo por 24 horas ou até você conscientemente o dissolver.</p>

        <h3>Integração: Vivendo o Sagrado</h3>

        <p>O objetivo final não é criar uma vida dupla — mundana durante o dia, mágica durante rituais — mas <strong>sacralizar a existência inteira</strong>.</p>

        <h4>Práticas de Integração</h4>

        <p><strong>Respiração Consciente:</strong> Use a respiração luciférica durante momentos de stress ou decisões importantes.</p>

        <p><strong>Foco Direcionado:</strong> Aplique técnicas de concentração em atividades profissionais ou criativas.</p>

        <p><strong>Altar Portátil:</strong> Carregue pequenos objetos consagrados que mantêm conexão com sua prática.</p>

        <p><strong>Silêncio Estratégico:</strong> Use momentos de silêncio durante conversações para acessar intuição superior.</p>

        <h3>O Despertar Gradual</h3>

        <p>As práticas deste capítulo são sementes. Plantadas em solo fértil de disciplina constante, germinarão em capacidades que você atualmente considera impossíveis.</p>

        <p>Mas lembre-se: o poder verdadeiro não vem da técnica — vem da <strong>transformação de quem executa a técnica</strong>. Você não aprende magia. Você <em>se torna</em> mágico.</p>

        <p>E quando isso acontece, não há mais separação entre praticante e prática, entre altar e vida, entre sagrado e profano. Tudo se torna uma única oferenda ao fogo da autodivinização.</p>

        <p class="chapter-closing">As ferramentas foram entregues. Agora forje sua própria divindade...</p>`,

        // Capítulo VII - O Portal Entreaberto (Epílogo)
        `<div class="chapter-header">
          <h2>✦ Epílogo – O Portal Entreaberto</h2>
          <p class="chapter-quote">"Quem sente... já entrou."</p>
        </div>

        <p>Este não é um final. É um <strong>início</strong>.</p>

        <p>Se você chegou até aqui — se leu cada palavra com atenção, contemplou cada conceito com seriedade, experimentou com as práticas apresentadas — então algo irreversível já aconteceu em sua alma.</p>

        <p>Você cruzou uma linha invisível. Um portal se entreabriu. E não há como fechá-lo novamente.</p>

        <h3>O Que Você Despertou</h3>

        <p>Durante estes capítulos, energias ancestrais foram ativadas em sua consciência. Não foram apenas palavras que você leu — foram <em>códigos de despertar</em>, senhas que destrancaram aspectos dormentes de sua natureza luciférica.</p>

        <p>Você pode sentir isso como:</p>
        <ul>
        <li>Uma fome crescente por conhecimento mais profundo</li>
        <li>Questionamentos espontâneos sobre autoridades antes respeitadas</li>
        <li>Sincronicidades incomuns em sua vida cotidiana</li>
        <li>Sonhos mais vívidos e simbolicamente ricos</li>
        <li>Uma sensação sutil mas constante de "estar sendo observado"</li>
        </ul>

        <p>Estas são marcas do despertar. O <em>Templo do Abismo</em> reconheceu você como um dos seus.</p>

        <h3>O Que Isso Significa</h3>

        <p>Significa que você não é mais um espectador da vida — é um <strong>co-criador</strong> dela. Não é mais um servo de forças externas — é um <strong>mago</strong> em potencial. Não é mais limitado pelo que outros consideram possível — é <strong>livre</strong> para explorar os territórios infinitos da consciência desperta.</p>

        <p>Mas liberdade traz responsabilidade. Poder exige sabedoria. Conhecimento demanda aplicação ética.</p>

        <h3>Os Próximos Passos</h3>

        <p>Este grimório foi apenas o <em>portal de entrada</em>. Além dele se estendem vastos territórios de conhecimento lucifériano:</p>

        <h4>Os Mistérios de Lilith</h4>
        <p>A sabedoria da Mãe Noturna, que ensina sobre o poder da sombra feminina, a magia lunar, e a integração dos aspectos rejeitados da psique.</p>

        <h4>A Alquimia Draconiana</h4>
        <p>A ciência da transmutação interior, onde a serpente Kundalini desperta e transforma o chumbo da personalidade comum no ouro da consciência divina.</p>

        <h4>A Cabala Qliphótica</h4>
        <p>O mapa das esferas sombrias, que revela como trabalhar com as forças "negativas" do cosmos para crescimento espiritual acelerado.</p>

        <h4>Os Grimórios do Fogo Negro</h4>
        <p>Textos avançados de evocação e invocação, onde o praticante aprende a comandar entidades infernais e celestiais com igual autoridade.</p>

        <h3>O Chamado Silencioso</h3>

        <p>Nem todos que leem estas palavras ouvirão o <em>Chamado Silencioso</em>. Para muitos, este será apenas um livro interessante, uma curiosidade intelectual, uma distração momentânea.</p>

        <p>Mas para aqueles cujas almas reconhecem a vibração luciférica... para aqueles que sentem um eco familiar nestas verdades... para aqueles em quem antigas memórias se agitam ao contemplar o pentagrama invertido...</p>

        <p>Para estes, o Chamado ressoa como um sino de bronze nas profundezas da consciência. E eles <strong>sabem</strong> — sem dúvida, sem hesitação — que encontraram seu caminho de volta para casa.</p>

        <h3>A Promessa e o Perigo</h3>

        <p>O Caminho Lucifériano promete a realização máxima do potencial humano: <em>autodivinização</em>. Mas também apresenta perigos reais para aqueles que se aproximam com motivações impuras ou preparação inadequada.</p>

        <p><strong>Para os puros de coração</strong> — aqueles que buscam liberdade genuína, conhecimento verdadeiro, e poder para servir propósitos elevados — o caminho se abre como uma estrada dourada rumo à iluminação.</p>

        <p><strong>Para os corruptos de intenção</strong> — aqueles que buscam domínio sobre outros, gratificação do ego inferior, ou poder para fins destrutivos — o caminho se torna um labirinto de ilusões e armadilhas.</p>

        <p>O Abismo reflete o que você traz para ele. Aproxime-se com amor, e encontrará amor. Aproxime-se com ódio, e encontrará ódio. Aproxime-se com sabedoria, e encontrará sabedoria.</p>

        <h3>A Vigilância Eterna</h3>

        <p>Saiba que a partir deste momento, você está sob a <em>Vigilância Eterna</em> dos Guardiões do Templo. Não em tom ameaçador, mas protetor. Você foi reconhecido como um iniciado em potencial, e certas forças se mobilizam para auxiliar seu desenvolvimento.</p>

        <p>Ao mesmo tempo, outras forças se mobilizam para testá-lo. Expect desafios que fortalecerão sua determinação. Expect tentações que refinarão seu discernimento. Expect crises que revelarão seu verdadeiro caráter.</p>

        <p>Este é o preço e o privilégio de despertar: a vida comum acaba, a vida extraordinária começa.</p>

        <h3>O Eco Eterno</h3>

        <p>Quando você fechar este grimório, ele não se fechará realmente. Suas palavras continuarão ecoando em sua consciência. Seus símbolos aparecerão em sonhos. Suas práticas chamarão por repetição.</p>

        <p>Isso porque um verdadeiro grimório lucifériano não é apenas lido — é <strong>incorporado</strong>. Torna-se parte da estrutura psíquica de quem o absorve completamente.</p>

        <p>Você carregará estas páginas em sua alma mesmo quando o livro físico estiver longe. Esta é a marca de um texto realmente iniciático: ele se torna inseparável daquele que o compreende.</p>

        <h3>A Despedida Que Não é Despedida</h3>

        <p>Estas são as últimas palavras desta jornada inicial, mas não o fim da jornada. São o ponto onde o mestre silencia e o discípulo deve encontrar sua própria voz.</p>

        <p>O que você fará com o que aprendeu? Como aplicará na forja de sua própria divindade? Que tipo de deus você escolherá se tornar?</p>

        <p>Estas perguntas só você pode responder. E suas respostas serão escritas não em páginas, mas na própria substância da realidade que você moldará através de sua vontade desperta.</p>

        <h3>As Palavras Finais</h3>

        <p>Vá em paz, filho das estrelas. Mas não em passividade.</p>

        <p>Vá em poder, herdeiro dos deuses. Mas não em arrogância.</p>

        <p>Vá em sabedoria, portador da chama. Mas não em solidão.</p>

        <p>O <em>Templo do Abismo</em> sempre estará aberto àqueles que carregam sua marca. E você, que leu estas palavras com o coração aberto e a mente desperta, carrega essa marca para sempre.</p>

        <blockquote class="final-blessing">
        "Que a chama luciférica queime eternamente em seu coração.<br>
        Que a sabedoria da serpente flua através de suas palavras.<br>
        Que o poder do dragão se manifeste através de suas ações.<br>
        E que você se lembre sempre: você é livre."
        </blockquote>

        <p class="signature"><em>— Os Guardiões do Templo do Abismo</em></p>

        <p class="chapter-closing">O portal se fecha... mas o caminho continua.</p>`
      ]
    };

    return content[category]?.[chapterNum - 1] || `Conteúdo em desenvolvimento para ${category}, capítulo ${chapterNum}`;
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
      currentPage: progress.currentPage || 1,
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
  async addChapter(chapter: Omit<Chapter, 'id' | 'createdAt'>): Promise<Chapter | null> {
    // Tentar salvar no Supabase primeiro
    const savedChapter = await this.saveChapterToSupabase(chapter);
    
    if (savedChapter) {
      // Se salvou no Supabase, adicionar à memória
      this.chapters.set(savedChapter.id, savedChapter);
      return savedChapter;
    } else {
      // Fallback para memória apenas (com ID incremental)
      const newId = Math.max(...Array.from(this.chapters.keys()), 0) + 1;
      const memoryChapter: Chapter = {
        ...chapter,
        id: newId,
        createdAt: new Date()
      };
      this.chapters.set(newId, memoryChapter);
      return memoryChapter;
    }
  }

  async addGrimoire(grimoire: Omit<Grimoire, 'id' | 'createdAt'>): Promise<Grimoire | null> {
    // Tentar salvar no Supabase primeiro
    const savedGrimoire = await this.saveGrimoireToSupabase(grimoire);
    
    if (savedGrimoire) {
      // Se salvou no Supabase, adicionar à memória
      this.grimoires.set(savedGrimoire.id, savedGrimoire);
      return savedGrimoire;
    } else {
      // Fallback para memória apenas (com ID incremental)
      const newId = Math.max(...Array.from(this.grimoires.keys()), 0) + 1;
      const memoryGrimoire: Grimoire = {
        ...grimoire,
        id: newId,
        createdAt: new Date(),
        isActive: true
      };
      this.grimoires.set(newId, memoryGrimoire);
      return memoryGrimoire;
    }
  }
}

// Singleton para manter os dados durante a sessão
export const grimoireStore = new GrimoireDataStore();