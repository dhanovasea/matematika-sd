import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Question, QuestionCategory, DifficultyLevel } from '../../types/math';
import { QUESTION_BANK } from '../../data/questionBank';
import { CATEGORIES } from '../../data/categories';
import { sound } from '../../utils/audio';
import { MikoMascot } from '../mascot/MikoMascot';
import { NumberLineVisualizer } from '../visualizers/NumberLineVisualizer';
import { TenFrameVisualizer } from '../visualizers/TenFrameVisualizer';
import { ConcreteCounter } from '../visualizers/ConcreteCounter';

interface PracticeViewProps {
  initialCategory?: QuestionCategory;
  wrongQuestionIds: string[];
  timerEnabled?: boolean;
  onFinishSession: (
    category: string,
    total: number,
    correct: number,
    durationSec: number,
    newWrongIds: string[],
    resolvedWrongIds: string[]
  ) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  initialCategory,
  wrongQuestionIds,
  timerEnabled = true,
  onFinishSession
}) => {
  // Session Configuration State
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [isWrongOnlyMode, setIsWrongOnlyMode] = useState<boolean>(false);

  // Active Quiz State
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [hintLevel, setHintLevel] = useState<number>(0); // 0 = none, 1 = text hint, 2 = visual aid

  // Session Stats
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [sessionWrongIds, setSessionWrongIds] = useState<string[]>([]);
  const [sessionResolvedIds, setSessionResolvedIds] = useState<string[]>([]);

  // Timer effect
  useEffect(() => {
    let timer: number | null = null;
    if (isSessionActive && !isFinished) {
      timer = window.setInterval(() => {
        setElapsedSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSessionActive, isFinished]);

  // Start Session
  const handleStartPractice = () => {
    sound.playClick();
    let pool = [...QUESTION_BANK];

    if (isWrongOnlyMode) {
      pool = pool.filter(q => wrongQuestionIds.includes(q.id));
      if (pool.length === 0) {
        alert('Hebat! Belum ada soal yang pernah salah dijawab.');
        return;
      }
    } else {
      if (selectedCategory !== 'all') {
        pool = pool.filter(q => q.category === selectedCategory);
      }
      if (selectedDifficulty !== 'all') {
        pool = pool.filter(q => q.difficulty === selectedDifficulty);
      }
    }

    // Shuffle pool
    const shuffled = pool.sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setQuestions(chosen);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowExplanation(false);
    setHintLevel(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setElapsedSeconds(0);
    setSessionWrongIds([]);
    setSessionResolvedIds([]);
    setIsFinished(false);
    setIsSessionActive(true);
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (opt: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedAnswer(opt);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswerSubmitted) return;

    const correct = selectedAnswer === currentQ.answer;
    setIsAnswerSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect();
      setCorrectCount(c => c + 1);
      if (wrongQuestionIds.includes(currentQ.id)) {
        setSessionResolvedIds(prev => [...prev, currentQ.id]);
      }
    } else {
      sound.playWrong();
      setIncorrectCount(c => c + 1);
      setSessionWrongIds(prev => [...prev, currentQ.id]);
      setHintLevel(prev => Math.min(2, prev + 1));
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setShowExplanation(false);
      setHintLevel(0);
    } else {
      // Session finished
      sound.playVictory();
      confetti({ particleCount: 90, spread: 70 });
      setIsFinished(true);
      onFinishSession(
        selectedCategory,
        questions.length,
        correctCount + (isCorrect ? 1 : 0),
        elapsedSeconds,
        sessionWrongIds,
        sessionResolvedIds
      );
    }
  };

  // 1. Session Setup Screen
  if (!isSessionActive) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 md:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block mb-2">
              Latihan Soal Adaptif
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-1">Pilih Mode Latihanmu</h2>
            <p className="text-amber-100 text-sm max-w-lg">
              Pilih materi, tentukan tingkat kesulitan, atau ulang soal yang pernah salah agar pemahamanmu semakin kuat!
            </p>
          </div>
          <MikoMascot mood="happy" size="md" speechText="Ayo asah kemampuan matematikamu!" />
        </div>

        {/* Configuration Card */}
        <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 md:p-8 shadow-sm space-y-6">
          {/* Wrong questions replay button if any */}
          {wrongQuestionIds.length > 0 && (
            <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-bold text-rose-900 text-sm">
                    Kamu punya {wrongQuestionIds.length} soal untuk diperbaiki
                  </h4>
                  <p className="text-xs text-rose-700">
                    Latih kembali soal-soal ini untuk mengubahnya menjadi bintang keberhasilan!
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsWrongOnlyMode(true);
                  handleStartPractice();
                }}
                className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-transform active:scale-95 whitespace-nowrap"
              >
                Latih Soal Salah ➔
              </button>
            </div>
          )}

          {/* Category Picker */}
          <div>
            <label className="text-sm font-black text-slate-800 block mb-3">
              1. Pilih Materi Pembelajaran:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`p-3 rounded-2xl text-left border-2 transition-all ${
                  selectedCategory === 'all'
                    ? 'border-amber-500 bg-amber-50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-lg">🌟</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Semua Materi</div>
                <div className="text-[10px] text-slate-500">Bank 208 Soal Acak</div>
              </button>

              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3 rounded-2xl text-left border-2 transition-all ${
                    selectedCategory === cat.id
                      ? 'border-amber-500 bg-amber-50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="text-lg">📚</div>
                  <div className="text-xs font-bold text-slate-800 mt-1 truncate">{cat.shortTitle}</div>
                  <div className="text-[10px] text-slate-500">26 Soal Pilihan</div>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty & Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            {/* Difficulty */}
            <div>
              <label className="text-sm font-black text-slate-800 block mb-2">
                2. Tingkat Kesulitan:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'all', label: 'Campur' },
                  { id: 'easy', label: 'Mudah' },
                  { id: 'medium', label: 'Sedang' },
                  { id: 'hard', label: 'Tantangan' }
                ].map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDifficulty(d.id)}
                    className={`py-2 text-xs font-bold rounded-xl border-2 transition-colors ${
                      selectedDifficulty === d.id
                        ? 'border-amber-500 bg-amber-500 text-white shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div>
              <label className="text-sm font-black text-slate-800 block mb-2">
                3. Jumlah Soal:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 20, 25].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => setQuestionCount(cnt)}
                    className={`py-2 text-xs font-bold rounded-xl border-2 transition-colors ${
                      questionCount === cnt
                        ? 'border-amber-500 bg-amber-500 text-white shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {cnt} Soal
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => {
                setIsWrongOnlyMode(false);
                handleStartPractice();
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white text-base md:text-lg font-black px-10 py-4 rounded-2xl shadow-lg btn-press transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Mulai Latihan Sekarang!</span>
              <span>➔</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Summary Screen after completion
  if (isFinished) {
    const accuracy = Math.round((correctCount / questions.length) * 100);
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;

    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl border-2 border-amber-300 shadow-xl p-6 md:p-8 text-center space-y-6">
        <div className="text-6xl animate-bounce">
          {accuracy >= 80 ? '🌟' : accuracy >= 50 ? '👍' : '💪'}
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">
            {accuracy === 100
              ? 'Luar Biasa Sempurna!'
              : accuracy >= 80
              ? 'Hebat Sekali!'
              : 'Latihan yang Bagus!'}
          </h2>
          <p className="text-slate-600 text-sm">
            Setiap latihan membuat otak matematikamu semakin cerdas!
          </p>
        </div>

        {/* Score Card */}
        <div className="grid grid-cols-3 gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-200">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase block">Benar</span>
            <span className="text-2xl font-black text-emerald-600">{correctCount}</span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase block">Salah</span>
            <span className="text-2xl font-black text-rose-500">{incorrectCount}</span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase block">Akurasi</span>
            <span className="text-2xl font-black text-amber-700">{accuracy}%</span>
          </div>
        </div>

        <div className="text-xs text-slate-500 flex justify-center gap-4">
          <span>⏱️ Waktu: {mins > 0 ? `${mins}m ` : ''}{secs}d</span>
          <span>⭐ Hadiah: +{correctCount * 10} XP</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={() => handleStartPractice()}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md btn-press transition-transform active:scale-95"
          >
            Latihan Lagi ↺
          </button>
          <button
            onClick={() => setIsSessionActive(false)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-6 py-3 rounded-2xl transition-colors"
          >
            Pilih Materi Lain
          </button>
        </div>
      </div>
    );
  }

  // 3. Active Quiz Question Solver
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Quiz Top Bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <button
          onClick={() => {
            sound.playClick();
            setIsSessionActive(false);
          }}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl"
        >
          ✕ Keluar
        </button>

        {/* Progress Bar */}
        <div className="flex-1 mx-4">
          <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
            <span>Soal {currentIndex + 1} dari {questions.length}</span>
            <span>Benar: {correctCount}</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {timerEnabled && (
          <div className="text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-xl">
            ⏱️ {elapsedSeconds}s
          </div>
        )}
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
            {currentQ.recommendedMethod}
          </span>
          <span className="text-slate-400 font-medium">ID: {currentQ.id}</span>
        </div>

        {/* Big Math Expression */}
        <div className="text-center py-4">
          <div className="text-5xl md:text-6xl font-black text-slate-900 tracking-wider">
            {currentQ.num1} {currentQ.operation === 'addition' ? '+' : '−'} {currentQ.num2} ={' '}
            <span className="text-amber-500">
              {isAnswerSubmitted ? currentQ.answer : '?'}
            </span>
          </div>
        </div>

        {/* Multiple Choice Options */}
        <div className="grid grid-cols-2 gap-3.5">
          {currentQ.options.map((opt) => {
            let btnClass = 'bg-slate-50 border-2 border-slate-200 hover:border-amber-400 text-slate-800';

            if (selectedAnswer === opt) {
              btnClass = 'bg-amber-100 border-2 border-amber-500 text-amber-950 font-black shadow-xs';
            }

            if (isAnswerSubmitted) {
              if (opt === currentQ.answer) {
                btnClass = 'bg-emerald-500 border-2 border-emerald-600 text-white font-black shadow-md';
              } else if (selectedAnswer === opt && !isCorrect) {
                btnClass = 'bg-rose-500 border-2 border-rose-600 text-white font-black';
              } else {
                btnClass = 'bg-slate-100 border-slate-200 text-slate-400 opacity-50';
              }
            }

            return (
              <button
                key={opt}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(opt)}
                className={`py-5 px-4 rounded-2xl text-2xl md:text-3xl font-black transition-all btn-press ${btnClass} cursor-pointer`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Hint Section if user is stuck or answered wrong */}
        {hintLevel >= 1 && (
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-xs md:text-sm text-sky-900 space-y-2 animate-fadeIn">
            <div className="font-bold flex items-center gap-1.5 text-sky-700">
              <span>💡</span>
              <span>Petunjuk Miko:</span>
            </div>
            <p>{currentQ.hint1}</p>

            {hintLevel >= 2 && (
              <div className="mt-3 pt-3 border-t border-sky-200">
                <span className="font-bold block mb-2 text-sky-800">Bantuan Visual:</span>
                {currentQ.category === 'make_ten' ? (
                  <TenFrameVisualizer num1={currentQ.num1} num2={currentQ.num2} interactive={false} />
                ) : currentQ.category === 'basic_addition' || currentQ.category === 'basic_subtraction' ? (
                  <ConcreteCounter
                    initialGroup1={currentQ.num1}
                    initialGroup2={currentQ.num2}
                    operation={currentQ.operation}
                    interactive={false}
                  />
                ) : (
                  <NumberLineVisualizer
                    startNumber={currentQ.num1}
                    stepCount={currentQ.num2}
                    operation={currentQ.operation}
                    min={Math.max(0, currentQ.num1 - 10)}
                    max={Math.min(100, currentQ.num1 + 10)}
                    interactive={false}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Post-Submit Feedback & Explanation */}
        {isAnswerSubmitted && (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{isCorrect ? '🎉' : '🤔'}</span>
                <div>
                  <h4 className={`text-base font-black ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isCorrect ? 'Jawabanmu Tepat Sekali!' : 'Belum Tepat, Tidak Apa-Apa!'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Jawaban yang benar adalah <strong>{currentQ.answer}</strong>.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowExplanation(s => !s)}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 underline bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200"
              >
                {showExplanation ? 'Sembunyikan Cara' : 'Jelaskan Cara Menghitung 💡'}
              </button>
            </div>

            {showExplanation && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs md:text-sm text-slate-700 space-y-1.5">
                <strong className="text-amber-900 block font-bold">Langkah Berhitung:</strong>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* Action Button: Periksa / Lanjut */}
        <div className="flex justify-between items-center pt-2">
          {!isAnswerSubmitted && hintLevel === 0 && (
            <button
              onClick={() => {
                sound.playClick();
                setHintLevel(1);
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <span>Butuh Petunjuk? 💡</span>
            </button>
          )}

          <div className="ml-auto">
            {!isAnswerSubmitted ? (
              <button
                disabled={selectedAnswer === null}
                onClick={handleSubmitAnswer}
                className="bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm px-8 py-3.5 rounded-2xl shadow-md btn-press transition-transform active:scale-95"
              >
                Periksa Jawaban ➔
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm px-8 py-3.5 rounded-2xl shadow-md btn-press transition-transform active:scale-95"
              >
                {currentIndex + 1 < questions.length ? 'Soal Berikutnya ➔' : 'Lihat Hasil Latihan 🏆'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
