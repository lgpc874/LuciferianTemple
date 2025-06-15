import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Configuração do OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function testCompleteAIGeneration() {
  console.log('🧪 Testando geração completa de grimório com IA...');

  try {
    // 1. Testar geração de IA
    console.log('📝 Gerando conteúdo com IA...');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um especialista em textos luciferianos e ocultismo. Crie um grimório completo e detalhado baseado no prompt fornecido.

          IMPORTANTE: Você deve criar capítulos COMPLETOS com título e conteúdo detalhado para cada um.
          
          Retorne um JSON com a seguinte estrutura:
          {
            "title": "Título do grimório",
            "description": "Descrição detalhada do conteúdo (2-3 parágrafos)",
            "chapters": [
              {
                "title": "Nome do Capítulo 1",
                "content": "Conteúdo completo e detalhado do capítulo com pelo menos 800-1200 palavras"
              },
              {
                "title": "Nome do Capítulo 2", 
                "content": "Conteúdo completo e detalhado do capítulo com pelo menos 800-1200 palavras"
              }
            ],
            "level": "iniciante|intermediario|avancado",
            "suggested_price": "valor sugerido em reais"
          }
          
          DIRETRIZES DE CONTEÚDO:
          - Cada capítulo deve ter conteúdo substancial (800-1200 palavras)
          - Use linguagem mística, erudita e adequada ao tema luciferiano
          - Inclua símbolos místicos, rituais práticos, filosofia e ensinamentos profundos
          - Estruture o conteúdo com parágrafos bem organizados
          - Use formatação em HTML quando apropriado (negrito, itálico, listas)
          - Inclua citações em latim quando relevante
          - Crie pelo menos 3-5 capítulos completos`
        },
        {
          role: "user",
          content: "Crie um grimório sobre 'Os Fundamentos da Filosofia Luciferiana'"
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 8000
    });

    const aiResult = JSON.parse(response.choices[0].message.content || '{}');
    console.log('✅ IA gerou:', {
      title: aiResult.title,
      chapters: aiResult.chapters?.length || 0,
      totalWords: aiResult.chapters?.reduce((total, ch) => total + (ch.content?.split(' ').length || 0), 0) || 0
    });

    // 2. Verificar estrutura dos capítulos
    if (aiResult.chapters && Array.isArray(aiResult.chapters)) {
      console.log('\n📚 Capítulos gerados:');
      aiResult.chapters.forEach((chapter, index) => {
        console.log(`${index + 1}. ${chapter.title} (${chapter.content?.split(' ').length || 0} palavras)`);
      });
    } else {
      console.error('❌ IA não gerou capítulos válidos');
      return;
    }

    // 3. Criar grimório no banco
    const totalWordCount = aiResult.chapters.reduce((total, chapter) => {
      return total + (chapter.content ? chapter.content.split(' ').length : 0);
    }, 0);

    const grimoireData = {
      title: aiResult.title,
      description: aiResult.description,
      section_id: 1,
      content: `Grimório com ${aiResult.chapters.length} capítulos gerados pela IA`,
      is_paid: false,
      level: aiResult.level || "iniciante",
      word_count: totalWordCount,
      estimated_reading_time: Math.max(5, Math.ceil(totalWordCount / 200)),
      is_published: true
    };

    const { data: newGrimoire, error: grimoireError } = await supabase
      .from('grimoires')
      .insert(grimoireData)
      .select()
      .single();

    if (grimoireError) {
      console.error('❌ Erro ao criar grimório:', grimoireError);
      return;
    }

    console.log('✅ Grimório criado:', newGrimoire.id, newGrimoire.title);

    // 4. Criar capítulos individuais
    const createdChapters = [];
    for (let i = 0; i < aiResult.chapters.length; i++) {
      const chapter = aiResult.chapters[i];
      
      if (chapter.title && chapter.content) {
        const chapterData = {
          grimoire_id: newGrimoire.id,
          title: chapter.title,
          content: chapter.content,
          chapter_number: i + 1,
          word_count: chapter.content.split(' ').length
        };
        
        const { data: createdChapter, error: chapterError } = await supabase
          .from('chapters')
          .insert(chapterData)
          .select()
          .single();

        if (chapterError) {
          console.error(`❌ Erro ao criar capítulo ${i + 1}:`, chapterError);
        } else {
          createdChapters.push(createdChapter);
          console.log(`✅ Capítulo ${i + 1} criado:`, createdChapter.title);
        }
      }
    }

    console.log(`\n🎉 Teste completo! Grimório com ${createdChapters.length} capítulos criados com sucesso.`);

  } catch (error) {
    console.error('❌ Teste falhado:', error.message);
  }
}

testCompleteAIGeneration();