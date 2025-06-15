-- Execute este SQL no SQL Editor do Supabase para criar as tabelas da biblioteca

-- 1. Criar tabela library_sections
CREATE TABLE IF NOT EXISTS library_sections (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0 NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Criar tabela grimoires
CREATE TABLE IF NOT EXISTS grimoires (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty_level INTEGER DEFAULT 1 NOT NULL,
  section_id INTEGER REFERENCES library_sections(id) NOT NULL,
  cover_image_url TEXT,
  price DECIMAL(10,2),
  is_paid BOOLEAN DEFAULT false NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  unlock_order INTEGER DEFAULT 0 NOT NULL,
  estimated_reading_time INTEGER DEFAULT 30 NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Criar tabela chapters
CREATE TABLE IF NOT EXISTS chapters (
  id SERIAL PRIMARY KEY,
  grimoire_id INTEGER REFERENCES grimoires(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  estimated_reading_time INTEGER DEFAULT 10 NOT NULL,
  is_unlocked BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Criar tabela user_progress
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  grimoire_id INTEGER REFERENCES grimoires(id) NOT NULL,
  chapter_id INTEGER REFERENCES chapters(id),
  progress_percentage DECIMAL(5,2) DEFAULT 0.00,
  current_page INTEGER DEFAULT 1,
  total_reading_time INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT false NOT NULL,
  last_read_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Inserir seções padrão
INSERT INTO library_sections (name, description, slug, display_order) VALUES
('Porta das Sombras', 'Para os que chegaram ao limiar. Os olhos ainda fechados... mas já sentem o fogo.', 'porta-das-sombras', 1),
('Vestíbulo da Chama', 'O primeiro despertar. A chama interior começa a arder com conhecimento primordial.', 'vestibulo-da-chama', 2),
('Torre dos Selos', 'Ascensão aos mistérios selados. Conhecimentos que poucos ousam desvelar.', 'torre-dos-selos', 3),
('Sanctum Profundum', 'O santuário dos arcanos supremos. Apenas para os que transcenderam o véu.', 'sanctum-profundum', 4),
('Textos Filosóficos', 'Fundamentos filosóficos e teóricos dos ensinamentos luciferianos.', 'textos-filosoficos', 5),
('Meditações Práticas', 'Práticas meditativas e exercícios para desenvolvimento espiritual.', 'meditacoes-praticas', 6)
ON CONFLICT (slug) DO NOTHING;

-- 6. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_grimoires_section_id ON grimoires(section_id);
CREATE INDEX IF NOT EXISTS idx_grimoires_is_active ON grimoires(is_active);
CREATE INDEX IF NOT EXISTS idx_chapters_grimoire_id ON chapters(grimoire_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_grimoire_id ON user_progress(grimoire_id);

-- 7. Habilitar RLS (Row Level Security) se necessário
-- ALTER TABLE library_sections ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE grimoires ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;