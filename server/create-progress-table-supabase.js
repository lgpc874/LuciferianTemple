import { createClient } from '@supabase/supabase-js';

async function createProgressTableSupabase() {
  const supabaseUrl = "https://otyxdolwqhpfpkklefoi.supabase.co";
  const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90eXhkb2x3cWhwZnBra2xlZm9pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTY3NTI5OSwiZXhwIjoyMDY1MjUxMjk5fQ.jtpqY8_ViP-t7W7nJWGfCRGvdUXUbV1Vdw5mODM-k6s";
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    console.log("🔄 Criando tabela user_progress via service role...");

    // Primeiro, vamos verificar se a tabela já existe
    const { data: existingTables, error: tableError } = await supabase
      .rpc('get_tables');

    if (tableError) {
      console.log("Info: Não foi possível verificar tabelas existentes");
    }

    // Tentar criar a tabela usando um approach direto
    console.log("🔄 Tentando criar tabela diretamente...");
    
    // Como não podemos executar DDL direto, vamos tentar usar as migrações programáticas
    // Primeiro, verificar se a estrutura atual funciona
    const { data: testSelect, error: selectError } = await supabase
      .from('user_progress')
      .select('*')
      .limit(1);

    if (selectError && selectError.message.includes("relation") && selectError.message.includes("does not exist")) {
      console.log("❌ Tabela user_progress não existe. Precisa ser criada via SQL direto no Supabase.");
      
      // Vamos criar através de uma tentativa de inserção que forçará o schema
      console.log("🔄 Tentando forçar criação através de operação...");
      
      const { error: createError } = await supabase
        .from('user_progress')
        .insert({
          user_id: 999,
          grimoire_id: 47,
          current_page: 1,
          total_pages: 50,
          reading_time_minutes: 5
        });

      if (createError) {
        console.log("Como esperado, erro ao inserir:", createError.message);
      }

    } else if (selectError && selectError.message.includes("reading_time_minutes")) {
      console.log("❌ Tabela existe mas com schema incorreto");
      
      // Vamos tentar inserir usando o schema antigo para verificar a estrutura atual
      const { data: oldStructure, error: oldError } = await supabase
        .from('user_progress')
        .select('*')
        .limit(1);

      if (oldError) {
        console.log("Estrutura atual da tabela é incompatível:", oldError.message);
      } else {
        console.log("Dados existentes na tabela:", oldStructure);
      }

    } else {
      console.log("✅ Tabela existe e funciona! Dados atuais:", testSelect);
      
      // Testar inserção
      const { data: insertTest, error: insertError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: 999,
          grimoire_id: 47,
          current_page: 1,
          total_pages: 50,
          reading_time_minutes: 5
        }, {
          onConflict: 'user_id,grimoire_id'
        })
        .select();

      if (insertError) {
        console.log("❌ Erro ao inserir dados de teste:", insertError);
      } else {
        console.log("✅ Dados de teste inseridos com sucesso:", insertTest);
      }
    }

  } catch (error) {
    console.error("❌ Erro geral:", error);
  }

  console.log("\n📋 INSTRUÇÕES PARA CRIAR A TABELA MANUALMENTE:");
  console.log("1. Acesse o painel do Supabase: https://supabase.com/dashboard");
  console.log("2. Vá para SQL Editor");
  console.log("3. Execute o seguinte SQL:");
  console.log(`
-- Deletar tabela existente se houver problemas
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

-- Criar índices
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_grimoire_id ON user_progress(grimoire_id);
CREATE UNIQUE INDEX idx_user_progress_unique ON user_progress(user_id, grimoire_id);

-- Inserir dados de teste
INSERT INTO user_progress (user_id, grimoire_id, current_page, total_pages, reading_time_minutes) 
VALUES (999, 47, 1, 50, 5);
  `);
}

createProgressTableSupabase();