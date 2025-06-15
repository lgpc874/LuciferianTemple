import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function createMinimalGrimoire() {
  try {
    console.log('Testing minimal grimoire creation...');
    
    // Criar apenas com campos essenciais que devem existir
    const minimalGrimoire = {
      title: 'Teste Básico',
      description: 'Grimório de teste',
      section_id: 1,
      category: 'Teste'
    };
    
    const { data: newGrimoire, error } = await supabase
      .from('grimoires')
      .insert(minimalGrimoire)
      .select()
      .single();
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    console.log('Grimoire created:', newGrimoire.id);
    
    // Verificar listagem
    const { data: list } = await supabase
      .from('grimoires')
      .select('*');
    
    console.log('Total grimoires:', list?.length || 0);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

createMinimalGrimoire();