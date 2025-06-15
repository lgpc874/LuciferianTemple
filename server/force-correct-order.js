import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function forceCorrectOrder() {
  console.log('🔧 Forçando ordem correta dos grimórios...');
  
  try {
    // Primeiro, verificar dados atuais
    const { data: current, error: fetchError } = await supabase
      .from('grimoires')
      .select('id, title, created_at')
      .order('id', { ascending: true });
    
    if (fetchError) {
      console.error('❌ Erro ao buscar grimórios:', fetchError);
      return;
    }
    
    console.log('📊 Estado atual:');
    current.forEach((g, i) => {
      console.log(`  ${i+1}. ID: ${g.id} - ${g.title.substring(0, 50)}...`);
    });
    
    // Atualizar timestamps para garantir ordem correta
    console.log('\n🔄 Ajustando timestamps...');
    
    // Volume I (ID 26) - timestamp mais antigo
    const { error: error1 } = await supabase
      .from('grimoires')
      .update({ 
        created_at: '2025-06-15T22:00:00.000Z',
        updated_at: '2025-06-15T22:00:00.000Z'
      })
      .eq('id', 26);
    
    if (error1) {
      console.error('❌ Erro ao atualizar Volume I:', error1);
    } else {
      console.log('✓ Volume I atualizado');
    }
    
    // Volume II (ID 27) - timestamp mais recente
    const { error: error2 } = await supabase
      .from('grimoires')
      .update({ 
        created_at: '2025-06-15T23:00:00.000Z',
        updated_at: '2025-06-15T23:00:00.000Z'
      })
      .eq('id', 27);
    
    if (error2) {
      console.error('❌ Erro ao atualizar Volume II:', error2);
    } else {
      console.log('✓ Volume II atualizado');
    }
    
    // Verificar resultado final
    const { data: final, error: finalError } = await supabase
      .from('grimoires')
      .select('id, title, created_at')
      .order('id', { ascending: true });
    
    if (finalError) {
      console.error('❌ Erro na verificação final:', finalError);
      return;
    }
    
    console.log('\n📋 Ordem final:');
    final.forEach((g, i) => {
      console.log(`  ${i+1}. ID: ${g.id} - ${g.title.substring(0, 50)}... (${g.created_at})`);
    });
    
    console.log('\n🎉 Ordem corrigida com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

forceCorrectOrder().catch(console.error);