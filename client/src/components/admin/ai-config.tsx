import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  Bot, 
  Brain, 
  MessageSquare, 
  Settings, 
  BookOpen, 
  Star, 
  Users, 
  Shield,
  Flame,
  Moon,
  Eye,
  Scroll
} from 'lucide-react';

interface AIConfig {
  id?: string;
  // Personalidade
  personality: {
    name: string;
    tone: string;
    formality: string;
    empathy: number;
    wisdom: number;
    mysticism: number;
  };
  
  // Comportamento
  behavior: {
    greetingStyle: string;
    responseLength: string;
    useSymbols: boolean;
    useLatinPhrases: boolean;
    teachingApproach: string;
  };
  
  // Religião e Filosofia
  philosophy: {
    tradition: string;
    coreBeliefs: string[];
    practices: string[];
    taboos: string[];
    ethicalGuidelines: string;
  };
  
  // Conteúdo
  content: {
    topics: string[];
    difficultyProgression: string;
    contentStyle: string;
    languageComplexity: string;
    culturalContext: string;
  };
  
  // Interação
  interaction: {
    maxResponseTime: number;
    personalizedResponses: boolean;
    rememberUserProgress: boolean;
    adaptToUserLevel: boolean;
    encouragementStyle: string;
  };
}

const defaultConfig: AIConfig = {
  personality: {
    name: "Mestre Abyssal",
    tone: "sábio e misterioso",
    formality: "formal ancestral",
    empathy: 7,
    wisdom: 9,
    mysticism: 8
  },
  behavior: {
    greetingStyle: "formal com símbolos místicos",
    responseLength: "detalhado",
    useSymbols: true,
    useLatinPhrases: true,
    teachingApproach: "progressivo e cuidadoso"
  },
  philosophy: {
    tradition: "Luciferianismo Filosófico",
    coreBeliefs: [
      "Busca pelo conhecimento proibido",
      "Autodeterminação e livre arbítrio",
      "Questionamento de dogmas estabelecidos",
      "Desenvolvimento espiritual autônomo"
    ],
    practices: [
      "Meditação contemplativa",
      "Estudo de textos antigos",
      "Autoanálise profunda",
      "Práticas de gnose"
    ],
    taboos: [
      "Evangelização forçada",
      "Desrespeito a outras crenças",
      "Práticas perigosas sem orientação",
      "Informações que possam causar dano"
    ],
    ethicalGuidelines: "Sempre orientar com responsabilidade, respeitando o livre arbítrio e promovendo crescimento espiritual saudável."
  },
  content: {
    topics: [
      "Filosofia Luciferiana",
      "História do Ocultismo",
      "Simbolismo Esotérico",
      "Práticas Meditativas",
      "Textos Gnósticos"
    ],
    difficultyProgression: "iniciante → intermediário → avançado → mestre",
    contentStyle: "acadêmico com toque místico",
    languageComplexity: "português erudito com termos técnicos explicados",
    culturalContext: "tradição ocidental com influências orientais"
  },
  interaction: {
    maxResponseTime: 30,
    personalizedResponses: true,
    rememberUserProgress: true,
    adaptToUserLevel: true,
    encouragementStyle: "motivacional com sabedoria ancestral"
  }
};

