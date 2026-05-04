import React from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../../components/PageHead';
import { useList } from '../../lib/useResource';

export default function ServiceList() {
    const { items, loading, remove } = useList('/services');
    return (
        <>
            <PageHead title="Stores & Services" sub="Boutique offerings" actions={<Link to="/services/new" className="btn">+ New Service</Link>} />
            {loading ? <div className="empty">Loading…</div> : items.length === 0 ? (
                <div className="empty"><div className="big">No services</div></div>
            ) : (
                <table className="list">
                    <thead><tr><th></th><th>Title</th><th>CTA</th><th>Order</th><th>Status</th><th></th></tr></thead>
                    <tbody>
                        {items.map((s) => (
                            <tr key={s._id}>
                                <td>{s.image ? <img src={s.image} className="thumb" alt="" /> : <div className="thumb" />}</td>
                                <td><strong>{s.title}</strong><div style={{ color: '#888', fontSize: 12 }}>{s.description?.slice(0, 80)}…</div></td>
                                <td>{s.cta}</td>
                                <td>{s.order}</td>
                                <td><span className={`pill ${s.published ? 'ok' : 'off'}`}>{s.published ? 'Live' : 'Hidden'}</span></td>
                                <td>
                                    <div className="row-actions">
                                        <Link to={`/services/${s._id}`} className="btn ghost sm">Edit</Link>
                                        <button onClick={() => remove(s._id)} className="btn danger sm">Delete</button>
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
