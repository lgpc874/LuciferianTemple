import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function removeChapterNumbers() {
  try {
    console.log('🧹 Removendo numeração dos capítulos de todos os grimórios...');

    // Buscar TODOS os capítulos
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

    // Padrões para remover numeração de capítulos
    const numberPatterns = [
      // Capítulo com números
      /^Capítulo\s*\d+\s*[-–—:]\s*/i,
      /^Cap\.\s*\d+\s*[-–—:]\s*/i,
      /^Chapter\s*\d+\s*[-–—:]\s*/i,
      
      // Números romanos
      /^Capítulo\s*[IVX]+\s*[-–—:]\s*/i,
      /^Cap\.\s*[IVX]+\s*[-–—:]\s*/i,
      
      // Apenas números no início
      /^\d+\s*[-–—:\.]\s*/,
      /^[IVX]+\s*[-–—:\.]\s*/,
      
      // Números ordinais em português
      /^Primeiro\s*Capítulo\s*[-–—:]\s*/i,
      /^Segundo\s*Capítulo\s*[-–—:]\s*/i,
      /^Terceiro\s*Capítulo\s*[-–—:]\s*/i,
      /^Quarto\s*Capítulo\s*[-–—:]\s*/i,
      /^Quinto\s*Capítulo\s*[-–—:]\s*/i,
      /^Sexto\s*Capítulo\s*[-–—:]\s*/i,
      /^Sétimo\s*Capítulo\s*[-–—:]\s*/i,
      /^Oitavo\s*Capítulo\s*[-–—:]\s*/i,
      /^Nono\s*Capítulo\s*[-–—:]\s*/i,
      /^Décimo\s*Capítulo\s*[-–—:]\s*/i,
      
      // Versões curtas dos ordinais
      /^1º\s*[-–—:]\s*/,
      /^2º\s*[-–—:]\s*/,
      /^3º\s*[-–—:]\s*/,
      /^4º\s*[-–—:]\s*/,
      /^5º\s*[-–—:]\s*/,
      /^6º\s*[-–—:]\s*/,
      /^7º\s*[-–—:]\s*/,
      /^8º\s*[-–—:]\s*/,
      /^9º\s*[-–—:]\s*/,
      /^10º\s*[-–—:]\s*/,
      
      // Padrões com parênteses
      /^\(\d+\)\s*/,
      /^\([IVX]+\)\s*/,
      
      // Espaços e caracteres especiais no início
      /^[\s\-–—•·]+/
    ];

    // Processar cada capítulo
    for (const chapter of chapters) {
      let cleanTitle = chapter.title;
      let wasModified = false;

      // Aplicar limpeza sequencial
      for (const pattern of numberPatterns) {
        const beforeClean = cleanTitle;
        cleanTitle = cleanTitle.replace(pattern, '');
        if (beforeClean !== cleanTitle) {
          wasModified = true;
        }
      }

      // Limpar espaços extras e capitalizar primeira letra
      if (wasModified || cleanTitle !== cleanTitle.trim()) {
        cleanTitle = cleanTitle.trim();
        if (cleanTitle.length > 0) {
          cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
        }
        wasModified = true;
      }

      // Atualizar no banco se houve modificação significativa
      if (wasModified && cleanTitle !== chapter.title && cleanTitle.length > 0) {
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

    console.log(`🔥 Remoção de numeração concluída! ${updatedCount} títulos atualizados.`);

  } catch (error) {
    console.error('Erro durante limpeza:', error);
  }
}

removeChapterNumbers();