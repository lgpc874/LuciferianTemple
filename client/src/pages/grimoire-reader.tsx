import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { apiRequest } from "@/lib/queryClient";
import { useIsMobile } from "@/hooks/use-mobile";

export default function GrimoireReader() {
  const [, params] = useRoute("/grimoire/:id");
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedContent, setPaginatedContent] = useState<string[]>([]);

  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error' | null>(null);
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState<string | null>(null);

  const grimoireId = params?.id ? parseInt(params.id) : null;

  // Buscar grimório
  const { data: grimoire, isLoading: grimoireLoading } = useQuery<Grimoire>({
    queryKey: [`/api/grimoires/${grimoireId}`],
    enabled: !!grimoireId,
  });

  // Buscar progresso do usuário
  const { data: userProgress } = useQuery({
    queryKey: [`/api/progress/user`],
    enabled: !!grimoireId,
  });

  // Mutação para salvar progresso
  const saveProgressMutation = useMutation({
    mutationFn: async (data: { grimoireId: number; currentPage: number; totalPages: number; readingTimeMinutes: number }) => {
      return apiRequest("/api/progress", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onMutate: () => {
      setSaveStatus('saving');
    },
    onSuccess: () => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    },
    onError: () => {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    },
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
      const bgType = bgMarkerMatch[1].toLowerCase();
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
      return bgColors[bgType] || null;
    }
    
    return null;
  };

  // Função para paginar o conteúdo do grimório
  const paginateContent = (content: string) => {
    if (!content || !content.trim()) return [];
    
    const charsPerPage = isMobile ? 1100 : 1100;
    const minPageSize = isMobile ? 800 : 900;
    
    // Primeiro, dividir o conteúdo em parágrafos menores para melhor controle
    const paragraphs = content.split(/(<\/p>|<\/h[1-6]>|<\/blockquote>|<\/div>|<\/li>)/)
      .filter(part => part.trim().length > 0)
      .reduce((acc, part, index, array) => {
        if (index % 2 === 0 && array[index + 1]) {
          acc.push(part + array[index + 1]);
        } else if (index % 2 === 0) {
          acc.push(part);
        }
        return acc;
      }, [] as string[]);
    
    const pages = [];
    let currentPage = '';
    
    for (const paragraph of paragraphs) {
      const proposedPage = currentPage + paragraph;
      
      // Se a página proposta excede o limite e já temos conteúdo mínimo
      if (proposedPage.length > charsPerPage && currentPage.length >= minPageSize) {
        pages.push(currentPage.trim());
        currentPage = paragraph;
      } else {
        currentPage = proposedPage;
      }
    }
    
    // Adicionar a última página se houver conteúdo
    if (currentPage.trim()) {
      pages.push(currentPage.trim());
    }
    
    // Se não conseguiu paginar, retornar conteúdo original
    return pages.length > 0 ? pages : [content];
  };

  // Paginar conteúdo quando grimório carrega
  useEffect(() => {
    if (grimoire?.content) {
      const pages = paginateContent(grimoire.content);
      setPaginatedContent(pages);
      setTotalPages(pages.length);
      
      // Restaurar progresso do usuário se existir
      if (Array.isArray(userProgress) && userProgress.length > 0) {
        const progress = userProgress.find((p: any) => p.grimoire_id === grimoireId);
        if (progress?.current_page) {
          setCurrentPage(Math.min(progress.current_page, pages.length));
        }
      }
    }
  }, [grimoire?.content, userProgress, grimoireId]);



  // Auto-save do progresso
  useEffect(() => {
    if (grimoireId && totalPages > 0) {
      const timer = setTimeout(() => {
        saveProgressMutation.mutate({
          grimoireId,
          currentPage,
          totalPages,

        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentPage, readingTime, grimoireId, totalPages]);

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
            <h1 className="text-2xl text-golden-amber mb-4">Grimório não encontrado</h1>
            <Button onClick={() => setLocation("/biblioteca")} variant="outline">
              Voltar à Biblioteca
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const currentContent = paginatedContent[currentPage - 1] || '';

  // Determinar o fundo dinâmico
  const dynamicBackground = currentBackgroundColor 
    ? { background: currentBackgroundColor }
    : {};

  return (
    <PageTransition>
      <ContentProtection>
        <div 
          className="min-h-screen transition-all duration-1000 ease-in-out relative overflow-hidden"
          style={{
            background: currentBackgroundColor || 'linear-gradient(135deg, #8B0000 0%, #000000 50%, #8B0000 100%)',
            ...dynamicBackground
          }}
        >
          {/* Header discreto */}
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/biblioteca")}
              className="text-golden-amber/70 hover:text-golden-amber hover:bg-red-900/30"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Biblioteca
            </Button>
          </div>

          {/* Status de salvamento */}
          {saveStatus && (
            <div className="absolute top-4 right-4 z-10">
              <div className={`px-3 py-1 rounded-full text-xs ${
                saveStatus === 'saving' ? 'bg-amber-900/50 text-amber-200' :
                saveStatus === 'saved' ? 'bg-green-900/50 text-green-200' :
                'bg-red-900/50 text-red-200'
              }`}>
                {saveStatus === 'saving' ? 'Salvando...' :
                 saveStatus === 'saved' ? '✓ Salvo' : '⚠ Erro'}
              </div>
            </div>
          )}

          {/* Título do grimório */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <h1 className="grimoire-header-title text-golden-amber text-center font-cinzel">
              {grimoire.title}
            </h1>
          </div>

          {/* Container principal */}
          <div className="flex items-center justify-center min-h-screen px-4 py-20">
            <div className="relative max-w-4xl w-full">
              {/* Áreas de clique invisíveis */}
              <div 
                className="absolute left-0 top-0 w-1/3 h-full z-20 cursor-pointer group"
                onClick={prevPage}
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center h-full">
                  <ChevronLeft className="h-8 w-8 text-golden-amber/50" />
                </div>
              </div>
              
              <div 
                className="absolute right-0 top-0 w-1/3 h-full z-20 cursor-pointer group"
                onClick={nextPage}
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center h-full">
                  <ChevronRight className="h-8 w-8 text-golden-amber/50" />
                </div>
              </div>

              {/* Conteúdo do grimório */}
              <div className="bg-black/30 backdrop-blur-sm border border-golden-amber/30 rounded-lg shadow-2xl">
                <div className="p-6 md:p-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grimoire-content text-amber-100 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: currentContent }}
                    />
                  </AnimatePresence>
                </div>

                {/* Navegação inferior */}
                <div className="border-t border-golden-amber/20 p-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className="text-golden-amber/70 hover:text-golden-amber disabled:opacity-30"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Anterior
                    </Button>

                    <div className="flex items-center gap-4 text-golden-amber/70 text-sm">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {currentPage} de {totalPages}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className="text-golden-amber/70 hover:text-golden-amber disabled:opacity-30"
                    >
                      Próxima
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentProtection>
    </PageTransition>
  );
}