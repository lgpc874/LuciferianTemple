import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function createGrimoire30Only() {
  try {
    console.log('🔥 Criando apenas grimório 4 com ID 30 no Supabase...');

    // Buscar a seção Atrium Ignis
    const { data: section } = await supabase
      .from('library_sections')
      .select('*')
      .eq('name', 'Atrium Ignis')
      .single();

    if (!section) {
      console.error('Seção Atrium Ignis não encontrada');
      return;
    }

    // Criar o grimório com ID específico 30
    const { data: grimoire, error: grimoireError } = await supabase
      .from('grimoires')
      .insert({
        id: 30, // ID específico
        title: '📙 A Mentira do Pecado – O Peso Que Nunca Foi Teu',
        description: 'Volume IV da trilha dos buscadores. Para aqueles que reconhecem as falhas da doutrina religiosa mas ainda carregam culpa e medo de serem livres. Uma desconstrução vibracional do conceito de pecado como ferramenta de submissão espiritual.',
        section_id: section.id,
        price: 27.77,
        cover_image_url: '',
        is_published: true,
        difficulty_level: 1,
        estimated_reading_time: 45,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (grimoireError) {
      console.error('Erro ao criar grimório:', grimoireError);
      return;
    }

    console.log('✅ Grimório criado com sucesso:');
    console.log('   Título:', grimoire.title);
    console.log('   ID:', grimoire.id);
    console.log('   Seção:', section.name);
    console.log('   Preço: R$', grimoire.price);
    console.log('');
    console.log('🔗 Agora você pode conectar os capítulos existentes a este grimório ID 30');

  } catch (error) {
    console.error('Erro:', error);
  }
}

createGrimoire30Only();