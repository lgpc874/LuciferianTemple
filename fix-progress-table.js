import { createClient } from '@supabase/supabase-js';

async function fixProgressTable() {
  const supabaseUrl = process.env.SUPABASE_URL || "https://otyxdolwqhpfpkklefoi.supabase.co";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90eXhkb2x3cWhwZnBra2xlZm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NzUyOTksImV4cCI6MjA2NTI1MTI5OX0.lHOgO8tJ9xmMUCcJKhMHFfM6TG7Q3EWo6v5XgwRhFz0";
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log("🔄 Verificando estrutura atual da tabela user_progress...");

    // Tentar inserir um registro para verificar se a tabela existe
    const { data: existingData, error: selectError } = await supabase
      .from('user_progress')
      .select('*')
      .limit(1);

    if (selectError) {
      console.log("❌ Tabela user_progress não existe ou tem problemas:", selectError.message);
    } else {
      console.log("✅ Tabela user_progress existe, dados atuais:", existingData);
    }

    // Como não podemos modificar a estrutura via Supabase client, vamos usar a abordagem da migration
    console.log("\n📝 Por favor, execute o seguinte SQL no painel do Supabase (SQL Editor):");
    console.log("=" * 80);
    console.log(`
-- Deletar tabela existente se houver
DROP TABLE IF EXISTS user_progress CASCADE;

-- Criar nova tabela com schema correto
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

-- Criar índices para performance
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_grimoire_id ON user_progress(grimoire_id);
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

-- Verificar se foi criada corretamente
SELECT * FROM user_progress;
    `);
    console.log("=" * 80);

    // Aguardar alguns segundos e tentar novamente
    console.log("\n⏳ Aguardando 10 segundos para o usuário executar o SQL...");
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Verificar novamente se a tabela foi atualizada
    console.log("🔄 Verificando novamente...");
    const { data: newData, error: newError } = await supabase
      .from('user_progress')
      .select('*')
      .limit(1);

    if (newError) {
      console.log("❌ Ainda há problemas:", newError.message);
    } else {
      console.log("✅ Tabela funcionando! Dados:", newData);
    }

  } catch (error) {
    console.error("❌ Erro geral:", error);
  }
}

fixProgressTable();