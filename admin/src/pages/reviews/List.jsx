import React from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../../components/PageHead';
import { useList } from '../../lib/useResource';

export default function ReviewList() {
    const { items, loading, remove } = useList('/reviews');
    return (
        <>
            <PageHead title="Reviews" sub="Footer testimonials" actions={<Link to="/reviews/new" className="btn">+ New Review</Link>} />
            {loading ? <div className="empty">Loading…</div> : items.length === 0 ? (
                <div className="empty"><div className="big">No reviews yet</div></div>
            ) : (
                <table className="list">
                    <thead><tr><th>Name</th><th>Rating</th><th>Text</th><th>Order</th><th>Status</th><th></th></tr></thead>
                    <tbody>
                        {items.map((r) => (
                            <tr key={r._id}>
                                <td><strong>{r.name}</strong></td>
                                <td>{'★'.repeat(r.rating)}</td>
                                <td style={{ color: '#666', maxWidth: 480 }}>{r.text}</td>
                                <td>{r.order}</td>
                                <td><span className={`pill ${r.published ? 'ok' : 'off'}`}>{r.published ? 'Live' : 'Hidden'}</span></td>
                                <td>
                                    <div className="row-actions">
                                        <Link to={`/reviews/${r._id}`} className="btn ghost sm">Edit</Link>
                                        <button onClick={() => remove(r._id)} className="btn danger sm">Delete</button>
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
