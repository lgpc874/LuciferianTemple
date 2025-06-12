export default function Biblioteca() {
  const items = [
    {
      title: "Introdução ao Ocultismo",
      description: "Conceitos básicos para os buscadores do Despertar",
      id: "introducao-ocultismo"
    },
    {
      title: "Lúcifer e o Caminho da Luz Negra",
      description: "Uma introdução ao luciferianismo filosófico e espiritual",
      id: "lucifer-luz-negra"
    },
    {
      title: "Lilith e o Poder da Sombra Feminina",
      description: "O despertar da força oculta da Mãe Noturna",
      id: "lilith-sombra-feminina"
    },
    {
      title: "Simbolismo e Sigilos",
      description: "O poder dos símbolos arcanos",
      id: "simbolismo-sigilos"
    },
    {
      title: "Textos Filosóficos e Reflexões",
      description: "Escritos para provocar a alma e questionar os dogmas",
      id: "textos-filosoficos"
    },
    {
      title: "Meditações e Práticas Simples",
      description: "Exercícios seguros para quem está começando",
      id: "meditacoes-praticas"
    }
  ];

  return (
    <div className="min-h-screen mystical-bg pt-32 fade-in">
      {/* Header */}
      <header className="relative py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Central Sacred Seal */}
          <div className="mb-6 sm:mb-8">
            <img 
              src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
              alt="Selo da Biblioteca" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto sacred-seal"
            />
          </div>
          
          {/* Title */}
          <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-golden-amber mb-3 sm:mb-4 tracking-wide px-2">
            BIBLIOTECA ARCANA
          </h1>
          
          {/* Subtitle */}
          <p className="font-garamond text-ritualistic-beige text-base sm:text-lg md:text-xl mb-8 italic px-4">
            Escolha o conhecimento que ressoa com tua busca
          </p>
        </div>
      </header>

      {/* Cards Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <div 
              key={item.id}
              className="content-section border border-burned-amber rounded-lg p-6 hover:border-golden-amber/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-golden-amber/10 cursor-pointer"
            >
              <div className="text-center">
                <h3 className="font-cinzel text-golden-amber text-lg sm:text-xl mb-4 tracking-wide leading-tight">
                  {item.title}
                </h3>
                <p className="font-garamond text-ritualistic-beige text-sm sm:text-base leading-relaxed mb-6">
                  {item.description}
                </p>
                <div className="w-8 h-px bg-golden-amber/50 mx-auto mb-4"></div>
                <button className="veil-button px-4 py-2 text-golden-amber font-cinzel text-sm tracking-wide rounded border border-golden-amber bg-transparent hover:bg-golden-amber/10 transition-all duration-300">
                  EXPLORAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Return Button */}
      <section className="container mx-auto px-4 text-center pb-16">
        <a 
          href="/bibliotheca-arcana"
          className="veil-button px-6 py-3 text-ritualistic-beige font-cinzel text-sm tracking-wide rounded border border-ritualistic-beige/50 bg-transparent hover:bg-ritualistic-beige/10 hover:text-golden-amber hover:border-golden-amber/50 transition-all duration-300"
        >
          RETORNAR À ANTECÂMARA
        </a>
      </section>
    </div>
  );
}