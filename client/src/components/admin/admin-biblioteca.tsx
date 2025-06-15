import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  DollarSign,
  Bot,
  Sparkles,
  Settings,
  ShoppingCart,
  Crown,
  Flame,
  Skull,
  Save,
  RotateCcw
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Grimoire {
  id: number;
  title: string;
  description: string;
  section_id: number;
  content: string;
  is_paid: boolean;
  price: string | null;
  is_published: boolean;
  level: string;
  created_at: string;
  updated_at: string;
}

interface LibrarySection {
  id: number;
  name: string;
  description: string;
  icon: string;
  is_active: boolean;
}

interface CreateGrimoireRequest {
  title: string;
  description: string;
  section_id: number;
  chapters: string[];
  ai_config?: {
    personality: string;
    style: string;
    tone: string;
    specialization: string;
    guidelines: string;
  };
  is_paid: boolean;
  price?: string;
  level: string;
}

export default function AdminBiblioteca() {
  const [activeTab, setActiveTab] = useState("grimoires");
  const [selectedGrimoire, setSelectedGrimoire] = useState<Grimoire | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [createMode, setCreateMode] = useState<"manual" | "ai">("manual");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries
  const { data: grimoires = [], isLoading: grimoiresLoading } = useQuery<Grimoire[]>({
    queryKey: ['/api/grimoires'],
  });

  const { data: sections = [] } = useQuery<LibrarySection[]>({
    queryKey: ['/api/library/sections'],
  });

  // Mutations
  const createGrimoireMutation = useMutation({
    mutationFn: async (data: CreateGrimoireRequest) => {
      const response = await apiRequest("/api/admin/grimoires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires'] });
      setIsCreateDialogOpen(false);
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

  const updateGrimoireMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Grimoire> }) => {
      const response = await apiRequest(`/api/admin/grimoires/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires'] });
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

  const deleteGrimoireMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest(`/api/admin/grimoires/${id}`, {
        method: "DELETE",
      });
      return response.json();
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

  const generateAIGrimoireMutation = useMutation({
    mutationFn: async (prompt: string) => {
      setIsAIGenerating(true);
      const response = await apiRequest("/api/admin/ai/generate-grimoire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      setIsAIGenerating(false);
      toast({
        title: "IA Gerou Conteúdo",
        description: "Grimório gerado pela IA com sucesso",
      });
      // Preencher formulário com dados da IA
    },
    onError: (error: any) => {
      setIsAIGenerating(false);
      toast({
        title: "Erro na IA",
        description: error.message || "Erro ao gerar grimório com IA",
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
      default: return BookOpen;
    }
  };

  const getSectionName = (sectionId: number) => {
    const section = sections.find(s => s.id === sectionId);
    return section?.name || "Seção Desconhecida";
  };

  const togglePublished = (grimoire: Grimoire) => {
    updateGrimoireMutation.mutate({
      id: grimoire.id,
      data: { is_published: !grimoire.is_published }
    });
  };

  const formatPrice = (price: string | null) => {
    if (!price) return "Gratuito";
    return `R$ ${parseFloat(price).toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-golden-amber">📚 Biblioteca Arcana</h1>
        <p className="text-muted-foreground">
          Gerenciamento completo de grimórios com IA integrada e sistema de pagamentos
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="grimoires">Grimórios</TabsTrigger>
          <TabsTrigger value="ai-generator">IA Generator</TabsTrigger>
          <TabsTrigger value="sections">Seções</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        {/* Aba Grimórios */}
        <TabsContent value="grimoires" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-golden-amber">Gerenciar Grimórios</h2>
              <p className="text-muted-foreground">
                {grimoires.length} grimórios na biblioteca
              </p>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Grimório
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-golden-amber">
                    {createMode === "ai" ? "🤖 Criar Grimório com IA" : "📝 Criar Grimório Manual"}
                  </DialogTitle>
                  <DialogDescription>
                    {createMode === "ai" 
                      ? "Configure a IA para gerar automaticamente o conteúdo do grimório"
                      : "Crie um grimório manualmente preenchendo os campos necessários"
                    }
                  </DialogDescription>
                </DialogHeader>
                
                <CreateGrimoireForm 
                  mode={createMode}
                  onModeChange={setCreateMode}
                  sections={sections}
                  onSubmit={(data) => createGrimoireMutation.mutate(data)}
                  isLoading={createGrimoireMutation.isPending}
                  onAIGenerate={(prompt) => generateAIGrimoireMutation.mutate(prompt)}
                  isAIGenerating={isAIGenerating}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Lista de Grimórios */}
          <div className="grid gap-4">
            {grimoiresLoading ? (
              <div className="grid gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-32 bg-muted rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : grimoires.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    Nenhum grimório encontrado
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Crie seu primeiro grimório usando o botão acima
                  </p>
                </CardContent>
              </Card>
            ) : (
              grimoires.map((grimoire) => {
                const IconComponent = getSectionIcon(grimoire.section_id);
                return (
                  <Card key={grimoire.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="w-12 h-12 bg-golden-amber/20 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-golden-amber" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-golden-amber truncate">
                                {grimoire.title}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {getSectionName(grimoire.section_id)}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {grimoire.level}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {grimoire.description}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>Criado: {formatDate(grimoire.created_at)}</span>
                              <span>Atualizado: {formatDate(grimoire.updated_at)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          {/* Status e Preço */}
                          <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center space-x-2">
                              {grimoire.is_published ? (
                                <Badge className="bg-green-600 hover:bg-green-700">
                                  <Eye className="mr-1 h-3 w-3" />
                                  Publicado
                                </Badge>
                              ) : (
                                <Badge variant="secondary">
                                  <EyeOff className="mr-1 h-3 w-3" />
                                  Rascunho
                                </Badge>
                              )}
                              
                              <Badge variant="outline" className="border-golden-amber text-golden-amber">
                                <DollarSign className="mr-1 h-3 w-3" />
                                {formatPrice(grimoire.price)}
                              </Badge>
                            </div>
                            
                            {/* Ações */}
                            <div className="flex items-center space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => togglePublished(grimoire)}
                                disabled={updateGrimoireMutation.isPending}
                                className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                              >
                                {grimoire.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                              
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                                onClick={() => setSelectedGrimoire(grimoire)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              
                              {grimoire.is_paid && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                                >
                                  <ShoppingCart className="h-4 w-4" />
                                </Button>
                              )}
                              
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => deleteGrimoireMutation.mutate(grimoire.id)}
                                disabled={deleteGrimoireMutation.isPending}
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        {/* Aba IA Generator */}
        <TabsContent value="ai-generator" className="space-y-6">
          <AIGeneratorTab />
        </TabsContent>

        {/* Aba Seções */}
        <TabsContent value="sections" className="space-y-6">
          <SectionsTab sections={sections} />
        </TabsContent>

        {/* Aba Configurações */}
        <TabsContent value="settings" className="space-y-6">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Componente do formulário de criação
function CreateGrimoireForm({ 
  mode, 
  onModeChange, 
  sections, 
  onSubmit, 
  isLoading,
  onAIGenerate,
  isAIGenerating 
}: {
  mode: "manual" | "ai";
  onModeChange: (mode: "manual" | "ai") => void;
  sections: LibrarySection[];
  onSubmit: (data: any) => void;
  isLoading: boolean;
  onAIGenerate: (prompt: string) => void;
  isAIGenerating: boolean;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    section_id: "",
    is_paid: false,
    price: "",
    level: "iniciante",
    chapters: [
      { title: "Introdução", content: "" }
    ],
    cover_image_url: "",
    generate_cover_with_ai: false,
    ai_config: {
      personality: "mystical",
      style: "narrative",
      tone: "formal",
      specialization: "luciferian",
      guidelines: "",
      numChapters: 5,
      chapterTitles: ["Introdução", "Fundamentos", "Prática", "Desenvolvimento", "Conclusão"],
      coverDescription: ""
    }
  });

  const addChapter = () => {
    setFormData({
      ...formData,
      chapters: [...formData.chapters, { title: "", content: "" }]
    });
  };

  const removeChapter = (index: number) => {
    if (formData.chapters.length > 1) {
      const newChapters = formData.chapters.filter((_, i) => i !== index);
      setFormData({ ...formData, chapters: newChapters });
    }
  };

  const updateChapter = (index: number, field: 'title' | 'content', value: string) => {
    const newChapters = [...formData.chapters];
    newChapters[index] = { ...newChapters[index], [field]: value };
    setFormData({ ...formData, chapters: newChapters });
  };

  const generateChapterTitles = () => {
    const numChapters = formData.ai_config.numChapters;
    const newTitles = [...formData.ai_config.chapterTitles];
    
    // Ajustar array para o número desejado de capítulos
    while (newTitles.length < numChapters) {
      newTitles.push(`Capítulo ${newTitles.length + 1}`);
    }
    while (newTitles.length > numChapters) {
      newTitles.pop();
    }
    
    setFormData({
      ...formData,
      ai_config: { ...formData.ai_config, chapterTitles: newTitles },
      chapters: newTitles.map(title => ({ title, content: "" }))
    });
  };

  const [isGeneratingCover, setIsGeneratingCover] = useState(false);
  const { toast } = useToast();

  const generateAICover = async (title: string, description: string) => {
    if (!title) {
      toast({
        title: "Título Necessário",
        description: "Digite um título para gerar a capa",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsGeneratingCover(true);
      const response = await apiRequest("/api/admin/ai/generate-cover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          description: description || `Capa para grimório luciferiano "${title}"` 
        })
      });
      
      const result = await response.json();
      setFormData({
        ...formData,
        cover_image_url: result.imageUrl
      });
      
      toast({
        title: "Capa Gerada",
        description: "Capa criada com sucesso pela IA"
      });
    } catch (error) {
      toast({
        title: "Erro na Geração",
        description: "Erro ao gerar capa com IA",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingCover(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      section_id: parseInt(formData.section_id),
      chapters: formData.chapters.filter(c => c.title?.trim() && c.content?.trim()),
      price: formData.is_paid ? formData.price : null,
      cover_image_url: formData.cover_image_url || null,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Seletor de Modo */}
      <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
        <Label>Modo de Criação:</Label>
        <div className="flex space-x-2">
          <Button
            type="button"
            variant={mode === "manual" ? "default" : "outline"}
            size="sm"
            onClick={() => onModeChange("manual")}
            className={mode === "manual" ? "bg-amber-500 hover:bg-amber-600 text-black" : "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"}
          >
            📝 Manual
          </Button>
          <Button
            type="button"
            variant={mode === "ai" ? "default" : "outline"}
            size="sm"
            onClick={() => onModeChange("ai")}
            className={mode === "ai" ? "bg-amber-500 hover:bg-amber-600 text-black" : "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"}
          >
            🤖 IA Automática
          </Button>
        </div>
      </div>

      {/* Campos básicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título do Grimório</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Ex: Rituais da Lua Negra"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="section">Seção</Label>
          <Select value={formData.section_id} onValueChange={(value) => setFormData({...formData, section_id: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma seção" />
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

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Descreva o conteúdo e objetivo deste grimório..."
          rows={3}
        />
      </div>

      {/* Configuração IA (se modo IA) */}
      {mode === "ai" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-golden-amber flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Configuração da IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Personalidade da IA</Label>
                <Select value={formData.ai_config.personality} onValueChange={(value) => 
                  setFormData({...formData, ai_config: {...formData.ai_config, personality: value}})
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha a personalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scholar">Erudito Antigo</SelectItem>
                    <SelectItem value="mystic">Místico Visionário</SelectItem>
                    <SelectItem value="practitioner">Praticante Experiente</SelectItem>
                    <SelectItem value="philosopher">Filósofo Oculto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Estilo de Escrita</Label>
                <Select value={formData.ai_config.style} onValueChange={(value) => 
                  setFormData({...formData, ai_config: {...formData.ai_config, style: value}})
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Acadêmico</SelectItem>
                    <SelectItem value="poetic">Poético</SelectItem>
                    <SelectItem value="ritual">Ritualístico</SelectItem>
                    <SelectItem value="practical">Prático</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Diretrizes Especiais</Label>
              <Textarea
                value={formData.ai_config.guidelines}
                onChange={(e) => setFormData({...formData, ai_config: {...formData.ai_config, guidelines: e.target.value}})}
                placeholder="Instruções específicas para a IA sobre como abordar este tópico..."
                rows={3}
              />
            </div>

            <Button
              type="button"
              onClick={() => {
                const prompt = `
                  Título: ${formData.title}
                  Descrição: ${formData.description}
                  Número de Capítulos: ${formData.ai_config.numChapters}
                  Títulos dos Capítulos: ${formData.ai_config.chapterTitles.join(', ')}
                  
                  Configurações:
                  - Personalidade: ${formData.ai_config.personality}
                  - Estilo: ${formData.ai_config.style}
                  - Tom: ${formData.ai_config.tone}
                  - Especialização: ${formData.ai_config.specialization}
                  ${formData.ai_config.guidelines ? `- Diretrizes: ${formData.ai_config.guidelines}` : ''}
                  
                  Gere um grimório completo com os capítulos especificados, incluindo conteúdo detalhado para cada capítulo.
                `;
                onAIGenerate(prompt);
              }}
              disabled={isAIGenerating || !formData.title}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
            >
              {isAIGenerating ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  IA Gerando Conteúdo...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Gerar com IA
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Configuração de Capítulos para IA */}
      {mode === "ai" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-golden-amber">Configuração de Capítulos</CardTitle>
            <CardDescription>
              Configure quantos capítulos e seus títulos para a IA gerar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Número de Capítulos</Label>
                <Select 
                  value={formData.ai_config.numChapters.toString()} 
                  onValueChange={(value) => {
                    const numChapters = parseInt(value);
                    setFormData({
                      ...formData, 
                      ai_config: { ...formData.ai_config, numChapters }
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Capítulos</SelectItem>
                    <SelectItem value="5">5 Capítulos</SelectItem>
                    <SelectItem value="7">7 Capítulos</SelectItem>
                    <SelectItem value="10">10 Capítulos</SelectItem>
                    <SelectItem value="12">12 Capítulos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Auto-gerar Títulos</Label>
                <Button
                  type="button"
                  onClick={generateChapterTitles}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                  size="sm"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Gerar Títulos
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Títulos dos Capítulos</Label>
              {formData.ai_config.chapterTitles.map((title, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-sm font-medium w-20">Cap. {index + 1}:</span>
                  <Input
                    value={title}
                    onChange={(e) => {
                      const newTitles = [...formData.ai_config.chapterTitles];
                      newTitles[index] = e.target.value;
                      setFormData({
                        ...formData,
                        ai_config: { ...formData.ai_config, chapterTitles: newTitles }
                      });
                    }}
                    placeholder={`Título do Capítulo ${index + 1}`}
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Criação Manual de Capítulos */}
      {mode === "manual" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-golden-amber">Capítulos do Grimório</CardTitle>
            <CardDescription>
              Crie cada capítulo individualmente com título e conteúdo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.chapters.map((chapter, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">Capítulo {index + 1}</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeChapter(index)}
                    disabled={formData.chapters.length === 1}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label>Título do Capítulo</Label>
                  <Input
                    value={chapter.title}
                    onChange={(e) => updateChapter(index, 'title', e.target.value)}
                    placeholder={`Ex: Fundamentos da Magia Luciferiana`}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Conteúdo do Capítulo</Label>
                  <Textarea
                    value={chapter.content}
                    onChange={(e) => updateChapter(index, 'content', e.target.value)}
                    placeholder="Digite o conteúdo do capítulo. O texto será automaticamente formatado de acordo com a estética do site..."
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              onClick={addChapter}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Novo Capítulo
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Configuração de Capa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber flex items-center">
            📸 Capa do Grimório
          </CardTitle>
          <CardDescription>
            Configure a imagem de capa que será exibida na biblioteca
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preview da Capa */}
            <div className="space-y-3">
              <Label>Preview da Capa</Label>
              <div className="border-2 border-dashed border-amber-500/30 rounded-lg p-4 aspect-[3/4] flex items-center justify-center bg-black/20">
                {formData.cover_image_url ? (
                  <img 
                    src={formData.cover_image_url} 
                    alt="Preview da capa"
                    className="max-w-full max-h-full object-contain rounded"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/300x400/1a1a1a/d4af37?text=${encodeURIComponent(formData.title || 'Grimório')}`;
                    }}
                  />
                ) : (
                  <div className="text-center text-amber-500/60">
                    <div className="text-4xl mb-2">📖</div>
                    <p className="text-sm">Preview da capa aparecerá aqui</p>
                  </div>
                )}
              </div>
            </div>

            {/* Opções de Capa */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>URL da Imagem de Capa</Label>
                <input
                  type="url"
                  className="w-full p-2 border rounded-lg bg-black/20 border-amber-500/30 text-white placeholder-gray-400"
                  placeholder="https://exemplo.com/imagem-capa.jpg"
                  value={formData.cover_image_url}
                  onChange={(e) => setFormData({...formData, cover_image_url: e.target.value})}
                />
                <p className="text-xs text-gray-400">
                  Cole o link direto de uma imagem (JPG, PNG, WebP)
                </p>
              </div>

              <div className="border-t border-amber-500/20 pt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="checkbox"
                    id="generate_cover_ai"
                    checked={formData.generate_cover_with_ai}
                    onChange={(e) => setFormData({...formData, generate_cover_with_ai: e.target.checked})}
                  />
                  <Label htmlFor="generate_cover_ai">Gerar capa com IA</Label>
                </div>
                
                {formData.generate_cover_with_ai && (
                  <div className="space-y-3">
                    <textarea
                      className="w-full p-3 border rounded-lg bg-black/20 border-amber-500/30 text-white placeholder-gray-400 resize-none"
                      placeholder="Descreva como você quer a capa: estilo, cores, elementos, atmosfera..."
                      rows={3}
                      value={formData.ai_config.coverDescription || ""}
                      onChange={(e) => setFormData({
                        ...formData,
                        ai_config: { ...formData.ai_config, coverDescription: e.target.value }
                      })}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => generateAICover(formData.title, formData.ai_config?.coverDescription || "")}
                      disabled={isGeneratingCover}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                    >
                      {isGeneratingCover ? (
                        <>
                          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                          Gerando Capa...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Gerar Capa com IA
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-gray-400">
                      A IA criará uma capa única baseada na sua descrição
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-amber-500/20 pt-4">
                <Label className="text-sm text-gray-400">Capa Automática</Label>
                <p className="text-xs text-gray-500 mb-2">
                  Se nenhuma imagem for fornecida, uma capa será gerada automaticamente com o título
                </p>
                <div className="bg-gradient-to-br from-gray-800 to-black border border-amber-500/30 rounded p-3 text-center">
                  <div className="text-amber-500 text-sm font-semibold">
                    {formData.title || "Título do Grimório"}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Capa Automática</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Monetização */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Monetização
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_paid"
              checked={formData.is_paid}
              onChange={(e) => setFormData({...formData, is_paid: e.target.checked})}
            />
            <Label htmlFor="is_paid">Este é um grimório pago</Label>
          </div>
          
          {formData.is_paid && (
            <div>
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="29.99"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" className="border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white">
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
          {isLoading ? "Criando..." : "Criar Grimório"}
        </Button>
      </div>
    </form>
  );
}

// Placeholder para outras abas
function AIGeneratorTab() {
  const [aiSettings, setAiSettings] = useState({
    personality: "mystical",
    complexity: "intermediate", 
    length: "medium",
    style: "narrative",
    guidelines: "",
    defaultSection: "",
    autoPrice: false,
    priceRange: { min: "9.99", max: "49.99" }
  });

  const [quickPrompt, setQuickPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const { toast } = useToast();

  const saveAISettings = async () => {
    try {
      await apiRequest("/api/admin/ai/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aiSettings)
      });
      toast({
        title: "Configurações Salvas",
        description: "Configurações da IA atualizadas com sucesso"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações da IA",
        variant: "destructive"
      });
    }
  };

  const generateQuickGrimoire = async () => {
    if (!quickPrompt.trim()) {
      toast({
        title: "Prompt Necessário",
        description: "Digite um prompt para geração",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      await apiRequest("/api/admin/ai/generate-quick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: quickPrompt,
          settings: aiSettings 
        })
      });
      toast({
        title: "Grimório Gerado",
        description: "Grimório criado com sucesso pela IA"
      });
      setQuickPrompt("");
    } catch (error) {
      toast({
        title: "Erro na Geração",
        description: "Erro ao gerar grimório com IA",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-golden-amber">🤖 Gerador de IA</h2>
        <p className="text-muted-foreground">
          Configure a IA para geração automática de grimórios luciferianos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber">Configurações Globais da IA</CardTitle>
          <CardDescription>
            Estas configurações serão aplicadas a todas as gerações automáticas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Personalidade da IA</Label>
              <Select value={aiSettings.personality} onValueChange={(value) => 
                setAiSettings({...aiSettings, personality: value})
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mystical">Místico e Esotérico</SelectItem>
                  <SelectItem value="academic">Acadêmico e Formal</SelectItem>
                  <SelectItem value="practical">Prático e Direto</SelectItem>
                  <SelectItem value="philosophical">Filosófico e Reflexivo</SelectItem>
                  <SelectItem value="luciferian">Luciferiano Tradicional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Nível de Complexidade</Label>
              <Select value={aiSettings.complexity} onValueChange={(value) => 
                setAiSettings({...aiSettings, complexity: value})
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Iniciante</SelectItem>
                  <SelectItem value="intermediate">Intermediário</SelectItem>
                  <SelectItem value="advanced">Avançado</SelectItem>
                  <SelectItem value="master">Mestre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Extensão Padrão</Label>
              <Select value={aiSettings.length} onValueChange={(value) => 
                setAiSettings({...aiSettings, length: value})
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Curto (5-10 páginas)</SelectItem>
                  <SelectItem value="medium">Médio (15-25 páginas)</SelectItem>
                  <SelectItem value="long">Longo (30-50 páginas)</SelectItem>
                  <SelectItem value="extensive">Extenso (50+ páginas)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Estilo de Escrita</Label>
              <Select value={aiSettings.style} onValueChange={(value) => 
                setAiSettings({...aiSettings, style: value})
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="narrative">Narrativo</SelectItem>
                  <SelectItem value="instructional">Instrucional</SelectItem>
                  <SelectItem value="dialogue">Diálogo Socrático</SelectItem>
                  <SelectItem value="ritual">Ritual e Cerimonial</SelectItem>
                  <SelectItem value="mixed">Misto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Diretrizes Especiais</Label>
            <textarea
              className="w-full p-3 border rounded-lg resize-none"
              placeholder="Instruções específicas sobre filosofia, abordagem, temas a evitar ou enfatizar..."
              rows={3}
              value={aiSettings.guidelines}
              onChange={(e) => setAiSettings({...aiSettings, guidelines: e.target.value})}
            />
          </div>

          <Button 
            onClick={saveAISettings}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
          >
            <Settings className="mr-2 h-4 w-4" />
            Salvar Configurações da IA
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber">Geração Rápida</CardTitle>
          <CardDescription>
            Gere um grimório instantaneamente com prompt personalizado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Prompt para Geração</Label>
            <textarea
              className="w-full p-3 border rounded-lg resize-none"
              placeholder="Ex: 'Rituais de proteção usando elementos', 'Meditações para despertar o eu superior', 'Práticas de magia lunar avançada'"
              rows={3}
              value={quickPrompt}
              onChange={(e) => setQuickPrompt(e.target.value)}
            />
          </div>

          <Button 
            onClick={generateQuickGrimoire}
            disabled={isGenerating || !quickPrompt.trim()}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
          >
            {isGenerating ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Gerando Grimório...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Gerar Grimório Automaticamente
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function SectionsTab({ sections }: { sections: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-golden-amber">📂 Seções da Biblioteca</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {sections.map((section) => (
            <div key={section.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">{section.name}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
              <Badge variant={section.is_active ? "default" : "secondary"}>
                {section.is_active ? "Ativa" : "Inativa"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SettingsTab() {
  const [aiSettings, setAiSettings] = useState({
    personality: 'luciferian',
    complexity: 'beginner',
    length: 'medium',
    style: 'mixed',
    guidelines: '',
    defaultSection: '',
    autoPrice: false,
    priceRange: { min: '9.99', max: '49.99' }
  });

  const [systemSettings, setSystemSettings] = useState({
    siteName: 'Templo do Abismo',
    siteDescription: 'Portal de ensinamentos luciferianos',
    siteKeywords: 'lucifer, ocultismo, magia, grimórios',
    adminEmail: 'admin@templodoabismo.com',
    contentLanguage: 'português',
    contentTone: 'formal',
    contentTargetAudience: 'iniciantes',
    enableUserRegistration: true,
    enablePaidContent: true,
    enableAIGeneration: true,
    securityLevel: 'medium',
    enableContentProtection: true,
    enableDownloadProtection: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Carregar configurações reais do Supabase
  const { data: currentAISettings, isLoading: loadingAI } = useQuery({
    queryKey: ["/api/admin/ai/settings"],
  });

  const { data: currentSystemSettings, isLoading: loadingSystem } = useQuery({
    queryKey: ["/api/admin/settings"],
  });

  // Atualizar estados com dados reais do Supabase
  React.useEffect(() => {
    if (currentAISettings) {
      setAiSettings(currentAISettings);
    }
  }, [currentAISettings]);

  React.useEffect(() => {
    if (currentSystemSettings) {
      setSystemSettings(currentSystemSettings);
    }
  }, [currentSystemSettings]);

  const saveAISettings = async () => {
    setIsSaving(true);
    try {
      await apiRequest("/api/admin/ai/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aiSettings)
      });
      
      // Invalidar cache para recarregar dados
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ai/settings"] });
      
      toast({
        title: "Configurações de IA Salvas",
        description: "Dados persistidos no Supabase"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações de IA",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const saveSystemSettings = async () => {
    setIsSaving(true);
    try {
      await apiRequest("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(systemSettings)
      });
      
      // Invalidar cache para recarregar dados
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      
      toast({
        title: "Configurações do Sistema Salvas",
        description: "Dados persistidos no Supabase"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações do sistema",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetAIToDefaults = () => {
    if (confirm("Restaurar configurações padrão de IA?")) {
      setAiSettings({
        personality: 'luciferian',
        complexity: 'beginner',
        length: 'medium',
        style: 'mixed',
        guidelines: '',
        defaultSection: '',
        autoPrice: false,
        priceRange: { min: '9.99', max: '49.99' }
      });
    }
  };

  const resetSystemToDefaults = () => {
    if (confirm("Restaurar configurações padrão do sistema?")) {
      setSystemSettings({
        siteName: 'Templo do Abismo',
        siteDescription: 'Portal de ensinamentos luciferianos',
        siteKeywords: 'lucifer, ocultismo, magia, grimórios',
        adminEmail: 'admin@templodoabismo.com',
        contentLanguage: 'português',
        contentTone: 'formal',
        contentTargetAudience: 'iniciantes',
        enableUserRegistration: true,
        enablePaidContent: true,
        enableAIGeneration: true,
        securityLevel: 'medium',
        enableContentProtection: true,
        enableDownloadProtection: true
      });
    }
  };

  if (loadingAI || loadingSystem) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full"></div>
        <span className="ml-3 text-amber-500">Carregando configurações do Supabase...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-golden-amber">⚙️ Configurações do Sistema</h2>
        <p className="text-muted-foreground">
          Configure o comportamento geral da plataforma
        </p>
      </div>

      {/* Configurações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber">Configurações Gerais</CardTitle>
          <CardDescription>Informações básicas do site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome do Site</Label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Moeda Padrão</Label>
              <Select value={settings.defaultCurrency} onValueChange={(value) => 
                setSettings({...settings, defaultCurrency: value})
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRL">Real (BRL)</SelectItem>
                  <SelectItem value="USD">Dólar (USD)</SelectItem>
                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descrição do Site</Label>
            <textarea
              className="w-full p-2 border rounded-lg resize-none"
              rows={2}
              value={settings.siteDescription}
              onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="allowRegistrations"
                checked={settings.allowRegistrations}
                onChange={(e) => setSettings({...settings, allowRegistrations: e.target.checked})}
              />
              <Label htmlFor="allowRegistrations">Permitir Registros</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="moderateComments"
                checked={settings.moderateComments}
                onChange={(e) => setSettings({...settings, moderateComments: e.target.checked})}
              />
              <Label htmlFor="moderateComments">Moderar Comentários</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Conteúdo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber">Gestão de Conteúdo</CardTitle>
          <CardDescription>Controle da publicação e qualidade</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tamanho Máximo (MB)</Label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={settings.maxGrimoireSize}
                onChange={(e) => setSettings({...settings, maxGrimoireSize: parseInt(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <Label>Teste Gratuito (dias)</Label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={settings.freeTrialDays}
                onChange={(e) => setSettings({...settings, freeTrialDays: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoPublish"
                checked={settings.autoPublish}
                onChange={(e) => setSettings({...settings, autoPublish: e.target.checked})}
              />
              <Label htmlFor="autoPublish">Publicação Automática</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="requireApproval"
                checked={settings.requireApproval}
                onChange={(e) => setSettings({...settings, requireApproval: e.target.checked})}
              />
              <Label htmlFor="requireApproval">Requer Aprovação</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber">Segurança</CardTitle>
          <CardDescription>Proteção e controle de acesso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tentativas de Login</Label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({...settings, maxLoginAttempts: parseInt(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <Label>Timeout Sessão (horas)</Label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enableContentProtection"
              checked={settings.enableContentProtection}
              onChange={(e) => setSettings({...settings, enableContentProtection: e.target.checked})}
            />
            <Label htmlFor="enableContentProtection">Ativar Proteção de Conteúdo</Label>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={resetToDefaults}
          className="border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Restaurar Padrões
        </Button>

        <Button
          onClick={saveSettings}
          disabled={isSaving}
          className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
        >
          {isSaving ? (
            <>
              <Settings className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>
    </div>
  );
}