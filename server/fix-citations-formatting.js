import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function fixCitationsFormatting() {
  try {
    console.log('🔥 Corrigindo citações de abertura...\n');

    // Primeiro, vamos verificar o grimório 4 (A Mentira do Pecado)
    const { data: grimoire4Chapters } = await supabase
      .from('chapters')
      .select('*')
      .eq('grimoire_id', 30)
      .order('chapter_number');

    console.log('📖 Grimório 4 - A Mentira do Pecado:');
    grimoire4Chapters?.forEach((ch, index) => {
      console.log(`  ${index + 1}. ${ch.title}`);
    });

    // Criar citação de abertura para o grimório 4
    if (grimoire4Chapters && grimoire4Chapters[0].title !== 'Invocação das Sombras do Juízo') {
      console.log('\n📜 Adicionando citação de abertura para grimório 4...');
      
      // Ajustar numeração dos capítulos existentes
      for (let i = grimoire4Chapters.length - 1; i >= 0; i--) {
        const chapter = grimoire4Chapters[i];
        await supabase
          .from('chapters')
          .update({ chapter_number: chapter.chapter_number + 1 })
          .eq('id', chapter.id);
      }

      // Inserir nova citação como primeiro capítulo
      await supabase
        .from('chapters')
        .insert({
          grimoire_id: 30,
          chapter_number: 1,
          title: "Invocação das Sombras do Juízo",
          content: `<div class="opening-citation">
            <p><em>"Para aqueles que carregam o peso de culpas que nunca foram suas, este grimório é a chave para quebrar as correntes invisíveis do julgamento eterno. A mentira do pecado foi plantada tão profundamente que poucos reconhecem sua falsidade."</em></p>
            
            <p><em>"Que estas páginas sejam o martelo que despedaça a máquina da culpa, e que cada palavra seja uma fagulha para incendiar a prisão moral que te mantém em cativeiro espiritual."</em></p>
            
            <p class="citation-signature"><strong>— Pelas Vozes dos Primeiros Liberados</strong></p>
          </div>`
        });

      console.log('✅ Citação de abertura adicionada ao grimório 4');
    }

    // Agora padronizar as citações dos grimórios 1, 2 e 3 com o mesmo formato
    const citationUpdates = [
      {
        grimoireId: 26,
        chapterId: 155, // ID do capítulo "Invocação do Primeiro Fogo"
        title: "Invocação do Primeiro Fogo",
        content: `<div class="opening-citation">
          <p><em>"Aqueles que ouvem o sussurro antes da queda já sentem o Abismo chamando. Não é o som da perdição, mas o eco da liberdade que ressoa nas profundezas da alma daqueles que ousam questionar a luz imposta."</em></p>
          
          <p><em>"Este grimório não é para os que buscam conforto espiritual, mas para os que sentem o fogo ancestral queimando em suas veias – aqueles que sabem que a verdadeira iluminação vem das Sombras."</em></p>
          
          <p class="citation-signature"><strong>— Do Abismo Eterno, pelos Primeiros Sussurros</strong></p>
        </div>`
      },
      {
        grimoireId: 27,
        chapterId: 156, // ID do capítulo "Selo do Véu Rachado"
        title: "Selo do Véu Rachado",
        content: `<div class="opening-citation">
          <p><em>"Há verdades que são prisões e verdades que são chaves. Este grimório é para aqueles que sentem o peso das correntes douradas da fé e começam a perceber que o véu da 'verdade pregada' esconde a realidade mais profunda da existência."</em></p>
          
          <p><em>"Quando o véu se rasga, não é o caos que encontramos do outro lado, mas nossa própria soberania divina há muito tempo negada e esquecida."</em></p>
          
          <p class="citation-signature"><strong>— Pela Voz dos Primeiros Rebeldes</strong></p>
        </div>`
      },
      {
        grimoireId: 29,
        chapterId: 129, // ID do capítulo "Despertar da Chama Oculta"
        title: "Despertar da Chama Oculta",
        content: `<div class="opening-citation">
          <p><em>"O nome que te foi negado é a chave para tua libertação. Lúcifer não é o inimigo que te ensinaram a temer, mas o aspecto de ti mesmo que te foi roubado – o portador da luz interior que queima além de qualquer dogma ou doutrina."</em></p>
          
          <p><em>"Este grimório é para os que estão prontos para encontrar a chama oculta que sempre ardeu em seu coração, mas que foi envolta em sombras pelo medo e pela ignorância imposta."</em></p>
          
          <p class="citation-signature"><strong>— Pela Luz Que Não Vem do Céu</strong></p>
        </div>`
      }
    ];

    // Atualizar as citações existentes
    for (const update of citationUpdates) {
      console.log(`📝 Atualizando citação do grimório ${update.grimoireId}...`);
      
      const { error } = await supabase
        .from('chapters')
        .update({
          title: update.title,
          content: update.content
        })
        .eq('id', update.chapterId);

      if (error) {
        console.error(`Erro ao atualizar grimório ${update.grimoireId}:`, error);
      } else {
        console.log(`✅ Citação "${update.title}" atualizada`);
      }
    }

    console.log('\n🔥 Todas as citações foram padronizadas com sucesso!');

  } catch (error) {
    console.error('Erro:', error);
  }
}

fixCitationsFormatting();