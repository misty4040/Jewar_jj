import React from 'react';

const JewarLogo = ({ className = "", color = "#C9A84C", showSubtext = true }) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Monogram Section */}
      <svg width="60" height="70" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#F7E7CE" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
        
        {/* Custom JJ Monogram based on image */}
        <path d="M20 15C20 15 28 35 28 60M20 15C20 15 12 35 12 60" stroke={color === '#C9A84C' ? 'url(#goldGradient)' : color} strokeWidth="3" strokeLinecap="round" />
        <path d="M40 15C40 15 48 35 48 60M40 15C40 15 32 35 32 60" stroke={color === '#C9A84C' ? 'url(#goldGradient)' : color} strokeWidth="3" strokeLinecap="round" />
        {/* Top Horizontal Bar with a slight arch */}
        <path d="M12 15C25 10 35 10 48 15" stroke={color === '#C9A84C' ? 'url(#goldGradient)' : color} strokeWidth="4" strokeLinecap="round" />
        
        {/* Diamond Icon Positioned on the right hook */}
        <path d="M48 8L54 14L48 20L42 14L48 8Z" fill={color === '#C9A84C' ? 'url(#goldGradient)' : color} />
        <path d="M42 14H54M48 8V20" stroke="white" strokeWidth="0.5" />
      </svg>

      {/* Brand Name */}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl tracking-[0.2em] font-bold leading-tight" style={{ fontFamily: 'Cinzel, serif', color: color === '#C9A84C' ? '#C9A84C' : color }}>
          JEWAR
        </h1>
        
        {showSubtext && (
          <div className="flex items-center w-full mt-1">
            <div className="flex-grow h-[1px] bg-brand-gold/30"></div>
            <span className="px-3 text-[10px] tracking-[0.5em] uppercase font-light text-gray-400">
              HAZARIBAG
            </span>
            <div className="flex-grow h-[1px] bg-brand-gold/30"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JewarLogo;
