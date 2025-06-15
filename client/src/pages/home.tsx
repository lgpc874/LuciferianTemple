import { useState, useEffect } from "react";
import WarningOverlay from "@/components/warning-overlay";
import ContentProtection from "@/components/content-protection";
import { PageTransition } from "@/components/page-transition";
import MysticalFooter from "@/components/mystical-footer";

export default function Home() {
  const [showWarning, setShowWarning] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já passou pelo warning antes
    const hasSeenWarning = localStorage.getItem('templo-veil-torn');
    if (!hasSeenWarning) {
      setShowWarning(true);
    }
  }, []);

  const handleTearVeil = () => {
    setIsTransitioning(true);
    
    // Marca que o usuário já passou pelo warning
    localStorage.setItem('templo-veil-torn', 'true');
    
    setTimeout(() => {
      setShowWarning(false);
      setIsTransitioning(false);
    }, 1000);
  };

  if (showWarning) {
    return (
      <div className="min-h-screen relative overflow-x-hidden">
        <WarningOverlay 
          onTearVeil={handleTearVeil}
          isTransitioning={isTransitioning}
        />
      </div>
    );
  }

  return (
    <ContentProtection enableScreenshotProtection={true}>
      <PageTransition className="min-h-screen bg-transparent">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <img 
                src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
                alt="Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
                style={{ filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7462%) hue-rotate(5deg) brightness(92%) contrast(120%)' }}
              />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-cinzel text-golden-amber tracking-wider">
                TEMPLO DO ABISMO
              </h1>
              <img 
                src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
                alt="Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
                style={{ filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7462%) hue-rotate(5deg) brightness(92%) contrast(120%)' }}
              />
            </div>
            <p className="text-xs sm:text-sm text-ritualistic-beige/70 max-w-xl mx-auto px-4">
              Onde as sombras revelam seus segredos milenares
            </p>
          </div>

          {/* Main Content Card */}
          <div className="floating-container rounded-lg p-6 sm:p-8 mb-8 sm:mb-12 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="max-w-4xl mx-auto">
              
              <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-golden-amber mb-6 sm:mb-8 text-center tracking-wide">
                <span className="text-blood-red">⧨</span> O DESPERTAR DAS SOMBRAS <span className="text-blood-red">⧨</span>
              </h2>
              
              <div className="text-center mb-6 sm:mb-8">
                <blockquote className="font-fell text-blood-red text-base sm:text-lg md:text-xl leading-relaxed border-l-2 sm:border-l-4 border-golden-amber pl-4 sm:pl-6 text-left mb-6">
                  "Nas profundezas do silêncio eterno, onde as sombras guardam segredos milenares,
                  apenas os verdadeiramente preparados ousam despertar aquilo que jamais deveria ter adormecido."
                </blockquote>
                
                <p className="font-garamond text-ritualistic-beige text-sm sm:text-base leading-relaxed mb-4">
                  Existe uma força ancestral que pulsa além dos véus da realidade comum. 
                  Aqui, onde o tempo se curva e as dimensões sussurram seus segredos mais profundos,
                  apenas os que possuem coragem verdadeira ousam trilhar este caminho sem retorno.
                </p>
                
                <div className="bg-gradient-to-b from-black/40 to-transparent p-4 sm:p-6 rounded-lg border border-golden-amber/30">
                  <p className="font-garamond text-ancient-golden text-sm sm:text-base tracking-wider mb-3">
                    "Os antigos sabiam que existem dimensões além do véu da percepção comum..."
                  </p>
                  <p className="font-fell text-blood-red text-xs sm:text-sm italic">
                    Você está preparado para descobrir o que eles tentaram ocultar?
                  </p>
                </div>
              </div>
              
              {/* Latin Quote */}
              <div className="border-t border-burned-amber pt-6 sm:pt-8 text-center">
                <p className="font-cardo text-ancient-golden tracking-[0.3em] text-base sm:text-lg mb-2">
                  "TENEBRAE LUMEN FACIT"
                </p>
                <p className="font-garamond text-ritualistic-beige text-xs sm:text-sm opacity-80 italic">
                  As trevas criam a luz
                </p>
              </div>
              
            </div>
          </div>
          
          <MysticalFooter />
        </div>
      </PageTransition>
    </ContentProtection>
  );
}