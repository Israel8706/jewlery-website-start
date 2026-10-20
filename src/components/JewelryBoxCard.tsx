import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { ProductSvg } from './ProductSvgs';
import { Ruler, Check, Plus, ShieldCheck, Sparkles, ChevronDown, ChevronUp, Zap, ShoppingBag } from 'lucide-react';

interface JewelryBoxCardProps {
  product: Product;
  onAddToCart: (item: Omit<CartItem, 'id'>, openDrawer?: boolean) => void;
  onDirectCheckout: (item: Omit<CartItem, 'id'>) => void;
  inCartCount?: number;
}

export const JewelryBoxCard: React.FC<JewelryBoxCardProps> = ({
  product,
  onAddToCart,
  onDirectCheckout,
  inCartCount = 0,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeChart, setShowSizeChart] = useState<boolean>(false);
  const [addedJustNow, setAddedJustNow] = useState<boolean>(false);

  const getItemPayload = (): Omit<CartItem, 'id'> => ({
    productId: product.id,
    name: product.name,
    price: product.salePrice,
    originalPrice: product.originalPrice,
    selectedSize: selectedSize,
    quantity: quantity,
    featureTag: product.featureTag,
    karat: product.karat,
    svgType: product.svgType,
  });

  const handleAdd = (openDrawer = true) => {
    onAddToCart(getItemPayload(), openDrawer);
    setAddedJustNow(true);
    setTimeout(() => setAddedJustNow(false), 2000);
  };

  const handleCheckoutNow = () => {
    onDirectCheckout(getItemPayload());
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  return (
    <article className="group relative bg-[#FFFFFF] rounded-xl border border-slate-200/80 shadow-[0_4px_20px_rgba(10,30,70,0.06)] hover:shadow-[0_10px_30px_rgba(106,13,173,0.12)] hover:border-[#F5C542]/70 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Decorative Gold/Navy Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0A1E46] via-[#6A0DAD] to-[#F5C542]" />

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Top Feature Tag & Discount Tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6A0DAD]">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C542]" />
            <span className="truncate">{product.featureTag}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {inCartCount > 0 && (
              <span className="text-[11px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1">
                <ShoppingBag className="w-3 h-3 text-amber-600" />
                <span>{inCartCount} in Bag</span>
              </span>
            )}
            <span className="text-[11px] font-mono font-bold bg-[#6A0DAD]/10 text-[#6A0DAD] px-2 py-0.5 rounded border border-[#6A0DAD]/20">
              SAVE {discountPercent}%
            </span>
          </div>
        </div>

        {/* Square Product Visual Container */}
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#121214] border border-slate-800 shadow-inner group-hover:border-[#F5C542]/50 transition-colors">
          <ProductSvg type={product.svgType} />

          {/* Bottom-Left Black Sale Badge */}
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-widest bg-[#121214]/90 text-[#F5C542] rounded border border-[#F5C542]/60 shadow-md backdrop-blur-sm">
              {product.badge}
            </span>
          </div>

          {/* Top-Right Texas Stamp */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider bg-[#0A1E46]/90 text-white rounded border border-[#0A1E46] shadow-sm backdrop-blur-sm">
              ★ TEXAS STOCK
            </span>
          </div>
        </div>

        {/* Product Title (Italic Serif Title) */}
        <div className="mt-4">
          <h3 className="font-serif italic text-lg sm:text-xl font-bold text-[#121214] leading-snug group-hover:text-[#6A0DAD] transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Spec Chips (Gold Karat, Stone/Finish, Gram Weight) */}
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200/80 font-medium">
            🟡 {product.karat}
          </span>
          <span className="px-2 py-1 rounded bg-amber-50/60 text-slate-800 border border-amber-200/60 font-medium">
            ✨ {product.stone}
          </span>
          <span className="px-2 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium font-mono">
            ⚖️ {product.weight}
          </span>
        </div>

        {/* Bulleted Product Specs */}
        <ul className="mt-3.5 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
          {product.specs.map((spec, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#F5C542] font-bold text-sm leading-none mt-0.5">✦</span>
              <span>{spec}</span>
            </li>
          ))}
        </ul>

        {/* Interactive Size Picker & Quantity */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Size: <span className="text-[#6A0DAD] font-extrabold">{selectedSize}</span>
            </label>
            {/* Collapsible Inline Sizing Chart Toggle */}
            <button
              onClick={() => setShowSizeChart(!showSizeChart)}
              className="flex items-center gap-1 text-xs font-semibold text-[#0A1E46] hover:text-[#6A0DAD] transition-colors cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5 text-[#F5C542]" />
              <span>{showSizeChart ? 'Hide Size Chart' : '📏 Show Size Chart'}</span>
              {showSizeChart ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* Size Choice Buttons */}
          <div className="flex flex-wrap gap-2">
            {product.availableSizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#121214] text-[#F5C542] ring-2 ring-[#F5C542] shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          {/* Collapsible Inline Sizing Chart Table */}
          {showSizeChart && (
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs animate-fadeIn">
              <div className="font-bold text-[11px] uppercase tracking-wider text-[#0A1E46] mb-1.5 flex items-center justify-between">
                <span>Exact Sizing Chart & Measurements</span>
                <span className="text-[10px] text-slate-500 font-normal">Texas Spec</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] text-slate-500 uppercase">
                      <th className="py-1 pr-2 font-semibold">Size</th>
                      <th className="py-1 px-2 font-semibold">Metric</th>
                      <th className="py-1 px-2 font-semibold">Inches</th>
                      <th className="py-1 pl-2 font-semibold">Fit Guide</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11px]">
                    {product.sizeChart.map((row) => (
                      <tr
                        key={row.size}
                        className={
                          selectedSize === row.size
                            ? 'bg-[#F5C542]/20 font-semibold text-[#121214]'
                            : 'text-slate-600'
                        }
                      >
                        <td className="py-1 pr-2 font-bold">{row.size}</td>
                        <td className="py-1 px-2 font-mono">{row.metric}</td>
                        <td className="py-1 px-2 font-mono">{row.imperial}</td>
                        <td className="py-1 pl-2 text-slate-600">{row.fitNote}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Pricing, Quantity & Add to Bag / Proceed to Checkout */}
        <div className="mt-5 pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 line-through font-mono">
                ${(product.originalPrice * quantity).toFixed(2)} USD
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-black text-[#121214] font-mono tracking-tight">
                  ${(product.salePrice * quantity).toFixed(2)}
                </span>
                <span className="text-[11px] font-bold text-[#6A0DAD] uppercase">USD</span>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-lg p-1">
              <span className="text-[11px] font-semibold text-slate-500 pl-1">Qty:</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-6 h-6 rounded bg-white hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center cursor-pointer"
              >
                -
              </button>
              <span className="w-5 text-center text-xs font-mono font-bold text-slate-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-6 h-6 rounded bg-white hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* DUAL ACTION BUTTONS: Add to Bag + Proceed to Checkout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {/* Button 1: Add to Online Bag */}
            <button
              onClick={() => handleAdd(true)}
              disabled={addedJustNow}
              className={`py-2.5 px-3 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm ${
                addedJustNow
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#121214] hover:bg-[#202028] text-[#F5C542] border border-[#F5C542]/60 hover:shadow-[0_4px_14px_rgba(245,197,66,0.25)] active:scale-95'
              }`}
            >
              {addedJustNow ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-[#F5C542]" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            {/* Button 2: Proceed to Checkout (Express 1-Click) */}
            <button
              onClick={handleCheckoutNow}
              className="py-2.5 px-3 rounded-lg text-xs font-black tracking-wide bg-gradient-to-r from-[#F5C542] via-[#FAD961] to-[#E0A820] hover:from-[#FFF0A0] hover:to-[#F5C542] text-[#121214] shadow-md hover:shadow-[0_4px_16px_rgba(245,197,66,0.4)] transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 border border-[#B8860B]/40"
            >
              <Zap className="w-4 h-4 text-[#121214] fill-current" />
              <span>Proceed to Checkout</span>
            </button>
          </div>
        </div>

        {/* Fast Texas Fulfillment Note */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-50">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Solid Gold · No Diamonds</span>
          </span>
          <span className="font-medium text-[#0A1E46]">Texas 24h Dispatch</span>
        </div>
      </div>
    </article>
  );
};
