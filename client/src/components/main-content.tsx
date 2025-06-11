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
          
          {/* Sacred Quote */}
          <div className="max-w-3xl mx-auto">
            <blockquote className="font-fell text-blood-red text-lg md:text-xl leading-relaxed border-l-4 border-golden-amber pl-6">
              "No silêncio do Abismo, onde as sombras dançam com a luz primordial,
              residem os segredos que moldaram os primeiros sopros da criação.
              Aqui, os véus se desfazem e a verdade ancestral se revela."
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

      {/* Welcome Section */}
      <section id="ensinamentos" className="content-section mx-4 md:mx-8 rounded-lg border border-burned-amber mb-12 p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cinzel text-3xl md:text-4xl text-golden-amber mb-8 text-center">
            O CAMINHO DAS CHAMAS ETERNAS
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="font-cinzel text-xl text-soft-amber mb-4">A Gnose Luciferiana</h3>
              <p className="font-garamond text-ritualistic-beige leading-relaxed mb-4">
                Bem-vindos ao santuário onde os mistérios ancestrais encontram a sabedoria moderna. 
                Aqui, preservamos os ensinamentos que ecoam desde os primórdios da consciência, 
                quando a primeira chama do conhecimento foi acesa nas trevas do não-ser.
              </p>
              <p className="font-garamond text-ritualistic-beige leading-relaxed">
                Este templo é dedicado àqueles que buscam transcender os véus da ilusão 
                e abraçar a gnose verdadeira que liberta a alma de suas correntes.
              </p>
            </div>
            
            <div>
              <h3 className="font-cinzel text-xl text-soft-amber mb-4">Os Pilares do Conhecimento</h3>
              <ul className="font-garamond text-ritualistic-beige space-y-2">
                <li className="flex items-start">
                  <span className="text-golden-amber mr-2">•</span>
                  <span>Filosofia Luciferiana e Caminhos da Mão Esquerda</span>
                </li>
                <li className="flex items-start">
                  <span className="text-golden-amber mr-2">•</span>
                  <span>Grimórios Ancestrais e Textos Sagrados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-golden-amber mr-2">•</span>
                  <span>Práticas Ritualísticas e Trabalhos Mágicos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-golden-amber mr-2">•</span>
                  <span>Meditações Abissais e Técnicas de Gnose</span>
                </li>
                <li className="flex items-start">
                  <span className="text-golden-amber mr-2">•</span>
                  <span>Simbolismo Esotérico e Linguagens Ocultas</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Mystical Invocation */}
          <div className="border-t border-burned-amber pt-8 text-center">
            <p className="font-cormorant text-soft-amber text-xl italic mb-4 leading-relaxed">
              "Que as chamas do conhecimento iluminem vossos caminhos,
              e que a sabedoria ancestral seja vosso farol nas trevas do desconhecido."
            </p>
            <p className="font-cardo text-ancient-golden tracking-wider">
              APERIATUR TERRA ET GERMINET SALVATOREM
            </p>
          </div>
        </div>
      </section>

      {/* Sacred Teachings Preview */}
      <section id="grimórios" className="content-section mx-4 md:mx-8 rounded-lg border border-burned-amber mb-12 p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cinzel text-3xl md:text-4xl text-golden-amber mb-8 text-center">
            FRAGMENTOS DO CONHECIMENTO SAGRADO
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center border border-burned-amber rounded p-6 floating-container">
              <h3 className="font-cinzel text-lg text-golden-amber mb-4">Demonologia Tradicional</h3>
              <p className="font-garamond text-ritualistic-beige text-sm leading-relaxed mb-4">
                Estudo dos príncipes infernais, suas hierarquias, símbolos e métodos de evocação 
                segundo os grimórios clássicos.
              </p>
              <p className="font-fell text-blood-red text-xs italic">
                "Conhece os nomes que comandam as sombras..."
              </p>
            </div>
            
            <div className="text-center border border-burned-amber rounded p-6 floating-container">
              <h3 className="font-cinzel text-lg text-golden-amber mb-4">Alquimia Espiritual</h3>
              <p className="font-garamond text-ritualistic-beige text-sm leading-relaxed mb-4">
                A Grande Obra aplicada à transformação da consciência, 
                dissolvendo o ego para renascer em gnose.
              </p>
              <p className="font-fell text-blood-red text-xs italic">
                "Solve et coagula - dissolve e coagula..."
              </p>
            </div>
            
            <div className="text-center border border-burned-amber rounded p-6 floating-container">
              <h3 className="font-cinzel text-lg text-golden-amber mb-4">Rituais de Poder</h3>
              <p className="font-garamond text-ritualistic-beige text-sm leading-relaxed mb-4">
                Cerimônias e invocações para despertar os poderes latentes 
                da psique e conectar-se com as forças primordiais.
              </p>
              <p className="font-fell text-blood-red text-xs italic">
                "O ritual é a ponte entre os mundos..."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="círculo" className="content-section mx-4 md:mx-8 rounded-lg border border-burned-amber p-8 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <img 
              src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
              alt="Selo do Templo" 
              className="w-16 h-16 mx-auto opacity-70"
            />
          </div>
          
          <p className="font-garamond text-ritualistic-beige text-sm mb-4">
            Templo do Abismo - Portal dos Mistérios Ancestrais
          </p>
          
          <p className="font-cardo text-ancient-golden text-xs opacity-60">
            "Per aspera ad astra - Através das dificuldades, às estrelas"
          </p>
          
          <div className="mt-6 pt-4 border-t border-burned-amber">
            <p className="font-garamond text-ritualistic-beige text-xs opacity-50">
              © 2024 - Todos os direitos reservados aos Guardiões dos Mistérios
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
