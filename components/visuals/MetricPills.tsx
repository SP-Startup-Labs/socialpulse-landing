import { SignalSparkline } from './SignalSparkline';

type MetricItem = {
  label: string;
  value: string;
};

type MetricPillsProps = {
  items: MetricItem[];
  className?: string;
};

export function MetricPills({ items, className = '' }: MetricPillsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item, index) => (
        <div
          key={item.label}
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur"
        >
          <span className="text-xs text-[#AAB4C2]">{item.label}</span>
          <span className="text-xs font-semibold text-white">{item.value}</span>
          <SignalSparkline
            className="h-[16px] w-[42px]"
            tone={index % 2 === 0 ? 'purple' : 'cyan'}
            variant={index % 3 === 0 ? 'spike' : 'smooth'}
          />
        </div>
      ))}
    </div>
  );
}
