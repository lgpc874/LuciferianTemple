import { grimoireCoverSvgs } from "../components/grimoire-covers";
import { useAuth } from "../hooks/use-auth";
import { useLocation } from "wouter";
import { PageTransition } from "@/components/page-transition";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import AuthForm from "../components/auth-form";

export default function Biblioteca() {
  const { isAuthenticated, user, login, logout, token } = useAuth();
  const [, setLocation] = useLocation();
  
  // Fetch user progress for all grimoires
  const { data: allProgress = [] } = useQuery({
    queryKey: ['/api/progress'],
    enabled: !!token && isAuthenticated
  });

  // Fetch grimoires from database
  const { data: grimoires = [], isLoading: loadingGrimoires } = useQuery({
    queryKey: ['/api/grimoires'],
    enabled: !!token && isAuthenticated
  });

  const getDifficultyText = (level: number) => {
    switch (level) {
      case 1: return "Iniciante";
      case 2: return "Intermediário";
      case 3: return "Avançado";
      case 4: return "Mestre";
      default: return "Desconhecido";
    }
  };

  // Se não estiver autenticado, mostrar tela de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen mystical-bg pt-24 fade-in">
        <div className="relative py-16 bg-gradient-to-b from-red-950/20 to-transparent">
          <div className="relative text-center">
            <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-golden-amber mb-6 tracking-wider biblioteca-title">
              ⸸ ACESSO RESTRITO ⸸
            </h1>
            <div className="w-32 h-1 bg-golden-amber mx-auto mb-6"></div>
            <p className="font-garamond text-xl text-ritualistic-beige max-w-3xl mx-auto leading-relaxed px-4 italic mb-8 biblioteca-subtitle">
              Os segredos da Bibliotheca Arcana são reservados apenas aos que já têm seu nome registrado no abismo.
              Identifique-se para adentrar os corredores do conhecimento proibido.
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4">
          <div className="content-section border border-golden-amber/50 rounded-xl p-8">
            <div className="text-center mb-6">
              <h2 className="font-cinzel text-2xl text-golden-amber mb-2">
                Portal dos Iniciados
              </h2>
              <p className="font-garamond text-ritualistic-beige text-sm">
                Faça login ou registre-se para acessar a biblioteca
              </p>
            </div>
            
            <AuthForm onSuccess={(token, userData) => {
              login(token, userData);
            }} />
          </div>

          <div className="text-center mt-8">
            <a href="/bibliotheca-arcana">
              <button className="veil-button bg-gradient-to-r from-ritualistic-beige/10 to-ritualistic-beige/5 hover:from-ritualistic-beige/20 hover:to-ritualistic-beige/10 text-ritualistic-beige font-cinzel py-3 px-6 rounded-lg transition-all duration-300 border border-ritualistic-beige/50 hover:border-golden-amber/50 hover:text-golden-amber tracking-wide">
                ← Voltar ao Portal Principal
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loadingGrimoires) {
    return (
      <PageTransition className="min-h-screen mystical-bg pt-24 fade-in">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden-amber mx-auto mb-4"></div>
          <p className="text-ritualistic-beige">Carregando biblioteca...</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen mystical-bg pt-24 fade-in">
      {/* Header da biblioteca */}
      <div className="relative py-16 bg-gradient-to-b from-red-950/20 to-transparent">
        <div className="relative text-center">
          <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-golden-amber mb-6 tracking-wider biblioteca-title">
            ⸸ BIBLIOTHECA ARCANA ⸸
          </h1>
          <div className="w-32 h-1 bg-golden-amber mx-auto mb-6"></div>
          
          {user && (
            <div className="mb-8">
              <p className="font-garamond text-lg text-ritualistic-beige px-4">
                Bem-vindo de volta, <span className="text-golden-amber font-semibold">{user.username}</span>
                {user.username === 'admin' && (
                  <span className="text-burned-amber ml-2">[Administrador]</span>
                )}
              </p>
            </div>
          )}
          
          <p className="font-garamond text-xl text-ritualistic-beige max-w-4xl mx-auto leading-relaxed px-4 italic biblioteca-subtitle">
            Nos corredores sombrios desta biblioteca digital repousam os grimórios ancestrais,
            cada um guardando fragmentos da sabedoria proibida. Escolha seu caminho com prudência,
            pois cada página virada é um passo mais profundo nas trevas da gnose.
          </p>
        </div>
      </div>

      {/* Seções da biblioteca */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Seção: Ensinamentos Públicos */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-3xl md:text-4xl text-golden-amber mb-4 tracking-wider">
              ⸸ ENSINAMENTOS PÚBLICOS ⸸
            </h2>
            <div className="w-24 h-0.5 bg-golden-amber mx-auto mb-4"></div>
            <p className="font-garamond text-ritualistic-beige text-lg italic max-w-2xl mx-auto">
              Conhecimentos fundamentais para todos os buscadores da verdade
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
            {Array.isArray(grimoires) && grimoires.map((grimoire: any) => {
              // Map grimoire categories to available SVG covers
              const getCoverSvgKey = (category: string, title: string) => {
                const categoryLower = category?.toLowerCase() || '';
                const titleLower = title?.toLowerCase() || '';
                
                // Map based on category or title keywords
                if (categoryLower.includes('introducao') || titleLower.includes('introdução')) {
                  return 'introducao-ocultismo';
                } else if (categoryLower.includes('lucifer') || titleLower.includes('lúcifer')) {
                  return 'lucifer-luz-negra';
                } else if (categoryLower.includes('lilith') || titleLower.includes('lilith')) {
                  return 'lilith-sombra-feminina';
                } else if (categoryLower.includes('simbolismo') || titleLower.includes('símbolo')) {
                  return 'simbolismo-sigilos';
                } else if (categoryLower.includes('magia') || titleLower.includes('magia')) {
                  return 'magia-luciferiana';
                } else {
                  return 'introducao-ocultismo'; // fallback
                }
              };
              
              const coverKey = getCoverSvgKey(grimoire.category, grimoire.title);
              const coverSvg = grimoireCoverSvgs[coverKey as keyof typeof grimoireCoverSvgs];
              
              // Check if user has progress in this grimoire
              const grimoireProgress = Array.isArray(allProgress) ? 
                allProgress.filter((p: any) => p.grimoireId === grimoire.id && p.progressType === 'reading') : [];
              
              const hasProgress = grimoireProgress.length > 0;
              const latestProgress = hasProgress ? 
                grimoireProgress.sort((a: any, b: any) => new Date(b.completedAt || b.createdAt).getTime() - new Date(a.completedAt || a.createdAt).getTime())[0] : null;
              
              // Determine reading status and card style
              let statusText = "LER";
              let statusColor = "text-golden-amber";
              let cardBorderColor = "border-burned-amber/50 hover:border-golden-amber/70";
              let statusBg = "bg-golden-amber/10";
              
              // If it's a paid grimoire, show price and change styling
              if (grimoire.isPaid && grimoire.price) {
                statusText = `R$ ${grimoire.price}`;
                statusColor = "text-emerald-300";
                cardBorderColor = "border-emerald-500/50 hover:border-emerald-400/70";
                statusBg = "bg-emerald-500/10";
              }
              
              if (hasProgress) {
                // Check if completed (this would need completion logic)
                const isCompleted = false; // TODO: implement completion checking
                
                if (isCompleted) {
                  statusText = "LIDO";
                  statusColor = "text-green-300";
                  cardBorderColor = "border-green-500/50 hover:border-green-400/70";
                  statusBg = "bg-green-500/10";
                } else {
                  statusText = "CONTINUAR";
                  statusColor = "text-blue-300";
                  cardBorderColor = "border-blue-500/50 hover:border-blue-400/70";
                  statusBg = "bg-blue-500/10";
                }
              }
              
              return (
                <motion.div
                  key={grimoire.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setLocation(`/grimoire/${grimoire.id}`);
                  }}
                  className={`group relative content-section ${cardBorderColor} rounded-lg overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-current/10 cursor-pointer grimoire-card`}
                >
                  {/* Capa do grimório */}
                  <div className="aspect-[4/5] p-3 sm:p-4 bg-gradient-to-br from-dark-brown to-very-dark-brown">
                    <div className="w-full h-full rounded-md overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      {coverSvg}
                    </div>
                  </div>

                  {/* Status overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <div className={`${statusBg} backdrop-blur-sm border ${statusColor.replace('text-', 'border-').replace('300', '400/50')} rounded-md py-2 px-3 text-center transition-all duration-300 group-hover:${statusBg.replace('/10', '/20')}`}>
                      <span className={`${statusColor} font-cinzel text-xs sm:text-sm font-semibold tracking-wide`}>
                        {statusText}
                      </span>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  {hasProgress && (
                    <div className="absolute top-2 right-2">
                      <div className={`w-3 h-3 ${statusText === "LIDO" ? "bg-green-400" : "bg-blue-400"} rounded-full shadow-lg animate-pulse`}></div>
                    </div>
                  )}

                  {/* Efeito de hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-current/0 via-transparent to-current/0 group-hover:from-current/5 group-hover:to-current/5 transition-all duration-500 pointer-events-none"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Placeholder para futuras seções */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-3xl md:text-4xl text-burned-amber/40 mb-4 tracking-wider">
              ⸸ SEÇÕES FUTURAS ⸸
            </h2>
            <div className="w-24 h-0.5 bg-burned-amber/40 mx-auto mb-4"></div>
            <p className="font-garamond text-burned-amber/60 text-lg italic max-w-2xl mx-auto">
              Novos conhecimentos serão revelados em breve...
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={`placeholder-${i}`}
                className="content-section border border-burned-amber/20 rounded-lg overflow-hidden opacity-40"
              >
                <div className="aspect-[4/5] p-3 sm:p-4 bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="w-full h-full rounded-md bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <span className="font-cinzel text-xs text-gray-500">
                      Em Breve
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}