import React, { useState } from 'react';
import { Search, ShoppingBag, X } from 'lucide-react';
import { SspLogo } from './SspLogo';
import { ProductCategory } from '../types';

interface TopNavProps {
  customLogoUrl: string | null;
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryCounts: Record<ProductCategory, number>;
}

export const TopNav: React.FC<TopNavProps> = ({
  customLogoUrl,
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  categoryCounts,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories: ProductCategory[] = [
    'All',
    'Rings',
    'Chains & Bracelets',
  ];

  return (
    <header className="relative w-full bg-[#121214] text-white overflow-hidden border-b border-[#F5C542]/20">
      {/* Dripping Purple Syrup Wave at Top of Header */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 48"
          className="w-full h-8 sm:h-10 text-[#6A0DAD]"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M 0,0 L 1440,0 L 1440,16 C 1390,28 1350,12 1300,18 C 1260,24 1240,46 1220,46 C 1200,46 1180,22 1140,16 C 1090,10 1060,38 1030,38 C 1000,38 970,14 920,18 C 870,22 840,48 810,48 C 780,48 760,16 710,14 C 660,12 630,42 600,42 C 570,42 540,18 490,18 C 440,18 410,44 380,44 C 350,44 330,12 280,14 C 230,16 200,36 170,36 C 140,36 120,16 70,16 C 40,16 20,28 0,28 Z" />
          {/* Dripping droplet accents */}
          <circle cx="1220" cy="47" r="3" fill="#6A0DAD" />
          <circle cx="810" cy="47" r="3.5" fill="#6A0DAD" />
          <circle cx="380" cy="45" r="3" fill="#6A0DAD" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-7 sm:pt-9 pb-4">
        {/* Main 3-Zone Navigation Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Left Zone: Search Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-[#1B1B22] hover:bg-[#252530] text-slate-200 border border-slate-700/80 hover:border-[#F5C542] transition-colors flex items-center gap-2 cursor-pointer shadow-sm group"
              aria-label="Toggle search"
              title="Search jewelry collection"
            >
              <Search className="w-4 h-4 text-[#F5C542] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-semibold text-slate-300">
                Search Pieces
              </span>
            </button>
          </div>

          {/* Center Zone: Centered SSP Crest Logo */}
          <div className="flex-1 flex justify-center">
            <a href="#catalog" className="inline-block transform hover:scale-[1.02] transition-transform">
              <SspLogo
                customLogoUrl={customLogoUrl}
                size="md"
                showSubtitle={true}
              />
            </a>
          </div>

          {/* Right Zone: Shopping Bag Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#6A0DAD] to-[#4C0680] hover:from-[#7E13CD] hover:to-[#5B089A] text-white border border-[#F5C542]/40 transition-all cursor-pointer shadow-md flex items-center gap-2 hover:shadow-[0_0_15px_rgba(245,197,66,0.3)] active:scale-95"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5 text-[#F5C542]" />
              <span className="hidden sm:inline text-xs font-bold tracking-wider uppercase text-white">
                Bag
              </span>
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-black bg-[#F5C542] text-[#121214] rounded-full shadow-sm">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Collapsible Search Input Bar */}
        {showSearchInput && (
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-center animate-fadeIn">
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search gold rings, Cuban links, rope chains, plug pendants..."
                className="w-full pl-10 pr-9 py-2 bg-[#1A1A22] border border-[#F5C542]/50 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5C542]"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Category Filter Buttons */}
        <div className="mt-5 flex items-center justify-center flex-wrap gap-2 sm:gap-3" id="catalog">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const label = cat === 'All' ? 'All Jewelry Boxes' : cat;
            const count = categoryCounts[cat] || 0;

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#F5C542] text-[#121214] font-bold shadow-[0_2px_10px_rgba(245,197,66,0.35)] ring-1 ring-[#FFF]'
                    : 'bg-[#1C1C24] text-slate-300 hover:text-white hover:bg-[#2A2A36] border border-slate-700/80'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? 'bg-[#121214] text-[#F5C542]'
                      : 'bg-[#2A2A36] text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
