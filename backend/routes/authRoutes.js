const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { generateToken } = require('../utils/token');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const ok = await user.matchPassword(password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
    res.json(req.user);
});

module.exports = router;
