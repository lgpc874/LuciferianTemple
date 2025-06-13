import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PageTransition } from '../components/page-transition';
import { useIsMobile } from '../hooks/use-mobile';

interface Chapter {
  id: number;
  grimoireId: number;
  title: string;
  content: string;
  chapterOrder: number;
  estimatedReadingTime: number;
  unlockCriteria: string;
}

interface Grimoire {
  id: number;
  title: string;
  description: string;
  category: string;
  difficultyLevel: number;
}

export default function GrimoireKindle() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const isMobile = useIsMobile();
  
  // Get grimoire ID from URL
  const grimoireId = params.id ? parseInt(params.id) : 1;
  
  // Reading state
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Content pagination
  const [currentPageContent, setCurrentPageContent] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch grimoire and chapters data
  const { data: grimoire } = useQuery({
    queryKey: [`/api/grimoires/${grimoireId}`]
  });

  const { data: chapters } = useQuery({
    queryKey: [`/api/grimoires/${grimoireId}/chapters`]
  });

  // Get current chapter
  const currentChapter = (chapters as Chapter[])?.find((ch: Chapter) => ch.chapterOrder === selectedChapter);

  // Fullscreen functionality
  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  // Simple paragraph-based pagination
  useEffect(() => {
    if (!currentChapter?.content) {
      setCurrentPageContent('');
      setTotalPages(1);
      return;
    }

    const content = currentChapter.content;
    
    // Split by complete HTML blocks (paragraphs, headings, etc.)
    const blocks = content.split(/(?=<(?:p|h[3-4]|blockquote|ul)[^>]*>)/g)
                         .filter(block => block.trim().length > 0);
    
    // Conservative character limits
    const maxCharsPerPage = isMobile ? 1000 : 1400;
    
    const pages: string[] = [];
    let currentPageContent = '';
    let currentLength = 0;
    
    for (const block of blocks) {
      const blockLength = block.length;
      
      // If this block would make the page too long
      if (currentLength + blockLength > maxCharsPerPage && currentPageContent.length > 0) {
        // Save current page
        pages.push(currentPageContent);
        
        // Start new page with this block
        currentPageContent = block;
        currentLength = blockLength;
      } else {
        // Add block to current page
        currentPageContent += block;
        currentLength += blockLength;
      }
    }
    
    // Add the final page
    if (currentPageContent.length > 0) {
      pages.push(currentPageContent);
    }
    
    // Ensure we have at least one page
    if (pages.length === 0) {
      pages.push('<p>Erro ao carregar conteúdo</p>');
    }
    
    setTotalPages(pages.length);
    
    // Get current page with bounds checking
    const pageIndex = Math.max(0, Math.min(currentPage - 1, pages.length - 1));
    setCurrentPageContent(pages[pageIndex] || pages[0] || '');
  }, [currentChapter, currentPage, isMobile]);

  // Navigation handlers with continuous reading
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    } else if (selectedChapter < (chapters as Chapter[])?.length) {
      setSelectedChapter(prev => prev + 1);
      setCurrentPage(1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (selectedChapter > 1) {
      // Go to previous chapter and set to its last page
      const prevChapter = (chapters as Chapter[])?.find((ch: Chapter) => ch.chapterOrder === selectedChapter - 1);
      if (prevChapter) {
        setSelectedChapter(prev => prev - 1);
        // Calculate total pages for previous chapter to set to last page
        const prevContent = prevChapter.content;
        const blocks = prevContent.split(/(?=<(?:p|h[3-4]|blockquote|ul)[^>]*>)/g)
                                  .filter(block => block.trim().length > 0);
        const maxCharsPerPage = isMobile ? 1000 : 1400;
        
        let pages = 0;
        let currentLength = 0;
        
        for (const block of blocks) {
          if (currentLength + block.length > maxCharsPerPage && currentLength > 0) {
            pages++;
            currentLength = block.length;
          } else {
            currentLength += block.length;
          }
        }
        if (currentLength > 0) pages++;
        
        setCurrentPage(Math.max(1, pages));
      }
    }
  };

  // Calculate reading progress
  const totalChapters = (chapters as Chapter[])?.length || 1;
  const progressPercentage = ((selectedChapter - 1) / totalChapters + (currentPage / totalPages) / totalChapters) * 100;

  // Loading state
  if (!grimoire || !chapters) {
    return (
      <PageTransition className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando grimório...</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <div className="fixed inset-0 bg-background min-h-screen" 
         style={{
           background: 'url("https://i.postimg.cc/qqX1Q7zn/Textura-envelhecida-e-marcada-pelo-tempo.png") center/cover fixed',
           backgroundAttachment: 'fixed'
         }}>
      {/* Botão de voltar - único elemento da interface */}
      <button 
        onClick={() => {
          exitFullscreen();
          setLocation('/biblioteca');
        }}
        className="fixed top-4 left-4 z-50 p-3 bg-card/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-card transition-all border border-burned-amber"
      >
        <ChevronLeft size={18} className="text-golden-amber" />
      </button>

      {/* Container de leitura - ocupa toda a tela */}
      <div className="h-full flex">
        {/* Navegação invisível - área esquerda */}
        <div 
          onClick={handlePrevPage}
          className="w-16 sm:w-20 md:w-24 lg:w-32 h-full cursor-pointer"
        />

        {/* Container de texto - área central */}
        <div className="flex-1 h-full flex items-center justify-center">
          {/* Página formato A5 responsiva - com estilo do site */}
          <div 
            className="bg-card/95 backdrop-blur-sm shadow-2xl rounded-lg border border-burned-amber relative content-section"
            style={{
              width: isMobile ? '85vw' : 'min(65vw, 380px)',
              height: isMobile ? '80vh' : 'min(80vh, 540px)',
              maxWidth: '380px',
              maxHeight: '540px'
            }}
          >
            {/* Botões discretos de navegação */}
            <button
              onClick={handlePrevPage}
              disabled={selectedChapter === 1 && currentPage === 1}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 w-8 h-8 bg-card/80 hover:bg-card rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200 disabled:opacity-0 border border-burned-amber"
            >
              <ChevronLeft size={16} className="text-golden-amber" />
            </button>

            <button
              onClick={handleNextPage}
              disabled={selectedChapter === (chapters as Chapter[])?.length && currentPage === totalPages}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 bg-card/80 hover:bg-card rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200 disabled:opacity-0 border border-burned-amber"
            >
              <ChevronRight size={16} className="text-golden-amber" />
            </button>

            <div className="h-full p-6 sm:p-8 md:p-10 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedChapter}-${currentPage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Título do capítulo (apenas na primeira página) */}
                  {currentPage === 1 && (
                    <div className="text-center mb-8">
                      <h1 className="font-cinzel text-golden-amber font-bold tracking-widest uppercase text-lg md:text-xl">
                        {currentChapter?.title}
                      </h1>
                    </div>
                  )}

                  {/* Conteúdo da página */}
                  <div 
                    ref={contentRef}
                    className="font-garamond text-ritualistic-beige grimoire-content"
                    style={{
                      fontSize: isMobile ? '13px' : '15px',
                      lineHeight: '1.6',
                      height: isMobile ? 'calc(80vh - 140px)' : 'calc(540px - 140px)',
                      maxHeight: isMobile ? 'calc(80vh - 140px)' : 'calc(540px - 140px)',
                      overflow: 'hidden',
                      wordWrap: 'break-word'
                    }}
                    dangerouslySetInnerHTML={{ __html: currentPageContent }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Navegação invisível - área direita */}
        <div 
          onClick={handleNextPage}
          className="w-16 sm:w-20 md:w-24 lg:w-32 h-full cursor-pointer"
        />
      </div>

      {/* Barra de progresso estilo Kindle - parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-burned-amber px-6 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Página {currentPage} de {totalPages}</span>
            <span>Cap. {selectedChapter} de {(chapters as Chapter[])?.length}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1">
            <div 
              className="bg-golden-amber h-1 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}