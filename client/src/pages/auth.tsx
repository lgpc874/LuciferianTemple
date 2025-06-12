import AuthForm from "@/components/auth-form";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

export default function AuthPage() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleAuthSuccess = (token: string, user: any) => {
    login(token, user);
    setLocation("/");
  };

  return <AuthForm onSuccess={handleAuthSuccess} />;
}