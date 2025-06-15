import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  Activity, 
  Eye,
  Flame,
  Crown,
  Skull,
  TrendingUp,
  Calendar,
  Clock,
  Shield,
  Database
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalGrimoires: number;
  totalSections: number;
  totalChapters: number;
  totalProgress: number;
  recentUsers: Array<{
    id: string;
    email: string;
    created_at: string;
  }>;
  recentGrimoires: Array<{
    id: number;
    title: string;
    section_id: number;
    created_at: string;
    is_paid: boolean;
    price: string | null;
  }>;
  sectionStats: Array<{
    id: number;
    name: string;
    grimoire_count: number;
  }>;
}

export default function AdminOverview() {
  const { data: stats, isLoading, error } = useQuery<AdminStats>({
    queryKey: ['/api/admin/overview-stats'],
  });

  const getSectionIcon = (sectionId: number) => {
    switch (sectionId) {
      case 1: return Eye;
      case 2: return Flame;
      case 3: return Crown;
      case 4: return Skull;
      default: return BookOpen;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-2"></div>
          <div className="h-4 bg-muted rounded w-96"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-muted rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-golden-amber">⧭ Visão Geral</h1>
          <p className="text-muted-foreground">Erro ao carregar dados do sistema</p>
        </div>
        <Card className="border-red-500/50">
          <CardHeader>
            <CardTitle className="text-red-400">Erro de Conexão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Não foi possível conectar ao Supabase. Verifique a configuração.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-golden-amber">⧭ Visão Geral do Sistema</h1>
        <p className="text-muted-foreground">
          Métricas e estatísticas em tempo real do Templo do Abismo
        </p>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">{stats?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              Membros registrados no templo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grimórios</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">{stats?.totalGrimoires || 0}</div>
            <p className="text-xs text-muted-foreground">
              Textos arcanos disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capítulos</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">{stats?.totalChapters || 0}</div>
            <p className="text-xs text-muted-foreground">
              Conteúdo total disponível
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso de Leitura</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">{stats?.totalProgress || 0}</div>
            <p className="text-xs text-muted-foreground">
              Registros de progresso salvos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas por Seção */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber">📚 Distribuição por Seções</CardTitle>
          <CardDescription>
            Quantidade de grimórios em cada seção da biblioteca
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats?.sectionStats?.map((section) => {
              const IconComponent = getSectionIcon(section.id);
              return (
                <div key={section.id} className="flex items-center space-x-3 p-3 border rounded-lg bg-black/20">
                  <div className="flex-shrink-0">
                    <IconComponent className="h-8 w-8 text-golden-amber" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-golden-amber truncate">
                      {section.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {section.grimoire_count} grimórios
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Atividade Recente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usuários Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-golden-amber flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Usuários Recentes
            </CardTitle>
            <CardDescription>
              Últimos membros que ingressaram no templo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.recentUsers?.length ? (
                stats.recentUsers.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg bg-black/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-golden-amber/20 rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 text-golden-amber" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {formatDate(user.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Nenhum usuário recente encontrado
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Grimórios Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-golden-amber flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Grimórios Recentes
            </CardTitle>
            <CardDescription>
              Últimos textos adicionados à biblioteca
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.recentGrimoires?.length ? (
                stats.recentGrimoires.slice(0, 5).map((grimoire) => {
                  const IconComponent = getSectionIcon(grimoire.section_id);
                  return (
                    <div key={grimoire.id} className="flex items-center justify-between p-3 border rounded-lg bg-black/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-golden-amber/20 rounded-full flex items-center justify-center">
                          <IconComponent className="h-4 w-4 text-golden-amber" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{grimoire.title}</p>
                          <p className="text-xs text-muted-foreground">
                            <Calendar className="inline h-3 w-3 mr-1" />
                            {formatDate(grimoire.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {grimoire.is_paid && (
                          <Badge variant="outline" className="border-golden-amber text-golden-amber text-xs">
                            R$ {grimoire.price}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Nenhum grimório encontrado
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber flex items-center">
            <Database className="mr-2 h-5 w-5" />
            Status do Sistema
          </CardTitle>
          <CardDescription>
            Informações de conectividade e integridade dos dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg bg-green-950/20 border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-green-400">Supabase</p>
                <p className="text-xs text-muted-foreground">Conectado</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg bg-green-950/20 border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-green-400">API</p>
                <p className="text-xs text-muted-foreground">Operacional</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg bg-green-950/20 border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-green-400">Autenticação</p>
                <p className="text-xs text-muted-foreground">Ativo</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}