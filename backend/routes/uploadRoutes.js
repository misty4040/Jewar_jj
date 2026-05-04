const express = require('express');
const path = require('path');
const fs = require('fs');
const upload = require('../middleware/upload');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// POST /api/uploads — single image upload, returns public url
router.post('/', protect, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const url = `/uploads/${req.file.filename}`;
    res.status(201).json({ url, filename: req.file.filename, size: req.file.size });
});

// POST /api/uploads/multi — multiple images
router.post('/multi', protect, upload.array('images', 12), (req, res) => {
    if (!req.files || !req.files.length) return res.status(400).json({ message: 'No files uploaded' });
    const urls = req.files.map((f) => ({ url: `/uploads/${f.filename}`, filename: f.filename }));
    res.status(201).json({ files: urls });
});

// DELETE /api/uploads/:filename — remove image from disk
router.delete('/:filename', protect, adminOnly, (req, res) => {
    const file = path.join(__dirname, '..', 'uploads', req.params.filename);
    if (!fs.existsSync(file)) return res.status(404).json({ message: 'File not found' });
    fs.unlinkSync(file);
    res.json({ message: 'Deleted' });
});

module.exports = router;
