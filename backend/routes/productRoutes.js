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
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const skip = (page - 1) * limit;
        
        if (q) filter.$text = { $search: q };
        
        const total = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .populate('category', 'name slug numeral')
            .sort({ order: 1, createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        res.json({
            data: products,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
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

router.post('/bulk', protect, adminOnly, async (req, res) => {
    try {
        const { products } = req.body;
        if (!Array.isArray(products)) {
            return res.status(400).json({ message: 'Products array is required' });
        }

        const formattedProducts = [];

        for (const item of products) {
            if (!item.name) continue;

            let categoryId = null;
            if (item.category) {
                const catName = String(item.category).trim();
                const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                
                let cat = await Category.findOne({ slug });
                if (!cat) {
                    cat = await Category.create({ name: catName, slug, published: true });
                }
                categoryId = cat._id;
            } else {
                let cat = await Category.findOne({ slug: 'uncategorized' });
                if (!cat) {
                    cat = await Category.create({ name: 'Uncategorized', slug: 'uncategorized', published: true });
                }
                categoryId = cat._id;
            }

            formattedProducts.push({
                name: String(item.name).trim(),
                slug: String(item.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4), // append random digits to avoid duplicate slugs in bulk
                category: categoryId,
                price: parseFloat(item.price) || 0,
                description: item.description || '',
                netWeight: String(item.netWeight || item['net weight'] || item['Net Weight'] || ''),
                grossWeight: String(item.grossWeight || item['gross weight'] || item['Gross Weight'] || ''),
                otherWeight: String(item.otherWeight || item['other weight'] || item['Other Weight'] || item['AD/DIA'] || ''),
                material: String(item.material || item.Metal || item.metal || 'Unknown'),
                purity: String(item.Purity || item.purity || ''),
                remarks: String(item.Remarks || item.remarks || ''),
                codingNo: String(item['Coding No'] || item.codingNo || item.CodingNo || ''),
                image: 'https://placehold.co/600x800/FFFFFF/000000?text=No+Image',
                published: true
            });
        }

        if (formattedProducts.length > 0) {
            await Product.insertMany(formattedProducts);
        }

        res.status(201).json({ message: `Imported ${formattedProducts.length} products successfully.` });
    } catch (err) {
        res.status(400).json({ message: err.message });
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
