import type { LucideIcon } from 'lucide-react';

type Tone = 'pink' | 'purple' | 'blue' | 'cyan';

type GradientIconProps = {
  icon: LucideIcon;
  tone?: Tone;
  className?: string;
  size?: number;
};

const toneMap: Record<Tone, { glow: string; ring: string }> = {
  pink: {
    glow: 'bg-[radial-gradient(circle,rgba(242,57,138,0.5)_0%,rgba(242,57,138,0)_72%)]',
    ring: 'from-[#F2398A]/60 to-[#9A33FF]/35'
  },
  purple: {
    glow: 'bg-[radial-gradient(circle,rgba(154,51,255,0.5)_0%,rgba(154,51,255,0)_72%)]',
    ring: 'from-[#9A33FF]/60 to-[#3A31FF]/35'
  },
  blue: {
    glow: 'bg-[radial-gradient(circle,rgba(36,107,255,0.5)_0%,rgba(36,107,255,0)_72%)]',
    ring: 'from-[#3A31FF]/60 to-[#246BFF]/35'
  },
  cyan: {
    glow: 'bg-[radial-gradient(circle,rgba(20,199,229,0.5)_0%,rgba(20,199,229,0)_72%)]',
    ring: 'from-[#246BFF]/60 to-[#14C7E5]/35'
  }
};

export function GradientIcon({ icon: Icon, tone = 'purple', className = '', size = 16 }: GradientIconProps) {
  const theme = toneMap[tone];

  return (
    <span className={`relative inline-flex h-10 w-10 items-center justify-center ${className}`}>
      <span className={`absolute inset-0 rounded-full ${theme.glow} blur-md`} />
      <span className={`relative inline-flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-white/5 bg-gradient-to-br ${theme.ring}`}>
        <Icon size={size} className="text-white/90" />
      </span>
    </span>
  );
}
