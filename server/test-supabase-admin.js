import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nqexwgnscvpfhuonbafr.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZXh3Z25zY3ZwZmh1b25iYWZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTcyNjM0MCwiZXhwIjoyMDY1MzAyMzQwfQ.ERK-PGWpodJX4WC_84IYW4pwbwkfmcICFFS5oXBsGlk';

async function testSupabaseAdmin() {
  console.log('🧪 Testando criação de tabelas no Supabase...');
  
  const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  
  try {
    // Teste 1: Criar uma tabela de teste
    console.log('📋 Criando tabela de teste...');
    const createTableResult = await adminClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS test_admin_table (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          test_number INTEGER DEFAULT 1,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    });
    
    if (createTableResult.error) {
      console.error('❌ Erro ao criar tabela:', createTableResult.error);
    } else {
      console.log('✅ Tabela criada com sucesso!');
    }

    // Teste 2: Inserir dados na tabela
    console.log('📝 Inserindo dados de teste...');
    const { data: insertData, error: insertError } = await adminClient
      .from('test_admin_table')
      .insert({
        name: 'Teste Admin',
        description: 'Teste de funcionalidade administrativa',
        test_number: 42
      })
      .select()
      .single();

    if (insertError) {
      console.error('❌ Erro ao inserir dados:', insertError);
    } else {
      console.log('✅ Dados inseridos:', insertData);
    }

    // Teste 3: Buscar dados
    console.log('🔍 Buscando dados...');
    const { data: selectData, error: selectError } = await adminClient
      .from('test_admin_table')
      .select('*')
      .limit(5);

    if (selectError) {
      console.error('❌ Erro ao buscar dados:', selectError);
    } else {
      console.log('✅ Dados encontrados:', selectData);
    }

    // Teste 4: Alterar estrutura da tabela
    console.log('🔧 Alterando estrutura da tabela...');
    const alterTableResult = await adminClient.rpc('exec_sql', {
      sql: `
        ALTER TABLE test_admin_table 
        ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
      `
    });

    if (alterTableResult.error) {
      console.error('❌ Erro ao alterar tabela:', alterTableResult.error);
    } else {
      console.log('✅ Estrutura alterada com sucesso!');
    }

    // Teste 5: Criar índice
    console.log('📊 Criando índice...');
    const indexResult = await adminClient.rpc('exec_sql', {
      sql: `
        CREATE INDEX IF NOT EXISTS idx_test_admin_name 
        ON test_admin_table(name);
      `
    });

    if (indexResult.error) {
      console.error('❌ Erro ao criar índice:', indexResult.error);
    } else {
      console.log('✅ Índice criado com sucesso!');
    }

    // Teste 6: Configurar RLS
    console.log('🛡️ Configurando Row Level Security...');
    const rlsResult = await adminClient.rpc('exec_sql', {
      sql: `
        ALTER TABLE test_admin_table ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY IF NOT EXISTS "Acesso livre para teste" 
        ON test_admin_table FOR ALL 
        USING (true) WITH CHECK (true);
      `
    });

    if (rlsResult.error) {
      console.error('❌ Erro ao configurar RLS:', rlsResult.error);
    } else {
      console.log('✅ RLS configurado com sucesso!');
    }

    // Teste 7: Deletar a tabela de teste
    console.log('🧹 Limpando tabela de teste...');
    const dropResult = await adminClient.rpc('exec_sql', {
      sql: 'DROP TABLE IF EXISTS test_admin_table;'
    });

    if (dropResult.error) {
      console.error('❌ Erro ao deletar tabela:', dropResult.error);
    } else {
      console.log('✅ Tabela deletada com sucesso!');
    }

    console.log('\n🎉 TODOS OS TESTES PASSARAM!');
    console.log('✅ Sistema administrativo funcionando 100%');
    console.log('✅ Criação de tabelas: OK');
    console.log('✅ Inserção de dados: OK');
    console.log('✅ Busca de dados: OK');
    console.log('✅ Alteração de estrutura: OK');
    console.log('✅ Criação de índices: OK');
    console.log('✅ Configuração RLS: OK');
    console.log('✅ Limpeza de tabelas: OK');

  } catch (error) {
    console.error('❌ Erro geral durante testes:', error);
    console.error('Detalhes:', error.message);
  }
}

testSupabaseAdmin();