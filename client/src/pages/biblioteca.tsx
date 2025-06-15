import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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

  const { data: sections = [], isLoading: sectionsLoading } = useQuery({
    queryKey: ['/api/library/sections'],
  });

  const { data: allGrimoires = [], isLoading: grimoiresLoading } = useQuery({
    queryKey: ['/api/grimoires'],
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
          
          {/* Header seguindo padrão da home */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <img 
                src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
                alt="Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
                style={{ filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7462%) hue-rotate(5deg) brightness(92%) contrast(120%)' }}
              />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-cinzel text-golden-amber tracking-wider">
                BIBLIOTHECA ARCANA
              </h1>
              <img 
                src="https://i.postimg.cc/g20gqmdX/IMG-20250527-182235-1.png" 
                alt="Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
                style={{ filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7462%) hue-rotate(5deg) brightness(92%) contrast(120%)' }}
              />
            </div>
            <p className="text-xs sm:text-sm text-ritualistic-beige/70 max-w-xl mx-auto px-4">
              Nos corredores silenciosos repousam os segredos do conhecimento proibido
            </p>
          </div>

          {/* Main Content Card seguindo padrão da home */}
          <div className="floating-container rounded-lg p-6 sm:p-8 mb-8 sm:mb-12 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="max-w-4xl mx-auto">
              
              <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-golden-amber mb-6 sm:mb-8 text-center tracking-wide">
                <span className="text-blood-red">⸸</span> OS GRIMÓRIOS DAS TREVAS <span className="text-blood-red">⸸</span>
              </h2>
              
              <div className="text-center mb-6 sm:mb-8">
                <p className="font-garamond text-ritualistic-beige text-sm sm:text-base leading-relaxed mb-4">
                  Cada grimório é uma chave para os mistérios do abismo, onde apenas os iniciados 
                  ousam trilhar os caminhos da verdadeira iluminação.
                </p>
                
                <div className="flex items-center justify-center space-x-4 mt-6 text-red-400/60">
                  <span className="text-2xl">◆</span>
                  <span className="font-cinzel text-sm tracking-widest">IN TENEBRIS LUX</span>
                  <span className="text-2xl">◆</span>
                </div>
              </div>

              {/* Navegação por seções */}
              <div className="mt-8">
                <Tabs value={activeSection.toString()} onValueChange={(value) => setActiveSection(parseInt(value))}>
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 bg-transparent h-auto p-1">
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {sectionGrimoires.map((grimoire) => (
                              <motion.div
                                key={grimoire.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="group"
                              >
                                <Card className="bg-black/40 border-golden-amber/20 backdrop-blur-sm hover:border-golden-amber/40 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                  <div className="relative overflow-hidden">
                                    {grimoire.cover_image_url ? (
                                      <div className="aspect-[3/4] overflow-hidden">
                                        <img 
                                          src={grimoire.cover_image_url} 
                                          alt={grimoire.title}
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                      </div>
                                    ) : (
                                      <div className="aspect-[3/4] bg-gradient-to-b from-red-900/20 to-black/60 flex items-center justify-center">
                                        <BookOpen size={48} className="text-golden-amber/60" />
                                      </div>
                                    )}
                                    
                                    {grimoire.is_paid && grimoire.price && (
                                      <Badge className="absolute top-2 right-2 bg-golden-amber text-black">
                                        R$ {grimoire.price}
                                      </Badge>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                      <Button variant="secondary" size="sm" className="w-full bg-golden-amber text-black hover:bg-golden-amber/90">
                                        <BookOpen size={16} className="mr-2" />
                                        Abrir Grimório
                                      </Button>
                                    </div>
                                  </div>

                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-lg leading-tight text-golden-amber font-cinzel">
                                      {grimoire.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm line-clamp-2 text-ritualistic-beige/70">
                                      {grimoire.description}
                                    </CardDescription>
                                  </CardHeader>

                                  <CardContent className="pt-0">
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between text-sm">
                                        <Badge className={`border ${getDifficultyColor(grimoire.difficulty_level)}`}>
                                          {getDifficultyText(grimoire.difficulty_level)}
                                        </Badge>
                                        
                                        <div className="flex items-center text-ritualistic-beige/60">
                                          <Clock size={12} className="mr-1" />
                                          {grimoire.estimated_reading_time}min
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-between text-xs text-ritualistic-beige/50">
                                        <span>Categoria: {grimoire.category}</span>
                                        {grimoire.tags && grimoire.tags.length > 0 && (
                                          <div className="flex space-x-1">
                                            {grimoire.tags.slice(0, 2).map((tag, index) => (
                                              <Badge key={index} variant="outline" className="text-xs border-golden-amber/20 text-golden-amber/60">
                                                {tag}
                                              </Badge>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 bg-black/20 rounded-lg border border-golden-amber/10">
                            <BookOpen size={48} className="mx-auto text-golden-amber/40 mb-4" />
                            <h3 className="text-lg font-cinzel text-golden-amber mb-2">Seção em Construção</h3>
                            <p className="text-ritualistic-beige/60 max-w-md mx-auto">
                              Os grimórios desta seção ainda estão sendo preparados pelos mestres do templo.
                              Em breve, novos conhecimentos serão revelados.
                            </p>
                          </div>
                        )}
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </div>
            </div>
          </div>

          <MysticalFooter />
        </div>
      </PageTransition>
    </ContentProtection>
  );
}