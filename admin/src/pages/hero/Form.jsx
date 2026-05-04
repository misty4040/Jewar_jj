import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageHead from '../../components/PageHead';
import ImageUpload from '../../components/ImageUpload';
import { useOne, saveOne } from '../../lib/useResource';

const empty = {
    eyebrow: '',
    headline: '',
    subheadline: '',
    ctaLabel: 'Explore Collection',
    ctaLink: '/atelier',
    image: '',
    trendingTitle: '',
    trendingPrice: '',
    trendingImage: '',
    order: 0,
    published: true,
};

export default function HeroForm() {
    const { id } = useParams();
    const nav = useNavigate();
    const { data, loading } = useOne('/hero', id);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);

    useEffect(() => { if (data) setForm({ ...empty, ...data }); }, [data]);
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await saveOne('/hero', id, form);
            toast.success(id ? 'Saved' : 'Created');
            nav('/hero');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Save failed');
        } finally { setSaving(false); }
    };

    if (loading) return <div className="empty">Loading…</div>;

    return (
        <>
            <PageHead title={id ? 'Edit Hero Slide' : 'New Hero Slide'} sub="Above-the-fold" actions={<Link to="/hero" className="btn ghost">Cancel</Link>} />
            <form className="form" onSubmit={submit}>
                <label>Eyebrow<input type="text" value={form.eyebrow} onChange={(e) => set('eyebrow', e.target.value)} placeholder="Flagship Store Exclusive" /></label>
                <label>Order<input type="number" value={form.order} onChange={(e) => set('order', Number(e.target.value))} /></label>
                <label className="full">Headline (use \n for line breaks)<textarea required value={form.headline} onChange={(e) => set('headline', e.target.value)} placeholder="Crafted in Gold, Designed for Generations" /></label>
                <label className="full">Sub-headline<input type="text" value={form.subheadline} onChange={(e) => set('subheadline', e.target.value)} /></label>
                <label>CTA Label<input type="text" value={form.ctaLabel} onChange={(e) => set('ctaLabel', e.target.value)} /></label>
                <label>CTA Link<input type="text" value={form.ctaLink} onChange={(e) => set('ctaLink', e.target.value)} /></label>
                <ImageUpload label="Hero Background Image" value={form.image} onChange={(v) => set('image', v)} />

                <div className="full"><strong style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5a5a5a' }}>Trending Piece (optional)</strong></div>
                <label>Trending Title<input type="text" value={form.trendingTitle} onChange={(e) => set('trendingTitle', e.target.value)} placeholder="Heritage Jhumkas" /></label>
                <label>Trending Price<input type="text" value={form.trendingPrice} onChange={(e) => set('trendingPrice', e.target.value)} placeholder="INR 485,000.00" /></label>
                <ImageUpload label="Trending Image" value={form.trendingImage} onChange={(v) => set('trendingImage', v)} />

                <label className="check"><input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} /> Published</label>
                <div className="actions">
                    <Link to="/hero" className="btn ghost">Cancel</Link>
                    <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving…' : 'Save Slide'}</button>
                </div>
            </form>
        </>
    );
}
