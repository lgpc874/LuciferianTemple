import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useParams } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PageTransition } from '../components/page-transition';
import { useIsMobile } from '../hooks/use-mobile';
import { useAuth } from '../hooks/use-auth';
import { apiRequest } from '../lib/queryClient';

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
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  
  // Get grimoire ID from URL
  const grimoireId = params.id ? parseInt(params.id) : 1;
  
  // Reading state
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const progressSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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

  // Fetch user progress for this grimoire
  const { data: userProgress = [] } = useQuery({
    queryKey: [`/api/progress/grimoire/${grimoireId}`],
    enabled: !!token && !!grimoireId
  });

  // Mutation for saving reading progress
  const saveProgressMutation = useMutation({
    mutationFn: async (progressData: any) => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/progress', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(progressData)
      });
      
      const responseData = await response.json();
      if (!response.ok) throw new Error(`Failed to save progress: ${responseData.error || response.statusText}`);
      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/progress/grimoire/${grimoireId}`] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
    }
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

  // Auto-save reading progress with debouncing
  const saveReadingProgress = (chapterId: number, pageNum: number) => {
    if (!token) {
      console.log('No token for saving');
      return;
    }
    
    console.log('Setting up save for:', { chapterId, pageNum });
    
    // Clear existing timeout
    if (progressSaveTimeoutRef.current) {
      clearTimeout(progressSaveTimeoutRef.current);
    }
    
    // Set new timeout to save after 2 seconds of inactivity
    progressSaveTimeoutRef.current = setTimeout(() => {
      const readingTime = Math.floor((Date.now() - startTime) / 1000);
      
      console.log('Executing save mutation:', {
        grimoireId: grimoireId,
        chapterId: chapterId,
        progressType: 'reading',
        currentPage: pageNum,
        readingTime: readingTime
      });
      
      saveProgressMutation.mutate({
        grimoireId: grimoireId,
        chapterId: chapterId,
        progressType: 'reading',
        currentPage: pageNum,
        readingTime: readingTime
      });
    }, 1000); // Reduced to 1 second for testing
  };

  // Paragraph-preserving pagination
  useEffect(() => {
    if (!currentChapter?.content) {
      setCurrentPageContent('');
      setTotalPages(1);
      return;
    }

    const content = currentChapter.content;
    
    // Extract complete paragraphs and other block elements
    const tempContent = content.replace(/\n/g, ' ');
    const paragraphs = tempContent.match(/<p[^>]*>.*?<\/p>|<h[3-4][^>]*>.*?<\/h[3-4]>|<blockquote[^>]*>.*?<\/blockquote>|<ul[^>]*>.*?<\/ul>/g) || [];
    
    // Very conservative character limit to ensure content fits
    const maxCharsPerPage = isMobile ? 800 : 1200;
    
    const pages: string[] = [];
    let currentPageContent = '';
    let currentLength = 0;
    
    for (const paragraph of paragraphs) {
      const paragraphLength = paragraph.length;
      
      // If adding this paragraph would exceed the limit
      if (currentLength + paragraphLength > maxCharsPerPage && currentPageContent.length > 0) {
        // Save current page
        pages.push(currentPageContent.trim());
        
        // Start new page with this paragraph
        currentPageContent = paragraph;
        currentLength = paragraphLength;
      } else {
        // Add paragraph to current page
        currentPageContent += paragraph;
        currentLength += paragraphLength;
      }
    }
    
    // Add the final page if it has content
    if (currentPageContent.trim().length > 0) {
      pages.push(currentPageContent.trim());
    }
    
    // Ensure we have at least one page
    if (pages.length === 0) {
      pages.push('<p>Conteúdo não disponível</p>');
    }
    
    setTotalPages(pages.length);
    
    // Get current page with bounds checking
    const pageIndex = Math.max(0, Math.min(currentPage - 1, pages.length - 1));
    setCurrentPageContent(pages[pageIndex] || pages[0] || '');
  }, [currentChapter, currentPage, isMobile]);

  // Initialize component and load saved progress (only once)
  useEffect(() => {
    setIsFullscreen(true);
    setStartTime(Date.now());
    
    return () => {
      setIsFullscreen(false);
      if (progressSaveTimeoutRef.current) {
        clearTimeout(progressSaveTimeoutRef.current);
      }
    };
  }, []);

  // Load saved progress when data becomes available
  useEffect(() => {
    if (Array.isArray(userProgress) && userProgress.length > 0 && Array.isArray(chapters) && chapters.length > 0) {
      const latestProgress = userProgress
        .filter((p: any) => p.progressType === 'reading')
        .sort((a: any, b: any) => new Date(b.completedAt || b.createdAt).getTime() - new Date(a.completedAt || a.createdAt).getTime())[0];
      
      if (latestProgress) {
        const foundChapter = (chapters as Chapter[])?.find(ch => ch.id === latestProgress.chapterId);
        if (foundChapter && foundChapter.chapterOrder !== selectedChapter) {
          setSelectedChapter(foundChapter.chapterOrder);
          setCurrentPage(latestProgress.currentPage || 1);
        }
      }
    }
  }, [userProgress, chapters]);

  // Auto-save when page changes (excluding first page to avoid unnecessary saves)
  useEffect(() => {
    console.log('Page change effect:', { currentChapter: currentChapter?.id, currentPage, token: !!token });
    if (currentChapter && currentPage > 1 && token) {
      console.log('Triggering auto-save');
      saveReadingProgress(currentChapter.id, currentPage);
    }
  }, [currentPage, selectedChapter, currentChapter]);

  // Navigation handlers with automatic progress saving
  const handleNextPage = () => {
    let newPage = currentPage;
    let newChapter = selectedChapter;
    
    if (currentPage < totalPages) {
      newPage = currentPage + 1;
      setCurrentPage(newPage);
    } else if (selectedChapter < (chapters as Chapter[])?.length) {
      newChapter = selectedChapter + 1;
      newPage = 1;
      setSelectedChapter(newChapter);
      setCurrentPage(newPage);
    }
    
    // Auto-save progress
    const chapterData = (chapters as Chapter[])?.find(ch => ch.chapterOrder === newChapter);
    if (chapterData) {
      saveReadingProgress(chapterData.id, newPage);
    }
  };

  const handlePrevPage = () => {
    let newPage = currentPage;
    let newChapter = selectedChapter;
    
    if (currentPage > 1) {
      newPage = currentPage - 1;
      setCurrentPage(newPage);
    } else if (selectedChapter > 1) {
      // Go to previous chapter and set to its last page
      const prevChapter = (chapters as Chapter[])?.find((ch: Chapter) => ch.chapterOrder === selectedChapter - 1);
      if (prevChapter) {
        newChapter = selectedChapter - 1;
        setSelectedChapter(newChapter);
        
        // Calculate total pages for previous chapter using same logic
        const prevContent = prevChapter.content;
        const tempPrevContent = prevContent.replace(/\n/g, ' ');
        const paragraphs = tempPrevContent.match(/<p[^>]*>.*?<\/p>|<h[3-4][^>]*>.*?<\/h[3-4]>|<blockquote[^>]*>.*?<\/blockquote>|<ul[^>]*>.*?<\/ul>/g) || [];
        const maxCharsPerPage = isMobile ? 800 : 1200;
        
        let pages = 0;
        let currentLength = 0;
        
        for (const paragraph of paragraphs) {
          if (currentLength + paragraph.length > maxCharsPerPage && currentLength > 0) {
            pages++;
            currentLength = paragraph.length;
          } else {
            currentLength += paragraph.length;
          }
        }
        if (currentLength > 0) pages++;
        
        newPage = Math.max(1, pages);
        setCurrentPage(newPage);
      }
    }
    
    // Auto-save progress
    const chapterData = (chapters as Chapter[])?.find(ch => ch.chapterOrder === newChapter);
    if (chapterData) {
      saveReadingProgress(chapterData.id, newPage);
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
            <button
              onClick={() => {
                if (currentChapter && token) {
                  console.log('Manual save clicked');
                  saveReadingProgress(currentChapter.id, currentPage);
                }
              }}
              className="px-2 py-1 text-xs bg-blue-600/20 text-blue-300 rounded border border-blue-400/50"
            >
              Salvar
            </button>
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