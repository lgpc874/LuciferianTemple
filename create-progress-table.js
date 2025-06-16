import { createClient } from '@supabase/supabase-js';

async function createProgressTable() {
  const supabaseUrl = process.env.SUPABASE_URL || "https://otyxdolwqhpfpkklefoi.supabase.co";
  const supabaseKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90eXhkb2x3cWhwZnBra2xlZm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NzUyOTksImV4cCI6MjA2NTI1MTI5OX0.lHOgO8tJ9xmMUCcJKhMHFfM6TG7Q3EWo6v5XgwRhFz0";
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log("🔄 Verificando tabela user_progress...");

    // Primeiro, vamos dropar e recriar a tabela com o schema correto
    const { error: dropError } = await supabase.rpc('exec_sql', {
      sql: `
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
        
        CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
        CREATE INDEX idx_user_progress_grimoire_id ON user_progress(grimoire_id);
        CREATE UNIQUE INDEX idx_user_progress_unique ON user_progress(user_id, grimoire_id);
      `
    });

    if (dropError) {
      console.error("❌ Erro ao criar tabela:", dropError);
      
      // Tentar método alternativo usando SQL direto
      console.log("🔄 Tentando método alternativo...");
      
      const queries = [
        "DROP TABLE IF EXISTS user_progress CASCADE",
        `CREATE TABLE user_progress (
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
        )`,
        "CREATE INDEX idx_user_progress_user_id ON user_progress(user_id)",
        "CREATE INDEX idx_user_progress_grimoire_id ON user_progress(grimoire_id)",
        "CREATE UNIQUE INDEX idx_user_progress_unique ON user_progress(user_id, grimoire_id)"
      ];

      for (const query of queries) {
        console.log(`Executando: ${query}`);
        const { error } = await supabase.rpc('exec_sql', { sql: query });
        if (error) {
          console.error(`Erro na query: ${query}`, error);
        }
      }
    } else {
      console.log("✅ Tabela user_progress criada com sucesso!");
    }

    // Inserir dados de teste
    console.log("🔄 Inserindo dados de teste...");
    const { data: testData, error: insertError } = await supabase
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
      console.error("❌ Erro ao inserir dados de teste:", insertError);
    } else {
      console.log("✅ Dados de teste inseridos:", testData);
    }

  } catch (error) {
    console.error("❌ Erro geral:", error);
  }
}

createProgressTable();