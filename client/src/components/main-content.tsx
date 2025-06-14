import MysticalFooter from "./mystical-footer";
import UserMenu from "./user-menu";
import { useAuth } from "@/hooks/use-auth";

export default function MainContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen fade-in">
      {/* Header with Inverted Cross Title */}
      <header className="relative py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Title with Inverted Crosses */}
          <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-golden-amber mb-8 sm:mb-12 tracking-wider px-2 relative">
            <span className="text-blood-red mr-4 sm:mr-6 transform rotate-180 inline-block">†</span>
            TEMPLO DO ABISMO
            <span className="text-blood-red ml-4 sm:ml-6 transform rotate-180 inline-block">†</span>
          </h1>
          
          {/* Mysterious Quote */}
          <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4">
            <blockquote className="font-fell text-blood-red text-lg sm:text-xl md:text-2xl leading-relaxed border-l-2 sm:border-l-4 border-golden-amber pl-4 sm:pl-6 text-left">
              "Nas profundezas do silêncio eterno, 
              onde as sombras guardam segredos milenares,
              apenas os verdadeiramente preparados ousam despertar 
              aquilo que jamais deveria ter adormecido."
            </blockquote>
          </div>
        </div>
      </header>

      {/* Main Content Section - The Awakening */}
      <section className="content-section rounded-lg border border-burned-amber mb-8 sm:mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl text-golden-amber mb-8 sm:mb-12 text-center px-4 tracking-wide">
            O DESPERTAR DAS SOMBRAS
          </h2>
          
          <div className="text-center mb-8 sm:mb-12 px-4">
            <p className="font-garamond text-ritualistic-beige text-lg sm:text-xl leading-relaxed mb-6 sm:mb-8">
              Existe uma força ancestral que pulsa além dos véus da realidade comum. 
              Aqui, onde o tempo se curva e as dimensões sussurram seus segredos mais profundos,
              apenas os que possuem coragem verdadeira ousam trilhar este caminho sem retorno.
            </p>
            
            <div className="font-fell text-blood-red text-base sm:text-lg italic mb-8 sm:mb-10 px-2 bg-black/20 py-4 border-l-4 border-golden-amber">
              "Há poderes que habitam nas trevas desde antes da primeira luz...
              <br />Forças que aguardam o chamado daqueles que compreendem
              <br />que o verdadeiro conhecimento não pode ser simplesmente lido,
              <br />mas deve ser <em>experienciado</em> nas profundezas da alma."
            </div>
            
            <p className="font-cormorant text-soft-amber text-lg sm:text-xl italic leading-relaxed px-2 mb-6">
              Este não é um caminho para os fracos de espírito.
              <br />O que você descobrirá aqui irá transformá-lo de maneiras inimagináveis.
              <br />Pois algumas verdades, uma vez reveladas, jamais podem ser esquecidas.
            </p>

            <div className="bg-gradient-to-b from-black/40 to-transparent p-6 sm:p-8 rounded-lg border border-golden-amber/30">
              <p className="font-garamond text-ancient-golden text-base sm:text-lg tracking-wider mb-4">
                "Os antigos sabiam que existem dimensões além do véu da percepção comum..."
              </p>
              <p className="font-fell text-blood-red text-sm sm:text-base italic">
                Você está preparado para descobrir o que eles tentaram ocultar?
              </p>
            </div>
          </div>
          
          {/* Mystical Invitation */}
          <div className="border-t border-burned-amber pt-8 sm:pt-10 text-center px-4">
            <p className="font-cardo text-ancient-golden tracking-[0.3em] text-lg sm:text-xl mb-3">
              "TENEBRAE LUMEN FACIT"
            </p>
            <p className="font-garamond text-ritualistic-beige text-sm sm:text-base mt-2 opacity-80 italic">
              As trevas criam a luz
            </p>
          </div>
        </div>
      </section>

      <MysticalFooter />
    </div>
  );
}
