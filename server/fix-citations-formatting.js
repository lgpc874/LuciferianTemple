import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function fixCitationsFormatting() {
  console.log('🔧 Corrigindo formatação das citações nos grimórios...');
  
  try {
    // Buscar capítulos dos grimórios principais
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
    
    console.log(`📖 Processando ${chapters.length} capítulos`);
    
    for (const chapter of chapters) {
      console.log(`🔄 ${chapter.title}`);
      
      let content = chapter.content;
      
      // Converter citações com estilos inline para classes CSS
      
      // Padrão 1: Divs centralizadas com estilos inline
      content = content.replace(
        /<div style="text-align: center; margin: 4rem 0; font-style: italic; font-size: 1\.2em; color: #d4af37;">(.*?)<\/div>/gs,
        '<div class="opening-invocation">$1</div>'
      );
      
      // Padrão 2: Parágrafos centralizados com estilos inline
      content = content.replace(
        /<p style="text-align: center; font-style: italic; margin: 2rem 0; color: #d4af37;">(.*?)<\/p>/gs,
        '<div class="mystical-quote"><p class="quote-text">$1</p></div>'
      );
      
      // Padrão 3: Citações de abertura mais complexas
      content = content.replace(
        /<div style="text-align: center; margin: 3rem 0; padding: 2rem; background: rgba\(139, 69, 19, 0\.1\); border: 2px solid rgba\(212, 175, 55, 0\.3\); border-radius: 8px;">(.*?)<\/div>/gs,
        '<div class="opening-invocation">$1</div>'
      );
      
      // Padrão 4: Outras citações com cor dourada
      content = content.replace(
        /<p style="[^"]*color: #d4af37[^"]*">(.*?)<\/p>/gs,
        '<div class="mystical-emphasis">$1</div>'
      );
      
      // Padrão 5: Citações em itálico centralizadas
      content = content.replace(
        /<p style="text-align: center[^"]*font-style: italic[^"]*">(.*?)<\/p>/gs,
        '<div class="mystical-quote"><p class="quote-text">$1</p></div>'
      );
      
      // Padrão 6: Elementos em itálico com ênfase
      content = content.replace(
        /<em style="[^"]*color: #d4af37[^"]*">(.*?)<\/em>/gs,
        '<span class="mystical-emphasis">$1</span>'
      );
      
      // Limpar atributos style redundantes
      content = content.replace(/style="[^"]*"/g, (match) => {
        // Manter apenas estilos essenciais não cobertos pelas classes
        if (match.includes('margin-top') || match.includes('font-size: 0.9em')) {
          return match;
        }
        return '';
      });
      
      // Remover espaços extras
      content = content.replace(/\s+/g, ' ');
      content = content.replace(/>\s+</g, '><');
      
      // Atualizar no banco
      const { error: updateError } = await supabase
        .from('chapters')
        .update({ content })
        .eq('id', chapter.id);
      
      if (updateError) {
        console.error(`❌ Erro ao atualizar ${chapter.id}:`, updateError);
      } else {
        console.log(`  ✅ Citações formatadas`);
      }
    }
    
    console.log('\n🎉 Formatação de citações concluída!');
    console.log('📋 Alterações aplicadas:');
    console.log('  • Citações de abertura convertidas para classe opening-invocation');
    console.log('  • Citações místicas convertidas para classe mystical-quote');
    console.log('  • Ênfases convertidas para classe mystical-emphasis');
    console.log('  • Estilos inline removidos e substituídos por classes CSS');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

fixCitationsFormatting().catch(console.error);