type RadarPulseProps = {
  className?: string;
  labels?: {
    top: string;
    topRight: string;
    right: string;
    bottom: string;
    bottomLeft: string;
    left: string;
  };
  compact?: boolean;
};

export function RadarPulse({ className = '', labels, compact = false }: RadarPulseProps) {
  const sizeClass = compact ? 'max-w-[240px]' : 'max-w-[560px]';
  const labelClass = compact ? 'text-[10px] font-medium' : 'text-[11px]';
  const labelToneClass = 'uppercase tracking-[0.16em] text-[#AAB4C2] [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]';

  return (
    <div className={`relative mx-auto aspect-square w-full ${sizeClass} overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(154,51,255,0.2),rgba(9,20,38,0.82)_68%)] shadow-[0_25px_80px_rgba(0,0,0,0.45),0_0_56px_rgba(36,107,255,0.2)] ${className}`}>
      <div className="radar-aura absolute inset-[7%] rounded-full" />
      <div className="absolute inset-[11%] rounded-full border border-white/15" />
      <div className="absolute inset-[22%] rounded-full border border-white/12" />
      <div className="absolute inset-[33%] rounded-full border border-white/10" />
      <div className="absolute inset-[44%] rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/12" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/12" />
      <div className="absolute left-1/2 top-1/2 h-px w-[135%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white/10" />
      <div className="absolute left-1/2 top-1/2 h-px w-[135%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white/10" />
      <div
        className="radar-polygon-breath absolute inset-[16%] bg-[radial-gradient(circle_at_30%_28%,rgba(242,57,138,0.5),rgba(154,51,255,0.4)_45%,rgba(36,107,255,0.32)_72%,rgba(20,199,229,0.08)_100%)] opacity-90"
        style={{ clipPath: 'polygon(50% 8%, 84% 31%, 76% 80%, 50% 94%, 22% 72%, 14% 31%)' }}
      />
      <div className="radar-center-pulse absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9A33FF]/70" />
      <span className="radar-particle radar-particle-a absolute left-[22%] top-[26%]" />
      <span className="radar-particle radar-particle-b absolute right-[22%] top-[32%]" />
      <span className="radar-particle radar-particle-c absolute left-[30%] bottom-[24%]" />
      <span className="radar-particle radar-particle-d absolute right-[30%] bottom-[20%]" />
      {labels ? (
        <>
          <p className={`absolute left-1/2 top-4 -translate-x-1/2 ${labelToneClass} ${labelClass}`}>{labels.top}</p>
          <p className={`absolute right-[16%] top-[18%] ${labelToneClass} ${labelClass}`}>{labels.topRight}</p>
          <p className={`absolute right-5 top-1/2 -translate-y-1/2 ${labelToneClass} ${labelClass}`}>{labels.right}</p>
          <p className={`absolute bottom-4 left-1/2 -translate-x-1/2 ${labelToneClass} ${labelClass}`}>{labels.bottom}</p>
          <p className={`absolute left-[16%] bottom-[18%] ${labelToneClass} ${labelClass}`}>{labels.bottomLeft}</p>
          <p className={`absolute left-5 top-1/2 -translate-y-1/2 ${labelToneClass} ${labelClass}`}>{labels.left}</p>
        </>
      ) : null}
    </div>
  );
}
