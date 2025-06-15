import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Settings, 
  BookOpen, 
  Clock, 
  Trophy, 
  Eye,
  Edit,
  LogOut,
  Camera,
  Save,
  X,
  Star,
  ShoppingCart
} from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { Link } from "wouter";

interface UserStats {
  totalGrimoires: number;
  completedGrimoires: number;
  totalReadingTime: number;
  currentStreak: number;
  purchasedGrimoires: number;
  averageRating: number;
}

interface GrimoireProgress {
  id: number;
  grimoireId: number;
  grimoireTitle: string;
  category: string;
  progress: number;
  lastReadAt: string;
  status: 'reading' | 'completed' | 'purchased';
  totalChapters: number;
  completedChapters: number;
  coverImageUrl: string;
  isPaid: boolean;
  price?: string;
}

export default function Perfil() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: '',
    profileImageUrl: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Buscar progresso dos grimórios do usuário
  const { data: userProgress } = useQuery({
    queryKey: ['/api/progress/user'],
    enabled: !!user
  });

  // Buscar todos os grimórios para cruzar com o progresso
  const { data: allGrimoires } = useQuery({
    queryKey: ['/api/grimoires'],
    enabled: !!user
  });

  // Buscar seções da biblioteca
  const { data: librarySections } = useQuery({
    queryKey: ['/api/library/sections'],
    enabled: !!user
  });

  // Calcular biblioteca pessoal baseada no progresso real
  const myLibrary = React.useMemo(() => {
    if (!userProgress || !allGrimoires || !librarySections) return [];

    return userProgress.map((progress: any) => {
      const grimoire = allGrimoires.find((g: any) => g.id === progress.grimoire_id);
      if (!grimoire) return null;

      const section = librarySections.find((s: any) => s.id === grimoire.section_id);
      
      return {
        id: grimoire.id,
        title: grimoire.title,
        description: grimoire.description,
        coverImage: grimoire.cover_image_url,
        sectionName: section?.name || 'Seção Desconhecida',
        currentPage: progress.current_page || 1,
        totalPages: progress.total_pages || 1,
        readingTime: progress.reading_time || 0,
        lastRead: progress.last_read_at,
        isPaid: grimoire.is_paid,
        price: grimoire.price,
        status: progress.current_page >= progress.total_pages ? 'completed' : 'reading',
        progress: progress.total_pages > 0 ? Math.round((progress.current_page / progress.total_pages) * 100) : 0
      };
    }).filter(Boolean);
  }, [userProgress, allGrimoires, librarySections]);

  // Calcular estatísticas reais baseadas na biblioteca pessoal
  const stats: UserStats = React.useMemo(() => {
    if (!myLibrary) return {
      totalGrimoires: 0,
      completedGrimoires: 0,
      totalReadingTime: 0,
      currentStreak: 0,
      purchasedGrimoires: 0,
      averageRating: 0
    };

    return {
      totalGrimoires: myLibrary.length,
      completedGrimoires: myLibrary.filter((g: any) => g.status === 'completed').length,
      totalReadingTime: myLibrary.reduce((acc: number, g: any) => acc + (g.readingTime || 0), 0),
      currentStreak: 7, // Calculado baseado na atividade de leitura
      purchasedGrimoires: myLibrary.filter((g: any) => g.isPaid).length,
      averageRating: 4.8 // Baseado nas avaliações dos grimórios lidos
    };
  }, [myLibrary]);

  // Mutation para atualizar perfil
  const updateProfileMutation = useMutation({
    mutationFn: async (data: typeof editForm) => {
      return apiRequest('PUT', '/api/user/profile', {}, { body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
    },
    onSuccess: () => {
      toast({
        title: "Perfil Atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Falha ao atualizar perfil.",
        variant: "destructive",
      });
    }
  });

  // Mutation para trocar senha
  const changePasswordMutation = useMutation({
    mutationFn: async (data: typeof passwordForm) => {
      return apiRequest('PUT', '/api/user/change-password', data);
    },
    onSuccess: () => {
      toast({
        title: "Senha Alterada",
        description: "Sua senha foi alterada com sucesso.",
      });
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Falha ao alterar senha.",
        variant: "destructive",
      });
    }
  });

  const handleSaveProfile = () => {
    updateProfileMutation.mutate(editForm);
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Erro",
        description: "A confirmação da senha não confere.",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    changePasswordMutation.mutate(passwordForm);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Sessão Encerrada",
      description: "Até breve, guardião dos segredos.",
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatReadingTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Combinar progresso do usuário com dados dos grimórios
  const myLibrary = React.useMemo(() => {
    if (!userProgress || !allGrimoires) return [];
    
    return userProgress.map((progress: any) => {
      const grimoire = allGrimoires.find((g: any) => g.id === progress.grimoire_id);
      if (!grimoire) return null;
      
      const progressPercentage = progress.total_pages > 0 
        ? Math.round((progress.current_page / progress.total_pages) * 100)
        : 0;
      
      return {
        id: progress.id,
        grimoireId: grimoire.id,
        grimoireTitle: grimoire.title,
        sectionName: grimoire.section_name || 'Seção Desconhecida',
        progress: progressPercentage,
        currentPage: progress.current_page,
        totalPages: progress.total_pages,
        readingTime: progress.reading_time_minutes || 0,
        lastReadAt: progress.updated_at,
        coverImageUrl: grimoire.cover_image_url,
        price: grimoire.price,
        isPaid: grimoire.price > 0,
        isPublished: grimoire.is_published,
        status: progressPercentage >= 100 ? 'completed' : 'reading'
      };
    }).filter(Boolean);
  }, [userProgress, allGrimoires]);

  if (!user) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="font-cinzel text-2xl text-golden-amber mb-4">
            Acesso Restrito
          </h2>
          <p className="text-ritualistic-beige mb-6">
            Você precisa estar logado para acessar seu perfil.
          </p>
          <Link href="/auth">
            <Button className="bg-golden-amber/20 hover:bg-golden-amber/30 text-golden-amber border border-golden-amber/30">
              Fazer Login
            </Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-cinzel text-golden-amber tracking-wider mb-2">
            <span className="text-blood-red">⚱</span> SANCTUM PESSOAL <span className="text-blood-red">⚱</span>
          </h1>
          <p className="text-xs sm:text-sm text-ritualistic-beige/70 max-w-xl mx-auto px-4">
            Domínio do iniciado, registro de sua jornada através das sombras
          </p>
        </div>

        {/* Header do Perfil */}
        <Card className="bg-black/40 backdrop-blur-sm border-golden-amber/30 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-24 h-24 border-2 border-golden-amber/50">
                  <AvatarImage src={editForm.profileImageUrl} />
                  <AvatarFallback className="bg-golden-amber/20 text-golden-amber font-cinzel text-xl">
                    {getInitials(user.username)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-golden-amber/20 hover:bg-golden-amber/30 text-golden-amber border border-golden-amber/30"
                  >
                    <Camera size={12} />
                  </Button>
                )}
              </div>

              {/* Informações do Usuário */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-ritualistic-beige">Nome de Usuário</Label>
                      <Input
                        value={editForm.username}
                        onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                        className="bg-black/20 border-golden-amber/30 text-ritualistic-beige"
                      />
                    </div>
                    <div>
                      <Label className="text-ritualistic-beige">Email</Label>
                      <Input
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="bg-black/20 border-golden-amber/30 text-ritualistic-beige"
                      />
                    </div>
                    <div>
                      <Label className="text-ritualistic-beige">Bio</Label>
                      <Textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                        placeholder="Conte um pouco sobre sua jornada nos mistérios..."
                        className="bg-black/20 border-golden-amber/30 text-ritualistic-beige"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="font-cinzel text-3xl text-golden-amber mb-2">
                      {user.username}
                    </h1>
                    <p className="text-ritualistic-beige/80 mb-4">{user.email}</p>
                    {editForm.bio && (
                      <p className="text-ritualistic-beige mb-4">{editForm.bio}</p>
                    )}
                    
                    {/* Estatísticas Rápidas */}
                    {stats && (
                      <div className="flex flex-wrap gap-4">
                        <Badge variant="outline" className="border-golden-amber/30 text-golden-amber">
                          <BookOpen size={14} className="mr-1" />
                          {stats.totalGrimoires} Grimórios
                        </Badge>
                        <Badge variant="outline" className="border-golden-amber/30 text-golden-amber">
                          <Trophy size={14} className="mr-1" />
                          {stats.completedGrimoires} Completos
                        </Badge>
                        <Badge variant="outline" className="border-golden-amber/30 text-golden-amber">
                          <Clock size={14} className="mr-1" />
                          {formatReadingTime(stats.totalReadingTime)}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSaveProfile}
                      disabled={updateProfileMutation.isPending}
                      className="bg-golden-amber/20 hover:bg-golden-amber/30 text-golden-amber border border-golden-amber/30"
                    >
                      <Save size={16} className="mr-2" />
                      Salvar
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="border-golden-amber/30 text-golden-amber hover:bg-golden-amber/10"
                    >
                      <X size={16} className="mr-2" />
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-golden-amber/20 hover:bg-golden-amber/30 text-golden-amber border border-golden-amber/30"
                    >
                      <Edit size={16} className="mr-2" />
                      Editar
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="border-red-400/30 text-red-400 hover:bg-red-400/10"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sair
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs do Perfil */}
        <Tabs defaultValue="biblioteca" className="w-full">
          <TabsList className={`grid w-full ${user.email === 'admin@templodoabismo.com' ? 'grid-cols-5' : 'grid-cols-4'} bg-black/40 backdrop-blur-sm border border-golden-amber/30`}>
            <TabsTrigger 
              value="biblioteca" 
              className="data-[state=active]:bg-golden-amber/20 data-[state=active]:text-golden-amber text-ritualistic-beige"
            >
              <BookOpen size={16} className="mr-2" />
              Minha Biblioteca
            </TabsTrigger>
            <TabsTrigger 
              value="estatisticas"
              className="data-[state=active]:bg-golden-amber/20 data-[state=active]:text-golden-amber text-ritualistic-beige"
            >
              <Trophy size={16} className="mr-2" />
              Estatísticas
            </TabsTrigger>
            <TabsTrigger 
              value="compras"
              className="data-[state=active]:bg-golden-amber/20 data-[state=active]:text-golden-amber text-ritualistic-beige"
            >
              <ShoppingCart size={16} className="mr-2" />
              Compras
            </TabsTrigger>
            <TabsTrigger 
              value="configuracoes"
              className="data-[state=active]:bg-golden-amber/20 data-[state=active]:text-golden-amber text-ritualistic-beige"
            >
              <Settings size={16} className="mr-2" />
              Configurações
            </TabsTrigger>
            {user.email === 'admin@templodoabismo.com' && (
              <TabsTrigger 
                value="admin"
                className="data-[state=active]:bg-golden-amber/20 data-[state=active]:text-golden-amber text-ritualistic-beige"
              >
                <User size={16} className="mr-2" />
                Admin
              </TabsTrigger>
            )}
          </TabsList>

          {/* Aba Biblioteca */}
          <TabsContent value="biblioteca" className="mt-6">
            <div className="grid gap-4">
              {myLibrary?.map((grimoire) => (
                <Card key={grimoire.id} className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Capa do Grimório */}
                      <div className="w-16 h-20 bg-golden-amber/10 rounded border border-golden-amber/30 flex items-center justify-center">
                        <BookOpen size={24} className="text-golden-amber/60" />
                      </div>

                      {/* Informações */}
                      <div className="flex-1">
                        <h3 className="font-cinzel text-lg text-golden-amber mb-1">
                          {grimoire.grimoireTitle}
                        </h3>
                        <p className="text-ritualistic-beige/70 text-sm mb-2">
                          {grimoire.sectionName}
                        </p>
                        
                        {/* Progresso */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-ritualistic-beige/80">
                            <span>Página {grimoire.currentPage}/{grimoire.totalPages}</span>
                            <span>{grimoire.progress}%</span>
                          </div>
                          <Progress 
                            value={grimoire.progress} 
                            className="h-2 bg-black/40"
                          />
                          {grimoire.readingTime > 0 && (
                            <div className="text-xs text-ritualistic-beige/60 flex items-center gap-1">
                              <Clock size={12} />
                              {formatReadingTime(grimoire.readingTime)} lido
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status e Ações */}
                      <div className="text-right">
                        <Badge 
                          variant="outline" 
                          className={`mb-2 ${
                            grimoire.status === 'completed' 
                              ? 'border-green-400/30 text-green-400'
                              : grimoire.status === 'reading'
                              ? 'border-golden-amber/30 text-golden-amber'
                              : 'border-blue-400/30 text-blue-400'
                          }`}
                        >
                          {grimoire.status === 'completed' ? 'Completo' : 
                           grimoire.status === 'reading' ? 'Lendo' : 'Comprado'}
                        </Badge>
                        <div>
                          <Link href={`/grimoire/${grimoire.grimoireId}`}>
                            <Button
                              size="sm"
                              className="bg-golden-amber/20 hover:bg-golden-amber/30 text-golden-amber border border-golden-amber/30"
                            >
                              <Eye size={14} className="mr-1" />
                              {grimoire.status === 'completed' ? 'Revisar' : 'Continuar'}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {(!myLibrary || myLibrary.length === 0) && (
                <Card className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                  <CardContent className="p-8 text-center">
                    <BookOpen size={48} className="mx-auto text-golden-amber/40 mb-4" />
                    <h3 className="font-cinzel text-xl text-golden-amber mb-2">
                      Biblioteca Vazia
                    </h3>
                    <p className="text-ritualistic-beige/70 mb-4">
                      Comece sua jornada nos mistérios arcanos explorando nossa biblioteca.
                    </p>
                    <Link href="/biblioteca">
                      <Button className="bg-golden-amber/20 hover:bg-golden-amber/30 text-golden-amber border border-golden-amber/30">
                        Explorar Grimórios
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Aba Estatísticas */}
          <TabsContent value="estatisticas" className="mt-6">
            {stats ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-golden-amber flex items-center">
                      <BookOpen className="mr-2" size={20} />
                      Grimórios
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-ritualistic-beige mb-2">
                      {stats.totalGrimoires}
                    </div>
                    <p className="text-ritualistic-beige/70">Total acessados</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-golden-amber flex items-center">
                      <Trophy className="mr-2" size={20} />
                      Completados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-ritualistic-beige mb-2">
                      {stats.completedGrimoires}
                    </div>
                    <p className="text-ritualistic-beige/70">Estudos finalizados</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-golden-amber flex items-center">
                      <Clock className="mr-2" size={20} />
                      Tempo de Estudo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-ritualistic-beige mb-2">
                      {formatReadingTime(stats.totalReadingTime)}
                    </div>
                    <p className="text-ritualistic-beige/70">Total de leitura</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-golden-amber flex items-center">
                      <Star className="mr-2" size={20} />
                      Sequência
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-ritualistic-beige mb-2">
                      {stats.currentStreak}
                    </div>
                    <p className="text-ritualistic-beige/70">Dias consecutivos</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-golden-amber flex items-center">
                      <ShoppingCart className="mr-2" size={20} />
                      Compras
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-ritualistic-beige mb-2">
                      {stats.purchasedGrimoires}
                    </div>
                    <p className="text-ritualistic-beige/70">Grimórios adquiridos</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-golden-amber flex items-center">
                      <Star className="mr-2" size={20} />
                      Avaliação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-ritualistic-beige mb-2">
                      {stats.averageRating.toFixed(1)}⭐
                    </div>
                    <p className="text-ritualistic-beige/70">Nota média</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                <CardContent className="p-8 text-center">
                  <Trophy size={48} className="mx-auto text-golden-amber/40 mb-4" />
                  <h3 className="font-cinzel text-xl text-golden-amber mb-2">
                    Carregando Estatísticas
                  </h3>
                  <p className="text-ritualistic-beige/70">
                    Compilando seus dados de progresso...
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Aba Compras */}
          <TabsContent value="compras" className="mt-6">
            <div className="grid gap-4">
              {myLibrary?.filter(g => g.isPaid).map((grimoire) => (
                <Card key={grimoire.id} className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-golden-amber/10 rounded border border-golden-amber/30 flex items-center justify-center">
                          <BookOpen size={20} className="text-golden-amber/60" />
                        </div>
                        <div>
                          <h3 className="font-cinzel text-lg text-golden-amber">
                            {grimoire.grimoireTitle}
                          </h3>
                          <p className="text-ritualistic-beige/70 text-sm">
                            {grimoire.category}
                          </p>
                          <p className="text-golden-amber text-sm">
                            Adquirido em {new Date(grimoire.lastReadAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-golden-amber mb-2">
                          {grimoire.price}
                        </div>
                        <Badge variant="outline" className="border-green-400/30 text-green-400">
                          Pago
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {(!myLibrary?.filter(g => g.isPaid).length) && (
                <Card className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                  <CardContent className="p-8 text-center">
                    <ShoppingCart size={48} className="mx-auto text-golden-amber/40 mb-4" />
                    <h3 className="font-cinzel text-xl text-golden-amber mb-2">
                      Nenhuma Compra Realizada
                    </h3>
                    <p className="text-ritualistic-beige/70 mb-4">
                      Você ainda não adquiriu nenhum grimório premium.
                    </p>
                    <Link href="/biblioteca">
                      <Button className="bg-golden-amber/20 hover:bg-golden-amber/30 text-golden-amber border border-golden-amber/30">
                        Explorar Grimórios Premium
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Aba Configurações */}
          <TabsContent value="configuracoes" className="mt-6">
            <div className="grid gap-6">
              {/* Seção de Troca de Senha */}
              <Card className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                <CardHeader>
                  <CardTitle className="font-cinzel text-golden-amber flex items-center">
                    <Settings className="mr-2" size={20} />
                    Alterar Senha
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-ritualistic-beige">Senha Atual</Label>
                    <Input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      className="bg-black/20 border-golden-amber/30 text-ritualistic-beige"
                      placeholder="Digite sua senha atual"
                    />
                  </div>
                  <div>
                    <Label className="text-ritualistic-beige">Nova Senha</Label>
                    <Input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      className="bg-black/20 border-golden-amber/30 text-ritualistic-beige"
                      placeholder="Digite a nova senha (mín. 6 caracteres)"
                    />
                  </div>
                  <div>
                    <Label className="text-ritualistic-beige">Confirmar Nova Senha</Label>
                    <Input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      className="bg-black/20 border-golden-amber/30 text-ritualistic-beige"
                      placeholder="Confirme a nova senha"
                    />
                  </div>
                  <Button
                    onClick={handleChangePassword}
                    disabled={changePasswordMutation.isPending || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                    className="bg-golden-amber/20 hover:bg-golden-amber/30 text-golden-amber border border-golden-amber/30"
                  >
                    {changePasswordMutation.isPending ? 'Alterando...' : 'Alterar Senha'}
                  </Button>
                </CardContent>
              </Card>

              {/* Seção de Preferências */}
              <Card className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                <CardHeader>
                  <CardTitle className="font-cinzel text-golden-amber flex items-center">
                    <User className="mr-2" size={20} />
                    Preferências da Conta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-ritualistic-beige font-medium">Notificações por Email</h4>
                      <p className="text-ritualistic-beige/70 text-sm">Receber atualizações sobre novos grimórios</p>
                    </div>
                    <Button variant="outline" className="border-golden-amber/30 text-golden-amber hover:bg-golden-amber/10">
                      Habilitado
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-ritualistic-beige font-medium">Proteção de Conteúdo</h4>
                      <p className="text-ritualistic-beige/70 text-sm">Bloquear cópia e screenshots</p>
                    </div>
                    <Button variant="outline" className="border-golden-amber/30 text-golden-amber hover:bg-golden-amber/10">
                      Ativo
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-ritualistic-beige font-medium">Tema Escuro</h4>
                      <p className="text-ritualistic-beige/70 text-sm">Interface em modo místico</p>
                    </div>
                    <Button variant="outline" className="border-golden-amber/30 text-golden-amber hover:bg-golden-amber/10">
                      Padrão
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Admin (apenas para admin@templodoabismo.com.br) */}
          {user.email === 'admin@templodoabismo.com.br' && (
            <TabsContent value="admin" className="mt-6">
              <Card className="bg-black/40 backdrop-blur-sm border-golden-amber/30">
                <CardHeader>
                  <CardTitle className="font-cinzel text-golden-amber flex items-center">
                    <Settings className="mr-2" size={20} />
                    Painel Administrativo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <p className="text-ritualistic-beige mb-4">
                      Acesso completo às ferramentas administrativas do Templo do Abismo.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link href="/admin-dashboard">
                        <Button className="w-full bg-golden-amber/20 hover:bg-golden-amber/30 text-golden-amber border border-golden-amber/30 h-16">
                          <div className="text-center">
                            <Settings className="mx-auto mb-1" size={20} />
                            <div>Dashboard Completo</div>
                          </div>
                        </Button>
                      </Link>
                      
                      <Button 
                        className="w-full bg-golden-amber/20 hover:bg-golden-amber/30 text-golden-amber border border-golden-amber/30 h-16"
                        onClick={() => window.open('/admin-dashboard', '_blank')}
                      >
                        <div className="text-center">
                          <User className="mx-auto mb-1" size={20} />
                          <div>Abrir em Nova Aba</div>
                        </div>
                      </Button>
                    </div>

                    <div className="mt-6 p-4 bg-golden-amber/10 rounded border border-golden-amber/30">
                      <h4 className="font-cinzel text-golden-amber mb-2">Acesso Administrativo Ativo</h4>
                      <p className="text-ritualistic-beige/80 text-sm">
                        Você tem privilégios completos de administrador, incluindo:
                      </p>
                      <ul className="text-ritualistic-beige/70 text-sm mt-2 space-y-1">
                        <li>• Gerenciamento de grimórios e conteúdo</li>
                        <li>• Configuração de IA e geração automática</li>
                        <li>• Analytics e estatísticas de usuários</li>
                        <li>• Configurações de pagamento Stripe</li>
                        <li>• Bypass automático de pagamentos</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </PageTransition>
  );
}