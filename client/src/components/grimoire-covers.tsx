// SVG covers para cada grimório
export const grimoireCoverSvgs = {
  "introducao-ocultismo": (
    <svg viewBox="0 0 300 400" className="w-full h-full">
      <defs>
        <linearGradient id="burgundyGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#722F37" />
          <stop offset="100%" stopColor="#8B4513" />
        </linearGradient>
        <pattern id="leatherTexture" patternUnits="userSpaceOnUse" width="4" height="4">
          <rect width="4" height="4" fill="#5D1A1D" />
          <circle cx="2" cy="2" r="0.5" fill="#722F37" opacity="0.3" />
        </pattern>
      </defs>
      
      {/* Capa do livro */}
      <rect width="300" height="400" fill="url(#burgundyGold)" />
      <rect width="300" height="400" fill="url(#leatherTexture)" opacity="0.4" />
      
      {/* Bordas ornamentadas */}
      <rect x="15" y="15" width="270" height="370" fill="none" stroke="#D4AF37" strokeWidth="2" />
      <rect x="25" y="25" width="250" height="350" fill="none" stroke="#D4AF37" strokeWidth="1" />
      
      {/* Símbolo central - Pentagrama */}
      <g transform="translate(150,120)">
        <polygon points="0,-30 28.5,8.8 -23.1,-11.3 23.1,-11.3 -28.5,8.8" 
                 fill="none" stroke="#D4AF37" strokeWidth="3" />
        <circle cx="0" cy="0" r="35" fill="none" stroke="#D4AF37" strokeWidth="2" />
      </g>
      
      {/* Decorações nos cantos */}
      <g fill="#D4AF37">
        <path d="M30,30 L45,30 L30,45 Z" />
        <path d="M270,30 L255,30 L270,45 Z" />
        <path d="M30,370 L45,370 L30,355 Z" />
        <path d="M270,370 L255,370 L270,355 Z" />
      </g>
      
      {/* Texto do título */}
      <text x="150" y="220" textAnchor="middle" className="fill-amber-300 text-lg font-bold">
        INTRODUÇÃO
      </text>
      <text x="150" y="240" textAnchor="middle" className="fill-amber-300 text-lg font-bold">
        AO OCULTISMO
      </text>
      
      {/* Detalhes inferiores */}
      <rect x="100" y="290" width="100" height="2" fill="#D4AF37" />
      <circle cx="150" cy="310" r="8" fill="none" stroke="#D4AF37" strokeWidth="2" />
    </svg>
  ),

  "lucifer-luz-negra": (
    <svg viewBox="0 0 300 400" className="w-full h-full">
      <defs>
        <linearGradient id="blackSilver" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#2d2d2d" />
        </linearGradient>
      </defs>
      
      {/* Capa preta */}
      <rect width="300" height="400" fill="url(#blackSilver)" />
      
      {/* Bordas prateadas */}
      <rect x="10" y="10" width="280" height="380" fill="none" stroke="#C0C0C0" strokeWidth="2" />
      <rect x="20" y="20" width="260" height="360" fill="none" stroke="#C0C0C0" strokeWidth="1" />
      
      {/* Estrela da manhã (Venus) */}
      <g transform="translate(150,100)">
        <polygon points="0,-25 7.5,-7.5 25,0 7.5,7.5 0,25 -7.5,7.5 -25,0 -7.5,-7.5" 
                 fill="#C0C0C0" stroke="#E6E6E6" strokeWidth="1" />
        <circle cx="0" cy="0" r="30" fill="none" stroke="#C0C0C0" strokeWidth="1" />
      </g>
      
      {/* Correntes decorativas */}
      <g stroke="#C0C0C0" strokeWidth="2" fill="none">
        <circle cx="50" cy="150" r="8" />
        <circle cx="250" cy="150" r="8" />
        <circle cx="50" cy="250" r="8" />
        <circle cx="250" cy="250" r="8" />
        <line x1="58" y1="150" x2="242" y2="150" />
        <line x1="58" y1="250" x2="242" y2="250" />
      </g>
      
      {/* Título */}
      <text x="150" y="200" textAnchor="middle" className="fill-gray-300 text-base font-bold">
        LÚCIFER
      </text>
      <text x="150" y="220" textAnchor="middle" className="fill-gray-300 text-sm">
        E O CAMINHO DA
      </text>
      <text x="150" y="240" textAnchor="middle" className="fill-gray-300 text-base font-bold">
        LUZ NEGRA
      </text>
      
      {/* Ornamento inferior */}
      <path d="M120,320 Q150,300 180,320" fill="none" stroke="#C0C0C0" strokeWidth="2" />
    </svg>
  ),

  "lilith-sombra-feminina": (
    <svg viewBox="0 0 300 400" className="w-full h-full">
      <defs>
        <linearGradient id="purpleSilver" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A148C" />
          <stop offset="100%" stopColor="#6A1B9A" />
        </linearGradient>
      </defs>
      
      {/* Capa roxa */}
      <rect width="300" height="400" fill="url(#purpleSilver)" />
      
      {/* Bordas prateadas */}
      <rect x="15" y="15" width="270" height="370" fill="none" stroke="#E1BEE7" strokeWidth="2" />
      
      {/* Fases da lua */}
      <g transform="translate(150,80)" fill="#E1BEE7">
        <circle cx="-40" cy="0" r="8" fill="#E1BEE7" />
        <path d="M-20,-10 A10,10 0 0,1 -20,10 A8,8 0 0,0 -20,-10" fill="#E1BEE7" />
        <circle cx="0" cy="0" r="12" fill="#E1BEE7" />
        <path d="M20,-10 A8,8 0 0,1 20,10 A10,10 0 0,0 20,-10" fill="#E1BEE7" />
        <circle cx="40" cy="0" r="8" fill="#E1BEE7" />
      </g>
      
      {/* Símbolo serpentino */}
      <g transform="translate(150,140)">
        <path d="M-30,0 Q-15,-20 0,0 Q15,20 30,0" fill="none" stroke="#E1BEE7" strokeWidth="3" />
        <path d="M-30,20 Q-15,0 0,20 Q15,40 30,20" fill="none" stroke="#E1BEE7" strokeWidth="3" />
        <circle cx="-25" cy="5" r="3" fill="#E1BEE7" />
        <circle cx="25" cy="15" r="3" fill="#E1BEE7" />
      </g>
      
      {/* Título */}
      <text x="150" y="220" textAnchor="middle" className="fill-purple-200 text-lg font-bold">
        LILITH
      </text>
      <text x="150" y="240" textAnchor="middle" className="fill-purple-200 text-sm">
        E O PODER DA
      </text>
      <text x="150" y="260" textAnchor="middle" className="fill-purple-200 text-base font-bold">
        SOMBRA FEMININA
      </text>
      
      {/* Ornamentos florais */}
      <g fill="#E1BEE7" opacity="0.7">
        <path d="M80,320 Q90,310 100,320 Q90,330 80,320" />
        <path d="M200,320 Q210,310 220,320 Q210,330 200,320" />
      </g>
    </svg>
  ),

  "simbolismo-sigilos": (
    <svg viewBox="0 0 300 400" className="w-full h-full">
      <defs>
        <linearGradient id="brownGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5D4037" />
          <stop offset="100%" stopColor="#8D6E63" />
        </linearGradient>
      </defs>
      
      {/* Capa marrom */}
      <rect width="300" height="400" fill="url(#brownGold)" />
      
      {/* Geometria sagrada - Flor da vida */}
      <g transform="translate(150,120)" fill="none" stroke="#FFD700" strokeWidth="2">
        <circle cx="0" cy="0" r="20" />
        <circle cx="17.3" cy="10" r="20" />
        <circle cx="17.3" cy="-10" r="20" />
        <circle cx="0" cy="-20" r="20" />
        <circle cx="-17.3" cy="-10" r="20" />
        <circle cx="-17.3" cy="10" r="20" />
        <circle cx="0" cy="20" r="20" />
      </g>
      
      {/* Símbolos alquímicos */}
      <g transform="translate(80,200)" fill="#FFD700">
        <circle cx="0" cy="0" r="8" />
        <path d="M0,-8 L0,-16 M-4,-12 L4,-12" strokeWidth="2" stroke="#FFD700" fill="none" />
      </g>
      
      <g transform="translate(220,200)" fill="#FFD700">
        <polygon points="0,-8 8,8 -8,8" />
        <line x1="0" y1="8" x2="0" y2="16" strokeWidth="2" stroke="#FFD700" />
      </g>
      
      {/* Bordas com cantos reforçados */}
      <rect x="15" y="15" width="270" height="370" fill="none" stroke="#FFD700" strokeWidth="1" />
      <g fill="#FFD700">
        <rect x="15" y="15" width="15" height="15" />
        <rect x="270" y="15" width="15" height="15" />
        <rect x="15" y="370" width="15" height="15" />
        <rect x="270" y="370" width="15" height="15" />
      </g>
      
      {/* Título */}
      <text x="150" y="280" textAnchor="middle" className="fill-yellow-400 text-lg font-bold">
        SIMBOLISMO
      </text>
      <text x="150" y="300" textAnchor="middle" className="fill-yellow-400 text-lg font-bold">
        E SIGILOS
      </text>
    </svg>
  ),

  "textos-filosoficos": (
    <svg viewBox="0 0 300 400" className="w-full h-full">
      <defs>
        <linearGradient id="blueGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1565C0" />
          <stop offset="100%" stopColor="#1976D2" />
        </linearGradient>
      </defs>
      
      {/* Capa azul */}
      <rect width="300" height="400" fill="url(#blueGold)" />
      
      {/* Bordas douradas clássicas */}
      <rect x="20" y="20" width="260" height="360" fill="none" stroke="#FFD700" strokeWidth="3" />
      <rect x="30" y="30" width="240" height="340" fill="none" stroke="#FFD700" strokeWidth="1" />
      
      {/* Pena e tinteiro */}
      <g transform="translate(100,100)">
        <path d="M0,0 Q5,-30 0,-60" fill="none" stroke="#FFD700" strokeWidth="3" />
        <path d="M0,-60 Q-10,-50 -5,-40 Q5,-45 0,-60" fill="#FFD700" />
        <ellipse cx="30" cy="10" rx="15" ry="8" fill="#FFD700" />
        <circle cx="30" cy="10" r="3" fill="#1565C0" />
      </g>
      
      {/* Símbolos filosóficos */}
      <g transform="translate(200,120)" fill="none" stroke="#FFD700" strokeWidth="2">
        <circle cx="0" cy="0" r="15" />
        <path d="M-10,-10 L10,10 M10,-10 L-10,10" />
      </g>
      
      {/* Linhas de texto simuladas */}
      <g fill="#FFD700" opacity="0.3">
        <rect x="50" y="200" width="200" height="2" />
        <rect x="50" y="210" width="180" height="2" />
        <rect x="50" y="220" width="190" height="2" />
      </g>
      
      {/* Título */}
      <text x="150" y="280" textAnchor="middle" className="fill-yellow-400 text-base font-bold">
        TEXTOS
      </text>
      <text x="150" y="300" textAnchor="middle" className="fill-yellow-400 text-base font-bold">
        FILOSÓFICOS
      </text>
      <text x="150" y="320" textAnchor="middle" className="fill-yellow-400 text-sm">
        E REFLEXÕES
      </text>
    </svg>
  ),

  "meditacoes-praticas": (
    <svg viewBox="0 0 300 400" className="w-full h-full">
      <defs>
        <linearGradient id="greenGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#388E3C" />
        </linearGradient>
      </defs>
      
      {/* Capa verde */}
      <rect width="300" height="400" fill="url(#greenGold)" />
      
      {/* Flor de lótus */}
      <g transform="translate(150,120)">
        <g fill="#FFD700" opacity="0.8">
          <ellipse cx="0" cy="-20" rx="8" ry="20" />
          <ellipse cx="17" cy="-10" rx="8" ry="20" transform="rotate(60 150 120)" />
          <ellipse cx="17" cy="10" rx="8" ry="20" transform="rotate(120 150 120)" />
          <ellipse cx="0" cy="20" rx="8" ry="20" />
          <ellipse cx="-17" cy="10" rx="8" ry="20" transform="rotate(240 150 120)" />
          <ellipse cx="-17" cy="-10" rx="8" ry="20" transform="rotate(300 150 120)" />
        </g>
        <circle cx="0" cy="0" r="10" fill="#FFD700" />
      </g>
      
      {/* Ondas zen */}
      <g fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.6">
        <path d="M50,200 Q100,190 150,200 Q200,210 250,200" />
        <path d="M50,220 Q100,210 150,220 Q200,230 250,220" />
        <path d="M50,240 Q100,230 150,240 Q200,250 250,240" />
      </g>
      
      {/* Bordas suaves */}
      <rect x="20" y="20" width="260" height="360" fill="none" stroke="#FFD700" strokeWidth="2" rx="10" />
      
      {/* Título */}
      <text x="150" y="300" textAnchor="middle" className="fill-yellow-400 text-base font-bold">
        MEDITAÇÕES
      </text>
      <text x="150" y="320" textAnchor="middle" className="fill-yellow-400 text-sm">
        E PRÁTICAS
      </text>
      <text x="150" y="340" textAnchor="middle" className="fill-yellow-400 text-sm">
        SIMPLES
      </text>
      
      {/* Elementos zen nos cantos */}
      <g fill="#FFD700" opacity="0.4">
        <circle cx="50" cy="50" r="4" />
        <circle cx="250" cy="50" r="4" />
        <circle cx="50" cy="350" r="4" />
        <circle cx="250" cy="350" r="4" />
      </g>
    </svg>
  )
};