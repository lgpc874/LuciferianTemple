import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function fixGrimoiresTable() {
  try {
    console.log('Checking current grimoires table structure...');
    
    // Verificar se a tabela existe e sua estrutura
    const { data: columns, error } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'grimoires')
      .eq('table_schema', 'public');
    
    if (error) {
      console.error('Error checking table structure:', error);
      return;
    }
    
    console.log('Current columns:', columns.map(c => c.column_name));
    
    // Criar grimório de teste simples sem campos problemáticos
    console.log('\nTrying to create grimoire with minimal fields...');
    
    const simpleGrimoire = {
      title: 'Grimório Teste Simples',
      description: 'Teste de criação básica',
      section_id: 1,
      category: 'Teste',
      level: 'iniciante'
    };
    
    const { data: newGrimoire, error: createError } = await supabase
      .from('grimoires')
      .insert(simpleGrimoire)
      .select()
      .single();
    
    if (createError) {
      console.error('Error creating simple grimoire:', createError);
    } else {
      console.log('Simple grimoire created:', newGrimoire.id, newGrimoire.title);
      
      // Agora verificar se aparece na listagem
      const { data: allGrimoires } = await supabase
        .from('grimoires')
        .select('*');
      
      console.log(`Total grimoires now: ${allGrimoires?.length || 0}`);
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

fixGrimoiresTable();