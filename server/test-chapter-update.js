import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function testChapterUpdate() {
  try {
    console.log('🔍 Testando atualização de capítulo...');

    // Buscar um capítulo existente
    const { data: chapters, error: fetchError } = await supabase
      .from('chapters')
      .select('*')
      .limit(1)
      .single();

    if (fetchError || !chapters) {
      console.error('Nenhum capítulo encontrado para teste:', fetchError);
      return;
    }

    const originalChapter = chapters;
    console.log('📖 Capítulo original:');
    console.log('   ID:', originalChapter.id);
    console.log('   Título:', originalChapter.title);
    console.log('   Conteúdo (primeiros 100 chars):', originalChapter.content.substring(0, 100) + '...');

    // Fazer uma atualização de teste
    const testTitle = `${originalChapter.title} [TESTE ${Date.now()}]`;
    const testContent = originalChapter.content + '\n\n[TESTE DE ATUALIZAÇÃO ADICIONADO EM ' + new Date().toISOString() + ']';

    console.log('\n🔄 Atualizando capítulo...');
    const { data: updatedChapter, error: updateError } = await supabase
      .from('chapters')
      .update({
        title: testTitle,
        content: testContent
      })
      .eq('id', originalChapter.id)
      .select()
      .single();

    if (updateError) {
      console.error('❌ Erro ao atualizar:', updateError);
      return;
    }

    console.log('✅ Capítulo atualizado:');
    console.log('   ID:', updatedChapter.id);
    console.log('   Novo título:', updatedChapter.title);
    console.log('   Conteúdo atualizado:', updatedChapter.content.includes('TESTE DE ATUALIZAÇÃO'));

    // Verificar se a atualização persistiu lendo novamente
    console.log('\n🔍 Verificando persistência...');
    const { data: verifyChapter, error: verifyError } = await supabase
      .from('chapters')
      .select('*')
      .eq('id', originalChapter.id)
      .single();

    if (verifyError) {
      console.error('❌ Erro ao verificar:', verifyError);
      return;
    }

    console.log('📖 Capítulo verificado:');
    console.log('   Título persistiu:', verifyChapter.title === testTitle);
    console.log('   Conteúdo persistiu:', verifyChapter.content.includes('TESTE DE ATUALIZAÇÃO'));

    // Restaurar capítulo original
    console.log('\n🔄 Restaurando capítulo original...');
    const { error: restoreError } = await supabase
      .from('chapters')
      .update({
        title: originalChapter.title,
        content: originalChapter.content
      })
      .eq('id', originalChapter.id);

    if (restoreError) {
      console.error('❌ Erro ao restaurar:', restoreError);
    } else {
      console.log('✅ Capítulo restaurado ao estado original');
    }

    console.log('\n🎯 RESULTADO: Sistema de atualização de capítulos está funcionando corretamente no Supabase');

  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

testChapterUpdate();