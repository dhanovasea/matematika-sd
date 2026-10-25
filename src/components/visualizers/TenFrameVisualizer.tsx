import React, { useState } from 'react';
import { sound } from '../../utils/audio';

interface TenFrameVisualizerProps {
  num1?: number; // e.g. 8
  num2?: number; // e.g. 5
  interactive?: boolean;
}

export const TenFrameVisualizer: React.FC<TenFrameVisualizerProps> = ({
  num1 = 8,
  num2 = 5,
  interactive = true
}) => {
  const [firstNum, setFirstNum] = useState(num1);
  const [secondNum, setSecondNum] = useState(num2);

  const neededForTen = Math.max(0, 10 - firstNum);
  const fromSecondToTen = Math.min(neededForTen, secondNum);
  const remainder = Math.max(0, secondNum - fromSecondToTen);
  const total = firstNum + secondNum;

  // Frame 1: 10 slots
  // Frame 2: 10 slots for the remainder
  const frame1Slots = Array.from({ length: 10 }, (_, i) => {
    if (i < firstNum) return 'blue';
    if (i < firstNum + fromSecondToTen) return 'amber';
    return 'empty';
  });

  const frame2Slots = Array.from({ length: 10 }, (_, i) => {
    if (i < remainder) return 'amber';
    return 'empty';
  });

  return (
    <div className="bg-white/90 border-2 border-amber-200 rounded-3xl p-4 md:p-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
        <h4 className="text-base md:text-lg font-bold text-amber-900 flex items-center gap-2">
          <span>📦</span>
          <span>Kotak Sepuluh (Make Ten Frames)</span>
        </h4>
        <div className="text-xl md:text-2xl font-black text-amber-800 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-300">
          {firstNum} + {secondNum} = {total}
        </div>
      </div>

      {/* Make Ten Concept Explanation Badge */}
      <div className="mb-4 bg-amber-50 border border-amber-200 rounded-2xl p-3 text-sm text-amber-900 flex flex-wrap items-center gap-2">
        <span className="font-bold">Strategi:</span>
        <span>
          {firstNum} butuh <strong className="text-amber-700 underline">{neededForTen}</strong> untuk menjadi 10.
        </span>
        <span>
          Pecah {secondNum} menjadi <strong className="text-amber-700">{fromSecondToTen}</strong> dan{' '}
          <strong className="text-amber-700">{remainder}</strong>.
        </span>
        <span className="bg-white px-2.5 py-0.5 rounded-full font-bold text-xs border border-amber-300">
          10 + {remainder} = {total}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Ten Frame */}
        <div className="bg-sky-50/70 border-2 border-sky-300 rounded-2xl p-3 flex flex-col items-center">
          <div className="flex justify-between w-full px-2 mb-2 items-center">
            <span className="text-xs font-bold text-sky-800 uppercase">
              Kotak 1: Penuh Jadi 10
            </span>
            <span className="text-xs font-bold bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full">
              {Math.min(10, firstNum + fromSecondToTen)} / 10
            </span>
          </div>

          {/* 5x2 Grid */}
          <div className="grid grid-cols-5 gap-2 bg-white p-3 rounded-xl border border-sky-200 shadow-inner">
            {frame1Slots.map((type, idx) => (
              <div
                key={idx}
                className="w-10 h-10 md:w-12 md:h-12 border-2 border-dashed border-sky-200 rounded-xl flex items-center justify-center bg-sky-50/30"
              >
                {type === 'blue' && (
                  <div className="w-8 h-8 rounded-full bg-sky-500 shadow-sm flex items-center justify-center text-white font-bold text-xs">
                    {idx + 1}
                  </div>
                )}
                {type === 'amber' && (
                  <div className="w-8 h-8 rounded-full bg-amber-400 shadow-sm flex items-center justify-center text-amber-900 font-bold text-xs animate-bounce">
                    +
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Second Ten Frame */}
        <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-3 flex flex-col items-center">
          <div className="flex justify-between w-full px-2 mb-2 items-center">
            <span className="text-xs font-bold text-amber-800 uppercase">
              Kotak 2: Sisa Tambahan
            </span>
            <span className="text-xs font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
              {remainder} / 10
            </span>
          </div>

          {/* 5x2 Grid */}
          <div className="grid grid-cols-5 gap-2 bg-white p-3 rounded-xl border border-amber-200 shadow-inner">
            {frame2Slots.map((type, idx) => (
              <div
                key={idx}
                className="w-10 h-10 md:w-12 md:h-12 border-2 border-dashed border-amber-200 rounded-xl flex items-center justify-center bg-amber-50/30"
              >
                {type === 'amber' && (
                  <div className="w-8 h-8 rounded-full bg-amber-400 shadow-sm flex items-center justify-center text-amber-900 font-bold text-xs">
                    {idx + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {interactive && (
        <div className="mt-4 pt-3 border-t border-amber-100 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600 text-xs">Angka Pertama:</span>
            <button
              onClick={() => {
                sound.playClick();
                setFirstNum(n => Math.max(1, n - 1));
              }}
              className="w-7 h-7 rounded bg-sky-100 font-bold text-sky-800 hover:bg-sky-200"
            >
              −
            </button>
            <span className="font-bold text-sky-800 w-6 text-center">{firstNum}</span>
            <button
              onClick={() => {
                sound.playClick();
                setFirstNum(n => Math.min(9, n + 1));
              }}
              className="w-7 h-7 rounded bg-sky-100 font-bold text-sky-800 hover:bg-sky-200"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600 text-xs">Angka Kedua:</span>
            <button
              onClick={() => {
                sound.playClick();
                setSecondNum(n => Math.max(1, n - 1));
              }}
              className="w-7 h-7 rounded bg-amber-100 font-bold text-amber-800 hover:bg-amber-200"
            >
              −
            </button>
            <span className="font-bold text-amber-800 w-6 text-center">{secondNum}</span>
            <button
              onClick={() => {
                sound.playClick();
                setSecondNum(n => Math.min(9, n + 1));
              }}
              className="w-7 h-7 rounded bg-amber-100 font-bold text-amber-800 hover:bg-amber-200"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
