import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { PageTransition } from '@/components/page-transition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  Settings, 
  Palette, 
  Bot, 
  FileText, 
  BarChart3,
  Shield,
  Database,
  Plus
} from 'lucide-react';

// Admin components
import AdminUsers from '@/components/admin/admin-users';
import AdminGrimoires from '@/components/admin/admin-grimoires';
import AdminContent from '@/components/admin/admin-content';
import AdminThemes from '@/components/admin/admin-themes';
import AdminAI from '@/components/admin/admin-ai';
import AdminAnalytics from '@/components/admin/admin-analytics';
import AdminSettings from '@/components/admin/admin-settings';

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Verificar se é admin
  if (!isAuthenticated || !user?.isAdmin) {
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

  return (
    <PageTransition className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-cinzel text-3xl font-bold text-golden-amber tracking-wider">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie todo o conteúdo e configurações do Templo do Abismo
            </p>
          </div>
          <Badge variant="outline" className="text-golden-amber border-golden-amber">
            Administrador: {user.username}
          </Badge>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-card">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 size={16} />
              <span className="hidden sm:inline">Visão Geral</span>
            </TabsTrigger>
            <TabsTrigger value="grimoires" className="flex items-center gap-2">
              <BookOpen size={16} />
              <span className="hidden sm:inline">Grimórios</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users size={16} />
              <span className="hidden sm:inline">Usuários</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText size={16} />
              <span className="hidden sm:inline">Conteúdo</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Bot size={16} />
              <span className="hidden sm:inline">IA</span>
            </TabsTrigger>
            <TabsTrigger value="themes" className="flex items-center gap-2">
              <Palette size={16} />
              <span className="hidden sm:inline">Temas</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Database size={16} />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              <span className="hidden sm:inline">Config</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-golden-amber/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Grimórios</CardTitle>
                  <BookOpen className="h-4 w-4 text-golden-amber" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-golden-amber">6</div>
                  <p className="text-xs text-muted-foreground">
                    +2 novos este mês
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-golden-amber/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                  <Users className="h-4 w-4 text-golden-amber" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-golden-amber">1</div>
                  <p className="text-xs text-muted-foreground">
                    +0 novos usuários
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-golden-amber/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Páginas de Conteúdo</CardTitle>
                  <FileText className="h-4 w-4 text-golden-amber" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-golden-amber">8</div>
                  <p className="text-xs text-muted-foreground">
                    Home, Auth, Biblioteca, etc.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-golden-amber/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Proteção Ativa</CardTitle>
                  <Shield className="h-4 w-4 text-golden-amber" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">100%</div>
                  <p className="text-xs text-muted-foreground">
                    Anti-cópia e screenshot
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-golden-amber">Ações Rápidas</CardTitle>
                <CardDescription>
                  Acesso rápido às funcionalidades mais utilizadas
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => setActiveTab('grimoires')}
                  className="bg-golden-amber hover:bg-golden-amber/90 text-background"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Grimório
                </Button>
                <Button 
                  onClick={() => setActiveTab('ai')}
                  variant="outline" 
                  className="border-golden-amber text-golden-amber hover:bg-golden-amber hover:text-background"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Gerar com IA
                </Button>
                <Button 
                  onClick={() => setActiveTab('users')}
                  variant="outline"
                  className="border-golden-amber text-golden-amber hover:bg-golden-amber hover:text-background"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Gerenciar Usuários
                </Button>
                <Button 
                  onClick={() => setActiveTab('themes')}
                  variant="outline"
                  className="border-golden-amber text-golden-amber hover:bg-golden-amber hover:text-background"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Personalizar Tema
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other Tabs */}
          <TabsContent value="grimoires">
            <AdminGrimoires />
          </TabsContent>
          
          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>
          
          <TabsContent value="content">
            <AdminContent />
          </TabsContent>
          
          <TabsContent value="ai">
            <AdminAI />
          </TabsContent>
          
          <TabsContent value="themes">
            <AdminThemes />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AdminAnalytics />
          </TabsContent>
          
          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
}