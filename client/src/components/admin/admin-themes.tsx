import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Save, 
  RotateCcw,
  Eye,
  Download,
  Upload,
  Check
} from 'lucide-react';

export default function AdminThemes() {
  const [activeTheme, setActiveTheme] = useState('default');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const colorVariables = [
    { name: 'golden-amber', label: 'Dourado Âmbar', value: 'hsl(45, 100%, 50%)' },
    { name: 'burned-amber', label: 'Âmbar Queimado', value: 'hsl(30, 80%, 35%)' },
    { name: 'ritualistic-beige', label: 'Bege Ritualístico', value: 'hsl(40, 15%, 85%)' },
    { name: 'dark-mystical', label: 'Místico Escuro', value: 'hsl(220, 15%, 8%)' },
    { name: 'shadow-purple', label: 'Roxo Sombrio', value: 'hsl(270, 30%, 15%)' },
    { name: 'blood-crimson', label: 'Carmesim Sangue', value: 'hsl(0, 70%, 40%)' }
  ];

  const presetThemes = [
    {
      id: 'default',
      name: 'Luciferiano Clássico',
      description: 'Tema padrão com tons dourados e místicos',
      colors: {
        'golden-amber': 'hsl(45, 100%, 50%)',
        'burned-amber': 'hsl(30, 80%, 35%)',
        'ritualistic-beige': 'hsl(40, 15%, 85%)',
        'dark-mystical': 'hsl(220, 15%, 8%)'
      }
    },
    {
      id: 'crimson',
      name: 'Carmesim Sombrio',
      description: 'Tema com tons vermelhos e sombrios',
      colors: {
        'golden-amber': 'hsl(0, 70%, 50%)',
        'burned-amber': 'hsl(15, 60%, 35%)',
        'ritualistic-beige': 'hsl(0, 10%, 85%)',
        'dark-mystical': 'hsl(0, 20%, 8%)'
      }
    },
    {
      id: 'purple',
      name: 'Púrpura Místico',
      description: 'Tema com tons roxos e violetas',
      colors: {
        'golden-amber': 'hsl(270, 60%, 60%)',
        'burned-amber': 'hsl(285, 40%, 35%)',
        'ritualistic-beige': 'hsl(270, 10%, 85%)',
        'dark-mystical': 'hsl(270, 25%, 8%)'
      }
    }
  ];

  const applyTheme = (themeId: string) => {
    const theme = presetThemes.find(t => t.id === themeId);
    if (theme) {
      const root = document.documentElement;
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
      setActiveTheme(themeId);
    }
  };

  const resetToDefault = () => {
    applyTheme('default');
  };

  const exportTheme = () => {
    const theme = presetThemes.find(t => t.id === activeTheme);
    if (theme) {
      const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `theme-${theme.id}.json`;
      a.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Theme Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-golden-amber flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Gerenciamento de Temas
              </CardTitle>
              <CardDescription>
                Personalize as cores e aparência do site
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={exportTheme}>
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Importar
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Preset Themes */}
          <div>
            <h4 className="font-medium mb-3">Temas Predefinidos</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {presetThemes.map((theme) => (
                <div 
                  key={theme.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    activeTheme === theme.id ? 'border-golden-amber bg-golden-amber/5' : 'hover:border-muted-foreground'
                  }`}
                  onClick={() => applyTheme(theme.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{theme.name}</h5>
                    {activeTheme === theme.id && (
                      <Badge className="bg-golden-amber text-background">
                        <Check className="w-3 h-3 mr-1" />
                        Ativo
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{theme.description}</p>
                  <div className="flex gap-1">
                    {Object.values(theme.colors).map((color, index) => (
                      <div 
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Color Editor */}
          <div>
            <h4 className="font-medium mb-3">Editor de Cores Personalizado</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {colorVariables.map((colorVar) => (
                <div key={colorVar.name} className="space-y-2">
                  <Label htmlFor={colorVar.name}>{colorVar.label}</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded border-2 border-muted flex-shrink-0"
                      style={{ backgroundColor: colorVar.value }}
                    />
                    <Input 
                      id={colorVar.name}
                      value={colorVar.value}
                      onChange={(e) => {
                        // Update color in real-time
                        document.documentElement.style.setProperty(`--${colorVar.name}`, e.target.value);
                      }}
                      placeholder="hsl(45, 100%, 50%)"
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button className="bg-golden-amber hover:bg-golden-amber/90 text-background">
              <Save className="w-4 h-4 mr-2" />
              Salvar Tema Personalizado
            </Button>
            <Button variant="outline" onClick={resetToDefault}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Resetar para Padrão
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? 'Sair do Preview' : 'Preview'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações Avançadas</CardTitle>
          <CardDescription>
            Opções adicionais de personalização
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="font-primary">Fonte Principal</Label>
                <Input id="font-primary" placeholder="EB Garamond" />
              </div>
              <div>
                <Label htmlFor="font-display">Fonte de Exibição</Label>
                <Input id="font-display" placeholder="Cinzel Decorative" />
              </div>
              <div>
                <Label htmlFor="border-radius">Raio das Bordas</Label>
                <Input id="border-radius" placeholder="0.5rem" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="animation-speed">Velocidade das Animações</Label>
                <Input id="animation-speed" placeholder="300ms" />
              </div>
              <div>
                <Label htmlFor="shadow-intensity">Intensidade das Sombras</Label>
                <Input id="shadow-intensity" placeholder="0.1" />
              </div>
              <div>
                <Label htmlFor="backdrop-blur">Desfoque do Fundo</Label>
                <Input id="backdrop-blur" placeholder="12px" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Preview */}
      {isPreviewMode && (
        <Card>
          <CardHeader>
            <CardTitle>Preview do Tema</CardTitle>
            <CardDescription>
              Visualização de como o tema aparece nos componentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 p-4 border rounded-lg bg-card">
              <div className="flex items-center gap-4">
                <Button className="bg-golden-amber hover:bg-golden-amber/90 text-background">
                  Botão Principal
                </Button>
                <Button variant="outline">
                  Botão Secundário
                </Button>
                <Badge className="bg-golden-amber text-background">Badge</Badge>
              </div>
              
              <div className="p-4 border rounded-lg bg-muted/30">
                <h4 className="font-cinzel text-golden-amber font-bold mb-2">
                  Título Místico
                </h4>
                <p className="text-ritualistic-beige">
                  Este é um exemplo de como o texto aparece com o tema atual aplicado.
                  A harmonia das cores deve criar uma atmosfera adequada para o Templo do Abismo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}