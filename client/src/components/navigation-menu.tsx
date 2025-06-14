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
    <nav className="navigation-menu fixed top-16 sm:top-20 left-0 right-0 z-40 bg-transparent">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 xl:px-12">
        
        {/* Desktop Menu - Large screens */}
        <div className="hidden lg:flex items-center justify-center py-3">
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
        <div className="hidden md:flex lg:hidden items-center justify-center py-2">
          <ul className="flex items-center space-x-6">
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
        <div className="hidden sm:flex md:hidden items-center justify-center py-2">
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
        <div className="sm:hidden flex items-center justify-between py-2" ref={menuRef}>
          <div className="flex items-center space-x-1">
            <span className="text-blood-red text-sm">†</span>
            <span className="font-cinzel text-golden-amber text-xs tracking-wider uppercase">
              Navegação
            </span>
            <span className="text-blood-red text-sm">†</span>
          </div>
          
          <button
            onClick={toggleMenu}
            className={`
              p-1 rounded transition-all duration-300
              ${isMenuOpen 
                ? 'text-golden-amber' 
                : 'text-golden-amber/70 hover:text-golden-amber'
              }
            `}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
          
          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 mx-2 bg-black/90 backdrop-blur border border-golden-amber/30 rounded-lg shadow-xl">
              <ul className="flex flex-col py-2">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = location === item.href;
                  
                  return (
                    <li key={item.href}>
                      <Link 
                        href={item.href} 
                        onClick={() => handleNavClick(item.href)}
                        className={`
                          flex items-center space-x-3 px-4 py-2 mx-1 rounded transition-all duration-300
                          ${isActive 
                            ? 'text-golden-amber bg-golden-amber/10' 
                            : 'text-ritualistic-beige hover:text-golden-amber hover:bg-golden-amber/5'
                          }
                        `}
                      >
                        <IconComponent 
                          size={14} 
                          className={`${isActive ? 'text-golden-amber' : 'text-golden-amber/60'}`} 
                        />
                        <div>
                          <div className="font-cinzel text-xs tracking-wide uppercase">
                            {item.label}
                          </div>
                          <div className="font-garamond text-xs opacity-60 italic">
                            {item.subtitle}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}