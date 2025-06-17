// Criar sistema de cursos diretamente no Supabase usando métodos existentes
const { supabaseService } = require('./supabase-service');

async function createCoursesDirectly() {
  try {
    console.log('🔥 Criando sistema de cursos...');
    
    // Primeiro, vamos verificar se conseguimos acessar o Supabase
    const client = supabaseService.supabase;
    
    // Tentar inserir dados de teste para ver se as tabelas existem
    console.log('📚 Testando inserção de curso...');
    
    // Se as tabelas não existem, isso vai retornar erro que podemos capturar
    const { data: testCurso, error: testError } = await client
      .from('cursos')
      .insert({
        nome: 'LUXFERAT — A Chama da Iniciação',
        slug: 'luxferat',
        descricao: 'Curso fundamental de iniciação ao luciferianismo ancestral. Desperte a chama interior e rompa os véus da ilusão através de práticas ancestrais e filosofia oculta.',
        nivel: 'iniciante',
        preco: '99.99',
        is_paid: true,
        is_active: true,
        ordem_exibicao: 1
      })
      .select()
      .single();

    if (testError) {
      console.log('❌ Erro esperado - tabelas não existem:', testError.message);
      console.log('📋 Use o arquivo SUPABASE_CURSOS_SETUP.sql no Supabase Dashboard');
      return;
    }

    console.log('✅ Curso criado:', testCurso.nome);
    
    // Se chegamos aqui, as tabelas existem, vamos criar os módulos
    const modulos = [
      {
        curso_id: testCurso.id,
        titulo: 'A Semente do Fogo Oculto',
        conteudo: '<h2 style="color: #D6342C; font-family: Cinzel Decorative;">A SEMENTE DO FOGO OCULTO</h2><p style="font-family: EB Garamond; font-size: 16px;">Conteúdo do módulo...</p>',
        pratica: '<h3 style="color: #D97706; font-family: Cinzel;">RITUAL DE BANIMENTO</h3><p>Prática ritual...</p>',
        desafio: 'Pratique o silêncio ritual por 3 dias e registre suas experiências.',
        ordem: 1
      },
      {
        curso_id: testCurso.id,
        titulo: 'O Espelho Quebrado do Mundo',
        conteudo: '<h2 style="color: #D6342C; font-family: Cinzel Decorative;">O ESPELHO QUEBRADO DO MUNDO</h2><p style="font-family: EB Garamond; font-size: 16px;">Conteúdo do segundo módulo...</p>',
        pratica: '<h3 style="color: #D97706; font-family: Cinzel;">MEDITAÇÃO ABISSAL</h3><p>Técnicas de meditação...</p>',
        desafio: 'Escreva seu Manifesto da Heresia Pessoal.',
        ordem: 2
      }
    ];

    for (const modulo of modulos) {
      const { error: moduloError } = await client
        .from('modulos')
        .insert(modulo);
      
      if (moduloError) {
        console.log('❌ Erro ao criar módulo:', moduloError.message);
      } else {
        console.log('✅ Módulo criado:', modulo.titulo);
      }
    }

    console.log('🎉 Sistema de cursos criado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

// Executar
createCoursesDirectly();