import { grimoireCoverSvgs } from "../components/grimoire-covers";
import { useAuth } from "../hooks/use-auth";
import AuthForm from "../components/auth-form";

export default function Biblioteca() {
  const { isAuthenticated, user, login, logout } = useAuth();
  const grimoires = [
    {
      id: 1,
      title: "Introdução ao Ocultismo",
      description: "Conceitos básicos para os buscadores do Despertar",
      category: "introducao-ocultismo",
      difficultyLevel: 1,
      unlockOrder: 1
    },
    {
      id: 2,
      title: "Lúcifer e o Caminho da Luz Negra",
      description: "Uma introdução ao luciferianismo filosófico e espiritual",
      category: "lucifer-luz-negra",
      difficultyLevel: 2,
      unlockOrder: 2
    },
    {
      id: 3,
      title: "Lilith e o Poder da Sombra Feminina",
      description: "O despertar da força oculta da Mãe Noturna",
      category: "lilith-sombra-feminina",
      difficultyLevel: 2,
      unlockOrder: 3
    },
    {
      id: 4,
      title: "Simbolismo e Sigilos",
      description: "O poder dos símbolos arcanos",
      category: "simbolismo-sigilos",
      difficultyLevel: 3,
      unlockOrder: 4
    },
    {
      id: 5,
      title: "Textos Filosóficos e Reflexões",
      description: "Escritos para provocar a alma e questionar os dogmas",
      category: "textos-filosoficos",
      difficultyLevel: 4,
      unlockOrder: 5
    },
    {
      id: 6,
      title: "Meditações e Práticas Simples",
      description: "Exercícios seguros para quem está começando",
      category: "meditacoes-praticas",
      difficultyLevel: 1,
      unlockOrder: 6
    }
  ];

  const getDifficultyText = (level: number) => {
    switch (level) {
      case 1: return "Iniciante";
      case 2: return "Intermediário";
      case 3: return "Avançado";
      case 4: return "Mestre";
      default: return "Desconhecido";
    }
  };

  // Se não estiver autenticado, mostrar tela de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen mystical-bg pt-24 fade-in">
        <div className="relative py-16 bg-gradient-to-b from-red-950/20 to-transparent">
          <div className="relative text-center">
            <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-golden-amber mb-6 tracking-wider">
              ⸸ ACESSO RESTRITO ⸸
            </h1>
            <div className="w-32 h-1 bg-golden-amber mx-auto mb-6"></div>
            <p className="font-garamond text-xl text-ritualistic-beige max-w-3xl mx-auto leading-relaxed px-4 italic mb-8">
              Os segredos da Bibliotheca Arcana são reservados apenas aos que já têm seu nome registrado no abismo.
              Identifique-se para adentrar os corredores do conhecimento proibido.
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4">
          <div className="content-section border border-golden-amber/50 rounded-xl p-8">
            <div className="text-center mb-6">
              <h2 className="font-cinzel text-2xl text-golden-amber mb-2">
                Portal dos Iniciados
              </h2>
              <p className="font-garamond text-ritualistic-beige text-sm">
                Faça login ou registre-se para acessar a biblioteca
              </p>
            </div>
            
            <AuthForm onSuccess={(token, userData) => {
              login(token, userData);
            }} />
          </div>

          <div className="text-center mt-8">
            <a href="/bibliotheca-arcana">
              <button className="veil-button bg-gradient-to-r from-ritualistic-beige/10 to-ritualistic-beige/5 hover:from-ritualistic-beige/20 hover:to-ritualistic-beige/10 text-ritualistic-beige font-cinzel py-3 px-6 rounded-lg transition-all duration-300 border border-ritualistic-beige/50 hover:border-golden-amber/50 hover:text-golden-amber tracking-wide">
                <span className="flex items-center justify-center space-x-2">
                  <span>←</span>
                  <span>RETORNAR À ANTECÂMARA</span>
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mystical-bg pt-24 fade-in">
      {/* Header místico */}
      <div className="relative py-16 bg-gradient-to-b from-red-950/20 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-golden-amber/5 via-transparent to-transparent"></div>
        <div className="relative text-center">
          <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-golden-amber mb-6 tracking-wider">
            ⸸ BIBLIOTHECA ARCANA ⸸
          </h1>
          <div className="w-32 h-1 bg-golden-amber mx-auto mb-6"></div>
          
          {user && (
            <div className="mb-6">
              <p className="font-garamond text-lg text-golden-amber/80">
                Bem-vindo de volta, <span className="text-golden-amber font-semibold">{user.username}</span>
              </p>
              <p className="font-garamond text-sm text-ritualistic-beige/70 italic">
                Iniciado dos Mistérios Arcanos
              </p>
            </div>
          )}
          
          <p className="font-garamond text-xl text-ritualistic-beige max-w-4xl mx-auto leading-relaxed px-4 italic">
            Nos corredores sombrios desta biblioteca digital repousam os grimórios ancestrais,
            cada um guardando fragmentos da sabedoria proibida. Escolha seu caminho com prudência,
            pois cada página virada é um passo mais profundo nas trevas da gnose.
          </p>
        </div>
      </div>

      {/* Grid de grimórios */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {grimoires.map((grimoire) => {
            const coverSvg = grimoireCoverSvgs[grimoire.category as keyof typeof grimoireCoverSvgs];
            
            return (
              <div
                key={grimoire.id}
                className="group relative content-section border border-burned-amber/50 rounded-xl overflow-hidden hover:border-golden-amber/70 transition-all duration-500 hover:shadow-2xl hover:shadow-golden-amber/10"
              >
                {/* Capa do grimório */}
                <div className="aspect-[3/4] p-6 bg-gradient-to-br from-dark-brown to-very-dark-brown">
                  <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                    {coverSvg}
                  </div>
                </div>

                {/* Informações do grimório */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-cinzel text-xl text-golden-amber mb-2 group-hover:text-golden-amber/80 transition-colors tracking-wide">
                      {grimoire.title}
                    </h3>
                    <p className="font-garamond text-ritualistic-beige text-sm leading-relaxed">
                      {grimoire.description}
                    </p>
                  </div>

                  {/* Metadados */}
                  <div className="flex justify-between items-center text-xs text-burned-amber border-t border-burned-amber/30 pt-4">
                    <div className="flex items-center space-x-1">
                      <span>Nível:</span>
                      <span className="font-semibold text-golden-amber">
                        {getDifficultyText(grimoire.difficultyLevel)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>Ordem:</span>
                      <span className="text-golden-amber font-semibold">#{grimoire.unlockOrder}</span>
                    </div>
                  </div>

                  {/* Botão de acesso */}
                  <button className="w-full veil-button bg-gradient-to-r from-golden-amber/10 to-golden-amber/5 hover:from-golden-amber/20 hover:to-golden-amber/10 text-golden-amber font-cinzel py-3 px-6 rounded-lg transition-all duration-300 border border-golden-amber/50 hover:border-golden-amber hover:shadow-lg hover:shadow-golden-amber/25 tracking-wide">
                    <span className="flex items-center justify-center space-x-2">
                      <span>ADENTRAR O GRIMÓRIO</span>
                      <span className="text-golden-amber/70">→</span>
                    </span>
                  </button>
                </div>

                {/* Efeito de hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-golden-amber/0 via-transparent to-golden-amber/0 group-hover:from-golden-amber/5 group-hover:to-golden-amber/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Rodapé da biblioteca */}
        <div className="text-center mt-16 pt-8 border-t border-burned-amber/30">
          <div className="mb-8">
            <p className="font-garamond text-burned-amber text-sm italic max-w-2xl mx-auto">
              "O conhecimento é poder, mas o poder sem sabedoria é destruição. 
              Que cada página lida seja um passo em direção à verdadeira iluminação."
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/bibliotheca-arcana">
              <button className="veil-button bg-gradient-to-r from-ritualistic-beige/10 to-ritualistic-beige/5 hover:from-ritualistic-beige/20 hover:to-ritualistic-beige/10 text-ritualistic-beige font-cinzel py-4 px-8 rounded-lg transition-all duration-300 border border-ritualistic-beige/50 hover:border-golden-amber/50 hover:text-golden-amber hover:shadow-lg tracking-wide">
                <span className="flex items-center justify-center space-x-2">
                  <span>←</span>
                  <span>RETORNAR À ANTECÂMARA</span>
                </span>
              </button>
            </a>
            
            <button 
              onClick={logout}
              className="veil-button bg-gradient-to-r from-red-900/10 to-red-900/5 hover:from-red-900/20 hover:to-red-900/10 text-red-400 font-cinzel py-3 px-6 rounded-lg transition-all duration-300 border border-red-400/50 hover:border-red-400 hover:shadow-lg tracking-wide text-sm"
            >
              ENCERRAR SESSÃO
            </button>
          </div>
          
          {user && (
            <div className="mt-6 pt-4 border-t border-burned-amber/20">
              <p className="font-garamond text-burned-amber/60 text-xs">
                Sessão ativa: {user.username} • {user.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}