import { supabaseService } from './supabase-service.js';

async function createProgressTable() {
  console.log('🔧 Criando tabela user_progress correta...');
  
  try {
    const supabase = supabaseService.getClient();
    
    // Tentar criar tabela através de query SQL direta
    const { data, error } = await supabase.rpc('sql', {
      query: `
        -- Dropar tabela se existir
        DROP TABLE IF EXISTS user_progress CASCADE;
        
        -- Criar nova tabela
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
      `
    });

    if (error) {
      console.error('❌ Erro RPC:', error);
      
      // Tentar método alternativo
      console.log('🔄 Tentando método alternativo...');
      
      // Usar insert direto para testar conexão
      const { data: testData, error: testError } = await supabase
        .from('user_progress')
        .select('*')
        .limit(1);
        
      if (testError && testError.code === 'PGRST116') {
        console.log('✅ Tabela user_progress não existe, isso é esperado');
      } else if (testError) {
        console.error('❌ Erro ao testar tabela:', testError);
      } else {
        console.log('✅ Tabela user_progress já existe com dados:', testData);
      }
      
    } else {
      console.log('✅ Tabela criada via RPC:', data);
    }

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

createProgressTable();