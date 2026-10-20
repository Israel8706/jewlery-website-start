import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, AlertTriangle, Droplets, Sun, Check, Copy } from 'lucide-react';

interface GoldCareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoldCareModal: React.FC<GoldCareModalProps> = ({ isOpen, onClose }) => {
  const [copiedTip, setCopiedTip] = useState(false);

  if (!isOpen) return null;

  const quickRoutineText = `★ SOUTH SIDE PLUGGED - 10K/14K GOLD CARE ROUTINE ★
1. SOAK: 10-15 mins in warm water with 2-3 drops of mild dish soap (Dawn).
2. DETAIL: Gently brush link crevices and ring carvings with a soft-bristle toothbrush.
3. RINSE: Thoroughly rinse with lukewarm tap water (plug the drain first!).
4. DRY: Pat dry with a 100% lint-free microfiber cloth (never paper towels).
5. BUFF: Lightly polish with an SSP jeweler's cloth for mirror shine.
STORAGE: Store each gold piece separately in a velvet pouch away from chlorine & bleach.`;

  const handleCopyRoutine = () => {
    navigator.clipboard.writeText(quickRoutineText);
    setCopiedTip(true);
    setTimeout(() => setCopiedTip(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-[#121214] text-white p-4 sm:p-5 border-b border-[#F5C542]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6A0DAD] to-[#F5C542] p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#121214] rounded-full flex items-center justify-center text-[#F5C542]">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                10k & 14k Gold Care & Preservation Guide
              </h2>
              <p className="text-xs text-[#F5C542]">
                Official South Side Plugged Master Jeweler Instructions
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

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick Notice Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">Pure Gold Integrity:</span> Real 10k and 14k gold do not rust or turn your skin green. However, everyday exposure to body oils, Texas heat/sweat, dust, and lotions can form a dull film. Following this simple 5-minute routine restores factory mirror shine!
            </div>
          </div>

          {/* 4-Step Cleaning Protocol */}
          <div className="space-y-3">
            <h3 className="font-serif italic text-base font-bold text-[#121214] flex items-center gap-2">
              <span>✦</span> The 4-Step Home Cleaning Protocol
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Step 1 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#121214] text-[#F5C542] font-mono text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h4 className="font-bold text-xs text-slate-900">Lukewarm Soap Soak</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mix warm tap water with 2-3 drops of mild degreasing dish soap (such as Dawn). Submerge your gold rings or chains for <strong>10–15 minutes</strong> to loosen accumulated oils.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#121214] text-[#F5C542] font-mono text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h4 className="font-bold text-xs text-slate-900">Soft-Bristle Detailing</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Use an extra-soft baby toothbrush to gently scrub between Cuban links, rope spirals, and nugget cavities. Never use hard bristles or metal picks.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#121214] text-[#F5C542] font-mono text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h4 className="font-bold text-xs text-slate-900">Warm Flush & Pat-Dry</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rinse completely under warm running water (ensure sink drain is plugged!). Gently pat dry with a <strong>microfiber towel</strong>. Avoid paper towels as wood fibers cause micro-scratches.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#121214] text-[#F5C542] font-mono text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h4 className="font-bold text-xs text-slate-900">Micro-Luster Buffing</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Use an untreated jeweler's gold polishing cloth in gentle straight strokes (not circular) along the link bevels to reactivate the deep 14k mirror luster.
                </p>
              </div>
            </div>
          </div>

          {/* 10K vs 14K Gold Specifics */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="font-serif italic text-base font-bold text-[#121214] flex items-center gap-2">
              <span>✦</span> Karat-Specific Care Differences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 text-xs space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <span>🟡 10K Solid Gold</span>
                  <span className="text-[10px] font-mono font-normal text-slate-600">(41.7% Pure Gold)</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  The hardest gold alloy for daily street wear and heavy knuckle contact (such as our Texas Nugget ring). Highly scratch-resistant; simply rinse after high perspiration.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/40 text-xs space-y-1">
                <div className="font-bold text-purple-900 flex items-center gap-1.5">
                  <span>🟡 14K Gold Fill & Bond</span>
                  <span className="text-[10px] font-mono font-normal text-slate-600">(58.3% Pure Gold)</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Richest warm golden hue with deep liquid luster. Slightly softer than 10k, so store individually in velvet to avoid chain-on-ring rubbing.
                </p>
              </div>
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="font-serif italic text-base font-bold text-[#121214] flex items-center gap-2">
              <span>✦</span> The Do's & Don'ts of Texas Gold
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Do's */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>DO'S FOR LONG LIFE</span>
                </div>
                <ul className="space-y-1.5 text-slate-700">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Put gold jewelry on LAST after applying colognes or lotions.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Rinse under fresh water after humid Texas outdoor workouts.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Store each piece in its own separate pouch or compartment.</span>
                  </li>
                </ul>
              </div>

              {/* Don'ts */}
              <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div className="font-bold text-rose-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>DON'TS TO AVOID DAMAGE</span>
                </div>
                <ul className="space-y-1.5 text-slate-700">
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">✕</span>
                    <span><strong>NEVER wear in chlorinated pools or hot tubs.</strong> Chlorine attacks gold alloys.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">✕</span>
                    <span>Never clean with bleach, acetone, or abrasive toothpaste.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">✕</span>
                    <span>Never toss multiple heavy chains loosely in a pocket or bag.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleCopyRoutine}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            {copiedTip ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Routine Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy 1-Page Care Summary</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#121214] hover:bg-[#222228] text-[#F5C542] text-xs font-bold transition-colors cursor-pointer"
          >
            Done / Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
