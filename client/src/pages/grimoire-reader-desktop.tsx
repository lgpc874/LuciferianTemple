import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { PageTransition } from '@/components/page-transition';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ContentProtection from '@/components/content-protection';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Clock, 
  Target,
  ArrowLeft,
  Menu,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function GrimoireReaderDesktop({ grimoireId }: { grimoireId: number }) {
  const { user, isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch grimoire data
  const { data: grimoire, isLoading: loadingGrimoire } = useQuery({
    queryKey: [`/api/grimoires/${grimoireId}`],
    enabled: !!grimoireId
  });

  const { data: chapters, isLoading: loadingChapters } = useQuery({
    queryKey: [`/api/grimoires/${grimoireId}/chapters`],
    enabled: !!grimoireId
  });

  const currentChapter = (chapters as Chapter[])?.find((ch: Chapter) => ch.chapterOrder === selectedChapter);

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const element = contentRef.current;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight - element.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [currentChapter]);

  // Navigate between chapters
  const navigateChapter = (direction: 'prev' | 'next') => {
    const totalChapters = chapters?.length || 0;
    if (direction === 'prev' && selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    } else if (direction === 'next' && selectedChapter < totalChapters) {
      setSelectedChapter(selectedChapter + 1);
    }
  };

  if (!isAuthenticated) {
    return (
      <PageTransition className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <BookOpen className="w-12 h-12 mx-auto text-golden-amber mb-4" />
            <h2 className="text-xl font-semibold text-golden-amber mb-2">Acesso Restrito</h2>
            <p className="text-muted-foreground">
              Faça login para acessar este grimório.
            </p>
          </CardContent>
        </Card>
      </PageTransition>
    );
  }

  if (loadingGrimoire || loadingChapters) {
    return (
      <PageTransition className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden-amber mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando grimório...</p>
        </div>
      </PageTransition>
    );
  }

  if (isMobile) {
    // Mobile version uses the original Kindle-style reader
    return null; // This component is only for desktop
  }

  return (
    <ContentProtection enableScreenshotProtection>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-golden-amber/20 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="text-golden-amber hover:bg-golden-amber/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar à Biblioteca
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSidebar(!showSidebar)}
                className="text-golden-amber hover:bg-golden-amber/10"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-center">
              <h1 className="font-cinzel text-lg font-semibold text-golden-amber">
                {grimoire?.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                Capítulo {selectedChapter} de {chapters?.length || 0}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Progress value={readingProgress} className="w-32" />
              <span className="text-sm text-muted-foreground">
                {Math.round(readingProgress)}%
              </span>
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-80px)]">
          {/* Sidebar with chapter list */}
          <AnimatePresence>
            {showSidebar && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-r border-golden-amber/20 bg-card/50 overflow-hidden"
              >
                <div className="p-4 border-b border-golden-amber/20">
                  <h2 className="font-cinzel text-base font-semibold text-golden-amber">
                    Índice
                  </h2>
                </div>
                
                <div className="overflow-y-auto h-full">
                  {chapters?.map((chapter: Chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => setSelectedChapter(chapter.chapterOrder)}
                      className={`
                        w-full p-4 text-left hover:bg-golden-amber/5 transition-colors border-b border-golden-amber/10
                        ${selectedChapter === chapter.chapterOrder ? 'bg-golden-amber/10 border-l-2 border-l-golden-amber' : ''}
                      `}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-golden-amber font-medium">
                            Cap. {chapter.chapterOrder}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {chapter.estimatedReadingTime}min
                          </div>
                        </div>
                        <h3 className="font-medium text-sm leading-tight">
                          {chapter.title}
                        </h3>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main reading area */}
          <main className="flex-1 flex flex-col">
            {/* Chapter header */}
            <div className="p-6 border-b border-golden-amber/20 bg-card/30">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-golden-amber font-medium">
                    Capítulo {currentChapter?.chapterOrder}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {currentChapter?.estimatedReadingTime} min de leitura
                  </div>
                </div>
                <h1 className="font-cinzel text-2xl font-bold text-golden-amber mb-2">
                  {currentChapter?.title}
                </h1>
              </div>
            </div>

            {/* Reading content */}
            <div 
              ref={contentRef}
              className="flex-1 overflow-y-auto px-6 py-8"
            >
              <div className="max-w-4xl mx-auto">
                <div 
                  className="prose prose-lg prose-invert max-w-none
                    prose-headings:font-cinzel prose-headings:text-golden-amber
                    prose-p:text-base prose-p:leading-relaxed prose-p:text-foreground/90
                    prose-strong:text-golden-amber prose-em:text-golden-amber/80
                    prose-blockquote:border-l-golden-amber prose-blockquote:text-golden-amber/80
                    prose-li:text-foreground/90"
                  dangerouslySetInnerHTML={{ 
                    __html: currentChapter?.content || '<p>Carregando conteúdo...</p>' 
                  }}
                />
              </div>
            </div>

            {/* Navigation footer */}
            <footer className="border-t border-golden-amber/20 bg-card/30">
              <div className="max-w-4xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => navigateChapter('prev')}
                    disabled={selectedChapter <= 1}
                    className="text-golden-amber border-golden-amber/30 hover:bg-golden-amber/10"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Página {selectedChapter} de {chapters?.length || 0}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => navigateChapter('next')}
                    disabled={selectedChapter >= (chapters?.length || 0)}
                    className="text-golden-amber border-golden-amber/30 hover:bg-golden-amber/10"
                  >
                    Próximo
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </ContentProtection>
  );
}