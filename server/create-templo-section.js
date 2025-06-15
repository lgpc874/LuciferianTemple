const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTemploSection() {
  try {
    const { data, error } = await supabase
      .from('library_sections')
      .insert([
        {
          name: 'Templo do Abismo',
          description: 'O santuário central onde residem os ensinamentos fundamentais e práticas do caminho luciferiano',
          sort_order: 5
        }
      ])
      .select();

    if (error) {
      console.error('Erro ao criar seção:', error);
      return;
    }

    console.log('Nova seção "Templo do Abismo" criada com sucesso:', data[0]);
  } catch (error) {
    console.error('Erro geral:', error);
  }
}

createTemploSection();