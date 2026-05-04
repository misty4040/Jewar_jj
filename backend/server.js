const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const heroRoutes = require('./routes/heroRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const settingRoutes = require('./routes/settingRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// Static — uploaded images served at /uploads/<filename>
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (_, res) => res.json({ ok: true, ts: Date.now() }));

app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/settings', settingRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: `Not found: ${req.originalUrl}` }));

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;
