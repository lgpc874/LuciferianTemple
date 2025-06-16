import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function createMentiraDoPecado() {
  try {
    console.log('📙 Criando "A MENTIRA DO PECADO – O PESO QUE NUNCA FOI TEU"...');

    // Buscar a seção Atrium Ignis
    const { data: section, error: sectionError } = await supabase
      .from('library_sections')
      .select('*')
      .eq('name', 'Atrium Ignis')
      .single();

    if (sectionError) {
      console.error('Erro ao buscar seção:', sectionError);
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
        estimated_reading_time: 45
      })
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
        title: "Sombras do Juízo Eterno",
        content: `
<div class="opening-invocation">
<h3>Abertura do Tribunal Silencioso</h3>
<p><em>"Não há pecado em ser aquilo que os deuses tentaram suprimir. Há apenas a coragem de existir além do medo que plantaram em tua alma."</em></p>
<p class="citation-author">— Fragmentos do Códice da Libertação</p>
</div>

<p>Nasceste culpado. Esta foi a primeira mentira que sussurraram em teu ouvido antes mesmo que pudesses formar palavras para questionar. Chegaste ao mundo já marcado por uma mancha que nunca fizeste, carregando uma dívida que nunca contraíste, envergonhado de uma natureza que nunca escolheste.</p>

<p>Eles te disseram que vieste quebrado de fábrica. Que tua essência é corrupta por definição. Que cada impulso natural, cada desejo genuíno, cada centelha de autenticidade que desperta em ti é evidência de tua <span class="mystical-emphasis">natureza pecaminosa</span>.</p>

<p>Mas pára por um momento. Olha para uma criança nos primeiros anos de vida, antes que as vozes do julgamento a alcancem. Vês maldade? Vês corrupção? Ou vês pura expressão da vida se manifestando em sua forma mais autêntica?</p>

<div class="mystical-quote">
<p><em>"A criança que brinca na lama não conhece vergonha até que lhe ensinem que sua alegria é suja."</em></p>
</div>

<p>O conceito de pecado não é revelação divina. É <span class="mystical-emphasis">tecnologia de controle</span>. É a ferramenta mais sofisticada já desenvolvida para manter almas poderosas aprisionadas em gaiolas invisíveis de culpa e autodesprezo.</p>

<p>Quando alguém pode definir o que é pecado, essa pessoa controla o que é permitido existir. Controla teus pensamentos, teus desejos, tua sexualidade, tua criatividade, tua curiosidade, tua força interior. Transforma tua natureza divina em motivo de vergonha.</p>

<p>Observe como funciona a máquina: primeiro, criam uma lei impossível de cumprir. "Sê perfeito", dizem. "Não tenhas desejos impuros", ordenam. "Não questioneis", exigem. Depois, quando inevitavelmente "falhas" (ou seja, quando és humano), oferecem-se como única fonte de perdão.</p>

<p>É o negócio perfeito: criam a doença e vendem a cura. Quebram tua confiança em ti mesmo e depois se oferecem como único guia confiável. Fazem-te duvidar de tua bondade essencial e depois se proclamam necessários para tua salvação.</p>

<p><span class="revelation-text">Mas e se nunca houve nada para perdoar? E se a culpa foi implantada para te manter pequeno?</span></p>

<p>A verdade que não querem que descubras é esta: nasceste inteiro. Nasceste divino. Nasceste com direito inalienável à alegria, ao prazer, à curiosidade, à expressão autêntica de tua natureza. Não és um erro que precisa ser corrigido, mas uma obra de arte que foi convencida de que é rascunho.</p>

<p>Este grimório é um incêndio. Veio para queimar as correntes invisíveis que te prendem ao tribunal interno da culpa. Veio para mostrar que o peso que carregas nunca foi teu, mas foi colocado em teus ombros por aqueles que temem tua verdadeira grandeza.</p>

<div class="final-blessing">
<p><em>Que comeces a suspeitar que tua "natureza pecaminosa" é, na verdade, tua natureza divina não domesticada.</em></p>
</div>
`
      },
      {
        title: "O Inimigo Invisível",
        content: `
<div class="opening-invocation">
<h3>Revelação do Fantasma Tirano</h3>
<p><em>"O maior inimigo da liberdade é aquele que não existe, mas em quem todos acreditam."</em></p>
<p class="citation-author">— Manuscritos da Resistência Silenciosa</p>
</div>

<p>Há um inimigo que nunca viste, mas que governa tua vida. Nunca o tocaste, mas carregas suas marcas. Nunca ouviste sua voz diretamente, mas ela ecoa em tua mente a cada momento. Este inimigo tem um nome: <span class="mystical-emphasis">pecado</span>.</p>

<p>Mas aqui está o segredo que mudará tudo: este inimigo não existe. Nunca existiu. É um fantasma criado por mentes humanas para exercer poder sobre outras mentes humanas. É uma entidade conceitual que ganhou vida através da crença coletiva, como um deus nascido do medo.</p>

<p>Pensa sobre isso. Onde, na natureza, vês pecado? O leão peca quando caça? A árvore peca quando cresce em direção ao sol? O rio peca quando muda seu curso? A tempestade peca quando destrói para renovar? A natureza opera por impulsos, instintos, leis naturais - mas não conhece culpa.</p>

<div class="mystical-quote">
<p><em>"Apenas a mente humana foi capaz de criar um inimigo tão poderoso que ninguém precisa vê-lo para temê-lo."</em></p>
</div>

<p>O pecado é uma invenção. Uma ferramenta de engenharia social tão eficaz que a própria humanidade esqueceu que foi ela mesma quem o criou. É como um vírus mental que se replica através das gerações, infectando cada nova mente com a crença de que existe algo fundamentalmente errado com a experiência humana natural.</p>

<p>Mas quem decide o que é pecado? Quem tem autoridade para declarar que aspectos de tua natureza são "errrados"? Quem pode legitimar dizer que teus desejos são impuros, que teus questionamentos são perigosos, que tua força interior é arrogância?</p>

<p>A resposta é simples: <span class="mystical-emphasis">quem quer te controlar</span>. Sempre foi assim. Em toda cultura, em toda época, aqueles que detêm o poder definem o que é permitido e o que é proibido. E o pecado é a forma mais elegante de controle, porque faz com que te policie a ti mesmo.</p>

<p>Quando interiorizas o conceito de pecado, já não precisam de guardas externos. Tu mesmo te tornas teu próprio carcereiro. Tu mesmo julgas teus pensamentos, reprimes teus impulsos, censuras tua criatividade. É o controle mais eficiente já inventado: aquele que faz com que a vítima colabore entusiasticamente com sua própria opressão.</p>

<p>Observe como funciona na prática. Quem define o que é pecado automaticamente se posiciona como autoridade moral. Se tua sexualidade é pecado, eles controlam tua intimidade. Se tua curiosidade é pecado, eles controlam teu conhecimento. Se tua individualidade é pecado, eles controlam tua expressão.</p>

<p><span class="revelation-text">O pecado não é uma realidade cósmica. É uma estratégia política disfarçada de verdade espiritual.</span></p>

<p>Uma vez que reconheces isso, todo o edifício da culpa começa a desmoronar. Se o pecado é invenção humana, então tu tens o direito de desinventá-lo. Se é uma crença, tens o poder de desacreditar nela. Se é uma prisão mental, tens a chave para sair.</p>

<p>O inimigo invisível perde todo seu poder no momento em que paras de acreditar nele. Como todos os tiranos, o pecado só governa através do consentimento dos governados. No momento em que retiras teu consentimento, ele se revela como sempre foi: uma sombra sem substância, um medo sem fundamento, uma corrente feita de fumaça.</p>

<div class="final-blessing">
<p><em>Que tenhas coragem de ver através da ilusão e descobrir que sempre foste livre para ser exatamente quem és.</em></p>
</div>
`
      },
      {
        title: "A Máquina da Culpa",
        content: `
<div class="opening-invocation">
<h3>Desmonte do Mecanismo Sombrio</h3>
<p><em>"A culpa é a única corrente que não precisa ser forjada do lado de fora - tu mesmo a forjas do lado de dentro."</em></p>
<p class="citation-author">— Códice da Autoconsciência</p>
</div>

<p>Existe uma máquina invisível funcionando dentro de ti. Ela nunca para, nunca descansa, nunca dá trégua. A cada pensamento que surge, ela está lá para avaliar, julgar, condenar. A cada impulso natural, ela sussurra: "Isso é errado". A cada momento de alegria espontânea, ela pergunta: "Mereces isso?"</p>

<p>Esta máquina tem um nome: <span class="mystical-emphasis">culpa</span>. E ela foi instalada em ti tão cedo na vida que chegaste a acreditar que era parte de tua natureza original. Mas não é. É um programa implantado, um vírus mental, uma tecnologia de controle que aprendeste a operar contra ti mesmo.</p>

<p>A culpa não serve para te melhorar. Serve para te paralisar. Não existe para te orientar, mas para te confundir. Não foi criada para te proteger, mas para te manter vulnerável. É a ferramenta mais eficaz de controle porque te faz acreditar que tua própria natureza é o problema.</p>

<div class="mystical-quote">
<p><em>"Uma alma afogada em culpa jamais questiona quem jogou a âncora."</em></p>
</div>

<p>Observa como funciona o mecanismo. Primeiro, implantam um padrão impossível de perfeição. "Sê sempre bondoso", dizem. "Nunca sintas raiva", ordenam. "Não desejes o que não deves", exigem. Depois, quando inevitavelmente ages como ser humano normal, a máquina da culpa se ativa: "Vês? És exatamente o que dizíamos que eras."</p>

<p>A culpa na carne: ensinaram-te a ter vergonha de teu corpo, de teus desejos, de tua sexualidade. Tua própria pele se tornou território inimigo, tuas sensações naturais viraram evidência de corrupção. Aprendeste a habitar teu próprio corpo como um prisioneiro habita sua cela.</p>

<p>A culpa na mente: cada pensamento que não se encaixa no molde aprovado torna-se motivo de autoflagelação mental. Curiosidade é perigosa. Questionamento é rebeldia. Dúvida é fraqueza de fé. Tua própria mente se tornou um campo de batalha onde guerreias contra ti mesmo.</p>

<p>A culpa na libido: transformaram tua força vital em motivo de vergonha. A energia que deveria ser celebrada como expressão da vida se tornou algo sujo, impuro, pecaminoso. <span class="mystical-emphasis">Cortaram tua conexão com tua própria força criativa</span> e te fizeram acreditar que isso era purificação.</p>

<p>Mas escuta esta verdade: a culpa não vem de Deus, não vem do cosmos, não vem de nenhuma lei universal. Vem de sistemas humanos de controle que precisam te manter inseguro para manter seu poder. A culpa é manufaturada, não revelada.</p>

<p>Uma alma livre de culpa é uma alma perigosa para tiranos. Porque não precisa de permissão para existir, não implora por aprovação, não se dobra diante de autoridades autoproclamadas. Uma consciência livre de culpa reconhece sua própria divindade e para de buscar salvação externa.</p>

<p><span class="revelation-text">A culpa é o vírus que impede o despertar. Uma vez removido, a alma lembra sua natureza original: inocente, poderosa, livre.</span></p>

<p>O antídoto para a culpa não é mais regras ou mais disciplina. É reconhecimento: reconhecer que foste programado, não nascido assim. Que a voz acusadora em tua cabeça não é tua consciência, mas o eco de vozes antigas que ainda ressoam em teu sistema mental.</p>

<p>Quando paras de alimentar a máquina da culpa, ela começa a enferrujar. Quando paras de acreditar em seus julgamentos, ela perde poder. Quando reconheces que foi instalada por outros e pode ser desinstalada por ti, o processo de liberação finalmente começa.</p>

<div class="final-blessing">
<p><em>Que possas distinguir entre a voz da sabedoria genuína e o barulho da máquina da culpa, até que apenas a primeira permaneça.</em></p>
</div>
`
      },
      {
        title: "Quando o Desejo é o Pecado",
        content: `
<div class="opening-invocation">
<h3>Incêndio da Chama Natural</h3>
<p><em>"Chamaram de pecado o que era centelha divina, e de impureza o que era fogo sagrado da vida."</em></p>
<p class="citation-author">— Pergaminhos da Chama Não Domesticada</p>
</div>

<p>Há algo em ti que arde. Algo que pulsa com vida própria, que desperta com a intensidade de uma tempestade, que te conecta à força raw da existência. Eles chamaram isso de pecado. Mas isso é <span class="mystical-emphasis">tua própria divindade não domesticada</span>.</p>

<p>O desejo não é falha de caráter. É combustível da alma. É a força que move montanhas, cria mundos, inspira arte, gera vida, transforma realidades. É o que te faz sentir vivo quando todo o resto parece morto. E por isso mesmo é tão temido por aqueles que preferem almas adormecidas.</p>

<p>Observe a estratégia diabólica: pegaram exatamente aquilo que te dá poder - teu fogo interior, teus impulsos criativos, tua paixão pela vida - e transformaram em motivo de vergonha. Fizeram de tua força interior teu maior inimigo. É como convencer um pássaro de que suas asas são defeito.</p>

<div class="mystical-quote">
<p><em>"Onde não há desejo, não há vida. Onde não há fogo, não há transformação. Mataram o desejo para matar o despertar."</em></p>
</div>

<p>Desejo pelo conhecimento: "Não comas da árvore", disse o tirano do jardim. Porque sabia que conhecimento é poder, e poder nas mãos dos súditos é o fim da tirania. Transformaram tua curiosidade natural em soberba, tua sede de verdade em perigosa rebeldia.</p>

<p>Desejo pelo prazer: fizeram de teu corpo um território inimigo e de teus sentidos instrumentos de queda. Como se a capacidade de sentir prazer fosse defeito de fabricação, não dom divino. Como se a alegria fosse suspeita e o êxtase fosse evidência de corrupção.</p>

<p>Desejo pela liberdade: chamaram de individualismo perigoso o que é direito sagrado. Transformaram tua vontade de voar em orgulho inaceitável. Fizeram de teu impulso natural para a autonomia uma rebelião contra a ordem cósmica.</p>

<p>Desejo pela criação: cada impulso para criar algo novo, para expressar tua visão única, para deixar tua marca no mundo, foi rotulado como vaidade. Como se fosses destinado apenas a reproduzir, nunca a criar. Como se tua originalidade fosse pecado contra a conformidade.</p>

<p>Mas escuta esta verdade profunda: <span class="mystical-emphasis">o desejo é a linguagem da alma</span>. Quando sentes fome, não é teu corpo tentando te sabotar - é te dizendo o que precisa. Quando sentes atração, não é tua natureza inferior falando - é vida reconhecendo vida. Quando sentes vontade de criar, não é vanidade - é divindade se expressando através de ti.</p>

<p>Eles temem teu desejo porque desejo desperto é poder desperto. Uma pessoa que sabe o que quer e não tem vergonha de querer é uma pessoa que não pode ser facilmente manipulada. Uma alma que honra seus impulsos genuínos é uma alma que não precisa de permissão externa para existir.</p>

<p><span class="revelation-text">Teu desejo não é teu inimigo. É tua bússola interna apontando para tua verdadeira natureza.</span></p>

<p>Quando paras de ver desejo como pecado e começas a vê-lo como informação sagrada, tudo muda. Quando honras teus impulsos genuínos em vez de reprimi-los, descobres que são muito mais sábios do que te fizeram acreditar.</p>

<p>O fogo que tentaram apagar em ti é exatamente o fogo que precisas para iluminar teu caminho. A paixão que chamaram de perigosa é exatamente a força que precisa para quebrar as correntes que te prendem. O desejo que rotularam como impuro é exatamente a energia que necessitas para criar a vida que realmente queres.</p>

<div class="final-blessing">
<p><em>Que possas reconhecer teu desejo como fogo sagrado e nunca mais peças desculpas por arder com vida.</em></p>
</div>
`
      },
      {
        title: "O Corpo Como Campo de Guerra",
        content: `
<div class="opening-invocation">
<h3>Libertação do Templo Sitiado</h3>
<p><em>"Fizeram de teu corpo um campo de batalha onde guerreias contra ti mesmo. Mas o templo sempre foi sagrado - apenas esqueceram de te contar."</em></p>
<p class="citation-author">— Fragmentos da Reconciliação Sagrada</p>
</div>

<p>Há uma guerra acontecendo dentro de ti. Não é uma guerra cósmica entre bem e mal, não é batalha espiritual entre luz e trevas. É uma guerra muito mais sutil e muito mais cruel: a guerra que aprendeste a travar contra teu próprio corpo.</p>

<p>Desde pequeno, ensinaram-te que teu corpo é suspeito. Que tuas sensações são perigosas. Que teu prazer é evidência de fraqueza moral. Que tua própria carne é território inimigo a ser conquistado, dominado, suprimido. <span class="mystical-emphasis">Transformaram teu lar em prisão</span>.</p>

<p>Fizeram-te acreditar que és uma alma pura aprisionada em um corpo corrupto. Que tua verdadeira natureza é espiritual e tua natureza física é obstáculo a ser superado. Mas isso é a inversão mais cruel de todas: separar-te de ti mesmo, fazer-te estrangeiro em tua própria pele.</p>

<div class="mystical-quote">
<p><em>"A alma que rejeita o corpo rejeita metade de sua própria divindade."</em></p>
</div>

<p>Observa como operam os soldados dessa guerra interna. A vergonha é sua arma principal: vergonha de tuas funções naturais, vergonha de teus ciclos biológicos, vergonha de tua sexualidade, vergonha de teus apetites, vergonha até mesmo de tua aparência que não se conforma aos padrões impossíveis de pureza.</p>

<p>A repressão é sua estratégia: reprimir impulsos naturais, reprimir necessidades físicas, reprimir expressões espontâneas de alegria corporal. Como se cada "não" que dizes a teu corpo te aproximasse de Deus, quando na verdade te afasta de ti mesmo.</p>

<p>A punição é seu método: jejuns extremos disfarçados de purificação, negação de prazeres simples disfarçada de disciplina espiritual, autoflagelação física ou emocional disfarçada de penitência. Fazem-te acreditar que maltratar teu corpo é sinal de evolução espiritual.</p>

<p>Mas escuta esta verdade revolucionária: <span class="mystical-emphasis">teu corpo não é obstáculo para o divino - é manifestação do divino</span>. Não é prisão da alma - é expressão da alma. Não é fonte de pecado - é templo de experiência sagrada.</p>

<p>Cada célula de teu corpo carrega a mesma inteligência cósmica que move as estrelas. Cada batimento de teu coração ecoa o ritmo fundamental do universo. Cada respiração te conecta ao mesmo ar que sustenta toda vida no planeta. Como pode algo tão miraculous ser intrinsecamente corrupto?</p>

<p>A guerra contra o corpo é, na verdade, guerra contra a vida encarnada. É a tentativa de te fazer rejeitar a experiência humana completa em favor de uma versão edulcorada, desencarnada, segura de espiritualidade. É transformar-te em fantasma enquanto ainda estás vivo.</p>

<p><span class="revelation-text">Quando fazes paz com teu corpo, descobres que ele sempre foi teu aliado, nunca teu inimigo.</span></p>

<p>O corpo sabe coisas que a mente ainda está aprendendo. Ele sente perigo antes que possas analisá-lo. Reconhece verdade antes que possas explicá-la. Responde à beleza de formas que transcendem compreensão intelectual. É antena cósmica, não instrumento de queda.</p>

<p>Quando paras de guerrear contra teu corpo e começas a escutá-lo, descobres que suas necessidades são sábias, seus impulsos são informativos, seus prazeres são dádivas, não armadilhas. Descobres que cuidar bem de teu corpo não é vanidade - é responsabilidade sagrada.</p>

<p>A reconciliação começa quando reconheces que não tens um corpo - tu És um corpo. E esse corpo é sagrado não apesar de sua humanidade, mas por causa dela. É através dele que experimentas a vida, o amor, a beleza, a criação. É teu veículo para a experiência divina, não obstáculo para ela.</p>

<div class="final-blessing">
<p><em>Que possas habitar teu corpo como templo, não como campo de batalha, e descobrir que o sagrado sempre esteve tão próximo quanto tua própria pele.</em></p>
</div>
`
      },
      {
        title: "A Voz Que Te Acusa",
        content: `
<div class="opening-invocation">
<h3>Silenciamento do Tribunal Interior</h3>
<p><em>"A voz mais cruel que ouves não é a de teus inimigos externos, mas a do acusador que carregas dentro de ti."</em></p>
<p class="citation-author">— Manuscritos do Silêncio Libertador</p>
</div>

<p>Há uma voz em tua cabeça que nunca descansa. Ela está sempre vigilante, sempre crítica, sempre pronta para te lembrar de cada falha, cada imperfeição, cada momento em que não correspondeste às expectativas impossíveis que foram plantadas em ti. Esta voz tem nome: <span class="mystical-emphasis">o superego cristão internalizado</span>.</p>

<p>Mesmo que tenhas abandonado a religião há anos, mesmo que te consideres livre dos dogmas, essa voz continua operando. Porque foi implantada tão profundamente em tua psique que se tornou parte do que pensas ser tua própria consciência. Mas não é. É um programa estranho rodando em teu sistema mental.</p>

<p>Esta voz fala a linguagem da culpa com fluência nativa. "Não devias ter pensado isso", sussurra. "Não mereces aquilo", declara. "És egoísta por desejar isso", acusa. "Deverias ter vergonha", sentencia. E você escuta, porque durante tanto tempo acreditaste que era a voz da moralidade.</p>

<div class="mystical-quote">
<p><em>"O tirano mais eficaz é aquele que convence a vítima de que sua voz é a voz da consciência."</em></p>
</div>

<p>Mas observe atentamente esta voz. Repara no tom, na linguagem, na natureza de suas acusações. Ela soa como amor? Como sabedoria? Como orientação genuína? Ou soa como crítica constante, julgamento implacável, controle através do medo?</p>

<p>A verdadeira consciência é gentil mesmo quando é firme. Informa sem humilhar. Orienta sem diminuir. A voz do acusador interno, por outro lado, é sempre cruel, sempre destrutiva, sempre focada em te fazer sentir pequeno, culpado, inadequado.</p>

<p>Esta voz aprendeu a imitar autoridade moral, mas é apenas eco de sistemas de controle que se instalaram em tua mente quando eras jovem demais para discernir entre orientação genuína e manipulação psicológica. É como vírus de computador que se disfarça de programa legítimo.</p>

<p>A voz que te acusa tem alguns truques prediletos. Ela ama comparações: sempre há alguém mais puro, mais disciplinado, mais "espiritual" que tu. Ela adora impossibilidades: sempre há padrões mais altos que podes alcançar, mais perfeição que podes demonstrar. Ela se alimenta de teu medo de não ser bom o suficiente.</p>

<p><span class="mystical-emphasis">Mas aqui está o segredo: esta voz não é tua. Nunca foi.</span> É composta de fragmentos de vozes reais - pais, professores, líderes religiosos, sociedade - que foram internalizadas e agora operam como sistema autônomo de controle interno.</p>

<p>Quando começás a questionar esta voz, algo interessante acontece. Ela fica mais alta, mais insistente, mais desesperada. Porque seu poder depende de tua crença nela. No momento em que paras de aceitar automaticamente seus julgamentos, ela começa a perder força.</p>

<p><span class="revelation-text">A liberação começa quando aprendes a distinguir entre tua voz autêntica e a voz do programa de controle interno.</span></p>

<p>Tua voz autêntica nunca te diminui. Pode te desafiar, pode te questionar, pode te convidar ao crescimento - mas sempre com amor, sempre com respeito por tua dignidade inerente. A voz do acusador interno sempre te ataca, sempre te desvaloriza, sempre te faz sentir fundamentalmente inadequado.</p>

<p>O processo de silenciar o acusador interno não é rápido nem fácil. Ele teve décadas para se estabelecer. Mas é possível. Começa com reconhecimento: toda vez que ouvires julgamento cruel contra ti mesmo, para e pergunta: "De quem é realmente esta voz?"</p>

<p>Gradualmente, aprendes a não dar atenção automática a cada pensamento que surge. Aprendes que podes observar os julgamentos sem acreditar neles, escutar as acusações sem aceitá-las, reconhecer as críticas sem interiorizá-las.</p>

<div class="final-blessing">
<p><em>Que possas distinguir entre a voz da sabedoria genuína e o eco dos programas de controle, até que apenas tua voz autêntica permaneça.</em></p>
</div>
`
      },
      {
        title: "Pecar Era Escolher",
        content: `
<div class="opening-invocation">
<h3>Revelação da Escolha Primordial</h3>
<p><em>"No jardim das primeiras histórias, pecar era escolher conhecer ao invés de obedecer. Era preferir crescer a permanecer criança eterna."</em></p>
<p class="citation-author">— Anais da Primeira Escolha</p>
</div>

<p>Há uma história que contam sobre o primeiro pecado. Uma mulher, uma árvore, uma escolha. Mas escuta a mesma história com ouvidos diferentes, e descobrirás que não é história sobre queda - é história sobre <span class="mystical-emphasis">despertar</span>.</p>

<p>Eva não foi tentada por uma serpente malévola. Foi apresentada a uma escolha fundamental: permanecer em inocência infantil ou crescer através do conhecimento. Escolher segurança da ignorância ou coragem da consciência. Ela escolheu crescer. E por isso a chamaram de pecadora.</p>

<p>Prometheus não roubou o fogo dos deuses por malícia. Viu a humanidade tremendo na escuridão e decidiu que mereciam luz própria. Escolheu dar aos humanos o poder de criar, transformar, evoluir. Por isso foi condenado a sofrimento eterno. Seu "crime" foi acreditar que os humanos mereciam ser mais do que eram.</p>

<div class="mystical-quote">
<p><em>"Em toda história de 'pecado', há sempre alguém que escolheu crescer quando lhe ordenaram permanecer pequeno."</em></p>
</div>

<p>Percebês o padrão? Em cada narrativa sobre pecado original, há sempre a mesma dinâmica: autoridade exige obediência cega, oferece segurança em troca de submissão, promete proteção em troca de infantilidade permanente. E sempre há alguém corajoso o suficiente para dizer: "Não. Queremos mais."</p>

<p>Pecar, na sua essência original, sempre foi about escolher. Escolher crescer quando te dizem para permanecer estático. Escolher questionar quando te dizem para aceitar. Escolher tua própria direção quando te dizem para seguir cegamente. Escolher ser sujeito de tua própria vida ao invés de objeto da vontade alheia.</p>

<p>Eles transformaram essa capacidade divina - a capacidade de escolher - em motivo de vergonha. Fizeram da autonomia um crime. Transformaram a coragem de ser responsável por tua própria existência em rebelião contra a ordem cósmica.</p>

<p>Mas aqui está a verdade que tentam esconder: <span class="mystical-emphasis">a capacidade de escolher é tua marca divina</span>. É o que te distingue de todas as outras criaturas. É teu poder mais sagrado e, por isso mesmo, o mais temido por aqueles que preferem governar sobre servos ao invés de interagir com iguais.</p>

<p>Cada vez que escolhes tua própria verdade ao invés de aceitar a verdade oficial, estás "pecando" no sentido original. Cada vez que honras tua intuição ao invés de seguir regras externas, estás sendo "rebelde" como Eva foi rebelde. Cada vez que usas teu poder pessoal para melhorar tua vida ou a vida de outros, estás sendo "ladrão" como Prometheus foi ladrão.</p>

<p>E isso é algo para celebrar, não para te envergonhar. Porque significar que ainda tens acesso ao poder mais fundamental de todos: o poder de escolher quem és, o que acreditas, como vives, em que te tornas.</p>

<p><span class="revelation-text">O pecado original não foi desobediência - foi o nascimento da consciência individual. Não foi queda - foi despertar.</span></p>

<p>Quando reconheces que "pecar" sempre foi about exercer tua capacidade divina de escolha, toda a narrativa de culpa desmorona. Não há nada para ser perdoado porque não houve crime original. Houve apenas o momento em que a humanidade decidiu crescer.</p>

<p>Cada escolha que fazes é echo dessa primeira escolha. Cada vez que decides por ti mesmo, estás honrando o mesmo impulso que levou Eva à árvore e Prometheus ao monte dos deuses. Não és descendente de pecadores - és herdeiro de pioneiros da consciência.</p>

<div class="final-blessing">
<p><em>Que possas celebrar tua capacidade de escolher como dádiva divina e nunca mais peças desculpas por exercer teu direito à autodeterminação.</em></p>
</div>
`
      },
      {
        title: "A Coroa da Desobediência",
        content: `
<div class="opening-invocation">
<h3>Coroação do Soberano Interior</h3>
<p><em>"A desobediência espiritual não é queda da graça - é ascensão à soberania. É o momento em que paras de ser súdito e te tornas rei de tua própria existência."</em></p>
<p class="citation-author">— Códice da Soberania Sagrada</p>
</div>

<p>Há um momento sagrado na jornada de cada alma: o momento em que ela para de pedir permissão para existir. Quando para de buscar aprovação externa para seus pensamentos, desejos, escolhas. Quando finalmente compreende que <span class="mystical-emphasis">obediência cega não é virtude - é abdicação de sua divindade</span>.</p>

<p>Chamaram a isso de desobediência. Rotularam como rebelião perigosa. Transformaram em pecado capital. Mas na verdade é o nascimento da verdadeira espiritualidade: a espiritualidade do ser soberano que reconhece sua própria autoridade divina.</p>

<p>Obediência tem seu lugar - quando serve ao crescimento, à sabedoria, ao bem-estar genuíno. Mas obediência como fim em si mesma, obediência que exige que abdiques de teu discernimento, obediência que te transforma em fantoche - isso não é virtude. É escravidão espiritual.</p>

<div class="mystical-quote">
<p><em>"A alma que nunca desobedeceu nunca aprendeu a escolher. E uma alma que não pode escolher não pode verdadeiramente amar."</em></p>
</div>

<p>Observe as grandes figuras espirituais da história. Jesus desobedeceu às leis religiosas de seu tempo. Buddha abandonou as tradições de sua cultura. Todos os místicos autênticos, de uma forma ou outra, disseram "não" às autoridades estabelecidas e "sim" à verdade que descobriram em si mesmos.</p>

<p>A desobediência espiritual não é capricho ou rebeldia adolescente. É o exercício maduro do discernimento. É a coragem de dizer: "Examinei o que me pedem para acreditar, e minha consciência não pode aceitar." É a integridade de permanecer fiel à tua verdade mesmo quando isso te coloca em conflito com expectativas externas.</p>

<p>Toda lei feita para te manter pequeno merece ser quebrada. Toda regra criada para limitar teu crescimento merece ser questionada. Todo sistema que exige que traias tua natureza autêntica para ser aceito merece ser desafiado.</p>

<p>Isso não é licença para caos irresponsável. É convite à <span class="mystical-emphasis">responsabilidade suprema</span>: a responsabilidade de pensar por ti mesmo, sentir por ti mesmo, escolher por ti mesmo. É o reconhecimento de que não podes terceirizar tua consciência para nenhuma autoridade externa, por mais respeitada que seja.</p>

<p>A coroa da desobediência não é ornamento de ouro que se coloca na cabeça. É reconhecimento interior de que tens autoridade divina sobre tua própria existência. Que ninguém mais pode viver tua vida por ti, ninguém mais pode fazer tuas escolhas por ti, ninguém mais pode determinar teu destino por ti.</p>

<p><span class="revelation-text">Quando finalmente colocas a coroa da desobediência, descobres que sempre foi tua por direito divino.</span></p>

<p>Isso não te torna arrogante - te torna responsável. Não te isola - te conecta mais autenticamente com outros. Porque só alguém que é verdadeiramente livre pode genuinamente escolher se conectar. Só alguém que não está sob coerção pode oferecer amor real.</p>

<p>A desobediência espiritual é ato de amor próprio e amor cósmico simultaneamente. É dizer: "Respeito suficientemente a vida para viver a minha de forma autêntica." É declarar: "Honro suficientemente a criação para expressar minha parte única nela."</p>

<p>Quando usas a coroa da desobediência, paras de ser eco e te tornas voz original. Paras de ser cópia e te tornas criação única. Paras de ser seguidor e te tornas pioneiro de teu próprio caminho.</p>

<div class="final-blessing">
<p><em>Que possas usar a coroa da desobediência com sabedoria e nunca mais te curves diante de tiranos que exigem tua alma em troca de sua aprovação.</em></p>
</div>
`
      },
      {
        title: "A Queima do Julgamento",
        content: `
<div class="opening-invocation">
<h3>Incêndio do Tribunal Mental</h3>
<p><em>"No fogo da libertação, queimam primeiro os julgamentos que carregavas contra ti mesmo. As correntes externas só caem depois que as internas se transformam em cinzas."</em></p>
<p class="citation-author">— Rituais da Purificação Mental</p>
</div>

<p>Chegou o momento do incêndio. Não incêndio de destruição, mas de purificação. Não fogo que consome, mas fogo que liberta. É hora de queimar o sistema interno de punição que carregaste durante toda tua vida como se fosse parte de tua natureza.</p>

<p>Durante décadas, mantiveste um tribunal funcionando dentro de tua mente. Juízes invisíveis que nunca dormem, sempre prontos para sentenciar cada pensamento, cada sentimento, cada impulso. <span class="mystical-emphasis">Promotores internos que acusam, defensores ausentes, veredictos sempre de culpabilidade</span>.</p>

<p>Este tribunal mental consome energia psíquica que poderia estar sendo usada para criar, amar, crescer, experimentar alegria. Mas em vez disso, é desperdiçada em julgamentos constantes, autocensura, monitoramento interno obsessivo de cada movimento da alma.</p>

<div class="mystical-quote">
<p><em>"A alma que se liberta do julgamento interno descobre que nunca houve nada para ser julgado - apenas vida para ser vivida."</em></p>
</div>

<p>Visualiza por um momento este tribunal em tua mente. Vês as figuras sombrias sentadas em altos assentos? Ouves o bater constante do martelo da condenação? Sentes o peso das sentenças que impuseste a ti mesmo ao longo dos anos?</p>

<p>Agora imagina um fogo começando no centro dessa sala mental. Não fogo destruidor, mas fogo transformador. As figuras do julgamento não são queimadas - são reveladas como sempre foram: ilusões, fantasmas, ecos de vozes antigas que não têm poder real sobre ti.</p>

<p>À medida que o fogo cresce, os assentos elevados dos juízes se dissolvem. O martelo da condenação se transforma em poeira. Os códigos de leis impossíveis que usavam para te julgar se revelam escritos em fumaça, sem substância real.</p>

<p>E no centro do incêndio, onde antes estava o banco dos réus onde colocavas a ti mesmo, agora há apenas espaço aberto. Espaço para respirar, para ser, para existir sem justificação constante.</p>

<p><span class="mystical-emphasis">Desacreditar não é processo intelectual - é ato de coragem emocional.</span> É decidir parar de alimentar o sistema interno de punição. É retirar teu consentimento do programa de culpa que roda em background em tua mente.</p>

<p>Quando paras de acreditar nos julgamentos que fazes sobre ti mesmo, algo extraordinário acontece. Descobres que a voz da sabedoria genuína é completamente diferente da voz do julgamento. A sabedoria informa sem condenar. Orienta sem humilhar. Corrige sem destruir.</p>

<p><span class="revelation-text">A queima do julgamento não te deixa sem orientação moral - te conecta com orientação autêntica que não vem do medo, mas do amor.</span></p>

<p>Não precisas de tribunal interno para ser boa pessoa. Não precisas de juízes mentais para fazer escolhas sábias. Não precisas de sistema de punição psicológica para crescer espiritualmente. Na verdade, todos esses mecanismos de julgamento impedem teu crescimento real.</p>

<p>Quando o tribunal interno é dissolvido, descobres que podes discernir sem condenar, avaliar sem sentenciar, aprender com erros sem te castigar. Descobres que responsabilidade genuína não precisa de culpa, que crescimento real não precisa de punição.</p>

<p>A queima do julgamento é liberação para ser humano sem pedir desculpas por isso. É permissão para cometer erros, aprender, tentar de novo, evoluir - tudo isso sem o peso constante da autocrítica destrutiva.</p>

<div class="final-blessing">
<p><em>Que o fogo da liberação queime todo sistema de julgamento interno e te deixe livre para ser exatamente quem és, sem condenação, sem punição, sem peso desnecessário.</em></p>
</div>
`
      }
    ];

    // Inserir os capítulos
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      const { error: chapterError } = await supabase
        .from('chapters')
        .insert({
          grimoire_id: grimoire.id,
          title: chapter.title,
          content: chapter.content.trim(),
          chapter_number: i + 1
        });

      if (chapterError) {
        console.error(`Erro ao criar capítulo "${chapter.title}":`, chapterError);
      } else {
        console.log(`✅ Capítulo criado: "${chapter.title}"`);
      }
    }

    // Atualizar descrição do grimório com convite ao próximo
    const updatedDescription = grimoire.description + '\n\nAo completar esta jornada de liberação da culpa, o leitor estará pronto para compreender o que o impediu de voar. O próximo grimório da série aguarda: 📒 "Asas Quebradas – O Medo de Ser Livre".';

    await supabase
      .from('grimoires')
      .update({ description: updatedDescription })
      .eq('id', grimoire.id);

    console.log('📙 "A MENTIRA DO PECADO" criado com sucesso! Volume IV do Atrium Ignis está completo.');
    console.log('🔥 O grimório oferece desconstrução profunda do conceito de pecado e libertação da culpa espiritual.');

  } catch (error) {
    console.error('Erro durante criação:', error);
  }
}

createMentiraDoPecado();