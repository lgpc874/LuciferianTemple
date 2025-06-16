import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function completeCitationsFix() {
  try {
    console.log('🧹 Limpando TODOS os títulos dos capítulos de TODOS os grimórios...');

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

    // Limpar títulos de cada capítulo
    for (const chapter of chapters) {
      let cleanTitle = chapter.title;
      let wasModified = false;

      // Padrões mais abrangentes para remover prefixos e formatações
      const cleanupPatterns = [
        // Prefixos com traços
        /^Introdução\s*[-–—]\s*/i,
        /^Prólogo\s*[-–—]\s*/i,
        /^Capítulo\s*\d*\s*[-–—]\s*/i,
        /^Parte\s*\d*\s*[-–—]\s*/i,
        /^Seção\s*\d*\s*[-–—]\s*/i,
        /^Volume\s*\d*\s*[-–—]\s*/i,
        /^Livro\s*\d*\s*[-–—]\s*/i,
        /^Abertura\s*[-–—]\s*/i,
        /^Prelúdio\s*[-–—]\s*/i,
        /^Preâmbulo\s*[-–—]\s*/i,
        /^Epílogo\s*[-–—]\s*/i,
        /^Conclusão\s*[-–—]\s*/i,
        /^Final\s*[-–—]\s*/i,
        /^Encerramento\s*[-–—]\s*/i,
        
        // Padrões específicos encontrados
        /^Invocação\s*[-–—]\s*/i,
        /^Selo\s*[-–—]\s*/i,
        /^Portal\s*[-–—]\s*/i,
        /^Despertar\s*[-–—]\s*/i,
        /^Sombras\s*[-–—]\s*/i,
        /^Chamado\s*[-–—]\s*/i,
        /^Herança\s*[-–—]\s*/i,
        /^Fogo\s*[-–—]\s*/i,
        /^Reino\s*[-–—]\s*/i,
        /^Chama\s*[-–—]\s*/i,
        
        // Padrões de numeração
        /^I+\s*[-–—]\s*/i,
        /^\d+\s*[-–—]\s*/,
        /^Primeiro\s*[-–—]\s*/i,
        /^Segunda?\s*[-–—]\s*/i,
        /^Terceir[oa]\s*[-–—]\s*/i,
        /^Quart[oa]\s*[-–—]\s*/i,
        /^Quint[oa]\s*[-–—]\s*/i,
        /^Sext[oa]\s*[-–—]\s*/i,
        /^Sétim[oa]\s*[-–—]\s*/i,
        /^Oitav[oa]\s*[-–—]\s*/i,
        /^Non[oa]\s*[-–—]\s*/i,
        /^Décim[oa]\s*[-–—]\s*/i,
        
        // Remover dois pontos iniciais
        /^:\s*/,
        
        // Remover espaços extras e caracteres especiais no início
        /^[\s\-–—•·]+/
      ];

      // Aplicar limpeza sequencial
      for (const pattern of cleanupPatterns) {
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

      // Atualizar no banco se houve modificação
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

    console.log(`🔥 Limpeza COMPLETA concluída! ${updatedCount} títulos de capítulos atualizados.`);

  } catch (error) {
    console.error('Erro durante limpeza:', error);
  }
}

completeCitationsFix();