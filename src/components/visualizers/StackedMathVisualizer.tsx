import React, { useState } from 'react';
import { sound } from '../../utils/audio';

interface StackedMathVisualizerProps {
  num1?: number; // e.g. 27 or 52
  num2?: number; // e.g. 18 or 27
  operation?: 'addition' | 'subtraction';
}

export const StackedMathVisualizer: React.FC<StackedMathVisualizerProps> = ({
  num1 = 27,
  num2 = 18,
  operation = 'addition'
}) => {
  const [step, setStep] = useState<number>(0);

  const tens1 = Math.floor(num1 / 10);
  const ones1 = num1 % 10;
  const tens2 = Math.floor(num2 / 10);
  const ones2 = num2 % 10;

  const isAddition = operation === 'addition';
  const hasCarry = isAddition && ones1 + ones2 >= 10;
  const carryVal = hasCarry ? 1 : 0;
  const rawOnesSum = isAddition ? (ones1 + ones2) % 10 : 0;
  const rawTensSum = isAddition ? tens1 + tens2 + carryVal : 0;

  const hasBorrow = !isAddition && ones1 < ones2;
  const borrowedOnes1 = hasBorrow ? ones1 + 10 : ones1;
  const borrowedTens1 = hasBorrow ? tens1 - 1 : tens1;
  const rawOnesDiff = !isAddition ? borrowedOnes1 - ones2 : 0;
  const rawTensDiff = !isAddition ? borrowedTens1 - tens2 : 0;

  const answer = isAddition ? num1 + num2 : num1 - num2;

  const nextStep = () => {
    sound.playPop();
    setStep(s => (s < 3 ? s + 1 : 0));
  };

  return (
    <div className="bg-white/95 border-2 border-violet-200 rounded-3xl p-4 md:p-6 shadow-sm max-w-xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h4 className="text-base md:text-lg font-bold text-violet-900 flex items-center gap-2">
          <span>📐</span>
          <span>Hitung Bersusun ({isAddition ? 'Menyimpan' : 'Meminjam'})</span>
        </h4>
        <button
          onClick={nextStep}
          className="text-xs font-bold px-3 py-1.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-xs transition-transform active:scale-95"
        >
          {step === 3 ? 'Ulangi Langkah ↺' : 'Langkah Berikutnya ➔'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 bg-violet-50/50 rounded-2xl border border-violet-100">
        {/* The Stacked Calculation Board */}
        <div className="font-mono bg-white p-6 rounded-2xl border-2 border-violet-300 shadow-md text-2xl md:text-3xl font-black text-slate-800 tracking-wider">
          {/* Header Column Names */}
          <div className="grid grid-cols-2 text-center text-xs text-violet-600 font-sans font-bold pb-2 border-b border-violet-200 tracking-normal">
            <span>PULUHAN</span>
            <span>SATUAN</span>
          </div>

          {/* Carry / Borrow Helper Row */}
          <div className="grid grid-cols-2 text-center h-8 items-center text-sm font-sans my-1">
            {isAddition ? (
              <>
                <div className="flex justify-center">
                  {hasCarry && step >= 1 && (
                    <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center border-2 border-amber-600 animate-bounce" title="Simpanan 1 Puluhan">
                      +1
                    </span>
                  )}
                </div>
                <div></div>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  {hasBorrow && step >= 1 && (
                    <span className="text-xs font-bold text-rose-600 bg-rose-100 px-1.5 rounded line-through">
                      {tens1} <span className="no-underline text-rose-700">➔ {borrowedTens1}</span>
                    </span>
                  )}
                </div>
                <div className="flex justify-center">
                  {hasBorrow && step >= 1 && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      {borrowedOnes1}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Num 1 */}
          <div className="grid grid-cols-2 text-center py-1">
            <span className={!isAddition && hasBorrow && step >= 1 ? 'opacity-40' : ''}>{tens1}</span>
            <span className={!isAddition && hasBorrow && step >= 1 ? 'opacity-40' : ''}>{ones1}</span>
          </div>

          {/* Num 2 with operator */}
          <div className="relative grid grid-cols-2 text-center py-1 border-b-4 border-slate-800">
            <span className="absolute -left-6 top-1 text-2xl font-black text-violet-700">
              {isAddition ? '+' : '−'}
            </span>
            <span>{tens2}</span>
            <span>{ones2}</span>
          </div>

          {/* Answer Row */}
          <div className="grid grid-cols-2 text-center pt-2 text-violet-900">
            <div>
              {step >= 2 ? (
                <span className="text-emerald-600 bg-emerald-100 px-2 rounded">
                  {isAddition ? rawTensSum : rawTensDiff}
                </span>
              ) : (
                <span className="text-slate-300">?</span>
              )}
            </div>
            <div>
              {step >= 1 ? (
                <span className="text-sky-600 bg-sky-100 px-2 rounded">
                  {isAddition ? rawOnesSum : rawOnesDiff}
                </span>
              ) : (
                <span className="text-slate-300">?</span>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Step-by-Step Explanation Guide */}
        <div className="flex-1 bg-white p-4 rounded-xl border border-violet-200 text-sm space-y-3">
          <div className="font-bold text-violet-900 text-sm flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center">
              {step + 1}
            </span>
            <span>
              {step === 0 && 'Siapkan Kolom Nilai Tempat'}
              {step === 1 && 'Langkah 1: Hitung Kolom Satuan'}
              {step === 2 && 'Langkah 2: Hitung Kolom Puluhan'}
              {step === 3 && 'Langkah 3: Jawaban Ditemukan!'}
            </span>
          </div>

          <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
            {step === 0 && (
              <>
                Letakkan angka sejajar. Puluhan sejajar puluhan, dan satuan sejajar satuan. Kita selalu mulai menghitung dari sebelah kanan (satuan) terlebih dahulu!
              </>
            )}
            {step === 1 && isAddition && (
              <>
                {ones1} + {ones2} = {ones1 + ones2}.{' '}
                {hasCarry ? (
                  <>
                    Karena lebih dari 9, tulis angka <strong>{rawOnesSum}</strong> di bawah satuan, dan simpan <strong>1 puluhan</strong> di atas kolom puluhan!
                  </>
                ) : (
                  <>Tulis angka {rawOnesSum} di bawah satuan.</>
                )}
              </>
            )}
            {step === 1 && !isAddition && (
              <>
                {hasBorrow ? (
                  <>
                    {ones1} tidak bisa dikurangi {ones2}. Pinjam 1 puluhan dari angka {tens1}. Angka {tens1} bersisa {borrowedTens1}. Satuan bertambah 10 menjadi {borrowedOnes1}. Lalu {borrowedOnes1} − {ones2} = <strong>{rawOnesDiff}</strong>!
                  </>
                ) : (
                  <>
                    {ones1} − {ones2} = <strong>{rawOnesDiff}</strong>.
                  </>
                )}
              </>
            )}
            {step === 2 && isAddition && (
              <>
                Sekarang hitung kolom puluhan: {hasCarry ? '1 (simpanan) + ' : ''} {tens1} + {tens2} = <strong>{rawTensSum}</strong> puluhan.
              </>
            )}
            {step === 2 && !isAddition && (
              <>
                Hitung kolom puluhan: {borrowedTens1} − {tens2} = <strong>{rawTensDiff}</strong> puluhan.
              </>
            )}
            {step === 3 && (
              <>
                Luar biasa! Hasil akhir dari {num1} {isAddition ? '+' : '−'} {num2} adalah{' '}
                <strong className="text-violet-700 text-base">{answer}</strong>. Mudah kan?
              </>
            )}
          </p>

          <div className="flex gap-1.5 pt-2">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  step >= i ? 'bg-violet-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
