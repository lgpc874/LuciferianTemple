import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { PageTransition } from '@/components/page-transition';
import ContentProtection from '@/components/content-protection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { grimoireCoverSvgs } from '@/components/grimoire-covers';
import { 
  BookOpen, 
  Clock, 
  Star, 
  Lock,
  Eye,
  Flame,
  Moon,
  Crown,
  Skull,
  CreditCard
} from 'lucide-react';
import { type Grimoire, type LibrarySection } from '@shared/schema';

export default function BibliotecaSections() {
  const { isAuthenticated, user } = useAuth();
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState("porta-das-sombras");

  // Fetch seções da biblioteca
  const { data: sections = [], isLoading: loadingSections } = useQuery<LibrarySection[]>({
    queryKey: ['/api/library-sections']
  });

  // Fetch grimórios
  const { data: grimoires = [], isLoading: loadingGrimoires } = useQuery<Grimoire[]>({
    queryKey: ['/api/grimoires']
  });

  // Fetch progresso do usuário
  const { data: userProgress = [] } = useQuery({
    queryKey: ['/api/progress'],
    enabled: isAuthenticated
  });

  const getSectionIcon = (slug: string) => {
    switch (slug) {
      case 'porta-das-sombras':
        return Eye;
      case 'vestibulo-da-chama':
        return Flame;
      case 'torre-dos-selos':
        return Crown;
      case 'sanctum-profundum':
        return Skull;
      default:
        return BookOpen;
    }
  };

  const getGrimoiresBySection = (sectionId: number) => {
    return grimoires.filter((grimoire: Grimoire) => 
      grimoire.sectionId === sectionId && grimoire.isActive
    );
  };

  const getGrimoireCover = (grimoire: Grimoire) => {
    if (grimoire.coverImageUrl && !grimoire.coverImageUrl.includes('placeholder')) {
      return grimoire.coverImageUrl;
    }
    
    const categoryKey = grimoire.category as keyof typeof grimoireCoverSvgs;
    if (grimoireCoverSvgs[categoryKey]) {
      const svgString = grimoireCoverSvgs[categoryKey] as unknown as string;
      return `data:image/svg+xml;base64,${btoa(svgString)}`;
    }
    
    return `https://via.placeholder.com/300x400/1a1a1a/d4af37?text=${encodeURIComponent(grimoire.title)}`;
  };

  const getUserProgress = (grimoireId: number) => {
    return (userProgress as any[]).find((p: any) => p.grimoireId === grimoireId);
  };

  const isGrimoireUnlocked = (grimoire: Grimoire) => {
    if (!isAuthenticated) return false;
    
    // Admin tem acesso completo a tudo (bypass total)
    if (user?.email === 'admin@templodoabismo.com') return true;
    
    // Grimórios gratuitos sempre desbloqueados
    if (!grimoire.isPaid) return true;
    
    // TODO: Verificar se usuário pagou pelo grimório
    // Por enquanto, grimórios pagos ficam bloqueados para usuários normais
    return false;
  };

  if (loadingSections || loadingGrimoires) {
    return (
      <PageTransition className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-golden-amber"></div>
      </PageTransition>
    );
  }

  return (
    <ContentProtection enableScreenshotProtection={true}>
      <PageTransition className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-golden-amber mb-4">
              Bibliotheca Arcana
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Adentre os halls sagrados do conhecimento. Cada seção revela mistérios mais profundos aos iniciados dignos.
            </p>
          </div>

          {/* Seções em Abas */}
          <Tabs 
            value={activeSection} 
            onValueChange={setActiveSection}
            className="w-full"
          >
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 h-auto' : 'grid-cols-4'} mb-8`}>
              {sections.map((section) => {
                const IconComponent = getSectionIcon(section.slug);
                const grimoiresCount = getGrimoiresBySection(section.id).length;
                
                return (
                  <TabsTrigger 
                    key={section.slug} 
                    value={section.slug}
                    className={`${isMobile ? 'flex-col p-3 h-auto text-xs' : 'flex-col p-4'} transition-all duration-300`}
                  >
                    <IconComponent className="w-5 h-5 mb-2 text-golden-amber" />
                    <span className="font-cinzel">{section.name}</span>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {grimoiresCount} {grimoiresCount === 1 ? 'grimório' : 'grimórios'}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {sections.map((section) => (
              <TabsContent key={section.slug} value={section.slug} className="space-y-6">
                {/* Introdução da Seção */}
                <Card className="border-golden-amber/20 bg-card/50 backdrop-blur">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-cinzel text-golden-amber flex items-center justify-center gap-3">
                      {(() => {
                        const IconComponent = getSectionIcon(section.slug);
                        return <IconComponent className="w-6 h-6" />;
                      })()}
                      {section.name}
                    </CardTitle>
                    <CardDescription className="text-lg italic text-golden-amber/80 font-garamond">
                      "{section.description}"
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Grid de Grimórios */}
                <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                  {getGrimoiresBySection(section.id).map((grimoire) => {
                    const progress = getUserProgress(grimoire.id);
                    const isUnlocked = isGrimoireUnlocked(grimoire);
                    const coverUrl = getGrimoireCover(grimoire);

                    return (
                      <Card 
                        key={grimoire.id}
                        className={`group hover:shadow-lg transition-all duration-300 border-golden-amber/20 bg-card/80 backdrop-blur ${
                          !isUnlocked ? 'opacity-60' : ''
                        }`}
                      >
                        <CardHeader className="p-0">
                          <div className="relative overflow-hidden rounded-t-lg">
                            <img
                              src={coverUrl}
                              alt={grimoire.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            
                            {/* Overlay de Status */}
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                              {!isUnlocked && (
                                <Badge variant="destructive" className="text-xs">
                                  <Lock className="w-3 h-3 mr-1" />
                                  Bloqueado
                                </Badge>
                              )}
                              
                              {grimoire.isPaid && (
                                <Badge variant="secondary" className="text-xs bg-golden-amber text-black">
                                  {grimoire.price}
                                </Badge>
                              )}
                              
                              {progress && (
                                <Badge variant="outline" className="text-xs bg-green-500/20 border-green-500">
                                  Em Andamento
                                </Badge>
                              )}
                            </div>

                            {/* Dificuldade */}
                            <div className="absolute top-2 right-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < grimoire.difficultyLevel
                                        ? 'text-golden-amber fill-current'
                                        : 'text-gray-400'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="p-4">
                          <CardTitle className="text-lg font-cinzel text-golden-amber mb-2 line-clamp-2">
                            {grimoire.title}
                          </CardTitle>
                          
                          <CardDescription className="text-sm mb-4 line-clamp-3">
                            {grimoire.description}
                          </CardDescription>

                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                            <Badge variant="outline" className="text-xs">
                              {grimoire.category}
                            </Badge>
                          </div>

                          {/* Botão condicional baseado no status do grimório */}
                          {grimoire.isPaid && !isUnlocked ? (
                            <Button
                              className="w-full bg-gradient-to-r from-golden-amber to-amber-500 text-black hover:from-golden-amber/90 hover:to-amber-500/90"
                              onClick={() => {
                                window.location.href = `/checkout?grimoire=${grimoire.id}`;
                              }}
                            >
                              <CreditCard className="w-4 h-4 mr-2" />
                              Comprar - {grimoire.price}
                            </Button>
                          ) : (
                            <Button
                              className="w-full bg-golden-amber text-black hover:bg-golden-amber/90"
                              disabled={!isUnlocked}
                              onClick={() => {
                                if (isUnlocked) {
                                  window.location.href = `/grimoire/${grimoire.id}`;
                                }
                              }}
                            >
                              {!isUnlocked ? (
                                <>
                                  <Lock className="w-4 h-4 mr-2" />
                                  Desbloqueie para Ler
                                </>
                              ) : progress ? (
                                <>
                                  <BookOpen className="w-4 h-4 mr-2" />
                                  Continuar Leitura
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Iniciar Leitura
                                </>
                              )}
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}

                  {/* Mensagem quando não há grimórios */}
                  {getGrimoiresBySection(section.id).length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <div className="text-golden-amber/60 mb-4">
                        <BookOpen className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-cinzel">Seção em Preparação</h3>
                        <p className="text-muted-foreground mt-2">
                          Os grimórios desta seção ainda estão sendo transcritos pelos escribas do templo.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </PageTransition>
    </ContentProtection>
  );
}