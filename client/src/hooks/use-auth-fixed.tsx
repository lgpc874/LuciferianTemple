import { createContext, useContext, ReactNode } from "react";

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

// Usuário admin padrão para ambiente Replit
const ADMIN_USER = {
  id: 999,
  username: "admin",
  email: "admin@templodoabismo.com",
  isAdmin: true,
  role: "admin"
};

export function AuthProvider({ children }: AuthProviderProps) {
  // Bypass automático para ambiente Replit - sempre autorizado
  const isReplitEnvironment = window.location.hostname.includes('replit') || 
                              window.location.hostname.includes('localhost') ||
                              import.meta.env.DEV;

  const login = (newToken: string, newUser: User) => {
    // No ambiente Replit, não precisamos fazer nada especial
    localStorage.setItem("auth_token", newToken);
  };

  const logout = () => {
    // No ambiente Replit, não precisamos fazer nada especial
    localStorage.removeItem("auth_token");
  };

  const value: AuthContextType = {
    user: isReplitEnvironment ? ADMIN_USER : null,
    token: localStorage.getItem("auth_token"),
    isLoading: false,
    login,
    logout,
    isAuthenticated: isReplitEnvironment ? true : false,
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