import { LineChart, UserRound, Users } from 'lucide-react';

const audienceCards = [
    {
        title: 'Creators & SMEs',
        badge: 'INITIAL MARKET',
        copy: 'Turn audience emotions, narratives and shifts into clearer content and business decisions.',
        items: ['Emotional drivers', 'Narrative shifts', 'Early signals'],
        icon: UserRound,
        iconClass: 'text-[#246BFF]',
        dotClass: 'bg-[#246BFF]',
        iconBoxClass: '',
        badgeClass: 'border-[#246BFF]/30 bg-[#246BFF]/20 text-[#8FB2FF]',
        cardClass: 'hover:border-[#246BFF]/70 hover:bg-[#246BFF]/[0.07] hover:shadow-[0_0_45px_rgba(36,107,255,0.14)]',
        glow: 'radial-gradient(circle at 15% 10%, rgba(36,107,255,0.18), transparent 58%)'
    },
    {
        title: 'Agencies & communication teams',
        badge: 'SCALE EXPANSION',
        copy: 'Apply the same intelligence across clients, campaigns and collaborative workflows.',
        items: ['Multi-client workflows', 'Greater volume and history', 'Team reporting'],
        icon: Users,
        iconClass: 'text-[#F2398A]',
        dotClass: 'bg-[#F2398A]',
        iconBoxClass: '',
        badgeClass: 'border-[#F2398A]/30 bg-[#F2398A]/20 text-[#FF83B9]',
        cardClass: 'hover:border-[#F2398A]/70 hover:bg-[#F2398A]/[0.07] hover:shadow-[0_0_45px_rgba(242,57,138,0.14)]',
        glow: 'radial-gradient(circle at 15% 10%, rgba(242,57,138,0.18), transparent 58%)'
    },
    {
        title: 'Research & intelligence teams',
        badge: 'LONG-TERM EXPANSION',
        copy: 'Extend analysis across broader sources, markets and longer timeframes.',
        items: ['Cross-market research', 'Longitudinal patterns', 'Custom intelligence'],
        icon: LineChart,
        iconClass: 'text-[#9A33FF]',
        dotClass: 'bg-[#9A33FF]',
        iconBoxClass: 'rounded-xl border border-[#9A33FF]/40 bg-[#9A33FF]/10',
        badgeClass: 'border-[#9A33FF]/30 bg-[#9A33FF]/20 text-[#C18AFF]',
        cardClass: 'hover:border-[#9A33FF]/70 hover:bg-[#9A33FF]/[0.07] hover:shadow-[0_0_45px_rgba(154,51,255,0.14)]',
        glow: 'radial-gradient(circle at 15% 10%, rgba(154,51,255,0.18), transparent 58%)'
    }
];

export function WhoItsForSection() {
    return (
        <section id="model" className="relative overflow-hidden px-5 py-24 md:px-8 md:py-[115px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9A33FF]/[0.05] blur-[150px]" />

            <div className="relative mx-auto w-full max-w-[1536px]">
                <div className="mb-14 max-w-3xl">
                    <p className="mb-4 text-base font-semibold uppercase tracking-[0.22em] text-[#9A8FB0]">Who it’s for</p>

                    <h2 className="text-3xl font-semibold tracking-tight text-[#F5F7FA] md:text-5xl">
                        Advanced intelligence.{' '}
                        <span className="bg-gradient-to-r from-[#F2398A] via-[#9A33FF] to-[#246BFF] bg-clip-text text-transparent">Built for broader access.</span>
                    </h2>

                    <p className="mt-5 max-w-2xl text-lg leading-7 text-[#AAB4C2]">
                        Start with creators and SMEs. Scale the same intelligence across teams, clients and markets.
                    </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                    {audienceCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <article key={card.title} className={`group relative min-h-[340px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#07101F]/80 p-6 transition-all duration-300 sm:p-7 ${card.cardClass}`}>
                                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: card.glow }} />

                                <div className="relative flex h-full flex-col">
                                    <div className="flex items-start gap-5">
                                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center ${card.iconBoxClass}`}>
                                            <Icon className={`h-11 w-11 transition-transform duration-300 group-hover:scale-105 ${card.iconClass}`} strokeWidth={1.5} />
                                        </div>

                                        <div className="min-w-0 pt-1">
                                            <h3 className="text-xl font-semibold leading-6 tracking-[-0.02em] text-[#F5F7FA]">{card.title}</h3>
                                            <span className={`mt-3 inline-flex rounded-md border px-3 py-1 text-[12px] font-medium tracking-[0.05em] ${card.badgeClass}`}>{card.badge}</span>
                                        </div>
                                    </div>

                                    <p className="mt-7 text-base leading-6 text-[#AAB4C2]">{card.copy}</p>

                                    <ul className="mt-4 space-y-3">
                                        {card.items.map((item) => (
                                            <li key={item} className="flex items-center gap-3 text-base text-[#D3D8E0]">
                                                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${card.dotClass}`} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}