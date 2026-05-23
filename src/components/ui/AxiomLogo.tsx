"use client";

export function AxiomLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 overflow-visible"
      >
        <defs>
          <linearGradient id="logo-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-cyan)" />
          </linearGradient>
          <linearGradient id="logo-grad-accent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </linearGradient>
          <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Outer glowing orbital ring (subtle, thin) */}
        <circle 
          cx="50" 
          cy="50" 
          r="44" 
          stroke="url(#logo-grad-primary)" 
          strokeWidth="1.5" 
          strokeDasharray="6 8" 
          opacity="0.35" 
          className="animate-spin" 
          style={{ transformOrigin: 'center', animationDuration: '24s' }} 
        />
        
        {/* Inner static orbit accent */}
        <circle 
          cx="50" 
          cy="50" 
          r="36" 
          stroke="url(#logo-grad-accent)" 
          strokeWidth="0.75" 
          opacity="0.2" 
          strokeDasharray="32 12" 
        />

        {/* Left sweeping dimensional blade of the "A" */}
        <path 
          d="M26 80 C 26 80, 36 40, 50 18 C 50 18, 43 45, 36 80 Z" 
          fill="url(#logo-grad-primary)" 
          opacity="0.9" 
        />
        
        {/* Right sweeping dimensional blade of the "A" */}
        <path 
          d="M74 80 C 74 80, 64 40, 50 18 C 50 18, 57 45, 64 80 Z" 
          fill="url(#logo-grad-accent)" 
          opacity="0.9" 
        />
        
        {/* Intersecting cap glow highlight */}
        <path 
          d="M45 28 C 48 24, 52 24, 55 28 L 50 18 Z" 
          fill="var(--color-cyan)" 
          opacity="0.95" 
          filter="url(#logo-glow)" 
        />

        {/* Horizontal crossbar: Pulsing neural/quantum core */}
        <circle 
          cx="50" 
          cy="52" 
          r="6.5" 
          fill="url(#logo-grad-primary)" 
          filter="url(#logo-glow)" 
        />
        <circle 
          cx="50" 
          cy="52" 
          r="3" 
          fill="#ffffff" 
          className="animate-pulse" 
        />
      </svg>
    </div>
  );
}
