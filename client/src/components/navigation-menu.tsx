import { Link, useLocation } from "wouter";

export default function NavigationMenu() {
  const [location] = useLocation();

  const menuItems = [
    { href: "/", label: "Templo" },
    { href: "/bibliotheca-arcana", label: "Bibliotheca Arcana" },
    { href: "/auth", label: "Portal" }
  ];

  return (
    <nav className="fixed top-20 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-golden-amber/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-3">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`
                  font-cinzel text-sm md:text-base tracking-wide transition-all duration-300
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
      </div>
    </nav>
  );
}