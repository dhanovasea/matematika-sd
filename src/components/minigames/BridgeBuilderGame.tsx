import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';

interface BridgeBuilderGameProps {
  onEarnReward: (xp: number, stars: number) => void;
  onExit: () => void;
}

export const BridgeBuilderGame: React.FC<BridgeBuilderGameProps> = ({
  onEarnReward,
  onExit
}) => {
  const [planksBuilt, setPlanksBuilt] = useState(0); // 0 to 4
  const [problemIndex, setProblemIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isWon, setIsWon] = useState(false);

  // 4 sequential bridge problems
  const problems = [
    { n1: 25, n2: 15, op: '+', ans: 40, opts: [35, 40, 45, 50], prompt: 'Pasang balok kayu pertama!' },
    { n1: 40, n2: 12, op: '-', ans: 28, opts: [26, 28, 30, 32], prompt: 'Kuatkan tiang tengah!' },
    { n1: 33, n2: 17, op: '+', ans: 50, opts: [40, 48, 50, 52], prompt: 'Pasang tali pengaman jembatan!' },
    { n1: 60, n2: 25, op: '-', ans: 35, opts: [30, 35, 40, 45], prompt: 'Pasang papan terakhir ke Pulau Bintang!' }
  ];

  const current = problems[problemIndex];

  const handlePickAnswer = (opt: number) => {
    if (opt === current.ans) {
      sound.playCorrect();
      setFeedback('Hebat! Balok jembatan berhasil terpasang!');
      setPlanksBuilt(p => p + 1);

      if (problemIndex + 1 >= problems.length) {
        sound.playVictory();
        confetti({ particleCount: 100, spread: 80 });
        setIsWon(true);
        onEarnReward(60, 4);
      } else {
        setTimeout(() => {
          setProblemIndex(i => i + 1);
          setFeedback(null);
        }, 900);
      }
    } else {
      sound.playWrong();
      setFeedback('Balok kayu belum pas! Coba hitung lagi ya...');
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-300 via-teal-200 to-emerald-300 p-4 md:p-8 rounded-3xl shadow-xl min-h-[500px] flex flex-col justify-between relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white/30 backdrop-blur-md px-4 py-2 rounded-2xl z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="bg-white/40 hover:bg-white/60 px-3 py-1 rounded-xl text-xs font-bold text-slate-800 transition-transform active:scale-95"
          >
            ← Keluar
          </button>
          <span className="font-black text-slate-900 text-sm md:text-base">🌉 Bangun Jembatan Sungai</span>
        </div>
        <div className="text-xs md:text-sm font-bold text-teal-950 bg-white/40 px-3 py-1 rounded-full">
          Jembatan Selesai: {planksBuilt} / 4 Bagian
        </div>
      </div>

      {/* Bridge Visual Illustration */}
      <div className="relative my-6 flex items-center justify-between px-2 md:px-8 z-10">
        {/* Left Cliff Island */}
        <div className="w-24 md:w-32 h-36 bg-amber-700 border-t-8 border-emerald-500 rounded-t-2xl flex flex-col items-center justify-start pt-2 shadow-lg">
          <span className="text-3xl animate-bounce">🤖</span>
          <span className="text-[10px] font-bold text-amber-100 bg-amber-900/60 px-2 rounded-full mt-1">
            Pulau Awal
          </span>
        </div>

        {/* River Water & Bridge Planks in between */}
        <div className="flex-1 h-32 mx-2 md:mx-4 relative flex items-center justify-center">
          {/* Animated river waves */}
          <div className="absolute inset-x-0 bottom-2 text-center text-sky-600/40 text-xl overflow-hidden tracking-widest select-none">
            🌊 🌊 🌊 🌊 🌊 🌊
          </div>

          {/* Stepping Planks (4 segments) */}
          <div className="flex w-full justify-between items-center px-4 relative z-10">
            {[0, 1, 2, 3].map((idx) => {
              const built = planksBuilt > idx;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-12 md:w-16 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all duration-500 border-2 ${
                      built
                        ? 'bg-amber-600 border-amber-800 text-amber-100 shadow-md transform -translate-y-2'
                        : 'bg-teal-900/20 border-dashed border-teal-700/40 text-teal-900/50'
                    }`}
                  >
                    {built ? '🪵 Kokoh' : `Bagian ${idx + 1}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Treasure Island */}
        <div className="w-24 md:w-32 h-36 bg-amber-700 border-t-8 border-emerald-500 rounded-t-2xl flex flex-col items-center justify-start pt-2 shadow-lg">
          <span className="text-3xl animate-pulse">🎁</span>
          <span className="text-[10px] font-bold text-amber-100 bg-amber-900/60 px-2 rounded-full mt-1">
            Pulau Harta
          </span>
        </div>
      </div>

      {/* Game Interactive Zone */}
      {!isWon ? (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-teal-200 z-10 max-w-xl mx-auto w-full text-center">
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wide block mb-1">
            {current.prompt}
          </span>
          <div className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
            {current.n1} {current.op} {current.n2} = <span className="text-teal-600">?</span>
          </div>

          {feedback && (
            <p className="text-xs font-bold text-teal-700 bg-teal-50 py-1 px-3 rounded-full inline-block mb-3">
              {feedback}
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {current.opts.map((opt) => (
              <button
                key={opt}
                onClick={() => handlePickAnswer(opt)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-black text-2xl py-3 rounded-2xl shadow-md btn-press transition-transform active:scale-95 cursor-pointer"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-3xl text-center max-w-md mx-auto z-10 shadow-2xl">
          <div className="text-5xl mb-2">🏆</div>
          <h3 className="text-2xl font-black text-slate-900 mb-1">Jembatan Berhasil Tersambung!</h3>
          <p className="text-slate-600 text-sm mb-4">Miko berhasil menyeberang dan membuka peti harta karun!</p>
          <div className="bg-amber-100 p-3 rounded-xl border border-amber-300 font-bold text-amber-900 mb-4">
            +60 XP ⭐ +4 Bintang Penemu!
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                setPlanksBuilt(0);
                setProblemIndex(0);
                setIsWon(false);
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs"
            >
              Main Lagi ↺
            </button>
            <button
              onClick={onExit}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-5 py-2.5 rounded-xl"
            >
              Selesai
            </button>
          </div>
        </div>
      )}

      {/* River Bed Footer */}
      <div className="h-6 bg-teal-800 -mx-4 -mb-4 md:-mx-8 md:-mb-8 rounded-b-3xl" />
    </div>
  );
};
