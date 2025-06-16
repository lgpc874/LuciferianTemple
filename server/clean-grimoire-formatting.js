import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function cleanGrimoireFormatting() {
  console.log('🧹 Limpando formatação dos grimórios - removendo símbolos e aplicando tipografia profissional...');
  
  try {
    // Buscar todos os capítulos dos grimórios
    const { data: chapters, error: fetchError } = await supabase
      .from('chapters')
      .select('*')
      .order('grimoire_id', { ascending: true })
      .order('chapter_number', { ascending: true });
    
    if (fetchError) {
      console.error('❌ Erro ao buscar capítulos:', fetchError);
      return;
    }
    
    console.log(`📖 Encontrados ${chapters.length} capítulos para limpar`);
    
    for (const chapter of chapters) {
      console.log(`\n🔄 Processando: ${chapter.title} (ID: ${chapter.id})`);
      
      let cleanContent = chapter.content;
      
      // Remover divs com ornamentos específicos
      cleanContent = cleanContent.replace(/<div class="mystical-ornament">.*?<\/div>/g, '');
      
      // Remover spans e divs que contêm apenas símbolos/emojis
      cleanContent = cleanContent.replace(/<div class="mystical-ornament">🜏<\/div>/g, '');
      cleanContent = cleanContent.replace(/<div class="mystical-ornament">🕯️<\/div>/g, '');
      cleanContent = cleanContent.replace(/<div class="mystical-ornament">⭐<\/div>/g, '');
      cleanContent = cleanContent.replace(/<div class="mystical-ornament">🔥<\/div>/g, '');
      cleanContent = cleanContent.replace(/<div class="mystical-ornament">✨<\/div>/g, '');
      cleanContent = cleanContent.replace(/<div class="mystical-ornament">👁️<\/div>/g, '');
      cleanContent = cleanContent.replace(/<div class="mystical-ornament">🔱<\/div>/g, '');
      cleanContent = cleanContent.replace(/<div class="mystical-ornament">🎭<\/div>/g, '');
      cleanContent = cleanContent.replace(/<div class="mystical-ornament">🌟<\/div>/g, '');
      cleanContent = cleanContent.replace(/<div class="mystical-ornament">📘<\/div>/g, '');
      
      // Remover outros padrões de ornamentos
      cleanContent = cleanContent.replace(/🜏/g, '');
      cleanContent = cleanContent.replace(/🕯️/g, '');
      cleanContent = cleanContent.replace(/⭐/g, '');
      cleanContent = cleanContent.replace(/🔥/g, '');
      cleanContent = cleanContent.replace(/✨/g, '');
      cleanContent = cleanContent.replace(/👁️/g, '');
      cleanContent = cleanContent.replace(/🔱/g, '');
      cleanContent = cleanContent.replace(/🎭/g, '');
      cleanContent = cleanContent.replace(/🌟/g, '');
      cleanContent = cleanContent.replace(/📘/g, '');
      cleanContent = cleanContent.replace(/📗/g, '');
      
      // Remover divs vazias resultantes
      cleanContent = cleanContent.replace(/<div class="mystical-ornament"><\/div>/g, '');
      cleanContent = cleanContent.replace(/<div class="mystical-ornament">\s*<\/div>/g, '');
      
      // Melhorar formatação de citações mantendo estrutura
      cleanContent = cleanContent.replace(
        /<div class="mystical-quote">/g, 
        '<blockquote class="mystical-quote">'
      );
      cleanContent = cleanContent.replace(/<\/div>(\s*<\/div>)?$/g, '</blockquote>');
      
      // Limpar espaços extras e quebras de linha desnecessárias
      cleanContent = cleanContent.replace(/\n\s*\n\s*\n/g, '\n\n');
      cleanContent = cleanContent.replace(/>\s+</g, '><');
      
      // Garantir que parágrafos importantes tenham classes apropriadas
      if (cleanContent.includes('class="opening-invocation"')) {
        console.log('  ✓ Mantendo formatação de invocação de abertura');
      }
      
      if (cleanContent.includes('class="mystical-emphasis"')) {
        console.log('  ✓ Mantendo formatação de ênfases místicas');
      }
      
      if (cleanContent.includes('class="revelation-text"')) {
        console.log('  ✓ Mantendo formatação de texto revelação');
      }
      
      // Atualizar o capítulo no banco
      const { error: updateError } = await supabase
        .from('chapters')
        .update({ content: cleanContent })
        .eq('id', chapter.id);
      
      if (updateError) {
        console.error(`❌ Erro ao atualizar capítulo ${chapter.id}:`, updateError);
      } else {
        console.log(`  ✅ Capítulo ${chapter.id} atualizado`);
      }
      
      // Pequena pausa para não sobrecarregar o servidor
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n🎉 Formatação limpa aplicada a todos os grimórios!');
    console.log('📋 Alterações realizadas:');
    console.log('  • Removidos todos os símbolos e emojis decorativos');
    console.log('  • Mantida formatação tipográfica profissional');
    console.log('  • Preservadas classes CSS para citações e ênfases');
    console.log('  • Aplicada estrutura limpa e legível');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

cleanGrimoireFormatting().catch(console.error);