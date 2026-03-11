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
      <svg
        className="pointer-events-none absolute inset-[16%] h-[68%] w-[68%]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="radarShapeGradient" x1="14" y1="14" x2="86" y2="86" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2398A" stopOpacity="0.46" />
            <stop offset="0.52" stopColor="#9A33FF" stopOpacity="0.34" />
            <stop offset="1" stopColor="#14C7E5" stopOpacity="0.24" />
          </linearGradient>
          <linearGradient id="radarShapeStroke" x1="12" y1="18" x2="84" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2398A" stopOpacity="0.78" />
            <stop offset="0.46" stopColor="#9A33FF" stopOpacity="0.86" />
            <stop offset="1" stopColor="#14C7E5" stopOpacity="0.72" />
          </linearGradient>
        </defs>

        {[
          { x: 50, y: 12, valuesX: '50;50;50;50', valuesY: '22;12;19;22', begin: '0s' },
          { x: 79, y: 30, valuesX: '70;79;73;70', valuesY: '38;30;36;38', begin: '0.6s' },
          { x: 88, y: 50, valuesX: '76;88;81;76', valuesY: '50;50;50;50', begin: '1.2s' },
          { x: 50, y: 88, valuesX: '50;50;50;50', valuesY: '76;88;80;76', begin: '1.8s' },
          { x: 21, y: 70, valuesX: '30;21;26;30', valuesY: '62;70;66;62', begin: '2.4s' },
          { x: 12, y: 50, valuesX: '24;12;18;24', valuesY: '50;50;50;50', begin: '3s' }
        ].map((axis, index) => (
          <line key={`axis-${index}`} x1="50" y1="50" x2={axis.x} y2={axis.y} stroke="rgba(255,255,255,0.22)" strokeWidth="0.9">
            <animate attributeName="x2" values={axis.valuesX} dur="10.2s" begin={axis.begin} repeatCount="indefinite" />
            <animate attributeName="y2" values={axis.valuesY} dur="10.2s" begin={axis.begin} repeatCount="indefinite" />
          </line>
        ))}

        <polygon points="50,22 70,38 76,50 50,76 30,62 24,50" stroke="rgba(255,255,255,0.16)" strokeWidth="0.8" fill="none" />
        <polygon points="50,18 73,35 82,50 50,80 27,66 18,50" fill="url(#radarShapeGradient)" stroke="url(#radarShapeStroke)" strokeWidth="1.3">
          <animate
            attributeName="points"
            dur="10.2s"
            repeatCount="indefinite"
            values="
              50,18 73,35 82,50 50,80 27,66 18,50;
              50,13 79,30 88,50 50,87 21,70 12,50;
              50,20 74,36 80,50 50,82 25,64 16,50;
              50,18 73,35 82,50 50,80 27,66 18,50
            "
          />
        </polygon>
      </svg>
      <div className="radar-center-pulse absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9A33FF]/70" />
      <span className="radar-particle radar-particle-a absolute left-[22%] top-[26%]" />
      <span className="radar-particle radar-particle-b absolute right-[22%] top-[32%]" />
      <span className="radar-particle radar-particle-c absolute left-[30%] bottom-[24%]" />
      <span className="radar-particle radar-particle-d absolute right-[30%] bottom-[20%]" />
      <span className="radar-particle radar-particle-e absolute left-[44%] top-[14%]" />
      <span className="radar-particle radar-particle-f absolute right-[42%] bottom-[14%]" />
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
