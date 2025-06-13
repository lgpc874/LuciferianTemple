import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings, 
  Shield, 
  Database,
  Bell,
  Mail,
  Save,
  RotateCcw
} from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Templo do Abismo',
    siteDescription: 'Portal de ensinamentos luciferianos e conhecimento esotérico',
    enableRegistration: true,
    enableContentProtection: true,
    enableScreenshotProtection: true,
    maintenanceMode: false,
    emailNotifications: true,
    autoBackup: true,
    sessionTimeout: 30
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
  };

  const handleReset = () => {
    // Reset to defaults
    setSettings({
      siteName: 'Templo do Abismo',
      siteDescription: 'Portal de ensinamentos luciferianos e conhecimento esotérico',
      enableRegistration: true,
      enableContentProtection: true,
      enableScreenshotProtection: true,
      maintenanceMode: false,
      emailNotifications: true,
      autoBackup: true,
      sessionTimeout: 30
    });
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-golden-amber flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações Gerais
          </CardTitle>
          <CardDescription>
            Configurações básicas do site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Nome do Site</Label>
              <Input 
                id="site-name"
                value={settings.siteName}
                onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Timeout da Sessão (minutos)</Label>
              <Input 
                id="session-timeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="site-description">Descrição do Site</Label>
            <Textarea 
              id="site-description"
              value={settings.siteDescription}
              onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Configurações de Segurança
          </CardTitle>
          <CardDescription>
            Controle de acesso e proteção de conteúdo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-base">Permitir Registro de Usuários</div>
              <div className="text-sm text-muted-foreground">
                Usuários podem criar novas contas
              </div>
            </div>
            <Switch 
              checked={settings.enableRegistration}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableRegistration: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-base">Proteção Anti-Cópia</div>
              <div className="text-sm text-muted-foreground">
                Bloquear seleção e cópia de texto
              </div>
            </div>
            <Switch 
              checked={settings.enableContentProtection}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableContentProtection: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-base">Proteção contra Screenshot</div>
              <div className="text-sm text-muted-foreground">
                Proteção avançada nos grimórios
              </div>
            </div>
            <Switch 
              checked={settings.enableScreenshotProtection}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableScreenshotProtection: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-base">Modo Manutenção</div>
              <div className="text-sm text-muted-foreground">
                Desabilitar acesso temporariamente
              </div>
            </div>
            <Switch 
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, maintenanceMode: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Configurações do Sistema
          </CardTitle>
          <CardDescription>
            Backup, notificações e manutenção
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-base">Notificações por Email</div>
              <div className="text-sm text-muted-foreground">
                Receber alertas do sistema
              </div>
            </div>
            <Switch 
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-base">Backup Automático</div>
              <div className="text-sm text-muted-foreground">
                Backup diário dos dados
              </div>
            </div>
            <Switch 
              checked={settings.autoBackup}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoBackup: checked }))}
            />
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-3">Ações do Sistema</h4>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <Database className="w-4 h-4 mr-2" />
                Backup Manual
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Teste de Email
              </Button>
              <Button variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Limpar Cache
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button 
          onClick={handleSave}
          className="bg-golden-amber hover:bg-golden-amber/90 text-background"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Restaurar Padrões
        </Button>
      </div>
    </div>
  );
}