const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/products?category=slug-or-id&featured=1&all=1
router.get('/', async (req, res) => {
    try {
        const { category, featured, q, all } = req.query;
        const filter = {};
        if (!all) filter.published = { $ne: false };
        if (featured === '1' || featured === 'true') filter.featured = true;
        if (category && category !== 'all') {
            // accept either ObjectId or slug
            if (/^[a-f\d]{24}$/i.test(category)) {
                filter.category = category;
            } else {
                const cat = await Category.findOne({ slug: category.toLowerCase() });
                if (!cat) return res.json([]);
                filter.category = cat._id;
            }
        }
        if (q) filter.$text = { $search: q };
        const products = await Product.find(filter)
            .populate('category', 'name slug numeral')
            .sort({ order: 1, createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name slug');
        if (!product) return res.status(404).json({ message: 'Not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', protect, adminOnly, async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) return res.status(404).json({ message: 'Not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
