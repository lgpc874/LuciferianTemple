import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function addOpeningCitations() {
  try {
    console.log('🔥 Adicionando citações de abertura aos grimórios...\n');

    // Citações específicas para cada grimório
    const openingCitations = [
      {
        grimoireId: 26, // Vozes do Fogo
        title: "Invocação do Primeiro Fogo",
        content: `<div class="opening-citation">
          <p><em>"Aqueles que ouvem o sussurro antes da queda já sentem o Abismo chamando. Não é o som da perdição, mas o eco da liberdade que ressoa nas profundezas da alma daqueles que ousam questionar a luz imposta."</em></p>
          
          <p><em>"Este grimório não é para os que buscam conforto espiritual, mas para os que sentem o fogo ancestral queimando em suas veias – aqueles que sabem que a verdadeira iluminação vem das Sombras."</em></p>
          
          <p class="citation-signature"><strong>— Do Abismo Eterno, pelos Primeiros Sussurros</strong></p>
        </div>`
      },
      {
        grimoireId: 27, // O Véu Rachado
        title: "Selo do Véu Rachado",
        content: `<div class="opening-citation">
          <p><em>"Há verdades que são prisões e verdades que são chaves. Este grimório é para aqueles que sentem o peso das correntes douradas da fé e começam a perceber que o véu da 'verdade pregada' esconde a realidade mais profunda da existência."</em></p>
          
          <p><em>"Quando o véu se rasga, não é o caos que encontramos do outro lado, mas nossa própria soberania divina há muito tempo negada e esquecida."</em></p>
          
          <p class="citation-signature"><strong>— Pela Voz dos Primeiros Rebeldes</strong></p>
        </div>`
      }
    ];

    for (const citation of openingCitations) {
      console.log(`📜 Adicionando citação para grimório ${citation.grimoireId}...`);

      // Primeiro, ajustar chapter_number de todos os capítulos existentes
      const { error: updateError } = await supabase.rpc('increment_chapter_numbers', {
        grimoire_id_param: citation.grimoireId
      });

      if (updateError) {
        console.log('Erro ao ajustar numeração, tentando manualmente...');
        
        // Buscar capítulos existentes
        const { data: chapters } = await supabase
          .from('chapters')
          .select('id, chapter_number')
          .eq('grimoire_id', citation.grimoireId)
          .order('chapter_number');

        // Atualizar numeração manualmente (de trás para frente para evitar conflitos)
        for (let i = chapters.length - 1; i >= 0; i--) {
          const chapter = chapters[i];
          await supabase
            .from('chapters')
            .update({ chapter_number: chapter.chapter_number + 1 })
            .eq('id', chapter.id);
        }
      }

      // Inserir citação como primeiro capítulo
      const { error: insertError } = await supabase
        .from('chapters')
        .insert({
          grimoire_id: citation.grimoireId,
          chapter_number: 1,
          title: citation.title,
          content: citation.content
        });

      if (insertError) {
        console.error(`Erro ao inserir citação para grimório ${citation.grimoireId}:`, insertError);
      } else {
        console.log(`✅ Citação "${citation.title}" adicionada com sucesso!`);
      }
    }

    console.log('\n🔥 Todas as citações de abertura foram adicionadas!');

  } catch (error) {
    console.error('Erro:', error);
  }
}

addOpeningCitations();