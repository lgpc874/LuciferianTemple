import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Settings,
  Tag,
  TrendingUp,
  Filter,
  Search,
  MoreVertical,
  DollarSign
} from 'lucide-react';
import GrimoireEditor from './grimoire-editor';

interface Grimoire {
  id: number;
  title: string;
  description: string;
  category: string;
  difficultyLevel: number;
  coverImageUrl?: string;
  price?: string | null;
  isPaid?: boolean;
  isActive: boolean;
  createdAt: string;
  unlockOrder: number;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

interface DifficultyLevel {
  id: number;
  name: string;
  description: string;
}

export default function GrimoireManagement() {
  const [selectedGrimoire, setSelectedGrimoire] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [newCategory, setNewCategory] = useState('');
  const [newLevel, setNewLevel] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingLevel, setEditingLevel] = useState<DifficultyLevel | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch grimórios
  const { data: grimoires = [], isLoading: loadingGrimoires } = useQuery({
    queryKey: ['/api/grimoires'],
    queryFn: async () => {
      const response = await apiRequest('/api/grimoires');
      return response.json();
    }
  });

  // Fetch categorias
  const { data: categories = [] } = useQuery({
    queryKey: ['/api/admin/categories'],
    queryFn: async () => {
      const response = await apiRequest('/api/admin/categories');
      return response.json();
    }
  });

  // Níveis de dificuldade predefinidos
  const difficultyLevels: DifficultyLevel[] = [
    { id: 1, name: 'Iniciante', description: 'Para quem está começando' },
    { id: 2, name: 'Básico', description: 'Conhecimentos fundamentais' },
    { id: 3, name: 'Intermediário', description: 'Práticas mais avançadas' },
    { id: 4, name: 'Avançado', description: 'Para praticantes experientes' },
    { id: 5, name: 'Mestre', description: 'Ensinamentos superiores' }
  ];

  // Mutação para deletar grimório
  const deleteGrimoireMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest(`/api/admin/grimoires/${id}`, {
        method: 'DELETE'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires'] });
      toast({
        title: "Grimório excluído",
        description: "O grimório foi removido permanentemente."
      });
    }
  });

  // Mutação para toggle status (publicar/despublicar)
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number, isActive: boolean }) => {
      const response = await apiRequest(`/api/admin/grimoires/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      });
      return response.json();
    },
    onSuccess: (_, { isActive }) => {
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires'] });
      toast({
        title: isActive ? "Grimório publicado" : "Grimório despublicado",
        description: isActive ? "Agora está visível na biblioteca" : "Removido da biblioteca pública"
      });
    }
  });

  // Mutação para criar categoria
  const createCategoryMutation = useMutation({
    mutationFn: async (name: string) => {
      const response = await apiRequest('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/categories'] });
      setNewCategory('');
      toast({
        title: "Categoria criada",
        description: "Nova categoria adicionada com sucesso."
      });
    }
  });

  // Filtrar grimórios
  const filteredGrimoires = grimoires.filter((grimoire: Grimoire) => {
    const matchesSearch = grimoire.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grimoire.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || grimoire.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || grimoire.difficultyLevel.toString() === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleDeleteGrimoire = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este grimório? Esta ação não pode ser desfeita.')) {
      deleteGrimoireMutation.mutate(id);
    }
  };

  const handleToggleStatus = (id: number, currentStatus: boolean) => {
    toggleStatusMutation.mutate({ id, isActive: !currentStatus });
  };

  if (isCreating || isEditing) {
    return (
      <GrimoireEditor
        grimoireId={selectedGrimoire || undefined}
        onSave={() => {
          setIsCreating(false);
          setIsEditing(false);
          setSelectedGrimoire(null);
        }}
        onCancel={() => {
          setIsCreating(false);
          setIsEditing(false);
          setSelectedGrimoire(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-golden-amber">Gerenciamento de Grimórios</h2>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-golden-amber hover:bg-golden-amber/90 text-background"
        >
          <Plus className="w-4 h-4 mr-2" />
          Criar Novo Grimório
        </Button>
      </div>

      <Tabs defaultValue="grimoires" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="grimoires">Grimórios</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="levels">Níveis</TabsTrigger>
        </TabsList>

        {/* Aba Grimórios */}
        <TabsContent value="grimoires" className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Título ou descrição..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      {categories.map((category: string) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Nível</Label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os níveis</SelectItem>
                      {difficultyLevels.map((level) => (
                        <SelectItem key={level.id} value={level.id.toString()}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="text-sm text-muted-foreground">
                    {filteredGrimoires.length} grimórios encontrados
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Grimórios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGrimoires.map((grimoire: Grimoire) => (
              <Card key={grimoire.id} className="relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg">{grimoire.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {grimoire.description}
                      </CardDescription>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-2">
                      {grimoire.isPaid && (
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {grimoire.price}
                        </Badge>
                      )}
                      
                      <Badge variant={grimoire.isActive ? "default" : "secondary"}>
                        {grimoire.isActive ? (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Público
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            Privado
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Categoria:</span>
                      <Badge variant="outline">{grimoire.category}</Badge>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Nível:</span>
                      <Badge variant="outline">
                        {difficultyLevels.find(l => l.id === grimoire.difficultyLevel)?.name}
                      </Badge>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedGrimoire(grimoire.id);
                          setIsEditing(true);
                        }}
                        className="flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>

                      <Button
                        size="sm"
                        variant={grimoire.isActive ? "secondary" : "default"}
                        onClick={() => handleToggleStatus(grimoire.id, grimoire.isActive)}
                      >
                        {grimoire.isActive ? (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            Despublicar
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Publicar
                          </>
                        )}
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteGrimoire(grimoire.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGrimoires.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum grimório encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  Ajuste os filtros ou crie um novo grimório.
                </p>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro Grimório
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Aba Categorias */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Gerenciar Categorias
              </CardTitle>
              <CardDescription>
                Crie e organize categorias para seus grimórios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Nome da nova categoria..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={() => createCategoryMutation.mutate(newCategory)}
                  disabled={!newCategory.trim() || createCategoryMutation.isPending}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>

              <div className="space-y-2">
                {categories.map((category: string) => (
                  <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{category}</span>
                      <Badge variant="secondary">
                        {grimoires.filter((g: Grimoire) => g.category === category).length} grimórios
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Níveis */}
        <TabsContent value="levels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Níveis de Dificuldade
              </CardTitle>
              <CardDescription>
                Configure os níveis de dificuldade disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {difficultyLevels.map((level) => (
                <div key={level.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">Nível {level.id}</Badge>
                      <span className="font-medium">{level.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                    <Badge variant="secondary">
                      {grimoires.filter((g: Grimoire) => g.difficultyLevel === level.id).length} grimórios
                    </Badge>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}