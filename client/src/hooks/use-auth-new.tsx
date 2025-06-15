import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  username: string;
  email: string;
  isAdmin?: boolean;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => 
    localStorage.getItem("auth_token")
  );
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // Bypass automático para ambiente Replit - sempre retorna admin
  const isReplitEnvironment = window.location.hostname.includes('replit') || 
                              window.location.hostname.includes('localhost') ||
                              import.meta.env.DEV;

  // Se é ambiente Replit, definir usuário admin imediatamente
  useEffect(() => {
    if (isReplitEnvironment) {
      const adminUser = {
        id: 999,
        username: "admin",
        email: "admin@templodoabismo.com",
        isAdmin: true,
        role: "admin"
      };
      setUser(adminUser);
    }
  }, [isReplitEnvironment]);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      // Se é ambiente Replit, retornar usuário admin diretamente
      if (isReplitEnvironment) {
        return {
          id: 999,
          username: "admin",
          email: "admin@templodoabismo.com",
          isAdmin: true,
          role: "admin"
        };
      }
      
      // Caso contrário, usar autenticação normal
      const headers: any = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await fetch("/api/auth/me", { headers });
      
      if (!response.ok) {
        throw new Error("Authentication failed");
      }
      
      const data = await response.json();
      return data.user;
    },
    retry: false,
    enabled: !isReplitEnvironment // Desabilitar query se é Replit
  });

  // Atualizar user quando userData muda (apenas para produção)
  useEffect(() => {
    if (!isReplitEnvironment && userData) {
      setUser(userData);
    }
  }, [userData, isReplitEnvironment]);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("auth_token", newToken);
    queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
  };

  const value: AuthContextType = {
    user: isReplitEnvironment ? {
      id: 999,
      username: "admin",
      email: "admin@templodoabismo.com",
      isAdmin: true,
      role: "admin"
    } : user,
    token,
    isLoading: isReplitEnvironment ? false : isLoading,
    login,
    logout,
    isAuthenticated: isReplitEnvironment ? true : !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}