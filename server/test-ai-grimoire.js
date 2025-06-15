import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function testAIGrimoireCreation() {
  try {
    console.log('Testing AI grimoire generation and creation...');
    
    // 1. Gerar conteúdo com IA
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um especialista em textos luciferianos. Crie um grimório simples.
          
          Retorne um JSON com:
          {
            "title": "Título do grimório",
            "description": "Descrição do conteúdo"
          }`
        },
        {
          role: "user",
          content: "Crie um grimório básico sobre invocação luciferiana para iniciantes"
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000
    });

    const aiResult = JSON.parse(response.choices[0].message.content || '{}');
    console.log('AI generation successful:', aiResult.title);
    
    // 2. Criar grimório no Supabase com campos básicos
    const grimoireData = {
      title: aiResult.title || 'Grimório Gerado pela IA',
      description: aiResult.description || 'Descrição gerada pela IA',
      section_id: 1, // Porta das Sombras
      category: 'IA Generated'
    };
    
    const { data: newGrimoire, error } = await supabase
      .from('grimoires')
      .insert(grimoireData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating grimoire:', error);
      return;
    }
    
    console.log('Grimoire created successfully:', {
      id: newGrimoire.id,
      title: newGrimoire.title,
      section_id: newGrimoire.section_id
    });
    
    // 3. Verificar se aparece na listagem
    const { data: allGrimoires } = await supabase
      .from('grimoires')
      .select('*');
    
    console.log(`Total grimoires now: ${allGrimoires?.length || 0}`);
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAIGrimoireCreation();