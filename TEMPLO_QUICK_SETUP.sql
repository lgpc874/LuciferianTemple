-- =====================================================
-- TEMPLO DO ABISMO - SETUP RÁPIDO
-- Script mínimo para funcionalidades essenciais
-- =====================================================

-- Tabelas essenciais para funcionamento básico
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE library_sections (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  color_scheme TEXT DEFAULT '#D97706',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE grimoires (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  section_id BIGINT REFERENCES library_sections(id) ON DELETE CASCADE,
  price DECIMAL(10,2) DEFAULT 0,
  is_paid BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  grimoire_id BIGINT REFERENCES grimoires(id) ON DELETE CASCADE,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  current_page INTEGER DEFAULT 1,
  last_read_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, grimoire_id)
);

CREATE TABLE ai_settings (
  id BIGSERIAL PRIMARY KEY,
  personality TEXT DEFAULT 'luciferian',
  complexity TEXT DEFAULT 'beginner',
  style TEXT DEFAULT 'mixed',
  guidelines TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS básico
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE grimoires ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_settings ENABLE ROW LEVEL SECURITY;

-- Políticas permissivas
CREATE POLICY "Acesso total" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso total" ON library_sections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso total" ON grimoires FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso total" ON user_progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso total" ON ai_settings FOR ALL USING (true) WITH CHECK (true);

-- Dados iniciais
INSERT INTO users (username, email, password, is_admin) 
VALUES ('admin', 'admin@templodoabismo.com.br', '$2b$10$rQ8K5yUhMhQJhCcDj8zY8OqXJ5kM7Nv4PzB8L9wE2fH6uK1tR3gA5q', true);

INSERT INTO library_sections (name, description, sort_order, color_scheme) VALUES
  ('Atrium Ignis', 'Textos preparatórios para iniciantes', 1, '#8b0000'),
  ('Porta Umbrae', 'Conhecimentos intermediários', 2, '#6a0dad'),
  ('Arcana Noctis', 'Segredos avançados', 3, '#003366'),
  ('Via Tenebris', 'Caminhos superiores', 4, '#111111'),
  ('Templo do Abismo', 'Mistérios mais profundos', 5, '#1a0a0a');

INSERT INTO ai_settings (personality, complexity, style) 
VALUES ('luciferian', 'beginner', 'mixed');

SELECT 'Setup básico concluído!' as status;