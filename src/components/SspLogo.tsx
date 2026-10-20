import React from 'react';

interface SspLogoProps {
  customLogoUrl?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const SspLogo: React.FC<SspLogoProps> = ({
  customLogoUrl,
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const sizeMap = {
    sm: { w: 100, h: 70 },
    md: { w: 170, h: 120 },
    lg: { w: 230, h: 160 },
    xl: { w: 320, h: 220 },
  };

  const { w, h } = sizeMap[size];

  if (customLogoUrl) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <img
          src={customLogoUrl}
          alt="South Side Plugged Official Crest"
          className="object-contain drop-shadow-[0_8px_20px_rgba(106,13,173,0.35)] transition-transform hover:scale-105"
          style={{ width: `${w}px`, maxHeight: `${h}px` }}
          referrerPolicy="no-referrer"
        />
        {showSubtitle && (
          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-[#0A1E46]">
            <span>★</span>
            <span className="tracking-[0.25em] text-[#6A0DAD]">EST. TEXAS</span>
            <span>★</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 360 250"
        width={w * 1.5}
        height={h * 1.25}
        className="overflow-visible drop-shadow-[0_10px_25px_rgba(10,30,70,0.25)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Gold Gradients */}
          <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4B8" />
            <stop offset="25%" stopColor="#F5C542" />
            <stop offset="50%" stopColor="#D4A017" />
            <stop offset="75%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#B47A08" />
          </linearGradient>

          <linearGradient id="goldBevel" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C5C05" />
            <stop offset="40%" stopColor="#F5C542" />
            <stop offset="70%" stopColor="#FFF9D6" />
            <stop offset="100%" stopColor="#684200" />
          </linearGradient>

          {/* Texas Navy & Syrup Purple Gradients */}
          <linearGradient id="navyDrip" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0A1E46" />
            <stop offset="100%" stopColor="#051025" />
          </linearGradient>

          <linearGradient id="purpleSyrup" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="50%" stopColor="#6A0DAD" />
            <stop offset="100%" stopColor="#4C0680" />
          </linearGradient>

          {/* Diamond Sparkle Pattern */}
          <radialGradient id="paveDiamond" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#D8F3FF" />
            <stop offset="80%" stopColor="#9BD8FF" />
            <stop offset="100%" stopColor="#4FA0DF" />
          </radialGradient>

          {/* Filter for 3D bevel and glow */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
          </filter>

          {/* Arched text paths */}
          <path id="archTop" d="M 40,110 A 140,110 0 0,1 320,110" fill="none" />
          <path id="archBottom" d="M 65,185 A 130,95 0 0,0 295,185" fill="none" />
        </defs>

        {/* 1. Double Circular & Diamond Crest Frame */}
        <g id="crest-frame">
          {/* Outer Diamond Shield Outline */}
          <polygon
            points="180,8 335,115 180,225 25,115"
            fill="#121214"
            stroke="url(#goldSheen)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Inner Navy Diamond Inset */}
          <polygon
            points="180,18 320,115 180,213 40,115"
            fill="url(#navyDrip)"
            stroke="url(#goldBevel)"
            strokeWidth="1.5"
          />

          {/* Inner Circular Gold Ring */}
          <circle
            cx="180"
            cy="115"
            r="82"
            fill="none"
            stroke="url(#goldSheen)"
            strokeWidth="2.5"
            strokeDasharray="8 4"
          />
          <circle
            cx="180"
            cy="115"
            r="75"
            fill="#121214"
            fillOpacity="0.85"
            stroke="url(#purpleSyrup)"
            strokeWidth="2"
          />
        </g>

        {/* 2. Arched SOUTH SIDE PLUGGED Block Text */}
        <text
          fill="url(#goldSheen)"
          fontSize="12.5"
          fontFamily="'Cinzel', serif"
          fontWeight="900"
          letterSpacing="4"
          filter="url(#goldGlow)"
        >
          <textPath href="#archTop" startOffset="50%" textAnchor="middle">
            SOUTH SIDE PLUGGED
          </textPath>
        </text>

        {/* 3. Three 2-Prong Electrical Plugs (Curving from letters) */}
        {/* Left Plug (curving from left S) */}
        <g id="left-plug" transform="translate(68, 140) rotate(-25)">
          <path d="M 0,0 C -12,12 -18,28 -12,38 C -7,46 2,42 6,34 L 10,24" fill="none" stroke="url(#goldSheen)" strokeWidth="4.5" strokeLinecap="round" />
          {/* Plug head */}
          <rect x="-8" y="36" width="16" height="10" rx="3" fill="#121214" stroke="url(#goldSheen)" strokeWidth="1.5" />
          {/* 2 Prongs */}
          <rect x="-6" y="46" width="3" height="10" rx="1" fill="url(#goldSheen)" />
          <rect x="3" y="46" width="3" height="10" rx="1" fill="url(#goldSheen)" />
        </g>

        {/* Center/Bottom Plug */}
        <g id="center-plug" transform="translate(180, 168)">
          <path d="M 0,0 C 4,14 10,25 0,38" fill="none" stroke="url(#goldSheen)" strokeWidth="4.5" strokeLinecap="round" />
          {/* Plug head */}
          <rect x="-8" y="38" width="16" height="10" rx="3" fill="#121214" stroke="url(#goldSheen)" strokeWidth="1.5" />
          {/* 2 Prongs */}
          <rect x="-6" y="48" width="3" height="10" rx="1" fill="url(#goldSheen)" />
          <rect x="3" y="48" width="3" height="10" rx="1" fill="url(#goldSheen)" />
        </g>

        {/* Right Plug (curving from right P) */}
        <g id="right-plug" transform="translate(288, 138) rotate(22)">
          <path d="M 0,0 C 14,12 18,26 12,38 C 6,48 -2,44 -6,34 L -10,24" fill="none" stroke="url(#goldSheen)" strokeWidth="4.5" strokeLinecap="round" />
          {/* Plug head */}
          <rect x="-8" y="36" width="16" height="10" rx="3" fill="#121214" stroke="url(#goldSheen)" strokeWidth="1.5" />
          {/* 2 Prongs */}
          <rect x="-6" y="46" width="3" height="10" rx="1" fill="url(#goldSheen)" />
          <rect x="3" y="46" width="3" height="10" rx="1" fill="url(#goldSheen)" />
        </g>

        {/* 4. 3D Beveled Old English "SSP" Letters with Recessed Diamond-Pavé Channels */}
        <g id="ssp-letters" filter="url(#goldGlow)">
          {/* Left 'S' */}
          <g transform="translate(110, 115)">
            {/* Outer Gold Bevel Path */}
            <path
              d="M 12,-35 C 2,-35 -8,-28 -8,-16 C -8,-2 4,6 16,10 C 26,14 30,19 30,26 C 30,35 20,41 6,41 C -8,41 -18,34 -20,22 L -7,20 C -6,28 0,32 8,32 C 16,32 20,28 20,22 C 20,15 12,10 0,6 C -12,2 -18,-7 -18,-18 C -18,-30 -8,-42 10,-42 C 22,-42 30,-35 32,-24 L 20,-22 C 18,-29 14,-35 12,-35 Z"
              fill="url(#goldSheen)"
              stroke="#684200"
              strokeWidth="2.5"
            />
            {/* Inner Recessed Channel with Diamond Pavé Sparkles */}
            <circle cx="12" cy="-28" r="2.8" fill="url(#paveDiamond)" />
            <circle cx="3" cy="-22" r="2.4" fill="url(#paveDiamond)" />
            <circle cx="-1" cy="-14" r="2.6" fill="url(#paveDiamond)" />
            <circle cx="5" cy="0" r="2.8" fill="url(#paveDiamond)" />
            <circle cx="15" cy="12" r="2.6" fill="url(#paveDiamond)" />
            <circle cx="21" cy="22" r="2.8" fill="url(#paveDiamond)" />
            <circle cx="10" cy="30" r="2.6" fill="url(#paveDiamond)" />
            <circle cx="0" cy="28" r="2.4" fill="url(#paveDiamond)" />
          </g>

          {/* Center 'S' (Larger & Elevated) */}
          <g transform="translate(180, 112)">
            <path
              d="M 16,-46 C 4,-46 -12,-36 -12,-20 C -12,-4 4,6 20,12 C 34,17 38,24 38,34 C 38,46 24,54 6,54 C -12,54 -24,44 -26,28 L -10,26 C -8,36 0,42 10,42 C 20,42 26,36 26,28 C 26,20 16,14 0,8 C -16,3 -24,-8 -24,-24 C -24,-39 -10,-55 14,-55 C 28,-55 40,-45 42,-30 L 26,-28 C 24,-37 18,-46 16,-46 Z"
              fill="url(#goldBevel)"
              stroke="#402500"
              strokeWidth="3"
            />
            {/* Diamond Pavé dots inside center S */}
            <circle cx="14" cy="-38" r="3.2" fill="url(#paveDiamond)" />
            <circle cx="2" cy="-30" r="3" fill="url(#paveDiamond)" />
            <circle cx="-4" cy="-20" r="3.2" fill="url(#paveDiamond)" />
            <circle cx="-3" cy="-8" r="3" fill="url(#paveDiamond)" />
            <circle cx="7" cy="2" r="3.2" fill="url(#paveDiamond)" />
            <circle cx="18" cy="12" r="3.2" fill="url(#paveDiamond)" />
            <circle cx="25" cy="24" r="3.2" fill="url(#paveDiamond)" />
            <circle cx="16" cy="36" r="3.2" fill="url(#paveDiamond)" />
            <circle cx="2" cy="34" r="3" fill="url(#paveDiamond)" />
          </g>

          {/* Right 'P' */}
          <g transform="translate(245, 116)">
            <path
              d="M -18,-40 L 8,-40 C 22,-40 32,-30 32,-16 C 32,-2 22,8 8,8 L -6,8 L -6,38 L -18,38 Z M -6,-28 L -6,-4 L 6,-4 C 14,-4 20,-9 20,-16 C 20,-23 14,-28 6,-28 Z"
              fill="url(#goldSheen)"
              stroke="#684200"
              strokeWidth="2.5"
            />
            {/* Diamond Pavé inside P loop & stem */}
            <circle cx="-12" cy="-24" r="2.8" fill="url(#paveDiamond)" />
            <circle cx="-12" cy="-8" r="2.8" fill="url(#paveDiamond)" />
            <circle cx="-12" cy="10" r="2.8" fill="url(#paveDiamond)" />
            <circle cx="-12" cy="26" r="2.8" fill="url(#paveDiamond)" />
            <circle cx="2" cy="-30" r="2.6" fill="url(#paveDiamond)" />
            <circle cx="14" cy="-24" r="2.8" fill="url(#paveDiamond)" />
            <circle cx="15" cy="-8" r="2.8" fill="url(#paveDiamond)" />
            <circle cx="4" cy="-2" r="2.6" fill="url(#paveDiamond)" />
          </g>
        </g>

        {/* 5. Gold Drips Dropping from Letters */}
        <g id="gold-drips" fill="url(#goldSheen)">
          {/* Drop under Left S */}
          <path d="M 102,142 C 102,142 98,154 98,159 C 98,162 102,165 105,162 C 108,159 106,142 106,142 Z" />
          {/* Drop under Center S */}
          <path d="M 168,156 C 168,156 166,170 166,176 C 166,180 171,183 174,180 C 177,177 174,156 174,156 Z" />
          <circle cx="170" cy="188" r="2.5" />
          {/* Drop under P */}
          <path d="M 238,150 C 238,150 236,162 236,167 C 236,171 241,173 243,170 C 245,167 244,150 244,150 Z" />
        </g>

        {/* 6. Three Floating Diamond Icons */}
        {/* Top Left Diamond */}
        <g transform="translate(68, 55) scale(0.9)">
          <polygon points="0,-10 10,-3 6,10 -6,10 -10,-3" fill="url(#paveDiamond)" stroke="#FFF" strokeWidth="1" />
          <polygon points="0,-10 0,10" stroke="#FFF" strokeWidth="0.8" opacity="0.8" />
          {/* Sparkle glint */}
          <path d="M 0,-14 L 0,-6 M -4,-10 L 4,-10" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Top Center-Right Diamond */}
        <g transform="translate(290, 56) scale(0.9)">
          <polygon points="0,-10 10,-3 6,10 -6,10 -10,-3" fill="url(#paveDiamond)" stroke="#FFF" strokeWidth="1" />
          <polygon points="0,-10 0,10" stroke="#FFF" strokeWidth="0.8" opacity="0.8" />
          <path d="M 0,-14 L 0,-6 M -4,-10 L 4,-10" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Apex Crown Diamond */}
        <g transform="translate(180, 24) scale(1.1)">
          <polygon points="0,-12 12,-4 7,12 -7,12 -12,-4" fill="url(#paveDiamond)" stroke="#FFF" strokeWidth="1.2" />
          <polygon points="0,-12 0,12" stroke="#FFF" strokeWidth="0.9" opacity="0.9" />
          {/* 4-point star glint */}
          <path d="M 0,-17 L 0,-7 M -5,-12 L 5,-12" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* 7. Arched "★ EST. TEXAS ★" text */}
        <text
          fill="url(#goldSheen)"
          fontSize="11.5"
          fontFamily="'Cinzel', serif"
          fontWeight="800"
          letterSpacing="3"
        >
          <textPath href="#archBottom" startOffset="50%" textAnchor="middle">
            ★ EST. TEXAS ★
          </textPath>
        </text>
      </svg>
    </div>
  );
};
