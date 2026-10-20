/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from './data/products';
import {
  Product,
  CartItem,
  OwnerSettings,
  CallbackTicket,
  ProductCategory,
} from './types';
import { CountdownBar } from './components/CountdownBar';
import { TopNav } from './components/TopNav';
import { JewelryBoxCard } from './components/JewelryBoxCard';
import { BagDrawer } from './components/BagDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PaymentSetupModal } from './components/PaymentSetupModal';
import { LogoUploadModal } from './components/LogoUploadModal';
import { TicketsModal } from './components/TicketsModal';
import { PlugBotModal } from './components/PlugBotModal';
import { GoldCareModal } from './components/GoldCareModal';
import { ShieldCheck, Sparkles, MessageCircle, Truck, Award, CheckCircle, Droplets, BookOpen, Zap, ArrowRight, ShoppingBag } from 'lucide-react';

const DEFAULT_SETTINGS: OwnerSettings = {
  cashAppTag: '$SouthSidePlugged',
  zelleContact: 'israelbm06@gmail.com',
  phone: '(713) 555-0199',
  email: 'israelbm06@gmail.com',
  stripeSquareUrl: 'https://checkout.stripe.com/c/pay/cs_live_ssp',
  payPalHandle: 'SouthSidePlugged',
  shopifyDomain: 'southsideplugged.myshopify.com',
  customLogoDataUrl: null,
};

