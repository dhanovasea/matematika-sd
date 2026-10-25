import React, { useState, useEffect } from 'react';
import { MainTab, UserProfile, AppSettings, QuestionCategory } from './types/math';
import {
  loadUserProfile,
  saveUserProfile,
  resetUserProfile,
  loadAppSettings,
  saveAppSettings,
  calculateLevel,
  getXpForNextLevel
} from './services/storage';
import { sound } from './utils/audio';
import { AdventureMap } from './components/adventure/AdventureMap';
import { AcademyView } from './components/academy/AcademyView';
import { PracticeView } from './components/practice/PracticeView';
import { MiniGamesHub } from './components/minigames/MiniGamesHub';
import { DailyChallengeView } from './components/daily/DailyChallengeView';
import { ExamView } from './components/exam/ExamView';
import { BadgesView } from './components/badges/BadgesView';
import { ProgressParentPanel } from './components/progress/ProgressParentPanel';
import { SettingsView } from './components/settings/SettingsView';
import { MikoMascot } from './components/mascot/MikoMascot';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => loadUserProfile());
  const [settings, setSettings] = useState<AppSettings>(() => loadAppSettings());
  const [activeTab, setActiveTab] = useState<MainTab>('adventure');
  const [practiceCategory, setPracticeCategory] = useState<QuestionCategory | undefined>();

  // Sync audio with settings on boot
  useEffect(() => {
    sound.setSoundEnabled(settings.soundEnabled);
    sound.setMusicEnabled(settings.musicEnabled);
  }, []);

  // Sync profile & settings to localStorage whenever updated
  useEffect(() => {
    saveUserProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveAppSettings(settings);
  }, [settings]);

  // Reward handler for completing games, quizzes, academy levels
  const handleEarnReward = (xp: number, stars: number) => {
    setProfile((prev) => {
      const nextXp = prev.xp + xp;
      const nextStars = prev.stars + stars;
      const nextLevel = calculateLevel(nextXp);

      // Check badges
      const newBadges = [...prev.badges];
      if (!newBadges.includes('first_step')) {
        newBadges.push('first_step');
      }
      if (nextStars >= 10 && !newBadges.includes('perfect_score')) {
        newBadges.push('perfect_score');
      }

      return {
        ...prev,
        xp: nextXp,
        stars: nextStars,
        level: nextLevel,
        badges: newBadges
      };
    });
  };

  // Lesson completion handler
  const handleCompleteLesson = (slug: string, xpEarned: number) => {
    setProfile((prev) => {
      const nextLessons = prev.completedLessons.includes(slug)
        ? prev.completedLessons
        : [...prev.completedLessons, slug];
      const nextXp = prev.xp + xpEarned;
      const nextStars = prev.stars + 3;
      const nextLevel = calculateLevel(nextXp);

      const badges = [...prev.badges];
      if (slug.includes('level-1') && !badges.includes('apple_counter')) badges.push('apple_counter');
      if (slug.includes('level-2') && !badges.includes('number_jumper')) badges.push('number_jumper');
      if (slug.includes('level-3') && !badges.includes('ten_friend')) badges.push('ten_friend');
      if (slug.includes('level-4') && !badges.includes('number_breaker')) badges.push('number_breaker');
      if (slug.includes('level-6') && !badges.includes('stacked_master')) badges.push('stacked_master');
      if (slug.includes('level-7') && !badges.includes('lightning_fast')) badges.push('lightning_fast');
      if (slug.includes('level-8') && !badges.includes('math_champion_100')) badges.push('math_champion_100');

      return {
        ...prev,
        completedLessons: nextLessons,
        xp: nextXp,
        stars: nextStars,
        level: nextLevel,
        badges
      };
    });
  };

  // Practice session finish handler
  const handleFinishPracticeSession = (
    category: string,
    total: number,
    correct: number,
    durationSec: number,
    newWrongIds: string[],
    resolvedWrongIds: string[]
  ) => {
    const accuracy = Math.round((correct / total) * 100);
    const earnedXp = correct * 10;
    const earnedStars = accuracy >= 80 ? 3 : 1;

    setProfile((prev) => {
      const catKey = (category !== 'all' ? category : 'mixed_challenge') as QuestionCategory;
      const curCatStat = prev.categoryStats[catKey] || { attempted: 0, correct: 0 };

      // Update wrong question IDs: add new, remove resolved
      const existingWrong = new Set(prev.wrongQuestionIds);
      newWrongIds.forEach(id => existingWrong.add(id));
      resolvedWrongIds.forEach(id => existingWrong.delete(id));

      const newHistoryItem = {
        id: `quiz-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        mode: 'practice' as const,
        category,
        totalQuestions: total,
        correctAnswers: correct,
        scorePercentage: accuracy,
        durationSeconds: durationSec,
        earnedXp,
        earnedStars
      };

      const nextXp = prev.xp + earnedXp;
      const nextLevel = calculateLevel(nextXp);

      return {
        ...prev,
        xp: nextXp,
        stars: prev.stars + earnedStars,
        level: nextLevel,
        wrongQuestionIds: Array.from(existingWrong),
        categoryStats: {
          ...prev.categoryStats,
          [catKey]: {
            attempted: curCatStat.attempted + total,
            correct: curCatStat.correct + correct
          }
        },
        history: [newHistoryItem, ...prev.history]
      };
    });
  };

  // Exam completion handler
  const handleFinishExam = (
    total: number,
    correct: number,
    durationSec: number,
    scorePct: number
  ) => {
    const earnedXp = correct * 15;
    const earnedStars = scorePct >= 80 ? 5 : 2;

    setProfile((prev) => {
      const newHistoryItem = {
        id: `exam-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        mode: 'exam' as const,
        totalQuestions: total,
        correctAnswers: correct,
        scorePercentage: scorePct,
        durationSeconds: durationSec,
        earnedXp,
        earnedStars
      };

      const nextXp = prev.xp + earnedXp;
      const nextLevel = calculateLevel(nextXp);

      return {
        ...prev,
        xp: nextXp,
        stars: prev.stars + earnedStars,
        level: nextLevel,
        history: [newHistoryItem, ...prev.history]
      };
    });
  };

  // Daily challenge completion
  const handleCompleteDaily = (xp: number, stars: number) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setProfile((prev) => {
      if (prev.dailyChallengeCompletedDates.includes(todayStr)) return prev;

      const nextXp = prev.xp + xp;
      const nextStars = prev.stars + stars;
      const nextStreak = prev.dailyStreak + 1;
      const badges = [...prev.badges];
      if (nextStreak >= 3 && !badges.includes('streak_3')) {
        badges.push('streak_3');
      }

      return {
        ...prev,
        xp: nextXp,
        stars: nextStars,
        level: calculateLevel(nextXp),
        dailyStreak: nextStreak,
        lastActiveDate: todayStr,
        dailyChallengeCompletedDates: [...prev.dailyChallengeCompletedDates, todayStr],
        badges
      };
    });
  };

  const handleReset = () => {
    const fresh = resetUserProfile();
    setProfile(fresh);
  };

  // Level progress bar calculations
  const { currentLevelXp, nextLevelXp } = getXpForNextLevel(profile.level);
  const progressInLevel = Math.min(
    100,
    Math.max(0, Math.round(((profile.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100))
  );

  const avatarEmojis: Record<string, string> = {
    miko: '🤖',
    cat: '🐱',
    rabbit: '🐰',
    bear: '🐻',
    owl: '🦉',
    fox: '🦊'
  };

  const navigationTabs = [
    { id: 'adventure' as MainTab, label: 'Petualangan Belajar', short: 'Petualangan', icon: '🗺️' },
    { id: 'academy' as MainTab, label: 'Akademi Berhitung', short: 'Akademi', icon: '📖' },
    { id: 'practice' as MainTab, label: 'Latihan Soal', short: 'Latihan', icon: '✏️' },
    { id: 'minigames' as MainTab, label: 'Mini-Game Matematika', short: 'Game', icon: '🎮' },
    { id: 'daily' as MainTab, label: 'Tantangan Harian', short: 'Harian', icon: '🔥' },
    { id: 'exam' as MainTab, label: 'Ujian Matematika', short: 'Ujian', icon: '🎓' },
    { id: 'badges' as MainTab, label: 'Koleksi Bintang', short: 'Bintang', icon: '⭐' },
    { id: 'progress' as MainTab, label: 'Progres Belajarku', short: 'Progres', icon: '📊' },
    { id: 'settings' as MainTab, label: 'Pengaturan', short: 'Setelan', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-amber-50/60 text-slate-800 flex flex-col font-sans pb-24 md:pb-8">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-xs px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & App Brand */}
          <div
            onClick={() => {
              sound.playClick();
              setActiveTab('adventure');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-500 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg md:text-xl font-black text-amber-950 tracking-tight leading-none">
                  Math Adventure 100
                </h1>
                <span className="text-[10px] font-black bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded-md">
                  SD 1–3
                </span>
              </div>
              <p className="text-[11px] font-bold text-amber-700/80">
                Belajar Berhitung Seru Bersama Miko
              </p>
            </div>
          </div>

          {/* User Status Bar */}
          <div className="flex items-center gap-3 md:gap-5 text-xs md:text-sm font-bold">
            {/* Level & XP */}
            <div className="hidden sm:flex flex-col items-end">
              <div className="flex items-center gap-1.5">
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full text-[11px] font-black">
                  Level {profile.level}
                </span>
                <span className="text-slate-600 font-semibold">{profile.xp} XP</span>
              </div>
              <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${progressInLevel}%` }}
                />
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 bg-amber-100 text-amber-900 px-3 py-1.5 rounded-2xl border border-amber-300">
              <span className="text-amber-500 text-base">⭐</span>
              <span className="font-black">{profile.stars}</span>
            </div>

            {/* Streak */}
            <div className="hidden sm:flex items-center gap-1 bg-orange-100 text-orange-900 px-3 py-1.5 rounded-2xl border border-orange-300">
              <span className="text-orange-500 text-base">🔥</span>
              <span className="font-black">{profile.dailyStreak}</span>
            </div>

            {/* Avatar Pill */}
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('settings');
              }}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 p-1.5 md:px-3 md:py-1.5 rounded-2xl border border-slate-200 transition-colors cursor-pointer"
            >
              <span className="text-xl">{avatarEmojis[profile.avatar] || '🤖'}</span>
              <span className="hidden md:inline font-bold text-slate-800 text-xs">
                {profile.name}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Main Navigation Tabs */}
      <nav className="hidden md:block bg-white border-b border-amber-200/80 px-4 md:px-8 py-2">
        <div className="max-w-7xl mx-auto flex gap-1.5 overflow-x-auto">
          {navigationTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs md:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm scale-102 ring-2 ring-amber-200'
                    : 'text-slate-600 hover:bg-amber-50 hover:text-amber-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main App Content Container */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6 grow">
        {activeTab === 'adventure' && (
          <AdventureMap
            completedLessons={profile.completedLessons}
            userLevel={profile.level}
            userStars={profile.stars}
            onSelectLevel={(lvlId) => {
              setActiveTab('academy');
            }}
            onStartQuickAdventure={() => {
              setActiveTab('academy');
            }}
          />
        )}

        {activeTab === 'academy' && (
          <AcademyView
            completedLessons={profile.completedLessons}
            onCompleteLesson={handleCompleteLesson}
            onNavigateToPractice={(catId) => {
              if (catId) setPracticeCategory(catId as QuestionCategory);
              setActiveTab('practice');
            }}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            initialCategory={practiceCategory}
            wrongQuestionIds={profile.wrongQuestionIds}
            timerEnabled={settings.timerEnabled}
            onFinishSession={handleFinishPracticeSession}
          />
        )}

        {activeTab === 'minigames' && (
          <MiniGamesHub
            onEarnReward={handleEarnReward}
            timerEnabled={settings.timerEnabled}
          />
        )}

        {activeTab === 'daily' && (
          <DailyChallengeView
            dailyStreak={profile.dailyStreak}
            completedDates={profile.dailyChallengeCompletedDates}
            onCompleteDaily={handleCompleteDaily}
          />
        )}

        {activeTab === 'exam' && (
          <ExamView onFinishExam={handleFinishExam} />
        )}

        {activeTab === 'badges' && (
          <BadgesView
            unlockedBadgeIds={profile.badges}
            totalStars={profile.stars}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressParentPanel
            profile={profile}
            onResetProgress={handleReset}
            onSelectCategoryPractice={(catId) => {
              setPracticeCategory(catId);
              setActiveTab('practice');
            }}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            settings={settings}
            profile={profile}
            onUpdateSettings={setSettings}
            onUpdateProfileNameAndAvatar={(newName, newAvatar) => {
              setProfile(p => ({ ...p, name: newName, avatar: newAvatar }));
            }}
          />
        )}
      </main>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t-2 border-amber-200 z-50 px-2 py-1.5 shadow-lg flex justify-around">
        {navigationTabs.slice(0, 5).map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id);
              }}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-transform active:scale-90 ${
                isActive ? 'text-amber-600 font-black' : 'text-slate-500 font-medium'
              }`}
            >
              <span className="text-xl mb-0.5">{tab.icon}</span>
              <span className="text-[10px] leading-tight">{tab.short}</span>
            </button>
          );
        })}
        {/* Overflow Menu for remaining tabs */}
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab(activeTab === 'progress' ? 'settings' : activeTab === 'exam' ? 'badges' : 'exam');
          }}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-transform active:scale-90 ${
            ['exam', 'badges', 'progress', 'settings'].includes(activeTab)
              ? 'text-amber-600 font-black'
              : 'text-slate-500 font-medium'
          }`}
        >
          <span className="text-xl mb-0.5">📂</span>
          <span className="text-[10px] leading-tight">Lainnya</span>
        </button>
      </nav>
    </div>
  );
}
