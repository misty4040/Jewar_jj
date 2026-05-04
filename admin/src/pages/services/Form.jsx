import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageHead from '../../components/PageHead';
import ImageUpload from '../../components/ImageUpload';
import { useOne, saveOne } from '../../lib/useResource';

const empty = { title: '', description: '', cta: 'LEARN MORE', link: '#', image: '', order: 0, published: true };

export default function ServiceForm() {
    const { id } = useParams();
    const nav = useNavigate();
    const { data, loading } = useOne('/services', id);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);

    useEffect(() => { if (data) setForm({ ...empty, ...data }); }, [data]);
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await saveOne('/services', id, form);
            toast.success(id ? 'Saved' : 'Created');
            nav('/services');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Save failed');
        } finally { setSaving(false); }
    };

    if (loading) return <div className="empty">Loading…</div>;

    return (
        <>
            <PageHead title={id ? 'Edit Service' : 'New Service'} sub="Service tile" actions={<Link to="/services" className="btn ghost">Cancel</Link>} />
            <form className="form" onSubmit={submit}>
                <label>Title<input required type="text" value={form.title} onChange={(e) => set('title', e.target.value)} /></label>
                <label>CTA Label<input type="text" value={form.cta} onChange={(e) => set('cta', e.target.value)} /></label>
                <label className="full">Description<textarea value={form.description} onChange={(e) => set('description', e.target.value)} /></label>
                <label className="full">Link<input type="text" value={form.link} onChange={(e) => set('link', e.target.value)} placeholder="#stores" /></label>
                <ImageUpload value={form.image} onChange={(v) => set('image', v)} />
                <label>Order<input type="number" value={form.order} onChange={(e) => set('order', Number(e.target.value))} /></label>
                <label className="check"><input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} /> Published</label>
                <div className="actions">
                    <Link to="/services" className="btn ghost">Cancel</Link>
                    <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
                </div>
            </form>
        </>
    );
}
