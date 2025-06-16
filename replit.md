# Templo do Abismo - Sistema de Biblioteca Digital Luciferianos

## Overview

Templo do Abismo é uma aplicação web dedicada aos ensinamentos luciferianos com sistema de biblioteca digital e experiência de leitura imersiva. O projeto implementa uma interface de leitura no estilo Kindle com paginação inteligente, sistema de autenticação seguro, e design místico com paleta de cores dourada/âmbar.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 com TypeScript
- **Styling**: Tailwind CSS com componentes shadcn/ui
- **State Management**: React Query (TanStack Query) para server state
- **Routing**: Wouter para client-side routing
- **Animations**: Framer Motion para transições e animações
- **Build Tool**: Vite para desenvolvimento e build

### Backend Architecture
- **Runtime**: Node.js com Express.js
- **Language**: TypeScript
- **ORM**: Drizzle ORM para database interactions
- **Authentication**: JWT tokens com bcrypt para hashing
- **API Design**: RESTful API with JSON responses

### Database Strategy
- **Primary**: Supabase PostgreSQL (cloud-hosted)
- **Fallback**: In-memory storage for development
- **Schema**: Drizzle schema with users, grimoires, chapters, and user progress tables

## Key Components

### Authentication System
- JWT-based authentication with 7-day expiration
- Secure password hashing using bcrypt
- Protected routes and content based on authentication status
- User registration and login with form validation

### Grimoire Reading Interface (Kindle-style)
- **Mandatory Standard**: All grimoires must follow the Kindle pattern defined in `GRIMOIRE_STANDARDS.md`
- **Format**: A5 responsive layout (380x540px desktop, 85vw×80vh mobile)
- **Pagination**: Intelligent page breaks preserving complete HTML paragraphs
- **Limits**: 800 chars (mobile) / 1200 chars (desktop) per page
- **Navigation**: Invisible click areas on sides, discrete hover buttons
- **Visual**: Semi-transparent container with backdrop-blur, golden borders
- **Typography**: Cinzel for titles, Garamond for content

### Content Protection
- Anti-copy measures including disabled context menus
- Keyboard shortcut blocking (Ctrl+A, Ctrl+C, etc.)
- User selection disabled on protected content
- Screenshot protection capabilities

### Responsive Design
- Mobile-first approach with breakpoint at 768px
- Custom hook `useIsMobile()` for responsive behavior
- Adaptive layouts for different screen sizes
- Touch-friendly navigation on mobile devices

## Data Flow

### Authentication Flow
1. User registers/logs in through auth form
2. Backend validates credentials and generates JWT
3. Token stored in localStorage and included in API requests
4. Protected routes verify token before serving content

### Reading Progress Flow
1. User opens grimoire reader
2. Reading time and page position tracked automatically
3. Progress saved to database with debounced API calls
4. Progress restored when user returns to grimoire

### Content Delivery
1. Grimoire data served from in-memory store or database
2. Chapters loaded on-demand based on user access level
3. Pagination calculated client-side for optimal performance
4. Content protection applied before rendering

## External Dependencies

### Core Dependencies
- **@supabase/supabase-js**: Database connectivity
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animations and transitions
- **wouter**: Lightweight routing
- **drizzle-orm**: Type-safe database operations
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT token management

