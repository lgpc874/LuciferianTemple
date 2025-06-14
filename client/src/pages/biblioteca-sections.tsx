import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { PageTransition } from '@/components/page-transition';
import ContentProtection from '@/components/content-protection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Link } from 'wouter';

export default function BibliotecaSections() {
  const { isAuthenticated, user } = useAuth();
  const isMobile = useIsMobile();

  // Fetch seções da biblioteca
  const { data: sections = [], isLoading: loadingSections } = useQuery<LibrarySection[]>({
    queryKey: ['/api/library-sections']
  });

  // Fetch grimórios
  const { data: grimoires = [], isLoading: loadingGrimoires } = useQuery<Grimoire[]>({
    queryKey: ['/api/grimoires']
  });

  // Fetch progresso do usuário
  const { data: userProgress = [] } = useQuery<any[]>({
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
    return grimoireCoverSvgs[grimoire.category as keyof typeof grimoireCoverSvgs] || grimoireCoverSvgs['introducao-ocultismo'];
  };

  const isGrimoireUnlocked = (grimoire: Grimoire) => {
    // Admin sempre tem acesso
    if (user?.email === 'admin@templodoabismo.com') {
      return true;
    }
    
    // Grimórios gratuitos sempre desbloqueados para usuários logados
    if (!grimoire.isPaid && isAuthenticated) {
      return true;
    }
    
    // Grimórios pagos apenas se comprados
    if (grimoire.isPaid) {
      return (userProgress as any[]).some((progress: any) => 
        progress.grimoireId === grimoire.id && progress.isPurchased
      );
    }
    
    return false;
  };

  const getUserProgress = (grimoireId: number) => {
    return (userProgress as any[]).find((progress: any) => progress.grimoireId === grimoireId);
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
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel text-golden-amber mb-6 tracking-wider">
              BIBLIOTHECA ARCANA
            </h1>
            <p className="text-lg text-ritualistic-beige/80 max-w-3xl mx-auto leading-relaxed">
              Adentre os halls sagrados do conhecimento. Cada seção revela mistérios mais profundos aos iniciados dignos.
            </p>
          </div>

          {/* Sistema de Abas */}
          <Tabs defaultValue={sections[0]?.slug || 'porta-das-sombras'} className="w-full">
            {/* Lista de Abas */}
            <TabsList className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} w-full max-w-4xl mx-auto mb-8 bg-card/80 backdrop-blur border border-golden-amber/20`}>
              {sections.map((section) => {
                const IconComponent = getSectionIcon(section.slug);
                return (
                  <TabsTrigger 
                    key={section.slug} 
                    value={section.slug}
                    className="flex flex-col items-center gap-2 py-4 data-[state=active]:bg-golden-amber/20 data-[state=active]:text-golden-amber"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className={`font-cinzel text-xs ${isMobile ? 'text-center' : ''}`}>
                      {section.name}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Conteúdo das Abas */}
            {sections.map((section) => {
              const sectionGrimoires = getGrimoiresBySection(section.id);
              
              return (
                <TabsContent key={section.slug} value={section.slug} className="mt-0">
                  {/* Introdução da Seção */}
                  <Card className="border-golden-amber/20 bg-card/50 backdrop-blur mb-8">
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
                  {sectionGrimoires.length > 0 ? (
                    <div className={`grid gap-6 ${
                      isMobile 
                        ? 'grid-cols-1' 
                        : 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    }`}>
                      {sectionGrimoires.map((grimoire) => {
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
                                <div 
                                  className="w-full h-48 bg-gradient-to-br from-golden-amber/20 to-black/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                                  dangerouslySetInnerHTML={{ __html: coverUrl }}
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
                                      <CreditCard className="w-3 h-3 mr-1" />
                                      {grimoire.price}
                                    </Badge>
                                  )}
                                </div>

                                {/* Progresso */}
                                {progress && progress.progress > 0 && (
                                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                                    <div className="flex items-center justify-between text-xs text-white mb-1">
                                      <span>Progresso</span>
                                      <span>{progress.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-1">
                                      <div 
                                        className="bg-golden-amber h-1 rounded-full transition-all duration-300"
                                        style={{ width: `${progress.progress}%` }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardHeader>

                            <CardContent className="p-4">
                              <CardTitle className="text-lg font-cinzel text-golden-amber mb-2 line-clamp-2">
                                {grimoire.title}
                              </CardTitle>
                              
                              <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-3">
                                {grimoire.description}
                              </CardDescription>

                              <div className="flex items-center justify-between mb-3">
                                <Badge variant="outline" className="text-xs">
                                  <Star className="w-3 h-3 mr-1" />
                                  Nível {grimoire.difficultyLevel}
                                </Badge>
                                
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3 mr-1" />
                                  ~30 min
                                </div>
                              </div>

                              {isUnlocked ? (
                                <Link href={`/grimoire/${grimoire.id}`}>
                                  <Button className="w-full" size="sm">
                                    <Eye className="w-4 h-4 mr-2" />
                                    {progress && progress.progress > 0 ? 'Continuar' : 'Iniciar'}
                                  </Button>
                                </Link>
                              ) : grimoire.isPaid ? (
                                <Link href="/checkout">
                                  <Button className="w-full" variant="outline" size="sm">
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Adquirir {grimoire.price}
                                  </Button>
                                </Link>
                              ) : (
                                <Button className="w-full" variant="secondary" size="sm" disabled>
                                  <Lock className="w-4 h-4 mr-2" />
                                  Bloqueado
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-golden-amber/40 mx-auto mb-4" />
                      <p className="text-muted-foreground">Nenhum grimório disponível nesta seção.</p>
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