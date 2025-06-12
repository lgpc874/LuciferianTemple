export default function BibliothecaArcana() {
  return (
    <div className="min-h-screen mystical-bg pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Título Principal */}
        <div className="text-center mb-16">
          <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-golden-amber mb-8 tracking-wider">
            BIBLIOTHECA ARCANA
          </h1>
          
          <p className="font-garamond text-xl md:text-2xl text-ritualistic-beige italic tracking-wide">
            Verbum in Tenebris, Lux in Silencio.
          </p>
        </div>

        {/* Citação */}
        <div className="max-w-4xl mx-auto mb-16">
          <blockquote className="border-l-4 border-golden-amber/50 pl-8 py-6 bg-black/20 rounded-r-lg">
            <div className="font-garamond text-lg md:text-xl text-ritualistic-beige leading-relaxed mb-4">
              "A Biblioteca Arcana não contém livros.<br />
              Ela contém ecos.<br />
              Memórias que se recusaram a morrer…<br />
              e que sussurram apenas àqueles que já esqueceram o mundo."
            </div>
            <cite className="font-cinzel text-golden-amber text-sm tracking-widest">
              — THER'ZAHL, Guardião do Conhecimento Esquecido
            </cite>
          </blockquote>
        </div>

        {/* Texto Principal */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="font-garamond text-xl md:text-2xl text-blood-red font-semibold mb-6">
              Não busques entender.<br />
              Sinta.
            </p>
          </div>

          <div className="space-y-6 font-garamond text-lg md:text-xl text-ritualistic-beige leading-relaxed">
            <p className="text-center">
              Cada palavra aqui é um espelho...<br />
              Cada linha, um véu.<br />
              O que é visível é só o invólucro.<br />
              O que vibra por trás... aguarda tua ousadia.
            </p>

            <div className="text-center pt-8">
              <p className="mb-4">
                Toque com os olhos.<br />
                Leia com a alma.<br />
                Desperte com cuidado.
              </p>
              
              <p className="font-cinzel text-golden-amber italic tracking-wide">
                Pois nada é o que parece.<br />
                E tudo observa em silêncio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}