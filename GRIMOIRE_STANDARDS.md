# Padrões de Grimórios - Templo do Abismo

Este documento define os padrões obrigatórios para todos os grimórios implementados no site.

## Interface de Leitura Kindle

### Características Obrigatórias

1. **Formato A5 Responsivo**
   - Desktop: 380x540px máximo
   - Mobile: 85vw x 80vh
   - Container centralizado na tela

2. **Paginação Inteligente**
   - Baseada em parágrafos HTML completos
   - Limites: 800 chars (mobile) / 1200 chars (desktop)
   - Quebras apenas em finais de elementos HTML
   - Preservação total da formatação

3. **Navegação**
   - Botão voltar (canto superior esquerdo)
   - Áreas invisíveis de clique nas laterais
   - Botões discretos que aparecem no hover
   - Navegação contínua entre capítulos

4. **Visual**
   - Fundo com textura do site
   - Container semi-transparente com backdrop-blur
   - Bordas douradas (border-burned-amber)
   - Fontes: Cinzel (títulos) / Garamond (texto)
   - Paleta de cores completa do site

5. **Elementos da Interface**
   - Apenas botão de voltar visível
   - Barra de progresso inferior
   - Sem header, menu ou sidebar
   - Transições suaves entre páginas

### Implementação Técnica

```typescript
// Estados obrigatórios
const [selectedChapter, setSelectedChapter] = useState<number>(1);
const [currentPage, setCurrentPage] = useState<number>(1);
const [totalPages, setTotalPages] = useState<number>(1);
const [currentPageContent, setCurrentPageContent] = useState<string>('');

// Hook obrigatório
const isMobile = useIsMobile();

// Paginação baseada em parágrafos
const tempContent = content.replace(/\n/g, ' ');
const paragraphs = tempContent.match(/<p[^>]*>.*?<\/p>|<h[3-4][^>]*>.*?<\/h[3-4]>|<blockquote[^>]*>.*?<\/blockquote>|<ul[^>]*>.*?<\/ul>/g) || [];
```

### Classes CSS Obrigatórias

```css
.grimoire-content {
  font-family: 'EB Garamond', serif;
  color: hsl(40, 25%, 85%); /* ritualistic-beige */
  line-height: 1.6;
}

.grimoire-content h3 {
  color: hsl(43, 74%, 49%); /* golden-amber */
  font-family: 'Cinzel', serif;
}

.grimoire-content strong {
  color: hsl(43, 74%, 49%); /* golden-amber */
}
```

### Estrutura de Arquivo

Todos os grimórios devem usar esta estrutura base:

```typescript
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function GrimoireReader() {
  // Implementação padrão conforme grimoire-kindle.tsx
}
```

### Rotas

- Todas as rotas `/grimoire/*` automaticamente removem header/menu
- Configuração no App.tsx: `isGrimoireReader = location.startsWith('/grimoire/')`

## Checklist de Implementação

- [ ] Container A5 responsivo
- [ ] Paginação preservando parágrafos
- [ ] Navegação contínua entre capítulos
- [ ] Visual idêntico ao site (cores, fontes, texturas)
- [ ] Sem elementos de interface exceto botão voltar
- [ ] Barra de progresso funcional
- [ ] Transições suaves
- [ ] Compatibilidade mobile/desktop

## Arquivos de Referência

- `client/src/pages/grimoire-kindle.tsx` - Implementação padrão
- `client/src/App.tsx` - Configuração de rotas
- `client/src/index.css` - Classes CSS grimoire-content

**Importante:** Qualquer novo grimório deve seguir exatamente este padrão para manter a consistência da experiência de leitura no site.