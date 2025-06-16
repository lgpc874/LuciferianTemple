import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { PageTransition } from "@/components/page-transition";
import ContentProtection from "@/components/content-protection";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen,
  Settings,
  RotateCcw
} from "lucide-react";
import type { Grimoire } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useIsMobile } from "@/hooks/use-mobile";

interface ReaderSettings {
  fontSize: number;
  lineHeight: number;
  wordsPerPage: number;
  margin: number;
}

interface Page {
  content: string;
  pageNumber: number;
  wordCount: number;
  characterCount: number;
}

export default function SmartGrimoireReader() {
  const [, params] = useRoute("/grimoire/:id");
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  
  // Estados do leitor
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<Page[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error' | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  // Configurações do leitor
  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: isMobile ? 14 : 16,
    lineHeight: 1.6,
    wordsPerPage: isMobile ? 200 : 350,
    margin: isMobile ? 16 : 24,
  });

  // Refs para medição
  const measureRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const grimoireId = params?.id ? parseInt(params.id) : null;

  // Buscar grimório
  const { data: grimoire, isLoading: grimoireLoading } = useQuery<Grimoire>({
    queryKey: [`/api/grimoires/${grimoireId}`],
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
      return apiRequest("/api/progress", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onMutate: () => setSaveStatus('saving'),
    onSuccess: () => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    },
    onError: () => {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    },
  });

  // Função para processar conteúdo em páginas inteligentes
  const processContentIntoPages = useCallback((content: string): Page[] => {
    if (!content) return [];
    
    setIsProcessing(true);
    
    // Preservar HTML completamente sem alterações
    const cleanContent = content.trim();

    // Função para contar palavras ignorando tags HTML mas preservando todo o HTML
    const countWordsInHTML = (htmlString: string): number => {
      // Remover tags HTML temporariamente apenas para contagem
      const textOnly = htmlString.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      return textOnly ? textOnly.split(' ').filter(word => word.length > 0).length : 0;
    };

    // Função melhorada para dividir HTML preservando TODA a estrutura
    const splitHTMLByWords = (htmlContent: string, maxWords: number): string[] => {
      const totalWords = countWordsInHTML(htmlContent);
      
      // Se o conteúdo é pequeno, retorna como uma página
      if (totalWords <= maxWords) {
        return [htmlContent];
      }

      // Dividir por parágrafos principais mas preservar tudo
      const paragraphs = htmlContent.split(/(<\/?(p|div|h[1-6]|blockquote)[^>]*>)/gi);
      
      const pages: string[] = [];
      let currentPage = '';
      let currentWords = 0;
      
      for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        const paragraphWords = countWordsInHTML(paragraph);
        
        // Se adicionar este parágrafo excede o limite e já temos conteúdo
        if (currentWords + paragraphWords > maxWords && currentPage.trim()) {
          pages.push(currentPage);
          currentPage = paragraph;
          currentWords = paragraphWords;
        } else {
          currentPage += paragraph;
          currentWords += paragraphWords;
        }
      }
      
      // Adicionar última página
      if (currentPage.trim()) {
        pages.push(currentPage);
      }
      
      // Se ainda há páginas muito grandes, dividir por sentenças
      const finalPages: string[] = [];
      
      for (const page of pages) {
        const pageWords = countWordsInHTML(page);
        
        if (pageWords > maxWords * 1.3) {
          // Dividir por quebras naturais (pontos, <br>, etc.)
          const sentences = page.split(/(\.|<br\s*\/?>|<\/p>|<\/div>)/gi);
          
          let currentSentencePage = '';
          let sentenceWords = 0;
          
          for (const sentence of sentences) {
            const sentenceWordCount = countWordsInHTML(sentence);
            
            if (sentenceWords + sentenceWordCount > maxWords && currentSentencePage.trim()) {
              finalPages.push(currentSentencePage);
              currentSentencePage = sentence;
              sentenceWords = sentenceWordCount;
            } else {
              currentSentencePage += sentence;
              sentenceWords += sentenceWordCount;
            }
          }
          
          if (currentSentencePage.trim()) {
            finalPages.push(currentSentencePage);
          }
        } else {
          finalPages.push(page);
        }
      }
      
      return finalPages.filter(page => page.trim().length > 0);
    };

    // Processar o conteúdo mantendo TODO o HTML
    const contentPages = splitHTMLByWords(cleanContent, settings.wordsPerPage);
    
    const newPages: Page[] = contentPages.map((pageContent, index) => ({
      content: pageContent,
      pageNumber: index + 1,
      wordCount: countWordsInHTML(pageContent),
      characterCount: pageContent.length
    }));

    setIsProcessing(false);
    
    // Log detalhado para debug
    console.log(`📖 Páginas criadas: ${newPages.length}`);
    console.log(`📄 Conteúdo original: ${cleanContent.length} caracteres`);
    console.log(`🔤 Palavras totais: ${countWordsInHTML(cleanContent)}`);
    
    newPages.forEach((page, index) => {
      console.log(`Página ${page.pageNumber}: ${page.wordCount} palavras, ${page.characterCount} caracteres`);
      if (index === 0) {
        console.log(`📝 Preview da primeira página:`, page.content.substring(0, 200) + '...');
      }
    });
    
    return newPages;
  }, [settings.wordsPerPage]);

  // Processar conteúdo quando grimório carrega ou configurações mudam
  useEffect(() => {
    if (grimoire?.content) {
      const processedPages = processContentIntoPages(grimoire.content);
      setPages(processedPages);
      
      // Restaurar página do progresso salvo (localStorage por enquanto)
      const savedProgress = localStorage.getItem(`grimoire_${grimoireId}_progress`);
      if (savedProgress) {
        try {
          const progress = JSON.parse(savedProgress);
          setCurrentPage(progress.currentPage || 1);
          setReadingTime(progress.readingTime || 0);
        } catch (e) {
          console.warn('Erro ao carregar progresso salvo:', e);
        }
      }
    }
  }, [grimoire?.content, processContentIntoPages, userProgress, grimoireId]);

  // Ajustar configurações baseado no dispositivo
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      fontSize: isMobile ? 14 : 16,
      wordsPerPage: isMobile ? 200 : 350,
      margin: isMobile ? 16 : 24,
    }));
  }, [isMobile]);

  // Salvar progresso automaticamente (temporariamente desabilitado)
  useEffect(() => {
    if (grimoireId && pages.length > 0) {
      // Progresso salvo localmente por enquanto
      localStorage.setItem(`grimoire_${grimoireId}_progress`, JSON.stringify({
        currentPage,
        totalPages: pages.length,
        readingTime: Math.floor(readingTime)
      }));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 1000);
    }
  }, [currentPage, pages.length, grimoireId, readingTime]);

  // Controle de tempo de leitura
  useEffect(() => {
    const timer = setInterval(() => {
      setReadingTime(prev => prev + 1/60); // Incrementa em minutos
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else if (e.key === 'ArrowRight' && currentPage < pages.length) {
        setCurrentPage(prev => prev + 1);
      } else if (e.key === 'Escape') {
        setLocation('/biblioteca');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, pages.length, setLocation]);

  // Navegação por clique nas laterais
  const handlePageClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const centerX = rect.width / 2;
    
    if (clickX < centerX / 2 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (clickX > centerX * 1.5 && currentPage < pages.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const currentPageData = pages[currentPage - 1];

  if (grimoireLoading || !grimoire) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-black flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-amber-500 animate-pulse mx-auto mb-4" />
            <p className="text-gray-300">Carregando grimório...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <ContentProtection>
        <div className="smart-grimoire-reader relative">
          
          {/* Header fixo */}
          <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-b border-amber-500/20 z-50">
            <div className="flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation('/biblioteca')}
                className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Biblioteca
              </Button>
              
              <div className="text-center flex-1 mx-4">
                <h1 className="grimoire-header-title text-amber-500 font-bold truncate">
                  {grimoire.title}
                </h1>
                <div className="text-xs text-gray-400 flex items-center justify-center gap-4">
                  <span>Página {currentPage} de {pages.length}</span>
                  {saveStatus && (
                    <span className={`
                      ${saveStatus === 'saving' ? 'text-blue-400' : ''}
                      ${saveStatus === 'saved' ? 'text-green-400' : ''}
                      ${saveStatus === 'error' ? 'text-red-400' : ''}
                    `}>
                      {saveStatus === 'saving' && 'Salvando...'}
                      {saveStatus === 'saved' && '✓ Salvo'}
                      {saveStatus === 'error' && '⚠ Erro'}
                    </span>
                  )}
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Painel de configurações */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                className="fixed top-16 right-4 bg-black/90 backdrop-blur-sm border border-amber-500/30 rounded-lg p-4 z-40 w-72"
              >
                <h3 className="text-amber-500 font-semibold mb-3">Configurações de Leitura</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">
                      Tamanho da Fonte: {settings.fontSize}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={settings.fontSize}
                      onChange={(e) => setSettings(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">
                      Palavras por Página: {settings.wordsPerPage}
                    </label>
                    <input
                      type="range"
                      min="150"
                      max="500"
                      step="25"
                      value={settings.wordsPerPage}
                      onChange={(e) => setSettings(prev => ({ ...prev, wordsPerPage: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-300 block mb-1">
                      Altura da Linha: {settings.lineHeight}
                    </label>
                    <input
                      type="range"
                      min="1.2"
                      max="2.0"
                      step="0.1"
                      value={settings.lineHeight}
                      onChange={(e) => setSettings(prev => ({ ...prev, lineHeight: parseFloat(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSettings({
                        fontSize: isMobile ? 14 : 16,
                        lineHeight: 1.6,
                        wordsPerPage: isMobile ? 200 : 350,
                        margin: isMobile ? 16 : 24,
                      });
                    }}
                    className="w-full text-amber-500 border-amber-500/30 hover:bg-amber-500/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restaurar Padrão
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Área de leitura */}
          <div className="pt-20 pb-20 px-4 flex items-center justify-center min-h-screen">
            <div 
              ref={containerRef}
              className="relative max-w-4xl w-full mx-auto"
              onClick={handlePageClick}
            >
              
              {/* Indicadores de navegação */}
              <div className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10">
                {currentPage > 1 && (
                  <ChevronLeft className="w-8 h-8 text-amber-500/70" />
                )}
              </div>
              
              <div className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10">
                {currentPage < pages.length && (
                  <ChevronRight className="w-8 h-8 text-amber-500/70" />
                )}
              </div>

              {/* Conteúdo da página */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg shadow-2xl"
                  style={{
                    padding: `${settings.margin}px`,
                    minHeight: isMobile ? '70vh' : '80vh',
                  }}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <BookOpen className="w-8 h-8 text-amber-500 animate-pulse mx-auto mb-2" />
                        <p className="text-gray-300">Processando páginas...</p>
                      </div>
                    </div>
                  ) : currentPageData ? (
                    <div
                      className="grimoire-content text-gray-200 leading-relaxed w-full"
                      style={{
                        fontSize: `${settings.fontSize}px`,
                        lineHeight: settings.lineHeight,
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                      }}
                    >
                      <div 
                        dangerouslySetInnerHTML={{ __html: currentPageData.content }}
                        style={{
                          width: '100%',
                          maxWidth: '100%',
                          // Garantir que estilos inline funcionem
                          colorScheme: 'initial',
                          all: 'initial',
                          fontFamily: 'initial',
                          fontSize: 'initial',
                          color: 'initial',
                          lineHeight: 'initial',
                          display: 'block'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-400">Conteúdo não encontrado</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controles de navegação fixos */}
          <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-amber-500/20 p-4">
            <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage <= 1}
                className="text-amber-500 border-amber-500/30 hover:bg-amber-500/10 disabled:text-gray-600 disabled:border-gray-600"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>
              
              <div className="text-sm text-gray-400 min-w-[100px] text-center">
                {currentPage} / {pages.length}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(pages.length, prev + 1))}
                disabled={currentPage >= pages.length}
                className="text-amber-500 border-amber-500/30 hover:bg-amber-500/10 disabled:text-gray-600 disabled:border-gray-600"
              >
                Próxima
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Elemento para medição (oculto) */}
          <div
            ref={measureRef}
            className="absolute top-0 left-0 opacity-0 pointer-events-none overflow-hidden"
            style={{
              width: isMobile ? '85vw' : '800px',
              height: isMobile ? '70vh' : '600px',
              fontSize: `${settings.fontSize}px`,
              lineHeight: settings.lineHeight,
              padding: `${settings.margin}px`,
            }}
          />
        </div>
      </ContentProtection>
    </PageTransition>
  );
}