import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function checkPattern() {
  try {
    // Buscar um capítulo do primeiro grimório para ver o padrão
    const { data: chapter } = await supabase
      .from('chapters')
      .select('content')
      .eq('grimoire_id', 26)
      .eq('chapter_number', 1)
      .single();
      
    console.log('PADRÃO DOS GRIMÓRIOS EXISTENTES:');
    console.log('=====================================');
    console.log(chapter.content.substring(0, 800));
    console.log('=====================================');
    
    // Buscar também um capítulo do novo grimório
    const { data: newChapter } = await supabase
      .from('chapters')
      .select('content')
      .eq('grimoire_id', 30)
      .eq('chapter_number', 1)
      .single();
      
    console.log('\nPADRÃO DO NOVO GRIMÓRIO:');
    console.log('=====================================');
    console.log(newChapter.content.substring(0, 800));
    console.log('=====================================');
    
  } catch (error) {
    console.error('Erro:', error);
  }
}

checkPattern();