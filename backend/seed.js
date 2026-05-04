/**
 * Seed the catalogue with the 10 maison chapters mirrored from the frontend
 * fixtures, plus default hero/collections/services/reviews/settings, and an
 * admin user. Idempotent: re-running wipes content collections (not Users).
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Category = require('./models/Category');
const Product = require('./models/Product');
const Collection = require('./models/Collection');
const Service = require('./models/Service');
const HeroSlide = require('./models/HeroSlide');
const Review = require('./models/Review');
const Setting = require('./models/Setting');
const User = require('./models/User');

const U = (id, q = 85, w = 1600) =>
    `https://images.unsplash.com/photo-${id}?q=${q}&w=${w}&auto=format&fit=crop`;

const IMG = {
    ring: '1605100804763-247f67b3557e',
    ringHand: '1619119069152-a2b331eb392a',
    pendant: '1611591437281-460bfbe1220a',
    wrist: '1515562141207-7a18b5ce33c7',
    choker: '1599643478518-a744c5b7f39d',
    earring: '1535632066927-ab7c9ab60908',
    flatlay: '1573408301185-9146fe634ad0',
    chain: '1602173574767-37ac01994b2a',
    setEditorial: '1583292650898-7d22cd27ca6f',
    goldEarring: '1611652022419-a9419f74343d',
    diamondCu: '1612160054818-c30d2ce80a45',
    necklaceLay: '1602170284347-a5cf7e91a0ec',
};

const CATEGORIES = [
    {
        slug: 'rings', name: 'Rings', numeral: 'I', tagline: 'A vow, set in the round.',
        description: 'From the solitaire to the cocktail — every Jewar ring is turned over a single anvil, polished by thumb, and signed at the bench.',
        heroImage: U(IMG.ring), heroPosition: '50% 40%', accent: 'ink', pieces: 24, order: 1,
        stats: [{ n: '22k', l: 'Ingot origin' }, { n: 'I—XX', l: 'Volumes' }, { n: '7d', l: 'At the bench' }],
        products: [
            { name: 'Aria Solitaire', material: '18k Gold · 1.2ct Diamond', image: U(IMG.ring) },
            { name: 'Belle Époque Cluster', material: 'Platinum · Sapphire', image: U(IMG.ringHand) },
            { name: 'Vœu Eternity Band', material: '18k Rose Gold · Pavé', image: U(IMG.diamondCu) },
            { name: 'Heritage Cushion', material: '22k Gold · Emerald', image: U(IMG.ring) },
            { name: 'Le Petit Halo', material: '18k White Gold', image: U(IMG.ringHand) },
            { name: 'Marquise Royale', material: 'Platinum · 0.85ct', image: U(IMG.diamondCu) },
        ],
    },
    {
        slug: 'pendants', name: 'Pendants', numeral: 'II', tagline: 'Worn against the hollow of the throat.',
        description: 'A pendant should rest, not perform. Strung on a hand-woven 18k chain, each piece is sized to the breath.',
        heroImage: U(IMG.pendant), heroPosition: '50% 45%', accent: 'ink', pieces: 18, order: 2,
        stats: [{ n: 'Muzo', l: 'Emerald origin' }, { n: '18k', l: 'Woven chain' }, { n: 'No. 03', l: 'of XII' }],
        products: [
            { name: 'Muzo Drop', material: '18k Gold · 4.2ct Emerald', image: U(IMG.pendant) },
            { name: 'La Lune', material: 'White Gold · Mother of Pearl', image: U(IMG.choker) },
            { name: 'Rosa Solitaire', material: '18k Rose Gold · Diamond', image: U(IMG.pendant) },
            { name: 'Étoile du Soir', material: 'Platinum · Sapphire', image: U(IMG.choker) },
        ],
    },
    {
        slug: 'bangles', name: 'Bangles', numeral: 'III', tagline: 'Forged from a single ingot.',
        description: 'The bangle is the most ancient form. Ours are drawn from one ingot of 22k, hand-forged over fire, and finished with the bench mark.',
        heroImage: U(IMG.wrist), heroPosition: '50% 50%', accent: 'ivory', pieces: 32, order: 3,
        stats: [{ n: '22k', l: 'Solid gold' }, { n: '1', l: 'Ingot per piece' }, { n: 'Hammered', l: 'By hand' }],
        products: [
            { name: 'Anvil Bangle', material: '22k Hammered Gold', image: U(IMG.wrist) },
            { name: 'Maharani Set of Six', material: '22k Gold · Polished', image: U(IMG.flatlay) },
            { name: 'Filigrane Étoilée', material: '18k Gold · Engraved', image: U(IMG.wrist) },
            { name: 'Saraswati Heritage', material: '22k Gold · Repoussé', image: U(IMG.flatlay) },
        ],
    },
    {
        slug: 'bracelets', name: 'Bracelets', numeral: 'IV', tagline: 'Fourteen links, clasped at the pulse.',
        description: 'Each oval is rolled, filed, and turned by thumb. The clasp is hidden within the chain — so the bracelet never truly ends.',
        heroImage: U(IMG.wrist), heroPosition: '50% 60%', accent: 'ink', pieces: 16, order: 4,
        stats: [{ n: 'XIV', l: 'Oval links' }, { n: '22k', l: 'Drawn ingot' }, { n: 'Concealed', l: 'Clasp' }],
        products: [
            { name: 'Quatorze Oval', material: '22k Gold · Hand-drawn', image: U(IMG.wrist) },
            { name: 'Tennis Eternity', material: 'Platinum · 4.0ct Pavé', image: U(IMG.flatlay) },
            { name: 'Cordon Tressé', material: '18k Gold · Woven', image: U(IMG.wrist) },
            { name: 'Charm de Voyage', material: '22k Gold · Set of XII', image: U(IMG.flatlay) },
        ],
    },
    {
        slug: 'kara', name: 'Kara', numeral: 'V', tagline: 'A circle without seam, without end.',
        description: 'The kara is forged closed — there is no clasp, no opening. Slipped over the wrist as a covenant, worn for a lifetime.',
        heroImage: U(IMG.flatlay), heroPosition: '50% 50%', accent: 'ivory', pieces: 12, order: 5,
        stats: [{ n: '22k', l: 'Forged seamless' }, { n: 'Punjab', l: 'Heritage' }, { n: 'Sealed', l: 'No clasp' }],
        products: [
            { name: 'Akhand Kara', material: '22k Gold · Seamless', image: U(IMG.wrist) },
            { name: 'Sikh Heritage', material: '22k Gold · Hammered', image: U(IMG.flatlay) },
            { name: 'Plain Forged Band', material: '22k Gold · Polished', image: U(IMG.wrist) },
            { name: 'Engraved Mool Mantar', material: '22k Gold · Inscribed', image: U(IMG.flatlay) },
        ],
    },
    {
        slug: 'mangalsutra', name: 'Mangalsutra', numeral: 'VI', tagline: 'Black bead and gold, knotted at the breath.',
        description: 'The mangalsutra is sacred geometry — black beads strung against gold, the pendant a private vow worn close to the heart.',
        heroImage: U(IMG.choker), heroPosition: '50% 45%', accent: 'ink', pieces: 14, order: 6,
        stats: [{ n: '108', l: 'Sacred beads' }, { n: '22k', l: 'Gold pendant' }, { n: 'Hand-strung', l: 'Silk core' }],
        products: [
            { name: 'Sutra Classique', material: '22k Gold · Black Onyx', image: U(IMG.choker) },
            { name: 'Vati Heritage', material: '22k Gold · Diamond Vati', image: U(IMG.pendant) },
            { name: 'Nallapusalu Long', material: '22k Gold · Coral', image: U(IMG.choker) },
            { name: 'Royal Bridal', material: '22k Gold · Polki Diamond', image: U(IMG.pendant) },
        ],
    },
    {
        slug: 'necklaces', name: 'Necklaces', numeral: 'VII', tagline: 'A line drawn against the collarbone.',
        description: 'From the slim choker to the bridal collar — necklaces from Jewar are cut, cast, and set against the architecture of the throat.',
        heroImage: U(IMG.choker), heroPosition: '50% 35%', accent: 'ink', pieces: 22, order: 7,
        stats: [{ n: 'XII', l: 'Fittings' }, { n: '4.2', l: 'Carat centre' }, { n: 'Bridal', l: 'Made-to-order' }],
        products: [
            { name: 'Eternal Choker', material: 'Platinum · Emeralds', image: U(IMG.choker) },
            { name: 'Maharani Collar', material: '22k Gold · Polki', image: U(IMG.necklaceLay) },
            { name: 'Riviera de Diamants', material: 'Platinum · 8.4ct Pavé', image: U(IMG.choker) },
            { name: 'Long Sautoir Tassel', material: '18k Gold · Pearls', image: U(IMG.necklaceLay) },
            { name: 'Bib of the Mughal', material: '22k Gold · Ruby & Emerald', image: U(IMG.choker) },
            { name: 'Modern Lariat', material: '18k Rose Gold', image: U(IMG.necklaceLay) },
        ],
    },
    {
        slug: 'earrings', name: 'Earrings', numeral: 'VIII', tagline: 'A whisper of wire, a single pearl.',
        description: 'Earrings frame the face. Akoya pearls from the Ise Bay, capped in matte 18k — the wire is struck, never cast.',
        heroImage: U(IMG.earring), heroPosition: '55% 50%', accent: 'ivory', pieces: 28, order: 8,
        stats: [{ n: 'Ise', l: 'Bay of origin' }, { n: '8mm', l: 'Bead diameter' }, { n: 'II', l: 'Years of nacre' }],
        products: [
            { name: 'Akoya Drop', material: '18k Gold · Pearl', image: U(IMG.earring) },
            { name: 'Jhumka Royale', material: '22k Gold · Hand-engraved', image: U(IMG.goldEarring) },
            { name: 'Stud Solitaire', material: 'Platinum · Diamond', image: U(IMG.earring) },
            { name: 'Chandbali Heritage', material: '22k Gold · Polki', image: U(IMG.goldEarring) },
            { name: 'Hoop de Paris', material: '18k Gold · Polished', image: U(IMG.earring) },
            { name: 'Tassel Lariat Earrings', material: '18k Gold · Pearl', image: U(IMG.goldEarring) },
        ],
    },
    {
        slug: 'pendant-sets', name: 'Pendant Sets', numeral: 'IX', tagline: 'Pendant and earrings, written as one.',
        description: 'A matched suite — pendant, chain, and earrings — composed at the bench so the geometry sings as a single phrase.',
        heroImage: U(IMG.setEditorial), heroPosition: '50% 45%', accent: 'ivory', pieces: 14, order: 9,
        stats: [{ n: '3 pcs', l: 'Suite' }, { n: 'Matched', l: 'At the bench' }, { n: 'Boxed', l: 'In velvet' }],
        products: [
            { name: 'Coffret Étoilé', material: '18k Gold · Sapphire Suite', image: U(IMG.setEditorial) },
            { name: 'Bridal Polki Suite', material: '22k Gold · Polki Diamond', image: U(IMG.necklaceLay) },
            { name: 'Pearl Soirée', material: '18k Gold · Akoya Pearls', image: U(IMG.setEditorial) },
            { name: 'Emerald Maharani', material: '22k Gold · Emerald & Diamond', image: U(IMG.necklaceLay) },
        ],
    },
    {
        slug: 'chains', name: 'Chains', numeral: 'X', tagline: 'A line, drawn in 22 carats.',
        description: 'Chains are the foundation of the wardrobe. Each link is rolled, soldered closed, and tested at fifteen kilograms before it leaves the bench.',
        heroImage: U(IMG.chain), heroPosition: '50% 50%', accent: 'ink', pieces: 20, order: 10,
        stats: [{ n: '15kg', l: 'Pull-tested' }, { n: '22k', l: 'Solid gold' }, { n: 'XII', l: 'Link styles' }],
        products: [
            { name: 'Cuban Heritage', material: '22k Gold · Solid Cuban', image: U(IMG.chain) },
            { name: 'Singapore Twist', material: '22k Gold · Diamond Cut', image: U(IMG.chain) },
            { name: 'Box Chain Classique', material: '18k Gold · Polished', image: U(IMG.chain) },
            { name: 'Belcher Heavyweight', material: '22k Gold · Round Link', image: U(IMG.chain) },
        ],
    },
];

const COLLECTIONS = [
    { title: 'DAINTY DREAMS', subtitle: 'SOFT MOMENTS, BEAUTIFULLY CRAFTED', image: '/assets/collection-dainty.png', link: '#dainty', order: 1 },
    { title: 'RAW REVERIE', subtitle: 'BOLD STATEMENT PIECES', image: '/assets/collection-raw.png', link: '#raw', order: 2 },
    { title: 'CLAY WHISPERS', subtitle: 'ARTISTIC GEOMETRIC FORMS', image: '/assets/collection-clay.png', link: '#clay', order: 3 },
];

const SERVICES = [
    { title: 'OUR BOUTIQUE', description: 'Step into our world of luxury. Experience our collections in person at our flagship locations.', cta: 'VISIT OUR STORE', link: '#stores', image: '/assets/service-boutique.png', order: 1 },
    { title: 'PIERCING STUDIO', description: 'Create your dream ear stack with expert styling and precision piercings in our serene, private studios.', cta: 'BOOK AN APPOINTMENT', link: '#styling', image: '/assets/service-piercing.png', order: 2 },
    { title: 'COMPLIMENTARY CARE', description: 'Lifetime professional cleaning and inspection to keep your Jewar pieces shimmering forever.', cta: 'LEARN MORE', link: '#care', image: '/assets/service-care.png', order: 3 },
];

const HERO_SLIDES = [
    {
        eyebrow: 'Flagship Store Exclusive',
        headline: 'Crafted in Gold, Designed for Generations',
        subheadline: '',
        ctaLabel: 'Explore Collection',
        ctaLink: '/atelier',
        image: '/assets/hero-jewar.jpg',
        trendingTitle: 'Heritage Jhumkas',
        trendingPrice: 'INR 485,000.00',
        trendingImage: '/assets/hero-jewar.jpg',
        order: 1,
    },
];

const REVIEWS = [
    { name: 'Aarav S.', text: 'Exceptional craftsmanship. The heritage collection at Jewar is truly one of a kind.', rating: 5, order: 1 },
    { name: 'Priya M.', text: 'Bought our wedding bands here. The service was impeccable and the quality is stunning.', rating: 5, order: 2 },
    { name: 'Vikram R.', text: 'The custom design process was so smooth. They brought my vision to life perfectly.', rating: 5, order: 3 },
    { name: 'Ananya K.', text: "Jewar has been our family's trusted jeweller for decades. Never fails to impress.", rating: 5, order: 4 },
];

const SETTINGS = [
    { key: 'brand', value: { name: 'jewar', tagline: 'Crafted in Gold' } },
    { key: 'announcements', value: ['FREE SHIPPING FOR ALL ORDERS ABOVE $199', 'TIMELESS GOLD COLLECTION', 'WEARABLE HERITAGE', 'CRAFTED TO LAST', 'TIMELESS JEWELLERY PIECES'] },
    { key: 'materials', value: ['GOLD', 'SILVER', 'PLATINUM', 'DIAMOND', 'GEMSTONES', 'INVESTMENTS'] },
    { key: 'contact', value: { phone: '+91 98765 43210', email: 'concierge@jewar.com', address: 'Hazaribag, Jharkhand' } },
    { key: 'social', value: { instagram: '#', facebook: '#' } },
    {
        key: 'about',
        value: {
            eyebrow: 'Our Legacy',
            title: 'The Spirit of Jewar',
            body: 'Established with a vision to redefine Indian luxury, Jewar stands as a testament to the timeless art of jewellery making. Every piece is a dialogue between heritage and modernity, crafted to tell a story that transcends time.',
            image: '/assets/hero-jewar.jpg',
        },
    },
    {
        key: 'storefront',
        value: { eyebrow: 'Retail Excellence', title: 'VISIT US IN STORE', cta: 'FIND A SHOWROOM', link: '#locations', image: '/assets/storefront-jewar.png' },
    },
];

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('· Connected to', process.env.MONGODB_URI);

        await Promise.all([
            Category.deleteMany({}),
            Product.deleteMany({}),
            Collection.deleteMany({}),
            Service.deleteMany({}),
            HeroSlide.deleteMany({}),
            Review.deleteMany({}),
            Setting.deleteMany({}),
        ]);
        console.log('· Cleared content collections');

        // categories first, then products with refs
        for (const c of CATEGORIES) {
            const { products, ...catBody } = c;
            const cat = await Category.create(catBody);
            const docs = products.map((p, i) => ({
                ...p,
                category: cat._id,
                order: i + 1,
                featured: i === 0 && (cat.slug === 'rings' || cat.slug === 'necklaces'),
            }));
            await Product.insertMany(docs);
            console.log(`  · ${cat.name}: ${docs.length} products`);
        }

        await Collection.insertMany(COLLECTIONS);
        await Service.insertMany(SERVICES);
        await HeroSlide.insertMany(HERO_SLIDES);
        await Review.insertMany(REVIEWS);
        await Setting.insertMany(SETTINGS);

        // Admin user — create only if missing (don't wipe existing creds)
        const email = (process.env.ADMIN_EMAIL || 'admin@jewar.com').toLowerCase();
        const password = process.env.ADMIN_PASSWORD || 'jewar@admin';
        const existing = await User.findOne({ email });
        if (!existing) {
            await User.create({ email, password, role: 'admin', name: 'Admin' });
            console.log(`· Admin created: ${email} / ${password}`);
        } else {
            console.log(`· Admin already exists: ${email}`);
        }

        console.log('✓ Seed complete');
        process.exit(0);
    } catch (err) {
        console.error('✗ Seed failed:', err);
        process.exit(1);
    }
})();
