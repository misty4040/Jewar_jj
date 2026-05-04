import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import PageHead from '../components/PageHead';
import ImageUpload from '../components/ImageUpload';

const DEFAULTS = {
    brand: { name: 'jewar', tagline: 'Crafted in Gold' },
    announcements: ['FREE SHIPPING FOR ALL ORDERS ABOVE $199', 'TIMELESS GOLD COLLECTION'],
    materials: ['GOLD', 'SILVER', 'PLATINUM', 'DIAMOND', 'GEMSTONES'],
    contact: { phone: '+91 98765 43210', email: 'concierge@jewar.com', address: 'Hazaribag, Jharkhand' },
    social: { instagram: '#', facebook: '#' },
    about: {
        eyebrow: 'Our Legacy',
        title: 'The Spirit of Jewar',
        body: 'Established with a vision to redefine Indian luxury, Jewar stands as a testament to the timeless art of jewellery making.',
        image: '',
    },
    storefront: { eyebrow: 'Retail Excellence', title: 'VISIT US IN STORE', cta: 'FIND A SHOWROOM', link: '#locations', image: '' },
};

export default function Settings() {
    const [s, setS] = useState(DEFAULTS);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/settings').then((r) => {
            const merged = { ...DEFAULTS };
            for (const k of Object.keys(DEFAULTS)) {
                if (r.data[k] !== undefined && r.data[k] !== null) merged[k] = r.data[k];
            }
            setS(merged);
        }).catch(() => {});
    }, []);

    const set = (group, key, val) => setS((p) => ({ ...p, [group]: { ...p[group], [key]: val } }));

    const saveAll = async () => {
        setSaving(true);
        try {
            await Promise.all(
                Object.entries(s).map(([key, value]) => api.put(`/settings/${key}`, { value }))
            );
            toast.success('Settings saved');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Save failed');
        } finally { setSaving(false); }
    };

    return (
        <>
            <PageHead
                title="Site Settings"
                sub="Brand, navbar, contact, about, storefront"
                actions={<button className="btn" onClick={saveAll} disabled={saving}>{saving ? 'Saving…' : 'Save All'}</button>}
            />

            <Section title="Brand">
                <Input label="Brand Name" value={s.brand.name} onChange={(v) => set('brand', 'name', v)} />
                <Input label="Tagline" value={s.brand.tagline} onChange={(v) => set('brand', 'tagline', v)} />
            </Section>

            <Section title="Navbar — Announcement Marquee">
                <ListEditor
                    items={s.announcements}
                    onChange={(arr) => setS((p) => ({ ...p, announcements: arr }))}
                    placeholder="FREE SHIPPING…"
                />
            </Section>

            <Section title="Navbar — Material Categories">
                <ListEditor
                    items={s.materials}
                    onChange={(arr) => setS((p) => ({ ...p, materials: arr }))}
                    placeholder="GOLD"
                />
            </Section>

            <Section title="Contact (Footer)">
                <Input label="Phone" value={s.contact.phone} onChange={(v) => set('contact', 'phone', v)} />
                <Input label="Email" value={s.contact.email} onChange={(v) => set('contact', 'email', v)} />
                <Input label="Address" full value={s.contact.address} onChange={(v) => set('contact', 'address', v)} />
            </Section>

            <Section title="Social Links">
                <Input label="Instagram URL" value={s.social.instagram} onChange={(v) => set('social', 'instagram', v)} />
                <Input label="Facebook URL" value={s.social.facebook} onChange={(v) => set('social', 'facebook', v)} />
            </Section>

            <Section title="About / Spirit of Jewar">
                <Input label="Eyebrow" value={s.about.eyebrow} onChange={(v) => set('about', 'eyebrow', v)} />
                <Input label="Title" value={s.about.title} onChange={(v) => set('about', 'title', v)} />
                <TextArea label="Body" value={s.about.body} onChange={(v) => set('about', 'body', v)} />
                <ImageUpload label="About Image" value={s.about.image} onChange={(v) => set('about', 'image', v)} />
            </Section>

            <Section title="Storefront Banner">
                <Input label="Eyebrow" value={s.storefront.eyebrow} onChange={(v) => set('storefront', 'eyebrow', v)} />
                <Input label="Title" value={s.storefront.title} onChange={(v) => set('storefront', 'title', v)} />
                <Input label="CTA Label" value={s.storefront.cta} onChange={(v) => set('storefront', 'cta', v)} />
                <Input label="CTA Link" value={s.storefront.link} onChange={(v) => set('storefront', 'link', v)} />
                <ImageUpload label="Storefront Image" value={s.storefront.image} onChange={(v) => set('storefront', 'image', v)} />
            </Section>

            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn" onClick={saveAll} disabled={saving}>{saving ? 'Saving…' : 'Save All Settings'}</button>
            </div>
        </>
    );
}

function Section({ title, children }) {
    return (
        <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontWeight: 500, fontSize: 18, marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid var(--line)' }}>{title}</h3>
            <form className="form" onSubmit={(e) => e.preventDefault()}>{children}</form>
        </div>
    );
}

function Input({ label, value, onChange, full }) {
    return (
        <label className={full ? 'full' : ''}>
            {label}
            <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} />
        </label>
    );
}

function TextArea({ label, value, onChange }) {
    return (
        <label className="full">
            {label}
            <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} />
        </label>
    );
}

function ListEditor({ items, onChange, placeholder }) {
    return (
        <div className="full">
            {(items || []).map((it, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input
                        type="text"
                        value={it}
                        placeholder={placeholder}
                        onChange={(e) => {
                            const arr = [...items];
                            arr[i] = e.target.value;
                            onChange(arr);
                        }}
                        style={{ flex: 1, padding: 10, border: '1px solid var(--line)', borderRadius: 4, fontSize: 14 }}
                    />
                    <button type="button" className="btn danger sm" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>×</button>
                </div>
            ))}
            <button type="button" className="btn ghost sm" onClick={() => onChange([...(items || []), ''])}>+ Add</button>
        </div>
    );
}
