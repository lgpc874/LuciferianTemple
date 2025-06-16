import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function checkGrimoires() {
  try {
    const { data: grimoires, error } = await supabase
      .from('grimoires')
      .select('id, title')
      .order('id');

    if (error) {
      console.error('Erro:', error);
      return;
    }

    console.log('📚 Grimórios existentes:');
    grimoires?.forEach(g => {
      console.log(`ID ${g.id}: ${g.title}`);
    });

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

checkGrimoires();