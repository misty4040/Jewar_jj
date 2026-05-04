const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
    { label: String, url: String },
    { _id: false }
);

const settingSchema = mongoose.Schema(
    {
        key: { type: String, required: true, unique: true, index: true },
        // generic store; consumers cast as needed
        value: { type: mongoose.Schema.Types.Mixed },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);
