import { RadarPulse } from './RadarPulse';

type HeroRadarVisualProps = {
  labels: {
    top: string;
    topRight: string;
    right: string;
    bottomRight: string;
    bottom: string;
    bottomLeft: string;
    left: string;
    topLeft: string;
  };
};

export function HeroRadarVisual({ labels }: HeroRadarVisualProps) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-4 translate-x-5 translate-y-5 rotate-[1.5deg] rounded-[34px] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] opacity-60 blur-[1px] shadow-[0_25px_80px_rgba(0,0,0,0.45),0_0_60px_rgba(58,49,255,0.2)] sm:inset-5 sm:translate-x-8 sm:translate-y-8" />
      <article className="hero-shell double-layer-panel relative overflow-hidden p-4 sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_36%,rgba(154,51,255,0.18),rgba(9,20,38,0)_52%)]" />
        <div className="relative flex h-[438px] items-center justify-center sm:h-[484px]">
          <RadarPulse
            labels={labels}
            transparent
            className="w-[82%] max-w-[336px] sm:max-w-[404px]"
          />
        </div>
      </article>
    </div>
  );
}
