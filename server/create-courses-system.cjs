// Script para criar sistema de cursos no Supabase
// Execute: node server/create-courses-system.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://flzcnthpxzevdopqqgba.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsemNudGhweHpldmRvcHFxZ2JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NzY5ODEsImV4cCI6MjA2NTI1Mjk4MX0.aOiP6qKUpYbqOyOzXX0A3Y7-d_Q2bQGZqGhP31yC4zw';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis SUPABASE_URL e SUPABASE_ANON_KEY são obrigatórias');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createCoursesSystem() {
  try {
    console.log('🔥 Criando sistema de cursos ocultistas...\n');

    // 1. Criar curso LUXFERAT
    console.log('📚 Criando curso LUXFERAT...');
    const { data: curso, error: cursoError } = await supabase
      .from('cursos')
      .insert({
        nome: 'LUXFERAT — A Chama da Iniciação',
        slug: 'luxferat',
        descricao: 'Curso fundamental de iniciação ao luciferianismo ancestral. Desperte a chama interior e rompa os véus da ilusão através de práticas ancestrais e filosofia oculta.',
        imagem_url: null,
        nivel: 'iniciante',
        preco: '99.99',
        is_paid: true,
        is_active: true,
        ordem_exibicao: 1
      })
      .select()
      .single();

    if (cursoError) {
      if (cursoError.code === '23505') {
        console.log('⚠️  Curso LUXFERAT já existe, buscando...');
        const { data: existingCurso } = await supabase
          .from('cursos')
          .select('*')
          .eq('slug', 'luxferat')
          .single();
        
        if (existingCurso) {
          console.log('✅ Curso LUXFERAT encontrado:', existingCurso.nome);
          await createModules(existingCurso.id);
          return;
        }
      } else {
        throw cursoError;
      }
    } else {
      console.log('✅ Curso LUXFERAT criado:', curso.nome);
      await createModules(curso.id);
    }

  } catch (error) {
    console.error('❌ Erro ao criar sistema de cursos:', error);
    process.exit(1);
  }
}

