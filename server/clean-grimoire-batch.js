import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function cleanGrimorieBatch() {
  console.log('🧹 Limpando formatação dos grimórios em lotes...');
  
  try {
    // Buscar apenas os capítulos dos 3 grimórios principais (IDs 26, 27, 29)
    const { data: chapters, error: fetchError } = await supabase
      .from('chapters')
      .select('*')
      .in('grimoire_id', [26, 27, 29])
      .order('grimoire_id', { ascending: true })
      .order('chapter_number', { ascending: true });
    
    if (fetchError) {
      console.error('❌ Erro ao buscar capítulos:', fetchError);
      return;
    }
    
    console.log(`📖 Encontrados ${chapters.length} capítulos para limpar`);
    
    const cleaningFunctions = [
      (content) => content.replace(/<div class="mystical-ornament">.*?<\/div>/g, ''),
      (content) => content.replace(/🜏|🕯️|⭐|🔥|✨|👁️|🔱|🎭|🌟|📘|📗/g, ''),
      (content) => content.replace(/<div class="mystical-ornament">\s*<\/div>/g, ''),
      (content) => content.replace(/\n\s*\n\s*\n/g, '\n\n'),
      (content) => content.replace(/>\s+</g, '><')
    ];
    
    for (const chapter of chapters) {
      console.log(`🔄 ${chapter.title}`);
      
      let cleanContent = chapter.content;
      
      // Aplicar todas as funções de limpeza
      for (const cleanFn of cleaningFunctions) {
        cleanContent = cleanFn(cleanContent);
      }
      
      // Atualizar o capítulo no banco
      const { error: updateError } = await supabase
        .from('chapters')
        .update({ content: cleanContent })
        .eq('id', chapter.id);
      
      if (updateError) {
        console.error(`❌ Erro ao atualizar capítulo ${chapter.id}:`, updateError);
      } else {
        console.log(`  ✅ Atualizado`);
      }
    }
    
    console.log('\n🎉 Formatação limpa aplicada aos grimórios principais!');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

cleanGrimorieBatch().catch(console.error);