export default function MysticalFooter() {
  return (
    <footer className="content-section rounded-lg border border-burned-amber mb-6 sm:mb-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-4 sm:mb-6">
          <img 
            src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
            alt="Selo do Templo" 
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto opacity-70"
          />
        </div>
        
        <div className="font-fell text-blood-red text-xs sm:text-sm mb-4 sm:mb-6 italic px-4 leading-relaxed">
          "O que foi selado no silêncio permanecerá guardado até que os preparados se aproximem.
          Nas trevas do Abismo, aguardamos aqueles que buscam a verdade além dos véus."
        </div>
        
        <p className="font-cardo text-ancient-golden text-xs sm:text-sm tracking-wider mb-3 sm:mb-4">
          "SCIENTIA POTENTIA EST"
        </p>
        
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-burned-amber">
          <p className="font-garamond text-ritualistic-beige text-xs opacity-50 px-4">
            © 2025 - Santuário preservado pelos Guardiões dos Mistérios Ancestrais
          </p>
        </div>
      </div>
    </footer>
  );
}