import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageHead from '../../components/PageHead';
import { useOne, saveOne } from '../../lib/useResource';

const empty = { name: '', text: '', rating: 5, order: 0, published: true };

export default function ReviewForm() {
    const { id } = useParams();
    const nav = useNavigate();
    const { data, loading } = useOne('/reviews', id);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);

    useEffect(() => { if (data) setForm({ ...empty, ...data }); }, [data]);
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await saveOne('/reviews', id, form);
            toast.success(id ? 'Saved' : 'Created');
            nav('/reviews');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Save failed');
        } finally { setSaving(false); }
    };

    if (loading) return <div className="empty">Loading…</div>;

    return (
        <>
            <PageHead title={id ? 'Edit Review' : 'New Review'} sub="Customer testimonial" actions={<Link to="/reviews" className="btn ghost">Cancel</Link>} />
            <form className="form" onSubmit={submit}>
                <label>Name<input required type="text" value={form.name} onChange={(e) => set('name', e.target.value)} /></label>
                <label>Rating
                    <select value={form.rating} onChange={(e) => set('rating', Number(e.target.value))}>
                        {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} ★</option>)}
                    </select>
                </label>
                <label className="full">Review<textarea required value={form.text} onChange={(e) => set('text', e.target.value)} /></label>
                <label>Order<input type="number" value={form.order} onChange={(e) => set('order', Number(e.target.value))} /></label>
                <label className="check"><input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} /> Published</label>
                <div className="actions">
                    <Link to="/reviews" className="btn ghost">Cancel</Link>
                    <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
                </div>
            </form>
        </>
    );
}
