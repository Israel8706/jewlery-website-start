import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface CountdownBarProps {
  onOpenLogoModal: () => void;
  onOpenTicketsModal: () => void;
  onOpenPaymentsModal: () => void;
  ticketCount: number;
}

export const CountdownBar: React.FC<CountdownBarProps> = ({
  onOpenLogoModal,
  onOpenTicketsModal,
  onOpenPaymentsModal,
  ticketCount,
}) => {
  // Initial time: 1 hour, 28 minutes, 20 seconds
  const [totalSeconds, setTotalSeconds] = useState(1 * 3600 + 28 * 60 + 20);

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 12 * 3600)); // Reset if reaches zero
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="sticky top-0 z-50 w-full bg-[#121214] text-white border-b border-[#F5C542]/30 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4">
        {/* Sale Banner & Split-Digit Timer */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
          <div className="flex items-center gap-1.5 font-extrabold text-xs sm:text-sm tracking-wider uppercase text-[#F5C542]">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C542] animate-pulse" />
            <span>60% OFF SALE ENDS IN</span>
          </div>

          {/* Split-Digit Flip Timer */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="flex gap-0.5">
                {pad(hours).split('').map((digit, i) => (
                  <span
                    key={`h-${i}`}
                    className="inline-block px-1.5 py-0.5 min-w-[20px] text-center bg-[#1E1E24] border border-[#F5C542]/40 rounded text-xs sm:text-sm font-mono font-bold text-[#FFF] shadow-inner"
                  >
                    {digit}
                  </span>
                ))}
              </div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">Hours</span>
            </div>

            <span className="text-[#F5C542] font-mono font-bold text-xs -mt-3.5">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="flex gap-0.5">
                {pad(minutes).split('').map((digit, i) => (
                  <span
                    key={`m-${i}`}
                    className="inline-block px-1.5 py-0.5 min-w-[20px] text-center bg-[#1E1E24] border border-[#F5C542]/40 rounded text-xs sm:text-sm font-mono font-bold text-[#FFF] shadow-inner"
                  >
                    {digit}
                  </span>
                ))}
              </div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">Minutes</span>
            </div>

            <span className="text-[#F5C542] font-mono font-bold text-xs -mt-3.5">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="flex gap-0.5">
                {pad(seconds).split('').map((digit, i) => (
                  <span
                    key={`s-${i}`}
                    className="inline-block px-1.5 py-0.5 min-w-[20px] text-center bg-[#6A0DAD]/70 border border-[#F5C542]/60 rounded text-xs sm:text-sm font-mono font-bold text-[#FFF] shadow-inner transition-colors"
                  >
                    {digit}
                  </span>
                ))}
              </div>
              <span className="text-[9px] uppercase tracking-wider text-[#F5C542] mt-0.5">Seconds</span>
            </div>
          </div>
        </div>

        {/* Owner Action Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
          <button
            onClick={onOpenLogoModal}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-[#1C1C24] hover:bg-[#252532] text-slate-200 border border-slate-700 hover:border-[#F5C542] transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            title="Upload custom logo photo or load ssp-logo.png"
          >
            <span>🖼️</span>
            <span>Use Exact Logo Photo</span>
          </button>

          <button
            onClick={onOpenTicketsModal}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-[#1C1C24] hover:bg-[#252532] text-slate-200 border border-slate-700 hover:border-[#6A0DAD] transition-colors whitespace-nowrap cursor-pointer shadow-sm relative"
            title="View callback tickets"
          >
            <span>🎫</span>
            <span>Tickets ({ticketCount})</span>
            {ticketCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#6A0DAD] rounded-full border border-white" />
            )}
          </button>

          <button
            onClick={onOpenPaymentsModal}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-gradient-to-r from-[#0A1E46] to-[#121214] hover:from-[#0E2960] hover:to-[#1C1C24] text-[#F5C542] border border-[#F5C542]/50 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            title="Configure CashApp, Zelle, PayPal, Shopify, and Stripe links"
          >
            <span>⚙️</span>
            <span>Setup Payments</span>
          </button>
        </div>
      </div>
    </div>
  );
};
