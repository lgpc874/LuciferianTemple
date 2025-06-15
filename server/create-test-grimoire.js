import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function createTestGrimoire() {
  try {
    console.log('Creating test grimoire directly in Supabase...');
    
    // Criar grimório com apenas campos que sabemos que existem
    const testGrimoire = {
      title: 'Grimório Gerado pela IA - Teste',
      description: 'Este grimório foi criado para testar a funcionalidade de geração automática',
      section_id: 1, // Porta das Sombras
      is_published: true
    };
    
    const { data: newGrimoire, error } = await supabase
      .from('grimoires')
      .insert(testGrimoire)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating test grimoire:', error);
      return;
    }
    
    console.log('Test grimoire created successfully:', {
      id: newGrimoire.id,
      title: newGrimoire.title,
      section_id: newGrimoire.section_id
    });
    
    // Verificar se aparece na listagem
    const { data: allGrimoires } = await supabase
      .from('grimoires')
      .select('id, title, description, section_id, is_published, created_at')
      .order('created_at', { ascending: false });
    
    console.log(`\nTotal grimoires in database: ${allGrimoires?.length || 0}`);
    
    if (allGrimoires && allGrimoires.length > 0) {
      console.log('Recent grimoires:');
      allGrimoires.slice(0, 3).forEach(g => {
        console.log(`- ${g.title} (ID: ${g.id}, Published: ${g.is_published})`);
      });
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createTestGrimoire();