import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Question } from '../../types/math';
import { QUESTION_BANK } from '../../data/questionBank';
import { sound } from '../../utils/audio';

interface ExamViewProps {
  onFinishExam: (total: number, correct: number, durationSec: number, scorePct: number) => void;
}

export const ExamView: React.FC<ExamViewProps> = ({ onFinishExam }) => {
  const [examStarted, setExamStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(10); // 0 = untimed
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(600);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer countdown
  useEffect(() => {
    if (!examStarted || isExamCompleted) return;

    const timer = setInterval(() => {
      setElapsedTime(e => e + 1);
      if (timeLimitMinutes > 0) {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            handleCompleteExam();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, isExamCompleted, timeLimitMinutes]);

  const handleStartExam = () => {
    sound.playClick();
    // Shuffle all 208 questions randomly
    const shuffled = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, questionCount);

    setQuestions(chosen);
    setUserAnswers({});
    setCurrentIndex(0);
    setElapsedTime(0);
    setSecondsRemaining(timeLimitMinutes * 60);
    setIsExamCompleted(false);
    setExamStarted(true);
  };

  const handleSelectAnswer = (qIndex: number, val: number) => {
    sound.playClick();
    setUserAnswers(prev => ({ ...prev, [qIndex]: val }));
  };

  const handleCompleteExam = () => {
    sound.playVictory();
    confetti({ particleCount: 100, spread: 80 });

    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) correct++;
    });

    const scorePct = Math.round((correct / questions.length) * 100);
    setIsExamCompleted(true);
    onFinishExam(questions.length, correct, elapsedTime, scorePct);
  };

  // 1. Setup Screen
  if (!examStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-700 text-white p-6 md:p-8 rounded-3xl shadow-lg text-center relative overflow-hidden">
          <div className="text-5xl mb-2">🎓</div>
          <h2 className="text-2xl md:text-3xl font-black mb-2">Ujian Matematika 1–100</h2>
          <p className="text-violet-100 text-sm max-w-md mx-auto">
            Uji kemampuanmu secara mandiri seperti di sekolah! Jawaban dan pembahasan lengkap akan dibuka setelah ujian selesai.
          </p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-violet-200 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <label className="text-sm font-black text-slate-800 block mb-2">
              1. Pilih Jumlah Soal:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[10, 20, 25].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => setQuestionCount(cnt)}
                  className={`py-3 text-sm font-bold rounded-2xl border-2 transition-all ${
                    questionCount === cnt
                      ? 'border-violet-600 bg-violet-600 text-white shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {cnt} Soal
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-black text-slate-800 block mb-2">
              2. Batas Waktu:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { min: 5, label: '5 Menit (Cepat)' },
                { min: 10, label: '10 Menit (Standar)' },
                { min: 0, label: 'Tanpa Batas Waktu' }
              ].map(t => (
                <button
                  key={t.min}
                  onClick={() => setTimeLimitMinutes(t.min)}
                  className={`py-3 text-xs md:text-sm font-bold rounded-2xl border-2 transition-all ${
                    timeLimitMinutes === t.min
                      ? 'border-violet-600 bg-violet-600 text-white shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-violet-50 border border-violet-200 p-4 rounded-2xl text-xs text-violet-900 space-y-1">
            <strong>Aturan Ujian:</strong>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600">
              <li>Kamu bisa berpindah antar soal bebas sebelum mengumpulkan.</li>
              <li>Jawaban benar/salah tidak langsung diperlihatkan.</li>
              <li>Pembahasan langkah berhitung akan tersedia di akhir ujian.</li>
            </ul>
          </div>

          <button
            onClick={handleStartExam}
            className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-base md:text-lg shadow-lg btn-press transition-transform active:scale-95 cursor-pointer"
          >
            Mulai Ujian Sekarang ➔
          </button>
        </div>
      </div>
    );
  }

  // 2. Result & Discussion Screen
  if (isExamCompleted) {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) correct++;
    });
    const scorePct = Math.round((correct / questions.length) * 100);

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Report Card */}
        <div className="bg-white rounded-3xl border-2 border-violet-200 p-6 md:p-8 text-center shadow-lg space-y-4">
          <div className="text-5xl">{scorePct >= 75 ? '🎖️' : '📝'}</div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">
            Rapor Hasil Ujian Matematika
          </h2>

          <div className="grid grid-cols-4 gap-3 bg-violet-50 p-4 rounded-2xl border border-violet-200 max-w-lg mx-auto">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Soal</span>
              <span className="text-xl font-black text-slate-800">{questions.length}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Benar</span>
              <span className="text-xl font-black text-emerald-600">{correct}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Salah</span>
              <span className="text-xl font-black text-rose-500">{questions.length - correct}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Nilai</span>
              <span className="text-2xl font-black text-violet-700">{scorePct}</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => handleStartExam()}
              className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs"
            >
              Ujian Ulang ↺
            </button>
            <button
              onClick={() => setExamStarted(false)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-6 py-2.5 rounded-xl"
            >
              Kembali ke Menu
            </button>
          </div>
        </div>

        {/* Full Question Review / Pembahasan */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <span>🔍</span>
            <span>Pembahasan Jawaban Lengkap (Semua Soal)</span>
          </h3>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const userAns = userAnswers[idx];
              const isRight = userAns === q.answer;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border-2 ${
                    isRight ? 'border-emerald-200 bg-emerald-50/40' : 'border-rose-200 bg-rose-50/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">Soal #{idx + 1}</span>
                    <span
                      className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                        isRight ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                      }`}
                    >
                      {isRight ? '✓ Jawabanmu Benar' : '✗ Jawabanmu Salah'}
                    </span>
                  </div>

                  <div className="text-xl font-black text-slate-900 mb-2">
                    {q.question.replace('?', `${q.answer}`)}
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 mb-2">
                    <div>
                      Jawabanmu: <strong className={isRight ? 'text-emerald-700' : 'text-rose-600'}>{userAns !== undefined ? userAns : 'Tidak dijawab'}</strong>
                    </div>
                    {!isRight && (
                      <div>
                        Kunci Jawaban: <strong className="text-emerald-700">{q.answer}</strong>
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                    <strong className="text-violet-900 block mb-0.5 font-bold">
                      Cara Penyelesaian ({q.recommendedMethod}):
                    </strong>
                    <p>{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. Ongoing Exam Solver
  const curQ = questions[currentIndex];
  const answeredCount = Object.keys(userAnswers).length;

  const minutesLeft = Math.floor(secondsRemaining / 60);
  const secondsLeft = secondsRemaining % 60;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Top Bar with Timer */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold text-slate-500 block">Kemajuan Ujian</span>
          <span className="text-sm font-black text-slate-800">
            {answeredCount} / {questions.length} Dijawab
          </span>
        </div>

        {timeLimitMinutes > 0 && (
          <div
            className={`font-mono font-black text-base px-3 py-1.5 rounded-xl border ${
              secondsRemaining <= 120
                ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse'
                : 'bg-violet-50 text-violet-800 border-violet-200'
            }`}
          >
            ⏳ {minutesLeft}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
          </div>
        )}

        <button
          onClick={handleCompleteExam}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-transform active:scale-95"
        >
          Kumpulkan Ujian ➔
        </button>
      </div>

      {/* Question Carousel Number Pills */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 flex gap-1.5 overflow-x-auto">
        {questions.map((_, idx) => {
          const isAnswered = userAnswers[idx] !== undefined;
          const isCur = idx === currentIndex;

          return (
            <button
              key={idx}
              onClick={() => {
                sound.playClick();
                setCurrentIndex(idx);
              }}
              className={`w-8 h-8 rounded-xl font-bold text-xs shrink-0 transition-colors ${
                isCur
                  ? 'bg-violet-600 text-white shadow-sm ring-2 ring-violet-200'
                  : isAnswered
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Active Question */}
      <div className="bg-white rounded-3xl border-2 border-violet-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Soal Nomor {currentIndex + 1}</span>
          <span>Pilih salah satu jawaban yang benar</span>
        </div>

        <div className="text-center py-6">
          <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-wider">
            {curQ.question}
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3.5">
          {curQ.options.map((opt) => {
            const isChosen = userAnswers[currentIndex] === opt;
            return (
              <button
                key={opt}
                onClick={() => handleSelectAnswer(currentIndex, opt)}
                className={`py-5 px-4 rounded-2xl text-2xl md:text-3xl font-black transition-all btn-press ${
                  isChosen
                    ? 'bg-violet-600 border-2 border-violet-700 text-white shadow-md'
                    : 'bg-slate-50 border-2 border-slate-200 hover:border-violet-300 text-slate-800'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Navigation bottom */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <button
            disabled={currentIndex === 0}
            onClick={() => {
              sound.playClick();
              setCurrentIndex(i => Math.max(0, i - 1));
            }}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded-xl bg-slate-100"
          >
            ← Soal Sebelumnya
          </button>

          {currentIndex + 1 < questions.length ? (
            <button
              onClick={() => {
                sound.playClick();
                setCurrentIndex(i => i + 1);
              }}
              className="text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 px-5 py-2.5 rounded-xl shadow-xs"
            >
              Soal Selanjutnya ➔
            </button>
          ) : (
            <button
              onClick={handleCompleteExam}
              className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 rounded-xl shadow-xs"
            >
              Kumpulkan Ujian ➔
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
