import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Home, BookOpen, Key, Scroll } from "lucide-react";

export default function NavigationMenu() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { href: "/", label: "Sanctum", icon: Home, subtitle: "Portão Principal" },
    { href: "/biblioteca", label: "Bibliotheca", icon: BookOpen, subtitle: "Grimórios Arcanos" },
    { href: "/bibliotheca-arcana", label: "Arcanum", icon: Scroll, subtitle: "Conhecimento Oculto" },
    { href: "/auth", label: "Initium", icon: Key, subtitle: "Portal dos Iniciados" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
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
    <nav className="navigation-menu fixed top-16 sm:top-20 left-0 right-0 z-40 bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-md border-b border-golden-amber/20">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 xl:px-12">
        {/* Desktop Menu - Large screens */}
        <div className="hidden xl:flex items-center justify-center py-4">
          <div className="bg-black/40 backdrop-blur-sm rounded-full border border-golden-amber/30 px-8 py-3 shadow-lg shadow-golden-amber/10">
            <ul className="flex items-center space-x-8">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = location === item.href;
                
                return (
                  <li key={item.href} className="relative group">
                    <Link 
                      href={item.href} 
                      onClick={() => handleNavClick(item.href)}
                      className={`
                        flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all duration-500 group
                        ${isActive 
                          ? 'text-golden-amber bg-golden-amber/10 shadow-md shadow-golden-amber/20' 
                          : 'text-ritualistic-beige hover:text-golden-amber hover:bg-golden-amber/5'
                        }
                      `}>
                      <IconComponent 
                        size={20} 
                        className={`
                          transition-all duration-300 
                          ${isActive ? 'text-golden-amber' : 'text-blood-red group-hover:text-golden-amber'}
                        `} 
                      />
                      <span className="font-cinzel text-sm tracking-wider uppercase">
                        {item.label}
                      </span>
                      <span className="font-garamond text-xs opacity-70 italic">
                        {item.subtitle}
                      </span>
                    </Link>
                    
                    {/* Separador místico entre itens */}
                    {index < menuItems.length - 1 && (
                      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-golden-amber/30 text-xs">
                        ⸱
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Desktop Compact Menu - Medium to Large screens */}
        <div className="hidden lg:flex xl:hidden items-center justify-center py-3">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-golden-amber/30 px-6 py-2">
            <ul className="flex items-center space-x-4">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = location === item.href;
                
                return (
                  <li key={item.href} className="relative">
                    <Link 
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`
                        flex flex-col items-center space-y-1 px-2 py-1 rounded-md transition-all duration-300
                        ${isActive 
                          ? 'text-golden-amber bg-golden-amber/10' 
                          : 'text-ritualistic-beige hover:text-golden-amber hover:bg-golden-amber/5'
                        }
                      `}>
                      <IconComponent 
                        size={16} 
                        className={`${isActive ? 'text-golden-amber' : 'text-blood-red'}`} 
                      />
                      <span className="font-cinzel text-xs tracking-wide uppercase">
                        {item.label}
                      </span>
                    </Link>
                    
                    {index < menuItems.length - 1 && (
                      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 text-golden-amber/30 text-xs">
                        ⸱
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Tablet Menu - Medium screens only */}
        <div className="hidden md:flex lg:hidden items-center justify-center py-2">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-golden-amber/30 px-4 py-2 w-full max-w-2xl">
            <ul className="flex items-center justify-around">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location === item.href;
                
                return (
                  <li key={item.href} className="flex-1">
                    <Link 
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`
                        flex flex-col items-center space-y-1 px-2 py-1 rounded-md transition-all duration-300 w-full
                        ${isActive 
                          ? 'text-golden-amber bg-golden-amber/10' 
                          : 'text-ritualistic-beige hover:text-golden-amber hover:bg-golden-amber/5'
                        }
                      `}>
                      <IconComponent size={14} className="text-blood-red" />
                      <span className="font-cinzel text-xs tracking-wide uppercase text-center">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Small Tablet Menu - Small to Medium screens */}
        <div className="hidden sm:flex md:hidden items-center justify-center py-2">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-golden-amber/30 px-3 py-2 w-full max-w-lg">
            <ul className="flex items-center justify-around">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location === item.href;
                
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`
                        flex flex-col items-center space-y-1 px-1 py-1 rounded transition-all duration-300
                        ${isActive 
                          ? 'text-golden-amber bg-golden-amber/10' 
                          : 'text-ritualistic-beige hover:text-golden-amber hover:bg-golden-amber/5'
                        }
                      `}>
                      <IconComponent size={12} className="text-blood-red" />
                      <span className="font-cinzel text-xs tracking-wide uppercase">
                        {item.label.length > 6 ? item.label.substring(0, 6) : item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Mobile Menu - All small screens */}
        <div className="sm:hidden flex items-center justify-between py-2 px-1" ref={menuRef}>
          <div className="flex items-center space-x-1 flex-1 min-w-0">
            <span className="text-blood-red transform rotate-180 text-sm">†</span>
            <span className="font-cinzel text-golden-amber text-xs sm:text-sm tracking-wider uppercase truncate">
              Portais Arcanos
            </span>
            <span className="text-blood-red transform rotate-180 text-sm">†</span>
          </div>
          
          <button
            onClick={toggleMenu}
            className={`
              p-2 rounded-lg transition-all duration-300 border border-golden-amber/30 flex-shrink-0
              ${isMenuOpen 
                ? 'text-golden-amber bg-golden-amber/10 shadow-md shadow-golden-amber/20' 
                : 'text-golden-amber hover:bg-golden-amber/5'
              }
            `}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
          
          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 left-0 mt-2 mx-2 bg-black/95 backdrop-blur-xl border border-golden-amber/40 rounded-xl shadow-2xl shadow-golden-amber/20 overflow-hidden">
              <div className="p-1">
                <div className="text-center py-2 border-b border-golden-amber/20">
                  <span className="font-cinzel text-golden-amber text-xs tracking-widest uppercase">
                    Navegação Mística
                  </span>
                </div>
                
                <ul className="flex flex-col py-1 space-y-1">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = location === item.href;
                    
                    return (
                      <li key={item.href}>
                        <Link 
                          href={item.href} 
                          onClick={() => handleNavClick(item.href)}
                          className={`
                            flex items-center space-x-3 px-3 py-2 mx-1 rounded-lg transition-all duration-300 group
                            ${isActive 
                              ? 'text-golden-amber bg-golden-amber/15 border border-golden-amber/30' 
                              : 'text-ritualistic-beige hover:text-golden-amber hover:bg-golden-amber/10 border border-transparent'
                            }
                          `}
                        >
                          <IconComponent 
                            size={16} 
                            className={`
                              transition-colors duration-300 flex-shrink-0
                              ${isActive ? 'text-golden-amber' : 'text-blood-red group-hover:text-golden-amber'}
                            `} 
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-cinzel text-xs tracking-wide uppercase truncate">
                              {item.label}
                            </div>
                            <div className="font-garamond text-xs opacity-70 italic truncate">
                              {item.subtitle}
                            </div>
                          </div>
                          {isActive && (
                            <div className="text-golden-amber text-xs flex-shrink-0">
                              ◆
                            </div>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                
                <div className="text-center py-2 border-t border-golden-amber/20">
                  <span className="font-fell text-blood-red text-xs italic">
                    "Per aspera ad astra"
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ultra Small Mobile Menu - Extreme small screens (320px and below) */}
        <style jsx>{`
          @media (max-width: 320px) {
            .navigation-menu .font-cinzel {
              font-size: 0.625rem !important;
            }
            .navigation-menu .space-x-1 > * + * {
              margin-left: 0.125rem !important;
            }
          }
          
          @media (max-width: 280px) {
            .navigation-menu .truncate {
              max-width: 60px;
            }
          }
        `}</style>
      </div>
    </nav>
  );
}