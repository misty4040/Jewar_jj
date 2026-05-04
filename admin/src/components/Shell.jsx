import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/auth';

const NAV = [
    { to: '/', label: 'Dashboard', end: true },
    { to: '/hero', label: 'Hero Slides' },
    { to: '/categories', label: 'Categories' },
    { to: '/products', label: 'Products' },
    { to: '/collections', label: 'Collections' },
    { to: '/services', label: 'Services' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/settings', label: 'Site Settings' },
];

export default function Shell() {
    const { user, logout } = useAuth();
    return (
        <div className="shell">
            <aside className="side">
                <div className="brand">jewar</div>
                <div className="est">Admin · Maison</div>
                <nav>
                    {NAV.map((n) => (
                        <NavLink
                            key={n.to}
                            to={n.to}
                            end={n.end}
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            {n.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="footer">
                    <div>{user?.email}</div>
                    <button onClick={logout}>Sign Out</button>
                </div>
            </aside>
            <main className="main">
                <Outlet />
            </main>
        </div>
    );
}
