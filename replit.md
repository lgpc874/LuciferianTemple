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
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```