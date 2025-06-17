-- Execute este script no SQL Editor do dashboard do Supabase
-- para completar a estrutura do banco de dados

-- Atualizar tabela library_sections
ALTER TABLE library_sections 
ADD COLUMN IF NOT EXISTS color_scheme TEXT DEFAULT '#D97706';

ALTER TABLE library_sections 
ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'public';

ALTER TABLE library_sections 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Atualizar tabela users  
ALTER TABLE users
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

ALTER TABLE users
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free';

ALTER TABLE users
ADD COLUMN IF NOT EXISTS profile_image_url TEXT;

ALTER TABLE users
ADD COLUMN IF NOT EXISTS theme_preference TEXT DEFAULT 'dark';

ALTER TABLE users
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;

ALTER TABLE users
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;

ALTER TABLE users
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Atualizar tabela grimoires
ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS author_id BIGINT REFERENCES users(id);

ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS excerpt TEXT;

ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS difficulty_level TEXT DEFAULT 'beginner';

ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS estimated_read_time INTEGER DEFAULT 30;

ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS word_count INTEGER DEFAULT 0;

ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'pt-BR';

ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS content_type TEXT DEFAULT 'grimoire';

ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'public';

ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;

ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS rating_average DECIMAL(3,2) DEFAULT 0;

ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0;

ALTER TABLE grimoires
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Atualizar tabela user_progress
ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS chapter_id BIGINT REFERENCES chapters(id);

ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS progress_percentage DECIMAL(5,2) DEFAULT 0;

ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS total_pages INTEGER DEFAULT 1;

ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS reading_time_seconds INTEGER DEFAULT 0;

ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS completion_date TIMESTAMPTZ;

ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Atualizar tabela grimoire_purchases
ALTER TABLE grimoire_purchases
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'BRL';

ALTER TABLE grimoire_purchases
ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'stripe';

ALTER TABLE grimoire_purchases
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

-- Atualizar seções com esquemas de cores corretas
UPDATE library_sections SET color_scheme = '#8b0000' WHERE name = 'Atrium Ignis';
UPDATE library_sections SET color_scheme = '#6a0dad' WHERE name = 'Porta Umbrae';
UPDATE library_sections SET color_scheme = '#003366' WHERE name = 'Arcana Noctis';
UPDATE library_sections SET color_scheme = '#111111' WHERE name = 'Via Tenebris';
UPDATE library_sections SET color_scheme = '#1a0a0a' WHERE name = 'Templo do Abismo';

-- Configurações padrão de IA
INSERT INTO ai_settings (setting_name, personality, complexity, style, guidelines) 
VALUES ('global', 'luciferian', 'beginner', 'mixed', 'Mantenha linguagem acessível mas profunda, evite clichês, foque na filosofia de autodivinização')
ON CONFLICT (setting_name) DO NOTHING;

SELECT 'Database structure updated successfully!' as status;