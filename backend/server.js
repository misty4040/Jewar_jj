const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const Product = require('./models/Product');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/products', async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category && category !== 'all') {
            query.category = category;
        }
        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Seed Initial Data (Only if needed)
app.post('/api/products/seed', async (req, res) => {
    try {
        // You would typically move this to a separate script
        const jewelleryData = [
            {
                name: "Lotus Petal Ring",
                category: "Rings",
                material: "22K Gold",
                description: "Intricately handcrafted petals in solid gold, symbolizing purity and grace.",
                image: "./assets/ring1.jpg" // Note: This will need to be accessible to the frontend
            },
            // ... more items
        ];
        
        await Product.deleteMany({});
        const seededProducts = await Product.insertMany(jewelleryData);
        res.json(seededProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
