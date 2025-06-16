import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { PageTransition } from "@/components/page-transition";
import ContentProtection from "@/components/content-protection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import type { Grimoire } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function SmartGrimoireReader() {
  const [, params] = useRoute("/grimoire/:id");
  const [, setLocation] = useLocation();
  
  // Estados do leitor
  const [scrollPosition, setScrollPosition] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error' | null>(null);

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
    mutationFn: async (data: { grimoireId: number; scrollPosition: number; readingTimeMinutes: number }) => {
      return apiRequest("/api/progress", {
        method: "POST",
        body: JSON.stringify({
          user_id: 1, // será obtido do contexto de auth
          grimoire_id: data.grimoireId,
          current_page: 1, // sempre 1 para scroll contínuo
          total_pages: 1,
          reading_time_minutes: data.readingTimeMinutes,
          last_read_at: new Date()
        }),
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

  // Timer de leitura
  useEffect(() => {
    if (!grimoire) return;

    const timer = setInterval(() => {
      setReadingTime(prev => {
        const newTime = prev + 1;
        
        // Auto-save a cada 30 segundos
        if (newTime % 30 === 0) {
          saveProgressMutation.mutate({
            grimoireId: grimoire.id,
            scrollPosition,
            readingTimeMinutes: Math.floor(newTime / 60)
          });
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [grimoire, scrollPosition]);

  // Detectar scroll para salvar posição
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Salvar posição no localStorage
      if (grimoireId) {
        localStorage.setItem(`grimoire_${grimoireId}_scroll`, position.toString());
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [grimoireId]);

  // Restaurar posição de scroll
  useEffect(() => {
    if (grimoireId && grimoire) {
      const savedPosition = localStorage.getItem(`grimoire_${grimoireId}_scroll`);
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition));
        }, 100);
      }
    }
  }, [grimoireId, grimoire]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        window.scrollBy(0, -window.innerHeight * 0.8);
      } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        window.scrollBy(0, window.innerHeight * 0.8);
      } else if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo(0, 0);
      } else if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo(0, document.body.scrollHeight);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Funções de navegação
  const scrollUp = () => {
    window.scrollBy({
      top: -window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (grimoireLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-amber-500 animate-pulse mx-auto mb-4" />
            <p className="text-gray-300">Carregando grimório...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!grimoire) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-300 mb-4">Grimório não encontrado</p>
            <Button onClick={() => setLocation('/biblioteca')} variant="outline">
              Voltar à Biblioteca
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <ContentProtection>
        <div className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black">
          
          {/* Header fixo */}
          <div className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-b border-amber-500/20 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
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
                <h1 className="text-amber-500 font-bold text-lg md:text-xl truncate">
                  {grimoire.title}
                </h1>
                {saveStatus && (
                  <div className={`text-xs ${
                    saveStatus === 'saving' ? 'text-blue-400' : 
                    saveStatus === 'saved' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {saveStatus === 'saving' && 'Salvando...'}
                    {saveStatus === 'saved' && '✓ Salvo'}
                    {saveStatus === 'error' && '⚠ Erro ao salvar'}
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10"
              >
                <BookOpen className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="pt-20 pb-20">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black/40 backdrop-blur-sm border border-amber-500/20 rounded-lg p-6 md:p-8 shadow-2xl"
              >
                {/* Renderização completa do HTML sem modificações */}
                <div
                  className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-amber-500 
                    prose-p:text-gray-200 prose-p:leading-relaxed
                    prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-amber-300
                    prose-em:text-gray-300
                    prose-blockquote:border-l-amber-500 prose-blockquote:text-gray-300
                    prose-ul:text-gray-200 prose-ol:text-gray-200
                    prose-li:text-gray-200
                    prose-code:text-amber-300 prose-code:bg-black/40
                    prose-pre:bg-black/60 prose-pre:border prose-pre:border-amber-500/20"
                  dangerouslySetInnerHTML={{ __html: grimoire.content || '' }}
                  style={{
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    fontFamily: 'inherit'
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Controles de navegação fixos */}
          <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-amber-500/20 p-4 z-50">
            <div className="max-w-md mx-auto flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={scrollUp}
                className="text-amber-500 border-amber-500/30 hover:bg-amber-500/10"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>
              
              <div className="text-sm text-gray-400 text-center min-w-[100px]">
                Leitura contínua
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={scrollDown}
                className="text-amber-500 border-amber-500/30 hover:bg-amber-500/10"
              >
                Próxima
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </ContentProtection>
    </PageTransition>
  );
}