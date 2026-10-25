import React, { useState } from 'react';
import { sound } from '../../utils/audio';

interface NumberLineVisualizerProps {
  startNumber?: number;
  stepCount?: number;
  operation?: 'addition' | 'subtraction';
  min?: number;
  max?: number;
  interactive?: boolean;
}

export const NumberLineVisualizer: React.FC<NumberLineVisualizerProps> = ({
  startNumber = 7,
  stepCount = 4,
  operation = 'addition',
  min = 0,
  max = 20,
  interactive = true
}) => {
  const [currentStart, setCurrentStart] = useState(startNumber);
  const [currentSteps, setCurrentSteps] = useState(stepCount);
  const [currentOp, setCurrentOp] = useState<'addition' | 'subtraction'>(operation);

  const targetNumber = currentOp === 'addition'
    ? Math.min(max, currentStart + currentSteps)
    : Math.max(min, currentStart - currentSteps);

  const range = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  const handleStepJump = (val: number) => {
    sound.playPop();
    setCurrentStart(val);
  };

  return (
    <div className="bg-white/90 border-2 border-sky-200 rounded-3xl p-4 md:p-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
        <h4 className="text-base md:text-lg font-bold text-sky-900 flex items-center gap-2">
          <span>🐸</span>
          <span>Garis Bilangan Melompat</span>
        </h4>
        <div className="text-xl md:text-2xl font-black text-sky-700 bg-sky-100 px-4 py-1.5 rounded-full border border-sky-300">
          {currentStart} {currentOp === 'addition' ? '+' : '−'} {currentSteps} = {targetNumber}
        </div>
      </div>

      <div className="overflow-x-auto pb-4 pt-8">
        <div className="min-w-[650px] relative px-6 py-4">
          {/* Main Axis Line */}
          <div className="h-2 bg-sky-300 rounded-full w-full relative">
            {/* Arrow on ends */}
            <div className="absolute -left-2 -top-1 w-0 h-0 border-r-8 border-r-sky-500 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
            <div className="absolute -right-2 -top-1 w-0 h-0 border-l-8 border-l-sky-500 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
          </div>

          {/* Jump Arc Visualizer */}
          <svg className="w-full h-16 absolute top-0 left-0 pointer-events-none" viewBox={`0 0 100 30`} preserveAspectRatio="none">
            {/* SVG curved path from currentStart to targetNumber */}
            {(() => {
              const startPct = ((currentStart - min) / (max - min)) * 90 + 5;
              const targetPct = ((targetNumber - min) / (max - min)) * 90 + 5;
              const midPct = (startPct + targetPct) / 2;
              const arcY = 5;
              const strokeColor = currentOp === 'addition' ? '#10b981' : '#f43f5e';
              return (
                <>
                  <path
                    d={`M ${startPct} 26 Q ${midPct} ${arcY} ${targetPct} 26`}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="3"
                    strokeDasharray="4 2"
                    className="drop-shadow-sm"
                  />
                  {/* Arrowhead at target */}
                  <circle cx={targetPct} cy={25} r="3" fill={strokeColor} />
                </>
              );
            })()}
          </svg>

          {/* Number Tick Marks and Buttons */}
          <div className="flex justify-between items-center relative -top-3">
            {range.map((num) => {
              const isStart = num === currentStart;
              const isTarget = num === targetNumber;
              const isPassed = currentOp === 'addition'
                ? num > currentStart && num < targetNumber
                : num < currentStart && num > targetNumber;

              return (
                <div key={num} className="flex flex-col items-center">
                  {/* Tick mark */}
                  <div
                    className={`w-1 h-3 rounded-full mb-1 ${
                      isStart || isTarget ? 'bg-sky-600 h-4' : 'bg-sky-300'
                    }`}
                  />
                  {/* Interactive Button */}
                  <button
                    disabled={!interactive}
                    onClick={() => handleStepJump(num)}
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full text-xs md:text-sm font-bold flex items-center justify-center transition-all ${
                      isStart
                        ? 'bg-amber-500 text-white shadow-md scale-125 ring-4 ring-amber-200 z-10'
                        : isTarget
                        ? 'bg-emerald-500 text-white shadow-md scale-125 ring-4 ring-emerald-200 z-10'
                        : isPassed
                        ? 'bg-sky-100 text-sky-800 font-bold border border-sky-300'
                        : 'bg-white text-slate-700 hover:bg-sky-50 border border-slate-200'
                    }`}
                  >
                    {num}
                  </button>

                  {/* Indicator label */}
                  {isStart && (
                    <span className="text-[10px] font-bold text-amber-700 mt-1 uppercase tracking-tight">
                      Mulai
                    </span>
                  )}
                  {isTarget && (
                    <span className="text-[10px] font-bold text-emerald-700 mt-1 uppercase tracking-tight">
                      Tujuan
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control panel if interactive */}
      {interactive && (
        <div className="mt-4 pt-4 border-t border-sky-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Arah Lompatan:</span>
            <button
              onClick={() => {
                sound.playClick();
                setCurrentOp('addition');
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                currentOp === 'addition'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Maju (+ Tambah)
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setCurrentOp('subtraction');
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                currentOp === 'subtraction'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Mundur (− Kurang)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Jumlah Langkah:</span>
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentSteps(s => Math.max(1, s - 1));
                }}
                className="w-7 h-7 rounded bg-white text-slate-800 font-bold flex items-center justify-center hover:bg-slate-50"
              >
                −
              </button>
              <span className="w-8 text-center font-black text-sm text-sky-800">
                {currentSteps}
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentSteps(s => Math.min(10, s + 1));
                }}
                className="w-7 h-7 rounded bg-white text-slate-800 font-bold flex items-center justify-center hover:bg-slate-50"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
