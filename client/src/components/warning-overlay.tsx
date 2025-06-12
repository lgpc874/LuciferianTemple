interface WarningOverlayProps {
  onTearVeil: () => void;
  isTransitioning: boolean;
}

export default function WarningOverlay({ onTearVeil, isTransitioning }: WarningOverlayProps) {
  return (
    <div className={`fixed inset-0 z-50 warning-overlay flex items-center justify-center p-4 transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-2xl mx-auto text-center floating-container rounded-lg p-8 border border-golden-amber">
        {/* Sacred Logo */}
        <div className="mb-8">
          <img 
            src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
            alt="Selo Sagrado do Templo do Abismo" 
            className="w-32 h-32 mx-auto sacred-seal"
          />
        </div>
        
        {/* Warning Title */}
        <h1 className="font-cinzel text-3xl md:text-4xl text-golden-amber mb-6 tracking-wide">
          PORTAL DOS MISTÉRIOS ANCESTRAIS
        </h1>
        
        {/* Mysterious Warning */}
        <div className="font-fell text-blood-red text-lg md:text-xl mb-6 leading-relaxed">
          <p className="mb-4">
            "Nas profundezas do Abismo, onde o tempo se curva sobre si mesmo,
            jazem os segredos que precederam a primeira palavra.
            O que aqui se oculta não deve ser tomado levianamente."
          </p>
        </div>
        
        {/* Solemn Declaration */}
        <div className="font-garamond text-ritualistic-beige text-base md:text-lg mb-8 leading-relaxed">
          <p className="mb-4">
            Este santuário guarda conhecimentos que ecoam desde antes da aurora dos tempos.
            Escrituras seladas, rituais ancestrais e verdades que poucos ousaram contemplar
            aguardam além deste limiar.
          </p>
          <p className="italic font-cormorant text-soft-amber">
            Somente aqueles cuja alma ressoa com as frequências do mistério
            devem atravessar este portal sagrado.
          </p>
        </div>
        
        {/* Entry Button */}
        <button 
          onClick={onTearVeil}
          className="veil-button font-cinzel text-golden-amber px-8 py-4 text-xl tracking-widest bg-transparent hover:bg-opacity-10"
        >
          RASGAR O VÉU
        </button>
        
        {/* Final Warning */}
        <p className="font-cardo text-ancient-golden text-sm mt-6 opacity-80">
          "Lasciate ogne speranza, voi ch'intrate"
        </p>
      </div>
    </div>
  );
}
