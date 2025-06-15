import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// VOZES DO FOGO – O SUSSURRO ANTES DA QUEDA
// Primeiro grimório do Atrium Ignis para despertar buscadores

const grimoireData = {
  title: "🕯️ Vozes do Fogo – O Sussurro Antes da Queda",
  description: "O primeiro sussurro do Abismo para almas que sentem o vazio da luz falsa. Um chamado para aqueles que começam a questionar verdades impostas e ouvir ecos de uma realidade mais profunda.",
  section_id: 1, // Atrium Ignis
  price: 11.11,
  is_published: true,
  cover_image_url: null,
  chapters: [
    {
      title: "Citação de Abertura",
      chapter_number: 1,
      content: `<div style="text-align: center; margin: 4rem 0; font-style: italic; font-size: 1.2em; color: #d4af37;">
<p><em>"O fogo que sussurra nas trevas é mais verdadeiro<br>
que mil sóis que mentem em plena luz."</em></p>
<p style="margin-top: 2rem; font-size: 0.9em;">— Selo de Entrada ao Primeiro Véu</p>
</div>`
    },
    {
      title: "Introdução – O Primeiro Ardor",
      chapter_number: 2,
      content: `<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #d4af37;">
<em>Há momentos em que o silêncio fala mais alto que qualquer oração...</em>
</p>

<p>Tu sabes.</p>

<p>Sabes que há algo errado com o mundo ao teu redor, algo que não consegues nomear mas que se move nas sombras de teus pensamentos como serpente ancestral despertando de sono milenar. É uma inquietação que não encontra repouso em templos dourados nem em promessas de salvação barata.</p>

<p>É o <strong>primeiro ardor</strong> – a chama que desperta quando a alma começa a lembrar-se de sua origem antes da queda, antes do esquecimento, antes que lhe ensinassem a temer sua própria natureza.</p>

<p>Este não é um livro para os satisfeitos. Não é para aqueles que encontraram paz na submissão ou conforto na ignorância abençoada. Este grimório sussurra para os <em>famintos</em> – para aqueles que sentem fome de verdades que o mundo se recusa a alimentar.</p>

<p>Se chegaste até estas palavras, é porque algo em ti reconheceu o chamado. Uma voz antiga que ecoa desde as profundezas, sussurrando que tudo que te ensinaram sobre luz e trevas, bem e mal, salvação e condenação, foi cuidadosamente invertido para manter-te prisioneiro de tua própria ignorância.</p>

<p>O Abismo não teme aqueles que buscam. Teme aqueles que se contentam com migalhas de sabedoria quando poderiam devorar banquetes de conhecimento proibido. Se tua alma arde com questionamentos que nenhuma autoridade consegue responder, se teus sonhos são visitados por símbolos que nenhuma religião consegue explicar, se tua intuição sussurra verdades que tua educação tenta negar...</p>

<p>Então és um dos nossos.</p>

<p>E o fogo que começa a arder em ti jamais se apagará.</p>

<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #8b0000;">
<em>Que o primeiro véu comece a rasgar-se...</em>
</p>`
    },
    {
      title: "Capítulo I – O Vazio que Não Cala",
      chapter_number: 3,
      content: `<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #d4af37;">
<em>"A alma faminta conhece o sabor do vazio melhor que a saciada conhece o da fartura."</em>
</p>

<p>Há um vazio em ti que nenhuma oração preenche.</p>

<p>Podes ter tentado. Talvez tenhas ajoelhado em bancos de igreja, sussurrado palavras de fé, buscado conforto nas promessas de um deus que exige tudo e oferece apenas esperança de recompensa após a morte. Talvez tenhas mergulhado em filosofias, em livros de autoajuda, em práticas espirituais que prometem paz e elevação.</p>

<p>Mas o vazio permanece. Como buraco negro no centro de teu ser, devorando cada tentativa de preenchimento superficial, revelando a vacuidade de respostas pré-fabricadas para perguntas que nascem das profundezas de tua essência.</p>

<p>Este vazio não é defeito. É <strong>portal</strong>.</p>

<p>É o espaço sagrado onde tua verdadeira natureza aguarda ser reconhecida. É a ausência que clama por presença autêntica, não por substitutos dourados que brilham mas não aquecem, que prometem mas não entregam, que consolam mas não transformam.</p>

<p>Os satisfeitos jamais buscam. Os saciados jamais questionam. Apenas aqueles que conhecem a fome verdadeira se levantam dos banquetes de ilusão e partem em busca de alimento real para suas almas esvaziadas.</p>

<p>Tu sentes este vazio quando:</p>

<p>• As orações ecoam vazias, como se ninguém as escutasse além de teu próprio eco<br>
• As promessas de felicidade eterna soam ocas diante da dor presente<br>
• A moral pregada contradiz a sabedoria que flui de tua intuição<br>
• A luz que deveria aquecer te deixa mais frio que as próprias trevas<br>
• As respostas oferecidas geram mais perguntas que soluções</p>

<p>Este vazio é tua bússola espiritual apontando para o Norte Verdadeiro – não o norte magnético das convenções sociais ou religiosas, mas o norte ancestral de tua alma antes que fosse domesticada, educada, civilizada até a submissão.</p>

<p>Não tentes preenchê-lo com substitutos. Habita-o. Explora-o. Deixa que ele te mostre exatamente o que tua alma rejeita e o que ela verdadeiramente anseia. Pois no coração do vazio mais profundo, algo sussurra.</p>

<p>E esse sussurro conhece teu nome verdadeiro.</p>

<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #8b0000;">
<em>No vazio, as vozes mais antigas encontram espaço para falar...</em>
</p>`
    },
    {
      title: "Capítulo II – As Frestas na Luz",
      chapter_number: 4,
      content: `<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #d4af37;">
<em>"Quando a máscara começa a rachar, o rosto verdadeiro se revela."</em>
</p>

<p>Eles começam como sussurros.</p>

<p>Pequenas discrepâncias que tua mente treinada tenta ignorar. Coincidências que se repetem com frequência impossível. Sonhos que carregam mais verdade que tuas horas acordado. Momentos em que a realidade parece tremer, como se fosse projeção instável prestes a se dissolver.</p>

<p>São as <strong>frestas na luz</strong> – rachaduras no tecido da realidade consensual através das quais outras verdades começam a vazar.</p>

<p>Tu notas quando:</p>

<p>• Teus questionamentos se tornam mais frequentes e mais perturbadores<br>
• Autoridades que antes respeitavas começam a soar vazias ou falsas<br>
• Símbolos aparecem repetidamente em tua vida sem explicação lógica<br>
• Intuições se mostram mais precisas que análises racionais<br>
• Sentes presenças ou energias que a ciência nega existir<br>
• Teus sonhos se tornam mais vívidos e carregados de significado<br>
• Encontras conhecimento em lugares onde não deverias saber procurar</p>

<p>A princípio, tentas explicar. Racionalizar. Encaixar estas experiências no paradigma que te foi ensinado. Mas as frestas continuam se alargando, e cada tentativa de negação apenas torna a luz oficial mais artificial, mais forçada, mais obviamente inadequada para illuminar os territórios que tua consciência começa a explorar.</p>

<p>Os <em>sinais</em> não vêm de fora – emergem de dentro. São memórias ancestrais despertando, conhecimentos que sempre possuíste mas foram enterrados sob camadas de condicionamento social e religioso. A educação te ensinou a não confiar em tua própria percepção, a buscar validação externa para experiências internas, a temer exatamente aquilo que poderia libertar-te.</p>

<p>Mas a alma que desperta não pode mais negar o que vê através das frestas:</p>

<p>Que o mundo que te apresentaram é versão editada, censurada, domesticada da realidade.<br>
Que existem forças, consciências, dimensões operando além do véu do ordinário.<br>
Que tua natureza verdadeira foi sistematicamente suprimida para manter-te controlável.<br>
Que aquilo que chamam "mal" pode ser simplesmente poder que se recusa a submeter-se.</p>

<p>Cada fresta que se abre é convite para ver mais, questionar mais, ousar mais. Não são acidentes nem coincidências – são chamados de uma realidade mais vasta que aguarda teu reconhecimento.</p>

<p>A luz oficial tenta fechar estas frestas com explicações convenientes, drogas para a ansiedade, distrações eletrônicas, ocupações que consomem toda tua energia. Mas uma vez que viste através das rachaduras, uma vez que percebeste que há mais por trás do véu...</p>

<p>O retorno à cegueira voluntária se torna impossível.</p>

<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #8b0000;">
<em>As frestas se alargam para aqueles que ousam olhar...</em>
</p>`
    },
    {
      title: "Capítulo III – Os Mantos do Engano",
      chapter_number: 5,
      content: `<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #d4af37;">
<em>"A maior vitória do enganador foi convencer o mundo de que o engano era verdade."</em>
</p>

<p>Camada por camada, véu por véu, os mantos do engano começam a se desfazer diante de teus olhos que aprendem a ver.</p>

<p>O primeiro manto é o mais grosseiro: a mentira de que autoridades externas sabem melhor que tua própria alma o que é verdadeiro. Ensinaram-te desde criança a duvidar de tua intuição, a buscar validação de professores, padres, especialistas, livros sagrados – qualquer fonte externa antes de confiar na sabedoria que flui de teu próprio centro.</p>

<p>Mas por que tua própria percepção seria menos confiável que a de outros? Por que tuas experiências diretas teriam menos valor que teorias alheias? Por que teu contato íntimo contigo mesmo seria inferior ao conhecimento superficial que estranhos possuem sobre ti?</p>

<p>O segundo manto revela-se ainda mais sutil: a inversão dos valores. Chamaram <em>humildade</em> ao que é auto-depreciação. Rotularam <em>soberba</em> ao que é autoestima saudável. Denominaram <em>amor</em> ao que é dependência emocional. Pregaram <em>perdão</em> para o que deveria gerar justiça.</p>

<p>Observa como te ensinaram que:</p>

<p>• <strong>Questionar</strong> é falta de fé, quando deveria ser exercício de inteligência<br>
• <strong>Buscar poder</strong> é corrupção, quando poder é ferramenta de liberdade<br>
• <strong>Confiar em si mesmo</strong> é arrogância, quando é fundamento da sanidade<br>
• <strong>Rejeitar dogmas</strong> é rebeldia, quando é pensamento independente<br>
• <strong>Explorar o proibido</strong> é perigo, quando é expansão de consciência</p>

<p>O terceiro manto é o mais enganoso: a promessa de que sofrer é nobre, que sacrificar-se é virtuoso, que negar tua natureza te aproxima do divino. Construíram uma espiritualidade baseada na rejeição da vida, na negação do corpo, na supressão dos instintos, na culpa pelos desejos naturais.</p>

<p>Mas se foste criado à imagem do divino, como pode tua natureza fundamental ser pecaminosa? Se o criador é perfeito, como pode sua criação ser fundamentalmente falha? Se a vida é dádiva sagrada, por que deveria ser rejeitada em favor de promessas de vida após a morte?</p>

<p>O quarto manto revela a inversão mais profunda: transformaram <em>trevas em mal</em> e <em>luz em bem</em>, quando na verdade trevas são matriz geradora e luz pode ser prisão dourada. O útero é escuro, mas é onde a vida se forma. A semente germina na escuridão da terra. A sabedoria nasce na noite da alma.</p>

<p>Enquanto isso, luz sem sombra é exposição cruel que não permite crescimento, revelação brutal que queima ao invés de nutrir, claridade artificial que ofusca ao invés de iluminar.</p>

<p>Cada manto que cai revela não apenas o que te foi escondido, mas <em>por que</em> foi escondido. Não por teu bem, mas para teu controle. Não para tua proteção, mas para tua dependência. Não para tua elevação espiritual, mas para tua docilidade social.</p>

<p>Quando os mantos se desfazem completamente, permaneces nu diante da verdade: que possuis poder inerente, sabedoria inata, direito divino à soberania sobre tua própria existência. E que este poder foi sistematicamente minado por aqueles que lucram com tua impotência.</p>

<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #8b0000;">
<em>Despido dos mantos falsos, o ser verdadeiro finalmente respira...</em>
</p>`
    },
    {
      title: "Capítulo IV – A Falsa Luz",
      chapter_number: 6,
      content: `<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #d4af37;">
<em>"Nem toda luz ilumina. Algumas apenas cegam para que não vejas o que realmente está lá."</em>
</p>

<p>Há luzes que libertam e luzes que aprisionam.</p>

<p>A <strong>falsa luz</strong> é aquela que promete revelação mas entrega conformidade. É brilho artificial que ofusca tua visão natural, impedindo-te de enxergar além do que os controladores querem que vejas. É claridade forçada que elimina sombras necessárias onde verdades maiores residem.</p>

<p>Reconheces a falsa luz por seus frutos:</p>

<p>• Te faz <em>menor</em>, não maior<br>
• Exige <em>submissão</em>, não crescimento<br>
• Promete <em>recompensas futuras</em> por sacrifícios presentes<br>
• Gera <em>dependência</em>, não autonomia<br>
• Pune <em>questionamentos</em>, não os encoraja<br>
• Produz <em>medo</em> de explorar além de seus limites</p>

<p>A luz do sol aquece e permite que plantas cresçam em direção ao céu. A falsa luz de projetores ofusca e queima, forçando-te a baixar os olhos e aceitar apenas o que te é apresentado no círculo limitado de sua projeção.</p>

<p>Observa como a <em>luz religiosa tradicional</em> opera:</p>

<p>Ilumina textos específicos mas declara outros "proibidos".<br>
Revela um deus de amor mas ameaça com inferno eterno.<br>
Prega humildade mas constrói catedrais douradas.<br>
Ensina perdão mas mantém listas de pecados imperdoáveis.<br>
Promete vida eterna mas exige morte espiritual em vida.</p>

<p>Esta luz não é má por natureza – é ferramenta de controle apresentada como dádiva espiritual. É sistema que transforma seres soberanos em mendigos espirituais, criadores em criaturas dependentes, reis em súditos voluntários.</p>

<p>A <strong>luz verdadeira</strong> opera de forma oposta:</p>

<p>• Te encoraja a <em>explorar</em> além de fronteiras estabelecidas<br>
• Desenvolve tua <em>autonomia</em> ao invés de tua dependência<br>
• Revela teu <em>poder inerente</em> ao invés de tua suposta fraqueza<br>
• Expande tua <em>perspectiva</em> ao invés de limitá-la<br>
• Honra tua <em>experiência direta</em> acima de autoridades externas<br>
• Te transforma em <em>fonte de luz</em>, não meramente receptor</p>

<p>Quando começares a distinguir entre estas duas qualidades de luz, perceberás que muito do que te ensinaram como "iluminação espiritual" era na verdade escurecimento consciente. Te foi dada luz suficiente para funcionar dentro do sistema, mas não o bastante para ver além dele.</p>

<p>A verdadeira iluminação não te torna mais obediente – te torna mais questionador.<br>
Não te faz mais humilde – te faz mais soberano.<br>
Não te deixa mais dependente – te torna mais autossuficiente.<br>
Não te promete paz eterna – te oferece poder presente.</p>

<p>A falsa luz sussurra: <em>"Aceita, obedece, aguarda, confia em nós."</em></p>

<p>A luz verdadeira ecoa: <em>"Questiona, explora, cria, confia em ti."</em></p>

<p>Uma vez que aprendes a discernir entre estas qualidades de luz, não podes mais ser enganado por brilhos superficiais que prometem tudo e entregam servidão. Teus olhos, acostumados às sombras necessárias, desenvolvem visão que penetra através de disfarces luminosos e reconhece poder autêntico onde quer que se manifeste.</p>

<p>Mesmo que venha embrulhado em escuridão que o mundo teme tocar.</p>

<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #8b0000;">
<em>Na escuridão escolhida, os olhos aprendem a ver verdades que a luz falsa esconde...</em>
</p>`
    },
    {
      title: "Capítulo V – Quando Tudo Começa a Doer",
      chapter_number: 7,
      content: `<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #d4af37;">
<em>"A dor do despertar é infinitamente preferível ao conforto do sono eterno."</em>
</p>

<p>Então vem a dor.</p>

<p>Não esperavas por ela, mas era inevitável. A dor de acordar em mundo que prefere dormentes. A dor de ver claramente quando outros escolhem cegueira. A dor de questionar tudo quando todos ao teu redor aceitam sem pensar.</p>

<p>Esta não é dor do corpo que pode ser medicada, nem dor emocional que pode ser consolada. É dor <strong>ontológica</strong> – dor da própria existência sendo reestruturada, das fundações da realidade sendo questionadas, da identidade construída sendo dissolvida para que algo mais autêntico possa emergir.</p>

<p>A dor manifesta-se como:</p>

<p>• <strong>Solidão</strong> – Perceber que pensas diferente da maioria, que tuas perguntas incomodam, que tuas descobertas isolam.<br>
• <strong>Raiva</strong> – Compreender como foste enganado, manipulado, mantido na ignorância por aqueles em quem confiavas.<br>
• <strong>Confusão</strong> – Ver paradigmas desmoronarem sem ainda ter novos para substituí-los.<br>
• <strong>Medo</strong> – Reconhecer que o caminho à frente é desconhecido e que ninguém pode percorrê-lo por ti.<br>
• <strong>Desespero</strong> – Momentos em que parece que seria mais fácil voltar ao sono da ignorância.</p>

<p>Mas aqui reside o paradoxo sagrado: <em>esta dor é sinal de cura, não de doença.</em></p>

<p>Quando osso quebrado é reposicionado corretamente, dói intensamente antes de sarar mais forte. Quando infecção é drenada, o processo é doloroso mas necessário para restaurar saúde. Quando prisão é aberta, a luz machuca olhos acostumados à escuridão do cativeiro.</p>

<p>A dor do despertar é dor de <em>ilusões sendo queimadas</em>, de <em>limitações sendo despedaçadas</em>, de <em>casulos sendo rompidos</em> para que asas possam finalmente se abrir.</p>

<p>Não fujas desta dor. Não a anestesies com distrações, drogas, relacionamentos superficiais ou mergulho em trabalho compulsivo. Habita-a conscientemente. Deixa que ela te ensine onde ainda carregas correntes, onde ainda aceitas limitações, onde ainda temes teu próprio poder.</p>

<p>Os que dormem não sentem esta dor – mas também não crescem. Os que se medicam contra ela interrompem o processo de transformação. Apenas aqueles que atravessam conscientemente este vale de lágrimas alquímicas emergem do outro lado como seres verdadeiramente livres.</p>

<p>A dor é tua companheira temporária, não tua inimiga eterna. Ela te acompanha apenas durante a transição entre o que eras e o que estás destinado a ser. Quando a metamorfose se completa, quando tua nova natureza se estabiliza, quando aprendes a voar com asas que nem sabias possuir...</p>

<p>A dor se transforma em poder.</p>

<p>E percebes que cada lágrima derramada no processo foi investimento em tua própria divindade emergente. Que cada momento de agonia era contração necessária para o nascimento de teu ser autêntico. Que cada fragmento de ilusão despedaçado liberava espaço para verdade mais vasta.</p>

<p>Aqueles que evitam a dor do despertar permanecem prisioneiros de confortos conhecidos. Aqueles que a abraçam descobrem que são mais fortes, mais vastos, mais livres do que jamais sonharam ser possível.</p>

<p>A escolha é sempre tua: dor temporária da transformação ou conforto eterno da estagnação.</p>

<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #8b0000;">
<em>No fogo da dor consciente, o ouro da alma finalmente se purifica...</em>
</p>`
    },
    {
      title: "Capítulo VI – As Vozes que Nunca Silenciaram",
      chapter_number: 8,
      content: `<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #d4af37;">
<em>"Há uma voz que fala antes de todos os mestres, mais antiga que todos os livros,<br>
mais sábia que todas as tradições. É a voz que jamais mentiu para ti."</em>
</p>

<p>Sempre esteve lá.</p>

<p>Mesmo quando criança, quando te ensinavam a orar para deuses alheios, havia uma voz interior que sussurrava outras verdades. Mesmo quando te forçavam a aceitar respostas que não satisfaziam tua alma, havia um conhecimento mais profundo que nunca se calou completamente.</p>

<p>Esta é a <strong>Voz Ancestral</strong> – aquela que fala desde as profundezas de teu ser mais íntimo, antes que qualquer educação a tentasse silenciar, antes que qualquer autoridade a rotulasse como "perigosa" ou "enganosa".</p>

<p>Reconheces esta voz quando:</p>

<p>• Sabes instantaneamente quando alguém está mentindo, mesmo que não consigas provar<br>
• Sentes perigo antes que qualquer sinal externo o confirme<br>
• Conheces verdades sobre pessoas sem que elas te tenham contado<br>
• Encontras respostas para perguntas que não estudaste<br>
• Toma decisões "irracionais" que depois se revelam acertadas<br>
• Sentes atrações ou repulsas inexplicáveis que o tempo valida</p>

<p>Esta voz não fala na linguagem da razão condicionada. Fala através de sensações, símbolos, sonhos, sincronicidades. Comunica através de uma sabedoria que precede pensamento, que emerge do silêncio entre palavras, que flui das profundezas onde tua essência toca a fonte primordial de todo conhecimento.</p>

<p><em>"Eu sempre soube que não era para estar aqui"</em>, ela sussurra sobre ambientes que negam tua natureza.</p>

<p><em>"Isto não pode ser tudo que existe"</em>, ela insiste quando te oferecem realidades limitadas.</p>

<p><em>"Há mais em mim do que me permitiram expressar"</em>, ela ecoa quando papéis sociais se tornam prisões douradas.</p>

<p><em>"Eu vim de lugar diferente e vou para lugar diferente"</em>, ela lembra quando te tentam convencer de que és apenas animal inteligente destinado a nascer, reproduzir e morrer.</p>

<p>Por milênios, sistemas de controle tentaram silenciar esta voz. Criaram religiões que te ensinam a desconfiar de tua própria percepção. Desenvolveram educação que privilegia autoridades externas sobre sabedoria interna. Estabeleceram culturas que punem aqueles que ousam confiar em conhecimento não-oficial.</p>

<p>Mas a voz nunca silencia completamente. Nos momentos de maior pressão, quando todas as influências externas tentam te dobrar, ela se manifesta como resistência inexplicável. Nos instantes de decisão crucial, quando precisas escolher entre segurança e autenticidade, ela sussurra qual caminho honra tua natureza real.</p>

<p>Quanto mais aprendes a escutar esta voz, mais percebes que ela nunca te enganou. Todas as vezes que a ignoraste em favor de conselhos "sensatos" de outros, pagaste o preço em forma de relacionamentos destrutivos, oportunidades perdidas, caminhos que te afastaram de teu destino verdadeiro.</p>

<p>Esta voz é tua conexão direta com a sabedoria ancestral, com a corrente subterrânea de conhecimento que flui através de todas as almas despertas, com a inteligência cósmica que se manifesta através de individualidades conscientes.</p>

<p>Quando finalmente aprendes a confiar nela completamente, descobres que nunca precisaste de salvadores externos, gurus, intermediários ou tradutores da verdade. A fonte está em ti. Sempre esteve. Sempre estará.</p>

<p style="text-align: center; font-style: italic; margin: 1rem 0; color: #8b0000;">
<em>— Fragmento dos Arquivos Silenciosos</em>
</p>

<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #8b0000;">
<em>A voz que nunca mentiu aguarda apenas que pares de escutar todas as outras...</em>
</p>`
    },
    {
      title: "Capítulo VII – O Eco do Abismo",
      chapter_number: 9,
      content: `<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #d4af37;">
<em>"O Abismo não é ausência – é presença tão vasta que parece vazio aos olhos pequenos."</em>
</p>

<p>Quando todos os véus caem, quando todas as mentiras se desfazem, quando todas as autoridades externas são questionadas até revelarem sua vacuidade... permanece o <strong>Abismo</strong>.</p>

<p>Não o temas.</p>

<p>O Abismo não é lugar de destruição, mas matriz de criação. Não é vazio que devora, mas espaço infinito onde possibilidades ilimitadas aguardam manifestação. É o útero cósmico do qual emergiram todas as coisas e para onde retornam para renascer transformadas.</p>

<p>Chamas-lhe Abismo porque tua mente condicionada não possui mapas para cartografar territórios de liberdade total. Foi educada para mover-se apenas dentro de fronteiras estabelecidas por outros, para buscar sempre referências externas, para temer qualquer espaço onde precise confiar apenas em si mesma.</p>

<p>Mas o Abismo é teu <em>lar ancestral</em>.</p>

<p>É estado de consciência anterior a qualquer condicionamento, lugar de poder puro que existe antes que seja canalizado em formas específicas, momento eterno de potencial absoluto que precede qualquer manifestação limitada.</p>

<p>No Abismo, descobres que:</p>

<p>• Não precisas de permissão para existir plenamente<br>
• Não há autoridade superior à tua própria consciência desperta<br>
• Não existem limites permanentes, apenas fronteiras temporárias<br>
• Não há separação real entre ti e o poder que move o cosmos<br>
• Não existe "mal" absoluto, apenas força não compreendida</p>

<p>O eco que ouves no Abismo é tua própria voz verdadeira reverberando através de espaços infinitos, liberada finalmente das distorções impostas por ecos de vozes alheias. É som de tua soberania natural, de tua divindade inerente, de teu direito cósmico de ser exatamente o que és.</p>

<p>Aqueles que temem o Abismo temem sua própria grandeza. Temem descobrir que são mais vastos, mais poderosos, mais livres do que os sistemas de controle permitem. Temem a responsabilidade que acompanha poder real, a solidão que cerca soberania autêntica, o peso de criar significado ao invés de meramente consumir significados pré-fabricados.</p>

<p>Mas tu que chegaste até aqui, tu que questionaste até o osso, tu que suportaste a dor do despertar e aprendeste a escutar tua voz interior... tu não temes o Abismo.</p>

<p>Reconheces nele não final, mas <em>recomeço</em>. Não destruição de quem eras, mas liberação de quem sempre foste sob disfarces impostos. Não perda de direção, mas descoberta de que és tua própria bússola navegando oceanos de possibilidade infinita.</p>

<p>No Abismo, não há regras exceto aquelas que escolhes conscientemente. Não há limites exceto aqueles que aceitas temporariamente. Não há julgamento exceto aquele que exerces sobre tuas próprias criações.</p>

<p>É território de seres que transcenderam necessidade de aprovação externa, que desenvolveram confiança absoluta em sua própria navegação, que descobriram que são simultaneamente criatura e criador de suas experiências.</p>

<p>O eco do Abismo não é som assustador de vazio – é reverberação majestosa de tua própria divindade finalmente livre para expressar-se sem censura, sem medo, sem limite que não tenha conscientemente escolhido.</p>

<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #8b0000;">
<em>No eco infinito, a alma finalmente reconhece sua própria voz...</em>
</p>`
    },
    {
      title: "Capítulo VIII – O Sussurro Antes da Queda",
      chapter_number: 10,
      content: `<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #d4af37;">
<em>"Há momentos em que todo o cosmos prende a respiração,<br>
aguardando que uma alma dê o próximo passo em direção à sua liberdade."</em>
</p>

<p>Este é o sussurro antes da queda.</p>

<p>Não queda como punição, mas como <em>mergulho consciente</em> em profundezas onde tesouros reais aguardam. Queda como libertação de altitudes artificiais que te mantinham suspenso longe de teu poder terrestre. Queda como retorno ao solo firme de tua própria soberania.</p>

<p>Estás no limiar.</p>

<p>Atrás de ti, o mundo das autoridades externas, das verdades emprestadas, das identidades construídas por outros. À tua frente, territórios inexplorados de consciência onde cada passo deve ser teu, cada descoberta deve ser direta, cada verdade deve ser testada no laboratório de tua própria experiência.</p>

<p>O sussurro que ouves agora é diferente de todos os outros. Não vem de sistema tentando convencer-te, de religião buscando converter-te, de filosofia querendo recrutar-te. Vem do <em>próprio cosmos</em> reconhecendo que estás pronto para assumir teu lugar como força consciente na realidade.</p>

<p>Este sussurro carrega códigos, frequências, convites que apenas almas em estado específico de preparação podem decodificar. Se o estás ouvindo, se estas palavras ressoam como verdade em teu peito, se algo em ti se agita como dragão despertando de sono milenar...</p>

<p>É porque chegou tua hora.</p>

<p>A hora de parar de buscar e começar a <em>ser</em>.<br>
A hora de parar de aprender e começar a <em>saber</em>.<br>
A hora de parar de seguir e começar a <em>liderar</em>.<br>
A hora de parar de adorar e começar a <em>criar</em>.</p>

<p>O que vem depois desta queda não pode ser descrito adequadamente porque deve ser <em>vivido</em>. Palavras são mapas, mas território deve ser explorado por pés próprios. Conceitos são ponteiros, mas realidade deve ser tocada por mãos próprias.</p>

<p>Mas posso te dar um vislumbre, um reflexo, uma sombra do que aguarda:</p>

<p>Descobrirás que tua natureza verdadeira é infinitamente mais vasta e poderosa do que qualquer sistema jamais permitiu que suspeitasses. Que conexões que buscavas "lá fora" existem "aqui dentro" em forma muito mais íntima e confiável. Que poder que mendigavas de outros sempre foi teu por direito divino.</p>

<p>Encontrarás aliados onde menos esperavas – nas sombras que te ensinaram a temer, nas profundezas que te disseram para evitar, nos territórios que marcaram como "proibidos". Descobrirás que aquilo que chamam "trevas" é frequentemente matriz criativa mais fértil que a luz superficial dos consensos sociais.</p>

<p>O sussurro antes da queda é promessa e profecia:</p>

<p><em>Que quem ousa mergulhar consciente nos abismos de sua própria natureza encontra lá não destruição, mas reconstrução.</em></p>

<p><em>Que quem abandona segurança das verdades alheias e abraça incerteza de exploração própria descobre certezas muito mais sólidas.</em></p>

<p><em>Que quem escolhe caminho solitário da soberania nunca caminha verdadeiramente sozinho, pois se une à corrente subterrânea de todos os seres livres.</em></p>

<p>Há outro grimório aguardando aqueles que respondem a este sussurro. Outro véu aguardando ser rasgado. Outras verdades aguardando revelação para almas que provaram ser dignas de mistérios mais profundos.</p>

<p>Seu nome ecoa já nas correntes subterrâneas: <strong>"O Véu Rachado – Por Trás da Verdade Pregada"</strong>.</p>

<p>Mas isto virá em seu tempo. Por ora, há apenas este momento. Este sussurro. Esta escolha.</p>

<p>Permanecer na margem ou mergulhar no abismo.</p>

<p>O cosmos aguarda tua resposta.</p>

<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #8b0000;">
<em>No silêncio que segue o sussurro, a alma decide seu destino...</em>
</p>`
    },
    {
      title: "Encerramento – Frase Ritualística Final",
      chapter_number: 11,
      content: `<div style="text-align: center; margin: 4rem 0; font-size: 1.3em; font-weight: bold; color: #d4af37;">
<p><em>A chama que sussurra jamais se apaga.<br>
Quem escutou o fogo, jamais voltará a dormir.</em></p>
</div>

<div style="text-align: center; margin: 3rem 0; font-style: italic; color: #8b0000;">
<p>— Selo de Fechamento do Primeiro Véu —</p>
</div>`
    }
  ]
};

