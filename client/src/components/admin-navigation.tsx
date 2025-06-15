import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BookOpen, 
  Settings, 
  Palette, 
  Bot, 
  FileText, 
  BarChart3,
  LogOut,
  Home,
  Menu,
  X,
  Shield,
  Database
} from 'lucide-react';

export default function AdminNavigation() {
  const { logout, user } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3, path: '/admin' },
    { id: 'biblioteca', label: 'Biblioteca', icon: BookOpen, path: '/admin?tab=biblioteca' },
    { id: 'users', label: 'Usuários', icon: Users, path: '/admin?tab=users' },
    { id: 'settings', label: 'Configurações', icon: Settings, path: '/admin?tab=settings' }
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location === '/admin' || location === '/admin?tab=overview';
    }
    return location === path;
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-golden-amber/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <Shield className="w-8 h-8 text-golden-amber" />
            <div>
              <h1 className="font-cinzel text-xl font-bold text-golden-amber">
                Admin Panel
              </h1>
              <p className="text-xs text-muted-foreground">
                Templo do Abismo
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.slice(0, 6).map((item) => (
              <Button
                key={item.id}
                variant={isActive(item.path) ? "secondary" : "ghost"}
                size="sm"
                className={`flex items-center space-x-2 ${
                  isActive(item.path) 
                    ? 'bg-golden-amber/10 text-golden-amber border border-golden-amber/30' 
                    : 'hover:bg-golden-amber/5 hover:text-golden-amber'
                }`}
                onClick={() => window.location.href = item.path}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </Button>
            ))}
          </div>

          {/* User Menu & Actions */}
          <div className="flex items-center space-x-3">
            {/* User Info */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-golden-amber">
                  {user?.username || 'Admin'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Administrador
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/">
                <Button variant="outline" size="sm" className="border-golden-amber/30 hover:bg-golden-amber/5">
                  <Home className="w-4 h-4 mr-2" />
                  Site
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-destructive/30 hover:bg-destructive/5 text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-golden-amber/20 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    isActive(item.path) 
                      ? 'bg-golden-amber/10 text-golden-amber' 
                      : 'hover:bg-golden-amber/5 hover:text-golden-amber'
                  }`}
                  onClick={() => {
                    window.location.href = item.path;
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              ))}
              
              <div className="pt-3 border-t border-golden-amber/20 space-y-2">
                <Link href="/">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-golden-amber/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home className="w-4 h-4 mr-3" />
                    Voltar ao Site
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-destructive/30 text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sair do Admin
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}