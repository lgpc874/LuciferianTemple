import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageTransition } from "@/components/page-transition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  BookOpen, 
  Eye, 
  Flame, 
  Crown, 
  Skull, 
  FileText, 
  Brain,
  Clock,
  Star,
  ArrowRight,
  MoveVertical,
  Edit
} from "lucide-react";
import type { Grimoire, LibrarySection } from "@shared/schema";

export default function Biblioteca() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeSection, setActiveSection] = useState<number>(1);

  // Buscar seções da biblioteca
  const { data: sections = [], isLoading: loadingSections } = useQuery({
    queryKey: ['/api/library/sections'],
  });

  // Buscar todos os grimórios
  const { data: allGrimoires = [], isLoading: loadingGrimoires } = useQuery({
    queryKey: ['/api/grimoires'],
  });

  // Buscar grimórios da seção ativa
  const { data: sectionGrimoires = [] } = useQuery({
    queryKey: ['/api/grimoires/section', activeSection],
    enabled: !!activeSection,
  });

  // Mutation para mover grimório
  const moveGrimoireMutation = useMutation({
    mutationFn: async ({ grimoireId, sectionId }: { grimoireId: number; sectionId: number }) => {
      return apiRequest('PUT', `/api/admin/grimoires/${grimoireId}/move-section`, { sectionId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires'] });
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires/section'] });
      toast({
        title: "Sucesso",
        description: "Grimório movido para nova seção",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao mover grimório",
        variant: "destructive",
      });
    },
  });

  const getSectionIcon = (sectionId: number) => {
    switch (sectionId) {
      case 1: return Eye;
      case 2: return Flame;
      case 3: return Crown;
      case 4: return Skull;
      case 5: return FileText;
      case 6: return Brain;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return "bg-green-500/20 text-green-300 border-green-500/30";
      case 2: return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case 3: return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case 4: return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getDifficultyText = (level: number) => {
    switch (level) {
      case 1: return "Iniciante";
      case 2: return "Intermediário";
      case 3: return "Avançado";
      case 4: return "Mestre";
      default: return "Indefinido";
    }
  };

  const handleMoveGrimoire = async (grimoireId: number, newSectionId: number) => {
    await moveGrimoireMutation.mutateAsync({ grimoireId, sectionId: newSectionId });
  };

  if (loadingSections || loadingGrimoires) {
    return (
      <PageTransition className="min-h-screen mystical-bg pt-4 fade-in">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden-amber mx-auto mb-4"></div>
          <p className="text-ritualistic-beige">Carregando biblioteca...</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen mystical-bg pt-4 fade-in">
      {/* Header da biblioteca */}
      <div className="relative py-16 bg-gradient-to-b from-red-950/20 to-transparent">
        <div className="relative text-center">
          <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-red-500 mb-6 tracking-wider biblioteca-title">
            ⸸ BIBLIOTHECA ARCANA ⸸
          </h1>
          <div className="w-32 h-1 bg-red-500 mx-auto mb-8"></div>
          
          <div className="max-w-3xl mx-auto px-4">
            <p className="font-garamond text-lg text-ritualistic-beige/90 leading-relaxed italic">
              Nos corredores silenciosos desta biblioteca ancestral repousam os segredos mais profundos 
              do conhecimento proibido. Cada grimório é uma chave para os mistérios do abismo, 
              onde apenas os iniciados ousam trilhar os caminhos da verdadeira iluminação.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-6 text-red-400/60">
              <span className="text-2xl">◆</span>
              <span className="font-cinzel text-sm tracking-widest">IN TENEBRIS LUX</span>
              <span className="text-2xl">◆</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação por seções */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Tabs value={activeSection.toString()} onValueChange={(value) => setActiveSection(parseInt(value))}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 bg-transparent h-auto p-1">
            {sections.map((section: LibrarySection) => {
              const IconComponent = getSectionIcon(section.id);
              const sectionGrimoireCount = allGrimoires.filter((g: Grimoire) => g.section_id === section.id).length;
              
              return (
                <TabsTrigger
                  key={section.id}
                  value={section.id.toString()}
                  className="flex flex-col items-center p-4 space-y-2 data-[state=active]:bg-red-900/50 data-[state=active]:text-golden-amber border border-golden-amber/30 hover:border-golden-amber/60 transition-all duration-300"
                >
                  <IconComponent size={20} />
                  <span className="text-xs font-cinzel font-medium text-center leading-tight">
                    {section.name}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {sectionGrimoireCount}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Conteúdo das seções */}
          {sections.map((section: LibrarySection) => (
            <TabsContent key={section.id} value={section.id.toString()} className="mt-8">
              <div className="mb-6">
                <h2 className="font-cinzel text-2xl text-golden-amber mb-2">{section.name}</h2>
                <p className="font-garamond text-ritualistic-beige/80">{section.description}</p>
              </div>

              {/* Grid de grimórios */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectionGrimoires.map((grimoire: Grimoire) => (
                  <Card key={grimoire.id} className="bg-black/40 border-golden-amber/30 hover:border-golden-amber/60 transition-all duration-300 overflow-hidden group">
                    <div className="relative">
                      {grimoire.cover_image_url && (
                        <div className="aspect-[3/4] overflow-hidden">
                          <img 
                            src={grimoire.cover_image_url} 
                            alt={grimoire.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      {grimoire.is_paid && grimoire.price && (
                        <Badge className="absolute top-2 right-2 bg-golden-amber text-black">
                          R$ {grimoire.price}
                        </Badge>
                      )}
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="font-cinzel text-golden-amber text-lg leading-tight">
                        {grimoire.title}
                      </CardTitle>
                      <CardDescription className="font-garamond text-ritualistic-beige/80 text-sm line-clamp-2">
                        {grimoire.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className={`text-xs border ${getDifficultyColor(grimoire.difficulty_level)}`}>
                          {getDifficultyText(grimoire.difficulty_level)}
                        </Badge>
                        
                        <div className="flex items-center text-ritualistic-beige/60 text-xs">
                          <Clock size={12} className="mr-1" />
                          {grimoire.estimated_reading_time}min
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button 
                          size="sm" 
                          className="bg-golden-amber/20 text-golden-amber hover:bg-golden-amber/30 border border-golden-amber/50"
                        >
                          <BookOpen size={14} className="mr-2" />
                          Ler
                        </Button>

                        {user?.isAdmin && (
                          <div className="flex items-center space-x-2">
                            <Select onValueChange={(value) => handleMoveGrimoire(grimoire.id, parseInt(value))}>
                              <SelectTrigger className="w-8 h-8 p-0 border-golden-amber/30">
                                <MoveVertical size={14} />
                              </SelectTrigger>
                              <SelectContent>
                                {sections.filter(s => s.id !== grimoire.section_id).map((s: LibrarySection) => (
                                  <SelectItem key={s.id} value={s.id.toString()}>
                                    {s.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            
                            <Button size="sm" variant="outline" className="w-8 h-8 p-0 border-golden-amber/30">
                              <Edit size={14} />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {sectionGrimoires.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen size={48} className="mx-auto text-golden-amber/50 mb-4" />
                  <h3 className="font-cinzel text-lg text-golden-amber mb-2">Seção em Construção</h3>
                  <p className="font-garamond text-ritualistic-beige/60">
                    Esta seção ainda não possui grimórios disponíveis.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageTransition>
  );
}