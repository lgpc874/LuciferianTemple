import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteGrimoire43() {
  console.log('🗑️ Deletando grimório incompleto ID 43...');
  
  // Deletar capítulos primeiro
  const { error: chaptersError } = await supabase
    .from('chapters')
    .delete()
    .eq('grimoire_id', 43);
    
  if (chaptersError) {
    console.log('❌ Erro ao deletar capítulos:', chaptersError);
  } else {
    console.log('✅ Capítulos deletados');
  }
  
  // Deletar grimório
  const { error: grimoireError } = await supabase
    .from('grimoires')
    .delete()
    .eq('id', 43);
    
  if (grimoireError) {
    console.log('❌ Erro ao deletar grimório:', grimoireError);
  } else {
    console.log('✅ Grimório deletado');
  }
}

deleteGrimoire43().catch(console.error);