# Templo do Abismo

Site de ensinamentos luciferianos com sistema de biblioteca digital e experiência de leitura imersiva.

## Características Principais

- **Interface Kindle**: Experiência de leitura em formato A5 com paginação inteligente
- **Sistema de Autenticação**: Login/registro seguro para acesso aos grimórios
- **Biblioteca Digital**: Coleção organizada de grimórios com capas personalizadas
- **Design Místico**: Paleta de cores dourada/âmbar com texturas envelhecidas
- **Responsivo**: Adaptação completa para mobile e desktop

## Padrões de Grimórios

**OBRIGATÓRIO**: Todos os grimórios devem seguir o padrão Kindle definido em `GRIMOIRE_STANDARDS.md`:

- Formato A5 responsivo (380x540px desktop, 85vw×80vh mobile)
- Paginação preservando parágrafos HTML completos
- Navegação contínua entre capítulos
- Visual idêntico ao site (cores, fontes, texturas)
- Interface limpa sem header/menu

### Implementação Rápida

1. Copie `client/src/pages/grimoire-kindle.tsx` como base
2. Ajuste apenas o conteúdo específico do grimório
3. Use rota `/grimoire/:id` para aplicação automática do padrão
4. Verifique checklist em `GRIMOIRE_STANDARDS.md`

## Tecnologias

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express, Drizzle ORM
- **Database**: Supabase PostgreSQL
- **Autenticação**: JWT tokens com sessions
- **UI**: shadcn/ui components

## Estrutura do Projeto

```
├── client/                 # Frontend React
│   ├── src/pages/         # Páginas da aplicação
│   │   ├── grimoire-kindle.tsx  # Padrão de leitura
│   │   └── biblioteca.tsx       # Listagem de grimórios
│   ├── src/components/    # Componentes reutilizáveis
│   └── src/hooks/         # Custom hooks
├── server/                # Backend Express
│   ├── routes.ts         # Rotas da API
│   ├── storage.ts        # Interface de dados
│   └── grimoire-data.ts  # Conteúdo dos grimórios
├── shared/               # Tipos compartilhados
│   └── schema.ts        # Schemas Drizzle + Zod
└── GRIMOIRE_STANDARDS.md # Padrões obrigatórios
```

## Scripts

- `npm run dev` - Desenvolvimento
- `npm run build` - Build para produção

## Configuração

Variáveis de ambiente necessárias:
- `DATABASE_URL` - Conexão Supabase
- `OPENAI_API_KEY` - Para funcionalidades IA (opcional)

## Nota Importante

Este projeto mantém padrões rígidos de qualidade visual e experiência do usuário. Consulte sempre os arquivos de padrões antes de implementar novos grimórios ou funcionalidades.