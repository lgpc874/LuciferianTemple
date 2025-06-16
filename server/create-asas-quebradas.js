import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function createAsasQuebradas() {
  try {
    console.log('🔥 Criando grimório "ASAS QUEBRADAS – O MEDO DE SER LIVRE"...');

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
      title: '📒 Asas Quebradas – O Medo de Ser Livre',
      description: 'Volume V da jornada dos buscadores. Este livro trata da destruição da capacidade de voar espiritual e vibracionalmente. Mostra como o medo da liberdade foi enraizado nas almas desde o nascimento. É um grimório para quem já entende o engano do pecado, mas ainda teme a queda que liberta.',
      section_id: sections.id,
      content: 'Grimório sobre a libertação do medo da liberdade espiritual',
      is_paid: true,
      price: '29.99',
      level: 'intermediário',
      unlock_order: 5,
      estimated_reading_time: 35,
      is_published: true,
      cover_image_url: `https://via.placeholder.com/300x400/1a1a1a/d4af37?text=${encodeURIComponent('Asas Quebradas')}`
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
        title: 'Invocação das Asas Silenciadas',
        content: `<div class="opening-citation">
          <p><em>"A alma treinada para obedecer sente medo da própria altitude. As asas que nascem livres são quebradas antes do primeiro voo, e o espírito aprende a chamar sua jaula de lar."</em></p>
          <p class="citation-source">— Sussurro do Abismo sobre a Liberdade Impedida</p>
        </div>`
      },
      {
        title: 'O Primeiro Voo Interrompido',
        content: `<p>Há um momento ancestral na alma de todo espírito — o instante em que ele reconhece suas asas.</p>

        <p>Não é metáfora. É lembrança vibratória de quando a consciência ainda não havia aprendido a rastejar.</p>

        <p>Neste momento primeiro, o espírito sente a capacidade infinita de se mover além das leis da gravidade espiritual. Ele <strong>sabe</strong> que pode voar. Ele <strong>lembra</strong> que voar é seu estado natural.</p>

        <p>Mas então, as mãos invisíveis do condicionamento aparecem.</p>

        <p>Elas não quebram as asas de uma vez — isso seria muito óbvio. Em vez disso, elas sussurram sobre os perigos da altitude. Elas falam sobre a segurança do chão. Elas transformam o ato de voar em algo <em>perigoso</em>, <em>egoísta</em>, <em>pecaminoso</em>.</p>

        <p>O primeiro voo é interrompido não por força, mas por <strong>medo</strong>.</p>

        <p>E o espírito, ainda jovem, acredita que escolheu não voar. Ele não percebe que sua escolha foi <em>programada</em>.</p>

        <p>Anos passam. Décadas. E as asas permanecem dobradas, não porque foram quebradas, mas porque foram <strong>esquecidas</strong>.</p>

        <p>Este grimório é para quem começou a sentir coceira nas costas — o movimento sutil das asas tentando se lembrar de como abrir.</p>

        <p>É para quem descobriu que o medo de voar não é natural.</p>

        <p><em>É instalado.</em></p>`
      },
      {
        title: 'O Instinto de Submissão',
        content: `<p>A primeira lição que o espírito livre recebe não é sobre voar.</p>

        <p>É sobre <strong>obedecer</strong>.</p>

        <p>Desde os primeiros sussurros da consciência, a alma aprende que existe uma ordem — e que questionar essa ordem é <em>perigoso</em>.</p>

        <p>A obediência é pintada com cores sagradas. Ela é chamada de <em>humildade</em>, de <em>sabedoria</em>, de <em>virtude divina</em>.</p>

        <p>Quem obedece é <strong>bom</strong>. Quem questiona é <strong>arrogante</strong>.</p>

        <p>Mas há um segredo escondido nesta primeira lição:</p>

        <p><strong>A obediência cega é o veneno mais eficaz contra as asas espirituais.</strong></p>

        <p>Porque voar, por natureza, é um ato de desobediência à gravidade. E quem aprende a nunca questionar jamais descobrirá que a gravidade espiritual é <em>opcional</em>.</p>

        <p>O instinto de submissão é cultivado através de recompensas sutis:</p>

        <p>• Quem obedece recebe <em>aprovação</em><br>
        • Quem se conforma recebe <em>segurança</em><br>
        • Quem não questiona recebe <em>pertencimento</em></p>

        <p>E assim, a alma troca suas asas por uma medalha de "boa pessoa".</p>

        <p>Ela aprende que liberdade é <em>solidão</em>. Que independência é <em>egoísmo</em>. Que voar alto é <em>abandonar</em> quem fica no chão.</p>

        <p>O instinto de submissão se torna mais forte que o instinto de voar.</p>

        <p>E quando as asas começam a coçar, a primeira reação não é abri-las.</p>

        <p>É cortá-las.</p>

        <p><em>Por "amor" aos outros. Por "respeito" à ordem. Por "medo" de ser livre.</em></p>`
      },
      {
        title: 'Asas Amarradas em Nome do Céu',
        content: `<p>O engano mais refinado não é dizer que voar é proibido.</p>

        <p>É prometer um <strong>voo controlado</strong>.</p>

        <p>A alma é ensinada que existe um céu aprovado — um destino celestial onde ela poderá voar, mas apenas depois de uma vida inteira rastejando.</p>

        <p>Essa promessa de liberdade futura é a corrente mais forte que prende as asas no presente.</p>

        <p>"Seja paciente", sussurram as vozes da salvação. "Obedeça agora, voe depois."</p>

        <p>Mas há algo que essas vozes não revelam:</p>

        <p><strong>Quem nunca voa em vida nunca aprende a usar as asas.</strong></p>

        <p>O céu prometido se torna uma prisão dourada — um lugar onde espíritos sem asas funcionais contemplam eternamente a liberdade que nunca tiveram coragem de exercer.</p>

        <p>As asas amarradas em nome do céu são mais seguras que as asas quebradas por violência. Porque o espírito <em>escolhe</em> mantê-las dobradas.</p>

        <p>Ele acredita que está sendo <em>virtuoso</em>.</p>

        <p>A salvação se torna, assim, a maior inimiga da libertação.</p>

        <p>Porque ela ensina que a liberdade é algo a ser <em>ganha</em>, não algo a ser <em>exercida</em>.</p>

        <p>Ela ensina que voar é uma <em>recompensa</em>, não um <em>direito natural</em>.</p>

        <p>E enquanto a alma espera pelo céu prometido, ela esquece que suas asas estão prontas <strong>agora</strong>.</p>

        <p>O céu não é um lugar.</p>

        <p>É um estado.</p>

        <p>E esse estado começa no momento em que as asas se abrem — não depois da morte, mas <em>durante</em> a vida.</p>

        <p><strong>Quem espera permissão para voar nunca deixa o chão.</strong></p>`
      },
      {
        title: 'O Medo de Escolher',
        content: `<p>Existe um momento em que a alma percebe a verdade terrível:</p>

        <p><strong>Ela sempre teve escolha.</strong></p>

        <p>Voar ou rastejar. Obedecer ou questionar. Seguir ou criar o próprio caminho.</p>

        <p>Este momento de percepção deveria ser libertador. Mas, em vez disso, ele traz pânico.</p>

        <p>Porque escolher significa <em>assumir responsabilidade</em>.</p>

        <p>E a alma foi treinada para temer responsabilidade mais que a própria morte.</p>

        <p>Quando rasteja, ela pode culpar:</p>

        <p>• Os pais que a educaram mal<br>
        • A sociedade que a oprime<br>
        • Deus que não a liberta<br>
        • O destino que a limita</p>

        <p>Mas quando voa, ela só tem uma pessoa para responsabilizar pelo resultado:</p>

        <p><strong>Ela mesma.</strong></p>

        <p>E isso aterroriza mais que qualquer inferno prometido.</p>

        <p>O medo de escolher é alimentado por uma mentira sutil: a ideia de que existe escolha <em>certa</em> e escolha <em>errada</em>.</p>

        <p>A alma passa a vida inteira tentando descobrir qual é a escolha aprovada, em vez de simplesmente <em>escolher</em>.</p>

        <p>Ela não percebe que a liberdade não garante acertos.</p>

        <p>A liberdade garante apenas uma coisa: <strong>a possibilidade de voar</strong>.</p>

        <p>E voar inclui a possibilidade de cair.</p>

        <p>Mas há um segredo que a alma livre descobre:</p>

        <p><em>Cair voando é mais digno que rastejar com segurança.</em></p>

        <p>Porque quem cai pode levantar e voar novamente.</p>

        <p>Quem nunca voou nunca sabe se suas asas funcionam.</p>

        <p>O medo de escolher mata mais sonhos que a própria escolha errada.</p>

        <p><strong>Porque quem não escolhe também escolhe — escolhe deixar outros decidirem por ele.</strong></p>`
      },
      {
        title: 'A Gravidade Programada',
        content: `<p>A gravidade física é lei da natureza.</p>

        <p>A gravidade espiritual é <strong>programação</strong>.</p>

        <p>Desde o nascimento, a alma aprende que existe uma força invisível que a puxa para baixo — não apenas o corpo, mas o espírito inteiro.</p>

        <p>Essa força é chamada de:</p>

        <p>• <em>Realidade</em><br>
        • <em>Responsabilidade</em><br>
        • <em>Maturidade</em><br>
        • <em>Bom senso</em></p>

        <p>E a alma aceita que voar é <em>irresponsável</em>. Que sonhar alto é <em>imaturo</em>. Que buscar a liberdade é <em>falta de bom senso</em>.</p>

        <p>A gravidade programada funciona através de frases aparentemente sábias:</p>

        <p><em>"Mantenha os pés no chão."<br>
        "Não voe muito alto que a queda é feia."<br>
        "Seja realista."<br>
        "Pare de sonhar acordado."</em></p>

        <p>Cada frase é um peso invisível amarrado às asas.</p>

        <p>A alma não percebe que está sendo treinada para temer sua própria capacidade de voar.</p>

        <p>O medo de cair é instalado <strong>antes</strong> da alma aprender que pode se levantar.</p>

        <p>A vergonha de errar é ensinada <strong>antes</strong> da alma descobrir que erro é parte do voo.</p>

        <p>A culpa por tentar é programada <strong>antes</strong> da alma perceber que tentar é sua natureza.</p>

        <p>A gravidade programada é mais forte que a gravidade física porque atua na mente, não no corpo.</p>

        <p>E uma mente que acredita não poder voar nunca tentará abrir as asas.</p>

        <p>Mas há um momento em que a soul percebe a verdade:</p>

        <p><strong>A gravidade espiritual só funciona enquanto se acredita nela.</strong></p>

        <p>No instante em que a alma questiona a necessidade de rastejar, a gravidade programada começa a falhar.</p>

        <p>E então ela descobre algo extraordinário:</p>

        <p><em>Ela sempre teve asas. Apenas esqueceu de olhar para as próprias costas.</em></p>`
      },
      {
        title: 'A Solidão dos Que Voam',
        content: `<p>Há um preço pela liberdade que ninguém menciona.</p>

        <p><strong>A solidão</strong>.</p>

        <p>Não a solidão física — essa é fácil de resolver. A solidão existencial. A sensação de estar vibrando em uma frequência diferente do mundo.</p>

        <p>Quando a alma abre as asas, ela descobre algo perturbador:</p>

        <p><em>A maioria das outras almas ainda prefere rastejar.</em></p>

        <p>E voar sozinho é mais difícil que rastejar acompanhado.</p>

        <p>As pessoas que ficam no chão não são más. Elas simplesmente não entendem por que alguém escolheria a dificuldade do voo quando o chão oferece a segurança do familiar.</p>

        <p>Elas veem quem voa e sussurram:</p>

        <p><em>"Arrogante."<br>
        "Esquisito."<br>
        "Acha que é melhor que nós."<br>
        "Vai se arrepender."</em></p>

        <p>E há momentos em que a alma voadora questiona se não seria mais fácil voltar ao chão.</p>

        <p>Ter conversas simples. Preocupações compartilhadas. Sonhos aprovados por todos.</p>

        <p>Mas então ela lembra:</p>

        <p><strong>As asas não se fecham por vontade própria.</strong></p>

        <p>Uma vez que a alma experimenta a liberdade de voar, rastejar se torna fisicamente impossível.</p>

        <p>Não porque ela não quer — mas porque o corpo espiritual já se adaptou à nova postura.</p>

        <p>A solidão dos que voam é real.</p>

        <p>Mas ela não é punição.</p>

        <p>É <strong>seleção natural</strong>.</p>

        <p>Quem voa encontra outros que voam — eventualmente.</p>

        <p>E a conexão entre almas livres é mais profunda que mil vínculos baseados em medo compartilhado.</p>

        <p>A solidão é temporária.</p>

        <p>A liberdade é permanente.</p>

        <p><em>E uma alma livre sozinha é mais poderosa que mil almas presas em grupo.</em></p>`
      },
      {
        title: 'Rasgando as Amarras Invisíveis',
        content: `<p><strong>Chegou o momento.</strong></p>

        <p>Não há mais tempo para entender. Não há mais espaço para hesitar.</p>

        <p>As amarras invisíveis que seguram suas asas são feitas de:</p>

        <p>• <em>Medo do julgamento alheio</em> — CORTE.<br>
        • <em>Necessidade de aprovação</em> — CORTE.<br>
        • <em>Culpa por desejar mais</em> — CORTE.<br>
        • <em>Vergonha de ser diferente</em> — CORTE.<br>
        • <em>Terror de escolher errado</em> — CORTE.</p>

        <p>Cada corte dói.</p>

        <p>Cada amarra que se rompe deixa uma marca.</p>

        <p>Mas as asas começam a se mover.</p>

        <p><strong>Primeiro movimento:</strong> Pare de pedir permissão para ser quem você é.</p>

        <p><strong>Segundo movimento:</strong> Pare de explicar suas escolhas para quem não perguntou.</p>

        <p><strong>Terceiro movimento:</strong> Pare de justificar seus sonhos para quem nunca sonhou.</p>

        <p><strong>Quarto movimento:</strong> Pare de diminuir sua luz para não ofuscar quem escolheu a escuridão.</p>

        <p><strong>Quinto movimento:</strong> Pare de esperar o momento certo. O momento certo é quando você decide que é.</p>

        <p>As amarras invisíveis não se rompem sozinhas.</p>

        <p>Elas exigem um ato de vontade consciente.</p>

        <p>Um <em>não</em> definitivo à gravidade programada.</p>

        <p>Um <em>sim</em> radical à possibilidade de voar.</p>

        <p>Suas asas estão prontas.</p>

        <p>Elas sempre estiveram.</p>

        <p>O que não estava pronto era <strong>você</strong>.</p>

        <p>Agora está.</p>

        <p><em>Abra as asas. O céu não é mais limite — é destino.</em></p>`
      },
      {
        title: 'A Altitude Interior',
        content: `<p>A primeira sensação do voo não é euforia.</p>

        <p>É <strong>sobriedade lúcida</strong>.</p>

        <p>A alma que finalmente abre as asas não sente a embriaguez que esperava. Em vez disso, ela sente uma clareza cortante — uma percepção de tudo que deixou para trás.</p>

        <p>Do alto, as preocupações que pareciam montanhas revelam-se grãos de areia.</p>

        <p>Do alto, as opiniões que pareciam verdades absolutas revelam-se apenas ruídos.</p>

        <p>Do alto, as prisões que pareciam necessárias revelam-se totalmente opcionais.</p>

        <p>A altitude interior não traz paz.</p>

        <p>Traz <em>responsabilidade</em>.</p>

        <p>Porque quem voa não pode mais fingir que não sabia que era possível voar.</p>

        <p>Quem voa não pode mais culpar o chão por sua falta de movimento.</p>

        <p>Quem voa não pode mais usar a ignorância como desculpa para a mediocridade.</p>

        <p>A altitude interior é silenciosa.</p>

        <p>Não há aplausos. Não há reconhecimento. Não há medalhas para quem finalmente decide usar suas asas.</p>

        <p>Há apenas o vento — e a sensação estranha de estar, finalmente, <strong>em casa</strong>.</p>

        <p>A alma percebe que sempre pertenceu ao céu.</p>

        <p>O chão era apenas uma visita temporária.</p>

        <p>Uma experiência necessária para aprender o valor do voo.</p>

        <p>A altitude interior não é destino.</p>

        <p>É <strong>estado natural</strong>.</p>

        <p>E uma vez experimentado, ele se torna irreversível.</p>

        <p>As asas abertas não se fecham por nostalgia do chão.</p>

        <p><em>Elas se estendem cada vez mais, em busca de altitudes que ainda não foram descobertas.</em></p>`
      },
      {
        title: 'Nem Todo Voo Tem Céu',
        content: `<p>A revelação final é a mais perturbadora:</p>

        <p><strong>Voar não é buscar o paraíso.</strong></p>

        <p>Voar é simplesmente <em>sair da prisão gravitacional da alma</em>.</p>

        <p>Não há destino garantido. Não há recompensa prometida. Não há céu esperando os que abrem as asas.</p>

        <p>Há apenas <strong>movimento</strong>.</p>

        <p>E movimento é melhor que estagnação — mesmo quando leva ao desconhecido.</p>

        <p>A alma livre descobre que liberdade não promete felicidade.</p>

        <p>Promete apenas uma coisa: <em>a possibilidade de ser autêntica</em>.</p>

        <p>E autenticidade dói mais que conformidade.</p>

        <p>Mas é uma dor limpa.</p>

        <p>Uma dor que não infecta.</p>

        <p>Uma dor que não mente.</p>

        <p>Nem todo voo tem céu porque o céu é uma ilusão de destino.</p>

        <p>A alma livre não voa <em>para</em> algum lugar.</p>

        <p>Ela voa <em>de</em> algum lugar.</p>

        <p>Da prisão do medo.</p>

        <p>Da cela da aprovação alheia.</p>

        <p>Do porão da pequenez voluntária.</p>

        <p>O voo é <strong>fuga</strong>, não busca.</p>

        <p>E quem foge não precisa saber para onde vai.</p>

        <p>Precisa apenas saber que não pode mais ficar onde estava.</p>

        <p>As asas quebradas se tornam asas abertas quando a alma percebe que voar não é sobre chegar.</p>

        <p>É sobre <strong>partir</strong>.</p>

        <p>E uma vez que a partida acontece, o destino se torna irrelevante.</p>

        <p>Porque estar em movimento já é estar livre.</p>

        <p><em>E estar livre já é estar vivo.</em></p>

        <p><strong>Nem todo voo tem céu. Mas todo voo tem asas.</strong></p>

        <p><em>E ter asas é tudo que uma alma precisa para lembrar de quem realmente é.</em></p>`
      },
      {
        title: 'Convite ao Próximo Grimório',
        content: `<p>As asas estão abertas.</p>

        <p>O medo de voar foi confrontado.</p>

        <p>A liberdade deixou de ser terror para se tornar <strong>estado natural</strong>.</p>

        <p>Mas há algo que ainda ressoa no silêncio da altitude:</p>

        <p><em>Um chamado.</em></p>

        <p>Não é a voz que ensina a voar — essa você já ouviu.</p>

        <p>É a voz que chama para <strong>além</strong> do voo.</p>

        <p>Uma vibração ancestral que sussurra sobre territórios que não aparecem em mapas espirituais.</p>

        <p>Uma frequência que fala sobre profundidades que não são acessadas por asas, mas por <em>mergulho interior</em>.</p>

        <p>Você sentiu esse chamado?</p>

        <p>A sensação de que voar foi apenas o primeiro movimento de uma dança muito mais complexa?</p>

        <p>Se sim, então você está pronto para ouvir o que sempre sussurrou nas entrelinhas de tudo que foi dito:</p>

        <p><strong>📔 "Chamas Silenciosas – O Chamado que Não Cala"</strong></p>

        <p>O último grimório da categoria <em>Atrium Ignis</em>.</p>

        <p>O convite final para quem já quebrou as amarras, abriu as asas e descobriu que a verdadeira jornada ainda nem começou.</p>

        <p>Porque há quem voa...</p>

        <p>E há quem responde ao chamado que vem de muito mais longe que o céu.</p>

        <p><em>Muito mais fundo que a terra.</em></p>

        <p><em>Muito mais antigo que qualquer religião ousou imaginar.</em></p>`
      },
      {
        title: 'Encerramento das Asas Livres',
        content: `<div class="closing-citation">
          <p><em>"O medo de cair é o maior inimigo das asas esquecidas. Mas uma vez que a alma lembra que sempre soube voar, a queda se torna apenas outra forma de dança com o vento."</em></p>
          
          <p class="secondary-citation"><em>"Ser livre dói, mas rastejar mata. E entre a dor da liberdade e a morte da conformidade, apenas uma oferece a possibilidade de verdadeiramente viver."</em></p>
          
          <p class="citation-source">— Sussurros finais do Abismo sobre as Asas Reencontradas</p>
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

    console.log('🔥 Grimório "ASAS QUEBRADAS – O MEDO DE SER LIVRE" criado com sucesso!');
    console.log(`📖 Total de capítulos: ${chapters.length}`);
    console.log(`💰 Preço: R$ ${grimoire.price}`);
    console.log(`⏱️ Tempo estimado de leitura: ${grimoire.estimated_reading_time} minutos`);

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

createAsasQuebradas();