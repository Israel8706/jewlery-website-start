import React, { useState } from 'react';
import { CartItem, OwnerSettings, CheckoutFormData } from '../types';
import { X, Check, Copy, ExternalLink, MessageSquare, CreditCard, ShieldCheck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  ownerSettings: OwnerSettings;
  onClearCart: () => void;
}

type PaymentMethodType =
  | 'CashApp'
  | 'Zelle'
  | 'ApplePay'
  | 'PayPal'
  | 'Shopify'
  | 'TextDM';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  ownerSettings,
  onClearCart,
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    phone: '',
    street: '',
    cityState: '',
    zip: '',
    orderNotes: '',
  });

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('CashApp');
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalUSD = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cleanCashtag = ownerSettings.cashAppTag.replace('$', '').trim();
  const cashAppUrl = `https://cash.app/$${cleanCashtag}/${totalUSD.toFixed(2)}`;
  const payPalUrl = `https://paypal.me/${ownerSettings.payPalHandle.replace('@', '').trim()}/${totalUSD.toFixed(2)}`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCompleteOrder = () => {
    if (!formData.customerName || !formData.phone || !formData.street) {
      alert('Please fill in your Customer Name, Phone Number, and Street Address to complete your order.');
      return;
    }

    const generatedId = `SSP-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
  };

  const orderSummaryText = `Order ${orderId || 'SSP-ORDER'} - South Side Plugged
Customer: ${formData.customerName}
Phone: ${formData.phone}
Address: ${formData.street}, ${formData.cityState} ${formData.zip}
Items:
${items.map((i) => `• ${i.name} (${i.selectedSize}) x${i.quantity} - $${(i.price * i.quantity).toFixed(2)}`).join('\n')}
Total: $${totalUSD.toFixed(2)} USD (Free Texas Insured Shipping)`;

  const smsUrl = `sms:${ownerSettings.phone}?&body=${encodeURIComponent(
    `Hey South Side Plugged! Here is my order #${orderId || 'NEW'}:\n${orderSummaryText}`
  )}`;

  const mailtoUrl = `mailto:${ownerSettings.email}?subject=${encodeURIComponent(
    `Order #${orderId || 'NEW'} - ${formData.customerName}`
  )}&body=${encodeURIComponent(orderSummaryText)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Top Header */}
        <div className="bg-[#121214] text-white p-4 sm:p-5 border-b border-[#F5C542]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">💳</span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                All-in-One Multi-Payment Checkout
              </h2>
              <p className="text-xs text-[#F5C542]">
                South Side Plugged · Straight Out of Texas · Free Priority Insured Shipping
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

        {orderConfirmed ? (
          /* Confirmation Receipt Screen */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-1">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#121214] font-serif">
                Order #{orderId} Locked In!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-bold text-[#121214]">{formData.customerName}</span>. Your 60% OFF sale pricing is reserved. Complete the selected payment below to finalize dispatch.
              </p>
            </div>

            {/* Payment Dispatch Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Selected Payment Method
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#6A0DAD] text-white">
                  {selectedMethod}
                </span>
              </div>

              {selectedMethod === 'CashApp' && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                    <div>
                      <div className="text-xs text-slate-500">CashApp Cashtag</div>
                      <div className="text-sm font-mono font-bold text-emerald-600">
                        {ownerSettings.cashAppTag}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(ownerSettings.cashAppTag, 'cashtag')}
                      className="px-3 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded flex items-center gap-1 cursor-pointer"
                    >
                      {copiedField === 'cashtag' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'cashtag' ? 'Copied!' : 'Copy Cashtag'}</span>
                    </button>
                  </div>
                  <a
                    href={cashAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>Open CashApp (${totalUSD.toFixed(2)} USD)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {selectedMethod === 'Zelle' && (
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-500">Zelle Contact / Handle</div>
                        <div className="text-sm font-mono font-bold text-purple-700">
                          {ownerSettings.zelleContact}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(ownerSettings.zelleContact, 'zelle')}
                        className="px-3 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded flex items-center gap-1 cursor-pointer"
                      >
                        {copiedField === 'zelle' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === 'zelle' ? 'Copied!' : 'Copy Zelle'}</span>
                      </button>
                    </div>
                    <div className="border-t border-slate-100 pt-2 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Order ID Memo:</span>
                      <span className="text-xs font-mono font-bold text-[#121214] bg-slate-100 px-2 py-0.5 rounded">
                        {orderId} - {formData.customerName}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'ApplePay' && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs text-slate-600">
                    Secure credit/debit card, Apple Pay, and Google Pay checkout processed via Stripe / Square.
                  </p>
                  <a
                    href={ownerSettings.stripeSquareUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#121214] hover:bg-[#222228] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>Pay with Apple Pay / Card</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#F5C542]" />
                  </a>
                </div>
              )}

              {selectedMethod === 'PayPal' && (
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500">PayPal.Me Handle</div>
                      <div className="text-sm font-mono font-bold text-blue-600">
                        {ownerSettings.payPalHandle}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(payPalUrl, 'paypal')}
                      className="px-3 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded flex items-center gap-1 cursor-pointer"
                    >
                      {copiedField === 'paypal' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'paypal' ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                  <a
                    href={payPalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>Open PayPal.Me Checkout</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {selectedMethod === 'Shopify' && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs text-slate-600">
                    Sync to our official Shopify storefront for express native shop checkout:
                  </p>
                  <a
                    href={`https://${ownerSettings.shopifyDomain.replace(/^https?:\/\//, '')}/cart`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#108A00] hover:bg-[#0E7700] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>Open Shopify Storefront Cart</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {selectedMethod === 'TextDM' && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs text-slate-600">
                    Send your exact piece list, sizes, and shipping address straight to the owner's phone or email for instant manual invoicing:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href={smsUrl}
                      className="py-2.5 px-3 rounded-lg bg-[#121214] text-[#F5C542] hover:bg-[#202028] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#F5C542]/40"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#F5C542]" />
                      <span>Text Owner ({ownerSettings.phone})</span>
                    </a>
                    <a
                      href={mailtoUrl}
                      className="py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-300"
                    >
                      <span>Email Order Details</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 1-Click Copy Receipt */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleCopy(orderSummaryText, 'receipt')}
                className="flex-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-300 cursor-pointer"
              >
                {copiedField === 'receipt' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'receipt' ? 'Receipt Copied to Clipboard!' : 'Copy Full Order Receipt'}</span>
              </button>
              <button
                onClick={() => {
                  onClearCart();
                  onClose();
                }}
                className="py-2 px-4 rounded-lg bg-[#121214] text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Done / Back to Store
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Input Form Screen */
          <div className="p-4 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Step 1: Customer & Shipping Address */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A1E46] uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-[#0A1E46] text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>Customer & Shipping Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    placeholder="e.g. Israeli M."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / Text Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="e.g. (713) 555-0199"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) =>
                      setFormData({ ...formData, street: e.target.value })
                    }
                    placeholder="e.g. 4200 South Post Oak Rd"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City, State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cityState}
                    onChange={(e) =>
                      setFormData({ ...formData, cityState: e.target.value })
                    }
                    placeholder="e.g. Houston, TX"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) =>
                      setFormData({ ...formData, zip: e.target.value })
                    }
                    placeholder="e.g. 77002"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Select 1 of 6 Payment Methods */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A1E46] uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-[#0A1E46] text-white flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>Select Your Preferred Payment Method</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {/* 1. CashApp */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('CashApp')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMethod === 'CashApp'
                      ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs text-emerald-600 flex items-center justify-between">
                    <span>💵 CashApp</span>
                    {selectedMethod === 'CashApp' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono truncate">
                    {ownerSettings.cashAppTag}
                  </div>
                </button>

                {/* 2. Zelle */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('Zelle')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMethod === 'Zelle'
                      ? 'border-purple-600 bg-purple-50/70 ring-2 ring-purple-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs text-purple-700 flex items-center justify-between">
                    <span>⚡ Zelle</span>
                    {selectedMethod === 'Zelle' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 truncate">
                    Instant Bank Transfer
                  </div>
                </button>

                {/* 3. Apple Pay / Card */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('ApplePay')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMethod === 'ApplePay'
                      ? 'border-black bg-slate-100 ring-2 ring-black'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs text-[#121214] flex items-center justify-between">
                    <span> Apple Pay / Card</span>
                    {selectedMethod === 'ApplePay' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 truncate">
                    Stripe / Square
                  </div>
                </button>

                {/* 4. PayPal / Venmo */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('PayPal')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMethod === 'PayPal'
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs text-blue-600 flex items-center justify-between">
                    <span>🅿️ PayPal / Venmo</span>
                    {selectedMethod === 'PayPal' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 truncate font-mono">
                    {ownerSettings.payPalHandle}
                  </div>
                </button>

                {/* 5. Shopify Cart */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('Shopify')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMethod === 'Shopify'
                      ? 'border-[#108A00] bg-emerald-50/60 ring-2 ring-[#108A00]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs text-[#108A00] flex items-center justify-between">
                    <span>🛍️ Shopify Cart</span>
                    {selectedMethod === 'Shopify' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 truncate">
                    Express Checkout
                  </div>
                </button>

                {/* 6. Text / DM Plug */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('TextDM')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMethod === 'TextDM'
                      ? 'border-[#F5C542] bg-amber-50/80 ring-2 ring-[#F5C542]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs text-amber-800 flex items-center justify-between">
                    <span>💬 Text / DM Plug</span>
                    {selectedMethod === 'TextDM' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 truncate">
                    Direct SMS Order
                  </div>
                </button>
              </div>
            </div>

            {/* Order Summary & Final Button */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span className="font-mono">${totalUSD.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Texas Express Shipping</span>
                <span className="font-bold text-emerald-600">FREE ($0.00)</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-black text-[#121214]">
                <span>Total to Pay</span>
                <span className="font-mono text-[#6A0DAD]">${totalUSD.toFixed(2)} USD</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCompleteOrder}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#121214] via-[#0A1E46] to-[#121214] hover:from-[#1C1C24] hover:to-[#1C1C24] text-[#F5C542] font-black text-sm tracking-wide transition-all shadow-lg hover:shadow-[0_4px_20px_rgba(245,197,66,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-[#F5C542]/60"
            >
              <CreditCard className="w-4 h-4 text-[#F5C542]" />
              <span>Lock In Order & Proceed with {selectedMethod}</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Secure Checkout · Encrypted Texas Dispatch</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
