import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nqexwgnscvpfhuonbafr.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZXh3Z25zY3ZwZmh1b25iYWZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTcyNjM0MCwiZXhwIjoyMDY1MzAyMzQwfQ.ERK-PGWpodJX4WC_84IYW4pwbwkfmcICFFS5oXBsGlk';

async function setupNovoSupabase() {
  console.log('🔧 Configurando novo projeto Supabase...');
  
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  
  try {
    // 1. Criar tabela de usuários
    console.log('📋 Criando tabela users...');
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS users (
          id BIGSERIAL PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE,
          password TEXT NOT NULL,
          is_admin BOOLEAN DEFAULT false,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    });

    // 2. Criar tabela de seções
    console.log('📋 Criando tabela library_sections...');
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS library_sections (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          icon_name TEXT,
          sort_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    });

    // 3. Criar tabela de grimórios
    console.log('📋 Criando tabela grimoires...');
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS grimoires (
          id BIGSERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          section_id BIGINT REFERENCES library_sections(id) ON DELETE CASCADE,
          price DECIMAL(10,2) DEFAULT 0,
          is_paid BOOLEAN DEFAULT false,
          is_published BOOLEAN DEFAULT true,
          unlock_order INTEGER DEFAULT 1,
          cover_image_url TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    });

    // 4. Criar outras tabelas necessárias
    console.log('📋 Criando tabelas auxiliares...');
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS user_progress (
          id BIGSERIAL PRIMARY KEY,
          user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
          grimoire_id BIGINT REFERENCES grimoires(id) ON DELETE CASCADE,
          progress_percentage DECIMAL(5,2) DEFAULT 0,
          current_page INTEGER DEFAULT 1,
          last_read_at TIMESTAMPTZ DEFAULT NOW(),
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW(),
          UNIQUE(user_id, grimoire_id)
        );

        CREATE TABLE IF NOT EXISTS ai_settings (
          id BIGSERIAL PRIMARY KEY,
          personality TEXT DEFAULT 'luciferian',
          complexity TEXT DEFAULT 'beginner',
          length TEXT DEFAULT 'medium',
          style TEXT DEFAULT 'mixed',
          guidelines TEXT DEFAULT '',
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS system_settings (
          id BIGSERIAL PRIMARY KEY,
          site_name TEXT DEFAULT 'Templo do Abismo',
          admin_email TEXT DEFAULT 'admin@templodoabismo.com.br',
          enable_user_registration BOOLEAN DEFAULT true,
          enable_paid_content BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    });

    // 5. Habilitar RLS e criar políticas permissivas
    console.log('🛡️ Configurando Row Level Security...');
    await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE users ENABLE ROW LEVEL SECURITY;
        ALTER TABLE library_sections ENABLE ROW LEVEL SECURITY;
        ALTER TABLE grimoires ENABLE ROW LEVEL SECURITY;
        ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
        ALTER TABLE ai_settings ENABLE ROW LEVEL SECURITY;
        ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

        -- Políticas permissivas para desenvolvimento
        CREATE POLICY IF NOT EXISTS "Permitir tudo em users" ON users FOR ALL USING (true) WITH CHECK (true);
        CREATE POLICY IF NOT EXISTS "Permitir tudo em library_sections" ON library_sections FOR ALL USING (true) WITH CHECK (true);
        CREATE POLICY IF NOT EXISTS "Permitir tudo em grimoires" ON grimoires FOR ALL USING (true) WITH CHECK (true);
        CREATE POLICY IF NOT EXISTS "Permitir tudo em user_progress" ON user_progress FOR ALL USING (true) WITH CHECK (true);
        CREATE POLICY IF NOT EXISTS "Permitir tudo em ai_settings" ON ai_settings FOR ALL USING (true) WITH CHECK (true);
        CREATE POLICY IF NOT EXISTS "Permitir tudo em system_settings" ON system_settings FOR ALL USING (true) WITH CHECK (true);
      `
    });

    // 6. Inserir dados iniciais
    console.log('👤 Criando usuário admin...');
    const { error: userError } = await supabase
      .from('users')
      .upsert({
        username: 'admin',
        email: 'admin@templodoabismo.com.br',
        password: '$2b$10$rQ8K5yUhMhQJhCcDj8zY8OqXJ5kM7Nv4PzB8L9wE2fH6uK1tR3gA5q',
        is_admin: true
      }, { onConflict: 'username' });

    if (userError) console.log('Usuário admin já existe ou erro:', userError.message);

    console.log('📚 Criando seções da biblioteca...');
    const sections = [
      { name: 'Atrium Ignis', description: 'Textos preparatórios para iniciantes no caminho luciferiano', sort_order: 1 },
      { name: 'Porta Umbrae', description: 'Conhecimentos intermediários sobre magia e filosofia das sombras', sort_order: 2 },
      { name: 'Arcana Noctis', description: 'Segredos avançados de magia cerimonial e gnose luciferiana', sort_order: 3 },
      { name: 'Via Tenebris', description: 'Caminhos superiores de maestria e transcendência', sort_order: 4 },
      { name: 'Templo do Abismo', description: 'Santuário dos mistérios mais profundos canalizados das divindades primordiais', sort_order: 5 }
    ];

    for (const section of sections) {
      const { error } = await supabase
        .from('library_sections')
        .upsert(section, { onConflict: 'name' });
      
      if (error) {
        console.log(`Seção ${section.name} já existe ou erro:`, error.message);
      }
    }

    // 7. Configurações iniciais
    console.log('⚙️ Criando configurações iniciais...');
    await supabase
      .from('ai_settings')
      .upsert({
        personality: 'luciferian',
        complexity: 'beginner',
        style: 'mixed',
        guidelines: 'Mantenha linguagem acessível mas profunda, evite clichês, foque na filosofia de autodivinização'
      });

    await supabase
      .from('system_settings')
      .upsert({
        site_name: 'Templo do Abismo',
        admin_email: 'admin@templodoabismo.com.br',
        enable_user_registration: true,
        enable_paid_content: true
      });

    console.log('✅ Setup do novo projeto Supabase concluído com sucesso!');
    console.log('🔗 URL do projeto:', SUPABASE_URL);
    console.log('📧 Admin: admin@templodoabismo.com.br');
    console.log('🔑 Senha: admin123');

  } catch (error) {
    console.error('❌ Erro durante setup:', error);
    console.error('Detalhes:', error.message);
  }
}

setupNovoSupabase();