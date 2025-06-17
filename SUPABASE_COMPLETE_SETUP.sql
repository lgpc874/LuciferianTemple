-- Script SQL completo para configurar todas as tabelas e políticas no Supabase
-- Execute este script no editor SQL do Supabase Dashboard

-- =======================
-- 1. CRIAR TABELAS BASE
-- =======================

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de seções da biblioteca
CREATE TABLE IF NOT EXISTS library_sections (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de grimórios
CREATE TABLE IF NOT EXISTS grimoires (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  section_id INTEGER REFERENCES library_sections(id) ON DELETE CASCADE,
  price DECIMAL(10,2) DEFAULT 0,
  is_paid BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  unlock_order INTEGER DEFAULT 1,
  cover_image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de capítulos (se ainda usar sistema de capítulos)
CREATE TABLE IF NOT EXISTS chapters (
  id SERIAL PRIMARY KEY,
  grimoire_id INTEGER REFERENCES grimoires(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  chapter_order INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de progresso do usuário
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  grimoire_id INTEGER REFERENCES grimoires(id) ON DELETE CASCADE,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  current_page INTEGER DEFAULT 1,
  last_read_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, grimoire_id)
);

-- Tabela de compras de grimórios
CREATE TABLE IF NOT EXISTS grimoire_purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  grimoire_id INTEGER REFERENCES grimoires(id) ON DELETE CASCADE NOT NULL,
  payment_intent_id TEXT UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  payment_method TEXT DEFAULT 'stripe',
  purchased_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, grimoire_id)
);

-- Tabela de configurações da IA
CREATE TABLE IF NOT EXISTS ai_settings (
  id SERIAL PRIMARY KEY,
  personality TEXT DEFAULT 'luciferian',
  complexity TEXT DEFAULT 'beginner',
  length TEXT DEFAULT 'medium',
  style TEXT DEFAULT 'mixed',
  guidelines TEXT DEFAULT '',
  default_section TEXT DEFAULT '',
  auto_price BOOLEAN DEFAULT false,
  price_range_min DECIMAL(10,2) DEFAULT 9.99,
  price_range_max DECIMAL(10,2) DEFAULT 49.99,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de configurações do sistema
CREATE TABLE IF NOT EXISTS system_settings (
  id SERIAL PRIMARY KEY,
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
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =======================
-- 2. CRIAR ÍNDICES PARA PERFORMANCE
-- =======================

CREATE INDEX IF NOT EXISTS idx_grimoires_section_id ON grimoires(section_id);
CREATE INDEX IF NOT EXISTS idx_grimoires_is_published ON grimoires(is_published);
CREATE INDEX IF NOT EXISTS idx_chapters_grimoire_id ON chapters(grimoire_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_grimoire_id ON user_progress(grimoire_id);
CREATE INDEX IF NOT EXISTS idx_grimoire_purchases_user_id ON grimoire_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_grimoire_purchases_grimoire_id ON grimoire_purchases(grimoire_id);

-- =======================
-- 3. HABILITAR RLS (Row Level Security)
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
-- 4. CRIAR POLÍTICAS RLS PERMISSIVAS
-- =======================

-- Política para usuários (apenas para criação de conta)
DROP POLICY IF EXISTS "Permitir criação de usuários" ON users;
CREATE POLICY "Permitir criação de usuários" ON users FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Usuários podem ver próprio perfil" ON users;
CREATE POLICY "Usuários podem ver próprio perfil" ON users FOR SELECT USING (true);

-- Políticas para seções da biblioteca (leitura livre)
DROP POLICY IF EXISTS "Seções visíveis para todos" ON library_sections;
CREATE POLICY "Seções visíveis para todos" ON library_sections FOR SELECT USING (true);

-- Políticas para grimórios (leitura livre)
DROP POLICY IF EXISTS "Grimórios visíveis para todos" ON grimoires;
CREATE POLICY "Grimórios visíveis para todos" ON grimoires FOR SELECT USING (is_published = true);

-- Políticas para capítulos (leitura livre)
DROP POLICY IF EXISTS "Capítulos visíveis para todos" ON chapters;
CREATE POLICY "Capítulos visíveis para todos" ON chapters FOR SELECT USING (true);

-- Políticas para progresso do usuário
DROP POLICY IF EXISTS "Usuários veem próprio progresso" ON user_progress;
CREATE POLICY "Usuários veem próprio progresso" ON user_progress FOR ALL USING (true);

-- Políticas para compras
DROP POLICY IF EXISTS "Usuários veem próprias compras" ON grimoire_purchases;
CREATE POLICY "Usuários veem próprias compras" ON grimoire_purchases FOR ALL USING (true);

-- Políticas para configurações (acesso livre para admins)
DROP POLICY IF EXISTS "Configurações IA acessíveis" ON ai_settings;
CREATE POLICY "Configurações IA acessíveis" ON ai_settings FOR ALL USING (true);

DROP POLICY IF EXISTS "Configurações sistema acessíveis" ON system_settings;
CREATE POLICY "Configurações sistema acessíveis" ON system_settings FOR ALL USING (true);

-- =======================
-- 5. INSERIR DADOS INICIAIS
-- =======================

-- Inserir usuário admin
INSERT INTO users (username, email, password, is_admin) 
VALUES ('admin', 'admin@templodoabismo.com.br', '$2b$10$rQ8K5yUhMhQJhCcDj8zY8OqXJ5kM7Nv4PzB8L9wE2fH6uK1tR3gA5q', true)
ON CONFLICT (username) DO NOTHING;

-- Inserir seções da biblioteca
INSERT INTO library_sections (name, description, sort_order) VALUES
  ('Atrium Ignis', 'Textos preparatórios para iniciantes no caminho luciferiano', 1),
  ('Porta Umbrae', 'Conhecimentos intermediários sobre magia e filosofia das sombras', 2),
  ('Arcana Noctis', 'Segredos avançados de magia cerimonial e gnose luciferiana', 3),
  ('Via Tenebris', 'Caminhos superiores de maestria e transcendência', 4),
  ('Templo do Abismo', 'Santuário dos mistérios mais profundos canalizados das divindades primordiais', 5)
ON CONFLICT DO NOTHING;

-- =======================
-- 6. CONCEDER PERMISSÕES TOTAIS PARA SERVICE ROLE
-- =======================

-- Permite que o service role faça qualquer operação
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- =======================
-- 7. CONFIGURAÇÕES FINAIS
-- =======================

-- Configurar timezone
SET timezone = 'America/Sao_Paulo';

-- Configuração concluída
SELECT 'Configuração do Supabase concluída com sucesso!' as status;