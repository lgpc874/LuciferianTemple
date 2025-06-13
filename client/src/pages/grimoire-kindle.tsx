import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Menu } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect } from "react";

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
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { token } = useAuth();
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Função para entrar em tela cheia
  const enterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (error) {
      console.log('Fullscreen não suportado');
    }
  };

  // Função para sair da tela cheia
  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.log('Erro ao sair da tela cheia');
    }
  };

  // Detectar mudanças no estado fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const { data: grimoire, isLoading: grimoireLoading } = useQuery({
    queryKey: ['/api/grimoires', id],
    enabled: !!id && !!token
  });

  const { data: chapters = [], isLoading: chaptersLoading } = useQuery({
    queryKey: [`/api/grimoires/${id}/chapters`],
    enabled: !!id && !!token
  });

  const currentChapter = (chapters as Chapter[]).find((ch: Chapter) => ch.chapterOrder === selectedChapter);

  // Função para dividir conteúdo em páginas estilo Kindle
  const splitContentIntoPages = (content: string): string[] => {
    if (!content) return [];
    
    // Remover o header e dividir em parágrafos
    const cleanContent = content.replace(/<div class="chapter-header">.*?<\/div>/g, '');
    const paragraphs = cleanContent.split(/<\/p>|<\/h[1-6]>/).filter(p => p.trim());
    
    const pages: string[] = [];
    let currentPageContent = '';
    // Muito menos palavras para garantir que cabe na tela sem scroll
    const maxWordsPerPage = 120; 
    
    paragraphs.forEach((paragraph) => {
      const fullParagraph = paragraph + (paragraph.includes('<h') ? '>' : '</p>');
      const wordCount = fullParagraph.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length;
      const currentWordCount = currentPageContent.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length;
      
      if (currentWordCount + wordCount > maxWordsPerPage && currentPageContent.trim()) {
        pages.push(currentPageContent);
        currentPageContent = fullParagraph;
      } else {
        currentPageContent += fullParagraph;
      }
    });
    
    if (currentPageContent.trim()) {
      pages.push(currentPageContent);
    }
    
    return pages.length > 0 ? pages : [content];
  };

  const currentPages = splitContentIntoPages(currentChapter?.content || '');
  const totalPages = currentPages.length;
  const currentPageContent = currentPages[currentPage - 1] || '';

  // Calcular posição total no livro
  const totalChapterPages = (chapters as Chapter[]).reduce((acc, chapter, index) => {
    if (index < selectedChapter - 1) {
      return acc + splitContentIntoPages(chapter.content || '').length;
    }
    return acc;
  }, 0);
  
  const currentPositionInBook = totalChapterPages + currentPage;
  const totalPagesInBook = (chapters as Chapter[]).reduce((acc, chapter) => {
    return acc + splitContentIntoPages(chapter.content || '').length;
  }, 0);

  // Reset page when chapter changes
  const handleChapterChange = (chapterOrder: number) => {
    setSelectedChapter(chapterOrder);
    setCurrentPage(1);
    setShowMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navegação de páginas
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (selectedChapter < (chapters as Chapter[]).length) {
      setSelectedChapter(selectedChapter + 1);
      setCurrentPage(1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
      const prevChapter = (chapters as Chapter[]).find(ch => ch.chapterOrder === selectedChapter - 1);
      const prevPages = splitContentIntoPages(prevChapter?.content || '');
      setCurrentPage(prevPages.length);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPercentage = totalPagesInBook > 0 ? (currentPositionInBook / totalPagesInBook) * 100 : 0;

  if (grimoireLoading || chaptersLoading) {
    return (
      <PageTransition className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Abrindo...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-white text-gray-900 font-serif">
      {/* Header minimalista - apenas visível no menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowMenu(false)}
          >
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              className="bg-white border-b shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="max-w-2xl mx-auto p-4">
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={() => {
                      exitFullscreen();
                      setLocation('/biblioteca');
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <ChevronLeft size={20} />
                    <span>Biblioteca</span>
                  </button>
                  
                  <h1 className="font-sans text-lg font-medium text-center flex-1">
                    {(grimoire as Grimoire)?.title}
                  </h1>
                  
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={isFullscreen ? exitFullscreen : enterFullscreen}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      {isFullscreen ? 'Sair Tela Cheia' : 'Tela Cheia'}
                    </button>
                    
                    <button 
                      onClick={() => setShowMenu(false)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Índice de capítulos */}
                <div className="space-y-2">
                  <h3 className="font-sans text-sm font-medium text-gray-600 mb-3">Capítulos</h3>
                  {(chapters as Chapter[]).map((chapter: Chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => handleChapterChange(chapter.chapterOrder)}
                      className={`block w-full text-left p-3 rounded-lg transition-colors ${
                        selectedChapter === chapter.chapterOrder
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium text-sm">{chapter.title}</div>
                      <div className="text-xs text-gray-500 mt-1">Capítulo {chapter.chapterOrder}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo principal - estilo Kindle */}
      <div className="w-full h-screen flex flex-col">
        {/* Área de toque para menu */}
        <div className="absolute top-0 left-0 right-0 h-12 z-10">
          <button 
            onClick={() => setShowMenu(true)}
            className="w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          >
            <Menu size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Conteúdo da página */}
        <div className="flex-1 flex items-stretch">
          {/* Área de toque para página anterior */}
          <button 
            onClick={handlePrevPage}
            disabled={selectedChapter === 1 && currentPage === 1}
            className="w-16 md:w-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          >
            {!(selectedChapter === 1 && currentPage === 1) && (
              <ChevronLeft size={20} className="text-gray-400" />
            )}
          </button>

          {/* Conteúdo central - largura máxima */}
          <div className="flex-1 max-w-5xl mx-auto px-8 md:px-16 py-8 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedChapter}-${currentPage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
                style={{ minHeight: 0 }}
              >
                {/* Título do capítulo (apenas na primeira página) */}
                {currentPage === 1 && (
                  <div className="mb-6 pb-4 border-b border-gray-200 flex-shrink-0">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                      {currentChapter?.title}
                    </h1>
                  </div>
                )}

                {/* Conteúdo da página - altura controlada */}
                <div 
                  className="flex-1 text-gray-800 overflow-hidden"
                  style={{
                    fontSize: '17px',
                    lineHeight: '1.7',
                    fontFamily: 'Georgia, serif'
                  }}
                  dangerouslySetInnerHTML={{ __html: currentPageContent }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Área de toque para próxima página */}
          <button 
            onClick={handleNextPage}
            disabled={selectedChapter === (chapters as Chapter[]).length && currentPage === totalPages}
            className="w-16 md:w-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          >
            {!(selectedChapter === (chapters as Chapter[]).length && currentPage === totalPages) && (
              <ChevronRight size={20} className="text-gray-400" />
            )}
          </button>
        </div>

        {/* Barra de progresso - fixa no bottom */}
        <div className="flex-shrink-0 px-8 md:px-16 py-3 border-t border-gray-100 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Página {currentPage} de {totalPages}</span>
              <span>{Math.round(progressPercentage)}% do livro</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-gray-800 h-1 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}