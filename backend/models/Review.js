const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        text: { type: String, required: true },
        rating: { type: Number, default: 5, min: 1, max: 5 },
        order: { type: Number, default: 0 },
        published: { type: Boolean, default: true, index: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
