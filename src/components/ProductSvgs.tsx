import React from 'react';

interface ProductSvgProps {
  type: string;
  className?: string;
}

export const ProductSvg: React.FC<ProductSvgProps> = ({ type, className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#18181B] via-[#121214] to-[#0A0D14] rounded-lg select-none group-hover:scale-[1.02] transition-transform duration-300 ${className}`}>
      {/* Background jewelry velvet sheen & subtle gold ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,197,66,0.18)_0%,_rgba(10,30,70,0.15)_45%,_transparent_75%)] pointer-events-none" />

      {/* Embedded Studio Visual based on type */}
      {renderGoldJewelrySvg(type)}
    </div>
  );
};

function renderGoldJewelrySvg(type: string) {
  switch (type) {
    case 'cuban-bracelet':
      return (
        <svg viewBox="0 0 240 240" className="w-[85%] h-[85%] drop-shadow-[0_12px_24px_rgba(245,197,66,0.35)]">
          <defs>
            <linearGradient id="cubanGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFF2A6" />
              <stop offset="35%" stopColor="#F5C542" />
              <stop offset="65%" stopColor="#BD8506" />
              <stop offset="100%" stopColor="#F7CE5E" />
            </linearGradient>
            <linearGradient id="linkDepth" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A2F00" />
              <stop offset="100%" stopColor="#1A1100" />
            </linearGradient>
          </defs>

          <g transform="translate(120, 110)">
            {[-60, -42, -24, -6, 12, 30, 48, 66].map((deg, i) => (
              <g key={`link-${i}`} transform={`rotate(${deg}) translate(0, -68)`}>
                <ellipse cx="0" cy="0" rx="16" ry="24" fill="url(#cubanGold)" stroke="#684200" strokeWidth="2" />
                <ellipse cx="0" cy="0" rx="7" ry="14" fill="url(#linkDepth)" />
                <rect x="-14" y="-3" width="28" height="6" fill="#FFF8D1" opacity="0.45" />
              </g>
            ))}

            <g transform="translate(0, 52)">
              <rect x="-32" y="-14" width="64" height="28" rx="5" fill="url(#cubanGold)" stroke="#684200" strokeWidth="2.5" />
              <circle cx="-28" cy="0" r="4.5" fill="#4A2F00" />
              <circle cx="28" cy="0" r="4.5" fill="#4A2F00" />
              <path d="M -26,-10 L -22,-6 L -26,-2" stroke="#FFF" strokeWidth="1.2" fill="none" />
              <path d="M 26,-10 L 22,-6 L 26,-2" stroke="#FFF" strokeWidth="1.2" fill="none" />
              <text x="0" y="3" textAnchor="middle" fill="#3D2400" fontSize="9" fontFamily="'Cinzel', serif" fontWeight="900" letterSpacing="1">
                14K · SSP
              </text>
            </g>
          </g>

          <text x="120" y="210" textAnchor="middle" fill="#F5C542" opacity="0.7" fontSize="10" fontFamily="'Space Mono', monospace" letterSpacing="3">8.5MM MIAMI CUBAN · PURE GOLD</text>
        </svg>
      );

    case 'two-face-ring':
      return (
        <svg viewBox="0 0 240 240" className="w-[85%] h-[85%] drop-shadow-[0_12px_24px_rgba(245,197,66,0.35)]">
          <defs>
            <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF5BF" />
              <stop offset="35%" stopColor="#F5C542" />
              <stop offset="70%" stopColor="#C28705" />
              <stop offset="100%" stopColor="#553800" />
            </linearGradient>
          </defs>

          <g transform="translate(120, 125)">
            <ellipse cx="0" cy="18" rx="58" ry="46" fill="none" stroke="url(#ringGold)" strokeWidth="16" />
            <ellipse cx="0" cy="18" rx="58" ry="46" fill="none" stroke="#3D2400" strokeWidth="1.5" />

            <ellipse cx="0" cy="-22" rx="54" ry="44" fill="#141418" stroke="url(#ringGold)" strokeWidth="4.5" />

            {/* Left Comedy Face */}
            <g transform="translate(-22, -22) scale(0.9)">
              <path d="M -16,-20 C -2,-26 12,-20 16,-8 C 18,6 12,22 -2,22 C -16,22 -22,6 -20,-8 Z" fill="url(#ringGold)" stroke="#4A2F00" strokeWidth="1.5" />
              <path d="M -12,-8 C -8,-14 -4,-8 -4,-8" stroke="#331E00" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              <path d="M 4,-8 C 8,-14 12,-8 12,-8" stroke="#331E00" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              <path d="M -10,6 C -2,16 6,14 10,6 Z" fill="#201100" stroke="url(#ringGold)" strokeWidth="1" />
            </g>

            {/* Right Tragedy Face */}
            <g transform="translate(22, -22) scale(0.9)">
              <path d="M -16,-20 C -2,-26 12,-20 16,-8 C 18,6 12,22 -2,22 C -16,22 -22,6 -20,-8 Z" fill="url(#ringGold)" stroke="#4A2F00" strokeWidth="1.5" />
              <path d="M -12,-12 L -4,-6" stroke="#331E00" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 12,-12 L 4,-6" stroke="#331E00" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M -10,12 C -2,4 6,4 10,12" stroke="#201100" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <circle cx="-6" cy="2" r="1.8" fill="#FFF4B8" />
            </g>
          </g>

          <text x="120" y="210" textAnchor="middle" fill="#F5C542" opacity="0.7" fontSize="10" fontFamily="'Space Mono', monospace" letterSpacing="3">14K DUAL PERSONA · SOLID GOLD</text>
        </svg>
      );

    case 'winged-ring':
      return (
        <svg viewBox="0 0 240 240" className="w-[85%] h-[85%] drop-shadow-[0_12px_24px_rgba(245,197,66,0.35)]">
          <defs>
            <linearGradient id="wingGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8D1" />
              <stop offset="35%" stopColor="#F5C542" />
              <stop offset="75%" stopColor="#C28705" />
              <stop offset="100%" stopColor="#553800" />
            </linearGradient>
          </defs>

          <g transform="translate(120, 125)">
            <ellipse cx="0" cy="18" rx="60" ry="48" fill="none" stroke="url(#wingGold)" strokeWidth="14" />

            {/* Left Wing */}
            <g transform="translate(-10, -26)">
              <path d="M 0,0 C -25,-15 -55,-20 -70,-5 C -65,10 -40,15 -15,10 Z" fill="url(#wingGold)" stroke="#4A2F00" strokeWidth="1.5" />
              <path d="M -20,-3 C -40,-12 -60,-10 -68,-4" stroke="#FFF" strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M -15,3 C -35,-4 -52,-2 -60,4" stroke="#4A2F00" strokeWidth="1.2" fill="none" />
              <path d="M -10,8 C -28,4 -42,5 -50,11" stroke="#4A2F00" strokeWidth="1.2" fill="none" />
            </g>

            {/* Right Wing */}
            <g transform="translate(10, -26) scale(-1, 1)">
              <path d="M 0,0 C -25,-15 -55,-20 -70,-5 C -65,10 -40,15 -15,10 Z" fill="url(#wingGold)" stroke="#4A2F00" strokeWidth="1.5" />
              <path d="M -20,-3 C -40,-12 -60,-10 -68,-4" stroke="#FFF" strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M -15,3 C -35,-4 -52,-2 -60,4" stroke="#4A2F00" strokeWidth="1.2" fill="none" />
              <path d="M -10,8 C -28,4 -42,5 -50,11" stroke="#4A2F00" strokeWidth="1.2" fill="none" />
            </g>

            {/* Center Stepped Gold Crown (Pure Gold, No Stones) */}
            <rect x="-16" y="-38" width="32" height="34" rx="4" fill="url(#wingGold)" stroke="#684200" strokeWidth="3" />
            <rect x="-10" y="-32" width="20" height="22" rx="2" fill="#FFEAA0" stroke="#8C5C05" strokeWidth="1.5" />
            <polygon points="-6,-28 6,-28 0,-14" fill="url(#wingGold)" />
          </g>

          <text x="120" y="210" textAnchor="middle" fill="#F5C542" opacity="0.7" fontSize="10" fontFamily="'Space Mono', monospace" letterSpacing="3">14K WINGED EMBLEM · SOVEREIGN GOLD</text>
        </svg>
      );

    case 'lone-star-ring':
      return (
        <svg viewBox="0 0 240 240" className="w-[85%] h-[85%] drop-shadow-[0_12px_24px_rgba(245,197,66,0.35)]">
          <defs>
            <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9D6" />
              <stop offset="35%" stopColor="#F5C542" />
              <stop offset="70%" stopColor="#BD8506" />
              <stop offset="100%" stopColor="#4A2F00" />
            </linearGradient>
          </defs>

          <g transform="translate(120, 125)">
            <ellipse cx="0" cy="18" rx="60" ry="46" fill="none" stroke="url(#starGold)" strokeWidth="16" />
            <line x1="-54" y1="0" x2="-44" y2="28" stroke="#3D2400" strokeWidth="2.5" />
            <line x1="-48" y1="-4" x2="-38" y2="32" stroke="#3D2400" strokeWidth="2.5" />
            <line x1="54" y1="0" x2="44" y2="28" stroke="#3D2400" strokeWidth="2.5" />
            <line x1="48" y1="-4" x2="38" y2="32" stroke="#3D2400" strokeWidth="2.5" />

            {/* Octagonal Sovereign Top Crown */}
            <polygon
              points="-38,-45 38,-45 52,-15 52,10 38,25 -38,25 -52,10 -52,-15"
              fill="#0D0D10"
              stroke="url(#starGold)"
              strokeWidth="4"
            />

            {/* Fluted Gold Rays (Pure Gold, No Stones) */}
            {[-32, -16, 0, 16, 32].map((x) => (
              <line key={`r-t-${x}`} x1={x} y1="-38" x2={x} y2="-32" stroke="url(#starGold)" strokeWidth="3" strokeLinecap="round" />
            ))}
            {[-32, -16, 0, 16, 32].map((x) => (
              <line key={`r-b-${x}`} x1={x} y1="18" x2={x} y2="12" stroke="url(#starGold)" strokeWidth="3" strokeLinecap="round" />
            ))}

            {/* Raised 5-Point Texas Lone Star */}
            <g transform="translate(0, -10) scale(1.15)">
              <polygon
                points="0,-24 7,-8 24,-7 11,4 16,21 0,11 -16,21 -11,4 -24,-7 -7,-8"
                fill="url(#starGold)"
                stroke="#684200"
                strokeWidth="1.8"
              />
              <polygon points="0,-24 0,11 7,-8" fill="#FFF9D6" opacity="0.8" />
              <polygon points="24,-7 0,11 11,4" fill="#FFF4B8" opacity="0.7" />
              <polygon points="-24,-7 0,11 -11,4" fill="#C28705" />
            </g>
          </g>

          <text x="120" y="210" textAnchor="middle" fill="#F5C542" opacity="0.7" fontSize="10" fontFamily="'Space Mono', monospace" letterSpacing="3">TEXAS LONE STAR · 14K SOLID GOLD</text>
        </svg>
      );

    case 'plug-pendant':
      return (
        <svg viewBox="0 0 240 240" className="w-[85%] h-[85%] drop-shadow-[0_12px_24px_rgba(245,197,66,0.35)]">
          <defs>
            <linearGradient id="pendantGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF7CC" />
              <stop offset="30%" stopColor="#F5C542" />
              <stop offset="70%" stopColor="#B8860B" />
              <stop offset="100%" stopColor="#553800" />
            </linearGradient>
          </defs>

          {/* 3mm Gold Rope Chain draped on top */}
          <path d="M 40,10 C 80,45 160,45 200,10" fill="none" stroke="url(#pendantGold)" strokeWidth="5.5" strokeDasharray="4 2" />

          {/* Signature 2-Prong Electrical Plug Bail */}
          <g transform="translate(120, 48)">
            <ellipse cx="0" cy="-12" rx="14" ry="12" fill="none" stroke="url(#pendantGold)" strokeWidth="4.5" />
            <rect x="-16" y="-4" width="32" height="18" rx="4" fill="#141418" stroke="url(#pendantGold)" strokeWidth="2.5" />
            <rect x="-11" y="14" width="6" height="12" rx="1.5" fill="url(#pendantGold)" stroke="#684200" strokeWidth="1" />
            <rect x="5" y="14" width="6" height="12" rx="1.5" fill="url(#pendantGold)" stroke="#684200" strokeWidth="1" />
          </g>

          {/* 3D Beveled Gold "SSP" Letters (Pure Gold, No Stones) */}
          <g transform="translate(120, 130)">
            <rect x="-70" y="-35" width="140" height="70" rx="12" fill="#0C0C0E" stroke="url(#pendantGold)" strokeWidth="4.5" />

            {/* Left S */}
            <g transform="translate(-44, 0)">
              <text x="0" y="14" textAnchor="middle" fill="url(#pendantGold)" fontSize="38" fontFamily="'Cinzel', serif" fontWeight="900" stroke="#8C5C05" strokeWidth="1.5">
                S
              </text>
            </g>

            {/* Center S (Elevated) */}
            <g transform="translate(0, 0)">
              <text x="0" y="16" textAnchor="middle" fill="#FFF4B8" fontSize="44" fontFamily="'Cinzel', serif" fontWeight="900" stroke="#8C5C05" strokeWidth="2">
                S
              </text>
            </g>

            {/* Right P */}
            <g transform="translate(44, 0)">
              <text x="0" y="14" textAnchor="middle" fill="url(#pendantGold)" fontSize="38" fontFamily="'Cinzel', serif" fontWeight="900" stroke="#8C5C05" strokeWidth="1.5">
                P
              </text>
            </g>

            {/* Gold Drips */}
            <path d="M -30,35 C -30,44 -26,48 -24,44 C -22,40 -22,35 -22,35" fill="url(#pendantGold)" />
            <path d="M 0,35 C 0,48 4,52 6,48 C 8,44 8,35 8,35" fill="url(#pendantGold)" />
            <circle cx="4" cy="56" r="2.5" fill="url(#pendantGold)" />
            <path d="M 32,35 C 32,44 36,47 38,44 C 40,40 40,35 40,35" fill="url(#pendantGold)" />
          </g>

          <text x="120" y="210" textAnchor="middle" fill="#F5C542" opacity="0.7" fontSize="10" fontFamily="'Space Mono', monospace" letterSpacing="3">SSP SOLID GOLD PLUG PENDANT</text>
        </svg>
      );

    case 'nugget-ring':
      return (
        <svg viewBox="0 0 240 240" className="w-[85%] h-[85%] drop-shadow-[0_12px_24px_rgba(245,197,66,0.35)]">
          <defs>
            <linearGradient id="nuggetGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4B8" />
              <stop offset="35%" stopColor="#F5C542" />
              <stop offset="70%" stopColor="#A86E00" />
              <stop offset="100%" stopColor="#553500" />
            </linearGradient>
            <linearGradient id="nuggetHighlight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFDD0" />
              <stop offset="50%" stopColor="#E2A91D" />
              <stop offset="100%" stopColor="#7E4C00" />
            </linearGradient>
          </defs>

          <g transform="translate(120, 125)">
            <ellipse cx="0" cy="18" rx="60" ry="46" fill="none" stroke="url(#nuggetGold)" strokeWidth="16" />

            {/* Heavy Nugget Signet Face */}
            <g transform="translate(0, -20)">
              <polygon
                points="-46,-25 -16,-38 24,-36 48,-14 42,22 18,36 -22,34 -48,12"
                fill="url(#nuggetGold)"
                stroke="#553500"
                strokeWidth="2.5"
              />
              <polygon points="-16,-38 4,-12 -34,-10 -46,-25" fill="url(#nuggetHighlight)" opacity="0.9" />
              <polygon points="-16,-38 24,-36 14,-8 4,-12" fill="#FFF2A0" opacity="0.85" />
              <polygon points="24,-36 48,-14 26,4 14,-8" fill="url(#nuggetGold)" />
              <polygon points="48,-14 42,22 12,14 26,4" fill="url(#nuggetHighlight)" />
              <polygon points="42,22 18,36 -4,18 12,14" fill="#C28705" />
              <polygon points="18,36 -22,34 -16,8 -4,18" fill="url(#nuggetHighlight)" />
              <polygon points="-22,34 -48,12 -24,0 -16,8" fill="#8C5C05" />
            </g>
          </g>

          <text x="120" y="210" textAnchor="middle" fill="#F5C542" opacity="0.7" fontSize="10" fontFamily="'Space Mono', monospace" letterSpacing="3">TEXAS RAW NUGGET · 10K SOVEREIGN</text>
        </svg>
      );

    case 'rope-chain':
      return (
        <svg viewBox="0 0 240 240" className="w-[85%] h-[85%] drop-shadow-[0_12px_24px_rgba(245,197,66,0.35)]">
          <defs>
            <linearGradient id="ropeGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9D6" />
              <stop offset="35%" stopColor="#F5C542" />
              <stop offset="70%" stopColor="#C28705" />
              <stop offset="100%" stopColor="#553800" />
            </linearGradient>
          </defs>

          <g transform="translate(120, 115)">
            {/* Sinuous Diamond-Cut French Rope Curves */}
            {[-70, -50, -30, -10, 10, 30, 50, 70].map((deg, i) => (
              <g key={`rope-${i}`} transform={`rotate(${deg}) translate(0, -68)`}>
                {/* Twisted rope spiral segments */}
                <ellipse cx="-4" cy="-4" rx="8" ry="12" fill="url(#ropeGold)" stroke="#684200" strokeWidth="1.2" transform="rotate(35)" />
                <ellipse cx="4" cy="4" rx="8" ry="12" fill="url(#ropeGold)" stroke="#684200" strokeWidth="1.2" transform="rotate(-35)" />
                {/* Diamond cut glint lines */}
                <line x1="-3" y1="-8" x2="3" y2="8" stroke="#FFF" strokeWidth="1" opacity="0.7" />
              </g>
            ))}

            {/* Inner Spiral Drape */}
            {[-45, -20, 0, 20, 45].map((deg, i) => (
              <g key={`rope-in-${i}`} transform={`rotate(${deg}) translate(0, -36)`}>
                <ellipse cx="0" cy="0" rx="7" ry="10" fill="url(#ropeGold)" stroke="#684200" strokeWidth="1" transform="rotate(25)" />
              </g>
            ))}

            {/* Heavy-duty Lobster Clasp */}
            <g transform="translate(0, 52)">
              <rect x="-18" y="-8" width="36" height="16" rx="4" fill="url(#ropeGold)" stroke="#553800" strokeWidth="2" />
              <circle cx="10" cy="0" r="3" fill="#201100" />
              <text x="0" y="3" textAnchor="middle" fill="#3D2400" fontSize="7" fontFamily="'Space Mono', monospace" fontWeight="bold">
                14K
              </text>
            </g>
          </g>

          <text x="120" y="210" textAnchor="middle" fill="#F5C542" opacity="0.7" fontSize="10" fontFamily="'Space Mono', monospace" letterSpacing="3">4MM DIAMOND-CUT ROPE · 14K GOLD</text>
        </svg>
      );

    case 'cuban-chain':
      return (
        <svg viewBox="0 0 240 240" className="w-[85%] h-[85%] drop-shadow-[0_12px_24px_rgba(245,197,66,0.35)]">
          <defs>
            <linearGradient id="chainGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A6" />
              <stop offset="35%" stopColor="#F5C542" />
              <stop offset="65%" stopColor="#BD8506" />
              <stop offset="100%" stopColor="#F7CE5E" />
            </linearGradient>
            <linearGradient id="linkHole" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A2F00" />
              <stop offset="100%" stopColor="#1A1100" />
            </linearGradient>
          </defs>

          <g transform="translate(120, 115)">
            {/* Outer Arc of Heavy 7mm Cuban Links */}
            {[-75, -55, -35, -15, 5, 25, 45, 65, 85].map((deg, i) => (
              <g key={`clink-${i}`} transform={`rotate(${deg}) translate(0, -68)`}>
                <ellipse cx="0" cy="0" rx="14" ry="22" fill="url(#chainGold)" stroke="#684200" strokeWidth="2" />
                <ellipse cx="0" cy="0" rx="6" ry="12" fill="url(#linkHole)" />
                <rect x="-12" y="-2" width="24" height="4" fill="#FFF8D1" opacity="0.5" />
              </g>
            ))}

            {/* Inner Layer Arc */}
            {[-45, -20, 5, 30, 55].map((deg, i) => (
              <g key={`clink-in-${i}`} transform={`rotate(${deg}) translate(0, -34)`}>
                <ellipse cx="0" cy="0" rx="11" ry="16" fill="url(#chainGold)" stroke="#684200" strokeWidth="1.5" />
                <ellipse cx="0" cy="0" rx="5" ry="9" fill="url(#linkHole)" />
              </g>
            ))}

            {/* Signature Box Clasp */}
            <g transform="translate(0, 52)">
              <rect x="-26" y="-12" width="52" height="24" rx="4" fill="url(#chainGold)" stroke="#684200" strokeWidth="2" />
              <circle cx="-22" cy="0" r="3.5" fill="#3D2400" />
              <circle cx="22" cy="0" r="3.5" fill="#3D2400" />
              <text x="0" y="3" textAnchor="middle" fill="#3D2400" fontSize="8" fontFamily="'Cinzel', serif" fontWeight="900">
                14K · SSP
              </text>
            </g>
          </g>

          <text x="120" y="210" textAnchor="middle" fill="#F5C542" opacity="0.7" fontSize="10" fontFamily="'Space Mono', monospace" letterSpacing="3">7MM MIAMI CUBAN CHAIN · 14K GOLD</text>
        </svg>
      );

    default:
      return null;
  }
}
