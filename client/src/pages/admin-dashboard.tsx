import { useMemo } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { PageTransition } from '@/components/page-transition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminNavigation from '@/components/admin-navigation';
import AdminUsers from '@/components/admin/admin-users';
import AdminGrimoires from '@/components/admin/admin-grimoires';
import AdminContent from '@/components/admin/admin-content';
import AdminThemes from '@/components/admin/admin-themes';
import AdminAIComplete from '@/components/admin/admin-ai-complete';
import AdminAnalytics from '@/components/admin/admin-analytics';
import AdminSettings from '@/components/admin/admin-settings';
import { 
  BarChart3,
  Shield,
  Database,
  TrendingUp,
  Globe
} from 'lucide-react';

// Types for admin analytics
interface AdminAnalytics {
  totalUsers: number;
  newUsersThisMonth: number;
  totalGrimoires: number;
  newGrimoiresThisWeek: number;
  todaySessions: number;
  engagementRate: number;
  lastUpdated: string;
}

// Overview Dashboard component
function AdminOverview() {
  const { data: analytics, isLoading, error } = useQuery<AdminAnalytics>({
    queryKey: ['/api/admin/analytics'],
    refetchInterval: 30000, // Atualizar a cada 30 segundos
  });

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-destructive">
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Erro ao carregar dados</h3>
          <p className="text-sm">Não foi possível buscar os dados administrativos</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">
              {isLoading ? "..." : analytics?.totalUsers?.toLocaleString() || "0"}
            </div>
            <p className="text-xs text-muted-foreground">
              +{isLoading ? "..." : analytics?.newUsersThisMonth || "0"} desde o último mês
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grimórios Ativos</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">
              {isLoading ? "..." : analytics?.totalGrimoires || "0"}
            </div>
            <p className="text-xs text-muted-foreground">
              +{isLoading ? "..." : analytics?.newGrimoiresThisWeek || "0"} novos esta semana
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessões Hoje</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">
              {isLoading ? "..." : analytics?.todaySessions?.toLocaleString() || "0"}
            </div>
            <p className="text-xs text-muted-foreground">
              Baseado em atividade de usuários
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Engajamento</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">
              {isLoading ? "..." : `${analytics?.engagementRate || "0"}%`}
            </div>
            <p className="text-xs text-muted-foreground">
              Atualizado em tempo real
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber">Ações Rápidas</CardTitle>
          <CardDescription>
            Acesso direto às funcionalidades mais utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <h3 className="font-semibold text-golden-amber mb-2">Gerar Grimório com IA</h3>
            <p className="text-sm text-muted-foreground">Criar novo conteúdo automaticamente</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <h3 className="font-semibold text-golden-amber mb-2">Gerenciar Usuários</h3>
            <p className="text-sm text-muted-foreground">Administrar contas e permissões</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <h3 className="font-semibold text-golden-amber mb-2">Ver Analytics</h3>
            <p className="text-sm text-muted-foreground">Relatórios e métricas detalhadas</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();

  // Determinar qual componente renderizar baseado na URL - hook sempre executa
  const currentTab = useMemo(() => {
    console.log('Current location:', location); // Debug
    if (location === '/admin' || location === '/admin/' || !location.includes('?')) {
      return 'overview';
    }
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const tab = urlParams.get('tab') || 'overview';
    console.log('Current tab:', tab); // Debug
    return tab;
  }, [location]);

  // Verificar se é admin - usando email ou propriedade isAdmin
  const isAdmin = user?.email === "admin@templodoabismo.com" || 
                  user?.email === "templo.admin@templodoabismo.com" ||
                  (user as any)?.isAdmin === true;
  
  if (!isAuthenticated || !isAdmin) {
    return (
      <PageTransition className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto text-destructive mb-4" />
            <CardTitle className="text-destructive">Acesso Negado</CardTitle>
            <CardDescription>
              Você não tem permissão para acessar o painel administrativo.
            </CardDescription>
          </CardHeader>
        </Card>
      </PageTransition>
    );
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'users':
        return <AdminUsers />;
      case 'grimoires':
        return <AdminGrimoires />;
      case 'content':
        return <AdminContent />;
      case 'themes':
        return <AdminThemes />;
      case 'ai':
        return <AdminAIComplete />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Navigation */}
      <AdminNavigation />
      
      <PageTransition className="p-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </PageTransition>
    </div>
  );
}