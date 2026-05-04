const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, default: '' },
        cta: { type: String, default: 'LEARN MORE' },
        link: { type: String, default: '#' },
        image: { type: String, required: true },
        order: { type: Number, default: 0 },
        published: { type: Boolean, default: true, index: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
