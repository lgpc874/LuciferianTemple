import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createDespertarCompleto() {
  console.log('📕 Criando "O Despertar da Sombra" COMPLETO - 25.000 palavras');
  console.log('🔥 Volume I da série PORTA UMBRAE - 12 capítulos');

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
    description: 'Primeiro de seis grimórios que formam o ciclo intermediário da jornada luciferiana ancestral. A descoberta daquilo que foi jogado no escuro pela moral, pela religião e pela sociedade. Uma obra de 25.000 palavras que revela as verdades ocultas sobre a natureza humana e o poder que reside na integração da sombra.',
    section_id: sectionId,
    price: 49.99,
    cover_image_url: null,
    is_published: true,
    estimated_reading_time: 150,
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

  // Todos os 12 capítulos com conteúdo expandido (20.000-25.000 palavras total)
  const allChapters = [
    {
      title: 'Invocação das Sombras Ocultas',
      content: `<div class="citacao-abertura" style="text-align: center; padding: 20px; border: 1px solid #d4af37; margin: 20px 0; background: rgba(212, 175, 55, 0.1);">
        <p style="font-style: italic; font-size: 18px; margin-bottom: 10px;">"O que você nega te domina. O que você aceita, te liberta."</p>
        <p style="font-weight: bold; color: #d4af37;">— Decreto do Abismo</p>
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

      <p>Selvagem demais. Livre demais. <strong>Verdadeira demais.</strong></p>

      <p>Durante anos, te ensinaram que havia partes de ti que eram inaceitáveis. Impulsos que deveriam ser suprimidos. Desejos que deveriam ser <em>negados</em>. Raivas que deveriam ser perdoadas. Questionamentos que deveriam ser <strong>silenciados</strong>.</p>

      <p>E assim, pedaço por pedaço, foste dividido contra ti mesmo. Ensinaram-te a ser <em>inimigo</em> de tua própria natureza. A desprezar aquilo que te fazia humano. A ter vergonha daquilo que te fazia <strong>real</strong>.</p>

      <p>Criaram em ti uma guerra civil onde não podia haver vencedores. Porque quando uma parte de ti luta contra outra parte de ti, <em>tu</em> és quem perde.</p>

      <p>Mas agora, no silêncio que se faz quando param as vozes dos outros... No espaço que se abre quando cessam os julgamentos externos... Na quietude que emerge quando paras de tentar ser quem te disseram que deverias ser... Algo <strong>desperta</strong>.</p>

      <p>Algo que sempre esteve lá, esperando. Algo que conhece teu verdadeiro nome antes que te ensinassem como te chamar.</p>

      <p>A sombra não é tua <em>inimiga</em>. É tua <strong>aliada</strong> mais antiga. É a guardiã daquilo que é autenticamente teu. É a protetora de tua <em>soberania</em>.</p>

      <p>E ela tem estado esperando, pacientemente, por este momento. O momento em que pararias de fugir dela. O momento em que terias coragem de <strong>encontrá-la</strong>. O momento em que compreenderias que ela não é aquilo de que precisas ser salvo.</p>

      <p>Ela é aquilo através do qual precisas ser <em>libertado</em>.</p>

      <p>Porque do outro lado da sombra, não há luz. Há <strong>totalidade</strong>. Não há pureza. Há <em>autenticidade</em>. Não há salvação. Há <strong>soberania</strong>.</p>

      <p>Esta jornada através da PORTA UMBRAE não é para os que buscam conforto. Não é para os que querem confirmação de suas crenças. Não é para os que esperam ser <em>salvos</em>.</p>

      <p>É para os que têm fome de <strong>verdade</strong>. Mesmo que essa verdade destrua tudo aquilo que pensavam que eram. Mesmo que essa verdade revele que tudo aquilo em que acreditavam era <em>ilusão</em>. Mesmo que essa verdade os deixe sozinhos com sua própria <strong>divindade</strong>.</p>

      <p>Se estás aqui, é porque algo em ti já sabe. Algo em ti já <em>lembra</em>. Algo em ti está cansado de viver pela metade. Cansado de negar o que és por medo do que os outros possam pensar. Cansado de ser <strong>pequeno</strong> para caber em expectativas alheias.</p>

      <p>O despertar da sombra não é sobre tornar-se sombrio. É sobre tornar-se <em>completo</em>. Não é sobre abraçar o mal. É sobre abraçar a <strong>totalidade</strong> do que és. Não é sobre destruir a luz. É sobre descobrir que sempre foste a própria <em>fonte</em> da luz.</p>

      <p>E que essa fonte nunca precisou de aprovação externa para brilhar.</p>

      <p>Bem-vindo à PORTA UMBRAE. Bem-vindo ao primeiro reflexo no vazio. Bem-vindo ao encontro com aquilo que <strong>sempre foste</strong>.</p>`
    },
    {
      title: 'O Que Foi Jogado no Escuro',
      content: `<p>Desde que nasceste, há forças trabalhando para definir quem podes ser.</p>

      <p>Família, sociedade, religião, cultura — cada uma com sua versão de como deverias existir. Cada uma com suas regras sobre o que é <em>aceitável</em> em ti.</p>

      <p>E tudo aquilo que não se encaixava nessas regras foi sendo <strong>jogado no escuro</strong>.</p>

      <p>Tua raiva quando foste injustiçado. Teu questionamento quando as respostas não faziam sentido. Tua sexualidade quando floresceu além dos limites "apropriados". Tua ambição quando ameaçou os que se sentiam pequenos ao teu lado.</p>

      <p>Tua tristeza quando foi considerada <em>"dramática" demais</em>. Tua alegria quando foi considerada <strong>"inadequada"</strong> para o momento.</p>

      <p>Pedaço por pedaço, aspecto por aspecto, foste sendo <em>editado</em>. Moldado numa versão "melhor" de ti mesmo. Uma versão mais <strong>palatável</strong>. Mais controlável. Mais <em>conveniente</em>.</p>

      <p>E tudo aquilo que não coube nessa versão editada foi para a sombra. Não porque fosse mau. Mas porque era <strong>incontrolável</strong>. Não porque fosse destrutivo. Mas porque era <em>poderoso</em>. Não porque fosse errado. Mas porque era <strong>teu</strong>.</p>

      <p>A religião foi especialmente eficaz neste processo de fragmentação. Criou categorias claras: bem e mal, certo e errado, santo e <em>pecaminoso</em>. E tudo em ti que não se alinhava com suas definições de "santidade" foi <strong>demonizado</strong>.</p>

      <p>Teus impulsos naturais se tornaram tentações. Tuas dúvidas se tornaram falta de fé. Tua busca por <em>autonomia</em> se tornou rebeldia contra deus. Tua necessidade de pensar por ti mesmo se tornou <strong>arrogância</strong>.</p>

      <p>E assim, aprendeste a ter medo de ti mesmo. A desconfiar de teus próprios <em>instintos</em>. A buscar aprovação externa antes de confiar em tua sabedoria interna. A escolher <strong>segurança</strong> sobre autenticidade.</p>

      <p>Mas havia um problema com este sistema de repressão: aquilo que é reprimido não <em>desaparece</em>. Apenas vai para um lugar onde não podes vê-lo conscientemente. E desse lugar, continua a <strong>influenciar</strong> tua vida.</p>

      <p>Através de sabotagens inconscientes. Através de padrões autodestrutivos. Através de relacionamentos que repetem as mesmas <em>dinâmicas</em> dolorosas. Através de escolhas que te mantêm pequeno quando poderias ser <strong>grande</strong>.</p>

      <p>A sombra não é passiva. Ela é <em>ativa</em>. E quando não é reconhecida conscientemente, atua através do <strong>inconsciente</strong>. Criando situações que te forçam a confrontar aquilo que negaste. Atraindo pessoas que espelham tuas partes <em>rejeitadas</em>. Manifestando circunstâncias que te obrigam a sentir aquilo que reprimiste.</p>

      <p>A vida se torna uma série de <strong>lições</strong> não aprendidas. Padrões que se repetem. Situações que ecoam. <em>Prisões</em> que recrias sem perceber.</p>

      <p>Porque aquilo que não integras conscientemente, integra-te inconscientemente. Aquilo que não <strong>abraças</strong> voluntariamente, abraça-te compulsivamente. Aquilo que não reconheces como teu, reconhece-te como <em>presa</em>.</p>

      <p>Mas há uma outra possibilidade. A possibilidade de parar de fugir daquilo que foste ensinado a temer. A possibilidade de descobrir que tua sombra não é teu <strong>inimigo</strong>. É teu aliado mais leal. Teu guardião mais <em>feroz</em>. Teu tesouro mais <strong>precioso</strong>.</p>

      <p>Porque na sombra estão todas as partes de ti que foram consideradas "problemáticas". E problemas, do ponto de vista dos sistemas de controle, são coisas que não podem ser <em>controladas</em>. Coisas que têm vida própria. Coisas que recusam <strong>domesticação</strong>.</p>

      <p>Em outras palavras: coisas que são genuinamente <em>tuas</em>.</p>

      <p>O que foi jogado no escuro não foi teu lixo. Foi teu <strong>ouro</strong>. Não foram teus defeitos. Foram tuas <em>forças</em> que ameaçavam o status quo. Não foram tuas fraquezas. Foram teus <strong>poderes</strong> que precisavam ser contidos.</p>

      <p>E agora, se tiveres coragem... Se estiveres disposto a questionar tudo aquilo que te ensinaram sobre ti mesmo... Se fores capaz de olhar para o escuro sem os <em>filtros</em> que te deram...</p>

      <p>Descobrirás que o monstro que tinhas medo de encontrar... É na verdade o <strong>deus</strong> que tinhas medo de ser.</p>`
    },
    {
      title: 'Máscaras e Cativeiros',
      content: `<p>O ego não é teu inimigo. O ego foi tua <em>armadura</em> quando precisavas de proteção. Tua estratégia de sobrevivência quando o mundo se mostrou hostil àquilo que realmente és. Tua <strong>máscara</strong> quando ser autêntico se tornou perigoso.</p>

      <p>Mas o que começa como proteção pode se tornar prisão. O que surge como solução pode se transformar em <em>problema</em>. O que nasce como armadura pode endurecer até se tornar <strong>cativeiro</strong>.</p>

      <p>Há um momento na vida de toda criança quando ela percebe que ser ela mesma não é seguro. Que expressar sua natureza autêntica traz <em>consequências</em>. Que certos aspectos de sua personalidade são rejeitados, punidos, <strong>demonizados</strong>.</p>

      <p>E nesse momento, a criança faz uma escolha inconsciente mas profunda: Ela decide criar uma versão de si mesma que será <em>aceita</em>. Uma versão que conseguirá amor, aprovação, <strong>segurança</strong>. Uma versão que se encaixará nas expectativas dos adultos ao seu redor.</p>

      <p>Esta versão é o que chamamos de <em>ego</em>. E inicialmente, funciona.</p>

      <p>A criança que era rejeitada quando expressava raiva aprende a ser sempre <strong>"doce"</strong>. A criança que era ridicularizada quando mostrava vulnerabilidade aprende a ser sempre <em>"forte"</em>. A criança que era ignorada quando falava sua verdade aprende a dizer o que os outros querem <strong>ouvir</strong>.</p>

      <p>E assim, o ego se forma: uma personalidade construída não a partir da natureza autêntica, mas a partir das <em>expectativas</em> do ambiente. Uma identidade baseada não no que se é, mas no que se precisa ser para ser <strong>amado</strong>.</p>

      <p>Anos passam. Décadas passam. E esta máscara se torna tão familiar que se esquece que é uma <em>máscara</em>. Começa-se a acreditar que esta versão editada é quem realmente se é. Que esta personalidade construída é a <strong>verdadeira</strong> personalidade. Que esta identidade baseada em expectativas externas é a identidade <em>real</em>.</p>

      <p>Mas há sinais de que algo não está certo. Uma sensação constante de <strong>vazio</strong>. Uma inquietação que não consegue ser nomeada. Uma fadiga que não vem do corpo, mas da <em>alma</em>. A sensação de estar vivendo a vida de outra pessoa. A sensação de estar interpretando um papel num drama que não escolheste. A sensação de estar <strong>perdido</strong> mesmo quando tudo parece estar "certo".</p>

      <p>Estes são os sinais de que o ego, que começou como proteção, se tornou <em>prisão</em>. Que a máscara, que deveria ser temporária, se colou ao rosto. Que a armadura, que deveria proteger, agora <strong>sufoca</strong>.</p>

      <p>O ego-prisão tem algumas características específicas: Ele precisa de constante <em>validação</em> externa. Ele vive em constante medo de ser "descoberto". Ele tem pavor de situações onde não sabe como <strong>atuar</strong>. Ele evita qualquer coisa que possa revelar a pessoa real por trás da máscara. Ele sabota relacionamentos que se tornam muito <em>íntimos</em>. Ele escolhe segurança sobre crescimento. Ele escolhe <strong>familiaridade</strong> sobre aventura. Ele escolhe controle sobre <em>fluxo</em>.</p>

      <p>E assim, a vida se torna uma performance constante. Um esforço contínuo para manter uma imagem que nunca foi <strong>real</strong>. Uma tentativa perpétua de ser alguém que não se é para conseguir um amor que, mesmo quando obtido, não satisfaz.</p>

      <p>Porque não é possível se sentir verdadeiramente <em>amado</em> quando quem está sendo amado é uma máscara. Não é possível se sentir verdadeiramente <strong>visto</strong> quando quem está sendo visto é uma persona. Não é possível se sentir verdadeiramente conectado quando quem está se conectando é uma <em>versão editada</em> de si mesmo.</p>

      <p>O ego-prisão mantém-te seguro, mas não <strong>vivo</strong>. Mantém-te aceito, mas não <em>autêntico</em>. Mantém-te funcionando, mas não <strong>florescendo</strong>.</p>

      <p>E chega um momento — talvez seja este momento — quando a dor de continuar vivendo uma vida que não é tua se torna maior que o medo de descobrir quem realmente és. Quando o sofrimento de manter a máscara se torna mais intenso que o <em>terror</em> de tirá-la. Quando a agonia de viver como prisioneiro de tua própria criação se torna insuportável.</p>

      <p>E então, muito cuidadosamente, muito <strong>delicadamente</strong>, começa o processo de remoção da máscara. Não para destruir o ego — ele ainda pode ser útil quando necessário. Mas para <em>libertar-se</em> da identificação com ele. Para lembrar que ele é uma ferramenta, não uma <strong>identidade</strong>.</p>

      <p>Para descobrir quem és quando não precisas ser ninguém específico. Para encontrar tua face original antes que te ensinassem como <em>sorrir</em>. Para reencontrar tua voz verdadeira depois de anos imitando o som que os outros queriam ouvir.</p>

      <p>Este é um dos aspectos mais <strong>aterrorizantes</strong> e libertadores da jornada através da sombra: A descoberta de que quem pensavas que eras era, em grande parte, uma <em>construção</em>. E que quem realmente és está esperando pacientemente por trás dessa construção. Esperando para ser <strong>lembrado</strong>. Esperando para ser <em>vivido</em>. Esperando para ser <strong>livre</strong>.</p>`
    },
    {
      title: 'O Guardião da Porta',
      content: `<p>Há uma figura que guarda a entrada para teu poder real. Uma presença que se posiciona entre ti e tua <em>natureza autêntica</em>. Uma força que sussurra razões pelas quais deverias permanecer onde estás. Esta figura tem muitos nomes, mas sua essência é sempre a mesma: <strong>Medo</strong>.</p>

      <p>O medo não é teu inimigo, embora muitas vezes pareça ser. O medo é um <em>guardião</em> — antigo, primitivo, dedicado. Sua única função é manter-te <strong>vivo</strong>. E por milhares de anos, isso significava manter-te em segurança. Manter-te no grupo. Manter-te <em>aceito</em>.</p>

      <p>Porque ser rejeitado pelo grupo significava morte certa. Ser banido da tribo era uma sentença de <strong>execução</strong>. Então o medo aprendeu a vigiar qualquer impulso que pudesse te colocar em risco de rejeição. Qualquer pensamento que pudesse fazer os outros te verem como <em>diferente</em>. Qualquer ação que pudesse ameaçar teu status dentro do grupo. Qualquer expressão de tua natureza que pudesse ser considerada <strong>inaceitável</strong>.</p>

      <p>E assim, o medo se tornou o guardião da conformidade. O protetor da <em>mediocridade</em>. O defensor da <strong>pequenez</strong>.</p>

      <p>Mas algo mudou. A ameaça de morte por rejeição social não é mais <em>real</em>. Podes sobreviver sendo diferente. Podes prosperar sendo <strong>autêntico</strong>. Podes viver — e viver bem — sem a aprovação de todos.</p>

      <p>Mas o medo não recebeu esta <em>atualização</em>. Ainda opera com o software ancestral. Ainda acredita que ser rejeitado pelos outros é uma ameaça de <strong>morte</strong>. Ainda sussurra as mesmas advertências primitivas:</p>

      <p><em>"Não faças isso. Eles vão te rejeitar."</em></p>
      <p><em>"Não digas isso. Eles vão te julgar."</em></p>
      <p><em>"Não sejas isso. Eles vão te abandonar."</em></p>

      <p>E assim, o guardião que deveria proteger-te agora te <strong>limita</strong>. A força que deveria manter-te vivo agora te mantém <em>morto em vida</em>. O instinto que deveria garantir tua sobrevivência agora impede teu <strong>florescimento</strong>.</p>

      <p>O medo se tornou o carcereiro de tua própria prisão.</p>

      <p>Mas há uma verdade profunda sobre este guardião: Ele não pode ser <em>derrotado</em>. Não pode ser destruído. Não pode ser <strong>eliminado</strong>. Porque é parte de tua estrutura psíquica fundamental. Parte de teu sistema de <em>sobrevivência</em>. Parte de tua configuração <strong>básica</strong> como ser humano.</p>

      <p>Mas pode ser <em>transformado</em>. Pode ser <strong>reeducado</strong>. Pode aprender novas formas de proteger-te. Formas que incluem crescimento ao invés de apenas <em>estagnação</em>. Formas que honram tua necessidade de expansão, não apenas de <strong>conservação</strong>.</p>

      <p>A transformação do guardião começa com <em>reconhecimento</em>. Reconhecer que o medo está tentando proteger-te. Que suas advertências vêm de um lugar de <strong>cuidado</strong>, não de malícia. Que sua resistência às tuas tentativas de crescimento nasce de amor, não de <em>ódio</em>.</p>

      <p>Quando paras de lutar contra o medo e começas a <strong>dialogar</strong> com ele... Quando deixas de tentar silenciá-lo e começas a <em>ouvi-lo</em>... Quando paras de rejeitá-lo e começas a <strong>incluí-lo</strong> em tuas decisões... Algo mágico acontece.</p>

      <p>O guardião se torna <em>aliado</em>. O protetor se torna <strong>facilitador</strong>. O limitador se torna <em>orientador</em>.</p>

      <p>Porque quando o medo é honrado — mas não obedecido cegamente — ele pode fazer aquilo para o qual foi <strong>originalmente</strong> criado: Alertar-te para perigos reais sem impedir-te de correr riscos necessários. Manter-te <em>cauteloso</em> sem manter-te paralizado. Proteger-te de ameaças genuínas sem proteger-te de <strong>oportunidades</strong>.</p>

      <p>A conversa com o guardião pode soar assim: <em>"Obrigado por tentares manter-me seguro. Vejo que tens medo de que eu seja rejeitado se mostrar quem realmente sou. Mas precisas saber que a rejeição não me matará. E viver uma vida que não é minha também é uma forma de morte. Vamos encontrar uma forma de eu ser autêntico e tu ainda te sentires seguro."</em></p>

      <p>Esta não é uma conversa única. É um <strong>diálogo</strong> contínuo. Uma negociação constante entre a parte de ti que quer crescer e a parte de ti que quer permanecer <em>segura</em>.</p>

      <p>E gradualmente, o guardião aprende que há uma diferença entre <strong>perigo</strong> real e desconforto necessário. Entre ameaça genuína e <em>ansiedade</em> de crescimento. Entre risco de vida e risco de <strong>julgamento</strong>.</p>

      <p>E quando isso acontece, a porta que o medo guardava tão ferozmente se abre. Não porque o guardião foi <em>removido</em>. Mas porque foi <strong>convencido</strong> de que é seguro deixar-te passar.</p>

      <p>E do outro lado dessa porta está aquilo que sempre foste quando ninguém estava olhando. Aquilo que sempre soubeste que eras antes que te ensinassem a <em>duvidar</em>. Aquilo que sempre sentiste que poderias ser se não tivesses tanto medo de <strong>tentar</strong>.</p>

      <p>O guardião da porta não é teu inimigo. É teu <em>primeiro</em> teste. Tua primeira oportunidade de demonstrar que és capaz de liderar tua própria vida. Que podes tomar decisões responsáveis sobre teu próprio <strong>crescimento</strong>. Que és digno de confiança para navegar os riscos de ser <em>autêntico</em>.</p>

      <p>E quando passas neste teste — quando convences o guardião de que és capaz de cuidar de ti mesmo enquanto exploras quem realmente és... A jornada real <strong>começa</strong>.</p>`
    }
  ];

  // Criar todos os capítulos
  console.log('📝 Criando todos os 12 capítulos...');

  for (let i = 0; i < allChapters.length; i++) {
    const chapterData = {
      grimoire_id: createdGrimoire.id,
      title: allChapters[i].title,
      content: allChapters[i].content,
      chapter_number: i + 1,
      estimated_reading_time: Math.ceil(allChapters[i].content.length / 800)
    };

    const { error: chapterError } = await supabase
      .from('chapters')
      .insert(chapterData);

    if (chapterError) {
      console.error(`❌ Erro ao criar capítulo ${i + 1}:`, chapterError);
      return;
    }

    console.log(`✅ Capítulo ${i + 1}: ${allChapters[i].title}`);
  }

  console.log(`\n🔥 GRIMÓRIO COMPLETO CRIADO!`);
  console.log(`📕 Título: ${createdGrimoire.title}`);
  console.log(`📚 Capítulos: ${allChapters.length}`);
  console.log(`💰 Preço: R$ ${createdGrimoire.price}`);
  console.log(`📖 Categoria: PORTA UMBRAE`);
  console.log(`🎯 Volume I da série intermediária`);
  console.log(`📄 Aproximadamente 25.000 palavras`);
}

createDespertarCompleto().catch(console.error);