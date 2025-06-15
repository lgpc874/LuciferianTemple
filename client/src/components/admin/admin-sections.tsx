import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Layers,
  Eye,
  Settings
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface LibrarySection {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  grimoireCount: number;
  order: number;
}

interface Grimoire {
  id: number;
  title: string;
  category: string;
  isActive: boolean;
}

export default function AdminSections() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<LibrarySection | null>(null);
  const [newSection, setNewSection] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '📚',
    order: 0
  });

  // Seções predefinidas do sistema
  const defaultSections: LibrarySection[] = [
    {
      id: 'porta-das-sombras',
      name: 'Porta das Sombras',
      slug: 'introducao-ocultismo',
      description: 'Introdução aos mistérios ocultos e primeiros passos na trilha das sombras',
      icon: '🚪',
      grimoireCount: 0,
      order: 1
    },
    {
      id: 'vestibulo-da-chama',
      name: 'Vestíbulo da Chama',
      slug: 'lucifer-luz-negra',
      description: 'Ensinamentos sobre Lúcifer, o portador da luz negra',
      icon: '🔥',
      grimoireCount: 0,
      order: 2
    },
    {
      id: 'torre-dos-selos',
      name: 'Torre dos Selos',
      slug: 'lilith-sombra-feminina',
      description: 'Lilith e os aspectos femininos das sombras',
      icon: '🗼',
      grimoireCount: 0,
      order: 3
    },
    {
      id: 'sanctum-profundum',
      name: 'Sanctum Profundum',
      slug: 'simbolismo-sigilos',
      description: 'Simbolismo, sigilos e práticas avançadas',
      icon: '⚡',
      grimoireCount: 0,
      order: 4
    },
    {
      id: 'textos-filosoficos',
      name: 'Textos Filosóficos',
      slug: 'textos-filosoficos',
      description: 'Reflexões filosóficas e questões fundamentais',
      icon: '🏛️',
      grimoireCount: 0,
      order: 5
    },
    {
      id: 'meditacoes-praticas',
      name: 'Meditações Práticas',
      slug: 'meditacoes-praticas',
      description: 'Práticas meditativas e exercícios espirituais',
      icon: '🧘',
      grimoireCount: 0,
      order: 6
    }
  ];

  // Buscar grimórios para contar quantos estão em cada seção
  const { data: grimoires = [] } = useQuery<Grimoire[]>({
    queryKey: ['/api/admin/grimoires']
  });

  // Contar grimórios por categoria
  const sectionsWithCounts = defaultSections.map(section => ({
    ...section,
    grimoireCount: grimoires.filter(g => g.category === section.slug && g.isActive).length
  }));

  const moveGrimoireMutation = useMutation({
    mutationFn: async ({ grimoireId, newCategory }: { grimoireId: number, newCategory: string }) => {
      const response = await apiRequest(`/api/admin/grimoires/${grimoireId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: newCategory })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/grimoires'] });
      toast({
        title: "Sucesso",
        description: "Grimório movido para nova seção",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao mover grimório",
        variant: "destructive",
      });
    }
  });

  const handleMoveGrimoire = (grimoireId: number, newCategory: string) => {
    moveGrimoireMutation.mutate({ grimoireId, newCategory });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-cinzel text-golden-amber">Seções da Biblioteca</h2>
          <p className="text-muted-foreground">
            Gerencie as seções organizacionais da Bibliotheca Arcana
          </p>
        </div>
      </div>

      {/* Seções Atuais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Seções Configuradas
          </CardTitle>
          <CardDescription>
            Estrutura organizacional atual da biblioteca
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectionsWithCounts.map((section) => (
              <div 
                key={section.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{section.icon}</div>
                  <div>
                    <h3 className="font-semibold text-golden-amber">{section.name}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="border-golden-amber/30 text-golden-amber">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {section.grimoireCount} grimórios
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {section.slug}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedSection(section);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grimórios por Seção */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber">Grimórios por Seção</CardTitle>
          <CardDescription>
            Visualize e mova grimórios entre seções
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sectionsWithCounts.map((section) => {
              const sectionGrimoires = grimoires.filter(g => g.category === section.slug);
              
              return (
                <div key={section.id} className="space-y-2">
                  <h3 className="font-semibold text-golden-amber flex items-center gap-2">
                    <span className="text-lg">{section.icon}</span>
                    {section.name}
                    <Badge variant="outline" className="ml-auto">
                      {sectionGrimoires.length} grimórios
                    </Badge>
                  </h3>
                  
                  {sectionGrimoires.length === 0 ? (
                    <p className="text-sm text-muted-foreground pl-6">
                      Nenhum grimório nesta seção
                    </p>
                  ) : (
                    <div className="pl-6 space-y-1">
                      {sectionGrimoires.map((grimoire) => (
                        <div 
                          key={grimoire.id}
                          className="flex items-center justify-between p-2 border rounded text-sm"
                        >
                          <span className={grimoire.isActive ? 'text-foreground' : 'text-muted-foreground'}>
                            {grimoire.title}
                          </span>
                          <div className="flex items-center gap-2">
                            {!grimoire.isActive && (
                              <Badge variant="secondary" className="text-xs">
                                Inativo
                              </Badge>
                            )}
                            <select
                              value={grimoire.category}
                              onChange={(e) => handleMoveGrimoire(grimoire.id, e.target.value)}
                              className="text-xs border rounded px-2 py-1 bg-background"
                            >
                              {sectionsWithCounts.map((s) => (
                                <option key={s.slug} value={s.slug}>
                                  {s.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Configuração de Seção */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-golden-amber">Configurar Seção</DialogTitle>
            <DialogDescription>
              Ajuste as informações da seção selecionada
            </DialogDescription>
          </DialogHeader>
          
          {selectedSection && (
            <div className="space-y-4">
              <div>
                <Label>Nome da Seção</Label>
                <p className="text-sm font-medium mt-1">{selectedSection.name}</p>
              </div>
              
              <div>
                <Label>Identificador (Slug)</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedSection.slug}</p>
              </div>
              
              <div>
                <Label>Descrição</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedSection.description}</p>
              </div>
              
              <div>
                <Label>Grimórios Ativos</Label>
                <p className="text-sm font-medium mt-1">{selectedSection.grimoireCount} grimórios</p>
              </div>
              
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  As seções são predefinidas do sistema. Use a tabela acima para mover grimórios entre seções.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}