-- Script SQL para configuração do sistema de cursos ocultistas no Supabase
-- Execute este script no editor SQL do Supabase Dashboard

-- Criar tabela de cursos
CREATE TABLE IF NOT EXISTS cursos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  descricao TEXT NOT NULL,
  imagem_url TEXT,
  nivel TEXT DEFAULT 'iniciante' NOT NULL,
  preco DECIMAL(10,2),
  is_paid BOOLEAN DEFAULT false NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  ordem_exibicao INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de módulos dos cursos
CREATE TABLE IF NOT EXISTS modulos (
  id SERIAL PRIMARY KEY,
  curso_id INTEGER REFERENCES cursos(id) ON DELETE CASCADE NOT NULL,
  titulo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  pratica TEXT,
  desafio TEXT NOT NULL,
  ordem INTEGER DEFAULT 1 NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de respostas dos usuários aos desafios
CREATE TABLE IF NOT EXISTS respostas_cursos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  modulo_id INTEGER REFERENCES modulos(id) ON DELETE CASCADE NOT NULL,
  resposta TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(usuario_id, modulo_id)
);

-- Criar tabela de progresso dos usuários nos cursos
CREATE TABLE IF NOT EXISTS progresso_cursos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  curso_id INTEGER REFERENCES cursos(id) ON DELETE CASCADE NOT NULL,
  modulo_atual INTEGER DEFAULT 1 NOT NULL,
  modulos_concluidos INTEGER[],
  concluido BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(usuario_id, curso_id)
);

-- Inserir curso inicial LUXFERAT
INSERT INTO cursos (nome, slug, descricao, imagem_url, nivel, preco, is_paid, ordem_exibicao) VALUES 
('LUXFERAT — A Chama da Iniciação', 'luxferat', 'Curso fundamental de iniciação ao luciferianismo ancestral. Desperte a chama interior e rompa os véus da ilusão através de práticas ancestrais e filosofia oculta.', null, 'iniciante', 99.99, true, 1);

-- Inserir módulos do curso LUXFERAT
INSERT INTO modulos (curso_id, titulo, conteudo, pratica, desafio, ordem) VALUES 
(1, 'A Semente do Fogo Oculto', 
'<h2 style="color: #D6342C; font-family: Cinzel Decorative;">A SEMENTE DO FOGO OCULTO</h2>

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

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Esta chama não deve ser confundida com ego inflado ou arrogância. Pelo contrário, ela exige <em>disciplina férrea</em> e <em>honestidade brutal</em> consigo mesmo.</p>',

'<h3 style="color: #D97706; font-family: Cinzel;">RITUAL DE BANIMENTO DO CONDICIONAMENTO</h3>

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
</ol>',

'Durante os próximos 3 dias, pratique o <strong>Silêncio Ritual</strong>:

• Evite conversas desnecessárias
• Dedique 30 minutos diários à reflexão silenciosa  
• Mantenha um diário iniciático registrando:
  - Pensamentos que surgem espontaneamente
  - Sonhos e símbolos que aparecem
  - Momentos de resistência interna
  - Insights sobre seus condicionamentos

<em style="color: #D6342C;">Escreva sua experiência com os 3 dias de silêncio ritual e os insights obtidos através do diário iniciático.</em>', 1),

(1, 'O Espelho Quebrado do Mundo', 
'<h2 style="color: #D6342C; font-family: Cinzel Decorative;">O ESPELHO QUEBRADO DO MUNDO</h2>

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

<p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">O trabalho luciferiano é <em>resgatar este Eu Oculto</em> das camadas de condicionamento que o encobrem.</p>',

'<h3 style="color: #D97706; font-family: Cinzel;">MEDITAÇÃO ABISSAL</h3>

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
</ol>',

'Escreva seu <strong>Manifesto da Heresia Pessoal</strong> — um documento declarando sua independência dos condicionamentos impostos.

<strong>Estrutura sugerida:</strong>

• <em>Renúncias</em>: O que você rejeita (crenças limitantes, medos impostos)
• <em>Afirmações</em>: Quem você verdadeiramente é
• <em>Juramentos</em>: Como você pretende viver sua soberania
• <em>Invocações</em>: Que forças você chama para testemunhar sua transformação

<em style="color: #D6342C;">Compartilhe seu Manifesto da Heresia Pessoal e descreva as experiências obtidas com a Meditação Abissal e a Técnica do Espelho.</em>', 2);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_modulos_curso_id ON modulos(curso_id);
CREATE INDEX IF NOT EXISTS idx_modulos_ordem ON modulos(ordem);
CREATE INDEX IF NOT EXISTS idx_respostas_usuario_id ON respostas_cursos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_respostas_modulo_id ON respostas_cursos(modulo_id);
CREATE INDEX IF NOT EXISTS idx_progresso_usuario_id ON progresso_cursos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_progresso_curso_id ON progresso_cursos(curso_id);

-- Habilitar RLS (Row Level Security)
ALTER TABLE cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE modulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE respostas_cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE progresso_cursos ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para leitura pública de cursos e módulos
CREATE POLICY "Cursos são visíveis para todos" ON cursos FOR SELECT USING (is_active = true);
CREATE POLICY "Módulos são visíveis para todos" ON modulos FOR SELECT USING (is_active = true);

-- Políticas para respostas (usuários só veem suas próprias)
CREATE POLICY "Usuários veem apenas suas respostas" ON respostas_cursos FOR SELECT USING (auth.uid()::text = usuario_id::text);
CREATE POLICY "Usuários podem inserir suas respostas" ON respostas_cursos FOR INSERT WITH CHECK (auth.uid()::text = usuario_id::text);
CREATE POLICY "Usuários podem atualizar suas respostas" ON respostas_cursos FOR UPDATE USING (auth.uid()::text = usuario_id::text);

-- Políticas para progresso (usuários só veem seu próprio progresso)
CREATE POLICY "Usuários veem apenas seu progresso" ON progresso_cursos FOR SELECT USING (auth.uid()::text = usuario_id::text);
CREATE POLICY "Usuários podem inserir seu progresso" ON progresso_cursos FOR INSERT WITH CHECK (auth.uid()::text = usuario_id::text);
CREATE POLICY "Usuários podem atualizar seu progresso" ON progresso_cursos FOR UPDATE USING (auth.uid()::text = usuario_id::text);

-- Concluído! Sistema de cursos configurado no Supabase