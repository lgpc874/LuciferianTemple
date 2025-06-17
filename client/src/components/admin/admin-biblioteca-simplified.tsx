import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, Eye, EyeOff, Book, Sparkles, Bot, ImageIcon, Download, Palette } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import RichTextEditor from "@/components/ui/rich-text-editor";

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
  cover_image_url: string | null;
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
  content: string;
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
  cover_image_url?: string;
}

function GrimoireViewer({ grimoire }: { grimoire: Grimoire }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-golden-amber">{grimoire.title}</CardTitle>
        <CardDescription>{grimoire.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant={grimoire.is_published ? "default" : "secondary"}>
              {grimoire.is_published ? "Publicado" : "Rascunho"}
            </Badge>
            <Badge variant="outline">{grimoire.level}</Badge>
          </div>
          
          {grimoire.cover_image_url && (
            <div className="w-32 h-40 mx-auto">
              <img 
                src={grimoire.cover_image_url} 
                alt={grimoire.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: grimoire.content }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
    content: "",
    cover_image_url: "",
    generate_cover_with_ai: false,
    ai_config: {
      personality: "mystical",
      style: "narrative",
      tone: "formal",
      specialization: "luciferian",
      guidelines: "",
      coverDescription: ""
    }
  });

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

    setIsGeneratingCover(true);
    try {
      const response = await apiRequest("/api/admin/ai/generate-cover", {
        method: "POST",
        body: { title, description }
      });
      
      if (response.imageUrl) {
        setFormData({...formData, cover_image_url: response.imageUrl});
        toast({
          title: "Capa Gerada",
          description: "Capa gerada com sucesso pela IA"
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao gerar capa: " + error.message,
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
      price: formData.is_paid ? formData.price : null,
      cover_image_url: formData.cover_image_url || null,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Seletor de Modo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber">Modo de Criação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              type="button"
              variant={mode === "manual" ? "default" : "outline"}
              onClick={() => onModeChange("manual")}
              className={mode === "manual" ? "bg-amber-500 hover:bg-amber-600 text-black" : ""}
            >
              <Edit className="mr-2 h-4 w-4" />
              Manual
            </Button>
            <Button
              type="button"
              variant={mode === "ai" ? "default" : "outline"}
              onClick={() => onModeChange("ai")}
              className={mode === "ai" ? "bg-amber-500 hover:bg-amber-600 text-black" : ""}
            >
              <Bot className="mr-2 h-4 w-4" />
              Com IA
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título do Grimório</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Ex: O Caminho da Sombra"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="section">Seção da Biblioteca</Label>
          <Select value={formData.section_id} onValueChange={(value) => setFormData({...formData, section_id: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha uma seção" />
            </SelectTrigger>
            <SelectContent>
              {sections.map((section) => (
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
                  
                  Configurações:
                  - Personalidade: ${formData.ai_config.personality}
                  - Estilo: ${formData.ai_config.style}
                  - Tom: ${formData.ai_config.tone}
                  - Especialização: ${formData.ai_config.specialization}
                  ${formData.ai_config.guidelines ? `- Diretrizes: ${formData.ai_config.guidelines}` : ''}
                  
                  Gere um grimório completo em formato HTML com todo o conteúdo estruturado.
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

      {/* Editor de Conteúdo Único */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber">Conteúdo do Grimório</CardTitle>
          <CardDescription>
            Digite ou cole todo o conteúdo do grimório. O HTML será preservado exatamente como digitado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            value={formData.content}
            onChange={(value) => setFormData({...formData, content: value})}
            placeholder="Digite todo o conteúdo do grimório aqui..."
            height="500px"
          />
        </CardContent>
      </Card>

      {/* Configuração de Capa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber flex items-center">
            <ImageIcon className="mr-2 h-5 w-5" />
            Capa do Grimório
          </CardTitle>
          <CardDescription>
            Configure a imagem de capa que será exibida na biblioteca
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>URL da Capa</Label>
              <Input
                value={formData.cover_image_url}
                onChange={(e) => setFormData({...formData, cover_image_url: e.target.value})}
                placeholder="https://exemplo.com/capa.jpg"
              />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                onClick={() => generateAICover(formData.title, formData.description)}
                disabled={isGeneratingCover || !formData.title}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              >
                {isGeneratingCover ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Gerar com IA
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {formData.cover_image_url && (
            <div className="w-32 h-40 mx-auto">
              <img 
                src={formData.cover_image_url} 
                alt="Preview da capa"
                className="w-full h-full object-cover rounded-lg border"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configurações de Publicação */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber">Configurações de Publicação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Nível de Dificuldade</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iniciante">Iniciante</SelectItem>
                  <SelectItem value="intermediario">Intermediário</SelectItem>
                  <SelectItem value="avancado">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="is_paid"
                checked={formData.is_paid}
                onCheckedChange={(checked) => setFormData({...formData, is_paid: checked})}
              />
              <Label htmlFor="is_paid">Conteúdo Pago</Label>
            </div>
            
            {formData.is_paid && (
              <div>
                <Label>Preço (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="29.99"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        disabled={isLoading || !formData.title || !formData.content || !formData.section_id}
        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3"
      >
        {isLoading ? "Criando..." : "Criar Grimório"}
      </Button>
    </form>
  );
}

export default function AdminBiblioteca() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [mode, setMode] = useState<"manual" | "ai">("manual");
  const [selectedGrimoire, setSelectedGrimoire] = useState<Grimoire | null>(null);
  const [pdfColorDialogOpen, setPdfColorDialogOpen] = useState(false);
  const [selectedGrimoireForPDF, setSelectedGrimoireForPDF] = useState<number | null>(null);

  const colorOptions = [
    { key: 'purple', name: 'Roxo Místico', color: '#6a0dad', description: 'Porta Umbrae - Abissal' },
    { key: 'navy', name: 'Azul Marinho', color: '#003366', description: 'Arcana Noctis - Profundo' },
    { key: 'black', name: 'Preto Elegante', color: '#111111', description: 'Via Tenebris - Absoluto' },
    { key: 'crimson', name: 'Vermelho Escuro', color: '#8b0000', description: 'Atrium Ignis - Ritualístico' }
  ];

  // Função para download de PDF com cor selecionada
  const handleDownloadPDF = async (grimoireId: number, colorKey: string) => {
    try {
      const response = await fetch(`/api/admin/grimoires/${grimoireId}/pdf`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ color: colorKey })
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      
      const colorOption = colorOptions.find(c => c.key === colorKey);
      a.download = `grimorio_${grimoireId}_${colorKey}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "PDF gerado com sucesso",
        description: `Download iniciado com tema ${colorOption?.name}`,
      });
      
      setPdfColorDialogOpen(false);
      setSelectedGrimoireForPDF(null);
    } catch (error) {
      console.error('Erro ao baixar PDF:', error);
      toast({
        title: "Erro",
        description: "Não foi possível gerar o PDF.",
        variant: "destructive",
      });
    }
  };

  const openPDFColorDialog = (grimoireId: number) => {
    setSelectedGrimoireForPDF(grimoireId);
    setPdfColorDialogOpen(true);
  };

  // Queries
  const { data: sections = [], isLoading: sectionsLoading } = useQuery({
    queryKey: ["/api/library/sections"],
  });

  const { data: grimoires = [], isLoading: grimoiresLoading } = useQuery({
    queryKey: ["/api/grimoires"],
  });

  // Mutations
  const createGrimoireMutation = useMutation({
    mutationFn: async (data: CreateGrimoireRequest) => {
      const response = await apiRequest("/api/admin/grimoires", {
        method: "POST",
        body: data,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/grimoires"] });
      toast({
        title: "Sucesso",
        description: "Grimório criado com sucesso!",
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

  const generateAIMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await apiRequest("/api/admin/ai/generate", {
        method: "POST",
        body: { prompt },
      });
      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "IA Gerada",
        description: "Conteúdo gerado com sucesso pela IA!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao gerar conteúdo com IA",
        variant: "destructive",
      });
    },
  });

  const togglePublished = (grimoire: Grimoire) => {
    // Implementar toggle de publicação
  };

  if (sectionsLoading || grimoiresLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-golden-amber">Biblioteca</h2>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Criar Grimório</TabsTrigger>
          <TabsTrigger value="manage">Gerenciar Grimórios</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <CreateGrimoireForm
            mode={mode}
            onModeChange={setMode}
            sections={sections}
            onSubmit={(data) => createGrimoireMutation.mutate(data)}
            isLoading={createGrimoireMutation.isPending}
            onAIGenerate={(prompt) => generateAIMutation.mutate(prompt)}
            isAIGenerating={generateAIMutation.isPending}
          />
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grimoires.map((grimoire: Grimoire) => (
              <Card key={grimoire.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm truncate">{grimoire.title}</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedGrimoire(grimoire)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => togglePublished(grimoire)}
                      >
                        {grimoire.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{grimoire.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant={grimoire.is_published ? "default" : "secondary"}>
                      {grimoire.is_published ? "Publicado" : "Rascunho"}
                    </Badge>
                    <Badge variant="outline">{grimoire.level}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedGrimoire && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Visualizar Grimório</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleDownloadPDF(selectedGrimoire.id)}
                className="text-amber-500 border-amber-500 hover:bg-amber-500/10"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={() => setSelectedGrimoire(null)}>
                Fechar
              </Button>
            </div>
          </div>
          <GrimoireViewer grimoire={selectedGrimoire} />
        </div>
      )}
    </div>
  );
}