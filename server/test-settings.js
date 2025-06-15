import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAndCreateSettings() {
  console.log('Testing and creating settings tables...');
  
  try {
    // Tentar inserir configuração de IA padrão
    const { data: aiData, error: aiError } = await supabase
      .from('ai_settings')
      .upsert({
        id: 1,
        personality: 'luciferian',
        complexity: 'beginner',
        length: 'medium',
        style: 'mixed',
        guidelines: 'Crie conteúdo autêntico sobre temas luciferianos',
        default_section: 'porta-das-sombras',
        auto_price: false,
        price_range_min: 9.99,
        price_range_max: 49.99
      }, { onConflict: 'id' })
      .select();

    if (aiError) {
      console.log('AI settings error:', aiError.message);
    } else {
      console.log('✓ AI settings created/updated');
    }

    // Tentar inserir configuração do sistema padrão  
    const { data: sysData, error: sysError } = await supabase
      .from('system_settings')
      .upsert({
        id: 1,
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
        security_level: 'high',
        enable_content_protection: true,
        enable_download_protection: true
      }, { onConflict: 'id' })
      .select();

    if (sysError) {
      console.log('System settings error:', sysError.message);
    } else {
      console.log('✓ System settings created/updated');
    }

    // Verificar se os dados foram salvos
    const { data: aiCheck } = await supabase.from('ai_settings').select('*').single();
    const { data: sysCheck } = await supabase.from('system_settings').select('*').single();
    
    console.log('AI settings:', aiCheck ? 'Found' : 'Not found');
    console.log('System settings:', sysCheck ? 'Found' : 'Not found');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAndCreateSettings();