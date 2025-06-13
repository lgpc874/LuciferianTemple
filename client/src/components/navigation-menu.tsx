import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function NavigationMenu() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { href: "/", label: "Templo" },
    { href: "/bibliotheca-arcana", label: "Bibliotheca Arcana" },
    { href: "/auth", label: "Portal" }
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
    <nav className="fixed top-20 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-golden-amber/20">
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-center py-3">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  onClick={() => handleNavClick(item.href)}
                  className={`
                    font-cinzel text-sm xl:text-base tracking-wide transition-all duration-300
                    ${location === item.href 
                      ? 'text-golden-amber border-b border-golden-amber pb-1' 
                      : 'text-ritualistic-beige hover:text-golden-amber hover:border-b hover:border-golden-amber/50 hover:pb-1'
                    }
                  `}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tablet Menu */}
        <div className="hidden md:flex lg:hidden items-center justify-center py-3">
          <ul className="flex space-x-4">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`
                    font-cinzel text-xs tracking-wide transition-all duration-300
                    ${location === item.href 
                      ? 'text-golden-amber border-b border-golden-amber pb-1' 
                      : 'text-ritualistic-beige hover:text-golden-amber hover:border-b hover:border-golden-amber/50 hover:pb-1'
                    }
                  `}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-between py-3" ref={menuRef}>
          <span className="font-cinzel text-golden-amber text-sm tracking-wide">
            ⸸ PORTAIS ⸸
          </span>
          <button
            onClick={toggleMenu}
            className="text-golden-amber hover:text-ritualistic-beige transition-colors duration-300"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-black/95 backdrop-blur-md border border-golden-amber/30 rounded-lg shadow-xl shadow-golden-amber/10">
              <ul className="flex flex-col py-2">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      onClick={() => handleNavClick(item.href)}
                      className={`
                        block px-4 py-2 font-cinzel text-sm tracking-wide transition-all duration-300 rounded-md mx-2
                        ${location === item.href 
                          ? 'text-golden-amber bg-golden-amber/15' 
                          : 'text-ritualistic-beige hover:text-golden-amber hover:bg-golden-amber/10'
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}