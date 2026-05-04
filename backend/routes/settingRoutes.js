const express = require('express');
const Setting = require('../models/Setting');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/settings — all settings as a map
router.get('/', async (req, res) => {
    try {
        const docs = await Setting.find();
        const map = {};
        docs.forEach((d) => (map[d.key] = d.value));
        res.json(map);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/settings/:key
router.get('/:key', async (req, res) => {
    try {
        const doc = await Setting.findOne({ key: req.params.key });
        if (!doc) return res.json({ key: req.params.key, value: null });
        res.json(doc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/settings/:key — upsert
router.put('/:key', protect, adminOnly, async (req, res) => {
    try {
        const doc = await Setting.findOneAndUpdate(
            { key: req.params.key },
            { key: req.params.key, value: req.body.value },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.json(doc);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/settings/:key
router.delete('/:key', protect, adminOnly, async (req, res) => {
    try {
        await Setting.findOneAndDelete({ key: req.params.key });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
