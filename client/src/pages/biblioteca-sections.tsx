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

          {/* Sistema de Abas Místicas */}
          <Tabs defaultValue={sections[0]?.slug || 'porta-das-sombras'} className="w-full">
            {/* Navegação Arcana */}
            <div className={`relative ${isMobile ? 'mb-8' : 'mb-12'} z-20`}>
              {/* Ornamento Central Superior */}
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-golden-amber/60 to-transparent w-32"></div>
                <div className="mx-4 p-3 rounded-full bg-gradient-to-br from-golden-amber/20 to-golden-amber/5 border border-golden-amber/30">
                  <BookOpen className="w-6 h-6 text-golden-amber" />
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-golden-amber/60 to-transparent w-32"></div>
              </div>

              {/* Abas Místicas */}
              <TabsList className={`
                relative grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-4 gap-4'} 
                w-full ${isMobile ? 'max-w-sm' : 'max-w-6xl'} mx-auto p-0 bg-transparent z-30
              `}>
                {sections.map((section, index) => {
                  const IconComponent = getSectionIcon(section.slug);
                  return (
                    <TabsTrigger 
                      key={section.slug} 
                      value={section.slug}
                      className={`
                        group relative flex flex-col items-center gap-2 h-auto
                        ${isMobile ? 'p-3' : 'p-6 gap-3'}
                        bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-md
                        border border-golden-amber/20 rounded-lg
                        transition-all duration-300 ease-in-out
                        hover:border-golden-amber/40 hover:shadow-lg hover:shadow-golden-amber/10
                        ${isMobile ? 'active:scale-95' : 'hover:scale-105'} hover:bg-gradient-to-br hover:from-golden-amber/10 hover:to-card/40
                        data-[state=active]:border-golden-amber/60 data-[state=active]:bg-gradient-to-br 
                        data-[state=active]:from-golden-amber/20 data-[state=active]:to-golden-amber/5
                        data-[state=active]:shadow-xl data-[state=active]:shadow-golden-amber/20
                        ${isMobile ? 'data-[state=active]:scale-100' : 'data-[state=active]:scale-105'}
                        ${index === 0 ? 'data-[state=active]:animate-pulse' : ''}
                      `}
                    >
                      {/* Ícone com Efeito Místico */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-golden-amber/20 rounded-full blur-sm group-data-[state=active]:bg-golden-amber/40 transition-all duration-300"></div>
                        <IconComponent className={`relative ${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-golden-amber/80 group-data-[state=active]:text-golden-amber group-hover:text-golden-amber transition-colors duration-300`} />
                      </div>
                      
                      {/* Nome da Seção */}
                      <div className="text-center">
                        <span className={`
                          font-cinzel font-medium tracking-wider transition-all duration-300
                          ${isMobile ? 'text-[10px] leading-tight' : 'text-sm'} 
                          text-golden-amber/70 group-data-[state=active]:text-golden-amber 
                          group-hover:text-golden-amber/90
                        `}>
                          {isMobile ? section.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : section.name}
                        </span>
                        
                        {/* Indicador Ativo */}
                        <div className={`${isMobile ? 'mt-1 h-0.5' : 'mt-2 h-0.5'} bg-gradient-to-r from-transparent via-golden-amber to-transparent opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300`}></div>
                      </div>

                      {/* Efeito de Brilho */}
                      <div className="absolute inset-0 bg-gradient-to-br from-golden-amber/5 to-transparent opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-50 transition-opacity duration-500 rounded-lg pointer-events-none"></div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {/* Ornamento Inferior */}
              <div className={`flex items-center justify-center ${isMobile ? 'mt-4' : 'mt-6'}`}>
                <div className="h-px bg-gradient-to-r from-transparent via-golden-amber/40 to-transparent w-24"></div>
                <div className="mx-3 w-1 h-1 bg-golden-amber/60 rounded-full"></div>
                <div className="mx-1 w-1 h-1 bg-golden-amber/40 rounded-full"></div>
                <div className="mx-3 w-1 h-1 bg-golden-amber/60 rounded-full"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-golden-amber/40 to-transparent w-24"></div>
              </div>
            </div>
            
            {/* Espaçador entre Abas e Conteúdo */}
            <div className={`${isMobile ? 'h-12' : 'h-8'}`}></div>

            {/* Conteúdo das Abas */}
            {sections.map((section) => {
              const sectionGrimoires = getGrimoiresBySection(section.id);
              
              return (
                <TabsContent key={section.slug} value={section.slug} className="mt-0 relative z-10">
                  {/* Portal da Seção */}
                  <div className={`relative ${isMobile ? 'mb-8' : 'mb-12'}`}>
                    {/* Ornamento de Entrada */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3">
                      <div className="w-6 h-6 bg-golden-amber/20 rotate-45 border border-golden-amber/40"></div>
                    </div>
                    
                    <Card className="relative overflow-hidden border-2 border-golden-amber/30 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl shadow-2xl shadow-golden-amber/10">
                      {/* Efeito de Brilho Interno */}
                      <div className="absolute inset-0 bg-gradient-to-br from-golden-amber/5 via-transparent to-golden-amber/10 pointer-events-none"></div>
                      
                      {/* Padrão Geométrico de Fundo */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-4 left-4 w-8 h-8 border border-golden-amber rotate-45"></div>
                        <div className="absolute top-4 right-4 w-6 h-6 border border-golden-amber rotate-12"></div>
                        <div className="absolute bottom-4 left-1/3 w-4 h-4 bg-golden-amber/20 rotate-45"></div>
                        <div className="absolute bottom-4 right-1/3 w-5 h-5 border border-golden-amber/30 rounded-full"></div>
                      </div>
                      
                      <CardHeader className="relative text-center py-8 px-6">
                        {/* Símbolo da Seção */}
                        <div className="mb-6">
                          <div className="relative inline-block">
                            <div className="absolute inset-0 bg-golden-amber/30 rounded-full blur-xl animate-pulse"></div>
                            <div className="relative p-4 bg-gradient-to-br from-golden-amber/20 to-golden-amber/5 rounded-full border border-golden-amber/40">
                              {(() => {
                                const IconComponent = getSectionIcon(section.slug);
                                return <IconComponent className="w-8 h-8 text-golden-amber" />;
                              })()}
                            </div>
                          </div>
                        </div>
                        
                        {/* Título Arcano */}
                        <CardTitle className="text-3xl md:text-4xl font-cinzel text-golden-amber mb-4 tracking-wider relative">
                          <span className="relative z-10">{section.name}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-golden-amber/10 to-transparent blur-sm"></div>
                        </CardTitle>
                        
                        {/* Citação Mística */}
                        <div className="relative">
                          <CardDescription className="text-lg md:text-xl italic text-golden-amber/90 font-garamond max-w-2xl mx-auto leading-relaxed">
                            <span className="text-golden-amber/60 text-2xl leading-none">"</span>
                            <span className="mx-1">{section.description}</span>
                            <span className="text-golden-amber/60 text-2xl leading-none">"</span>
                          </CardDescription>
                        </div>
                        
                        {/* Separador Ornamental */}
                        <div className="mt-6 flex items-center justify-center">
                          <div className="h-px bg-gradient-to-r from-transparent via-golden-amber/60 to-transparent w-16"></div>
                          <div className="mx-4 w-2 h-2 bg-golden-amber/60 rounded-full"></div>
                          <div className="h-px bg-gradient-to-r from-transparent via-golden-amber/60 to-transparent w-16"></div>
                        </div>
                      </CardHeader>
                    </Card>
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
                            className={`
                              group relative overflow-hidden
                              border-2 border-golden-amber/30 bg-gradient-to-br from-card/90 via-card/70 to-card/50 
                              backdrop-blur-xl shadow-lg shadow-black/20
                              transition-all duration-300 ease-out
                              ${isMobile ? 'active:scale-95' : 'hover:scale-105 hover:-translate-y-2'}
                              hover:border-golden-amber/50 hover:shadow-2xl hover:shadow-golden-amber/20
                              ${!isUnlocked ? 'opacity-60 saturate-50' : 'hover:bg-gradient-to-br hover:from-card/95 hover:via-golden-amber/5 hover:to-card/60'}
                            `}
                          >
                            {/* Efeito de Brilho Místico */}
                            <div className="absolute inset-0 bg-gradient-to-br from-golden-amber/5 via-transparent to-golden-amber/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            
                            {/* Ornamentos nos Cantos - Menores no Mobile */}
                            <div className={`absolute top-2 left-2 ${isMobile ? 'w-2 h-2' : 'w-3 h-3'} border-l-2 border-t-2 border-golden-amber/40 opacity-60`}></div>
                            <div className={`absolute top-2 right-2 ${isMobile ? 'w-2 h-2' : 'w-3 h-3'} border-r-2 border-t-2 border-golden-amber/40 opacity-60`}></div>
                            <div className={`absolute bottom-2 left-2 ${isMobile ? 'w-2 h-2' : 'w-3 h-3'} border-l-2 border-b-2 border-golden-amber/40 opacity-60`}></div>
                            <div className={`absolute bottom-2 right-2 ${isMobile ? 'w-2 h-2' : 'w-3 h-3'} border-r-2 border-b-2 border-golden-amber/40 opacity-60`}></div>

                            <CardHeader className="p-0">
                              <div className="relative overflow-hidden">
                                {/* Capa do Grimório - Altura Responsiva */}
                                <div className={`relative ${isMobile ? 'h-48' : 'h-64'} bg-gradient-to-br from-golden-amber/20 via-black/60 to-black/80 flex items-center justify-center ${isMobile ? 'active:scale-105' : 'group-hover:scale-110'} transition-transform duration-500`}>
                                  <div 
                                    className={`w-full h-full flex items-center justify-center ${isMobile ? 'scale-70' : 'scale-75 group-hover:scale-85'} transition-transform duration-500`}
                                    dangerouslySetInnerHTML={{ __html: coverUrl }}
                                  />
                                  
                                  {/* Overlay Gradient */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                                </div>
                                
                                {/* Status Badges Elegantes */}
                                <div className="absolute top-3 left-3 flex flex-col gap-2">
                                  {!isUnlocked && (
                                    <Badge className="bg-red-900/80 text-red-100 border-red-700/50 backdrop-blur-sm text-xs font-medium">
                                      <Lock className="w-3 h-3 mr-1" />
                                      Selado
                                    </Badge>
                                  )}
                                  
                                  {grimoire.isPaid && (
                                    <Badge className="bg-golden-amber/90 text-black border-golden-amber/60 backdrop-blur-sm text-xs font-semibold">
                                      <CreditCard className="w-3 h-3 mr-1" />
                                      {grimoire.price}
                                    </Badge>
                                  )}
                                </div>

                                {/* Progresso Místico */}
                                {progress && progress.progress > 0 && (
                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3">
                                    <div className="flex items-center justify-between text-xs text-golden-amber/90 mb-2 font-medium">
                                      <span>Progressão Arcana</span>
                                      <span className="text-golden-amber font-semibold">{progress.progress}%</span>
                                    </div>
                                    <div className="relative">
                                      <div className="w-full bg-black/60 rounded-full h-1.5 overflow-hidden">
                                        <div 
                                          className="bg-gradient-to-r from-golden-amber via-yellow-400 to-golden-amber h-full rounded-full transition-all duration-700 shadow-lg shadow-golden-amber/50"
                                          style={{ width: `${progress.progress}%` }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardHeader>

                            <CardContent className={`relative ${isMobile ? 'p-3 space-y-3' : 'p-5 space-y-4'}`}>
                              {/* Título do Grimório */}
                              <CardTitle className={`${isMobile ? 'text-lg mb-2' : 'text-xl mb-3'} font-cinzel text-golden-amber line-clamp-2 leading-tight group-hover:text-golden-amber/90 transition-colors duration-300`}>
                                {grimoire.title}
                              </CardTitle>
                              
                              {/* Descrição Mística */}
                              <CardDescription className={`${isMobile ? 'text-xs mb-3 line-clamp-2' : 'text-sm mb-4 line-clamp-3'} text-muted-foreground/90 leading-relaxed font-garamond`}>
                                {grimoire.description}
                              </CardDescription>

                              {/* Metadados Arcanos */}
                              <div className={`flex items-center justify-between ${isMobile ? 'mb-3 pt-1' : 'mb-4 pt-2'} border-t border-golden-amber/20`}>
                                <Badge variant="outline" className={`border-golden-amber/40 text-golden-amber/80 ${isMobile ? 'text-[10px] px-1.5 py-0.5' : 'text-xs'} font-medium bg-golden-amber/5`}>
                                  <Star className={`${isMobile ? 'w-2.5 h-2.5 mr-1' : 'w-3 h-3 mr-1.5'}`} />
                                  Grau {grimoire.difficultyLevel}
                                </Badge>
                                
                                <div className={`flex items-center ${isMobile ? 'text-[10px]' : 'text-xs'} text-muted-foreground/70`}>
                                  <Clock className={`${isMobile ? 'w-2.5 h-2.5 mr-1' : 'w-3 h-3 mr-1.5'}`} />
                                  ~30 min
                                </div>
                              </div>

                              {/* Ação Ritualística */}
                              <div className={isMobile ? 'pt-1' : 'pt-2'}>
                                {isUnlocked ? (
                                  <Link href={`/grimoire/${grimoire.id}`}>
                                    <Button className={`w-full bg-gradient-to-r from-golden-amber/90 to-golden-amber hover:from-golden-amber hover:to-yellow-500 text-black font-semibold shadow-lg shadow-golden-amber/30 hover:shadow-xl hover:shadow-golden-amber/40 transition-all duration-300 ${isMobile ? 'text-xs py-2' : ''}`}>
                                      <Eye className={`${isMobile ? 'w-3 h-3 mr-1.5' : 'w-4 h-4 mr-2'}`} />
                                      {progress && progress.progress > 0 ? (isMobile ? 'Continuar' : 'Prosseguir Estudo') : (isMobile ? 'Iniciar' : 'Iniciar Jornada')}
                                    </Button>
                                  </Link>
                                ) : grimoire.isPaid ? (
                                  <Link href="/checkout">
                                    <Button variant="outline" className={`w-full border-golden-amber/50 text-golden-amber hover:bg-golden-amber/10 hover:border-golden-amber font-medium transition-all duration-300 ${isMobile ? 'text-xs py-2' : ''}`}>
                                      <CreditCard className={`${isMobile ? 'w-3 h-3 mr-1.5' : 'w-4 h-4 mr-2'}`} />
                                      {isMobile ? `Adquirir ${grimoire.price}` : `Adquirir Conhecimento ${grimoire.price}`}
                                    </Button>
                                  </Link>
                                ) : (
                                  <Button variant="secondary" className={`w-full bg-gray-800/50 text-gray-400 border-gray-600/30 cursor-not-allowed ${isMobile ? 'text-xs py-2' : ''}`} disabled>
                                    <Lock className={`${isMobile ? 'w-3 h-3 mr-1.5' : 'w-4 h-4 mr-2'}`} />
                                    {isMobile ? 'Selado' : 'Conhecimento Selado'}
                                  </Button>
                                )}
                              </div>
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