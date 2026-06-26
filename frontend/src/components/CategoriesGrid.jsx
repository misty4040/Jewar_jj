import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetch } from '../lib/useFetch';
import { resolveImage } from '../lib/api';

const HOME_ORDER = [
    'rings', 'necklaces',
    'earrings', 'pendants', 'bangles', 'bracelets',
    'mangalsutra', 'kara', 'pendant-sets', 'chains',
];

const FEATURED = ['rings', 'earrings', 'necklaces', 'bangles', 'pendants'];

const orderBy = (list, order) =>
    order.map((s) => list.find((c) => c.slug === s)).filter(Boolean);

export default function CategoriesGrid({ variant = 'home' }) {
    const { data, loading } = useFetch('/api/categories', []);
    const list = data || [];

    if (loading || list.length === 0) {
        return <div className="w-full min-h-[400px]" />;
    }

    if (variant === 'page') {
        const featured = orderBy(list, FEATURED);
        const [f1, f2, f3, f4, f5] = featured.length >= 5 ? featured : list.slice(0, 5);
        return (
            <div className="w-full flex flex-col gap-3 md:gap-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
                    {f1 && <CategoryTile cat={f1} className="md:col-span-7 h-[clamp(260px,46vh,500px)]" size="hero" delay={0} />}
                    {f2 && <CategoryTile cat={f2} className="md:col-span-5 h-[clamp(260px,46vh,500px)]" size="hero" delay={0.08} />}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-12 gap-3 md:gap-4">
                    {f3 && <CategoryTile cat={f3} className="col-span-1 md:col-span-4 h-[clamp(200px,32vh,360px)]" delay={0.16} />}
                    {f4 && <CategoryTile cat={f4} className="col-span-1 md:col-span-4 h-[clamp(200px,32vh,360px)]" delay={0.22} />}
                    {f5 && <CategoryTile cat={f5} className="col-span-1 md:col-span-4 h-[clamp(200px,32vh,360px)]" delay={0.28} />}
                </div>
            </div>
        );
    }

    const ordered = orderBy(list, HOME_ORDER);
    const final = ordered.length >= list.length ? ordered : list;
    const [a, b, ...rest] = final;

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5 mb-3 md:mb-5">
                {a && <CategoryTile cat={a} className="md:col-span-7 aspect-[5/6] md:aspect-[16/11]" size="hero" delay={0} />}
                {b && <CategoryTile cat={b} className="md:col-span-5 aspect-[5/6] md:aspect-[16/11]" size="hero" delay={0.08} />}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-5 mb-3 md:mb-5">
                {rest.slice(0, 4).map((c, i) => (
                    <CategoryTile key={c.slug} cat={c} className="md:col-span-3 aspect-[4/5]" delay={0.18 + i * 0.06} />
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-5">
                {rest.slice(4, 8).map((c, i) => (
                    <CategoryTile key={c.slug} cat={c} className="md:col-span-3 aspect-[4/5]" delay={0.42 + i * 0.06} />
                ))}
            </div>
        </div>
    );
}

function CategoryTile({ cat, className = '', size = 'normal', delay = 0 }) {
    const isHero = size === 'hero';
    const heroSrc = resolveImage(cat.heroImage);
    const heroPos = cat.heroPosition || '50% 50%';

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            <Link
                to={`/categories/${cat.slug}`}
                className="group relative h-full w-full block overflow-hidden bg-[#0a0a0a]"
                aria-label={`Enter the chapter on ${cat.name}`}
            >
                <img
                    src={heroSrc}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                    style={{
                        objectPosition: heroPos,
                        filter: 'saturate(0.72) contrast(1.06) brightness(0.82)',
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.background =
                            'radial-gradient(ellipse at 30% 30%, #C9A96E 0%, #6b4f1f 60%, #1a1109 100%)';
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/15 group-hover:from-black/85 transition-opacity duration-1000" />

                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)' }}
                />

                <div className="absolute -right-3 md:-right-5 top-[44%] -translate-y-1/2 pointer-events-none select-none">
                    <span
                        className="font-serif italic font-extralight leading-[0.8] text-white/[0.07] group-hover:text-[#C9A96E]/[0.18] transition-colors duration-1000 block"
                        style={{
                            fontSize: isHero ? 'clamp(220px, 26vw, 420px)' : 'clamp(140px, 14vw, 220px)',
                            letterSpacing: '-0.04em',
                        }}
                    >
                        {cat.numeral}
                    </span>
                </div>

                <div className="absolute inset-3 md:inset-5 border border-[#C9A96E]/0 group-hover:border-[#C9A96E]/35 transition-all duration-1000 pointer-events-none" />

                <div className="absolute top-5 md:top-7 right-5 md:right-7 opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-8 h-[1px] bg-[#C9A96E] ml-auto" />
                    <div className="w-[1px] h-8 bg-[#C9A96E] ml-auto" />
                </div>

                <div className={`relative z-10 h-full flex flex-col justify-between text-white ${isHero ? 'p-6 md:p-12' : 'p-5 md:p-7'}`}>
                    <div className="flex flex-col gap-1.5">
                        <div className="text-[10px] tracking-[0.4em] text-[#E3CFA0] uppercase font-medium">
                            Chapter № {cat.numeral}
                        </div>
                        <div className="text-[9px] tracking-[0.32em] text-white/45 uppercase font-medium">
                            Est. MMXXVI · Hazaribag
                        </div>
                    </div>

                    <div>
                        {isHero ? (
                            <h3
                                className="font-serif italic font-light tracking-[-0.02em] leading-[0.94] mb-5 transition-transform duration-1000 group-hover:-translate-y-1"
                                style={{ fontSize: 'clamp(54px, 7vw, 110px)' }}
                            >
                                {cat.name}
                            </h3>
                        ) : (
                            <h3
                                className="font-serif italic font-light tracking-[-0.01em] leading-[1] mb-3 transition-transform duration-1000 group-hover:-translate-y-1"
                                style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}
                            >
                                {cat.name}
                            </h3>
                        )}

                        <div className="relative h-[1px] mb-4 overflow-hidden">
                            <div className="h-full w-12 bg-gradient-to-r from-[#C9A96E] via-[#E3CFA0] to-transparent group-hover:w-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                        </div>

                        {isHero && cat.tagline && (
                            <p
                                className="font-serif italic text-white/75 max-w-md leading-[1.5] mb-6 font-light"
                                style={{ fontSize: 'clamp(15px, 1.1vw, 20px)' }}
                            >
                                {cat.tagline}
                            </p>
                        )}

                        <div className="flex items-center justify-between gap-3">
                            <span className="text-[10px] tracking-[0.4em] uppercase text-white/55 font-medium">
                                {cat.pieces || ''} Pieces · By Hand
                            </span>
                            <span className="text-[10px] tracking-[0.4em] uppercase text-[#E3CFA0] font-medium opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-2 group-hover:translate-x-0 flex items-center gap-2 whitespace-nowrap">
                                Enter
                                <span className="inline-block group-hover:translate-x-1 transition-transform duration-700">→</span>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
