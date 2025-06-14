import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { useIsMobile } from '@/hooks/use-mobile';
import { PageTransition } from '@/components/page-transition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdminUsers from '@/components/admin/admin-users';
import AdminGrimoires from '@/components/admin/admin-grimoires';
import AdminContent from '@/components/admin/admin-content';
import AdminThemes from '@/components/admin/admin-themes';
import AdminAIComplete from '@/components/admin/admin-ai-complete';
import AIConfig from '@/components/admin/ai-config';
import GrimoireManagement from '@/components/admin/grimoire-management';
import AdminAnalytics from '@/components/admin/admin-analytics';
import AdminSettings from '@/components/admin/admin-settings';
import StripeConfig from '@/components/admin/stripe-config';
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
  Home,
  Menu,
  X,
  ChevronLeft,
  CreditCard
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

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
    { id: 'overview', label: 'Visão Geral', icon: BarChart3, shortLabel: 'Geral' },
    { id: 'users', label: 'Usuários', icon: Users, shortLabel: 'Users' },
    { id: 'grimoires', label: 'Grimórios', icon: BookOpen, shortLabel: 'Books' },
    { id: 'grimoire-management', label: 'Gerenciar Grimórios', icon: Settings, shortLabel: 'Manage' },
    { id: 'stripe', label: 'Pagamentos Stripe', icon: CreditCard, shortLabel: 'Stripe' },
    { id: 'ai', label: 'IA Generator', icon: Bot, shortLabel: 'IA' },
    { id: 'ai-config', label: 'Configurar IA', icon: Settings, shortLabel: 'IA Config' },
    { id: 'content', label: 'Conteúdo', icon: FileText, shortLabel: 'Content' },
    { id: 'themes', label: 'Temas', icon: Palette, shortLabel: 'Themes' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, shortLabel: 'Stats' },
    { id: 'settings', label: 'Configurações', icon: Settings, shortLabel: 'Config' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <AdminUsers />;
      case 'grimoires':
        return <AdminGrimoires />;
      case 'grimoire-management':
        return <GrimoireManagement />;
      case 'stripe':
        return <StripeConfig />;
      case 'content':
        return <AdminContent />;
      case 'themes':
        return <AdminThemes />;
      case 'ai':
        return <AdminAIComplete />;
      case 'ai-config':
        return <AIConfig />;
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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const currentTabLabel = sidebarItems.find(item => item.id === activeTab)?.label || 'Painel Admin';

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-golden-amber/20 h-14 flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(true)}
            className="hover:bg-golden-amber/5"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="font-cinzel text-lg font-bold text-golden-amber truncate">
            {currentTabLabel}
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="hover:bg-destructive/5 text-destructive"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed' : 'relative'}
        ${isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        transition-transform duration-300 ease-in-out
        ${isMobile ? 'w-80 z-50' : 'w-16 lg:w-64'}
        bg-card border-r border-golden-amber/20 flex flex-col
        ${isMobile ? 'h-full' : 'min-h-screen'}
      `}>
        {/* Header */}
        <div className={`border-b border-golden-amber/20 ${isMobile ? 'p-4' : 'p-3 lg:p-6'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className={`text-golden-amber ${isMobile ? 'w-8 h-8' : 'w-6 h-6 lg:w-8 lg:h-8'}`} />
              <div className={`${isMobile ? 'block' : 'hidden lg:block'}`}>
                <h1 className="font-cinzel text-xl font-bold text-golden-amber">
                  <span className="text-blood-red">⚔</span> Admin Panel <span className="text-blood-red">⚔</span>
                </h1>
                <p className="text-xs text-muted-foreground">
                  Templo do Abismo
                </p>
              </div>
            </div>
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
                className="hover:bg-golden-amber/5"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className={`border-b border-golden-amber/20 ${isMobile ? 'p-4' : 'p-3 lg:p-4'}`}>
          <div className="flex items-center space-x-3">
            <div className={`rounded-full bg-golden-amber/20 flex items-center justify-center ${isMobile ? 'w-10 h-10' : 'w-8 h-8 lg:w-10 lg:h-10'}`}>
              <Shield className={`text-golden-amber ${isMobile ? 'w-5 h-5' : 'w-4 h-4 lg:w-5 lg:h-5'}`} />
            </div>
            <div className={`${isMobile ? 'block' : 'hidden lg:block'}`}>
              <p className="font-medium text-golden-amber text-sm">{user?.username || 'Admin'}</p>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 space-y-1 ${isMobile ? 'p-4' : 'p-2 lg:p-4'}`}>
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={`
                w-full justify-start 
                ${isMobile ? 'h-12' : 'h-10 lg:h-12'}
                ${activeTab === item.id
                  ? 'bg-golden-amber/10 text-golden-amber border border-golden-amber/30'
                  : 'hover:bg-golden-amber/5 hover:text-golden-amber'
                }
              `}
              onClick={() => handleTabChange(item.id)}
            >
              <item.icon className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4 lg:w-5 lg:h-5'} ${isMobile ? 'mr-3' : 'lg:mr-3'}`} />
              <span className={`${isMobile ? 'block' : 'hidden lg:block'} text-sm`}>
                {item.label}
              </span>
            </Button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className={`border-t border-golden-amber/20 space-y-2 ${isMobile ? 'p-4' : 'p-2 lg:p-4'}`}>
          <Button
            variant="outline"
            className={`
              w-full justify-start border-golden-amber/30 hover:bg-golden-amber/5
              ${isMobile ? 'h-10' : 'h-9 lg:h-10'}
            `}
            onClick={() => window.location.href = '/'}
          >
            <Home className={`${isMobile ? 'w-4 h-4 mr-3' : 'w-4 h-4 lg:mr-3'}`} />
            <span className={`${isMobile ? 'block' : 'hidden lg:block'} text-sm`}>
              Voltar ao Site
            </span>
          </Button>
          <Button
            variant="outline"
            className={`
              w-full justify-start border-destructive/30 hover:bg-destructive/5 text-destructive
              ${isMobile ? 'h-10' : 'h-9 lg:h-10'}
            `}
            onClick={handleLogout}
          >
            <LogOut className={`${isMobile ? 'w-4 h-4 mr-3' : 'w-4 h-4 lg:mr-3'}`} />
            <span className={`${isMobile ? 'block' : 'hidden lg:block'} text-sm`}>
              Sair do Admin
            </span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-auto ${isMobile ? 'pt-14' : ''}`}>
        <PageTransition className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="max-w-full">
            {renderContent()}
          </div>
        </PageTransition>
      </div>
    </div>
  );
}