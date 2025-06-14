import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { PageTransition } from '@/components/page-transition';
import ContentProtection from '@/components/content-protection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

          {/* Seções da Biblioteca - Layout Vertical */}
          <div className="space-y-16">
            {sections.map((section) => {
              const IconComponent = getSectionIcon(section.slug);
              const sectionGrimoires = getGrimoiresBySection(section.id);
              
              return (
                <div key={section.id} className="space-y-8">
                  {/* Header da Seção */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="h-px bg-gradient-to-r from-transparent via-golden-amber/40 to-transparent flex-1"></div>
                      <IconComponent className="w-8 h-8 text-golden-amber" />
                      <div className="h-px bg-gradient-to-r from-transparent via-golden-amber/40 to-transparent flex-1"></div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-cinzel text-golden-amber mb-3 tracking-wider">
                      {section.name.toUpperCase()}
                    </h2>
                    
                    <p className="text-lg italic text-golden-amber/80 font-garamond max-w-2xl mx-auto">
                      "{section.description}"
                    </p>
                    
                    <div className="mt-4">
                      <Badge variant="outline" className="border-golden-amber/30 text-golden-amber">
                        {sectionGrimoires.length} {sectionGrimoires.length === 1 ? 'Grimório' : 'Grimórios'}
                      </Badge>
                    </div>
                  </div>

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
                </div>
              );
            })}
          </div>
        </div>
      </PageTransition>
    </ContentProtection>
  );
}