import React from 'react';
import { ACADEMY_LEVELS } from '../../data/academyLevels';
import { sound } from '../../utils/audio';

interface AdventureMapProps {
  completedLessons: string[];
  userLevel: number;
  userStars: number;
  onSelectLevel: (levelId: number) => void;
  onStartQuickAdventure: () => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  completedLessons,
  userLevel,
  userStars,
  onSelectLevel,
  onStartQuickAdventure
}) => {
  const mapNodes = [
    { id: 1, name: 'Lembah Apel', emoji: '🍎', color: 'emerald', reqLevel: 1 },
    { id: 2, name: 'Sungai Katak Melompat', emoji: '🐸', color: 'sky', reqLevel: 1 },
    { id: 3, name: 'Desa Sahabat Sepuluh', emoji: '📦', color: 'amber', reqLevel: 2 },
    { id: 4, name: 'Gua Balok Puluhan', emoji: '🧱', color: 'indigo', reqLevel: 2 },
    { id: 5, name: 'Jembatan Pelangi 10', emoji: '🌈', color: 'teal', reqLevel: 3 },
    { id: 6, name: 'Benteng Ksatria Bersusun', emoji: '🏰', color: 'violet', reqLevel: 4 },
    { id: 7, name: 'Kota Kilat Mental', emoji: '⚡', color: 'orange', reqLevel: 5 },
    { id: 8, name: 'Puncak Juara 100', emoji: '👑', color: 'pink', reqLevel: 6 }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Adventure Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 p-6 md:p-8 rounded-3xl text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-md z-10">
          <span className="text-xs font-black uppercase tracking-wider bg-white/30 text-amber-950 px-3 py-1 rounded-full inline-block mb-2">
            Peta Petualangan Belajar 🗺️
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
            Jelajahi Negeri Angka 1–100
          </h2>
          <p className="text-slate-800 text-sm font-medium leading-relaxed mb-4">
            Taklukkan setiap pos petualangan untuk membuka kekuatan berhitung baru bersama robot Miko!
          </p>
          <button
            onClick={() => {
              sound.playClick();
              onStartQuickAdventure();
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white font-black text-base px-6 py-3 rounded-2xl shadow-lg btn-press transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>Ayo Mulai Belajar! 🚀</span>
          </button>
        </div>

        {/* Mascot badge on banner */}
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl border-2 border-white shadow-md text-slate-800 flex items-center gap-4 z-10 shrink-0">
          <div className="text-4xl animate-bounce">🤖</div>
          <div>
            <div className="text-xs font-bold text-slate-500">Status Petualang</div>
            <div className="text-lg font-black text-slate-900">Level {userLevel}</div>
            <div className="text-xs font-bold text-amber-600 flex items-center gap-1">
              <span>⭐ {userStars} Bintang Dikoleksi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Winding Map Path Grid */}
      <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <span>🧭</span>
            <span>Jalur Perjalanan Pos Materi</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Ketuk pos mana saja untuk langsung belajar atau berlatih
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mapNodes.map((node) => {
            const academyLvl = ACADEMY_LEVELS.find(l => l.id === node.id);
            const isDone = academyLvl ? completedLessons.includes(academyLvl.slug) : false;
            const isCurrent = userLevel === node.id;
            const isUnlocked = userLevel >= node.reqLevel;

            return (
              <div
                key={node.id}
                onClick={() => {
                  sound.playClick();
                  onSelectLevel(node.id);
                }}
                className={`relative rounded-3xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                  isDone
                    ? 'bg-emerald-50/60 border-emerald-300 hover:border-emerald-400 hover:shadow-md'
                    : isCurrent
                    ? 'bg-amber-50 border-amber-400 shadow-md ring-4 ring-amber-100'
                    : isUnlocked
                    ? 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-md'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                {/* Node Top Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {node.emoji}
                  </div>
                  <div>
                    {isDone ? (
                      <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        ✓ Tuntas
                      </span>
                    ) : isCurrent ? (
                      <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse shadow-xs">
                        ★ Pos Sekarang
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        Pos #{node.id}
                      </span>
                    )}
                  </div>
                </div>

                {/* Node Title & Concept */}
                <div className="my-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Level {node.id}
                  </span>
                  <h4 className="text-base font-black text-slate-800 leading-snug group-hover:text-amber-600 transition-colors">
                    {node.name}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {academyLvl?.summary}
                  </p>
                </div>

                {/* Action footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className={isDone ? 'text-emerald-700' : 'text-amber-600'}>
                    {isDone ? 'Pelajari Ulang' : 'Buka Pos Ini'}
                  </span>
                  <span className="text-slate-400 group-hover:translate-x-1 transition-transform">
                    ➔
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
