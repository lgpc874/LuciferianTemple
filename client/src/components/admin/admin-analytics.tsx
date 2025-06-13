import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Eye,
  Clock,
  TrendingUp,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminAnalytics() {
  const stats = {
    totalUsers: 1,
    activeUsers: 1,
    totalGrimoires: 6,
    totalViews: 15,
    avgReadingTime: '12 min',
    popularGrimoire: 'Introdução ao Ocultismo'
  };

  const recentActivity = [
    { action: 'Usuário logado', user: 'magurk', time: '2 horas atrás' },
    { action: 'Grimório acessado', details: 'Introdução ao Ocultismo', time: '3 horas atrás' },
    { action: 'Progresso salvo', details: 'Capítulo 12, Página 2', time: '3 horas atrás' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
            <Users className="h-4 w-4 text-golden-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registrados no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grimórios</CardTitle>
            <BookOpen className="h-4 w-4 text-golden-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">{stats.totalGrimoires}</div>
            <p className="text-xs text-muted-foreground">Disponíveis na biblioteca</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-golden-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">{stats.totalViews}</div>
            <p className="text-xs text-muted-foreground">Total de acessos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-golden-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">{stats.avgReadingTime}</div>
            <p className="text-xs text-muted-foreground">De leitura por sessão</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-golden-amber flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Analytics e Relatórios
              </CardTitle>
              <CardDescription>
                Estatísticas de uso e engagement dos usuários
              </CardDescription>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Popular Content */}
          <div>
            <h4 className="font-medium mb-3">Conteúdo Mais Acessado</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Introdução ao Ocultismo</div>
                  <div className="text-sm text-muted-foreground">Grimório • Categoria: Introdução</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">8 acessos</Badge>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Biblioteca</div>
                  <div className="text-sm text-muted-foreground">Página • Principal</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">5 acessos</Badge>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Página Inicial</div>
                  <div className="text-sm text-muted-foreground">Página • Home</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">3 acessos</Badge>
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h4 className="font-medium mb-3">Atividade Recente</h4>
            <div className="space-y-2">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{activity.action}</div>
                    {activity.details && (
                      <div className="text-sm text-muted-foreground">{activity.details}</div>
                    )}
                    {activity.user && (
                      <div className="text-sm text-muted-foreground">Por: {activity.user}</div>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}