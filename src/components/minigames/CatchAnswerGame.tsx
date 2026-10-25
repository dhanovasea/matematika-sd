import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';
import { MikoMascot } from '../mascot/MikoMascot';

interface CatchAnswerGameProps {
  onEarnReward: (xp: number, stars: number) => void;
  onExit: () => void;
  timerEnabled?: boolean;
}

interface DropItem {
  id: number;
  val: number;
  color: string;
}

export const CatchAnswerGame: React.FC<CatchAnswerGameProps> = ({
  onEarnReward,
  onExit,
  timerEnabled = true
}) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [num1, setNum1] = useState(6);
  const [num2, setNum2] = useState(4);
  const [op, setOp] = useState<'addition' | 'subtraction'>('addition');
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [items, setItems] = useState<DropItem[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const correctAnswer = op === 'addition' ? num1 + num2 : num1 - num2;

  // Generate new math problem & falling items
  const generateProblem = () => {
    const isAdd = Math.random() > 0.4;
    let n1 = Math.floor(Math.random() * 15) + 3;
    let n2 = Math.floor(Math.random() * 12) + 2;
    if (!isAdd && n1 < n2) {
      [n1, n2] = [n2, n1];
    }
    const ans = isAdd ? n1 + n2 : n1 - n2;
    setOp(isAdd ? 'addition' : 'subtraction');
    setNum1(n1);
    setNum2(n2);

    // 4 choices
    const choices = new Set<number>();
    choices.add(ans);
    while (choices.size < 4) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 4) + 1);
      const fake = Math.max(0, ans + offset);
      if (fake !== ans) choices.add(fake);
    }

    const colors = ['bg-rose-500', 'bg-amber-500', 'bg-emerald-500', 'bg-sky-500'];
    const choiceArr = Array.from(choices).sort(() => Math.random() - 0.5);
    setItems(
      choiceArr.map((val, idx) => ({
        id: idx,
        val,
        color: colors[idx % colors.length]
      }))
    );
    setTimeLeft(15);
    setFeedback(null);
  };

  useEffect(() => {
    generateProblem();
  }, [round]);

  // Timer countdown if enabled
  useEffect(() => {
    if (!timerEnabled || gameOver) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          sound.playWrong();
          handleMiss();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerEnabled, gameOver, round]);

  const handlePick = (pickedVal: number) => {
    if (pickedVal === correctAnswer) {
      sound.playCorrect();
      setFeedback('Hebat! Jawabanmu Tepat! 🌟');
      setScore(s => s + 10);
      if (round >= 5) {
        sound.playVictory();
        confetti({ particleCount: 80, spread: 70 });
        setGameOver(true);
        onEarnReward(50, 3);
      } else {
        setRound(r => r + 1);
      }
    } else {
      sound.playWrong();
      setFeedback(`Hampir! Coba lagi ya...`);
    }
  };

  const handleMiss = () => {
    if (round >= 5) {
      setGameOver(true);
      onEarnReward(score, Math.floor(score / 20));
    } else {
      setRound(r => r + 1);
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-400 to-emerald-400 p-4 md:p-8 rounded-3xl text-white shadow-xl min-h-[500px] flex flex-col justify-between relative overflow-hidden">
      {/* Background clouds */}
      <div className="absolute top-4 left-6 opacity-40 text-4xl">☁️</div>
      <div className="absolute top-12 right-12 opacity-40 text-5xl">☁️</div>

      {/* Top Bar */}
      <div className="flex items-center justify-between z-10 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="bg-white/30 hover:bg-white/40 px-3 py-1 rounded-xl text-xs font-bold transition-transform active:scale-95"
          >
            ← Keluar
          </button>
          <span className="font-black text-sm md:text-base">🍎 Tangkap Jawaban</span>
        </div>

        <div className="flex items-center gap-4 text-xs md:text-sm font-bold">
          <span>Ronde: {round}/5</span>
          <span>Skor: {score} XP</span>
          {timerEnabled && (
            <span className={`px-2 py-0.5 rounded-full ${timeLeft <= 4 ? 'bg-red-500 animate-pulse' : 'bg-white/30'}`}>
              ⏳ {timeLeft} dtk
            </span>
          )}
        </div>
      </div>

      {/* Center Game Play */}
      {!gameOver ? (
        <div className="flex flex-col items-center justify-center my-6 z-10 text-center">
          <MikoMascot mood="happy" speechText="Tangkap balon atau apel dengan angka yang benar!" size="sm" className="mb-2" />

          {/* Equation Target */}
          <div className="bg-white text-slate-800 px-8 py-4 rounded-3xl shadow-lg border-4 border-amber-300 my-4 transform transition-transform hover:scale-105">
            <span className="text-xs font-bold text-amber-600 block uppercase">Soal Matematika:</span>
            <div className="text-4xl md:text-5xl font-black tracking-wider text-slate-900">
              {num1} {op === 'addition' ? '+' : '−'} {num2} = <span className="text-sky-600">?</span>
            </div>
          </div>

          {feedback && (
            <div className="text-sm font-black bg-white/30 px-4 py-1 rounded-full mb-3 backdrop-blur-xs animate-bounce">
              {feedback}
            </div>
          )}

          {/* Falling Floating Fruit/Balloon Choices */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-lg mt-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePick(item.val)}
                className={`${item.color} btn-press border-4 border-white/80 rounded-2xl py-6 px-4 flex flex-col items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer`}
              >
                <span className="text-2xl mb-1">🎈</span>
                <span className="text-3xl md:text-4xl font-black">{item.val}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white text-slate-800 p-8 rounded-3xl text-center max-w-md mx-auto z-10 shadow-2xl">
          <div className="text-5xl mb-3">🎉</div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Permainan Selesai!</h3>
          <p className="text-slate-600 mb-4">Kamu sangat tangkas menangkap jawaban!</p>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 mb-6">
            <div className="text-sm text-amber-800 font-bold">Total Hadiah:</div>
            <div className="text-3xl font-black text-amber-600">+{score} XP ⭐ +3 Bintang</div>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setRound(1);
                setScore(0);
                setGameOver(false);
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-2xl shadow-md transition-transform active:scale-95"
            >
              Main Lagi ↺
            </button>
            <button
              onClick={onExit}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-6 py-2.5 rounded-2xl transition-transform active:scale-95"
            >
              Kembali ke Menu
            </button>
          </div>
        </div>
      )}

      {/* Ground Footer */}
      <div className="h-6 bg-emerald-600 -mx-4 -mb-4 md:-mx-8 md:-mb-8 rounded-b-3xl border-t-4 border-emerald-300" />
    </div>
  );
};
