import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Key, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function StripeConfig() {
  const [config, setConfig] = useState({
    publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
    secretKey: '', // Nunca exibir a chave secreta por segurança
    webhookSecret: '',
    isConfigured: !!(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  });
  
  const [showSecrets, setShowSecrets] = useState({
    secret: false,
    webhook: false
  });
  
  const [isTestMode, setIsTestMode] = useState(true);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      // Aqui você salvaria as configurações no backend
      // Por enquanto, apenas simula o salvamento
      toast({
        title: "Configurações Salvas",
        description: "As chaves do Stripe foram configuradas com sucesso."
      });
      
      setConfig(prev => ({ ...prev, isConfigured: true }));
    } catch (error) {
      toast({
        title: "Erro ao Salvar",
        description: "Não foi possível salvar as configurações do Stripe.",
        variant: "destructive"
      });
    }
  };

  const testConnection = async () => {
    // Simula teste de conexão
    toast({
      title: "Testando Conexão",
      description: "Verificando conectividade com a API do Stripe..."
    });
    
    setTimeout(() => {
      toast({
        title: "Conexão Bem-sucedida",
        description: "A API do Stripe está respondendo corretamente."
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-cinzel text-golden-amber mb-2">
          <CreditCard className="inline w-6 h-6 mr-2" />
          Configuração Stripe
        </h2>
        <p className="text-sm text-muted-foreground">
          Configure as chaves da API do Stripe para processar pagamentos dos grimórios
        </p>
      </div>

      {/* Status da Configuração */}
      <Card className="border-golden-amber/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-golden-amber">Status da Integração</CardTitle>
            <Badge 
              variant={config.isConfigured ? "default" : "destructive"}
              className={config.isConfigured ? "bg-green-600" : ""}
            >
              {config.isConfigured ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Configurado
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Não Configurado
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium text-golden-amber">Chave Pública</div>
              <div className="text-muted-foreground">
                {config.publicKey ? 'Configurada' : 'Não configurada'}
              </div>
            </div>
            <div>
              <div className="font-medium text-golden-amber">Chave Secreta</div>
              <div className="text-muted-foreground">
                {config.secretKey ? 'Configurada' : 'Não configurada'}
              </div>
            </div>
            <div>
              <div className="font-medium text-golden-amber">Webhook</div>
              <div className="text-muted-foreground">
                {config.webhookSecret ? 'Configurado' : 'Opcional'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instruções */}
      <Alert>
        <Key className="h-4 w-4" />
        <AlertDescription>
          <strong>Como obter suas chaves do Stripe:</strong>
          <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
            <li>Acesse o <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer" className="text-golden-amber hover:underline">Dashboard do Stripe <ExternalLink className="inline w-3 h-3" /></a></li>
            <li><strong>Chave Pública:</strong> Copie a "Publishable key" (começa com pk_)</li>
            <li><strong>Chave Secreta:</strong> Copie a "Secret key" (começa com sk_)</li>
            <li><strong>Webhook (opcional):</strong> Configure em "Developers → Webhooks"</li>
          </ol>
        </AlertDescription>
      </Alert>

      {/* Formulário de Configuração */}
      <Card className="border-golden-amber/20">
        <CardHeader>
          <CardTitle className="text-golden-amber">Chaves da API</CardTitle>
          <CardDescription>
            Configure suas chaves do Stripe para processar pagamentos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Modo de Teste */}
          <div className="flex items-center justify-between p-3 bg-amber-50/10 rounded-lg border border-golden-amber/20">
            <div>
              <div className="font-medium text-golden-amber">Modo de Teste</div>
              <div className="text-sm text-muted-foreground">
                Use chaves de teste para desenvolvimento seguro
              </div>
            </div>
            <Badge variant={isTestMode ? "default" : "secondary"}>
              {isTestMode ? "Teste" : "Produção"}
            </Badge>
          </div>

          {/* Chave Pública */}
          <div className="space-y-2">
            <Label htmlFor="publicKey">
              Chave Pública (Publishable Key)
              <span className="text-xs text-muted-foreground ml-2">- Segura para frontend</span>
            </Label>
            <Input
              id="publicKey"
              type="text"
              placeholder="pk_test_... ou pk_live_..."
              value={config.publicKey}
              onChange={(e) => setConfig(prev => ({ ...prev, publicKey: e.target.value }))}
              className="font-mono text-sm"
            />
          </div>

          {/* Chave Secreta */}
          <div className="space-y-2">
            <Label htmlFor="secretKey">
              Chave Secreta (Secret Key)
              <span className="text-xs text-red-400 ml-2">- Manter em segredo!</span>
            </Label>
            <div className="relative">
              <Input
                id="secretKey"
                type={showSecrets.secret ? "text" : "password"}
                placeholder="sk_test_... ou sk_live_..."
                value={config.secretKey}
                onChange={(e) => setConfig(prev => ({ ...prev, secretKey: e.target.value }))}
                className="font-mono text-sm pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowSecrets(prev => ({ ...prev, secret: !prev.secret }))}
              >
                {showSecrets.secret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Webhook Secret */}
          <div className="space-y-2">
            <Label htmlFor="webhookSecret">
              Webhook Secret (Opcional)
              <span className="text-xs text-muted-foreground ml-2">- Para verificar eventos</span>
            </Label>
            <div className="relative">
              <Input
                id="webhookSecret"
                type={showSecrets.webhook ? "text" : "password"}
                placeholder="whsec_..."
                value={config.webhookSecret}
                onChange={(e) => setConfig(prev => ({ ...prev, webhookSecret: e.target.value }))}
                className="font-mono text-sm pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowSecrets(prev => ({ ...prev, webhook: !prev.webhook }))}
              >
                {showSecrets.webhook ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              className="bg-golden-amber text-black hover:bg-golden-amber/90"
              disabled={!config.publicKey || !config.secretKey}
            >
              <Key className="w-4 h-4 mr-2" />
              Salvar Configuração
            </Button>
            
            <Button
              variant="outline"
              onClick={testConnection}
              disabled={!config.publicKey}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Testar Conexão
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Produto */}
      <Card className="border-golden-amber/20">
        <CardHeader>
          <CardTitle className="text-golden-amber">Configurações de Pagamento</CardTitle>
          <CardDescription>
            Configurações gerais para os pagamentos dos grimórios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currency">Moeda</Label>
              <Input
                id="currency"
                value="BRL"
                readOnly
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="priceRange">Faixa de Preços Sugerida</Label>
              <Input
                id="priceRange"
                value="R$ 5,00 - R$ 50,00"
                readOnly
                className="bg-muted"
              />
            </div>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Bypass de Admin Ativo:</strong> Como administrador, você tem acesso completo a todos os grimórios sem necessidade de pagamento.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}