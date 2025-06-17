import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Flame, Crown, Eye } from "lucide-react";
import type { Curso } from "../../../shared/schema";

// Componente para ícone do curso baseado no nível
const CourseIcon = ({ nivel }: { nivel: string }) => {
  const iconProps = { size: 24, className: "text-amber-500" };
  
  switch (nivel) {
    case 'iniciante':
      return <Flame {...iconProps} />;
    case 'intermediario':
      return <Eye {...iconProps} />;
    case 'avancado':
      return <Crown {...iconProps} />;
    default:
      return <BookOpen {...iconProps} />;
  }
};

// Função para formatar preço
const formatPrice = (price: string | null, isPaid: boolean) => {
  if (!isPaid) return "Gratuito";
  if (!price) return "Consulte valor";
  return `R$ ${parseFloat(price).toFixed(2)}`;
};

export default function CursosPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("todos");

  // Buscar cursos do Supabase
  const { data: cursos, isLoading, error } = useQuery<Curso[]>({
    queryKey: ['/api/cursos'],
  });

  // Filtrar cursos por nível se selecionado
  const filteredCursos = cursos?.filter(curso => 
    selectedLevel === "todos" || curso.nivel === selectedLevel
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-950 via-black to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-amber-100">Carregando cursos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-950 via-black to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <p className="text-red-400 mb-4">Erro ao carregar cursos</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline" 
                className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
              >
                Tentar Novamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-950 via-black to-black">
      {/* Header com título místico */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-amber-900/20"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 
            className="text-4xl md:text-6xl xl:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-red-500"
            style={{ fontFamily: 'Cinzel Decorative' }}
          >
            🔥 ACADEMIA LUCIFERIANA 🔥
          </h1>
          <p 
            className="text-lg md:text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'EB Garamond' }}
          >
            Desperte a chama interior através de cursos iniciáticos que revelam os mistérios ancestrais. 
            Cada jornada é uma transformação. Cada módulo, uma iniciação.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros de nível */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button
            variant={selectedLevel === "todos" ? "default" : "outline"}
            onClick={() => setSelectedLevel("todos")}
            className={selectedLevel === "todos" 
              ? "bg-amber-600 hover:bg-amber-700 text-black" 
              : "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
            }
          >
            Todos os Cursos
          </Button>
          <Button
            variant={selectedLevel === "iniciante" ? "default" : "outline"}
            onClick={() => setSelectedLevel("iniciante")}
            className={selectedLevel === "iniciante" 
              ? "bg-amber-600 hover:bg-amber-700 text-black" 
              : "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
            }
          >
            <Flame size={16} className="mr-2" />
            Iniciante
          </Button>
          <Button
            variant={selectedLevel === "intermediario" ? "default" : "outline"}
            onClick={() => setSelectedLevel("intermediario")}
            className={selectedLevel === "intermediario" 
              ? "bg-amber-600 hover:bg-amber-700 text-black" 
              : "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
            }
          >
            <Eye size={16} className="mr-2" />
            Intermediário
          </Button>
          <Button
            variant={selectedLevel === "avancado" ? "default" : "outline"}
            onClick={() => setSelectedLevel("avancado")}
            className={selectedLevel === "avancado" 
              ? "bg-amber-600 hover:bg-amber-700 text-black" 
              : "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
            }
          >
            <Crown size={16} className="mr-2" />
            Avançado
          </Button>
        </div>

        {/* Lista de cursos */}
        {filteredCursos.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🕯️</div>
            <h3 className="text-xl text-amber-100 mb-2" style={{ fontFamily: 'Cinzel' }}>
              Nenhum curso encontrado
            </h3>
            <p className="text-amber-200/80" style={{ fontFamily: 'EB Garamond' }}>
              {selectedLevel === "todos" 
                ? "Não há cursos disponíveis no momento."
                : `Não há cursos disponíveis para o nível ${selectedLevel}.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCursos.map((curso) => (
              <Card 
                key={curso.id} 
                className="bg-black/40 backdrop-blur border-amber-500/30 hover:border-amber-500 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20"
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {curso.imagem_url ? (
                      <img 
                        src={curso.imagem_url} 
                        alt={curso.nome}
                        className="w-16 h-16 object-cover rounded-lg border border-amber-500/50"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-red-600 rounded-lg flex items-center justify-center">
                        <CourseIcon nivel={curso.nivel} />
                      </div>
                    )}
                  </div>
                  
                  <CardTitle 
                    className="text-xl text-amber-100 mb-2 leading-tight"
                    style={{ fontFamily: 'Cinzel Decorative' }}
                  >
                    {curso.nome}
                  </CardTitle>
                  
                  <div className="flex justify-center gap-2 mb-3">
                    <Badge 
                      variant="outline" 
                      className="border-amber-500 text-amber-500 text-xs"
                    >
                      <CourseIcon nivel={curso.nivel} />
                      <span className="ml-1 capitalize">{curso.nivel}</span>
                    </Badge>
                    
                    <Badge 
                      variant="outline" 
                      className={curso.is_paid 
                        ? "border-red-500 text-red-400" 
                        : "border-green-500 text-green-400"
                      }
                    >
                      {formatPrice(curso.preco, curso.is_paid)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription 
                    className="text-amber-200/90 mb-6 text-center leading-relaxed"
                    style={{ fontFamily: 'EB Garamond' }}
                  >
                    {curso.descricao}
                  </CardDescription>
                  
                  <Link href={`/curso/${curso.slug}`}>
                    <Button 
                      className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-black font-semibold py-3 transition-all duration-300"
                      style={{ fontFamily: 'Cinzel' }}
                    >
                      Acessar Curso
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}