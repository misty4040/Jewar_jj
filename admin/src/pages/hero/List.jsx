import React from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../../components/PageHead';
import { useList } from '../../lib/useResource';

export default function HeroList() {
    const { items, loading, remove } = useList('/hero');
    return (
        <>
            <PageHead title="Hero Slides" sub="Homepage banner" actions={<Link to="/hero/new" className="btn">+ New Slide</Link>} />
            {loading ? <div className="empty">Loading…</div> : items.length === 0 ? (
                <div className="empty"><div className="big">No hero slides</div><div>Create one to power the homepage hero.</div></div>
            ) : (
                <table className="list">
                    <thead><tr><th></th><th>Headline</th><th>Eyebrow</th><th>Order</th><th>Status</th><th></th></tr></thead>
                    <tbody>
                        {items.map((h) => (
                            <tr key={h._id}>
                                <td>{h.image ? <img src={h.image} className="thumb" alt="" /> : <div className="thumb" />}</td>
                                <td><strong>{h.headline}</strong><div style={{ color: '#888', fontSize: 12 }}>{h.subheadline}</div></td>
                                <td style={{ color: '#666' }}>{h.eyebrow}</td>
                                <td>{h.order}</td>
                                <td><span className={`pill ${h.published ? 'ok' : 'off'}`}>{h.published ? 'Live' : 'Hidden'}</span></td>
                                <td>
                                    <div className="row-actions">
                                        <Link to={`/hero/${h._id}`} className="btn ghost sm">Edit</Link>
                                        <button onClick={() => remove(h._id)} className="btn danger sm">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}
