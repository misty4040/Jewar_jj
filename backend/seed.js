const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const jewelleryData = [
    {
        name: "Lotus Petal Ring",
        category: "Rings",
        material: "22K Gold",
        description: "Intricately handcrafted petals in solid gold, symbolizing purity and grace.",
        image: "/assets/ring1.jpg"
    },
    {
        name: "Celestial Diamond Band",
        category: "Rings",
        material: "18K White Gold",
        description: "A constellation of ethically sourced diamonds set in a sleek white gold band.",
        image: "/assets/ring2.jpg"
    },
    {
        name: "Majestic Peackock Choker",
        category: "Necklaces",
        material: "22K Gold & Meenakari",
        description: "Traditional artistry meets modern silhouette in this vibrant gold choker.",
        image: "/assets/neck1.jpg"
    },
    {
        name: "Midnight Pearl String",
        category: "Necklaces",
        material: "Tahitian Pearls",
        description: "Lustrous black pearls selected for their rare iridescence and symmetry.",
        image: "/assets/neck2.jpg"
    },
    {
        name: "Jasmine Blossom Studs",
        category: "Earrings",
        material: "22K Gold",
        description: "Finely detailed floral studs that bring a touch of nature to your look.",
        image: "/assets/ear1.jpg"
    },
    {
        name: "Art Deco Chandeliers",
        category: "Earrings",
        material: "White Gold & Onyx",
        description: "Bold geometric patterns inspired by the glamour of the 1920s.",
        image: "/assets/ear2.jpg"
    },
    {
        name: "Royal Heritage Kadas",
        category: "Bangles",
        material: "22K Gold",
        description: "Antique finish bangles featuring traditional craftsmanship.",
        image: "/assets/bang1.jpg"
    },
    {
        name: "Modern Silk Bangle",
        category: "Bangles",
        material: "Matt Finish Gold",
        description: "A contemporary take on the classic bangle with a unique silk-like texture.",
        image: "/assets/bang2.jpg"
    },
    {
        name: "Eternal Knot Bracelet",
        category: "Bracelets",
        material: "Rose Gold",
        description: "An infinite loop design representing everlasting bonds.",
        image: "/assets/brac1.jpg"
    },
    {
        name: "Sol Moon Pendant",
        category: "Pendants",
        material: "22K Gold",
        description: "A celestial double-sided pendant depicting the sun and moon.",
        image: "/assets/pend1.jpg"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Product.deleteMany({});
        await Product.insertMany(jewelleryData);
        console.log('Database Seeded Successfully with Jewar branding');
        process.exit();
    } catch (error) {
        console.error('Error Seeding Database:', error);
        process.exit(1);
    }
};

seedDB();