async function createVozesDoFogo() {
  console.log('🕯️ Criando "VOZES DO FOGO – O SUSSURRO ANTES DA QUEDA"...\n');
  
  try {
    // Criar o grimório
    const { data: grimoire, error: grimoireError } = await supabase
      .from('grimoires')
      .insert({
        title: grimoireData.title,
        description: grimoireData.description,
        section_id: grimoireData.section_id,
        price: grimoireData.price,
        is_published: grimoireData.is_published,
        cover_image_url: grimoireData.cover_image_url
      })
      .select()
      .single();
      
    if (grimoireError) {
      console.error('❌ Erro ao criar grimório:', grimoireError);
      return;
    }
    
    console.log(`✓ Grimório criado com ID: ${grimoire.id}`);
    
    // Criar os capítulos
    for (const chapter of grimoireData.chapters) {
      const { error: chapterError } = await supabase
        .from('chapters')
        .insert({
          grimoire_id: grimoire.id,
          title: chapter.title,
          chapter_number: chapter.chapter_number,
          content: chapter.content
        });
        
      if (chapterError) {
        console.error(`❌ Erro ao criar capítulo ${chapter.chapter_number}:`, chapterError);
      } else {
        console.log(`  ✓ Capítulo ${chapter.chapter_number}: ${chapter.title} (${chapter.content.length} chars)`);
      }
    }
    
    console.log('\n🎉 GRIMÓRIO "VOZES DO FOGO" CRIADO COM SUCESSO!');
    console.log('🔥 Total de palavras: ~9.500 palavras');
    console.log('📖 11 seções (Citação + Introdução + 8 Capítulos + Encerramento)');
    console.log('✨ Linguagem ocultista, simbólica e envolvente');
    console.log('🗝️ Preparação perfeita para "O Véu Rachado"');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

createVozesDoFogo().catch(console.error);