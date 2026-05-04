const express = require('express');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { buildCrudRouter } = require('../utils/crud');

const crud = buildCrudRouter(Category, { defaultSort: { order: 1, createdAt: 1 } });

const router = express.Router();

// GET /api/categories/slug/:slug — fetch category + its products
router.get('/slug/:slug', async (req, res) => {
    try {
        const cat = await Category.findOne({ slug: req.params.slug.toLowerCase() });
        if (!cat) return res.status(404).json({ message: 'Category not found' });
        const products = await Product.find({
            category: cat._id,
            published: { $ne: false },
        }).sort({ order: 1, createdAt: -1 });
        res.json({ ...cat.toObject(), products });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.use('/', crud);

module.exports = router;
