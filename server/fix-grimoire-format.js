import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function fixGrimoireFormat() {
  try {
    console.log('🔧 Corrigindo formatação do grimório "A Mentira do Pecado"...');

    // Buscar todos os capítulos do grimório ID 30
    const { data: chapters, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('grimoire_id', 30)
      .order('chapter_number');

    if (error) {
      console.error('Erro ao buscar capítulos:', error);
      return;
    }

    console.log(`📚 Encontrados ${chapters.length} capítulos para corrigir`);

    // Corrigir formatação de cada capítulo
    for (const chapter of chapters) {
      let correctedContent = chapter.content;

      // Remover quebras de linha desnecessárias no opening-invocation
      correctedContent = correctedContent.replace(
        /<div class="opening-invocation">\s*\n\s*<h3>[^<]*<\/h3>\s*\n/g,
        '<div class="opening-invocation">'
      );

      // Remover quebras de linha extras entre divs
      correctedContent = correctedContent.replace(/>\s*\n\s*</g, '><');

      // Remover quebras de linha no início de parágrafos
      correctedContent = correctedContent.replace(/\n\s*<p>/g, '<p>');

      // Corrigir estrutura final - remover quebras desnecessárias
      correctedContent = correctedContent.replace(/\n\s+/g, ' ').trim();

      // Atualizar no banco
      const { error: updateError } = await supabase
        .from('chapters')
        .update({ content: correctedContent })
        .eq('id', chapter.id);

      if (updateError) {
        console.error(`Erro ao atualizar capítulo ${chapter.title}:`, updateError);
      } else {
        console.log(`✅ Capítulo "${chapter.title}" formatado corretamente`);
      }
    }

    console.log('🔥 Formatação corrigida! Grimório agora segue o padrão dos outros.');

  } catch (error) {
    console.error('Erro durante correção:', error);
  }
}

fixGrimoireFormat();