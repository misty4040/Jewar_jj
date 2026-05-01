import React, { lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import CategoriesLanding from './pages/Categories/Landing';
import CategoryDetail from './pages/Categories/Detail';

const Atelier = lazy(() => import('./pages/Atelier/index.jsx'));

function AtelierRoute() {
    const navigate = useNavigate();
    return <Atelier onExit={() => navigate('/#catalogue')} />;
}

const App = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route
            path="/atelier"
            element={
                <Suspense fallback={<div style={{ background: '#F7F2EA', minHeight: '100vh' }} />}>
                    <AtelierRoute />
                </Suspense>
            }
        />
        <Route path="/categories" element={<CategoriesLanding />} />
        <Route path="/categories/:slug" element={<CategoryDetail />} />
        <Route path="*" element={<Home />} />
    </Routes>
);

export default App;
