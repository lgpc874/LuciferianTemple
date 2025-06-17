import { supabaseServiceNew } from './supabase-service-new';

async function fixDatabaseStructure() {
  console.log('🔧 Atualizando estrutura do banco de dados...');
  
  try {
    // Teste de conectividade primeiro
    const testResult = await supabaseServiceNew.testConnection();
    console.log('📊 Status da conexão:', testResult);
    
    if (testResult.status === 'SUCCESS') {
      console.log('✅ Conexão com Supabase confirmada');
      
      // Executar comandos SQL para atualizar estrutura
      const sqlCommands = [
        "ALTER TABLE library_sections ADD COLUMN IF NOT EXISTS color_scheme TEXT DEFAULT '#D97706'",
        "ALTER TABLE library_sections ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'public'",
        "ALTER TABLE library_sections ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free'",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_image_url TEXT",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS theme_preference TEXT DEFAULT 'dark'",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS author_id BIGINT REFERENCES users(id)",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS excerpt TEXT",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS difficulty_level TEXT DEFAULT 'beginner'",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS estimated_read_time INTEGER DEFAULT 30",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS word_count INTEGER DEFAULT 0",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'pt-BR'",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS content_type TEXT DEFAULT 'grimoire'",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'public'",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS rating_average DECIMAL(3,2) DEFAULT 0",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0",
        "ALTER TABLE grimoires ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()",
        "UPDATE library_sections SET color_scheme = '#8b0000' WHERE name = 'Atrium Ignis'",
        "UPDATE library_sections SET color_scheme = '#6a0dad' WHERE name = 'Porta Umbrae'",
        "UPDATE library_sections SET color_scheme = '#003366' WHERE name = 'Arcana Noctis'",
        "UPDATE library_sections SET color_scheme = '#111111' WHERE name = 'Via Tenebris'",
        "UPDATE library_sections SET color_scheme = '#1a0a0a' WHERE name = 'Templo do Abismo'"
      ];
      
      console.log('🔄 Executando comandos SQL...');
      let successCount = 0;
      
      for (const command of sqlCommands) {
        try {
          const { error } = await supabaseServiceNew.adminClient.rpc('exec_sql', { sql: command });
          
          if (!error) {
            successCount++;
            console.log(`✅ ${command.substring(0, 50)}...`);
          } else {
            console.log(`⚠️ ${command.substring(0, 50)}... (${error.message})`);
          }
        } catch (cmdError: any) {
          console.log(`⚠️ ${command.substring(0, 50)}... (erro local)`);
        }
      }
      
      console.log(`✅ Estrutura atualizada: ${successCount}/${sqlCommands.length} comandos executados`);
      
      // Verificar se as seções podem ser criadas agora
      await testSectionCreation();
      
    } else {
      console.log('❌ Falha na conexão com Supabase');
    }
    
  } catch (error) {
    console.error('❌ Erro durante atualização:', error);
  }
}

async function testSectionCreation() {
  console.log('🧪 Testando criação de seções...');
  
  try {
    const sections = await supabaseServiceNew.getLibrarySections();
    console.log(`📚 Seções encontradas: ${sections.length}`);
    
    if (sections.length === 0) {
      console.log('🔧 Inicializando seções padrão...');
      await supabaseServiceNew.initializeDefaultSections();
    }
    
  } catch (error) {
    console.error('❌ Erro no teste de seções:', error);
  }
}

// Executar correção
fixDatabaseStructure().then(() => {
  console.log('🎉 Processo de correção concluído');
  process.exit(0);
}).catch(error => {
  console.error('💥 Falha crítica:', error);
  process.exit(1);
});