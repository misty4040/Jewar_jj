const express = require('express');
const { upload, cloudinary } = require('../middleware/upload');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// POST /api/uploads — single image, returns Cloudinary CDN url
router.post('/', protect, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.status(201).json({
        url: req.file.path,
        public_id: req.file.filename,
        size: req.file.size,
    });
});

// POST /api/uploads/multi — multiple images
router.post('/multi', protect, upload.array('images', 12), (req, res) => {
    if (!req.files || !req.files.length) return res.status(400).json({ message: 'No files uploaded' });
    const files = req.files.map((f) => ({ url: f.path, public_id: f.filename }));
    res.status(201).json({ files });
});

// DELETE /api/uploads/:public_id — remove from Cloudinary
// public_id may contain slashes (e.g. jewar/abc123) — pass it as query param
// DELETE /api/uploads?public_id=jewar/abc123
router.delete('/', protect, adminOnly, async (req, res) => {
    const { public_id } = req.query;
    if (!public_id) return res.status(400).json({ message: 'public_id required' });
    try {
        await cloudinary.uploader.destroy(public_id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
