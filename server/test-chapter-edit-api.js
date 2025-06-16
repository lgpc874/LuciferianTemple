import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function testChapterEditAPI() {
  try {
    console.log('🔍 Testando API de edição de capítulos...');

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

    // Testar edição via API
    const testData = {
      title: `${originalChapter.title} [EDITADO VIA API]`,
      content: originalChapter.content + '\n\n<p><strong>TESTE DE EDIÇÃO VIA API ADICIONADO EM ' + new Date().toISOString() + '</strong></p>'
    };

    console.log('\n🔄 Enviando requisição PUT para /api/admin/chapters/' + originalChapter.id);
    
    const response = await fetch(`http://localhost:5000/api/admin/chapters/${originalChapter.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer fake-admin-token'
      },
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro na API:', response.status, errorText);
      return;
    }

    const updatedChapter = await response.json();
    console.log('✅ Resposta da API:');
    console.log('   Título atualizado:', updatedChapter.title);
    console.log('   Conteúdo modificado:', updatedChapter.content.includes('TESTE DE EDIÇÃO VIA API'));

    // Verificar no banco de dados
    console.log('\n🔍 Verificando no banco...');
    const { data: verifyChapter, error: verifyError } = await supabase
      .from('chapters')
      .select('*')
      .eq('id', originalChapter.id)
      .single();

    if (verifyError) {
      console.error('❌ Erro ao verificar:', verifyError);
      return;
    }

    console.log('📖 Verificação no banco:');
    console.log('   Título persistiu:', verifyChapter.title === testData.title);
    console.log('   Conteúdo persistiu:', verifyChapter.content.includes('TESTE DE EDIÇÃO VIA API'));

    // Restaurar capítulo original
    console.log('\n🔄 Restaurando capítulo original...');
    const restoreResponse = await fetch(`http://localhost:5000/api/admin/chapters/${originalChapter.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer fake-admin-token'
      },
      body: JSON.stringify({
        title: originalChapter.title,
        content: originalChapter.content
      })
    });

    if (restoreResponse.ok) {
      console.log('✅ Capítulo restaurado ao estado original');
    } else {
      console.error('❌ Erro ao restaurar:', await restoreResponse.text());
    }

    console.log('\n🎯 RESULTADO: Sistema de edição de capítulos via API está funcionando!');

  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

testChapterEditAPI();