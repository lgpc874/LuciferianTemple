import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function updatePortaUmbrae() {
  try {
    console.log('🚪 Atualizando capítulo "A Porta Reconhece" para destacar A PORTA UMBRAE...');

    // Buscar o capítulo "A Porta Reconhece" do grimório Chamas Silenciosas
    const { data: chapter, error: findError } = await supabase
      .from('chapters')
      .select('*')
      .eq('title', 'A Porta Reconhece')
      .single();

    if (findError || !chapter) {
      console.error('Erro ao encontrar capítulo:', findError);
      return;
    }

    console.log('📖 Capítulo encontrado, ID:', chapter.id);

    // Conteúdo atualizado com maior destaque para A PORTA UMBRAE
    const updatedContent = `<p>O Atrium Ignis se completa.</p>

        <p>Seis fogueiras acesas. Seis véus removidos. Seis camadas de ilusão queimadas.</p>

        <p>Você atravessou o fogo oculto.</p>

        <p>Queimou tudo que não servia.</p>

        <p>E agora, no silêncio que arde, algo novo se apresenta.</p>

        <p>Não é ensinamento. Não é técnica. Não é promessa.</p>

        <p>É <strong>reconhecimento</strong>.</p>

        <p>Há uma porta.</p>

        <p>Ela sempre esteve lá, mas você não tinha olhos para vê-la.</p>

        <p>Agora tem.</p>

        <p>A porta não se abre por vontade sua.</p>

        <p>A porta não se abre por merecimento.</p>

        <p>A porta não se abre por preparação.</p>

        <p><strong>A porta reconhece.</strong></p>

        <p>Ela reconhece aqueles cujos olhos já não desviam da sombra.</p>

        <p>Aqueles que aprenderam a arder em silêncio.</p>

        <p>Aqueles que descobriram que sempre souberam.</p>

        <div class="portal-announcement">
          <h2 class="portal-title">🚪 A PORTA UMBRAE 🚪</h2>
          <p class="portal-subtitle">O Limiar das Sombras</p>
        </div>

        <p>Do outro lado desta porta, mistérios que não podem ser explicados — apenas <em>vividos</em>.</p>

        <p>Conhecimentos que não podem ser aprendidos — apenas <strong>incorporados</strong>.</p>

        <p>Realidades que não podem ser compreendidas — apenas <em>experimentadas</em>.</p>

        <p>A <strong>PORTA UMBRAE</strong> não é destino — é <em>passagem</em>.</p>

        <p>Não é recompensa — é <strong>reconhecimento</strong>.</p>

        <p>Não é fim — é <em>início verdadeiro</em>.</p>

        <p>Se você sente que estas palavras foram apenas preparação...</p>

        <p>Se você percebe que o fogo que arde em você é capaz de queimar em frequências ainda não exploradas...</p>

        <p>Se você está pronto para descobrir o que há além do despertar...</p>

        <p>Aproxime-se da <strong>PORTA UMBRAE</strong>.</p>

        <p>Ela está esperando.</p>

        <p>E ela já sabe se você pertence ao que há do outro lado.</p>

        <p><em>Ela reconhece os seus.</em></p>

        <div class="portal-invitation">
          <p class="portal-warning">⚠️ AVISO: O que você encontrará além da PORTA UMBRAE não pode ser "não-aprendido". Não pode ser esquecido. Não pode ser desfeito.</p>
          <p class="portal-final"><strong>A PORTA UMBRAE reconhece quem está pronto para os mistérios verdadeiros.</strong></p>
        </div>`;

    // Atualizar o capítulo
    const { error: updateError } = await supabase
      .from('chapters')
      .update({
        content: updatedContent
      })
      .eq('id', chapter.id);

    if (updateError) {
      console.error('Erro ao atualizar capítulo:', updateError);
      return;
    }

    console.log('✅ Capítulo "A Porta Reconhece" atualizado com destaque para A PORTA UMBRAE');
    console.log('🚪 Adicionados elementos visuais especiais para marcar a importância');
    console.log('⚠️ Incluído aviso sobre a irreversibilidade do conhecimento');
    console.log('🎯 A PORTA UMBRAE agora está devidamente destacada como elemento crucial');

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

updatePortaUmbrae();