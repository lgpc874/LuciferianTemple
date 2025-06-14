import { useQuery } from '@tanstack/react-query';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Lock, Eye, Crown, Flame, Skull } from 'lucide-react';
import { useLocation } from 'wouter';
import { useIsMobile } from '@/hooks/use-mobile';
import { PageTransition } from '@/components/page-transition';
import ContentProtection from '@/components/content-protection';
import { grimoireCoverSvgs } from '@/components/grimoire-covers';

interface Section {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

interface Grimoire {
  id: number;
  title: string;
  description: string;
  category: string;
  difficultyLevel: number;
  isPaid: boolean;
  price: string | null;
  isActive: boolean;
  sectionId: number | null;
}

export default function BibliotecaSections() {
  const [, navigate] = useLocation();
  const isMobile = useIsMobile();

  // Seções fixas do sistema
  const sections: Section[] = [
    {
      id: 1,
      name: "PORTA DAS SOMBRAS",
      slug: "porta-das-sombras", 
      description: "Para os que chegaram ao limiar. Os olhos ainda fechados... mas já sentem o fogo.",
      icon: "eye"
    },
    {
      id: 2,
      name: "VESTÍBULO DA CHAMA",
      slug: "vestibulo-da-chama",
      description: "O primeiro despertar. A chama interior começa a arder com conhecimento primordial.",
      icon: "flame"
    },
    {
      id: 3,
      name: "TORRE DOS SELOS",
      slug: "torre-dos-selos",
      description: "Ascensão aos mistérios selados. Conhecimentos que poucos ousam desvelar.",
      icon: "crown"
    },
    {
      id: 4,
      name: "SANCTUM PROFUNDUM",
      slug: "sanctum-profundum",
      description: "O santuário dos arcanos supremos. Apenas para os que transcenderam o véu.",
      icon: "skull"
    }
  ];

  const { data: grimoires = [] } = useQuery({
    queryKey: ['/api/grimoires']
  });

  // Função para obter grimórios por seção
  const getGrimoiresBySection = (sectionId: number) => {
    return (grimoires as Grimoire[]).filter((grimoire: Grimoire) => {
      // Se não tem sectionId definido, colocar na primeira seção por padrão
      const grimoireSectionId = grimoire.sectionId || 1;
      return grimoireSectionId === sectionId && grimoire.isActive;
    });
  };

  // Função para verificar se grimório está desbloqueado
  const isGrimoireUnlocked = (grimoire: Grimoire) => {
    if (!grimoire.isPaid) return true;
    return true; // Por enquanto todos desbloqueados
  };

  // Função para obter capa do grimório
  const getGrimoireCover = (grimoire: Grimoire) => {
    const categoryKey = grimoire.category?.toLowerCase().replace(/\s+/g, '-') || 'introducao-ocultismo';
    return grimoireCoverSvgs[categoryKey as keyof typeof grimoireCoverSvgs] || grimoireCoverSvgs['introducao-ocultismo'];
  };

  // Função para obter ícone da seção
  const getSectionIcon = (slug: string) => {
    switch (slug) {
      case 'porta-das-sombras': return Eye;
      case 'vestibulo-da-chama': return Flame;
      case 'torre-dos-selos': return Crown;
      case 'sanctum-profundum': return Skull;
      default: return Eye;
    }
  };

  return (
    <ContentProtection enableScreenshotProtection={true}>
      <PageTransition className="min-h-screen bg-background">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
          {/* Header Responsivo */}
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-cinzel text-golden-amber tracking-wider mb-2">
              BIBLIOTHECA ARCANA
            </h1>
            <p className="text-xs sm:text-sm text-ritualistic-beige/70 max-w-xl mx-auto px-4">
              Adentre os halls sagrados do conhecimento esotérico
            </p>
          </div>

          {/* Sistema de Abas Esotéricas */}
          <Tabs defaultValue="porta-das-sombras" className="w-full">
            {/* Navegação das Seções - 100% Responsiva */}
            <div className="sticky top-0 bg-background/95 backdrop-blur-md py-2 sm:py-3 mb-4 sm:mb-6 z-30">
              <TabsList className="grid w-full bg-card/30 backdrop-blur-md border border-golden-amber/20 grid-cols-2 sm:grid-cols-4 h-auto gap-1 sm:gap-2 p-1 sm:p-2">
                {sections.map((section) => {
                  const IconComponent = getSectionIcon(section.slug);
                  return (
                    <TabsTrigger 
                      key={section.slug} 
                      value={section.slug}
                      className="group relative flex flex-col items-center justify-center h-14 sm:h-16 md:h-20 px-1 sm:px-2 md:px-4 py-1 sm:py-2 bg-gradient-to-br from-card/60 to-card/30 border border-golden-amber/20 rounded-lg transition-all duration-300 data-[state=active]:border-golden-amber/60 data-[state=active]:bg-gradient-to-br data-[state=active]:from-golden-amber/20 data-[state=active]:to-golden-amber/5 data-[state=active]:shadow-lg data-[state=active]:shadow-golden-amber/20 hover:border-golden-amber/40 hover:bg-gradient-to-br hover:from-golden-amber/10 hover:to-card/40"
                    >
                      {/* Ícone Responsivo */}
                      <div className="relative mb-1">
                        <div className="absolute inset-0 bg-golden-amber/20 rounded-full blur-sm group-data-[state=active]:bg-golden-amber/40 transition-all duration-300"></div>
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-golden-amber relative z-10" />
                      </div>
                      
                      {/* Nome Responsivo */}
                      <span className="text-[8px] sm:text-[10px] md:text-xs font-cinzel text-center text-golden-amber/90 group-data-[state=active]:text-golden-amber leading-tight">
                        {section.name.split(' ').map((word, i) => (
                          <div key={i} className="block">{word}</div>
                        ))}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Conteúdo das Seções */}
            {sections.map((section) => {
              const sectionGrimoires = getGrimoiresBySection(section.id);
              
              return (
                <TabsContent key={section.slug} value={section.slug} className="mt-0">
                  {/* Descrição da Seção - Oculta em mobile muito pequeno */}
                  <div className="hidden sm:block text-center mb-4 sm:mb-6 p-3 sm:p-4 bg-card/20 border border-golden-amber/20 rounded-lg backdrop-blur-sm">
                    <h2 className="text-base sm:text-lg md:text-xl font-cinzel text-golden-amber mb-2">{section.name}</h2>
                    <p className="text-xs sm:text-sm text-golden-amber/70 italic font-garamond">"{section.description}"</p>
                  </div>

                  {/* Grid de Grimórios - Totalmente Responsivo */}
                  {sectionGrimoires.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                      {sectionGrimoires.map((grimoire) => {
                        const isUnlocked = isGrimoireUnlocked(grimoire);
                        const coverSvg = getGrimoireCover(grimoire);
                        
                        return (
                          <Card 
                            key={grimoire.id} 
                            className="group relative overflow-hidden cursor-pointer border border-golden-amber/30 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-golden-amber/10 hover:border-golden-amber/50"
                            onClick={() => isUnlocked && navigate(`/grimoire/${grimoire.id}`)}
                          >
                            {/* Capa Responsiva */}
                            <div className="relative overflow-hidden h-28 sm:h-32 md:h-40 bg-gradient-to-br from-golden-amber/10 to-black/60">
                              <div 
                                className="w-full h-full flex items-center justify-center scale-75 transition-transform duration-300 group-hover:scale-80"
                                dangerouslySetInnerHTML={{ __html: coverSvg }}
                              />
                              
                              {/* Overlay para grimórios bloqueados */}
                              {!isUnlocked && (
                                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                                  <div className="text-center">
                                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 mx-auto mb-1" />
                                    <span className="text-xs text-gray-400">Selado</span>
                                  </div>
                                </div>
                              )}

                              {/* Badge de Preço - Responsivo */}
                              {grimoire.isPaid && (
                                <div className="absolute top-2 right-2">
                                  <Badge className="bg-golden-amber/90 text-black text-[10px] sm:text-xs px-1 sm:px-2 py-0.5">
                                    {grimoire.price}
                                  </Badge>
                                </div>
                              )}
                            </div>
                            
                            {/* Informações Responsivas */}
                            <CardHeader className="p-2 sm:p-3 md:p-4">
                              <CardTitle className="text-xs sm:text-sm md:text-base font-cinzel line-clamp-2 text-golden-amber leading-tight">
                                {grimoire.title}
                              </CardTitle>
                              
                              <CardDescription className="text-[10px] sm:text-xs line-clamp-2 text-ritualistic-beige/70 leading-relaxed">
                                {grimoire.description}
                              </CardDescription>
                              
                              {/* Metadados Responsivos */}
                              <div className="flex items-center justify-between mt-2 pt-2 border-t border-golden-amber/20">
                                <Badge variant="outline" className="text-[9px] sm:text-xs border-golden-amber/40 text-golden-amber bg-golden-amber/5 px-1 sm:px-2 py-0.5">
                                  Grau {grimoire.difficultyLevel}
                                </Badge>
                                
                                <span className="text-[9px] sm:text-xs text-golden-amber/60">
                                  Disponível
                                </span>
                              </div>
                            </CardHeader>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    /* Estado Vazio - Responsivo */
                    <div className="text-center py-8 sm:py-12">
                      <div className="mb-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-card/30 rounded-full flex items-center justify-center border border-golden-amber/20">
                          <Skull className="w-6 h-6 sm:w-8 sm:h-8 text-golden-amber/60" />
                        </div>
                      </div>
                      <h3 className="text-base sm:text-lg font-cinzel text-golden-amber mb-2">Seção Selada</h3>
                      <p className="text-xs sm:text-sm text-ritualistic-beige/60 px-4">
                        Nenhum grimório disponível nesta seção.
                      </p>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </PageTransition>
    </ContentProtection>
  );
}