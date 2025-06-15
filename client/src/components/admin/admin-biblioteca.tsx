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
  Skull
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
                <Button className="bg-golden-amber hover:bg-golden-amber/80 text-black">
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
                              >
                                {grimoire.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                              
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedGrimoire(grimoire)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              
                              {grimoire.is_paid && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-golden-amber text-golden-amber hover:bg-golden-amber hover:text-black"
                                >
                                  <ShoppingCart className="h-4 w-4" />
                                </Button>
                              )}
                              
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => deleteGrimoireMutation.mutate(grimoire.id)}
                                disabled={deleteGrimoireMutation.isPending}
                                className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
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
    chapters: [""],
    is_paid: false,
    price: "",
    level: "iniciante",
    ai_config: {
      personality: "",
      style: "",
      tone: "",
      specialization: "",
      guidelines: ""
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      section_id: parseInt(formData.section_id),
      chapters: formData.chapters.filter(c => c.trim()),
      price: formData.is_paid ? formData.price : null,
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
          >
            📝 Manual
          </Button>
          <Button
            type="button"
            variant={mode === "ai" ? "default" : "outline"}
            size="sm"
            onClick={() => onModeChange("ai")}
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
              onClick={() => onAIGenerate(`Crie um grimório sobre "${formData.title}" com as seguintes configurações: ${JSON.stringify(formData.ai_config)}`)}
              disabled={isAIGenerating || !formData.title}
              className="w-full bg-purple-600 hover:bg-purple-700"
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

      {/* Capítulos (se modo manual) */}
      {mode === "manual" && (
        <div>
          <Label>Capítulos</Label>
          <div className="space-y-2">
            {formData.chapters.map((chapter, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  value={chapter}
                  onChange={(e) => {
                    const newChapters = [...formData.chapters];
                    newChapters[index] = e.target.value;
                    setFormData({...formData, chapters: newChapters});
                  }}
                  placeholder={`Capítulo ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newChapters = formData.chapters.filter((_, i) => i !== index);
                    setFormData({...formData, chapters: newChapters});
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFormData({...formData, chapters: [...formData.chapters, ""]})}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Capítulo
            </Button>
          </div>
        </div>
      )}

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
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-golden-amber hover:bg-golden-amber/80 text-black">
          {isLoading ? "Criando..." : "Criar Grimório"}
        </Button>
      </div>
    </form>
  );
}

// Placeholder para outras abas
function AIGeneratorTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-golden-amber">🤖 IA Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Configurações globais da IA para geração de conteúdo automático.
        </p>
      </CardContent>
    </Card>
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-golden-amber">⚙️ Configurações</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Configurações gerais do sistema de biblioteca.
        </p>
      </CardContent>
    </Card>
  );
}