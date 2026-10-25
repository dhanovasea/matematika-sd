import React, { useState } from 'react';
import { VideoTrick } from '../../types/math';
import { VIDEO_TRICKS } from '../../data/videoTricks';
import { InteractiveVideoPlayer } from './InteractiveVideoPlayer';
import { sound } from '../../utils/audio';

interface VideoTricksHubProps {
  onEarnReward: (xp: number, stars: number) => void;
  onNavigateToPractice?: (categoryId?: string) => void;
}

export const VideoTricksHub: React.FC<VideoTricksHubProps> = ({
  onEarnReward,
  onNavigateToPractice
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<VideoTrick | null>(null);

  const tags = ['all', 'Trik Cepat', 'Mental Math', 'Make Ten', 'Pasangan 100', 'Bersusun'];

  const filteredVideos = selectedTag === 'all'
    ? VIDEO_TRICKS
    : VIDEO_TRICKS.filter(v => v.tags.includes(selectedTag));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Hero Video Hub Banner */}
      <div className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl z-10">
          <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block mb-2">
            Bioskop Video Belajar Interaktif 🎬
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-2">
            Video Trik Cepat Penyelesaian Soal
          </h2>
          <p className="text-rose-100 text-xs md:text-sm leading-relaxed mb-4">
            Tonton demonstrasi animasi langkah demi langkah dari Robot Miko! Pelajari trik kilat +9, −9, +11, pasangan 100, dan cara berhitung tanpa rumus rumit.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
            <span className="bg-white/30 px-3 py-1 rounded-full flex items-center gap-1">
              ✨ 8 Video Animasi Trik
            </span>
            <span className="bg-white/30 px-3 py-1 rounded-full flex items-center gap-1">
              🎯 Disertai Kuis Kilat +50 XP
            </span>
          </div>
        </div>

        {/* Mascot / Cinema Icon */}
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 text-center shrink-0 min-w-[160px] z-10">
          <div className="text-5xl mb-2 animate-bounce">🍿</div>
          <div className="text-sm font-black text-amber-200">Bioskop Miko</div>
          <div className="text-[11px] text-white/80">Belajar Sambil Santai</div>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              sound.playClick();
              setSelectedTag(tag);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedTag === tag
                ? 'bg-rose-500 text-white shadow-sm ring-2 ring-rose-200'
                : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200'
            }`}
          >
            {tag === 'all' ? '🌟 Semua Video Trik' : tag}
          </button>
        ))}
      </div>

      {/* Video Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            className="bg-white rounded-3xl border-2 border-slate-200 hover:border-rose-300 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
          >
            <div>
              {/* Thumbnail Header */}
              <div className="relative bg-gradient-to-br from-slate-900 to-indigo-950 p-6 flex flex-col items-center justify-center min-h-[140px] text-white text-center">
                <span className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {vid.thumbnailEmoji}
                </span>
                <span className="text-xs font-black text-amber-300">
                  Trik: {vid.trickKey}
                </span>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center text-xl shadow-lg transform group-hover:scale-110 transition-transform">
                    ▶️
                  </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded-md font-bold">
                  ⏱️ {vid.durationLabel}
                </span>
              </div>

              {/* Video Info */}
              <div className="p-4 space-y-2">
                <div className="flex flex-wrap gap-1 mb-1">
                  {vid.tags.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="font-black text-slate-800 text-sm group-hover:text-rose-600 transition-colors leading-snug">
                  {vid.title}
                </h3>
                <p className="text-[11px] font-medium text-slate-500">
                  {vid.subtitle}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {vid.description}
                </p>
              </div>
            </div>

            {/* Bottom Play Action */}
            <div className="p-4 pt-0">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveVideo(vid);
                }}
                className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-xs btn-press flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Tonton Video Trik</span>
                <span>▶️</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active Modal Video Player */}
      {activeVideo && (
        <InteractiveVideoPlayer
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
          onEarnReward={onEarnReward}
        />
      )}
    </div>
  );
};
