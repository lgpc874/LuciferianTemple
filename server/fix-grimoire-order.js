import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function fixGrimoireOrder() {
  console.log('🔄 Corrigindo ordem dos grimórios...');
  
  try {
    // Buscar os grimórios atuais
    const { data: grimoires, error } = await supabase
      .from('grimoires')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('❌ Erro ao buscar grimórios:', error);
      return;
    }
    
    console.log('📚 Grimórios encontrados:');
    grimoires.forEach((g, index) => {
      console.log(`  ${index + 1}. ID: ${g.id} - ${g.title}`);
    });
    
    // Definir ordem correta baseada no conteúdo
    const updates = [
      { id: 26, sort_order: 1 }, // Vozes do Fogo (Volume I)
      { id: 27, sort_order: 2 }  // O Véu Rachado (Volume II)
    ];
    
    // Atualizar cada grimório
    for (const update of updates) {
      const { error: updateError } = await supabase
        .from('grimoires')
        .update({ sort_order: update.sort_order })
        .eq('id', update.id);
      
      if (updateError) {
        console.error(`❌ Erro ao atualizar grimório ${update.id}:`, updateError);
      } else {
        console.log(`✓ Grimório ${update.id} atualizado com sort_order ${update.sort_order}`);
      }
    }
    
    console.log('🎉 Ordem dos grimórios corrigida com sucesso!');
    console.log('📋 Nova ordem:');
    console.log('  1. Volume I - Vozes do Fogo – O Sussurro Antes da Queda');
    console.log('  2. Volume II - O Véu Rachado – Por Trás da Verdade Pregada');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

fixGrimoireOrder().catch(console.error);