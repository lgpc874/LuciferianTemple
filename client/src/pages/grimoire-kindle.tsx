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

  // Pagination logic optimized for A5 format
  useEffect(() => {
    if (!currentChapter) return;

    // A5 format pagination - optimized for readability
    const words = currentChapter.content.split(' ');
    // A5 page can comfortably fit 150-250 words depending on font size
    const wordsPerPage = isMobile ? 150 : 200;
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
          className="w-16 sm:w-20 md:w-24 lg:w-32 h-full cursor-pointer"
        />

        {/* Container de texto - área central */}
        <div className="flex-1 h-full flex items-center justify-center">
          {/* Página formato A5 responsiva - ligeiramente menor */}
          <div 
            className="shadow-lg rounded-lg border border-amber-200 relative"
            style={{
              width: isMobile ? '85vw' : 'min(65vw, 380px)', // A5 reduzido
              height: isMobile ? '80vh' : 'min(80vh, 540px)', // A5 reduzido
              maxWidth: '380px',
              maxHeight: '540px',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a  50%, #f3e8ab 100%)',
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(160, 82, 45, 0.1) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(139, 69, 19, 0.08) 0%, transparent 40%),
                radial-gradient(circle at 60% 10%, rgba(101, 67, 33, 0.05) 0%, transparent 30%)
              `
            }}
          >
            {/* Botões discretos de navegação */}
            <button
              onClick={handlePrevPage}
              disabled={selectedChapter === 1 && currentPage === 1}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 w-8 h-8 bg-gray-100/80 hover:bg-gray-200/80 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200 disabled:opacity-0"
            >
              <ChevronLeft size={16} className="text-gray-600" />
            </button>

            <button
              onClick={handleNextPage}
              disabled={selectedChapter === (chapters as Chapter[])?.length && currentPage === totalPages}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 bg-gray-100/80 hover:bg-gray-200/80 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200 disabled:opacity-0"
            >
              <ChevronRight size={16} className="text-gray-600" />
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
                      <h1 className="font-serif text-amber-900 leading-tight text-lg sm:text-xl md:text-2xl font-bold tracking-wide uppercase">
                        {currentChapter?.title}
                      </h1>
                    </div>
                  )}

                  {/* Conteúdo da página */}
                  <div 
                    ref={contentRef}
                    className="text-amber-900 text-justify leading-relaxed flex-1 overflow-hidden"
                    style={{
                      fontSize: isMobile ? '15px' : '16px',
                      lineHeight: '1.8',
                      fontFamily: '"Times New Roman", "Garamond", "Book Antiqua", Georgia, serif',
                      textIndent: '1.5em',
                      letterSpacing: '0.3px'
                    }}
                  >
                    <div 
                      className="prose prose-amber max-w-none"
                      style={{
                        fontSize: 'inherit',
                        lineHeight: 'inherit',
                        fontFamily: 'inherit'
                      }}
                      dangerouslySetInnerHTML={{ __html: currentPageContent.replace(/\n\n/g, '</p><p class="mb-4 first-letter:text-2xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">').replace(/^/, '<p class="mb-4 first-letter:text-2xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">') + '</p>' }}
                    />
                  </div>
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
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-6 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Página {currentPage} de {totalPages}</span>
            <span>Cap. {selectedChapter} de {(chapters as Chapter[])?.length}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-gray-800 h-1 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}