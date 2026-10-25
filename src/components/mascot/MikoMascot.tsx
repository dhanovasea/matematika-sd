import React from 'react';

export type MascotMood = 'happy' | 'cheering' | 'thinking' | 'waving' | 'proud' | 'encouraging';

interface MikoMascotProps {
  mood?: MascotMood;
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MikoMascot: React.FC<MikoMascotProps> = ({
  mood = 'happy',
  speechText,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Robot SVG */}
      <div className={`relative ${sizeClasses[size]} shrink-0 transition-transform hover:scale-105 select-none`}>
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Antenna */}
          <line x1="60" y1="28" x2="60" y2="10" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="8" r="7" fill="#fbbf24" className="animate-pulse" />
          <circle cx="60" cy="8" r="3" fill="#ffffff" />

          {/* Ears / Head bolts */}
          <rect x="18" y="44" width="8" height="16" rx="3" fill="#38bdf8" />
          <rect x="94" y="44" width="8" height="16" rx="3" fill="#38bdf8" />

          {/* Robot Head */}
          <rect x="24" y="26" width="72" height="54" rx="18" fill="#0284c7" />
          <rect x="28" y="30" width="64" height="46" rx="14" fill="#38bdf8" />

          {/* Visor Screen */}
          <rect x="34" y="36" width="52" height="34" rx="10" fill="#0f172a" />

          {/* Cheeks */}
          <circle cx="41" cy="58" r="4" fill="#f43f5e" opacity="0.6" />
          <circle cx="79" cy="58" r="4" fill="#f43f5e" opacity="0.6" />

          {/* Eyes depending on mood */}
          {mood === 'happy' || mood === 'proud' ? (
            <>
              {/* Happy curve eyes ^^ */}
              <path d="M42 50 Q48 42 54 50" stroke="#38bdf8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M66 50 Q72 42 78 50" stroke="#38bdf8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </>
          ) : mood === 'cheering' ? (
            <>
              {/* Star eyes */}
              <text x="41" y="55" fill="#facc15" fontSize="16" fontWeight="bold">★</text>
              <text x="65" y="55" fill="#facc15" fontSize="16" fontWeight="bold">★</text>
            </>
          ) : mood === 'thinking' ? (
            <>
              {/* One curious eye, one dot */}
              <circle cx="48" cy="48" r="5" fill="#38bdf8" />
              <circle cx="72" cy="46" r="3" fill="#38bdf8" />
              <line x1="68" y1="41" x2="76" y2="43" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Big friendly round eyes */}
              <circle cx="48" cy="48" r="5" fill="#38bdf8" />
              <circle cx="72" cy="48" r="5" fill="#38bdf8" />
              <circle cx="50" cy="46" r="1.5" fill="#ffffff" />
              <circle cx="74" cy="46" r="1.5" fill="#ffffff" />
            </>
          )}

          {/* Mouth */}
          {mood === 'thinking' ? (
            <circle cx="60" cy="62" r="2.5" fill="#38bdf8" />
          ) : mood === 'cheering' ? (
            <path d="M52 58 Q60 67 68 58 Z" fill="#f43f5e" />
          ) : (
            <path d="M53 58 Q60 65 67 58" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}

          {/* Robot Body */}
          <rect x="36" y="82" width="48" height="28" rx="10" fill="#0284c7" />
          <rect x="42" y="86" width="36" height="20" rx="6" fill="#f0f9ff" />

          {/* Math symbol on chest */}
          <text x="60" y="101" fill="#0284c7" fontSize="15" fontWeight="bold" textAnchor="middle">
            {mood === 'cheering' ? '★' : '+−'}
          </text>

          {/* Hands */}
          {mood === 'waving' || mood === 'cheering' ? (
            <>
              <path d="M36 86 C22 75 20 60 22 55" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" fill="none" />
              <circle cx="22" cy="53" r="5" fill="#fbbf24" />
              <path d="M84 86 C98 90 102 96 100 102" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" fill="none" />
              <circle cx="100" cy="102" r="5" fill="#fbbf24" />
            </>
          ) : (
            <>
              <circle cx="32" cy="95" r="5" fill="#fbbf24" />
              <circle cx="88" cy="95" r="5" fill="#fbbf24" />
            </>
          )}
        </svg>
      </div>

      {/* Comic Speech Bubble */}
      {speechText && (
        <div className="relative bg-white border-2 border-sky-400 rounded-2xl px-4 py-2.5 shadow-sm text-slate-800 text-sm md:text-base font-medium max-w-sm">
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent z-10" />
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-0 h-0 border-t-9 border-t-transparent border-r-9 border-r-sky-400 border-b-9 border-b-transparent z-0" />
          <p className="leading-snug">{speechText}</p>
        </div>
      )}
    </div>
  );
};
