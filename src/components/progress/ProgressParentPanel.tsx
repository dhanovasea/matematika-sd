import React, { useState } from 'react';
import { UserProfile, QuestionCategory } from '../../types/math';
import { CATEGORIES } from '../../data/categories';
import { sound } from '../../utils/audio';

interface ProgressParentPanelProps {
  profile: UserProfile;
  onResetProgress: () => void;
  onSelectCategoryPractice: (catId: QuestionCategory) => void;
}

export const ProgressParentPanel: React.FC<ProgressParentPanelProps> = ({
  profile,
  onResetProgress,
  onSelectCategoryPractice
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Calculate totals
  let totalAttempted = 0;
  let totalCorrect = 0;

  Object.values(profile.categoryStats).forEach(stat => {
    totalAttempted += stat.attempted;
    totalCorrect += stat.correct;
  });

  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  // Identify weak categories
  const categoryPerformances = CATEGORIES.map(cat => {
    const stat = profile.categoryStats[cat.id] || { attempted: 0, correct: 0 };
    const acc = stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : null;
    return {
      cat,
      attempted: stat.attempted,
      correct: stat.correct,
      acc
    };
  });

  const weakCategories = categoryPerformances.filter(
    c => c.acc !== null && c.acc < 70 && c.attempted >= 3
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 text-white p-6 md:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block mb-2">
            Laporan Belajar Anak & Panel Guru
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-1">
            Progres Belajar: {profile.name}
          </h2>
          <p className="text-sky-100 text-sm max-w-lg">
            Pantau perkembangan pemahaman konsep matematika anak secara transparan, berbasis data nyata hasil latihan.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0 min-w-[150px]">
          <div className="text-xs text-sky-100 font-bold">Tingkat Akurasi</div>
          <div className="text-3xl font-black text-amber-300">{overallAccuracy}%</div>
          <div className="text-[11px] text-sky-200">{totalCorrect} dari {totalAttempted} Soal</div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-center">
          <span className="text-2xl mb-1 block">📚</span>
          <span className="text-2xl font-black text-slate-800">{totalAttempted}</span>
          <span className="text-xs font-bold text-slate-500 block">Total Dikerjakan</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-center">
          <span className="text-2xl mb-1 block">⭐</span>
          <span className="text-2xl font-black text-amber-600">{profile.stars}</span>
          <span className="text-xs font-bold text-slate-500 block">Bintang Diraih</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-center">
          <span className="text-2xl mb-1 block">🏆</span>
          <span className="text-2xl font-black text-purple-600">{profile.xp} XP</span>
          <span className="text-xs font-bold text-slate-500 block">Pengalaman (XP)</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-center">
          <span className="text-2xl mb-1 block">🔥</span>
          <span className="text-2xl font-black text-orange-500">{profile.dailyStreak} Hari</span>
          <span className="text-xs font-bold text-slate-500 block">Streak Harian</span>
        </div>
      </div>

      {/* Weak Spots Alert if any */}
      {weakCategories.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💡</span>
            <h4 className="text-base font-black text-amber-900">
              Rekomendasi Pendampingan Khusus:
            </h4>
          </div>
          <p className="text-xs text-amber-800 mb-3 leading-relaxed">
            Anak menunjukkan sedikit kesulitan pada materi berikut (akurasi &lt; 70%). Disarankan untuk mengulang penjelasan konsep dasar di Akademi:
          </p>
          <div className="flex flex-wrap gap-2">
            {weakCategories.map(w => (
              <button
                key={w.cat.id}
                onClick={() => {
                  sound.playClick();
                  onSelectCategoryPractice(w.cat.id);
                }}
                className="bg-white border border-amber-300 hover:border-amber-500 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5"
              >
                <span>{w.cat.shortTitle}</span>
                <span className="text-rose-600 font-black">({w.acc}%)</span>
                <span>➔</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Performance Matrix */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <span>📊</span>
          <span>Tingkat Penguasaan per Kategori Materi</span>
        </h3>

        <div className="space-y-3.5">
          {categoryPerformances.map(({ cat, attempted, correct, acc }) => (
            <div key={cat.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between items-center text-xs md:text-sm font-bold mb-1.5">
                <span className="text-slate-800">{cat.title}</span>
                <span className="text-slate-600">
                  {acc !== null ? `${acc}% (${correct}/${attempted} benar)` : 'Belum Dikerjakan'}
                </span>
              </div>
              <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    acc === null
                      ? 'bg-transparent'
                      : acc >= 80
                      ? 'bg-emerald-500'
                      : acc >= 60
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${acc ?? 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice History Table */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <span>📜</span>
          <span>Riwayat Aktivitas Terakhir</span>
        </h3>

        {profile.history.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-4">Belum ada riwayat latihan yang tercatat.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                  <th className="py-2">Tanggal</th>
                  <th className="py-2">Mode</th>
                  <th className="py-2">Soal</th>
                  <th className="py-2">Akurasi</th>
                  <th className="py-2">XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {profile.history.slice(0, 8).map(h => (
                  <tr key={h.id}>
                    <td className="py-2.5">{h.date}</td>
                    <td className="py-2.5 uppercase font-bold text-[10px] text-slate-600">
                      {h.mode === 'practice' ? 'Latihan' : h.mode === 'exam' ? 'Ujian' : h.mode}
                    </td>
                    <td className="py-2.5">{h.correctAnswers} / {h.totalQuestions}</td>
                    <td className="py-2.5 font-bold text-slate-900">{h.scorePercentage}%</td>
                    <td className="py-2.5 text-amber-600 font-bold">+{h.earnedXp} XP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Privacy Notice & Reset Progress Area */}
      <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500">
          <p className="font-semibold text-slate-700 mb-1">Penyimpanan Aman & Ramah Anak (localStorage)</p>
          <p>
            Seluruh data progres dan skor disimpan langsung di perangkat browser ini tanpa mengumpulkan data pribadi anak.
          </p>
        </div>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-4 py-2.5 rounded-xl border border-rose-200 transition-colors whitespace-nowrap"
        >
          Reset Seluruh Progres
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 text-center max-w-sm shadow-2xl space-y-4">
            <div className="text-4xl">⚠️</div>
            <h3 className="text-lg font-black text-slate-900">Hapus Seluruh Progres?</h3>
            <p className="text-xs text-slate-600">
              Apakah Ayah/Bunda atau Guru yakin ingin mereset XP, bintang, dan riwayat belajar {profile.name}? Data yang dihapus tidak dapat dipulihkan.
            </p>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onResetProgress();
                  setShowResetConfirm(false);
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs"
              >
                Ya, Reset Progres
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
