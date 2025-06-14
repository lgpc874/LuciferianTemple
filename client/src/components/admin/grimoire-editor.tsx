import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  BookOpen, 
  Plus, 
  Save, 
  Bot, 
  Edit3, 
  Image,
  Link,
  Sparkles,
  Wand2,
  FileText,
  Settings
} from 'lucide-react';

interface Chapter {
  id?: number;
  title: string;
  content: string;
  chapterOrder: number;
  estimatedReadingTime: number;
  unlockCriteria: string;
}

interface Grimoire {
  id?: number;
  title: string;
  description: string;
  category: string;
  difficultyLevel: number;
  coverImageUrl?: string;
  price?: string | null;
  isPaid?: boolean;
  chapters?: Chapter[];
}

interface GrimoireEditorProps {
  grimoireId?: number;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function GrimoireEditor({ grimoireId, onSave, onCancel }: GrimoireEditorProps) {
  const [grimoire, setGrimoire] = useState<Grimoire>({
    title: '',
    description: '',
    category: '',
    difficultyLevel: 1,
    coverImageUrl: '',
    price: null,
    isPaid: false,
    chapters: []
  });
  
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeTab, setActiveTab] = useState('details');
  const [useAI, setUseAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [coverOption, setCoverOption] = useState<'ai' | 'url' | 'none'>('ai');
  const [coverUrl, setCoverUrl] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch existing grimoire if editing
  const { data: existingGrimoire } = useQuery({
    queryKey: [`/api/grimoires/${grimoireId}`],
    enabled: !!grimoireId
  });

  const { data: existingChapters } = useQuery({
    queryKey: [`/api/grimoires/${grimoireId}/chapters`],
    enabled: !!grimoireId
  });

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['/api/admin/categories'],
    queryFn: async () => {
      const response = await apiRequest('/api/admin/categories');
      return response.json();
    }
  });

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (existingGrimoire) {
      setGrimoire(existingGrimoire);
      setCoverUrl(existingGrimoire.coverImageUrl || '');
      if (existingGrimoire.coverImageUrl) {
        setCoverOption('url');
      }
    }
  }, [existingGrimoire]);

  useEffect(() => {
    if (existingChapters) {
      setChapters(existingChapters.sort((a: Chapter, b: Chapter) => a.chapterOrder - b.chapterOrder));
    }
  }, [existingChapters]);

  // Save grimoire mutation
  const saveGrimoireMutation = useMutation({
    mutationFn: async (grimoireData: Grimoire) => {
      const url = grimoireId ? `/api/admin/grimoires/${grimoireId}` : '/api/admin/grimoires';
      const method = grimoireId ? 'PATCH' : 'POST';
      
      const response = await apiRequest(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(grimoireData)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/grimoires'] });
      toast({
        title: grimoireId ? "Grimório atualizado" : "Grimório criado",
        description: "Alterações salvas com sucesso."
      });
      onSave?.();
    }
  });

  // AI generation mutation
  const generateWithAIMutation = useMutation({
    mutationFn: async ({ prompt, type }: { prompt: string; type: 'full' | 'chapter' | 'content' }) => {
      const response = await apiRequest('/api/admin/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type, grimoire })
      });
      return response.json();
    },
    onSuccess: (result) => {
      if (result.type === 'full') {
        setGrimoire(prev => ({ ...prev, ...result.grimoire }));
        setChapters(result.chapters || []);
      } else if (result.type === 'chapter') {
        setChapters(prev => [...prev, result.chapter]);
      }
      
      toast({
        title: "Conteúdo gerado com IA",
        description: "O conteúdo foi criado com sucesso."
      });
    }
  });

  // Add new category
  const addCategoryMutation = useMutation({
    mutationFn: async (categoryName: string) => {
      const response = await apiRequest('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/categories'] });
      setCategories(prev => [...prev, newCategory]);
      setGrimoire(prev => ({ ...prev, category: newCategory }));
      setNewCategory('');
      toast({
        title: "Categoria criada",
        description: "Nova categoria adicionada com sucesso."
      });
    }
  });

  const handleSaveGrimoire = () => {
    const finalCoverUrl = coverOption === 'url' ? coverUrl : 
                         coverOption === 'ai' ? `https://via.placeholder.com/300x400/1a1a1a/d4af37?text=${encodeURIComponent(grimoire.title)}` : '';
    
    const grimoireData = {
      ...grimoire,
      coverImageUrl: finalCoverUrl,
      chapters
    };

    saveGrimoireMutation.mutate(grimoireData);
  };

  const handleGenerateWithAI = () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Prompt necessário",
        description: "Digite uma descrição para gerar conteúdo com IA.",
        variant: "destructive"
      });
      return;
    }

    generateWithAIMutation.mutate({ 
      prompt: aiPrompt, 
      type: 'full' 
    });
  };

  const addNewChapter = () => {
    const newChapter: Chapter = {
      title: `Capítulo ${chapters.length + 1}`,
      content: '<p>Conteúdo do capítulo...</p>',
      chapterOrder: chapters.length + 1,
      estimatedReadingTime: 15,
      unlockCriteria: chapters.length === 0 ? 'always' : 'previous_chapter'
    };
    
    setChapters(prev => [...prev, newChapter]);
  };

  const updateChapter = (index: number, field: keyof Chapter, value: string | number) => {
    setChapters(prev => prev.map((chapter, i) => 
      i === index ? { ...chapter, [field]: value } : chapter
    ));
  };

  const removeChapter = (index: number) => {
    setChapters(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            {grimoireId ? 'Editar Grimório' : 'Criar Novo Grimório'}
          </CardTitle>
          <CardDescription>
            Editor completo com opções de geração por IA e criação manual
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="ai">IA Generator</TabsTrigger>
              <TabsTrigger value="chapters">Capítulos</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            {/* Detalhes básicos */}
            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Grimório</Label>
                    <Input
                      id="title"
                      value={grimoire.title}
                      onChange={(e) => setGrimoire(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Digite o título..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={grimoire.description}
                      onChange={(e) => setGrimoire(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Descreva o conteúdo e propósito do grimório..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <div className="flex gap-2">
                      <Select 
                        value={grimoire.category} 
                        onValueChange={(value) => setGrimoire(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger className="flex-1">
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
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Nova Categoria</DialogTitle>
                            <DialogDescription>
                              Crie uma nova categoria para organizar seus grimórios
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              placeholder="Nome da categoria..."
                            />
                            <Button 
                              onClick={() => addCategoryMutation.mutate(newCategory)}
                              disabled={!newCategory.trim() || addCategoryMutation.isPending}
                              className="w-full"
                            >
                              {addCategoryMutation.isPending ? 'Criando...' : 'Criar Categoria'}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Nível de Dificuldade</Label>
                    <Select 
                      value={grimoire.difficultyLevel.toString()} 
                      onValueChange={(value) => setGrimoire(prev => ({ ...prev, difficultyLevel: parseInt(value) }))}
                    >
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
                </div>

                {/* Opções de capa */}
                <div className="space-y-4">
                  <Label>Capa do Grimório</Label>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="cover-ai"
                        name="cover"
                        checked={coverOption === 'ai'}
                        onChange={() => setCoverOption('ai')}
                      />
                      <Label htmlFor="cover-ai" className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Gerar com IA
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="cover-url"
                        name="cover"
                        checked={coverOption === 'url'}
                        onChange={() => setCoverOption('url')}
                      />
                      <Label htmlFor="cover-url" className="flex items-center gap-2">
                        <Link className="w-4 h-4" />
                        URL personalizada
                      </Label>
                    </div>

                    {coverOption === 'url' && (
                      <Input
                        value={coverUrl}
                        onChange={(e) => setCoverUrl(e.target.value)}
                        placeholder="https://exemplo.com/capa.jpg"
                      />
                    )}

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="cover-none"
                        name="cover"
                        checked={coverOption === 'none'}
                        onChange={() => setCoverOption('none')}
                      />
                      <Label htmlFor="cover-none">Sem capa</Label>
                    </div>
                  </div>

                  {/* Preview da capa */}
                  {(coverOption === 'ai' || (coverOption === 'url' && coverUrl)) && (
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                      <img
                        src={coverOption === 'ai' 
                          ? `https://via.placeholder.com/300x400/1a1a1a/d4af37?text=${encodeURIComponent(grimoire.title || 'Título')}`
                          : coverUrl
                        }
                        alt="Preview da capa"
                        className="w-24 h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* IA Generator */}
            <TabsContent value="ai" className="space-y-6">
              <div className="border rounded-lg p-6 bg-gradient-to-br from-golden-amber/5 to-transparent">
                <div className="flex items-center gap-3 mb-4">
                  <Bot className="w-6 h-6 text-golden-amber" />
                  <h3 className="text-lg font-semibold text-golden-amber">Geração Inteligente</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-prompt">Descrição para IA</Label>
                    <Textarea
                      id="ai-prompt"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Descreva detalhadamente o que você quer que a IA crie. Exemplo: 'Crie um grimório sobre magia lunar com 5 capítulos, focando em rituais práticos e simbolismo noturno...'"
                      rows={6}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleGenerateWithAI}
                    disabled={generateWithAIMutation.isPending || !aiPrompt.trim()}
                    className="w-full bg-golden-amber hover:bg-golden-amber/90 text-background"
                  >
                    {generateWithAIMutation.isPending ? (
                      <>
                        <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                        Gerando conteúdo...
                      </>
                    ) : (
                      <>
                        <Bot className="w-4 h-4 mr-2" />
                        Gerar Grimório Completo com IA
                      </>
                    )}
                  </Button>
                </div>

                {generateWithAIMutation.isPending && (
                  <div className="mt-4 p-4 bg-card rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-golden-amber"></div>
                      <span>A IA está criando seu grimório...</span>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Editor de Capítulos */}
            <TabsContent value="chapters" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Capítulos ({chapters.length})</h3>
                <Button onClick={addNewChapter} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Capítulo
                </Button>
              </div>

              <div className="space-y-4">
                {chapters.map((chapter, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">
                          Capítulo {chapter.chapterOrder}
                        </CardTitle>
                        <Button 
                          onClick={() => removeChapter(index)}
                          variant="ghost" 
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          Remover
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        value={chapter.title}
                        onChange={(e) => updateChapter(index, 'title', e.target.value)}
                        placeholder="Título do capítulo"
                      />
                      
                      <Textarea
                        value={chapter.content}
                        onChange={(e) => updateChapter(index, 'content', e.target.value)}
                        placeholder="Conteúdo do capítulo (HTML permitido)"
                        rows={8}
                        className="font-mono text-sm"
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Tempo de leitura (min)</Label>
                          <Input
                            type="number"
                            value={chapter.estimatedReadingTime}
                            onChange={(e) => updateChapter(index, 'estimatedReadingTime', parseInt(e.target.value) || 0)}
                            min="1"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Critério de desbloqueio</Label>
                          <Select 
                            value={chapter.unlockCriteria} 
                            onValueChange={(value) => updateChapter(index, 'unlockCriteria', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="always">Sempre disponível</SelectItem>
                              <SelectItem value="previous_chapter">Capítulo anterior</SelectItem>
                              <SelectItem value="manual">Desbloqueio manual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Configurações */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configurações Avançadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-base">Publicar automaticamente</div>
                      <div className="text-sm text-muted-foreground">
                        Grimório ficará disponível na biblioteca imediatamente
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-base">Permitir comentários</div>
                      <div className="text-sm text-muted-foreground">
                        Usuários podem deixar comentários nos capítulos
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-base">Rastreamento de progresso</div>
                      <div className="text-sm text-muted-foreground">
                        Acompanhar progresso de leitura dos usuários
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Ações finais */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            {onCancel && (
              <Button variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            
            <Button 
              onClick={handleSaveGrimoire}
              disabled={saveGrimoireMutation.isPending || !grimoire.title.trim()}
              className="bg-golden-amber hover:bg-golden-amber/90 text-background"
            >
              {saveGrimoireMutation.isPending ? (
                <>
                  <Save className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {grimoireId ? 'Salvar Alterações' : 'Criar Grimório'}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}