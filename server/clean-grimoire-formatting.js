import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function cleanGrimoireFormatting() {
  try {
    console.log('🧹 Removendo títulos mystical das citações de abertura...');

    // Buscar todos os capítulos dos grimórios existentes (exceto o ID 30 que já está correto)
    const { data: chapters, error } = await supabase
      .from('chapters')
      .select('*')
      .neq('grimoire_id', 30) // Excluir o último criado
      .order('grimoire_id', { ascending: true })
      .order('chapter_number', { ascending: true });

    if (error) {
      console.error('Erro ao buscar capítulos:', error);
      return;
    }

    console.log(`📚 Encontrados ${chapters.length} capítulos para limpar`);

    // Mapeamento de títulos místicos que devem ser removidos
    const mysticalTitles = [
      'Invocação do Primeiro Fogo',
      'Selo do Véu Rachado',
      'Despertar da Chama Oculta',
      'Portal das Profundezas Ocultas',
      'Incêndio da Chama Natural',
      'Abertura do Tribunal Silencioso',
      'Chamado Ancestral',
      'Herança Roubada', 
      'Fogo Interior',
      'Sombra Sagrada',
      'Reino Dentro de Ti'
    ];

    let updatedCount = 0;

    // Limpar formatação de cada capítulo
    for (const chapter of chapters) {
      let cleanedContent = chapter.content;
      let wasModified = false;

      // Remover qualquer título dentro de opening-invocation que corresponda aos padrões místicos
      mysticalTitles.forEach(title => {
        const regex = new RegExp(`<h3[^>]*>${title}<\/h3>\\s*`, 'g');
        if (cleanedContent.includes(title)) {
          cleanedContent = cleanedContent.replace(regex, '');
          wasModified = true;
        }
      });

      // Remover qualquer h3 genérico dentro de opening-invocation
      const h3Pattern = /<div class="opening-invocation">[^<]*<h3[^>]*>[^<]*<\/h3>\s*/g;
      if (h3Pattern.test(cleanedContent)) {
        cleanedContent = cleanedContent.replace(h3Pattern, '<div class="opening-invocation">');
        wasModified = true;
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
          console.log(`✅ Capítulo "${chapter.title}" limpo (Grimório ID: ${chapter.grimoire_id})`);
          updatedCount++;
        }
      }
    }

    console.log(`🔥 Limpeza concluída! ${updatedCount} capítulos atualizados para ter apenas nomes dos capítulos.`);

  } catch (error) {
    console.error('Erro durante limpeza:', error);
  }
}

cleanGrimoireFormatting();