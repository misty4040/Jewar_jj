import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../../components/PageHead';
import { useList } from '../../lib/useResource';
import * as XLSX from 'xlsx';
import api from '../../lib/api';
import toast from 'react-hot-toast';

export default function ProductList() {
    const { items, loading, remove, refresh, meta, params, setParams } = useList('/products', { page: 1, limit: 20 });
    const [q, setQ] = useState('');
    const [importing, setImporting] = useState(false);
    const fileInputRef = useRef(null);

    React.useEffect(() => {
        const t = setTimeout(() => {
            setParams(p => ({ ...p, q, page: 1 }));
        }, 300);
        return () => clearTimeout(t);
    }, [q, setParams]);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImporting(true);
        const loadingToast = toast.loading('Importing products...');

        try {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);

            if (json.length === 0) {
                toast.error('The file is empty or invalid.');
                return;
            }

            const res = await api.post('/products/bulk', { products: json });
            toast.success(res.data.message || 'Imported successfully');
            if (refresh) refresh();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || err.message || 'Failed to import products');
        } finally {
            setImporting(false);
            toast.dismiss(loadingToast);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".csv, .xlsx, .xls" onChange={handleFileChange} />
            <PageHead
                title="Products"
                sub="The pieces"
                actions={
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <a href="/product_import_template.csv" download className="btn ghost sm" style={{ color: '#888' }}>
                            Download Template
                        </a>
                        <button onClick={handleImportClick} className="btn ghost" disabled={importing}>Import Products</button>
                        <Link to="/products/new" className="btn">+ New Product</Link>
                    </div>
                }
            />
            <div className="bar">
                <input className="search" placeholder="Search name or material…" value={q} onChange={(e) => setQ(e.target.value)} />
                <span style={{ color: '#888', fontSize: 13 }}>Total: {meta?.total || items.length}</span>
            </div>
            {loading && items.length === 0 ? (
                <div className="empty">Loading…</div>
            ) : items.length === 0 ? (
                <div className="empty">
                    <div className="big">No products</div>
                    <div>Add your first piece to begin.</div>
                </div>
            ) : (
                <>
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
                            {items.map((p) => (
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
                    
                    {meta && meta.pages > 1 && (
                        <div style={{ display: 'flex', gap: '16px', marginTop: '24px', justifyContent: 'center', alignItems: 'center' }}>
                            <button 
                                className="btn ghost sm" 
                                disabled={meta.page <= 1} 
                                onClick={() => setParams(p => ({ ...p, page: p.page - 1 }))}
                            >
                                Prev
                            </button>
                            <span style={{ fontSize: 13, color: '#888' }}>Page {meta.page} of {meta.pages}</span>
                            <button 
                                className="btn ghost sm" 
                                disabled={meta.page >= meta.pages} 
                                onClick={() => setParams(p => ({ ...p, page: p.page + 1 }))}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
