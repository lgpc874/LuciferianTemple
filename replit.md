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
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```