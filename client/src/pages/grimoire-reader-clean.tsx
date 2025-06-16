import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { PageTransition } from "@/components/page-transition";
import ContentProtection from "@/components/content-protection";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen
} from "lucide-react";
import type { Grimoire } from "@shared/schema";
import { useIsMobile } from "@/hooks/use-mobile";

export default function GrimoireReader() {
  const [, params] = useRoute("/grimoire/:id");
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedContent, setPaginatedContent] = useState<string[]>([]);
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState<string | null>(null);

  const grimoireId = params?.id ? parseInt(params.id) : null;

  // Buscar grimório
  const { data: grimoire, isLoading: grimoireLoading } = useQuery<Grimoire>({
    queryKey: [`/api/grimoires/${grimoireId}`],
    enabled: !!grimoireId,
  });

  // Função para extrair cor de fundo de uma seção HTML
  const extractBackgroundColor = (content: string): string | null => {
    // Procurar por elementos com background-color definido
    const bgColorMatch = content.match(/background-color:\s*([^;"\)]+)/i);
    if (bgColorMatch) {
      return bgColorMatch[1].trim();
    }
    
    // Procurar por data attributes para cor de fundo
    const dataColorMatch = content.match(/data-bg-color="([^"]+)"/i);
    if (dataColorMatch) {
      return dataColorMatch[1];
    }
    
    // Procurar por classes especiais de fundo
    const sectionClassMatch = content.match(/class="[^"]*section-([^"\s]+)/i);
    if (sectionClassMatch) {
      const sectionType = sectionClassMatch[1];
      const bgColors: Record<string, string> = {
        'fire': 'linear-gradient(135deg, #8B0000 0%, #2D0B00 100%)',
        'shadow': 'linear-gradient(135deg, #2D0B2D 0%, #0B0B0B 100%)',
        'abyss': 'linear-gradient(135deg, #000000 0%, #1A0000 100%)',
        'crimson': 'linear-gradient(135deg, #8B0000 0%, #000000 100%)',
        'purple': 'linear-gradient(135deg, #4A0E4E 0%, #2D0B2D 100%)',
        'dark': 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
        'emerald': 'linear-gradient(135deg, #0D4F3C 0%, #001F1A 100%)',
        'amber': 'linear-gradient(135deg, #B45309 0%, #451A03 100%)',
        'blue': 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)'
      };
      return bgColors[sectionType] || null;
    }
    
    // Procurar por marcadores de background no texto
    const bgMarkerMatch = content.match(/\[bg:(fire|shadow|abyss|crimson|purple|dark|emerald|amber|blue)\]/i);
    if (bgMarkerMatch) {
      const sectionType = bgMarkerMatch[1];
      const bgColors: Record<string, string> = {
        'fire': 'linear-gradient(135deg, #8B0000 0%, #2D0B00 100%)',
        'shadow': 'linear-gradient(135deg, #2D0B2D 0%, #0B0B0B 100%)',
        'abyss': 'linear-gradient(135deg, #000000 0%, #1A0000 100%)',
        'crimson': 'linear-gradient(135deg, #8B0000 0%, #000000 100%)',
        'purple': 'linear-gradient(135deg, #4A0E4E 0%, #2D0B2D 100%)',
        'dark': 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
        'emerald': 'linear-gradient(135deg, #0D4F3C 0%, #001F1A 100%)',
        'amber': 'linear-gradient(135deg, #B45309 0%, #451A03 100%)',
        'blue': 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)'
      };
      return bgColors[sectionType] || null;
    }
    
    return null;
  };

  // Função para paginar o conteúdo
  const paginateContent = (content: string): string[] => {
    if (!content) return [];

    // Dividir por capítulos primeiro
    const chapterRegex = /<h[1-6][^>]*>.*?<\/h[1-6]>/gi;
    const chapters = content.split(chapterRegex);
    const chapterTitles = content.match(chapterRegex) || [];

    const pages: string[] = [];
    const maxCharsPerPage = isMobile ? 900 : 1100;
    const minCharsPerPage = 800;

    for (let i = 0; i < chapters.length; i++) {
      let chapterContent = chapters[i];
      
      // Adicionar título do capítulo se existir
      if (chapterTitles[i - 1]) {
        chapterContent = chapterTitles[i - 1] + chapterContent;
      }

      if (chapterContent.trim()) {
        // Se o capítulo inteiro for menor que uma página, adicionar como página única
        if (chapterContent.length <= maxCharsPerPage) {
          pages.push(chapterContent);
        } else {
          // Dividir capítulo em páginas
          const paragraphs = chapterContent.split(/(<p[^>]*>.*?<\/p>|<h[1-6][^>]*>.*?<\/h[1-6]>|<div[^>]*>.*?<\/div>|<blockquote[^>]*>.*?<\/blockquote>|<ul[^>]*>.*?<\/ul>|<ol[^>]*>.*?<\/ol>)/gi).filter(p => p.trim());
          
          let currentPageContent = '';
          
          for (const paragraph of paragraphs) {
            const testContent = currentPageContent + paragraph;
            
            if (testContent.length <= maxCharsPerPage) {
              currentPageContent = testContent;
            } else {
              // Se a página atual tem conteúdo suficiente, finalizar
              if (currentPageContent.length >= minCharsPerPage) {
                pages.push(currentPageContent);
                currentPageContent = paragraph;
              } else {
                // Se ainda não tem conteúdo suficiente, adicionar mesmo ultrapassando o limite
                currentPageContent = testContent;
              }
            }
          }
          
          // Adicionar última página se tiver conteúdo
          if (currentPageContent.trim()) {
            pages.push(currentPageContent);
          }
        }
      }
    }

    return pages.filter(page => page.trim().length > 0);
  };

  // Paginação automática baseada no conteúdo
  useEffect(() => {
    if (grimoire?.content) {
      const pages = paginateContent(grimoire.content);
      setPaginatedContent(pages);
      setTotalPages(pages.length);
      setCurrentPage(1);
    }
  }, [grimoire?.content, isMobile]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        setCurrentPage(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, totalPages]);

  // Scroll para o topo ao trocar páginas e detectar cor de fundo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Detectar cor de fundo da página atual
    if (paginatedContent[currentPage - 1]) {
      const backgroundColor = extractBackgroundColor(paginatedContent[currentPage - 1]);
      setCurrentBackgroundColor(backgroundColor);
    }
  }, [currentPage, paginatedContent]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (grimoireLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-red-900 flex items-center justify-center">
          <div className="text-golden-amber text-xl animate-pulse">Carregando grimório...</div>
        </div>
      </PageTransition>
    );
  }

  if (!grimoire) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-red-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-golden-amber mb-4">Grimório não encontrado</h1>
            <Button 
              onClick={() => setLocation('/biblioteca')}
              className="bg-golden-amber hover:bg-golden-amber/80 text-black font-semibold"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar à Biblioteca
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const currentPageContent = paginatedContent[currentPage - 1] || '';

  return (
    <PageTransition>
      <ContentProtection>
        <div 
          className="min-h-screen relative overflow-hidden"
          style={{
            background: currentBackgroundColor || 'linear-gradient(135deg, #8B0000 0%, #2D0B00 100%)'
          }}
        >
          {/* Overlay escuro para melhor legibilidade */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Header com informações do grimório */}
          <div className="relative z-10 bg-black/40 backdrop-blur-sm border-b border-golden-amber/20">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
              <Button
                onClick={() => setLocation('/biblioteca')}
                variant="ghost"
                size="sm"
                className="text-golden-amber hover:text-golden-amber/80 hover:bg-golden-amber/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Biblioteca
              </Button>

              <div className="flex items-center space-x-4">
                <BookOpen className="h-5 w-5 text-golden-amber" />
                <h1 className="grimoire-header-title text-golden-amber font-cinzel">
                  {grimoire.title}
                </h1>
              </div>

              <div className="text-sm text-golden-amber/70">
                Página {currentPage} de {totalPages}
              </div>
            </div>
          </div>

          {/* Área de leitura principal */}
          <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
            {/* Botão anterior - lado esquerdo */}
            <div className="absolute left-0 top-0 bottom-0 w-20 flex items-center justify-start pl-4">
              {currentPage > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="group"
                >
                  <Button
                    onClick={prevPage}
                    variant="ghost"
                    size="sm"
                    className="text-golden-amber/70 hover:text-golden-amber hover:bg-golden-amber/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Container do conteúdo */}
            <div className="w-full max-w-md mx-auto">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-black/60 backdrop-blur-md rounded-lg border border-golden-amber/30 p-6 shadow-2xl"
                style={{
                  width: isMobile ? '85vw' : '380px',
                  height: isMobile ? '80vh' : '540px',
                  maxHeight: isMobile ? '80vh' : '540px'
                }}
              >
                <div 
                  className="grimoire-content overflow-y-auto h-full prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentPageContent }}
                />
              </motion.div>
            </div>

            {/* Botão próximo - lado direito */}
            <div className="absolute right-0 top-0 bottom-0 w-20 flex items-center justify-end pr-4">
              {currentPage < totalPages && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="group"
                >
                  <Button
                    onClick={nextPage}
                    variant="ghost"
                    size="sm"
                    className="text-golden-amber/70 hover:text-golden-amber hover:bg-golden-amber/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Áreas clicáveis invisíveis para navegação */}
            <div 
              className="absolute left-0 top-20 bottom-0 w-1/3 cursor-pointer"
              onClick={prevPage}
              style={{ zIndex: currentPage > 1 ? 5 : -1 }}
            />
            <div 
              className="absolute right-0 top-20 bottom-0 w-1/3 cursor-pointer"
              onClick={nextPage}
              style={{ zIndex: currentPage < totalPages ? 5 : -1 }}
            />
          </div>
        </div>
      </ContentProtection>
    </PageTransition>
  );
}