import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function renameOpeningCitations() {
  console.log('🔥 Renomeando citações de abertura para títulos luciferianos...');
  
  try {
    // Definir novos títulos para cada grimório
    const newTitles = {
      26: "Invocação do Primeiro Fogo", // Vozes do Fogo
      27: "Selo do Véu Rachado",        // O Véu Rachado
      29: "Despertar da Chama Oculta"   // A Chama Oculta
    };
    
    for (const [grimoireId, newTitle] of Object.entries(newTitles)) {
      // Buscar o capítulo de citação de abertura
      const { data: chapters, error: fetchError } = await supabase
        .from('chapters')
        .select('*')
        .eq('grimoire_id', parseInt(grimoireId))
        .eq('chapter_number', 1)
        .limit(1);
      
      if (fetchError) {
        console.error(`❌ Erro ao buscar capítulo do grimório ${grimoireId}:`, fetchError);
        continue;
      }
      
      if (chapters.length === 0) {
        console.log(`⚠️ Nenhum capítulo encontrado para grimório ${grimoireId}`);
        continue;
      }
      
      const chapter = chapters[0];
      
      // Verificar se é uma citação de abertura
      if (chapter.title.toLowerCase().includes('citação')) {
        console.log(`🔄 Grimório ${grimoireId}: "${chapter.title}" → "${newTitle}"`);
        
        // Atualizar o título
        const { error: updateError } = await supabase
          .from('chapters')
          .update({ title: newTitle })
          .eq('id', chapter.id);
        
        if (updateError) {
          console.error(`❌ Erro ao atualizar capítulo ${chapter.id}:`, updateError);
        } else {
          console.log(`  ✅ Título atualizado com sucesso`);
        }
      } else {
        console.log(`ℹ️ Grimório ${grimoireId}: Capítulo "${chapter.title}" não é uma citação de abertura`);
      }
    }
    
    console.log('\n🎉 Renomeação concluída!');
    console.log('📋 Novos títulos aplicados:');
    console.log('  • Vozes do Fogo: "Invocação do Primeiro Fogo"');
    console.log('  • O Véu Rachado: "Selo do Véu Rachado"');
    console.log('  • A Chama Oculta: "Despertar da Chama Oculta"');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

renameOpeningCitations().catch(console.error);