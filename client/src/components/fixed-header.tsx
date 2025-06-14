export default function FixedHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          {/* Título centralizado apenas */}
          <h1 className="font-cinzel text-xl md:text-2xl lg:text-3xl text-golden-amber tracking-wide">
            TEMPLO DO ABISMO
          </h1>
        </div>
      </div>
    </header>
  );
}