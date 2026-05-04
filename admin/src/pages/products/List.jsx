import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../../components/PageHead';
import { useList } from '../../lib/useResource';

export default function ProductList() {
    const { items, loading, remove } = useList('/products');
    const [q, setQ] = useState('');
    const filtered = useMemo(
        () => items.filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase()) || (p.material || '').toLowerCase().includes(q.toLowerCase())),
        [items, q]
    );
    return (
        <>
            <PageHead
                title="Products"
                sub="The pieces"
                actions={<Link to="/products/new" className="btn">+ New Product</Link>}
            />
            <div className="bar">
                <input className="search" placeholder="Search name or material…" value={q} onChange={(e) => setQ(e.target.value)} />
                <span style={{ color: '#888', fontSize: 13 }}>{filtered.length} of {items.length}</span>
            </div>
            {loading ? (
                <div className="empty">Loading…</div>
            ) : filtered.length === 0 ? (
                <div className="empty">
                    <div className="big">No products</div>
                    <div>Add your first piece to begin.</div>
                </div>
            ) : (
                <table className="list">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Material</th>
                            <th>Price</th>
                            <th>Featured</th>
                            <th>Order</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((p) => (
                            <tr key={p._id}>
                                <td>{p.image ? <img src={p.image} className="thumb" alt="" /> : <div className="thumb" />}</td>
                                <td><strong>{p.name}</strong></td>
                                <td>{p.category?.name || '—'}</td>
                                <td style={{ color: '#666' }}>{p.material}</td>
                                <td>{p.price ? `₹${p.price.toLocaleString()}` : '—'}</td>
                                <td>{p.featured ? <span className="pill ok">★</span> : '—'}</td>
                                <td>{p.order}</td>
                                <td>
                                    <span className={`pill ${p.published ? 'ok' : 'off'}`}>{p.published ? 'Live' : 'Hidden'}</span>
                                </td>
                                <td>
                                    <div className="row-actions">
                                        <Link to={`/products/${p._id}`} className="btn ghost sm">Edit</Link>
                                        <button onClick={() => remove(p._id)} className="btn danger sm">Delete</button>
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
