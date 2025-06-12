export default function MainContent() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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

      {/* Main Navigation */}
      <nav className="floating-container mx-4 md:mx-8 rounded-lg border border-burned-amber mb-12">
        <div className="container mx-auto px-6 py-4">
          <ul className="flex flex-wrap justify-center items-center space-x-8">
            <li>
              <a 
                href="#ensinamentos" 
                onClick={(e) => handleSmoothScroll(e, '#ensinamentos')}
                className="font-garamond text-ritualistic-beige hover:text-golden-amber transition-colors text-lg"
              >
                Ensinamentos
              </a>
            </li>
            <li>
              <a 
                href="#grimórios" 
                onClick={(e) => handleSmoothScroll(e, '#grimórios')}
                className="font-garamond text-ritualistic-beige hover:text-golden-amber transition-colors text-lg"
              >
                Grimórios
              </a>
            </li>
            <li>
              <a 
                href="#rituais" 
                onClick={(e) => handleSmoothScroll(e, '#rituais')}
                className="font-garamond text-ritualistic-beige hover:text-golden-amber transition-colors text-lg"
              >
                Rituais
              </a>
            </li>
            <li>
              <a 
                href="#biblioteca" 
                onClick={(e) => handleSmoothScroll(e, '#biblioteca')}
                className="font-garamond text-ritualistic-beige hover:text-golden-amber transition-colors text-lg"
              >
                Biblioteca
              </a>
            </li>
            <li>
              <a 
                href="#círculo" 
                onClick={(e) => handleSmoothScroll(e, '#círculo')}
                className="font-garamond text-ritualistic-beige hover:text-golden-amber transition-colors text-lg"
              >
                Círculo Interno
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mysterious Introduction */}
      <section id="ensinamentos" className="content-section mx-4 md:mx-8 rounded-lg border border-burned-amber mb-12 p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cinzel text-3xl md:text-4xl text-golden-amber mb-8 text-center">
            OS SUSSURROS DO ABISMO
          </h2>
          
          <div className="text-center mb-12">
            <p className="font-garamond text-ritualistic-beige text-lg leading-relaxed mb-6">
              Neste santuário, as sombras guardam segredos que antecedem a memória humana.
              Cada símbolo, cada palavra, cada ritual aqui preservado carrega o peso de eras esquecidas
              e o poder de despertar o que jaz adormecido nas profundezas da alma.
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

      {/* Sealed Knowledge Glimpses */}
      <section id="grimórios" className="content-section mx-4 md:mx-8 rounded-lg border border-burned-amber mb-12 p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cinzel text-3xl md:text-4xl text-golden-amber mb-8 text-center">
            FRAGMENTOS SELADOS
          </h2>
          
          <div className="text-center mb-8">
            <p className="font-garamond text-ritualistic-beige text-base leading-relaxed">
              Estas são apenas sombras do que aguarda nos arquivos mais profundos.
              Conhecimentos que foram preservados através de milênios, 
              sussurrados apenas aos dignos do grande mistério.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center border border-burned-amber rounded p-6 floating-container">
              <h3 className="font-cinzel text-lg text-golden-amber mb-4">Os Nomes Ocultos</h3>
              <p className="font-garamond text-ritualistic-beige text-sm leading-relaxed mb-4">
                Hierarquias antigas, selos de poder e palavras que atravessam os véus
                entre os mundos visível e invisível.
              </p>
              <p className="font-fell text-blood-red text-xs italic">
                "Há nomes que não devem ser pronunciados em vão..."
              </p>
            </div>
            
            <div className="text-center border border-burned-amber rounded p-6 floating-container">
              <h3 className="font-cinzel text-lg text-golden-amber mb-4">A Grande Dissolução</h3>
              <p className="font-garamond text-ritualistic-beige text-sm leading-relaxed mb-4">
                Métodos ancestrais para dissolver as ilusões do ego
                e renascer na consciência primordial.
              </p>
              <p className="font-fell text-blood-red text-xs italic">
                "Morre para que possas verdadeiramente viver..."
              </p>
            </div>
            
            <div className="text-center border border-burned-amber rounded p-6 floating-container">
              <h3 className="font-cinzel text-lg text-golden-amber mb-4">Portais Rituais</h3>
              <p className="font-garamond text-ritualistic-beige text-sm leading-relaxed mb-4">
                Cerimônias que abrem passagens para estados de consciência
                onde a realidade comum se desfaz.
              </p>
              <p className="font-fell text-blood-red text-xs italic">
                "Cada ritual é uma chave, cada chave... um abismo..."
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-burned-amber">
            <p className="font-cormorant text-soft-amber text-base italic">
              Estes são apenas sussurros do que aguarda nas câmaras mais profundas.
              Para aqueles que demonstrarem verdadeira sede de conhecimento,
              as portas do santuário interior se abrirão.
            </p>
          </div>
        </div>
      </section>

      {/* Mystical Footer */}
      <footer id="círculo" className="content-section mx-4 md:mx-8 rounded-lg border border-burned-amber p-8 mb-8">
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
