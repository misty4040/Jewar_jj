import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cursor from '../../components/maison/Cursor';
import FilmGrain from '../../components/maison/FilmGrain';
import Monogram from '../../components/maison/Monogram';
import Footer from '../../components/Footer';
import api, { resolveImage } from '../../lib/api';
import '../../styles/maison.css';

const GAP = 10;

function buildGallery(product) {
    const out = [];
    if (product.image) out.push(product.image);
    if (product.hoverImage && product.hoverImage !== product.image) out.push(product.hoverImage);
    if (Array.isArray(product.gallery)) {
        product.gallery.forEach((g) => { if (g && !out.includes(g)) out.push(g); });
    }
    return out.slice(0, 5);
}

export default function ProductDetail() {
    const { slug, productId } = useParams();
    const navigate = useNavigate();

    const [cat, setCat] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const [activeIdx, setActiveIdx] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        let alive = true;
        setLoading(true);
        setNotFound(false);
        setActiveIdx(0);

        api.get(`/api/categories/slug/${slug}`)
            .then((res) => {
                if (!alive) return;
                const c = res.data;
                setCat(c);
                const p = (c.products || []).find((x) => String(x._id) === productId);
                if (!p) {
                    setNotFound(true);
                } else {
                    setProduct(p);
                }
            })
            .catch((err) => {
                if (!alive) return;
                if (err.response?.status === 404) setNotFound(true);
            })
            .finally(() => {
                if (alive) setLoading(false);
            });

        return () => { alive = false; };
    }, [slug, productId]);

    useLayoutEffect(() => {
        if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    }, [product]);

    useEffect(() => {
        if (!containerRef.current) return;
        const ro = new ResizeObserver(([e]) => setContainerWidth(e.contentRect.width));
        ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, [product]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [productId]);

    useEffect(() => {
        const on = () => setScrolled(window.scrollY > 40);
        on();
        window.addEventListener('scroll', on, { passive: true });
        return () => window.removeEventListener('scroll', on);
    }, []);

    if (notFound) return <Navigate to="/categories" replace />;
    if (loading || !cat || !product) {
        return <div className="maison" style={{ minHeight: '100vh', background: 'var(--ivory)' }} />;
    }

    const images = buildGallery(product).map(resolveImage);
    const productIndex = (cat.products || []).findIndex((p) => String(p._id) === productId);
    const productNum = String(productIndex + 1).padStart(2, '0');

    const imgWidth = containerWidth * 0.76;
    const slideAmt = imgWidth + GAP;

    const enquireHref = `https://wa.me/1234567890?text=${encodeURIComponent(
        `I'd like to enquire about the ${product.name}`
    )}`;

    const provenance = [
        'Benched in Hazaribag, Jharkhand',
        'BIS Hallmarked · Certified 916',
        'Dispatched in heirloom-grade velvet',
    ];

    return (
        <div className="maison">
            <Cursor />
            <FilmGrain />

            <div className={`maison-top ${scrolled ? 'scrolled' : ''}`}>
                <span className="est">Est. 1908 · Hazaribag · № {productNum}</span>
                <Link to="/" className="crest">
                    <Monogram size={28} />
                    <span className="wordmark">Jewar</span>
                </Link>
                <button type="button" className="exit" onClick={() => navigate(`/categories/${slug}`)}>
                    Back to {cat.name}
                </button>
            </div>

            <div style={{ background: 'var(--ivory)', paddingTop: 80 }}>
                <div className="max-w-[1800px] mx-auto px-6 md:px-14">
                    <nav
                        className="flex items-center gap-3 py-6 border-b mono"
                        style={{ borderColor: 'var(--rule)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--muted)' }}
                    >
                        <Link to="/categories" className="link-underline" style={{ color: 'inherit' }}>All Chapters</Link>
                        <span aria-hidden>·</span>
                        <Link to={`/categories/${slug}`} className="link-underline" style={{ color: 'inherit' }}>{cat.name}</Link>
                        <span aria-hidden>·</span>
                        <span style={{ color: 'var(--ink)' }}>{product.name}</span>
                    </nav>
                </div>
            </div>

            <section style={{ background: 'var(--ivory)' }}>
                <div className="max-w-[1800px] mx-auto px-6 md:px-14 py-10 md:py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-10 lg:gap-14 items-start">
                        <div>
                            <div
                                ref={containerRef}
                                className="relative overflow-hidden"
                                style={{
                                    height: 'clamp(300px, 54vh, 480px)',
                                    background: 'linear-gradient(135deg, var(--ivory-2) 0%, var(--ivory-3) 100%)',
                                }}
                            >
                                {containerWidth > 0 && images.length > 0 && (
                                    <motion.div
                                        className="absolute top-0 left-0 h-full flex"
                                        style={{ gap: GAP }}
                                        animate={{ x: -(activeIdx * slideAmt) }}
                                        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {images.map((img, i) => (
                                            <div
                                                key={i}
                                                className="relative h-full flex-shrink-0 overflow-hidden"
                                                style={{
                                                    width: imgWidth,
                                                    cursor: i !== activeIdx ? 'pointer' : 'default',
                                                }}
                                                onClick={() => i !== activeIdx && setActiveIdx(i)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${product.name} · ${i + 1}`}
                                                    className="h-full w-full object-cover"
                                                    style={{
                                                        filter: `saturate(0.82) contrast(1.04) brightness(${i === activeIdx ? 0.96 : 0.76})`,
                                                        transition: 'filter 0.55s',
                                                    }}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.parentNode.style.background =
                                                            'radial-gradient(ellipse at 30% 30%, #C9A96E 0%, #6b4f1f 60%, #1a1109 100%)';
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                <div
                                    className="absolute inset-y-0 right-0 pointer-events-none z-10"
                                    style={{
                                        width: '30%',
                                        background: 'linear-gradient(to right, transparent 0%, rgba(247,242,234,0.55) 100%)',
                                    }}
                                />

                                {activeIdx > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-y-0 left-0 pointer-events-none z-10"
                                        style={{
                                            width: '16%',
                                            background: 'linear-gradient(to left, transparent 0%, rgba(247,242,234,0.55) 100%)',
                                        }}
                                    />
                                )}

                                <div className="absolute top-4 left-4 opacity-70 pointer-events-none z-20">
                                    <div className="w-6 h-[1px] bg-[var(--gold)]" />
                                    <div className="w-[1px] h-6 bg-[var(--gold)]" />
                                </div>

                                <div
                                    className="absolute top-4 mono z-20"
                                    style={{
                                        right: '32%',
                                        color: 'var(--gold)',
                                        fontSize: 9,
                                        letterSpacing: '0.36em',
                                        opacity: 0.85,
                                    }}
                                >
                                    {String(activeIdx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                                </div>

                                {activeIdx > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setActiveIdx((p) => p - 1)}
                                        className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center mono"
                                        style={{
                                            left: 14,
                                            width: 34,
                                            height: 34,
                                            border: '1px solid var(--gold)',
                                            background: 'rgba(247,242,234,0.9)',
                                            backdropFilter: 'blur(6px)',
                                            color: 'var(--ink)',
                                            fontSize: 14,
                                        }}
                                    >
                                        ←
                                    </button>
                                )}

                                {activeIdx < images.length - 1 && containerWidth > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setActiveIdx((p) => p + 1)}
                                        className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center mono"
                                        style={{
                                            left: imgWidth - 48,
                                            width: 34,
                                            height: 34,
                                            border: '1px solid var(--gold)',
                                            background: 'rgba(247,242,234,0.9)',
                                            backdropFilter: 'blur(6px)',
                                            color: 'var(--ink)',
                                            fontSize: 14,
                                        }}
                                    >
                                        →
                                    </button>
                                )}
                            </div>

                            {images.length > 1 && (
                                <div className="grid grid-cols-5 gap-2 mt-3">
                                    {images.map((img, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setActiveIdx(i)}
                                            className="relative overflow-hidden group/thumb"
                                            style={{
                                                aspectRatio: '1 / 1',
                                                border: `1px solid ${i === activeIdx ? 'var(--gold)' : 'var(--rule)'}`,
                                                background: 'var(--ivory-2)',
                                                transition: 'border-color 0.4s',
                                            }}
                                        >
                                            <img
                                                src={img}
                                                alt={`View ${i + 1}`}
                                                loading="lazy"
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/thumb:scale-110"
                                                style={{
                                                    filter: `saturate(${i === activeIdx ? 0.82 : 0.6}) brightness(${i === activeIdx ? 0.96 : 0.88})`,
                                                    transition: 'filter 0.4s, transform 1.6s cubic-bezier(0.22,1,0.36,1)',
                                                }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentNode.style.background =
                                                        'radial-gradient(ellipse at 30% 30%, #C9A96E 0%, #6b4f1f 60%, #1a1109 100%)';
                                                }}
                                            />
                                            {i === activeIdx && (
                                                <div className="absolute inset-0 bg-[var(--gold)]/8 pointer-events-none" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col lg:sticky lg:top-28"
                        >
                            <div className="mono mb-3" style={{ color: 'var(--gold-deep)', fontSize: 10, letterSpacing: '0.42em' }}>
                                Chapter № {cat.numeral} · {cat.name.toUpperCase()}
                            </div>

                            <div className="hairline-gold mb-5" style={{ maxWidth: 60 }} />

                            <h1
                                className="font-serif italic font-light leading-[1.0] tracking-[-0.02em] mb-2"
                                style={{ fontSize: 'clamp(32px, 3.2vw, 56px)', color: 'var(--ink)' }}
                            >
                                {product.name}
                            </h1>

                            <p className="mono mb-5" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--muted)' }}>
                                {product.material}
                            </p>

                            <div className="hairline mb-5" />

                            <p
                                className="font-serif font-light leading-[1.55] mb-5"
                                style={{ fontSize: 'clamp(14px, 1.05vw, 18px)', color: 'var(--ink)', opacity: 0.75 }}
                            >
                                {product.description || cat.description}
                            </p>

                            {(product.purity || product.codingNo || product.grossWeight || product.netWeight || product.otherWeight || product.remarks) && (
                                <div className="mb-6 pt-5 border-t" style={{ borderColor: 'var(--rule)' }}>
                                    <div className="mono mb-4" style={{ color: 'var(--gold-deep)', fontSize: 9, letterSpacing: '0.46em' }}>
                                        SPECIFICATIONS
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-3 text-xs mono" style={{ color: 'var(--muted)', letterSpacing: '0.1em' }}>
                                        {product.purity && (
                                            <>
                                                <span className="font-medium">PURITY</span>
                                                <span style={{ color: 'var(--ink)' }}>{product.purity}</span>
                                            </>
                                        )}
                                        {product.codingNo && (
                                            <>
                                                <span className="font-medium">CODING NO.</span>
                                                <span style={{ color: 'var(--ink)' }}>{product.codingNo}</span>
                                            </>
                                        )}
                                        {product.grossWeight && (
                                            <>
                                                <span className="font-medium">GROSS WEIGHT</span>
                                                <span style={{ color: 'var(--ink)' }}>{product.grossWeight}</span>
                                            </>
                                        )}
                                        {product.netWeight && (
                                            <>
                                                <span className="font-medium">NET WEIGHT</span>
                                                <span style={{ color: 'var(--ink)' }}>{product.netWeight}</span>
                                            </>
                                        )}
                                        {product.otherWeight && (
                                            <>
                                                <span className="font-medium">AD / DIA WEIGHT</span>
                                                <span style={{ color: 'var(--ink)' }}>{product.otherWeight}</span>
                                            </>
                                        )}
                                        {product.remarks && (
                                            <>
                                                <span className="font-medium">REMARKS</span>
                                                <span style={{ color: 'var(--ink)' }}>{product.remarks}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 flex items-baseline gap-4">
                                <span className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.46em' }}>
                                    PRICE
                                </span>
                                <span
                                    className="font-serif font-light tracking-[-0.01em]"
                                    style={{ fontSize: 'clamp(18px, 1.5vw, 24px)', color: 'var(--ink)' }}
                                >
                                    {product.price > 0 ? `INR ${product.price.toLocaleString('en-IN')}` : 'Price on Request'}
                                </span>
                            </div>

                            <div className="hairline mt-5 mb-5" />

                            <a
                                href={enquireHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn inline-flex"
                                style={{ color: 'var(--ink)' }}
                            >
                                <span className="dot" />
                                Enquire on WhatsApp
                            </a>

                            <div className="mt-7 pt-7 border-t" style={{ borderColor: 'var(--rule)' }}>
                                <div className="mono mb-4" style={{ color: 'var(--gold-deep)', fontSize: 9, letterSpacing: '0.46em' }}>
                                    PROVENANCE
                                </div>
                                <div className="flex flex-col gap-3">
                                    {provenance.map((note, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 mono"
                                            style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.22em' }}
                                        >
                                            <span style={{ width: 16, height: 1, background: 'var(--gold)', flexShrink: 0 }} />
                                            {note}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={() => navigate(`/categories/${slug}`)}
                                    className="link-underline mono flex items-center gap-3"
                                    style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--muted)', background: 'none', border: 'none' }}
                                >
                                    <span style={{ display: 'inline-block', width: 14, height: 1, background: 'var(--muted)' }} />
                                    View all {cat.name}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
