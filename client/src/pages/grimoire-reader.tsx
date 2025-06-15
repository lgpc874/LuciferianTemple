import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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

export default function GrimoireReader() {
  const [, params] = useRoute("/grimoire/:id");
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedContent, setPaginatedContent] = useState<string[]>([]);
  
  const grimoireId = params?.id ? parseInt(params.id) : null;

  // Buscar dados do grimório
  const { data: grimoire, isLoading: grimoireLoading } = useQuery({
    queryKey: ['/api/grimoires', grimoireId],
    enabled: !!grimoireId,
  });

  // Buscar capítulos do grimório
  const { data: chapters = [], isLoading: chaptersLoading } = useQuery({
    queryKey: [`/api/chapters/${grimoireId}`],
    enabled: !!grimoireId,
  });

  // Função para paginar o conteúdo
  const paginateContent = (content: string, charsPerPage: number = 1200) => {
    if (!content) return [];
    
    const words = content.split(' ');
    const pages = [];
    let currentPageContent = '';
    
    for (const word of words) {
      const testContent = currentPageContent + (currentPageContent ? ' ' : '') + word;
      
      if (testContent.length > charsPerPage && currentPageContent) {
        pages.push(currentPageContent);
        currentPageContent = word;
      } else {
        currentPageContent = testContent;
      }
    }
    
    if (currentPageContent) {
      pages.push(currentPageContent);
    }
    
    return pages;
  };

  // Preparar conteúdo paginado quando capítulos carregarem
  useEffect(() => {
    if (Array.isArray(chapters) && chapters.length > 0) {
      // Combinar todos os capítulos em um texto único sem formatação
      const fullContent = chapters
        .sort((a: any, b: any) => a.chapter_number - b.chapter_number)
        .map((chapter: any) => `${chapter.title}\n\n${chapter.content}`)
        .join('\n\n\n');
      
      const pages = paginateContent(fullContent);
      setPaginatedContent(pages);
      setTotalPages(pages.length);
    }
  }, [chapters]);

  // Navegação entre páginas
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
              <h1 className="text-lg font-cinzel text-golden-amber truncate">{(grimoire as any)?.title || 'Grimório'}</h1>
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
                    className="max-w-none text-ritualistic-beige leading-relaxed font-garamond text-lg whitespace-pre-wrap"
                    style={{
                      fontFamily: 'Garamond, Georgia, serif',
                      lineHeight: '1.8',
                      textAlign: 'justify'
                    }}
                  >
                    {paginatedContent[currentPage - 1]}
                  </div>
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