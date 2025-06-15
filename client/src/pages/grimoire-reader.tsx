import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { PageTransition } from "@/components/page-transition";
import ContentProtection from "@/components/content-protection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Eye,
  Clock,
  User
} from "lucide-react";
import type { Grimoire, Chapter } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useIsMobile } from "@/hooks/use-mobile";

export default function GrimoireReader() {
  const [, params] = useRoute("/grimoire/:id");
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedContent, setPaginatedContent] = useState<string[]>([]);
  const [readingTime, setReadingTime] = useState(0);
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error' | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const grimoireId = params?.id ? parseInt(params.id) : null;

  // Buscar dados do grimório
  const { data: grimoire, isLoading: grimoireLoading } = useQuery({
    queryKey: [`/api/grimoires/${grimoireId}`],
    enabled: !!grimoireId,
  });

  // Buscar capítulos do grimório
  const { data: chapters = [], isLoading: chaptersLoading } = useQuery({
    queryKey: [`/api/chapters/${grimoireId}`],
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
      return apiRequest("POST", "/api/progress", data);
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

  // Função para paginar o conteúdo preservando HTML
  const paginateContent = (content: string, charsPerPage: number = 1200) => {
    if (!content) return [];
    
    // Dividir conteúdo em blocos lógicos preservando a estrutura HTML
    const blocks = [];
    let currentBlock = '';
    let tagStack = [];
    let i = 0;
    
    while (i < content.length) {
      const char = content[i];
      
      if (char === '<') {
        // Encontrou uma tag
        let tag = '<';
        i++;
        
        while (i < content.length && content[i] !== '>') {
          tag += content[i];
          i++;
        }
        
        if (i < content.length) {
          tag += '>';
          i++;
        }
        
        currentBlock += tag;
        
        // Verificar se é uma tag de fechamento de bloco
        if (tag.includes('</div>') || tag.includes('</section>') || 
            tag.includes('</h') || tag.includes('</blockquote>') ||
            tag.includes('</p>')) {
          
          // Se o bloco atual está muito grande, finalize-o
          if (currentBlock.length > charsPerPage / 2) {
            blocks.push(currentBlock);
            currentBlock = '';
          }
        }
      } else {
        currentBlock += char;
        i++;
      }
    }
    
    if (currentBlock.trim()) {
      blocks.push(currentBlock);
    }
    
    // Agrupar blocos em páginas
    const pages = [];
    let currentPage = '';
    
    for (const block of blocks) {
      const testPage = currentPage + block;
      
      if (testPage.length > charsPerPage && currentPage) {
        pages.push(currentPage);
        currentPage = block;
      } else {
        currentPage = testPage;
      }
    }
    
    if (currentPage) {
      pages.push(currentPage);
    }
    
    return pages.length > 0 ? pages : [content];
  };

  // Preparar conteúdo paginado quando capítulos carregarem
  useEffect(() => {
    if (Array.isArray(chapters) && chapters.length > 0) {
      const sortedChapters = chapters.sort((a: any, b: any) => a.chapter_number - b.chapter_number);
      const allPages: string[] = [];
      
      // Cada capítulo começa em uma nova página
      for (const chapter of sortedChapters) {
        const chapterContent = `<div class="chapter-start">
          <h2 class="chapter-title">${chapter.title}</h2>
          ${chapter.content}
        </div>`;
        
        // Paginar o conteúdo do capítulo individualmente com mais conteúdo por página
        const chapterPages = paginateContent(chapterContent, isMobile ? 1400 : 2000);
        allPages.push(...chapterPages);
      }
      
      setPaginatedContent(allPages);
      setTotalPages(allPages.length);
      
      // Restaurar progresso salvo
      if (userProgress && grimoireId) {
        const progress = userProgress.find((p: any) => p.grimoire_id === grimoireId);
        if (progress) {
          setCurrentPage(progress.current_page || 1);
          setReadingTime(progress.reading_time_minutes || 0);
        }
      }
    }
  }, [chapters, userProgress, grimoireId, isMobile]);

  // Timer para contar tempo de leitura
  useEffect(() => {
    const timer = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 60000); // Incrementa a cada minuto

    return () => clearInterval(timer);
  }, []);

  // Função para salvar progresso com debounce
  const saveProgress = () => {
    if (!grimoireId) return;
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveProgressMutation.mutate({
        grimoireId,
        currentPage,
        totalPages,
        readingTimeMinutes: readingTime
      });
    }, 2000); // Salva após 2 segundos de inatividade
  };

  // Salvar progresso quando mudar de página
  useEffect(() => {
    if (currentPage > 1) { // Só salva se não for a primeira página
      saveProgress();
    }
  }, [currentPage]);

  // Salvar progresso a cada 5 minutos de leitura
  useEffect(() => {
    if (readingTime > 0 && readingTime % 5 === 0) {
      saveProgress();
    }
  }, [readingTime]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevPage();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNextPage();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentPage, totalPages]);

  // Limpar timeout ao desmontar
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Navegação entre páginas
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Auto-scroll para o topo ao trocar de página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Voltar para biblioteca
  const handleBack = () => {
    setLocation('/biblioteca');
  };

  if (grimoireLoading || chaptersLoading) {
    return (
      <PageTransition className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden-amber mx-auto mb-4"></div>
          <p className="text-ritualistic-beige/70">Preparando o grimório...</p>
        </div>
      </PageTransition>
    );
  }

  if (!grimoire) {
    return (
      <PageTransition className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-golden-amber/50 mx-auto mb-4" />
          <h2 className="text-2xl font-cinzel text-golden-amber mb-2">Grimório Não Encontrado</h2>
          <p className="text-ritualistic-beige/70 mb-6">O grimório solicitado não existe ou foi removido.</p>
          <Button onClick={handleBack} className="bg-red-900/50 hover:bg-red-900/70 text-golden-amber">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar à Biblioteca
          </Button>
        </div>
      </PageTransition>
    );
  }

  return (
    <ContentProtection enableScreenshotProtection={true}>
      <PageTransition className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black">
        
        {/* Header */}
        <div className="bg-black/40 backdrop-blur-sm border-b border-golden-amber/20 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="text-golden-amber hover:bg-red-900/30 hover:text-golden-amber"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Biblioteca
            </Button>
            
            <div className="text-center flex-1 mx-4">
              <h1 className="font-cinzel text-golden-amber truncate grimoire-header-title">
                {grimoireLoading ? 'Carregando...' : grimoire?.title || 'Grimório'}
              </h1>
              <div className="flex items-center justify-center space-x-4 text-xs text-ritualistic-beige/60 mt-1">
                <span className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  Página {currentPage} de {totalPages}
                </span>
                {(grimoire as any)?.estimated_reading_time && (
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {(grimoire as any).estimated_reading_time} min
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="text-golden-amber hover:bg-red-900/30 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="text-golden-amber hover:bg-red-900/30 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              {/* Indicador de status de salvamento */}
              {saveStatus && (
                <div className="flex items-center gap-2 text-xs ml-4">
                  {saveStatus === 'saving' && (
                    <>
                      <div className="w-3 h-3 border border-golden-amber/60 border-t-transparent rounded-full animate-spin" />
                      <span className="text-golden-amber/80">Salvando...</span>
                    </>
                  )}
                  {saveStatus === 'saved' && (
                    <>
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-green-400">✓ Salvo</span>
                    </>
                  )}
                  {saveStatus === 'error' && (
                    <>
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-red-400">⚠ Erro</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leitor principal */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-black/40 backdrop-blur-sm border border-golden-amber/20 rounded-lg p-8 min-h-[600px] relative">
            
            {/* Área de clique invisível para navegação */}
            <div className="absolute inset-0 flex">
              <div 
                className="w-1/3 h-full cursor-pointer z-10" 
                onClick={goToPrevPage}
                title="Página anterior"
              />
              <div className="w-1/3 h-full" />
              <div 
                className="w-1/3 h-full cursor-pointer z-10" 
                onClick={goToNextPage}
                title="Próxima página"
              />
            </div>

            {/* Conteúdo da página */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-5 h-full"
              >
                {paginatedContent[currentPage - 1] ? (
                  <div 
                    className="grimoire-content prose-grimoire max-w-none text-ritualistic-beige leading-relaxed font-garamond"
                    style={{
                      fontFamily: 'Garamond, Georgia, serif',
                      lineHeight: '1.8',
                      textAlign: 'justify'
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: paginatedContent[currentPage - 1]
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-ritualistic-beige/50">Conteúdo não encontrado</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Indicador de página no canto */}
            <div className="absolute bottom-4 right-4 text-xs text-ritualistic-beige/40">
              {currentPage} / {totalPages}
            </div>
          </div>

          {/* Controles inferiores */}
          <div className="mt-6 flex items-center justify-between">
            <Button 
              variant="outline"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="bg-black/40 border-golden-amber/20 text-golden-amber hover:bg-red-900/30 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>

            <div className="flex items-center space-x-2">
              <Badge className="bg-golden-amber/90 text-black">
                {Math.round((currentPage / totalPages) * 100)}% lido
              </Badge>
            </div>

            <Button 
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="bg-black/40 border-golden-amber/20 text-golden-amber hover:bg-red-900/30 disabled:opacity-30"
            >
              Próxima
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </PageTransition>
    </ContentProtection>
  );
}