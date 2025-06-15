import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Eye,
  Download,
  Upload,
  Star,
  Clock
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface Grimoire {
  id: number;
  title: string;
  description: string;
  sectionId: number;
  sectionName?: string;
  totalChapters?: number;
  createdAt?: string;
  isActive: boolean;
  price?: string;
  isPaid: boolean;
}

export default function AdminGrimoires() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingGrimoire, setEditingGrimoire] = useState<Grimoire | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch grimoires
  const { data: grimoires, isLoading } = useQuery({
    queryKey: ['/api/admin/grimoires'],
    queryFn: async () => {
      const response = await apiRequest('/api/admin/grimoires');
      return response.json();
    }
  });

  // Fetch sections
  const { data: sections = [] } = useQuery({
    queryKey: ['/api/admin/sections'],
    queryFn: async () => {
      const response = await apiRequest('/api/admin/sections');
      return response.json();
    }
  });

  // Create grimoire mutation
  const createGrimoireMutation = useMutation({
    mutationFn: async (grimoireData: any) => {
      const response = await apiRequest('/api/admin/grimoires', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(grimoireData)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires'] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Grimório criado com sucesso",
        description: "O novo grimório foi adicionado à biblioteca."
      });
    }
  });

  // Update grimoire mutation
  const updateGrimoireMutation = useMutation({
    mutationFn: async ({ id, ...grimoireData }: any) => {
      const response = await apiRequest(`/api/admin/grimoires/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(grimoireData)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires'] });
      setEditingGrimoire(null);
      toast({
        title: "Grimório atualizado",
        description: "As alterações foram salvas com sucesso."
      });
    }
  });

  const categories = [
    'Introdução ao Ocultismo',
    'Magia Cerimonial',
    'Demonologia',
    'Alquimia Espiritual',
    'Rituais Avançados',
    'Filosofia Luciferiana'
  ];

  const handleCreateGrimoire = (formData: FormData) => {
    const grimoireData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      difficultyLevel: parseInt(formData.get('difficultyLevel') as string)
    };
    createGrimoireMutation.mutate(grimoireData);
  };

  const handleUpdateGrimoire = (formData: FormData) => {
    if (!editingGrimoire) return;
    
    const grimoireData = {
      id: editingGrimoire.id,
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      difficultyLevel: parseInt(formData.get('difficultyLevel') as string)
    };
    updateGrimoireMutation.mutate(grimoireData);
  };

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-orange-500';
      case 4: return 'bg-red-500';
      case 5: return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-golden-amber flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Gerenciamento de Grimórios
              </CardTitle>
              <CardDescription>
                Crie, edite e gerencie todos os grimórios da biblioteca
              </CardDescription>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-golden-amber hover:bg-golden-amber/90 text-background">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Grimório
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Novo Grimório</DialogTitle>
                  <DialogDescription>
                    Adicione um novo grimório à biblioteca
                  </DialogDescription>
                </DialogHeader>
                <form action={handleCreateGrimoire} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input id="title" name="title" placeholder="Nome do Grimório" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select name="category" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      placeholder="Descrição detalhada do grimório..." 
                      rows={4}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficultyLevel">Nível de Dificuldade</Label>
                    <Select name="difficultyLevel" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Iniciante</SelectItem>
                        <SelectItem value="2">2 - Básico</SelectItem>
                        <SelectItem value="3">3 - Intermediário</SelectItem>
                        <SelectItem value="4">4 - Avançado</SelectItem>
                        <SelectItem value="5">5 - Mestre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-golden-amber hover:bg-golden-amber/90 text-background"
                    disabled={createGrimoireMutation.isPending}
                  >
                    {createGrimoireMutation.isPending ? 'Criando...' : 'Criar Grimório'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-golden-amber mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando grimórios...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Seção</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Capítulos</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grimoires?.map((grimoire: Grimoire) => (
                  <TableRow key={grimoire.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-golden-amber" />
                        {grimoire.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {sections.find((s: any) => s.id === grimoire.sectionId)?.name || 'Sem seção'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${grimoire.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span>{grimoire.isActive ? 'Ativo' : 'Inativo'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {grimoire.totalChapters || 12} cap.
                      </div>
                    </TableCell>
                    <TableCell>
                      {grimoire.isPaid ? (
                        <Badge variant="default" className="bg-golden-amber/20 text-golden-amber">
                          R$ {grimoire.price || '0,00'}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Gratuito</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
                        Ativo
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingGrimoire(grimoire)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Grimoire Dialog */}
      <Dialog open={!!editingGrimoire} onOpenChange={() => setEditingGrimoire(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Grimório</DialogTitle>
            <DialogDescription>
              Modifique as informações do grimório
            </DialogDescription>
          </DialogHeader>
          {editingGrimoire && (
            <form action={handleUpdateGrimoire} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Título</Label>
                  <Input 
                    id="edit-title" 
                    name="title" 
                    defaultValue={editingGrimoire.title}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-section">Seção</Label>
                  <Select name="sectionId" defaultValue={editingGrimoire.sectionId?.toString()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section: any) => (
                        <SelectItem key={section.id} value={section.id.toString()}>
                          {section.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea 
                  id="edit-description" 
                  name="description" 
                  defaultValue={editingGrimoire.description}
                  rows={4}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-difficultyLevel">Nível de Dificuldade</Label>
                <Select name="difficultyLevel" defaultValue={editingGrimoire.difficultyLevel.toString()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Iniciante</SelectItem>
                    <SelectItem value="2">2 - Básico</SelectItem>
                    <SelectItem value="3">3 - Intermediário</SelectItem>
                    <SelectItem value="4">4 - Avançado</SelectItem>
                    <SelectItem value="5">5 - Mestre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-golden-amber hover:bg-golden-amber/90 text-background"
                disabled={updateGrimoireMutation.isPending}
              >
                {updateGrimoireMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}