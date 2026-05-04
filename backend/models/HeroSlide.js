const mongoose = require('mongoose');

const heroSlideSchema = mongoose.Schema(
    {
        eyebrow: { type: String, default: '' },
        headline: { type: String, required: true },
        subheadline: { type: String, default: '' },
        ctaLabel: { type: String, default: 'Explore Collection' },
        ctaLink: { type: String, default: '/atelier' },
        image: { type: String, required: true },
        trendingTitle: { type: String, default: '' },
        trendingPrice: { type: String, default: '' },
        trendingImage: { type: String, default: '' },
        order: { type: Number, default: 0 },
        published: { type: Boolean, default: true, index: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('HeroSlide', heroSlideSchema);
