import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
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

  // Pagination logic based on container height
  useEffect(() => {
    if (!currentChapter) return;

    // Simple word-based pagination for now
    const words = currentChapter.content.split(' ');
    const wordsPerPage = isMobile ? 200 : 300; // Ajustado para mostrar mais conteúdo
    const calculatedPages = Math.ceil(words.length / wordsPerPage);
    
    setTotalPages(Math.max(1, calculatedPages));
    
    // Calculate content for current page
    const startIndex = (currentPage - 1) * wordsPerPage;
    const endIndex = currentPage * wordsPerPage;
    
    const pageContent = words.slice(startIndex, endIndex).join(' ');
    setCurrentPageContent(pageContent);
  }, [currentChapter, currentPage, isMobile]);

  // Navigation handlers
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
      setSelectedChapter(prev => prev - 1);
      setCurrentPage(1);
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
    <div className="fixed inset-0 bg-white">
      {/* Botão de voltar - único elemento da interface */}
      <button 
        onClick={() => {
          exitFullscreen();
          setLocation('/biblioteca');
        }}
        className="fixed top-4 left-4 z-50 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all border border-gray-200"
      >
        <ChevronLeft size={18} className="text-gray-700" />
      </button>

      {/* Container de leitura - ocupa toda a tela */}
      <div className="h-full flex">
        {/* Navegação invisível - área esquerda */}
        <div 
          onClick={handlePrevPage}
          className="w-1/4 h-full cursor-pointer"
        />

        {/* Container de texto - área central */}
        <div className="flex-1 h-full flex items-center justify-center px-8">
          <div className="max-w-4xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedChapter}-${currentPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Título do capítulo (apenas na primeira página) */}
                {currentPage === 1 && (
                  <h1 className={`font-bold text-gray-900 leading-tight mb-8 pb-4 border-b border-gray-200 ${
                    isMobile ? 'text-xl' : 'text-2xl'
                  }`}>
                    {currentChapter?.title}
                  </h1>
                )}

                {/* Conteúdo da página */}
                <div 
                  ref={contentRef}
                  className="text-gray-800 text-justify leading-relaxed"
                  style={{
                    fontSize: isMobile ? '17px' : '19px',
                    lineHeight: '1.8',
                    fontFamily: 'Georgia, serif',
                    height: 'calc(100vh - 120px)',
                    overflow: 'hidden'
                  }}
                  dangerouslySetInnerHTML={{ __html: currentPageContent }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navegação invisível - área direita */}
        <div 
          onClick={handleNextPage}
          className="w-1/4 h-full cursor-pointer"
        />
      </div>
    </div>
  );
}