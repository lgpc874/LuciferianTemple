import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { PageTransition } from '@/components/page-transition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Globe,
  Users,
  BookOpen,
  Bot,
  FileText,
  Palette,
  Settings,
  LogOut,
  Home
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
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

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

  const sidebarItems = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'grimoires', label: 'Grimórios', icon: BookOpen },
    { id: 'ai', label: 'IA Generator', icon: Bot },
    { id: 'content', label: 'Conteúdo', icon: FileText },
    { id: 'themes', label: 'Temas', icon: Palette },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
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

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-golden-amber/20 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-golden-amber/20">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-golden-amber" />
            <div>
              <h1 className="font-cinzel text-xl font-bold text-golden-amber">
                Admin Panel
              </h1>
              <p className="text-xs text-muted-foreground">
                Templo do Abismo
              </p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-golden-amber/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-golden-amber/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-golden-amber" />
            </div>
            <div>
              <p className="font-medium text-golden-amber">{user?.username || 'Admin'}</p>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                activeTab === item.id
                  ? 'bg-golden-amber/10 text-golden-amber border border-golden-amber/30'
                  : 'hover:bg-golden-amber/5 hover:text-golden-amber'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-golden-amber/20 space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start border-golden-amber/30 hover:bg-golden-amber/5"
            onClick={() => window.location.href = '/'}
          >
            <Home className="w-4 h-4 mr-3" />
            Voltar ao Site
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-destructive/30 hover:bg-destructive/5 text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sair do Admin
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <PageTransition className="p-6">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </PageTransition>
      </div>
    </div>
  );
}