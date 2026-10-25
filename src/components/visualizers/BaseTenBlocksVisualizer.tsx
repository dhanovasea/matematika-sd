import React, { useState } from 'react';
import { sound } from '../../utils/audio';

interface BaseTenBlocksVisualizerProps {
  initialNum1?: number; // e.g. 23
  initialNum2?: number; // e.g. 14
  operation?: 'addition' | 'subtraction';
  interactive?: boolean;
}

export const BaseTenBlocksVisualizer: React.FC<BaseTenBlocksVisualizerProps> = ({
  initialNum1 = 23,
  initialNum2 = 14,
  operation = 'addition',
  interactive = true
}) => {
  const [num1, setNum1] = useState(initialNum1);
  const [num2, setNum2] = useState(initialNum2);

  const tens1 = Math.floor(num1 / 10);
  const ones1 = num1 % 10;
  const tens2 = Math.floor(num2 / 10);
  const ones2 = num2 % 10;

  const result = operation === 'addition' ? num1 + num2 : Math.max(0, num1 - num2);
  const resultTens = Math.floor(result / 10);
  const resultOnes = result % 10;

  // Render a tens rod (10 connected cubes vertically)
  const renderTensRod = (color = 'indigo', key: number) => (
    <div key={key} className="flex flex-col gap-0.5 p-1 bg-indigo-50 border border-indigo-200 rounded-lg shadow-xs hover:scale-105 transition-transform" title="1 Batang Puluhan (10)">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="w-3.5 h-2 bg-indigo-500 border border-indigo-600 rounded-[2px]" />
      ))}
      <span className="text-[9px] font-bold text-center text-indigo-700">10</span>
    </div>
  );

  // Render a ones unit cube
  const renderOnesCube = (key: number) => (
    <div key={key} className="w-4 h-4 bg-amber-400 border border-amber-600 rounded-[3px] shadow-xs flex items-center justify-center text-[8px] font-bold text-amber-900 hover:scale-110 transition-transform" title="1 Satuan">
      1
    </div>
  );

  return (
    <div className="bg-white/90 border-2 border-indigo-200 rounded-3xl p-4 md:p-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
        <h4 className="text-base md:text-lg font-bold text-indigo-900 flex items-center gap-2">
          <span>🧱</span>
          <span>Blok Puluhan & Satuan (Base-10 Blocks)</span>
        </h4>
        <div className="text-xl md:text-2xl font-black text-indigo-700 bg-indigo-100 px-4 py-1.5 rounded-full border border-indigo-300">
          {num1} {operation === 'addition' ? '+' : '−'} {num2} = {result}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        {/* Bilangan Pertama */}
        <div className="bg-white p-3 rounded-xl border border-indigo-200 shadow-xs flex flex-col">
          <div className="text-xs font-bold text-indigo-900 mb-2 flex justify-between">
            <span>Bilangan 1:</span>
            <span className="text-base text-indigo-600">{num1}</span>
          </div>
          <div className="text-[11px] text-slate-500 mb-2 font-medium">
            {tens1} Puluhan ({tens1 * 10}) + {ones1} Satuan ({ones1})
          </div>
          <div className="flex gap-4 items-start grow">
            {/* Puluhan */}
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: tens1 }).map((_, i) => renderTensRod('indigo', i))}
            </div>
            {/* Satuan */}
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: ones1 }).map((_, i) => renderOnesCube(i))}
            </div>
          </div>
        </div>

        {/* Bilangan Kedua */}
        <div className="bg-white p-3 rounded-xl border border-indigo-200 shadow-xs flex flex-col">
          <div className="text-xs font-bold text-indigo-900 mb-2 flex justify-between">
            <span>{operation === 'addition' ? 'Bilangan 2 (+):' : 'Dikurangi (−):'}</span>
            <span className="text-base text-indigo-600">{num2}</span>
          </div>
          <div className="text-[11px] text-slate-500 mb-2 font-medium">
            {tens2} Puluhan ({tens2 * 10}) + {ones2} Satuan ({ones2})
          </div>
          <div className="flex gap-4 items-start grow">
            {/* Puluhan */}
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: tens2 }).map((_, i) => renderTensRod('indigo', i))}
            </div>
            {/* Satuan */}
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: ones2 }).map((_, i) => renderOnesCube(i))}
            </div>
          </div>
        </div>

        {/* Hasil Akhir */}
        <div className="bg-emerald-50/70 p-3 rounded-xl border-2 border-emerald-300 shadow-xs flex flex-col">
          <div className="text-xs font-bold text-emerald-900 mb-2 flex justify-between">
            <span>Hasil Akhir (=):</span>
            <span className="text-lg text-emerald-700">{result}</span>
          </div>
          <div className="text-[11px] text-emerald-800 mb-2 font-medium">
            {resultTens} Puluhan ({resultTens * 10}) + {resultOnes} Satuan ({resultOnes})
          </div>
          <div className="flex gap-4 items-start grow">
            {/* Puluhan */}
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: resultTens }).map((_, i) => renderTensRod('emerald', i))}
            </div>
            {/* Satuan */}
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: resultOnes }).map((_, i) => renderOnesCube(i))}
            </div>
          </div>
        </div>
      </div>

      {interactive && (
        <div className="mt-4 pt-3 border-t border-indigo-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600">Bilangan 1:</span>
            <button
              onClick={() => {
                sound.playClick();
                setNum1(n => Math.max(10, n - 10));
              }}
              className="px-2 py-1 rounded bg-indigo-100 font-bold text-indigo-700 hover:bg-indigo-200"
            >
              −10
            </button>
            <span className="font-bold text-indigo-900 px-1">{num1}</span>
            <button
              onClick={() => {
                sound.playClick();
                setNum1(n => Math.min(80, n + 10));
              }}
              className="px-2 py-1 rounded bg-indigo-100 font-bold text-indigo-700 hover:bg-indigo-200"
            >
              +10
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600">Bilangan 2:</span>
            <button
              onClick={() => {
                sound.playClick();
                setNum2(n => Math.max(1, n - 5));
              }}
              className="px-2 py-1 rounded bg-indigo-100 font-bold text-indigo-700 hover:bg-indigo-200"
            >
              −5
            </button>
            <span className="font-bold text-indigo-900 px-1">{num2}</span>
            <button
              onClick={() => {
                sound.playClick();
                setNum2(n => Math.min(40, n + 5));
              }}
              className="px-2 py-1 rounded bg-indigo-100 font-bold text-indigo-700 hover:bg-indigo-200"
            >
              +5
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
