import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function completeCitationsFix() {
  console.log('🔧 Finalizando formatação das citações...');
  
  try {
    const { data: chapters } = await supabase
      .from('chapters')
      .select('*')
      .in('grimoire_id', [26, 27, 29])
      .order('id');
    
    console.log(`📖 Processando ${chapters.length} capítulos`);
    
    for (const chapter of chapters) {
      let content = chapter.content;
      let updated = false;
      
      // Remover estilos inline residuais das citações já convertidas
      const beforeLength = content.length;
      
      // Limpar atributos style específicos mantendo apenas estrutura necessária
      content = content.replace(/style="margin-top: 2rem; font-size: 0\.9em;"/g, 'class="citation-author"');
      content = content.replace(/style="font-size: 0\.9em;"/g, 'class="citation-author"');
      content = content.replace(/style="margin-top: 2rem;"/g, '');
      
      // Converter citações ainda não processadas
      content = content.replace(
        /<p style="text-align: center; font-style: italic; color: #d4af37; margin: 2rem 0;">(.*?)<\/p>/gs,
        '<div class="mystical-quote"><p class="quote-text">$1</p></div>'
      );
      
      // Converter parágrafos centralizados em itálico
      content = content.replace(
        /<p style="text-align: center; font-style: italic;">(.*?)<\/p>/gs,
        '<div class="mystical-quote"><p class="quote-text">$1</p></div>'
      );
      
      // Remover outros estilos inline desnecessários
      content = content.replace(/style="color: #d4af37;"/g, '');
      content = content.replace(/style="font-style: italic;"/g, '');
      content = content.replace(/style="text-align: center;"/g, '');
      
      if (content.length !== beforeLength) {
        updated = true;
      }
      
      if (updated) {
        const { error } = await supabase
          .from('chapters')
          .update({ content })
          .eq('id', chapter.id);
        
        if (error) {
          console.error(`❌ Erro no capítulo ${chapter.id}:`, error);
        } else {
          console.log(`✅ ${chapter.title} - citações finalizadas`);
        }
      }
    }
    
    console.log('\n🎉 Formatação de citações completada!');
    
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

completeCitationsFix().catch(console.error);