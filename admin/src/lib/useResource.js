import { useEffect, useState, useCallback } from 'react';
import api from './api';
import toast from 'react-hot-toast';

export function useList(path) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`${path}?all=1`);
            setItems(Array.isArray(data) ? data : []);
        } catch (e) {
            toast.error(e.response?.data?.message || 'Failed to load');
        } finally {
            setLoading(false);
        }
    }, [path]);

    useEffect(() => { refresh(); }, [refresh]);

    const remove = async (id) => {
        if (!confirm('Delete this item? This cannot be undone.')) return;
        try {
            await api.delete(`${path}/${id}`);
            toast.success('Deleted');
            refresh();
        } catch (e) {
            toast.error(e.response?.data?.message || 'Delete failed');
        }
    };

    return { items, loading, refresh, remove };
}

export function useOne(path, id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(Boolean(id));

    useEffect(() => {
        if (!id) { setLoading(false); return; }
        api.get(`${path}/${id}`)
            .then((r) => setData(r.data))
            .catch((e) => toast.error(e.response?.data?.message || 'Failed to load'))
            .finally(() => setLoading(false));
    }, [path, id]);

    return { data, setData, loading };
}

export async function saveOne(path, id, body) {
    if (id) {
        const { data } = await api.put(`${path}/${id}`, body);
        return data;
    }
    const { data } = await api.post(path, body);
    return data;
}
