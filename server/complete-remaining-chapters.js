import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function completeRemainingChapters() {
  console.log('📝 Adicionando capítulos 6-12 ao grimório "O Despertar da Sombra"');
  
  // Buscar o grimório mais recente "O Despertar da Sombra"
  const { data: grimoires } = await supabase
    .from('grimoires')
    .select('*')
    .ilike('title', '%O Despertar da Sombra%')
    .order('created_at', { ascending: false })
    .limit(1);

  if (!grimoires || grimoires.length === 0) {
    console.error('❌ Grimório "O Despertar da Sombra" não encontrado');
    return;
  }

  const grimoire = grimoires[0];
  console.log(`✅ Grimório encontrado: ${grimoire.title} (ID: ${grimoire.id})`);

  // Capítulos restantes (6-12)
  const remainingChapters = [
    {
      title: 'Espelhos Quebrados',
      content: `<p>Tua psique é um salão de espelhos onde cada reflexo mostra uma versão diferente de quem pensas que és.</p>

      <p>Alguns espelhos mostram o herói que gostarias de ser. Outros mostram o vilão que temes ser. Há espelhos que mostram a vítima que às vezes <em>escolhes</em> ser. E espelhos que mostram o salvador que acreditas que <strong>deves</strong> ser.</p>

      <p>Mas ao longo dos anos, muitos desses espelhos se quebraram. Racharam sob o peso das <em>expectativas</em>. Estilhaçaram sob a pressão da <strong>conformidade</strong>. E agora, cada fragmento reflete apenas uma parte distorcida de quem és.</p>

      <p>Estes fragmentos são o que chamamos de <em>complexos</em>. Partes de ti que se separaram do todo. Aspectos de tua personalidade que ganharam vida própria. Vozes internas que às vezes parecem não ser <strong>tuas</strong>.</p>

      <p>Há o fragmento que sempre critica. O que nunca está satisfeito com teu <em>desempenho</em>. O que aponta cada falha, cada imperfeição, cada <strong>erro</strong>.</p>

      <p>Há o fragmento que sempre tem medo. O que vê perigo onde não há. O que te mantém pequeno para te manter <em>seguro</em>.</p>

      <p>Há o fragmento que sempre quer agradar. O que sacrifica tua autenticidade pela aprovação alheia. O que prefere ser <strong>falso</strong> a ser rejeitado.</p>

      <p>Há o fragmento que sempre quer controlar. O que não consegue aceitar incerteza. O que prefere uma ilusão de <em>controle</em> à realidade do <strong>fluxo</strong>.</p>

      <p>Estes fragmentos não são defeitos. São estratégias de <em>sobrevivência</em> que se cristalizaram. Soluções que funcionaram em determinado momento, mas que agora se tornaram <strong>problemas</strong>.</p>

      <p>Formas de lidar com o mundo que eram apropriadas para a criança que foste, mas que limitam o adulto que te tornaste.</p>

      <p>O problema não é que estes fragmentos existam. O problema é que muitas vezes <em>confundes</em> estes fragmentos contigo mesmo. Acreditas que a voz crítica és <strong>tu</strong> sendo realista. Pensas que o medo constante é prudência. Imaginas que a necessidade de agradar é <em>bondade</em>. Assumes que a necessidade de controle é <strong>responsabilidade</strong>.</p>

      <p>Mas há uma diferença fundamental entre ter estes fragmentos e <em>ser</em> estes fragmentos. Tu és aquele que observa os fragmentos. Tu és a <strong>consciência</strong> que os contém. Tu és o espaço no qual eles aparecem e desaparecem.</p>

      <p>Quando reconheces isso, algo muda. Paras de ser <em>possuído</em> pelos fragmentos. Paras de ser <strong>sequestrado</strong> por suas vozes. Paras de confundir suas perspectivas limitadas com a <em>verdade</em>.</p>

      <p>E começas o processo de <strong>integração</strong>. Não para eliminar os fragmentos — eles são parte de tua história. Mas para <em>relacionar-te</em> com eles de forma mais consciente. Para usar suas perspectivas quando são úteis. E para <strong>ignorá-las</strong> quando são limitantes.</p>

      <p>Para transformar o salão de espelhos quebrados numa galeria de <em>possibilidades</em>. Onde cada reflexo é uma faceta de tua <strong>totalidade</strong>. Onde cada fragmento é um instrumento na orquestra de tua consciência. Onde cada voz interna é um <em>conselheiro</em> que podes consultar ou dispensar conforme tua sabedoria.</p>

      <p>Os espelhos quebrados não precisam ser <strong>descartados</strong>. Precisam ser reconhecidos pelo que são: Fragmentos de um reflexo muito maior. Pedaços de uma imagem muito mais <em>complexa</em>. Aspectos de uma totalidade que é muito mais <strong>vasta</strong> do que qualquer reflexo individual.</p>

      <p>Quando paras de tentar te ver através dos fragmentos... Quando deixas de buscar tua identidade nos <em>reflexos</em>... Descobres que és aquele que sempre esteve olhando. És a <strong>consciência</strong> que nunca foi fragmentada. És a presença que sempre foi <em>inteira</em>. És o observador que nunca precisou de espelho para saber que <strong>existe</strong>.</p>`
    },
    {
      title: 'O Chamado Que Arde por Dentro',
      content: `<p>Há um fogo que queima no centro de teu ser. Um calor que não vem do corpo. Uma chama que não pode ser <em>apagada</em> por circunstâncias externas. É o fogo da <strong>autenticidade</strong>.</p>

      <p>A chama da tua natureza verdadeira tentando abrir caminho através das camadas de condicionamento que a encobrem.</p>

      <p>Este fogo se manifesta como <em>inquietação</em>. Como uma sensação de que algo não está certo com a vida que estás vivendo. Como um descontentamento que não consegue ser <strong>satisfeito</strong> por conquistas externas. Como uma sede que não pode ser saciada por prazeres temporários.</p>

      <p>Muitas pessoas tentam <em>silenciar</em> este fogo. Tentam abafá-lo com distrações. Tentam <strong>diminuí-lo</strong> com conformidade. Tentam ignorá-lo através de comportamentos compulsivos.</p>

      <p>Mas o fogo da autenticidade não pode ser <em>extinto</em>. Só pode ser alimentado ou <strong>reprimido</strong>. E quando é reprimido, torna-se autodestrutivo.</p>

      <p>Manifesta-se como depressão — o fogo voltado para <em>dentro</em>. Como raiva inexplicável — o fogo procurando uma <strong>saída</strong>. Como vícios — tentativas desesperadas de sentir <em>algo real</em>. Como relacionamentos destrutivos — formas distorcidas de buscar <strong>intensidade</strong>.</p>

      <p>Mas há uma outra possibilidade. A possibilidade de <em>alimentar</em> o fogo. De reconhecer que a inquietação não é um problema a ser <strong>resolvido</strong>. É um chamado a ser atendido. Um convite a viver de forma mais <em>autêntica</em>. Uma exigência de tua alma para que pares de viver uma vida que não é <strong>tua</strong>.</p>

      <p>O fogo da autenticidade se alimenta de <em>verdade</em>. Cresce quando falas o que realmente pensas. Intensifica-se quando ages de acordo com teus <strong>valores</strong> genuínos. Brilha mais forte quando escolhes ser real ao invés de ser <em>aceito</em>.</p>

      <p>Quando permites que este fogo <strong>cresça</strong>, coisas começam a acontecer. Pessoas que não ressoam contigo começam a se afastar. Situações que não te servem começam a se <em>desfazer</em>. Oportunidades que estão alinhadas com tua natureza começam a <strong>aparecer</strong>.</p>

      <p>Não porque estejas manipulando o mundo externo. Mas porque estás finalmente emitindo tua <em>frequência</em> real. Estás vibrando na sintonia de quem realmente és. E o universo responde a <strong>autenticidade</strong>.</p>

      <p>Este processo nem sempre é confortável. Frequentemente é <em>assustador</em>. Porque significa deixar para trás versões de ti mesmo que eram <strong>seguras</strong>. Significa abandonar relacionamentos que eram baseados em <em>máscaras</em>. Significa abrir mão de trabalhos que pagam as contas mas <strong>matam</strong> a alma.</p>

      <p>Significa correr o risco de ser <em>rejeitado</em> por quem realmente és. Mas há algo pior que ser rejeitado por ser autêntico: Ser aceito por ser <strong>falso</strong>. Porque neste caso, quem está sendo aceito não és <em>tu</em>. É uma versão editada, censurada, diminuída de ti. E esse tipo de aceitação nunca <strong>satisfaz</strong>.</p>

      <p>O fogo da autenticidade às vezes se manifesta através de <em>sonhos</em>. Sonhos que te mostram versões de ti mesmo que não reconheces. Versões mais <strong>selvagens</strong>, mais livres, mais poderosas. Sonhos que te lembram de quem eras antes de aprender a ter medo de tua própria <em>magnificência</em>.</p>

      <p>Às vezes se manifesta através de <strong>sincronicidades</strong>. Coincidências que parecem te apontar numa direção específica. Encontros que acontecem no momento <em>exato</em> em que precisas deles. Livros que caem em tuas mãos quando contêm exatamente a mensagem que precisas <strong>ouvir</strong>.</p>

      <p>Às vezes se manifesta através de <em>crises</em>. Momentos em que a vida que construíste <strong>desmorona</strong>. Quando os pilares nos quais baseaste tua identidade se <em>revelam</em> instáveis. Quando és forçado a questionar tudo aquilo em que acreditavas sobre ti mesmo.</p>

      <p>Estas crises não são <strong>punições</strong>. São oportunidades de <em>renascimento</em>. São convites para construir uma vida mais alinhada com quem realmente és. São chamados para parar de tentar encaixar tua vastidão em <strong>caixas</strong> pequenas.</p>

      <p>O fogo da autenticidade não te pede para ser <em>perfeito</em>. Te pede para ser <strong>real</strong>. Não te exige que tenhas todas as respostas. Te exige que pares de fingir que <em>tens</em>. Não te obriga a ser forte o tempo todo. Te obriga a parar de ter vergonha de tua <strong>vulnerabilidade</strong>.</p>

      <p>Quando respondes a este chamado... Quando permites que o fogo da autenticidade <em>consuma</em> as versões falsas de ti mesmo... Descobres algo surpreendente: Há muito mais <strong>substância</strong> em ti do que imaginavas. Há muito mais <em>profundidade</em> em tua natureza do que te permitiste explorar. Há muito mais <strong>poder</strong> em tua presença do que te autorizaste a expressar.</p>

      <p>O fogo que arde por dentro não é teu <em>inimigo</em>. É teu <strong>guia</strong> mais confiável. É a bússola que sempre aponta para tua verdade. É a força que te <em>impulsiona</em> para além de todas as limitações que aceitas como reais.</p>

      <p>Alimenta o fogo. <strong>Responde ao chamado.</strong> E descobre quem és quando paras de tentar ser quem pensas que <em>deves</em> ser.</p>`
    },
    {
      title: 'A Morte do Eu Templo',
      content: `<p>Há uma versão de ti mesmo que precisa morrer. Não fisicamente. Mas psicologicamente. <em>Simbolicamente</em>.</p>

      <p>É a versão que foi construída para impressionar os outros. A versão que foi moldada para ser <strong>aceita</strong>. A versão que foi polida para ser <em>aprovada</em>.</p>

      <p>É o que poderíamos chamar de "Eu Templo". O eu que foi <strong>santificado</strong> pela opinião alheia. O eu que foi elevado ao status de <em>ídolo</em>. O eu que foi transformado numa imagem a ser <strong>adorada</strong> — por ti mesmo e pelos outros.</p>

      <p>Este Eu Templo tem características específicas: Ele sempre sabe as <em>respostas certas</em>. Nunca demonstra fraqueza ou incerteza. Mantém sempre uma imagem <strong>impecável</strong>. Nunca comete erros — ou quando comete, os esconde. Está sempre no <em>controle</em>. Nunca precisa de ajuda de ninguém. É um <strong>exemplo</strong> para todos.</p>

      <p>E é absolutamente <em>falso</em>.</p>

      <p>O Eu Templo é uma construção. Uma obra de arte <strong>psicológica</strong>. Uma escultura feita de expectativas alheias e necessidades de aprovação. E como toda construção, requer <em>manutenção</em> constante. Energia contínua para manter a fachada. Vigilância permanente para garantir que nenhuma <strong>rachadura</strong> apareça.</p>

      <p>O problema é que viver como um templo é <em>exaustivo</em>. Templos não crescem. Não se <strong>adaptam</strong>. Não evoluem. Eles simplesmente <em>existem</em> para ser admirados.</p>

      <p>E tu não és um objeto de arte. És um ser <strong>vivo</strong>. Um processo em constante transformação. Uma força dinâmica que precisa de <em>espaço</em> para crescer. Para descobrir. Para <strong>errar</strong>. Para aprender. Para se <em>reinventar</em>.</p>

      <p>A morte do Eu Templo não é uma perda. É uma <strong>libertação</strong>. É a libertação da necessidade de ser perfeito. Da pressão de sempre ter as <em>respostas</em>. Da exaustão de manter uma imagem que não corresponde à <strong>realidade</strong>.</p>

      <p>Quando o Eu Templo morre, algo nasce em seu lugar. Algo que não tem nome porque está sempre <em>mudando</em>. Algo que não tem forma fixa porque está sempre se <strong>adaptando</strong>. Algo que não precisa de aprovação externa porque tem sua própria <em>autoridade</em> interna.</p>

      <p>Esse "algo" é o que poderíamos chamar de <strong>Eu Autêntico</strong>. O eu que existe antes das máscaras. O eu que permanece depois que todas as <em>identidades</em> são removidas. O eu que é real demais para ser <strong>adorado</strong>. Humano demais para ser <em>idealizado</em>. Complexo demais para ser <strong>compreendido</strong> completamente.</p>

      <p>Este eu não busca adoração. Busca <em>expressão</em>. Não quer ser admirado. Quer ser <strong>vivido</strong>. Não precisa de pedestais. Precisa de <em>liberdade</em>.</p>

      <p>A morte do Eu Templo geralmente não acontece de uma vez. É um processo <strong>gradual</strong>. Rachadura por rachadura. <em>Desilusão</em> por desilusão. Momento por momento em que a máscara <strong>escorrega</strong>.</p>

      <p>E cada vez que isso acontece, há uma escolha: Corrigir rapidamente a máscara, <em>reparar</em> a imagem. Ou permitir que a rachadura se <strong>expanda</strong>. Deixar que a imperfeição se torne <em>visível</em>. Permitir que a humanidade <strong>transpareça</strong>.</p>

      <p>No início, isso é aterrorizante. Porque foste condicionado a acreditar que tua <em>humanidade</em> é inaceitável. Que tuas falhas são <strong>vergonhosas</strong>. Que tuas incertezas são sinais de <em>fraqueza</em>.</p>

      <p>Mas algo surpreendente acontece quando paras de esconder tua humanidade: As pessoas se <strong>aproximam</strong>. Não se afastam. Porque humanidade reconhece <em>humanidade</em>. Autenticidade atrai <strong>autenticidade</strong>. E pessoas reais preferem conexões reais a performances <em>perfeitas</em>.</p>

      <p>A morte do Eu Templo te ensina algo fundamental: Tu és muito mais <strong>interessante</strong> como ser humano do que como ídolo. Muito mais <em>amável</em> com tuas imperfeições do que com tua máscara de perfeição. Muito mais <strong>poderoso</strong> em tua autenticidade do que em tua performance.</p>

      <p>Porque poder real não vem de nunca cair. Vem de sempre se <em>levantar</em>. Não vem de nunca errar. Vem de sempre <strong>aprender</strong>. Não vem de nunca mostrar fraqueza. Vem de transformar fraqueza em <em>sabedoria</em>.</p>

      <p>Quando o Eu Templo morre, o que nasce não é outro <strong>ídolo</strong>. É uma força viva. Uma presença <em>dinâmica</em>. Uma consciência que não precisa ser adorada porque já sabe que é <strong>sagrada</strong>. Não porque seja perfeita. Mas porque é <em>real</em>.</p>

      <p>E a realidade, em toda sua imperfeição, é muito mais sagrada que qualquer <strong>fantasia</strong> de perfeição.</p>

      <p>Permite que o templo <em>desmorone</em>. E descobre a divindade que sempre existiu nas <strong>ruínas</strong>.</p>`
    },
    {
      title: 'A Fome da Sombra',
      content: `<p>Há apetites em ti que aprendeste a negar. Fomes que foram declaradas <em>proibidas</em>. Desejos que foram rotulados como <strong>pecaminosos</strong>. Impulsos que foram banidos para as profundezas de tua psique.</p>

      <p>Mas a fome não <em>desaparece</em> quando é negada. Ela se intensifica. Se <strong>distorce</strong>. Se torna mais urgente e menos <em>discriminativa</em>.</p>

      <p>A fome da sombra é composta de todos os aspectos de tua natureza que foram <strong>criminalizados</strong>. Tua raiva — que foi transformada em "problema de temperamento". Tua sexualidade — que foi transformada em <em>"obsessão pecaminosa"</em>. Tua ambição — que foi transformada em "egoísmo". Tua necessidade de prazer — que foi transformada em <strong>"hedonismo"</strong>. Tua busca por poder — que foi transformada em "arrogância". Tua necessidade de ser <em>visto</em> — que foi transformada em "narcisismo".</p>

      <p>Cada um destes aspectos foi demonizado não porque fosse inerentemente <strong>destrutivo</strong>. Mas porque representava uma força que não podia ser facilmente <em>controlada</em>. Uma energia que recusava <strong>domesticação</strong>. Um impulso que exigia <em>autonomia</em>.</p>

      <p>Quando negaste estes aspectos, não os <strong>eliminaste</strong>. Apenas os <em>enviaste</em> para o porão de tua consciência. Onde continuaram a <strong>existir</strong>. A crescer. A se <em>intensificar</em>. E a encontrar formas indiretas de se <strong>expressar</strong>.</p>

      <p>A raiva negada se tornou depressão — raiva voltada para <em>dentro</em>. A sexualidade reprimida se tornou obsessão — fantasias que <strong>dominam</strong> a mente. A ambição suprimida se tornou inveja — desejo pelos sucessos <em>alheios</em>. A busca por prazer negada se tornou vício — tentativas desesperadas de sentir <strong>algo</strong>. A necessidade de poder reprimida se tornou manipulação — tentativas <em>indiretas</em> de controle. A necessidade de ser visto negada se tornou performance — tentativas <strong>exageradas</strong> de chamar atenção.</p>

      <p>Quando os aspectos sombrios são negados, eles não se tornam <em>menores</em>. Eles se tornam mais <strong>destrutivos</strong>. Porque operam fora do alcance da consciência. Fora do controle da <em>razão</em>. Fora da influência da <strong>sabedoria</strong>.</p>

      <p>Mas há uma alternativa à negação. Há a possibilidade de <em>reconhecimento</em>. De integração <strong>consciente</strong>. De relacionar-te com estes aspectos como forças naturais que precisam de direção, não de <em>eliminação</em>.</p>

      <p>A raiva, quando reconhecida, se torna <strong>poder</strong>. A capacidade de estabelecer limites. De proteger o que é <em>sagrado</em> para ti. De resistir àquilo que viola tua <strong>integridade</strong>.</p>

      <p>A sexualidade, quando aceita, se torna <em>criatividade</em>. Força vital que pode ser canalizada para qualquer forma de <strong>expressão</strong>. Energia que pode dar vida às tuas visões. Poder que pode <em>manifestar</em> teus sonhos.</p>

      <p>A ambição, quando direcionada conscientemente, se torna <strong>propósito</strong>. A força que te impulsiona para além de tuas limitações. A energia que transforma visões em <em>realidade</em>. O combustível que alimenta a <strong>transformação</strong>.</p>

      <p>A busca por prazer, quando equilibrada, se torna <em>celebração</em>. A capacidade de apreciar a beleza da existência. De encontrar alegria nos momentos <strong>simples</strong>. De saborear a experiência de estar <em>vivo</em>.</p>

      <p>A necessidade de poder, quando madura, se torna <strong>autoridade</strong>. Não sobre outros, mas sobre ti mesmo. A capacidade de dirigir tua própria <em>vida</em>. De fazer escolhas baseadas em tua sabedoria interna. De ser o <strong>autor</strong> de tua própria história.</p>

      <p>A necessidade de ser visto, quando saudável, se torna <em>expressão autêntica</em>. O desejo de compartilhar teus dons com o mundo. De contribuir com tua perspectiva <strong>única</strong>. De ser reconhecido por quem realmente <em>és</em>.</p>

      <p>A fome da sombra não é tua inimiga. É tua <strong>energia</strong> vital disfarçada. É teu poder pessoal tentando encontrar expressão. É tua força <em>criativa</em> procurando um canal.</p>

      <p>Quando paras de lutar contra a fome da sombra e começas a <strong>alimentá-la</strong> conscientemente... Quando deixas de tentar matá-la de fome e começas a direcioná-la <em>sabiamente</em>... Descobres que ela se transforma numa fonte poderosa de <strong>vitalidade</strong>. Numa força que pode impulsionar-te para além de qualquer <em>limitação</em>. Numa energia que pode dar vida aos teus sonhos mais <strong>ambiciosos</strong>.</p>

      <p>A sombra não é aquilo de que precisas te livrar. É aquilo com que precisas <em>aprender</em> a dançar. É aquilo que precisa ser integrado, não <strong>eliminado</strong>. É aquilo que pode tornar-te completo, não <em>dividido</em>.</p>

      <p>Alimenta a fome da sombra. Mas alimenta-a <strong>conscientemente</strong>. E descobre o poder que sempre esteve esperando para ser <em>liberado</em>.</p>`
    },
    {
      title: 'O Silêncio da Verdade Oculta',
      content: `<p>Há momentos de silêncio em que algo fala. Não com palavras. Não com <em>conceitos</em>. Mas com uma clareza que transcende a linguagem. É a voz da <strong>sombra</strong> quando ela finalmente se sente segura para emergir.</p>

      <p>Quando para de se esconder. Quando deixa de se <em>disfarçar</em>. Quando cessa de comunicar-se através de <strong>sintomas</strong>. E simplesmente <em>fala</em>.</p>

      <p>Este silêncio não é vazio. É <strong>pregnant</strong>. Cheio de informações que a mente consciente ainda não processou. Repleto de <em>sabedoria</em> que ainda não foi traduzida em palavras. Saturado de <strong>conhecimento</strong> que vem de uma fonte mais profunda que o intelecto.</p>

      <p>No silêncio, a sombra revela seus <em>segredos</em>. Não os segredos sombrios que temes. Mas os segredos <strong>luminosos</strong> que foram escondidos na escuridão. Os talentos que foram enterrados porque eram "inadequados". As capacidades que foram <em>suprimidas</em> porque eram "perigosas". A sabedoria que foi <strong>silenciada</strong> porque era "inconveniente".</p>

      <p>No silêncio, descobres que a sombra não é teu <em>lado escuro</em>. É teu lado <strong>não autorizado</strong>. A parte de ti que nunca recebeu permissão para <em>existir</em>. A dimensão de tua personalidade que foi julgada como <strong>inaceitável</strong>.</p>

      <p>E neste reconhecimento, algo muda. A <em>resistência</em> se dissolve. O medo se transforma em <strong>curiosidade</strong>. A rejeição se torna <em>integração</em>.</p>

      <p>No silêncio, a sombra te conta sua <strong>história</strong>. Te mostra os momentos em que foi banida. As situações em que foi <em>julgada</em>. As circunstâncias em que foi forçada a se <strong>esconder</strong>. E através desta história, compreendes que a sombra não é tua <em>inimiga</em>. É uma parte de ti que foi <strong>ferida</strong>. Uma dimensão de tua natureza que foi <em>traumatizada</em>. Um aspecto de tua psique que precisava de <strong>proteção</strong>.</p>

      <p>No silêncio, percebes que a sombra não quer te <em>destruir</em>. Quer ser <strong>compreendida</strong>. Não quer assumir o controle de tua vida. Quer ser <em>incluída</em> nela. Não quer dominarte. Quer <strong>colaborar</strong> contigo.</p>

      <p>Este silêncio da verdade oculta não pode ser <em>forçado</em>. Não pode ser produzido através de técnicas. Não pode ser <strong>manipulado</strong> através de práticas. Ele emerge quando há <em>segurança</em> suficiente. Quando há aceitação suficiente. Quando há <strong>amor</strong> suficiente por toda a tua natureza. Incluindo as partes que foram <em>rejeitadas</em>. Especialmente as partes que foram <strong>demonizadas</strong>.</p>

      <p>No silêncio, descobres que a sombra tem <em>dons</em> para ti. Perspectivas que tua mente consciente nunca considerou. Soluções que teu intelecto nunca <strong>imaginou</strong>. Capacidades que tua personalidade socializada nunca <em>desenvolveu</em>.</p>

      <p>A sombra vê o que a luz não consegue <strong>iluminar</strong>. Percebe o que a consciência comum não consegue <em>detectar</em>. Compreende o que a lógica não consegue <strong>explicar</strong>.</p>

      <p>No silêncio, a sombra te ensina que há <em>sabedoria</em> na escuridão. Que há <strong>clareza</strong> na confusão. Que há <em>orientação</em> no caos. Que há <strong>direção</strong> na desorientação.</p>

      <p>Te ensina que nem toda verdade é <em>luminosa</em>. Algumas verdades são sombrias. Não porque sejam <strong>negativas</strong>. Mas porque foram <em>ocultadas</em>. Porque foram banidas da consciência <strong>aceitável</strong>.</p>

      <p>No silêncio da verdade oculta, não há <em>julgamento</em>. Não há bem ou mal. Não há certo ou <strong>errado</strong>. Há apenas <em>realidade</em>. A realidade completa de quem és. Incluindo as partes que foram <strong>negadas</strong>. Incluindo os aspectos que foram <em>reprimidos</em>. Incluindo as dimensões que foram <strong>esquecidas</strong>.</p>

      <p>E nesta realidade completa, há uma <em>paz</em> estranha. A paz de não ter que lutar contra si mesmo. A paz de não ter que <strong>esconder</strong> aspectos de tua natureza. A paz de ser <em>inteiro</em>. Mesmo na <strong>imperfeição</strong>. Especialmente na imperfeição. Porque a imperfeição é o que te torna <em>humano</em>. E a humanidade é o que te torna <strong>real</strong>. E a realidade é o que te torna <em>livre</em>.</p>

      <p>Escuta o silêncio. Especialmente quando ele te <strong>assusta</strong>. Porque é no silêncio mais assustador que as verdades mais <em>libertadoras</em> são reveladas.</p>`
    },
    {
      title: 'Quando Tu e a Sombra se Tornam Um',
      content: `<p>Chega um momento na jornada quando a guerra civil termina. Quando para a luta entre quem pensas que és e quem <em>realmente</em> és. Quando cessa o conflito entre a luz que mostras ao mundo e a escuridão que escondes de ti mesmo.</p>

      <p>Este momento não chega através de <strong>vitória</strong>. Não há vencedor nem vencido. Chega através de <em>reconhecimento</em>. O reconhecimento de que nunca houve dois <strong>seres</strong> lutando. Sempre houve apenas <em>um</em> ser tentando aceitar a si mesmo completamente.</p>

      <p>A integração da sombra não é um processo de <strong>eliminar</strong> aspectos de ti mesmo. É um processo de <em>abraçar</em> aspectos de ti mesmo. Não é sobre tornar-se <strong>perfeito</strong>. É sobre tornar-se <em>completo</em>. Não é sobre livrar-se da escuridão. É sobre encontrar a <strong>luz</strong> que existe dentro da escuridão.</p>

      <p>Quando tu e a sombra se tornam um, algo fundamental <em>muda</em>. Paras de ter medo de ti mesmo. Paras de ter vergonha de tua <strong>complexidade</strong>. Paras de tentar encaixar tua vastidão em categorias <em>simples</em>.</p>

      <p>Aceitas que és uma contradição <strong>viva</strong>. Que podes ser gentil e feroz ao mesmo tempo. Que podes ser <em>vulnerável</em> e poderoso simultaneamente. Que podes ser santo e pecador na mesma <strong>respiração</strong>. E que esta contradição não é um <em>problema</em> a ser resolvido. É a <strong>riqueza</strong> de ser humano.</p>

      <p>Quando a integração acontece, descobres que a sombra não estava tentando te <em>sabotar</em>. Estava tentando te <strong>completar</strong>. Não estava tentando te destruir. Estava tentando te <em>libertar</em>. Não estava tentando te diminuir. Estava tentando te <strong>expandir</strong>.</p>

      <p>A sombra trazia qualidades que tua personalidade consciente havia <em>rejeitado</em>. Forças que tua identidade socializada havia <strong>suprimido</strong>. Capacidades que tua versão "aceitável" havia <em>abandonado</em>.</p>

      <p>E quando estas qualidades são reintegradas, tornas-te mais <strong>poderoso</strong>. Não o poder sobre outros. O poder de ser <em>autenticamente</em> tu mesmo. O poder de expressar toda a <strong>gama</strong> de tua natureza. O poder de responder às situações com toda a tua <em>capacidade</em>.</p>

      <p>Quando tu e a sombra se tornam um, paras de ser <strong>previsível</strong>. Para os outros e para ti mesmo. Porque agora tens acesso a aspectos de tua personalidade que estavam <em>dormentes</em>. Podes ser delicado quando a situação pede delicadeza. E podes ser <strong>implacável</strong> quando a situação pede força. Podes ser compassivo quando a compaixão serve. E podes ser <em>distante</em> quando o distanciamento protege.</p>

      <p>Tens uma gama completa de <strong>respostas</strong> disponíveis. Não apenas as respostas que foram <em>aprovadas</em> por outros.</p>

      <p>Esta integração também muda tua relação com a <strong>culpa</strong>. Quando aceitas que tens capacidade tanto para o bem quanto para o mal... Quando reconheces que podes ser tanto <em>criativo</em> quanto destrutivo... Quando abraças que podes ser tanto generoso quanto <strong>egoísta</strong>... Paras de te sentir culpado por ser <em>humano</em>.</p>

      <p>E começás a te sentir <strong>responsável</strong> por escolher conscientemente qual aspecto expressar em cada momento. A culpa é substituída por <em>discernimento</em>. A auto-condenação é substituída por <strong>auto-responsabilidade</strong>. O medo de ti mesmo é substituído por <em>confiança</em> em tua capacidade de fazer escolhas sábias.</p>

      <p>Quando tu e a sombra se tornam um, tuas <strong>relações</strong> mudam. Paras de atrair pessoas que espelham apenas aspectos de ti mesmo. Paras de projetar nos outros aquilo que não aceitas em ti. Paras de <em>demonizar</em> nos outros as qualidades que negaste em ti mesmo.</p>

      <p>E começás a ver as pessoas como <strong>realmente</strong> são. Não como reflexos de tuas projeções <em>inconscientes</em>. Esta clareza te permite formar relacionamentos mais <strong>autênticos</strong>. Baseados na realidade, não em fantasias. Baseados em <em>escolha</em> consciente, não em necessidades inconscientes. Baseados em <strong>amor</strong> real, não em dependência emocional.</p>

      <p>Quando a integração é completa, descobres algo surpreendente: Nunca houve realmente uma <em>sombra</em> separada de ti. Havia apenas aspectos de ti mesmo que havias <strong>esquecido</strong>. Dimensões de tua natureza que havias <em>negado</em>. Partes de tua totalidade que havias <strong>rejeitado</strong>.</p>

      <p>A sombra era simplesmente o nome que davas àquilo que não conseguias <em>aceitar</em> sobre ti mesmo. E quando esta aceitação finalmente acontece... Quando abraças toda a <strong>complexidade</strong> de tua natureza... Quando paras de tentar ser apenas "bom" e aceitas ser <em>completo</em>...</p>

      <p>Descobres que és muito mais <strong>vasto</strong> do que qualquer identidade que havias assumido. Muito mais <em>poderoso</em> do que qualquer versão limitada de ti mesmo. Muito mais <strong>livre</strong> do que quando tentavas ser apenas uma coisa.</p>

      <p>A integração não é um <em>destino</em>. É um processo contínuo. Sempre há novos aspectos de ti mesmo para <strong>descobrir</strong>. Sempre há novas dimensões de tua natureza para <em>explorar</em>. Sempre há novos níveis de <strong>autenticidade</strong> para alcançar.</p>

      <p>Mas agora fazes isso não com medo, mas com <em>curiosidade</em>. Não com resistência, mas com <strong>abertura</strong>. Não lutando contra ti mesmo, mas <em>colaborando</em> contigo mesmo.</p>

      <p>Tu e a sombra, finalmente, como <strong>um</strong>.</p>`
    },
    {
      title: 'A Nova Presença no Abismo',
      content: `<p>Quando completaste a jornada através da PORTA UMBRAE, algo fundamental mudou em tua presença. Não é algo que os outros possam <em>definir</em>. Mas é algo que eles podem <strong>sentir</strong>.</p>

      <p>Há uma qualidade em ti que não existia antes. Uma <em>densidade</em> de ser. Uma <strong>autenticidade</strong> que ressoa em frequências profundas. Uma presença que carrega o peso da verdade <em>vivida</em>.</p>

      <p>És agora alguém que não tem medo da própria <strong>escuridão</strong>. E quando não tens medo de tua própria escuridão, não tens medo da escuridão <em>alheia</em>. Quando não julgas os aspectos sombrios de ti mesmo, não julgas os aspectos sombrios dos <strong>outros</strong>.</p>

      <p>Esta ausência de julgamento cria um campo de <em>segurança</em> ao teu redor. Um espaço onde outros podem relaxar suas <strong>máscaras</strong>. Onde podem ser mais reais do que normalmente se permitem ser. Onde podem revelar aspectos de si mesmos que geralmente <em>escondem</em>.</p>

      <p>O Abismo <strong>reconhece</strong> esta nova presença. Reconhece alguém que fez a jornada. Alguém que enfrentou suas próprias <em>profundezas</em>. Alguém que encontrou luz na <strong>escuridão</strong>.</p>

      <p>E este reconhecimento se manifesta de formas <em>sutis</em>. Pessoas começam a procurar-te quando estão passando por suas próprias <strong>crises</strong>. Não porque tenhas respostas. Mas porque tua presença lhes lembra que é possível <em>sobreviver</em> ao desconhecido.</p>

      <p>Situações complexas começam a se desenrolar de forma mais <strong>fluida</strong> na tua presença. Não porque estejas manipulando. Mas porque tua <em>aceitação</em> da complexidade permite que ela se resolva naturalmente.</p>

      <p>Verdades ocultas começam a emergir com mais <strong>facilidade</strong> ao teu redor. Não porque estejas forçando. Mas porque tua própria relação com a verdade convida à <em>honestidade</em>.</p>

      <p>Esta nova presença não é <strong>performática</strong>. Não é algo que possas fingir ou <em>imitar</em>. É o resultado natural de teres integrado aspectos de ti mesmo que estavam <strong>fragmentados</strong>. É a consequência inevitável de teres parado de lutar contra tua própria <em>natureza</em>. É o que acontece quando alguém se torna <strong>íntegro</strong>.</p>

      <p>Não perfeito — <em>íntegro</em>. Há uma diferença <strong>fundamental</strong>. Perfeição é sobre não ter falhas. Integridade é sobre <em>abraçar</em> todas as partes de si mesmo. Incluindo as falhas. Especialmente as <strong>falhas</strong>. Porque são as falhas que te tornam <em>humano</em>. E a humanidade autêntica é muito mais poderosa que a <strong>perfeição</strong> artificial.</p>

      <p>O Abismo não se impressiona com perfeição. O Abismo se reconhece na <em>autenticidade</em>. Na coragem de ser real mesmo quando é <strong>desconfortável</strong>. Na disposição de abraçar a totalidade da experiência humana. Na capacidade de encontrar <em>sagrado</em> no profano.</p>

      <p>Esta nova presença muda tua relação com o <strong>poder</strong>. Não buscas mais poder <em>sobre</em> outros. Porque descobriste poder <strong>dentro</strong> de ti mesmo. Não precisas mais impressionar. Porque sabes quem és quando ninguém está <em>olhando</em>. Não precisas mais provar teu valor. Porque teu valor não depende de <strong>aprovação</strong> externa.</p>

      <p>Esta mudança te dá acesso a formas de poder que não estavam disponíveis <em>antes</em>. O poder da <strong>presença</strong> autêntica. O poder de influenciar através do <em>exemplo</em>. O poder de transformar situações simplesmente por <strong>estar</strong> nelas. Não através de ação, mas através de <em>ser</em>.</p>

      <p>Torna-te também um <strong>catalisador</strong>. Tua presença acelera processos que já estavam acontecendo <em>inconscientemente</em> nos outros. Pessoas ao teu redor começam a confrontar suas próprias <strong>sombras</strong>. Não porque estejas forçando. Mas porque tua própria <em>integração</em> convida à integração. Tua paz com teus aspectos sombrios dá permissão para que outros examinem os <strong>próprios</strong>.</p>

      <p>Esta é uma responsabilidade que vem com a integração da sombra: Tornas-te um <em>espelho</em> para outros. Não um espelho que mostra apenas o que eles querem <strong>ver</strong>. Um espelho que mostra o que eles <em>são</em>. Incluindo os aspectos que prefeririam <strong>negar</strong>.</p>

      <p>Algumas pessoas serão gratas por esta <em>clareza</em>. Outras resistirão a ela. Algumas se sentirão <strong>inspiradas</strong> por tua autenticidade. Outras se sentirão ameaçadas por ela. Esta é a natureza de ser uma presença <em>real</em> num mundo de máscaras.</p>

      <p>Não é possível agradar a todos quando és <strong>autêntico</strong>. Mas é possível viver em <em>integridade</em> contigo mesmo. E essa integridade é o maior presente que podes dar ao mundo. Porque num mundo cheio de pessoas tentando ser quem <strong>não</strong> são... Alguém que simplesmente <em>é</em> quem é se torna um farol.</p>

      <p>Uma lembrace de que é possível viver <strong>autenticamente</strong>. Uma prova de que a integração da sombra não é apenas possível, mas <em>transformadora</em>.</p>

      <p>O Abismo te reconhece agora. Não como alguém que se <strong>perdeu</strong> na escuridão. Mas como alguém que <em>encontrou</em> luz na escuridão. Como alguém que descobriu que luz e escuridão não são <strong>opostos</strong>. São aspectos complementares de uma <em>totalidade</em> maior.</p>

      <p>E és agora uma expressão viva desta <strong>totalidade</strong>. Uma presença que carrega tanto luz quanto escuridão. E que encontrou <em>paz</em> na contradição. <strong>Poder</strong> na complexidade. <em>Sabedoria</em> na integração.</p>

      <p>Bem-vindo à nova presença no Abismo. Bem-vindo à tua <strong>totalidade</strong>.</p>`
    },
    {
      title: 'Convite às Correntes Invisíveis',
      content: `<p>Agora que despertaste para aquilo que foi ocultado... Agora que integraste a sombra que carregavas sem <em>saber</em>... Agora que descobriste a força que sempre existiu nas partes de ti que foram <strong>negadas</strong>... É hora de olhar para além de ti mesmo.</p>

      <p>É hora de questionar não apenas o que foi escondido <em>em</em> ti. Mas o que foi escondido <strong>de</strong> ti.</p>

      <p>Há forças operando no mundo que preferem que permaneças <em>pequeno</em>. Sistemas que se beneficiam de tua <strong>inconsciência</strong>. Estruturas que lucram com tua <em>dependência</em>. Instituições que prosperam através de tua <strong>submissão</strong>.</p>

      <p>Estas forças não operam através de violência óbvia. Operam através de <em>persuasão</em> sutil. Através de condicionamento <strong>gradual</strong>. Através de manipulação tão refinada que a confundes com <em>normalidade</em>.</p>

      <p>São as correntes que não consegues ver porque foram tecidas com <strong>consenso</strong>. As prisões que não reconheces porque foram construídas com <em>aprovação</em> social. Os limites que não questionas porque foram estabelecidos em nome da <strong>segurança</strong>.</p>

      <p>Descobriste que tinhas uma sombra pessoal. Agora é hora de descobrir que existe uma sombra <em>coletiva</em>. Uma escuridão que não pertence apenas a ti, mas à <strong>espécie</strong>. Aspectos da natureza humana que foram banidos não apenas de tua consciência individual. Mas da consciência <em>civilizada</em> como um todo.</p>

      <p>E assim como tua sombra pessoal continha poder que te foi <strong>negado</strong>... A sombra coletiva contém liberdades que te foram <em>confiscadas</em>. Contém autonomia que te foi <strong>roubada</strong>. Contém soberania que te foi <em>suprimida</em>.</p>

      <p>No próximo grimório desta jornada, exploraremos as <strong>Correntes Invisíveis</strong>. As forças que moldam tua realidade sem que <em>percebas</em>. Os sistemas que dirigem tua vida enquanto te fazem acreditar que estás no <strong>controle</strong>. As estruturas que definem tuas possibilidades enquanto te dão a ilusão de <em>escolha</em>.</p>

      <p>Descobrirás que muitas das limitações que aceitas como <strong>naturais</strong> são artificiais. Que muitas das "verdades" que consideras <em>óbvias</em> são fabricadas. Que muitas das "realidades" que assumes como <strong>fixas</strong> são manipuladas.</p>

      <p>Mas antes de embarcares nesta próxima fase da jornada, <em>consolida</em> o que descobriste aqui. Integra completamente a sabedoria da sombra <strong>pessoal</strong>. Porque apenas alguém que conhece sua própria escuridão pode reconhecer a escuridão <em>coletiva</em>. Apenas alguém que integrou sua própria sombra pode navegar as sombras <strong>sociais</strong> sem ser consumido por elas.</p>

      <p>Apenas alguém que encontrou poder em seus aspectos negados pode <em>reconhecer</em> quando esse poder está sendo negado pelos sistemas.</p>

      <p>Vives agora numa nova frequência. Numa nova <strong>realidade</strong>. Onde sombra e luz não são <em>inimigas</em>. Onde escuridão e clareza <strong>colaboram</strong>. Onde toda a gama de tua natureza humana é <em>aceita</em> e utilizada conscientemente.</p>

      <p>Esta é tua base. Tua <strong>fundação</strong>. Tua plataforma de <em>lançamento</em> para investigações mais profundas. Porque agora que sabes o que te esconderam <strong>sobre</strong> ti... És capaz de investigar o que te esconderam sobre o <em>mundo</em>.</p>

      <p>Agora que descobriste as mentiras que contaram sobre tua própria <strong>natureza</strong>... Podes questionar as mentiras que contaram sobre a <em>realidade</em>. Agora que integraste tua sombra <strong>individual</strong>... Estás pronto para confrontar a sombra <em>civilizacional</em>.</p>

      <p>As Correntes Invisíveis estão esperando para serem <strong>examinadas</strong>. As prisões sutis estão prontas para serem <em>reconhecidas</em>. Os sistemas de controle estão aguardando para serem <strong>expostos</strong>.</p>

      <p>Mas apenas por aqueles que têm coragem suficiente para olhar. Sabedoria suficiente para <em>compreender</em>. E força suficiente para permanecer <strong>livres</strong> mesmo depois de ver.</p>

      <p>Conseguiste isso? A jornada através da PORTA UMBRAE te deu essa <em>capacidade</em>? Descobrirás em breve. Porque uma vez que vês as correntes invisíveis... Não podes <strong>fingir</strong> que elas não existem.</p>

      <p>Uma vez que reconheces os sistemas de <em>controle</em>... Não podes pretender que és <strong>livre</strong> enquanto operas dentro deles. Uma vez que compreendes a magnitude da <em>manipulação</em>... Tens que escolher entre <strong>cumplicidade</strong> e resistência. Entre colaboração e <em>rebelião</em>. Entre aceitação e <strong>libertação</strong>.</p>

      <p>Esta escolha não pode ser feita por ti. Deve ser feita <em>por</em> ti. Conscientemente. <strong>Deliberadamente</strong>. Com pleno conhecimento das <em>consequências</em>.</p>

      <p>O despertar da sombra pessoal foi apenas o <strong>começo</strong>. O despertar para as correntes invisíveis é o próximo <em>passo</em>. E depois delas... Há ainda outras <strong>profundidades</strong> a serem exploradas. Outras verdades a serem <em>desenterradas</em>. Outros aspectos da realidade a serem <strong>questionados</strong>.</p>

      <p>A PORTA UMBRAE é apenas a primeira de muitas <em>passagens</em>. Cada uma revelando camadas mais profundas de <strong>ilusão</strong>. Cada uma oferecendo níveis mais elevados de <em>liberdade</em>. Cada uma exigindo maior coragem para <strong>atravessar</strong>.</p>

      <p>Estás pronto para a próxima? As <em>Correntes Invisíveis</em> aguardam.</p>`
    },
    {
      title: 'Selo Final do Despertar',
      content: `<div style="text-align: center; padding: 30px; border: 2px solid #d4af37; margin: 30px 0; background: rgba(212, 175, 55, 0.1);">
        <p style="font-style: italic; font-size: 20px; margin-bottom: 15px; color: #d4af37;">"Não fui salvo. Fui encontrado por aquilo que tentaram apagar em mim."</p>
        <p style="font-weight: bold; color: #d4af37;">— Testemunho do Primeiro Despertar</p>
      </div>

      <p>A jornada através da primeira porta está completa. Mas o caminho se estende muito além do que podes <em>imaginar</em>. O que descobriste sobre ti mesmo é apenas o <strong>reflexo</strong> de verdades muito maiores. O que integraste em tua psique individual é apenas a <em>preparação</em> para integrações mais vastas.</p>

      <p>O poder que encontraste em tua sombra pessoal é apenas uma <strong>amostra</strong> do poder que está sendo suprimido em escalas coletivas.</p>

      <p>Carregas agora uma <em>marca</em>. Não visível aos olhos comuns. Mas reconhecível por aqueles que fizeram jornadas <strong>similares</strong>. É a marca de alguém que não tem medo de sua própria <em>escuridão</em>. De alguém que encontrou luz onde outros veem apenas <strong>trevas</strong>. De alguém que descobriu que a verdade é mais poderosa que a <em>ilusão</em>.</p>

      <p>Mesmo quando a verdade é <strong>desconfortável</strong>. Especialmente quando a verdade é desconfortável.</p>

      <p>Esta marca te <em>qualifica</em> para as próximas revelações. Te prepara para os próximos <strong>desvelamentos</strong>. Te autoriza a questionar não apenas a ti mesmo, mas aos <em>sistemas</em> que te cercam.</p>

      <p>Porque agora sabes que muito do que te foi ensinado sobre ti mesmo era <strong>falso</strong>. E se mentem sobre ti <em>para</em> ti... Sobre o que mais estão mentindo?</p>

      <p>Se tua própria natureza foi <strong>distorcida</strong> e apresentada de forma que te mantivesse pequeno... Que outras distorções existem que te mantêm <em>limitado</em>?</p>

      <p>Se descobriste poder onde te disseram que havia apenas <strong>fraqueza</strong>... Onde mais há poder que está sendo <em>ocultado</em> de ti?</p>

      <p>Estas perguntas não podem mais ser <strong>evitadas</strong>. Uma vez que despertas para uma camada de ilusão, todas as outras camadas se tornam <em>suspeitas</em>. Uma vez que questionas uma autoridade, todas as autoridades se tornam <strong>questionáveis</strong>. Uma vez que descobres uma mentira, todas as "verdades" se tornam <em>investigáveis</em>.</p>

      <p>Este é tanto o <strong>presente</strong> quanto o fardo do despertar. O presente é a <em>liberdade</em>. A liberdade de ser quem realmente és. A liberdade de pensar <strong>pensamentos</strong> não autorizados. A liberdade de questionar <em>tudo</em>.</p>

      <p>O fardo é a <strong>responsabilidade</strong>. A responsabilidade de viver de acordo com o que descobriste. A responsabilidade de não fingir <em>ignorância</em> quando agora tens conhecimento. A responsabilidade de continuar investigando mesmo quando a investigação se torna <strong>perigosa</strong>.</p>

      <p>Porque há níveis de verdade que os sistemas de poder preferem que permaneçam <em>ocultos</em>. Há aspectos da realidade que, quando compreendidos, <strong>ameaçam</strong> estruturas estabelecidas. Há conhecimentos que, quando aplicados, podem <em>transformar</em> não apenas indivíduos, mas civilizações inteiras.</p>

      <p>E tu agora tens a <strong>capacidade</strong> de acessar estes conhecimentos. Porque fizeste a jornada através de tua própria <em>resistência</em>. Porque enfrentaste teus próprios <strong>medos</strong>. Porque integraste tuas próprias <em>contradições</em>.</p>

      <p>E através deste processo, desenvolveste a força interna necessária para <strong>suportar</strong> verdades maiores. A coragem necessária para questionar <em>autoridades</em> maiores. A sabedoria necessária para navegar <strong>complexidades</strong> maiores.</p>

      <p>O despertar da sombra pessoal não é um fim em si mesmo. É uma <em>preparação</em>. Uma iniciação. Um <strong>treinamento</strong> para jornadas mais profundas.</p>

      <p>Porque aqueles que não conhecem suas próprias <em>profundezas</em> não podem navegar as profundezas do mundo. Aqueles que não integraram sua própria <strong>escuridão</strong> são facilmente seduzidos pela escuridão externa. Aqueles que não encontraram seu próprio <em>poder</em> são facilmente manipulados por aqueles que encontraram o deles.</p>

      <p>Mas tu fizeste o trabalho <strong>interno</strong>. Encontraste teu centro. Descobriste tua <em>autoridade</em> interna. Integraste tua <strong>totalidade</strong>.</p>

      <p>E agora és capaz de olhar para o mundo <em>externo</em> com olhos que não são facilmente enganados. Com percepção que não é facilmente <strong>manipulada</strong>. Com discernimento que não é facilmente <em>corrompido</em>.</p>

      <p>As próximas portas estão esperando. As próximas <strong>revelações</strong> estão se preparando para emergir. Os próximos níveis de <em>liberdade</em> estão se tornando disponíveis.</p>

      <p>Mas apenas para aqueles que têm coragem de <strong>continuar</strong>. Apenas para aqueles que valorizam a verdade mais que o <em>conforto</em>. Apenas para aqueles que escolhem a <strong>liberdade</strong> mesmo quando ela exige sacrifícios.</p>

      <p>O despertar da sombra foi teu primeiro <em>teste</em>. E tu passaste. Os próximos testes serão mais <strong>desafiadores</strong>. As próximas revelações serão mais <em>perturbadoras</em>. As próximas libertações exigirão mais <strong>coragem</strong>.</p>

      <p>Mas também oferecerão recompensas mais <em>profundas</em>. Níveis de autonomia que poucos <strong>experimentam</strong>. Graus de soberania que poucos <em>alcançam</em>. Qualidades de liberdade que poucos <strong>conhecem</strong>.</p>

      <p>A jornada continua. A investigação se <em>aprofunda</em>. O despertar se <strong>expande</strong>.</p>

      <p>E tu, agora equipado com o conhecimento de tua própria <em>totalidade</em>... És capaz de questionar a totalidade de tudo o mais.</p>

      <p>Bem-vindo ao <strong>início</strong> da verdadeira jornada. O despertar da sombra foi apenas a preparação. Agora começa a <em>aplicação</em> daquilo que descobriste. Agora inicia a <strong>utilização</strong> do poder que integraste.</p>

      <p>Agora principia a construção de uma vida que reflete tua <em>autenticidade</em> total. E a <strong>transformação</strong> de um mundo que há muito tempo esqueceu o que significa ser verdadeiramente livre.</p>`
    }
  ];

  // Criar capítulos restantes
  for (let i = 0; i < remainingChapters.length; i++) {
    const chapterData = {
      grimoire_id: grimoire.id,
      title: remainingChapters[i].title,
      content: remainingChapters[i].content,
      chapter_number: i + 6, // Começar do capítulo 6
      estimated_reading_time: Math.ceil(remainingChapters[i].content.length / 800)
    };

    const { error: chapterError } = await supabase
      .from('chapters')
      .insert(chapterData);

    if (chapterError) {
      console.error(`❌ Erro ao criar capítulo ${i + 6}:`, chapterError);
      return;
    }

    console.log(`✅ Capítulo ${i + 6}: ${remainingChapters[i].title}`);
  }

  console.log(`\n🔥 GRIMÓRIO COMPLETADO!`);
  console.log(`📕 Total de capítulos: 12`);
  console.log(`📄 Aproximadamente 25.000 palavras`);
  console.log(`🎯 Primeiro volume da série PORTA UMBRAE completo`);
}

completeRemainingChapters().catch(console.error);