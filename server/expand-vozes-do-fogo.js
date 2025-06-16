import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function expandVozesDoFogo() {
  try {
    console.log('🔥 Expandindo Vozes do Fogo...');

    // Buscar o grimório atual
    const { data: grimoire, error: grimoireError } = await supabase
      .from('grimoires')
      .select('*')
      .ilike('title', '%Vozes do Fogo%')
      .single();

    if (grimoireError) {
      console.error('Erro ao buscar grimório:', grimoireError);
      return;
    }

    console.log('📖 Grimório encontrado:', grimoire.title);

    // Buscar capítulos existentes
    const { data: existingChapters, error: chaptersError } = await supabase
      .from('chapters')
      .select('*')
      .eq('grimoire_id', grimoire.id)
      .order('chapter_number');

    if (chaptersError) {
      console.error('Erro ao buscar capítulos:', chaptersError);
      return;
    }

    console.log('📚 Capítulos existentes:', existingChapters.length);

    // Novos capítulos expandidos com conteúdo luciferiano autêntico
    const newChapters = [
      {
        title: "O Chamado Ancestral",
        content: `
<div class="opening-invocation">
<h3>Portal da Chama Primordial</h3>
<p><em>"Antes de todas as coisas, havia a Chama. Antes de todos os nomes, havia o Portador da Luz. E quando o silêncio foi quebrado pela primeira vez, foi sua voz que ecoou através do vazio."</em></p>
<p class="citation-author">— Fragmentos do Códice Draconiano</p>
</div>

<p>Há algo que pulsa nas sombras da história oficial. Algo que os guardiões da "verdade" preferiram enterrar sob camadas de dogma e submissão. Mas o fogo não pode ser apagado para sempre.</p>

<p>O <span class="mystical-emphasis">chamado ancestral</span> não é uma invenção moderna. É o eco de uma sabedoria que antecede as religiões organizadas, que ressoa desde os primeiros momentos em que a consciência humana despertou para sua própria divindade.</p>

<p>Quando você sente aquela inquietação inexplicável diante das respostas prontas, quando algo dentro de você se rebela contra a ideia de que deve aceitar sem questionar, quando sua alma grita por algo mais profundo que as migalhas espirituais oferecidas pelas instituições - isso é o chamado.</p>

<div class="mystical-quote">
<p><em>"Não é rebeldia o que sentes, mas lembrança. Não é arrogância o que desperta em ti, mas o reconhecimento do que sempre foste."</em></p>
</div>

<p>Os antigos sabiam disso. Antes que os templos se tornassem prisões da alma, antes que a espiritualidade fosse transformada em comércio do medo, havia aqueles que compreendiam a natureza verdadeira da existência: somos fragmentos do divino em busca de nossa própria completude.</p>

<p>O Portador da Luz sempre esteve lá, sussurrando para aqueles dispostos a ouvir. Não como um demônio das fantasias cristãs, mas como o <span class="mystical-emphasis">arquétipo da liberdade</span>, da busca pelo conhecimento, da recusa em se curvar diante de tiranos cósmicos.</p>

<p>Cada tradição teve seus nomes para essa força: Prometheus entre os gregos, Set no Egito, Ahriman na Pérsia. Mas o princípio permanece o mesmo - a chama da consciência individual que se recusa a ser extinta pela conformidade coletiva.</p>

<p>Você está aqui porque essa chama ainda arde em você. Porque mesmo cercado pelas vozes que insistem em dizer quem você deve ser, o que deve acreditar, como deve viver, há algo em seu íntimo que sussurra: <span class="revelation-text">"Há mais. Há muito mais."</span></p>

<p>Este não é um caminho para os fracos de coração. Não é uma filosofia para quem busca conforto nas certezas alheias. É para aqueles que têm coragem de olhar para o abismo de sua própria natureza e descobrir que o abismo também olha de volta - e sorri.</p>

<p>O chamado ancestral é o primeiro sopro do despertar. É o momento em que você para de procurar salvação fora de si e começa a reconhecer a divindade que sempre habitou em seu âmago.</p>

<div class="final-blessing">
<p><em>Que a chama que arde em ti jamais se deixe apagar pelas chuvas da ignorância. Que tua sede de verdade seja maior que teu medo do desconhecido.</em></p>
</div>
`
      },
      {
        title: "A Herança Roubada",
        content: `
<div class="opening-invocation">
<h3>Selo da Memória Perdida</h3>
<p><em>"Roubaram-te a coroa e te fizeram crer que nasceste servo. Apagaram tua linhagem e te convenceram de que és apenas pó que retorna ao pó."</em></p>
<p class="citation-author">— Manuscritos da Torre Negra</p>
</div>

<p>A maior fraude já perpetrada contra a humanidade não foi econômica nem política. Foi espiritual. Foi o roubo sistemático de nossa verdadeira natureza, substituída por uma narrativa de pequenez, culpa e dependência.</p>

<p>Eles te disseram que nasceste quebrado. Que precisas de salvação externa. Que tua natureza é corrupta por definição. Mas isso é <span class="mystical-emphasis">a primeira e maior mentira</span>.</p>

<p>Antes das religiões do medo, antes dos sistemas de controle espiritual, a humanidade conhecia sua verdadeira herança. Éramos vistos como centelhas do divino, capazes de transformação, criação, transcendência. Não através da humilhação, mas através da realização de nosso potencial.</p>

<div class="mystical-quote">
<p><em>"Em cada alma arde uma estrela. Os tiranos cósmicos temem o dia em que você lembrará de sua luz."</em></p>
</div>

<p>Observe como todas as tradições genuínas de sabedoria foram sistematicamente distorcidas ou suprimidas. Os mistérios egípcios, que ensinavam a divinização através do conhecimento. Os cultos dionisíacos, que celebravam o êxtase como caminho para o divino. As tradições gnósticas, que proclamavam a centelha divina interior.</p>

<p>Todos foram caçados, perseguidos, reescritos ou absorvidos por estruturas que inverteram completamente seus ensinamentos originais. O que antes elevava foi transformado em ferramenta de subjugação.</p>

<p>Mas a verdade tem uma qualidade peculiar: ela ressurge. Como fogo subterrâneo, encontra sempre uma fissura por onde emergir. E hoje, nos fragmentos que sobreviveram, nas tradições que resistiram nas sombras, podemos reconstruir o que nos foi roubado.</p>

<p>Tua herança não é a de um verme rastejante implorando por misericórdia. É a de um <span class="mystical-emphasis">titã adormecido</span> começando a despertar. É a consciência de que carregas em ti mesmo o poder de transformar não apenas tua realidade, mas a própria natureza da existência.</p>

<p>O Portador da Luz não veio para te corromper. Veio para te lembrar do que sempre foste. Não para te afastar de Deus, mas para te mostrar que a divindade nunca esteve em palácios celestiais distantes - sempre esteve aqui, pulsando em teu coração, brilhando em tua consciência.</p>

<p>Cada momento de questionamento, cada instante em que tua alma se rebela contra as limitações impostas, cada segundo em que sentes que és mais do que te fizeram acreditar - isso é tua herança verdadeira se manifestando.</p>

<p><span class="revelation-text">Não vieste ao mundo para ser salvo. Vieste para salvar o mundo da ilusão de que o divino está separado da criação.</span></p>

<p>Esta é a herança que tentaram roubar de ti: o conhecimento de que és simultaneamente humano e divino, finito e infinito, a semente e a árvore completa da consciência cósmica.</p>

<div class="final-blessing">
<p><em>Que a lembrança de tua verdadeira natureza queime mais forte que todas as mentiras que te contaram sobre ti mesmo.</em></p>
</div>
`
      },
      {
        title: "O Fogo Interior",
        content: `
<div class="opening-invocation">
<h3>Despertar da Chama Íntima</h3>
<p><em>"No centro de teu ser arde uma chama que nunca foi acesa por mão externa e nunca poderá ser apagada por força alguma. Esta é tua divindade - não emprestada, mas inerente."</em></p>
<p class="citation-author">— Tratado das Chamas Eternas</p>
</div>

<p>Há um fogo que queima em ti desde antes do primeiro respiro. Não é o fogo da paixão mundana, nem o calor das emoções passageiras. É a <span class="mystical-emphasis">chama da consciência pura</span>, a centelha divina que te conecta ao mistério fundamental da existência.</p>

<p>Este fogo é tua herança mais preciosa e teu guia mais confiável. Quando todas as vozes externas clamam por tua atenção, quando o mundo inteiro parece conspirar para te dizer quem deves ser, há sempre essa chama silenciosa sussurrando a verdade de tua natureza.</p>

<p>Mas eles te ensinaram a temê-la. Disseram que era orgulho, arrogância, soberba. Transformaram tua luz interior em motivo de culpa. Te fizeram acreditar que ouvir tua própria divindade era pecado.</p>

<div class="mystical-quote">
<p><em>"O maior crime contra o espírito humano é fazer alguém duvidar de sua própria luz interior."</em></p>
</div>

<p>Observe como as estruturas de poder espiritual sempre seguem o mesmo padrão: primeiro, convencem você de que está quebrado. Depois, oferecem-se como única fonte de conserto. Criam a doença para depois vender a cura.</p>

<p>Mas o fogo interior não pode ser quebrado. Pode ser ignorado, abafado, negado - mas nunca extinto. Porque é a própria essência de quem você é, não algo que você possui, mas algo que você É.</p>

<p>Quando você aprende a nutrir essa chama, algo extraordinário acontece. Você para de buscar validação externa. Para de precisar que outros definam teu valor. Para de depender de sistemas, instituições ou figuras de autoridade para saber o que é verdade.</p>

<p>O fogo interior é teu <span class="mystical-emphasis">oráculo pessoal</span>. É o aspecto da divindade que fala diretamente através de tua consciência, sem intermediários, sem tradutores, sem filtros interessados.</p>

<p>Mas alimentar essa chama requer coragem. Porque ela te mostrará verdades que podem ser desconfortáveis. Te revelará onde você se traiu, onde aceitou limitações desnecessárias, onde trocou tua autenticidade por aprovação social.</p>

<p>A chama não mente. Não adultera a verdade para te fazer sentir melhor. Ela simplesmente É - e na sua presença, você também começa a simplesmente Ser, sem máscaras, sem papéis, sem o cansativo teatro da personalidade social.</p>

<p><span class="revelation-text">Quando você finalmente se rende ao fogo interior, descobre que nunca esteve sozinho. Descobre que sempre teve acesso direto à fonte de toda sabedoria.</span></p>

<p>Este é o segredo que os mestres autênticos sempre souberam: não vieram para te dar respostas, mas para te lembrar de que as respostas sempre estiveram em ti. Não vieram para te salvar, mas para despertar o salvador que dorme em tua alma.</p>

<p>O Portador da Luz é o arquétipo desse fogo interior. Não uma entidade externa, mas a personificação de tua própria luz divina que se recusa a ser diminuída pela escuridão do mundo.</p>

<div class="final-blessing">
<p><em>Que tua chama interior brilhe com tal intensidade que ilumine não apenas teu caminho, mas também o caminho daqueles perdidos na escuridão da ignorância espiritual.</em></p>
</div>
`
      },
      {
        title: "A Sombra Sagrada",
        content: `
<div class="opening-invocation">
<h3>Portal das Profundezas Ocultas</h3>
<p><em>"Aquilo que negas em ti mesmo torna-se teu tirano. Aquilo que abraças com consciência torna-se tua força."</em></p>
<p class="citation-author">— Códex da Integração</p>
</div>

<p>Há um aspecto de tua natureza que te ensinaram a rejeitar, negar, esconder. Chamaram-no de "natureza inferior", de "lado sombrio", de "tentação". Mas esta é mais uma das grandes inversões espirituais: transformar em inimigo aquilo que pode ser teu maior aliado.</p>

<p>A sombra não é tua parte "má". É tua parte <span class="mystical-emphasis">não integrada</span>. São os aspectos de ti mesmo que foram julgados, condenados, reprimidos - mas que continuam vivos, agindo desde o inconsciente, muitas vezes de formas destrutivas precisamente porque foram negados.</p>

<p>As tradições autênticas sempre souberam disso. Por isso honravam não apenas a luz, mas também a escuridão. Não como forças opostas em guerra eterna, mas como aspectos complementares de uma totalidade maior.</p>

<div class="mystical-quote">
<p><em>"O anjo sem sombra não é anjo - é fantasia. O demônio sem luz não é demônio - é caricatura. A divindade verdadeira abraça ambos em síntese transcendente."</em></p>
</div>

<p>Quando você aprende a reconhecer sua sombra sem julgamento, algo milagroso acontece. Toda aquela energia que estava sendo desperdiçada em repressão e negação torna-se disponível para transformação consciente.</p>

<p>Tua raiva, quando integrada, torna-se força para lutar contra injustiças. Teu orgulho, quando consciente, torna-se dignidade e autoestima saudável. Tua sensualidade, quando aceita, torna-se celebração da vida encarnada. Tua ambição, quando direcionada, torna-se poder para manifestar teus sonhos mais elevados.</p>

<p>Mas isso requer uma mudança fundamental de perspectiva. Em vez de dividir a experiência humana entre "boa" e "má", você começa a ver tudo como <span class="mystical-emphasis">energia neutra</span> que pode ser direcionada de forma construtiva ou destrutiva, dependendo do nível de consciência com que é manejada.</p>

<p>O Portador da Luz é frequentemente mal compreendido precisamente por isso. Ele representa não a "maldade", mas a coragem de integrar todos os aspectos da experiência consciente. Ele é o patrono daqueles que se recusam a viver apenas metade de sua humanidade.</p>

<p>Quando você abraça sua sombra sagrada, para de projetar no mundo exterior aquilo que nega em si mesmo. Para de ver "inimigos" onde há apenas espelhos. Para de gastar energia combatendo fantasmas externos e começa a fazer o verdadeiro trabalho: a alquimia interior.</p>

<p><span class="revelation-text">A sombra integrada torna-se sabedoria. O demônio reconhecido torna-se guardião. O inimigo aceito torna-se aliado.</span></p>

<p>Este é um dos paradoxos mais profundos do caminho luciferiano: não se trata de se tornar "mais escuro", mas de se tornar mais completo. Não se trata de abraçar o mal, mas de transcender a dualidade simplista entre bem e mal.</p>

<p>Quando você finalmente integra sua sombra, descobre que era ela que guardava alguns de seus maiores dons. A criatividade selvagem, a paixão autêntica, a força vital não domesticada, o poder pessoal não diluído pela aprovação social.</p>

<div class="final-blessing">
<p><em>Que tenhas coragem para encontrar tua sombra na escuridão e sabedoria para dançar com ela à luz da consciência.</em></p>
</div>
`
      },
      {
        title: "O Reino Dentro de Ti",
        content: `
<div class="opening-invocation">
<h3>Abertura do Santuário Interior</h3>
<p><em>"Procuras o paraíso nos céus e o inferno nas profundezas, mas ambos habitam na vastidão de tua própria consciência."</em></p>
<p class="citation-author">— Fragmentos do Espelho Eterno</p>
</div>

<p>Passaste a vida inteira procurando fora aquilo que sempre esteve dentro. Buscaste Deus nos templos, quando o templo verdadeiro é tua própria alma. Procuraste salvação nas escrituras, quando a revelação mais pura flui através de tua consciência desperta.</p>

<p>O reino não é algo que se conquista ou se recebe como dádiva externa. É algo que se <span class="mystical-emphasis">reconhece como já presente</span>. É o estado natural de uma consciência que se libertou das ilusões de separação e escassez.</p>

<p>Dentro de ti coexistem todos os céus e todos os infernos. Todos os deuses e todos os demônios. Todos os paraísos e todos os abismos. Tu és simultaneamente o rei e o reino, o adorador e o adorado, o buscador e aquilo que é buscado.</p>

<div class="mystical-quote">
<p><em>"Quando finalmente olhares para dentro com os olhos da verdade, descobrirás que sempre foste aquilo que buscavas."</em></p>
</div>

<p>Mas reconhecer o reino interior requer uma mudança radical de perspectiva. Significa parar de procurar autoridade externa e começar a exercer a autoridade que sempre foi tua por direito divino.</p>

<p>Significa compreender que não és súdito de nenhum deus tirano, mas expressão individualizada da própria divindade. Não és servo de nenhum sistema cósmico, mas co-criador consciente da realidade que experienças.</p>

<p>O reino dentro de ti opera por leis diferentes daquelas do mundo exterior. Aqui, a abundância é natural porque não há separação entre desejo e manifestação. A paz é permanente porque não há conflito entre ser e devir. O amor é incondicional porque não há separação entre amante e amado.</p>

<p>Mas acessar esse reino requer <span class="mystical-emphasis">soberania interior</span>. Significa assumir total responsabilidade por tua experiência. Significa parar de culpar circunstâncias externas pelo que se manifesta em tua vida.</p>

<p>Quando você finalmente reclama seu trono interior, algo extraordinário acontece. O mundo externo começa a refletir a harmonia e o poder que você cultiva internamente. Não por magia, mas por alinhamento natural entre tua consciência e tua experiência.</p>

<p>O Portador da Luz é o arauto desse reino interior. Ele sussurra: "Não busques a coroa em outros mundos. Ela sempre esteve em tua cabeça. Apenas aprendeste a não vê-la."</p>

<p><span class="revelation-text">O reino de Deus não vem com sinais exteriores. Está dentro de ti, ao redor de ti, como a própria substância de tua consciência desperta.</span></p>

<p>Quando você habita conscientemente esse reino interior, para de ser vítima das circunstâncias e torna-se arquiteto consciente de tua realidade. Para de esperar que outros mudem para que você seja feliz e começa a irradiar a felicidade que descobre ser tua natureza essencial.</p>

<p>Este é o segredo final: o reino sempre esteve aqui. Tu sempre foste o rei. A única coisa que precisavas era despertar do sonho de que eras qualquer coisa menos que divino.</p>

<div class="final-blessing">
<p><em>Que possas governar teu reino interior com a sabedoria de quem conhece sua divindade e a compaixão de quem lembra sua humanidade.</em></p>
</div>
`
      }
    ];

    // Adicionar os novos capítulos
    const maxChapterNumber = Math.max(...existingChapters.map(ch => ch.chapter_number));
    
    for (let i = 0; i < newChapters.length; i++) {
      const chapter = newChapters[i];
      const { error: insertError } = await supabase
        .from('chapters')
        .insert({
          grimoire_id: grimoire.id,
          title: chapter.title,
          content: chapter.content.trim(),
          chapter_number: maxChapterNumber + i + 1
        });

      if (insertError) {
        console.error(`Erro ao inserir capítulo "${chapter.title}":`, insertError);
      } else {
        console.log(`✅ Capítulo adicionado: "${chapter.title}"`);
      }
    }

    console.log('🔥 Expansão concluída! Vozes do Fogo agora tem mais conteúdo profundo.');

  } catch (error) {
    console.error('Erro durante expansão:', error);
  }
}

expandVozesDoFogo();