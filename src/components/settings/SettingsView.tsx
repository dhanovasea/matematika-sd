import React, { useState } from 'react';
import { AppSettings, UserProfile } from '../../types/math';
import { sound } from '../../utils/audio';

interface SettingsViewProps {
  settings: AppSettings;
  profile: UserProfile;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onUpdateProfileNameAndAvatar: (name: string, avatar: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  profile,
  onUpdateSettings,
  onUpdateProfileNameAndAvatar
}) => {
  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const avatars = [
    { id: 'miko', emoji: '🤖', label: 'Miko Robot' },
    { id: 'cat', emoji: '🐱', label: 'Kucing Cerdas' },
    { id: 'rabbit', emoji: '🐰', label: 'Kelinci Juara' },
    { id: 'bear', emoji: '🐻', label: 'Beruang Hebat' },
    { id: 'owl', emoji: '🦉', label: 'Burung Hantu Bijak' },
    { id: 'fox', emoji: '🦊', label: 'Rubah Tangkas' }
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playCorrect();
    onUpdateProfileNameAndAvatar(name.trim() || 'Teman Miko', avatar);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-black mb-1">Pengaturan Aplikasi</h2>
        <p className="text-slate-300 text-xs md:text-sm">
          Sesuaikan profil bermain, suara, musik, dan mode belajar anak.
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
          <span>👤</span>
          <span>Profil Anak</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">
              Nama Panggilan:
            </label>
            <input
              type="text"
              value={name}
              maxLength={20}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-amber-400 focus:outline-hidden font-bold text-slate-800 text-sm"
              placeholder="Contoh: Budi Juara"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-2">
              Pilih Avatar Karakter:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {avatars.map((av) => (
                <button
                  type="button"
                  key={av.id}
                  onClick={() => {
                    sound.playClick();
                    setAvatar(av.id);
                  }}
                  className={`p-3 rounded-2xl flex flex-col items-center border-2 transition-all ${
                    avatar === av.id
                      ? 'border-amber-500 bg-amber-50 scale-105 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <span className="text-3xl mb-1">{av.emoji}</span>
                  <span className="text-[10px] font-bold text-slate-700 truncate w-full text-center">
                    {av.label.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            {savedSuccess ? (
              <span className="text-xs font-bold text-emerald-600">
                ✓ Profil berhasil disimpan!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-transform active:scale-95"
            >
              Simpan Profil
            </button>
          </div>
        </form>
      </div>

      {/* Audio & Preferences Settings */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-800 mb-2 flex items-center gap-2">
          <span>⚙️</span>
          <span>Suara & Preferensi Belajar</span>
        </h3>

        {/* Sound FX Toggle */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div>
            <div className="text-sm font-bold text-slate-800">Efek Suara (Sound FX)</div>
            <div className="text-xs text-slate-500">Suara klik, nada benar, dan musik kemenangan</div>
          </div>
          <button
            onClick={() => {
              const val = !settings.soundEnabled;
              sound.setSoundEnabled(val);
              if (val) sound.playClick();
              onUpdateSettings({ ...settings, soundEnabled: val });
            }}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${
              settings.soundEnabled ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white transition-transform ${
                settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Music Synth Toggle */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div>
            <div className="text-sm font-bold text-slate-800">Musik Latar Santai</div>
            <div className="text-xs text-slate-500">Melodi lembut marimba untuk menemani konsentrasi</div>
          </div>
          <button
            onClick={() => {
              const val = !settings.musicEnabled;
              sound.setMusicEnabled(val);
              onUpdateSettings({ ...settings, musicEnabled: val });
            }}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${
              settings.musicEnabled ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white transition-transform ${
                settings.musicEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Timer Toggle */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div>
            <div className="text-sm font-bold text-slate-800">Tampilkan Timer / Pengukur Waktu</div>
            <div className="text-xs text-slate-500">Nonaktifkan jika anak butuh belajar tanpa tekanan waktu</div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onUpdateSettings({ ...settings, timerEnabled: !settings.timerEnabled });
            }}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${
              settings.timerEnabled ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white transition-transform ${
                settings.timerEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
