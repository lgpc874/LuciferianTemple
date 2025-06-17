-- Correção da tabela users para incluir coluna is_admin
-- Execute no SQL Editor do Supabase Dashboard

-- Adicionar coluna is_admin se não existir
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Atualizar usuário admin existente
UPDATE users SET is_admin = true WHERE username = 'admin' OR email = 'admin@templodoabismo.com.br';

-- Verificar resultado
SELECT username, email, is_admin FROM users;