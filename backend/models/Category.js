const mongoose = require('mongoose');

const statSchema = new mongoose.Schema(
    {
        n: { type: String, required: true },
        l: { type: String, required: true },
    },
    { _id: false }
);

const categorySchema = mongoose.Schema(
    {
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        name: { type: String, required: true, trim: true },
        numeral: { type: String, default: '' },
        tagline: { type: String, default: '' },
        description: { type: String, default: '' },
        heroImage: { type: String, default: '' },
        heroPosition: { type: String, default: '50% 50%' },
        accent: { type: String, enum: ['ink', 'ivory'], default: 'ink' },
        pieces: { type: Number, default: 0 },
        stats: [statSchema],
        order: { type: Number, default: 0 },
        published: { type: Boolean, default: true, index: true },
        bannerImage: { type: String, default: '' },
        bannerPreHeading: { type: String, default: 'The Maison Says' },
        bannerHeading: { type: String, default: 'Make a style statement,\\none' },
        bannerHighlight: { type: String, default: '' },
        bannerPostHeading: { type: String, default: 'at a time.' },
        bannerText: { type: String, default: 'Hand-finished at the Hazaribag bench. By appointment, by hand.' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
