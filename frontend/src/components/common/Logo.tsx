import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'seal';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-16',
  };

  // Rehal + Qur'an inside Dome Icon (Matching exact uploaded logo)
  const IconSVG = (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClasses[size]} w-auto drop-shadow-sm`}
    >
      {/* Outer Dome Line */}
      <path
        d="M250 30 C 350 110, 440 180, 480 230 C 420 250, 400 240, 390 280 M250 30 C 150 110, 60 180, 20 230 C 80 250, 100 240, 110 280"
        stroke="#D93829"
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Qur'an Pages on Rehal */}
      <path
        d="M250 130 Q 340 90, 410 130 L 410 270 Q 330 220, 250 280 Q 170 220, 90 270 L 90 130 Q 160 90, 250 130 Z"
        fill="#D93829"
      />
      {/* Inner Book Spine / Page Divider */}
      <path
        d="M250 130 L 250 280"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Page Lines Left */}
      <path d="M140 160 Q 185 140, 225 160" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
      <path d="M130 195 Q 180 175, 225 195" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
      <path d="M125 230 Q 175 210, 225 230" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />

      {/* Page Lines Right */}
      <path d="M275 160 Q 315 140, 360 160" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
      <path d="M275 195 Q 320 175, 370 195" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
      <path d="M275 230 Q 325 210, 375 230" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />

      {/* Rehal Cross Legs */}
      <path d="M170 270 L 330 380" stroke="#D93829" strokeWidth="22" strokeLinecap="round" />
      <path d="M330 270 L 170 380" stroke="#D93829" strokeWidth="22" strokeLinecap="round" />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{IconSVG}</div>;
  }

  if (variant === 'seal') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <div className="w-24 h-24 rounded-full border-4 border-[#D93829] flex flex-col items-center justify-center p-2 bg-white shadow-md">
          <span className="text-[9px] font-bold text-[#D93829] tracking-widest uppercase mb-1">Rumah Tahfidz</span>
          {IconSVG}
          <span className="text-[8px] font-bold text-[#D93829] tracking-wider uppercase mt-1">Yogyakarta</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {IconSVG}
      <div className="flex flex-col justify-center leading-none">
        <span className="text-xl font-black tracking-tight text-neutral-900 group-hover:text-[#D93829] transition-colors">
          Taruna <span className="text-[#D93829]">Juara</span>
        </span>
        <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase mt-0.5">
          Rumah Tahfidz Al Qur'an Yogyakarta
        </span>
      </div>
    </div>
  );
};
