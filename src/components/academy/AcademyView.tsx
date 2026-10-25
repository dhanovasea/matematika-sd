import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ACADEMY_LEVELS, AcademyLevel } from '../../data/academyLevels';
import { MikoMascot } from '../mascot/MikoMascot';
import { ConcreteCounter } from '../visualizers/ConcreteCounter';
import { NumberLineVisualizer } from '../visualizers/NumberLineVisualizer';
import { TenFrameVisualizer } from '../visualizers/TenFrameVisualizer';
import { BaseTenBlocksVisualizer } from '../visualizers/BaseTenBlocksVisualizer';
import { StackedMathVisualizer } from '../visualizers/StackedMathVisualizer';
import { sound } from '../../utils/audio';

interface AcademyViewProps {
  completedLessons: string[];
  onCompleteLesson: (slug: string, xpEarned: number) => void;
  onNavigateToPractice: (categoryId?: string) => void;
}

export const AcademyView: React.FC<AcademyViewProps> = ({
  completedLessons,
  onCompleteLesson,
  onNavigateToPractice
}) => {
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'learn' | 'demo' | 'tricks' | 'quiz'>('learn');
  const [activeTrickLetter, setActiveTrickLetter] = useState<string>('A');

  const currentLevel: AcademyLevel =
    ACADEMY_LEVELS.find(l => l.id === selectedLevelId) || ACADEMY_LEVELS[0];

  const isCompleted = completedLessons.includes(currentLevel.slug);

  const handleFinishLevel = () => {
    sound.playVictory();
    confetti({ particleCount: 80, spread: 70 });
    onCompleteLesson(currentLevel.slug, 75);
  };

  return (
    <div className="space-y-6">
      {/* Level Selector Pills */}
      <div className="bg-white/90 border-2 border-slate-200 rounded-3xl p-3 md:p-4 shadow-sm overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {ACADEMY_LEVELS.map((lvl) => {
            const active = lvl.id === selectedLevelId;
            const done = completedLessons.includes(lvl.slug);

            return (
              <button
                key={lvl.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedLevelId(lvl.id);
                  setActiveTab('learn');
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
                  active
                    ? 'bg-amber-500 text-white shadow-md scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>Level {lvl.id}</span>
                {done && <span className="text-amber-200">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Lesson Content Card */}
      <div className="bg-white rounded-3xl border-2 border-amber-200 shadow-sm p-5 md:p-8">
        {/* Level Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-100 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                {currentLevel.conceptName}
              </span>
              {isCompleted && (
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  ✓ Sudah Selesai Dipelajari
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">{currentLevel.title}</h2>
            <p className="text-slate-600 text-sm font-medium mt-1">{currentLevel.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToPractice()}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs md:text-sm px-4 py-2.5 rounded-2xl border border-amber-300 transition-colors"
            >
              Latihan Soal Materi Ini ➔
            </button>
          </div>
        </div>

        {/* Sub-tabs: Penjelasan Konsep, Simulasi Interaktif, Trik Khusus (jika ada) */}
        <div className="flex gap-2 border-b border-slate-200 pb-3 mb-6">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('learn');
            }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-colors ${
              activeTab === 'learn'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            📖 Penjelasan & Contoh
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('demo');
            }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-colors ${
              activeTab === 'demo'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🎨 Simulasi Interaktif
          </button>
          {currentLevel.trickList && (
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('tricks');
              }}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-colors ${
                activeTab === 'tricks'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ⚡ 9 Trik Berhitung Cepat (A-I)
            </button>
          )}
        </div>

        {/* Tab 1: Learn - Concept & Step-by-Step Sample Problems */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
              <MikoMascot mood="happy" speechText={currentLevel.summary} size="sm" />
              <div className="text-slate-700 text-sm leading-relaxed">
                <p className="font-semibold">{currentLevel.description}</p>
              </div>
            </div>

            {/* Sample Problems Accordion / Cards */}
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <span>💡</span>
              <span>Contoh Soal & Langkah Penyelesaian</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLevel.sampleProblems.map((prob, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        Contoh #{idx + 1}
                      </span>
                      <span className="text-xl font-black text-slate-900">{prob.problem}</span>
                    </div>

                    <div className="space-y-2 my-3">
                      {prob.stepByStep.map((st, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-xs md:text-sm text-slate-700">
                          <span className="w-5 h-5 rounded-full bg-amber-400 text-amber-950 font-bold flex items-center justify-center shrink-0 text-xs">
                            {sIdx + 1}
                          </span>
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 italic bg-white/70 p-2.5 rounded-xl">
                    <span className="font-bold not-italic text-slate-700">Mengapa cara ini ampuh: </span>
                    {prob.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Live Tool Demonstration */}
        {activeTab === 'demo' && (
          <div className="space-y-4">
            <p className="text-xs md:text-sm text-slate-600">
              Gunakan alat bantu interaktif di bawah ini untuk mencoba sendiri secara langsung:
            </p>

            {/* Render relevant tool based on level */}
            {currentLevel.id === 1 && (
              <ConcreteCounter initialGroup1={3} initialGroup2={2} operation="addition" />
            )}

            {currentLevel.id === 2 && (
              <NumberLineVisualizer startNumber={7} stepCount={4} operation="addition" min={0} max={20} />
            )}

            {currentLevel.id === 3 && (
              <TenFrameVisualizer num1={8} num2={5} />
            )}

            {currentLevel.id === 4 && (
              <BaseTenBlocksVisualizer initialNum1={23} initialNum2={14} operation="addition" />
            )}

            {currentLevel.id === 5 && (
              <div className="space-y-4">
                <div className="bg-teal-50 border border-teal-200 p-4 rounded-2xl text-xs md:text-sm text-teal-900">
                  <strong>Jembatan Puluhan:</strong> Untuk menyelesaikan 28 + 5, lompat dulu 2 langkah ke 30. Lalu lompat 3 langkah lagi ke 33!
                </div>
                <NumberLineVisualizer startNumber={28} stepCount={5} operation="addition" min={20} max={40} />
              </div>
            )}

            {currentLevel.id === 6 && (
              <StackedMathVisualizer num1={27} num2={18} operation="addition" />
            )}

            {currentLevel.id === 7 && (
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl text-xs md:text-sm text-orange-900">
                  <strong>Trik Mental +9:</strong> 26 + 9 = 26 + 10 − 1 = 35! Coba geser langkah pada garis bilangan:
                </div>
                <NumberLineVisualizer startNumber={26} stepCount={9} operation="addition" min={20} max={40} />
              </div>
            )}

            {currentLevel.id === 8 && (
              <div className="space-y-4">
                <div className="bg-pink-50 border border-pink-200 p-4 rounded-2xl text-xs md:text-sm text-pink-950">
                  <strong>Strategi Campuran 1–100:</strong> Bandingkan metode memecah puluhan dan bersusun untuk soal 39 + 26 = 65!
                </div>
                <BaseTenBlocksVisualizer initialNum1={39} initialNum2={26} operation="addition" />
                <StackedMathVisualizer num1={39} num2={26} operation="addition" />
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Tricks List (for Level 7) */}
        {activeTab === 'tricks' && currentLevel.trickList && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
              {currentLevel.trickList.map((t) => (
                <button
                  key={t.letter}
                  onClick={() => {
                    sound.playClick();
                    setActiveTrickLetter(t.letter);
                  }}
                  className={`py-3 rounded-2xl font-black text-center transition-all ${
                    activeTrickLetter === t.letter
                      ? 'bg-orange-500 text-white shadow-md scale-105 ring-2 ring-orange-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <div className="text-base md:text-lg">Trik {t.letter}</div>
                  <div className="text-[10px] font-bold opacity-80 truncate px-1">
                    {t.name.split(' ')[0]}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Trick Detail */}
            {(() => {
              const activeT =
                currentLevel.trickList.find(t => t.letter === activeTrickLetter) ||
                currentLevel.trickList[0];
              return (
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-2xl bg-orange-500 text-white font-black text-xl flex items-center justify-center shadow-xs">
                      {activeT.letter}
                    </span>
                    <div>
                      <h4 className="text-xl font-black text-orange-950">{activeT.name}</h4>
                      <p className="text-xs text-orange-800 font-bold">{activeT.rule}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <div className="bg-white p-4 rounded-2xl border border-orange-200 shadow-xs">
                      <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
                        Contoh Praktis:
                      </span>
                      <div className="text-2xl font-black text-orange-600 mb-2 font-mono">
                        {activeT.example}
                      </div>
                      <div className="text-xs text-slate-700 bg-orange-50/70 p-2.5 rounded-xl border border-orange-100">
                        {activeT.steps}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-orange-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
                          Mengapa Trik Ini Bekerja:
                        </span>
                        <p className="text-sm text-slate-700 leading-relaxed">{activeT.whyWorks}</p>
                      </div>
                      <div className="mt-3 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                        ✨ Rahasia juara matematika untuk berhitung dalam hitungan detik!
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Lesson Bottom Footer Action */}
        <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Selesaikan materi ini untuk mencatat kemajuan belajar dan mendapatkan XP!
          </div>

          <div className="flex items-center gap-3">
            {!isCompleted ? (
              <button
                onClick={handleFinishLevel}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md btn-press transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Tandai Selesai & Klaim XP</span>
                <span>⭐ +75 XP</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl">
                <span>✓ Materi Level Ini Telah Dikuasai</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
