-- Script completo para criar/corrigir tabelas de grimórios no Supabase
-- Execute este SQL no editor SQL do Supabase Dashboard

-- 1. CRIAR TABELA LIBRARY_SECTIONS (se não existir)
CREATE TABLE IF NOT EXISTS library_sections (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(50) DEFAULT '#D4AF37',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CRIAR TABELA GRIMOIRES COMPLETA (SEM CATEGORIA)
DROP TABLE IF EXISTS grimoires CASCADE;
CREATE TABLE grimoires (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  section_id INTEGER REFERENCES library_sections(id) NOT NULL,
  difficulty_level INTEGER DEFAULT 1 NOT NULL,
  cover_image_url TEXT,
  price DECIMAL(10,2),
  is_paid BOOLEAN DEFAULT false NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  is_published BOOLEAN DEFAULT false NOT NULL,
  unlock_order INTEGER DEFAULT 0 NOT NULL,
  word_count INTEGER DEFAULT 0,
  estimated_reading_time INTEGER DEFAULT 30 NOT NULL,
  level TEXT DEFAULT 'iniciante' NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. CRIAR TABELA CHAPTERS
CREATE TABLE IF NOT EXISTS chapters (
  id SERIAL PRIMARY KEY,
  grimoire_id INTEGER REFERENCES grimoires(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  word_count INTEGER DEFAULT 0,
  estimated_reading_time INTEGER DEFAULT 5,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. CRIAR TABELA USER_PROGRESS
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  grimoire_id INTEGER REFERENCES grimoires(id) ON DELETE CASCADE NOT NULL,
  chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  reading_time_minutes INTEGER DEFAULT 0,
  last_read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, grimoire_id, chapter_id)
);

-- 5. CRIAR TABELA GRIMOIRE_PURCHASES
CREATE TABLE IF NOT EXISTS grimoire_purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  grimoire_id INTEGER REFERENCES grimoires(id) ON DELETE CASCADE NOT NULL,
  stripe_payment_intent_id VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'BRL',
  status VARCHAR(50) DEFAULT 'pending',
  purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, grimoire_id)
);

-- 6. CRIAR ÍNDICES PARA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_grimoires_section_id ON grimoires(section_id);
CREATE INDEX IF NOT EXISTS idx_grimoires_is_published ON grimoires(is_published);
CREATE INDEX IF NOT EXISTS idx_grimoires_is_paid ON grimoires(is_paid);
CREATE INDEX IF NOT EXISTS idx_grimoires_level ON grimoires(level);
CREATE INDEX IF NOT EXISTS idx_grimoires_created_at ON grimoires(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chapters_grimoire_id ON chapters(grimoire_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_grimoire_id ON user_progress(grimoire_id);

-- 7. INSERIR SEÇÕES PADRÃO
INSERT INTO library_sections (name, description, icon, sort_order) VALUES
  ('Porta das Sombras', 'Introdução aos mistérios luciferianos', '🚪', 1),
  ('Vestíbulo da Chama', 'Rituais e práticas fundamentais', '🔥', 2),
  ('Torre dos Selos', 'Símbolos e sigilos de poder', '🗼', 3),
  ('Sanctum Profundum', 'Conhecimentos avançados', '⚡', 4)
ON CONFLICT (name) DO NOTHING;

-- 8. INSERIR GRIMÓRIO DE TESTE
INSERT INTO grimoires (
  title,
  description,
  section_id,
  difficulty_level,
  is_paid,
  is_published,
  level,
  word_count,
  estimated_reading_time,
  tags
) VALUES (
  'Grimório de Teste - Sistema Completo',
  'Este grimório foi criado para testar todas as funcionalidades do sistema.',
  1,
  1,
  false,
  true,
  'iniciante',
  500,
  10,
  ARRAY['teste', 'sistema', 'funcional']
) ON CONFLICT DO NOTHING;

-- 9. VERIFICAR ESTRUTURA CRIADA
SELECT 
  'library_sections' as tabela, 
  COUNT(*) as registros 
FROM library_sections
UNION ALL
SELECT 
  'grimoires' as tabela, 
  COUNT(*) as registros 
FROM grimoires
UNION ALL
SELECT 
  'chapters' as tabela, 
  COUNT(*) as registros 
FROM chapters;

-- 10. MOSTRAR ESTRUTURA DAS TABELAS
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'grimoires' AND table_schema = 'public'
ORDER BY ordinal_position;