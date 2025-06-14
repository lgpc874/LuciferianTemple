import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Flame,
  Crown,
  Skull,
  BookOpen,
  MoveUp,
  MoveDown
} from 'lucide-react';
import { type LibrarySection } from '@shared/schema';

export default function LibrarySections() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<LibrarySection | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slug: '',
    displayOrder: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch seções da biblioteca
  const { data: sections = [], isLoading } = useQuery<LibrarySection[]>({
    queryKey: ['/api/admin/library-sections']
  });

  // Mutação para criar seção
  const createSectionMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest('/api/admin/library-sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/library-sections'] });
      queryClient.invalidateQueries({ queryKey: ['/api/library-sections'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Seção criada",
        description: "A nova seção foi adicionada à biblioteca."
      });
    }
  });

  // Mutação para atualizar seção
  const updateSectionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<LibrarySection> }) => {
      const response = await apiRequest(`/api/admin/library-sections/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/library-sections'] });
      queryClient.invalidateQueries({ queryKey: ['/api/library-sections'] });
      setIsDialogOpen(false);
      setEditingSection(null);
      resetForm();
      toast({
        title: "Seção atualizada",
        description: "As alterações foram salvas com sucesso."
      });
    }
  });

  // Mutação para excluir seção
  const deleteSectionMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest(`/api/admin/library-sections/${id}`, {
        method: 'DELETE'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/library-sections'] });
      queryClient.invalidateQueries({ queryKey: ['/api/library-sections'] });
      toast({
        title: "Seção excluída",
        description: "A seção foi removida da biblioteca."
      });
    }
  });

  const getSectionIcon = (slug: string) => {
    switch (slug) {
      case 'porta-das-sombras':
        return Eye;
      case 'vestibulo-da-chama':
        return Flame;
      case 'torre-dos-selos':
        return Crown;
      case 'sanctum-profundum':
        return Skull;
      default:
        return BookOpen;
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      slug: '',
      displayOrder: sections.length
    });
  };

  const openCreateDialog = () => {
    resetForm();
    setEditingSection(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (section: LibrarySection) => {
    setFormData({
      name: section.name,
      description: section.description,
      slug: section.slug,
      displayOrder: section.displayOrder
    });
    setEditingSection(section);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSection) {
      updateSectionMutation.mutate({ id: editingSection.id, data: formData });
    } else {
      createSectionMutation.mutate(formData);
    }
  };

  const handleDelete = (section: LibrarySection) => {
    if (confirm(`Tem certeza que deseja excluir a seção "${section.name}"?`)) {
      deleteSectionMutation.mutate(section.id);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-golden-amber"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-cinzel text-golden-amber mb-2">
            <BookOpen className="inline w-6 h-6 mr-2" />
            Seções da Biblioteca
          </h2>
          <p className="text-sm text-muted-foreground">
            Gerencie as seções da biblioteca onde os grimórios são organizados
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={openCreateDialog}
              className="bg-golden-amber text-black hover:bg-golden-amber/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Seção
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingSection ? 'Editar Seção' : 'Nova Seção'}
              </DialogTitle>
              <DialogDescription>
                {editingSection ? 'Modifique os dados da seção' : 'Crie uma nova seção para organizar os grimórios'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome da Seção</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ex: Porta das Sombras"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva o propósito e conteúdo desta seção..."
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="porta-das-sombras"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="order">Ordem de Exibição</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) }))}
                  min="0"
                  required
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  disabled={createSectionMutation.isPending || updateSectionMutation.isPending}
                  className="flex-1 bg-golden-amber text-black hover:bg-golden-amber/90"
                >
                  {editingSection ? 'Atualizar' : 'Criar'} Seção
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Seções */}
      <div className="grid gap-4">
        {sections
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((section) => {
            const IconComponent = getSectionIcon(section.slug);
            
            return (
              <Card key={section.id} className="border-golden-amber/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-6 h-6 text-golden-amber" />
                      <div>
                        <CardTitle className="text-golden-amber">{section.name}</CardTitle>
                        <CardDescription className="italic">
                          "{section.description}"
                        </CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        Ordem: {section.displayOrder}
                      </Badge>
                      <Badge variant={section.isActive ? "default" : "secondary"}>
                        {section.isActive ? "Ativa" : "Inativa"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Slug:</span> /{section.slug}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(section)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(section)}
                        disabled={deleteSectionMutation.isPending}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

        {sections.length === 0 && (
          <Card className="border-dashed border-golden-amber/40">
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-golden-amber/60 mb-4" />
              <h3 className="text-lg font-cinzel text-golden-amber mb-2">
                Nenhuma Seção Criada
              </h3>
              <p className="text-muted-foreground mb-4">
                Crie seções para organizar os grimórios da biblioteca.
              </p>
              <Button 
                onClick={openCreateDialog}
                className="bg-golden-amber text-black hover:bg-golden-amber/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeira Seção
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}