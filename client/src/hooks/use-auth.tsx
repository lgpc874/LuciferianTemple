import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface User {
  id: number;
  username: string;
  email: string;
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

  const { data: userData, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      // Sempre tentar fazer a requisição, mesmo sem token no Replit
      const headers: any = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await fetch("/api/auth/me", { headers });
      
      if (!response.ok) {
        // No Replit, se não há token, ainda pode haver bypass
        if (window.location.hostname.includes('replit') || window.location.hostname.includes('localhost')) {
          // Retornar null para permitir que o backend faça o bypass
          return null;
        }
        throw new Error("Authentication failed");
      }
      
      const data = await response.json();
      return data.user;
    },
    enabled: true, // Sempre habilitado para permitir bypass no Replit
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else if (!isLoading && token) {
      // Token is invalid, clear it
      logout();
    }
  }, [userData, isLoading, token]);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("auth_token", newToken);
    queryClient.setQueryData(["/api/auth/me"], newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    queryClient.clear();
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user && !!token,
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