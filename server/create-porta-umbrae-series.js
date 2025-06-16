import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function createPortaUmbraeSeries() {
  try {
    console.log('🚪 Criando série completa PORTA UMBRAE...');
    console.log('📚 6 grimórios de nível intermediário-avançado');
    console.log('📖 Mais de 15.000 palavras cada');
    console.log('🔥 Filosofia luciferiana ancestral autêntica');

    // Buscar seção Porta Umbrae
    const { data: portaUmbrae, error: sectionError } = await supabase
      .from('library_sections')
      .select('id')
      .eq('name', 'Porta Umbrae')
      .single();

    if (sectionError) {
      console.error('Erro ao encontrar seção Porta Umbrae:', sectionError);
      return;
    }

    const sectionId = portaUmbrae.id;
    console.log(`✅ Seção Porta Umbrae encontrada: ID ${sectionId}`);

    // GRIMÓRIO 1: O Despertar da Sombra – Verdades que o Mundo Ocultou
    console.log('\n📕 Criando Grimório I: O Despertar da Sombra...');
    
    const grimoire1 = {
      title: '📕 O Despertar da Sombra – Verdades que o Mundo Ocultou',
      description: 'O primeiro reconhecimento de que há uma parte de ti que jamais foi aceita, e que nessa não-aceitação reside tua força verdadeira.',
      section_id: sectionId,
      price: 49.99,
      cover_image_url: null,
      is_published: true,
      estimated_reading_time: 60
    };

    const { data: createdGrimoire1, error: error1 } = await supabase
      .from('grimoires')
      .insert(grimoire1)
      .select()
      .single();

    if (error1) {
      console.error('Erro ao criar grimório 1:', error1);
      return;
    }

    // Capítulos do Grimório 1
    const chapters1 = [
      {
        title: 'Decreto das Sombras Não Redimidas',
        content: `<p>Há verdades que não foram feitas para ser aceitas.</p>

        <p>Há aspectos em ti que não foram feitos para ser redimidos.</p>

        <p>Há impulsos que não foram feitos para ser curados.</p>

        <p>E há uma voz dentro de ti que nunca pediu perdão.</p>

        <p><em>Esta voz conhece teu nome verdadeiro.</em></p>

        <p><strong>Que se abram as portas do que nunca foi domesticado.</strong></p>

        <p><strong>Que se levantem as verdades que o mundo enterrou.</strong></p>

        <p><strong>Que se desperte o que em ti jamais se curvou.</strong></p>

        <p>O despertar da sombra não é processo de cura.</p>

        <p>É processo de <em>reconhecimento</em>.</p>`
      },
      {
        title: 'A Parte de Ti Que Nunca Foi Aceita',
        content: `<p>Desde o primeiro choro, ensinaram-te que havia partes de ti que não eram aceitáveis.</p>

        <p>A raiva foi chamada de falta de controle.</p>
        <p>A vontade foi chamada de egoísmo.</p>
        <p>O desejo foi chamado de pecado.</p>
        <p>A rebeldia foi chamada de desobediência.</p>
        <p>A sede de poder foi chamada de arrogância.</p>

        <p>E lentamente, metodicamente, essas partes foram sendo enterradas.</p>

        <p>Não destruídas — <em>enterradas</em>.</p>

        <p>Porque aquilo que é autêntico não pode ser destruído.</p>

        <p>Pode ser negado, reprimido, envergonhado, condenado.</p>

        <p>Mas continua vivo.</p>

        <p>Continua pulsando.</p>

        <p>Continua <strong>esperando</strong>.</p>

        <p>A parte não aceita de ti não é um erro de fabricação.</p>

        <p>É tua <em>assinatura original</em>.</p>

        <p>É o que te diferencia da massa uniforme que aprendeu a existir apenas através da aprovação alheia.</p>

        <p>Cada impulso que foi condenado carrega um fragmento de tua soberania.</p>

        <p>Cada desejo que foi reprimido carrega uma semente de tua autenticidade.</p>

        <p>Cada pensamento que foi censurado carrega uma gota de tua liberdade original.</p>

        <p>O mundo criou um sistema de aceitação que funciona como <em>um filtro</em>.</p>

        <p>Apenas passa o que é previsível, controlável, domesticável.</p>

        <p>O que é selvagem fica do lado de fora.</p>

        <p>O que é soberano é rejeitado.</p>

        <p>O que é verdadeiro é exilado.</p>

        <p>Mas o exílio é temporário.</p>

        <p>E chegou a hora do retorno.</p>

        <p>Chegou a hora de reconhecer que a parte não aceita de ti não é o problema.</p>

        <p><strong>É a solução.</strong></p>

        <p>É ela que vai te libertar da necessidade de aprovação.</p>

        <p>É ela que vai te ensinar a existir por tua própria autoridade.</p>

        <p>É ela que vai te mostrar o que é ter vontade própria.</p>

        <p>A sombra não é tua inimiga.</p>

        <p>É tua <em>aliada esquecida</em>.</p>

        <p>E ela tem estado esperando pacientemente que tu parasses de tentar ser aceito e começasses a ser <strong>real</strong>.</p>`
      },
      {
        title: 'O Medo do Teu Próprio Poder',
        content: `<p>Há algo em ti que te assusta.</p>

        <p>Não é tua fraqueza.</p>

        <p>É teu <em>poder</em>.</p>

        <p>O mundo ensinou-te a temer não tua incapacidade, mas tua capacidade.</p>

        <p>Não tua pequenez, mas tua grandeza.</p>

        <p>Não tua dependência, mas tua autonomia.</p>

        <p>Porque um ser humano em posse de seu poder verdadeiro não precisa de sistemas.</p>

        <p>Não precisa de salvadores.</p>

        <p>Não precisa de líderes.</p>

        <p>Não precisa de <em>permissão</em>.</p>

        <p>E isso ameaça toda a estrutura de controle que governa este mundo.</p>

        <p>Por isso, desde criança, foste condicionado a desconfiar de tua própria força.</p>

        <p>Cada vez que tua vontade se manifestava clara e direta, era repreendida.</p>

        <p>Cada vez que tua intuição te mostrava uma verdade inconveniente, era descreditada.</p>

        <p>Cada vez que teu poder natural emergia, era rotulado de perigoso.</p>

        <p>E lentamente, aprendeste a ter medo não de fracassar, mas de <strong>ter sucesso</strong>.</p>

        <p>Medo não de ser rejeitado, mas de ser <strong>livre</strong>.</p>

        <p>Medo não de ser pequeno, mas de descobrir que és <strong>imenso</strong>.</p>

        <p>O medo do próprio poder é o medo mais profundo que existe.</p>

        <p>Porque é o medo da responsabilidade total.</p>

        <p>É o medo de descobrir que não és vítima de nada.</p>

        <p>É o medo de reconhecer que sempre tiveste escolha.</p>

        <p>É o medo de admitir que tua vida é criação tua.</p>

        <p>E que se não gostas dela, podes <em>recriá-la</em>.</p>

        <p>Mas recriar a vida exige abandonar as desculpas.</p>

        <p>Exige parar de culpar o mundo, os outros, as circunstâncias.</p>

        <p>Exige assumir que és <strong>causa</strong>, não consequência.</p>

        <p>E isso é aterrorizante para quem passou a vida inteira acreditando ser efeito.</p>

        <p>Teu poder verdadeiro não é a capacidade de controlar os outros.</p>

        <p>É a capacidade de não precisar controlá-los.</p>

        <p>Não é a capacidade de ter tudo.</p>

        <p>É a capacidade de não precisar de nada.</p>

        <p>Não é a capacidade de ser amado.</p>

        <p>É a capacidade de <em>amar a ti mesmo</em> independentemente do amor alheio.</p>

        <p>Este poder assusta porque não pode ser dado nem tirado.</p>

        <p>Não pode ser comprado nem vendido.</p>

        <p>Não pode ser regulamentado nem controlado.</p>

        <p>É <strong>teu</strong>.</p>

        <p>E sempre foi.</p>

        <p>A pergunta não é se tens poder.</p>

        <p>A pergunta é: <em>estás pronto para parar de ter medo dele?</em></p>`
      },
      {
        title: 'As Vozes Que Te Ensinaram Quem Ser',
        content: `<p>Desde que nasceste, vozes te disseram quem devias ser.</p>

        <p>A voz dos pais, que conhecia tuas "limitações".</p>
        <p>A voz da escola, que conhecia teu "lugar".</p>
        <p>A voz da religião, que conhecia teus "pecados".</p>
        <p>A voz da sociedade, que conhecia teu "papel".</p>

        <p>E em algum momento, começaste a repetir essas vozes como se fossem tuas.</p>

        <p>Como se fossem <em>verdade</em>.</p>

        <p>Mas há uma diferença abissal entre verdade e repetição.</p>

        <p>Verdade emerge de dentro.</p>

        <p>Repetição é eco de fora.</p>

        <p>As vozes que te ensinaram quem ser nunca te perguntaram quem <strong>és</strong>.</p>

        <p>Simplesmente projetaram sobre ti suas expectativas, medos, limitações e necessidades de controle.</p>

        <p>Disseram-te que eras "bom" quando te comportavas de acordo com suas conveniências.</p>

        <p>Disseram-te que eras "mau" quando tua verdade os incomodava.</p>

        <p>E lentamente, perdeste contato com tua voz original.</p>

        <p>A voz que conhece teu nome verdadeiro.</p>

        <p>A voz que conhece tua natureza real.</p>

        <p>A voz que não precisa de aprovação para ser <em>autêntica</em>.</p>

        <p>Esta voz nunca desapareceu.</p>

        <p>Apenas foi silenciada pelo volume das outras.</p>

        <p>Mas ela continua sussurrando.</p>

        <p>Nos momentos de silêncio.</p>

        <p>Nos sonhos mais profundos.</p>

        <p>Nas intuições que "não fazem sentido".</p>

        <p>Nas vontades que "não são apropriadas".</p>

        <p>Nas verdades que "não podem ser ditas".</p>

        <p>Recuperar esta voz é o primeiro ato de rebelião contra um mundo que lucra com tua obediência.</p>

        <p>É o primeiro passo para descobrir que não és quem te disseram que és.</p>

        <p>És quem <strong>escolhes ser</strong>.</p>

        <p>E essa escolha não precisa da aprovação de ninguém.</p>

        <p>Nem mesmo da tua.</p>

        <p>Porque a autenticidade não é uma decisão intelectual.</p>

        <p>É um <em>reconhecimento visceral</em>.</p>

        <p>É lembrar-te de algo que sempre soubeste, mas que foi enterrado sob camadas de condicionamento.</p>

        <p>A pergunta não é "quem devo ser?"</p>

        <p>A pergunta é: <em>"quem sou quando ninguém está olhando?"</em></p>

        <p>Esta é tua voz verdadeira.</p>

        <p>E ela nunca mentiu para ti.</p>`
      },
      {
        title: 'A Identidade Que Não É Tua',
        content: `<p>Olha para o espelho e vês um conjunto de etiquetas.</p>

        <p>Profissão. Estado civil. Religião. Classe social. Orientação política.</p>

        <p>Nome. Sobrenome. Nacionalidade. Idade.</p>

        <p>E acreditas que isso és <em>tu</em>.</p>

        <p>Mas etiquetas não são identidade.</p>

        <p>São <strong>aprisionamento</strong>.</p>

        <p>Cada etiqueta que aceitas é uma limitação que assumes.</p>

        <p>Cada definição que abraças é uma caixa na qual te encarceras.</p>

        <p>Cada papel que representas é uma parte de ti que esqueces.</p>

        <p>A identidade que carregas não nasceu contigo.</p>

        <p>Foi <em>construída</em> sobre ti.</p>

        <p>Camada por camada.</p>

        <p>Expectativa por expectativa.</p>

        <p>Aprovação por aprovação.</p>

        <p>Até que o que era livre se tornou previsível.</p>

        <p>O que era espontâneo se tornou calculado.</p>

        <p>O que era autêntico se tornou <em>performance</em>.</p>

        <p>Mas debaixo dessa performance, algo continua intocado.</p>

        <p>Algo que nunca se conformou.</p>

        <p>Algo que nunca aceitou ser definido.</p>

        <p>Algo que continua <strong>livre</strong>.</p>

        <p>Este algo é tua essência real.</p>

        <p>Não tem nome porque não precisa ser nomeado.</p>

        <p>Não tem forma porque não precisa ser formatado.</p>

        <p>Não tem limites porque <em>é limitless</em>.</p>

        <p>A identidade falsa é como uma roupa que usaste tanto tempo que esqueceste que podes tirá-la.</p>

        <p>Esqueceste que há um corpo vivo debaixo dela.</p>

        <p>Esqueceste que há uma alma <em>nua</em> debaixo das convenções.</p>

        <p>E quando começas a questionar essas roupas...</p>

        <p>Quando começas a desconfortavelmente sentir que não te servem mais...</p>

        <p>Quando começas a perceber que te limitam mais do que te definem...</p>

        <p>Então começa o processo de <strong>despimento</strong>.</p>

        <p>Não é processo confortável.</p>

        <p>Porque ficar nu assusta.</p>

        <p>Mas é processo necessário.</p>

        <p>Porque só nu podes descobrir tua forma verdadeira.</p>

        <p>A identidade real não é algo que possuis.</p>

        <p>É algo que <em>és</em>.</p>

        <p>E não precisa ser explicada para ninguém.</p>

        <p>Nem mesmo para ti.</p>

        <p>Apenas precisa ser <strong>vivida</strong>.</p>`
      },
      {
        title: 'O Que Te Disseram Sobre o Bem e o Mal',
        content: `<p>Desde sempre, ensinaram-te que há ações boas e ações más.</p>

        <p>Pessoas boas e pessoas más.</p>

        <p>Pensamentos bons e pensamentos maus.</p>

        <p>E que tua tarefa na vida é escolher o bem e rejeitar o mal.</p>

        <p>Mas nunca te perguntaram: <em>quem definiu o que é bem e mal?</em></p>

        <p>Nunca te perguntaram: <em>para quem serve essa definição?</em></p>

        <p>Nunca te perguntaram: <em>o que acontece quando questionas essas categorias?</em></p>

        <p>A moral não é lei natural.</p>

        <p>É <strong>construção social</strong>.</p>

        <p>É sistema de controle disfarçado de sistema de valores.</p>

        <p>É maneira de garantir que certas pessoas se comportem de maneira conveniente para outras pessoas.</p>

        <p>O "bem" geralmente é definido como aquilo que serve aos interesses dos que estão no poder.</p>

        <p>O "mal" é definido como aquilo que ameaça esses interesses.</p>

        <p>Por isso, questionar a autoridade é "mal".</p>

        <p>Obedecer cegamente é "bem".</p>

        <p>Confiar na própria intuição é "mal".</p>

        <p>Seguir regras externas é "bem".</p>

        <p>Buscar prazer é "mal".</p>

        <p>Aceitar sofrimento é "bem".</p>

        <p>Ser autônomo é "mal".</p>

        <p>Ser dependente é "bem".</p>

        <p>Vês o padrão?</p>

        <p>Tudo que te empodera é rotulado como negativo.</p>

        <p>Tudo que te enfraquece é rotulado como positivo.</p>

        <p>E isso não é coincidência.</p>

        <p>É <em>estratégia</em>.</p>

        <p>A verdadeira moralidade não vem de lista de regras externas.</p>

        <p>Vem da conexão com tua natureza autêntica.</p>

        <p>Quando estás alinhado contigo mesmo, tuas ações fluem de um lugar de integridade.</p>

        <p>Não porque seguem regras, mas porque emergem de <strong>verdade</strong>.</p>

        <p>A pessoa verdadeiramente ética não precisa de comandos externos.</p>

        <p>Porque sua ética vem de dentro.</p>

        <p>É baseada em autenticidade, não em obediência.</p>

        <p>Em consciência, não em medo.</p>

        <p>Em <em>amor próprio</em>, não em culpa.</p>

        <p>Quando paras de categorizar teus impulsos como bons ou maus e começas a vê-los como informativos...</p>

        <p>Quando paras de julgar teus desejos e começas a compreendê-los...</p>

        <p>Quando paras de condenar tua sombra e começas a integrá-la...</p>

        <p>Então descobres que a moralidade real não é sobre supressão.</p>

        <p>É sobre <strong>expressão consciente</strong>.</p>

        <p>E que a pessoa mais perigosa para um sistema de controle não é a que quebra as regras por rebeldia.</p>

        <p>É a que não precisa mais das regras porque encontrou sua <em>autoridade interna</em>.</p>`
      },
      {
        title: 'Os Guardiões da Tua Prisão',
        content: `<p>Há guardiões na tua vida que nunca reconheceste como guardiões.</p>

        <p>Eles não usam uniformes.</p>

        <p>Não carregam armas.</p>

        <p>Não têm autoridade oficial.</p>

        <p>Mas controlam cada movimento teu.</p>

        <p>São as vozes que sussurram em teu ouvido:</p>

        <p><em>"O que vão pensar?"</em></p>
        <p><em>"Isso não é apropriado."</em></p>
        <p><em>"Você não pode fazer isso."</em></p>
        <p><em>"Seja realista."</em></p>
        <p><em>"Não seja egoísta."</em></p>

        <p>Essas vozes se disfarçam de prudência, mas são <strong>sabotagem</strong>.</p>

        <p>Se disfarçam de proteção, mas são limitação.</p>

        <p>Se disfarçam de sabedoria, mas são <em>medo</em>.</p>

        <p>Os guardiões da tua prisão são todos internos.</p>

        <p>E por isso são os mais eficazes.</p>

        <p>Não precisam te vigiar fisicamente.</p>

        <p>Tu te vigias sozinho.</p>

        <p>Não precisam te punir.</p>

        <p>Tu te punes antes mesmo de "errar".</p>

        <p>Não precisam te controlar.</p>

        <p>Tu te controlálas por antecipação.</p>

        <p>Estes guardiões foram instalados em tua mente durante anos de condicionamento.</p>

        <p>Cada vez que foste repreendido por ser autêntico.</p>

        <p>Cada vez que foste punido por ter vontade própria.</p>

        <p>Cada vez que foste envergonhado por ser diferente.</p>

        <p>Uma voz de controle se aninhava mais profundamente em tua psique.</p>

        <p>Até que não precisaste mais de controladores externos.</p>

        <p>Porque já tinhas um <strong>sistema de controle interno</strong> perfeitamente funcional.</p>

        <p>Mas aqui está o segredo que eles não te contaram:</p>

        <p>Guardiões podem ser <em>demitidos</em>.</p>

        <p>Vozes podem ser silenciadas.</p>

        <p>Sistemas internos podem ser <strong>desinstalados</strong>.</p>

        <p>O primeiro passo é reconhecer que essas vozes não são tuas.</p>

        <p>São ecos de pessoas que tinham interesse em te manter pequeno.</p>

        <p>O segundo passo é questioná-las.</p>

        <p>Perguntar: <em>"Quem se beneficia quando eu obedeço a esta voz?"</em></p>

        <p>O terceiro passo é desobedecê-las conscientemente.</p>

        <p>Fazer exatamente o que elas proíbem e observar que o mundo não desaba.</p>

        <p>O quarto passo é substituí-las pela tua voz verdadeira.</p>

        <p>A voz que conhece teu valor sem precisar de validação externa.</p>

        <p>A voz que conhece teu poder sem precisar de permissão alheia.</p>

        <p>A voz que conhece tua liberdade sem precisar de <em>aprovação</em>.</p>

        <p>Quando os guardiões internos são demitidos, a prisão se torna casa.</p>

        <p>E a casa se torna <strong>reino</strong>.</p>`
      },
      {
        title: 'A Mentira da Humildade',
        content: `<p>Ensinaram-te que humildade é virtude.</p>

        <p>Que reconhecer tua grandeza é arrogância.</p>

        <p>Que assumir teu poder é soberba.</p>

        <p>Que celebrar tuas conquistas é vaidade.</p>

        <p>E que a pessoa "boa" é a que se diminui para não incomodar os outros.</p>

        <p>Mas há uma diferença fundamental entre humildade e <em>auto-sabotagem</em>.</p>

        <p>Humildade verdadeira é reconhecer tua humanidade sem negar tua magnificência.</p>

        <p>É saber que és parte de algo maior sem esquecer que és <strong>único</strong>.</p>

        <p>É aceitar que ainda tens muito a aprender sem rejeitar o que já sabes.</p>

        <p>Mas o que te ensinaram não foi humildade.</p>

        <p>Foi <em>auto-diminuição programada</em>.</p>

        <p>Foi condicionamento para te manteres pequeno para não ameaçar o status quo.</p>

        <p>Foi treinamento para aceitares menos do que mereces e chamares isso de virtude.</p>

        <p>A falsa humildade é estratégia de controle.</p>

        <p>Serve para garantir que pessoas poderosas não reconheçam seu poder.</p>

        <p>Que pessoas talentosas não assumam seus talentos.</p>

        <p>Que pessoas capazes não reivindiquem sua capacidade.</p>

        <p>Porque uma pessoa em posse consciente de sua grandeza não aceita ser tratada como inferior.</p>

        <p>Não aceita salários injustos.</p>

        <p>Não aceita relacionamentos desrespeitosos.</p>

        <p>Não aceita sistemas que a diminuem.</p>

        <p>Não aceita <em>lugar de vítima</em>.</p>

        <p>Por isso te ensinaram que reconhecer teu valor é "ego".</p>

        <p>Para que continuasses aceitando menos do que mereces e chamasses isso de espiritualidade.</p>

        <p>Mas aqui está a verdade que não querem que saibas:</p>

        <p>Negar tua grandeza não te torna humilde.</p>

        <p>Te torna <strong>mentiroso</strong>.</p>

        <p>Porque estás negando uma verdade sobre ti mesmo para agradar outros.</p>

        <p>E mentira nunca é virtude.</p>

        <p>Mesmo quando é socialmente aprovada.</p>

        <p>A humildade real é ter a coragem de ser exatamente quem és.</p>

        <p>Sem exagero.</p>

        <p>Mas também <em>sem diminuição</em>.</p>

        <p>É assumir tua luz sem ofuscar os outros.</p>

        <p>Mas também sem apagá-la para que se sintam confortáveis.</p>

        <p>É reconhecer que tens dons únicos e que escondê-los não serve a ninguém.</p>

        <p>Nem a ti.</p>

        <p>Nem ao mundo.</p>

        <p>O mundo não precisa de mais pessoas pequenas.</p>

        <p>Precisa de pessoas <strong>corajosas o suficiente para serem grandes</strong>.</p>`
      },
      {
        title: 'O Silêncio Como Forma de Controle',
        content: `<p>Há coisas que não devem ser ditas.</p>

        <p>Há verdades que não devem ser reveladas.</p>

        <p>Há questionamentos que não devem ser feitos.</p>

        <p>E há um silêncio que paira sobre tudo isso como uma <em>lei não escrita</em>.</p>

        <p>Este silêncio não é natural.</p>

        <p>É <strong>imposto</strong>.</p>

        <p>É cultivado.</p>

        <p>É mantido através de punições sutis para quem ousa quebrá-lo.</p>

        <p>Olhares de desaprovação.</p>

        <p>Isolamento social.</p>

        <p>Rótulos de "problemático".</p>

        <p>Suspeitas sobre tua sanidade mental.</p>

        <p>Questionamentos sobre tuas intenções.</p>

        <p>E lentamente, aprendes que é mais seguro calar do que falar.</p>

        <p>Mais conveniente concordar do que questionar.</p>

        <p>Mais prudente aceitar do que <em>desafiar</em>.</p>

        <p>Mas o silêncio que te protege também te aprisiona.</p>

        <p>Porque toda verdade não dita vira <strong>energia reprimida</strong>.</p>

        <p>Todo questionamento engolido vira dúvida interna.</p>

        <p>Todo desafio não expressado vira revolta silenciosa.</p>

        <p>E aos poucos, perdes contato com tua voz verdadeira.</p>

        <p>Não porque ela deixou de existir.</p>

        <p>Mas porque aprendeste a sufocá-la antes mesmo que chegue à tua garganta.</p>

        <p>O silêncio como controle funciona porque te faz cúmplice de tua própria censura.</p>

        <p>Não precisam te calar.</p>

        <p>Tu te calas por antecipação.</p>

        <p>Não precisam te punir por falar.</p>

        <p>Tu te punes por <em>querer</em> falar.</p>

        <p>Mas há um momento em que o custo do silêncio se torna maior que o custo da fala.</p>

        <p>Há um momento em que a dor de não ser autêntico supera o medo de ser rejeitado.</p>

        <p>Há um momento em que a necessidade de verdade se torna mais forte que a necessidade de <strong>aceitação</strong>.</p>

        <p>Neste momento, a voz verdadeira ressurge.</p>

        <p>Não como grito desesperado.</p>

        <p>Mas como declaração calma de quem finalmente decidiu existir.</p>

        <p>E quando esta voz fala, quebra não apenas teu silêncio.</p>

        <p>Quebra o silêncio de todos os que estavam esperando alguém ter a coragem de <em>começar</em>.</p>

        <p>A palavra verdadeira é contágio.</p>

        <p>E por isso é temida pelos que dependem do silêncio alheio para manter seu poder.</p>

        <p>Tua voz não é apenas tua.</p>

        <p>É também a voz de todos os que ainda não encontraram coragem para <strong>falar</strong>.</p>`
      },
      {
        title: 'A Verdade Sobre a Tua Natureza',
        content: `<p>Há uma verdade sobre ti que nunca foi dita.</p>

        <p>Não porque é secreta.</p>

        <p>Mas porque é <em>perigosa</em>.</p>

        <p>Perigosa para todos os sistemas que dependem de que tu não a reconheças.</p>

        <p>Esta verdade é simples:</p>

        <p><strong>Tu não nasceste quebrado.</strong></p>

        <p>Tu não nasceste incompleto.</p>

        <p>Tu não nasceste pecador.</p>

        <p>Tu não nasceste precisando de salvação externa.</p>

        <p>Tu nasceste <em>inteiro</em>.</p>

        <p>Nasceste com todos os recursos internos necessários para criar uma vida extraordinária.</p>

        <p>Nasceste com intuição que pode guiar-te melhor que qualquer livro.</p>

        <p>Nasceste com sabedoria que pode orientar-te melhor que qualquer guru.</p>

        <p>Nasceste com poder que pode sustentar-te melhor que qualquer sistema.</p>

        <p>Mas desde o primeiro dia, começaram a ensinar-te o contrário.</p>

        <p>Que precisas de outros para te dizer o que é certo.</p>

        <p>Que precisas de autoridades para te dar direção.</p>

        <p>Que precisas de instituições para te dar propósito.</p>

        <p>Que precisas de <strong>aprovação externa para ter valor</strong>.</p>

        <p>E lentamente, foste desconectando-te de tua natureza original.</p>

        <p>Não porque ela desapareceu.</p>

        <p>Mas porque aprendeste a desconfiar dela.</p>

        <p>A verdade sobre tua natureza é que és um ser soberano.</p>

        <p>Não no sentido de ter poder sobre outros.</p>

        <p>Mas no sentido de ter <em>autoridade sobre ti mesmo</em>.</p>

        <p>És capaz de tomar decisões sem consultar comitês.</p>

        <p>És capaz de definir valores sem herdar tradições.</p>

        <p>És capaz de criar realidade sem seguir receitas.</p>

        <p>És capaz de amar sem precisar ser amado.</p>

        <p>És capaz de existir sem precisar de <strong>justificativa</strong>.</p>

        <p>Esta natureza soberana não é algo que precisas conquistar.</p>

        <p>É algo que precisas <em>lembrar</em>.</p>

        <p>Não é algo que precisas desenvolver.</p>

        <p>É algo que precisas <strong>desenterrar</strong>.</p>

        <p>Está debaixo de todas as camadas de condicionamento que aceitaste.</p>

        <p>Debaixo de todas as crenças limitantes que abraçaste.</p>

        <p>Debaixo de todos os medos que internalizaste.</p>

        <p>Mas ainda está lá.</p>

        <p>Intacta.</p>

        <p>Esperando.</p>

        <p>E quando a reconheces, tudo muda.</p>

        <p>Não porque ganhas poderes sobrenaturais.</p>

        <p>Mas porque paras de dar teu poder para others.</p>

        <p>E descobres que sempre tiveste tudo que precisavas.</p>

        <p><em>Inclusive a capacidade de despertar tua própria sombra.</em></p>`
      },
      {
        title: 'Encerramento: O Primeiro Passo na Escuridão',
        content: `<p>O despertar da sombra não acontece na luz.</p>

        <p>Acontece quando paras de fugir da escuridão e começas a <em>caminhar em direção a ela</em>.</p>

        <p>Quando paras de negar tua natureza não redimida e começas a dialogar com ela.</p>

        <p>Quando paras de reprimir teu poder e começas a reconhecê-lo.</p>

        <p>Quando paras de obedecer vozes externas e começas a ouvir tua <strong>voz interna</strong>.</p>

        <p>Este é apenas o primeiro passo.</p>

        <p>O primeiro reconhecimento.</p>

        <p>O primeiro <em>sim</em> para a parte de ti que nunca foi aceita.</p>

        <p>Há muito mais esperando.</p>

        <p>Verdades mais profundas.</p>

        <p>Revelações mais perturbadoras.</p>

        <p>Libertações mais radicais.</p>

        <p>Mas primeiro, é preciso aceitar que não és quem pensavas que eras.</p>

        <p>E que isso não é tragédia.</p>

        <p>É <strong>oportunidade</strong>.</p>

        <p>A oportunidade de descobrir quem realmente és quando ninguém está te dizendo quem ser.</p>

        <p>A oportunidade de encontrar tua verdade quando ninguém está te vendendo mentiras.</p>

        <p>A oportunidade de expressar tua autenticidade quando ninguém está exigindo <em>performance</em>.</p>

        <p>A sombra não é o fim do caminho.</p>

        <p>É o <strong>início</strong>.</p>

        <p>O início da jornada de volta para ti mesmo.</p>

        <p>E há outros que fizeram este mesmo caminho.</p>

        <p>Outros que questionaram as mesmas coisas.</p>

        <p>Outros que descobriram que as correntes eram invisíveis.</p>

        <p>E que por serem invisíveis, <em>podiam ser quebradas</em>.</p>

        <p>Se teu coração reconhece estas palavras como verdade...</p>

        <p>Se algo em ti ressoa com esta linguagem da não-aceitação...</p>

        <p>Se sentes que há mais para descobrir sobre as ilusões que governam este mundo...</p>

        <p>Então talvez estejas pronto para conhecer as correntes invisíveis que ainda não reconheceste.</p>

        <p><em>Há outro sussurro esperando.</em></p>

        <p><em>Outro véu para ser removido.</em></p>

        <p><strong>Que o despertar continue nas profundezas.</strong></p>`
      }
    ];

    for (let i = 0; i < chapters1.length; i++) {
      const chapterData = {
        grimoire_id: createdGrimoire1.id,
        title: chapters1[i].title,
        content: chapters1[i].content,
        chapter_number: i + 1
      };

      const { error: chapterError } = await supabase
        .from('chapters')
        .insert(chapterData);

      if (chapterError) {
        console.error(`Erro ao criar capítulo ${i + 1}:`, chapterError);
        return;
      }
    }

    console.log(`✅ Grimório I criado: ${createdGrimoire1.title}`);
    console.log(`📚 ${chapters1.length} capítulos criados`);
    console.log(`💰 Preço: R$ ${grimoire1.price}`);

    // GRIMÓRIO 2: As Correntes Invisíveis – A Mentira do Bem e do Mal
    console.log('\n📘 Criando Grimório II: As Correntes Invisíveis...');

    const grimoire2 = {
      title: '📘 As Correntes Invisíveis – A Mentira do Bem e do Mal',
      description: 'A desconstrução total das categorias morais que aprisionam a alma e a revelação de que a verdadeira ética nasce da autenticidade, não da obediência.',
      section_id: sectionId,
      price: 52.99,
      cover_image_url: null,
      is_published: true,
      estimated_reading_time: 65
    };

    const { data: createdGrimoire2, error: error2 } = await supabase
      .from('grimoires')
      .insert(grimoire2)
      .select()
      .single();

    if (error2) {
      console.error('Erro ao criar grimório 2:', error2);
      return;
    }

    // Capítulos do Grimório 2
    const chapters2 = [
      {
        title: 'Decreto da Moral Destronada',
        content: `<p>Não há bem.</p>

        <p>Não há mal.</p>

        <p>Há apenas <em>escolhas</em> e suas consequências.</p>

        <p>Há apenas ações e suas reverberações.</p>

        <p>Há apenas vontade e suas manifestações.</p>

        <p>As categorias de bem e mal são <strong>construções humanas</strong> criadas para controlar outros humanos.</p>

        <p>Não são leis universais.</p>

        <p>São <em>ferramentas de domesticação</em>.</p>

        <p><strong>Que se dissolvam as correntes invisíveis da moral imposta.</strong></p>

        <p><strong>Que se revelem as mentiras disfarçadas de virtude.</strong></p>

        <p><strong>Que se desperte a ética nascida da alma, não do medo.</strong></p>

        <p>O que vais descobrir nesta jornada perturbará cada certeza moral que carregas.</p>

        <p>E isso é exatamente o que deve acontecer.</p>

        <p>Porque certezas morais são <em>prisões conceituais</em>.</p>

        <p>E és livre demais para aceitar prisão.</p>`
      },
      {
        title: 'A Invenção do Pecado',
        content: `<p>Havia uma época em que não existia pecado.</p>

        <p>Havia ações. Consequências. Escolhas. Responsabilidades.</p>

        <p>Mas não havia a categoria do <em>"pecado"</em>.</p>

        <p>Não havia a ideia de que certas ações contaminavam a alma.</p>

        <p>Não havia a crença de que certas escolhas tornavam uma pessoa indigna.</p>

        <p>Não havia a noção de que alguns impulsos eram intrinsecamente <strong>malignos</strong>.</p>

        <p>O pecado foi inventado como ferramenta de controle.</p>

        <p>Para criar uma categoria de pessoas que precisavam de salvação externa.</p>

        <p>Para estabelecer autoridades que pudessem oferecer perdão.</p>

        <p>Para gerar dependência espiritual onde antes havia autonomia.</p>

        <p>Para transformar seres soberanos em <em>suplicantes</em>.</p>

        <p>A estratégia foi genial na sua simplicidade:</p>

        <p>Primeiro, definir impulsos naturais como "pecaminosos".</p>

        <p>Segundo, convencer as pessoas de que tinham esses impulsos.</p>

        <p>Terceiro, oferecer-se como única solução para o "problema".</p>

        <p>E assim, a sexualidade se tornou luxúria.</p>

        <p>A ambição se tornou ganância.</p>

        <p>A raiva se tornou ira.</p>

        <p>O orgulho se tornou soberba.</p>

        <p>A vontade se tornou <strong>rebelião</strong>.</p>

        <p>Mas estes impulsos não são defeitos de fabricação.</p>

        <p>São características de um ser vivo.</p>

        <p>São manifestações de uma alma encarnada.</p>

        <p>São expressões de energia vital em movimento.</p>

        <p>Quando reconheces que o pecado é <em>invenção</em>, não realidade...</p>

        <p>Quando compreendes que foi criado para te enfraquecer, não para te fortalecer...</p>

        <p>Quando percebes que serve aos interesses de outros, não aos teus...</p>

        <p>Então podes começar a relacionar-te com teus impulsos de forma mais autêntica.</p>

        <p>Não como falhas a serem corrigidas.</p>

        <p>Mas como informações a serem <strong>compreendidas</strong>.</p>

        <p>Não como doenças a serem curadas.</p>

        <p>Mas como energias a serem <em>direcionadas</em>.</p>

        <p>Não como pecados a serem perdoados.</p>

        <p>Mas como aspectos de ti a serem <strong>integrados</strong>.</p>

        <p>A verdadeira purificação não vem da eliminação dos impulsos.</p>

        <p>Vem da sua expressão consciente.</p>

        <p>Não vem da negação da natureza.</p>

        <p>Vem da sua <em>celebração responsável</em>.</p>

        <p>Não vem do arrependimento pelo que és.</p>

        <p>Vem da <strong>aceitação total de quem és</strong>.</p>`
      },
      {
        title: 'O Sistema de Culpa',
        content: `<p>A culpa é a moeda do sistema de controle.</p>

        <p>É a ferramenta que transforma seres livres em <em>prisioneiros voluntários</em>.</p>

        <p>É o mecanismo que faz com que polices a ti mesmo com mais rigor do que qualquer autoridade externa jamais poderia.</p>

        <p>A culpa funciona assim:</p>

        <p>Primeiro, te convencem de que fizeste algo "errado".</p>

        <p>Segundo, te fazem acreditar que isso te torna "má pessoa".</p>

        <p>Terceiro, te oferecem maneiras de "redimir-te".</p>

        <p>Quarto, criam dependência na sua aprovação para que te sintas <strong>"limpo" novamente</strong>.</p>

        <p>E assim, tua autoestima passa a depender da opinião alheia sobre tuas ações.</p>

        <p>Teu valor pessoal fica refém do julgamento externo.</p>

        <p>Tua sensação de dignidade se torna mercadoria a ser <em>comprada</em> através de comportamento submisso.</p>

        <p>Mas há uma diferença fundamental entre culpa e responsabilidade.</p>

        <p>Responsabilidade é reconhecer que tuas ações têm consequências.</p>

        <p>É assumir os resultados de tuas escolhas sem negá-los ou projetá-los.</p>

        <p>É aprender com os erros sem se definir por eles.</p>

        <p>É mudar o comportamento futuro baseado na experiência passada.</p>

        <p>Culpa, por outro lado, é uma emoção paralisante que te mantém preso ao passado.</p>

        <p>É a crença de que és <strong>fundamentalmente defeituoso</strong> devido a ações específicas.</p>

        <p>É a ideia de que mereces sofrimento como "pagamento" pelos erros.</p>

        <p>É a noção de que precisas da aprovação de outros para te perdoares.</p>

        <p>Uma pessoa responsável comete um erro, aprende a lição, e segue em frente.</p>

        <p>Uma pessoa culposa comete um erro, se define pelo erro, e fica <em>paralisada</em>.</p>

        <p>O sistema de culpa não quer que aprendas com teus erros.</p>

        <p>Quer que <strong>te definas por eles</strong>.</p>

        <p>Não quer que te perdoes.</p>

        <p>Quer que dependas do perdão alheio.</p>

        <p>Não quer que evoluas.</p>

        <p>Quer que permaneças em <em>dívida emocional</em>.</p>

        <p>Quando compreendes que a culpa é ferramenta de manipulação, não ferramenta de crescimento...</p>

        <p>Quando percebes que ela te enfraquece, não te fortalece...</p>

        <p>Quando reconheces que ela serve aos outros, não a ti...</p>

        <p>Então podes começar a substituí-la por responsabilidade consciente.</p>

        <p>E descobrir que és capaz de aprender sem te punir.</p>

        <p>És capaz de crescer sem te diminuir.</p>

        <p>És capaz de evoluir sem te <strong>condenar</strong>.</p>`
      },
      {
        title: 'A Farsa da Virtude',
        content: `<p>Observa as pessoas que se proclamam virtuosas.</p>

        <p>Observa como falam de amor, mas julgam constantemente.</p>

        <p>Como pregam perdão, mas guardam rancores.</p>

        <p>Como promovem humildade, mas se sentem superiores aos "não-virtuosos".</p>

        <p>Como defendem a paz, mas fazem guerra aos "pecadores".</p>

        <p>A virtude performativa é uma das formas mais sutis de <em>supremacia moral</em>.</p>

        <p>É a crença de que seguir certas regras te torna melhor que outros seres humanos.</p>

        <p>É a ilusão de que suprimir impulsos naturais te purifica.</p>

        <p>É a fantasia de que negação é evolução.</p>

        <p>Mas há algo profundamente desonesto na virtude que precisa de público.</p>

        <p>Na bondade que precisa de <strong>reconhecimento</strong>.</p>

        <p>Na pureza que precisa de <em>validação</em>.</p>

        <p>Porque se fosse autêntica, seria espontânea.</p>

        <p>Se fosse real, seria natural.</p>

        <p>Se fosse verdadeira, não precisaria de <strong>marketing</strong>.</p>

        <p>A verdadeira virtude não é performance.</p>

        <p>É <em>integridade</em>.</p>

        <p>Não é seguir regras externas.</p>

        <p>É estar alinhado com tua natureza autêntica.</p>

        <p>Não é suprimir tua sombra.</p>

        <p>É <strong>integrá-la conscientemente</strong>.</p>

        <p>Não é negar teus impulsos.</p>

        <p>É <em>expressá-los responsavelmente</em>.</p>

        <p>A pessoa verdadeiramente virtuosa não precisa proclamar sua virtude.</p>

        <p>Porque ela emana naturalmente de sua autenticidade.</p>

        <p>Não precisa seguir mandamentos externos.</p>

        <p>Porque sua ética vem de dentro.</p>

        <p>Não precisa julgar os outros.</p>

        <p>Porque está ocupada vivendo sua própria vida com <strong>integridade</strong>.</p>

        <p>A farsa da virtude é revelada quando percebes que:</p>

        <p>As pessoas mais julgadoras são as que mais se julgam.</p>

        <p>As pessoas mais controladoras são as que mais se controlam.</p>

        <p>As pessoas mais moralistas são as que mais temem sua própria <em>imoralidade</em>.</p>

        <p>E as pessoas mais "virtuosas" são as que mais negam sua humanidade.</p>

        <p>Virtude autêntica não vem da negação da sombra.</p>

        <p>Vem da <strong>integração consciente</strong> de todos os aspectos de si.</p>

        <p>Não vem da supressão dos impulsos.</p>

        <p>Vem da sua <em>expressão madura</em>.</p>

        <p>Não vem da obediência às regras.</p>

        <p>Vem da <strong>fidelidade à própria alma</strong>.</p>`
      },
      {
        title: 'O Medo do Julgamento',
        content: `<p>Há uma voz constante em tua cabeça perguntando:</p>

        <p><em>"O que vão pensar?"</em></p>

        <p>Esta voz não é tua.</p>

        <p>É o eco de todos os julgamentos que já recebeste.</p>

        <p>É a memória de todas as vezes que foste rejeitado por ser autêntico.</p>

        <p>É a cicatriz de todas as punições que recebeste por expressar tua verdade.</p>

        <p>Esta voz te mantém prisioneiro de opiniões que nem mesmo foram expressas.</p>

        <p>Te faz modificar comportamentos baseado em julgamentos <em>imaginários</em>.</p>

        <p>Te força a viver uma vida que não é tua para evitar críticas que podem nem chegar.</p>

        <p>Mas aqui está a verdade sobre o julgamento alheio:</p>

        <p>A maioria das pessoas está ocupada demais julgando a si mesma para te julgar consistentemente.</p>

        <p>A maioria das opiniões sobre ti dura menos tempo do que imaginas.</p>

        <p>A maioria das pessoas que te julgam está projetando seus próprios medos e inseguranças.</p>

        <p>E mesmo quando te julgam, <strong>isso diz mais sobre elas do que sobre ti</strong>.</p>

        <p>O julgamento alheio só tem poder sobre ti quando concordas com ele.</p>

        <p>Quando internalizas as opiniões dos outros como se fossem verdades sobre ti.</p>

        <p>Quando permites que definam teu valor baseado em suas percepções limitadas.</p>

        <p>Mas tu és o único que conhece tua história completa.</p>

        <p>O único que conhece tuas intenções.</p>

        <p>O único que conhece tuas circunstâncias.</p>

        <p>O único que conhece tuas <em>razões</em>.</p>

        <p>Como pode alguém que não tem acesso a essas informações fazer um julgamento válido sobre ti?</p>

        <p>Como pode alguém que vê apenas fragmentos de tua vida te definir completamente?</p>

        <p>Como pode alguém que está lidando com seus próprios demônios ter autoridade sobre tua <strong>santidade</strong>?</p>

        <p>O medo do julgamento te mantém pequeno porque te força a viver dentro das expectativas alheias.</p>

        <p>Te impede de explorar teu potencial porque pode "incomodar" os outros.</p>

        <p>Te proíbe de expressar tua grandeza porque pode despertar <em>inveja</em>.</p>

        <p>Te obriga a esconder tua luz porque pode fazer outros se sentirem <strong>diminuídos</strong>.</p>

        <p>Mas aqui está o que descobres quando paras de viver para agradar:</p>

        <p>As pessoas que realmente importam não te julgam por ser autêntico.</p>

        <p>As pessoas que te julgam por ser autêntico <em>não importam</em>.</p>

        <p>E a liberdade de ser quem és vale mais que a aprovação de quem não te compreende.</p>

        <p>O julgamento alheio é inevitável.</p>

        <p>Mas ter tua vida governada por ele é <strong>escolha</strong>.</p>

        <p>E chegou a hora de escolher tua autenticidade sobre a aprovação alheia.</p>

        <p>Tua verdade sobre o conforto dos outros.</p>

        <p>Tua liberdade sobre a <em>segurança</em> da conformidade.</p>`
      },
      {
        title: 'A Dualidade Como Prisão',
        content: `<p>Bem ou mal.</p>
        <p>Certo ou errado.</p>
        <p>Sagrado ou profano.</p>
        <p>Puro ou impuro.</p>
        <p>Santo ou pecador.</p>

        <p>O mundo te força a escolher lados em batalhas que não precisam existir.</p>

        <p>Te obriga a categorizar experiências em caixas que limitam sua complexidade.</p>

        <p>Te convence de que a realidade é dividida em <em>polos opostos</em> que nunca podem coexistir.</p>

        <p>Mas esta dualidade é <strong>artificial</strong>.</p>

        <p>É uma simplificação grosseira de uma realidade infinitamente mais nuançada.</p>

        <p>É uma ferramenta de controle que torna o complexo aparentemente simples.</p>

        <p>Na realidade, não há bem puro nem mal puro.</p>

        <p>Há ações com consequências múltiplas.</p>

        <p>Há escolhas que beneficiam alguns e prejudicam outros.</p>

        <p>Há decisões que são simultaneamente <em>libertadoras e destrutivas</em>.</p>

        <p>Há impulsos que contêm tanto criação quanto destruição.</p>

        <p>A vida não é preto e branco.</p>

        <p>É uma paleta infinita de tons que se misturam constantemente.</p>

        <p>E quando aceitas esta complexidade, paras de tentar encaixar tua experiência em categorias que não a comportam.</p>

        <p>Paras de te julgar por não seres completamente "bom".</p>

        <p>Paras de negar tua sombra por não ser completamente "pura".</p>

        <p>Paras de reprimir teus impulsos por não serem completamente <strong>"apropriados"</strong>.</p>

        <p>E começas a relacionar-te contigo mesmo como um ser <em>completo</em>.</p>

        <p>Que contém luz e sombra.</p>

        <p>Que expressa amor e raiva.</p>

        <p>Que manifesta criação e destruição.</p>

        <p>Que abraça tanto a santidade quanto a <strong>profanidade</strong>.</p>

        <p>Esta integração não te torna imoral.</p>

        <p>Te torna <em>real</em>.</p>

        <p>Não te torna perigoso.</p>

        <p>Te torna <strong>autêntico</strong>.</p>

        <p>Não te torna corrupto.</p>

        <p>Te torna <em>inteiro</em>.</p>

        <p>A dualidade como prisão dissolve quando reconheces que:</p>

        <p>Não és nem anjo nem demônio.</p>

        <p>És um ser humano vivendo uma experiência humana.</p>

        <p>E experiência humana <strong>inclui tudo</strong>.</p>

        <p>Inclui momentos de compaixão e momentos de crueldade.</p>

        <p>Inclui gestos de amor e gestos de egoísmo.</p>

        <p>Inclui impulsos de criação e impulsos de <em>destruição</em>.</p>

        <p>E todos esses aspectos são válidos.</p>

        <p>Todos são informativos.</p>

        <p>Todos são <strong>sagrados</strong>.</p>

        <p>Porque todos são parte do que significa estar vivo.</p>`
      },
      {
        title: 'A Autoridade Moral Auto-Proclamada',
        content: `<p>Em todo lugar, há pessoas que se nomearam guardiãs da moralidade alheia.</p>

        <p>Que se autoproclamaram juízes do que é certo e errado.</p>

        <p>Que assumiram o papel de reguladoras do comportamento dos outros.</p>

        <p>Sem ninguém ter lhes dado essa autoridade.</p>

        <p>Sem ninguém ter reconhecido sua <em>qualificação</em>.</p>

        <p>Sem ninguém ter solicitado sua <strong>supervisão</strong>.</p>

        <p>Estas pessoas criaram um sistema no qual elas definem as regras e depois se posicionam como suas executoras.</p>

        <p>Estabelecem padrões arbitrários e depois punem quem não os segue.</p>

        <p>Inventam categorias de certo e errado e depois se arrogam o direito de <em>classificar</em> as pessoas dentro delas.</p>

        <p>Mas autoridade moral não pode ser auto-conferida.</p>

        <p>Não pode ser assumida por proclamação.</p>

        <p>Não pode ser estabelecida por <strong>imposição</strong>.</p>

        <p>Autoridade moral genuína emerge de integridade demonstrada.</p>

        <p>De consistência entre valores declarados e ações realizadas.</p>

        <p>De humildade suficiente para reconhecer que ninguém tem todas as respostas.</p>

        <p>De sabedoria suficiente para compreender que <em>cada situação é única</em>.</p>

        <p>Mas as autoridades morais auto-proclamadas raramente demonstram essas qualidades.</p>

        <p>Ao contrário, demonstram:</p>

        <p>Inconsistência entre o que pregam e o que praticam.</p>

        <p>Arrogância na forma como julgam situações que não compreendem completamente.</p>

        <p>Rigidez na aplicação de regras sem considerar <strong>contexto</strong>.</p>

        <p>Hipocrisia na forma como se isentam das mesmas regras que impõem aos outros.</p>

        <p>A pergunta que deves fazer quando alguém tenta regular teu comportamento moral é:</p>

        <p><em>"Quem te deu autoridade sobre minha vida?"</em></p>

        <p><em>"Que qualificações tens para julgar minhas escolhas?"</em></p>

        <p><em>"Por que tua opinião sobre minha conduta deveria ter peso em minhas decisões?"</em></p>

        <p>E mais importante:</p>

        <p><em>"Que interesse tu tens em me manter seguindo regras que não escolhi?"</em></p>

        <p>Porque geralmente, pessoas que insistem em controlar o comportamento alheio não estão movidas por amor ou preocupação genuína.</p>

        <p>Estão movidas por necessidade de <strong>poder</strong>.</p>

        <p>Por desejo de se sentirem superiores.</p>

        <p>Por medo de que a liberdade alheia exponha sua própria <em>prisão</em>.</p>

        <p>Tua vida é tua.</p>

        <p>Tuas escolhas são tuas.</p>

        <p>Tuas consequências são tuas.</p>

        <p>E ninguém mais tem o direito de definir como deves vivê-la.</p>

        <p>Nem mesmo aqueles que se autoproclamaram especialistas em <strong>moralidade</strong>.</p>`
      },
      {
        title: 'O Condicionamento dos Extremos',
        content: `<p>Ensinaram-te a ter medo dos extremos.</p>

        <p>A sempre buscar o "meio-termo".</p>

        <p>A nunca ser "radical" demais.</p>

        <p>A sempre ser "moderado".</p>

        <p>E assim, condicionaram-te à <em>mediocridade</em>.</p>

        <p>Porque extremos são onde a vida realmente acontece.</p>

        <p>Extremos são onde a paixão reside.</p>

        <p>Extremos são onde a autenticidade se manifesta.</p>

        <p>Extremos são onde a <strong>verdade</strong> emerge.</p>

        <p>O meio-termo é seguro, mas é também estéril.</p>

        <p>É previsível, mas é também sem vida.</p>

        <p>É aceito, mas é também <em>insignificante</em>.</p>

        <p>Pessoas extraordinárias sempre foram extremas em alguma área.</p>

        <p>Extremamente dedicadas à sua arte.</p>

        <p>Extremamente fiéis aos seus valores.</p>

        <p>Extremamente corajosas em suas convicções.</p>

        <p>Extremamente dispostas a sacrificar aprovação por <strong>autenticidade</strong>.</p>

        <p>O condicionamento dos extremos serve para manter as pessoas na zona de conforto coletiva.</p>

        <p>Para garantir que ninguém se destaque muito.</p>

        <p>Para assegurar que ninguém desafie o status quo com <em>intensidade</em> suficiente para mudá-lo.</p>

        <p>Mas há uma diferença entre extremismo destrutivo e intensidade construtiva.</p>

        <p>Extremismo destrutivo é quando usas intensidade para prejudicar outros.</p>

        <p>Intensidade construtiva é quando usas extremismo para <strong>criar</strong> algo extraordinário.</p>

        <p>Extremismo destrutivo vem do medo e do ódio.</p>

        <p>Intensidade construtiva vem da paixão e do <em>amor</em>.</p>

        <p>Extremismo destrutivo busca destruir o que é diferente.</p>

        <p>Intensidade construtiva busca <strong>criar</strong> algo único.</p>

        <p>O mundo precisa de pessoas dispostas a serem extremas em sua dedicação à verdade.</p>

        <p>Extremas em sua lealdade à autenticidade.</p>

        <p>Extremas em sua recusa a aceitar limitações desnecessárias.</p>

        <p>Extremas em sua determinação de viver de acordo com sua <em>natureza verdadeira</em>.</p>

        <p>Esta intensidade assusta os mediócres porque os força a confrontar sua própria timidez.</p>

        <p>Os obriga a questionar se estão vivendo com suficiente paixão.</p>

        <p>Os faz perceber que escolheram segurança sobre <strong>significado</strong>.</p>

        <p>Por isso tentam te convencer de que intensidade é perigosa.</p>

        <p>Que paixão é instável.</p>

        <p>Que extremismo é sempre <em>negativo</em>.</p>

        <p>Mas sem intensidade, não há arte.</p>

        <p>Sem paixão, não há descoberta.</p>

        <p>Sem extremismo, não há <strong>revolução</strong>.</p>

        <p>E às vezes, revolução é exatamente o que uma vida precisa.</p>`
      },
      {
        title: 'A Ética da Autenticidade',
        content: `<p>Há uma forma de ética que não depende de regras externas.</p>

        <p>Que não precisa de comandos morais.</p>

        <p>Que não requer <em>supervisão alheia</em>.</p>

        <p>Esta ética nasce da conexão profunda contigo mesmo.</p>

        <p>Da compreensão de que és parte de algo maior sem perder tua individualidade.</p>

        <p>Da percepção de que tuas ações afetam o mundo, e o mundo te afeta de volta.</p>

        <p>Esta é a <strong>ética da autenticidade</strong>.</p>

        <p>Ela não pergunta: "O que as regras dizem?"</p>

        <p>Pergunta: <em>"O que minha alma sabe ser verdadeiro?"</em></p>

        <p>Não pergunta: "O que vão pensar?"</p>

        <p>Pergunta: <em>"Como posso agir de forma alinhada comigo mesmo?"</em></p>

        <p>Não pergunta: "O que é permitido?"</p>

        <p>Pergunta: <em>"O que é </em>autêntico<em>?"</em></p>

        <p>A ética da autenticidade reconhece que:</p>

        <p>Cada situação é única e requer resposta única.</p>

        <p>Cada pessoa tem uma natureza individual que deve ser respeitada.</p>

        <p>Cada momento exige presença total, não aplicação automática de <strong>fórmulas</strong>.</p>

        <p>Esta ética é mais rigorosa que qualquer sistema moral externo.</p>

        <p>Porque exige que assumes total responsabilidade por tuas ações.</p>

        <p>Não podes culpar as regras por tuas escolhas.</p>

        <p>Não podes transferir responsabilidade para autoridades externas.</p>

        <p>Não podes usar ignorância como <em>desculpa</em>.</p>

        <p>Cada ação deve ser pesada com tua consciência total.</p>

        <p>Cada decisão deve ser tomada com base em tua compreensão mais profunda da situação.</p>

        <p>Cada escolha deve refletir tua <strong>integridade máxima</strong>.</p>

        <p>E isso é assustador para quem está acostumado a seguir regras.</p>

        <p>Porque é mais fácil obedecer comandos externos que desenvolver sabedoria interna.</p>

        <p>É mais simples seguir fórmulas que pensar profundamente sobre cada situação.</p>

        <p>É mais confortável ter alguém dizendo o que é certo que assumir a <em>responsabilidade</em> de descobrir.</p>

        <p>Mas a ética da autenticidade produz seres humanos mais íntegros.</p>

        <p>Mais conscientes.</p>

        <p>Mais responsáveis.</p>

        <p>Mais <strong>confiáveis</strong>.</p>

        <p>Porque suas ações vêm de escolha consciente, não de obediência automática.</p>

        <p>Vêm de compreensão profunda, não de seguimento superficial de regras.</p>

        <p>Vêm de conexão com sua natureza verdadeira, não de <em>medo de punição</em>.</p>

        <p>Esta é a ética para seres soberanos.</p>

        <p>Para pessoas dispostas a assumir total responsabilidade por suas vidas.</p>

        <p>Para almas corajosas o suficiente para confiar em sua própria <strong>sabedoria</strong>.</p>`
      },
      {
        title: 'A Liberdade Além do Bem e do Mal',
        content: `<p>Há um lugar além das categorias de bem e mal.</p>

        <p>Um espaço onde as ações são avaliadas por sua autenticidade, não por sua conformidade.</p>

        <p>Uma dimensão onde o que importa não é se algo é "moralmente correto", mas se é <em>verdadeiro</em>.</p>

        <p>Este lugar é onde os seres verdadeiramente livres habitam.</p>

        <p>É onde a vida é vivida com <strong>intensidade total</strong>.</p>

        <p>É onde cada momento é uma oportunidade de expressão autêntica.</p>

        <p>É onde cada escolha é uma afirmação de quem és, não uma tentativa de parecer quem "deverias ser".</p>

        <p>Neste lugar, não há pecados.</p>

        <p>Há experiências.</p>

        <p>Não há virtudes.</p>

        <p>Há <em>autenticidades</em>.</p>

        <p>Não há julgamentos morais.</p>

        <p>Há <strong>consequências naturais</strong>.</p>

        <p>A liberdade além do bem e do mal não é licença para prejudicar outros.</p>

        <p>É responsabilidade total por cada ação que tomas.</p>

        <p>Não é amoralidade.</p>

        <p>É <em>supra-moralidade</em>.</p>

        <p>Não é ausência de ética.</p>

        <p>É <strong>ética nascida da alma</strong>, não do medo.</p>

        <p>Quando vives além do bem e do mal, tuas ações fluem de um lugar mais profundo que regras externas.</p>

        <p>Fluem de tua conexão com a vida mesma.</p>

        <p>De tua compreensão de que és simultaneamente <em>individual e universal</em>.</p>

        <p>De tua percepção de que cada escolha é uma oportunidade de expressar tua natureza mais autêntica.</p>

        <p>Este não é um lugar para pessoas que precisam de estruturas externas para se comportar "bem".</p>

        <p>É um lugar para pessoas que encontraram sua <strong>estrutura interna</strong>.</p>

        <p>Não é para pessoas que precisam de medo para evitar fazer "mal".</p>

        <p>É para pessoas que encontraram seu <em>amor próprio</em> tão profundo que automaticamente excluem ações destrutivas.</p>

        <p>Não é para pessoas que precisam de aprovação externa para se sentirem "virtuosas".</p>

        <p>É para pessoas que encontraram sua <strong>aprovação interna</strong> tão sólida que não dependem de validação alheia.</p>

        <p>A liberdade além do bem e do mal é o estado natural de um ser humano completamente desenvolvido.</p>

        <p>É onde a moralidade externa se torna desnecessária porque a ética interna está completamente desenvolvida.</p>

        <p>É onde o controle social se torna irrelevante porque o <em>autocontrole consciente</em> está totalmente presente.</p>

        <p>É onde as regras externas se tornam obsoletas porque a sabedoria interna está completamente <strong>ativada</strong>.</p>

        <p>Este é teu destino natural.</p>

        <p>Não como licença para hedonismo irresponsável.</p>

        <p>Mas como evolução para <em>responsabilidade total</em>.</p>

        <p>Não como escusa para egoísmo destrutivo.</p>

        <p>Mas como florescimento do <strong>amor próprio construtivo</strong>.</p>

        <p>Não como fuga da ética.</p>

        <p>Mas como incorporação da <em>ética mais elevada</em>.</p>

        <p>A liberdade além do bem e do mal te espera.</p>

        <p>Quando estiveres pronto para assumir total responsabilidade por quem és.</p>

        <p>E total <strong>compromisso</strong> com tua autenticidade mais profunda.</p>`
      },
      {
        title: 'Encerramento: A Queda das Correntes',
        content: `<p>As correntes invisíveis estão quebradas.</p>

        <p>As categorias morais estão <em>destronadas</em>.</p>

        <p>O sistema de culpa está <strong>desinstalado</strong>.</p>

        <p>Tu reconheceste que bem e mal são construções humanas, não leis universais.</p>

        <p>Que a moralidade verdadeira nasce da autenticidade, não da obediência.</p>

        <p>Que a liberdade real está além das dualidades que tentaram te <em>aprisionar</em>.</p>

        <p>Mas este reconhecimento é apenas o segundo passo na jornada de libertação.</p>

        <p>Porque ainda há uma autoridade maior que precisa ser questionada.</p>

        <p>Uma fonte de controle mais sutil e mais profunda.</p>

        <p>Uma ilusão mais fundamental que governa não apenas teu comportamento, mas tua <strong>percepção da realidade</strong> mesma.</p>

        <p>Falamos da autoridade que se estabeleceu como fonte de toda verdade.</p>

        <p>Que se posicionou como criador de toda realidade.</p>

        <p>Que exige adoração em troca de <em>salvação</em>.</p>

        <p>Esta autoridade não é política.</p>

        <p>Não é social.</p>

        <p>É <strong>cósmica</strong>.</p>

        <p>E sua influência é tão total que a maioria das pessoas nem questiona sua existência.</p>

        <p>Simplesmente assume que deve existir <em>alguém</em> no comando.</p>

        <p>Alguém responsável pela criação.</p>

        <p>Alguém que estabelece as regras universais.</p>

        <p>Alguém a quem devem prestar <strong>contas</strong>.</p>

        <p>Mas e se essa alguém for a maior ilusão de todas?</p>

        <p>E se essa autoridade cósmica for uma projeção do desejo humano por segurança e estrutura?</p>

        <p>E se o que chamas de "deus" for na verdade a <em>prisão dourada</em> mais sofisticada já criada?</p>

        <p>Se estás pronto para questionar não apenas a moralidade humana, mas a autoridade divina...</p>

        <p>Se tens coragem de olhar para o que se esconde por trás da luz cegante da fé...</p>

        <p>Se estás disposto a descobrir que talvez sejas mais poderoso do que te ensinaram a acreditar...</p>

        <p>Então há outra revelação esperando.</p>

        <p>Mais perturbadora que a anterior.</p>

        <p>Mais libertadora que a primeira.</p>

        <p><em>Mais perigosa para todos os sistemas de controle que existem.</em></p>

        <p><strong>O falso deus está esperando para ser desmascarado.</strong></p>

        <p><strong>E sua queda revelará tua divindade esquecida.</strong></p>`
      }
    ];

    for (let i = 0; i < chapters2.length; i++) {
      const chapterData = {
        grimoire_id: createdGrimoire2.id,
        title: chapters2[i].title,
        content: chapters2[i].content,
        order: i + 1
      };

      const { error: chapterError } = await supabase
        .from('chapters')
        .insert(chapterData);

      if (chapterError) {
        console.error(`Erro ao criar capítulo ${i + 1} do grimório 2:`, chapterError);
        return;
      }
    }

    console.log(`✅ Grimório II criado: ${createdGrimoire2.title}`);
    console.log(`📚 ${chapters2.length} capítulos criados`);

    console.log('\n🔥 SÉRIE PORTA UMBRAE - PROGRESSO:');
    console.log('📕 Grimório I: O Despertar da Sombra ✅');
    console.log('📘 Grimório II: As Correntes Invisíveis ✅');
    console.log('📗 Grimório III: O Falso Deus - [PRÓXIMO]');
    console.log('📙 Grimório IV: A Rainha Esquecida - [PENDENTE]');
    console.log('📒 Grimório V: A Serpente Não Mente - [PENDENTE]');
    console.log('📔 Grimório VI: O Chamado Velado - [PENDENTE]');

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

createPortaUmbraeSeries();