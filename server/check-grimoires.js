import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function checkGrimoires() {
  try {
    console.log('Checking grimoires in Supabase...');
    
    const { data, error } = await supabase
      .from('grimoires')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching grimoires:', error.message);
      return;
    }
    
    console.log(`Found ${data.length} grimoires in database`);
    
    if (data.length > 0) {
      console.log('Most recent grimoire:', {
        id: data[0].id,
        title: data[0].title,
        created_at: data[0].created_at,
        is_published: data[0].is_published
      });
    }
    
    // Test creating a simple grimoire
    console.log('\nTesting grimoire creation...');
    const testGrimoire = {
      title: 'Teste Direto Supabase',
      description: 'Grimório de teste para verificar criação',
      section_id: 1,
      content: 'Conteúdo de teste',
      category: 'Teste',
      difficulty_level: 1,
      is_paid: false,
      level: 'iniciante',
      unlock_order: 0,
      word_count: 100,
      estimated_reading_time: 5,
      is_published: true,
      tags: ['teste']
    };
    
    const { data: newGrimoire, error: createError } = await supabase
      .from('grimoires')
      .insert(testGrimoire)
      .select()
      .single();
    
    if (createError) {
      console.error('Error creating test grimoire:', createError);
    } else {
      console.log('Test grimoire created successfully:', newGrimoire.id);
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkGrimoires();