export default function MainContent() {
  return (
    <div className="min-h-screen fade-in">
      {/* Header with Central Seal */}
      <header className="relative py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          {/* Central Sacred Seal */}
          <div className="mb-8">
            <img 
              src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
              alt="Selo Central do Templo do Abismo" 
              className="w-40 h-40 md:w-56 md:h-56 mx-auto sacred-seal"
            />
          </div>
          
          {/* Main Title */}
          <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl text-golden-amber mb-4 tracking-wide">
            TEMPLO DO ABISMO
          </h1>
          
          {/* Subtitle */}
          <p className="font-garamond text-ritualistic-beige text-xl md:text-2xl mb-8 italic">
            Portal dos Mistérios Ancestrais
          </p>
          
          {/* Mysterious Quote */}
          <div className="max-w-3xl mx-auto">
            <blockquote className="font-fell text-blood-red text-lg md:text-xl leading-relaxed border-l-4 border-golden-amber pl-6">
              "Há conhecimentos que sussurram nas trevas há milênios,
              aguardando aqueles que ousam escutar além do véu do comum.
              O que aqui jaz selado desperta apenas para os preparados."
            </blockquote>
          </div>
        </div>
      </header>

      {/* Main Content Section - Os Sussurros do Abismo */}
      <section className="content-section mx-4 md:mx-8 rounded-lg border border-burned-amber mb-12 p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cinzel text-3xl md:text-4xl text-golden-amber mb-8 text-center">
            OS SUSSURROS DO ABISMO
          </h2>
          
          <div className="text-center mb-12">
            <p className="font-garamond text-ritualistic-beige text-lg leading-relaxed mb-6">
              Neste santuário, as sombras guardam segredos que antecedem a memória humana. Cada
              símbolo, cada palavra, cada ritual aqui preservado carrega o peso de eras esquecidas e
              o poder de despertar o que jaz adormecido nas profundezas da alma.
            </p>
            
            <div className="font-fell text-blood-red text-base italic mb-8">
              "Aqueles que buscam apenas curiosidade encontrarão apenas véus.
              Mas aqueles que chegam com sede verdadeira... descobrirão fontes inimagináveis."
            </div>
            
            <p className="font-cormorant text-soft-amber text-lg italic leading-relaxed">
              O que você encontrará aqui não pode ser desfeito.
              O conhecimento, uma vez despertado, transforma para sempre
              aquele que ousa contemplar suas verdades ocultas.
            </p>
          </div>
          
          {/* Mystical Invitation */}
          <div className="border-t border-burned-amber pt-8 text-center">
            <p className="font-cardo text-ancient-golden tracking-wider text-lg">
              "FIAT LUX IN TENEBRIS ABYSSI"
            </p>
            <p className="font-garamond text-ritualistic-beige text-sm mt-2 opacity-70">
              Que a luz se faça nas trevas do abismo
            </p>
          </div>
        </div>
      </section>

      {/* Mystical Footer */}
      <footer className="content-section mx-4 md:mx-8 rounded-lg border border-burned-amber p-8 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <img 
              src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
              alt="Selo do Templo" 
              className="w-16 h-16 mx-auto opacity-70"
            />
          </div>
          
          <div className="font-fell text-blood-red text-sm mb-6 italic">
            "O que foi selado no silêncio permanecerá guardado até que os preparados se aproximem.
            Nas trevas do Abismo, aguardamos aqueles que buscam a verdade além dos véus."
          </div>
          
          <p className="font-cardo text-ancient-golden text-xs tracking-wider mb-4">
            "SCIENTIA POTENTIA EST"
          </p>
          
          <div className="mt-6 pt-4 border-t border-burned-amber">
            <p className="font-garamond text-ritualistic-beige text-xs opacity-50">
              © 2025 - Santuário preservado pelos Guardiões dos Mistérios Ancestrais
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
