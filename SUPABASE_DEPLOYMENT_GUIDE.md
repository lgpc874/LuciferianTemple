# Guia de Implantação - Templo do Abismo

## Scripts Disponíveis

### 1. Setup Completo (`TEMPLO_ABISMO_COMPLETE_SCHEMA.sql`)
**Use quando:** Criar um novo projeto com todas as funcionalidades futuras
- ✅ 14 tabelas completas
- ✅ Sistema de pagamentos
- ✅ Analytics avançado
- ✅ Notificações
- ✅ Reviews e avaliações
- ✅ Assinaturas premium

### 2. Setup Rápido (`TEMPLO_QUICK_SETUP.sql`)
**Use quando:** Precisar apenas das funcionalidades básicas
- ✅ 5 tabelas essenciais
- ✅ Usuários e grimórios
- ✅ Progresso de leitura
- ✅ Configurações IA

## Como Usar

### Passo 1: Criar Projeto Supabase
1. Acesse https://supabase.com/dashboard
2. Clique em "New Project"
3. Configure nome, região e senha
4. Aguarde criação (2-3 minutos)

### Passo 2: Executar Script
1. Vá para "SQL Editor" no dashboard
2. Cole o conteúdo do script escolhido
3. Clique em "Run"
4. Verifique mensagem de sucesso

### Passo 3: Configurar Aplicação
1. Copie URL do projeto
2. Copie chaves anon e service_role
3. Configure no arquivo de ambiente:
```
SUPABASE_URL=sua_url_aqui
SUPABASE_ANON_KEY=sua_chave_anon
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
```

## Tabelas Principais

| Tabela | Função |
|--------|---------|
| `users` | Usuários do sistema |
| `library_sections` | Seções da biblioteca |
| `grimoires` | Conteúdo principal |
| `user_progress` | Progresso de leitura |
| `ai_settings` | Configurações IA |

## Funcionalidades por Tabela

### Setup Básico
- Sistema de usuários
- Biblioteca de grimórios
- Progresso de leitura
- Geração IA

### Setup Completo
- Tudo do básico +
- Sistema de pagamentos
- Reviews e avaliações
- Analytics detalhado
- Notificações
- Assinaturas premium
- Relatórios de conteúdo

## Verificação Pós-Setup

Execute no SQL Editor para verificar:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

## Solução de Problemas

### Erro: "relation does not exist"
- Execute o script novamente
- Verifique se está usando o SQL Editor correto

### Erro: "permission denied"
- Confirme que está logado como owner do projeto
- Verifique se o projeto foi criado corretamente

### Erro: "duplicate key"
- Script já foi executado
- Use `DROP TABLE` se precisar recriar

## Backup de Dados

Antes de mudanças importantes:
```sql
-- Backup de usuários
SELECT * FROM users;

-- Backup de grimórios
SELECT * FROM grimoires;
```