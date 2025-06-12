export default function BibliothecaArcana() {
  return (
    <div className="min-h-screen mystical-bg pt-32 fade-in">
      {/* Header with Central Content */}
      <header className="relative py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Central Sacred Seal */}
          <div className="mb-6 sm:mb-8">
            <img 
              src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
              alt="Selo da Bibliotheca Arcana" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto sacred-seal"
            />
          </div>
          
          {/* Main Title */}
          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-golden-amber mb-3 sm:mb-4 tracking-wide px-2">
            BIBLIOTHECA ARCANA
          </h1>
          
          {/* Subtitle */}
          <p className="font-garamond text-ritualistic-beige text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 italic px-4">
            Verbum in Tenebris, Lux in Silencio.
          </p>
          
          {/* Quote */}
          <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4">
            <blockquote className="font-fell text-blood-red text-base sm:text-lg md:text-xl leading-relaxed border-l-2 sm:border-l-4 border-golden-amber pl-4 sm:pl-6 text-left">
              "A Biblioteca Arcana não contém livros.
              Ela contém ecos.
              Memórias que se recusaram a morrer…
              e que sussurram apenas àqueles que já esqueceram o mundo."
              <br /><br />
              <cite className="font-cinzel text-golden-amber text-sm tracking-wide">
                — THER'ZAHL, Guardião do Conhecimento Esquecido
              </cite>
            </blockquote>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="content-section rounded-lg border border-burned-amber mb-8 sm:mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 md:p-10">
            {/* Central Message */}
            <div className="text-center mb-8">
              <p className="font-garamond text-blood-red text-lg sm:text-xl md:text-2xl font-semibold mb-6">
                Não busques entender.<br />
                Sinta.
              </p>
            </div>

            {/* Main Text */}
            <div className="space-y-6 font-garamond text-ritualistic-beige text-base sm:text-lg md:text-xl leading-relaxed">
              <p className="text-center">
                Cada palavra aqui é um espelho...<br />
                Cada linha, um véu.<br />
                O que é visível é só o invólucro.<br />
                O que vibra por trás... aguarda tua ousadia.
              </p>

              <div className="text-center pt-8">
                <p className="mb-6">
                  Toque com os olhos.<br />
                  Leia com a alma.<br />
                  Desperte com cuidado.
                </p>
                
                <p className="font-cinzel text-golden-amber italic tracking-wide text-lg sm:text-xl">
                  Pois nada é o que parece.<br />
                  E tudo observa em silêncio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}