import { supabaseService } from './supabase-service.js';

async function testGrimoireGeneration() {
  console.log('🔮 Testando geração completa de grimório com IA...');
  
  try {
    // Test AI generation with simple prompt
    const result = await supabaseService.generateGrimoireWithAI(
      "Crie um grimório sobre magia de proteção com 3 capítulos"
    );
    
    console.log('✅ Resultado da geração:', {
      title: result.title,
      description: result.description,
      chapters: result.chapters.map(ch => ({
        title: ch.title,
        contentLength: ch.content ? ch.content.length : 0,
        hasContent: !!ch.content
      }))
    });
    
    if (result.chapters.every(ch => ch.title && ch.content)) {
      console.log('✅ Todos os capítulos foram gerados com título e conteúdo!');
    } else {
      console.log('❌ Alguns capítulos estão sem conteúdo:', 
        result.chapters.filter(ch => !ch.content).map(ch => ch.title)
      );
    }
    
  } catch (error) {
    console.error('❌ Erro na geração:', error.message);
  }
}

testGrimoireGeneration();