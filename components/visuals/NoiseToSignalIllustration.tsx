type NoiseToSignalIllustrationProps = {
  className?: string;
};

export function NoiseToSignalIllustration({ className = '' }: NoiseToSignalIllustrationProps) {
  return (
    <svg
      className={className}
      width="210"
      height="54"
      viewBox="0 0 210 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="209" height="53" rx="14" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" />
      <g opacity="0.55">
        {[
          [18, 12], [28, 17], [20, 27], [34, 34], [27, 42], [45, 14], [48, 26], [42, 40], [60, 18], [58, 34], [68, 24]
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.7" fill="rgba(170,180,194,0.9)" />
        ))}
      </g>
      <path d="M78 27 H102" stroke="url(#noiseSignalArrow)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M98 23 L102 27 L98 31" stroke="url(#noiseSignalArrow)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M112 36 C120 34, 126 30, 132 31 C139 32, 144 20, 150 21 C156 22, 160 14, 166 16 C172 18, 177 12, 184 14 C191 16, 196 13, 202 15"
        stroke="url(#noiseSignalWave)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="201" cy="15" r="2.2" fill="#14C7E5" />
      <defs>
        <linearGradient id="noiseSignalArrow" x1="78" y1="23" x2="102" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9A33FF" />
          <stop offset="1" stopColor="#246BFF" />
        </linearGradient>
        <linearGradient id="noiseSignalWave" x1="112" y1="12" x2="202" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F2398A" />
          <stop offset="0.5" stopColor="#9A33FF" />
          <stop offset="1" stopColor="#14C7E5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
