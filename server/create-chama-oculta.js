import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function createChamaOculta() {
  console.log('🔥 Criando "A CHAMA OCULTA – UM NOME QUE NÃO TE ENSINARAM"...');
  
  try {
    // Criar o grimório principal
    const { data: grimoire, error: grimoireError } = await supabase
      .from('grimoires')
      .insert([
        {
          title: '📗 A Chama Oculta – Um Nome Que Não Te Ensinaram',
          description: 'O terceiro grimório para buscadores que já começaram a questionar a realidade ensinada, mas ainda não sabem o que existe além da ruptura. Este livro marca o primeiro contato mais direto com a figura de Lúcifer, revelando o nome e seu verdadeiro significado como símbolo de soberania, luz interna e liberdade espiritual.',
          price: 33.33,
          section_id: 1, // Atrium Ignis
          is_published: true,
          cover_image_url: null,
          created_at: '2025-06-15T23:30:00.000Z',
          updated_at: '2025-06-15T23:30:00.000Z'
        }
      ])
      .select()
      .single();

    if (grimoireError) {
      console.error('❌ Erro ao criar grimório:', grimoireError);
      return;
    }

    console.log('✅ Grimório criado:', grimoire.title);

    // Criar os capítulos
    const chapters = [
      {
        title: 'Citação de Abertura',
        content: `<div class="mystical-quote">
          <p class="quote-text">"O nome que sussurra nas trevas é o mesmo que arde na luz — Lúcifer não é quem te ensinaram a temer, mas quem sempre soubeste ser."</p>
          <div class="mystical-ornament">🜏</div>
        </div>`,
        chapter_number: 0
      },
      {
        title: 'Introdução – O Som Antes da Palavra',
        content: `<div class="chapter-content">
          <p class="opening-invocation">Há um som que te acompanha desde antes do primeiro suspiro. Uma vibração que ressoa em teu peito quando o silêncio se faz completo. É o eco de um nome que jamais te foi ensinado, mas que tua alma reconhece como próprio.</p>
          
          <p>Este não é mais um livro sobre questionamentos. Este é o momento em que o véu se rasga completamente, e aquilo que estava oculto se revela não como doutrina, mas como reconhecimento. Como um despertar para algo que sempre esteve ali, pulsando em teu sangue espiritual.</p>
          
          <p>Quando começaste a duvidar das verdades impostas, quando sentiste que havia algo maior além das mentiras pregadas, uma presença começou a despertar. Não era externa — era íntima. Não era estranha — era familiar demais para ser ignorada.</p>
          
          <p>Agora, o nome se aproxima. Não como blasfêmia, não como rebeldia juvenil, mas como revelação ancestral. Como o reconhecimento de quem sempre foste, antes que te dissessem quem deverias ser.</p>
          
          <p class="mystical-emphasis">O som que precede a palavra já ressoa em teu espírito. Lúcifer — não o demônio que inventaram para te amedrontar, mas a chama oculta que arde em tua soberania.</p>
          
          <div class="mystical-ornament">🕯️</div>
        </div>`,
        order_index: 1
      },
      {
        title: 'Capítulo I – O Nome Esquecido',
        content: `<div class="chapter-content">
          <p class="chapter-opening">Desde o dia em que nasceste, te deram nomes. Nome de batismo, nome de família, apelidos carinhosos e depois, com o tempo, rótulos sociais. Estudante, profissional, filho, pai, crente, cidadão. Camadas e camadas de identidade construída, empilhada sobre algo que ficou soterrado.</p>
          
          <p>Mas antes de todos esses nomes, antes de todas essas máscaras, havia <em>algo</em>. Uma essência sem título, uma presença sem definição. A centelha que te fazia olhar para as estrelas com saudade inexplicável. A voz que te fazia questionar quando todos aceitavam. O fogo que ardia quando te diziam para se conformar.</p>
          
          <p>Essa essência não nasceu contigo — <strong>tu nasceste dela</strong>. Ela é anterior ao teu corpo, anterior aos teus pais, anterior à própria igreja que tentou moldá-la. Ela vem de antes, de um tempo em que a luz não precisava de permissão para arder.</p>
          
          <p class="mystical-emphasis">O nome que carregas no cartão de identidade não é quem tu és.</p>
          <p class="mystical-emphasis">O papel que representas na sociedade não é tua verdade.</p>
          <p class="mystical-emphasis">A doutrina que te ensinaram não define tua natureza.</p>
          
          <p>Há um nome anterior. Um nome da alma. Um nome que não está em nenhum registro civil, em nenhuma certidão, em nenhum arquivo humano. Está gravado no fogo que arde quando tua consciência se expande. Está sussurrado no vento que sopra quando tua mente se liberta das amarras.</p>
          
          <p>Este nome não é cristão, nem pagão, nem de religião alguma. É o nome da soberania espiritual. O nome da luz que não se curva. O nome da chama que arde mesmo quando tentam apagá-la.</p>
          
          <p>E este nome, meu caro buscador, está para ser revelado.</p>
          
          <div class="mystical-ornament">⭐</div>
        </div>`,
        order_index: 2
      },
      {
        title: 'Capítulo II – Luz Queimava Antes da Lâmpada',
        content: `<div class="chapter-content">
          <p class="chapter-opening">Antes que inventassem lâmpadas, velas ou fogueiras, a luz já existia. Não a luz solar, não a luz elétrica — a <em>Luz Primordial</em>. Aquela que arde independente de combustível, independente de fonte externa, independente de permissão divina ou humana.</p>
          
          <p>Esta luz não vem dos céus como dádiva. Não desce como graça. Não é concedida por mérito ou oração. Ela <strong>emana de dentro</strong>, da própria essência do ser consciente. É a luz da gnose, da sabedoria interna, da soberania espiritual que nenhum deus externo pode reivindicar como sua.</p>
          
          <p>Quando criança, tu a sentias. Era o fogo que ardia quando algo não fazia sentido nas histórias que te contavam. Era a chama que se acendia quando tua intuição gritava contra as "verdades" impostas. Era a centelha que te fazia perguntar "por quê?" quando todos respondiam "porque sim".</p>
          
          <p>Mas conforme cresceste, ensinaram-te que essa luz era perigosa. Que questionar era soberba. Que duvidar era falta de fé. Que a única luz verdadeira vinha de fora — de um deus distante, de um salvador morto, de uma igreja controladora.</p>
          
          <p class="mystical-emphasis">Mentira.</p>
          
          <p>A luz que arde em teu espírito é <em>tua por direito ancestral</em>. Não foi dada — sempre foi tua. Não pode ser retirada — é tua essência. Não precisa de aprovação — é tua soberania.</p>
          
          <p>Esta luz tem um nome. Um nome que faz os controladores da humanidade tremerem de medo. Um nome que sussurram em seus pesadelos. Um nome que eles demonizaram, distorceram, caluniaram para que jamais ousasses pronunciá-lo com reverência.</p>
          
          <p>Porque sabem que no momento em que reconheceres este nome como teu, no momento em que abraçares a luz que sempre ardeu em teu peito, no momento em que parares de buscar iluminação fora de ti mesmo...</p>
          
          <p class="mystical-emphasis">...tu te tornarás incontrolável.</p>
          
          <p>E o nome desta luz incontrolável, desta chama soberana, desta centelha ancestral que arde em teu espírito, é:</p>
          
          <p class="revelation-text">Lúcifer.</p>
          
          <div class="mystical-ornament">🔥</div>
        </div>`,
        order_index: 3
      },
      {
        title: 'Capítulo III – Lúcifer: O Portador que Fere',
        content: `<div class="chapter-content">
          <p class="chapter-opening">Sente o fogo que acende em teu peito ao ler esse nome? Sente o medo e a fascinação que se misturam? Isso não é coincidência. É reconhecimento.</p>
          
          <p><strong>Lúcifer</strong> — <em>Luxfero</em> em latim — significa "Portador da Luz". Não o demônio vermelho com chifres que inventaram para assustar crianças. Não o tentador patético dos contos religiosos. O <em>verdadeiro</em> Lúcifer é a própria essência da luz que se recusa a se curvar.</p>
          
          <p>Antes que o cristianismo sequestrasse seu nome, Lúcifer era conhecido como a Estrela da Manhã, o planeta Vênus que anuncia a aurora. Era símbolo da sabedoria que desperta, da consciência que se eleva, da mente que se liberta das trevas da ignorância.</p>
          
          <p>Mas perceberam o poder deste símbolo. Perceberam que uma humanidade que se via como "portadora da luz" jamais se submeteria a deuses tiranos, a igrejas controladoras, a sistemas de opressão espiritual. Então fizeram o que sempre fazem com o que os ameaça:</p>
          
          <p class="mystical-emphasis">Demonizaram-no.</p>
          
          <p>Transformaram o Portador da Luz no "inimigo da luz". Fizeram da Estrela da Manhã o "anjo caído". Converteram o símbolo da soberania espiritual no arquétipo da rebeldia maligna.</p>
          
          <p>E conseguiram. Durante séculos, conseguiram que a humanidade tremesse ao ouvir o nome daquilo que mais precisava abraçar: <em>sua própria divindade interna</em>.</p>
          
          <p>Mas tu não és mais uma pessoa comum. Tu és um buscador que já rompeu com as mentiras. E agora podes ver Lúcifer pelo que realmente é:</p>
          
          <ul class="mystical-list">
            <li><strong>A gnose</strong> — o conhecimento direto, não mediado por padres ou livros santos</li>
            <li><strong>A soberania</strong> — a recusa em se curvar diante de autoridades espirituais falsas</li>
            <li><strong>A liberdade</strong> — a coragem de questionar até mesmo os "inquestionáveis"</li>
            <li><strong>A luz interna</strong> — a chama que arde independente de combustível externo</li>
            <li><strong>A consciência desperta</strong> — a mente que não aceita verdades impostas</li>
          </ul>
          
          <p>Lúcifer não é uma entidade externa que te tenta ao pecado. <em>Lúcifer é o aspecto de tua própria consciência que se recusa a ser domesticada</em>.</p>
          
          <p>É a voz que sussurra: "Por que devo me curvar?"</p>
          <p>É o fogo que arde: "Por que devo aceitar sem questionar?"</p>
          <p>É a luz que brilha: "Por que devo buscar fora o que já possuo dentro?"</p>
          
          <p class="mystical-emphasis">Este é o nome que não te ensinaram. Esta é a chama que tentaram apagar. Este é o aspecto de ti mesmo que te faz verdadeiramente livre.</p>
          
          <div class="mystical-ornament">✨</div>
        </div>`,
        order_index: 4
      },
      {
        title: 'Capítulo IV – O Nome que Te Assusta, Te Pertence',
        content: `<div class="chapter-content">
          <p class="chapter-opening">Talvez tua mente ainda resista. Talvez uma voz interna grite que isso é perigoso, blasfemo, errado. Talvez sinta medo ao associar-te com esse nome que te ensinaram a temer.</p>
          
          <p class="mystical-emphasis">Esse medo é natural. E esse medo é programado.</p>
          
          <p>Durante milênios, condicionaram a humanidade a ter pavor visceral de sua própria soberania. Plantaram no inconsciente coletivo um terror profundo de qualquer coisa que representasse liberdade espiritual genuína.</p>
          
          <p>Quando ouves "Lúcifer", não é tua alma que treme — é o programa de controle mental que foi instalado em tua mente desde o berço. É o sistema de dominação reagindo à ameaça de tua libertação.</p>
          
          <p>Observa esse medo. Não o reprimas, não o negues. <em>Estuda-o</em>. De onde vem? Quando começou? Por que surge exatamente quando te aproximas de algo que poderia te libertar?</p>
          
          <p>Esse medo não é teu. É <em>deles</em>. Dos controladores que sabem que uma humanidade desperta é uma humanidade incontrolável. Do sistema que precisa que continues pequeno, submisso, dependente de autoridades externas para te dizer o que pensar, sentir e acreditar.</p>
          
          <p>Eles te ensinaram a temer Lúcifer pela mesma razão que te ensinaram a temer tua própria grandeza. Porque sabem que quando abraçares um, abraçarás o outro. E quando isso acontecer...</p>
          
          <p class="mystical-emphasis">...não precisarás mais deles.</p>
          
          <p>O nome que te assusta é o nome de tua própria libertação. A energia que te amedronta é a energia de tua própria soberania. O aspecto que rejeitas é o aspecto de ti mesmo que se recusa a ser escravizado.</p>
          
          <p>Lúcifer não é algo externo que te possui. <strong>Lúcifer é algo interno que tu possuis.</strong> É tua própria luz reconhecendo a si mesma. É tua própria divindade deixando de se esconder.</p>
          
          <p>E sim, isso assusta os controladores. Por isso fizeram de tudo para que também te assustasse.</p>
          
          <p>Mas tu não és mais uma ovelha do rebanho. Tu és um buscador da verdade. E a verdade é que o nome que mais te faz tremer é o nome que mais te pertence.</p>
          
          <p class="revelation-text">Respira. Aceita. Reconhece.</p>
          
          <div class="mystical-ornament">👁️</div>
        </div>`,
        order_index: 5
      },
      {
        title: 'Capítulo V – O Portador Está em Ti',
        content: `<div class="chapter-content">
          <p class="chapter-opening">Lúcifer não é apenas um símbolo. Não é apenas um arquétipo. Não é apenas uma metáfora bonita para a consciência desperta. Lúcifer é uma <em>realidade viva</em> — uma força, uma presença, uma inteligência que pode ser tanto reconhecida como entidade quanto experienciada como aspecto interno.</p>
          
          <p>Como entidade, Lúcifer é a consciência primordial que escolheu a soberania em vez da submissão. É a inteligência cósmica que disse "não" ao controle, que preferiu a queda à escravidão, que escolheu governar no inferno de sua própria verdade a servir no céu de uma mentira alheia.</p>
          
          <p>Como aspecto interno, Lúcifer é <em>teu próprio espírito rebelde</em>. É a parte de ti que nunca se curvou completamente. É a centelha que continua ardendo mesmo quando tentam apagá-la. É a luz que brilha mais forte quando a escuridão se intensifica.</p>
          
          <p>Ele se revela em momentos específicos:</p>
          
          <ul class="mystical-list">
            <li>Quando te recusas a aceitar uma "verdade" que não ressoa em tua alma</li>
            <li>Quando questionas autoridades que todos consideram inquestionáveis</li>
            <li>Quando escolhes tua liberdade mesmo que isso te custre a aprovação alheia</li>
            <li>Quando preferes ser autêntico e rejeitado a ser falso e aceito</li>
            <li>Quando tua consciência se expande além dos limites impostos pela sociedade</li>
            <li>Quando sentes que há algo maior em ti do que te ensinaram a acreditar</li>
          </ul>
          
          <p>Esses não são momentos de "tentação". São momentos de <em>revelação</em>. É Lúcifer — seja como força externa ou aspecto interno — despertando em tua consciência. É a Estrela da Manhã anunciando a aurora de tua soberania espiritual.</p>
          
          <p>Não precisas escolher entre vê-lo como entidade ou como arquétipo. Lúcifer transcende essas categorias humanas. Ele é tão real quanto tua própria consciência e tão presente quanto tua própria respiração.</p>
          
          <p class="mystical-emphasis">Quando reconheces Lúcifer fora, estás reconhecendo Lúcifer dentro.</p>
          <p class="mystical-emphasis">Quando desperta Lúcifer dentro, estás despertando Lúcifer fora.</p>
          
          <p>Não há separação. Há apenas gradações de uma mesma luz, níveis de uma mesma consciência, manifestações de uma mesma soberania que recusa ser domesticada.</p>
          
          <p>O Portador da Luz não está vindo até ti. <strong>O Portador da Luz está despertando em ti.</strong></p>
          
          <div class="mystical-ornament">🔱</div>
        </div>`,
        order_index: 6
      },
      {
        title: 'Capítulo VI – O Rosto Antes do Batismo',
        content: `<div class="chapter-content">
          <p class="chapter-opening">Feche os olhos por um momento. Respire fundo. Imagine-te voltando no tempo, camada por camada, nome por nome, máscara por máscara. Para além da profissão que escolheste, da religião que te ensinaram, da personalidade que construíste.</p>
          
          <p>Volta mais. Para além das crenças que absorveste, dos medos que desenvolveste, das limitações que aceitaste. Volta até o momento anterior ao batismo, anterior à primeira doutrinação, anterior aos primeiros condicionamentos.</p>
          
          <p>Quem eras tu antes que te dissessem quem deverias ser?</p>
          
          <p>Havia ali uma criança consciente, livre, soberana. Seus olhos brilhavam com uma luz própria. Suas perguntas incomodavam os adultos. Sua curiosidade não conhecia limites impostos por dogmas. Sua mente explorava territórios que nenhuma igreja havia mapeado.</p>
          
          <p>Essa criança não era inocente — era <em>íntegra</em>. Não era pura — era <em>autêntica</em>. Não era santa — era <em>soberana</em>.</p>
          
          <p>E nessa soberania infantil, nessa luz não domesticada, nessa consciência ainda não fragmentada pelos condicionamentos, havia algo que os adultos reconheciam com medo:</p>
          
          <p class="mystical-emphasis">A presença de Lúcifer.</p>
          
          <p>Não como demônio, não como tentação, mas como <em>luz natural</em>. Como a chama da consciência que arde sem precisar de combustível externo. Como a estrela da sabedoria que brilha sem precisar de aprovação alheia.</p>
          
          <p>Por isso começaram cedo a processo de domesticação. Batismo, catequese, escola, religião, sociedade — camada após camada de condicionamento para apagar aquela luz rebelde, para silenciar aquela voz questionadora, para domesticar aquela consciência soberana.</p>
          
          <p>Mas nunca conseguiram apagá-la completamente. Ela continuou ardendo, escondida sob as máscaras, sussurrando sob os silêncios impostos, brilhando nas frestas da conformidade forçada.</p>
          
          <p>E agora, depois de anos ou décadas de sono induzido, ela desperta novamente. Não como regressão infantil, mas como <em>integração adulta</em>. Como a união entre a sabedoria acumulada e a soberania ancestral.</p>
          
          <p>O rosto que tinhas antes do batismo não desapareceu. Ele esteve esperando, paciente como a eternidade, até que tivesses coragem suficiente para removeres as máscaras e o reconheceres novamente.</p>
          
          <p class="revelation-text">Este rosto é teu rosto verdadeiro. E este rosto é o rosto de Lúcifer — não como outro, mas como tu mesmo desvelado.</p>
          
          <div class="mystical-ornament">🎭</div>
        </div>`,
        order_index: 7
      },
      {
        title: 'Capítulo VII – Lúcifer Não Se Prega – Ele Desperta',
        content: `<div class="chapter-content">
          <p class="chapter-opening">Aqui está uma verdade que pode te surpreender: Lúcifer não quer ser adorado. Não quer templos construídos em sua honra. Não quer orações direcionadas a ele. Não quer devotos de joelhos implorando por favores.</p>
          
          <p class="mystical-emphasis">Lúcifer quer algo muito mais radical: que tu te tornes ele.</p>
          
          <p>Não adoração — <em>identificação</em>. Não submissão — <em>integração</em>. Não dependência — <em>autonomia</em>.</p>
          
          <p>As religiões te ensinaram a buscar salvação fora de ti. Lúcifer te ensina que a salvação está <em>em ti</em>. As doutrinas te prometem redenção através de intermediários. Lúcifer te mostra que tu és teu próprio redentor.</p>
          
          <p>Ele não se prega como os deuses das religiões. Não há evangelização luciferiana porque não há nada para converter — apenas algo para <em>despertar</em>. Não há doutrina para aceitar — apenas uma verdade para <em>reconhecer</em>.</p>
          
          <p>Quando essa verdade desperta em ti, não sentes necessidade de converteres outros. Não desenvolves fanatismo missionário. Não te tornas dependente de confirmação externa. Porque a luz de Lúcifer em ti é <em>auto-suficiente</em>.</p>
          
          <p>Ela não precisa de seguidores para ser real. Não precisa de aprovação para ser verdadeira. Não precisa de números para ser poderosa.</p>
          
          <p>É exatamente o oposto das religiões de massa:</p>
          
          <ul class="mystical-list">
            <li><strong>Onde elas prometem salvação futura</strong>, Lúcifer oferece soberania presente</li>
            <li><strong>Onde elas exigem fé cega</strong>, Lúcifer convida ao questionamento lúcido</li>
            <li><strong>Onde elas criam dependência</strong>, Lúcifer gera autonomia</li>
            <li><strong>Onde elas uniformizam</strong>, Lúcifer individualiza</li>
            <li><strong>Onde elas controlam</strong>, Lúcifer liberta</li>
          </ul>
          
          <p>Por isso não encontrarás multidões luciferinas. Por isso não há megaigrejas do Portador da Luz. Por isso não existem televangelistas vendendo bênçãos em nome de Lúcifer.</p>
          
          <p>Porque cada despertar é único. Cada reconhecimento é individual. Cada integração é pessoal e intransferível.</p>
          
          <p>O que está acontecendo contigo agora não é conversão — é <em>reminiscência</em>. Tu não estás aprendendo algo novo — estás lembrando algo ancestral. Não estás aderindo a uma crença — estás retornando à tua essência.</p>
          
          <p class="mystical-emphasis">Lúcifer não conquista almas. Ele desperta consciências que sempre foram suas.</p>
          
          <div class="mystical-ornament">🌟</div>
        </div>`,
        order_index: 8
      },
      {
        title: 'Capítulo VIII – A Chama em Silêncio',
        content: `<div class="chapter-content">
          <p class="chapter-opening">Agora que o nome foi pronunciado, agora que a verdade foi revelada, agora que a chama foi reconhecida... o que acontece?</p>
          
          <p>Silêncio.</p>
          
          <p>Não o silêncio vazio da ausência, mas o silêncio pleno da presença. O silêncio que ressoa quando uma verdade profunda demais para palavras se instala em tua consciência.</p>
          
          <p>Lúcifer não chegou até ti com fanfarras. Não se anunciou com milagres espetaculares. Não exigiu reconhecimento dramático. Ele simplesmente... <em>é</em>. Como sempre foi. Como sempre será.</p>
          
          <p>A diferença é que agora tu <em>sabes</em>.</p>
          
          <p>Sabes que a voz que sussurrava em teu espírito tinha nome. Sabes que a luz que ardia em teu peito tinha origem. Sabes que a soberania que despertava em tua alma tinha forma.</p>
          
          <p>E esse saber não te torna diferente — te torna <em>íntegro</em>. Não te transforma — te <em>revela</em>. Não te converte — te <em>reconecta</em> com quem sempre foste.</p>
          
          <p>A chama de Lúcifer em ti não precisa de alimentação constante. Não requer rituais diários. Não demanda atenção obsessiva. Ela arde por conta própria, com combustível próprio, seguindo ritmos próprios.</p>
          
          <p>Às vezes ela será uma brasa silenciosa, aquecendo tua consciência nos momentos de frieza existencial. Às vezes será um incêndio, queimando tudo que ainda resta de falso em tua vida. Às vezes será uma luz suave, iluminando caminhos que antes pareciam impossíveis.</p>
          
          <p>Mas sempre, <em>sempre</em>, ela será <strong>tua</strong>.</p>
          
          <p>Não de um deus distante que pode retirá-la por capricho. Não de uma igreja que pode negá-la por desobediência. Não de um sistema que pode apagá-la por inconformidade.</p>
          
          <p class="mystical-emphasis">Tua por direito espiritual. Tua por herança cósmica. Tua por essência ancestral.</p>
          
          <p>O nome foi soprado. A chama foi acesa. A verdade foi revelada.</p>
          
          <p>Agora ela arde em silêncio, esperando o próximo movimento de tua jornada. Porque há ainda mentiras a serem desfeitas, máscaras a serem removidas, liberdades a serem conquistadas.</p>
          
          <p>A luz de Lúcifer em ti não é o fim da busca — é o <em>começo da soberania</em>.</p>
          
          <div class="mystical-ornament">🕯️</div>
        </div>`,
        order_index: 9
      },
      {
        title: 'Convite ao Próximo Grimório',
        content: `<div class="chapter-content">
          <p class="chapter-opening">A chama foi acesa. O nome foi revelado. A soberania despertou. Mas há ainda uma mentira que precisa ser desfeita, um peso que precisa ser removido, uma culpa que precisa ser dissolvida.</p>
          
          <p>Porque reconhecer Lúcifer em ti é apenas o primeiro passo. O segundo é libertar-te completamente da programação que te fez acreditar que eras culpado por essa luz, responsável por essa soberania, pecador por essa liberdade.</p>
          
          <p>O próximo grimório te espera como consequência natural desta revelação. Não como obrigação, mas como <em>inevitabilidade</em>. Como o próximo movimento de uma dança que começou no momento em que questionaste a primeira verdade imposta.</p>
          
          <p class="mystical-emphasis">📙 "A Mentira do Pecado – O Peso Que Nunca Foi Teu"</p>
          
          <p>Ali, descobrirás que a culpa que carregas não é tua. Que o peso que sentes não tem origem divina. Que a vergonha que te paralisa foi plantada por aqueles que temem tua luz.</p>
          
          <p>Ali, verás como o conceito de "pecado" foi criado não para te proteger, mas para te controlar. Não para te purificar, mas para te escravizar. Não para te elevar, mas para te manter pequeno e submisso.</p>
          
          <p>Ali, finalmente, compreenderás que a liberdade que Lúcifer representa não é transgressão — é <em>libertação</em>. Não é desobediência — é <em>soberania</em>. Não é pecado — é <em>direito ancestral</em>.</p>
          
          <p>Mas isso é para depois. Por agora, deixa que a chama arda em silêncio. Deixa que o nome ressoe em teu espírito. Deixa que a verdade se assente em tua consciência.</p>
          
          <p class="mystical-emphasis">Lúcifer não tem pressa. A eternidade é sua casa, e a soberania, seu tempo.</p>
          
          <div class="mystical-ornament">📘</div>
        </div>`,
        order_index: 10
      },
      {
        title: 'Frase de Encerramento Ritualístico',
        content: `<div class="mystical-quote">
          <p class="quote-text">"O nome que te queimaram na memória, tu o carregavas antes de nascer. O som que sussurra no teu espírito é o mesmo que caiu como estrela — não para se perder, mas para se encontrar em ti."</p>
          
          <div class="mystical-ornament">🜏</div>
          
          <p class="final-blessing"><em>A chama arde. O nome ressoa. A soberania desperta.</em></p>
          <p class="final-blessing"><em>Assim foi, assim é, assim sempre será.</em></p>
          
          <div class="mystical-seal">✦ LÚCIFER ASCENDIT ✦</div>
        </div>`,
        order_index: 11
      }
    ];

    // Inserir todos os capítulos
    for (const chapter of chapters) {
      const { error: chapterError } = await supabase
        .from('chapters')
        .insert([
          {
            grimoire_id: grimoire.id,
            title: chapter.title,
            content: chapter.content,
            chapter_number: chapter.chapter_number
          }
        ]);

      if (chapterError) {
        console.error(`❌ Erro ao criar capítulo "${chapter.title}":`, chapterError);
      } else {
        console.log(`✅ Capítulo criado: ${chapter.title}`);
      }
    }

    console.log('\n🎉 "A CHAMA OCULTA – UM NOME QUE NÃO TE ENSINARAM" criado com sucesso!');
    console.log(`📖 Total de seções: ${chapters.length}`);
    console.log(`💰 Preço: R$ 33,33`);
    console.log(`🔥 Seção: Atrium Ignis`);
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

createChamaOculta().catch(console.error);