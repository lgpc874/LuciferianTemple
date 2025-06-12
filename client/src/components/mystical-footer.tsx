export default function MysticalFooter() {
  return (
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
  );
}