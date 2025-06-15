import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { PageTransition } from "@/components/page-transition";
import ContentProtection from "@/components/content-protection";
import MysticalFooter from "@/components/mystical-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Eye, 
  Flame, 
  Crown, 
  Skull, 
  FileText, 
  Brain,
  Clock
} from "lucide-react";
import type { Grimoire, LibrarySection } from "@shared/schema";

export default function Biblioteca() {
  const [activeSection, setActiveSection] = useState(1);
  const [, setLocation] = useLocation();

  const { data: sections = [], isLoading: sectionsLoading } = useQuery({
    queryKey: ['/api/library/sections'],
  });

  const { data: allGrimoires = [], isLoading: grimoiresLoading } = useQuery({
    queryKey: ['/api/grimoires'],
  });

  // Função para determinar o estado do botão
  const getButtonState = (grimoire: any) => {
    // Verificar se é pago e se foi comprado
    if (grimoire.is_paid) {
      // Verificar compras do usuário (implementar depois)
      const isPurchased = false; // placeholder
      if (!isPurchased) {
        return { text: 'Comprar', action: 'purchase' };
      }
    }

    // Verificar progresso de leitura (implementar depois)
    // const progress = userProgress.find((p: any) => p.grimoire_id === grimoire.id);
    // if (progress && progress.progress_percentage > 0) {
    //   return { text: 'Continuar', action: 'continue' };
    // }

    return { text: 'Ler', action: 'read' };
  };

  // Função para lidar com ações do grimório
  const handleGrimoireAction = (grimoire: any) => {
    const buttonState = getButtonState(grimoire);
    
    switch (buttonState.action) {
      case 'read':
      case 'continue':
        // Navegar para o leitor do grimório
        setLocation(`/grimoire/${grimoire.id}`);
        break;
      case 'purchase':
        // Navegar para página de compra (implementar depois)
        console.log(`Comprar grimório: ${grimoire.title}`);
        break;
      default:
        console.log(`Ação não reconhecida: ${buttonState.action}`);
    }
  };

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

  if (sectionsLoading || grimoiresLoading) {
    return (
      <PageTransition className="min-h-screen bg-transparent">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden-amber mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando biblioteca arcana...</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <ContentProtection enableScreenshotProtection={true}>
      <PageTransition className="min-h-screen bg-transparent">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
          
          {/* Título e frase */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-cinzel text-golden-amber tracking-wider mb-4">
              BIBLIOTHECA ARCANA
            </h1>
            <p className="text-sm sm:text-base text-ritualistic-beige/80 max-w-2xl mx-auto px-4">
              Nos corredores silenciosos repousam os segredos do conhecimento proibido
            </p>
          </div>

          {/* Abas */}
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeSection.toString()} onValueChange={(value) => setActiveSection(parseInt(value))}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto p-1">
                {(sections as LibrarySection[]).map((section: LibrarySection) => {
                  const IconComponent = getSectionIcon(section.id);
                  const grimoireCount = (allGrimoires as Grimoire[]).filter((g: Grimoire) => g.section_id === section.id).length;
                  
                  return (
                    <TabsTrigger
                      key={section.id}
                      value={section.id.toString()}
                      className="flex flex-col items-center p-3 sm:p-4 space-y-2 data-[state=active]:bg-red-900/50 data-[state=active]:text-golden-amber hover:bg-red-900/30 transition-all duration-300 border border-golden-amber/20 rounded-lg bg-black/30 backdrop-blur-sm"
                    >
                      <IconComponent size={20} className="text-golden-amber" />
                      <span className="text-xs font-cinzel text-center leading-tight">{section.name}</span>
                      <Badge variant="outline" className="text-xs border-golden-amber/30 text-golden-amber/70">
                        {grimoireCount}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {(sections as LibrarySection[]).map((section) => {
                const sectionGrimoires = (allGrimoires as Grimoire[]).filter((g: Grimoire) => g.section_id === section.id);
                
                return (
                  <TabsContent key={section.id} value={section.id.toString()} className="mt-8">
                    <div className="mb-6">
                      <h3 className="text-xl sm:text-2xl font-cinzel text-golden-amber mb-2 text-center">
                        {section.name}
                      </h3>
                      <p className="text-sm text-ritualistic-beige/70 text-center max-w-2xl mx-auto">
                        {section.description}
                      </p>
                    </div>
                    
                    {sectionGrimoires.length > 0 ? (
                      <div className="space-y-3">
                        {sectionGrimoires.map((grimoire) => (
                          <motion.div
                            key={grimoire.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="group"
                          >
                            <Card className="bg-black/40 border-golden-amber/20 backdrop-blur-sm hover:border-golden-amber/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                              <div className="flex p-4">
                                {/* Capa à esquerda */}
                                <div className="relative overflow-hidden rounded-lg mr-4 flex-shrink-0">
                                  {grimoire.cover_image_url ? (
                                    <div className="w-20 h-28 bg-gradient-to-b from-red-900/20 to-black/60">
                                      <img 
                                        src={grimoire.cover_image_url} 
                                        alt={grimoire.title}
                                        className="w-full h-full object-cover opacity-80 rounded-lg"
                                      />
                                    </div>
                                  ) : (
                                    <div className="w-20 h-28 bg-gradient-to-b from-red-900/20 to-black/60 flex items-center justify-center rounded-lg">
                                      <BookOpen className="h-6 w-6 text-golden-amber/50" />
                                    </div>
                                  )}
                                </div>
                                
                                {/* Conteúdo à direita */}
                                <div className="flex-1 flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-start justify-between mb-2">
                                      <h3 className="font-cinzel text-golden-amber text-lg font-semibold line-clamp-2 flex-1 mr-2">
                                        {grimoire.title}
                                      </h3>
                                      {grimoire.is_paid && grimoire.price && (
                                        <Badge className="bg-golden-amber/90 text-black font-semibold text-sm">
                                          R$ {grimoire.price}
                                        </Badge>
                                      )}
                                    </div>
                                    
                                    <p className="text-ritualistic-beige/70 text-sm line-clamp-2 mb-3">
                                      {grimoire.description}
                                    </p>
                                    
                                    <div className="flex items-center space-x-4 text-xs text-ritualistic-beige/60 mb-3">
                                      <div className="flex items-center space-x-1">
                                        <Clock size={12} />
                                        <span>{grimoire.estimated_reading_time || 0} min</span>
                                      </div>
                                      <Badge className={`text-xs ${getDifficultyColor(parseInt(grimoire.level))}`}>
                                        {getDifficultyText(parseInt(grimoire.level))}
                                      </Badge>
                                    </div>
                                  </div>
                                  
                                  {/* Botão dinâmico */}
                                  <div className="flex justify-end">
                                    <Button 
                                      size="sm" 
                                      className="bg-red-900/50 hover:bg-red-900/70 text-golden-amber border border-golden-amber/20 hover:border-golden-amber/40 px-6"
                                      onClick={() => handleGrimoireAction(grimoire)}
                                    >
                                      {getButtonState(grimoire).text}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <BookOpen className="mx-auto h-12 w-12 text-golden-amber/30 mb-4" />
                        <p className="text-ritualistic-beige/50">Nenhum grimório encontrado nesta seção</p>
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>

          <MysticalFooter />
        </div>
      </PageTransition>
    </ContentProtection>
  );
}