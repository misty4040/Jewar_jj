import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageHead from '../../components/PageHead';
import ImageUpload from '../../components/ImageUpload';
import { useOne, saveOne } from '../../lib/useResource';

const empty = {
    slug: '',
    name: '',
    numeral: '',
    tagline: '',
    description: '',
    heroImage: '',
    heroPosition: '50% 50%',
    accent: 'ink',
    pieces: 0,
    stats: [],
    order: 0,
    published: true,
};

export default function CategoryForm() {
    const { id } = useParams();
    const nav = useNavigate();
    const { data, loading } = useOne('/categories', id);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (data) setForm({ ...empty, ...data, stats: data.stats || [] });
    }, [data]);

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const setStat = (i, k, v) =>
        setForm((f) => {
            const stats = [...f.stats];
            stats[i] = { ...stats[i], [k]: v };
            return { ...f, stats };
        });
    const addStat = () => setForm((f) => ({ ...f, stats: [...f.stats, { n: '', l: '' }] }));
    const removeStat = (i) =>
        setForm((f) => ({ ...f, stats: f.stats.filter((_, idx) => idx !== i) }));

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await saveOne('/categories', id, form);
            toast.success(id ? 'Saved' : 'Created');
            nav('/categories');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="empty">Loading…</div>;

    return (
        <>
            <PageHead
                title={id ? 'Edit Category' : 'New Category'}
                sub="Chapter detail"
                actions={<Link to="/categories" className="btn ghost">Cancel</Link>}
            />
            <form className="form" onSubmit={submit}>
                <label>
                    Name
                    <input type="text" required value={form.name} onChange={(e) => set('name', e.target.value)} />
                </label>
                <label>
                    Slug
                    <input
                        type="text"
                        required
                        value={form.slug}
                        onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                        placeholder="rings, mangalsutra, …"
                    />
                </label>
                <label>
                    Numeral (Roman)
                    <input type="text" value={form.numeral} onChange={(e) => set('numeral', e.target.value)} placeholder="I, II, III…" />
                </label>
                <label>
                    Accent
                    <select value={form.accent} onChange={(e) => set('accent', e.target.value)}>
                        <option value="ink">Ink (dark)</option>
                        <option value="ivory">Ivory (light)</option>
                    </select>
                </label>
                <label className="full">
                    Tagline
                    <input type="text" value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
                </label>
                <label className="full">
                    Description
                    <textarea value={form.description} onChange={(e) => set('description', e.target.value)} />
                </label>
                <ImageUpload label="Hero Image" value={form.heroImage} onChange={(v) => set('heroImage', v)} />
                <label>
                    Hero Position (CSS object-position)
                    <input type="text" value={form.heroPosition} onChange={(e) => set('heroPosition', e.target.value)} placeholder="50% 50%" />
                </label>
                <label>
                    Pieces (count)
                    <input type="number" value={form.pieces} onChange={(e) => set('pieces', Number(e.target.value))} />
                </label>
                <label>
                    Order
                    <input type="number" value={form.order} onChange={(e) => set('order', Number(e.target.value))} />
                </label>
                <label className="check">
                    <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} />
                    Published (visible on storefront)
                </label>

                <div className="full">
                    <div className="bar" style={{ marginTop: 8 }}>
                        <strong style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5a5a5a' }}>Stats</strong>
                        <button type="button" className="btn ghost sm" onClick={addStat}>+ Add Stat</button>
                    </div>
                    {form.stats.length === 0 && <div className="empty" style={{ padding: 20 }}>No stats yet.</div>}
                    {form.stats.map((s, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 12, marginBottom: 10 }}>
                            <input type="text" placeholder="22k" value={s.n} onChange={(e) => setStat(i, 'n', e.target.value)} style={{ padding: 10, border: '1px solid var(--line)', borderRadius: 4 }} />
                            <input type="text" placeholder="Solid Gold" value={s.l} onChange={(e) => setStat(i, 'l', e.target.value)} style={{ padding: 10, border: '1px solid var(--line)', borderRadius: 4 }} />
                            <button type="button" className="btn danger sm" onClick={() => removeStat(i)}>×</button>
                        </div>
                    ))}
                </div>

                <div className="actions">
                    <Link to="/categories" className="btn ghost">Cancel</Link>
                    <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving…' : 'Save Category'}</button>
                </div>
            </form>
        </>
    );
}
