import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, RotateCcw, Check, Sparkles } from 'lucide-react';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLogoUrl: string | null;
  onSaveLogo: (dataUrl: string | null) => void;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({
  isOpen,
  onClose,
  currentLogoUrl,
  onSaveLogo,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogoUrl);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP, SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleLoadExactFile = () => {
    // Try to load ssp-logo.png or default path
    setPreviewUrl('/ssp-logo.png');
  };

  const handleSave = () => {
    onSaveLogo(previewUrl);
    setSuccessMessage('Logo successfully updated & saved to localStorage!');
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1200);
  };

  const handleRevertToSvg = () => {
    setPreviewUrl(null);
    onSaveLogo(null);
    setSuccessMessage('Reverted to 3D Beveled Multi-Layered SVG Crest!');
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#121214] text-white p-4 sm:p-5 border-b border-[#F5C542]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🖼️</span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Custom Exact Logo Loader
              </h2>
              <p className="text-xs text-[#F5C542]">
                Upload local file or load ssp-logo.png
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

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Current / Preview Visual */}
          <div className="p-4 rounded-xl bg-slate-900 border border-[#F5C542]/30 flex flex-col items-center justify-center min-h-[160px]">
            {previewUrl ? (
              <div className="space-y-2 text-center">
                <img
                  src={previewUrl}
                  alt="SSP Logo Preview"
                  className="max-h-28 max-w-[220px] object-contain mx-auto drop-shadow-md"
                  onError={() => {
                    // if ssp-logo.png not found, notify user
                    alert('Could not find ssp-logo.png. Please select your local logo image file using the upload button below.');
                    setPreviewUrl(null);
                  }}
                />
                <span className="text-[11px] text-[#F5C542] block font-mono">
                  Active Photo Selected
                </span>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#1C1C24] border border-[#F5C542]/50 flex items-center justify-center mx-auto text-[#F5C542]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-white">
                  Using Custom 3D Multi-Layered SVG Crest
                </p>
                <p className="text-[11px] text-slate-400 max-w-xs">
                  Beveled Old English SSP, diamond pavé, 3 plugs, gold drips, and arched text.
                </p>
              </div>
            )}
          </div>

          {/* Upload Button & Load ssp-logo.png */}
          <div className="space-y-2.5">
            <label className="block">
              <span className="text-xs font-bold text-slate-700 block mb-1">
                Upload from your device:
              </span>
              <div className="relative flex items-center justify-center px-4 py-3 border-2 border-dashed border-slate-300 hover:border-[#6A0DAD] rounded-xl cursor-pointer bg-slate-50 hover:bg-purple-50/30 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Upload className="w-4 h-4 text-[#6A0DAD]" />
                  <span>Choose Image File (PNG, JPG, WebP)</span>
                </div>
              </div>
            </label>

            <button
              onClick={handleLoadExactFile}
              className="w-full py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-300 transition-colors cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-[#0A1E46]" />
              <span>Load "ssp-logo.png" from root directory</span>
            </button>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
            <button
              onClick={handleRevertToSvg}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Use SVG Crest</span>
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-lg bg-[#121214] text-[#F5C542] hover:bg-[#202028] font-bold text-xs flex items-center gap-1.5 border border-[#F5C542]/50 shadow-sm cursor-pointer"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Save & Apply Logo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
