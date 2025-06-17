-- Script SQL para criar tabela de compras de cursos no Supabase
-- Execute este script no editor SQL do Supabase Dashboard

-- Criar tabela de compras de cursos
CREATE TABLE IF NOT EXISTS course_purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  course_id INTEGER REFERENCES cursos(id) ON DELETE CASCADE NOT NULL,
  payment_intent_id TEXT UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  payment_method TEXT DEFAULT 'stripe',
  purchased_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_course_purchases_user_id ON course_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_course_purchases_course_id ON course_purchases(course_id);
CREATE INDEX IF NOT EXISTS idx_course_purchases_status ON course_purchases(status);

-- Habilitar RLS (Row Level Security)
ALTER TABLE course_purchases ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Usuários veem apenas suas compras" ON course_purchases FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Usuários podem inserir suas compras" ON course_purchases FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Configuração completa para sistema de compras de cursos