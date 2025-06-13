import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

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

export default function GrimoireReader() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { token } = useAuth();
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  const { data: grimoire, isLoading: grimoireLoading } = useQuery({
    queryKey: ['/api/grimoires', id],
    enabled: !!id && !!token
  });

  const { data: chapters = [], isLoading: chaptersLoading } = useQuery({
    queryKey: [`/api/grimoires/${id}/chapters`],
    enabled: !!id && !!token
  });

  const currentChapter = (chapters as Chapter[]).find((ch: Chapter) => ch.chapterOrder === selectedChapter);

  // Função para dividir conteúdo em páginas
  const splitContentIntoPages = (content: string): string[] => {
    if (!content) return [];
    
    const elements = content.split(/(<\/(?:h[2-6]|p|div)>)/);
    const pages: string[] = [];
    let currentPageContent = '';
    const maxWordsPerPage = 300;
    
    let headerSection = '';
    let inHeader = true;
    
    for (let i = 0; i < elements.length; i += 2) {
      const element = elements[i] + (elements[i + 1] || '');
      
      if (inHeader && element.includes('chapter-header')) {
        headerSection = element;
        continue;
      }
      if (inHeader && element.includes('</div>')) {
        headerSection += element;
        inHeader = false;
        currentPageContent = headerSection;
        continue;
      }
      
      const elementText = element.replace(/<[^>]*>/g, '').trim();
      const wordCount = elementText.split(/\s+/).filter(word => word.length > 0).length;
      const currentWordCount = currentPageContent.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length;
      
      if (currentWordCount + wordCount > maxWordsPerPage && currentPageContent.replace(headerSection, '').trim()) {
        pages.push(currentPageContent);
        currentPageContent = headerSection + element;
      } else {
        currentPageContent += element;
      }
    }
    
    if (currentPageContent.replace(headerSection, '').trim()) {
      pages.push(currentPageContent);
    }
    
    return pages.length > 0 ? pages : [content];
  };

  const currentPages = splitContentIntoPages(currentChapter?.content || '');
  const totalPages = currentPages.length;
  const currentPageContent = currentPages[currentPage - 1] || '';

  // Reset page when chapter changes
  const handleChapterChange = (chapterOrder: number) => {
    setSelectedChapter(chapterOrder);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page change with flip animation
  const handlePageChange = (newPage: number, direction: 'next' | 'prev' = 'next') => {
    setIsFlipping(true);
    setFlipDirection(direction);
    
    setTimeout(() => {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
    
    setTimeout(() => {
      setIsFlipping(false);
    }, 600);
  };

  if (grimoireLoading || chaptersLoading) {
    return (
      <PageTransition className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-golden-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-golden-amber font-cinzel">Abrindo o Grimório...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
      {/* Textura de papel antigo */}
      <div className="fixed inset-0 opacity-10 bg-gradient-to-br from-amber-100/5 via-transparent to-amber-100/5"></div>
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-stone-900/95 to-stone-800/95 backdrop-blur-sm border-b-2 border-golden-amber/30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation('/biblioteca')}
            className="flex items-center space-x-2 text-golden-amber hover:text-golden-amber/80 transition-colors font-cinzel text-sm"
          >
            <ChevronLeft size={18} />
            <span>BIBLIOTECA</span>
          </motion.button>

          <div className="text-center flex-1">
            <h1 className="font-cinzel text-lg text-golden-amber">{(grimoire as Grimoire)?.title || 'Grimório'}</h1>
            <p className="text-xs text-burned-amber/80">{currentChapter?.title || ''}</p>
          </div>

          <div className="text-burned-amber/80 text-xs font-cinzel">
            Página {currentPage} de {totalPages}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="pt-20 pb-8 min-h-screen flex items-center justify-center">
        <div className="relative max-w-6xl mx-auto px-4 w-full">
          
          {/* Navegação de capítulos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="bg-gradient-to-r from-stone-800/40 to-stone-700/40 backdrop-blur-sm border border-golden-amber/20 rounded-lg p-4">
              <h3 className="text-center font-cinzel text-golden-amber text-sm mb-3 tracking-wider">ÍNDICE</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {(chapters as Chapter[]).map((chapter: Chapter) => (
                  <motion.button
                    key={chapter.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleChapterChange(chapter.chapterOrder)}
                    className={`px-3 py-1.5 rounded font-cinzel text-xs transition-all duration-300 ${
                      selectedChapter === chapter.chapterOrder
                        ? 'bg-golden-amber text-stone-900 shadow-lg font-bold'
                        : 'bg-stone-700/50 text-golden-amber/80 border border-golden-amber/20 hover:bg-golden-amber/10'
                    }`}
                  >
                    {chapter.chapterOrder}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Livro aberto */}
          <div className="relative">
            {/* Sombra do livro */}
            <div className="absolute inset-0 bg-black/30 blur-xl transform translate-y-8 scale-105"></div>
            
            {/* Páginas do livro */}
            <div className="relative bg-gradient-to-br from-amber-50/95 to-amber-100/90 border-2 border-amber-800/60 rounded-lg shadow-2xl overflow-hidden min-h-[600px]">
              {/* Lombada do livro */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-b from-amber-900 to-amber-800 border-r border-amber-700"></div>
              
              {/* Conteúdo da página com animação flip */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedChapter}-${currentPage}`}
                  initial={isFlipping ? 
                    { rotateY: flipDirection === 'next' ? -180 : 180, opacity: 0 } : 
                    { opacity: 1, rotateY: 0 }
                  }
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={isFlipping ? 
                    { rotateY: flipDirection === 'next' ? 180 : -180, opacity: 0 } : 
                    { opacity: 0 }
                  }
                  transition={{ 
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                  className="p-12 pl-20 min-h-[600px] relative"
                  style={{ 
                    perspective: "1000px",
                    transformStyle: "preserve-3d" 
                  }}
                >
                  {/* Cabeçalho da página */}
                  <div className="text-center mb-8 border-b border-amber-800/30 pb-6">
                    <h2 className="font-cinzel text-2xl text-amber-900 mb-2">
                      {currentChapter?.title}
                    </h2>
                    <div className="flex items-center justify-center space-x-6 text-amber-700 text-sm">
                      <div className="flex items-center space-x-1">
                        <BookOpen size={14} />
                        <span>Capítulo {selectedChapter}</span>
                      </div>
                      <div className="w-1 h-1 bg-amber-700 rounded-full"></div>
                      <div className="flex items-center space-x-1">
                        <span>Página {currentPage} de {totalPages}</span>
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="prose prose-amber max-w-none">
                    <div 
                      className="font-serif text-amber-900 leading-relaxed text-justify columns-1 md:columns-2 gap-8"
                      style={{
                        textShadow: '0 1px 1px rgba(0,0,0,0.1)'
                      }}
                      dangerouslySetInnerHTML={{ __html: currentPageContent }}
                    />
                  </div>

                  {/* Número da página */}
                  <div className="absolute bottom-6 right-8 text-amber-700 text-sm font-cinzel">
                    {currentPage}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navegação de páginas */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center space-x-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(Math.max(1, currentPage - 1), 'prev')}
                disabled={currentPage === 1}
                className={`flex items-center space-x-2 font-cinzel py-3 px-6 rounded-md transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-stone-700/30 text-stone-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-800/20 to-amber-700/20 text-golden-amber border border-amber-600/50 hover:from-amber-700/30 hover:to-amber-600/30'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Página Anterior</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1), 'next')}
                disabled={currentPage === totalPages}
                className={`flex items-center space-x-2 font-cinzel py-3 px-6 rounded-md transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-stone-700/30 text-stone-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-800/20 to-amber-700/20 text-golden-amber border border-amber-600/50 hover:from-amber-700/30 hover:to-amber-600/30'
                }`}
              >
                <span>Próxima Página</span>
                <ChevronRight size={16} />
              </motion.button>
            </div>
          )}

          {/* Navegação entre capítulos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center items-center mt-8 space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChapterChange(Math.max(1, selectedChapter - 1))}
              disabled={selectedChapter === 1}
              className={`flex items-center space-x-2 font-cinzel py-2 px-4 rounded-md transition-all duration-300 ${
                selectedChapter === 1
                  ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
                  : 'bg-golden-amber/10 text-golden-amber border border-golden-amber/30 hover:bg-golden-amber/20'
              }`}
            >
              <ChevronLeft size={16} />
              <span>Cap. Anterior</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChapterChange(Math.min((chapters as Chapter[]).length, selectedChapter + 1))}
              disabled={selectedChapter === (chapters as Chapter[]).length}
              className={`flex items-center space-x-2 font-cinzel py-2 px-4 rounded-md transition-all duration-300 ${
                selectedChapter === (chapters as Chapter[]).length
                  ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
                  : 'bg-golden-amber/10 text-golden-amber border border-golden-amber/30 hover:bg-golden-amber/20'
              }`}
            >
              <span>Próx. Cap.</span>
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}