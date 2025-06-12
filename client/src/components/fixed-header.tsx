export default function FixedHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-4">
          {/* Logo girando horário */}
          <div className="w-8 h-8 animate-spin-slow">
            <img 
              src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
              alt="Selo do Templo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Título centralizado */}
          <h1 className="font-cinzel text-xl md:text-2xl lg:text-3xl text-golden-amber tracking-wide">
            TEMPLO DO ABISMO
          </h1>
          
          {/* Logo girando anti-horário */}
          <div className="w-8 h-8 animate-spin-reverse-slow">
            <img 
              src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
              alt="Selo do Templo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
}