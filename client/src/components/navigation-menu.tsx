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

        {/* Mobile Menu - Hamburger Sidebar */}
        <div className="sm:hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between py-3 px-4">
            <span className="font-cinzel text-golden-amber text-sm tracking-wider">
              ⧭ TEMPLO DO ABISMO
            </span>
            <button
              onClick={toggleMenu}
              className="p-2 text-golden-amber bg-black/40 rounded border border-golden-amber/30 hover:bg-golden-amber/10 transition-all duration-300"
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Sidebar Overlay */}
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={closeMenu}
              />
              
              {/* Sidebar */}
              <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-r border-golden-amber/30 z-50 transform transition-transform duration-300">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-golden-amber/30">
                  <h2 className="font-cinzel text-lg text-golden-amber tracking-wider">
                    ⧭ Menu Arcano
                  </h2>
                  <button
                    onClick={closeMenu}
                    className="p-2 text-golden-amber/70 hover:text-golden-amber transition-colors rounded hover:bg-golden-amber/10"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="p-4 space-y-2">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = location === item.href;
                    
                    return (
                      <Link 
                        key={item.href}
                        href={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={`
                          flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 w-full
                          ${isActive 
                            ? 'text-golden-amber bg-golden-amber/20 border border-golden-amber/30' 
                            : 'text-ritualistic-beige hover:text-golden-amber hover:bg-golden-amber/10'
                          }
                        `}>
                        
                        <IconComponent 
                          size={20} 
                          className={`${isActive ? 'text-golden-amber' : 'text-golden-amber/60'}`} 
                        />
                        
                        <div className="flex-1">
                          <div className="font-cinzel text-base tracking-wide uppercase font-medium">
                            {item.label}
                          </div>
                          <div className="text-xs text-ritualistic-beige/60 mt-1">
                            {item.subtitle}
                          </div>
                        </div>
                        
                        {isActive && (
                          <div className="w-2 h-2 bg-golden-amber rounded-full"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Sidebar Footer */}
                <div className="absolute bottom-6 left-0 right-0 px-4">
                  <div className="text-center">
                    <div className="text-golden-amber/70 text-sm font-cinzel mb-1">
                      Templo do Abismo
                    </div>
                    <div className="text-ritualistic-beige/40 text-xs">
                      Portal dos Mistérios Arcanos
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}