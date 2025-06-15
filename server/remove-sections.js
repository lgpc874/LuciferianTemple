import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('SUPABASE_URL and SUPABASE_ANON_KEY are required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function removeSections() {
  console.log('Removendo seções desnecessárias...');

  try {
    // Desativar "Textos Filosóficos" (id: 5)
    const { error: error1 } = await supabase
      .from('library_sections')
      .update({ is_active: false })
      .eq('id', 5);

    if (error1) {
      console.error('Erro ao desativar Textos Filosóficos:', error1);
    } else {
      console.log('✓ Textos Filosóficos desativado');
    }

    // Desativar "Meditações Práticas" (id: 6)
    const { error: error2 } = await supabase
      .from('library_sections')
      .update({ is_active: false })
      .eq('id', 6);

    if (error2) {
      console.error('Erro ao desativar Meditações Práticas:', error2);
    } else {
      console.log('✓ Meditações Práticas desativado');
    }

    console.log('🎉 Biblioteca configurada com 4 seções apenas!');

  } catch (error) {
    console.error('Erro ao remover seções:', error);
  }
}

removeSections();