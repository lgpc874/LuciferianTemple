-- Script para criar tabelas de configurações no Supabase
-- Execute este SQL no editor SQL do Supabase Dashboard

-- Criar tabela para configurações de IA
CREATE TABLE IF NOT EXISTS ai_settings (
  id SERIAL PRIMARY KEY,
  personality TEXT DEFAULT 'luciferian' NOT NULL,
  complexity TEXT DEFAULT 'beginner' NOT NULL,
  length TEXT DEFAULT 'medium' NOT NULL,
  style TEXT DEFAULT 'mixed' NOT NULL,
  guidelines TEXT DEFAULT '',
  default_section TEXT DEFAULT '',
  auto_price BOOLEAN DEFAULT false NOT NULL,
  price_range_min DECIMAL(10,2) DEFAULT 9.99,
  price_range_max DECIMAL(10,2) DEFAULT 49.99,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela para configurações do sistema
CREATE TABLE IF NOT EXISTS system_settings (
  id SERIAL PRIMARY KEY,
  site_name TEXT DEFAULT 'Templo do Abismo' NOT NULL,
  site_description TEXT DEFAULT 'Portal de ensinamentos luciferianos' NOT NULL,
  site_keywords TEXT DEFAULT 'lucifer, ocultismo, magia, grimórios' NOT NULL,
  admin_email TEXT DEFAULT 'admin@templodoabismo.com' NOT NULL,
  content_language TEXT DEFAULT 'português' NOT NULL,
  content_tone TEXT DEFAULT 'formal' NOT NULL,
  content_target_audience TEXT DEFAULT 'iniciantes' NOT NULL,
  enable_user_registration BOOLEAN DEFAULT true NOT NULL,
  enable_paid_content BOOLEAN DEFAULT true NOT NULL,
  enable_ai_generation BOOLEAN DEFAULT true NOT NULL,
  security_level TEXT DEFAULT 'medium' NOT NULL,
  enable_content_protection BOOLEAN DEFAULT true NOT NULL,
  enable_download_protection BOOLEAN DEFAULT true NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir configurações padrão de IA (apenas se não existir)
INSERT INTO ai_settings (
  personality, 
  complexity, 
  length, 
  style, 
  guidelines, 
  default_section, 
  auto_price, 
  price_range_min, 
  price_range_max
) 
SELECT 
  'luciferian', 
  'beginner', 
  'medium', 
  'mixed', 
  'Crie conteúdo autêntico e respeitoso sobre temas luciferianos, mantendo profundidade filosófica.', 
  'porta-das-sombras', 
  false, 
  9.99, 
  49.99
WHERE NOT EXISTS (SELECT 1 FROM ai_settings LIMIT 1);

-- Inserir configurações padrão do sistema (apenas se não existir)
INSERT INTO system_settings (
  site_name,
  site_description,
  site_keywords,
  admin_email,
  content_language,
  content_tone,
  content_target_audience,
  enable_user_registration,
  enable_paid_content,
  enable_ai_generation,
  security_level,
  enable_content_protection,
  enable_download_protection
)
SELECT 
  'Templo do Abismo',
  'Portal de ensinamentos luciferianos e biblioteca digital de grimórios',
  'lucifer, ocultismo, magia, grimórios, ensinamentos, filosofia',
  'admin@templodoabismo.com',
  'português',
  'formal',
  'iniciantes e intermediários',
  true,
  true,
  true,
  'high',
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM system_settings LIMIT 1);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_ai_settings_updated_at ON ai_settings(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_system_settings_updated_at ON system_settings(updated_at DESC);

-- Comentários para documentação
COMMENT ON TABLE ai_settings IS 'Configurações globais para geração de conteúdo com IA';
COMMENT ON TABLE system_settings IS 'Configurações gerais do sistema Templo do Abismo';

-- Verificar se as tabelas foram criadas com sucesso
SELECT 'ai_settings' as tabela, COUNT(*) as registros FROM ai_settings
UNION ALL
SELECT 'system_settings' as tabela, COUNT(*) as registros FROM system_settings;