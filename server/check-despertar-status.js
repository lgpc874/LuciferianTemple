import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDespertarStatus() {
  console.log('🔍 Verificando status do grimório "O Despertar da Sombra"...');

  const { data: grimoires } = await supabase
    .from('grimoires')
    .select('*')
    .ilike('title', '%O Despertar da Sombra%')
    .order('created_at', { ascending: false });

  if (!grimoires || grimoires.length === 0) {
    console.log('❌ Grimório não encontrado');
    return;
  }

  const grimoire = grimoires[0];
  console.log(`✅ Grimório encontrado: ${grimoire.title} (ID: ${grimoire.id})`);

  const { data: chapters } = await supabase
    .from('chapters')
    .select('*')
    .eq('grimoire_id', grimoire.id)
    .order('chapter_number');

  console.log(`📚 Capítulos existentes: ${chapters?.length || 0}`);
  if (chapters) {
    chapters.forEach(c => console.log(`  ${c.chapter_number}. ${c.title}`));
  }

  if (chapters?.length === 12) {
    console.log('✅ Grimório completo com 12 capítulos!');
  } else {
    console.log(`⚠️ Faltam ${12 - (chapters?.length || 0)} capítulos`);
  }
}

checkDespertarStatus().catch(console.error);