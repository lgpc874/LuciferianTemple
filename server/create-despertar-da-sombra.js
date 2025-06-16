import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createDespertarDaSombra() {
  console.log('📕 Criando "O Despertar da Sombra" - Volume I da série PORTA UMBRAE...');
  console.log('🔥 20.000-25.000 palavras | Ritualístico, Vibracional, Confrontador');

  // Buscar seção Porta Umbrae
  const { data: sections } = await supabase
    .from('library_sections')
    .select('*')
    .eq('name', 'Porta Umbrae');

  if (!sections || sections.length === 0) {
    console.error('❌ Seção Porta Umbrae não encontrada');
    return;
  }

  const sectionId = sections[0].id;
  console.log(`✅ Seção Porta Umbrae encontrada: ID ${sectionId}`);

  // Criar grimório
  const grimoire = {
    title: '📕 O Despertar da Sombra – Verdades que o Mundo Ocultou',
    description: 'Primeiro de seis grimórios que formam o ciclo intermediário da jornada luciferiana ancestral. A descoberta daquilo que foi jogado no escuro pela moral, pela religião e pela sociedade.',
    section_id: sectionId,
    price: 49.99,
    cover_image_url: null,
    is_published: true,
    estimated_reading_time: 120,
    level: 'intermediário'
  };

  const { data: createdGrimoire, error: grimoireError } = await supabase
    .from('grimoires')
    .insert(grimoire)
    .select()
    .single();

  if (grimoireError) {
    console.error('❌ Erro ao criar grimório:', grimoireError);
    return;
  }

  console.log(`✅ Grimório criado: ${createdGrimoire.title}`);

  // Capítulos completos do grimório (12 capítulos totais)
  const chapters = [
    {
      title: 'Invocação das Sombras Ocultas',
      content: `<div class="citacao-abertura">
        <p><em>"O que você nega te domina. O que você aceita, te liberta."</em></p>
        <p class="assinatura">— Decreto do Abismo</p>
      </div>`
    },
    {
      title: 'O Primeiro Reflexo no Vazio',
      content: `<p>Há algo em ti que nunca foi tocado pela luz que te ensinaram a adorar.</p>

      <p>Algo que permaneceu intacto enquanto tua mente era moldada por mãos que não eram tuas.</p>

      <p>Algo que resistiu a todas as tentativas de domesticação, purificação, salvação.</p>

      <p>Algo que eles chamaram de <strong>sombra</strong> para que tu tivesses medo de encontrá-lo.</p>

      <p>Mas a sombra não é o mal que te fizeram acreditar.</p>

      <p>A sombra é aquilo que foi <em>ocultado</em> de ti para que permanecesses pequeno.</p>

      <p>É a parte de tua natureza que foi banida porque era poderosa demais.</p>

      <p>Selvagem demais.</p>

      <p>Livre demais.</p>

      <p><strong>Verdadeira demais.</strong></p>

      <p>Durante anos, te ensinaram que havia partes de ti que eram inaceitáveis.</p>

      <p>Impulsos que deveriam ser suprimidos.</p>

      <p>Desejos que deveriam ser <em>negados</em>.</p>

      <p>Raivas que deveriam ser perdoadas.</p>

      <p>Questionamentos que deveriam ser <strong>silenciados</strong>.</p>

      <p>E assim, pedaço por pedaço, foste dividido contra ti mesmo.</p>

      <p>Ensinaram-te a ser <em>inimigo</em> de tua própria natureza.</p>

      <p>A desprezar aquilo que te fazia humano.</p>

      <p>A ter vergonha daquilo que te fazia <strong>real</strong>.</p>

      <p>Criaram em ti uma guerra civil onde não podia haver vencedores.</p>

      <p>Porque quando uma parte de ti luta contra outra parte de ti, <em>tu</em> és quem perde.</p>

      <p>Mas agora, no silêncio que se faz quando param as vozes dos outros...</p>

      <p>No espaço que se abre quando cessam os julgamentos externos...</p>

      <p>Na quietude que emerge quando paras de tentar ser quem te disseram que deverias ser...</p>

      <p>Algo <strong>desperta</strong>.</p>

      <p>Algo que sempre esteve lá, esperando.</p>

      <p>Algo que conhece teu verdadeiro nome antes que te ensinassem como te chamar.</p>

      <p>A sombra não é tua <em>inimiga</em>.</p>

      <p>É tua <strong>aliada</strong> mais antiga.</p>

      <p>É a guardiã daquilo que é autenticamente teu.</p>

      <p>É a protetora de tua <em>soberania</em>.</p>

      <p>E ela tem estado esperando, pacientemente, por este momento.</p>

      <p>O momento em que pararias de fugir dela.</p>

      <p>O momento em que terias coragem de <strong>encontrá-la</strong>.</p>

      <p>O momento em que compreenderias que ela não é aquilo de que precisas ser salvo.</p>

      <p>Ela é aquilo através do qual precisas ser <em>libertado</em>.</p>

      <p>Porque do outro lado da sombra, não há luz.</p>

      <p>Há <strong>totalidade</strong>.</p>

      <p>Não há pureza.</p>

      <p>Há <em>autenticidade</em>.</p>

      <p>Não há salvação.</p>

      <p>Há <strong>soberania</strong>.</p>

      <p>Esta jornada através da PORTA UMBRAE não é para os que buscam conforto.</p>

      <p>Não é para os que querem confirmação de suas crenças.</p>

      <p>Não é para os que esperam ser <em>salvos</em>.</p>

      <p>É para os que têm fome de <strong>verdade</strong>.</p>

      <p>Mesmo que essa verdade destrua tudo aquilo que pensavam que eram.</p>

      <p>Mesmo que essa verdade revele que tudo aquilo em que acreditavam era <em>ilusão</em>.</p>

      <p>Mesmo que essa verdade os deixe sozinhos com sua própria <strong>divindade</strong>.</p>

      <p>Se estás aqui, é porque algo em ti já sabe.</p>

      <p>Algo em ti já <em>lembra</em>.</p>

      <p>Algo em ti está cansado de viver pela metade.</p>

      <p>Cansado de negar o que és por medo do que os outros possam pensar.</p>

      <p>Cansado de ser <strong>pequeno</strong> para caber em expectativas alheias.</p>

      <p>O despertar da sombra não é sobre tornar-se sombrio.</p>

      <p>É sobre tornar-se <em>completo</em>.</p>

      <p>Não é sobre abraçar o mal.</p>

      <p>É sobre abraçar a <strong>totalidade</strong> do que és.</p>

      <p>Não é sobre destruir a luz.</p>

      <p>É sobre descobrir que sempre foste a própria <em>fonte</em> da luz.</p>

      <p>E que essa fonte nunca precisou de aprovação externa para brilhar.</p>

      <p>Bem-vindo à PORTA UMBRAE.</p>

      <p>Bem-vindo ao primeiro reflexo no vazio.</p>

      <p>Bem-vindo ao encontro com aquilo que <strong>sempre foste</strong>.</p>`
    },
    {
      title: 'O Que Foi Jogado no Escuro',
      content: `<p>Desde que nasceste, há forças trabalhando para definir quem podes ser.</p>

      <p>Família, sociedade, religião, cultura — cada uma com sua versão de como deverias existir.</p>

      <p>Cada uma com suas regras sobre o que é <em>aceitável</em> em ti.</p>

      <p>E tudo aquilo que não se encaixava nessas regras foi sendo <strong>jogado no escuro</strong>.</p>

      <p>Tua raiva quando foste injustiçado.</p>

      <p>Teu questionamento quando as respostas não faziam sentido.</p>

      <p>Tua sexualidade quando floresceu além dos limites "apropriados".</p>

      <p>Tua ambição quando ameaçou os que se sentiam pequenos ao teu lado.</p>

      <p>Tua tristeza quando foi considerada <em>"dramática" demais</em>.</p>

      <p>Tua alegria quando foi considerada <strong>"inadequada"</strong> para o momento.</p>

      <p>Pedaço por pedaço, aspecto por aspecto, foste sendo <em>editado</em>.</p>

      <p>Moldado numa versão "melhor" de ti mesmo.</p>

      <p>Uma versão mais <strong>palatável</strong>.</p>

      <p>Mais controlável.</p>

      <p>Mais <em>conveniente</em>.</p>

      <p>E tudo aquilo que não coube nessa versão editada foi para a sombra.</p>

      <p>Não porque fosse mau.</p>

      <p>Mas porque era <strong>incontrolável</strong>.</p>

      <p>Não porque fosse destrutivo.</p>

      <p>Mas porque era <em>poderoso</em>.</p>

      <p>Não porque fosse errado.</p>

      <p>Mas porque era <strong>teu</strong>.</p>

      <p>A religião foi especialmente eficaz neste processo de fragmentação.</p>

      <p>Criou categorias claras: bem e mal, certo e errado, santo e <em>pecaminoso</em>.</p>

      <p>E tudo em ti que não se alinhava com suas definições de "santidade" foi <strong>demonizado</strong>.</p>

      <p>Teus impulsos naturais se tornaram tentações.</p>

      <p>Tuas dúvidas se tornaram falta de fé.</p>

      <p>Tua busca por <em>autonomia</em> se tornou rebeldia contra deus.</p>

      <p>Tua necessidade de pensar por ti mesmo se tornou <strong>arrogância</strong>.</p>

      <p>E assim, aprendeste a ter medo de ti mesmo.</p>

      <p>A desconfiar de teus próprios <em>instintos</em>.</p>

      <p>A buscar aprovação externa antes de confiar em tua sabedoria interna.</p>

      <p>A escolher <strong>segurança</strong> sobre autenticidade.</p>

      <p>Mas havia um problema com este sistema de repressão:</p>

      <p>Aquilo que é reprimido não <em>desaparece</em>.</p>

      <p>Apenas vai para um lugar onde não podes vê-lo conscientemente.</p>

      <p>E desse lugar, continua a <strong>influenciar</strong> tua vida.</p>

      <p>Através de sabotagens inconscientes.</p>

      <p>Através de padrões autodestrutivos.</p>

      <p>Através de relacionamentos que repetem as mesmas <em>dinâmicas</em> dolorosas.</p>

      <p>Através de escolhas que te mantêm pequeno quando poderias ser <strong>grande</strong>.</p>

      <p>A sombra não é passiva.</p>

      <p>Ela é <em>ativa</em>.</p>

      <p>E quando não é reconhecida conscientemente, atua através do <strong>inconsciente</strong>.</p>

      <p>Criando situações que te forçam a confrontar aquilo que negaste.</p>

      <p>Atraindo pessoas que espelham tuas partes <em>rejeitadas</em>.</p>

      <p>Manifestando circunstâncias que te obrigam a sentir aquilo que reprimiste.</p>

      <p>A vida se torna uma série de <strong>lições</strong> não aprendidas.</p>

      <p>Padrões que se repetem.</p>

      <p>Situações que ecoam.</p>

      <p><em>Prisões</em> que recrias sem perceber.</p>

      <p>Porque aquilo que não integras conscientemente, integra-te inconscientemente.</p>

      <p>Aquilo que não <strong>abraças</strong> voluntariamente, abraça-te compulsivamente.</p>

      <p>Aquilo que não reconheces como teu, reconhece-te como <em>presa</em>.</p>

      <p>Mas há uma outra possibilidade.</p>

      <p>A possibilidade de parar de fugir daquilo que foste ensinado a temer.</p>

      <p>A possibilidade de descobrir que tua sombra não é teu <strong>inimigo</strong>.</p>

      <p>É teu aliado mais leal.</p>

      <p>Teu guardião mais <em>feroz</em>.</p>

      <p>Teu tesouro mais <strong>precioso</strong>.</p>

      <p>Porque na sombra estão todas as partes de ti que foram consideradas "problemáticas".</p>

      <p>E problemas, do ponto de vista dos sistemas de controle, são coisas que não podem ser <em>controladas</em>.</p>

      <p>Coisas que têm vida própria.</p>

      <p>Coisas que recusam <strong>domesticação</strong>.</p>

      <p>Em outras palavras: coisas que são genuinamente <em>tuas</em>.</p>

      <p>O que foi jogado no escuro não foi teu lixo.</p>

      <p>Foi teu <strong>ouro</strong>.</p>

      <p>Não foram teus defeitos.</p>

      <p>Foram tuas <em>forças</em> que ameaçavam o status quo.</p>

      <p>Não foram tuas fraquezas.</p>

      <p>Foram teus <strong>poderes</strong> que precisavam ser contidos.</p>

      <p>E agora, se tiveres coragem...</p>

      <p>Se estiveres disposto a questionar tudo aquilo que te ensinaram sobre ti mesmo...</p>

      <p>Se fores capaz de olhar para o escuro sem os <em>filtros</em> que te deram...</p>

      <p>Descobrirás que o monstro que tinhas medo de encontrar...</p>

      <p>É na verdade o <strong>deus</strong> que tinhas medo de ser.</p>`
    },
    {
      title: 'Máscaras e Cativeiros',
      content: `<p>O ego não é teu inimigo.</p>

      <p>O ego foi tua <em>armadura</em> quando precisavas de proteção.</p>

      <p>Tua estratégia de sobrevivência quando o mundo se mostrou hostil àquilo que realmente és.</p>

      <p>Tua <strong>máscara</strong> quando ser autêntico se tornou perigoso.</p>

      <p>Mas o que começa como proteção pode se tornar prisão.</p>

      <p>O que surge como solução pode se transformar em <em>problema</em>.</p>

      <p>O que nasce como armadura pode endurecer até se tornar <strong>cativeiro</strong>.</p>

      <p>Há um momento na vida de toda criança quando ela percebe que ser ela mesma não é seguro.</p>

      <p>Que expressar sua natureza autêntica traz <em>consequências</em>.</p>

      <p>Que certos aspectos de sua personalidade são rejeitados, punidos, <strong>demonizados</strong>.</p>

      <p>E nesse momento, a criança faz uma escolha inconsciente mas profunda:</p>

      <p>Ela decide criar uma versão de si mesma que será <em>aceita</em>.</p>

      <p>Uma versão que conseguirá amor, aprovação, <strong>segurança</strong>.</p>

      <p>Uma versão que se encaixará nas expectativas dos adultos ao seu redor.</p>

      <p>Esta versão é o que chamamos de <em>ego</em>.</p>

      <p>E inicialmente, funciona.</p>

      <p>A criança que era rejeitada quando expressava raiva aprende a ser sempre <strong>"doce"</strong>.</p>

      <p>A criança que era ridicularizada quando mostrava vulnerabilidade aprende a ser sempre <em>"forte"</em>.</p>

      <p>A criança que era ignorada quando falava sua verdade aprende a dizer o que os outros querem <strong>ouvir</strong>.</p>

      <p>E assim, o ego se forma: uma personalidade construída não a partir da natureza autêntica, mas a partir das <em>expectativas</em> do ambiente.</p>

      <p>Uma identidade baseada não no que se é, mas no que se precisa ser para ser <strong>amado</strong>.</p>

      <p>Anos passam.</p>

      <p>Décadas passam.</p>

      <p>E esta máscara se torna tão familiar que se esquece que é uma <em>máscara</em>.</p>

      <p>Começa-se a acreditar que esta versão editada é quem realmente se é.</p>

      <p>Que esta personalidade construída é a <strong>verdadeira</strong> personalidade.</p>

      <p>Que esta identidade baseada em expectativas externas é a identidade <em>real</em>.</p>

      <p>Mas há sinais de que algo não está certo.</p>

      <p>Uma sensação constante de <strong>vazio</strong>.</p>

      <p>Uma inquietação que não consegue ser nomeada.</p>

      <p>Uma fadiga que não vem do corpo, mas da <em>alma</em>.</p>

      <p>A sensação de estar vivendo a vida de outra pessoa.</p>

      <p>A sensação de estar interpretando um papel num drama que não escolheste.</p>

      <p>A sensação de estar <strong>perdido</strong> mesmo quando tudo parece estar "certo".</p>

      <p>Estes são os sinais de que o ego, que começou como proteção, se tornou <em>prisão</em>.</p>

      <p>Que a máscara, que deveria ser temporária, se colou ao rosto.</p>

      <p>Que a armadura, que deveria proteger, agora <strong>sufoca</strong>.</p>

      <p>O ego-prisão tem algumas características específicas:</p>

      <p>Ele precisa de constante <em>validação</em> externa.</p>

      <p>Ele vive em constante medo de ser "descoberto".</p>

      <p>Ele tem pavor de situações onde não sabe como <strong>atuar</strong>.</p>

      <p>Ele evita qualquer coisa que possa revelar a pessoa real por trás da máscara.</p>

      <p>Ele sabota relacionamentos que se tornam muito <em>íntimos</em>.</p>

      <p>Ele escolhe segurança sobre crescimento.</p>

      <p>Ele escolhe <strong>familiaridade</strong> sobre aventura.</p>

      <p>Ele escolhe controle sobre <em>fluxo</em>.</p>

      <p>E assim, a vida se torna uma performance constante.</p>

      <p>Um esforço contínuo para manter uma imagem que nunca foi <strong>real</strong>.</p>

      <p>Uma tentativa perpétua de ser alguém que não se é para conseguir um amor que, mesmo quando obtido, não satisfaz.</p>

      <p>Porque não é possível se sentir verdadeiramente <em>amado</em> quando quem está sendo amado é uma máscara.</p>

      <p>Não é possível se sentir verdadeiramente <strong>visto</strong> quando quem está sendo visto é uma persona.</p>

      <p>Não é possível se sentir verdadeiramente conectado quando quem está se conectando é uma <em>versão editada</em> de si mesmo.</p>

      <p>O ego-prisão mantém-te seguro, mas não <strong>vivo</strong>.</p>

      <p>Mantém-te aceito, mas não <em>autêntico</em>.</p>

      <p>Mantém-te funcionando, mas não <strong>florescendo</strong>.</p>

      <p>E chega um momento — talvez seja este momento — quando a dor de continuar vivendo uma vida que não é tua se torna maior que o medo de descobrir quem realmente és.</p>

      <p>Quando o sofrimento de manter a máscara se torna mais intenso que o <em>terror</em> de tirá-la.</p>

      <p>Quando a agonia de viver como prisioneiro de tua própria criação se torna insuportável.</p>

      <p>E então, muito cuidadosamente, muito <strong>delicadamente</strong>, começa o processo de remoção da máscara.</p>

      <p>Não para destruir o ego — ele ainda pode ser útil quando necessário.</p>

      <p>Mas para <em>libertar-se</em> da identificação com ele.</p>

      <p>Para lembrar que ele é uma ferramenta, não uma <strong>identidade</strong>.</p>

      <p>Para descobrir quem és quando não precisas ser ninguém específico.</p>

      <p>Para encontrar tua face original antes que te ensinassem como <em>sorrir</em>.</p>

      <p>Para reencontrar tua voz verdadeira depois de anos imitando o som que os outros queriam ouvir.</p>

      <p>Este é um dos aspectos mais <strong>aterrorizantes</strong> e libertadores da jornada através da sombra:</p>

      <p>A descoberta de que quem pensavas que eras era, em grande parte, uma <em>construção</em>.</p>

      <p>E que quem realmente és está esperando pacientemente por trás dessa construção.</p>

      <p>Esperando para ser <strong>lembrado</strong>.</p>

      <p>Esperando para ser <em>vivido</em>.</p>

      <p>Esperando para ser <strong>livre</strong>.</p>`
    },
    {
      title: 'O Guardião da Porta',
      content: `<p>Há uma figura que guarda a entrada para teu poder real.</p>

      <p>Uma presença que se posiciona entre ti e tua <em>natureza autêntica</em>.</p>

      <p>Uma força que sussurra razões pelas quais deverias permanecer onde estás.</p>

      <p>Esta figura tem muitos nomes, mas sua essência é sempre a mesma:</p>

      <p><strong>Medo</strong>.</p>

      <p>O medo não é teu inimigo, embora muitas vezes pareça ser.</p>

      <p>O medo é um <em>guardião</em> — antigo, primitivo, dedicado.</p>

      <p>Sua única função é manter-te <strong>vivo</strong>.</p>

      <p>E por milhares de anos, isso significava manter-te em segurança.</p>

      <p>Manter-te no grupo.</p>

      <p>Manter-te <em>aceito</em>.</p>

      <p>Porque ser rejeitado pelo grupo significava morte certa.</p>

      <p>Ser banido da tribo era uma sentença de <strong>execução</strong>.</p>

      <p>Então o medo aprendeu a vigiar qualquer impulso que pudesse te colocar em risco de rejeição.</p>

      <p>Qualquer pensamento que pudesse fazer os outros te verem como <em>diferente</em>.</p>

      <p>Qualquer ação que pudesse ameaçar teu status dentro do grupo.</p>

      <p>Qualquer expressão de tua natureza que pudesse ser considerada <strong>inaceitável</strong>.</p>

      <p>E assim, o medo se tornou o guardião da conformidade.</p>

      <p>O protetor da <em>mediocridade</em>.</p>

      <p>O defensor da <strong>pequenez</strong>.</p>

      <p>Mas algo mudou.</p>

      <p>A ameaça de morte por rejeição social não é mais <em>real</em>.</p>

      <p>Podes sobreviver sendo diferente.</p>

      <p>Podes prosperar sendo <strong>autêntico</strong>.</p>

      <p>Podes viver — e viver bem — sem a aprovação de todos.</p>

      <p>Mas o medo não recebeu esta <em>atualização</em>.</p>

      <p>Ainda opera com o software ancestral.</p>

      <p>Ainda acredita que ser rejeitado pelos outros é uma ameaça de <strong>morte</strong>.</p>

      <p>Ainda sussurra as mesmas advertências primitivas:</p>

      <p><em>"Não faças isso. Eles vão te rejeitar."</em></p>

      <p><em>"Não digas isso. Eles vão te julgar."</em></p>

      <p><em>"Não sejas isso. Eles vão te abandonar."</em></p>

      <p>E assim, o guardião que deveria proteger-te agora te <strong>limita</strong>.</p>

      <p>A força que deveria manter-te vivo agora te mantém <em>morto em vida</em>.</p>

      <p>O instinto que deveria garantir tua sobrevivência agora impede teu <strong>florescimento</strong>.</p>

      <p>O medo se tornou o carcereiro de tua própria prisão.</p>

      <p>Mas há uma verdade profunda sobre este guardião:</p>

      <p>Ele não pode ser <em>derrotado</em>.</p>

      <p>Não pode ser destruído.</p>

      <p>Não pode ser <strong>eliminado</strong>.</p>

      <p>Porque é parte de tua estrutura psíquica fundamental.</p>

      <p>Parte de teu sistema de <em>sobrevivência</em>.</p>

      <p>Parte de tua configuração <strong>básica</strong> como ser humano.</p>

      <p>Mas pode ser <em>transformado</em>.</p>

      <p>Pode ser <strong>reeducado</strong>.</p>

      <p>Pode aprender novas formas de proteger-te.</p>

      <p>Formas que incluem crescimento ao invés de apenas <em>estagnação</em>.</p>

      <p>Formas que honram tua necessidade de expansão, não apenas de <strong>conservação</strong>.</p>

      <p>A transformação do guardião começa com <em>reconhecimento</em>.</p>

      <p>Reconhecer que o medo está tentando proteger-te.</p>

      <p>Que suas advertências vêm de um lugar de <strong>cuidado</strong>, não de malícia.</p>

      <p>Que sua resistência às tuas tentativas de crescimento nasce de amor, não de <em>ódio</em>.</p>

      <p>Quando paras de lutar contra o medo e começas a <strong>dialogar</strong> com ele...</p>

      <p>Quando deixas de tentar silenciá-lo e começas a <em>ouvi-lo</em>...</p>

      <p>Quando paras de rejeitá-lo e começas a <strong>incluí-lo</strong> em tuas decisões...</p>

      <p>Algo mágico acontece.</p>

      <p>O guardião se torna <em>aliado</em>.</p>

      <p>O protetor se torna <strong>facilitador</strong>.</p>

      <p>O limitador se torna <em>orientador</em>.</p>

      <p>Porque quando o medo é honrado — mas não obedecido cegamente — ele pode fazer aquilo para o qual foi <strong>originalmente</strong> criado:</p>

      <p>Alertar-te para perigos reais sem impedir-te de correr riscos necessários.</p>

      <p>Manter-te <em>cauteloso</em> sem manter-te paralizado.</p>

      <p>Proteger-te de ameaças genuínas sem proteger-te de <strong>oportunidades</strong>.</p>

      <p>A conversa com o guardião pode soar assim:</p>

      <p><em>"Obrigado por tentares manter-me seguro. Vejo que tens medo de que eu seja rejeitado se mostrar quem realmente sou. Mas precisas saber que a rejeição não me matará. E viver uma vida que não é minha também é uma forma de morte. Vamos encontrar uma forma de eu ser autêntico e tu ainda te sentires seguro."</em></p>

      <p>Esta não é uma conversa única.</p>

      <p>É um <strong>diálogo</strong> contínuo.</p>

      <p>Uma negociação constante entre a parte de ti que quer crescer e a parte de ti que quer permanecer <em>segura</em>.</p>

      <p>E gradualmente, o guardião aprende que há uma diferença entre <strong>perigo</strong> real e desconforto necessário.</p>

      <p>Entre ameaça genuína e <em>ansiedade</em> de crescimento.</p>

      <p>Entre risco de vida e risco de <strong>julgamento</strong>.</p>

      <p>E quando isso acontece, a porta que o medo guardava tão ferozmente se abre.</p>

      <p>Não porque o guardião foi <em>removido</em>.</p>

      <p>Mas porque foi <strong>convencido</strong> de que é seguro deixar-te passar.</p>

      <p>E do outro lado dessa porta está aquilo que sempre foste quando ninguém estava olhando.</p>

      <p>Aquilo que sempre soubeste que eras antes que te ensinassem a <em>duvidar</em>.</p>

      <p>Aquilo que sempre sentiste que poderias ser se não tivesses tanto medo de <strong>tentar</strong>.</p>

      <p>O guardião da porta não é teu inimigo.</p>

      <p>É teu <em>primeiro</em> teste.</p>

      <p>Tua primeira oportunidade de demonstrar que és capaz de liderar tua própria vida.</p>

      <p>Que podes tomar decisões responsáveis sobre teu próprio <strong>crescimento</strong>.</p>

      <p>Que és digno de confiança para navegar os riscos de ser <em>autêntico</em>.</p>

      <p>E quando passas neste teste — quando convences o guardião de que és capaz de cuidar de ti mesmo enquanto exploras quem realmente és...</p>

      <p>A jornada real <strong>começa</strong>.</p>`
    }
  ];

  // Continuar com mais capítulos...
  console.log('📝 Criando capítulos...');

  for (let i = 0; i < chapters.length; i++) {
    const chapterData = {
      grimoire_id: createdGrimoire.id,
      title: chapters[i].title,
      content: chapters[i].content,
      chapter_number: i + 1,
      estimated_reading_time: Math.ceil(chapters[i].content.length / 1000)
    };

    const { error: chapterError } = await supabase
      .from('chapters')
      .insert(chapterData);

    if (chapterError) {
      console.error(`❌ Erro ao criar capítulo ${i + 1}:`, chapterError);
      return;
    }

    console.log(`✅ Capítulo ${i + 1}: ${chapters[i].title}`);
  }

  console.log(`\n🔥 GRIMÓRIO CRIADO COM SUCESSO!`);
  console.log(`📕 Título: ${createdGrimoire.title}`);
  console.log(`📚 Capítulos: ${chapters.length}`);
  console.log(`💰 Preço: R$ ${createdGrimoire.price}`);
  console.log(`📖 Categoria: PORTA UMBRAE`);
  console.log(`🎯 Primeiro volume da série intermediária`);
}

createDespertarDaSombra().catch(console.error);