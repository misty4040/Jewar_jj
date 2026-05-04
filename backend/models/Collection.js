const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        subtitle: { type: String, default: '' },
        slug: { type: String, lowercase: true, trim: true },
        image: { type: String, required: true },
        link: { type: String, default: '' },
        order: { type: Number, default: 0 },
        published: { type: Boolean, default: true, index: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Collection', collectionSchema);
