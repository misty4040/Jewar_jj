import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Shell from './components/Shell.jsx';
import Protected from './components/Protected.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import HeroList from './pages/hero/List.jsx';
import HeroForm from './pages/hero/Form.jsx';
import CategoryList from './pages/categories/List.jsx';
import CategoryForm from './pages/categories/Form.jsx';
import ProductList from './pages/products/List.jsx';
import ProductForm from './pages/products/Form.jsx';
import CollectionList from './pages/collections/List.jsx';
import CollectionForm from './pages/collections/Form.jsx';
import ServiceList from './pages/services/List.jsx';
import ServiceForm from './pages/services/Form.jsx';
import ReviewList from './pages/reviews/List.jsx';
import ReviewForm from './pages/reviews/Form.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <Protected>
                        <Shell />
                    </Protected>
                }
            >
                <Route index element={<Dashboard />} />

                <Route path="hero" element={<HeroList />} />
                <Route path="hero/new" element={<HeroForm />} />
                <Route path="hero/:id" element={<HeroForm />} />

                <Route path="categories" element={<CategoryList />} />
                <Route path="categories/new" element={<CategoryForm />} />
                <Route path="categories/:id" element={<CategoryForm />} />

                <Route path="products" element={<ProductList />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/:id" element={<ProductForm />} />

                <Route path="collections" element={<CollectionList />} />
                <Route path="collections/new" element={<CollectionForm />} />
                <Route path="collections/:id" element={<CollectionForm />} />

                <Route path="services" element={<ServiceList />} />
                <Route path="services/new" element={<ServiceForm />} />
                <Route path="services/:id" element={<ServiceForm />} />

                <Route path="reviews" element={<ReviewList />} />
                <Route path="reviews/new" element={<ReviewForm />} />
                <Route path="reviews/:id" element={<ReviewForm />} />

                <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
