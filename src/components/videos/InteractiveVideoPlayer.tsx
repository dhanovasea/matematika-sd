import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { VideoTrick, VideoTrickScene } from '../../types/math';
import { sound } from '../../utils/audio';
import { MikoMascot } from '../mascot/MikoMascot';

interface InteractiveVideoPlayerProps {
  video: VideoTrick;
  onClose: () => void;
  onEarnReward: (xp: number, stars: number) => void;
}

export const InteractiveVideoPlayer: React.FC<InteractiveVideoPlayerProps> = ({
  video,
  onClose,
  onEarnReward
}) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressSec, setProgressSec] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5>(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedQuizAns, setSelectedQuizAns] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [quizPassed, setQuizPassed] = useState(false);

  const activeScene: VideoTrickScene = video.scenes[currentSceneIdx] || video.scenes[0];
  const sceneDuration = activeScene.durationSeconds / playbackSpeed;

  // Scene advance loop
  useEffect(() => {
    let timer: number | null = null;
    if (isPlaying && !isCompleted) {
      timer = window.setInterval(() => {
        setProgressSec(prev => {
          if (prev + 0.2 >= sceneDuration) {
            // Advance to next scene or finish
            if (currentSceneIdx + 1 < video.scenes.length) {
              sound.playPop();
              setCurrentSceneIdx(c => c + 1);
              return 0;
            } else {
              // Video ended
              sound.playVictory();
              confetti({ particleCount: 70, spread: 60 });
              setIsCompleted(true);
              setIsPlaying(false);
              return sceneDuration;
            }
          }
          return prev + 0.2;
        });
      }, 200);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, isCompleted, currentSceneIdx, sceneDuration, video.scenes.length]);

  const handleTogglePlay = () => {
    sound.playClick();
    setIsPlaying(p => !p);
  };

  const handleJumpToScene = (idx: number) => {
    sound.playClick();
    setCurrentSceneIdx(idx);
    setProgressSec(0);
    setIsPlaying(true);
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentSceneIdx(0);
    setProgressSec(0);
    setIsPlaying(true);
    setIsCompleted(false);
  };

  const handleAnswerQuiz = (opt: number) => {
    setSelectedQuizAns(opt);
    if (opt === video.practiceQuiz.answer) {
      sound.playCorrect();
      setQuizFeedback('Hebat Sekali! Kamu menguasai trik ini dengan sempurna!');
      setQuizPassed(true);
      confetti({ particleCount: 80, spread: 70 });
      onEarnReward(50, 3);
    } else {
      sound.playWrong();
      setQuizFeedback('Hampir benar! Coba ingat rumus trik di atas ya...');
    }
  };

  const sceneProgressPct = Math.min(100, (progressSec / sceneDuration) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-slate-900 border-4 border-amber-400 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden text-white flex flex-col my-auto">
        {/* Theater Top Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎬</span>
            <div>
              <h3 className="text-sm md:text-base font-black text-amber-300 truncate max-w-xs sm:max-w-md">
                {video.title}
              </h3>
              <p className="text-[11px] text-slate-400">{video.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition-transform active:scale-90"
          >
            ✕
          </button>
        </div>

        {/* Video Canvas Stage / Blackboard */}
        <div className="relative bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 min-h-[380px] flex flex-col justify-between overflow-hidden">
          {/* Subtle Stage Lighting Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* Blackboard Screen */}
          <div className="relative z-10 bg-slate-800/90 border-2 border-amber-300/60 rounded-3xl p-5 md:p-6 shadow-inner max-w-2xl mx-auto w-full">
            {/* Scene Header Tag */}
            <div className="flex justify-between items-center mb-3 text-xs">
              <span className="font-bold text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
                Adegan {currentSceneIdx + 1} / {video.scenes.length}: {activeScene.title}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                {Math.round(progressSec)}s / {Math.round(sceneDuration)}s
              </span>
            </div>

            {/* Formula / Blackboard Center Highlight */}
            <div className="text-center my-4 py-3 px-4 bg-slate-900/80 rounded-2xl border border-sky-400/30 shadow-md">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1">
                {activeScene.boardContent.heading}
              </span>
              {activeScene.boardContent.formula && (
                <div className="text-3xl md:text-4xl font-black text-amber-300 tracking-wider font-mono my-1">
                  {activeScene.boardContent.formula}
                </div>
              )}
              {activeScene.boardContent.highlightText && (
                <p className="text-xs md:text-sm text-emerald-300 font-medium mt-1">
                  ✨ {activeScene.boardContent.highlightText}
                </p>
              )}
            </div>

            {/* Step-by-Step Breakdown on Board */}
            {activeScene.boardContent.steps && (
              <div className="space-y-1.5 my-3 text-xs md:text-sm text-slate-200">
                {activeScene.boardContent.steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-amber-950 font-bold text-xs flex items-center justify-center shrink-0">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Presenter Miko & Speech Bubble Narration */}
          <div className="relative z-10 mt-6 flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto w-full bg-slate-950/70 p-4 rounded-2xl border border-white/10">
            <MikoMascot mood={activeScene.mascotMood} size="sm" className="shrink-0" />
            <div className="text-xs md:text-sm text-sky-100 font-medium leading-relaxed">
              <span className="text-amber-400 font-bold block mb-0.5">Penjelasan Robot Miko:</span>
              <p className="italic">"{activeScene.speakerText}"</p>
            </div>
          </div>
        </div>

        {/* Video Player Timeline & Controls Bar */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 space-y-3">
          {/* Progress Timeline with Scene Jump Nodes */}
          <div className="space-y-1.5">
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-200"
                style={{ width: `${sceneProgressPct}%` }}
              />
            </div>

            {/* Scene Markers */}
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              {video.scenes.map((sc, i) => (
                <button
                  key={i}
                  onClick={() => handleJumpToScene(i)}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                    i === currentSceneIdx
                      ? 'bg-amber-400 text-amber-950'
                      : 'hover:text-white bg-slate-800'
                  }`}
                >
                  Bagian {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Controls: Play, Pause, Prev, Next, Speed, Restart */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              {/* Prev Scene */}
              <button
                disabled={currentSceneIdx === 0}
                onClick={() => handleJumpToScene(Math.max(0, currentSceneIdx - 1))}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold"
              >
                ⏮️ Mundur
              </button>

              {/* Play / Pause */}
              <button
                onClick={handleTogglePlay}
                className="px-5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs md:text-sm font-black shadow-md flex items-center gap-1.5"
              >
                <span>{isPlaying ? '⏸️ Jeda' : '▶️ Lanjut'}</span>
              </button>

              {/* Next Scene */}
              <button
                disabled={currentSceneIdx + 1 >= video.scenes.length}
                onClick={() => handleJumpToScene(currentSceneIdx + 1)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold"
              >
                Maju ⏭️
              </button>

              {/* Restart */}
              <button
                onClick={handleRestart}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold"
                title="Ulangi dari Awal"
              >
                ↺ Ulang
              </button>
            </div>

            {/* Playback speed toggle */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 hidden sm:inline">Kecepatan:</span>
              <button
                onClick={() => setPlaybackSpeed(s => (s === 1 ? 1.5 : 1))}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300"
              >
                {playbackSpeed}x
              </button>
            </div>
          </div>
        </div>

        {/* Post-Video Interactive Quiz Card */}
        {isCompleted && (
          <div className="bg-gradient-to-r from-amber-900/60 to-purple-900/60 p-5 md:p-6 border-t-2 border-amber-400 text-center space-y-4 animate-fadeIn">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🎯</span>
              <h4 className="text-base md:text-lg font-black text-amber-300">
                Kuis Kilat Trik Video: Buktikan Pemahamanmu!
              </h4>
            </div>

            <p className="text-lg md:text-xl font-black text-white">
              {video.practiceQuiz.question}
            </p>

            {quizFeedback && (
              <p className={`text-xs font-bold px-4 py-1.5 rounded-full inline-block ${
                quizPassed ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {quizFeedback}
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto">
              {video.practiceQuiz.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAnswerQuiz(opt)}
                  className={`py-3 rounded-xl text-xl font-black transition-all btn-press ${
                    selectedQuizAns === opt
                      ? opt === video.practiceQuiz.answer
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'bg-rose-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {quizPassed && (
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md"
                >
                  Klaim Hadiah & Selesai Menonton 🏆
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
