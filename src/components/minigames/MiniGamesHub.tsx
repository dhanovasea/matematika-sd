import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { CatchAnswerGame } from './CatchAnswerGame';
import { BridgeBuilderGame } from './BridgeBuilderGame';
import { MonsterBattleGame } from './MonsterBattleGame';
import { NumberShopGame } from './NumberShopGame';
import { SpeedRaceGame } from './SpeedRaceGame';

interface MiniGamesHubProps {
  onEarnReward: (xp: number, stars: number) => void;
  timerEnabled?: boolean;
}

type ActiveGame = 'none' | 'catch' | 'bridge' | 'monster' | 'shop' | 'race';

export const MiniGamesHub: React.FC<MiniGamesHubProps> = ({
  onEarnReward,
  timerEnabled = true
}) => {
  const [activeGame, setActiveGame] = useState<ActiveGame>('none');

  const games = [
    {
      id: 'catch' as ActiveGame,
      title: 'Tangkap Jawaban',
      desc: 'Pilih apel atau balon berangka sebelum jatuh ke tanah!',
      icon: '🍎',
      color: 'from-emerald-400 to-teal-500',
      difficulty: 'Semua Umur',
      xpReward: '+50 XP'
    },
    {
      id: 'bridge' as ActiveGame,
      title: 'Bangun Jembatan',
      desc: 'Pasang balok kayu dengan hitungan tepat untuk menyeberangi sungai.',
      icon: '🌉',
      color: 'from-amber-400 to-orange-500',
      difficulty: 'Kelas 1–2 SD',
      xpReward: '+60 XP'
    },
    {
      id: 'monster' as ActiveGame,
      title: 'Monster Matematika',
      desc: 'Gunakan jurus penjumlahan dan pengurangan untuk menjinakkan monster!',
      icon: '👾',
      color: 'from-purple-500 to-indigo-600',
      difficulty: 'Tantangan Seru',
      xpReward: '+70 XP'
    },
    {
      id: 'shop' as ActiveGame,
      title: 'Toko Angka',
      desc: 'Hitung total belanjaan barang dan uang kembalian pembeli.',
      icon: '🏪',
      color: 'from-sky-400 to-blue-600',
      difficulty: 'Uang & Kehidupan Nyata',
      xpReward: '+60 XP'
    },
    {
      id: 'race' as ActiveGame,
      title: 'Balap Angka Kilat',
      desc: 'Jawab soal cepat untuk turbo boost dan menangkan piala balapan!',
      icon: '🏎️',
      color: 'from-rose-400 to-red-500',
      difficulty: 'Ketangkasan Mental',
      xpReward: '+80 XP'
    }
  ];

  if (activeGame === 'catch') {
    return <CatchAnswerGame onEarnReward={onEarnReward} onExit={() => setActiveGame('none')} timerEnabled={timerEnabled} />;
  }
  if (activeGame === 'bridge') {
    return <BridgeBuilderGame onEarnReward={onEarnReward} onExit={() => setActiveGame('none')} />;
  }
  if (activeGame === 'monster') {
    return <MonsterBattleGame onEarnReward={onEarnReward} onExit={() => setActiveGame('none')} />;
  }
  if (activeGame === 'shop') {
    return <NumberShopGame onEarnReward={onEarnReward} onExit={() => setActiveGame('none')} />;
  }
  if (activeGame === 'race') {
    return <SpeedRaceGame onEarnReward={onEarnReward} onExit={() => setActiveGame('none')} timerEnabled={timerEnabled} />;
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute right-4 bottom-2 text-7xl opacity-20 pointer-events-none select-none">
          🎮
        </div>
        <div className="max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block mb-2">
            Arena Bermain Sambil Belajar
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-2">Mini-Game Matematika Miko</h2>
          <p className="text-sm md:text-base text-purple-100 leading-relaxed">
            Pilih permainan favoritmu di bawah ini! Dapatkan XP melimpah, kumpulkan bintang berkilau, dan jadilah juara matematika yang ceria.
          </p>
        </div>
      </div>

      {/* Grid of 5 Games */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${game.color} text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform`}>
                  {game.icon}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                    ⭐ {game.xpReward}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{game.difficulty}</span>
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-800 mb-1">{game.title}</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">{game.desc}</p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setActiveGame(game.id);
              }}
              className={`w-full py-3 rounded-2xl bg-gradient-to-r ${game.color} text-white font-bold text-sm shadow-md btn-press flex items-center justify-center gap-2 cursor-pointer`}
            >
              <span>Mainkan Sekarang</span>
              <span>➔</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
