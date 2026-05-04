const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'jewar',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'],
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|avif/;
    const ok = allowed.test(file.mimetype.split('/')[1]);
    if (ok) return cb(null, true);
    cb(new Error('Only image files are allowed'));
};

module.exports = {
    upload: multer({ storage, fileFilter, limits: { fileSize: 8 * 1024 * 1024 } }),
    cloudinary,
};
