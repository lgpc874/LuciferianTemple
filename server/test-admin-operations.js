import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function testAdminOperations() {
  try {
    console.log('🔧 Testando operações administrativas no Supabase...\n');

    // 1. Teste de atualização de grimório
    console.log('📝 Testando atualização de grimório...');
    const { data: grimoire, error: fetchError } = await supabase
      .from('grimoires')
      .select('*')
      .eq('id', 30)
      .single();

    if (fetchError) {
      console.error('Erro ao buscar grimório:', fetchError);
      return;
    }

    console.log('✅ Grimório encontrado:', grimoire.title);
    console.log('   Status atual - Publicado:', grimoire.is_published);

    // Tentar atualizar o status de publicação
    const newStatus = !grimoire.is_published;
    const { data: updated, error: updateError } = await supabase
      .from('grimoires')
      .update({ 
        is_published: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', 30)
      .select()
      .single();

    if (updateError) {
      console.error('❌ Erro ao atualizar grimório:', updateError);
    } else {
      console.log('✅ Grimório atualizado com sucesso!');
      console.log('   Novo status - Publicado:', updated.is_published);
    }

    // 2. Teste de criação de capítulo
    console.log('\n📖 Testando criação de capítulo...');
    const { data: newChapter, error: chapterError } = await supabase
      .from('chapters')
      .insert({
        grimoire_id: 30,
        chapter_number: 99,
        title: 'Teste de Capítulo Admin',
        content: '<p>Este é um capítulo de teste criado pelo painel administrativo.</p>',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (chapterError) {
      console.error('❌ Erro ao criar capítulo:', chapterError);
    } else {
      console.log('✅ Capítulo criado com sucesso:', newChapter.title);
      
      // Deletar o capítulo de teste
      const { error: deleteError } = await supabase
        .from('chapters')
        .delete()
        .eq('id', newChapter.id);

      if (deleteError) {
        console.error('❌ Erro ao deletar capítulo de teste:', deleteError);
      } else {
        console.log('✅ Capítulo de teste deletado');
      }
    }

    // 3. Teste de conexão e permissões
    console.log('\n🔐 Testando permissões do Supabase...');
    
    // Verificar se conseguimos listar todas as tabelas principais
    const tables = ['grimoires', 'chapters', 'library_sections', 'users'];
    
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (error) {
        console.error(`❌ Erro ao acessar tabela ${table}:`, error.message);
      } else {
        console.log(`✅ Acesso à tabela ${table}: OK`);
      }
    }

    // 4. Reverter o status do grimório para o original
    console.log('\n🔄 Revertendo status do grimório...');
    const { error: revertError } = await supabase
      .from('grimoires')
      .update({ 
        is_published: grimoire.is_published,
        updated_at: new Date().toISOString()
      })
      .eq('id', 30);

    if (revertError) {
      console.error('❌ Erro ao reverter status:', revertError);
    } else {
      console.log('✅ Status revertido com sucesso');
    }

    console.log('\n🎯 Teste completo!');

  } catch (error) {
    console.error('Erro geral no teste:', error);
  }
}

testAdminOperations();