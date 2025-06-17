-- Script para atualizar estrutura do Supabase com novo schema
-- Execute no SQL Editor do Supabase Dashboard

-- Atualizar tabela library_sections
ALTER TABLE library_sections 
ADD COLUMN IF NOT EXISTS color_scheme TEXT DEFAULT '#D97706',
ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'public',
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Atualizar tabela users  
ALTER TABLE users
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS profile_image_url TEXT,
ADD COLUMN IF NOT EXISTS theme_preference TEXT DEFAULT 'dark',
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Atualizar tabela grimoires
ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS author_id BIGINT REFERENCES users(id),
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS excerpt TEXT,
ADD COLUMN IF NOT EXISTS difficulty_level TEXT DEFAULT 'beginner',
ADD COLUMN IF NOT EXISTS estimated_read_time INTEGER DEFAULT 30,
ADD COLUMN IF NOT EXISTS word_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'pt-BR',
ADD COLUMN IF NOT EXISTS content_type TEXT DEFAULT 'grimoire',
ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'public',
ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS rating_average DECIMAL(3,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Atualizar tabela user_progress
ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS chapter_id BIGINT REFERENCES chapters(id),
ADD COLUMN IF NOT EXISTS progress_percentage DECIMAL(5,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_pages INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS reading_time_seconds INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS completion_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Atualizar tabela grimoire_purchases
ALTER TABLE grimoire_purchases
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'BRL',
ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'stripe',
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

-- Atualizar tabela ai_settings
ALTER TABLE ai_settings
ADD COLUMN IF NOT EXISTS setting_name TEXT UNIQUE NOT NULL DEFAULT 'global',
ADD COLUMN IF NOT EXISTS default_section_id BIGINT REFERENCES library_sections(id),
ADD COLUMN IF NOT EXISTS model_name TEXT DEFAULT 'gpt-4',
ADD COLUMN IF NOT EXISTS max_tokens INTEGER DEFAULT 4000,
ADD COLUMN IF NOT EXISTS temperature DECIMAL(3,2) DEFAULT 0.7,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Atualizar configurações do sistema para novo formato
DROP TABLE IF EXISTS system_settings;
CREATE TABLE system_settings (
  id BIGSERIAL PRIMARY KEY,
  setting_category TEXT NOT NULL,
  setting_key TEXT NOT NULL,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text',
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(setting_category, setting_key)
);

-- Criar tabela de analytics
CREATE TABLE IF NOT EXISTS content_analytics (
  id BIGSERIAL PRIMARY KEY,
  grimoire_id BIGINT REFERENCES grimoires(id),
  user_id BIGINT REFERENCES users(id),
  event_type TEXT NOT NULL,
  session_id TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Função SQL para estatísticas por seção
CREATE OR REPLACE FUNCTION get_section_stats()
RETURNS TABLE(
  id BIGINT,
  name TEXT,
  grimoire_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ls.id,
    ls.name,
    COUNT(g.id) as grimoire_count
  FROM library_sections ls
  LEFT JOIN grimoires g ON g.section_id = ls.id AND g.is_published = true
  GROUP BY ls.id, ls.name
  ORDER BY ls.sort_order;
END;
$$ LANGUAGE plpgsql;

-- Atualizar seções com esquemas de cores corretas
UPDATE library_sections SET color_scheme = '#8b0000' WHERE name = 'Atrium Ignis';
UPDATE library_sections SET color_scheme = '#6a0dad' WHERE name = 'Porta Umbrae';
UPDATE library_sections SET color_scheme = '#003366' WHERE name = 'Arcana Noctis';
UPDATE library_sections SET color_scheme = '#111111' WHERE name = 'Via Tenebris';
UPDATE library_sections SET color_scheme = '#1a0a0a' WHERE name = 'Templo do Abismo';

-- Atualizar configurações padrão de IA se não existir
INSERT INTO ai_settings (setting_name, personality, complexity, style, guidelines) 
VALUES ('global', 'luciferian', 'beginner', 'mixed', 'Mantenha linguagem acessível mas profunda, evite clichês, foque na filosofia de autodivinização')
ON CONFLICT (setting_name) DO NOTHING;

SELECT 'Estrutura atualizada com sucesso!' as status;