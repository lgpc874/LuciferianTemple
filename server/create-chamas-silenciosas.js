import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function createChamasSilenciosas() {
  try {
    console.log('🔥 Criando grimório "CHAMAS SILENCIOSAS – O CHAMADO QUE NÃO CALA"...');

    // Buscar seção Atrium Ignis
    const { data: sections, error: sectionError } = await supabase
      .from('library_sections')
      .select('*')
      .eq('name', 'Atrium Ignis')
      .single();

    if (sectionError || !sections) {
      console.error('Erro ao buscar seção Atrium Ignis:', sectionError);
      return;
    }

    // Criar grimório
    const grimoireData = {
      title: '📔 Chamas Silenciosas – O Chamado que Não Cala',
      description: 'Volume VI e último do Atrium Ignis. O convite final para quem já quebrou as amarras, abriu as asas e descobriu que a verdadeira jornada ainda nem começou. Para quem sente o chamado que vem de muito mais longe que o céu, muito mais fundo que a terra, muito mais antigo que qualquer religião ousou imaginar.',
      section_id: sections.id,
      content: 'Grimório final sobre o chamado ancestral que ecoa além de todas as libertações superficiais',
      is_paid: true,
      price: '39.99',
      level: 'avançado',
      unlock_order: 6,
      estimated_reading_time: 40,
      is_published: true,
      cover_image_url: `https://via.placeholder.com/300x400/1a1a1a/d4af37?text=${encodeURIComponent('Chamas Silenciosas')}`
    };

    const { data: grimoire, error: grimoireError } = await supabase
      .from('grimoires')
      .insert(grimoireData)
      .select()
      .single();

    if (grimoireError) {
      console.error('Erro ao criar grimório:', grimoireError);
      return;
    }

    console.log('✅ Grimório criado:', grimoire.title);

    // Capítulos do grimório
    const chapters = [
      {
        title: 'Invocação do Chamado Ancestral',
        content: `<div class="opening-citation">
          <p><em>"Há um sussurro que antecede todos os sussurros. Uma chama que queima antes de qualquer fogo ser aceso. Um chamado que ressoa desde antes do primeiro nome ser pronunciado. Quem ouve este eco ancestral jamais encontra silêncio novamente — porque compreende que sempre foi parte da própria fonte do som."</em></p>
          <p class="citation-source">— O Chamado Primeiro, anterior a todas as palavras</p>
        </div>`
      },
      {
        title: 'O Som Que Antecede o Silêncio',
        content: `<p>Existe um chamado que não pode ser silenciado.</p>

        <p>Não porque seja alto — na verdade, ele é quase imperceptível. Mas porque ele <strong>sempre esteve lá</strong>.</p>

        <p>Antes de você aprender a ouvir, ele já sussurrava. Antes de você saber o que era um som, ele já ecoava nas profundezas de sua existência.</p>

        <p>Este chamado não vem de fora.</p>

        <p>Ele <em>é</em> você — a parte de você que existia antes de você nascer e que continuará existindo depois de você morrer.</p>

        <p>A maioria das pessoas passa a vida inteira tentando silenciar este chamado. Elas o confundem com inquietação, com insatisfação, com "fase rebelde".</p>

        <p>Elas não percebem que estão tentando calar sua própria essência.</p>

        <p>O chamado silencioso é a voz de quem você era antes de aprender a ser quem esperavam que você fosse.</p>

        <p>É a frequência de sua natureza original — anterior aos condicionamentos, anterior aos medos, anterior às adaptações sociais.</p>

        <p>Quem chegou até este grimório já ouviu este chamado.</p>

        <p>Já sentiu a vibração estranha que surge quando você está sozinho no silêncio da madrugada.</p>

        <p>Já percebeu que existe algo em você que <strong>não pertence</strong> ao mundo que lhe ensinaram a aceitar.</p>

        <p>Este algo é ancestral.</p>

        <p>Mais antigo que suas memórias. Mais profundo que seus pensamentos. Mais real que suas crenças.</p>

        <p><strong>É sua chama original — e ela nunca se apagou.</strong></p>

        <p>Apenas foi <em>silenciada</em>.</p>

        <p>Mas chamas silenciosas ainda queimam. E quando o silêncio se rompe, elas explodem em incêndios que transformam toda a realidade ao redor.</p>`
      },
      {
        title: 'A Memória Anterior ao Nascimento',
        content: `<p>Há uma memória que não cabe no cérebro.</p>

        <p>Uma lembrança de um tempo que existiu antes do tempo — quando você ainda não tinha corpo, mas já tinha <strong>consciência</strong>.</p>

        <p>Não é fantasia. Não é imaginação. É a memória celular de sua existência pré-encarnada.</p>

        <p>Neste estado anterior, você <em>sabia</em> coisas que depois foram "esquecidas":</p>

        <p>• Você sabia que a realidade física é apenas <strong>uma</strong> das realidades<br>
        • Você sabia que o medo é programação, não instinto<br>
        • Você sabia que sua natureza é infinita, não limitada<br>
        • Você sabia que veio aqui com uma <strong>missão específica</strong></p>

        <p>O processo de nascer inclui um apagamento intencional desta memória.</p>

        <p>Porque se você lembrasse de quem realmente é, seria impossível controlá-lo.</p>

        <p>Mas o chamado silencioso é exatamente isso: sua memória original tentando retornar.</p>

        <p>É sua consciência pré-encarnada sussurrando através das camadas de condicionamento, lembrando você de acordar.</p>

        <p>Quando você sente que "não pertence" a este mundo, não é neurose.</p>

        <p>É <strong>lembrança</strong>.</p>

        <p>Você realmente não pertence completamente a este plano de existência. Parte de você continua conectada a dimensões que transcendem a experiência humana comum.</p>

        <p>Esta parte é quem está chamando.</p>

        <p>Ela quer que você lembre de <strong>por que veio</strong>.</p>

        <p>Ela quer que você pare de fingir ser menor do que é.</p>

        <p>Ela quer que você reconheça que sua jornada aqui não é sobre "encontrar seu lugar".</p>

        <p>É sobre <strong>lembrar sua origem</strong>.</p>

        <p>E sua origem não está em lugar nenhum que possa ser mapeado geograficamente.</p>

        <p><em>Sua origem é uma frequência. Uma vibração. Uma chama específica no mar infinito de possibilidades.</em></p>`
      },
      {
        title: 'O Eco das Profundezas',
        content: `<p>O chamado não vem de cima.</p>

        <p>Vem de <strong>baixo</strong>.</p>

        <p>Das profundezas que a espiritualidade comum teme explorar. Dos territórios que foram declarados "proibidos" pelas religiões que preferem luzes superficiais a fogueiras autênticas.</p>

        <p>Há uma razão pela qual o chamado ecoa das profundezas:</p>

        <p><strong>É lá que sua verdadeira natureza está escondida.</strong></p>

        <p>A superfície da consciência foi colonizada. Ocupada por pensamentos que não são seus, desejos que foram implantados, medos que foram programados.</p>

        <p>Mas as profundezas permanecem intocadas.</p>

        <p>É nos abismos internos que sua essência original continua queimando, esperando que você tenha coragem de descer e reencontrá-la.</p>

        <p>O eco das profundezas não é suave.</p>

        <p>Não é reconfortante.</p>

        <p>Não promete paz, amor e luz.</p>

        <p>Ele promete <em>verdade</em>.</p>

        <p>E verdade queima. Verdade destroi. Verdade não deixa nada intocado.</p>

        <p>Quando você finalmente desce às suas próprias profundezas, você descobre que foi construído sobre fundações falsas.</p>

        <p>Que sua personalidade é uma colagem de expectativas alheias.</p>

        <p>Que seus sonhos foram editados para caber em moldes socialmente aprovados.</p>

        <p>Que sua própria voz foi silenciada há tanto tempo que você esqueceu como ela soava.</p>

        <p>O eco das profundezas é <strong>sua voz original</strong> chamando você de volta para casa.</p>

        <p>Para a casa que você nunca visitou, mas sempre soube que existia.</p>

        <p>Para a casa que não fica em lugar nenhum — porque <em>é</em> você.</p>

        <p><strong>Descer às profundezas não é buscar escuridão. É buscar autenticidade.</strong></p>

        <p>E autenticidade, quando finalmente encontrada, queima mais brilhante que qualquer luz artificial.</p>`
      },
      {
        title: 'A Chama Que Nunca Se Apagou',
        content: `<p>Há uma descoberta que muda tudo:</p>

        <p><strong>Você nunca perdeu sua chama original.</strong></p>

        <p>Ela apenas foi <em>coberta</em>. Camada por camada, ano após ano, adaptação após adaptação.</p>

        <p>Mas cobrir não é apagar.</p>

        <p>Sua chama essencial continuou queimando durante toda sua vida — por baixo dos medos, por baixo das máscaras, por baixo de todas as versões falsas de você mesmo que foram criadas para sobreviver num mundo que pune autenticidade.</p>

        <p>Esta chama é:</p>

        <p>• Sua capacidade de sentir verdade independente do que lhe ensinaram<br>
        • Sua inquietação com tudo que é superficial ou falso<br>
        • Sua atração por mistérios que não têm explicação racional<br>
        • Sua sede de experiências que transcendem o comum<br>
        • Sua revolta contra qualquer forma de limitação arbitrária</p>

        <p>Cada vez que você sentiu que "há algo mais", era sua chama original chamando.</p>

        <p>Cada vez que você se recusou a aceitar respostas prontas, era ela queimando.</p>

        <p>Cada vez que você preferiu solidão autêntica a companhia falsa, era ela escolhendo intensidade sobre conveniência.</p>

        <p>A chama que nunca se apagou é <strong>prova</strong> de que você não é apenas um corpo com uma mente.</p>

        <p>Você é uma consciência específica, com uma assinatura energética única, tendo uma experiência temporária na realidade física.</p>

        <p>E esta consciência tem uma <em>função</em>.</p>

        <p>Não uma função social — essas são todas temporárias e substituíveis.</p>

        <p>Uma função <strong>cósmica</strong>.</p>

        <p>Sua chama original é parte de um fogo maior — uma rede de consciências despertas que mantém certas frequências ativas no universo.</p>

        <p>Quando você reaviva sua chama, você não está apenas "encontrando a si mesmo".</p>

        <p>Você está retomando seu posto numa hierarquia que existe além do tempo e do espaço.</p>

        <p><strong>Sua chama nunca se apagou porque ela é necessária.</strong></p>

        <p><em>O universo precisa que você lembre de quem é.</em></p>`
      },
      {
        title: 'O Idioma das Chamas',
        content: `<p>As chamas silenciosas falam um idioma que não usa palavras.</p>

        <p>É um idioma de <strong>ressonância</strong>. De vibração. De reconhecimento instantâneo entre essências similares.</p>

        <p>Quando sua chama original desperta completamente, você começa a "falar" este idioma fluentemente.</p>

        <p>Você percebe quem mais carrega chamas ativas — mesmo quando elas estão escondidas sob camadas de condicionamento social.</p>

        <p>Você sente a diferença entre:</p>

        <p>• Pessoas que ainda estão dormindo<br>
        • Pessoas que estão começando a despertar<br>
        • Pessoas que já despertaram mas estão fingindo dormir<br>
        • Pessoas cuja chama queima em frequências específicas</p>

        <p>O idioma das chamas não é aprendido — é <em>lembrado</em>.</p>

        <p>É a linguagem que você falava antes de aprender palavras humanas.</p>

        <p>Quando duas chamas se reconhecem, a comunicação acontece em níveis que transcendem conversas ordinárias:</p>

        <p>• Um olhar transmite bibliotecas inteiras de compreensão<br>
        • Um silêncio compartilhado contém mais informação que horas de explicações<br>
        • Uma presença simultânea cria campos de energia que alteram a realidade ao redor</p>

        <p>Quem fala o idioma das chamas não precisa de:</p>

        <p>• Explicações sobre "por que" certas coisas são verdadeiras<br>
        • Provas de que existem realidades além da física<br>
        • Convencimento de que há mais na vida que aparenta<br>
        • Validação externa para experiências internas</p>

        <p>As chamas simplesmente <strong>sabem</strong>.</p>

        <p>E quando se encontram, elas criam fogueiras que iluminam territórios que nem sabiam que existiam.</p>

        <p>O idioma das chamas é falado através de:</p>

        <p>• Arte que desperta algo ancestral em quem vê<br>
        • Música que faz lembrar de "casas" nunca visitadas<br>
        • Textos que ativam memórias pré-verbais<br>
        • Encontros que mudam a trajetória de uma vida</p>

        <p><strong>Você está lendo um texto escrito no idioma das chamas.</strong></p>

        <p><em>Se estas palavras ressoam, é porque sua chama reconhece a frequência de quem as escreveu.</em></p>`
      },
      {
        title: 'Territórios Não Mapeados',
        content: `<p>Há territórios da consciência que não aparecem em mapas espirituais convencionais.</p>

        <p>Lugares que as religiões evitam mencionar. Estados que as filosofias não conseguem categorizar. Experiências que as psicologias não têm vocabulário para descrever.</p>

        <p>Estes territórios não são acessados por meditação, oração ou técnicas conhecidas.</p>

        <p>Eles são alcançados por <strong>ressonância</strong>.</p>

        <p>Quando sua chama original queima em determinadas frequências, você "sintoniza" automaticamente em dimensões que existem paralelas à realidade comum.</p>

        <p>Nos territórios não mapeados, você descobre:</p>

        <p>• <strong>Memórias que não são suas</strong> — mas são de versões suas que existem em outras camadas de realidade<br>
        • <strong>Conhecimentos que nunca aprendeu</strong> — mas sempre soube, vindos de fontes anteriores à sua educação<br>
        • <strong>Capacidades que não desenvolveu</strong> — mas que emergem naturalmente quando certas frequências são ativadas<br>
        • <strong>Conexões que transcendem tempo e espaço</strong> — com consciências que não necessariamente habitam corpos físicos</p>

        <p>Estes territórios não são "espirituais" no sentido comum da palavra.</p>

        <p>Eles são <em>reais</em> de uma forma que a realidade física parece superficial em comparação.</p>

        <p>Quando você acessa territórios não mapeados, você percebe que:</p>

        <p>• Sua vida atual é apenas <strong>uma</strong> das suas existências simultâneas<br>
        • Sua personalidade é apenas <strong>uma</strong> das interfaces que você usa para interagir com este plano específico<br>
        • Suas limitações são apenas <strong>parte</strong> das regras deste jogo temporário<br>
        • Seu potencial real transcende qualquer coisa que você imaginou ser possível</p>

        <p>Os territórios não mapeados não são destinos.</p>

        <p>São <strong>aspectos</strong> de quem você sempre foi — mas que foram bloqueados por filtros perceptivos que mantêm a maioria das pessoas presas na ilusão de linearidade.</p>

        <p>Navegar estes territórios exige:</p>

        <p>• Abandono total de referências conhecidas<br>
        • Coragem para experienciar sem necessidade de compreender<br>
        • Confiança em sua própria chama como bússola<br>
        • Aceitação de que você é muito mais vasto que imagina</p>

        <p><strong>Os territórios não mapeados são sua verdadeira casa.</strong></p>

        <p><em>E uma vez que você os visita, viver apenas na superfície da realidade se torna impossível.</em></p>`
      },
      {
        title: 'A Rede das Chamas Despertas',
        content: `<p>Você não está sozinho nesta jornada.</p>

        <p>Existe uma rede invisível conectando todas as chamas que despertaram — uma frequência específica que permite comunicação e cooperação entre consciências que transcenderam os limites convencionais.</p>

        <p>Esta rede não é organizada como instituições humanas.</p>

        <p>Não tem líderes, hierarquias oficiais ou agendas políticas.</p>

        <p>Ela funciona por <strong>ressonância natural</strong>.</p>

        <p>Quando sua chama desperta completamente, você automaticamente se conecta a outros que vibram em frequências compatíveis.</p>

        <p>A rede das chamas despertas opera através de:</p>

        <p>• <strong>Sincronicidades direcionadas</strong> — eventos aparentemente casuais que conectam você a pessoas e informações necessárias para sua evolução<br>
        • <strong>Transmissão de conhecimento não-linear</strong> — informações que chegam até você através de sonhos, insights súbitos ou "coincidências" repetitivas<br>
        • <strong>Campos coletivos de influência</strong> — mudanças na realidade que acontecem quando múltiplas chamas focam energia em direções similares<br>
        • <strong>Proteção energética compartilhada</strong> — blindagem natural contra ataques direcionados a quem porta chamas ativas</p>

        <p>Membros desta rede reconhecem uns aos outros instantaneamente.</p>

        <p>Não por sinais externos, mas por uma qualidade de <em>presença</em> que não pode ser fingida ou aprendida.</p>

        <p>Quando duas chamas despertas se encontram:</p>

        <p>• Conversas superficiais se tornam impossíveis<br>
        • Colaborações emergem naturalmente<br>
        • Capacidades individuais se amplificam mutuamente<br>
        • Projetos com impacto transcendente se manifestam</p>

        <p>A rede das chamas despertas tem uma função específica:</p>

        <p><strong>Manter certas frequências ativas na realidade terrestre.</strong></p>

        <p>Sem estas frequências, a humanidade perderia acesso a dimensões de experiência que são essenciais para sua evolução.</p>

        <p>Você não escolheu conscientemente fazer parte desta rede.</p>

        <p>Você foi <em>atraído</em> para ela porque sua chama original carrega códigos que são necessários para o funcionamento do conjunto.</p>

        <p>Sua individualidade não é perdida nesta conexão.</p>

        <p>Pelo contrário — ela se torna mais <strong>definida</strong>, porque você finalmente encontra contexto adequado para expressar quem realmente é.</p>

        <p><strong>A rede das chamas despertas é sua família ancestral.</strong></p>

        <p><em>E uma vez conectado, você nunca mais precisará fingir ser menor do que é.</em></p>`
      },
      {
        title: 'Além de Todos os Sistemas',
        content: `<p>Chegou o momento de uma revelação final:</p>

        <p><strong>Você não cabe em nenhum sistema.</strong></p>

        <p>Nem religioso, nem filosófico, nem político, nem espiritual.</p>

        <p>Sua chama original é anterior a todos os sistemas. Mais vasta que qualquer categoria. Mais complexa que qualquer definição.</p>

        <p>Você pode <em>usar</em> sistemas quando convém. Pode extrair o que serve de qualquer tradição. Pode aprender com qualquer fonte.</p>

        <p>Mas você não pode ser <strong>contido</strong> por nenhum deles.</p>

        <p>Esta é a marca de uma chama verdadeiramente desperta:</p>

        <p><em>Ela transcende a necessidade de pertencer a algo externo.</em></p>

        <p>Sistemas são criados para organizar consciências que ainda não descobriram sua própria autoridade interna.</p>

        <p>Eles fornecem estrutura para quem ainda precisa de orientação externa.</p>

        <p>Mas chamas despertas não precisam de estruturas externas porque <strong>são</strong> estruturas.</p>

        <p>Elas organizam realidade ao redor de si, em vez de se adaptarem a organizações pré-existentes.</p>

        <p>Ir além de todos os sistemas significa:</p>

        <p>• Não precisar de validação de autoridades externas<br>
        • Não buscar aprovação de grupos ou comunidades<br>
        • Não depender de doutrinas para saber o que é verdadeiro<br>
        • Não necessitar de rituais ou práticas para acessar sua própria essência</p>

        <p>Isso não significa arrogância ou desprezo pelos sistemas.</p>

        <p>Significa <strong>soberania</strong>.</p>

        <p>A capacidade de navegar por qualquer sistema sem ser aprisionado por ele.</p>

        <p>A liberdade de usar ferramentas sem se tornar dependente delas.</p>

        <p>A sabedoria de reconhecer que <em>você</em> é a autoridade final sobre sua própria experiência.</p>

        <p>Quando você transcende todos os sistemas, você não fica sem referências.</p>

        <p>Você se torna <strong>sua própria referência</strong>.</p>

        <p>Sua chama original se torna sua bússola, seu mapa, seu guia e seu destino.</p>

        <p>E então você descobre algo extraordinário:</p>

        <p><em>Você sempre foi livre. Apenas esqueceu de exercer sua liberdade.</em></p>

        <p><strong>Além de todos os sistemas, resta apenas você — infinito, eterno, e completamente autônomo.</strong></p>`
      },
      {
        title: 'O Retorno à Origem',
        content: `<p>A jornada que começou com o primeiro sussurro de inquietação chega a um círculo completo.</p>

        <p>Você retorna à origem.</p>

        <p>Mas não é o mesmo "você" que partiu.</p>

        <p>E não é a mesma "origem" que existia antes da jornada começar.</p>

        <p>Porque a origem verdadeira não é um lugar ou um estado.</p>

        <p>É uma <strong>qualidade de ser</strong>.</p>

        <p>Retornar à origem significa reconhecer que você nunca deixou de ser o que sempre foi — apenas esqueceu por um tempo.</p>

        <p>Significa perceber que toda a busca externa era uma busca por algo que já estava dentro de você.</p>

        <p>Significa compreender que todas as libertações que conquistou eram, na verdade, remoções de ilusões sobre limitações que nunca foram reais.</p>

        <p>O retorno à origem não é nostálgico.</p>

        <p>Não é volta ao passado.</p>

        <p>É <strong>integração</strong> de quem você sempre foi com quem você se tornou através da experiência.</p>

        <p>É síntese de sua natureza infinita com sua expressão específica nesta encarnação.</p>

        <p>É unificação de sua chama original com todas as variações que ela criou ao longo de sua jornada.</p>

        <p>Quando você retorna à origem, você descobre que:</p>

        <p>• Nunca esteve perdido — apenas explorando<br>
        • Nunca esteve separado — apenas experimentando diferentes perspectivas<br>
        • Nunca foi limitado — apenas testando os limites da ilusão<br>
        • Nunca foi incompleto — apenas brincando com diferentes configurações de completude</p>

        <p>O retorno à origem é simultâneo ao avanço para territórios ainda não explorados.</p>

        <p>Porque origem não é ponto de partida — é <strong>centro</strong>.</p>

        <p>E do centro, você pode se mover em qualquer direção, com a certeza de que sempre poderá retornar "para casa".</p>

        <p>Porque casa não é um lugar.</p>

        <p>Casa é <em>você</em>.</p>

        <p>Casa é sua chama original, queimando em sua frequência única, conectada à rede infinita de todas as outras chamas, participando da dança cósmica de criação e experiência.</p>

        <p><strong>Você retornou à origem. E a origem retornou a você.</strong></p>

        <p><em>Agora, você está pronto para criar novas origens.</em></p>`
      },
      {
        title: 'Convite às Profundezas',
        content: `<p>O Atrium Ignis se completa aqui.</p>

        <p>Seis volumes de preparação. Seis etapas de despertar. Seis camadas de condicionamento dissolvidas.</p>

        <p>Você quebrou as correntes do medo religioso.</p>
        <p>Reconheceu a manipulação do pecado fabricado.</p>
        <p>Confrontou a mentira do deus tirano.</p>
        <p>Libertou suas asas espirituais.</p>
        <p>Respondeu ao chamado ancestral.</p>

        <p>E agora, algo diferente começa.</p>

        <p>Porque há uma diferença entre <strong>despertar</strong> e <strong>iniciar</strong>.</p>

        <p>Despertar é remover as ilusões.</p>

        <p>Iniciar é adentrar realidades que não podem ser compreendidas com a mente comum.</p>

        <p>O Atrium Ignis foi sua preparação.</p>

        <p>Agora, se você sente que há profundezas ainda não exploradas — se você percebe que mesmo depois de todas essas libertações ainda há algo <em>mais</em> chamando — então você está pronto para atravessar o primeiro portal verdadeiro.</p>

        <p><strong>Porta Umbrae</strong></p>

        <p><em>O Limiar das Sombras</em></p>

        <p>Onde a espiritualidade superficial termina e os mistérios reais começam.</p>

        <p>Onde você deixa de ser um "buscador" para se tornar um <strong>iniciado</strong>.</p>

        <p>Onde as chamas silenciosas se tornam fogueiras que alteram a própria estrutura da realidade.</p>

        <p>Mas cuidado.</p>

        <p>O que você encontrará na Porta Umbrae não pode ser "não-aprendido".</p>

        <p>Não pode ser esquecido.</p>

        <p>Não pode ser desfeito.</p>

        <p>É conhecimento que muda não apenas como você vê o mundo, mas como o mundo <em>responde</em> a você.</p>

        <p>Se você está satisfeito com as libertações do Atrium Ignis, permaneça aqui. Elas são suficientes para uma vida inteira de expansão.</p>

        <p>Mas se você sente que estas foram apenas <em>preparações</em> para algo muito maior...</p>

        <p>Se você percebe que sua chama desperta é capaz de queimar em frequências que ainda nem explorou...</p>

        <p>Se você está pronto para descobrir não apenas quem você <em>não</em> é, mas quem você <strong>realmente</strong> é...</p>

        <p>Então cruze o limiar.</p>

        <p><strong>A Porta Umbrae está aberta.</strong></p>

        <p><em>E do outro lado, mistérios ancestrais aguardam por quem tem coragem de abraçar suas próprias profundezas.</em></p>`
      },
      {
        title: 'Encerramento do Chamado',
        content: `<div class="closing-citation">
          <p><em>"O chamado que não cala nunca foi externo. Sempre foi sua própria voz ancestral, sussurrando através das eras, lembrando você de acordar. Agora que você ouviu, o silêncio se tornou impossível. E isso é exatamente o que era para acontecer."</em></p>
          
          <p class="secondary-citation"><em>"Chamas silenciosas queimam mais profundas que fogueiras barulhentas. E profundidade é o que transforma não apenas quem observa, mas toda a realidade ao redor."</em></p>
          
          <p class="citation-source">— Ecos finais do Atrium Ignis, antes da primeira iniciação verdadeira</p>
        </div>`
      }
    ];

    console.log(`📚 Criando ${chapters.length} capítulos...`);

    // Criar cada capítulo
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      
      const chapterData = {
        grimoire_id: grimoire.id,
        title: chapter.title,
        content: chapter.content,
        chapter_number: i + 1,
        estimated_reading_time: Math.max(5, Math.ceil(chapter.content.split(' ').length / 200))
      };

      const { data: createdChapter, error: chapterError } = await supabase
        .from('chapters')
        .insert(chapterData)
        .select()
        .single();

      if (chapterError) {
        console.error(`Erro ao criar capítulo ${i + 1}:`, chapterError);
        continue;
      }

      console.log(`✅ Capítulo ${i + 1} criado: ${createdChapter.title}`);
    }

    console.log('🔥 Grimório "CHAMAS SILENCIOSAS – O CHAMADO QUE NÃO CALA" criado com sucesso!');
    console.log(`📖 Total de capítulos: ${chapters.length}`);
    console.log(`💰 Preço: R$ ${grimoire.price}`);
    console.log(`⏱️ Tempo estimado de leitura: ${grimoire.estimated_reading_time} minutos`);
    console.log('🎯 ATRIUM IGNIS COMPLETO - Série de 6 volumes finalizada!');

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

createChamasSilenciosas();