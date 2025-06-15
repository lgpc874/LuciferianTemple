const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Ordem correta dos grimórios baseada na especificação
const grimoireOrder = [
  { title: "Introdução ao Luciferianismo", order: 1 },
  { title: "O Que Não Te Contaram Sobre o Inferno", order: 2 },
  { title: "Quem é Lúcifer? — Luz Proibida da Criação", order: 3 },
  { title: "O Medo de Ser Livre — A Prisão Disfarçada de Salvação", order: 4 },
  { title: "O Falso Deus — O Tirano Oculto que Chamaram de Pai", order: 5 },
  { title: "A Luz que Não Vem do Céu — O Nascimento do Pensamento Luciferiano", order: 6 }
];

async function updateGrimoireOrder() {
  try {
    console.log('Atualizando ordem dos grimórios...');

    for (const grimoire of grimoireOrder) {
      const { data, error } = await supabase
        .from('grimoires')
        .update({ unlock_order: grimoire.order })
        .eq('title', grimoire.title)
        .eq('section_id', 1) // Apenas Atrium Ignis
        .select();

      if (error) {
        console.error(`Erro ao atualizar ${grimoire.title}:`, error);
        continue;
      }

      if (data && data.length > 0) {
        console.log(`✓ ${grimoire.title} - Ordem: ${grimoire.order}`);
      } else {
        console.log(`⚠ Grimório não encontrado: ${grimoire.title}`);
      }
    }

    console.log('Ordem dos grimórios atualizada com sucesso!');
  } catch (error) {
    console.error('Erro durante atualização:', error);
  }
}

updateGrimoireOrder();