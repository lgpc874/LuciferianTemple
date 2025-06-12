import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { registerSchema, loginSchema, type RegisterData, type LoginData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";

interface AuthFormProps {
  onSuccess: (token: string, user: any) => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  const registerForm = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "" }
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro no login");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.token);
      onSuccess(data.token, data.user);
      toast({
        title: "Bem-vindo ao Templo",
        description: `Os véus se abrem para você, ${data.user.username}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Acesso Negado",
        description: error.message || "As portas permanecem seladas",
        variant: "destructive"
      });
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro no registro");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.token);
      onSuccess(data.token, data.user);
      toast({
        title: "Iniciação Completa",
        description: `Seja bem-vindo aos mistérios, ${data.user.username}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Iniciação Negada",
        description: error.message || "Os portais rejeitaram sua entrada",
        variant: "destructive"
      });
    }
  });

  const onLoginSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTExIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      <Card className="w-full max-w-md relative z-10 bg-gray-950/80 border-gray-800 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-b from-red-900 to-red-950 rounded-full flex items-center justify-center">
            <div className="text-red-400 text-2xl font-serif">⚡</div>
          </div>
          <CardTitle className="text-2xl font-serif text-red-200">
            {isLogin ? "Portal de Acesso" : "Iniciação no Templo"}
          </CardTitle>
          <CardDescription className="text-gray-400 font-serif text-sm">
            {isLogin 
              ? "Adentre os véus do conhecimento sagrado" 
              : "Junte-se aos guardiões dos mistérios ancestrais"
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 font-serif flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Sagrado
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20"
                  {...loginForm.register("email")}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-red-400 text-sm">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 font-serif flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Palavra de Poder
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20 pr-10"
                    {...loginForm.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-red-400 text-sm">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-serif"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Atravessando os Véus..." : "Adentrar o Templo"}
              </Button>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300 font-serif flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nome Ritual
                </Label>
                <Input
                  id="username"
                  placeholder="Seu nome nos mistérios"
                  className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20"
                  {...registerForm.register("username")}
                />
                {registerForm.formState.errors.username && (
                  <p className="text-red-400 text-sm">{registerForm.formState.errors.username.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-gray-300 font-serif flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Sagrado
                </Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20"
                  {...registerForm.register("email")}
                />
                {registerForm.formState.errors.email && (
                  <p className="text-red-400 text-sm">{registerForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password" className="text-gray-300 font-serif flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Palavra de Poder
                </Label>
                <div className="relative">
                  <Input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20 pr-10"
                    {...registerForm.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {registerForm.formState.errors.password && (
                  <p className="text-red-400 text-sm">{registerForm.formState.errors.password.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white font-serif"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Iniciando Ritual..." : "Iniciar nos Mistérios"}
              </Button>
            </form>
          )}

          <div className="text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                loginForm.reset();
                registerForm.reset();
              }}
              className="text-red-400 hover:text-red-300 font-serif text-sm underline underline-offset-4"
            >
              {isLogin 
                ? "Busca a iniciação nos mistérios?"
                : "Já é guardião dos segredos?"
              }
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}