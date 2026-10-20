import React from 'react';
import { CartItem } from '../types';
import { ProductSvg } from './ProductSvgs';
import { X, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalUSD = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalOriginalUSD = items.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const totalSavings = totalOriginalUSD - totalUSD;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] shadow-2xl flex flex-col border-l border-slate-200">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#121214] text-white border-b border-[#F5C542]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛍️</span>
              <div>
                <h2 className="text-base font-bold text-white tracking-wide">
                  Your Online Shopping Bag
                </h2>
                <p className="text-xs text-[#F5C542]">
                  {items.length} unique item{items.length === 1 ? '' : 's'} in bag
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Badge Banner */}
          <div className="bg-gradient-to-r from-[#0A1E46] via-[#1E3A70] to-[#0A1E46] px-4 py-2 text-white text-xs flex items-center justify-between border-b border-[#F5C542]/40">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#F5C542]" />
              <span className="font-semibold">
                ★ FREE 2-Day Insured Texas Shipping Unlocked!
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#F5C542] font-bold">100% COVERED</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <span className="text-5xl mb-3">🛍️</span>
                <p className="text-base font-bold text-slate-700">Your bag is currently empty</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Pick your favorite 10k/14k solid gold rings, chains, or bracelets from the 8 jewelry boxes to lock in the 60% OFF sale price!
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 py-2 rounded-lg bg-[#121214] text-[#F5C542] font-semibold text-xs border border-[#F5C542]/40"
                >
                  Browse Jewelry Boxes
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 flex gap-3 items-center hover:border-slate-300 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-[#121214] shrink-0 border border-slate-800">
                    <ProductSvg type={item.svgType} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#121214] truncate font-serif italic">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-600">
                      <span className="font-semibold text-[#6A0DAD]">Size: {item.selectedSize}</span>
                      <span>·</span>
                      <span className="text-slate-500 font-mono">{item.karat}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-mono font-bold text-[#121214]">
                          ${(item.price * item.quantity).toFixed(2)} USD
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-[10px] text-slate-400 line-through font-mono">
                            ${(item.originalPrice * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded px-1.5 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-xs font-bold text-slate-600 hover:text-black w-4 text-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-xs font-bold text-slate-600 hover:text-black w-4 text-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout Button */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              {/* Savings callout */}
              {totalSavings > 0 && (
                <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
                  <span>60% Off Flash Savings</span>
                  <span className="font-mono font-bold">-${totalSavings.toFixed(2)} USD</span>
                </div>
              )}

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono">${totalUSD.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Texas Shipping</span>
                  <span className="font-bold text-emerald-600">FREE ($0.00)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Authenticity Guarantee</span>
                  <span className="text-[#6A0DAD] font-semibold">Included</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-black text-[#121214]">
                  <span>Total Amount</span>
                  <span className="font-mono text-lg text-[#6A0DAD]">
                    ${totalUSD.toFixed(2)} USD
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#121214] via-[#0A1E46] to-[#121214] hover:from-[#1C1C24] hover:to-[#1C1C24] text-[#F5C542] border border-[#F5C542]/60 font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-[0_4px_20px_rgba(245,197,66,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Proceed to Multi-Payment Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#F5C542]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Supports CashApp, Zelle, Apple Pay, PayPal & Text DM</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
