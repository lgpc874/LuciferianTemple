import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function checkPattern() {
  try {
    console.log('📚 Verificando citações de abertura nos grimórios...\n');

    const { data: grimoires, error } = await supabase
      .from('grimoires')
      .select('id, title')
      .order('id');

    if (error) {
      console.error('Erro:', error);
      return;
    }

    for (const grimoire of grimoires) {
      const { data: chapters } = await supabase
        .from('chapters')
        .select('title, chapter_number')
        .eq('grimoire_id', grimoire.id)
        .order('chapter_number');

      console.log(`\n📖 ${grimoire.title}`);
      console.log('Capítulos:');
      chapters?.forEach((ch, index) => {
        console.log(`  ${index + 1}. ${ch.title}`);
      });

      const hasOpeningCitation = chapters?.some(ch => 
        ch.title.includes('Invocação') || 
        ch.title.includes('Selo') || 
        ch.title.includes('Despertar') ||
        ch.title.includes('Sombras') ||
        ch.title.includes('Citação')
      );

      if (!hasOpeningCitation) {
        console.log('❌ FALTANDO citação de abertura');
      } else {
        console.log('✅ Tem citação de abertura');
      }
      console.log('─'.repeat(50));
    }

  } catch (error) {
    console.error('Erro:', error);
  }
}

checkPattern();