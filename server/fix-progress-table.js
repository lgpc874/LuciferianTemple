import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixProgressTable() {
  console.log('🔧 Corrigindo tabela user_progress...');
  
  try {
    // Dropar tabela existente
    const { error: dropError } = await supabase.rpc('execute_sql', {
      query: 'DROP TABLE IF EXISTS user_progress CASCADE;'
    });
    
    if (dropError) {
      console.log('⚠️ Aviso ao dropar tabela:', dropError.message);
    }

    // Criar nova tabela
    const { error: createError } = await supabase.rpc('execute_sql', {
      query: `
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
      `
    });

    if (createError) {
      console.error('❌ Erro ao criar tabela:', createError);
      return;
    }

    // Criar índices
    const { error: indexError } = await supabase.rpc('execute_sql', {
      query: `
        CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
        CREATE INDEX idx_user_progress_grimoire_id ON user_progress(grimoire_id);
        CREATE INDEX idx_user_progress_user_grimoire ON user_progress(user_id, grimoire_id);
        CREATE UNIQUE INDEX idx_user_progress_unique ON user_progress(user_id, grimoire_id);
      `
    });

    if (indexError) {
      console.error('❌ Erro ao criar índices:', indexError);
      return;
    }

    console.log('✅ Tabela user_progress criada com sucesso!');

    // Inserir dados de teste
    const { error: insertError } = await supabase
      .from('user_progress')
      .insert({
        user_id: 999,
        grimoire_id: 47,
        current_page: 1,
        total_pages: 1,
        reading_time_minutes: 0
      });

    if (insertError) {
      console.log('⚠️ Aviso ao inserir dados de teste:', insertError.message);
    } else {
      console.log('✅ Dados de teste inseridos com sucesso!');
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

fixProgressTable();