import React from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../../components/PageHead';
import { useList } from '../../lib/useResource';

export default function CollectionList() {
    const { items, loading, remove } = useList('/collections');
    return (
        <>
            <PageHead
                title="Collections"
                sub="Discovery gallery"
                actions={<Link to="/collections/new" className="btn">+ New Collection</Link>}
            />
            {loading ? <div className="empty">Loading…</div> : items.length === 0 ? (
                <div className="empty"><div className="big">No collections</div></div>
            ) : (
                <table className="list">
                    <thead><tr><th></th><th>Title</th><th>Subtitle</th><th>Order</th><th>Status</th><th></th></tr></thead>
                    <tbody>
                        {items.map((c) => (
                            <tr key={c._id}>
                                <td>{c.image ? <img src={c.image} className="thumb" alt="" /> : <div className="thumb" />}</td>
                                <td><strong>{c.title}</strong></td>
                                <td style={{ color: '#666' }}>{c.subtitle}</td>
                                <td>{c.order}</td>
                                <td><span className={`pill ${c.published ? 'ok' : 'off'}`}>{c.published ? 'Live' : 'Hidden'}</span></td>
                                <td>
                                    <div className="row-actions">
                                        <Link to={`/collections/${c._id}`} className="btn ghost sm">Edit</Link>
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
