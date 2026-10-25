import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';

interface SpeedRaceGameProps {
  onEarnReward: (xp: number, stars: number) => void;
  onExit: () => void;
  timerEnabled?: boolean;
}

export const SpeedRaceGame: React.FC<SpeedRaceGameProps> = ({
  onEarnReward,
  onExit,
  timerEnabled = true
}) => {
  const [playerDist, setPlayerDist] = useState(0); // 0 to 100
  const [rivalDist, setRivalDist] = useState(0);   // 0 to 100
  const [isFinished, setIsFinished] = useState(false);
  const [playerWon, setPlayerWon] = useState(false);

  const [num1, setNum1] = useState(24);
  const [num2, setNum2] = useState(11);
  const [op, setOp] = useState<'+' | '-'>('+');
  const [options, setOptions] = useState<number[]>([33, 35, 36, 45]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentAns = op === '+' ? num1 + num2 : num1 - num2;

  // New question generator
  const nextProblem = () => {
    const isAdd = Math.random() > 0.4;
    let n1 = Math.floor(Math.random() * 50) + 10;
    let n2 = Math.floor(Math.random() * 25) + 5;
    if (!isAdd && n1 < n2) [n1, n2] = [n2, n1];
    const ans = isAdd ? n1 + n2 : n1 - n2;

    const opts = new Set<number>();
    opts.add(ans);
    while (opts.size < 4) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 4) + 1);
      const fake = Math.max(0, ans + offset);
      if (fake !== ans) opts.add(fake);
    }
    setNum1(n1);
    setNum2(n2);
    setOp(isAdd ? '+' : '-');
    setOptions(Array.from(opts).sort(() => Math.random() - 0.5));
    setFeedback(null);
  };

  // Rival slow automatic creep forward if timer is active
  useEffect(() => {
    if (!timerEnabled || isFinished) return;
    const interval = setInterval(() => {
      setRivalDist(r => {
        const next = r + 2.5;
        if (next >= 100 && !isFinished) {
          setIsFinished(true);
          setPlayerWon(false);
          sound.playWrong();
          return 100;
        }
        return next;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [timerEnabled, isFinished]);

  const handlePickAnswer = (chosen: number) => {
    if (chosen === currentAns) {
      sound.playCorrect();
      sound.playPop();
      setFeedback('⚡ TURBO BOOST AKTIF! Kencang melesat!');

      const nextP = Math.min(100, playerDist + 25);
      setPlayerDist(nextP);

      if (nextP >= 100) {
        sound.playVictory();
        confetti({ particleCount: 100, spread: 80 });
        setIsFinished(true);
        setPlayerWon(true);
        onEarnReward(80, 5);
      } else {
        setTimeout(nextProblem, 500);
      }
    } else {
      sound.playWrong();
      setFeedback('Kecepatan menurun! Coba hitung lagi.');
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-400 via-indigo-400 to-emerald-400 p-4 md:p-8 rounded-3xl text-white shadow-xl min-h-[500px] flex flex-col justify-between relative overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl z-10">
        <button
          onClick={onExit}
          className="bg-white/30 hover:bg-white/40 px-3 py-1 rounded-xl text-xs font-bold transition-transform active:scale-95"
        >
          ← Keluar
        </button>
        <span className="font-black text-sm md:text-base">🏎️ Balap Angka Kilat</span>
        <span className="text-xs font-bold bg-amber-400 text-amber-950 px-3 py-1 rounded-full">
          Jalur 100 Meter
        </span>
      </div>

      {/* Race Track Canvas */}
      <div className="my-4 bg-slate-800/80 p-4 rounded-3xl border-2 border-white/30 z-10 space-y-4">
        {/* Track 1: Miko Kart */}
        <div className="relative">
          <div className="flex justify-between text-xs font-bold text-sky-200 mb-1">
            <span>🏎️ Miko Kart (Kamu)</span>
            <span>{Math.round(playerDist)}% Menuju Finish</span>
          </div>
          <div className="h-10 bg-slate-900 rounded-2xl relative border-2 border-sky-400 overflow-hidden flex items-center px-2">
            {/* Finish Line Checkers */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-[repeating-linear-gradient(45deg,#fff,#fff_4px,#000_4px,#000_8px)] opacity-50" />
            {/* Player Kart */}
            <div
              className="absolute transition-all duration-500 flex items-center gap-1"
              style={{ left: `calc(${playerDist}% * 0.85)` }}
            >
              <span className="text-2xl drop-shadow">🏎️</span>
              <span className="bg-sky-500 text-white text-[9px] font-bold px-1 rounded-sm">MIKO</span>
            </div>
          </div>
        </div>

        {/* Track 2: Kelinci Rival */}
        <div className="relative">
          <div className="flex justify-between text-xs font-bold text-amber-200 mb-1">
            <span>🐰 Kelinci Turbo (Rival)</span>
            <span>{Math.round(rivalDist)}% Menuju Finish</span>
          </div>
          <div className="h-10 bg-slate-900 rounded-2xl relative border-2 border-amber-400 overflow-hidden flex items-center px-2">
            {/* Finish Line Checkers */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-[repeating-linear-gradient(45deg,#fff,#fff_4px,#000_4px,#000_8px)] opacity-50" />
            {/* Rival Kart */}
            <div
              className="absolute transition-all duration-500 flex items-center gap-1"
              style={{ left: `calc(${rivalDist}% * 0.85)` }}
            >
              <span className="text-2xl drop-shadow">🛺</span>
              <span className="bg-amber-500 text-amber-950 text-[9px] font-bold px-1 rounded-sm">RIVAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Math Problem Card */}
      {!isFinished ? (
        <div className="bg-white text-slate-900 p-5 rounded-3xl shadow-xl z-10 max-w-lg mx-auto w-full text-center">
          <span className="text-xs font-bold text-sky-600 uppercase block mb-1">
            Jawab Cepat Untuk Turbo Boost:
          </span>
          <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
            {num1} {op} {num2} = ?
          </div>

          {feedback && (
            <p className="text-xs font-bold text-sky-700 bg-sky-50 py-1 px-3 rounded-full inline-block mb-3">
              {feedback}
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handlePickAnswer(opt)}
                className="bg-sky-500 hover:bg-sky-600 text-white font-black text-xl py-3 rounded-xl shadow-md btn-press transition-transform active:scale-95 cursor-pointer"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white text-slate-900 p-6 rounded-3xl text-center max-w-md mx-auto z-10 shadow-2xl">
          <div className="text-5xl mb-2">{playerWon ? '🥇' : '🏁'}</div>
          <h3 className="text-2xl font-black text-slate-900 mb-1">
            {playerWon ? 'Selamat! Juara 1 Balapan!' : 'Balapan Selesai!'}
          </h3>
          <p className="text-slate-600 text-xs mb-4">
            {playerWon
              ? 'Miko Kart melintasi garis finish tercepat dengan turbo matematika!'
              : 'Kelinci sampai duluan, tapi usahamu luar biasa. Coba lagi yuk!'}
          </p>
          {playerWon && (
            <div className="bg-amber-100 p-3 rounded-xl border border-amber-300 font-bold text-amber-900 mb-4 text-sm">
              +80 XP ⭐ +5 Bintang Piala Emas!
            </div>
          )}
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                setPlayerDist(0);
                setRivalDist(0);
                setIsFinished(false);
                nextProblem();
              }}
              className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs"
            >
              Balap Lagi ↺
            </button>
            <button
              onClick={onExit}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-5 py-2.5 rounded-xl"
            >
              Kembali
            </button>
          </div>
        </div>
      )}

      {/* Track Foot */}
      <div className="h-2" />
    </div>
  );
};
