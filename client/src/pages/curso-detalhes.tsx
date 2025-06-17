import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Flame, Eye, Crown, Clock, Users, CheckCircle, ArrowLeft, ShoppingCart, Lock } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import type { Curso, Modulo } from "../../../shared/schema";

// Componente para ícone do curso baseado no nível
const CourseIcon = ({ nivel }: { nivel: string }) => {
  const iconProps = { size: 20, className: "text-amber-500" };
  
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

export default function CursoDetalhesPage() {
  const [, params] = useRoute("/curso-detalhes/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug;
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Buscar dados do curso
  const { data: curso, isLoading: cursoLoading } = useQuery<Curso>({
    queryKey: [`/api/cursos/${slug}`],
    enabled: !!slug,
  });

  // Buscar módulos do curso
  const { data: modulos, isLoading: modulosLoading } = useQuery<Modulo[]>({
    queryKey: [`/api/cursos/${curso?.id}/modulos`],
    enabled: !!curso?.id,
  });

  // Verificar se usuário já comprou o curso
  const { data: hasAccess } = useQuery<boolean>({
    queryKey: [`/api/cursos/${curso?.id}/access`],
    enabled: !!curso?.id && isAuthenticated,
  });

  // Mutação para iniciar processo de compra
  const purchaseMutation = useMutation({
    mutationFn: async (cursoId: number) => {
      return apiRequest("/api/cursos/purchase", {
        method: "POST",
        body: JSON.stringify({ cursoId }),
        headers: { "Content-Type": "application/json" },
      });
    },
    onMutate: () => {
      setIsProcessingPayment(true);
    },
    onSuccess: (data) => {
      // Redirecionar para página de checkout do Stripe
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    },
    onError: (error: any) => {
      setIsProcessingPayment(false);
      toast({
        title: "Erro no Pagamento",
        description: error.message || "Erro ao processar compra",
        variant: "destructive",
      });
    },
  });

  const handlePurchase = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Necessário",
        description: "Faça login para comprar cursos",
        variant: "destructive",
      });
      setLocation("/auth");
      return;
    }

    if (curso?.id) {
      purchaseMutation.mutate(curso.id);
    }
  };

  const handleAccessCourse = () => {
    setLocation(`/curso/${curso?.slug}`);
  };

  if (cursoLoading || modulosLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-950 via-black to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-amber-100">Carregando detalhes do curso...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!curso) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-950 via-black to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <p className="text-red-400 mb-4">Curso não encontrado</p>
              <Link href="/cursos">
                <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black">
                  Voltar aos Cursos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calcular estatísticas do curso
  const totalModulos = modulos?.length || 0;
  const tempoEstimado = totalModulos * 2; // 2 horas por módulo estimado
  const isGratuito = !curso.is_paid;
  const userHasAccess = isGratuito || hasAccess;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-950 via-black to-black">
      {/* Header do curso */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-amber-900/20"></div>
        <div className="relative container mx-auto px-4 py-12">
          
          {/* Navegação de volta */}
          <Link href="/cursos">
            <Button 
              variant="outline" 
              className="mb-6 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
            >
              <ArrowLeft size={16} className="mr-2" />
              Voltar aos Cursos
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna principal com detalhes */}
            <div className="lg:col-span-2">
              <Card className="bg-black/40 backdrop-blur border-amber-500/30 mb-8">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    {curso.imagem_url ? (
                      <img 
                        src={curso.imagem_url} 
                        alt={curso.nome}
                        className="w-20 h-20 object-cover rounded-lg border-2 border-amber-500"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-red-600 rounded-lg flex items-center justify-center">
                        <CourseIcon nivel={curso.nivel} />
                      </div>
                    )}

                    <div className="flex-1">
                      <CardTitle 
                        className="text-2xl text-amber-100 mb-2"
                        style={{ fontFamily: 'Cinzel Decorative' }}
                      >
                        {curso.nome}
                      </CardTitle>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-amber-500 text-amber-500">
                          <CourseIcon nivel={curso.nivel} />
                          <span className="ml-1 capitalize">{curso.nivel}</span>
                        </Badge>
                        
                        <Badge variant="outline" className="border-blue-500 text-blue-400">
                          <BookOpen size={16} className="mr-1" />
                          {totalModulos} módulos
                        </Badge>

                        <Badge variant="outline" className="border-green-500 text-green-400">
                          <Clock size={16} className="mr-1" />
                          ~{tempoEstimado}h
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <CardDescription 
                    className="text-amber-200/90 text-lg leading-relaxed"
                    style={{ fontFamily: 'EB Garamond' }}
                  >
                    {curso.descricao}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Módulos do curso */}
              <Card className="bg-black/40 backdrop-blur border-amber-500/30">
                <CardHeader>
                  <CardTitle 
                    className="text-xl text-amber-100 flex items-center gap-2"
                    style={{ fontFamily: 'Cinzel' }}
                  >
                    <BookOpen size={20} />
                    Conteúdo do Curso
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  {!modulos || modulos.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-amber-200/70" style={{ fontFamily: 'EB Garamond' }}>
                        Módulos em preparação...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {modulos.map((modulo, index) => (
                        <div 
                          key={modulo.id}
                          className="flex items-center gap-4 p-4 bg-amber-900/20 rounded-lg border border-amber-500/20"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-red-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
                            {index + 1}
                          </div>
                          
                          <div className="flex-1">
                            <h4 
                              className="text-amber-100 font-semibold mb-1"
                              style={{ fontFamily: 'Cinzel' }}
                            >
                              {modulo.titulo}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-amber-200/70">
                              <span>~2h de conteúdo</span>
                              <span>•</span>
                              <span>Teoria + Prática + Desafio</span>
                            </div>
                          </div>

                          {userHasAccess ? (
                            <CheckCircle size={20} className="text-green-500" />
                          ) : (
                            <Lock size={20} className="text-amber-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar com compra */}
            <div className="lg:col-span-1">
              <Card className="bg-black/60 backdrop-blur border-amber-500/50 sticky top-8">
                <CardHeader className="text-center">
                  <div className="text-4xl font-bold text-amber-100 mb-2">
                    {formatPrice(curso.preco, curso.is_paid)}
                  </div>
                  {curso.is_paid && (
                    <p className="text-amber-200/70 text-sm">
                      Pagamento único • Acesso vitalício
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  {userHasAccess ? (
                    <Button
                      onClick={handleAccessCourse}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 text-lg"
                      style={{ fontFamily: 'Cinzel' }}
                    >
                      <BookOpen size={20} className="mr-2" />
                      Acessar Curso
                    </Button>
                  ) : (
                    <Button
                      onClick={handlePurchase}
                      disabled={isProcessingPayment}
                      className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-black font-semibold py-3 text-lg"
                      style={{ fontFamily: 'Cinzel' }}
                    >
                      {isProcessingPayment ? (
                        <>
                          <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"></div>
                          Processando...
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={20} className="mr-2" />
                          {isGratuito ? "Inscrever-se Grátis" : "Comprar Agora"}
                        </>
                      )}
                    </Button>
                  )}

                  <Separator className="bg-amber-500/30" />

                  {/* Informações adicionais */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-amber-200">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Acesso vitalício ao conteúdo</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-amber-200">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>{totalModulos} módulos completos</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-amber-200">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Práticas rituais autênticas</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-amber-200">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Desafios de iniciação</span>
                    </div>

                    {curso.is_paid && (
                      <div className="flex items-center gap-2 text-amber-200">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>Garantia de 30 dias</span>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-amber-500/30" />

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-amber-200/70 text-sm mb-2">
                      <Users size={16} />
                      <span>+ de 1.000 estudantes</span>
                    </div>
                    <p className="text-xs text-amber-200/50">
                      Junte-se à comunidade de buscadores da verdade luciferiana
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}