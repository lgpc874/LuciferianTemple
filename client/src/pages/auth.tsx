import AuthForm from "@/components/auth-form";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function AuthPage() {
  const { login, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Redireciona usuários já logados
  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  const handleAuthSuccess = (token: string, user: any) => {
    login(token, user);
    setLocation("/");
  };

  // Se já está logado, não mostra nada (será redirecionado)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fundo místico */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-mystical to-black opacity-95"></div>
      
      {/* Padrões místicos de fundo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-golden-amber text-6xl transform rotate-12">⸸</div>
        <div className="absolute top-40 right-32 text-blood-red text-4xl transform -rotate-45">†</div>
        <div className="absolute bottom-32 left-16 text-golden-amber text-5xl transform rotate-45">◆</div>
        <div className="absolute bottom-20 right-20 text-blood-red text-3xl transform -rotate-12">⚜</div>
        <div className="absolute top-1/2 left-1/4 text-golden-amber text-2xl transform rotate-90">✦</div>
        <div className="absolute top-1/3 right-1/4 text-blood-red text-3xl transform -rotate-90">☥</div>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 w-full max-w-md">
        <AuthForm onSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
}