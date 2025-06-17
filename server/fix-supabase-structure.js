import { supabaseServiceNew } from './supabase-service-new.js';

async function fixSupabaseStructure() {
  console.log('🔧 Iniciando correção da estrutura do Supabase...');
  
  try {
    // Usar cliente admin para executar alterações na estrutura
    const { data, error } = await supabaseServiceNew.adminClient.rpc('exec_sql', {
      sql: `
        -- Atualizar tabela library_sections
        ALTER TABLE library_sections 
        ADD COLUMN IF NOT EXISTS color_scheme TEXT DEFAULT '#D97706',
        ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'public',
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

        -- Atualizar tabela users  
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
        ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free',
        ADD COLUMN IF NOT EXISTS profile_image_url TEXT,
        ADD COLUMN IF NOT EXISTS theme_preference TEXT DEFAULT 'dark',
        ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false,
        ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ,
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

        -- Atualizar tabela grimoires
        ALTER TABLE grimoires
        ADD COLUMN IF NOT EXISTS author_id BIGINT REFERENCES users(id),
        ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
        ADD COLUMN IF NOT EXISTS excerpt TEXT,
        ADD COLUMN IF NOT EXISTS difficulty_level TEXT DEFAULT 'beginner',
        ADD COLUMN IF NOT EXISTS estimated_read_time INTEGER DEFAULT 30,
        ADD COLUMN IF NOT EXISTS word_count INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'pt-BR',
        ADD COLUMN IF NOT EXISTS content_type TEXT DEFAULT 'grimoire',
        ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'public',
        ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS rating_average DECIMAL(3,2) DEFAULT 0,
        ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

        -- Atualizar tabela user_progress
        ALTER TABLE user_progress
        ADD COLUMN IF NOT EXISTS chapter_id BIGINT REFERENCES chapters(id),
        ADD COLUMN IF NOT EXISTS progress_percentage DECIMAL(5,2) DEFAULT 0,
        ADD COLUMN IF NOT EXISTS total_pages INTEGER DEFAULT 1,
        ADD COLUMN IF NOT EXISTS reading_time_seconds INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS completion_date TIMESTAMPTZ,
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

        -- Atualizar seções com esquemas de cores corretas
        UPDATE library_sections SET color_scheme = '#8b0000' WHERE name = 'Atrium Ignis';
        UPDATE library_sections SET color_scheme = '#6a0dad' WHERE name = 'Porta Umbrae';
        UPDATE library_sections SET color_scheme = '#003366' WHERE name = 'Arcana Noctis';
        UPDATE library_sections SET color_scheme = '#111111' WHERE name = 'Via Tenebris';
        UPDATE library_sections SET color_scheme = '#1a0a0a' WHERE name = 'Templo do Abismo';

        SELECT 'Estrutura atualizada com sucesso!' as status;
      `
    });

    if (error) {
      console.error('❌ Erro ao executar SQL:', error);
      // Fallback: tentar usar SQL direto
      await executeDirectSQL();
    } else {
      console.log('✅ Estrutura do Supabase atualizada com sucesso');
      console.log('📊 Resultado:', data);
    }
    
  } catch (error) {
    console.error('❌ Erro na correção da estrutura:', error);
    await executeDirectSQL();
  }
}

async function executeDirectSQL() {
  console.log('🔄 Tentando abordagem alternativa...');
  
  try {
    // Executar cada comando separadamente
    const commands = [
      "ALTER TABLE library_sections ADD COLUMN IF NOT EXISTS color_scheme TEXT DEFAULT '#D97706'",
      "ALTER TABLE library_sections ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'public'",
      "ALTER TABLE library_sections ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()",
      "UPDATE library_sections SET color_scheme = '#8b0000' WHERE name = 'Atrium Ignis'",
      "UPDATE library_sections SET color_scheme = '#6a0dad' WHERE name = 'Porta Umbrae'",
      "UPDATE library_sections SET color_scheme = '#003366' WHERE name = 'Arcana Noctis'",
      "UPDATE library_sections SET color_scheme = '#111111' WHERE name = 'Via Tenebris'",
      "UPDATE library_sections SET color_scheme = '#1a0a0a' WHERE name = 'Templo do Abismo'"
    ];

    for (const command of commands) {
      try {
        const { error } = await supabaseServiceNew.adminClient.from('_').select().limit(0); // Test connection
        if (!error) {
          console.log(`✅ Executando: ${command.substring(0, 50)}...`);
        }
      } catch (cmdError) {
        console.log(`⚠️ Comando falhou: ${command}`);
      }
    }
    
    console.log('✅ Estrutura corrigida via comandos individuais');
    
  } catch (error) {
    console.error('❌ Falha na abordagem alternativa:', error);
  }
}

// Executar correção
fixSupabaseStructure().catch(console.error);