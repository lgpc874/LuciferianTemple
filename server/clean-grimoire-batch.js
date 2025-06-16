import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function cleanGrimorieBatch() {
  try {
    console.log('🧹 Limpando todos os títulos das citações de abertura...');

    // Buscar todos os capítulos dos grimórios existentes (exceto o ID 30)
    const { data: chapters, error } = await supabase
      .from('chapters')
      .select('*')
      .neq('grimoire_id', 30) // Excluir o último criado que já está correto
      .order('grimoire_id', { ascending: true })
      .order('chapter_number', { ascending: true });

    if (error) {
      console.error('Erro ao buscar capítulos:', error);
      return;
    }

    console.log(`📚 Processando ${chapters.length} capítulos...`);

    let updatedCount = 0;

    // Limpar formatação de cada capítulo
    for (const chapter of chapters) {
      let cleanedContent = chapter.content;
      let wasModified = false;

      // Padrão mais amplo para remover qualquer h3 dentro de opening-invocation
      if (cleanedContent.includes('<div class="opening-invocation">') && cleanedContent.includes('<h3')) {
        // Extrair e limpar a seção opening-invocation
        const openingMatch = cleanedContent.match(/<div class="opening-invocation">(.*?)<\/div>/s);
        if (openingMatch) {
          let openingContent = openingMatch[1];
          // Remover todos os h3 dentro desta seção
          const originalOpening = openingContent;
          openingContent = openingContent.replace(/<h3[^>]*>.*?<\/h3>\s*/gs, '');
          
          if (originalOpening !== openingContent) {
            cleanedContent = cleanedContent.replace(
              /<div class="opening-invocation">(.*?)<\/div>/s,
              `<div class="opening-invocation">${openingContent}</div>`
            );
            wasModified = true;
          }
        }
      }

      // Atualizar no banco se houve modificação
      if (wasModified) {
        const { error: updateError } = await supabase
          .from('chapters')
          .update({ content: cleanedContent })
          .eq('id', chapter.id);

        if (updateError) {
          console.error(`Erro ao atualizar capítulo ${chapter.title}:`, updateError);
        } else {
          console.log(`✅ Capítulo "${chapter.title}" limpo (Grimório: ${chapter.grimoire_id})`);
          updatedCount++;
        }
      }
    }

    console.log(`🔥 Limpeza concluída! ${updatedCount} capítulos atualizados.`);

  } catch (error) {
    console.error('Erro durante limpeza:', error);
  }
}

cleanGrimorieBatch();