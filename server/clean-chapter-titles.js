import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function cleanChapterTitles() {
  try {
    console.log('🧹 Limpando títulos dos capítulos...');

    // Buscar todos os capítulos
    const { data: chapters, error } = await supabase
      .from('chapters')
      .select('*')
      .order('grimoire_id', { ascending: true })
      .order('chapter_number', { ascending: true });

    if (error) {
      console.error('Erro ao buscar capítulos:', error);
      return;
    }

    console.log(`📚 Processando ${chapters.length} capítulos...`);

    let updatedCount = 0;

    // Limpar títulos de cada capítulo
    for (const chapter of chapters) {
      let cleanTitle = chapter.title;
      let wasModified = false;

      // Padrões para remover prefixos comuns
      const prefixPatterns = [
        /^Introdução\s*[-–]\s*/i,
        /^Prólogo\s*[-–]\s*/i,
        /^Capítulo\s*\d*\s*[-–]\s*/i,
        /^Parte\s*\d*\s*[-–]\s*/i,
        /^Seção\s*\d*\s*[-–]\s*/i,
        /^Volume\s*\d*\s*[-–]\s*/i,
        /^Livro\s*\d*\s*[-–]\s*/i,
        /^Abertura\s*[-–]\s*/i,
        /^Prelúdio\s*[-–]\s*/i,
        /^Preâmbulo\s*[-–]\s*/i
      ];

      // Aplicar limpeza
      for (const pattern of prefixPatterns) {
        if (pattern.test(cleanTitle)) {
          cleanTitle = cleanTitle.replace(pattern, '');
          wasModified = true;
          break;
        }
      }

      // Limpar espaços extras e capitalizar primeira letra
      if (wasModified) {
        cleanTitle = cleanTitle.trim();
        if (cleanTitle.length > 0) {
          cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
        }
      }

      // Atualizar no banco se houve modificação
      if (wasModified && cleanTitle !== chapter.title) {
        const { error: updateError } = await supabase
          .from('chapters')
          .update({ title: cleanTitle })
          .eq('id', chapter.id);

        if (updateError) {
          console.error(`Erro ao atualizar capítulo ${chapter.title}:`, updateError);
        } else {
          console.log(`✅ "${chapter.title}" → "${cleanTitle}" (Grimório: ${chapter.grimoire_id})`);
          updatedCount++;
        }
      }
    }

    console.log(`🔥 Limpeza concluída! ${updatedCount} títulos de capítulos atualizados.`);

  } catch (error) {
    console.error('Erro durante limpeza:', error);
  }
}

cleanChapterTitles();