const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, trim: true, lowercase: true, index: true },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
            index: true,
        },
        material: { type: String, required: true, trim: true },
        description: { type: String, default: '' },
        price: { type: Number, default: 0 },
        image: { type: String, required: true },
        hoverImage: { type: String, default: '' },
        gallery: [{ type: String }],
        tags: [{ type: String }],
        featured: { type: Boolean, default: false, index: true },
        order: { type: Number, default: 0 },
        published: { type: Boolean, default: true, index: true },
        purity: { type: String, default: '' },
        remarks: { type: String, default: '' },
        codingNo: { type: String, default: '', trim: true },
        grossWeight: { type: String, default: '', trim: true },
        netWeight: { type: String, default: '', trim: true },
        otherWeight: { type: String, default: '', trim: true },
    },
    { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', material: 'text', codingNo: 'text', remarks: 'text' });

module.exports = mongoose.model('Product', productSchema);
