import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createSettingsTables() {
  try {
    console.log('Creating settings tables...');

    // Criar tabela ai_settings com SQL direto
    const aiTableSQL = `
      CREATE TABLE IF NOT EXISTS ai_settings (
        id SERIAL PRIMARY KEY,
        personality TEXT DEFAULT 'luciferian' NOT NULL,
        complexity TEXT DEFAULT 'beginner' NOT NULL,
        length TEXT DEFAULT 'medium' NOT NULL,
        style TEXT DEFAULT 'mixed' NOT NULL,
        guidelines TEXT DEFAULT '',
        default_section TEXT DEFAULT '',
        auto_price BOOLEAN DEFAULT false NOT NULL,
        price_range_min DECIMAL(10,2) DEFAULT 9.99,
        price_range_max DECIMAL(10,2) DEFAULT 49.99,
        updated_at TIMESTAMP DEFAULT NOW(),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    const { error: aiError } = await supabase.rpc('execute_sql', { sql: aiTableSQL });
    if (aiError) {
      console.log('AI table may already exist:', aiError.message);
    } else {
      console.log('✓ ai_settings table ready');
    }

    // Criar tabela system_settings com SQL direto
    const systemTableSQL = `
      CREATE TABLE IF NOT EXISTS system_settings (
        id SERIAL PRIMARY KEY,
        site_name TEXT DEFAULT 'Templo do Abismo' NOT NULL,
        site_description TEXT DEFAULT 'Portal de ensinamentos luciferianos' NOT NULL,
        site_keywords TEXT DEFAULT 'lucifer, ocultismo, magia, grimórios' NOT NULL,
        admin_email TEXT DEFAULT 'admin@templodoabismo.com' NOT NULL,
        content_language TEXT DEFAULT 'português' NOT NULL,
        content_tone TEXT DEFAULT 'formal' NOT NULL,
        content_target_audience TEXT DEFAULT 'iniciantes' NOT NULL,
        enable_user_registration BOOLEAN DEFAULT true NOT NULL,
        enable_paid_content BOOLEAN DEFAULT true NOT NULL,
        enable_ai_generation BOOLEAN DEFAULT true NOT NULL,
        security_level TEXT DEFAULT 'medium' NOT NULL,
        enable_content_protection BOOLEAN DEFAULT true NOT NULL,
        enable_download_protection BOOLEAN DEFAULT true NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW(),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    const { error: systemError } = await supabase.rpc('execute_sql', { sql: systemTableSQL });
    if (systemError) {
      console.log('System table may already exist:', systemError.message);
    } else {
      console.log('✓ system_settings table ready');
    }

    // Inserir configurações padrão de IA
    const { data: existingAI } = await supabase
      .from('ai_settings')
      .select('id')
      .limit(1)
      .single();

    if (!existingAI) {
      const { error: insertAIError } = await supabase
        .from('ai_settings')
        .insert({
          personality: 'luciferian',
          complexity: 'beginner',
          length: 'medium',
          style: 'mixed',
          guidelines: '',
          default_section: '',
          auto_price: false,
          price_range_min: 9.99,
          price_range_max: 49.99
        });

      if (insertAIError) {
        console.error('Error inserting default AI settings:', insertAIError);
      } else {
        console.log('✓ Default AI settings created');
      }
    }

    // Inserir configurações padrão do sistema
    const { data: existingSystem } = await supabase
      .from('system_settings')
      .select('id')
      .limit(1)
      .single();

    if (!existingSystem) {
      const { error: insertSystemError } = await supabase
        .from('system_settings')
        .insert({
          site_name: 'Templo do Abismo',
          site_description: 'Portal de ensinamentos luciferianos',
          site_keywords: 'lucifer, ocultismo, magia, grimórios',
          admin_email: 'admin@templodoabismo.com',
          content_language: 'português',
          content_tone: 'formal',
          content_target_audience: 'iniciantes',
          enable_user_registration: true,
          enable_paid_content: true,
          enable_ai_generation: true,
          security_level: 'medium',
          enable_content_protection: true,
          enable_download_protection: true
        });

      if (insertSystemError) {
        console.error('Error inserting default system settings:', insertSystemError);
      } else {
        console.log('✓ Default system settings created');
      }
    }

    console.log('Settings tables setup completed successfully!');
  } catch (error) {
    console.error('Error setting up settings tables:', error);
  }
}

createSettingsTables();