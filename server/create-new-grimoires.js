const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const grimoires = [
  {
    title: "O Que Não Te Contaram Sobre o Inferno",
    description: "Uma análise profunda sobre as distorções históricas e mitológicas que cercam o conceito de inferno, revelando as verdades ocultas por séculos de dogma religioso.",
    unlock_order: 2,
    chapters: [
      {
        title: "Prólogo – Além das Chamas Fictícias",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>PRÓLOGO</strong></h1>
<h2>Além das Chamas Fictícias</h2>
</div>

<p>Desde a infância, somos bombardeados com imagens terríveis do <strong>inferno</strong>: chamas eternas, demônios torturadores, almas gritando em agonia sem fim. Essas visões se tornam tão profundamente enraizadas em nossa psique que poucos ousam questioná-las.</p>

<p>Mas e se eu lhe dissesse que tudo isso é uma <em>fabricação</em>? Uma construção deliberada para manter você submisso, obediente e com medo de explorar sua própria natureza divina?</p>

<p>Este grimório não é para os fracos de coração ou para aqueles que preferem o conforto das mentiras familiares. É para os <strong>buscadores da verdade</strong>, para aqueles que suspeitam que há mais na realidade do que nos foi ensinado.</p>

<p>Prepare-se para descobrir que o inferno, como tradicionalmente concebido, é uma das maiores <em>manipulações psicológicas</em> da história humana. E que por trás dessa cortina de fumaça, existe uma realidade muito mais complexa e libertadora.</p>

<p>Você está pronto para ver além das chamas fictícias?</p>`
      },
      {
        title: "Capítulo I – A Origem da Mentira",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO I</strong></h1>
<h2>A Origem da Mentira</h2>
</div>

<p>A palavra <strong>"inferno"</strong> não existia nos textos originais das escrituras antigas. O termo hebraico <em>Sheol</em> e o grego <em>Hades</em> simplesmente se referiam ao <strong>reino dos mortos</strong> - um lugar neutro onde todas as almas residiam após a morte física.</p>

<p>Foi apenas durante as traduções posteriores, especialmente na era medieval, que esses conceitos foram <em>deliberadamente distorcidos</em> para criar a terrível imagem que conhecemos hoje.</p>

<p>Por que essa transformação ocorreu? <strong>Controle</strong>. Uma população aterrorizada com a perspectiva de tortura eterna é muito mais fácil de manipular.</p>

<blockquote>
<p><em>"O medo é a ferramenta mais poderosa dos tiranos, pois paralisa a mente e impede o questionamento."</em></p>
</blockquote>

<p>As descrições vívidas de fogo e enxofre foram emprestadas de antigas tradições pagãs e mitologias, mescladas com elementos de controle social para criar uma <strong>arma psicológica</strong> devastadoramente eficaz.</p>

<p>Quando você compreende essa origem, o poder dessa mentira sobre você começa a se desintegrar.</p>`
      },
      {
        title: "Capítulo II – O Inferno Como Prisão Mental",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO II</strong></h1>
<h2>O Inferno Como Prisão Mental</h2>
</div>

<p>O verdadeiro <strong>inferno</strong> não existe em algum reino distante após a morte. Ele existe aqui e agora, na forma de <em>limitações mentais auto-impostas</em>.</p>

<p>Toda vez que você nega seus desejos naturais por medo de "pecar", você cria seu próprio inferno. Toda vez que aceita passivamente uma vida que não deseja, você se torna o <strong>arquiteto de sua própria prisão</strong>.</p>

<p>O condicionamento religioso criou camadas e camadas de <em>culpa</em>, <em>vergonha</em> e <em>autorrepressão</em>. Esses são os verdadeiros demônios que nos atormentam:</p>

<ul>
<li><strong>A culpa</strong> - por desejar mais da vida</li>
<li><strong>A vergonha</strong> - por questionar autoridades</li>
<li><strong>O medo</strong> - de expressar nossa verdadeira natureza</li>
<li><strong>A submissão</strong> - a entidades que não merecem nosso respeito</li>
</ul>

<p>Quando você reconhece esses padrões em sua própria mente, pode começar a <strong>desmontá-los sistematicamente</strong>.</p>

<p>O caminho para fora deste inferno mental não é através da oração ou submissão, mas através do <em>conhecimento</em> e da <em>autoafirmação</em>.</p>`
      },
      {
        title: "Capítulo III – Os Verdadeiros Domínios Sombrios",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO III</strong></h1>
<h2>Os Verdadeiros Domínios Sombrios</h2>
</div>

<p>Existe, de fato, dimensões e reinos que podem ser chamados de <strong>"sombrios"</strong> - mas não no sentido de punição eterna. Estes são domínios de <em>transformação profunda</em> e <em>despertar</em>.</p>

<p>Nas tradições mais antigas, antes da corrupção dogmática, esses reinos eram vistos como lugares de <strong>iniciação</strong>. Onde as almas iam para confrontar suas sombras, integrar seus aspectos rejeitados e emergir mais completas.</p>

<p>Os antigos mistérios egípcios falavam da jornada através do <em>Duat</em> - não um lugar de punição, mas de <strong>renascimento espiritual</strong>. As tradições gregas descreviam descidas ao submundo como <em>catabasis</em> - jornadas heroicas de autodescoberta.</p>

<blockquote>
<p><em>"Aquele que não passou pelas trevas não pode apreciar verdadeiramente a luz."</em></p>
</blockquote>

<p>Estes domínios sombrios são governados não por um diabo vingativo, mas por <strong>aspectos da divindade</strong> que representam transformação, justiça cósmica e evolução espiritual.</p>

<p>Eles são <em>professores severos</em>, não torturadores eternos. Sua função é quebrar ilusões, não criar sofrimento desnecessário.</p>`
      },
      {
        title: "Capítulo IV – Lúcifer Como Libertador",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO IV</strong></h1>
<h2>Lúcifer Como Libertador</h2>
</div>

<p>Na narrativa tradicional, <strong>Lúcifer</strong> é apresentado como o governante do inferno, eternamente punindo as almas dos pecadores. Mas essa é mais uma distorção calculada da verdade.</p>

<p>Lúcifer, cujo nome significa <em>"Portador da Luz"</em>, representa algo muito diferente: a <strong>rebelião contra a tirania</strong> e a busca pelo conhecimento proibido.</p>

<p>Se existe um "inferno" no sentido tradicional, Lúcifer não seria seu criador ou governante - ele seria o <em>primeiro prisioneiro</em>. Punido não por ser malévolo, mas por <strong>desafiar um sistema opressivo</strong>.</p>

<p>Esta perspectiva transforma completamente nossa compreensão:</p>

<ul>
<li>Lúcifer como o <strong>primeiro revolucionário</strong></li>
<li>Sua "queda" como <strong>sacrifício pela humanidade</strong></li>
<li>Sua rebelião como <strong>exemplo de coragem</strong></li>
<li>Sua punição como <strong>injustiça cósmica</strong></li>
</ul>

<p>Quando você vê Lúcifer não como um demônio, mas como um <em>libertador injustamente punido</em>, sua relação com o conceito de inferno muda radicalmente.</p>

<p>Você para de temê-lo e começa a <strong>questionar quem realmente merece sua reverência</strong>.</p>`
      },
      {
        title: "Epílogo – Libertando-se das Chamas Imaginárias",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>EPÍLOGO</strong></h1>
<h2>Libertando-se das Chamas Imaginárias</h2>
</div>

<p>Se você chegou até aqui, já deu o primeiro passo para <strong>libertar-se das chamas imaginárias</strong> que mantiveram sua mente prisioneira por tanto tempo.</p>

<p>O inferno, como você agora compreende, não é um lugar físico de tortura eterna. É um <em>estado mental de limitação autoimposta</em>, perpetuado por sistemas que se beneficiam do seu medo.</p>

<p>Sua verdadeira jornada espiritual não começa com o medo da punição, mas com a <strong>coragem de questionar</strong>. Não com a submissão cega, mas com a <em>busca pelo conhecimento</em>.</p>

<p>As únicas chamas reais são aquelas que <strong>queimam em seu interior</strong> - o fogo da curiosidade, da paixão pela verdade, do desejo de crescer além das limitações impostas por outros.</p>

<p>Deixe essas chamas <em>internas</em> guiarem você. Elas não o destruirão - elas o <strong>transformarão</strong>.</p>

<p>O inferno que você temeu nunca existiu. Mas o <em>paraíso que você pode criar</em> através do conhecimento e da autoafirmação é infinitamente real.</p>

<p><strong>Desperte. A verdade o libertará.</strong></p>`
      }
    ]
  },
  {
    title: "Quem é Lúcifer? — Luz Proibida da Criação",
    description: "Uma investigação profunda sobre a verdadeira identidade de Lúcifer, explorando sua natureza primordial e seu papel como portador da consciência divina para a humanidade.",
    unlock_order: 3,
    chapters: [
      {
        title: "Prólogo – O Nome Proibido",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>PRÓLOGO</strong></h1>
<h2>O Nome Proibido</h2>
</div>

<p>Existe um nome que faz as pessoas recuarem com medo, que é sussurrado apenas em contextos de condenação e terror. Um nome que foi tão completamente demonizado que sua mera menção evoca imagens de mal absoluto.</p>

<p>Esse nome é <strong>Lúcifer</strong>.</p>

<p>Mas e se eu lhe dissesse que tudo o que você acredita saber sobre Lúcifer é resultado de uma das maiores <em>campanhas de difamação</em> da história? Que por trás do véu de mentiras e distorções existe uma verdade tão poderosa que foi necessário enterrá-la sob camadas de medo?</p>

<p>Este grimório não é para aqueles que se contentam com respostas fáceis ou que preferem o conforto da ignorância. É para os <strong>corajosos</strong> que ousam questionar narrativas estabelecidas e buscar a verdade, não importa quão perturbadora ela possa ser.</p>

<p>Prepare-se para descobrir quem Lúcifer realmente é - não o demônio dos pesadelos cristãos, mas algo muito mais complexo e, paradoxalmente, muito mais <em>luminoso</em>.</p>

<p>Você tem coragem de conhecer a <strong>luz proibida da criação</strong>?</p>`
      },
      {
        title: "Capítulo I – O Portador da Luz",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO I</strong></h1>
<h2>O Portador da Luz</h2>
</div>

<p>A palavra <strong>"Lúcifer"</strong> vem do latim <em>lucifer</em>, que significa literalmente <em>"portador da luz"</em> ou <em>"aquele que traz a luz"</em>. Originalmente, este termo era usado para descrever o planeta Vênus quando aparecia como a "estrela da manhã".</p>

<p>Nos textos antigos, antes da influência cristã, Lúcifer era associado com:</p>

<ul>
<li><strong>Iluminação</strong> e conhecimento</li>
<li><strong>Despertar</strong> da consciência</li>
<li>A <strong>luz da razão</strong> cortando através da ignorância</li>
<li>O <strong>fogo prometeico</strong> do progresso humano</li>
</ul>

<p>Esta imagem original está muito distante do demônio cornudo da iconografia cristã. Na verdade, Lúcifer era visto como um <em>aspecto da divindade</em> - aquele que trazia conhecimento e consciência aos seres humanos.</p>

<blockquote>
<p><em>"A verdadeira luz não é aquela que nunca conheceu a escuridão, mas aquela que brilha através dela."</em></p>
</blockquote>

<p>O processo de demonização de Lúcifer começou quando as autoridades religiosas perceberam que o <strong>conhecimento independente</strong> representava uma ameaça ao seu controle. Um povo iluminado não aceita facilmente a submissão cega.</p>

<p>Assim, aquele que trazia a luz teve que ser transformado em símbolo das trevas.</p>`
      },
      {
        title: "Capítulo II – O Primeiro Rebelde",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO II</strong></h1>
<h2>O Primeiro Rebelde</h2>
</div>

<p>A narrativa da <strong>"queda de Lúcifer"</strong> é uma das histórias mais poderosas já contadas - mas não pelos motivos que você pode imaginar. Quando vista através de uma lente não condicionada pelo dogma, ela se revela como a história do <em>primeiro ato de resistência</em> contra a tirania.</p>

<p>Segundo a tradição, Lúcifer era o mais belo e poderoso dos anjos, posicionado à direita do trono divino. Mas quando recebeu a ordem de <strong>se prostrar diante da humanidade</strong>, ele recusou.</p>

<p>Por que essa recusa? Várias interpretações são possíveis:</p>

<ul>
<li>Reconhecimento da <strong>divindade inerente</strong> em todos os seres</li>
<li>Recusa em aceitar <strong>hierarquias arbitrárias</strong></li>
<li>Defesa da <strong>igualdade espiritual</strong></li>
<li>Proteção da <strong>dignidade individual</strong></li>
</ul>

<p>Vista desta forma, a "rebelião" de Lúcifer não foi um ato de arrogância, mas de <em>princípio</em>. Ele preferiu o exílio à submissão injusta.</p>

<blockquote>
<p><em>"É melhor reinar no inferno do que servir no céu"</em> - uma declaração não de megalomania, mas de <strong>integridade inabalável</strong>.</p>
</blockquote>

<p>Lúcifer se tornou o símbolo daqueles que <strong>questionam autoridade</strong>, que recusam aceitar "porque eu disse" como resposta suficiente.</p>`
      },
      {
        title: "Capítulo III – O Sacrifício Prometeico",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO III</strong></h1>
<h2>O Sacrifício Prometeico</h2>
</div>

<p>A história de Lúcifer ecoa profundamente com o mito grego de <strong>Prometeu</strong> - o titã que roubou o fogo dos deuses para dá-lo à humanidade. Ambas as narrativas falam de um ser divino que <em>sacrifica sua posição</em> para elevar a condição humana.</p>

<p>Prometeu foi punido eternamente por Zeus, acorrentado a uma rocha onde uma águia devorava seu fígado diariamente. Lúcifer foi banido do paraíso e transformado em símbolo do mal. <strong>Ambos pagaram caro por seu amor à humanidade</strong>.</p>

<p>O "fogo" que esses personagens trouxeram não era apenas físico, mas <em>espiritual</em>:</p>

<ul>
<li>A <strong>chama da consciência</strong></li>
<li>O <strong>fogo da razão crítica</strong></li>
<li>A <strong>luz do questionamento</strong></li>
<li>A <strong>energia da autoafirmação</strong></li>
</ul>

<p>Em muitas tradições esotéricas, Lúcifer é visto exatamente dessa forma - como um <em>benfeitor da humanidade</em> que sacrificou sua posição celestial para nos dar as ferramentas de nossa própria libertação.</p>

<blockquote>
<p><em>"O verdadeiro amor não busca controlar, mas libertar."</em></p>
</blockquote>

<p>Se essa interpretação estiver correta, então nossa gratidão deveria ir não para aquele que nos mantém ignorantes, mas para aquele que <strong>ilumina nossa escuridão</strong>.</p>`
      },
      {
        title: "Capítulo IV – A Divindade Negada",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO IV</strong></h1>
<h2>A Divindade Negada</h2>
</div>

<p>Nas tradições mais antigas, anteriores ao monoteísmo abraâmico, existia o conceito de <strong>polaridades divinas</strong>. A divindade não era vista como exclusivamente benevolente, mas como incorporando todos os aspectos da existência - luz e sombra, criação e destruição, ordem e caos.</p>

<p>Lúcifer representa o <em>aspecto sombrio necessário</em> da divindade - não no sentido de malévolo, mas no sentido de <strong>questionador</strong>, <strong>transformador</strong> e <strong>libertador</strong>.</p>

<p>Este aspecto foi sistematicamente removido da consciência religiosa mainstream porque:</p>

<ul>
<li>Ameaçava estruturas de <strong>poder estabelecidas</strong></li>
<li>Encorajava <strong>pensamento independente</strong></li>
<li>Promovia <strong>responsabilidade pessoal</strong></li>
<li>Desafiava <strong>dogmas inquestionáveis</strong></li>
</ul>

<p>Ao demonizar Lúcifer, as autoridades religiosas essencialmente <em>amputaram</em> uma parte fundamental da experiência espiritual humana - a capacidade de questionar, crescer e evoluir.</p>

<blockquote>
<p><em>"Uma divindade que teme questionamentos não é digna de adoração."</em></p>
</blockquote>

<p>Reconhecer Lúcifer como um aspecto legítimo do divino não significa abraçar o mal, mas sim <strong>abraçar a totalidade</strong> da experiência espiritual humana.</p>

<p>Significa ter a coragem de questionar, o direito de duvidar e a responsabilidade de <em>pensar por si mesmo</em>.</p>`
      },
      {
        title: "Epílogo – Reconhecendo a Luz Verdadeira",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>EPÍLOGO</strong></h1>
<h2>Reconhecendo a Luz Verdadeira</h2>
</div>

<p>Se você chegou até aqui com a mente aberta, já começou a ver <strong>Lúcifer</strong> através de uma lente completamente diferente. Não como o demônio dos pesadelos cristãos, mas como algo muito mais complexo e, paradoxalmente, muito mais <em>luminoso</em>.</p>

<p>A verdadeira tragédia não é a "queda" de Lúcifer, mas nossa <strong>cegueira coletiva</strong> para o que ele realmente representa: a coragem de questionar, a paixão pelo conhecimento e a recusa em aceitar limitações arbitrárias.</p>

<p>Quando você remove as camadas de propaganda e condicionamento, encontra em Lúcifer um <em>espelho</em> - um reflexo de seu próprio potencial divino não realizado.</p>

<p>A luz que ele porta não é externa a você. É a <strong>mesma luz</strong> que brilha em sua própria consciência quando você ousa:</p>

<ul>
<li><strong>Questionar</strong> autoridades injustas</li>
<li><strong>Buscar</strong> conhecimento proibido</li>
<li><strong>Afirmar</strong> sua própria divindade</li>
<li><strong>Recusar</strong> submissão desnecessária</li>
</ul>

<p>Lúcifer não é seu inimigo. Ele é seu <em>irmão mais velho</em> no caminho da iluminação - aquele que primeiro ousou dizer "não" à tirania e "sim" à verdade.</p>

<p>A luz proibida da criação não está em algum reino distante. Ela está <strong>dentro de você</strong>, esperando para ser reconhecida e expressada.</p>

<p><strong>Desperte para sua própria luz. O universo está esperando.</strong></p>`
      }
    ]
  },
  {
    title: "O Medo de Ser Livre — A Prisão Disfarçada de Salvação",
    description: "Uma análise psicológica e espiritual profunda sobre como o medo da liberdade mantém as pessoas presas em sistemas opressivos que prometem segurança mas entregam escravidão.",
    unlock_order: 4,
    chapters: [
      {
        title: "Prólogo – A Gaiola Dourada",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>PRÓLOGO</strong></h1>
<h2>A Gaiola Dourada</h2>
</div>

<p>Existe uma história sobre um pássaro que viveu tanto tempo em uma gaiola que, quando a porta foi finalmente aberta, ele <strong>recusou-se a sair</strong>. O mundo exterior parecia vasto demais, perigoso demais, incerto demais.</p>

<p>Esta história não é sobre pássaros. É sobre <em>você</em>.</p>

<p>Durante toda sua vida, você foi condicionado a acreditar que a <strong>liberdade é perigosa</strong>. Que questionar é arrogante. Que pensar por si mesmo é orgulhoso. Que a verdadeira virtude está na submissão, na obediência, na aceitação passiva do que outros determinam para sua vida.</p>

<p>Mas e se essas "virtudes" forem, na verdade, <em>correntes douradas</em>? E se o que você chama de humildade for, na realidade, <strong>medo disfarçado</strong>?</p>

<p>Este grimório explorará uma das mais profundas e perturbadoras verdades sobre a condição humana: que a maioria das pessoas não quer realmente ser livre. Elas preferem a <em>segurança da escravidão</em> à responsabilidade da liberdade.</p>

<p>Se você está lendo isto, há algo em você que suspeita dessa verdade. Há uma parte que já está <strong>rattling the cage</strong>, testando as barras de sua prisão dourada.</p>

<p>A questão é: você terá coragem de abrir a porta?</p>`
      },
      {
        title: "Capítulo I – O Conforto da Submissão",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO I</strong></h1>
<h2>O Conforto da Submissão</h2>
</div>

<p>Ser livre é <strong>aterrorizante</strong>. Significa aceitar total responsabilidade por sua vida, suas escolhas, suas consequências. Significa não ter ninguém mais para culpar quando as coisas dão errado.</p>

<p>A submissão, por outro lado, oferece um conforto sedutor:</p>

<ul>
<li><strong>Alguém mais</strong> toma as decisões difíceis</li>
<li><strong>Alguém mais</strong> carrega o peso da responsabilidade</li>
<li><strong>Alguém mais</strong> é culpado quando tudo desmorona</li>
<li><strong>Você</strong> apenas precisa obedecer e ser "bom"</li>
</ul>

<p>Este é o apelo sedutor dos sistemas autoritários, sejam eles religiosos, políticos ou sociais. Eles prometem <em>certeza</em> em um mundo incerto, <em>direção</em> em um universo aparentemente caótico.</p>

<blockquote>
<p><em>"A escravidão voluntária é a mais perfeita de todas as escravidões, pois é escolhida pelo próprio escravo."</em></p>
</blockquote>

<p>O problema é que essa segurança é uma <strong>ilusão</strong>. Você troca sua autonomia por uma falsa sensação de proteção. E gradualmente, a capacidade de pensar e agir por si mesmo <em>atrofia</em>, como um músculo não utilizado.</p>

<p>Eventualmente, você se torna <strong>incapaz</strong> de liberdade, mesmo que ela seja oferecida.</p>`
      },
      {
        title: "Capítulo II – A Propaganda do Sacrifício",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO II</strong></h1>
<h2>A Propaganda do Sacrifício</h2>
</div>

<p>Desde pequeno, você é ensinado que o <strong>sacrifício</strong> é nobre. Que negar seus desejos é virtuoso. Que colocar outros antes de si mesmo é o caminho para a salvação.</p>

<p>Mas observe atentamente <em>quem</em> promove essa mensagem e <em>quem</em> se beneficia dela:</p>

<ul>
<li>Os <strong>líderes religiosos</strong> que vivem em luxo enquanto pregam pobreza</li>
<li>Os <strong>políticos</strong> que pedem sacrifícios que eles mesmos não fazem</li>
<li>Os <strong>chefes</strong> que exploram sua "dedicação" por salários mínimos</li>
<li>Os <strong>manipuladores</strong> que usam sua culpa para controlá-lo</li>
</ul>

<p>A propaganda do sacrifício é uma das <em>ferramentas de controle</em> mais eficazes já criadas. Ela transforma a exploração em virtude, a submissão em santidade.</p>

<blockquote>
<p><em>"Suspeite sempre daqueles que pregam sacrifício mas não o praticam."</em></p>
</blockquote>

<p>Existe uma diferença fundamental entre <strong>escolher</strong> ajudar outros a partir de uma posição de força e ser <em>manipulado</em> a se sacrificar a partir de uma posição de fraqueza.</p>

<p>O primeiro é amor. O segundo é <strong>escravidão emocional</strong>.</p>

<p>Sua primeira responsabilidade é consigo mesmo. Não por egoísmo, mas porque <em>você não pode dar o que não tem</em>. Um copo vazio não pode alimentar ninguém.</p>`
      },
      {
        title: "Capítulo III – O Medo do Julgamento",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO III</strong></h1>
<h2>O Medo do Julgamento</h2>
</div>

<p>Uma das principais barreiras à liberdade é o <strong>terror</strong> de ser julgado pelos outros. O medo de ser rejeitado, criticado, excluído do grupo.</p>

<p>Este medo é primitivo e poderoso. Está enraizado em nossa herança evolutiva, quando ser expulso da tribo significava <em>morte certa</em>. Mas em nosso mundo moderno, esse medo frequentemente nos mantém presos a:</p>

<ul>
<li><strong>Relacionamentos</strong> que nos drenam</li>
<li><strong>Carreiras</strong> que nos sufocam</li>
<li><strong>Crenças</strong> que não mais servem</li>
<li><strong>Identidades</strong> que limitam nosso crescimento</li>
</ul>

<p>Mas aqui está uma verdade libertadora: <em>a maioria das pessoas está tão preocupada com o julgamento dos outros que mal nota suas escolhas</em>. E aqueles que julgam harshly geralmente o fazem porque sua própria liberdade os ameaça.</p>

<blockquote>
<p><em>"O preço da aprovação universal é a traição de si mesmo."</em></p>
</blockquote>

<p>Quando você para de viver para a aprovação dos outros, algo mágico acontece: você atrai pessoas que <strong>respeitam sua autenticidade</strong>. Você troca relacionamentos baseados em conformidade por relacionamentos baseados em <em>verdade</em>.</p>

<p>O julgamento dos outros só tem o poder que <strong>você lhe dá</strong>. E esse poder pode ser retirado no momento em que você decide que sua aprovação própria é mais importante que a deles.</p>`
      },
      {
        title: "Capítulo IV – Reivindicando Sua Soberania",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO IV</strong></h1>
<h2>Reivindicando Sua Soberania</h2>
</div>

<p>A verdadeira liberdade não é a ausência de responsabilidade - é a <strong>aceitação total</strong> dela. É reconhecer que você é o autor de sua própria vida, o arquiteto de seu próprio destino.</p>

<p>Reivindicar sua soberania significa:</p>

<ul>
<li><strong>Questionar</strong> toda autoridade que não se justifica</li>
<li><strong>Recusar</strong> obedecer ordens que violam sua consciência</li>
<li><strong>Afirmar</strong> seus direitos como ser divino encarnado</li>
<li><strong>Assumir</strong> responsabilidade total por sua experiência</li>
</ul>

<p>Isso não significa tornar-se cruel ou insensível. Significa tornar-se <em>consciente</em> e <em>intencional</em>. Significa escolher suas batalhas, seus relacionamentos, seus compromissos com base em seus próprios valores, não nos de outros.</p>

<blockquote>
<p><em>"A verdadeira humildade é reconhecer sua própria divindade."</em></p>
</blockquote>

<p>Você não precisa de permissão para ser livre. Você não precisa esperar por condições perfeitas. Você não precisa que outros entendam ou aprovem.</p>

<p>A liberdade é um <strong>estado interno</strong> que pode ser acessado a qualquer momento, independentemente de suas circunstâncias externas.</p>

<p>Comece pequeno. Questione uma crença. Diga "não" a uma demanda injusta. Faça uma escolha baseada em seu desejo, não na expectativa dos outros.</p>

<p>Cada ato de <em>autodeterminação</em> fortalece seu músculo da liberdade.</p>`
      },
      {
        title: "Epílogo – Abrindo a Gaiola",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>EPÍLOGO</strong></h1>
<h2>Abrindo a Gaiola</h2>
</div>

<p>Se você chegou até aqui, significa que a porta de sua gaiola já está <strong>entreaberta</strong>. Você já começou a questionar as barras douradas que pensava serem proteção.</p>

<p>O próximo passo é inteiramente seu. Você pode fechar este grimório, voltar para o conforto familiar de sua prisão dourada e fingir que nunca leu estas palavras. Muitos fazem essa escolha, e não há julgamento nisso.</p>

<p>Ou você pode dar o passo <em>aterrorizante</em> e <em>exaltante</em> para fora da gaiola. Você pode escolher a responsabilidade assustadora e a alegria incrível de ser <strong>genuinamente livre</strong>.</p>

<p>Lembre-se: a liberdade não é um destino, é uma <em>prática diária</em>. É a escolha constante de:</p>

<ul>
<li><strong>Pensar</strong> por si mesmo</li>
<li><strong>Sentir</strong> suas próprias emoções</li>
<li><strong>Fazer</strong> suas próprias escolhas</li>
<li><strong>Assumir</strong> suas próprias consequências</li>
</ul>

<p>Será desconfortável às vezes. Você sentirá medo, dúvida, solidão. Isso é normal. A liberdade tem um preço, e esse preço é a <em>incerteza</em>.</p>

<p>Mas o preço da escravidão é muito maior: <strong>sua alma</strong>.</p>

<p>A gaiola está aberta. O céu infinito espera.</p>

<p><strong>Voe.</strong></p>`
      }
    ]
  },
  {
    title: "O Falso Deus — O Tirano Oculto que Chamaram de Pai",
    description: "Uma investigação corajosa sobre a natureza opressiva da divindade abraâmica, revelando como conceitos de amor divino mascaram sistemas de controle autoritário.",
    unlock_order: 5,
    chapters: [
      {
        title: "Prólogo – Questionando o Inquestionável",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>PRÓLOGO</strong></h1>
<h2>Questionando o Inquestionável</h2>
</div>

<p>Há perguntas que não somos <em>supostos</em> a fazer. Questões tão fundamentais, tão desafiadoras às estruturas de nossa sociedade que sua mera articulação é considerada blasfêmia.</p>

<p>Uma dessas perguntas é: <strong>E se o deus que adoramos for, na verdade, um tirano?</strong></p>

<p>Esta não é uma questão feita por malícia ou pelo desejo de ofender. É uma pergunta nascida da <em>observação honesta</em> de como este deus se comporta em suas próprias escrituras, de como seus seguidores agem em seu nome, e de como seus ensinamentos afetam a psique humana.</p>

<p>Se você nunca questionou a natureza da divindade que lhe foi apresentada desde a infância, este grimório será <strong>profundamente perturbador</strong>. Se você já sentiu desconforto com as contradições entre amor divino pregado e autoritarismo divino praticado, encontrará aqui palavras para seus sentimentos mais profundos.</p>

<p>Este não é um ataque ao conceito de divindade em si, mas um <em>exame crítico</em> de uma apresentação específica de deus que tem dominado o mundo ocidental por dois milênios.</p>

<p>Você está preparado para olhar diretamente para o <strong>tirano atrás da máscara paternal</strong>?</p>`
      },
      {
        title: "Capítulo I – O Deus Ciumento",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO I</strong></h1>
<h2>O Deus Ciumento</h2>
</div>

<p>Nas próprias palavras das escrituras abraâmicas, este deus se declara <strong>"ciumento"</strong>. Não metaforicamente, mas literalmente. Ele exige adoração exclusiva e pune seveiramente qualquer "infidelidade".</p>

<p>Mas pense sobre isso: o que diz sobre o caráter de um ser que demanda adoração constante? Que ameaça punição eterna para aqueles que não o bajulam adequadamente?</p>

<p>Em qualquer relacionamento humano, reconheceríamos esses comportamentos como sinais de:</p>

<ul>
<li><strong>Narcisismo</strong> patológico</li>
<li><strong>Insegurança</strong> profunda</li>
<li><strong>Tendências abusivas</strong></li>
<li><strong>Controle manipulativo</strong></li>
</ul>

<p>Um ser verdadeiramente seguro e amoroso não <em>exigiria</em> adoração. Não <em>puniria</em> aqueles que escolhem caminhos diferentes. Não <em>ameaçaria</em> suas criações com tormento eterno por "desobediência".</p>

<blockquote>
<p><em>"O amor verdadeiro busca a felicidade do amado, mesmo que isso signifique escolher outro caminho."</em></p>
</blockquote>

<p>A exigência de adoração exclusiva não é sinal de divindade, mas de <strong>ego ferido</strong>. É o comportamento de um ditador, não de um pai amoroso.</p>

<p>Quando você realmente analisa os textos sagrados sem o filtro do condicionamento religioso, encontra não um deus de amor, mas um <em>tirano cósmico</em> obcecado com obediência.</p>`
      },
      {
        title: "Capítulo II – A Chantagem Emocional Divina",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO II</strong></h1>
<h2>A Chantagem Emocional Divina</h2>
</div>

<p>O sistema de crenças abraâmico opera através de uma das formas mais sofisticadas de <strong>chantagem emocional</strong> já criada. A fórmula é simples mas devastadoramente eficaz:</p>

<p><em>"Eu te amo incondicionalmente... mas se você não me obedecer, sofrerá eternamente."</em></p>

<p>Esta é uma contradição fundamental que passa despercebida por muitos crentes. <strong>Amor incondicional</strong> não pode coexistir com <strong>punição condicional</strong>. Se há condições para evitar punição, então o amor não é incondicional.</p>

<p>O mecanismo funciona assim:</p>

<ul>
<li><strong>Culpa</strong> - você é inerentemente pecaminoso</li>
<li><strong>Medo</strong> - punição eterna aguarda os desobedientes</li>
<li><strong>Dependência</strong> - apenas este deus pode salvá-lo</li>
<li><strong>Gratidão forçada</strong> - você deve ser grato por não ser torturado</li>
</ul>

<p>Este é o padrão clássico de um <em>relacionamento abusivo</em>. O abusador alterna entre demonstrações de "amor" e ameaças de violência, mantendo a vítima em constante estado de ansiedade e dependência.</p>

<blockquote>
<p><em>"Ame-me ou eu te machuco" não é amor - é extorsão.</em></p>
</blockquote>

<p>Um verdadeiro deus de amor não <strong>ameaçaria</strong> suas criações. Não as faria sentir culpa por sua natureza. Não exigiria gratidão por não as torturar.</p>

<p>O fato de que esse sistema é apresentado como "amor divino" é talvez a maior perversão da palavra "amor" na história humana.</p>`
      },
      {
        title: "Capítulo III – O Genocida Moral",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO III</strong></h1>
<h2>O Genocida Moral</h2>
</div>

<p>As escrituras abraâmicas estão repletas de histórias que, se fossem atribuídas a qualquer líder humano, resultariam em julgamentos por <strong>crimes contra a humanidade</strong>. Mas porque são atribuídas a deus, são celebradas como demonstrações de justiça divina.</p>

<p>Considere apenas algumas das ações celebradas:</p>

<ul>
<li><strong>Genocídio global</strong> - o dilúvio de Noé</li>
<li><strong>Destruição de cidades</strong> - Sodoma e Gomorra</li>
<li><strong>Assassinato de crianças</strong> - os primogênitos do Egito</li>
<li><strong>Comandos de extermínio</strong> - as conquistas canãs</li>
</ul>

<p>A justificativa padrão é que esses grupos eram "ímpios" e mereciam destruição. Mas isso levanta questões ainda mais perturbadoras:</p>

<p>Um deus verdadeiramente onipotente não poderia simplesmente <em>mudar os corações</em> ao invés de destruir vidas? Por que um ser infinitamente sábio escolheria repetidamente a violência sobre a transformação?</p>

<blockquote>
<p><em>"A verdadeira força está em transformar inimigos em aliados, não em destruí-los."</em></p>
</blockquote>

<p>As respostas reveladoras que emergem quando analisamos essas histórias objetivamente sugerem que estamos lidando não com um deus <em>de amor</em>, mas com uma <strong>projeção</strong> dos piores aspectos da natureza humana - nossa tendência tribal, nossa sede de vingança, nossa incapacidade de lidar com diferenças.</p>

<p>Este "deus" age exatamente como um <em>ditador humano</em> com poder absoluto agiria.</p>`
      },
      {
        title: "Capítulo IV – A Libertação do Medo",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>CAPÍTULO IV</strong></h1>
<h2>A Libertação do Medo</h2>
</div>

<p>Reconhecer que o deus abraâmico exibe características de um <strong>tirano autoritário</strong> pode ser inicialmente aterrorizante. Afinal, fomos condicionados desde a infância a temer sua ira.</p>

<p>Mas essa realização também pode ser profundamente <em>libertadora</em>. Porque se esse deus é uma criação humana - uma projeção de nossos medos e desejos de controle - então suas ameaças não têm poder real sobre você.</p>

<p>A verdadeira divindade, se existe, seria caracterizada por:</p>

<ul>
<li><strong>Amor incondicional</strong> genuíno</li>
<li><strong>Respeito</strong> pelo livre arbítrio</li>
<li><strong>Ausência</strong> de ego ou necessidade de adoração</li>
<li><strong>Compaixão</strong> infinita, mesmo por "pecadores"</li>
</ul>

<p>Um deus assim não <em>ameaçaria</em> você por questionar. Não <em>puniria</em> você por buscar verdade. Não <em>exigiria</em> submissão cega.</p>

<blockquote>
<p><em>"A verdade não teme investigação - apenas mentiras exigem fé cega."</em></p>
</blockquote>

<p>Quando você se liberta do medo deste falso deus tirano, abre espaço para uma <strong>conexão autêntica</strong> com o divino - seja lá como você escolha compreendê-lo.</p>

<p>Você pode explorar espiritualidade <em>sem medo</em>, questionar <em>sem culpa</em>, crescer <em>sem punição</em>.</p>

<p>A verdadeira jornada espiritual começa quando você para de ter medo de fazer as <strong>perguntas difíceis</strong>.</p>`
      },
      {
        title: "Epílogo – Reclamando Sua Divindade",
        content: `<div style="text-align: center; margin: 2rem 0;">
<h1><strong>EPÍLOGO</strong></h1>
<h2>Reclamando Sua Divindade</h2>
</div>

<p>Se você chegou até aqui, provavelmente está sentindo uma mistura de <strong>libertação</strong> e <strong>vertigem</strong>. Questionar o inquestionável sempre deixa um vazio temporário - o espaço onde antigas certezas costumavam residir.</p>

<p>Esse vazio é precioso. É o <em>espaço da possibilidade</em>, onde novas compreensões podem nascer.</p>

<p>Ao rejeitar o falso deus tirano, você não se torna ateu necessariamente. Você se torna <strong>livre</strong> para descobrir divindade autêntica - dentro de si mesmo e no universo ao seu redor.</p>

<p>Muitas tradições antigas reconheciam que:</p>

<ul>
<li>Cada ser humano carrega uma <strong>centelha divina</strong></li>
<li>A verdadeira adoração é <strong>autodesenvolvimento</strong></li>
<li>O sagrado se manifesta através da <strong>consciência expandida</strong></li>
<li>Deus não está "lá em cima" mas <strong>dentro e ao redor</strong></li>
</ul>

<p>Quando você reclama sua própria divindade, não está se tornando blasfemo - está <em>voltando para casa</em>.</p>

<blockquote>
<p><em>"Você não precisa se prostrar diante de deuses. Você é um."</em></p>
</blockquote>

<p>O tirano que você temeu nunca teve poder real sobre você. O único poder que ele tinha era aquele que <strong>você lhe deu</strong> através do seu medo e submissão.</p>

<p>Agora você pode retirar esse poder. Agora você pode escolher divindades que o <em>elevam</em> ao invés de diminuí-lo. Ou melhor ainda, pode reconhecer a divindade que sempre existiu <strong>dentro de você</strong>.</p>

<p>O falso deus está morto. Longa vida ao <strong>deus verdadeiro</strong> - aquele que olha para você através do espelho.</p>

<p><strong>Desperte para sua própria majestade.</strong></p>`
      }
    ]
  }
];

async function createGrimoires() {
  console.log('📚 Criando novos grimórios seguindo o padrão do "Introdução ao Luciferianismo"...\n');
  
  for (const grimoire of grimoires) {
    try {
      console.log(`🔥 Criando "${grimoire.title}"...`);
      
      // Criar o grimório
      const { data: newGrimoire, error: grimoireError } = await supabase
        .from('grimoires')
        .insert({
          title: grimoire.title,
          description: grimoire.description,
          section_id: 1, // Atrium Ignis
          unlock_order: grimoire.unlock_order,
          is_published: true,
          price: 0,
          is_paid: false
        })
        .select()
        .single();
        
      if (grimoireError) {
        console.error(`❌ Erro ao criar grimório "${grimoire.title}":`, grimoireError);
        continue;
      }
      
      console.log(`  ✓ Grimório criado com ID ${newGrimoire.id}`);
      
      // Criar os capítulos
      for (let i = 0; i < grimoire.chapters.length; i++) {
        const chapter = grimoire.chapters[i];
        
        const { error: chapterError } = await supabase
          .from('chapters')
          .insert({
            grimoire_id: newGrimoire.id,
            title: chapter.title,
            content: chapter.content,
            chapter_number: i + 1
          });
          
        if (chapterError) {
          console.error(`❌ Erro ao criar capítulo "${chapter.title}":`, chapterError);
        } else {
          console.log(`    ✓ Capítulo ${i + 1}: ${chapter.title}`);
        }
      }
      
      console.log(`  ✅ Grimório "${grimoire.title}" criado com ${grimoire.chapters.length} capítulos\n`);
      
    } catch (error) {
      console.error(`💥 Erro geral ao criar "${grimoire.title}":`, error);
    }
  }
  
  console.log('🎉 Todos os grimórios foram criados seguindo o padrão estabelecido!');
}

createGrimoires().catch(console.error);