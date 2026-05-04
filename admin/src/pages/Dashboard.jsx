import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import PageHead from '../components/PageHead';

const RES = [
    { label: 'Hero Slides', path: '/hero', key: 'hero' },
    { label: 'Categories', path: '/categories', key: 'categories' },
    { label: 'Products', path: '/products', key: 'products' },
    { label: 'Collections', path: '/collections', key: 'collections' },
    { label: 'Services', path: '/services', key: 'services' },
    { label: 'Reviews', path: '/reviews', key: 'reviews' },
];

export default function Dashboard() {
    const [counts, setCounts] = useState({});

    useEffect(() => {
        Promise.all(
            RES.map((r) =>
                api
                    .get(`${r.path}?all=1`)
                    .then((res) => [r.key, Array.isArray(res.data) ? res.data.length : 0])
                    .catch(() => [r.key, 0])
            )
        ).then((pairs) => setCounts(Object.fromEntries(pairs)));
    }, []);

    return (
        <>
            <PageHead title="The Maison · At a Glance" sub="Welcome" />
            <div className="tiles">
                {RES.map((r) => (
                    <div key={r.key} className="tile">
                        <div className="label">{r.label}</div>
                        <div className="value">{counts[r.key] ?? '—'}</div>
                        <div className="delta">
                            <Link to={r.path}>Manage →</Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
