import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import toast from 'react-hot-toast';

export default function Login() {
    const { login, user } = useAuth();
    const nav = useNavigate();
    const [email, setEmail] = useState('admin@jewar.com');
    const [password, setPassword] = useState('');
    const [busy, setBusy] = useState(false);

    if (user) {
        nav('/', { replace: true });
        return null;
    }

    const submit = async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
            await login(email, password);
            toast.success('Welcome back');
            nav('/', { replace: true });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="login-wrap">
            <form className="login-card" onSubmit={submit}>
                <h1>jewar</h1>
                <div className="sub">Maison · Admin</div>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button className="btn" disabled={busy}>
                    {busy ? 'Signing in…' : 'Sign In'}
                </button>
            </form>
        </div>
    );
}
