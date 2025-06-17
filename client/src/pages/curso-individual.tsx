import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Flame, Eye, Crown, CheckCircle, Circle, ArrowLeft, Send } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Curso, Modulo, RespostaCurso, ProgressoCurso } from "../../../shared/schema";

// Componente para ícone do curso
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

// Componente para resposta do módulo
const ModuleResponse = ({ modulo, respostaExistente, onRespostaSalva }: {
  modulo: Modulo;
  respostaExistente?: RespostaCurso;
  onRespostaSalva: () => void;
}) => {
  const [resposta, setResposta] = useState(respostaExistente?.resposta || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const salvarRespostaMutation = useMutation({
    mutationFn: async (data: { modulo_id: number; resposta: string }) => {
      return apiRequest("/api/cursos/resposta", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      toast({
        title: "Resposta salva",
        description: "Sua resposta foi salva com sucesso.",
      });
      onRespostaSalva();
      setIsSubmitting(false);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao salvar resposta. Tente novamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const handleSubmit = () => {
    if (!resposta.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, escreva sua resposta antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    salvarRespostaMutation.mutate({
      modulo_id: modulo.id,
      resposta: resposta.trim(),
    });
  };

  return (
    <div className="mt-8 p-6 bg-black/20 rounded-lg border border-amber-500/30">
      <h4 className="text-lg font-semibold text-amber-100 mb-4" style={{ fontFamily: 'Cinzel' }}>
        📜 Resposta Ritualística
      </h4>
      
      <div 
        className="text-amber-200/90 mb-4 leading-relaxed"
        style={{ fontFamily: 'EB Garamond' }}
        dangerouslySetInnerHTML={{ __html: modulo.desafio }}
      />
      
      <Textarea
        value={resposta}
        onChange={(e) => setResposta(e.target.value)}
        placeholder="Compartilhe sua experiência iniciática..."
        className="min-h-[150px] bg-black/40 border-amber-500/50 text-amber-100 placeholder:text-amber-200/50 focus:border-amber-500"
        style={{ fontFamily: 'EB Garamond' }}
      />
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-amber-200/70">
          {respostaExistente ? "Última atualização: " + new Date(respostaExistente.updated_at).toLocaleDateString() : "Nova resposta"}
        </span>
        
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !resposta.trim()}
          className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-black font-semibold"
          style={{ fontFamily: 'Cinzel' }}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full mr-2"></div>
              Salvando...
            </>
          ) : (
            <>
              <Send size={16} className="mr-2" />
              {respostaExistente ? "Atualizar" : "Enviar"} Resposta
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default function CursoIndividualPage() {
  const [, params] = useRoute("/curso/:slug");
  const slug = params?.slug;
  const queryClient = useQueryClient();

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

  // Buscar respostas do usuário
  const { data: respostas } = useQuery<RespostaCurso[]>({
    queryKey: [`/api/cursos/respostas/${curso?.id}`],
    enabled: !!curso?.id,
  });

  // Buscar progresso do usuário
  const { data: progresso } = useQuery<ProgressoCurso>({
    queryKey: [`/api/cursos/progresso/${curso?.id}`],
    enabled: !!curso?.id,
  });

  const handleRespostaSalva = () => {
    queryClient.invalidateQueries({ queryKey: [`/api/cursos/respostas/${curso?.id}`] });
    queryClient.invalidateQueries({ queryKey: [`/api/cursos/progresso/${curso?.id}`] });
  };

  if (cursoLoading || modulosLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-950 via-black to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-amber-100">Carregando curso...</p>
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

  // Calcular progresso
  const totalModulos = modulos?.length || 0;
  const modulosComResposta = respostas?.length || 0;
  const progressoPercentual = totalModulos > 0 ? (modulosComResposta / totalModulos) * 100 : 0;

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

          <div className="text-center">
            <div className="flex justify-center mb-6">
              {curso.imagem_url ? (
                <img 
                  src={curso.imagem_url} 
                  alt={curso.nome}
                  className="w-24 h-24 object-cover rounded-lg border-2 border-amber-500"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-red-600 rounded-lg flex items-center justify-center">
                  <CourseIcon nivel={curso.nivel} />
                </div>
              )}
            </div>

            <h1 
              className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-red-500"
              style={{ fontFamily: 'Cinzel Decorative' }}
            >
              {curso.nome}
            </h1>

            <div className="flex justify-center gap-4 mb-6">
              <Badge variant="outline" className="border-amber-500 text-amber-500">
                <CourseIcon nivel={curso.nivel} />
                <span className="ml-1 capitalize">{curso.nivel}</span>
              </Badge>
              
              {curso.is_paid && curso.preco && (
                <Badge variant="outline" className="border-red-500 text-red-400">
                  R$ {parseFloat(curso.preco).toFixed(2)}
                </Badge>
              )}
            </div>

            <p 
              className="text-lg text-amber-100 max-w-3xl mx-auto mb-8 leading-relaxed"
              style={{ fontFamily: 'EB Garamond' }}
            >
              {curso.descricao}
            </p>

            {/* Barra de progresso */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-amber-200 mb-2">
                <span>Progresso do Curso</span>
                <span>{modulosComResposta}/{totalModulos} módulos</span>
              </div>
              <Progress value={progressoPercentual} className="h-3" />
              <p className="text-xs text-amber-200/70 mt-1">
                {progressoPercentual.toFixed(0)}% concluído
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo dos módulos */}
      <div className="container mx-auto px-4 py-8">
        {!modulos || modulos.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl text-amber-100 mb-2" style={{ fontFamily: 'Cinzel' }}>
              Módulos em preparação
            </h3>
            <p className="text-amber-200/80" style={{ fontFamily: 'EB Garamond' }}>
              O conteúdo deste curso está sendo finalizado.
            </p>
          </div>
        ) : (
          <Tabs defaultValue={`modulo-${modulos[0]?.id}`} className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-black/40 p-2">
              {modulos.map((modulo, index) => {
                const temResposta = respostas?.some(r => r.modulo_id === modulo.id);
                return (
                  <TabsTrigger 
                    key={modulo.id}
                    value={`modulo-${modulo.id}`}
                    className="data-[state=active]:bg-amber-600 data-[state=active]:text-black text-amber-100 border border-amber-500/30 hover:border-amber-500"
                  >
                    <div className="flex items-center gap-2">
                      {temResposta ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <Circle size={16} className="text-amber-500" />
                      )}
                      <span className="hidden sm:inline">Módulo {index + 1}</span>
                      <span className="sm:hidden">{index + 1}</span>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {modulos.map((modulo) => (
              <TabsContent key={modulo.id} value={`modulo-${modulo.id}`} className="mt-8">
                <Card className="bg-black/40 backdrop-blur border-amber-500/30">
                  <CardHeader>
                    <CardTitle 
                      className="text-2xl text-amber-100 text-center"
                      style={{ fontFamily: 'Cinzel Decorative' }}
                    >
                      {modulo.titulo}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Conteúdo teórico */}
                    <div className="mb-8">
                      <div 
                        className="prose prose-amber max-w-none text-amber-100"
                        style={{ fontFamily: 'EB Garamond' }}
                        dangerouslySetInnerHTML={{ __html: modulo.conteudo }}
                      />
                    </div>

                    {/* Prática ritual */}
                    {modulo.pratica && (
                      <div className="mb-8 p-6 bg-amber-900/20 rounded-lg border border-amber-500/30">
                        <h3 className="text-xl font-semibold text-amber-100 mb-4" style={{ fontFamily: 'Cinzel' }}>
                          🔥 Prática Ritual
                        </h3>
                        <div 
                          className="prose prose-amber max-w-none text-amber-100"
                          style={{ fontFamily: 'EB Garamond' }}
                          dangerouslySetInnerHTML={{ __html: modulo.pratica }}
                        />
                      </div>
                    )}

                    {/* Componente de resposta */}
                    <ModuleResponse 
                      modulo={modulo}
                      respostaExistente={respostas?.find(r => r.modulo_id === modulo.id)}
                      onRespostaSalva={handleRespostaSalva}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
}