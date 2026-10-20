import React, { useState } from 'react';
import { OwnerSettings } from '../types';
import { X, Save, RotateCcw, Check, Shield } from 'lucide-react';

interface PaymentSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: OwnerSettings;
  onSave: (newSettings: OwnerSettings) => void;
  onResetDefaults: () => void;
}

export const PaymentSetupModal: React.FC<PaymentSetupModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
  onResetDefaults,
}) => {
  const [form, setForm] = useState<OwnerSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#121214] text-white p-4 sm:p-5 border-b border-[#F5C542]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">⚙️</span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Owner Payment Gateway Setup
              </h2>
              <p className="text-xs text-[#F5C542]">
                Saved locally in browser localStorage
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
            <Shield className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
            <span>
              Configure your merchant credentials below. All 6 checkout options in the customer modal will dynamically route to these handles.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              CashApp $Cashtag
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono font-bold">$</span>
              <input
                type="text"
                value={form.cashAppTag.replace('$', '')}
                onChange={(e) =>
                  setForm({ ...form, cashAppTag: `$${e.target.value.trim()}` })
                }
                placeholder="SouthSidePlugged"
                className="w-full pl-7 pr-3 py-2 text-xs rounded-lg border border-slate-300 font-mono font-bold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Zelle Contact (Phone or Email)
            </label>
            <input
              type="text"
              value={form.zelleContact}
              onChange={(e) => setForm({ ...form, zelleContact: e.target.value })}
              placeholder="orders@southsideplugged.com or (713) 555-0199"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Owner SMS/Call Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(713) 555-0199"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Owner Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="contact@southsideplugged.com"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Stripe / Square Custom Checkout URL
            </label>
            <input
              type="url"
              value={form.stripeSquareUrl}
              onChange={(e) => setForm({ ...form, stripeSquareUrl: e.target.value })}
              placeholder="https://buy.stripe.com/..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              PayPal.me Handle
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">paypal.me/</span>
              <input
                type="text"
                value={form.payPalHandle.replace(/^https?:\/\/paypal\.me\//, '').replace('@', '')}
                onChange={(e) => setForm({ ...form, payPalHandle: e.target.value.trim() })}
                placeholder="SouthSidePlugged"
                className="w-full pl-22 pr-3 py-2 text-xs rounded-lg border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Shopify Store Domain
            </label>
            <input
              type="text"
              value={form.shopifyDomain}
              onChange={(e) => setForm({ ...form, shopifyDomain: e.target.value })}
              placeholder="southsideplugged.myshopify.com"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onResetDefaults();
                onClose();
              }}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#121214] text-[#F5C542] hover:bg-[#202028] font-bold text-xs flex items-center gap-1.5 border border-[#F5C542]/50 shadow-sm cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#F5C542]" />
                  <span>Save Gateway Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
