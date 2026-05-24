"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
} & HTMLAttributes<HTMLDivElement>;

const TECHNICAL_MESSAGES = [
  "CALIBRATING NEURAL SYNAPSES...",
  "SYNCHRONIZING VIRTUAL VFS SECTORS...",
  "INJECTING QUANTUM CODE PACKAGES...",
  "OPTIMIZING MONACO COMPILER LOOPS...",
  "ESTABLISHING SECURE ROOM TUNNELS...",
  "RUNNING LOCAL SANDBOX DIAGNOSTICS...",
  "PARSING ABSTRACT SYNTAX TREES...",
  "COMPILED MATRIX COMPLETED..."
];

export function LoadingSpinner({
  size = "md",
  label,
  className = "",
  ...rest
}: LoadingSpinnerProps) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (size === "sm") return;

    // Simulate tech loading sequence smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          // Loop or linger at high percent to indicate continuous synchronization
          return 0;
        }
        const step = Math.floor(Math.random() * 8) + 1;
        return Math.min(prev + step, 98);
      });
    }, 180);

    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % TECHNICAL_MESSAGES.length);
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(msgInterval);
    };
  }, [size]);

  // Size specifications
  const isSmall = size === "sm";
  const sizeClass = isSmall ? "w-8 h-8" : size === "md" ? "w-44 h-44" : "w-56 h-56";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center select-none text-white", 
        !isSmall && "glass-panel p-8 rounded-[24px] glow-primary border-white/[0.04] bg-black/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={label || "Loading"}
      {...rest}
    >
      {/* Self-contained premium 3D nested orbital styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gyro-rotate-x {
          0% { transform: rotateX(0deg) rotateY(35deg) rotateZ(35deg); }
          100% { transform: rotateX(360deg) rotateY(35deg) rotateZ(35deg); }
        }
        @keyframes gyro-rotate-y {
          0% { transform: rotateX(35deg) rotateY(0deg) rotateZ(-35deg); }
          100% { transform: rotateX(35deg) rotateY(360deg) rotateZ(-35deg); }
        }
        @keyframes gyro-rotate-z {
          0% { transform: rotateX(-35deg) rotateY(-35deg) rotateZ(0deg); }
          100% { transform: rotateX(-35deg) rotateY(-35deg) rotateZ(360deg); }
        }
        @keyframes cyber-scan {
          0%, 100% { transform: translateY(-100%); opacity: 0.15; }
          50% { transform: translateY(100%); opacity: 0.6; }
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .gyro-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid transparent;
        }
      `}} />

      {/* Cyber Grid Scanning Effect inside the Card */}
      {!isSmall && (
        <>
          <div className="absolute inset-0 cyber-grid-bg opacity-[0.03] pointer-events-none" />
          <div className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-[var(--color-primary)]/10 to-transparent top-0 w-full animate-[cyber-scan_4s_ease-in-out_infinite] pointer-events-none blur-sm" />
          {/* Hardware aesthetic coordinate frames */}
          <div className="absolute top-3 left-4 font-mono text-[7px] text-white/30 tracking-widest uppercase">[ NODE_PRESENCE_SYS: ACTIVE ]</div>
          <div className="absolute top-3 right-4 font-mono text-[7px] text-[var(--color-cyan)] tracking-widest uppercase animate-pulse">● SECURE_LINK</div>
        </>
      )}

      {/* Main Gyroscope Loading Core */}
      <div 
        className={cn("relative flex items-center justify-center preserve-3d perspective-800", sizeClass)}
      >
        {/* Soft Background Ambient Radial Bloom */}
        <div 
          className={cn(
            "absolute rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-cyan)] opacity-[0.12] blur-2xl animate-pulse-glow pointer-events-none",
            isSmall ? "w-10 h-10" : size === "md" ? "w-36 h-36" : "w-48 h-48"
          )}
        />

        {isSmall ? (
          /* Sleek Minimal Spinner for Buttons & Tabs */
          <div className="w-5 h-5 rounded-full border-2 border-white/10 border-t-[var(--color-primary)] animate-spin" />
        ) : (
          /* Multi-Dimensional 3D Gyroscope Engine */
          <div className="absolute inset-2 preserve-3d">
            
            {/* 1. Outer Gyroscope Ring - Blue (X-Axis) */}
            <div 
              className="gyro-ring border-t-[var(--color-primary)] border-b-[var(--color-primary)]/10"
              style={{
                animation: "gyro-rotate-x 2.2s linear infinite",
              }}
            />

            {/* 2. Middle Gyroscope Ring - Red (Y-Axis) */}
            <div 
              className="gyro-ring border-l-[var(--color-accent)] border-r-[var(--color-accent)]/10"
              style={{
                animation: "gyro-rotate-y 1.6s linear infinite",
              }}
            />

            {/* 3. Inner Gyroscope Ring - Sky Blue (Z-Axis) */}
            <div 
              className="gyro-ring border-t-[var(--color-cyan)] border-b-[var(--color-cyan)]/20"
              style={{
                animation: "gyro-rotate-z 1.1s linear infinite",
              }}
            />

            {/* Glowing Orbit Particle Satellites */}
            <div 
              className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff] animate-ping"
              style={{
                top: "12%",
                left: "12%",
                animationDuration: "1.4s"
              }}
            />
            <div 
              className="absolute w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_8px_var(--color-cyan)]"
              style={{
                bottom: "15%",
                right: "15%"
              }}
            />

            {/* Central Quantum Reactor Sphere */}
            <div className="absolute inset-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_30px_rgba(10,132,255,0.25)] border-white/20">
              {/* Photon Core Glow */}
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-cyan)] relative flex items-center justify-center animate-pulse">
                <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-60" style={{ animationDuration: "1.5s" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
              </div>

              {/* Glowing Digit Ticking Percentage */}
              <span className="font-display font-black text-[11px] text-[var(--color-cyan)] tracking-tighter mt-1.5 filter drop-shadow-[0_0_4px_rgba(100,210,255,0.5)]">
                {progress}%
              </span>
            </div>
            
          </div>
        )}
      </div>

      {/* Subtitles Console and Technical Status Dashboard */}
      {!isSmall && (
        <div className="mt-6 flex flex-col items-center gap-1.5 w-full relative z-10">
          {/* Main User-Facing Label */}
          {label && (
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-[var(--color-cyan)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {label}
            </h3>
          )}

          {/* Scrolling Matrix Action Log */}
          <p className="font-mono text-[8px] text-[var(--fg-secondary)] tracking-widest text-center uppercase min-h-[12px] opacity-60 animate-pulse mt-0.5">
            {TECHNICAL_MESSAGES[msgIndex]}
          </p>

          {/* Simulated loading bar track */}
          <div className="w-24 h-[1.5px] bg-white/[0.04] rounded-full overflow-hidden mt-1.5">
            <div 
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] transition-all duration-300 rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoadingSpinner;
