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
        
        {/* Ritualistic Warning */}
        <div className="font-fell text-blood-red text-lg md:text-xl mb-6 leading-relaxed">
          <p className="mb-4">
            "Aquele que adentra os Véus do Abismo carrega consigo o peso das eras. 
            Os ensinamentos aqui contidos não são meros símbolos, mas chaves 
            que abrem portas que jamais poderão ser fechadas."
          </p>
        </div>
        
        {/* Solemn Declaration */}
        <div className="font-garamond text-ritualistic-beige text-base md:text-lg mb-8 leading-relaxed">
          <p className="mb-4">
            Este é um santuário dedicado aos mistérios luciferianos ancestrais, 
            às artes ocultas e aos caminhos da mão esquerda. O conhecimento aqui 
            preservado é sagrado e exige reverência, discernimento e maturidade espiritual.
          </p>
          <p className="italic font-cormorant text-soft-amber">
            Apenas aqueles que compreendem a magnitude destes ensinamentos 
            devem prosseguir além do véu.
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
