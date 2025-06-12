interface WarningOverlayProps {
  onTearVeil: () => void;
  isTransitioning: boolean;
}

export default function WarningOverlay({ onTearVeil, isTransitioning }: WarningOverlayProps) {
  return (
    <div className={`fixed inset-0 z-50 warning-overlay flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto text-center floating-container rounded-lg p-4 sm:p-6 md:p-8 border border-golden-amber">
        {/* Sacred Logo */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <img 
            src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
            alt="Selo Sagrado do Templo do Abismo" 
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto sacred-seal"
          />
        </div>
        
        {/* Warning Title */}
        <h1 className="font-cinzel text-xl sm:text-2xl md:text-3xl lg:text-4xl text-golden-amber mb-4 sm:mb-6 tracking-wide px-2">
          PORTAL DOS MISTÉRIOS ANCESTRAIS
        </h1>
        
        {/* Mysterious Warning */}
        <div className="font-fell text-blood-red text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 leading-relaxed px-2">
          <p className="mb-3 sm:mb-4">
            "Nas profundezas do Abismo, onde o tempo se curva sobre si mesmo,
            jazem os segredos que precederam a primeira palavra.
            O que aqui se oculta não deve ser tomado levianamente."
          </p>
        </div>
        
        {/* Solemn Declaration */}
        <div className="font-garamond text-ritualistic-beige text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed px-2">
          <p className="mb-3 sm:mb-4">
            Este santuário guarda conhecimentos que ecoam desde antes da aurora dos tempos.
            Escrituras seladas, rituais ancestrais e verdades que poucos ousaram contemplar
            aguardam além deste limiar.
          </p>
          <p className="italic font-cormorant text-soft-amber text-xs sm:text-sm md:text-base">
            Somente aqueles cuja alma ressoa com as frequências do mistério
            devem atravessar este portal sagrado.
          </p>
        </div>
        
        {/* Entry Button */}
        <button 
          onClick={onTearVeil}
          className="veil-button font-cinzel text-golden-amber px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl tracking-widest bg-transparent hover:bg-opacity-10 w-full sm:w-auto"
        >
          RASGAR O VÉU
        </button>
        
        {/* Final Warning */}
        <p className="font-cardo text-ancient-golden text-xs sm:text-sm mt-4 sm:mt-6 opacity-80 px-2">
          "Lasciate ogne speranza, voi ch'intrate"
        </p>
      </div>
    </div>
  );
}
