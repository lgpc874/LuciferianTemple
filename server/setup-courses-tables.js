const { supabaseService } = require('./supabase-service.ts');

async function setupCoursesTables() {
  try {
    console.log('🔥 Configurando tabelas de cursos no Supabase...');
    
    // Executar SQL raw para criar as tabelas
    const client = supabaseService.getClient();
    
    // Criar tabela de cursos
    const { error: cursosError } = await client.rpc('create_courses_tables');
    
    if (cursosError) {
      console.log('Criando tabelas manualmente...');
      
      // SQL para criar todas as tabelas necessárias
      const createTablesSQL = `
        -- Criar tabela de cursos
        CREATE TABLE IF NOT EXISTS cursos (
          id SERIAL PRIMARY KEY,
          nome TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          descricao TEXT NOT NULL,
          imagem_url TEXT,
          nivel TEXT DEFAULT 'iniciante' NOT NULL,
          preco DECIMAL(10,2),
          is_paid BOOLEAN DEFAULT false NOT NULL,
          is_active BOOLEAN DEFAULT true NOT NULL,
          ordem_exibicao INTEGER DEFAULT 0 NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );

        -- Criar tabela de módulos dos cursos
        CREATE TABLE IF NOT EXISTS modulos (
          id SERIAL PRIMARY KEY,
          curso_id INTEGER REFERENCES cursos(id) ON DELETE CASCADE NOT NULL,
          titulo TEXT NOT NULL,
          conteudo TEXT NOT NULL,
          pratica TEXT,
          desafio TEXT NOT NULL,
          ordem INTEGER DEFAULT 1 NOT NULL,
          is_active BOOLEAN DEFAULT true NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );

        -- Criar tabela de respostas dos usuários aos desafios
        CREATE TABLE IF NOT EXISTS respostas_cursos (
          id SERIAL PRIMARY KEY,
          usuario_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
          modulo_id INTEGER REFERENCES modulos(id) ON DELETE CASCADE NOT NULL,
          resposta TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW(),
          UNIQUE(usuario_id, modulo_id)
        );

        -- Criar tabela de progresso dos usuários nos cursos
        CREATE TABLE IF NOT EXISTS progresso_cursos (
          id SERIAL PRIMARY KEY,
          usuario_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
          curso_id INTEGER REFERENCES cursos(id) ON DELETE CASCADE NOT NULL,
          modulo_atual INTEGER DEFAULT 1 NOT NULL,
          modulos_concluidos INTEGER[],
          concluido BOOLEAN DEFAULT false NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW(),
          UNIQUE(usuario_id, curso_id)
        );
      `;
      
      // Como o Supabase não permite executar SQL complexo diretamente,
      // vamos inserir dados de teste diretamente
      console.log('Tabelas devem ser criadas manualmente no Supabase Dashboard.');
      console.log('Execute o script SUPABASE_CURSOS_SETUP.sql no editor SQL do Supabase.');
    }
    
    console.log('✅ Configuração de cursos finalizada!');
    
  } catch (error) {
    console.error('❌ Erro ao configurar tabelas:', error);
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  setupCoursesTables();
}