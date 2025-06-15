import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Home, BookOpen, Key, Scroll, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function NavigationMenu() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuth();

  const baseMenuItems = [
    { href: "/", label: "Sanctum", icon: Home, subtitle: "Portão Principal" },
    { href: "/biblioteca", label: "Bibliotheca", icon: BookOpen, subtitle: "Grimórios Arcanos" }
  ];

  // Adiciona item dinâmico baseado no status de autenticação
  const authMenuItem = isAuthenticated 
    ? { href: "/perfil", label: user?.username || "Perfil", icon: User, subtitle: "Área do Usuário", isLogout: false }
    : { href: "/auth", label: "Initium", icon: Key, subtitle: "Portal dos Iniciados", isLogout: false };

  const menuItems = [...baseMenuItems, authMenuItem];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (href: string, isLogout?: boolean) => {
    if (isLogout) {
      logout();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      closeMenu();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  };

  // Fechar menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="navigation-menu relative bg-transparent floating-container my-2">
      <div className="w-full max-w-full px-2 sm:px-4 lg:px-8 xl:px-12 mx-auto">
        
        {/* Desktop Menu - Large screens */}
        <div className="hidden lg:flex items-center justify-center py-0">
          <ul className="flex items-center space-x-8">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = location === item.href;
              
              return (
                <li key={item.href + item.label} className="relative group">
                  <Link 
                    href={item.href} 
                    onClick={() => handleNavClick(item.href)}
                    className={`
                      flex flex-col items-center space-y-1 px-2 py-1 transition-all duration-300
                      ${isActive 
                        ? 'text-golden-amber' 
                        : 'text-ritualistic-beige hover:text-golden-amber'
                      }
                    `}>
                    <IconComponent 
                      size={16} 
                      className={`transition-all duration-300 ${isActive ? 'text-golden-amber' : 'text-golden-amber/60 group-hover:text-golden-amber'}`} 
                    />
                    <span className="font-cinzel text-xs tracking-wider uppercase">
                      {item.label}
                    </span>
                  </Link>
                  
                  {/* Separador místico entre itens */}
                  {index < menuItems.length - 1 && (
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-golden-amber/20 text-xs">
                      ◆
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Tablet Menu - Medium screens */}
        <div className="hidden md:flex lg:hidden items-center justify-center py-0">
          <ul className="flex items-center space-x-6">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location === item.href;
              
              return (
                <li key={item.href + item.label}>
                  <Link 
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`
                      flex flex-col items-center space-y-1 px-1 py-1 transition-all duration-300
                      ${isActive 
                        ? 'text-golden-amber' 
                        : 'text-ritualistic-beige hover:text-golden-amber'
                      }
                    `}>
                    <IconComponent size={14} className={`${isActive ? 'text-golden-amber' : 'text-golden-amber/60'}`} />
                    <span className="font-cinzel text-xs tracking-wide uppercase">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Small Tablet Menu */}
        <div className="hidden sm:flex md:hidden items-center justify-center py-0">
          <ul className="flex items-center space-x-4">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location === item.href;
              
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`
                      flex flex-col items-center space-y-1 px-1 py-1 transition-all duration-300
                      ${isActive 
                        ? 'text-golden-amber' 
                        : 'text-ritualistic-beige hover:text-golden-amber'
                      }
                    `}>
                    <IconComponent size={12} className={`${isActive ? 'text-golden-amber' : 'text-golden-amber/60'}`} />
                    <span className="font-cinzel text-xs tracking-wide uppercase">
                      {item.label.substring(0, 5)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden flex items-center justify-center py-2" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="relative p-4 text-golden-amber/70 hover:text-golden-amber transition-all duration-300 bg-black/30 rounded-full border border-golden-amber/40 shadow-lg"
            aria-label="Menu Arcano"
          >
            <div className="relative">
              {isMenuOpen ? (
                <X size={20} className="transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu size={20} className="transition-transform duration-300" />
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-golden-amber/20 to-transparent animate-pulse"></div>
          </button>

          {/* Mobile Menu Overlay - Full screen */}
          <div className={`
            fixed inset-0 bg-black/95 backdrop-blur-xl z-50
            transform transition-transform duration-300 ease-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
            {/* Header do Menu */}
            <div className="flex items-center justify-between p-4 border-b border-golden-amber/30">
              <h2 className="font-cinzel text-xl text-golden-amber tracking-wider">
                ⧭ Menu
              </h2>
              <button
                onClick={closeMenu}
                className="p-2 text-golden-amber/70 hover:text-golden-amber transition-colors duration-300 rounded-full hover:bg-golden-amber/10"
              >
                <X size={24} />
              </button>
            </div>

            {/* Itens do Menu */}
            <div className="p-4 space-y-3 mt-8">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = location === item.href;
                
                return (
                  <Link 
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`
                      flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 w-full
                      ${isActive 
                        ? 'text-golden-amber bg-golden-amber/20 border border-golden-amber/30' 
                        : 'text-ritualistic-beige hover:text-golden-amber hover:bg-golden-amber/10'
                      }
                    `}>
                    
                    <IconComponent 
                      size={24} 
                      className={`${isActive ? 'text-golden-amber' : 'text-golden-amber/60'} transition-colors duration-300`} 
                    />
                    
                    <div className="flex-1">
                      <div className="font-cinzel text-lg tracking-wide uppercase font-medium">
                        {item.label}
                      </div>
                      <div className="text-sm text-ritualistic-beige/60 mt-1 font-garamond">
                        {item.subtitle}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 left-0 right-0 text-center px-4">
              <div className="text-golden-amber/70 text-sm font-cinzel">
                Templo do Abismo
              </div>
              <div className="text-ritualistic-beige/40 text-xs mt-1">
                Portal dos Mistérios Arcanos
              </div>
            </div>
          </div>

          {/* Backdrop escuro com efeito */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
              onClick={closeMenu}
              style={{
                background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)'
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}