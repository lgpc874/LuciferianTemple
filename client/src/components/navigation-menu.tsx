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
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 xl:px-12">
        
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
        <div className="sm:hidden flex items-center justify-between py-0" ref={menuRef}>
          <div className="flex items-center space-x-1">
            <span className="text-blood-red text-sm">†</span>
            <span className="font-cinzel text-golden-amber text-xs tracking-wider uppercase">
              Navegação
            </span>
            <span className="text-blood-red text-sm">†</span>
          </div>
          
          <button
            onClick={toggleMenu}
            className="relative p-3 text-golden-amber/70 hover:text-golden-amber transition-all duration-300 bg-black/30 rounded-full border border-golden-amber/40 shadow-lg"
            aria-label="Menu Arcano"
          >
            <div className="relative">
              {isMenuOpen ? (
                <X size={18} className="transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu size={18} className="transition-transform duration-300" />
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-golden-amber/20 to-transparent animate-pulse"></div>
          </button>

          {/* Mobile Menu Overlay - Slide from right */}
          <div className={`
            fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-golden-amber/30 z-50
            transform transition-transform duration-500 ease-out shadow-2xl
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
            {/* Header do Menu Místico */}
            <div className="flex items-center justify-between p-6 border-b border-golden-amber/30 bg-gradient-to-r from-black/60 to-golden-amber/10">
              <div className="text-center flex-1">
                <h2 className="font-cinzel text-lg text-golden-amber tracking-wider mb-1">
                  ☩ Menu Arcano ☩
                </h2>
                <div className="text-xs text-golden-amber/60">
                  Portal dos Mistérios
                </div>
              </div>
              <button
                onClick={closeMenu}
                className="p-2 text-golden-amber/70 hover:text-golden-amber transition-colors duration-300 rounded-full hover:bg-golden-amber/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Decoração mística */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-golden-amber/40 to-transparent"></div>

            {/* Itens do Menu */}
            <div className="py-6 px-4 space-y-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = location === item.href;
                
                return (
                  <div key={item.href + item.label} className="relative">
                    <Link 
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`
                        group flex items-center space-x-4 px-4 py-4 rounded-lg transition-all duration-300 relative overflow-hidden
                        ${isActive 
                          ? 'text-golden-amber bg-gradient-to-r from-golden-amber/20 to-golden-amber/10 border-l-4 border-golden-amber shadow-lg' 
                          : 'text-ritualistic-beige hover:text-golden-amber hover:bg-golden-amber/10 hover:translate-x-1'
                        }
                      `}>
                      
                      {/* Background pattern for active item */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-golden-amber/5 to-transparent opacity-50"></div>
                      )}
                      
                      {/* Icon Container */}
                      <div className="relative z-10">
                        <IconComponent 
                          size={20} 
                          className={`${isActive ? 'text-golden-amber' : 'text-golden-amber/60 group-hover:text-golden-amber'} transition-all duration-300`} 
                        />
                        {isActive && (
                          <div className="absolute -inset-1 border border-golden-amber/40 rounded animate-pulse"></div>
                        )}
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1 relative z-10">
                        <div className="font-cinzel text-sm tracking-wide uppercase font-medium">
                          {item.label}
                        </div>
                        <div className="text-xs text-ritualistic-beige/60 mt-1 font-garamond">
                          {item.subtitle}
                        </div>
                      </div>
                      
                      {/* Active Indicator */}
                      {isActive && (
                        <div className="relative z-10">
                          <div className="w-2 h-2 bg-golden-amber rounded-full animate-pulse shadow-lg"></div>
                        </div>
                      )}
                    </Link>
                    
                    {/* Separator */}
                    {index < menuItems.length - 1 && (
                      <div className="ml-4 mr-4 mt-2 h-px bg-gradient-to-r from-transparent via-golden-amber/20 to-transparent"></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer Místico */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-golden-amber/30 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-center">
                <div className="text-golden-amber/70 text-sm font-cinzel mb-2">
                  ⟨ Templo do Abismo ⟩
                </div>
                <div className="text-ritualistic-beige/40 text-xs">
                  Portal dos Mistérios Arcanos
                </div>
                <div className="mt-3 flex justify-center">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-golden-amber/40 to-transparent"></div>
                </div>
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