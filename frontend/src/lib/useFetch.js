import { useEffect, useState } from 'react';
import api from './api';

export function useFetch(path, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!path) return;
        let alive = true;
        setLoading(true);
        api.get(path)
            .then((res) => {
                if (!alive) return;
                setData(res.data);
                setError(null);
            })
            .catch((err) => {
                if (!alive) return;
                setError(err);
            })
            .finally(() => {
                if (alive) setLoading(false);
            });
        return () => {
            alive = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { data, loading, error };
}
