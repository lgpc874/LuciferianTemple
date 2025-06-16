import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function checkGrimoires() {
  try {
    // Verificar primeiro capítulo de cada grimório
    const { data: chapters } = await supabase
      .from('chapters')
      .select('grimoire_id, title, content')
      .eq('chapter_number', 1)
      .order('grimoire_id');
      
    for (const chapter of chapters) {
      console.log('===========================================');
      console.log(`Grimório ${chapter.grimoire_id} - ${chapter.title}`);
      console.log('===========================================');
      console.log(chapter.content.substring(0, 400));
      console.log('');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

checkGrimoires();