async function createModules(cursoId) {
  console.log('\n🔥 Criando módulos do curso...');

  const modulos = [
    {
      curso_id: cursoId,
      titulo: 'A Semente do Fogo Oculto',
      conteudo: `<h2 style="color: #D6342C; font-family: Cinzel Decorative;">A SEMENTE DO FOGO OCULTO</h2>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">O luciferianismo ancestral não é uma religião — é o despertar da chama primordial que arde no âmago de cada ser consciente. Antes das religiões organizadas, antes dos dogmas e das escrituras, existia apenas o Fogo.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Este Fogo é <em style="color: #D6342C;">Luxferat</em> — aquele que porta a luz. Não a luz solar que ilumina o mundo físico, mas a chama negra que revela as verdades ocultas nas sombras da existência.</p>

<h3 style="color: #D97706; font-family: Cinzel;">O Véu da Ilusão</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Desde o nascimento, fomos condicionados a aceitar versões diluídas da realidade. As religiões convencionais nos ensinaram a temer nossa própria divindade, a buscar salvação fora de nós mesmos, a aceitar limitações como virtudes.</p>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">O primeiro passo na senda luciferiana é <strong>reconhecer esses condicionamentos</strong> e começar o processo de rompimento. Não através da rebelião vazia, mas através do <em>despertar consciente</em>.</p>

<h3 style="color: #D97706; font-family: Cinzel;">A Natureza do Fogo Interior</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Dentro de cada ser humano arde uma centelha do Fogo Primordial. Esta chama é:</p>

<ul style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li><strong style="color: #D6342C;">Autoconhecimento</strong> — a capacidade de questionar e descobrir nossa verdadeira natureza</li>
<li><strong style="color: #D6342C;">Soberania</strong> — o poder de determinar nosso próprio destino</li>
<li><strong style="color: #D6342C;">Transmutação</strong> — a habilidade de transformar obstáculos em catalisadores</li>
<li><strong style="color: #D6342C;">Iluminação</strong> — a luz que revela tanto a beleza quanto o terror da existência</li>
</ul>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Esta chama não deve ser confundida com ego inflado ou arrogância. Pelo contrário, ela exige <em>disciplina férrea</em> e <em>honestidade brutal</em> consigo mesmo.</p>`,
      pratica: `<h3 style="color: #D97706; font-family: Cinzel;">RITUAL DE BANIMENTO DO CONDICIONAMENTO</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Materiais necessários:</strong></p>
<ul style="font-family: EB Garamond; font-size: 16px;">
<li>Uma vela vermelha ou preta</li>
<li>Papel e caneta</li>
<li>Uma tigela resistente ao fogo</li>
<li>Fósforos ou isqueiro</li>
</ul>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Procedimento:</strong></p>

<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Realize este ritual em um espaço privado, preferencialmente à noite</li>
<li>Acenda a vela e posicione-a à sua frente</li>
<li>No papel, escreva todas as crenças limitantes que foram impostas a você (medos religiosos, conceitos de pecado, limitações sociais)</li>
<li>Olhe fixamente para a chama e declare: <em style="color: #D6342C;">"Eu reconheço as correntes que me foram impostas. Pelo Fogo Interior, eu as dissolvo."</em></li>
<li>Queime o papel na tigela, visualizando cada crença se dissolvendo nas chamas</li>
<li>Quando o papel estiver completamente queimado, declare: <em style="color: #D6342C;">"Que a chama de Luxferat desperte em mim. Que eu seja o arquiteto de minha própria realidade."</em></li>
<li>Apague a vela</li>
</ol>`,
      desafio: `Durante os próximos 3 dias, pratique o <strong>Silêncio Ritual</strong>:

• Evite conversas desnecessárias
• Dedique 30 minutos diários à reflexão silenciosa  
• Mantenha um diário iniciático registrando:
  - Pensamentos que surgem espontaneamente
  - Sonhos e símbolos que aparecem
  - Momentos de resistência interna
  - Insights sobre seus condicionamentos

<em style="color: #D6342C;">Escreva sua experiência com os 3 dias de silêncio ritual e os insights obtidos através do diário iniciático.</em>`,
      ordem: 1
    },
    {
      curso_id: cursoId,
      titulo: 'O Espelho Quebrado do Mundo',
      conteudo: `<h2 style="color: #D6342C; font-family: Cinzel Decorative;">O ESPELHO QUEBRADO DO MUNDO</h2>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">O ego que conhecemos não é nossa verdadeira face — é uma máscara cuidadosamente moldada pelas expectativas externas. Como um espelho quebrado, ele reflete apenas fragmentos distorcidos de nossa essência real.</p>

<h3 style="color: #D97706; font-family: Cinzel;">O Ego Domesticado</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Desde a infância, fomos treinados a desenvolver um "eu" que seja aceito, aprovado, que não cause desconforto aos outros. Este ego domesticado:</p>

<ul style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Busca aprovação constante</li>
<li>Evita confrontos necessários</li>
<li>Suprime impulsos autênticos</li>
<li>Aceita limitações como "realismo"</li>
<li>Teme a própria grandeza</li>
</ul>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Este não é o <em>verdadeiro Eu</em> — é apenas uma performance social que se tornou tão habitual que esquecemos que estamos representando.</p>

<h3 style="color: #D97706; font-family: Cinzel;">A Serpente Interior</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">No simbolismo luciferiano, a serpente representa a <strong>sabedoria primordial</strong> que questiona, que duvida, que busca conhecimento além dos limites impostos. Esta serpente interior é nossa capacidade de:</p>

<blockquote style="border-left: 3px solid #D6342C; padding-left: 20px; font-style: italic; color: #D97706;">
"Ver através das ilusões sociais e religiosas que nos mantêm pequenos e submissos."
</blockquote>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">A serpente não é "má" — ela é <em>necessária</em>. Sem questionar, permanecemos eternamente na ignorância infantil. Sem duvidar, nunca descobrimos verdades mais profundas.</p>

<h3 style="color: #D97706; font-family: Cinzel;">O Eu Oculto</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Por trás do ego domesticado existe o <strong>Eu Oculto</strong> — nossa natureza divina não corrompida por condicionamentos. Este Eu:</p>

<ul style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li><strong style="color: #D6342C;">Conhece seu próprio valor</strong> sem necessidade de validação externa</li>
<li><strong style="color: #D6342C;">Age por convicção</strong>, não por conveniência</li>
<li><strong style="color: #D6342C;">Abraça tanto luz quanto sombra</strong> como aspectos necessários da totalidade</li>
<li><strong style="color: #D6342C;">Cria realidade</strong> ao invés de apenas reagir a ela</li>
</ul>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">O trabalho luciferiano é <em>resgatar este Eu Oculto</em> das camadas de condicionamento que o encobrem.</p>`,
      pratica: `<h3 style="color: #D97706; font-family: Cinzel;">MEDITAÇÃO ABISSAL</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Preparação:</strong></p>
<ul style="font-family: EB Garamond; font-size: 16px;">
<li>Ambiente completamente escuro</li>
<li>Posição confortável sentado</li>
<li>30-45 minutos de tempo ininterrupto</li>
</ul>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;"><strong>Técnica:</strong></p>

<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Feche os olhos e respire profundamente</li>
<li>Visualize-se descendo por uma escadaria espiral que leva às profundezas</li>
<li>Com cada degrau, deixe para trás uma máscara social que você usa</li>
<li>Continue descendo até chegar a uma câmara subterrânea iluminada por chamas</li>
<li>No centro, há um trono. Sente-se nele</li>
<li>Pergunte: <em style="color: #D6342C;">"Quem sou eu quando ninguém está olhando?"</em></li>
<li>Observe as respostas que surgem sem julgamento</li>
<li>Quando terminar, suba lentamente, mantendo a conexão com essa essência</li>
</ol>

<h3 style="color: #D97706; font-family: Cinzel;">TÉCNICA DO ESPELHO</h3>

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Por 7 dias consecutivos:</p>

<ol style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">
<li>Posicione-se diante de um espelho em ambiente com pouca luz</li>
<li>Olhe fixamente nos próprios olhos por 10-15 minutos</li>
<li>Observe as mudanças sutis na percepção de seu rosto</li>
<li>Quando surgir resistência ou desconforto, continue olhando</li>
<li>Registre as experiências em seu diário</li>
</ol>`,
      desafio: `Escreva seu <strong>Manifesto da Heresia Pessoal</strong> — um documento declarando sua independência dos condicionamentos impostos.

<strong>Estrutura sugerida:</strong>

• <em>Renúncias</em>: O que você rejeita (crenças limitantes, medos impostos)
• <em>Afirmações</em>: Quem você verdadeiramente é
• <em>Juramentos</em>: Como você pretende viver sua soberania
• <em>Invocações</em>: Que forças você chama para testemunhar sua transformação

<em style="color: #D6342C;">Compartilhe seu Manifesto da Heresia Pessoal e descreva as experiências obtidas com a Meditação Abissal e a Técnica do Espelho.</em>`,
      ordem: 2
    }
  ];

  for (const modulo of modulos) {
    console.log(`📖 Criando módulo: ${modulo.titulo}`);
    
    const { error: moduloError } = await supabase
      .from('modulos')
      .insert(modulo);
    
    if (moduloError) {
      if (moduloError.code === '23505') {
        console.log(`⚠️  Módulo "${modulo.titulo}" já existe`);
      } else {
        throw moduloError;
      }
    } else {
      console.log(`✅ Módulo criado: ${modulo.titulo}`);
    }
  }

  console.log('\n🔥 Sistema de cursos ocultistas criado com sucesso!');
  console.log('✨ Curso LUXFERAT disponível com 2 módulos iniciáticos');
  console.log('🌐 Acesse /cursos para visualizar o sistema completo\n');
}

// Executar criação
createCoursesSystem();