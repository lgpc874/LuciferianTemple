-- SETUP COMPLETO PARA NOVO PROJETO SUPABASE
-- Execute este script no SQL Editor do Supabase Dashboard

-- =======================
-- 1. CRIAR TABELAS BASE
-- =======================

-- Tabela de usuários
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de seções da biblioteca
CREATE TABLE library_sections (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de grimórios
CREATE TABLE grimoires (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  section_id BIGINT REFERENCES library_sections(id) ON DELETE CASCADE,
  price DECIMAL(10,2) DEFAULT 0,
  is_paid BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  unlock_order INTEGER DEFAULT 1,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de capítulos (backup para compatibilidade)
CREATE TABLE chapters (
  id BIGSERIAL PRIMARY KEY,
  grimoire_id BIGINT REFERENCES grimoires(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  chapter_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de progresso do usuário
CREATE TABLE user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  grimoire_id BIGINT REFERENCES grimoires(id) ON DELETE CASCADE,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  current_page INTEGER DEFAULT 1,
  last_read_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, grimoire_id)
);

-- Tabela de compras de grimórios
CREATE TABLE grimoire_purchases (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  grimoire_id BIGINT REFERENCES grimoires(id) ON DELETE CASCADE NOT NULL,
  payment_intent_id TEXT UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  payment_method TEXT DEFAULT 'stripe',
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, grimoire_id)
);

-- Tabela de configurações da IA
CREATE TABLE ai_settings (
  id BIGSERIAL PRIMARY KEY,
  personality TEXT DEFAULT 'luciferian',
  complexity TEXT DEFAULT 'beginner',
  length TEXT DEFAULT 'medium',
  style TEXT DEFAULT 'mixed',
  guidelines TEXT DEFAULT '',
  default_section TEXT DEFAULT '',
  auto_price BOOLEAN DEFAULT false,
  price_range_min DECIMAL(10,2) DEFAULT 9.99,
  price_range_max DECIMAL(10,2) DEFAULT 49.99,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de configurações do sistema
CREATE TABLE system_settings (
  id BIGSERIAL PRIMARY KEY,
  site_name TEXT DEFAULT 'Templo do Abismo',
  site_description TEXT DEFAULT 'Portal de ensinamentos luciferianos',
  site_keywords TEXT DEFAULT 'lucifer, ocultismo, magia, grimórios',
  admin_email TEXT DEFAULT 'admin@templodoabismo.com.br',
  content_language TEXT DEFAULT 'português',
  content_tone TEXT DEFAULT 'formal',
  content_target_audience TEXT DEFAULT 'iniciantes',
  enable_user_registration BOOLEAN DEFAULT true,
  enable_paid_content BOOLEAN DEFAULT true,
  enable_ai_generation BOOLEAN DEFAULT true,
  security_level TEXT DEFAULT 'medium',
  enable_content_protection BOOLEAN DEFAULT true,
  enable_download_protection BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =======================
-- 2. CRIAR ÍNDICES
-- =======================

CREATE INDEX idx_grimoires_section_id ON grimoires(section_id);
CREATE INDEX idx_grimoires_is_published ON grimoires(is_published);
CREATE INDEX idx_chapters_grimoire_id ON chapters(grimoire_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_grimoire_id ON user_progress(grimoire_id);
CREATE INDEX idx_grimoire_purchases_user_id ON grimoire_purchases(user_id);
CREATE INDEX idx_grimoire_purchases_grimoire_id ON grimoire_purchases(grimoire_id);

-- =======================
-- 3. HABILITAR RLS
-- =======================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE grimoires ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE grimoire_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- =======================
-- 4. POLÍTICAS RLS PERMISSIVAS
-- =======================

-- Usuários
CREATE POLICY "Permitir inserção de usuários" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Usuários podem ver dados" ON users FOR SELECT USING (true);
CREATE POLICY "Usuários podem atualizar próprios dados" ON users FOR UPDATE USING (true);

-- Seções da biblioteca
CREATE POLICY "Seções visíveis para todos" ON library_sections FOR SELECT USING (true);
CREATE POLICY "Admins podem gerenciar seções" ON library_sections FOR ALL USING (true);

-- Grimórios
CREATE POLICY "Grimórios publicados visíveis" ON grimoires FOR SELECT USING (is_published = true);
CREATE POLICY "Admins podem gerenciar grimórios" ON grimoires FOR ALL USING (true);

-- Capítulos
CREATE POLICY "Capítulos visíveis para todos" ON chapters FOR SELECT USING (true);
CREATE POLICY "Admins podem gerenciar capítulos" ON chapters FOR ALL USING (true);

-- Progresso do usuário
CREATE POLICY "Usuários veem próprio progresso" ON user_progress FOR ALL USING (true);

-- Compras
CREATE POLICY "Usuários veem próprias compras" ON grimoire_purchases FOR ALL USING (true);

-- Configurações
CREATE POLICY "Configurações acessíveis" ON ai_settings FOR ALL USING (true);
CREATE POLICY "Configurações sistema acessíveis" ON system_settings FOR ALL USING (true);

-- =======================
-- 5. DADOS INICIAIS
-- =======================

-- Usuário admin
INSERT INTO users (username, email, password, is_admin) 
VALUES ('admin', 'admin@templodoabismo.com.br', '$2b$10$rQ8K5yUhMhQJhCcDj8zY8OqXJ5kM7Nv4PzB8L9wE2fH6uK1tR3gA5q', true)
ON CONFLICT (username) DO NOTHING;

-- Seções da biblioteca
INSERT INTO library_sections (name, description, sort_order) VALUES
  ('Atrium Ignis', 'Textos preparatórios para iniciantes no caminho luciferiano', 1),
  ('Porta Umbrae', 'Conhecimentos intermediários sobre magia e filosofia das sombras', 2),
  ('Arcana Noctis', 'Segredos avançados de magia cerimonial e gnose luciferiana', 3),
  ('Via Tenebris', 'Caminhos superiores de maestria e transcendência', 4),
  ('Templo do Abismo', 'Santuário dos mistérios mais profundos canalizados das divindades primordiais', 5)
ON CONFLICT DO NOTHING;

-- Configurações iniciais de IA
INSERT INTO ai_settings (personality, complexity, style, guidelines) VALUES
  ('luciferian', 'beginner', 'mixed', 'Mantenha linguagem acessível mas profunda, evite clichês, foque na filosofia de autodivinização')
ON CONFLICT DO NOTHING;

-- Configurações do sistema
INSERT INTO system_settings DEFAULT VALUES
ON CONFLICT DO NOTHING;

-- =======================
-- 6. PERMISSÕES FINAIS
-- =======================

-- Service role pode fazer tudo
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Confirmar sucesso
SELECT 'Setup do Supabase concluído com sucesso! 🔥' as status;