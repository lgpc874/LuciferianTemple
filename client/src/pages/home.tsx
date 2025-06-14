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
      <PageTransition className="min-h-screen bg-background">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-cinzel text-golden-amber tracking-wider mb-2">
              ⸸ TEMPLO DO ABISMO ⸸
            </h1>
            <p className="text-xs sm:text-sm text-ritualistic-beige/70 max-w-xl mx-auto px-4">
              Onde as sombras revelam seus segredos milenares
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-card/20 backdrop-blur-sm rounded-lg border border-burned-amber p-6 sm:p-8 mb-8 sm:mb-12">
            <div className="max-w-4xl mx-auto">
              
              <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-golden-amber mb-6 sm:mb-8 text-center tracking-wide">
                O DESPERTAR DAS SOMBRAS
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