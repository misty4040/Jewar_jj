import React, { createContext, useContext, useEffect, useState } from 'react';
import api from './api';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem('jewar_admin_user');
        return raw ? JSON.parse(raw) : null;
    });
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jewar_admin_token');
        if (token && !user) {
            api.get('/auth/me')
                .then((r) => {
                    setUser(r.data);
                    localStorage.setItem('jewar_admin_user', JSON.stringify(r.data));
                })
                .catch(() => {})
                .finally(() => setReady(true));
        } else {
            setReady(true);
        }
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('jewar_admin_token', data.token);
        const u = { _id: data._id, email: data.email, name: data.name, role: data.role };
        localStorage.setItem('jewar_admin_user', JSON.stringify(u));
        setUser(u);
        return u;
    };

    const logout = () => {
        localStorage.removeItem('jewar_admin_token');
        localStorage.removeItem('jewar_admin_user');
        setUser(null);
    };

    return <AuthCtx.Provider value={{ user, login, logout, ready }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
