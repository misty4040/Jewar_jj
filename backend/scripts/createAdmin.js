const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const email = (process.env.ADMIN_EMAIL || 'admin@jewar.com').toLowerCase();
        const password = process.env.ADMIN_PASSWORD || 'jewar@admin';
        const existing = await User.findOne({ email });
        if (existing) {
            existing.password = password;
            await existing.save();
            console.log(`✓ Admin password reset for ${email}`);
        } else {
            await User.create({ email, password, name: 'Admin', role: 'admin' });
            console.log(`✓ Admin user created: ${email} / ${password}`);
        }
        process.exit(0);
    } catch (err) {
        console.error('Failed:', err.message);
        process.exit(1);
    }
})();
