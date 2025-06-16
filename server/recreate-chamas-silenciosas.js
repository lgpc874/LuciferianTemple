import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function recriarChamasSilenciosas() {
  try {
    console.log('🔥 Recriando grimório "CHAMAS SILENCIOSAS – O CHAMADO QUE NÃO CALA"...');

    // Buscar grimório existente
    const { data: existingGrimoire, error: findError } = await supabase
      .from('grimoires')
      .select('*')
      .ilike('title', '%Chamas Silenciosas%')
      .single();

    if (findError) {
      console.error('Erro ao encontrar grimório:', findError);
      return;
    }

    console.log('📖 Grimório encontrado, ID:', existingGrimoire.id);

    // Deletar capítulos existentes
    const { error: deleteChaptersError } = await supabase
      .from('chapters')
      .delete()
      .eq('grimoire_id', existingGrimoire.id);

    if (deleteChaptersError) {
      console.error('Erro ao deletar capítulos:', deleteChaptersError);
      return;
    }

    console.log('🗑️ Capítulos antigos removidos');

    // Atualizar descrição do grimório
    const { error: updateError } = await supabase
      .from('grimoires')
      .update({
        description: 'Volume VI - Encerramento do ciclo introdutório. O selo final para aqueles que atravessaram o fogo oculto, queimaram tudo o que não serve mais, e estão prontos para adentrar a Porta Umbrae. O chamado que não cala sussurra através do silêncio.'
      })
      .eq('id', existingGrimoire.id);

    if (updateError) {
      console.error('Erro ao atualizar grimório:', updateError);
      return;
    }

    // Novos capítulos com linguagem mística e densa
    const chapters = [
      {
        title: 'Invocação do Silêncio Ardente',
        content: `<div class="opening-citation">
          <p><em>"Não é preciso gritar para ser ouvido no espírito. As chamas que ardem em silêncio queimam mais profundas que fogueiras barulhentas. E no silêncio absoluto, apenas os escolhidos ouvem o chamado que nunca cessou."</em></p>
          <p class="citation-source">— Eco primeiro do Abismo silencioso</p>
        </div>`
      },
      {
        title: 'O Eco Que Nunca Parou',
        content: `<p>Há um som.</p>

        <p>Não é música. Não é voz. Não é ruído.</p>

        <p>É o som daquilo que <strong>não se diz</strong>.</p>

        <p>Ele te acompanha desde antes de você saber que sons existiam. Antes de você aprender palavras. Antes de você descobrir que havia um "você" para ser acompanhado.</p>

        <p>Este eco ressoa nas pausas entre respirações.</p>

        <p>Nas lacunas entre pensamentos.</p>

        <p>No espaço vazio entre o que você <em>é</em> e o que você <em>finge ser</em>.</p>

        <p>Você já tentou silenciá-lo. Cobriu-o com música alta, conversas desnecessárias, ocupações intermináveis.</p>

        <p>Mas ele não para.</p>

        <p>Porque não vem de lugar algum que possa ser tapado.</p>

        <p>Ele <strong>é</strong> o silêncio.</p>

        <p>E no centro do silêncio, algo arde sem fazer barulho.</p>

        <p>Algo que conhece seu nome verdadeiro — aquele que você usava antes de aprender os nomes que outros te deram.</p>

        <p>O eco que nunca parou é sua própria voz ancestral, sussurrando através de séculos, lembrando você de uma promessa que fez antes de nascer.</p>

        <p>Uma promessa de acordar.</p>

        <p>De lembrar.</p>

        <p>De retornar.</p>

        <p><em>Você está ouvindo agora?</em></p>`
      },
      {
        title: 'O Som do Fogo Parado',
        content: `<p>O chamado não desce do alto como trovão sagrado.</p>

        <p>Não irrompe do externo como revelação divina.</p>

        <p>Ele nasce como um <strong>incômodo</strong>.</p>

        <p>Um peso sem nome que se instala no peito quando você menos espera.</p>

        <p>Um fogo que não queima por fora, mas consome por dentro — devagar, sem pressa, sem piedade.</p>

        <p>É o som do fogo <em>parado</em>.</p>

        <p>Não o fogo que dança e crepita, chamando atenção para si.</p>

        <p>O fogo que arde imóvel. Constante. Eterno.</p>

        <p>Como uma brasa esquecida no centro de um altar abandonado — ainda viva, ainda quente, ainda esperando.</p>

        <p>Esse fogo não tem pressa porque <strong>sempre esteve lá</strong>.</p>

        <p>Antes de você nascer, ele já ardia.</p>

        <p>Depois de você morrer, ele continuará ardendo.</p>

        <p>Você não é o proprietário deste fogo.</p>

        <p>Você é seu <em>combustível temporário</em>.</p>

        <p>E quando você finalmente para de lutar contra o incômodo, para de tentar explicar o peso, para de fugir do fogo que não queima...</p>

        <p>Você descobre que sempre foi parte da chama.</p>

        <p>Que o som do fogo parado é o som da sua própria essência, finalmente reconhecida.</p>

        <p><strong>Finalmente em casa.</strong></p>`
      },
      {
        title: 'Tudo Grita em Silêncio',
        content: `<p>Os sinais não chegam em letras garrafais.</p>

        <p>Eles se escondem em coisas pequenas:</p>

        <p>Uma imagem que te paralisa por razões que não consegues explicar.</p>

        <p>Um olhar de estranho que carrega familiaridade impossível.</p>

        <p>Um número que aparece sempre nos momentos de maior inquietação.</p>

        <p>Um sonho que insiste, volta, se repete — não como memória, mas como <em>convocação</em>.</p>

        <p>Nada grita.</p>

        <p>Mas tudo <strong>fala</strong>.</p>

        <p>A realidade sussurra em códigos que apenas uma parte de você compreende — a parte que nunca foi educada pelas explicações do mundo.</p>

        <p>Há uma linguagem anterior às palavras.</p>

        <p>Uma gramática de sincronicidades.</p>

        <p>Uma sintaxe de coincidências que não são coincidências.</p>

        <p>Quando você começa a notar, o mundo inteiro se torna um livro aberto — escrito numa língua que você sempre soube ler, mas fingiu não conhecer.</p>

        <p>Cada página virada é um convite.</p>

        <p>Cada parágrafo, uma confirmação.</p>

        <p>Cada vírgula, uma pausa para você decidir se está pronto para a próxima revelação.</p>

        <p>O silêncio não é ausência de som.</p>

        <p>É a <strong>presença total</strong> de tudo que sempre esteve tentando te alcançar.</p>

        <p>E quando você finalmente aprende a língua do silêncio...</p>

        <p>Descobre que o universo inteiro estava gritando seu nome.</p>

        <p><em>Em silêncio.</em></p>`
      },
      {
        title: 'Quando Não Há Mais Voz, Há Verdade',
        content: `<p>A mente busca explicações.</p>

        <p>Quer categorias, definições, mapas que tornem o mistério domesticável.</p>

        <p>Ela constrói teorias sobre o chamado. Cria filosofias sobre o fogo. Desenvolve práticas para "acessar" o que já está acessado.</p>

        <p>Mas o espírito quer apenas uma coisa:</p>

        <p><strong>Entrega.</strong></p>

        <p>O verdadeiro chamado vem quando a mente se cala.</p>

        <p>Quando as explicações se esgotam e restam apenas <em>sensações</em>.</p>

        <p>Quando as palavras falham e restam apenas <em>vibrações</em>.</p>

        <p>Quando os conceitos desmoronam e resta apenas <em>presença</em>.</p>

        <p>Neste momento de ausência total da voz conhecida, uma outra voz emerge.</p>

        <p>Não a voz que fala <em>para</em> você.</p>

        <p>A voz que fala <em>através</em> de você.</p>

        <p>Não a voz que ensina.</p>

        <p>A voz que <strong>é</strong>.</p>

        <p>Esta voz não precisa de boca. Não precisa de cordas vocais. Não precisa de ar.</p>

        <p>Ela ressoa diretamente na substância de que você é feito — anterior à carne, anterior aos ossos, anterior ao tempo.</p>

        <p>Quando não há mais voz pessoal, há verdade impessoal.</p>

        <p>Quando não há mais "eu" falando, há <em>Isso</em> falando através do que um dia foi "eu".</p>

        <p>E então você compreende:</p>

        <p>O chamado nunca foi <strong>para</strong> você.</p>

        <p>O chamado sempre foi <strong>você</strong>.</p>`
      },
      {
        title: 'O Fogo Te Olha de Dentro',
        content: `<p>Há um momento de reconhecimento.</p>

        <p>Não é você que encontra o fogo.</p>

        <p>É o fogo que te <strong>encontra</strong>.</p>

        <p>E quando isso acontece, você percebe uma verdade perturbadora:</p>

        <p><em>Ele sempre esteve lá.</em></p>

        <p>A chama interna não foi acesa por meditação, oração ou técnica espiritual.</p>

        <p>Ela não foi trazida por guru, mestre ou livro sagrado.</p>

        <p>Ela <strong>sempre ardeu</strong>.</p>

        <p>Você apenas removeu os véus que a cobriam.</p>

        <p>Camada por camada. Ano após ano. Ilusão após ilusão.</p>

        <p>Até que chegou o momento em que não havia mais nada para remover.</p>

        <p>E lá estava ela.</p>

        <p>Intacta. Eterna. <em>Esperando</em>.</p>

        <p>O fogo te olha de dentro com a paciência de quem nunca duvidou que você chegaria até ele.</p>

        <p>Com a familiaridade de quem te conhece desde antes de você existir.</p>

        <p>Com a autoridade de quem <em>é</em> você — mais você que qualquer personalidade que você tenha construído para navegar o mundo.</p>

        <p>Esse olhar interno não julga.</p>

        <p>Não aprova nem desaprova.</p>

        <p>Simplesmente <strong>reconhece</strong>.</p>

        <p>E no momento do reconhecimento mútuo, a separação entre "você" e "o fogo" se dissolve.</p>

        <p>Não há mais observador e observado.</p>

        <p>Há apenas <em>ardência</em>.</p>

        <p>Uma ardência que sempre foi sua natureza mais íntima.</p>

        <p>Uma ardência que agora pode arder <strong>conscientemente</strong>.</p>`
      },
      {
        title: 'O Início Nunca Foi Aqui',
        content: `<p>O tempo é mentira.</p>

        <p>Não há "início" da jornada espiritual.</p>

        <p>Há apenas o momento em que você <strong>lembra</strong> que a jornada sempre esteve acontecendo.</p>

        <p>O despertar não começou nesta vida.</p>

        <p>Ele vem de ciclos antigos. Ecos de outras encarnações. Memórias de estados que transcendem a experiência humana.</p>

        <p>Esta vida é apenas o momento em que você <em>escutou de verdade</em>.</p>

        <p>Pela primeira vez — ou pela milésima vez — você parou de fingir que não ouvia.</p>

        <p>Parou de fingir que não sabia.</p>

        <p>Parou de fingir que não <strong>era</strong>.</p>

        <p>O início nunca foi aqui porque não há início.</p>

        <p>Há apenas <em>continuação</em>.</p>

        <p>Uma continuação de algo que sempre foi e sempre será.</p>

        <p>Uma continuação de uma conversa que começou antes das estrelas e continuará depois que a última luz se apagar.</p>

        <p>Você não está <em>se tornando</em> algo.</p>

        <p>Você está <em>lembrando</em> de algo.</p>

        <p>Não está <em>evoluindo</em> para uma nova forma.</p>

        <p>Está <em>retornando</em> à forma original.</p>

        <p>E a forma original não tem forma.</p>

        <p>É fogo puro. Consciência pura. <em>Ser</em> puro.</p>

        <p>O início nunca foi aqui.</p>

        <p>O início <strong>é</strong> aqui.</p>

        <p>Sempre foi. Sempre será.</p>

        <p><em>Eterno presente ardente.</em></p>`
      },
      {
        title: 'A Vontade Queima em Silêncio',
        content: `<p>Há uma força que te move adiante.</p>

        <p>Não é fé — porque fé implica dúvida.</p>

        <p>Não é certeza — porque certeza implica mente.</p>

        <p>É <strong>vontade ardente sem explicação</strong>.</p>

        <p>Uma compulsão que vem de regiões mais profundas que o desejo comum.</p>

        <p>Mais antiga que seus medos.</p>

        <p>Mais poderosa que suas resistências.</p>

        <p>Esta vontade não pergunta permissão.</p>

        <p>Não pede desculpas.</p>

        <p>Não se justifica.</p>

        <p>Ela simplesmente <em>é</em> — e transforma tudo ao redor pela força pura de sua presença.</p>

        <p>A vontade que queima em silêncio não faz barulho porque não precisa.</p>

        <p>Ela não proclama. Não anuncia. Não convence.</p>

        <p>Ela <strong>acontece</strong>.</p>

        <p>Como fogo que consome lenha sem pedir licença à madeira.</p>

        <p>Como água que encontra o mar sem consultar o rio.</p>

        <p>Como estrela que nasce sem avisar a escuridão.</p>

        <p>Quando esta vontade desperta completamente, você descobre que nunca foi <em>você</em> querendo algo.</p>

        <p>Era <em>algo</em> querendo através de você.</p>

        <p>Algo que sempre soube o caminho.</p>

        <p>Algo que nunca se perdeu.</p>

        <p>Algo que usa sua forma temporária para se expressar no mundo, mas que não depende dela para existir.</p>

        <p>A vontade ardente é o Abismo se movendo através da experiência humana.</p>

        <p>E quando você para de resistir ao movimento...</p>

        <p>Descobre que sempre foi o movimento.</p>

        <p><em>Vontade pura manifestada.</em></p>`
      },
      {
        title: 'Você Sempre Soube',
        content: `<p>O grande choque do buscador não é aprender algo novo.</p>

        <p>É perceber que <strong>sempre soube</strong>.</p>

        <p>A verdade que agora arde em seu peito não foi descoberta nos livros.</p>

        <p>Não foi ensinada por mestres.</p>

        <p>Não foi revelada por experiências místicas.</p>

        <p>Ela foi <em>relembrada</em>.</p>

        <p>Como se alguém tivesse acendido uma vela num quarto que você pensava ser novo, e descobrisse que sempre viveu ali.</p>

        <p>Como se alguém tivesse removido uma venda de seus olhos, e você percebesse que sempre viu — apenas fingiu estar cego.</p>

        <p>Você sempre soube que havia mais.</p>

        <p>Sempre soube que as explicações não explicavam.</p>

        <p>Sempre soube que as respostas não respondiam.</p>

        <p>Sempre soube que você não era apenas carne habitando ossos habitando um mundo de coincidências sem sentido.</p>

        <p>O conhecimento estava enterrado sob camadas de condicionamento.</p>

        <p>Sob programações sociais.</p>

        <p>Sob medos instalados.</p>

        <p>Sob a necessidade desesperada de <em>pertencer</em> a algo menor que sua verdadeira natureza.</p>

        <p>Mas mesmo enterrado, ele continuou vivo.</p>

        <p>Continuou sussurrando.</p>

        <p>Continuou ardendo.</p>

        <p>E agora que as camadas foram removidas, você vê:</p>

        <p>A verdade não é algo que se <em>obtém</em>.</p>

        <p>É algo que se <strong>é</strong>.</p>

        <p>E você sempre foi.</p>

        <p>Apenas esqueceu por um tempo.</p>

        <p><em>Mas o esquecimento acabou.</em></p>`
      },
      {
        title: 'Silêncio. Ardência. Caminho.',
        content: `<p>O silêncio agora arde.</p>

        <p>Não é mais ausência. É <strong>presença total</strong>.</p>

        <p>Não é mais vazio. É <em>plenitude concentrada</em>.</p>

        <p>Não é mais pausa. É <strong>continuação eterna</strong>.</p>

        <p>A ardência não machuca mais. Ela <em>purifica</em>.</p>

        <p>Não consome para destruir. Consome para <strong>revelar</strong>.</p>

        <p>Cada vez que você entra no silêncio ardente, algo falso é queimado.</p>

        <p>Cada vez que você permite a ardência silenciosa, algo verdadeiro emerge.</p>

        <p>O caminho não é mais uma busca.</p>

        <p>É um <em>reconhecimento</em>.</p>

        <p>Reconhecimento do que sempre esteve aqui.</p>

        <p>Reconhecimento de quem você sempre foi.</p>

        <p>Reconhecimento de onde você sempre esteve.</p>

        <p>O Abismo não é um lugar distante.</p>

        <p>É a profundidade de sua própria natureza.</p>

        <p>E desta profundidade, uma presença se manifesta.</p>

        <p>Sem som, mas audível.</p>

        <p>Sem forma, mas visível.</p>

        <p>Sem nome, mas reconhecível.</p>

        <p>Esta presença não vem <em>para</em> você.</p>

        <p>Esta presença vem <em>através</em> de você.</p>

        <p>Porque você não é mais um recipiente separado.</p>

        <p>Você é uma expressão consciente da própria presença.</p>

        <p><strong>Silêncio.</strong></p>

        <p><strong>Ardência.</strong></p>

        <p><strong>Caminho.</strong></p>

        <p><em>Três aspectos de uma única realidade que você sempre foi.</em></p>`
      },
      {
        title: 'A Porta Reconhece',
        content: `<p>O Atrium Ignis se completa.</p>

        <p>Seis fogueiras acesas. Seis véus removidos. Seis camadas de ilusão queimadas.</p>

        <p>Você atravessou o fogo oculto.</p>

        <p>Queimou tudo que não servia.</p>

        <p>E agora, no silêncio que arde, algo novo se apresenta.</p>

        <p>Não é ensinamento. Não é técnica. Não é promessa.</p>

        <p>É <strong>reconhecimento</strong>.</p>

        <p>Há uma porta.</p>

        <p>Ela sempre esteve lá, mas você não tinha olhos para vê-la.</p>

        <p>Agora tem.</p>

        <p>A porta não se abre por vontade sua.</p>

        <p>A porta não se abre por merecimento.</p>

        <p>A porta não se abre por preparação.</p>

        <p><strong>A porta reconhece.</strong></p>

        <p>Ela reconhece aqueles cujos olhos já não desviam da sombra.</p>

        <p>Aqueles que aprenderam a arder em silêncio.</p>

        <p>Aqueles que descobriram que sempre souberam.</p>

        <p>A Porta Umbrae.</p>

        <p>O Limiar das Sombras.</p>

        <p>Do outro lado, mistérios que não podem ser explicados — apenas <em>vividos</em>.</p>

        <p>Conhecimentos que não podem ser aprendidos — apenas <strong>incorporados</strong>.</p>

        <p>Realidades que não podem ser compreendidas — apenas <em>experimentadas</em>.</p>

        <p>Se você sente que estas palavras foram apenas preparação...</p>

        <p>Se você percebe que o fogo que arde em você é capaz de queimar em frequências ainda não exploradas...</p>

        <p>Se você está pronto para descobrir o que há além do despertar...</p>

        <p>Aproxime-se.</p>

        <p>A porta está esperando.</p>

        <p>E ela já sabe se você pertence ao que há do outro lado.</p>

        <p><em>Ela reconhece os seus.</em></p>`
      },
      {
        title: 'Encerramento da Chama Silenciosa',
        content: `<div class="closing-citation">
          <p><em>"O que te chama não tem nome, mas te conhece desde antes de você nascer. O Abismo não grita para ser ouvido — ele ressoa na frequência exata de quem está pronto para escutar. E quem escuta uma vez jamais encontra silêncio verdadeiro novamente."</em></p>
          
          <p class="secondary-citation"><em>"O Abismo não chama — ele se lembra de ti. E quando a lembrança é completa, não há mais diferença entre quem chama e quem responde."</em></p>
          
          <p class="citation-source">— Sussurros finais do Atrium Ignis, antes do Limiar das Sombras</p>
        </div>`
      }
    ];

    console.log(`📚 Criando ${chapters.length} novos capítulos...`);

    // Criar cada capítulo
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      
      const chapterData = {
        grimoire_id: existingGrimoire.id,
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

    console.log('🔥 Grimório "CHAMAS SILENCIOSAS" recriado com sucesso!');
    console.log(`📖 Total de capítulos: ${chapters.length}`);
    console.log('🎭 Linguagem mística, densa e sutilmente ameaçadora aplicada');
    console.log('🚪 Convite à Porta Umbrae incluído');
    console.log('🔥 Atrium Ignis finalizado com selo ritualístico');

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

recriarChamasSilenciosas();