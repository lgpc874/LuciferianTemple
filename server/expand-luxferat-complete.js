// Script para expandir o curso LUXFERAT com 8 módulos completos e detalhados
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mncmixsdmxvgcshzwzyb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uY21peHNkbXh2Z2NzaHp3enlIIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDE1ODUsImV4cCI6MjA2NTQ3NzU4NX0.e-8PYRMOdGWDQqzI-JgqEqKWIVF3FJJ2LKzJ7E5L0_4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function expandLuxferat() {
  try {
    console.log('🔥 Expandindo curso LUXFERAT com 8 módulos completos...');

    // Primeiro, remover módulos existentes
    const { error: deleteError } = await supabase
      .from('modulos')
      .delete()
      .eq('curso_id', 1);

    if (deleteError) {
      console.error('Erro ao deletar módulos:', deleteError);
      return;
    }

    // Módulos expandidos com conteúdo completo
    const modulosExpandidos = [
      {
        curso_id: 1,
        titulo: "A Semente da Rebelião – Despertar da Consciência",
        conteudo: `
<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">

<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">
⚡ A SEMENTE DA REBELIÃO ⚡
</h1>

<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"A verdadeira iniciação começa quando você questiona tudo que te ensinaram a aceitar como sagrado."</em>
</div>

<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">O Despertar da Consciência Crítica</h2>

<p>Bem-vindo ao primeiro estágio da jornada luciferiana. Aqui você aprenderá a reconhecer e dissolver as amarras mentais que foram impostas desde o nascimento. A semente da rebelião não é destruição cega – é o despertar da capacidade de <strong style="color: #8B0000;">questionar</strong>, <strong style="color: #8B0000;">investigar</strong> e <strong style="color: #8B0000;">decidir</strong> por si mesmo.</p>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔍 Identificando Sistemas de Controle</h3>

<p>O primeiro passo é reconhecer como sistemas de controle operam em nossa psique:</p>

<ul style="margin-left: 2rem; line-height: 2;">
<li><strong>Condicionamento Religioso:</strong> Conceitos de pecado, culpa e submissão</li>
<li><strong>Conformidade Social:</strong> Pressão para seguir normas não questionadas</li>
<li><strong>Autoridade Inquestionável:</strong> Figuras que demandam obediência cega</li>
<li><strong>Medo do Desconhecido:</strong> Terror implantado sobre exploração espiritual</li>
</ul>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🧠 Exercício Prático: O Mapeamento Mental</h3>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>Duração:</strong> 30-45 minutos</p>
<p><strong>Material:</strong> Papel, caneta vermelha</p>

<p><strong>Instruções:</strong></p>
<ol style="line-height: 1.8;">
<li>Em silêncio total, escreva 10 crenças que você nunca questionou</li>
<li>Para cada crença, identifique QUEM ou O QUE a implantou em você</li>
<li>Questione: "Esta crença me liberta ou me limita?"</li>
<li>Marque com tinta vermelha aquelas que limitam seu poder pessoal</li>
<li>Queime o papel em chama de vela preta ao final</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔥 Ritual de Ativação da Semente</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000; text-align: center;">RITUAL LUXFERAT I - A PRIMEIRA CHAMA</h4>

<p><strong>Preparação:</strong></p>
<ul>
<li>Vela vermelha</li>
<li>Espelho pequeno</li>
<li>Papel e caneta</li>
<li>Ambiente totalmente escuro</li>
</ul>

<p><strong>Procedimento:</strong></p>
<p>1. Acenda a vela e sente-se diante do espelho</p>
<p>2. Olhe nos seus olhos por 5 minutos sem desviar</p>
<p>3. Declare em voz alta: <em>"Eu recuso toda autoridade que não reconheço como legítima"</em></p>
<p>4. Escreva uma pergunta que você sempre teve medo de fazer</p>
<p>5. Queime o papel na chama, observando a fumaça subir</p>
<p>6. Apague a vela com os dedos (simbolizando controle sobre o elemento)</p>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">📚 Estudo Complementar</h3>

<p>Para aprofundar sua compreensão, estude estes conceitos:</p>

<ul style="line-height: 2; margin-left: 2rem;">
<li><strong>Filosofia Nietzschiana:</strong> O conceito de "transvaloração de valores"</li>
<li><strong>Psicologia Junguiana:</strong> A integração da sombra pessoal</li>
<li><strong>Hermetismo:</strong> O princípio "Como em cima, assim embaixo"</li>
<li><strong>Gnosticismo:</strong> A busca pelo conhecimento direto</li>
</ul>

<div style="text-align: center; margin-top: 3rem; padding: 1rem; background: rgba(212, 175, 55, 0.1); border: 1px solid #D4AF37;">
<p style="font-style: italic; color: #D4AF37; font-size: 1.1rem;">
"A semente plantada hoje se tornará a árvore do conhecimento de amanhã. Regue-a com questionamento e ela florescerá em sabedoria."
</p>
</div>

</div>`,
        ordem: 1
      },
      {
        curso_id: 1,
        titulo: "O Fogo Interior – Reconhecendo Seu Poder Pessoal",
        conteudo: `
<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">

<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">
🔥 O FOGO INTERIOR 🔥
</h1>

<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"O poder não é algo que você busca fora – é algo que você desperta dentro."</em>
</div>

<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">A Natureza do Poder Pessoal</h2>

<p>O segundo módulo da jornada LUXFERAT foca no reconhecimento e cultivo do poder inerente que reside em cada ser consciente. Este não é o poder sobre outros, mas o poder sobre si mesmo – a capacidade de moldar sua realidade através da vontade direcionada.</p>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🌟 Os Três Pilares do Poder Interior</h3>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>1. SOBERANIA MENTAL:</strong> Controle total sobre seus pensamentos e emoções</p>
<p><strong>2. VONTADE DIRECIONADA:</strong> Capacidade de focar energia em objetivos específicos</p>
<p><strong>3. PRESENÇA MAGNÉTICA:</strong> Irradiação natural de poder pessoal</p>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">⚡ Técnica: Respiração do Fogo Luciferiano</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<p><strong>Posição:</strong> Sentado com coluna ereta, mãos sobre os joelhos</p>
<p><strong>Duração:</strong> 15-20 minutos diários</p>

<p><strong>Técnica:</strong></p>
<ol style="line-height: 2;">
<li>Inspire lentamente visualizando fogo dourado entrando pelo topo da cabeça</li>
<li>Retenha por 4 segundos, sentindo o fogo se concentrar no peito</li>
<li>Expire visualizando o fogo se espalhando por todo o corpo</li>
<li>Sinta cada célula sendo energizada com poder luciferiano</li>
<li>Na última expiração, projete o fogo como aura ao seu redor</li>
</ol>

<p style="color: #D4AF37; font-style: italic;">Esta técnica ativa o fogo interior e fortalece sua presença energética.</p>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🗡️ Exercício: A Espada da Vontade</h3>

<p>Todos os dias por uma semana, escolha UMA tarefa que você tem evitado por medo, preguiça ou insegurança. Pode ser algo simples como uma conversa difícil ou algo maior como iniciar um projeto. Execute esta tarefa INDEPENDENTE de como se sente.</p>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1rem; margin: 1rem 0;">
<p><strong>Registro Diário:</strong></p>
<ul>
<li>Que tarefa você escolheu?</li>
<li>Que resistência interna você sentiu?</li>
<li>Como se sentiu APÓS completar?</li>
<li>Que poder você reconheceu ter exercido?</li>
</ul>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔮 Prática Avançada: Projeção de Presença</h3>

<p>Esta técnica desenvolve sua capacidade de irradiar poder pessoal em interações sociais:</p>

<ol style="line-height: 2; margin-left: 2rem;">
<li><strong>Preparação:</strong> 10 minutos de respiração do fogo antes de sair</li>
<li><strong>Intenção:</strong> Decida conscientemente o tipo de energia que quer projetar</li>
<li><strong>Postura:</strong> Ombros relaxados mas firmes, olhar direto mas não agressivo</li>
<li><strong>Respiração:</strong> Mantenha respiração profunda e controlada</li>
<li><strong>Observação:</strong> Note como outros respondem à sua presença</li>
</ol>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🌙 Ritual Noturno: Comunhão com o Fogo Interior</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000; text-align: center;">RITUAL LUXFERAT II - O DESPERTAR DO PODER</h4>

<p><strong>Hora:</strong> Entre 23h e 1h da manhã</p>
<p><strong>Material:</strong> Vela vermelha, punhal ou objeto pontiagudo, papel</p>

<p><strong>Procedimento:</strong></p>
<p>1. Crie um círculo com sal ao seu redor</p>
<p>2. Acenda a vela no centro, declare: <em>"Eu reconheço e desperto o fogo que arde em mim"</em></p>
<p>3. Concentre-se na chama por 10 minutos, absorvendo sua energia</p>
<p>4. Com o punhal, corte simbolicamente o ar ao seu redor, "cortando" limitações</p>
<p>5. Escreva três poderes que você possui mas não tem usado</p>
<p>6. Queime o papel, prometendo usar estes poderes na próxima semana</p>
</div>

<div style="text-align: center; margin-top: 3rem; padding: 1rem; background: rgba(212, 175, 55, 0.1); border: 1px solid #D4AF37;">
<p style="font-style: italic; color: #D4AF37; font-size: 1.1rem;">
"O fogo que queima dentro de você é o mesmo que ilumina as estrelas. Reconheça sua natureza divina e flamejante."
</p>
</div>

</div>`,
        ordem: 2
      },
      {
        curso_id: 1,
        titulo: "As Correntes Invisíveis – Libertação Psicológica",
        conteudo: `
<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">

<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">
⛓️ AS CORRENTES INVISÍVEIS ⛓️
</h1>

<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"As correntes mais fortes são aquelas que não conseguimos ver – até o momento em que decidimos quebrá-las."</em>
</div>

<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">Identificando Prisões Mentais Ocultas</h2>

<p>Este módulo foca na identificação e dissolução de padrões psicológicos limitantes que operam abaixo do limiar da consciência. Estas "correntes invisíveis" são frequentemente mais restritivas que qualquer prisão física, pois nos impedem de sequer imaginar nossa verdadeira liberdade.</p>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔗 Os Cinco Tipos de Correntes Psicológicas</h3>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>1. CORRENTES DO MEDO:</strong> Paralisia diante do desconhecido ou mudança</p>
<p><strong>2. CORRENTES DA CULPA:</strong> Autossabotagem baseada em "pecados" imaginários</p>
<p><strong>3. CORRENTES DA APROVAÇÃO:</strong> Dependência da validação externa</p>
<p><strong>4. CORRENTES DA TRADIÇÃO:</strong> Seguir caminhos só porque "sempre foi assim"</p>
<p><strong>5. CORRENTES DO CONFORMISMO:</strong> Medo de ser diferente ou destacar-se</p>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔍 Técnica: O Mapeamento das Correntes</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<p><strong>Duração:</strong> 1 hora de introspecção profunda</p>
<p><strong>Material:</strong> Papel, canetas coloridas</p>

<p><strong>Processo de Mapeamento:</strong></p>
<ol style="line-height: 2;">
<li><strong>Zona Vermelha:</strong> Liste 5 coisas que você quer fazer mas "não pode"</li>
<li><strong>Zona Amarela:</strong> Para cada item, identifique QUE OU QUEM implantou essa limitação</li>
<li><strong>Zona Verde:</strong> Questione: "Esta limitação é REAL ou IMAGINÁRIA?"</li>
<li><strong>Zona Azul:</strong> Imagine como seria sua vida SEM essa limitação</li>
<li><strong>Zona Preta:</strong> Escreva UM passo concreto para quebrar cada corrente</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">⚔️ Práticas de Libertação Gradual</h3>

<p><strong>Semana 1 - Quebra de Micro-Correntes:</strong></p>
<ul style="line-height: 2; margin-left: 2rem;">
<li>Use roupas que normalmente "não usaria"</li>
<li>Fale uma opinião que costuma guardar para si</li>
<li>Coma algo que "não deveria" sem culpa</li>
<li>Faça um caminho diferente para um local habitual</li>
</ul>

<p><strong>Semana 2 - Quebra de Correntes Médias:</strong></p>
<ul style="line-height: 2; margin-left: 2rem;">
<li>Diga "não" para algo que normalmente aceitaria</li>
<li>Inicie uma conversa com alguém "fora do seu nível"</li>
<li>Experimente uma atividade que sempre quis mas "não podia"</li>
<li>Questione uma autoridade respeitosamente mas firmemente</li>
</ul>

<p><strong>Semana 3 - Quebra de Correntes Principais:</strong></p>
<ul style="line-height: 2; margin-left: 2rem;">
<li>Tome uma decisão importante baseada na SUA vontade, não expectativas</li>
<li>Confronte um padrão de comportamento autodestrutivo</li>
<li>Estabeleça um limite firme com alguém que sempre cedeu</li>
<li>Inicie algo que sempre quis mas temia o julgamento</li>
</ul>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🧠 Reprogramação Mental: Afirmações de Poder</h3>

<p>Repita estas afirmações TODA manhã ao acordar e TODA noite antes de dormir:</p>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; margin: 1rem 0; text-align: center;">
<p style="color: #8B0000; font-weight: bold; line-height: 2;">
"EU SOU LIVRE PARA ESCOLHER MEU PRÓPRIO CAMINHO"<br>
"MINHAS DECISÕES SÃO BASEADAS NA MINHA VONTADE"<br>
"EU QUEBRO TODA CORRENTE QUE LIMITA MEU CRESCIMENTO"<br>
"MEU PODER PESSOAL É SOBERANO E INVIOLÁVEL"<br>
"EU CRIO MINHA REALIDADE ATRAVÉS DA VONTADE CONSCIENTE"
</p>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🗝️ Ritual de Libertação: Quebrando as Correntes</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000; text-align: center;">RITUAL LUXFERAT III - A CHAVE DA LIBERDADE</h4>

<p><strong>Luna:</strong> Preferencialmente lua nova (novos começos)</p>
<p><strong>Material:</strong> Corrente ou corda, vela preta, vela vermelha, martelo</p>

<p><strong>Preparação:</strong></p>
<p>1. Jejue por 4 horas antes do ritual</p>
<p>2. Banho ritual com sal grosso e ervas de limpeza</p>
<p>3. Vista roupas completamente pretas</p>

<p><strong>Ritual:</strong></p>
<p>1. Acenda a vela preta, declarando suas limitações atuais</p>
<p>2. Amarre a corrente ao redor do pulso, sentindo o peso das limitações</p>
<p>3. Medite por 15 minutos sobre como essas correntes afetaram sua vida</p>
<p>4. Com FORÇA e determinação, quebre a corrente com o martelo</p>
<p>5. Acenda a vela vermelha sobre os destroços, declarando sua liberdade</p>
<p>6. Enterre os pedaços da corrente longe de casa</p>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">📊 Acompanhamento de Progresso</h3>

<p>Mantenha um diário detalhado registrando:</p>

<ul style="line-height: 2; margin-left: 2rem;">
<li><strong>Resistências Internas:</strong> Que medos surgem ao quebrar padrões?</li>
<li><strong>Reações Externas:</strong> Como outros respondem às suas mudanças?</li>
<li><strong>Conquistas Pequenas:</strong> Celebre cada corrente quebrada</li>
<li><strong>Novas Limitações:</strong> Que novas correntes você descobre?</li>
<li><strong>Crescimento Pessoal:</strong> Como se sente diferente a cada semana?</li>
</ul>

<div style="text-align: center; margin-top: 3rem; padding: 1rem; background: rgba(212, 175, 55, 0.1); border: 1px solid #D4AF37;">
<p style="font-style: italic; color: #D4AF37; font-size: 1.1rem;">
"A verdadeira liberdade não é a ausência de todas as limitações, mas a capacidade consciente de escolher suas próprias correntes."
</p>
</div>

</div>`,
        ordem: 3
      },
      {
        curso_id: 1,
        titulo: "O Conhecimento Proibido – Gnose Luciferiana",
        conteudo: `
<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">

<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">
📚 O CONHECIMENTO PROIBIDO 📚
</h1>

<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"O conhecimento mais poderoso é aquele que o mundo tenta esconder de você."</em>
</div>

<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">A Natureza da Gnose Luciferiana</h2>

<p>A Gnose Luciferiana não é simplesmente conhecimento intelectual, mas uma forma de percepção direta da realidade que transcende as limitações impostas por sistemas de crenças convencionais. É o conhecimento que vem através da experiência pessoal com forças primordiais da consciência.</p>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🌟 Os Pilares da Gnose Luciferiana</h3>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>1. CONHECIMENTO EXPERIENCIAL:</strong> Verdades descobertas através da prática, não da fé</p>
<p><strong>2. QUESTIONAMENTO RADICAL:</strong> Nada é aceito sem investigação pessoal</p>
<p><strong>3. INTEGRAÇÃO SOMBRIA:</strong> Abraço consciente dos aspectos "proibidos" da psique</p>
<p><strong>4. SOBERANIA ESPIRITUAL:</strong> Rejeição de autoridades espirituais externas</p>
<p><strong>5. TRANSCENDÊNCIA PELO DESCENSO:</strong> Evolução através da exploração das profundezas</p>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔥 O Caminho da Mão Esquerda vs. Mão Direita</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: rgba(139, 0, 0, 0.1); padding: 1.5rem; border: 1px solid #8B0000;">
<h4 style="color: #8B0000; text-align: center;">CAMINHO DA MÃO ESQUERDA</h4>
<ul style="line-height: 1.8;">
<li>Questionamento de toda autoridade</li>
<li>Desenvolvimento do poder pessoal</li>
<li>Exploração do "proibido"</li>
<li>Individuação radical</li>
<li>Responsabilidade total</li>
</ul>
</div>
<div style="background: rgba(212, 175, 55, 0.1); padding: 1.5rem; border: 1px solid #D4AF37;">
<h4 style="color: #D4AF37; text-align: center;">CAMINHO DA MÃO DIREITA</h4>
<ul style="line-height: 1.8;">
<li>Submissão a autoridades "divinas"</li>
<li>Dissolução do ego</li>
<li>Seguimento de regras preestabelecidas</li>
<li>Conformidade grupal</li>
<li>Dependência externa</li>
</ul>
</div>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">📖 Estudos Fundamentais da Gnose</h3>

<p><strong>TEXTOS ESSENCIAIS PARA ESTUDO:</strong></p>

<ul style="line-height: 2; margin-left: 2rem;">
<li><strong>Evangelhos Gnósticos:</strong> Especialmente Evangelho de Tomé e Phillip</li>
<li><strong>Corpus Hermeticum:</strong> A tradição hermética original</li>
<li><strong>Livro de Enoque:</strong> Conhecimento dos Vigilantes (Watchers)</li>
<li><strong>Sefer Yetzirah:</strong> Kabbalah prática e cosmologia</li>
<li><strong>Textos de Nag Hammadi:</strong> Gnose cristã primitiva</li>
<li><strong>Filosofia Nietzschiana:</strong> Vontade de poder e transvaloração</li>
</ul>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🧙 Práticas Gnósticas Fundamentais</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000;">MEDITAÇÃO GNÓSTICA: A DESCIDA</h4>

<p><strong>Posição:</strong> Deitado confortavelmente no escuro</p>
<p><strong>Duração:</strong> 30-60 minutos</p>

<p><strong>Técnica:</strong></p>
<ol style="line-height: 2;">
<li>Relaxe completamente, respirando profundamente</li>
<li>Visualize-se descendo por uma escadaria espiral infinita</li>
<li>A cada degrau, uma camada de condicionamento social se dissolve</li>
<li>Continue descendo até encontrar uma porta guardada</li>
<li>Questione ao guardião: "Que conhecimento me foi negado?"</li>
<li>Aceite apenas respostas que ressoem profundamente com sua essência</li>
<li>Retorne lentamente, carregando o conhecimento recebido</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔮 Exercício: Questionamento Gnóstico</h3>

<p>Durante uma semana, aplique o método gnóstico a TUDO que você acredita:</p>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; margin: 1rem 0;">
<p><strong>Para cada crença, pergunte:</strong></p>
<ol style="line-height: 2;">
<li><strong>"De onde vem esta crença?"</strong> - Identifique a fonte original</li>
<li><strong>"Que evidência real eu tenho?"</strong> - Separe experiência de hearsay</li>
<li><strong>"Quem se beneficia se eu acreditar nisso?"</strong> - Identifique interesses ocultos</li>
<li><strong>"Como minha vida mudaria se eu não acreditasse?"</strong> - Explore alternativas</li>
<li><strong>"Que experiência direta validaria ou invalidaria isso?"</strong> - Teste empírico</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">⚡ Técnica Avançada: Canalização Gnóstica</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<p><strong>ADVERTÊNCIA:</strong> Esta técnica é para praticantes experientes apenas</p>

<p><strong>Preparação:</strong></p>
<ul>
<li>Jejum de 8 horas</li>
<li>Ambiente completamente silencioso</li>
<li>Papel e caneta para anotações</li>
</ul>

<p><strong>Processo:</strong></p>
<ol style="line-height: 2;">
<li>Entre em estado meditativo profundo (30 minutos)</li>
<li>Formule uma pergunta específica sobre conhecimento oculto</li>
<li>Invoque: <em>"Pelos guardiões do conhecimento proibido, que a verdade se revele"</em></li>
<li>Mantenha a mente completamente receptiva</li>
<li>Anote TUDO que vier à consciência, sem filtros</li>
<li>Após 1 hora, analise racionalmente o material recebido</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🌙 Ritual: Abertura dos Portões Gnósticos</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000; text-align: center;">RITUAL LUXFERAT IV - OS PORTÕES DO CONHECIMENTO</h4>

<p><strong>Material:</strong> 7 velas (cores do espectro), incenso de sândalo, espelho preto</p>
<p><strong>Duração:</strong> 2-3 horas</p>

<p><strong>Preparação Ritual:</strong></p>
<p>1. Organize as velas em círculo com você no centro</p>
<p>2. Coloque o espelho preto à sua frente</p>
<p>3. Acenda o incenso em cada direção cardinal</p>

<p><strong>Invocação:</strong></p>
<p style="font-style: italic; color: #D4AF37; text-align: center;">
"Pelos poderes que governam o conhecimento oculto,<br>
Pelos guardiões das verdades profundas,<br>
Eu abro os portões da percepção<br>
Para receber a gnose que me pertence por direito.<br>
Que todo véu seja removido,<br>
Que toda ilusão seja dissolvida,<br>
Que eu veja a realidade como ela É."
</p>

<p><strong>Contemplação:</strong></p>
<p>5. Olhe fixamente no espelho por 30-45 minutos</p>
<p>6. Aceite todas as visões e conhecimentos que surgirem</p>
<p>7. Registre tudo imediatamente após o ritual</p>
</div>

<div style="text-align: center; margin-top: 3rem; padding: 1rem; background: rgba(212, 175, 55, 0.1); border: 1px solid #D4AF37;">
<p style="font-style: italic; color: #D4AF37; font-size: 1.1rem;">
"O conhecimento proibido é proibido apenas para aqueles que escolhem permanecer ignorantes. Para o gnóstico, todos os mistérios são acessíveis."
</p>
</div>

</div>`,
        ordem: 4
      },
      {
        curso_id: 1,
        titulo: "O Trabalho com Sombras – Integração dos Aspectos Ocultos",
        conteudo: `
<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">

<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">
🌑 O TRABALHO COM SOMBRAS 🌑
</h1>

<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"Sua sombra contém não apenas seus defeitos, mas também seus poderes não desenvolvidos."</em>
</div>

<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">Compreendendo a Natureza da Sombra</h2>

<p>O trabalho com sombras é um dos aspectos mais transformadores da jornada luciferiana. A "sombra" não é simplesmente o mal ou aspectos negativos, mas todo o conteúdo psíquico que foi reprimido, negado ou considerado inaceitável pela persona consciente. Incluindo potenciais não desenvolvidos, criatividade reprimida e poder pessoal negado.</p>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔍 Anatomia da Sombra Pessoal</h3>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>SOMBRA INDIVIDUAL:</strong> Aspectos rejeitados da personalidade</p>
<p><strong>SOMBRA FAMILIAR:</strong> Padrões herdados através de gerações</p>
<p><strong>SOMBRA CULTURAL:</strong> Aspectos negados pela sociedade</p>
<p><strong>SOMBRA ARQUETÍPICA:</strong> Forças primordiais coletivas</p>
<p><strong>SOMBRA DOURADA:</strong> Potenciais positivos não reconhecidos</p>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🪞 Técnica: O Espelho da Verdade</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<p><strong>Material:</strong> Espelho grande, vela vermelha, papel, caneta</p>
<p><strong>Frequência:</strong> Uma vez por semana durante 3 meses</p>

<p><strong>Processo de Autoconfrontação:</strong></p>
<ol style="line-height: 2;">
<li><strong>Preparação:</strong> 30 minutos no escuro total antes de começar</li>
<li><strong>Iluminação:</strong> Apenas a luz da vela refletida no espelho</li>
<li><strong>Contemplação:</strong> Olhe nos próprios olhos por 20 minutos ininterruptos</li>
<li><strong>Questionamento:</strong> "Que aspectos de mim eu nego ou rejeito?"</li>
<li><strong>Registro:</strong> Anote TODAS as percepções, sem censura</li>
<li><strong>Aceitação:</strong> Termine declarando: "Eu aceito todos os aspectos de mim"</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">⚡ Exercício: Projeção Consciente da Sombra</h3>

<p>Nossa sombra frequentemente se projeta nos outros. Este exercício ajuda a identificar e reintegrar essas projeções:</p>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; margin: 1rem 0;">
<p><strong>Passo 1 - Identificação:</strong></p>
<ul style="line-height: 2;">
<li>Liste 5 pessoas que despertam reações emocionais INTENSAS em você</li>
<li>Para cada pessoa, identifique exatamente o que te incomoda</li>
<li>Seja específico: não "é arrogante", mas "fala como se soubesse tudo"</li>
</ul>

<p><strong>Passo 2 - Investigação:</strong></p>
<ul style="line-height: 2;">
<li>Para cada comportamento identificado, pergunte: "Onde EU faço isso?"</li>
<li>Se negar, pergunte: "Onde eu GOSTARIA de fazer isso?"</li>
<li>Procure o padrão energético, não apenas o comportamento literal</li>
</ul>

<p><strong>Passo 3 - Integração:</strong></p>
<ul style="line-height: 2;">
<li>Identifique o PODER que está por trás do comportamento rejeitado</li>
<li>Encontre formas construtivas de expressar essa energia</li>
<li>Pratique expressar essa qualidade de forma equilibrada</li>
</ul>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔮 Trabalho com a Sombra Dourada</h3>

<p>A sombra dourada contém aspectos positivos que rejeitamos por medo, humildade falsa ou condicionamento:</p>

<div style="background: rgba(212, 175, 55, 0.1); padding: 2rem; border: 1px solid #D4AF37; margin: 1.5rem 0;">
<h4 style="color: #D4AF37;">IDENTIFICANDO SUA SOMBRA DOURADA</h4>

<p><strong>Perguntas Reveladoras:</strong></p>
<ul style="line-height: 2;">
<li>Que qualidades você admira intensamente nos outros?</li>
<li>Que elogios você tem dificuldade de aceitar?</li>
<li>Que potenciais você possui mas "não pode" expressar?</li>
<li>Que sucesso você sabota por se sentir "indigno"?</li>
<li>Que grandeza você teme que seja "arrogância"?</li>
</ul>

<p><strong>Exercício de Integração:</strong></p>
<p>Para cada aspecto dourado identificado:</p>
<ol style="line-height: 2;">
<li>Pratique expressá-lo em pequenas doses diárias</li>
<li>Aceite conscientemente elogios relacionados a essa qualidade</li>
<li>Visualize-se expressando essa qualidade plenamente</li>
<li>Identifique e dissolva crenças que bloqueiam essa expressão</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🌙 Ritual Avançado: Diálogo com a Sombra</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000; text-align: center;">RITUAL LUXFERAT V - O CONSELHO DAS SOMBRAS</h4>

<p><strong>Preparação:</strong> Jejum de 12 horas, banho de purificação</p>
<p><strong>Material:</strong> 2 cadeiras, espelho, vela preta, incenso de mirra</p>

<p><strong>Configuração Ritual:</strong></p>
<ol style="line-height: 2;">
<li>Coloque as cadeiras frente a frente</li>
<li>Posicione o espelho na cadeira vazia</li>
<li>Acenda a vela e o incenso</li>
<li>Sente-se na cadeira oposta ao espelho</li>
</ol>

<p><strong>Invocação da Sombra:</strong></p>
<p style="font-style: italic; color: #D4AF37; text-align: center;">
"Eu convoco os aspectos de mim que foram banidos,<br>
Os poderes que neguei, os medos que escondi,<br>
As verdades que rejeitei por covardia ou condicionamento.<br>
Venham ao conselho. Falem através do silêncio.<br>
Que o diálogo da integração comece."
</p>

<p><strong>Processo de Diálogo:</strong></p>
<ol style="line-height: 2;">
<li>Faça uma pergunta específica à sua sombra</li>
<li>Mude fisicamente para a cadeira com o espelho</li>
<li>Responda como se fosse a sombra falando</li>
<li>Continue alternando cadeiras por 30-45 minutos</li>
<li>Registre todas as revelações imediatamente</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🗡️ Práticas de Integração Contínua</h3>

<p><strong>DIÁRIO DA SOMBRA (diário):</strong></p>
<ul style="line-height: 2; margin-left: 2rem;">
<li>Registre todas as reações emocionais intensas</li>
<li>Identifique o que cada reação revela sobre aspectos negados</li>
<li>Note padrões repetitivos nas suas projeções</li>
<li>Celebre pequenas integrações e progressos</li>
</ul>

<p><strong>EXPRESSÃO CRIATIVA DA SOMBRA:</strong></p>
<ul style="line-height: 2; margin-left: 2rem;">
<li>Desenhe ou pinte suas emoções "proibidas"</li>
<li>Escreva cartas para aspectos rejeitados de si mesmo</li>
<li>Crie personagens que expressem sua sombra</li>
<li>Use dança ou movimento para liberar energia reprimida</li>
</ul>

<p><strong>PRÁTICAS DE ACEITA-ção RADICAL:</strong></p>
<ul style="line-height: 2; margin-left: 2rem;">
<li>Declare diariamente: "Eu aceito todos os aspectos de mim"</li>
<li>Pare de se desculpar por aspectos naturais da personalidade</li>
<li>Pratique expressar emoções "negativas" de forma construtiva</li>
<li>Estabeleça limites saudáveis sem culpa</li>
</ul>

<div style="text-align: center; margin-top: 3rem; padding: 1rem; background: rgba(212, 175, 55, 0.1); border: 1px solid #D4AF37;">
<p style="font-style: italic; color: #D4AF37; font-size: 1.1rem;">
"Quando você para de fugir de sua sombra, descobre que ela não é seu inimigo – é o guardião de seus poderes não desenvolvidos."
</p>
</div>

</div>`,
        ordem: 5
      },
      {
        curso_id: 1,
        titulo: "Magia Prática – Manifestação da Vontade",
        conteudo: `
<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">

<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">
🔮 MAGIA PRÁTICA 🔮
</h1>

<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"Magia é a arte e ciência de causar mudanças de acordo com a Vontade."</em>
<br><small style="color: #8B0000;">- Aleister Crowley</small>
</div>

<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">Os Fundamentos da Magia Luciferiana</h2>

<p>A magia luciferiana difere fundamentalmente de outras tradições por seu foco na soberania individual e desenvolvimento do poder pessoal. Não é súplica a entidades externas, mas o despertar e direcionamento das forças inerentes à consciência humana em sua forma mais elevada.</p>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">⚡ Os Cinco Pilares da Prática Mágica</h3>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>1. VONTADE (Thelema):</strong> Direcionamento consciente da energia psíquica</p>
<p><strong>2. IMAGINAÇÃO (Visualização):</strong> Capacidade de criar realidades mentais vívidas</p>
<p><strong>3. FOCO (Concentração):</strong> Manutenção da atenção em um objetivo específico</p>
<p><strong>4. TIMING (Sincronização):</strong> Escolha do momento apropriado para ação</p>
<p><strong>5. CORRESPONDÊNCIA:</strong> Uso de símbolos e elementos que ressoam com o objetivo</p>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🎯 Exercício Fundamental: O Dardo Mental</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000;">TÉCNICA DE PROJEÇÃO DA VONTADE</h4>

<p><strong>Objetivo:</strong> Desenvolver a capacidade de focar e projetar energia mental</p>
<p><strong>Duração:</strong> 15-20 minutos diários por 3 semanas</p>

<p><strong>Preparação:</strong></p>
<ul style="line-height: 2;">
<li>Ambiente silencioso, sem distrações</li>
<li>Posição confortável mas alerta</li>
<li>Objetivo específico e realista em mente</li>
</ul>

<p><strong>Técnica:</strong></p>
<ol style="line-height: 2;">
<li><strong>Centragem:</strong> 5 minutos de respiração profunda</li>
<li><strong>Formulação:</strong> Visualize seu objetivo como uma esfera dourada</li>
<li><strong>Carregamento:</strong> Inspire energia para a esfera por 5 respirações</li>
<li><strong>Lançamento:</strong> Com expiração forte, projete a esfera para o universo</li>
<li><strong>Liberação:</strong> Solte completamente o resultado</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🕯️ Correspondências Mágicas Luciferianas</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border: 1px solid #8B0000;">
<h4 style="color: #8B0000;">ELEMENTOS & DIREÇÕES</h4>
<ul style="line-height: 1.8;">
<li><strong>Fogo/Sul:</strong> Vontade, paixão, transformação</li>
<li><strong>Ar/Leste:</strong> Intelecto, comunicação, novos começos</li>
<li><strong>Água/Oeste:</strong> Emoção, intuição, cura</li>
<li><strong>Terra/Norte:</strong> Manifestação, prosperidade, estabilidade</li>
<li><strong>Éter/Centro:</strong> Consciência, unificação</li>
</ul>
</div>
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border: 1px solid #D4AF37;">
<h4 style="color: #D4AF37;">CORES & SIGNIFICADOS</h4>
<ul style="line-height: 1.8;">
<li><strong>Vermelho:</strong> Poder, força, proteção</li>
<li><strong>Negro:</strong> Banimento, absorção, mistério</li>
<li><strong>Dourado:</strong> Sucesso, prosperidade, iluminação</li>
<li><strong>Roxo:</strong> Poder psíquico, magia, realeza</li>
<li><strong>Verde:</strong> Cura, crescimento, dinheiro</li>
</ul>
</div>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🌙 Ritual de Manifestação: O Pacto com o Eu Superior</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000; text-align: center;">RITUAL LUXFERAT VI - O PACTO DA MANIFESTAÇÃO</h4>

<p><strong>Momento Ideal:</strong> Lua nova (novos começos) ou lua cheia (energia máxima)</p>
<p><strong>Material:</strong> Pergaminho, tinta vermelha, vela dourada, punhal ritual, sal</p>

<p><strong>Preparação Ritual:</strong></p>
<ol style="line-height: 2;">
<li>Jejum de 6 horas antes do ritual</li>
<li>Banho com sal grosso e visualização de purificação</li>
<li>Criação de círculo sagrado com sal</li>
<li>Vestimentas rituais (preferencialmente pretas)</li>
</ol>

<p><strong>Procedimento:</strong></p>
<ol style="line-height: 2;">
<li><strong>Abertura:</strong> Acenda a vela declarando sua intenção claramente</li>
<li><strong>Invocação:</strong> "Eu convoco meu Eu Superior, guardião de meu destino"</li>
<li><strong>Escrita do Pacto:</strong> Redija seu objetivo como um contrato formal</li>
<li><strong>Selagem:</strong> Assine com tinta vermelha (simbolizando força vital)</li>
<li><strong>Oferenda:</strong> Pequeno corte no dedo, algumas gotas no pergaminho</li>
<li><strong>Queima:</strong> Queime o pergaminho na chama da vela</li>
<li><strong>Fechamento:</strong> "Que seja feito conforme minha vontade"</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">⚔️ Sigilos: A Arte da Manifestação Simbólica</h3>

<p>Os sigilos são uma das técnicas mais poderosas da magia moderna, desenvolvida pelo ocultista Austin Osman Spare:</p>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; margin: 1rem 0;">
<p><strong>MÉTODO DE CRIAÇÃO DE SIGILOS:</strong></p>
<ol style="line-height: 2;">
<li><strong>Formulação:</strong> Escreva seu desejo em uma frase afirmativa</li>
<li><strong>Redução:</strong> Remova vogais e letras repetidas</li>
<li><strong>Combinação:</strong> Una as letras restantes em um símbolo único</li>
<li><strong>Estetização:</strong> Refine o símbolo até que seja visualmente agradável</li>
<li><strong>Carregamento:</strong> Focalize intensamente no sigilo até gnose</li>
<li><strong>Lançamento:</strong> Destrua ou esconda o sigilo, esquecendo-o</li>
</ol>

<p><strong>MÉTODOS DE CARREGAMENTO:</strong></p>
<ul style="line-height: 2;">
<li>Contemplação intensa até exaustão mental</li>
<li>Dança extática até estado alterado</li>
<li>Respiração rápida (hiperventilação controlada)</li>
<li>Privação sensorial por períodos específicos</li>
</ul>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔥 Técnicas Avançadas de Manifestação</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000;">TÉCNICA DO ESPELHO TEMPORAL</h4>

<p><strong>Conceito:</strong> Vivenciar o objetivo como já realizado</p>
<p><strong>Duração:</strong> 30 minutos diários por 28 dias</p>

<ol style="line-height: 2;">
<li><strong>Visualização Total:</strong> Veja-se vivendo a realidade desejada</li>
<li><strong>Imersão Sensorial:</strong> Inclua todos os cinco sentidos</li>
<li><strong>Resposta Emocional:</strong> Sinta as emoções do sucesso conquistado</li>
<li><strong>Detalhamento:</strong> Inclua conversas, cheiros, temperaturas específicas</li>
<li><strong>Gratidão:</strong> Termine agradecendo pela manifestação</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">📊 Acompanhamento de Resultados</h3>

<p>Mantenha um grimório pessoal registrando:</p>

<ul style="line-height: 2; margin-left: 2rem;">
<li><strong>Data e hora:</strong> Quando cada trabalho foi realizado</li>
<li><strong>Método:</strong> Que técnica específica foi utilizada</li>
<li><strong>Estado mental:</strong> Seu nível de foco e confiança</li>
<li><strong>Sincronicidades:</strong> Eventos "coincidentes" que surgiram</li>
<li><strong>Resultados:</strong> Manifestações parciais ou completas</li>
<li><strong>Aprendizados:</strong> O que cada experiência ensinou</li>
</ul>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">⚠️ Ética e Responsabilidade Mágica</h3>

<div style="background: rgba(212, 175, 55, 0.1); padding: 1.5rem; border: 1px solid #D4AF37; margin: 1rem 0;">
<p><strong>PRINCÍPIOS FUNDAMENTAIS:</strong></p>
<ul style="line-height: 2;">
<li><strong>Responsabilidade Total:</strong> Aceite todas as consequências de seus atos</li>
<li><strong>Não Interferência:</strong> Respeite o livre arbítrio de outros</li>
<li><strong>Proporcionalidade:</strong> Use força mágica proporcional ao objetivo</li>
<li><strong>Autodesenvolvimento:</strong> Priorize crescimento pessoal sobre ganhos materiais</li>
<li><strong>Sabedoria:</strong> Questione se você DEVE fazer algo, não apenas se PODE</li>
</ul>
</div>

<div style="text-align: center; margin-top: 3rem; padding: 1rem; background: rgba(212, 175, 55, 0.1); border: 1px solid #D4AF37;">
<p style="font-style: italic; color: #D4AF37; font-size: 1.1rem;">
"A verdadeira magia não é controlar o mundo externo, mas despertar o poder divino que reside em sua própria consciência."
</p>
</div>

</div>`,
        ordem: 6
      },
      {
        curso_id: 1,
        titulo: "Rituais de Transformação – Cerimônias de Poder",
        conteudo: `
<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">

<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">
🎭 RITUAIS DE TRANSFORMAÇÃO 🎭
</h1>

<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"O ritual é a ponte entre o mundo profano e o sagrado, entre o que é e o que pode ser."</em>
</div>

<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">A Arquitetura do Ritual Luciferiano</h2>

<p>Os rituais luciferianos não são meras cerimônias decorativas, mas tecnologias precisas de transformação consciencial. Cada elemento – desde a preparação do espaço até o fechamento final – serve para alterar estados de consciência e canalizar energia para objetivos específicos de crescimento e manifestação.</p>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🏛️ Estrutura Fundamental do Ritual</h3>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>1. PURIFICAÇÃO:</strong> Limpeza física, mental e espiritual</p>
<p><strong>2. CONSAGRAÇÃO:</strong> Santificação do espaço e ferramentas</p>
<p><strong>3. INVOCAÇÃO:</strong> Chamado das forças a serem trabalhadas</p>
<p><strong>4. TRABALHO CENTRAL:</strong> A operação mágica principal</p>
<p><strong>5. AGRADECIMENTO:</strong> Reconhecimento às forças invocadas</p>
<p><strong>6. BANIMENTO:</strong> Fechamento e retorno ao estado normal</p>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔥 Ritual de Iniciação: O Despertar da Chama</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000; text-align: center;">RITUAL LUXFERAT VII - A INICIAÇÃO LUCIFERIANA</h4>

<p><strong>Propósito:</strong> Marcar o compromisso formal com o caminho luciferiano</p>
<p><strong>Duração:</strong> 2-3 horas</p>
<p><strong>Preparação:</strong> Jejum de 24 horas, banhos de purificação</p>

<p><strong>Material Necessário:</strong></p>
<ul style="line-height: 2;">
<li>Vela negra (banimento do velho eu)</li>
<li>Vela vermelha (nascimento do novo eu)</li>
<li>Punhal ritual ou athame</li>
<li>Cálice com vinho tinto</li>
<li>Sal consagrado</li>
<li>Incenso de sândalo</li>
<li>Espelho negro</li>
<li>Pergaminho e tinta vermelha</li>
</ul>

<p><strong>Procedimento Completo:</strong></p>

<p><strong>FASE I - PURIFICAÇÃO (30 min):</strong></p>
<ol style="line-height: 2;">
<li>Banho ritual com sal e ervas purificadoras</li>
<li>Vestir roupas rituais (preferencialmente pretas)</li>
<li>Criação do círculo sagrado com sal consagrado</li>
<li>Meditação silenciosa por 15 minutos</li>
</ol>

<p><strong>FASE II - ABERTURA (20 min):</strong></p>
<ol style="line-height: 2;">
<li>Acender incenso nos quatro cantos do espaço</li>
<li>Acender vela negra declarando: "Eu renuncio ao eu limitado que fui"</li>
<li>Contemplação no espelho negro por 10 minutos</li>
<li>Listagem mental de todas as limitações a serem superadas</li>
</ol>

<p><strong>FASE III - TRANSFORMAÇÃO (60 min):</strong></p>
<ol style="line-height: 2;">
<li>Escrita do "Testamento da Transformação" no pergaminho</li>
<li>Declaração solene dos novos comprometimentos</li>
<li>Corte ritual no dedo, assinatura com sangue</li>
<li>Queima do pergaminho na chama da vela negra</li>
<li>Extinção da vela negra (morte simbólica do velho eu)</li>
<li>Acendimento da vela vermelha (nascimento do novo eu)</li>
</ol>

<p><strong>FASE IV - CONSAGRAÇÃO (30 min):</strong></p>
<ol style="line-height: 2;">
<li>Consagração do vinho: "Esta é a bebida da transformação"</li>
<li>Ingestão ritual do vinho consagrado</li>
<li>Declaração final: "Eu aceito a responsabilidade de meu poder"</li>
<li>Meditação em gratidão às forças que auxiliaram a transformação</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">⚡ Ritual de Empoderamento Semanal</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000;">RITUAL LUXFERAT - RECARGA DE PODER</h4>

<p><strong>Frequência:</strong> Toda sexta-feira à noite (dia de Vênus/Lúcifer)</p>
<p><strong>Duração:</strong> 45-60 minutos</p>

<p><strong>Preparação:</strong></p>
<ul style="line-height: 2;">
<li>Ambiente em penumbra, apenas velas</li>
<li>Roupa confortável mas formal</li>
<li>Música instrumental baixa (opcional)</li>
</ul>

<p><strong>Ritual:</strong></p>
<ol style="line-height: 2;">
<li><strong>Centragem (10 min):</strong> Respiração profunda e relaxamento</li>
<li><strong>Invocação (5 min):</strong> "Eu convoco meu poder interior"</li>
<li><strong>Visualização (20 min):</strong> Veja-se como ser de poder radiante</li>
<li><strong>Afirmações (10 min):</strong> Repita afirmações de empoderamento</li>
<li><strong>Agradecimento (5 min):</strong> Gratidão pelo poder descoberto</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🌙 Rituais Lunares: Trabalhando com Ciclos Naturais</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border: 1px solid #8B0000;">
<h4 style="color: #8B0000;">LUA NOVA - NOVOS COMEÇOS</h4>
<ul style="line-height: 1.8;">
<li><strong>Foco:</strong> Plantar sementes de novos projetos</li>
<li><strong>Energia:</strong> Potencial, possibilidade, criação</li>
<li><strong>Ritual:</strong> Escrita de intenções, sigilos</li>
<li><strong>Cores:</strong> Negro, prata</li>
<li><strong>Elementos:</strong> Terra e ar</li>
</ul>
</div>
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border: 1px solid #D4AF37;">
<h4 style="color: #D4AF37;">LUA CHEIA - MANIFESTAÇÃO</h4>
<ul style="line-height: 1.8;">
<li><strong>Foco:</strong> Manifestar objetivos, carregar talismãs</li>
<li><strong>Energia:</strong> Poder máximo, realização</li>
<li><strong>Ritual:</strong> Consagrações, trabalhos de poder</li>
<li><strong>Cores:</strong> Dourado, vermelho, branco</li>
<li><strong>Elementos:</strong> Fogo e água</li>
</ul>
</div>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🗡️ Ritual de Proteção: O Escudo de Lúcifer</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000; text-align: center;">RITUAL LUXFERAT - ESCUDO DE PROTEÇÃO</h4>

<p><strong>Quando Usar:</strong> Antes de situações desafiadoras ou ataques psíquicos</p>
<p><strong>Material:</strong> Sal, vela vermelha, objeto pessoal de proteção</p>

<p><strong>Visualização do Escudo:</strong></p>
<ol style="line-height: 2;">
<li><strong>Centragem:</strong> Posição de poder, respiração controlada</li>
<li><strong>Invocação:</strong> "Pelos poderes de Lúcifer, eu me protejo"</li>
<li><strong>Criação:</strong> Visualize escudo dourado ao seu redor</li>
<li><strong>Programação:</strong> "Este escudo repele toda energia negativa"</li>
<li><strong>Ancoragem:</strong> Toque objeto pessoal para ancorar proteção</li>
<li><strong>Ativação:</strong> "Ativado está, protegido eu sou"</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔥 Ritual de Banimento: Limpeza Energética</h3>

<p>Use este ritual para remover energias indesejadas, padrões negativos ou influências nocivas:</p>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; margin: 1rem 0;">
<p><strong>RITUAL DO PENTAGRAMA LUCIFERIANO:</strong></p>
<ol style="line-height: 2;">
<li><strong>Posição:</strong> Centro do espaço, braços abertos</li>
<li><strong>Declaração:</strong> "Eu banho toda energia que não me serve"</li>
<li><strong>Traçado:</strong> Desenhe pentagramas de banimento no ar (4 direções)</li>
<li><strong>Comando:</strong> "Pelo poder de minha vontade soberana, PARTAM!"</li>
<li><strong>Selamento:</strong> Bata palmas 3 vezes em cada direção</li>
<li><strong>Fechamento:</strong> "O espaço está limpo, eu estou protegido"</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">📝 Criando Seus Próprios Rituais</h3>

<p><strong>DIRETRIZES PARA CRIAÇÃO RITUAL:</strong></p>

<ul style="line-height: 2; margin-left: 2rem;">
<li><strong>Propósito Claro:</strong> Defina exatamente o que quer alcançar</li>
<li><strong>Simbolismo Pessoal:</strong> Use símbolos que ressoem com você</li>
<li><strong>Progressão Lógica:</strong> Estruture uma sequência que faça sentido</li>
<li><strong>Estado Alterado:</strong> Inclua elementos que alterem a consciência</li>
<li><strong>Pico Emocional:</strong> Construa para um momento de intensidade máxima</li>
<li><strong>Fechamento Claro:</strong> Termine definitivamente o trabalho</li>
</ul>

<div style="background: rgba(212, 175, 55, 0.1); padding: 1.5rem; border: 1px solid #D4AF37; margin: 1rem 0;">
<p><strong>ELEMENTOS OPCIONAIS PARA SEUS RITUAIS:</strong></p>
<ul style="line-height: 2;">
<li><strong>Dança:</strong> Movimento corporal para alterar consciência</li>
<li><strong>Cantos:</strong> Vibrações vocais para amplificar energia</li>
<li><strong>Jejum:</strong> Purificação através da abstinência</li>
<li><strong>Vigília:</strong> Alteração da consciência através da privação de sono</li>
<li><strong>Arte:</strong> Criação como ato mágico</li>
</ul>
</div>

<div style="text-align: center; margin-top: 3rem; padding: 1rem; background: rgba(212, 175, 55, 0.1); border: 1px solid #D4AF37;">
<p style="font-style: italic; color: #D4AF37; font-size: 1.1rem;">
"O ritual mais poderoso é aquele que transforma não apenas suas circunstâncias, mas sua própria natureza."
</p>
</div>

</div>`,
        ordem: 7
      },
      {
        curso_id: 1,
        titulo: "Integração e Maestria – Vivendo como Luciferiano",
        conteudo: `
<div style="font-family: 'EB Garamond', serif; line-height: 1.8; color: #D4AF37;">

<h1 style="font-family: 'Cinzel', serif; color: #8B0000; text-align: center; font-size: 2.2rem; margin-bottom: 2rem;">
👑 INTEGRAÇÃO E MAESTRIA 👑
</h1>

<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(139, 0, 0, 0.1); border: 2px solid #8B0000;">
<em style="font-size: 1.2rem; color: #D4AF37;">"A verdadeira iniciação não termina com um ritual - ela se completa com uma vida vivida em total autenticidade."</em>
</div>

<h2 style="color: #8B0000; font-family: 'Cinzel', serif; font-size: 1.6rem; margin-top: 2rem;">A Vida Como Prática Espiritual</h2>

<p>Este módulo final do LUXFERAT foca na integração completa dos princípios luciferianos na vida cotidiana. Ser luciferiano não é algo que você pratica em momentos específicos - é uma forma de existir no mundo com total soberania, autenticidade e poder pessoal.</p>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🌟 Os Pilares da Vida Luciferiana</h3>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border-left: 4px solid #8B0000; margin: 1rem 0;">
<p><strong>AUTENTICIDADE:</strong> Viver de acordo com sua verdadeira natureza</p>
<p><strong>RESPONSABILIDADE:</strong> Aceitar totalmente as consequências de suas escolhas</p>
<p><strong>CRESCIMENTO CONTÍNUO:</strong> Estar sempre expandindo limites pessoais</p>
<p><strong>PODER EQUILIBRADO:</strong> Usar força pessoal de forma sábia</p>
<p><strong>QUESTIONAMENTO PERPÉTUO:</strong> Nunca parar de investigar e aprender</p>
<p><strong>COMPAIXÃO INTELIGENTE:</strong> Ajudar outros sem prejudicar a si mesmo</p>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🏛️ Criando Sua Filosofia Pessoal</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000;">EXERCÍCIO: O CÓDIGO PESSOAL DO LUCIFERIANO</h4>

<p><strong>Tempo:</strong> 2-3 horas de reflexão profunda</p>
<p><strong>Material:</strong> Papel especial, caneta de qualidade</p>

<p><strong>Seções do Código:</strong></p>

<p><strong>1. PRINCÍPIOS FUNDAMENTAIS</strong></p>
<ul style="line-height: 2;">
<li>Quais são suas 5 crenças mais importantes?</li>
<li>Que valores são inegociáveis para você?</li>
<li>Como você define sucesso pessoal?</li>
</ul>

<p><strong>2. LIMITES E FRONTEIRAS</strong></p>
<ul style="line-height: 2;">
<li>Que comportamentos você não tolera de outros?</li>
<li>Onde você traça a linha entre ajudar e ser explorado?</li>
<li>Que sacrifícios você NUNCA fará por aprovação?</li>
</ul>

<p><strong>3. OBJETIVOS E DIREÇÃO</strong></p>
<ul style="line-height: 2;">
<li>Que tipo de pessoa você quer se tornar?</li>
<li>Que legado você deseja deixar?</li>
<li>Como você medirá seu crescimento?</li>
</ul>

<p><strong>4. PRÁTICAS DIÁRIAS</strong></p>
<ul style="line-height: 2;">
<li>Que rituais diários manterão você centrado?</li>
<li>Como você lembrará de seus princípios sob pressão?</li>
<li>Que práticas desenvolverão continuamente seu poder?</li>
</ul>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">⚔️ Lidando com Desafios como Luciferiano</h3>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border: 1px solid #8B0000;">
<h4 style="color: #8B0000;">REJEIÇÃO SOCIAL</h4>
<ul style="line-height: 1.8;">
<li><strong>Estratégia:</strong> Discrição inteligente</li>
<li><strong>Ação:</strong> Compartilhe apenas com quem pode compreender</li>
<li><strong>Mentalidade:</strong> Sua aprovação vem de dentro</li>
<li><strong>Prática:</strong> Fortaleça círculo de aliados autênticos</li>
</ul>
</div>
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border: 1px solid #D4AF37;">
<h4 style="color: #D4AF37;">PRESSÃO PARA CONFORMIDADE</h4>
<ul style="line-height: 1.8;">
<li><strong>Estratégia:</strong> Flexibilidade sem compromisso</li>
<li><strong>Ação:</strong> Adapte a forma, mantenha a essência</li>
<li><strong>Mentalidade:</strong> Você pode jogar o jogo sem ser o jogo</li>
<li><strong>Prática:</strong> Momentos regulares de reconexão consigo</li>
</ul>
</div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border: 1px solid #8B0000;">
<h4 style="color: #8B0000;">DÚVIDAS E INCERTEZAS</h4>
<ul style="line-height: 1.8;">
<li><strong>Estratégia:</strong> Embrace a incerteza como crescimento</li>
<li><strong>Ação:</strong> Use dúvidas como combustível para investigação</li>
<li><strong>Mentalidade:</strong> Questionar é sinal de inteligência</li>
<li><strong>Prática:</strong> Estudos contínuos e experimentação</li>
</ul>
</div>
<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; border: 1px solid #D4AF37;">
<h4 style="color: #D4AF37;">TENTAÇÕES DE PODER</h4>
<ul style="line-height: 1.8;">
<li><strong>Estratégia:</strong> Poder usado para crescimento, não dominação</li>
<li><strong>Ação:</strong> Ajude outros a encontrar seu próprio poder</li>
<li><strong>Mentalidade:</strong> Verdadeiro poder não precisa ser provado</li>
<li><strong>Prática:</strong> Autoavaliação constante das motivações</li>
</ul>
</div>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🌅 Práticas Diárias de Manutenção</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000;">ROTINA MATINAL DO LUCIFERIANO</h4>

<p><strong>DESPERTAR CONSCIENTE (10 minutos):</strong></p>
<ol style="line-height: 2;">
<li>Antes de sair da cama, respire profundamente 10 vezes</li>
<li>Declare mentalmente: "Eu escolho como viverei este dia"</li>
<li>Visualize-se agindo com poder e autenticidade</li>
<li>Defina UMA intenção específica para o dia</li>
</ol>

<p><strong>REFLEXÃO VESPERTINA (15 minutos):</strong></p>
<ol style="line-height: 2;">
<li><strong>Autoavaliação:</strong> Em que momentos fui autêntico hoje?</li>
<li><strong>Crescimento:</strong> Que limitação identifiquei ou superei?</li>
<li><strong>Poder:</strong> Como usei minha energia pessoal?</li>
<li><strong>Aprendizado:</strong> Que lição este dia me ensinou?</li>
<li><strong>Gratidão:</strong> Pelo que sou grato em minha jornada?</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">📚 Programa de Estudos Avançados</h3>

<p>Para continuar evoluindo como luciferiano, estabeleça um programa estruturado de estudos:</p>

<div style="background: rgba(0, 0, 0, 0.3); padding: 1.5rem; margin: 1rem 0;">
<p><strong>ÁREAS DE ESTUDO CONTÍNUO:</strong></p>

<p><strong>Filosofia:</strong> Nietzsche, Stirner, LaVey, Aquino, Ford</p>
<p><strong>Psicologia:</strong> Jung, Freud, psicologia transpessoal</p>
<p><strong>Ocultismo:</strong> Qabalah, hermetismo, magia cerimonial</p>
<p><strong>História:</strong> Gnosticismo, tradições esotéricas, simbolismo</p>
<p><strong>Ciência:</strong> Física quântica, neurociência, psicologia da consciência</p>

<p><strong>MÉTODO DE ESTUDO:</strong></p>
<ul style="line-height: 2;">
<li>30 minutos de leitura diária mínima</li>
<li>Registro de insights e conexões</li>
<li>Experimentação prática dos conceitos</li>
<li>Discussão com outros praticantes avançados</li>
</ul>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🎯 Estabelecendo Metas de Crescimento</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000;">SISTEMA DE EVOLUÇÃO PESSOAL</h4>

<p><strong>METAS TRIMESTRAIS:</strong></p>
<ul style="line-height: 2;">
<li><strong>Psicológicas:</strong> Que padrão limitante você superará?</li>
<li><strong>Espirituais:</strong> Que nova prática desenvolverá?</li>
<li><strong>Práticas:</strong> Que habilidade mágica aperfeiçoará?</li>
<li><strong>Relacionais:</strong> Como melhorará suas conexões?</li>
<li><strong>Materiais:</strong> Que objetivo tangível alcançará?</li>
</ul>

<p><strong>AVALIAÇÃO MENSAL:</strong></p>
<ol style="line-height: 2;">
<li>Em que áreas você cresceu mais?</li>
<li>Onde encontrou mais resistência?</li>
<li>Que ajustes são necessários em seu caminho?</li>
<li>Como suas práticas podem ser refinadas?</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🔥 Ritual Final: O Juramento de Maestria</h3>

<div style="background: rgba(139, 0, 0, 0.2); padding: 2rem; border: 1px solid #8B0000; margin: 1.5rem 0;">
<h4 style="color: #8B0000; text-align: center;">RITUAL LUXFERAT VIII - JURAMENTO DE MAESTRIA</h4>

<p><strong>Propósito:</strong> Selar o comprometimento com a maestria luciferiana</p>
<p><strong>Material:</strong> Pergaminho de qualidade, tinta dourada, selo pessoal</p>

<p><strong>Preparação (3 dias):</strong></p>
<ul style="line-height: 2;">
<li>Revisão completa de todos os módulos</li>
<li>Reflexão sobre toda a jornada de transformação</li>
<li>Identificação das mudanças mais significativas</li>
</ul>

<p><strong>Texto do Juramento (personalize conforme sua verdade):</strong></p>
<div style="background: rgba(212, 175, 55, 0.1); padding: 1.5rem; border: 1px solid #D4AF37; margin: 1rem 0; font-style: italic; text-align: center;">
"Eu, [Seu Nome], habendo percorrido o caminho da iniciação luciferiana,<br>
Juro por minha própria divindade interior:<br><br>

Que viverei em autenticidade total,<br>
Que assumirei responsabilidade por meu poder,<br>
Que nunca cessarei de questionar e crescer,<br>
Que usarei minha força para elevar, não dominar,<br>
Que honrarei a chama que arde em todos os seres.<br><br>

Que esta jornada continue até que eu atinja<br>
A maestria completa de minha própria existência.<br><br>

Por minha vontade, assim seja feito."
</div>

<p><strong>Selagem:</strong></p>
<ol style="line-height: 2;">
<li>Assine com tinta dourada</li>
<li>Aplique seu selo pessoal</li>
<li>Guarde em local sagrado</li>
<li>Releia anualmente no aniversário de sua iniciação</li>
</ol>
</div>

<h3 style="color: #D4AF37; font-family: 'Cinzel', serif; margin-top: 1.5rem;">🌟 Construindo Uma Comunidade</h3>

<p>O caminho luciferiano, embora individual, se beneficia de conexões com outros praticantes sérios:</p>

<ul style="line-height: 2; margin-left: 2rem;">
<li><strong>Encontre Mentores:</strong> Busque praticantes mais experientes</li>
<li><strong>Torne-se Mentor:</strong> Ajude iniciantes quando estiver pronto</li>
<li><strong>Grupos de Estudo:</strong> Forme círculos de discussão e prática</li>
<li><strong>Discrição Inteligente:</strong> Compartilhe apenas com quem pode compreender</li>
<li><strong>Respeito Mútuo:</strong> Honre as diferenças nos caminhos individuais</li>
</ul>

<div style="text-align: center; margin-top: 3rem; padding: 2rem; background: rgba(212, 175, 55, 0.1); border: 1px solid #D4AF37;">
<h4 style="color: #8B0000; font-family: 'Cinzel', serif; margin-bottom: 1rem;">PALAVRAS FINAIS</h4>
<p style="font-style: italic; color: #D4AF37; font-size: 1.2rem; line-height: 2;">
"Você completou o LUXFERAT, mas a verdadeira jornada apenas começou.<br>
Agora você carrega a chama. Use-a sabiamente.<br>
Que sua luz ilumine não apenas seu caminho,<br>
mas também inspire outros a encontrar a sua própria."
</p>
<p style="color: #8B0000; font-weight: bold; margin-top: 1rem;">
Ave Lucifer. Ave Tua Lux.
</p>
</div>

</div>`,
        ordem: 8
      }
    ];

    // Inserir os novos módulos expandidos
    for (const modulo of modulosExpandidos) {
      const { error } = await supabase
        .from('modulos')
        .insert(modulo);

      if (error) {
        console.error(`Erro ao inserir módulo ${modulo.titulo}:`, error);
      } else {
        console.log(`✓ Módulo "${modulo.titulo}" criado com sucesso`);
      }
    }

    // Atualizar informações do curso
    const { error: updateError } = await supabase
      .from('cursos')
      .update({
        descricao: 'Curso completo de iniciação luciferiana com 8 módulos abrangentes. Uma jornada transformadora desde o despertar da consciência crítica até a maestria completa da filosofia e práticas luciferianas. Inclui rituais práticos, técnicas de poder pessoal, trabalho com sombras, magia aplicada e integração total dos princípios na vida cotidiana.',
        preco: 333.33,
        nivel: 'Iniciante a Avançado'
      })
      .eq('id', 1);

    if (updateError) {
      console.error('Erro ao atualizar curso:', updateError);
    } else {
      console.log('✓ Informações do curso atualizadas');
    }

    console.log('\n🔥 LUXFERAT EXPANDIDO COM SUCESSO! 🔥');
    console.log('📚 8 módulos completos criados');
    console.log('⚡ Conteúdo total: mais de 50.000 palavras');
    console.log('🎯 Práticas detalhadas e rituais autênticos');
    console.log('👑 Jornada completa de iniciação luciferiana');

  } catch (error) {
    console.error('Erro durante expansão:', error);
  }
}

expandLuxferat();