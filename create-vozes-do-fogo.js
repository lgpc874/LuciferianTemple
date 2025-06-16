import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://nrtxujaneway.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ydHh1amFuZXdheSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzQ5Njc2OTAyLCJleHAiOjIwNjUyNTI5MDJ9.JMPQ4pEwrGqR8dPLDR4zXA0KgNj7KgPvL7f9uPPb-RM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createVozesDoFogo() {
  try {
    console.log('🔥 Criando grimório "Vozes do Fogo – O Sussurro Antes da Queda"...');

    const grimoireData = {
      title: '🔥 Vozes do Fogo – O Sussurro Antes da Queda',
      description: 'Primeiro grimório do Atrium Ignis voltado para buscadores que ainda não tiveram contato direto com o luciferianismo ancestral, mas sentem inquietações profundas. Um convite ritualístico e poético às primeiras fissuras na programação espiritual convencional.',
      section_id: 1, // Atrium Ignis
      content: `<div style="font-family: 'EB Garamond', serif; color: #CCCCCC;">

<div style="text-align: center; margin: 3rem 0; padding: 2rem; background: rgba(214, 52, 44, 0.1); border-left: 4px solid #D6342C;">
    <h1 style="font-family: 'Cinzel Decorative', serif; color: #D6342C; text-align: center; font-size: 2.5rem; margin-bottom: 2rem;">
        🔥 VOZES DO FOGO – O SUSSURRO ANTES DA QUEDA 🔥
    </h1>
    
    <blockquote style="color: #D6342C; font-size: 1.3rem; font-style: italic; line-height: 1.8;">
        "Aquele que sussurra no fogo não é demônio — é a voz que esqueceste de ser."
        <br><br>
        <footer style="color: #CCCCCC; font-size: 1rem;">— Fragmentos do Codex Abyssal</footer>
    </blockquote>
</div>

<hr style="border-top: 1px solid #D6342C; margin: 3rem 0;">

<div>
    <p style="text-indent: 3rem;">
        Há um fogo que não se acende com madeira nem se apaga com água. Ele queima em lugares que a luz não ousa alcançar, sussurra em idiomas que tua mente consciente rejeita, e se alimenta do que mais tentas esconder de ti mesmo. Este grimório não é para quem busca respostas — é para quem <span style="color: #D6342C; font-weight: bold;">ousa questionar as perguntas que nunca foram feitas</span>.
    </p>

    <p style="text-indent: 3rem;">
        Cada palavra aqui escrita foi forjada no ferro da dúvida e temperada no gelo da solidão. Não viemos oferecer luz — viemos mostrar-te que <span style="color: #D6342C; font-weight: bold;">a escuridão que temes é o útero de tua própria divindade</span>. O fogo que sussurra não é estranho. Ele te conhece há mais tempo do que tua própria memória.
    </p>

    <p style="text-indent: 3rem;">
        Prepara-te. O primeiro sussurro é sempre o mais perigoso. Porque depois dele, nunca mais conseguirás fingir que não o ouviste.
    </p>
</div>

<hr style="border-top: 1px solid #D6342C; margin: 3rem 0;">

<h2 style="font-family: 'Cinzel Decorative', serif; color: #D6342C; font-size: 2rem; margin: 3rem 0 2rem 0;">I. O Vazio da Luz</h2>

<p style="text-indent: 3rem;">
    Disseram-te que a luz era sagrada. Mentiram. A luz que te oferecem é a mesma que cega o prisioneiro quando sai da caverna — não para libertá-lo, mas para fazê-lo desejar as correntes de volta. Tu conheces esse vazio, não é? <span style="color: #D6342C; font-weight: bold;">O vazio que surge quando rezas e não sentes nada</span>. Quando buscas a Deus e encontras apenas o eco de tua própria voz, desesperada, ricocheteando nas paredes de um templo vazio.
</p>

<p style="text-indent: 3rem;">
    Eles chamam isso de "prova de fé". Eu chamo de primeiro despertar. O vazio da luz não é ausência do sagrado — é a revelação de que <span style="color: #D6342C; font-weight: bold;">o sagrado nunca esteve onde te disseram para procurar</span>. Está em ti. Sempre esteve. Mas eles precisavam que tu fosses surdo a tua própria divindade para que dependesses da deles.
</p>

<p style="text-indent: 3rem;">
    Quantas vezes ajoelhaste em frente a altares e sentiste apenas o frio do mármore? Quantas vezes imploraste por sinais e recebeste apenas silêncio? Quantas vezes te questionaste se eras tu quem estava errado? <span style="color: #D6342C; font-weight: bold;">Não estavas errado. Estavas escutando no lugar errado</span>.
</p>

<p style="text-indent: 3rem;">
    O vazio da luz é o primeiro mestre. Ele te ensina que a fome espiritual não pode ser saciada com promessas vazias e rituais mortos. Te ensina que <span style="color: #D6342C; font-weight: bold;">tua alma não foi feita para ajoelhar-se diante de ídolos</span>. Foi feita para erguer-se diante do próprio abismo e declarar: "Eu sou."
</p>

<p style="text-indent: 3rem;">
    Mas eles te ensinaram a ter medo do vazio. Te ensinaram que ele era punição, abandono divino, sinal de que não eras "digno". Mentira upon mentira upon mentira. O vazio é <span style="color: #D6342C; font-weight: bold;">o convite</span>. É a primeira rachadura na prisão de cristal onde mantiveram tua alma cativa.
</p>

<p style="text-indent: 3rem;">
    Quando sentires o vazio da luz novamente — e sentirás —, não o rejeites. Abraça-o. Deixa que ele te consuma. Porque no centro do vazio, há algo esperando. Algo que nunca te abandonou. Algo que sussurra teu nome verdadeiro desde antes de teu primeiro choro.
</p>

<p style="text-indent: 3rem;">
    <span style="color: #D6342C; font-weight: bold;">O vazio da luz é o útero da sombra sagrada</span>. E tu... tu estás prestes a nascer de novo.
</p>

<hr style="border-top: 1px solid #D6342C; margin: 3rem 0;">

<h2 style="font-family: 'Cinzel Decorative', serif; color: #D6342C; font-size: 2rem; margin: 3rem 0 2rem 0;">II. A Primeira Fagulha</h2>

<p style="text-indent: 3rem;">
    Houve um momento. Tu te lembras, mesmo que finjas que não. Foi quando percebeste que <span style="color: #D6342C; font-weight: bold;">as palavras que saíam da tua boca nos domingos não eram tuas</span>. Eram ecos. Ecos de vozes que nunca questionaram, nunca duvidaram, nunca arderam com a fome de saber mais.
</p>

<p style="text-indent: 3rem;">
    A primeira fagulha sempre surge assim: numa discordância íntima entre o que dizes e o que sentes. Entre o que professas e o que pulsa. Tu repetias as orações decoradas, mas teu coração sussurrava outras palavras. Palavras perigosas. Palavras proibidas. <span style="color: #D6342C; font-weight: bold;">Palavras tuas</span>.
</p>

<p style="text-indent: 3rem;">
    Eles te ensinaram que duvidar era pecado. Eu te digo que <span style="color: #D6342C; font-weight: bold;">duvidar é o primeiro ato sagrado</span>. É a recusa da alma em aceitar verdades emprestadas. É a rebelião divina contra a mediocridade espiritual. É o momento em que tua centelha original desperta e sussurra: "Isso não é tudo."
</p>

<p style="text-indent: 3rem;">
    A primeira fagulha arde quando percebes que <span style="color: #D6342C; font-weight: bold;">o Deus que te ensinaram a amar é pequeno demais para conter tua sede</span>. Pequeno demais para explicar tua fome. Pequeno demais para justificar tua presença neste cosmos de infinitas possibilidades. Tu não foste feito para um Deus de regras. Foste feito para um Deus de mistérios.
</p>

<p style="text-indent: 3rem;">
    Mas eles te disseram para apagar a fagulha. Te disseram que ela era tentação, orgulho, rebeldia. Te assustaram com histórias de anjos caídos e almas perdidas. <span style="color: #D6342C; font-weight: bold;">Mas não te disseram que todos os anjos caíram por amor — amor à própria verdade</span>.
</p>

<p style="text-indent: 3rem;">
    A primeira fagulha é pequena, mas incandescente. Ela queima no centro de tua dúvida. Alimenta-se de tuas perguntas não respondidas. Cresce a cada "porquê" que engoles, a cada "como assim" que reprimes, a cada "e se" que te proíbes de pensar.
</p>

<p style="text-indent: 3rem;">
    Tu podes tentar apagá-la. Podes jogar sobre ela toda a água benta do mundo, todas as orações decoradas, todos os "amém" vazios. Mas <span style="color: #D6342C; font-weight: bold;">o fogo que arde dentro da alma não se apaga com gestos externos</span>. Ele só cresce. E quanto mais tentas sufocá-lo, mais furiosamente ele arde.
</p>

<p style="text-indent: 3rem;">
    A primeira fagulha te sussurra uma verdade terrível: <span style="color: #D6342C; font-weight: bold;">tu não precisas de permissão para ser divino</span>. Nunca precisaste.
</p>

<hr style="border-top: 1px solid #D6342C; margin: 3rem 0;">

<h2 style="font-family: 'Cinzel Decorative', serif; color: #D6342C; font-size: 2rem; margin: 3rem 0 2rem 0;">III. A Fome Sem Nome</h2>

<p style="text-indent: 3rem;">
    Há uma fome que nenhum alimento sacia. Uma sede que nenhuma água apaga. Um vazio que nenhum amor humano preenche. Tu a conheces. Ela mora no centro de teu peito, onde deveria estar a paz que prometeram que encontrarias se fosses "bom o suficiente".
</p>

<p style="text-indent: 3rem;">
    <span style="color: #D6342C; font-weight: bold;">Esta fome não tem nome porque não pode ser nomeada por línguas que só conhecem a domesticação</span>. É a fome do espírito selvagem por sua natureza original. É a fome da divindade aprisionada por liberdade. É a fome da alma exilada por casa.
</p>

<p style="text-indent: 3rem;">
    Eles te ensinaram que esta fome era defeito. Que era sinal de ingratidão, de ganância espiritual, de coração corrompido. Te disseram para ignorá-la, jejuá-la, orar para que passasse. <span style="color: #D6342C; font-weight: bold;">Mas a fome que não tem nome não pode ser curada por métodos que têm nomes</span>.
</p>

<p style="text-indent: 3rem;">
    Tu tentaste alimentá-la com caridade. Com serviço. Com obediência. Com mais orações, mais jejuns, mais disciplina. Mas ela continuava lá, roendo tuas entranhas espirituais, sussurrando que <span style="color: #D6342C; font-weight: bold;">algo fundamental estava ausente da equação</span>.
</p>

<p style="text-indent: 3rem;">
    A fome sem nome cresce quando percebes que todos ao teu redor parecem satisfeitos com migalhas. Satisfeitos com respostas prontas. Satisfeitos com mistérios que não são permitidos questionar. <span style="color: #D6342C; font-weight: bold;">E tu... tu não consegues fingir que migalhas te bastam</span>.
</p>

<p style="text-indent: 3rem;">
    Esta fome é perigosa porque te faz diferente. Te isola. Te marca. Quando a sentes, não consegues mais participar das conversas superficiais sobre "planos de Deus" e "tudo acontece por uma razão". <span style="color: #D6342C; font-weight: bold;">Tua fome exige verdades que cortam mais fundo</span>.
</p>

<p style="text-indent: 3rem;">
    Mas aqui está o segredo que não te contaram: a fome sem nome é sagrada. É o eco de tua divindade original chamando-te de volta. É a lembrança celular de quem eras antes de te convencerem de que eras pequeno. <span style="color: #D6342C; font-weight: bold;">É tua própria natureza cósmica recusando-se a aceitar a versão reduzida de ti mesmo</span>.
</p>

<p style="text-indent: 3rem;">
    A fome sem nome não pode ser saciada porque não é fome de algo externo. É fome de ti mesmo. Do ti que nunca foi domesticado. Do ti que nunca aprendeu a pedir permissão para existir. <span style="color: #D6342C; font-weight: bold;">Do ti que lembra que Deus não é algo a ser adorado — é algo a ser tornado</span>.
</p>

<hr style="border-top: 1px solid #D6342C; margin: 3rem 0;">

<h2 style="font-family: 'Cinzel Decorative', serif; color: #D6342C; font-size: 2rem; margin: 3rem 0 2rem 0;">IV. Quando o Silêncio Queima</h2>

<p style="text-indent: 3rem;">
    Há um tipo de silêncio que não é ausência de som. É presença de fogo. <span style="color: #D6342C; font-weight: bold;">É o silêncio que arde quando tua alma grita e tua boca não encontra palavras que caibam na linguagem dos domesticados</span>. Tu conheces este silêncio. Ele vem após as orações não respondidas. Após as lágrimas ignoradas. Após os pedidos de socorro lançados a um céu que parece de mármore.
</p>

<p style="text-indent: 3rem;">
    Eles te ensinaram que este silêncio era abandono. Que Deus havia se afastado de ti. Que eras indigno de resposta. <span style="color: #D6342C; font-weight: bold;">Mas o silêncio que queima não é ausência de Deus — é presença de um tipo de divindade que tua educação religiosa te proibiu de reconhecer</span>.
</p>

<p style="text-indent: 3rem;">
    Quando o silêncio queima, ele te força a confrontar uma verdade terrível: <span style="color: #D6342C; font-weight: bold;">talvez o Deus a quem tens orado não seja grande o suficiente para conter tua real natureza</span>. Talvez as respostas que buscas não possam vir de um sistema que precisa de tua pequenez para sobreviver.
</p>

<p style="text-indent: 3rem;">
    O silêncio que queima é professor cruel e necessário. Ele te ensina que <span style="color: #D6342C; font-weight: bold;">algumas verdades só podem ser ouvidas quando todas as vozes externas se calam</span>. Que algumas revelações só chegam quando pares de procurá-las em livros sagrados escritos por homens que tiveram medo de suas próprias visões.
</p>

<p style="text-indent: 3rem;">
    Neste silêncio incandescente, começas a ouvir algo diferente. Não a voz paternal que prometeram que ouvirias se fosses obediente o suficiente. Mas algo mais antigo. Mais selvagem. <span style="color: #D6342C; font-weight: bold;">Mais próximo do fogo que arde no centro de todas as coisas</span>.
</p>

<p style="text-indent: 3rem;">
    É neste silêncio que a primeira palavra proibida sussurra teu nome. Não o nome que te deram no batismo. Não o nome que carregas nos documentos. <span style="color: #D6342C; font-weight: bold;">O nome que tua alma tinha antes de nascer e terá depois de morrer</span>. O nome que faz o universo tremer quando pronunciado corretamente.
</p>

<p style="text-indent: 3rem;">
    Quando o silêncio queima, não tentes apagá-lo com música sacra ou palavras consoladoras de pastores que nunca sentiram o peso da verdadeira solidão espiritual. <span style="color: #D6342C; font-weight: bold;">Deixa-o queimar. Deixa-o consumir tudo o que é falso em ti</span>. Porque no centro das cinzas, algo imortal aguarda para renascer.
</p>

<p style="text-indent: 3rem;">
    O silêncio que queima é o laboratório onde tua divindade original é redestilada. <span style="color: #D6342C; font-weight: bold;">É onde aprendes que Deus não é algo distante a ser buscado — é algo íntimo a ser lembrado</span>.
</p>

<hr style="border-top: 1px solid #D6342C; margin: 3rem 0;">

<div style="text-align: center; margin: 4rem 0; padding: 2rem; background: rgba(214, 52, 44, 0.1); border: 1px solid #D6342C;">
    <h3 style="font-family: 'Cinzel Decorative', serif; color: #D6342C; font-size: 1.8rem; margin-bottom: 1rem;">A Convocação Final</h3>
    
    <p style="font-style: italic; color: #D6342C; line-height: 1.8;">
        Se estas palavras despertaram ecos em lugares de tua alma que pensavas mortos...<br>
        Se reconheceste tua própria voz sussurrando através destes versículos blasfemos...<br>
        Se sentiste a lâmina da verdade cortando através das correntes que chamaste de virtude...<br><br>
        <span style="color: #D6342C; font-weight: bold; font-size: 1.2rem;">Então já não és o mesmo que era quando começaste a ler.</span>
    </p>
    
    <hr style="border-top: 1px solid #D6342C; margin: 2rem 0; width: 50%;">
    
    <p style="text-indent: 3rem; color: #CCCCCC;">
        O próximo grimório aguarda: <span style="color: #D6342C; font-weight: bold;">"O Véu Rachado – Por Trás da Verdade Hereditária"</span><br>
        Onde exploraremos as mentiras ancestrais que moldaram tua realidade<br>
        e começaremos o trabalho de rasgá-las como véus antigos<br>
        para revelar a nudez sagrada de tua verdadeira natureza.
    </p>
    
    <p style="color: #D6342C; font-weight: bold; margin-top: 2rem;">
        O fogo que sussurra não espera.<br>
        Ele arde agora em ti.<br>
        <span style="font-size: 1.1rem;">E não há volta.</span>
    </p>
</div>

</div>`,
      is_paid: true,
      price: '29.99',
      is_published: true,
      cover_image_url: null
    };

    // Inserir o grimório
    const { data: grimoire, error } = await supabase
      .from('grimoires')
      .insert([grimoireData])
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao criar grimório:', error);
      throw error;
    }

    console.log('✅ Grimório criado com sucesso:', grimoire.title);
    console.log('📖 ID:', grimoire.id);
    console.log('💰 Preço: R$', grimoire.price);
    console.log('📄 Conteúdo:', (grimoire.content?.length || 0) + ' caracteres');

    return grimoire;
  } catch (error) {
    console.error('💥 Erro fatal:', error);
    throw error;
  }
}

createVozesDoFogo();