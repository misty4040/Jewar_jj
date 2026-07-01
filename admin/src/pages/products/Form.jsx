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
    purity: '',
    remarks: '',
    codingNo: '',
    grossWeight: '',
    netWeight: '',
    otherWeight: '',
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
                <label>
                    Purity
                    <select value={form.purity} onChange={(e) => set('purity', e.target.value)}>
                        <option value="">— choose —</option>
                        <option value="22kt">22kt</option>
                        <option value="18kt">18kt</option>
                        <option value="pt">pt</option>
                    </select>
                </label>
                <label>
                    Coding No.
                    <input type="text" value={form.codingNo} onChange={(e) => set('codingNo', e.target.value)} placeholder="e.g. lr22/22" />
                </label>
                <label>
                    Gross Weight
                    <input type="text" value={form.grossWeight} onChange={(e) => set('grossWeight', e.target.value)} placeholder="e.g. 5.240 g" />
                </label>
                <label>
                    Net Weight
                    <input type="text" value={form.netWeight} onChange={(e) => set('netWeight', e.target.value)} placeholder="e.g. 5.100 g" />
                </label>
                <label>
                    Other Weight (AD/DIA)
                    <input type="text" value={form.otherWeight} onChange={(e) => set('otherWeight', e.target.value)} placeholder="e.g. 1.250 g" />
                </label>
                <label className="full">
                    Description
                    <textarea value={form.description} onChange={(e) => set('description', e.target.value)} />
                </label>
                <label className="full">
                    Remarks
                    <textarea value={form.remarks} onChange={(e) => set('remarks', e.target.value)} />
                </label>
                <ImageUpload label="Primary Image" value={form.image} onChange={(v) => set('image', v)} />
                <ImageUpload label="Hover / Alt Image" value={form.hoverImage} onChange={(v) => set('hoverImage', v)} />
                
                <div className="full" style={{ background: 'var(--bg-light)', padding: 16, borderRadius: 'var(--radius)', border: '1px solid var(--line)', marginTop: 16 }}>
                    <label style={{ marginBottom: 12, display: 'block', fontWeight: 600 }}>Gallery Images</label>
                    {(form.gallery || []).map((url, i) => (
                        <div key={i} style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px dashed var(--line)' }}>
                            <ImageUpload
                                label={`Gallery Image ${i + 1}`}
                                value={url}
                                onChange={(v) => {
                                    const newGallery = [...(form.gallery || [])];
                                    newGallery[i] = v;
                                    set('gallery', newGallery);
                                }}
                            />
                            <button 
                                type="button" 
                                className="btn sm danger" 
                                style={{ marginTop: 8 }}
                                onClick={() => {
                                    const newGallery = [...(form.gallery || [])];
                                    newGallery.splice(i, 1);
                                    set('gallery', newGallery);
                                }}
                            >
                                Remove Gallery Image
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn ghost sm"
                        onClick={() => set('gallery', [...(form.gallery || []), ''])}
                    >
                        + Add Gallery Image
                    </button>
                </div>
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