const INITIAL_TICKETS: CallbackTicket[] = [
  {
    id: '#TKT-9201',
    customerName: 'Marcus Trevino',
    contactInfo: '(832) 714-9921',
    inquiry: 'Interested in the 14k Solid Gold SSP Plug Pendant bundled with the 14k Cuban Link chain. What is the total gram weight?',
    timestamp: '15 mins ago',
    status: 'New',
    productOfInterest: '14k Solid Gold SSP Plug Pendant & Chain',
  },
];

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ssp_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Owner Settings State (Persisted in localStorage)
  const [ownerSettings, setOwnerSettings] = useState<OwnerSettings>(() => {
    try {
      const saved = localStorage.getItem('ssp_owner_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Callback Tickets State (Persisted in localStorage)
  const [tickets, setTickets] = useState<CallbackTicket[]>(() => {
    try {
      const saved = localStorage.getItem('ssp_tickets');
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch {
      return INITIAL_TICKETS;
    }
  });

  // Modals Visibility
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentSetupOpen, setIsPaymentSetupOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isTicketsModalOpen, setIsTicketsModalOpen] = useState(false);
  const [isPlugBotOpen, setIsPlugBotOpen] = useState(false);
  const [isGoldCareOpen, setIsGoldCareOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ssp_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync owner settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ssp_owner_settings', JSON.stringify(ownerSettings));
    } catch (e) {
      console.error(e);
    }
  }, [ownerSettings]);

  // Sync tickets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ssp_tickets', JSON.stringify(tickets));
    } catch (e) {
      console.error(e);
    }
  }, [tickets]);

  // Cart Handlers
  const handleAddToCart = (newItem: Omit<CartItem, 'id'>, openDrawer = false) => {
    const itemInstanceId = `${newItem.productId}-${newItem.selectedSize}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemInstanceId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemInstanceId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, { ...newItem, id: itemInstanceId }];
    });

    if (openDrawer) {
      setIsBagOpen(true);
    }
  };

  const handleDirectCheckout = (newItem: Omit<CartItem, 'id'>) => {
    handleAddToCart(newItem, false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Ticket Handlers
  const handleTicketCreated = (newTicket: CallbackTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  const handleUpdateTicketStatus = (
    id: string,
    status: 'New' | 'Contacted' | 'Resolved'
  ) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const handleDeleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  // Logo Handlers
  const handleSaveLogo = (logoUrl: string | null) => {
    setOwnerSettings((prev) => ({
      ...prev,
      customLogoDataUrl: logoUrl,
    }));
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === 'All' ? true : p.category === activeCategory;
    const matchesQuery = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.specs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.stone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.karat.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesQuery;
  });

  const categoryCounts: Record<ProductCategory, number> = {
    All: products.length,
    Rings: products.filter((p) => p.category === 'Rings').length,
    'Chains & Bracelets': products.filter((p) => p.category === 'Chains & Bracelets').length,
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalUSD = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen text-[#121214] ssp-page-texture relative selection:bg-[#6A0DAD] selection:text-white pb-20">
      {/* Left-Side Texas Navy and Gold Vertical Stripe */}
      <div className="ssp-texas-stripe hidden sm:block" />

      {/* 1. Sticky Sale Bar with Split-Digit Flip Timer */}
      <CountdownBar
        onOpenLogoModal={() => setIsLogoModalOpen(true)}
        onOpenTicketsModal={() => setIsTicketsModalOpen(true)}
        onOpenPaymentsModal={() => setIsPaymentSetupOpen(true)}
        ticketCount={tickets.filter((t) => t.status === 'New').length}
      />

      {/* 2. Top Navigation & Centered SSP Crest */}
      <TopNav
        customLogoUrl={ownerSettings.customLogoDataUrl}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        cartCount={totalCartCount}
        onOpenCart={() => setIsBagOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryCounts={categoryCounts}
      />

      {/* Hero Trust Bar */}
      <div className="bg-[#0A1E46] text-white py-2 px-4 border-b border-[#F5C542]/40 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-3 text-center">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Truck className="w-4 h-4 text-[#F5C542]" />
            <span>★ Straight Out of Texas · Free Priority 2-Day Shipping</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Sparkles className="w-4 h-4 text-[#F5C542]" />
            <span>100% Solid Gold Rings & Chains (Zero Diamonds)</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Award className="w-4 h-4 text-[#F5C542]" />
            <span>Genuine 10k & 14k Texas Gold Castings</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 sm:pl-10 lg:pl-12 py-8 sm:py-10">
        {/* Section Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6A0DAD]">
              <span>★ EST. TEXAS ★</span>
              <span>·</span>
              <span>ONLINE VAULT COLLECTION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#121214] font-serif italic mt-1 tracking-tight">
              {activeCategory === 'All' ? '8 Exclusive Gold Jewelry Boxes' : `${activeCategory} Collection`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Solid 10k & 14k gold rings, Cuban links, and chains straight out of Texas (no diamonds/stones). Click any piece for interactive sizing buttons and collapsible inline measurement charts.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono font-bold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
            <span>SHOWING:</span>
            <span className="text-[#6A0DAD] font-black">{filteredProducts.length} GOLD JEWELRY BOXES</span>
          </div>
        </div>

        {/* 3. 2-Column Jewelry Box Grid (Strictly 2 Columns on Desktop) */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
            <span className="text-5xl block mb-3">🔍</span>
            <h3 className="text-lg font-bold text-slate-800">No jewelry boxes found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query "{searchQuery}" or switch categories above.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#121214] text-[#F5C542] text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            {filteredProducts.map((product) => {
              const productCartCount = cartItems
                .filter((item) => item.productId === product.id)
                .reduce((sum, item) => sum + item.quantity, 0);

              return (
                <JewelryBoxCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onDirectCheckout={handleDirectCheckout}
                  inCartCount={productCartCount}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Bottom-Left Quick Bag & Checkout Bar */}
      {totalCartCount > 0 && (
        <aside
          aria-label="Quick Checkout Bar"
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-12 z-40 animate-fadeIn pointer-events-auto"
        >
          <div className="bg-[#121214]/95 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border-2 border-[#F5C542]/80 shadow-[0_8px_30px_rgba(0,0,0,0.65)] flex items-center gap-2 sm:gap-3 backdrop-blur-md">
            <button
              onClick={() => setIsBagOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-white hover:text-[#F5C542] transition-colors cursor-pointer"
              title="Open Online Bag Drawer"
            >
              <span className="w-5 h-5 rounded-full bg-[#6A0DAD] text-white flex items-center justify-center text-[11px] font-mono font-black shadow-sm">
                {totalCartCount}
              </span>
              <span className="hidden sm:inline">in Bag</span>
              <span className="font-mono text-[#F5C542] font-black">${cartTotalUSD.toFixed(2)}</span>
            </button>

            <span className="h-4 w-px bg-slate-700" />

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F5C542] via-[#FAD961] to-[#E0A820] text-[#121214] font-black text-xs flex items-center gap-1.5 hover:from-[#FFF0A0] hover:to-[#F5C542] transition-all shadow-md cursor-pointer active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-[#121214] fill-current" />
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Floating Bottom-Right Contact Trigger */}
      <aside
        aria-label="Contact AI Assistant"
        className={`fixed z-40 transition-all duration-300 right-4 sm:right-8 ${
          totalCartCount > 0 ? 'bottom-20 sm:bottom-6' : 'bottom-4 sm:bottom-6'
        }`}
      >
        <button
          onClick={() => setIsPlugBotOpen(true)}
          className="group relative flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#121214] hover:bg-[#1E1E26] text-[#F5C542] border-2 border-[#F5C542]/70 shadow-[0_8px_25px_rgba(106,13,173,0.35)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open SSP PlugBot AI"
        >
          <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6A0DAD] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#6A0DAD]" />
          </span>
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5C542] group-hover:rotate-12 transition-transform" />
          <span className="text-xs sm:text-sm font-black tracking-wide text-white uppercase">
            💬 Contact
          </span>
          <span className="text-[10px] bg-[#6A0DAD] text-white px-1.5 py-0.5 rounded font-mono font-bold hidden sm:inline">
            AI BOT
          </span>
        </button>
      </aside>

      {/* Slide-Out Bag Drawer */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* All-in-One Multi-Payment Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        ownerSettings={ownerSettings}
        onClearCart={handleClearCart}
      />

      {/* Owner Payment Setup Modal */}
      <PaymentSetupModal
        isOpen={isPaymentSetupOpen}
        onClose={() => setIsPaymentSetupOpen(false)}
        settings={ownerSettings}
        onSave={(newSettings) => setOwnerSettings(newSettings)}
        onResetDefaults={() => setOwnerSettings(DEFAULT_SETTINGS)}
      />

      {/* Custom Logo Upload Modal */}
      <LogoUploadModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        currentLogoUrl={ownerSettings.customLogoDataUrl}
        onSaveLogo={handleSaveLogo}
      />

      {/* Owner Tickets Modal */}
      <TicketsModal
        isOpen={isTicketsModalOpen}
        onClose={() => setIsTicketsModalOpen(false)}
        tickets={tickets}
        onUpdateStatus={handleUpdateTicketStatus}
        onDeleteTicket={handleDeleteTicket}
      />

      {/* Smart AI Contact Bot & Callback Ticket Modal */}
      <PlugBotModal
        isOpen={isPlugBotOpen}
        onClose={() => setIsPlugBotOpen(false)}
        onTicketCreated={handleTicketCreated}
        ownerSettings={ownerSettings}
      />

      {/* Gold Care & Preservation Guide Modal */}
      <GoldCareModal
        isOpen={isGoldCareOpen}
        onClose={() => setIsGoldCareOpen(false)}
      />

      {/* Footer & Gold Care & Maintenance Section */}
      <footer className="mt-20 border-t border-slate-200 bg-[#121214] text-white py-14 px-4 sm:px-6 sm:pl-10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Gold Care & Maintenance Section */}
          <div className="rounded-2xl bg-gradient-to-b from-[#181820] to-[#121214] border border-[#F5C542]/30 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {/* Ambient gold glow backdrop */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_center,_rgba(245,197,66,0.08)_0%,_transparent_70%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#F5C542] uppercase">
                  <span>★ TEXAS JEWELER CRAFT ★</span>
                  <span>·</span>
                  <span>PRESERVATION STANDARDS</span>
                </div>
                <h2 className="font-serif italic text-2xl sm:text-3xl font-black text-white mt-1">
                  10k & 14k Gold Care & Maintenance
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  Real solid 10k & 14k gold does not rust or tarnish like base metals. However, everyday Texas humidity, skin oils, dust, and perspiration can form a dull film on mirror link bevels and ring carvings. Follow our official Texas jeweler maintenance standards to keep your pieces shining for decades.
                </p>
              </div>

              <button
                onClick={() => setIsGoldCareOpen(true)}
                className="self-start lg:self-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#F5C542] to-[#D4A017] hover:from-[#FFF0A0] hover:to-[#F5C542] text-[#121214] font-black text-xs sm:text-sm tracking-wide shadow-[0_4px_20px_rgba(245,197,66,0.35)] transition-all cursor-pointer flex items-center gap-2 shrink-0 active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-[#121214]" />
                <span>Open Instructional Care Guide (Modal)</span>
              </button>
            </div>

            {/* 3 Instructional Highlights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              {/* Card 1 */}
              <div className="p-4 rounded-xl bg-[#1A1A24] border border-slate-700/70 space-y-2 hover:border-[#F5C542]/50 transition-colors">
                <div className="flex items-center gap-2 text-[#F5C542]">
                  <Droplets className="w-4 h-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    1. The 5-Minute Mild Soak
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Submerge your gold rings and chains in warm water with 2–3 drops of mild dish soap (Dawn) for 10–15 minutes. Use an extra-soft baby toothbrush to gently brush between Cuban links and deep signet contours.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl bg-[#1A1A24] border border-slate-700/70 space-y-2 hover:border-[#F5C542]/50 transition-colors">
                <div className="flex items-center gap-2 text-[#F5C542]">
                  <Award className="w-4 h-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    2. Texas Heat & Sweat Defense
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  After outdoor workouts or high-humidity Texas summer days, quickly rinse your pieces under warm fresh tap water and pat dry with a 100% lint-free microfiber towel (avoid paper towels to prevent micro-scratches).
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-xl bg-[#1A1A24] border border-slate-700/70 space-y-2 hover:border-[#F5C542]/50 transition-colors">
                <div className="flex items-center gap-2 text-[#F5C542]">
                  <ShieldCheck className="w-4 h-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    3. Chlorine Zero-Tolerance
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Always remove your 10k/14k gold before entering swimming pools or hot tubs. Chlorine and bleach chemically corrode gold alloys, weakening link pins and clasps. Store each piece separately in a velvet pouch.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Brand Row & Links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left pt-6 border-t border-slate-800">
            <div>
              <div className="font-serif italic font-bold text-lg text-[#F5C542]">
                SOUTH SIDE PLUGGED (SSP)
              </div>
              <p className="text-xs text-slate-400 mt-1">
                ★ EST. TEXAS ★ · Handcrafted 10k/14k Solid Gold Rings, Chains & Bracelets
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 mt-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Free Insured Shipping
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F5C542]" /> 100% Authentic Texas Craft
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 text-xs text-slate-400">
              <div className="flex flex-wrap justify-center md:justify-end gap-2">
                <button
                  onClick={() => setIsGoldCareOpen(true)}
                  className="text-[#F5C542] hover:underline font-semibold cursor-pointer"
                >
                  ✨ Gold Care Guide
                </button>
                <span>·</span>
                <button
                  onClick={() => setIsPaymentSetupOpen(true)}
                  className="hover:text-[#F5C542] underline cursor-pointer"
                >
                  Owner Payment Gateway
                </button>
                <span>·</span>
                <button
                  onClick={() => setIsTicketsModalOpen(true)}
                  className="hover:text-[#F5C542] underline cursor-pointer"
                >
                  Callback Inbox ({tickets.length})
                </button>
                <span>·</span>
                <button
                  onClick={() => setIsLogoModalOpen(true)}
                  className="hover:text-[#F5C542] underline cursor-pointer"
                >
                  Custom Logo
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                © {new Date().getFullYear()} South Side Plugged. All Rights Reserved. Straight Out of Texas.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
