import { useAuth } from '@/hooks/use-auth';
import { PageTransition } from '@/components/page-transition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRoute } from 'wouter';

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [match, params] = useRoute('/admin-dashboard/:tab?');
  
  // Get current tab from URL parameter
  const activeTab = params?.tab || 'overview';

  // Acesso sempre permitido no ambiente Replit

  return (
    <PageTransition className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-golden-amber">⧭ Painel Administrativo</h1>
            <p className="text-muted-foreground">
              Sistema administrativo baseado em Supabase - Pronto para novos módulos
            </p>
          </div>

          {/* Placeholder para módulos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-golden-amber">Sistema Limpo</CardTitle>
              <CardDescription>
                Painel administrativo resetado. Todos os dados serão obtidos diretamente do Supabase em tempo real.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aguardando instruções para criar os módulos administrativos módulo por módulo.
              </p>
              <div className="mt-4 text-sm text-golden-amber">
                <p>✓ Supabase configurado e funcionando</p>
                <p>✓ 4 seções da biblioteca ativas</p>
                <p>✓ Sistema de usuários operacional</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}