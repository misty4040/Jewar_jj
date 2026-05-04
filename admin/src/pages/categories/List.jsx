import React from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../../components/PageHead';
import { useList } from '../../lib/useResource';

export default function CategoryList() {
    const { items, loading, remove } = useList('/categories');
    return (
        <>
            <PageHead
                title="Categories"
                sub="Ten chapters of the Maison"
                actions={<Link to="/categories/new" className="btn">+ New Category</Link>}
            />
            {loading ? (
                <div className="empty">Loading…</div>
            ) : items.length === 0 ? (
                <div className="empty">
                    <div className="big">No categories yet</div>
                    <div>Create your first category to begin.</div>
                </div>
            ) : (
                <table className="list">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Numeral</th>
                            <th>Pieces</th>
                            <th>Order</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((c) => (
                            <tr key={c._id}>
                                <td>{c.heroImage ? <img src={c.heroImage} className="thumb" alt="" /> : <div className="thumb" />}</td>
                                <td><strong>{c.name}</strong><div style={{ color: '#888', fontSize: 12 }}>{c.tagline}</div></td>
                                <td><code>{c.slug}</code></td>
                                <td>{c.numeral || '—'}</td>
                                <td>{c.pieces}</td>
                                <td>{c.order}</td>
                                <td>
                                    <span className={`pill ${c.published ? 'ok' : 'off'}`}>
                                        {c.published ? 'Live' : 'Hidden'}
                                    </span>
                                </td>
                                <td>
                                    <div className="row-actions">
                                        <Link to={`/categories/${c._id}`} className="btn ghost sm">Edit</Link>
                                        <button onClick={() => remove(c._id)} className="btn danger sm">Delete</button>
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
