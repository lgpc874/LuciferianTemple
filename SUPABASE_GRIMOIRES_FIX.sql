-- Script para corrigir e completar a estrutura da tabela grimoires no Supabase
-- Execute este SQL no editor SQL do Supabase Dashboard

-- Primeiro, verificar se a tabela existe e adicionar colunas que podem estar faltando
ALTER TABLE grimoires 
ADD COLUMN IF NOT EXISTS content TEXT,
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Grimório' NOT NULL,
ADD COLUMN IF NOT EXISTS difficulty_level INTEGER DEFAULT 1 NOT NULL,
ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
ADD COLUMN IF NOT EXISTS price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS is_paid BOOLEAN DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true NOT NULL,
ADD COLUMN IF NOT EXISTS unlock_order INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS word_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS estimated_reading_time INTEGER DEFAULT 30 NOT NULL,
ADD COLUMN IF NOT EXISTS level TEXT DEFAULT 'iniciante' NOT NULL,
ADD COLUMN IF NOT EXISTS tags TEXT[];

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_grimoires_section_id ON grimoires(section_id);
CREATE INDEX IF NOT EXISTS idx_grimoires_is_published ON grimoires(is_published);
CREATE INDEX IF NOT EXISTS idx_grimoires_is_paid ON grimoires(is_paid);
CREATE INDEX IF NOT EXISTS idx_grimoires_level ON grimoires(level);
CREATE INDEX IF NOT EXISTS idx_grimoires_created_at ON grimoires(created_at DESC);

-- Inserir um grimório de teste para verificar se funciona
INSERT INTO grimoires (
  title,
  description,
  content,
  section_id,
  category,
  difficulty_level,
  is_paid,
  is_published,
  level,
  word_count,
  estimated_reading_time,
  tags
) VALUES (
  'Grimório de Teste - Criação Automática',
  'Este grimório foi criado automaticamente para testar a funcionalidade do sistema.',
  'Conteúdo de exemplo para verificar se a criação de grimórios está funcionando corretamente no Supabase.',
  1,
  'Teste',
  1,
  false,
  true,
  'iniciante',
  150,
  5,
  ARRAY['teste', 'automático', 'verificação']
) ON CONFLICT DO NOTHING;

-- Verificar se o grimório foi criado
SELECT COUNT(*) as total_grimoires FROM grimoires;
SELECT id, title, created_at, is_published FROM grimoires ORDER BY created_at DESC LIMIT 5;