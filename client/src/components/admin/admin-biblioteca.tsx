import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminGrimoires from './admin-grimoires';
import AdminSections from './admin-sections';
import { BookOpen, Layers, Database, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export default function AdminBiblioteca() {
  // Fetch library statistics
  const { data: stats } = useQuery({
    queryKey: ['/api/admin/library-stats'],
    queryFn: async () => {
      const grimoires = await apiRequest('/api/admin/grimoires').then(r => r.json());
      const sections = await apiRequest('/api/admin/sections').then(r => r.json());
      
      return {
        totalGrimoires: grimoires?.length || 0,
        activeGrimoires: grimoires?.filter((g: any) => g.isActive)?.length || 0,
        paidGrimoires: grimoires?.filter((g: any) => g.isPaid)?.length || 0,
        totalSections: sections?.length || 6
      };
    }
  });

  return (
    <div className="space-y-6">
      {/* Library Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Grimórios</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">
              {stats?.totalGrimoires || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.activeGrimoires || 0} ativos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grimórios Pagos</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">
              {stats?.paidGrimoires || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Premium content
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seções Ativas</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">
              {stats?.totalSections || 6}
            </div>
            <p className="text-xs text-muted-foreground">
              Organizações da biblioteca
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">
              87%
            </div>
            <p className="text-xs text-muted-foreground">
              Média de leitura completa
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Library Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            ⧭ Gerenciamento da Biblioteca
          </CardTitle>
          <CardDescription>
            Gerencie todos os aspectos da biblioteca digital: grimórios, seções e organização de conteúdo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grimoires" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grimoires" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Grimórios
              </TabsTrigger>
              <TabsTrigger value="sections" className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Seções
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="grimoires" className="mt-6">
              <AdminGrimoires />
            </TabsContent>
            
            <TabsContent value="sections" className="mt-6">
              <AdminSections />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}