import React from 'react';

interface SnipeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const SnipeLogo: React.FC<SnipeLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  const iconSize = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-9 h-9' : 'w-7 h-7';
  const textSize =
    size === 'sm'
      ? 'text-lg tracking-[0.2em]'
      : size === 'lg'
      ? 'text-3xl tracking-[0.25em]'
      : 'text-2xl tracking-[0.22em]';

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Red Star Emblem */}
      <div className="relative flex items-center justify-center flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          className={`${iconSize} text-red-600 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]`}
          fill="currentColor"
        >
          {/* Central 4-point star with flairs matching jacket */}
          <polygon points="50,2 58,38 98,50 58,62 50,98 42,62 2,50 42,38" />
          <polygon points="50,24 54,46 76,50 54,54 50,76 46,54 24,50 46,46" fill="#ff4d4d" />
          <circle cx="50" cy="50" r="4" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-baseline space-x-1">
          <span className={`font-serif-brand font-black uppercase text-white ${textSize} leading-none`}>
            SNIPE<span className="text-red-500">LUXE</span>
          </span>
        </div>
        {showTagline && (
          <span className="text-[9px] tracking-[0.35em] font-mono-brand text-zinc-400 uppercase mt-0.5 font-medium">
            NO DISTRACTIONS. ONLY DIRECTION.
          </span>
        )}
      </div>
    </div>
  );
};
