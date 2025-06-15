import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Plus, 
  Edit, 
  Trash2, 
  BookOpen, 
  Eye, 
  Flame, 
  Crown, 
  Skull, 
  FileText, 
  Brain,
  Clock,
  DollarSign,
  Star,
  MoveVertical,
  Save,
  Upload
} from "lucide-react";
import type { Grimoire, LibrarySection, InsertGrimoire } from "@shared/schema";

const grimoireFormSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  category: z.string().min(1, "Categoria é obrigatória"),
  difficulty_level: z.number().min(1).max(4),
  section_id: z.number().min(1, "Seção é obrigatória"),
  cover_image_url: z.string().url().optional().or(z.literal("")),
  price: z.string().optional(),
  is_paid: z.boolean().default(false),
  is_active: z.boolean().default(true),
  unlock_order: z.number().min(0).default(0),
  estimated_reading_time: z.number().min(1).default(30),
  tags: z.array(z.string()).default([]),
});

type GrimoireFormData = z.infer<typeof grimoireFormSchema>;

export default function AdminBiblioteca() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [editingGrimoire, setEditingGrimoire] = useState<Grimoire | null>(null);
  const [selectedSection, setSelectedSection] = useState<number>(0);

  // Buscar seções da biblioteca
  const { data: sections = [] } = useQuery({
    queryKey: ['/api/library/sections'],
  });

  // Buscar todos os grimórios
  const { data: grimoires = [], isLoading: loadingGrimoires } = useQuery({
    queryKey: ['/api/grimoires'],
  });

  const form = useForm<GrimoireFormData>({
    resolver: zodResolver(grimoireFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "luciferiano",
      difficulty_level: 1,
      section_id: 1,
      cover_image_url: "",
      price: "",
      is_paid: false,
      is_active: true,
      unlock_order: 0,
      estimated_reading_time: 30,
      tags: [],
    },
  });

  // Mutation para criar grimório
  const createGrimoireMutation = useMutation({
    mutationFn: async (data: GrimoireFormData) => {
      const payload = {
        ...data,
        tags: data.tags.length > 0 ? data.tags : [],
        price: data.is_paid && data.price ? data.price : null,
      };
      return apiRequest('POST', '/api/admin/grimoires', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires'] });
      setIsCreating(false);
      form.reset();
      toast({
        title: "Sucesso",
        description: "Grimório criado com sucesso",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar grimório",
        variant: "destructive",
      });
    },
  });

  // Mutation para atualizar grimório
  const updateGrimoireMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<GrimoireFormData> }) => {
      const payload = {
        ...data,
        tags: data.tags && data.tags.length > 0 ? data.tags : [],
        price: data.is_paid && data.price ? data.price : null,
      };
      return apiRequest('PUT', `/api/admin/grimoires/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires'] });
      setEditingGrimoire(null);
      form.reset();
      toast({
        title: "Sucesso",
        description: "Grimório atualizado com sucesso",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar grimório",
        variant: "destructive",
      });
    },
  });

  // Mutation para deletar grimório
  const deleteGrimoireMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest('DELETE', `/api/admin/grimoires/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires'] });
      toast({
        title: "Sucesso",
        description: "Grimório deletado com sucesso",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao deletar grimório",
        variant: "destructive",
      });
    },
  });

  // Mutation para mover grimório
  const moveGrimoireMutation = useMutation({
    mutationFn: async ({ grimoireId, sectionId }: { grimoireId: number; sectionId: number }) => {
      return apiRequest('PUT', `/api/admin/grimoires/${grimoireId}/move-section`, { sectionId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires'] });
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
    },
  });

  const getSectionIcon = (sectionId: number) => {
    switch (sectionId) {
      case 1: return Eye;
      case 2: return Flame;
      case 3: return Crown;
      case 4: return Skull;
      case 5: return FileText;
      case 6: return Brain;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return "bg-green-500/20 text-green-300 border-green-500/30";
      case 2: return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case 3: return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case 4: return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getDifficultyText = (level: number) => {
    switch (level) {
      case 1: return "Iniciante";
      case 2: return "Intermediário";
      case 3: return "Avançado";
      case 4: return "Mestre";
      default: return "Indefinido";
    }
  };

  const getSectionName = (sectionId: number) => {
    const section = (sections as LibrarySection[]).find(s => s.id === sectionId);
    return section?.name || "Sem seção";
  };

  const getGrimoiresBySection = (sectionId: number) => {
    return (grimoires as Grimoire[]).filter(g => g.section_id === sectionId);
  };

  const handleCreateGrimoire = (data: GrimoireFormData) => {
    createGrimoireMutation.mutate(data);
  };

  const handleUpdateGrimoire = (data: GrimoireFormData) => {
    if (editingGrimoire) {
      updateGrimoireMutation.mutate({ id: editingGrimoire.id, data });
    }
  };

  const handleDeleteGrimoire = (id: number) => {
    if (confirm("Tem certeza que deseja deletar este grimório?")) {
      deleteGrimoireMutation.mutate(id);
    }
  };

  const handleMoveGrimoire = (grimoireId: number, sectionId: number) => {
    moveGrimoireMutation.mutate({ grimoireId, sectionId });
  };

  const startEditGrimoire = (grimoire: Grimoire) => {
    setEditingGrimoire(grimoire);
    form.reset({
      title: grimoire.title,
      description: grimoire.description,
      category: grimoire.category,
      difficulty_level: grimoire.difficulty_level,
      section_id: grimoire.section_id,
      cover_image_url: grimoire.cover_image_url || "",
      price: grimoire.price || "",
      is_paid: grimoire.is_paid,
      is_active: grimoire.is_active,
      unlock_order: grimoire.unlock_order,
      estimated_reading_time: grimoire.estimated_reading_time,
      tags: grimoire.tags || [],
    });
  };

  if (loadingGrimoires) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden-amber mx-auto mb-4"></div>
        <p className="text-muted-foreground">Carregando grimórios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-golden-amber">⧭ Gerenciamento da Biblioteca</h1>
          <p className="text-muted-foreground">
            Gerencie grimórios, seções e conteúdo da biblioteca arcana
          </p>
        </div>

        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="bg-golden-amber text-black hover:bg-golden-amber/90">
              <Plus className="mr-2 h-4 w-4" />
              Novo Grimório
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Grimório</DialogTitle>
              <DialogDescription>
                Adicione um novo grimório à biblioteca arcana
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateGrimoire)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do grimório" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descrição detalhada do grimório"
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <FormControl>
                          <Input placeholder="luciferiano" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="section_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seção</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma seção" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(sections as LibrarySection[]).map((section) => (
                              <SelectItem key={section.id} value={section.id.toString()}>
                                {section.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty_level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nível de Dificuldade</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 - Iniciante</SelectItem>
                            <SelectItem value="2">2 - Intermediário</SelectItem>
                            <SelectItem value="3">3 - Avançado</SelectItem>
                            <SelectItem value="4">4 - Mestre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estimated_reading_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tempo de Leitura (min)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="30"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="is_paid"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Grimório Pago</FormLabel>
                          <FormDescription>
                            Este grimório requer pagamento
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Ativo</FormLabel>
                          <FormDescription>
                            Grimório visível na biblioteca
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch('is_paid') && (
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço (R$)</FormLabel>
                        <FormControl>
                          <Input placeholder="29.90" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="cover_image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL da Capa (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Se não fornecida, uma capa padrão será gerada
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={createGrimoireMutation.isPending}>
                    {createGrimoireMutation.isPending ? "Criando..." : "Criar Grimório"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Grimórios</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">{grimoires.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seções Ativas</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">{sections.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grimórios Pagos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-golden-amber">
              {(grimoires as Grimoire[]).filter(g => g.is_paid).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de grimórios por seção */}
      <Tabs value={selectedSection.toString()} onValueChange={(value) => setSelectedSection(parseInt(value))}>
        <TabsList className="grid w-full grid-cols-7 gap-2 bg-transparent h-auto p-1">
          <TabsTrigger
            value="0"
            className="data-[state=active]:bg-red-900/50 data-[state=active]:text-golden-amber"
          >
            Todos
          </TabsTrigger>
          {(sections as LibrarySection[]).map((section) => {
            const IconComponent = getSectionIcon(section.id);
            const count = getGrimoiresBySection(section.id).length;
            
            return (
              <TabsTrigger
                key={section.id}
                value={section.id.toString()}
                className="flex flex-col items-center p-2 space-y-1 data-[state=active]:bg-red-900/50 data-[state=active]:text-golden-amber"
              >
                <IconComponent size={16} />
                <span className="text-xs">{section.name.split(' ')[0]}</span>
                <Badge variant="outline" className="text-xs">
                  {count}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="0" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(grimoires as Grimoire[]).map((grimoire) => (
              <GrimoireCard
                key={grimoire.id}
                grimoire={grimoire}
                sections={sections as LibrarySection[]}
                onEdit={startEditGrimoire}
                onDelete={handleDeleteGrimoire}
                onMove={handleMoveGrimoire}
                getSectionName={getSectionName}
                getDifficultyColor={getDifficultyColor}
                getDifficultyText={getDifficultyText}
              />
            ))}
          </div>
        </TabsContent>

        {(sections as LibrarySection[]).map((section) => (
          <TabsContent key={section.id} value={section.id.toString()} className="mt-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-golden-amber">{section.name}</h3>
              <p className="text-muted-foreground">{section.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getGrimoiresBySection(section.id).map((grimoire) => (
                <GrimoireCard
                  key={grimoire.id}
                  grimoire={grimoire}
                  sections={sections as LibrarySection[]}
                  onEdit={startEditGrimoire}
                  onDelete={handleDeleteGrimoire}
                  onMove={handleMoveGrimoire}
                  getSectionName={getSectionName}
                  getDifficultyColor={getDifficultyColor}
                  getDifficultyText={getDifficultyText}
                />
              ))}
            </div>

            {getGrimoiresBySection(section.id).length === 0 && (
              <div className="text-center py-12">
                <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum grimório nesta seção</h3>
                <p className="text-muted-foreground">
                  Crie novos grimórios ou mova existentes para esta seção.
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Dialog de edição */}
      <Dialog open={!!editingGrimoire} onOpenChange={() => setEditingGrimoire(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Grimório</DialogTitle>
            <DialogDescription>
              Modificar informações do grimório
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateGrimoire)} className="space-y-4">
              {/* Mesmo formulário do criar, mas com dados preenchidos */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="section_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seção</FormLabel>
                      <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(sections as LibrarySection[]).map((section) => (
                            <SelectItem key={section.id} value={section.id.toString()}>
                              {section.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nível de Dificuldade</FormLabel>
                      <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 - Iniciante</SelectItem>
                          <SelectItem value="2">2 - Intermediário</SelectItem>
                          <SelectItem value="3">3 - Avançado</SelectItem>
                          <SelectItem value="4">4 - Mestre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setEditingGrimoire(null)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={updateGrimoireMutation.isPending}>
                  {updateGrimoireMutation.isPending ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Componente para cartão de grimório
interface GrimoireCardProps {
  grimoire: Grimoire;
  sections: LibrarySection[];
  onEdit: (grimoire: Grimoire) => void;
  onDelete: (id: number) => void;
  onMove: (grimoireId: number, sectionId: number) => void;
  getSectionName: (sectionId: number) => string;
  getDifficultyColor: (level: number) => string;
  getDifficultyText: (level: number) => string;
}

function GrimoireCard({ 
  grimoire, 
  sections, 
  onEdit, 
  onDelete, 
  onMove, 
  getSectionName, 
  getDifficultyColor, 
  getDifficultyText 
}: GrimoireCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {grimoire.cover_image_url && (
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src={grimoire.cover_image_url} 
              alt={grimoire.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {grimoire.is_paid && grimoire.price && (
          <Badge className="absolute top-2 right-2 bg-golden-amber text-black">
            R$ {grimoire.price}
          </Badge>
        )}

        {!grimoire.is_active && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Inativo
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight">{grimoire.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {grimoire.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <Badge className={`border ${getDifficultyColor(grimoire.difficulty_level)}`}>
              {getDifficultyText(grimoire.difficulty_level)}
            </Badge>
            
            <div className="flex items-center text-muted-foreground">
              <Clock size={12} className="mr-1" />
              {grimoire.estimated_reading_time}min
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <strong>Seção:</strong> {getSectionName(grimoire.section_id)}
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(grimoire)}>
                <Edit size={14} className="mr-1" />
                Editar
              </Button>
              
              <Button 
                size="sm" 
                variant="destructive" 
                onClick={() => onDelete(grimoire.id)}
              >
                <Trash2 size={14} />
              </Button>
            </div>

            <Select onValueChange={(value) => onMove(grimoire.id, parseInt(value))}>
              <SelectTrigger className="w-24 h-8">
                <MoveVertical size={14} />
              </SelectTrigger>
              <SelectContent>
                {sections.filter(s => s.id !== grimoire.section_id).map((section) => (
                  <SelectItem key={section.id} value={section.id.toString()}>
                    {section.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}