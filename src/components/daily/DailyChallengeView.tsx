import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUESTION_BANK } from '../../data/questionBank';
import { sound } from '../../utils/audio';

interface DailyChallengeViewProps {
  dailyStreak: number;
  completedDates: string[];
  onCompleteDaily: (xp: number, stars: number) => void;
}

export const DailyChallengeView: React.FC<DailyChallengeViewProps> = ({
  dailyStreak,
  completedDates,
  onCompleteDaily
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const isAlreadyDoneToday = completedDates.includes(todayStr);

  const [started, setStarted] = useState(false);
  const [curIndex, setCurIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(isAlreadyDoneToday);

  // Deterministic 5 questions for today based on date string
  const todayQuestions = React.useMemo(() => {
    const seed = todayStr.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0);
    const list = [];
    for (let i = 0; i < 5; i++) {
      const idx = (seed * 17 + i * 37) % QUESTION_BANK.length;
      list.push(QUESTION_BANK[idx]);
    }
    return list;
  }, [todayStr]);

  const currentQ = todayQuestions[curIndex];

  const handlePick = (opt: number) => {
    sound.playClick();
    setSelectedAns(opt);
  };

  const handleNext = () => {
    if (selectedAns === currentQ.answer) {
      sound.playCorrect();
      setScore(s => s + 1);
    } else {
      sound.playWrong();
    }

    if (curIndex + 1 < todayQuestions.length) {
      setCurIndex(i => i + 1);
      setSelectedAns(null);
    } else {
      sound.playVictory();
      confetti({ particleCount: 90, spread: 70 });
      setIsFinished(true);
      onCompleteDaily(100, 5);
    }
  };

  const daysOfWeek = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Streak Header Card */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-3xl p-6 shadow-lg text-center relative overflow-hidden">
        <div className="text-5xl mb-2 animate-bounce">🔥</div>
        <h2 className="text-2xl md:text-3xl font-black mb-1">
          Streak Belajar: {dailyStreak} Hari Berturut-turut!
        </h2>
        <p className="text-amber-100 text-xs md:text-sm max-w-sm mx-auto mb-4">
          Kerjakan 5 soal tantangan setiap hari untuk menjaga api belajarmu tetap menyala!
        </p>

        {/* 7 Days Streak Bar */}
        <div className="flex justify-between items-center bg-white/20 backdrop-blur-md p-3 rounded-2xl max-w-md mx-auto">
          {daysOfWeek.map((day, idx) => {
            const isDone = idx < (dailyStreak % 7 || (dailyStreak > 0 ? 7 : 0));
            return (
              <div key={day} className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-amber-100">{day}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    isDone
                      ? 'bg-amber-300 text-amber-950 shadow-xs'
                      : 'bg-white/30 text-white'
                  }`}
                >
                  {isDone ? '🔥' : '○'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Challenge Card */}
      <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 md:p-8 shadow-sm">
        {isFinished ? (
          <div className="text-center py-6 space-y-4">
            <div className="text-5xl">🏆</div>
            <h3 className="text-2xl font-black text-slate-900">
              Tantangan Hari Ini Sudah Selesai!
            </h3>
            <p className="text-slate-600 text-sm">
              Hebat sekali! Kamu sudah menyelesaikan misi harian dan mendapatkan hadiah +100 XP serta 5 Bintang Emas.
            </p>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl font-bold text-amber-900 text-sm max-w-xs mx-auto">
              Datang lagi besok untuk tantangan baru! 🌟
            </div>
          </div>
        ) : !started ? (
          <div className="text-center py-6 space-y-4">
            <h3 className="text-xl font-black text-slate-900">
              5 Soal Kilat Hari Ini
            </h3>
            <p className="text-slate-600 text-sm max-w-sm mx-auto">
              Hanya butuh 2 menit! Buktikan ketajaman berhitungmu sekarang.
            </p>
            <button
              onClick={() => {
                sound.playClick();
                setStarted(true);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black text-base px-8 py-3.5 rounded-2xl shadow-lg btn-press transition-transform active:scale-95"
            >
              Mulai Tantangan Harian ➔
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>Soal {curIndex + 1} dari 5</span>
              <span>⭐ Hadiah: +100 XP</span>
            </div>

            <div className="text-center py-4">
              <div className="text-4xl md:text-5xl font-black text-slate-900">
                {currentQ.question}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handlePick(opt)}
                  className={`py-4 rounded-2xl text-2xl font-black transition-all btn-press ${
                    selectedAns === opt
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-slate-50 border-2 border-slate-200 hover:border-orange-300 text-slate-800'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                disabled={selectedAns === null}
                onClick={handleNext}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm px-8 py-3 rounded-2xl shadow-md btn-press transition-transform active:scale-95"
              >
                {curIndex + 1 < 5 ? 'Lanjut ➔' : 'Selesai 🏆'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
