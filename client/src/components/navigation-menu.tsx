import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavigationMenu() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav className="fixed top-20 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-golden-amber/20">
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-center py-3">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`
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
                <Link href={item.href} className={`
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
        <div className="md:hidden flex items-center justify-between py-3">
          <span className="font-cinzel text-golden-amber text-sm tracking-wide">
            NAVEGAÇÃO
          </span>
          <button
            onClick={toggleMenu}
            className="text-golden-amber hover:text-ritualistic-beige transition-colors duration-300"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-md border-b border-golden-amber/20">
            <ul className="flex flex-col py-4">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    onClick={closeMenu}
                    className={`
                      block px-4 py-3 font-cinzel text-base tracking-wide transition-all duration-300
                      ${location === item.href 
                        ? 'text-golden-amber bg-golden-amber/10 border-l-4 border-golden-amber' 
                        : 'text-ritualistic-beige hover:text-golden-amber hover:bg-golden-amber/5 hover:border-l-4 hover:border-golden-amber/50'
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
    </nav>
  );
}