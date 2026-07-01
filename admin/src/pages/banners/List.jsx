import React from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../lib/api';
import { useList } from '../../lib/useResource';
import PageHead from '../../components/PageHead';

export default function BannerList() {
    const { items, loading } = useList('/categories?all=1');

    if (loading) return <div className="empty">Loading…</div>;

    return (
        <>
            <PageHead
                title="Category Banners"
                sub="Manage maison banners across categories"
            />
            {items.length === 0 ? (
                <div className="empty"><div className="big">No categories found</div></div>
            ) : (
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: 80 }}>Image</th>
                                <th style={{ width: 200 }}>Category</th>
                                <th style={{ width: 120 }}>Status</th>
                                <th>Banner Preview</th>
                                <th style={{ width: 100 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((c) => {
                                const hasBanner = c.bannerHeading || c.bannerImage;
                                const imgStr = c.bannerImage || c.heroImage;
                                return (
                                <tr key={c._id}>
                                    <td>
                                        {imgStr ? (
                                            <div style={{ width: 60, height: 40, borderRadius: 4, overflow: 'hidden', background: '#f5f5f5' }}>
                                                <img src={apiUrl(imgStr)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ) : (
                                            <div style={{ width: 60, height: 40, borderRadius: 4, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#aaa' }}>None</div>
                                        )}
                                    </td>
                                    <td>
                                        <strong>{c.name}</strong>
                                    </td>
                                    <td>
                                        {hasBanner ? (
                                            <span style={{ display: 'inline-block', padding: '4px 10px', background: '#e6f4ea', color: '#137333', borderRadius: 12, fontSize: 11, fontWeight: 'bold' }}>Active</span>
                                        ) : (
                                            <span style={{ display: 'inline-block', padding: '4px 10px', background: '#f1f3f4', color: '#5f6368', borderRadius: 12, fontSize: 11, fontWeight: 'bold' }}>Default</span>
                                        )}
                                    </td>
                                    <td>
                                        <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                {c.bannerPreHeading || 'The Maison Says'}
                                            </div>
                                            <div style={{ fontSize: 14, fontWeight: 500, color: '#111', lineHeight: 1.3 }}>
                                                {c.bannerHeading ? c.bannerHeading.replace('\\n', ' ') : 'Make a style statement, one '} 
                                                <span style={{ color: 'var(--gold-deep)' }}>{c.bannerHighlight || c.name.toUpperCase()}</span> 
                                                {' '}{c.bannerPostHeading || 'at a time.'}
                                            </div>
                                            <div style={{ fontSize: 11, color: '#666', fontStyle: 'italic' }}>
                                                {c.bannerText || 'Hand-finished at the Hazaribag bench. By appointment, by hand.'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="actions">
                                        <Link to={`/banners/${c._id}`} className="btn ghost sm">Edit</Link>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
