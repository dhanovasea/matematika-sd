import React from 'react';
import { ALL_BADGES } from '../../data/badges';
import { sound } from '../../utils/audio';

interface BadgesViewProps {
  unlockedBadgeIds: string[];
  totalStars: number;
}

export const BadgesView: React.FC<BadgesViewProps> = ({
  unlockedBadgeIds,
  totalStars
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Trophy Header */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 p-6 md:p-8 rounded-3xl text-amber-950 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-white/40 px-3 py-1 rounded-full inline-block mb-2">
            Ruang Penghargaan & Koleksi
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-1">Koleksi Bintang & Lencana</h2>
          <p className="text-amber-900 text-sm max-w-md">
            Setiap pencapaian belajar dan kemenangan dalam mini-game memberimu lencana kehormatan!
          </p>
        </div>

        <div className="bg-white/90 p-4 rounded-3xl border-2 border-amber-300 shadow-sm text-center shrink-0 min-w-[160px]">
          <div className="text-3xl mb-1">⭐</div>
          <div className="text-2xl font-black text-amber-600">{totalStars}</div>
          <div className="text-xs font-bold text-slate-500">Total Bintangmu</div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
          <h3 className="text-lg font-black text-slate-800">
            Lencana Terbuka: {unlockedBadgeIds.length} / {ALL_BADGES.length}
          </h3>
          <span className="text-xs text-slate-500">
            Kumpulkan semuanya untuk menjadi Master Matematika!
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                onClick={() => {
                  if (isUnlocked) sound.playStar();
                }}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-amber-50/60 border-amber-300 shadow-xs hover:scale-102 cursor-pointer'
                    : 'bg-slate-50 border-slate-200 opacity-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs ${
                        isUnlocked
                          ? 'bg-amber-400 text-amber-950 ring-4 ring-amber-100'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {isUnlocked ? '🏅' : '🔒'}
                    </div>
                    {isUnlocked && (
                      <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Terbuka
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-black text-slate-800 mb-1">{badge.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{badge.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
                  {isUnlocked ? 'Tercapai dengan gemilang!' : 'Selesaikan misi untuk membuka'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
