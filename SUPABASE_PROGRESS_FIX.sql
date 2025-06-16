-- Criar ou recriar tabela user_progress com schema correto
DROP TABLE IF EXISTS user_progress CASCADE;

CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  grimoire_id INTEGER REFERENCES grimoires(id) NOT NULL,
  current_page INTEGER DEFAULT 1,
  total_pages INTEGER DEFAULT 1,
  reading_time_minutes INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT false NOT NULL,
  last_read_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_grimoire_id ON user_progress(grimoire_id);
CREATE INDEX idx_user_progress_user_grimoire ON user_progress(user_id, grimoire_id);

-- Garantir que só existe um registro por usuário/grimório
CREATE UNIQUE INDEX idx_user_progress_unique ON user_progress(user_id, grimoire_id);

-- Inserir dados de teste
INSERT INTO user_progress (user_id, grimoire_id, current_page, total_pages, reading_time_minutes) 
VALUES (999, 47, 1, 50, 5)
ON CONFLICT (user_id, grimoire_id) 
DO UPDATE SET 
  current_page = EXCLUDED.current_page,
  total_pages = EXCLUDED.total_pages,
  reading_time_minutes = EXCLUDED.reading_time_minutes,
  last_read_at = NOW(),
  updated_at = NOW();