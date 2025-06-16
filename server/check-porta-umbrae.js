import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function checkPortaUmbrae() {
  try {
    console.log('🚪 Verificando seção Porta Umbrae...');

    // Buscar seção Porta Umbrae
    const { data: portaUmbrae, error: sectionError } = await supabase
      .from('library_sections')
      .select('*')
      .eq('name', 'Porta Umbrae')
      .single();

    if (sectionError) {
      console.log('⚠️ Seção Porta Umbrae não encontrada, buscando por nome similar...');
      
      // Tentar buscar com nomes alternativos
      const { data: sections, error } = await supabase
        .from('library_sections')
        .select('*');
      
      console.log('📋 Seções existentes:');
      sections?.forEach(s => console.log(`  - ID ${s.id}: ${s.name}`));
      
      return;
    }

    console.log('✅ Seção Porta Umbrae encontrada:');
    console.log(`   ID: ${portaUmbrae.id}`);
    console.log(`   Nome: ${portaUmbrae.name}`);
    console.log(`   Descrição: ${portaUmbrae.description}`);

    // Verificar grimórios existentes na seção
    const { data: existingGrimoires, error: grimoireError } = await supabase
      .from('grimoires')
      .select('id, title')
      .eq('section_id', portaUmbrae.id);

    if (grimoireError) {
      console.error('Erro ao buscar grimórios:', grimoireError);
      return;
    }

    console.log(`📚 Grimórios existentes na Porta Umbrae: ${existingGrimoires?.length || 0}`);
    if (existingGrimoires && existingGrimoires.length > 0) {
      existingGrimoires.forEach(g => console.log(`   - ${g.title}`));
    }

    console.log('🎯 Pronto para receber os 6 novos grimórios da Porta Umbrae!');

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

checkPortaUmbrae();