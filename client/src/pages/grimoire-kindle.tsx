import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Menu } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect, useRef, useCallback } from "react";

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
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detectar tamanho da tela
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

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

  // Ref para o container de conteúdo
  const contentRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<string[]>([]);
  
  // Função para dividir conteúdo baseado na altura real do container
  const splitContentByHeight = useCallback((content: string) => {
    if (!content || !contentRef.current) return [content];
    
    const cleanContent = content.replace(/<div class="chapter-header">.*?<\/div>/g, '');
    const paragraphs = cleanContent.split(/<\/p>|<\/h[1-6]>/).filter(p => p.trim());
    
    const container = contentRef.current;
    const maxHeight = container.clientHeight;
    const pages: string[] = [];
    let currentPage = '';
    
    // Criar um elemento temporário para medir altura
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.width = container.offsetWidth + 'px';
    tempDiv.style.fontSize = getComputedStyle(container).fontSize;
    tempDiv.style.lineHeight = getComputedStyle(container).lineHeight;
    tempDiv.style.fontFamily = getComputedStyle(container).fontFamily;
    document.body.appendChild(tempDiv);
    
    try {
      for (const paragraph of paragraphs) {
        const fullParagraph = paragraph + (paragraph.includes('<h') ? '>' : '</p>');
        const testContent = currentPage + fullParagraph;
        
        tempDiv.innerHTML = testContent;
        
        if (tempDiv.offsetHeight > maxHeight && currentPage.trim()) {
          pages.push(currentPage);
          currentPage = fullParagraph;
        } else {
          currentPage += fullParagraph;
        }
      }
      
      if (currentPage.trim()) {
        pages.push(currentPage);
      }
    } finally {
      document.body.removeChild(tempDiv);
    }
    
    return pages.length > 0 ? pages : [cleanContent];
  }, []);
  
  // Atualizar páginas quando o conteúdo ou tamanho mudar
  useEffect(() => {
    if (currentChapter?.content) {
      const newPages = splitContentByHeight(currentChapter.content);
      setPages(newPages);
      setCurrentPage(1);
    }
  }, [currentChapter?.content, splitContentByHeight, isMobile]);

  const totalPages = pages.length;
  const currentPageContent = pages[currentPage - 1] || '';

  // Calcular progresso simples baseado no capítulo atual
  const progressPercentage = (chapters as Chapter[]).length > 0 ? 
    ((selectedChapter - 1) / (chapters as Chapter[]).length + (currentPage / totalPages) / (chapters as Chapter[]).length) * 100 : 0;

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
      setCurrentPage(1); // Simplificado - vai para página 1 do capítulo anterior
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-lg font-bold text-gray-900">
                    {(grimoire as Grimoire)?.title}
                  </h1>
                  
                  <button 
                    onClick={() => setShowMenu(false)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Controles */}
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <button 
                    onClick={isFullscreen ? exitFullscreen : enterFullscreen}
                    className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                  >
                    {isFullscreen ? '🪟 Sair Tela Cheia' : '⛶ Entrar Tela Cheia'}
                  </button>
                  
                  <button 
                    onClick={() => {
                      exitFullscreen();
                      setLocation('/biblioteca');
                    }}
                    className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors font-medium"
                  >
                    ← Voltar à Biblioteca
                  </button>
                </div>

                {/* Índice de capítulos */}
                <div className="space-y-2">
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                    Capítulos
                  </h2>
                  {(chapters as Chapter[]).map((chapter: Chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => handleChapterChange(chapter.chapterOrder)}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        selectedChapter === chapter.chapterOrder
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{chapter.title}</div>
                      <div className={`text-sm mt-1 ${
                        selectedChapter === chapter.chapterOrder ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Capítulo {chapter.chapterOrder} • {chapter.estimatedReadingTime} min
                      </div>
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
        {/* Espaço reservado para o menu */}
        <div className="h-20 flex-shrink-0 relative">
          {/* Botão de menu fixo no topo */}
          <div className="absolute top-4 left-4 z-30">
            <button 
              onClick={() => setShowMenu(true)}
              className="p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all border border-gray-200"
            >
              <Menu size={18} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Conteúdo da página */}
        <div className="flex-1 flex items-stretch">
          {/* Área de toque para página anterior */}
          <button 
            onClick={handlePrevPage}
            disabled={selectedChapter === 1 && currentPage === 1}
            className={`flex items-center justify-center transition-opacity ${
              isMobile 
                ? 'w-12 opacity-20 active:opacity-60' 
                : 'w-20 opacity-0 hover:opacity-100'
            }`}
          >
            {!(selectedChapter === 1 && currentPage === 1) && (
              <ChevronLeft size={isMobile ? 16 : 24} className="text-gray-400" />
            )}
          </button>

          {/* Conteúdo central - responsivo para desktop e mobile */}
          <div className={`flex-1 flex flex-col ${
            isMobile 
              ? 'px-6 py-4' 
              : 'px-12 py-8'
          }`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedChapter}-${currentPage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col max-w-none"
                style={{ minHeight: 0 }}
              >
                {/* Título do capítulo (apenas na primeira página) */}
                {currentPage === 1 && (
                  <div className={`pb-4 border-b border-gray-200 flex-shrink-0 ${
                    isMobile ? 'mb-6' : 'mb-10'
                  }`}>
                    <h1 className={`font-bold text-gray-900 leading-tight ${
                      isMobile ? 'text-xl' : 'text-3xl'
                    }`}>
                      {currentChapter?.title}
                    </h1>
                  </div>
                )}

                {/* Container de conteúdo com altura fixa */}
                <div 
                  ref={contentRef}
                  className="text-gray-800 overflow-hidden text-justify"
                  style={{
                    fontSize: isMobile ? '17px' : '18px',
                    lineHeight: isMobile ? '1.6' : '1.7',
                    fontFamily: 'Georgia, serif',
                    maxWidth: isMobile ? '100%' : '85%',
                    margin: isMobile ? '0' : '0 auto',
                    height: isMobile ? '70vh' : '75vh', // Altura maior para mais texto
                    width: '100%'
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
            className={`flex items-center justify-center transition-opacity ${
              isMobile 
                ? 'w-12 opacity-20 active:opacity-60' 
                : 'w-20 opacity-0 hover:opacity-100'
            }`}
          >
            {!(selectedChapter === (chapters as Chapter[]).length && currentPage === totalPages) && (
              <ChevronRight size={isMobile ? 16 : 24} className="text-gray-400" />
            )}
          </button>
        </div>

        {/* Barra de progresso - fixa no bottom */}
        <div className={`flex-shrink-0 border-t border-gray-100 bg-white ${
          isMobile ? 'px-6 py-4' : 'px-16 py-6'
        }`}>
          <div className="max-w-full">
            <div className={`flex items-center justify-between text-gray-500 mb-3 ${
              isMobile ? 'text-sm' : 'text-base'
            }`}>
              <span>Página {currentPage} de {totalPages}</span>
              <span>{Math.round(progressPercentage)}% completo</span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full ${
              isMobile ? 'h-2' : 'h-3'
            }`}>
              <div 
                className="bg-gray-800 rounded-full transition-all duration-500"
                style={{ 
                  width: `${progressPercentage}%`,
                  height: '100%'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}