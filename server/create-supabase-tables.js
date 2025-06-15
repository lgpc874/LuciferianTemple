import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('SUPABASE_URL and SUPABASE_ANON_KEY are required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  console.log('Creating library tables in Supabase...');

  try {
    // Inserir seções padrão diretamente na tabela
    const defaultSections = [
      { name: 'Porta das Sombras', description: 'Para os que chegaram ao limiar. Os olhos ainda fechados... mas já sentem o fogo.', slug: 'porta-das-sombras', display_order: 1, is_active: true },
      { name: 'Vestíbulo da Chama', description: 'O primeiro despertar. A chama interior começa a arder com conhecimento primordial.', slug: 'vestibulo-da-chama', display_order: 2, is_active: true },
      { name: 'Torre dos Selos', description: 'Ascensão aos mistérios selados. Conhecimentos que poucos ousam desvelar.', slug: 'torre-dos-selos', display_order: 3, is_active: true },
      { name: 'Sanctum Profundum', description: 'O santuário dos arcanos supremos. Apenas para os que transcenderam o véu.', slug: 'sanctum-profundum', display_order: 4, is_active: true },
      { name: 'Textos Filosóficos', description: 'Fundamentos filosóficos e teóricos dos ensinamentos luciferianos.', slug: 'textos-filosoficos', display_order: 5, is_active: true },
      { name: 'Meditações Práticas', description: 'Práticas meditativas e exercícios para desenvolvimento espiritual.', slug: 'meditacoes-praticas', display_order: 6, is_active: true }
    ];

    // Tentar inserir cada seção
    for (const section of defaultSections) {
      const { error } = await supabase
        .from('library_sections')
        .upsert(section, { onConflict: 'slug' });
      
      if (error) {
        console.log(`Section ${section.name}: ${error.message}`);
      } else {
        console.log(`✓ Section ${section.name} created/updated`);
      }
    }

    console.log('🎉 Library sections setup completed!');

  } catch (error) {
    console.error('Error setting up library:', error);
  }
}

createTables();