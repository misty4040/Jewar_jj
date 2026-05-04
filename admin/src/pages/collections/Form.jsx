import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageHead from '../../components/PageHead';
import ImageUpload from '../../components/ImageUpload';
import { useOne, saveOne } from '../../lib/useResource';

const empty = { title: '', subtitle: '', slug: '', image: '', link: '', order: 0, published: true };

export default function CollectionForm() {
    const { id } = useParams();
    const nav = useNavigate();
    const { data, loading } = useOne('/collections', id);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);

    useEffect(() => { if (data) setForm({ ...empty, ...data }); }, [data]);
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await saveOne('/collections', id, form);
            toast.success(id ? 'Saved' : 'Created');
            nav('/collections');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Save failed');
        } finally { setSaving(false); }
    };

    if (loading) return <div className="empty">Loading…</div>;

    return (
        <>
            <PageHead title={id ? 'Edit Collection' : 'New Collection'} sub="Discovery tile" actions={<Link to="/collections" className="btn ghost">Cancel</Link>} />
            <form className="form" onSubmit={submit}>
                <label>Title<input required type="text" value={form.title} onChange={(e) => set('title', e.target.value)} /></label>
                <label>Subtitle<input type="text" value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} /></label>
                <label>Slug<input type="text" value={form.slug} onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} /></label>
                <label>Link<input type="text" value={form.link} onChange={(e) => set('link', e.target.value)} placeholder="#dainty" /></label>
                <ImageUpload value={form.image} onChange={(v) => set('image', v)} />
                <label>Order<input type="number" value={form.order} onChange={(e) => set('order', Number(e.target.value))} /></label>
                <label className="check"><input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} /> Published</label>
                <div className="actions">
                    <Link to="/collections" className="btn ghost">Cancel</Link>
                    <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
                </div>
            </form>
        </>
    );
}