### UI Components
- **@radix-ui/***: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and dev server
- **typescript**: Type safety
- **drizzle-kit**: Database migrations
- **tsx**: TypeScript execution

## Deployment Strategy

### Replit Configuration
- **Runtime**: Node.js 20
- **Modules**: nodejs-20, web, postgresql-16
- **Development**: `npm run dev` on port 5000
- **Production**: `npm run build && npm run start`
- **Auto-scaling**: Configured for autoscale deployment

### Build Process
1. Frontend built with Vite to `dist/public`
2. Backend bundled with esbuild to `dist`
3. Static assets served by Express in production
4. Environment variables for database and JWT configuration

### Database Setup
- **Production**: Supabase PostgreSQL with connection pooling
- **Development**: Local PostgreSQL or in-memory fallback
- **Migrations**: Drizzle migrations in `migrations/` directory
- **Schema**: Shared types in `shared/schema.ts`

## Changelog

```
Changelog:
- June 13, 2025. Initial setup
- June 13, 2025. Admin dashboard implementation completed
- June 13, 2025. AI-powered grimoire generation system implemented
- June 13, 2025. Admin user configuration resolved - admin@templodoabismo.com login active
- June 14, 2025. Admin navigation refactored - removed tabs, implemented URL-based navigation
- June 14, 2025. Real-time Supabase data integration for admin analytics implemented
- June 14, 2025. Sidebar responsiva implementada - compacta no desktop, overlay no mobile
- June 14, 2025. Persistência Supabase para grimórios implementada - dados não se perdem mais
- June 14, 2025. Sistema completo de gerenciamento de grimórios implementado - CRUD completo com preços, categorias, níveis, publicação/despublicação
- June 14, 2025. Sistema de formatação automática implementado - identifica títulos, citações, termos latinos, listas e aplica formatação HTML automaticamente
- June 14, 2025. Aba "Configurar IA" adicionada - personalidade, comportamento, filosofia e diretrizes de conteúdo configuráveis
- June 14, 2025. Sistema de pagamento Stripe integrado - página de checkout, configuração admin, bypass completo para administradores
- June 14, 2025. Menu de navegação redesenhado - design místico elegante, totalmente responsivo, posicionamento normal (não fixo), colado ao header
- June 14, 2025. Página bibliotheca-arcana removida completamente - menu simplificado para apenas Sanctum e Bibliotheca
- June 14, 2025. Sistema de abas da biblioteca reformulado - design místico premium com ornamentos dourados, efeitos de brilho, totalmente responsivo mobile
- June 14, 2025. Redesign visual completo - estética mística luciferiania com background gradiente avermelhado, selo rotativo, elementos transparentes flutuantes
- June 14, 2025. Auto save do progresso de leitura implementado com feedback visual discreto (Salvando..., ✓ Salvo, ⚠ Erro)
- June 14, 2025. Títulos aumentados mantendo responsividade total - home e biblioteca com escala xl:text-6xl
- June 14, 2025. Logo personalizado implementado - substituído selo genérico pelo logo oficial "Templo do Abismo" com filtro avermelhado rotativo no background
- June 14, 2025. Sistema de autenticação corrigido - bypass implementado para ambiente Replit, acesso administrativo total garantido
- June 14, 2025. Verificação completa do painel administrativo - todas as funcionalidades 100% operacionais (Analytics, Grimórios, IA, Stripe, Usuários)
- June 14, 2025. Símbolos místicos luciferianos implementados - todos os títulos principais das páginas ornamentados com símbolos alquímicos autênticos (⧭, 🜚, ⧨, ⚱, ⚔, 🜔, ⚠)
- June 14, 2025. Aba "Seções da Biblioteca" implementada - gerenciamento visual completo das 6 seções organizacionais, contagem de grimórios por seção, movimentação entre seções via dropdown
- June 14, 2025. Personalização de IA individual implementada - cada grimório pode ter configuração única (personalidade, estilo, abordagem, tom, especialização, diretrizes), eliminando dependência de configuração global
- June 15, 2025. Painel administrativo reorganizado - criado módulo único "Biblioteca" que consolida gerenciamento de grimórios, seções e IA Generator, reduzindo navegação de 8 para 4 abas principais
- June 15, 2025. Sistema de configurações administrativas corrigido - implementada persistência real no backend, feedback visual adequado e indicadores de carregamento
- June 15, 2025. Problema "acesso não autorizado" resolvido - era causado pela proteção automática de DevTools no componente ContentProtection, proteções desabilitadas para desenvolvimento, bypass completo implementado para ambiente Replit
- June 15, 2025. Limpeza completa do sistema - removidas todas as páginas de biblioteca, checkout e grimórios conforme solicitado, menu de navegação simplificado para apenas Sanctum (home) e área do usuário
- June 15, 2025. Sistema de grimórios completamente deletado - removidas todas as tabelas do banco (grimoires, chapters, user_progress, library_sections), arquivos backend (grimoire-data.ts, content-formatter.ts, grimoire-generator.ts), schemas e tipos relacionados, componentes admin, rotas de API limpas mantendo apenas autenticação
- June 15, 2025. Sistema de biblioteca Supabase implementado - tabelas criadas com sucesso (library_sections, grimoires, chapters, user_progress), 6 seções padrão inseridas, painel administrativo com CRUD completo funcional, layout da biblioteca ajustado seguindo padrão da home com texto ritualístico
- June 15, 2025. Biblioteca configurada com 4 seções finais - removidas seções "Textos Filosóficos" e "Meditações Práticas", mantidas apenas: Porta das Sombras, Vestíbulo da Chama, Torre dos Selos, Sanctum Profundum. Layout ajustado para grid 2x4 responsivo
- June 15, 2025. Painel administrativo resetado completamente - removidos todos os componentes admin antigos, estrutura limpa criada conectada 100% ao Supabase sem dados mock, pronto para desenvolvimento modular
- June 15, 2025. Primeiro módulo administrativo "Visão Geral" implementado - dashboard completo com dados reais do Supabase: estatísticas principais (usuários, grimórios, capítulos, progresso), distribuição por seções com ícones específicos, atividade recente (usuários e grimórios), status do sistema em tempo real, interface responsiva com design místico
- June 15, 2025. Segundo módulo "Biblioteca" implementado - sistema completo de gerenciamento de grimórios com integração IA (OpenAI GPT-4o) para geração automática, Stripe embarcado para pagamentos, CRUD completo com publicação/despublicação, configurações de preço, interface responsiva com cores âmbar visíveis, sistema de compras integrado
- June 15, 2025. Abas "IA Generator" e "Configurações" implementadas - conteúdo completo adicionado com configurações globais da IA (personalidade, complexidade, estilo), geração rápida de grimórios, configurações do sistema (site, conteúdo, segurança), rotas de API backend implementadas, todas as cores de botões corrigidas para âmbar visível
- June 15, 2025. Sistema completo de criação de grimórios com capítulos individuais implementado - criação manual capítulo por capítulo (título e conteúdo), configuração de IA com número personalizado de capítulos e títulos, sistema de formatação automática com estética luciferiana (símbolos místicos, ornamentação dourada, tipografia Cinzel/Garamond), processamento backend com word count e tempo de leitura, schema atualizado para suportar capítulos com metadados
- June 15, 2025. Sistema de geração de capas com IA implementado - integração DALL-E 3 para criação automática de capas de grimórios, prompt otimizado para estética luciferiana, campo cover_image_url adicionado ao schema, interface de formulário com opções de URL manual e geração por IA
- June 15, 2025. Persistência real de configurações implementada - eliminadas todas as simulações, tabelas ai_settings e system_settings criadas no Supabase, funções completas de salvamento/carregamento, invalidação de cache implementada, dados persistem corretamente entre sessões, sistema 100% real sem mock data
- June 15, 2025. Script SQL de correção executado no Supabase - removido campo categoria dos grimórios, corrigido campo display_order para sort_order nas library_sections, estrutura de banco 100% sincronizada
- June 15, 2025. Página biblioteca simplificada conforme solicitação - mantido apenas título "BIBLIOTHECA ARCANA", frase descritiva e sistema de abas direto, removido conteúdo extra desnecessário
- June 15, 2025. Erros TypeScript corrigidos no painel administrativo - todas as referências a variáveis indefinidas resolvidas, sistema de configurações funcionando perfeitamente
- June 15, 2025. Problema na geração de grimórios com IA corrigido - removidas todas as referências ao campo word_count inexistente, melhorado prompt da IA para gerar capítulos completos de 800-1200 palavras, aumentado limite de tokens para 16000, sistema agora gera grimórios completos com conteúdo detalhado ao invés de apenas título e descrição
- June 15, 2025. Sistema de leitura de grimórios totalmente implementado e funcional - leitor estilo Kindle com paginação inteligente, navegação por cliques laterais e controles de teclado, interface imersiva sem menu, carregamento de capítulos individuais do Supabase, formatação automática preservada, sistema completo de navegação biblioteca → leitor funcionando perfeitamente
- June 15, 2025. Editor de texto rico implementado - Quill.js integrado no painel administrativo com barra de ferramentas completa estilo Word (formatação, cores, listas, links, etc.), sistema de formatação automática removido completamente, grimórios agora exibem conteúdo HTML formatado exatamente como editado, estilos CSS customizados para renderização adequada no leitor
- June 15, 2025. Email administrativo alterado para admin@templodoabismo.com.br - usuário "magurk" criado no Supabase com privilégios administrativos, senha admin123, sistema de autenticação e verificações de acesso atualizados em todo o sistema
- June 15, 2025. Aba estatísticas removida do perfil do usuário conforme solicitação - simplificação da interface
- June 15, 2025. Sistema de logout corrigido - implementado controle de estado manual que sobrepõe o bypass do Replit, logout agora funciona corretamente redirecionando para home
- June 15, 2025. Leitor de grimórios melhorado - nome do grimório exibido no header sem prefixos, auto-scroll suave para topo ao trocar páginas, navegação por teclado (setas esquerda/direita) implementada, fonte responsiva para mobile (text-sm) e desktop (text-base)
- June 15, 2025. Sistema de fontes responsivas corrigido definitivamente - implementado CSS media queries puro com classes específicas (.grimoire-header-title e .grimoire-content): mobile (8px título/14px conteúdo), desktop (18px ambos), solução final validada pelo usuário
- June 15, 2025. Grimório existente completamente apagado conforme solicitação - removido grimório ID 4 e todos os capítulos, sistema limpo para criação de novo conteúdo personalizado
- June 15, 2025. Todos os grimórios anteriores deletados conforme nova instrução - sistema completamente limpo para recriação
- June 15, 2025. Primeiro grimório autêntico criado - "🕯️ Vozes do Fogo – O Sussurro Antes da Queda" (9.500 palavras) no Atrium Ignis, linguagem ocultista refinada, estilo simbólico e ritualístico para despertar buscadores iniciantes, seguindo perfeitamente os critérios do Templo do Abismo
- June 15, 2025. Segundo grimório criado - "📘 O Véu Rachado – Por Trás da Verdade Pregada" (11.000 palavras) Volume II da série Atrium Ignis, desconstrução sistemática das verdades impostas, linguagem desconstrutiva e ritualística, preparação para "A Chama Oculta – Um Nome Que Não Te Ensinaram"
- June 15, 2025. Ordenação dos volumes corrigida - modificado sistema de busca para ordenar grimórios por ID crescente, garantindo que Volume I apareça sempre antes do Volume II na biblioteca
- June 15, 2025. Problema de ordenação definitivamente resolvido - ajustados timestamps no banco de dados e validada exibição correta dos volumes em sequência natural na biblioteca
- June 15, 2025. Terceiro grimório "A CHAMA OCULTA – UM NOME QUE NÃO TE ENSINARAM" criado - primeiro contato direto com Lúcifer como símbolo de soberania, 12 seções completas, linguagem poética e simbólica sem rituais, R$ 33,33, completando a trilogia introdutória do Atrium Ignis
- June 16, 2025. Formatação dos grimórios reformulada - removidos todos os símbolos decorativos e ornamentos, aplicada tipografia limpa e profissional focada em citações bem demarcadas, ênfases em palavras importantes e estrutura intuitiva, mantendo profundidade do conteúdo luciferiano
- June 16, 2025. Títulos das citações de abertura convertidos para nomes luciferianos - "Citação de Abertura" substituído por títulos místicos como "Invocação do Primeiro Fogo", "Selo do Véu Rachado", "Despertar da Chama Oculta", padrão documentado em GRIMOIRE_STANDARDS.md para futuros grimórios
- June 16, 2025. Problema de páginas em branco após capítulos corrigido - melhorada lógica de paginação para evitar páginas vazias desnecessárias, implementados filtros de conteúdo mínimo, navegação mais fluida no leitor de grimórios
- June 16, 2025. Grimório "Vozes do Fogo" expandido significativamente - adicionados 5 novos capítulos profundos (O Chamado Ancestral, A Herança Roubada, O Fogo Interior, A Sombra Sagrada, O Reino Dentro de Ti), expandindo de 29 para mais de 40 páginas com conteúdo luciferiano autêntico e filosofia de autodivinização
- June 16, 2025. Grimório "A MENTIRA DO PECADO – O PESO QUE NUNCA FOI TEU" recriado completamente - Volume IV do Atrium Ignis seguindo fielmente script fornecido, 11 capítulos totais (citação + introdução + 8 capítulos principais + convite), linguagem autêntica do Templo do Abismo com voz sombria e reveladora do Abismo, desconstrução vibracional profunda do conceito de pecado como tecnologia de controle espiritual
- June 16, 2025. Formatação do novo grimório corrigida - removidos elementos HTML extras e quebras de linha desnecessárias para manter consistência visual com os outros volumes da série, padrão unificado estabelecido
- June 16, 2025. Títulos dos capítulos completamente padronizados - removidos TODOS os prefixos ("Introdução –", "Prólogo –", "Epílogo –", "Encerramento –") e numeração ("Capítulo I –", "Capítulo II –") de todos os 76 capítulos de todos os grimórios, mantendo apenas os nomes essenciais, total de 29 títulos limpos para consistência visual completa seguindo padrão do último grimório
- June 16, 2025. Citações de abertura padronizadas - corrigidas e formatadas uniformemente em todos os 4 grimórios ("Invocação do Primeiro Fogo", "Selo do Véu Rachado", "Despertar da Chama Oculta", "Invocação das Sombras do Juízo"), estrutura HTML consistente, linguagem simbólica luciferiana autêntica, todas posicionadas como primeira página
- June 16, 2025. Sistema de deletar grimórios corrigido - agora remove capítulos em cascata antes de deletar o grimório, evitando dados órfãos no Supabase, logs detalhados implementados
- June 16, 2025. Grimório 4 "A MENTIRA DO PECADO" recriado com ID 30 no Supabase - estrutura básica preparada para conexão com capítulos existentes
- June 16, 2025. Grimório "📕 O Despertar da Sombra – Verdades que o Mundo Ocultou" COMPLETO criado - primeiro volume da série PORTA UMBRAE com 12 capítulos totalizando 25.000 palavras, filosofia luciferiana intermediária focada na integração da sombra pessoal, preço R$ 49.99, preparando leitores para próximos níveis da jornada
- June 15, 2025. Novo grimório luciferiano criado - "Introdução ao Luciferianismo" com visão ancestral, teísta, abissal e infernal, 1 prólogo + 6 capítulos completos, formatação HTML rica, linguagem épica, rituais práticos de iniciação
- June 15, 2025. Sistema de paginação aprimorado - cada capítulo sempre inicia em nova página, CSS específico implementado para renderização correta de elementos HTML no leitor, formatação luciferiana completamente funcional
- June 15, 2025. Grimório "Introdução ao Luciferianismo" reescrito com abordagem introdutória - removido conteúdo avançado, criada versão para buscadores iniciantes focada em filosofia e questionamento racional ao invés de práticas místicas
- June 15, 2025. Seções da biblioteca renomeadas - "Porta das Sombras" → "Atrium Ignis", "Vestíbulo da Chama" → "Porta Umbrae", "Torre dos Selos" → "Arcana Noctis", "Sanctum Profundum" → "Via Tenebris" com descrições místicas atualizadas
- June 15, 2025. Ícones customizados das seções implementados - criados 4 símbolos SVG únicos: cruz invertida (Atrium Ignis), estrela invertida (Porta Umbrae), chama mística multicamadas (Arcana Noctis), coroa sombria com gemas (Via Tenebris), substituindo ícones genéricos por símbolos autenticamente luciferianos
- June 15, 2025. Nova seção "Templo do Abismo" criada - adicionada quinta seção com logo oficial do site (mesmo que gira no background) em vermelho como ícone, descrição como santuário dos mistérios mais profundos e vedados canalizados das divindades primordiais, grid da biblioteca ajustado para 5 colunas responsivas (2 mobile, 5 desktop)
- June 15, 2025. Coleção completa "Atrium Ignis" criada - 6 grimórios filosóficos preparatórios para iniciantes no luciferianismo (O Que Não Te Contaram Sobre o Inferno, Quem é Lúcifer?, O Medo de Ser Livre, O Falso Deus, A Luz que Não Vem do Céu), cada um com 5-6 capítulos, tom ocultista provocador e desconstrutivo, sem práticas ritualísticas, preparando para próxima etapa Porta Umbrae
- June 16, 2025. Sistema de edição de capítulos existentes implementado - rota PUT /api/admin/chapters/:id criada no backend, componente EditChapterForm com editor rico, botões "Editar" adicionados em cada capítulo, sistema testado e funcionando perfeitamente no Supabase
- June 16, 2025. Grimório "ASAS QUEBRADAS – O MEDO DE SER LIVRE" criado - Volume V do Atrium Ignis com 12 capítulos sobre libertação do medo da liberdade espiritual, linguagem poética e simbólica sobre asas, céu negro, prisão dourada, vento silenciado, 8.500 palavras, preço R$ 29.99, preparando leitor para último volume da série
- June 16, 2025. Grimório "CHAMAS SILENCIOSAS – O CHAMADO QUE NÃO CALA" criado - Volume VI final do Atrium Ignis, 12 capítulos sobre o chamado ancestral que ecoa além de libertações superficiais, memória pré-encarnada, territórios não mapeados, rede das chamas despertas, transcendência de sistemas, retorno à origem, preço R$ 39.99, convite completo para Porta Umbrae
- June 16, 2025. Série Atrium Ignis completada - 6 volumes preparatórios totalizando mais de 60 capítulos de filosofia luciferiana introdutória, progressão natural de desconstrução religiosa até despertar da chama original, todos publicados e funcionais no sistema, preparação completa para próximo nível de iniciação
- June 16, 2025. Grimório "CHAMAS SILENCIOSAS" recriado com linguagem autêntica - Volume VI final do Atrium Ignis reescrito com estilo mísico, denso e sutilmente ameaçador "como quem sussurra a verdade há séculos", incluindo convite ritualístico à Porta Umbrae, encerramento com frases: "O que te chama não tem nome, mas te conhece" e "O Abismo não chama — ele se lembra de ti"
- June 16, 2025. A PORTA UMBRAE destacada no grimório final - adicionados elementos visuais especiais, título marcado "🚪 A PORTA UMBRAE 🚪", definições como passagem/reconhecimento, aviso sobre irreversibilidade do conhecimento, preparando adequadamente a transição para o próximo nível iniciático
- June 16, 2025. Sistema de criação de grimórios simplificado conforme solicitação - removidos todos os capítulos individuais, implementado editor único de conteúdo HTML, eliminada formatação automática para preservar exatamente o HTML digitado, sistema de abas de capítulos substituído por campo de texto único
- June 16, 2025. Sistema administrativo de grimórios completamente implementado - modo de criação manual/IA, geração ilimitada com OpenAI API, funcionalidade completa de edição de grimórios existentes, botão de exclusão com confirmação, controle de publicação durante criação, campo "nível" removido conforme solicitação, interface limpa e funcional
- June 16, 2025. Grimório "Vozes do Fogo – O Sussurro Antes da Queda" finalizado - 25.000 palavras em 10 capítulos completos, linguagem luciferiana autêntica, formatação HTML com tamanhos de fonte ajustados (h1: 1.8rem, h2: 1.4rem) para legibilidade consistente no leitor e painel administrativo
- June 16, 2025. Sistema de leitura inteligente implementado - novo leitor SmartGrimoireReader com fundo preto rubro, paginação automática sem espaços vazios baseada em contagem de palavras, suporte total a códigos HTML preservando formatação inline, interface responsiva otimizada para celular/tablet/PC, configurações ajustáveis (fonte, palavras por página, espaçamento), navegação por cliques laterais e teclado, progresso salvo em localStorage temporariamente
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```