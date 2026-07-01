import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageHead from '../../components/PageHead';
import ImageUpload from '../../components/ImageUpload';
import { useOne, saveOne } from '../../lib/useResource';

const empty = {
    bannerImage: '',
    bannerPreHeading: 'The Maison Says',
    bannerHeading: 'Make a style statement,\\none',
    bannerHighlight: '',
    bannerPostHeading: 'at a time.',
    bannerText: 'Hand-finished at the Hazaribag bench. By appointment, by hand.',
};

export default function BannerForm() {
    const { id } = useParams();
    const nav = useNavigate();
    const { data, loading } = useOne('/categories', id);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (data) {
            setForm({
                bannerImage: data.bannerImage || '',
                bannerPreHeading: data.bannerPreHeading || 'The Maison Says',
                bannerHeading: data.bannerHeading || 'Make a style statement,\\none',
                bannerHighlight: data.bannerHighlight || '',
                bannerPostHeading: data.bannerPostHeading || 'at a time.',
                bannerText: data.bannerText || 'Hand-finished at the Hazaribag bench. By appointment, by hand.',
            });
        }
    }, [data]);

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await saveOne('/categories', id, form);
            toast.success('Banner Settings Saved');
            nav('/banners');
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
                title={`Edit Banner: ${data?.name || 'Category'}`}
                sub="Configure category interlude banner"
                actions={<Link to="/banners" className="btn ghost">Cancel</Link>}
            />
            <form className="form" onSubmit={submit}>
                <div className="full" style={{ background: 'var(--bg-light)', padding: 16, borderRadius: 'var(--radius)', border: '1px solid var(--line)', marginTop: 16 }}>
                    <ImageUpload label="Banner Image (Overrides Hero Image in Banner)" value={form.bannerImage} onChange={(v) => set('bannerImage', v)} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                        <label>
                            Pre-Heading
                            <input type="text" value={form.bannerPreHeading} onChange={(e) => set('bannerPreHeading', e.target.value)} />
                        </label>
                        <label>
                            Heading Line 1
                            <input type="text" value={form.bannerHeading} onChange={(e) => set('bannerHeading', e.target.value)} />
                        </label>
                        <label>
                            Highlighted Word (Leaves blank to use Category Name)
                            <input type="text" value={form.bannerHighlight} onChange={(e) => set('bannerHighlight', e.target.value)} placeholder="e.g. GOLD LADIES RING" />
                        </label>
                        <label>
                            Heading Line 2
                            <input type="text" value={form.bannerPostHeading} onChange={(e) => set('bannerPostHeading', e.target.value)} />
                        </label>
                    </div>
                    <label className="full" style={{ marginTop: 16 }}>
                        Footer Text
                        <textarea value={form.bannerText} onChange={(e) => set('bannerText', e.target.value)} rows={2} />
                    </label>
                </div>

                <div className="actions">
                    <Link to="/banners" className="btn ghost">Cancel</Link>
                    <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving…' : 'Save Banner'}</button>
                </div>
            </form>
        </>
    );
}
