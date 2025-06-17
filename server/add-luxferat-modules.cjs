const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://flzcnthpxzevdopqqgba.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsemNudGhweHpldmRvcHFxZ2JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NzY5ODEsImV4cCI6MjA2NTI1Mjk4MX0.aOiP6qKUpYbqOyOzXX0A3Y7-d_Q2bQGZqGhP31yC4zw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addLuxferatModules() {
  try {
    console.log('🔥 Adicionando 5 novos módulos ao curso LUXFERAT...\n');

    const novosModulos = [
      {
        curso_id: 1,
        titulo: 'A Descida às Raízes Ancestrais',
        conteudo: `<h2 style="color: #D6342C; font-family: Cinzel Decorative;">A DESCIDA ÀS RAÍZES ANCESTRAIS</h2>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Antes das religiões organizadas domesticarem a humanidade, nossos ancestrais conheciam verdades que foram deliberadamente enterradas. O luciferianismo não é uma invenção moderna — é o <em>resgate</em> de uma sabedoria primordial que sempre existiu nas sombras da civilização.</p>

<h3 style="color: #D97706; font-family: Cinzel;">O Conhecimento Proibido</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Em todas as culturas antigas encontramos vestígios do que hoje chamamos de "luciferianismo". Os nomes variam, mas a essência permanece:</p>

<ul style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li><strong style="color: #D6342C;">Prometeu</strong> — o titã que roubou o fogo dos deuses para a humanidade</li>
<li><strong style="color: #D6342C;">Quetzalcóatl</strong> — a serpente emplumada que trouxe conhecimento</li>
<li><strong style="color: #D6342C;">Enki</strong> — o deus sumério que criou a humanidade e lhe deu sabedoria</li>
<li><strong style="color: #D6342C;">Set</strong> — o guardião do conhecimento oculto no Egito</li>
<li><strong style="color: #D6342C;">Ahriman</strong> — o portador da consciência individual no zoroastrismo</li>
</ul>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Todos estes arquétipos representam a mesma força: <em>aquela que desperta a humanidade de sua ignorância programada</em>.</p>

<h3 style="color: #D97706; font-family: Cinzel;">A Linguagem dos Símbolos</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Os símbolos não são meras decorações — são <strong>tecnologias espirituais</strong> que comunicam diretamente com o inconsciente. O luciferianismo trabalha com símbolos que ativam aspectos específicos da psique:</p>

<blockquote style="border-left: 3px solid #D6342C; padding-left: 20px; font-style: italic; color: #D97706; margin: 20px 0;">
"A serpente não tentou Eva — ela a <em>libertou</em>. O conhecimento do bem e do mal é o conhecimento da <strong>escolha consciente</strong>, da responsabilidade individual pela própria existência."
</blockquote>

<h3 style="color: #D97706; font-family: Cinzel;">As Tradições Ocultas</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Ao longo da história, grupos iniciáticos preservaram estes ensinamentos:</p>

<ul style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li><strong>Gnosticismo</strong> — conhecimento direto da divindade interior</li>
<li><strong>Hermetismo</strong> — "como acima, assim abaixo" - a correspondência entre microcosmo e macrocosmo</li>
<li><strong>Tradições xamânicas</strong> — comunicação direta com forças espirituais</li>
<li><strong>Alquimia</strong> — a transmutação interior disfarçada de química</li>
<li><strong>Misticismo medieval</strong> — união direta com o divino, sem intermediários</li>
</ul>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Cada uma dessas tradições, quando despida de seus ornamentos culturais, revela o mesmo núcleo: <em>o ser humano possui divindade inerente</em> e pode acessá-la diretamente.</p>`,

        pratica: `<h3 style="color: #D97706; font-family: Cinzel;">RITUAL DE CONEXÃO ANCESTRAL</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Materiais necessários:</strong></p>
<ul style="font-family: EB Garamond; font-size: 16px;">
<li>Uma vela preta e uma vela vermelha</li>
<li>Incenso de sândalo ou copal</li>
<li>Uma tigela com água</li>
<li>Sal marinho</li>
<li>Um objeto pessoal antigo (se possível, herdado da família)</li>
</ul>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Preparação do Espaço:</strong></p>
<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Crie um círculo com sal marinho no chão</li>
<li>Posicione a vela preta ao norte, a vermelha ao sul</li>
<li>Coloque a tigela com água ao oeste, o incenso ao leste</li>
<li>Sente-se no centro com o objeto ancestral nas mãos</li>
</ol>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Invocação:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6; font-style: italic; color: #D6342C;">
"Eu chamo os que vieram antes, aqueles que conheciam as verdades ocultas.<br>
Que a sabedoria antiga desperte em mim.<br>
Que eu veja além dos véus da ilusão moderna.<br>
Pela chama negra que arde em meu sangue,<br>
Eu reclamo minha herança espiritual."
</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Meditação:</strong></p>
<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Olhe para as chamas e respire profundamente</li>
<li>Visualize uma linhagem de figuras ancestrais atrás de você</li>
<li>Sinta a conexão com todos que buscaram conhecimento antes de você</li>
<li>Permita que símbolos ou imagens surjam espontaneamente</li>
<li>Registre mentalmente tudo que receber</li>
</ol>`,

        desafio: `<strong>PESQUISA GENEALÓGICA ESPIRITUAL</strong>

Durante os próximos 7 dias, conduza uma investigação sobre tradições esotéricas que ressoam com você:

• <strong>Dia 1-2:</strong> Pesquise sobre uma tradição antiga que chama sua atenção (gnosticismo, hermetismo, xamanismo, etc.)

• <strong>Dia 3-4:</strong> Identifique símbolos ou conceitos desta tradição que fazem sentido intuitivo para você

• <strong>Dia 5-6:</strong> Procure conexões entre esta tradição e sua própria jornada espiritual

• <strong>Dia 7:</strong> Síntese - escreva como esta tradição ancestral se conecta com seu despertar luciferiano pessoal

<em style="color: #D6342C;">Relate sua experiência com o ritual ancestral e compartilhe as descobertas de sua pesquisa genealógica espiritual, explicando que tradições antigas ressoam mais profundamente com sua natureza.</em>`,
        ordem: 3
      },

      {
        curso_id: 1,
        titulo: 'O Trabalho com a Sombra Luciferiana',
        conteudo: `<h2 style="color: #D6342C; font-family: Cinzel Decorative;">O TRABALHO COM A SOMBRA LUCIFERIANA</h2>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">A sombra não é o "mal" como as religiões convencionais querem nos fazer crer. É a totalidade de nossos aspectos reprimidos, negados e não integrados. No caminho luciferiano, a sombra torna-se nossa maior aliada na jornada rumo à totalidade.</p>

<h3 style="color: #D97706; font-family: Cinzel;">Redefinindo o "Mal"</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">O conceito de "mal" é uma ferramenta de controle. Quando examinamos profundamente, descobrimos que muito do que foi rotulado como "mal" são simplesmente aspectos naturais da experiência humana que foram demonizados para manter as pessoas dóceis:</p>

<ul style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li><strong style="color: #D6342C;">Raiva</strong> — energia que sinaliza violação de limites</li>
<li><strong style="color: #D6342C;">Orgulho</strong> — reconhecimento legítimo do próprio valor</li>
<li><strong style="color: #D6342C;">Desejo</strong> — impulso natural para crescimento e experiência</li>
<li><strong style="color: #D6342C;">Questionamento</strong> — recusa em aceitar autoridade sem análise</li>
<li><strong style="color: #D6342C;">Individualidade</strong> — expressão autêntica versus conformidade forçada</li>
</ul>

<h3 style="color: #D97706; font-family: Cinzel;">A Integração dos Opostos</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">O luciferianismo não é sobre escolher "trevas" sobre "luz" — é sobre transcender esta dualidade artificial. A verdadeira iluminação vem da <em>integração consciente</em> de todos os aspectos do ser:</p>

<blockquote style="border-left: 3px solid #D6342C; padding-left: 20px; font-style: italic; color: #D97706; margin: 20px 0;">
"Só quem abraça sua própria escuridão pode verdadeiramente irradiar luz autêntica. A luz que nega as sombras é fraca e artificial."
</blockquote>

<h3 style="color: #D97706; font-family: Cinzel;">Técnicas de Integração da Sombra</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>1. Diálogo Ativo com a Sombra:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Ao invés de reprimir aspectos "indesejáveis", engage com eles conscientemente. Pergunte: "O que você está tentando me mostrar? Que necessidade legítima você representa?"</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>2. Alquimia Emocional:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Transforme emoções "negativas" em poder pessoal. Raiva vira determinação, medo vira cautela sábia, inveja vira motivação para crescimento.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>3. Projeção Consciente:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Reconheça quando está projetando sua sombra em outros. O que você critica intensamente nos outros geralmente revela aspectos não aceitos de si mesmo.</p>

<h3 style="color: #D97706; font-family: Cinzel;">O Poder da Aceitação Radical</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">A aceitação radical não significa aprovação ou permissão para comportamentos destrutivos. Significa <em>reconhecer a realidade</em> de todos os aspectos de sua natureza sem julgamento, para então escolher conscientemente como expressá-los de forma construtiva.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Esta é a diferença entre um luciferiano evoluído e um rebelde infantil: <strong>consciência e responsabilidade</strong> na expressão de todo o espectro do ser.</p>`,

        pratica: `<h3 style="color: #D97706; font-family: Cinzel;">RITUAL DE INTEGRAÇÃO DA SOMBRA</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Fase 1 - Identificação da Sombra:</strong></p>
<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Sente-se diante de um espelho em ambiente escuro</li>
<li>Acenda uma vela vermelha atrás de você</li>
<li>Olhe em seus olhos e pergunte: "Que aspectos meus eu nego ou reprimo?"</li>
<li>Observe sem julgamento as respostas que surgem</li>
<li>Anote tudo em um papel negro com tinta vermelha</li>
</ol>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Fase 2 - Diálogo com a Sombra:</strong></p>
<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Para cada aspecto identificado, faça as perguntas:</li>
<li>"Que função positiva você serve em minha vida?"</li>
<li>"Como posso expressar você de forma construtiva?"</li>
<li>"Que dons você possui que eu estava negando?"</li>
<li>Escreva as respostas sem censura</li>
</ol>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Invocação de Integração:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6; font-style: italic; color: #D6342C;">
"Eu reconheço todos os aspectos de meu ser.<br>
Luz e sombra, força e fraqueza, amor e raiva.<br>
Todos fazem parte de minha totalidade.<br>
Que eu possa expressar cada faceta com sabedoria,<br>
Sendo completo, autêntico e verdadeiro."
</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Prática Diária de Consciência:</strong></p>
<ul style="font-family: EB Garamond; font-size: 16px;">
<li>Observe seus julgamentos sobre outros durante o dia</li>
<li>Pergunte: "Como isso reflete algo que nego em mim?"</li>
<li>Pratique expressar aspectos reprimidos de forma saudável</li>
<li>Registre insights em um diário da sombra</li>
</ul>`,

        desafio: `<strong>MAPEAMENTO COMPLETO DA SOMBRA PESSOAL</strong>

Crie um "Atlas da Sombra" pessoal durante 10 dias:

• <strong>Dias 1-3:</strong> Liste todos os aspectos de personalidade que você rejeita, julga ou nega em si mesmo

• <strong>Dias 4-6:</strong> Para cada aspecto, identifique:
  - Quando desenvolveu este julgamento
  - Que pessoa ou situação o ensinou a rejeitar isso
  - Que função positiva este aspecto poderia ter

• <strong>Dias 7-8:</strong> Experimente expressar conscientemente estes aspectos de forma construtiva em situações adequadas

• <strong>Dias 9-10:</strong> Reflita sobre como se sente ao aceitar sua totalidade

<strong>Exercício Especial:</strong> Identifique sua "persona social" (máscara que usa para ser aceito) e liste tudo que essa máscara esconde.

<em style="color: #D6342C;">Compartilhe sua experiência com o ritual de integração e apresente seu Atlas da Sombra, explicando como pretende expressar seus aspectos negados de forma consciente e construtiva.</em>`,
        ordem: 4
      },

      {
        curso_id: 1,
        titulo: 'A Magia como Tecnologia da Consciência',
        conteudo: `<h2 style="color: #D6342C; font-family: Cinzel Decorative;">A MAGIA COMO TECNOLOGIA DA CONSCIÊNCIA</h2>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">A magia não é superstição primitiva nem entretenimento fantasioso. É uma <strong>tecnologia sofisticada para operar mudanças na realidade</strong> através da manipulação consciente de estados de consciência, energia psíquica e forças naturais.</p>

<h3 style="color: #D97706; font-family: Cinzel;">Redefinindo a Magia</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Aleister Crowley definiu magia como "a ciência e arte de causar mudanças em conformidade com a vontade". Esta definição remove o misticismo desnecessário e revela a magia como um sistema prático de transformação:</p>

<ul style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li><strong style="color: #D6342C;">Ciência</strong> — método reproduzível baseado em princípios compreensíveis</li>
<li><strong style="color: #D6342C;">Arte</strong> — expressão criativa individual da técnica</li>
<li><strong style="color: #D6342C;">Mudança</strong> — alteração mensurável na realidade</li>
<li><strong style="color: #D6342C;">Vontade</strong> — intenção consciente e direcionada</li>
</ul>

<h3 style="color: #D97706; font-family: Cinzel;">Os Princípios Fundamentais</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>1. Correspondência:</strong> "Como acima, assim abaixo"</p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Mudanças no microcosmo (sua mente/energia) refletem no macrocosmo (realidade externa). Transformação interior precede manifestação exterior.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>2. Vibração:</strong> Tudo está em movimento</p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Pensamentos, emoções e objetos possuem frequências vibratórias. Magia opera mudando e direcionando estas vibrações.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>3. Polaridade:</strong> Opostos são aspectos do mesmo</p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Aparentes contradições são pontos diferentes de um espectro. Amor/ódio, sucesso/fracasso podem ser transmutados um no outro.</p>

<blockquote style="border-left: 3px solid #D6342C; padding-left: 20px; font-style: italic; color: #D97706; margin: 20px 0;">
"A magia luciferiana não busca escapar da realidade, mas <em>tornar-se senhor dela</em>. É a arte de ser causa, não efeito."
</blockquote>

<h3 style="color: #D97706; font-family: Cinzel;">Elementos da Operação Mágica</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Intenção Clara:</strong> Objetivo específico, mensurável e alinhado com sua vontade verdadeira.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Estado Gnóstico:</strong> Alteração de consciência que bypassa o ego racional e acessa camadas mais profundas da psique.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Foco de Energia:</strong> Concentração e direcionamento de energia psíquica através de simbolos, gestos, palavras ou visualizações.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Libertação:</strong> Desprendimento do resultado, permitindo que a magia opere sem interferência do ego ansioso.</p>

<h3 style="color: #D97706; font-family: Cinzel;">Magia como Autodivinização</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">No contexto luciferiano, a magia é mais que obtenção de resultados práticos. É um processo de <em>autodivinização</em> — o reconhecimento e desenvolvimento de seus poderes divinos inerentes.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Cada operação mágica bem-sucedida expande sua compreensão de si mesmo como criador de realidade, não vítima de circunstâncias.</p>`,

        pratica: `<h3 style="color: #D97706; font-family: Cinzel;">RITUAL BÁSICO DE MANIFESTAÇÃO</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Escolha do Objetivo:</strong></p>
<ul style="font-family: EB Garamond; font-size: 16px;">
<li>Escolha algo específico e relativamente simples para começar</li>
<li>Algo que você genuinamente deseja, não apenas "testando" a magia</li>
<li>Deve ser possível de acontecer naturalmente (não viole leis físicas)</li>
<li>Tenha um prazo definido (máximo 30 dias)</li>
</ul>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Preparação do Templo:</strong></p>
<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Limpe fisicamente o espaço</li>
<li>Acenda incenso de sua preferência</li>
<li>Uma vela dourada ou branca no centro</li>
<li>Papel e caneta vermelha</li>
<li>Uma tigela de água pura</li>
</ol>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Procedimento:</strong></p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><em>Fase 1 - Purificação:</em></p>
<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Respire profundamente e centralize-se</li>
<li>Declare: "Eu limpo este espaço de todas as energias desnecessárias"</li>
<li>Visualize luz dourada preenchendo o ambiente</li>
</ol>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><em>Fase 2 - Declaração de Poder:</em></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6; font-style: italic; color: #D6342C;">
"Eu sou a chama que molda a realidade.<br>
Eu sou a vontade que manifesta desejos.<br>
Pela força de Luxferat que desperta em mim,<br>
Eu opero esta mudança na realidade."
</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><em>Fase 3 - Foco da Intenção:</em></p>
<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Escreva seu objetivo de forma positiva e presente</li>
<li>Visualize-se já tendo alcançado o resultado</li>
<li>Sinta as emoções de sucesso por 5-10 minutos</li>
<li>Queime o papel na chama da vela</li>
</ol>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><em>Fase 4 - Selamento:</em></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Mergulhe os dedos na água e toque sua testa declarando: "Está feito" e imediatamente mude de atividade.</p>`,

        desafio: `<strong>EXPERIMENTO MÁGICO CONTROLADO</strong>

Conduza um experimento rigoroso de manifestação:

• <strong>Semana 1:</strong> Escolha 3 objetivos diferentes:
  - Um pequeno (probabilidade alta de acontecer naturalmente)
  - Um médio (possível mas improvável)  
  - Um desafiador (possível mas muito improvável)

• <strong>Semana 2:</strong> Execute o ritual para cada objetivo em dias diferentes

• <strong>Semanas 3-4:</strong> Registre TODOS os eventos relacionados aos objetivos, mesmo coincidências aparentemente pequenas

• <strong>Critérios de Sucesso:**
  - Resultado exato = 100% sucesso
  - Resultado similar = 75% sucesso
  - Movimento na direção = 50% sucesso
  - Nenhuma mudança = 0% sucesso

<strong>Importante:</strong> Após cada ritual, pratique "esquecimento ativo" - não fique obcecado pelo resultado. Aja como se tivesse plantado uma semente e agora espera pacientemente.

<em style="color: #D6342C;">Relate detalhadamente seus três experimentos mágicos, incluindo preparação, execução, resultados e sua análise sobre a eficácia da magia como tecnologia de manifestação.</em>`,
        ordem: 5
      },

      {
        curso_id: 1,
        titulo: 'Soberania Espiritual e Autopoder',
        conteudo: `<h2 style="color: #D6342C; font-family: Cinzel Decorative;">SOBERANIA ESPIRITUAL E AUTOPODER</h2>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">A soberania espiritual é o objetivo final de toda prática luciferiana autêntica. Não se trata de rebelião adolescente contra autoridade, mas do <em>reconhecimento maduro</em> de sua divindade inerente e responsabilidade total por sua existência.</p>

<h3 style="color: #D97706; font-family: Cinzel;">Autopoder vs. Poder Sobre Outros</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">O verdadeiro poder luciferiano não busca dominar outros, mas alcançar <strong>domínio completo sobre si mesmo</strong>. Esta distinção é crucial:</p>

<ul style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li><strong style="color: #D6342C;">Poder Falso:</strong> Controle externo, dependência da submissão alheia</li>
<li><strong style="color: #D6342C;">Poder Verdadeiro:</strong> Autocontrole, independência de validação externa</li>
<li><strong style="color: #D6342C;">Poder Falso:</strong> Força bruta e coerção</li>
<li><strong style="color: #D6342C;">Poder Verdadeiro:</strong> Influência através do exemplo e magnetismo pessoal</li>
<li><strong style="color: #D6342C;">Poder Falso:</strong> Baseado no medo dos outros</li>
<li><strong style="color: #D6342C;">Poder Verdadeiro:</strong> Baseado no próprio desenvolvimento interno</li>
</ul>

<h3 style="color: #D97706; font-family: Cinzel;">Os Pilares da Soberania</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>1. Responsabilidade Total:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Assumir 100% de responsabilidade por sua vida, circunstâncias e reações. Mesmo quando não podemos controlar eventos externos, sempre controlamos nossa resposta interna.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>2. Independência Emocional:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Seu bem-estar emocional não depende de aprovação, validação ou comportamento de outros. Você gera sua própria felicidade e sentido de valor.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>3. Clareza de Valores:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Conhecimento profundo de seus valores autênticos, não aqueles impostos por sociedade, família ou cultura. Decisões baseadas em convicção pessoal.</p>

<blockquote style="border-left: 3px solid #D6342C; padding-left: 20px; font-style: italic; color: #D97706; margin: 20px 0;">
"O soberano espiritual não precisa de permissão para existir, de validação para ter valor, nem de autorização para seguir seu caminho."
</blockquote>

<h3 style="color: #D97706; font-family: Cinzel;">Libertação das Prisões Invisíveis</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">A maioria das pessoas vive em prisões invisíveis construídas por:</p>

<ul style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li><strong>Condicionamento Social:</strong> "O que vão pensar se eu..."</li>
<li><strong>Crenças Limitantes:</strong> "Pessoas como eu não podem..."</li>
<li><strong>Medo do Julgamento:</strong> "Preciso ser aceito para ter valor"</li>
<li><strong>Perfeccionismo:</strong> "Se não for perfeito, é um fracasso"</li>
<li><strong>Vitimização:</strong> "Minha vida é resultado de fatores externos"</li>
</ul>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">A soberania espiritual começa reconhecendo essas prisões e escolhendo conscientemente sair delas.</p>

<h3 style="color: #D97706; font-family: Cinzel;">O Processo de Autodivinização</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Autodivinização não é arrogância nem megalomania. É o <em>reconhecimento gradual</em> de suas capacidades divinas inerentes:</p>

<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li><strong>Criação:</strong> Capacidade de criar realidade através de pensamentos, emoções e ações</li>
<li><strong>Transformação:</strong> Poder de transmutar circunstâncias e estados internos</li>
<li><strong>Iluminação:</strong> Habilidade de perceber verdades além das aparências</li>
<li><strong>Compaixão:</strong> Amor impessoal que não depende de reciprocidade</li>
<li><strong>Liberdade:</strong> Transcendência de limitações impostas</li>
</ol>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Cada qualidade se desenvolve através da prática consciente e da observação honesta de si mesmo.</p>`,

        pratica: `<h3 style="color: #D97706; font-family: Cinzel;">RITUAL DE DECLARAÇÃO DE SOBERANIA</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Preparação:</strong></p>
<ul style="font-family: EB Garamond; font-size: 16px;">
<li>Espaço privado e silencioso</li>
<li>Uma coroa ou tiara (mesmo improvisada)</li>
<li>Um espelho de corpo inteiro</li>
<li>Vela dourada</li>
<li>Pergaminho e tinta vermelha</li>
</ul>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Fase 1 - Reconhecimento:</strong></p>
<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Coloque a coroa/tiara</li>
<li>Olhe-se no espelho</li>
<li>Reconheça: "Eu sou o soberano de minha própria existência"</li>
<li>Observe que sentimentos/resistências surgem</li>
</ol>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Declaração de Soberania:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6; font-style: italic; color: #D6342C;">
"Eu [seu nome] declaro minha soberania espiritual completa.<br>
Eu sou o autor de minha realidade.<br>
Eu sou responsável por minhas escolhas.<br>
Eu sou livre das opiniões e expectativas alheias.<br>
Eu governo meus pensamentos, emoções e ações.<br>
Pela chama de Luxferat que arde em meu coração,<br>
Eu reivindico meu trono interior.<br>
Ninguém possui autoridade sobre minha alma exceto eu mesmo."
</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Fase 2 - Carta Constitucional Pessoal:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Escreva sua "Constituição Pessoal" com:</p>
<ul style="font-family: EB Garamond; font-size: 16px;">
<li>Seus valores inegociáveis</li>
<li>Seus direitos como ser soberano</li>
<li>Suas responsabilidades para consigo mesmo</li>
<li>Limites que não permitirá serem violados</li>
</ul>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Prática Diária de Soberania:</strong></p>
<ul style="font-family: EB Garamond; font-size: 16px;">
<li>Antes de cada decisão, pergunte: "Isso alinha com minha soberania?"</li>
<li>Observe quando busca aprovação desnecessária</li>
<li>Pratique dizer "não" sem justificativas elaboradas</li>
<li>Celebre pequenos atos de autodeterminação</li>
</ul>`,

        desafio: `<strong>IMPLEMENTAÇÃO DA SOBERANIA PRÁTICA</strong>

Durante 21 dias, implemente sua soberania em todas as áreas da vida:

• <strong>Semana 1 - Mapeamento:</strong>
  - Identifique todas as áreas onde você se submete desnecessariamente
  - Liste pessoas/situações onde você perde seu poder pessoal
  - Reconheça padrões de busca por aprovação externa

• <strong>Semana 2 - Experimentos de Soberania:</strong>
  - Escolha 3 situações pequenas para praticar autodeterminação
  - Diga "não" para algo que normalmente aceitaria por pressão social
  - Expresse uma opinião autêntica mesmo se for impopular
  - Tome uma decisão baseada em seus valores, não expectativas alheias

• <strong>Semana 3 - Consolidação:**
  - Identifique mudanças em como se sente sobre si mesmo
  - Note como outros reagem à sua nova postura
  - Ajuste estratégias baseado na experiência
  - Planeje como manter estas mudanças permanentemente

<strong>Teste Final:</strong> Identifique a pessoa/situação onde você mais perde seu poder pessoal e crie um plano específico para recuperar sua soberania nesta área.

<em style="color: #D6342C;">Relate sua experiência com o ritual de declaração de soberania, apresente sua Constituição Pessoal e descreva como implementou sua soberania na prática durante os 21 dias, incluindo os desafios enfrentados e transformações observadas.</em>`,
        ordem: 6
      },

      {
        curso_id: 1,
        titulo: 'A Criação de Sua Própria Realidade',
        conteudo: `<h2 style="color: #D6342C; font-family: Cinzel Decorative;">A CRIAÇÃO DE SUA PRÓPRIA REALIDADE</h2>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Este é o ensinamento final e mais avançado do caminho luciferiano: o reconhecimento de que você é o <em>criador consciente</em> de sua realidade. Não apenas influenciador ou participante, mas <strong>arquiteto ativo</strong> de sua experiência existencial.</p>

<h3 style="color: #D97706; font-family: Cinzel;">Além da Lei da Atração</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">A popular "Lei da Atração" é uma versão diluída de um princípio muito mais profundo. A verdadeira criação de realidade opera em múltiplas camadas:</p>

<ul style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li><strong style="color: #D6342C;">Nível Mental:</strong> Crenças fundamentais sobre a natureza da realidade</li>
<li><strong style="color: #D6342C;">Nível Emocional:</strong> Estados vibratórios que atraem experiências resonantes</li>
<li><strong style="color: #D6342C;">Nível Energético:</strong> Manipulação direta de forças sutis</li>
<li><strong style="color: #D6342C;">Nível Físico:</strong> Ações alinhadas com intenção consciente</li>
<li><strong style="color: #D6342C;">Nível Temporal:</strong> Trabalho com linha temporal e probabilidades</li>
</ul>

<h3 style="color: #D97706; font-family: Cinzel;">Os Princípios da Realidade Consciente</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>1. Realidade é Consensual e Pessoal:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Existe uma realidade "consensual" (acordada coletivamente) e uma realidade "pessoal" (sua experiência individual dela). Você tem poder limitado sobre a primeira, mas controle total sobre a segunda.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>2. Observador Afeta o Observado:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Sua consciência não apenas percebe a realidade — ela participa ativamente de sua criação. O ato de observar conscientemente altera aquilo que é observado.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>3. Tempo é Maleável:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">O passado não é fixo e o futuro não é predeterminado. Mudanças na consciência presente podem alterar tanto memórias quanto probabilidades futuras.</p>

<blockquote style="border-left: 3px solid #D6342C; padding-left: 20px; font-style: italic; color: #D97706; margin: 20px 0;">
"Quando você verdadeiramente compreende que é o criador de sua realidade, a vida deixa de ser algo que acontece <em>para</em> você e torna-se algo que acontece <em>através</em> de você."
</blockquote>

<h3 style="color: #D97706; font-family: Cinzel;">Técnicas Avançadas de Manifestação</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Revisão Timeline:</strong> Técnica para "editar" eventos passados alterando seu significado emocional e energético, mudando assim seu impacto no presente.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Projeção Probabilística:</strong> Visualização de múltiplas versões futuras de si mesmo, escolhendo conscientemente qual linha temporal seguir.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Ancoragem Vibracional:</strong> Estabelecimento de "âncoras" energéticas que mantêm você alinhado com a realidade desejada mesmo durante desafios.</p>

<h3 style="color: #D97706; font-family: Cinzel;">A Responsabilidade do Criador</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Com o poder de criar realidade vem responsabilidade absoluta. Isso significa:</p>

<ul style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Parar de culpar circunstâncias externas por sua experiência</li>
<li>Aceitar que você atraiu (consciente ou inconscientemente) tudo em sua vida</li>
<li>Usar este poder com sabedoria e compaixão</li>
<li>Reconhecer que outros também são criadores de suas próprias realidades</li>
</ul>

<h3 style="color: #D97706; font-family: Cinzel;">O Luciferiano Evoluído</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">O praticante luciferiano evoluído não usa seus poderes para dominar ou manipular outros, mas para:</p>

<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Criar uma vida que seja expressão autêntica de sua natureza divina</li>
<li>Ser exemplo inspirador para outros que buscam despertar</li>
<li>Contribuir para elevação da consciência coletiva</li>
<li>Equilibrar poder pessoal com responsabilidade cósmica</li>
</ol>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Esta é a culminação do caminho: <em>tornar-se conscientemente divino</em> enquanto permanece compassivamente humano.</p>`,

        pratica: `<h3 style="color: #D97706; font-family: Cinzel;">RITUAL MESTRE DE CRIAÇÃO DE REALIDADE</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Este é um ritual avançado. Execute apenas após dominar todas as práticas anteriores.</strong></p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Materiais:</strong></p>
<ul style="font-family: EB Garamond; font-size: 16px;">
<li>7 velas (uma de cada cor do espectro)</li>
<li>Um cristal de quartzo transparente</li>
<li>Papel pergaminho virgem</li>
<li>Tinta dourada</li>
<li>Espelho octogonal (ou redondo)</li>
<li>Incenso de copal ou olíbano</li>
</ul>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Fase 1 - Estabelecimento do Templo Temporal:</strong></p>
<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Arrange as velas em círculo com você no centro</li>
<li>Coloque o espelho atrás de você, o cristal à frente</li>
<li>Acenda as velas no sentido horário, começando pelo vermelho</li>
<li>Declare: "Eu abro um portal na matriz da realidade"</li>
</ol>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Invocação do Poder Criador:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6; font-style: italic; color: #D6342C;">
"Eu sou a fonte de minha experiência.<br>
Eu sou o pintor desta tela de realidade.<br>
Eu sou o diretor deste drama cósmico.<br>
Pela chama negra de Luxferat,<br>
Pela força primordial que me anima,<br>
Eu comando que a realidade se molde à minha vontade verdadeira."
</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Fase 2 - Programação da Nova Realidade:</strong></p>
<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Escreva com tinta dourada uma descrição detalhada de sua vida ideal</li>
<li>Seja específico: relacionamentos, carreira, saúde, ambiente, desenvolvimento espiritual</li>
<li>Escreva no presente como se já fosse sua realidade atual</li>
<li>Leia em voz alta três vezes com total convicção</li>
</ol>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Fase 3 - Ancoragem Temporal:</strong></p>
<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Segure o cristal e visualize sua nova realidade com todos os sentidos</li>
<li>Veja-se vivendo esta vida por pelo menos 15 minutos</li>
<li>Sinta as emoções de estar vivendo seus sonhos</li>
<li>Programe o cristal: "Este cristal ancora minha nova realidade"</li>
</ol>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Selamento e Liberação:</strong></p>
<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Queime o pergaminho, carregue o cristal por 30 dias, e nunca mais duvide de que você é o criador consciente de sua realidade.</p>`,

        desafio: `<strong>PROJETO MESTRE: RECRIAÇÃO TOTAL DA VIDA</strong>

Este é o desafio final do curso LUXFERAT. Durante 90 dias, você recriará conscientemente sua vida inteira:

• <strong>Dias 1-30 - Desconstrução:</strong>
  - Identifique todos os aspectos de sua vida atual que não refletem sua verdadeira natureza
  - Reconheça como você criou (consciente ou inconscientemente) cada situação
  - Libere-se energeticamente de tudo que não serve mais

• <strong>Dias 31-60 - Reconstrução:</strong>
  - Implemente mudanças práticas alinhadas com sua visão
  - Use todas as técnicas aprendidas no curso
  - Mantenha diário detalhado de sincronicidades e manifestações

• <strong>Dias 61-90 - Consolidação:</strong>
  - Refine e aperfeiçoe sua nova realidade
  - Desenvolva estratégias para manter as mudanças permanentemente
  - Comece a ensinar outros o que aprendeu

<strong>Marcos de Avaliação:</strong>
- Dia 30: Relatório de desconstrução
- Dia 60: Evidências de manifestações
- Dia 90: Comparação completa vida anterior vs. nova vida

<strong>Critério de Formatura:</strong> Demonstrar transformação mensurável em pelo menos 5 áreas principais da vida através da aplicação consciente dos princípios luciferianos.

<em style="color: #D6342C;">Este é seu projeto final de formatura. Relate todo o processo de 90 dias, documentando como aplicou os ensinamentos de LUXFERAT para recriar completamente sua realidade. Inclua evidências concretas das transformações alcançadas.</em>`,
        ordem: 7
      }
    ];

    // Inserir os novos módulos
    for (const modulo of novosModulos) {
      console.log(`📖 Criando módulo: ${modulo.titulo}`);
      
      const { error: moduloError } = await supabase
        .from('modulos')
        .insert(modulo);
      
      if (moduloError) {
        console.log(`❌ Erro ao criar módulo "${modulo.titulo}":`, moduloError.message);
      } else {
        console.log(`✅ Módulo criado: ${modulo.titulo}`);
      }
    }

    console.log('\n🎉 LUXFERAT agora possui 7 módulos completos!');
    console.log('🔥 Curso de iniciação luciferiana expandido com sucesso');
    console.log('✨ Cada módulo contém teoria profunda, práticas rituais e desafios específicos\n');

  } catch (error) {
    console.error('❌ Erro ao adicionar módulos:', error);
  }
}

// Executar
addLuxferatModules();