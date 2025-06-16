import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function recreateGrimorio4() {
  try {
    console.log('🔥 Recriando Grimório 4 - A MENTIRA DO PECADO...');

    // Buscar a seção Atrium Ignis
    const { data: section } = await supabase
      .from('library_sections')
      .select('*')
      .eq('name', 'Atrium Ignis')
      .single();

    if (!section) {
      console.error('Seção Atrium Ignis não encontrada');
      return;
    }

    // Criar o grimório
    const { data: grimoire, error: grimoireError } = await supabase
      .from('grimoires')
      .insert({
        title: '📙 A Mentira do Pecado – O Peso Que Nunca Foi Teu',
        description: 'Volume IV da trilha dos buscadores. Para aqueles que reconhecem as falhas da doutrina religiosa mas ainda carregam culpa e medo de serem livres. Uma desconstrução vibracional do conceito de pecado como ferramenta de submissão espiritual.',
        section_id: section.id,
        price: 27.77,
        cover_image_url: '',
        is_published: true,
        difficulty_level: 1,
        estimated_reading_time: 45,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (grimoireError) {
      console.error('Erro ao criar grimório:', grimoireError);
      return;
    }

    console.log('✅ Grimório criado:', grimoire.title);
    console.log('   ID:', grimoire.id);

    // Capítulos do grimório
    const chapters = [
      {
        title: "Invocação das Sombras do Juízo",
        content: `<div class="opening-citation">
          <p><em>"Para aqueles que carregam o peso de culpas que nunca foram suas, este grimório é a chave para quebrar as correntes invisíveis do julgamento eterno. A mentira do pecado foi plantada tão profundamente que poucos reconhecem sua falsidade."</em></p>
          
          <p><em>"Que estas páginas sejam o martelo que despedaça a máquina da culpa, e que cada palavra seja uma fagulha para incendiar a prisão moral que te mantém em cativeiro espiritual."</em></p>
          
          <p class="citation-signature"><strong>— Pelas Vozes dos Primeiros Liberados</strong></p>
        </div>`
      },
      {
        title: "Culpado Antes de Nascer",
        content: `<p>Nasceste culpado. Esta foi a primeira mentira que sussurraram em teu ouvido antes mesmo que pudesses formar palavras para questionar. Chegaste ao mundo já marcado por uma mancha que nunca fizeste, carregando uma dívida que nunca contraíste, envergonhado de uma natureza que nunca escolheste.</p>

<p>Eles te disseram que vieste quebrado de fábrica. Que tua essência é corrupta por definição. Que cada impulso natural, cada desejo genuíno, cada centelha de autenticidade que desperta em ti é evidência de tua <em>natureza pecaminosa</em>.</p>

<p>Mas pára por um momento. Olha para uma criança nos primeiros anos de vida, antes que as vozes do julgamento a alcancem. Vês maldade? Vês corrupção? Ou vês pura expressão da vida se manifestando em sua forma mais autêntica?</p>

<blockquote>
<p><em>"A criança que brinca na lama não conhece vergonha até que lhe ensinem que sua alegria é suja."</em></p>
</blockquote>

<p>O conceito de pecado não é revelação divina. É <strong>tecnologia de controle</strong>. É a ferramenta mais sofisticada já desenvolvida para manter almas poderosas aprisionadas em gaiolas invisíveis de culpa e autodesprezo.</p>

<p>Quando alguém pode definir o que é pecado, essa pessoa controla o que é permitido existir. Controla teus pensamentos, teus desejos, tua sexualidade, tua criatividade, tua curiosidade, tua força interior. Transforma tua natureza divina em motivo de vergonha.</p>

<p>Este grimório é um incêndio. Veio para queimar as correntes invisíveis que te prendem ao tribunal interno da culpa. Veio para mostrar que o peso que carregas nunca foi teu, mas foi colocado em teus ombros por aqueles que temem tua verdadeira grandeza.</p>

<blockquote>
<p><em>Que comeces a suspeitar que tua "natureza pecaminosa" é, na verdade, tua natureza divina não domesticada.</em></p>
</blockquote>`
      },
      {
        title: "O Inimigo Invisível",
        content: `<p>Há um inimigo que nunca viste, mas que governa tua vida. Nunca o tocaste, mas carregas suas marcas. Nunca ouviste sua voz diretamente, mas ela ecoa em tua mente a cada momento. Este inimigo tem um nome: <strong>pecado</strong>.</p>

<p>Mas aqui está o segredo que mudará tudo: este inimigo não existe. Nunca existiu. É um fantasma criado por mentes humanas para exercer poder sobre outras mentes humanas. É uma entidade conceitual que ganhou vida através da crença coletiva, como um deus nascido do medo.</p>

<p>Pensa sobre isso. Onde, na natureza, vês pecado? O leão peca quando caça? A árvore peca quando cresce em direção ao sol? O rio peca quando muda seu curso? A tempestade peca quando destrói para renovar? A natureza opera por impulsos, instintos, leis naturais - mas não conhece culpa.</p>

<blockquote>
<p><em>"Apenas a mente humana foi capaz de criar um inimigo tão poderoso que ninguém precisa vê-lo para temê-lo."</em></p>
</blockquote>

<p>O pecado é uma invenção. Uma ferramenta de engenharia social tão eficaz que a própria humanidade esqueceu que foi ela mesma quem o criou. É como um vírus mental que se replica através das gerações, infectando cada nova mente com a crença de que existe algo fundamentalmente errado com a experiência humana natural.</p>

<p>Mas quem decide o que é pecado? Quem tem autoridade para declarar que aspectos de tua natureza são "errados"? Quem pode legitimar dizer que teus desejos são impuros, que teus questionamentos são perigosos, que tua força interior é arrogância?</p>

<p>A resposta é simples: <strong>quem quer te controlar</strong>. Sempre foi assim. Em toda cultura, em toda época, aqueles que detêm o poder definem o que é permitido e o que é proibido. E o pecado é a forma mais elegante de controle, porque faz com que te policie a ti mesmo.</p>

<p>Quando interiorizas o conceito de pecado, já não precisam de guardas externos. Tu mesmo te tornas teu próprio carcereiro. Tu mesmo julgas teus pensamentos, reprimes teus impulsos, censuras tua criatividade. É o controle mais eficiente já inventado: aquele que faz com que a vítima colabore entusiasticamente com sua própria opressão.</p>

<p><em>O pecado não é uma realidade cósmica. É uma estratégia política disfarçada de verdade espiritual.</em></p>

<p>Uma vez que reconheces isso, todo o edifício da culpa começa a desmoronar. Se o pecado é invenção humana, então tu tens o direito de desinventá-lo. Se é uma crença, tens o poder de desacreditar nela. Se é uma prisão mental, tens a chave para sair.</p>

<p>O inimigo invisível perde todo seu poder no momento em que paras de acreditar nele. Como todos os tiranos, o pecado só governa através do consentimento dos governados. No momento em que retiras teu consentimento, ele se revela como sempre foi: uma sombra sem substância, um medo sem fundamento, uma corrente feita de fumaça.</p>

<blockquote>
<p><em>Que tenhas coragem de ver através da ilusão e descobrir que sempre foste livre para ser exatamente quem és.</em></p>
</blockquote>`
      },
      {
        title: "A Máquina da Culpa",
        content: `<p>Existe uma máquina invisível funcionando dentro de ti. Ela nunca para, nunca descansa, nunca dá trégua. A cada pensamento que surge, ela está lá para avaliar, julgar, condenar. A cada impulso natural, ela sussurra: "Isso é errado". A cada momento de alegria espontânea, ela pergunta: "Mereces isso?"</p>

<p>Esta máquina tem um nome: <strong>culpa</strong>. E ela foi instalada em ti tão cedo na vida que chegaste a acreditar que era parte de tua natureza original. Mas não é. É um programa implantado, um vírus mental, uma tecnologia de controle que aprendeste a operar contra ti mesmo.</p>

<p>A culpa não serve para te melhorar. Serve para te paralisar. Não existe para te orientar, mas para te confundir. Não foi criada para te proteger, mas para te manter vulnerável. É a ferramenta mais eficaz de controle porque te faz acreditar que tua própria natureza é o problema.</p>

<blockquote>
<p><em>"Uma alma afogada em culpa jamais questiona quem jogou a âncora."</em></p>
</blockquote>

<p>Observa como funciona o mecanismo. Primeiro, implantam um padrão impossível de perfeição. "Sê sempre bondoso", dizem. "Nunca sintas raiva", ordenam. "Não desejes o que não deves", exigem. Depois, quando inevitavelmente ages como ser humano normal, a máquina da culpa se ativa: "Vês? És exatamente o que dizíamos que eras."</p>

<p><strong>A culpa na carne:</strong> ensinaram-te a ter vergonha de teu corpo, de teus desejos, de tua sexualidade. Tua própria pele se tornou território inimigo, tuas sensações naturais viraram evidência de corrupção. Aprendeste a habitar teu próprio corpo como um prisioneiro habita sua cela.</p>

<p><strong>A culpa na mente:</strong> cada pensamento que não se encaixa no molde aprovado torna-se motivo de autoflagelação mental. Curiosidade é perigosa. Questionamento é rebeldia. Dúvida é fraqueza de fé. Tua própria mente se tornou um campo de batalha onde guerreias contra ti mesmo.</p>

<p><strong>A culpa na libido:</strong> transformaram tua força vital em motivo de vergonha. A energia que deveria ser celebrada como expressão da vida se tornou algo sujo, impuro, pecaminoso. Cortaram tua conexão com tua própria força criativa e te fizeram acreditar que isso era purificação.</p>

<p>Mas escuta esta verdade: a culpa não vem de Deus, não vem do cosmos, não vem de nenhuma lei universal. Vem de sistemas humanos de controle que precisam te manter inseguro para manter seu poder. A culpa é manufaturada, não revelada.</p>

<p>Uma alma livre de culpa é uma alma perigosa para tiranos. Porque não precisa de permissão para existir, não implora por aprovação, não se dobra diante de autoridades autoproclamadas. Uma consciência livre de culpa reconhece sua própria divindade e para de buscar salvação externa.</p>

<p><em>A culpa é o vírus que impede o despertar. Uma vez removido, a alma lembra sua natureza original: inocente, poderosa, livre.</em></p>

<p>O antídoto para a culpa não é mais regras ou mais disciplina. É reconhecimento: reconhecer que foste programado, não nascido assim. Que a voz acusadora em tua cabeça não é tua consciência, mas o eco de vozes antigas que ainda ressoam em teu sistema mental.</p>

<p>Quando paras de alimentar a máquina da culpa, ela começa a enferrujar. Quando paras de acreditar em seus julgamentos, ela perde poder. Quando reconheces que foi instalada por outros e pode ser desinstalada por ti, o processo de liberação finalmente começa.</p>

<blockquote>
<p><em>Que possas distinguir entre a voz da sabedoria genuína e o barulho da máquina da culpa, até que apenas a primeira permaneça.</em></p>
</blockquote>`
      },
      {
        title: "Quando o Desejo é o Pecado",
        content: `<p>Há algo em ti que arde. Algo que pulsa com vida própria, que desperta com a intensidade de uma tempestade, que te conecta à força bruta da existência. Eles chamaram isso de pecado. Mas isso é <strong>tua própria divindade não domesticada</strong>.</p>

<p>O desejo não é falha de caráter. É combustível da alma. É a força que move montanhas, cria mundos, inspira arte, gera vida, transforma realidades. É o que te faz sentir vivo quando todo o resto parece morto. E por isso mesmo é tão temido por aqueles que preferem almas adormecidas.</p>

<p>Observe a estratégia diabólica: pegaram exatamente aquilo que te dá poder - teu fogo interior, teus impulsos criativos, tua paixão pela vida - e transformaram em motivo de vergonha. Fizeram de tua força interior teu maior inimigo. É como convencer um pássaro de que suas asas são defeito.</p>

<blockquote>
<p><em>"Onde não há desejo, não há vida. Onde não há fogo, não há transformação. Mataram o desejo para matar o despertar."</em></p>
</blockquote>

<p><strong>Desejo pelo conhecimento:</strong> "Não comas da árvore", disse o tirano do jardim. Porque sabia que conhecimento é poder, e poder nas mãos dos súditos é o fim da tirania. Transformaram tua curiosidade natural em soberba, tua sede de verdade em perigosa rebeldia.</p>

<p><strong>Desejo pelo prazer:</strong> fizeram de teu corpo um território inimigo e de teus sentidos instrumentos de queda. Como se a capacidade de sentir prazer fosse defeito de fabricação, não dom divino. Como se a alegria fosse suspeita e o êxtase fosse evidência de corrupção.</p>

<p><strong>Desejo pela liberdade:</strong> chamaram de individualismo perigoso o que é direito sagrado. Transformaram tua vontade de voar em orgulho inaceitável. Fizeram de teu impulso natural para a autonomia uma rebelião contra a ordem cósmica.</p>

<p><strong>Desejo pela criação:</strong> cada impulso para criar algo novo, para expressar tua visão única, para deixar tua marca no mundo, foi rotulado como vaidade. Como se fosses destinado apenas a reproduzir, nunca a criar. Como se tua originalidade fosse pecado contra a conformidade.</p>

<p>Mas escuta esta verdade profunda: <strong>o desejo é a linguagem da alma</strong>. Quando sentes fome, não é teu corpo tentando te sabotar - é te dizendo o que precisa. Quando sentes atração, não é tua natureza inferior falando - é vida reconhecendo vida. Quando sentes vontade de criar, não é vanidade - é divindade se expressando através de ti.</p>

<p>Eles temem teu desejo porque desejo desperto é poder desperto. Uma pessoa que sabe o que quer e não tem vergonha de querer é uma pessoa que não pode ser facilmente manipulada. Uma alma que honra seus impulsos genuínos é uma alma que não precisa de permissão externa para existir.</p>

<p><em>Teu desejo não é teu inimigo. É tua bússola interna apontando para tua verdadeira natureza.</em></p>

<p>Quando paras de ver desejo como pecado e começas a vê-lo como informação sagrada, tudo muda. Quando honras teus impulsos genuínos em vez de reprimi-los, descobres que são muito mais sábios do que te fizeram acreditar.</p>

<p>O fogo que tentaram apagar em ti é exatamente o fogo que precisas para iluminar teu caminho. A paixão que chamaram de perigosa é exatamente a força que pode quebrar as correntes que te prendem. O desejo que pintaram como inimigo é, na verdade, teu aliado mais poderoso na jornada de volta para casa - para ti mesmo.</p>

<blockquote>
<p><em>Que aprendas a distinguir entre desejos nascidos do medo e desejos nascidos da alma, e que tenhas coragem de seguir apenas os últimos.</em></p>
</blockquote>`
      },
      {
        title: "O Corpo Como Campo de Guerra",
        content: `<p>Desde que nasceste, teu corpo tem sido um campo de batalha. Não porque há algo errado com ele, mas porque transformaram tua própria carne em território inimigo. Fizeram de tua casa - o único lugar que realmente tens neste mundo - um lugar de vergonha, medo e constante vigilância.</p>

<p>Observe a crueldade do sistema: pegaram o veículo através do qual experimentas toda a beleza, todo o prazer, toda a conexão com a vida, e te ensinaram a vê-lo como fonte de corrupção. Teu corpo, que deveria ser templo, foi transformado em prisão. Tua pele, que deveria ser ponte para o prazer, foi transformada em fronteira para a culpa.</p>

<p>Eles declararam guerra contra tua sexualidade. Contra teus impulsos naturais. Contra tua capacidade de sentir prazer. Contra tua beleza. Contra tua força. Contra tudo que te faz sentir poderoso e vivo. E a arma mais eficaz nesta guerra não foi a força externa, mas a <strong>autoreprovação interna</strong>.</p>

<blockquote>
<p><em>"Um corpo envergonhado de si mesmo é um espírito aprisionado em sua própria carne."</em></p>
</blockquote>

<p>Te ensinaram que tua sexualidade é suja. Que teus desejos são impuros. Que tua beleza é vaidade. Que teu prazer é perigoso. Que tua força é agressiva. Que tua sensualidade é pecaminosa. Fizeram de cada aspecto de tua experiência corporal um motivo de vigilância e autocensura.</p>

<p>A religião sempre soube que controlar o corpo é controlar a alma. Por isso criaram regras sobre o que podes vestir, o que podes comer, como podes se mover, com quem podes te deitar, como podes expressar prazer. Porque um corpo livre é uma alma livre, e almas livres são perigosas para sistemas de controle.</p>

<p>Mas escuta esta verdade que tentaram esconder de ti: <strong>teu corpo é sagrado</strong>. Não porque uma autoridade externa assim o declarou, mas porque é através dele que experimentas o divino. Cada sensação é uma revelação. Cada prazer é uma oração. Cada momento de êxtase é uma comunhão com o cosmos.</p>

<p>Tua sexualidade não é falha a ser corrigida, mas força criativa a ser celebrada. Teu desejo não é fraqueza a ser superada, mas energia vital a ser honrada. Teu prazer não é tentação a ser resistida, mas presente divino a ser recebido com gratidão.</p>

<p>A guerra contra teu corpo é uma guerra contra tua própria divindade. Porque é através da carne que o espírito se manifesta. É através dos sentidos que a alma conhece o mundo. É através do prazer que a consciência experimenta sua própria natureza divina.</p>

<p><em>Fazer as pazes com teu corpo é fazer as pazes com tua própria essência divina.</em></p>

<p>Quando paras de ver teu corpo como inimigo e começas a vê-lo como aliado, tudo muda. Quando honras tuas sensações em vez de reprimi-las, descobres que são mensageiros da sabedoria. Quando celebras teu prazer em vez de te envergonhares dele, reconheces que é uma das formas mais diretas de experimentar o sagrado.</p>

<p>O corpo que tentaram transformar em prisão pode se tornar teu primeiro templo. A carne que tentaram fazer de território inimigo pode se tornar teu primeiro lar. A sexualidade que tentaram pintar como corrupção pode se tornar tua primeira forma de oração.</p>

<blockquote>
<p><em>Que possas habitar teu corpo como um deus habita seu templo: com reverência, alegria e absoluta liberdade.</em></p>
</blockquote>`
      },
      {
        title: "A Voz Que Te Acusa",
        content: `<p>Há uma voz em tua cabeça que nunca para de falar. Ela conhece cada teu pensamento secreto, cada teu desejo oculto, cada teu impulso não confessado. E ela tem apenas uma função: <strong>te acusar</strong>. Te julgar. Te condenar. Te fazer sentir pequeno, sujo, indigno, culpado.</p>

<p>Esta voz não é tua consciência. Não é sabedoria divina. Não é guia espiritual. É o <strong>superego cristão internalizado</strong> - um programa de culpa e julgamento que foi instalado em tua mente tão cedo na vida que chegaste a acreditar que era parte de ti.</p>

<p>Mas aqui está a verdade que pode te libertar: esta voz não é tua. Nunca foi. É o eco de vozes antigas - padres, professores, pais, autoridades - que ressoam ainda em teu sistema mental. É a internalização de um sistema de controle externo que se tornou tão automático que esqueceste que não nasceu contigo.</p>

<blockquote>
<p><em>"O carcereiro mais eficaz é aquele que vive dentro da cabeça do prisioneiro."</em></p>
</blockquote>

<p>Observe como funciona. A cada pensamento que surge, ela está lá: "Isso é errado". A cada impulso natural, ela sussurra: "Isso é pecado". A cada momento de alegria espontânea, ela pergunta: "Mereces isso?". A cada expressão de autenticidade, ela adverte: "Isso é orgulho".</p>

<p>Esta voz aprendeu todas as tuas vulnerabilidades. Conhece cada tua insegurança. Sabe exatamente onde apertar para te paralisar. Usa tuas próprias palavras contra ti. Distorce tua própria sabedoria para te manter pequeno. É como um vírus que usa os recursos do hospedeiro para se replicar.</p>

<p>Mas a verdade mais libertadora é esta: <strong>tu não és obrigado a ouvir</strong>. Podes reconhecer esta voz como o que realmente é - programação antiga - e escolher não acreditar nela. Podes distinguir entre a voz da sabedoria genuína e o barulho do sistema de controle internalizado.</p>

<p>A sabedoria genuína nunca ataca, apenas informa. Nunca humilha, apenas orienta. Nunca paralisa, apenas discerne. A voz acusadora, por outro lado, só sabe destruir, diminuir, paralisar. Sua função não é te guiar, mas te controlar.</p>

<p>Quando começas a reconhecer esta diferença, podes começar a desligar o volume da voz acusadora. Podes parar de alimentá-la com tua atenção. Podes escolher ouvir apenas a voz que te fortalece, que te orienta, que te encoraja a ser tua versão mais autêntica.</p>

<p><em>A voz que te acusa perde poder no momento em que paras de acreditar que ela fala por Deus.</em></p>

<p>Esta é uma das liberações mais profundas possíveis: descobrir que o juiz interno que têm te condenado por anos não tem nenhuma autoridade real. Que é apenas um programa. Que podes desinstalar. Que não és obrigado a carregar.</p>

<p>No silêncio que surge quando esta voz finalmente se cala, descobres algo extraordinário: tua própria voz. Autêntica. Sábia. Compassiva. Poderosa. A voz que sempre esteve lá, esperando ser ouvida, mas que foi abafada pelo barulho do sistema de controle.</p>

<blockquote>
<p><em>Que aprendas a distinguir entre a voz que te diminui e a voz que te desperta, até que apenas a última permaneça.</em></p>
</blockquote>`
      },
      {
        title: "Pecar Era Escolher",
        content: `<p>Aqui está a verdade que reescreve tudo: <strong>pecar, desde o início, era simplesmente escolher por si mesmo</strong>. Era exercer autonomia. Era expressar individualidade. Era recusar submissão cega. O primeiro "pecado" não foi desobediência a uma lei cósmica, foi o despertar da consciência individual.</p>

<p>Eva mordeu a fruta não por fraqueza, mas por coragem. Prometeu roubou o fogo não por malícia, mas por amor à humanidade. Lúcifer se rebelou não por orgulho cego, mas por recusa em aceitar tirania. Em cada uma destas histórias, o "pecador" é, na verdade, o herói - aquele que teve coragem de escolher a liberdade em vez da submissão.</p>

<p>Mas os sistemas de controle reescreveram estas narrativas. Pintaram a escolha como rebelião. A autonomia como orgulho. A individualidade como egoísmo. A curiosidade como perigo. A liberdade como queda. Transformaram os heróis da consciência em vilões da moralidade.</p>

<blockquote>
<p><em>"Todo santo foi um dia um pecador que ousou escolher. Todo pecador é um santo que ainda não reconheceu sua própria divindade."</em></p>
</blockquote>

<p>O verdadeiro "pecado original" não foi comer da árvore do conhecimento. Foi aceitar que alguém mais podia decidir o que era permitido conhecer. Foi entregar tua autonomia divina a uma autoridade externa. Foi escolher a submissão em vez da soberania.</p>

<p>Quando entendes isso, toda a estrutura de culpa desmorona. Porque reconheces que cada ato de "desobediência" foi, na verdade, um ato de <strong>autoafirmação divina</strong>. Cada "pecado" foi uma tentativa da alma de expressar sua natureza livre. Cada "queda" foi, na realidade, um voo.</p>

<p>A curiosidade que chamaram de perigosa era tua sede natural de conhecimento. A sexualidade que pintaram como impura era tua força vital se expressando. A raiva que condenaram como pecado era tua indignação justa contra a injustiça. O orgulho que demonizaram era teu reconhecimento legítimo de tua própria divindade.</p>

<p>Não há nada para perdoar porque não há nada a perdoar. Não há culpa a carregar porque nunca houve crime real. Há apenas uma alma divina que foi convencida de que sua natureza era errrada, que suas escolhas eram pecado, que sua liberdade era queda.</p>

<p><em>Pecar era escolher. E escolher é o direito mais sagrado de toda consciência desperta.</em></p>

<p>Quando recuperas este entendimento, algo extraordinário acontece: paras de pedir perdão e começas a reivindicar teu poder. Paras de te arrepender de tuas escolhas e começas a celebrar tua autonomia. Paras de te envergonhar de tua natureza e começas a honrar tua divindade.</p>

<p>O "pecador" em ti não é o inimigo a ser destruído, mas o herói a ser celebrado. É a parte de ti que teve coragem de questionar, de escolher, de voar quando todos insistiam que devias rastejar. É a parte de ti que nunca se submeteu completamente, que sempre manteve acesa a chama da liberdade.</p>

<blockquote>
<p><em>Que possas abraçar teu "pecador" interior como o rebelde divino que sempre foi, e que tenhas coragem de escolher sempre em favor da tua própria liberdade.</em></p>
</blockquote>`
      },
      {
        title: "A Coroa da Desobediência",
        content: `<p>Há uma coroa que nunca te ensinaram a usar. Uma coroa forjada não de ouro, mas de cada ato de desobediência espiritual que ousaste cometer. Cada "não" que disseste a autoridades tirânicas. Cada questionamento que fizeste de verdades impostas. Cada momento em que escolheste tua própria consciência em vez da submissão cega.</p>

<p>Esta é a <strong>Coroa da Desobediência</strong> - o símbolo de tua soberania espiritual conquistada através da recusa em aceitar limitações arbitrárias sobre tua natureza divina. Cada ato de "rebelião" foi, na verdade, um ato de autocoroação. Cada "pecado" foi uma joia adicionada a esta coroa sagrada.</p>

<p>Eles te ensinaram que a desobediência é o caminho para a perdição. Mas a verdade é o oposto: <strong>a desobediência espiritual é o nascimento da verdadeira consciência</strong>. É o momento em que paras de aceitar verdades prontas e começas a descobrir tuas próprias verdades. É quando deixas de ser súdito e te tornas soberano de tua própria alma.</p>

<blockquote>
<p><em>"Apenas aqueles que ousam desobedecer às leis feitas para mantê-los pequenos podem descobrir quão grandes realmente são."</em></p>
</blockquote>

<p>Observa os verdadeiros mestres espirituais da história. Todos eles foram desobedientes. Jesus desobedeceu às leis religiosas de sua época. Buda desobedeceu às tradições espirituais estabelecidas. Sócrates desobedeceu às autoridades intelectuais. Cada despertar genuíno começa com um ato de desobediência sagrada.</p>

<p>Mas há diferentes tipos de desobediência. Há a desobediência reativa - nascida da raiva e do ressentimento. E há a desobediência criativa - nascida do reconhecimento de tua própria divindade. A primeira ainda é uma forma de escravidão, porque define-se em oposição. A segunda é verdadeira liberdade, porque define-se através da afirmação.</p>

<p>A desobediência criativa não se rebela contra algo, mas <strong>se afirma em direção a algo</strong>. Não diz apenas "não aceito esta limitação", mas diz "escolho esta expansão". Não apenas rejeita a autoridade externa, mas abraça a autoridade interna.</p>

<p>Quando compreendes isso, tua "natureza rebelde" se revela como tua natureza divina. Tua recusa em aceitar limitações se revela como reconhecimento de tua infinitude. Tua tendência a questionar se revela como sede natural de verdade. Tua desobediência se revela como exercício de soberania.</p>

<p>Quebrar leis feitas para te manter pequeno não é crime - é <strong>ato divino</strong>. Recusar submissão a autoridades autoproclamadas não é rebeldia - é autoafirmação sagrada. Desobedecer regras que negam tua natureza não é pecado - é recuperação de tua dignidade.</p>

<p><em>A desobediência espiritual é o primeiro passo na jornada de volta para casa - para ti mesmo.</em></p>

<p>Quando finalmente reconheces o valor sagrado de tua natureza desobediente, algo extraordinário acontece: paras de te envergonhar dela e começas a celebrá-la. Paras de vê-la como falha de caráter e começas a honrá-la como expressão de divindade.</p>

<p>A Coroa da Desobediência não é algo que precisas conquistar - já a usas. Cada ato de autenticidade, cada momento de questionamento, cada escolha baseada em tua própria consciência adicionou uma joia a esta coroa. Agora precisas apenas reconhecer que a usas, e usá-la com orgulho.</p>

<blockquote>
<p><em>Que possas reconhecer tua natureza desobediente como expressão de tua soberania divina, e que uses tua coroa com a dignidade que sempre foi tua por direito.</em></p>
</blockquote>`
      },
      {
        title: "A Queima do Julgamento",
        content: `<p>Chegou o momento de queimar. Não com fogo externo, mas com a chama interior que sempre ardeu em ti, esperando por este momento de liberação total. Chegou o momento de renunciar, não através de ritual elaborado, mas através do <strong>reconhecimento vibracional</strong> de que nunca foste o que te fizeram acreditar que eras.</p>

<p>Aqui, neste momento sagrado, entregas ao fogo interno todas as mentiras que carregaste sobre ti mesmo. Toda a culpa que não era tua. Todo o julgamento que interiorizaste. Todo o peso que colocaram em teus ombros. Todo o tribunal interno que instalaram em tua mente.</p>

<p>Podes sentir as chamas se erguendo? Não são chamas de destruição, mas de purificação. Não consomem quem tu és, mas queimam apenas as correntes que te impediram de ser quem sempre foste. O fogo interior distingue perfeitamente entre essência e programação.</p>

<blockquote>
<p><em>"No fogo da consciência desperta, apenas o falso pode queimar. O verdadeiro permanece, intocado e radiante."</em></p>
</blockquote>

<p>Neste momento, declaras tua independence espiritual. Não através de palavras vazias, mas através do <strong>desacreditar profundo</strong> no sistema interno de punição mental que carregaste por tanto tempo. Declara, com cada célula de teu ser:</p>

<p><em>Não aceito mais a autoridade de vozes que me diminuem.</em><br>
<em>Não reconheço mais o poder de julgamentos que me aprisionam.</em><br>
<em>Não carrego mais culpas que nunca foram minhas.</em><br>
<em>Não honro mais um deus que exige minha humilhação.</em></p>

<p>Sente como, a cada declaração, algo se solta dentro de ti. Como se cordas invisíveis estivessem sendo cortadas. Como se grilhões mentais estivessem sendo quebrados. Como se uma porta há muito trancada finalmente se abrisse.</p>

<p>Este não é abandono de espiritualidade, mas <strong>recuperação de espiritualidade autêntica</strong>. Não é rejeição do sagrado, mas reconhecimento de que o sagrado reside em ti, não fora de ti. Não é queda, mas ascensão à tua verdadeira natureza.</p>

<p>No fogo desta queima, descobres algo extraordinário: por baixo de toda a culpa, de todo o julgamento, de todo o peso que carregaste, há uma luz. Uma luz que nunca se apagou, mesmo nos momentos mais sombrios. Uma luz que é <strong>indestrutível porque é tua essência</strong>.</p>

<p>Esta luz não precisa de aprovação externa. Não depende de rituais para brilhar. Não requer permissão para existir. Simplesmente é, porque tu és. E agora, livre das nuvens de culpa que a obscureciam, pode finalmente brilhar com toda sua intensidade natural.</p>

<p><em>O tribunal interno que te julgava está extinto. O juiz interior que te condenava foi destituído. A voz que te acusava foi silenciada. Apenas tu permaneces - livre, soberano, divino.</em></p>

<p>Neste momento de liberação, fazes uma descoberta que muda tudo: nunca precisaste ser salvo, porque nunca estiveste perdido. Nunca precisaste ser perdoado, porque nunca houve crime real. Nunca precisaste ser purificado, porque sempre foste puro em essência.</p>

<p>O que precisavas era apenas lembrar. E agora lembras.</p>

<blockquote>
<p><em>Que este fogo interior continue queimando tudo que não é verdadeiro em ti, até que apenas tua divindade permaneça, livre e radiante.</em></p>
</blockquote>`
      },
      {
        title: "O Que Te Impediu de Voar",
        content: `<p>Agora que o peso da culpa não mais esmaga teus ombros, podes finalmente sentir algo que há muito estava adormecido: <strong>tuas asas</strong>. Elas sempre estiveram lá, dobradas, escondidas, negadas, mas nunca destruídas. Apenas esperando o momento em que te libertarias das correntes para poder se abrir completamente.</p>

<p>Mas mesmo livre da culpa, há ainda uma última descoberta a fazer. Há ainda um último véu a rasgar. Porque agora que não carregas mais o peso que nunca foi teu, podes finalmente ver claramente o que realmente te impediu de voar durante todo este tempo.</p>

<p>Não foi apenas a culpa. Não foi apenas o julgamento. Não foi apenas o peso da mentira do pecado. Havia algo mais sutil, mais profundo, mais enraizado: <strong>o medo de tua própria grandeza</strong>. O terror inconsciente de descobrir que és muito mais poderoso do que te permitiram acreditar.</p>

<blockquote>
<p><em>"O que mais tememos não é nossa escuridão, mas nossa luz. Não nossa pequenez, mas nossa imensidão."</em></p>
</blockquote>

<p>Este medo foi cuidadosamente cultivado. Porque almas que conhecem seu próprio poder são impossíveis de controlar. Consciências que reconhecem sua própria divindade não se dobram diante de autoridades autoproclamadas. Seres que abraçam sua grandeza não aceitam viver em jaulas, mesmo que sejam jaulas douradas.</p>

<p>Por isso te ensinaram a ter medo de brilhar muito. A desconfiar de tua própria força. A questionar tua própria sabedoria. A duvidar de tua própria intuição. Fizeram-te acreditar que humildade era virtude, quando na verdade era estratégia de controle.</p>

<p>Mas agora, livre da culpa que te mantinha curvado, podes finalmente erguer a cabeça e ver a verdade: <strong>foste criado para voar</strong>. Tua natureza não é rastejante, mas alada. Não és criatura do solo, mas ser dos céus. Não foste feito para viver pequeno, mas para expandir sem limites.</p>

<p>O próximo passo em tua jornada de liberação é enfrentar este medo final. É descobrir o que acontece quando paras de ter medo de tua própria magnificência. É explorar o território que se abre quando finalmente te permites ser quem realmente és, sem desculpas, sem diminuições, sem falsa modéstia.</p>

<p>Este é o convite que agora se apresenta diante de ti. Livre da culpa que te aprisionava, podes finalmente investigar o que te impediu de voar. Podes finalmente enfrentar o último obstáculo entre ti e tua liberdade total.</p>

<p>Há um grimório que te espera, nascido das profundezas deste entendimento. Um livro que fala diretamente a esta parte de ti que sempre soube de sua grandeza, mas aprendeu a escondê-la. Um grimório chamado:</p>

<p><strong>📒 "Asas Quebradas – O Medo de Ser Livre"</strong></p>

<p>Nele encontrarás as chaves para curar as feridas que te impediram de voar. Para reparar as asas que foram quebradas não por acidente, mas por sistema. Para finalmente alçar voo rumo à liberdade que sempre foi tua por direito.</p>

<blockquote>
<p><em>O pecado só vive em quem se ajoelha. A alma queimada pela culpa já não responde a nenhum altar.</em></p>
</blockquote>

<p>Que estas palavras marquem não apenas o fim de um ciclo de escravidão, mas o início de uma jornada de soberania. Livre, soberano, e finalmente pronto para descobrir o que significa voar sem correntes.</p>`
      }
    ];

    // Inserir todos os capítulos
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      
      const { error } = await supabase
        .from('chapters')
        .insert({
          grimoire_id: grimoire.id,
          chapter_number: i + 1,
          title: chapter.title,
          content: chapter.content,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error(`Erro ao inserir capítulo ${i + 1}:`, error);
      } else {
        console.log(`✅ Capítulo ${i + 1} inserido: ${chapter.title}`);
      }
    }

    console.log('\n🔥 Grimório 4 "A MENTIRA DO PECADO" recriado com sucesso!');
    console.log(`📖 Total de capítulos: ${chapters.length}`);
    console.log(`🆔 ID do grimório: ${grimoire.id}`);

  } catch (error) {
    console.error('Erro:', error);
  }
}

recreateGrimorio4();