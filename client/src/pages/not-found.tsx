import { PageTransition } from "@/components/page-transition";

export default function NotFound() {
  return (
    <PageTransition className="min-h-screen flex items-center justify-center p-4 mystical-bg pt-32">
      <div className="text-center">
        <h1 className="text-6xl font-cinzel text-golden-amber mb-4">404</h1>
        <p className="text-xl text-ritualistic-beige mb-8 font-garamond">O véu não pode ser erguido aqui...</p>
        <a 
          href="/" 
          className="veil-button px-6 py-3 text-golden-amber font-cinzel tracking-wide rounded hover:bg-golden-amber/10 transition-all duration-300"
        >
          Retornar ao Templo
        </a>
      </div>
    </PageTransition>
  );
}
