import React from 'react';

interface InitialsAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ name, size = 'md' }) => {
  // Clean fixture prefix for initials
  const cleanName = name.replace(/\[DEMO FIXTURE\]\s*/i, '').trim();
  const words = cleanName.split(/\s+/).filter(Boolean);
  const initials = words.length >= 2 
    ? `${words[0][0]}${words[1][0]}`.toUpperCase()
    : (cleanName.slice(0, 2) || 'NX').toUpperCase();

  // Deterministic color palette for neutral B2B styling
  const colorIndex = (cleanName.charCodeAt(0) + (cleanName.charCodeAt(1) || 0)) % 5;
  const palettes = [
    'bg-brand-950 text-brand-300 border-brand-800/60',
    'bg-indigo-950 text-indigo-300 border-indigo-800/60',
    'bg-cyan-950 text-cyan-300 border-cyan-800/60',
    'bg-purple-950 text-purple-300 border-purple-800/60',
    'bg-teal-950 text-teal-300 border-teal-800/60',
  ];
  const colorClass = palettes[colorIndex];

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
  };

  return (
    <div 
      className={`rounded-lg flex items-center justify-center font-mono font-medium border shrink-0 ${sizeClasses[size]} ${colorClass}`}
      title={cleanName}
    >
      {initials}
    </div>
  );
};
