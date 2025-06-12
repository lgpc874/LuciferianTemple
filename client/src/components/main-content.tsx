import MysticalFooter from "./mystical-footer";
import UserMenu from "./user-menu";
import { useAuth } from "@/hooks/use-auth";

export default function MainContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen fade-in">
      {/* User Menu */}
      <div className="absolute top-4 right-4 z-50">
        <UserMenu />
      </div>
      
      {/* Header with Central Seal */}
      <header className="relative py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Central Sacred Seal */}
          <div className="mb-6 sm:mb-8">
            <img 
              src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
              alt="Selo Central do Templo do Abismo" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto sacred-seal"
            />
          </div>
          
          {/* Main Title */}
          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-golden-amber mb-3 sm:mb-4 tracking-wide px-2">
            TEMPLO DO ABISMO
          </h1>
          
          {/* Subtitle */}
          <p className="font-garamond text-ritualistic-beige text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 italic px-4">
            Portal dos Mistérios Ancestrais
          </p>
          
          {/* Mysterious Quote */}
          <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4">
            <blockquote className="font-fell text-blood-red text-base sm:text-lg md:text-xl leading-relaxed border-l-2 sm:border-l-4 border-golden-amber pl-4 sm:pl-6 text-left">
              "Há conhecimentos que sussurram nas trevas há milênios,
              aguardando aqueles que ousam escutar além do véu do comum.
              O que aqui jaz selado desperta apenas para os preparados."
            </blockquote>
          </div>
        </div>
      </header>

      {/* Main Content Section - Os Sussurros do Abismo */}
      <section className="content-section rounded-lg border border-burned-amber mb-8 sm:mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-golden-amber mb-6 sm:mb-8 text-center px-4">
            OS SUSSURROS DO ABISMO
          </h2>
          
          <div className="text-center mb-8 sm:mb-12 px-4">
            <p className="font-garamond text-ritualistic-beige text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              Neste santuário, as sombras guardam segredos que antecedem a memória humana. Cada
              símbolo, cada palavra, cada ritual aqui preservado carrega o peso de eras esquecidas e
              o poder de despertar o que jaz adormecido nas profundezas da alma.
            </p>
            
            <div className="font-fell text-blood-red text-sm sm:text-base italic mb-6 sm:mb-8 px-2">
              "Aqueles que buscam apenas curiosidade encontrarão apenas véus.
              Mas aqueles que chegam com sede verdadeira... descobrirão fontes inimagináveis."
            </div>
            
            <p className="font-cormorant text-soft-amber text-base sm:text-lg italic leading-relaxed px-2">
              O que você encontrará aqui não pode ser desfeito.
              O conhecimento, uma vez despertado, transforma para sempre
              aquele que ousa contemplar suas verdades ocultas.
            </p>
          </div>
          
          {/* Mystical Invitation */}
          <div className="border-t border-burned-amber pt-6 sm:pt-8 text-center px-4">
            <p className="font-cardo text-ancient-golden tracking-wider text-base sm:text-lg">
              "FIAT LUX IN TENEBRIS ABYSSI"
            </p>
            <p className="font-garamond text-ritualistic-beige text-xs sm:text-sm mt-2 opacity-70">
              Que a luz se faça nas trevas do abismo
            </p>
          </div>
        </div>
      </section>

      <MysticalFooter />
    </div>
  );
}
