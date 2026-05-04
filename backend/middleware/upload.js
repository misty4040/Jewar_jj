const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const safe = path
            .basename(file.originalname, ext)
            .replace(/[^a-z0-9-_]/gi, '-')
            .toLowerCase()
            .slice(0, 40);
        const stamp = Date.now() + '-' + Math.round(Math.random() * 1e6);
        cb(null, `${safe || 'image'}-${stamp}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|svg|avif/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) &&
        allowed.test(file.mimetype);
    if (ok) return cb(null, true);
    cb(new Error('Only image files are allowed'));
};

module.exports = multer({
    storage,
    fileFilter,
    limits: { fileSize: 8 * 1024 * 1024 },
});
