import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { PageTransition } from '@/components/page-transition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminUsers from '@/components/admin/admin-users';
import AdminBiblioteca from '@/components/admin/admin-biblioteca';
import AdminSettings from '@/components/admin/admin-settings';
import AdminNavigation from '@/components/admin-navigation';
import { useRoute } from 'wouter';
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
              {isLoading ? "..." : analytics?.todaySessions || "0"}
            </div>
            <p className="text-xs text-muted-foreground">
              Usuários ativos no sistema
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
              {isLoading ? "..." : `${analytics?.engagementRate || 0}%`}
            </div>
            <p className="text-xs text-muted-foreground">
              Leitura completa de grimórios
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber">⧭ Ações Rápidas</CardTitle>
          <CardDescription>
            Acesso direto às principais funcionalidades administrativas
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <h3 className="font-semibold text-golden-amber mb-2">Gerenciar Biblioteca</h3>
            <p className="text-sm text-muted-foreground">Grimórios, seções e IA generator</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <h3 className="font-semibold text-golden-amber mb-2">Gerenciar Usuários</h3>
            <p className="text-sm text-muted-foreground">Administrar contas e permissões</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <h3 className="font-semibold text-golden-amber mb-2">Configurações</h3>
            <p className="text-sm text-muted-foreground">Sistema e preferências gerais</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [match, params] = useRoute('/admin-dashboard/:tab?');
  
  // Get current tab from URL parameter
  const activeTab = params?.tab || 'overview';

  // Acesso sempre permitido no ambiente Replit

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <AdminUsers />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <PageTransition className="min-h-screen bg-background">
      <AdminNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderContent()}
      </div>
    </PageTransition>
  );
}