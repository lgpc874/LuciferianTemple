import { useEffect, useState } from 'react';
import { useLocation, useRouter } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Lock, 
  Crown, 
  CheckCircle, 
  AlertTriangle,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { type Grimoire } from '@shared/schema';

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [grimoireId, setGrimoireId] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Extrair ID do grimório da URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('grimoire');
    if (id) {
      setGrimoireId(parseInt(id));
    }
  }, []);

  // Buscar dados do grimório
  const { data: grimoire, isLoading } = useQuery<Grimoire>({
    queryKey: ['/api/grimoires', grimoireId],
    enabled: !!grimoireId
  });

  // Verificar se usuário é admin (bypass completo)
  const isAdmin = user?.email === 'admin@templodoabismo.com';

  // Simular processamento de pagamento (será substituído pela integração real do Stripe)
  const handlePayment = async () => {
    if (!grimoire || !user) return;

    setIsProcessing(true);

    try {
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Pagamento Processado",
        description: `Acesso ao grimório "${grimoire.title}" liberado com sucesso!`
      });

      // Redirecionar para o grimório
      setLocation(`/grimoire/${grimoire.id}`);
    } catch (error) {
      toast({
        title: "Erro no Pagamento",
        description: "Não foi possível processar o pagamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Admin bypass - acesso direto
  const handleAdminBypass = () => {
    if (!grimoire) return;
    
    toast({
      title: "Acesso de Administrador",
      description: "Acesso liberado automaticamente para admin."
    });
    
    setLocation(`/grimoire/${grimoire.id}`);
  };

  // Redirecionar para login se não autenticado
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card className="border-golden-amber/20">
          <CardHeader className="text-center">
            <Lock className="w-12 h-12 mx-auto text-golden-amber mb-4" />
            <CardTitle className="text-golden-amber">Autenticação Necessária</CardTitle>
            <CardDescription>
              Você precisa estar logado para acessar grimórios pagos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => setLocation('/auth')}
              className="w-full bg-golden-amber text-black hover:bg-golden-amber/90"
            >
              Fazer Login
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setLocation('/biblioteca')}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à Biblioteca
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading || !grimoire) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-golden-amber" />
        </div>
      </div>
    );
  }

  // Se grimório não é pago, redirecionar
  if (!grimoire.isPaid) {
    setLocation(`/grimoire/${grimoire.id}`);
    return null;
  }

  const price = grimoire.price ? parseFloat(grimoire.price) : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-cinzel text-golden-amber mb-2">
          <span className="text-blood-red">🜔</span> Aquisição de Grimório <span className="text-blood-red">🜔</span>
        </h1>
        <p className="text-muted-foreground">
          Complete a aquisição para acessar o conhecimento arcano
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Detalhes do Produto */}
        <Card className="border-golden-amber/20">
          <CardHeader>
            <CardTitle className="text-golden-amber flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Detalhes do Grimório
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-cinzel text-lg text-golden-amber mb-2">
                {grimoire.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {grimoire.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{grimoire.category}</Badge>
                <Badge variant="outline">
                  Nível {grimoire.difficultyLevel}
                </Badge>
                {grimoire.isPaid && (
                  <Badge className="bg-golden-amber text-black">
                    Premium
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Grimório:</span>
                <span className="font-medium">{grimoire.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Categoria:</span>
                <span>{grimoire.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Acesso:</span>
                <span>Vitalício</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-golden-amber">
                  R$ {price.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Área de Pagamento */}
        <Card className="border-golden-amber/20">
          <CardHeader>
            <CardTitle className="text-golden-amber flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Pagamento Seguro
            </CardTitle>
            <CardDescription>
              Transação protegida por criptografia SSL
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Admin Bypass */}
            {isAdmin && (
              <Alert className="border-green-500/50 bg-green-50/10">
                <Crown className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-400">
                  <strong>Acesso de Administrador Detectado</strong>
                  <br />
                  Você tem acesso completo a todos os grimórios sem pagamento.
                </AlertDescription>
              </Alert>
            )}

            {/* Stripe não configurado */}
            {!isAdmin && !import.meta.env.VITE_STRIPE_PUBLIC_KEY && (
              <Alert className="border-amber-500/50 bg-amber-50/10">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-400">
                  <strong>Sistema de Pagamento em Configuração</strong>
                  <br />
                  O sistema de pagamentos está sendo configurado. Tente novamente em breve.
                </AlertDescription>
              </Alert>
            )}

            {/* Botões de Ação */}
            <div className="space-y-3">
              {isAdmin ? (
                <Button
                  onClick={handleAdminBypass}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Acessar como Admin
                </Button>
              ) : import.meta.env.VITE_STRIPE_PUBLIC_KEY ? (
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-golden-amber text-black hover:bg-golden-amber/90"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Pagar R$ {price.toFixed(2)}
                    </>
                  )}
                </Button>
              ) : (
                <Button disabled className="w-full">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Pagamento Indisponível
                </Button>
              )}

              <Button 
                variant="outline" 
                onClick={() => setLocation('/biblioteca')}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar à Biblioteca
              </Button>
            </div>

            {/* Garantias */}
            <div className="pt-4 text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>Acesso vitalício ao conteúdo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>Transação 100% segura</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>Suporte técnico incluído</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações Adicionais */}
      <Card className="mt-6 border-golden-amber/20">
        <CardContent className="pt-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Sobre o Sistema de Pagamentos:</strong>
            </p>
            <p>
              Utilizamos o Stripe para processamento seguro de pagamentos. 
              Suas informações financeiras são protegidas por criptografia de nível bancário.
              Como administrador, você tem acesso completo a todo conteúdo sem necessidade de pagamento.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}