import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import PageHead from '../../components/PageHead';
import ImageUpload from '../../components/ImageUpload';
import { useOne, saveOne } from '../../lib/useResource';

const empty = {
    name: '',
    slug: '',
    category: '',
    material: '',
    description: '',
    price: 0,
    image: '',
    hoverImage: '',
    gallery: [],
    tags: [],
    featured: false,
    order: 0,
    published: true,
};

export default function ProductForm() {
    const { id } = useParams();
    const nav = useNavigate();
    const { data, loading } = useOne('/products', id);
    const [form, setForm] = useState(empty);
    const [categories, setCategories] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/categories?all=1').then((r) => setCategories(r.data || [])).catch(() => {});
    }, []);

    useEffect(() => {
        if (data) {
            setForm({
                ...empty,
                ...data,
                category: data.category?._id || data.category || '',
                gallery: data.gallery || [],
                tags: data.tags || [],
            });
        }
    }, [data]);

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const submit = async (e) => {
        e.preventDefault();
        if (!form.category) return toast.error('Pick a category');
        setSaving(true);
        try {
            await saveOne('/products', id, form);
            toast.success(id ? 'Saved' : 'Created');
            nav('/products');
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
                title={id ? 'Edit Product' : 'New Product'}
                sub="Piece detail"
                actions={<Link to="/products" className="btn ghost">Cancel</Link>}
            />
            <form className="form" onSubmit={submit}>
                <label>
                    Name
                    <input type="text" required value={form.name} onChange={(e) => set('name', e.target.value)} />
                </label>
                <label>
                    Category
                    <select required value={form.category} onChange={(e) => set('category', e.target.value)}>
                        <option value="">— choose —</option>
                        {categories.map((c) => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Material
                    <input type="text" required value={form.material} onChange={(e) => set('material', e.target.value)} placeholder="22k Gold · Pavé" />
                </label>
                <label>
                    Price (INR)
                    <input type="number" min="0" value={form.price} onChange={(e) => set('price', Number(e.target.value))} />
                </label>
                <label className="full">
                    Description
                    <textarea value={form.description} onChange={(e) => set('description', e.target.value)} />
                </label>
                <ImageUpload label="Primary Image" value={form.image} onChange={(v) => set('image', v)} />
                <ImageUpload label="Hover / Alt Image" value={form.hoverImage} onChange={(v) => set('hoverImage', v)} />
                <label>
                    Order
                    <input type="number" value={form.order} onChange={(e) => set('order', Number(e.target.value))} />
                </label>
                <label>
                    Slug (optional)
                    <input type="text" value={form.slug} onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} />
                </label>
                <label className="check">
                    <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
                    Featured (show in Boutique Highlights)
                </label>
                <label className="check">
                    <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} />
                    Published
                </label>
                <label className="full">
                    Tags (comma-separated)
                    <input
                        type="text"
                        value={(form.tags || []).join(', ')}
                        onChange={(e) => set('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
                    />
                </label>
                <div className="actions">
                    <Link to="/products" className="btn ghost">Cancel</Link>
                    <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving…' : 'Save Product'}</button>
                </div>
            </form>
        </>
    );
}