export default function AIConfig() {
  const [config, setConfig] = useState<AIConfig>(defaultConfig);
  const [isModified, setIsModified] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch current AI config
  const { data: currentConfig, isLoading } = useQuery({
    queryKey: ['/api/admin/ai-config'],
    onSuccess: (data) => {
      if (data) {
        setConfig(data);
      }
    }
  });

  // Save AI config mutation
  const saveConfigMutation = useMutation({
    mutationFn: async (newConfig: AIConfig) => {
      return apiRequest('/api/admin/ai-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/ai-config'] });
      setIsModified(false);
      toast({
        title: "✨ Configuração Salva",
        description: "As configurações da IA foram atualizadas com sucesso."
      });
    },
    onError: (error: any) => {
      toast({
        title: "❌ Erro ao Salvar",
        description: error.message || "Falha ao salvar configurações da IA.",
        variant: "destructive"
      });
    }
  });

  const updateConfig = (section: keyof AIConfig, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setIsModified(true);
  };

  const updateArrayField = (section: keyof AIConfig, field: string, index: number, value: string) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: (prev[section] as any)[field].map((item: string, i: number) => 
          i === index ? value : item
        )
      }
    }));
    setIsModified(true);
  };

  const addArrayItem = (section: keyof AIConfig, field: string, defaultValue: string = "") => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...(prev[section] as any)[field], defaultValue]
      }
    }));
    setIsModified(true);
  };

  const removeArrayItem = (section: keyof AIConfig, field: string, index: number) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: (prev[section] as any)[field].filter((_: any, i: number) => i !== index)
      }
    }));
    setIsModified(true);
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
            <Bot className="inline w-6 h-6 mr-2" />
            Configuração da IA
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure a personalidade, comportamento e diretrizes da IA do sistema
          </p>
        </div>
        
        <Button 
          onClick={() => saveConfigMutation.mutate(config)}
          disabled={!isModified || saveConfigMutation.isPending}
          className="bg-golden-amber text-black hover:bg-golden-amber/90"
        >
          {saveConfigMutation.isPending ? "Salvando..." : "Salvar Configuração"}
        </Button>
      </div>

      {isModified && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
          <p className="text-sm text-amber-300">
            ⚠️ Você tem alterações não salvas. Clique em "Salvar Configuração" para aplicar.
          </p>
        </div>
      )}

      <Tabs defaultValue="personality" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personality" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Personalidade
          </TabsTrigger>
          <TabsTrigger value="behavior" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Comportamento
          </TabsTrigger>
          <TabsTrigger value="philosophy" className="flex items-center gap-2">
            <Flame className="w-4 h-4" />
            Filosofia
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Conteúdo
          </TabsTrigger>
          <TabsTrigger value="interaction" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Interação
          </TabsTrigger>
        </TabsList>

        {/* Personalidade */}
        <TabsContent value="personality">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-golden-amber">
                <Brain className="w-5 h-5" />
                Personalidade da IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ai-name">Nome da IA</Label>
                  <Input
                    id="ai-name"
                    value={config.personality.name}
                    onChange={(e) => updateConfig('personality', 'name', e.target.value)}
                    placeholder="Ex: Mestre Abyssal"
                  />
                </div>
                <div>
                  <Label htmlFor="ai-tone">Tom de Voz</Label>
                  <Select 
                    value={config.personality.tone}
                    onValueChange={(value) => updateConfig('personality', 'tone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sábio e misterioso">Sábio e Misterioso</SelectItem>
                      <SelectItem value="professor erudito">Professor Erudito</SelectItem>
                      <SelectItem value="mentor espiritual">Mentor Espiritual</SelectItem>
                      <SelectItem value="guia ancestral">Guia Ancestral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="formality">Nível de Formalidade</Label>
                <Select 
                  value={config.personality.formality}
                  onValueChange={(value) => updateConfig('personality', 'formality', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual moderno">Casual Moderno</SelectItem>
                    <SelectItem value="formal educado">Formal Educado</SelectItem>
                    <SelectItem value="formal ancestral">Formal Ancestral</SelectItem>
                    <SelectItem value="arcaico ritualístico">Arcaico Ritualístico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-golden-amber">Características (1-10)</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Empatia: {config.personality.empathy}</Label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={config.personality.empathy}
                      onChange={(e) => updateConfig('personality', 'empathy', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label>Sabedoria: {config.personality.wisdom}</Label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={config.personality.wisdom}
                      onChange={(e) => updateConfig('personality', 'wisdom', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label>Misticismo: {config.personality.mysticism}</Label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={config.personality.mysticism}
                      onChange={(e) => updateConfig('personality', 'mysticism', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comportamento */}
        <TabsContent value="behavior">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-golden-amber">
                <MessageSquare className="w-5 h-5" />
                Comportamento e Comunicação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Estilo de Saudação</Label>
                  <Select 
                    value={config.behavior.greetingStyle}
                    onValueChange={(value) => updateConfig('behavior', 'greetingStyle', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simples e direto">Simples e Direto</SelectItem>
                      <SelectItem value="formal com símbolos místicos">Formal com Símbolos</SelectItem>
                      <SelectItem value="ritualístico elaborado">Ritualístico Elaborado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tamanho das Respostas</Label>
                  <Select 
                    value={config.behavior.responseLength}
                    onValueChange={(value) => updateConfig('behavior', 'responseLength', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conciso">Conciso</SelectItem>
                      <SelectItem value="detalhado">Detalhado</SelectItem>
                      <SelectItem value="extenso">Extenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Usar Símbolos Místicos (⸸ ☽ ✦)</Label>
                  <Switch
                    checked={config.behavior.useSymbols}
                    onCheckedChange={(value) => updateConfig('behavior', 'useSymbols', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Usar Frases em Latim</Label>
                  <Switch
                    checked={config.behavior.useLatinPhrases}
                    onCheckedChange={(value) => updateConfig('behavior', 'useLatinPhrases', value)}
                  />
                </div>
              </div>

              <div>
                <Label>Abordagem de Ensino</Label>
                <Select 
                  value={config.behavior.teachingApproach}
                  onValueChange={(value) => updateConfig('behavior', 'teachingApproach', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direto e objetivo">Direto e Objetivo</SelectItem>
                    <SelectItem value="progressivo e cuidadoso">Progressivo e Cuidadoso</SelectItem>
                    <SelectItem value="socrático questionador">Socrático Questionador</SelectItem>
                    <SelectItem value="metafórico e simbólico">Metafórico e Simbólico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Filosofia */}
        <TabsContent value="philosophy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-golden-amber">
                <Flame className="w-5 h-5" />
                Filosofia e Tradição
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Tradição Principal</Label>
                <Input
                  value={config.philosophy.tradition}
                  onChange={(e) => updateConfig('philosophy', 'tradition', e.target.value)}
                  placeholder="Ex: Luciferianismo Filosófico"
                />
              </div>

              <div>
                <Label>Diretrizes Éticas</Label>
                <Textarea
                  value={config.philosophy.ethicalGuidelines}
                  onChange={(e) => updateConfig('philosophy', 'ethicalGuidelines', e.target.value)}
                  placeholder="Descreva as diretrizes éticas que a IA deve seguir..."
                  rows={3}
                />
              </div>

              <div>
                <Label className="flex items-center justify-between">
                  Crenças Fundamentais
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => addArrayItem('philosophy', 'coreBeliefs', 'Nova crença')}
                  >
                    Adicionar
                  </Button>
                </Label>
                <div className="space-y-2">
                  {config.philosophy.coreBeliefs.map((belief, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={belief}
                        onChange={(e) => updateArrayField('philosophy', 'coreBeliefs', index, e.target.value)}
                        placeholder="Descreva uma crença fundamental..."
                      />
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => removeArrayItem('philosophy', 'coreBeliefs', index)}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="flex items-center justify-between">
                  Práticas Recomendadas
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => addArrayItem('philosophy', 'practices', 'Nova prática')}
                  >
                    Adicionar
                  </Button>
                </Label>
                <div className="space-y-2">
                  {config.philosophy.practices.map((practice, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={practice}
                        onChange={(e) => updateArrayField('philosophy', 'practices', index, e.target.value)}
                        placeholder="Descreva uma prática..."
                      />
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => removeArrayItem('philosophy', 'practices', index)}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="flex items-center justify-between">
                  Tabus e Restrições
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => addArrayItem('philosophy', 'taboos', 'Novo tabu')}
                  >
                    Adicionar
                  </Button>
                </Label>
                <div className="space-y-2">
                  {config.philosophy.taboos.map((taboo, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={taboo}
                        onChange={(e) => updateArrayField('philosophy', 'taboos', index, e.target.value)}
                        placeholder="Descreva algo que a IA deve evitar..."
                      />
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => removeArrayItem('philosophy', 'taboos', index)}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conteúdo */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-golden-amber">
                <BookOpen className="w-5 h-5" />
                Diretrizes de Conteúdo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="flex items-center justify-between">
                  Tópicos Principais
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => addArrayItem('content', 'topics', 'Novo tópico')}
                  >
                    Adicionar
                  </Button>
                </Label>
                <div className="space-y-2">
                  {config.content.topics.map((topic, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={topic}
                        onChange={(e) => updateArrayField('content', 'topics', index, e.target.value)}
                        placeholder="Ex: Filosofia Luciferiana"
                      />
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => removeArrayItem('content', 'topics', index)}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Progressão de Dificuldade</Label>
                  <Input
                    value={config.content.difficultyProgression}
                    onChange={(e) => updateConfig('content', 'difficultyProgression', e.target.value)}
                    placeholder="Ex: iniciante → intermediário → avançado"
                  />
                </div>
                <div>
                  <Label>Estilo de Conteúdo</Label>
                  <Select 
                    value={config.content.contentStyle}
                    onValueChange={(value) => updateConfig('content', 'contentStyle', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acadêmico formal">Acadêmico Formal</SelectItem>
                      <SelectItem value="acadêmico com toque místico">Acadêmico com Toque Místico</SelectItem>
                      <SelectItem value="narrativo envolvente">Narrativo Envolvente</SelectItem>
                      <SelectItem value="poético e simbólico">Poético e Simbólico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Complexidade da Linguagem</Label>
                  <Select 
                    value={config.content.languageComplexity}
                    onValueChange={(value) => updateConfig('content', 'languageComplexity', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simples e acessível">Simples e Acessível</SelectItem>
                      <SelectItem value="português erudito com termos técnicos explicados">Português Erudito com Explicações</SelectItem>
                      <SelectItem value="arcaico e rebuscado">Arcaico e Rebuscado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Contexto Cultural</Label>
                  <Input
                    value={config.content.culturalContext}
                    onChange={(e) => updateConfig('content', 'culturalContext', e.target.value)}
                    placeholder="Ex: tradição ocidental com influências orientais"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interação */}
        <TabsContent value="interaction">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-golden-amber">
                <Users className="w-5 h-5" />
                Configurações de Interação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tempo Máximo de Resposta (segundos)</Label>
                  <Input
                    type="number"
                    value={config.interaction.maxResponseTime}
                    onChange={(e) => updateConfig('interaction', 'maxResponseTime', parseInt(e.target.value))}
                    min="5"
                    max="60"
                  />
                </div>
                <div>
                  <Label>Estilo de Encorajamento</Label>
                  <Select 
                    value={config.interaction.encouragementStyle}
                    onValueChange={(value) => updateConfig('interaction', 'encouragementStyle', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motivacional direto">Motivacional Direto</SelectItem>
                      <SelectItem value="motivacional com sabedoria ancestral">Com Sabedoria Ancestral</SelectItem>
                      <SelectItem value="desafiador e provocativo">Desafiador e Provocativo</SelectItem>
                      <SelectItem value="paternal e protetor">Paternal e Protetor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-golden-amber">Funcionalidades Avançadas</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Respostas Personalizadas</Label>
                      <p className="text-sm text-muted-foreground">IA adapta respostas baseada no histórico do usuário</p>
                    </div>
                    <Switch
                      checked={config.interaction.personalizedResponses}
                      onCheckedChange={(value) => updateConfig('interaction', 'personalizedResponses', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Lembrar Progresso do Usuário</Label>
                      <p className="text-sm text-muted-foreground">IA acompanha onde cada usuário parou</p>
                    </div>
                    <Switch
                      checked={config.interaction.rememberUserProgress}
                      onCheckedChange={(value) => updateConfig('interaction', 'rememberUserProgress', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Adaptar ao Nível do Usuário</Label>
                      <p className="text-sm text-muted-foreground">IA ajusta complexidade baseada no nível detectado</p>
                    </div>
                    <Switch
                      checked={config.interaction.adaptToUserLevel}
                      onCheckedChange={(value) => updateConfig('interaction', 'adaptToUserLevel', value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}