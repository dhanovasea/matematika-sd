import React, { useState } from 'react';
import { sound } from '../../utils/audio';

interface ConcreteCounterProps {
  initialGroup1?: number;
  initialGroup2?: number;
  operation?: 'addition' | 'subtraction';
  interactive?: boolean;
  onCountChange?: (total: number) => void;
}

export const ConcreteCounter: React.FC<ConcreteCounterProps> = ({
  initialGroup1 = 3,
  initialGroup2 = 2,
  operation = 'addition',
  interactive = true,
  onCountChange
}) => {
  const [group1, setGroup1] = useState(initialGroup1);
  const [group2, setGroup2] = useState(initialGroup2);

  const total = operation === 'addition' ? group1 + group2 : Math.max(0, group1 - group2);

  const handleAddApple = (group: 1 | 2) => {
    sound.playPop();
    if (group === 1 && group1 < 10) {
      setGroup1(g => g + 1);
    } else if (group === 2 && group2 < 10) {
      setGroup2(g => g + 1);
    }
  };

  const handleRemoveApple = (group: 1 | 2) => {
    sound.playClick();
    if (group === 1 && group1 > 0) {
      setGroup1(g => g - 1);
    } else if (group === 2 && group2 > 0) {
      setGroup2(g => g - 1);
    }
  };

  const renderApple = (color: 'red' | 'green' | 'gold', index: number, isRemoved = false) => (
    <div
      key={index}
      className={`relative inline-block transition-all transform duration-200 ${
        isRemoved ? 'opacity-30 scale-75 grayscale' : 'hover:scale-110 active:scale-95'
      }`}
    >
      <svg viewBox="0 0 40 40" className="w-10 h-10 md:w-12 md:h-12 drop-shadow">
        {/* Leaf */}
        <path d="M20 10 Q25 4 28 8 Q23 14 20 10 Z" fill="#22c55e" />
        {/* Stem */}
        <path d="M20 12 Q21 6 24 4" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Apple body */}
        {color === 'red' && (
          <>
            <path
              d="M12 18 C6 18 6 32 18 36 C20 37 20 37 22 36 C34 32 34 18 28 18 C24 18 21 21 20 21 C19 21 16 18 12 18 Z"
              fill="#ef4444"
            />
            <circle cx="15" cy="22" r="2.5" fill="#fca5a5" opacity="0.6" />
          </>
        )}
        {color === 'green' && (
          <>
            <path
              d="M12 18 C6 18 6 32 18 36 C20 37 20 37 22 36 C34 32 34 18 28 18 C24 18 21 21 20 21 C19 21 16 18 12 18 Z"
              fill="#10b981"
            />
            <circle cx="15" cy="22" r="2.5" fill="#a7f3d0" opacity="0.6" />
          </>
        )}
        {color === 'gold' && (
          <>
            <path
              d="M12 18 C6 18 6 32 18 36 C20 37 20 37 22 36 C34 32 34 18 28 18 C24 18 21 21 20 21 C19 21 16 18 12 18 Z"
              fill="#f59e0b"
            />
            <circle cx="15" cy="22" r="2.5" fill="#fde68a" opacity="0.6" />
          </>
        )}
      </svg>
      {/* Index badge */}
      <span className="absolute -bottom-1 -right-1 bg-white/90 text-slate-800 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs border border-slate-200">
        {index + 1}
      </span>
    </div>
  );

  return (
    <div className="bg-white/90 border-2 border-amber-200 rounded-3xl p-4 md:p-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <h4 className="text-base md:text-lg font-bold text-amber-900 flex items-center gap-2">
          <span>🍎</span>
          <span>Benda Konkret: Apel Manis</span>
        </h4>
        <div className="text-xl md:text-2xl font-black text-amber-700 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-300">
          {group1} {operation === 'addition' ? '+' : '−'} {group2} = {total}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
        {/* Group 1: Merah */}
        <div className="flex flex-col items-center bg-white p-3 md:p-4 rounded-2xl border-2 border-red-200 shadow-xs min-w-[140px]">
          <span className="text-xs font-bold text-red-600 mb-2 uppercase tracking-wide">
            Apel Merah ({group1})
          </span>
          <div className="flex flex-wrap gap-2 justify-center max-w-[200px] min-h-[50px] items-center">
            {group1 === 0 ? (
              <span className="text-xs text-slate-400 italic">Kosong</span>
            ) : (
              Array.from({ length: group1 }).map((_, i) =>
                renderApple('red', i, operation === 'subtraction' && i >= group1 - group2)
              )
            )}
          </div>
          {interactive && (
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => handleRemoveApple(1)}
                className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-700 font-bold flex items-center justify-center transition-transform active:scale-90"
              >
                −
              </button>
              <button
                onClick={() => handleAddApple(1)}
                className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold flex items-center justify-center transition-transform active:scale-90"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Operation Sign */}
        <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-black text-xl shadow-xs">
          {operation === 'addition' ? '+' : '−'}
        </div>

        {/* Group 2: Hijau atau Dikeluarkan */}
        <div className="flex flex-col items-center bg-white p-3 md:p-4 rounded-2xl border-2 border-emerald-200 shadow-xs min-w-[140px]">
          <span className="text-xs font-bold text-emerald-600 mb-2 uppercase tracking-wide">
            {operation === 'addition' ? `Apel Hijau (${group2})` : `Diambil (${group2})`}
          </span>
          <div className="flex flex-wrap gap-2 justify-center max-w-[200px] min-h-[50px] items-center">
            {group2 === 0 ? (
              <span className="text-xs text-slate-400 italic">Kosong</span>
            ) : (
              Array.from({ length: group2 }).map((_, i) =>
                renderApple(operation === 'addition' ? 'green' : 'red', i, operation === 'subtraction')
              )
            )}
          </div>
          {interactive && (
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => handleRemoveApple(2)}
                className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold flex items-center justify-center transition-transform active:scale-90"
              >
                −
              </button>
              <button
                onClick={() => handleAddApple(2)}
                className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center justify-center transition-transform active:scale-90"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Equals Sign */}
        <div className="w-10 h-10 rounded-full bg-amber-300 text-amber-900 flex items-center justify-center font-black text-xl shadow-xs">
          =
        </div>

        {/* Result Group: Emas */}
        <div className="flex flex-col items-center bg-amber-50 p-3 md:p-4 rounded-2xl border-2 border-amber-400 shadow-xs min-w-[140px]">
          <span className="text-xs font-bold text-amber-800 mb-2 uppercase tracking-wide">
            Hasil Akhir ({total})
          </span>
          <div className="flex flex-wrap gap-2 justify-center max-w-[220px] min-h-[50px] items-center">
            {total === 0 ? (
              <span className="text-xs text-slate-400 italic">0 Apel tersisa</span>
            ) : (
              Array.from({ length: total }).map((_, i) => renderApple('gold', i))
            )}
          </div>
          <span className="mt-2 text-xs font-semibold text-amber-700 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
            Total {total} Apel
          </span>
        </div>
      </div>
    </div>
  );
};
