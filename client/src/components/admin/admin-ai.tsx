import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Bot, 
  Wand2, 
  BookOpen,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  FileText,
  Settings
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface GenerationRequest {
  title: string;
  summary: string;
  category: string;
  difficultyLevel: number;
  chapterCount: number;
  style: string;
}

interface GenerationStatus {
  isGenerating: boolean;
  progress: number;
  currentStep: string;
  result?: any;
  error?: string;
}

export default function AdminAI() {
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>({
    isGenerating: false,
    progress: 0,
    currentStep: ''
  });
  const [lastGenerated, setLastGenerated] = useState<any>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Generate grimoire mutation
  const generateGrimoireMutation = useMutation({
    mutationFn: async (requestData: GenerationRequest) => {
      setGenerationStatus({
        isGenerating: true,
        progress: 10,
        currentStep: 'Inicializando geração com IA...'
      });

      const response = await apiRequest('/api/admin/ai/generate-grimoire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      // Simulate progress updates
      const updateProgress = (progress: number, step: string) => {
        setGenerationStatus(prev => ({ ...prev, progress, currentStep: step }));
      };

      setTimeout(() => updateProgress(25, 'Analisando requisitos...'), 500);
      setTimeout(() => updateProgress(40, 'Gerando estrutura dos capítulos...'), 1500);
      setTimeout(() => updateProgress(60, 'Criando conteúdo detalhado...'), 3000);
      setTimeout(() => updateProgress(80, 'Aplicando estilo e formatação...'), 4500);
      setTimeout(() => updateProgress(95, 'Finalizando grimório...'), 6000);

      return response.json();
    },
    onSuccess: (result) => {
      setGenerationStatus({
        isGenerating: false,
        progress: 100,
        currentStep: 'Grimório gerado com sucesso!',
        result
      });
      setLastGenerated(result);
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires'] });
      toast({
        title: "Grimório gerado com sucesso",
        description: "O novo grimório foi criado automaticamente pela IA."
      });
    },
    onError: (error: any) => {
      setGenerationStatus({
        isGenerating: false,
        progress: 0,
        currentStep: '',
        error: error.message
      });
      toast({
        title: "Erro na geração",
        description: error.message || "Falha ao gerar o grimório.",
        variant: "destructive"
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

  const styles = [
    { value: 'formal', label: 'Formal Acadêmico' },
    { value: 'mystical', label: 'Místico Esotérico' },
    { value: 'practical', label: 'Prático Didático' },
    { value: 'philosophical', label: 'Filosófico Reflexivo' },
    { value: 'ancient', label: 'Arcaico Tradicional' }
  ];

  const handleGenerateGrimoire = (formData: FormData) => {
    const requestData: GenerationRequest = {
      title: formData.get('title') as string,
      summary: formData.get('summary') as string,
      category: formData.get('category') as string,
      difficultyLevel: parseInt(formData.get('difficultyLevel') as string),
      chapterCount: parseInt(formData.get('chapterCount') as string),
      style: formData.get('style') as string
    };

    generateGrimoireMutation.mutate(requestData);
  };

  return (
    <div className="space-y-6">
      {/* AI Generation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Geração Automática de Grimórios
          </CardTitle>
          <CardDescription>
            Use IA para criar grimórios completos fornecendo apenas título e resumo
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form action={handleGenerateGrimoire} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Grimório</Label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="Ex: Os Fundamentos da Magia Cerimonial"
                  required 
                />
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
              <Label htmlFor="summary">Resumo do Conteúdo</Label>
              <Textarea 
                id="summary" 
                name="summary" 
                placeholder="Descreva o que você quer que o grimório contenha, os tópicos principais, abordagem, etc..."
                rows={4}
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="chapterCount">Número de Capítulos</Label>
                <Select name="chapterCount" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Capítulos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8">8 capítulos</SelectItem>
                    <SelectItem value="10">10 capítulos</SelectItem>
                    <SelectItem value="12">12 capítulos</SelectItem>
                    <SelectItem value="15">15 capítulos</SelectItem>
                    <SelectItem value="20">20 capítulos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Estilo de Escrita</Label>
                <Select name="style" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-golden-amber hover:bg-golden-amber/90 text-background"
              disabled={generationStatus.isGenerating}
            >
              {generationStatus.isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Gerar Grimório com IA
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Generation Progress */}
      {generationStatus.isGenerating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-golden-amber" />
              Progresso da Geração
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{generationStatus.currentStep}</span>
                <span>{generationStatus.progress}%</span>
              </div>
              <Progress value={generationStatus.progress} className="w-full" />
            </div>
            <div className="text-sm text-muted-foreground">
              A IA está processando sua solicitação. Isso pode levar alguns minutos...
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generation Result */}
      {lastGenerated && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Grimório Gerado com Sucesso
            </CardTitle>
            <CardDescription>
              O grimório foi criado e adicionado à biblioteca
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/30">
              <h4 className="font-semibold text-golden-amber mb-2">{lastGenerated.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{lastGenerated.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{lastGenerated.category}</Badge>
                <Badge variant="outline">Nível {lastGenerated.difficultyLevel}</Badge>
                <Badge variant="outline">{lastGenerated.chapterCount} capítulos</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <BookOpen className="w-4 h-4 mr-2" />
                Visualizar Grimório
              </Button>
              <Button variant="outline" className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                Editar Conteúdo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {generationStatus.error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Erro na Geração
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{generationStatus.error}</p>
          </CardContent>
        </Card>
      )}

      {/* AI Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações da IA
          </CardTitle>
          <CardDescription>
            Ajuste os parâmetros de geração automática
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Criatividade da IA</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">Conservadora</span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div className="bg-golden-amber h-2 rounded-full w-3/4"></div>
                </div>
                <span className="text-sm">Criativa</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Profundidade do Conteúdo</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">Básico</span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div className="bg-golden-amber h-2 rounded-full w-4/5"></div>
                </div>
                <span className="text-sm">Detalhado</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium">Geração Automática de Capas</div>
              <div className="text-sm text-muted-foreground">
                Criar capas visuais automaticamente para novos grimórios
              </div>
            </div>
            <Button variant="outline" size="sm">
              Ativar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}