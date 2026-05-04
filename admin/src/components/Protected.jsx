import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function Protected({ children }) {
    const { user, ready } = useAuth();
    if (!ready) return <div style={{ padding: 40 }}>Loading…</div>;
    if (!user) return <Navigate to="/login" replace />;
    return children;
}
