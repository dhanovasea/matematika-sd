import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';

interface MonsterBattleGameProps {
  onEarnReward: (xp: number, stars: number) => void;
  onExit: () => void;
}

export const MonsterBattleGame: React.FC<MonsterBattleGameProps> = ({
  onEarnReward,
  onExit
}) => {
  const [playerHp, setPlayerHp] = useState(100);
  const [monsterHp, setMonsterHp] = useState(100);
  const [battleLog, setBattleLog] = useState('Monster Slime Gelembung mengajakmu bertanding matematika!');
  const [isWon, setIsWon] = useState(false);

  // Dynamic battles
  const [num1, setNum1] = useState(38);
  const [num2, setNum2] = useState(15);
  const [op, setOp] = useState<'+' | '-'>('+');
  const [options, setOptions] = useState<number[]>([43, 53, 58, 63]);

  const currentAns = op === '+' ? num1 + num2 : num1 - num2;

  const nextProblem = () => {
    const isAdd = Math.random() > 0.4;
    let n1 = Math.floor(Math.random() * 40) + 10;
    let n2 = Math.floor(Math.random() * 30) + 5;
    if (!isAdd && n1 < n2) [n1, n2] = [n2, n1];
    const ans = isAdd ? n1 + n2 : n1 - n2;

    const opts = new Set<number>();
    opts.add(ans);
    while (opts.size < 4) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1);
      const fake = Math.max(0, ans + offset);
      if (fake !== ans) opts.add(fake);
    }

    setNum1(n1);
    setNum2(n2);
    setOp(isAdd ? '+' : '-');
    setOptions(Array.from(opts).sort(() => Math.random() - 0.5));
  };

  const handleAttack = (chosen: number) => {
    if (chosen === currentAns) {
      sound.playCorrect();
      const dmg = 35;
      const nextMhp = Math.max(0, monsterHp - dmg);
      setMonsterHp(nextMhp);
      setBattleLog(`✨ Tepat! Serangan Gelembung Bintang mengenai Slime sebesar ${dmg} poin!`);

      if (nextMhp <= 0) {
        sound.playVictory();
        confetti({ particleCount: 90, spread: 70 });
        setIsWon(true);
        onEarnReward(70, 5);
      } else {
        nextProblem();
      }
    } else {
      sound.playWrong();
      setPlayerHp(hp => Math.max(10, hp - 15));
      setBattleLog(`Ouch! Jawabanmu ${chosen} belum tepat (${num1} ${op} ${num2} = ${currentAns}). Ayo coba lagi!`);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-500 via-indigo-600 to-slate-800 p-4 md:p-8 rounded-3xl text-white shadow-xl min-h-[500px] flex flex-col justify-between relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl z-10">
        <button
          onClick={onExit}
          className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-xl text-xs font-bold transition-transform active:scale-95"
        >
          ← Keluar
        </button>
        <span className="font-black text-sm md:text-base">👾 Monster Matematika</span>
        <span className="text-xs bg-purple-400/30 px-3 py-1 rounded-full font-bold">
          Ronde Persahabatan
        </span>
      </div>

      {/* Battle Arena */}
      <div className="grid grid-cols-2 gap-4 items-center justify-items-center my-6 z-10">
        {/* Hero Miko Card */}
        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 w-full max-w-[220px]">
          <div className="text-4xl mb-1">🤖</div>
          <span className="text-sm font-black">Miko Hero</span>
          {/* Health Bar */}
          <div className="w-full bg-slate-700/60 h-3 rounded-full overflow-hidden mt-2 border border-white/30">
            <div
              className="bg-emerald-400 h-full transition-all duration-300"
              style={{ width: `${playerHp}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-emerald-300 mt-1">{playerHp} HP</span>
        </div>

        {/* Monster Card */}
        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 w-full max-w-[220px]">
          <div className="text-5xl mb-1 animate-bounce">👾</div>
          <span className="text-sm font-black text-amber-300">Slime Gelembung</span>
          {/* Health Bar */}
          <div className="w-full bg-slate-700/60 h-3 rounded-full overflow-hidden mt-2 border border-white/30">
            <div
              className="bg-rose-500 h-full transition-all duration-300"
              style={{ width: `${monsterHp}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-rose-300 mt-1">{monsterHp} HP</span>
        </div>
      </div>

      {/* Battle Dialogue Text */}
      <div className="bg-slate-900/60 border border-white/20 p-3 rounded-2xl text-center text-xs md:text-sm font-medium text-slate-200 z-10">
        {battleLog}
      </div>

      {/* Controls or Victory Card */}
      {!isWon ? (
        <div className="bg-white text-slate-900 p-5 rounded-3xl shadow-xl mt-4 z-10 max-w-lg mx-auto w-full text-center">
          <span className="text-xs font-bold text-indigo-600 uppercase block mb-1">
            Gunakan Mantra Matematika:
          </span>
          <div className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
            {num1} {op} {num2} = ?
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAttack(opt)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl py-3 rounded-xl shadow-md btn-press transition-transform active:scale-95 cursor-pointer"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white text-slate-900 p-6 rounded-3xl text-center max-w-md mx-auto z-10 shadow-2xl my-4">
          <div className="text-5xl mb-2">🌟</div>
          <h3 className="text-2xl font-black text-slate-900 mb-1">Slime Berhasil Dijinakkan!</h3>
          <p className="text-slate-600 text-xs mb-4">Slime sekarang menjadi sahabat matematikamu!</p>
          <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-xl font-bold text-indigo-900 mb-4 text-sm">
            +70 XP ⭐ +5 Bintang Juara!
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                setMonsterHp(100);
                setPlayerHp(100);
                setIsWon(false);
                nextProblem();
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs"
            >
              Tantang Lawan Baru ↺
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
    </div>
  );
};
