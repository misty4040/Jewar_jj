// Single source of truth for the 10 jewellery categories the Maison
// presents. Each entry powers both the home-page mosaic and the
// per-category detail page.

const U = (id, q = 85, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=${q}&w=${w}&auto=format&fit=crop`;

// Reliable Unsplash IDs — used in mixed combinations across categories
// so even if a few 404, the page still feels populated.
const IMG = {
  ring:        '1605100804763-247f67b3557e',
  ringHand:    '1619119069152-a2b331eb392a',
  pendant:     '1611591437281-460bfbe1220a',
  wrist:       '1515562141207-7a18b5ce33c7',
  choker:      '1599643478518-a744c5b7f39d',
  earring:     '1535632066927-ab7c9ab60908',
  flatlay:     '1573408301185-9146fe634ad0',
  chain:       '1602173574767-37ac01994b2a',
  setEditorial:'1583292650898-7d22cd27ca6f',
  goldEarring: '1611652022419-a9419f74343d',
  diamondCu:   '1612160054818-c30d2ce80a45',
  necklaceLay: '1602170284347-a5cf7e91a0ec',
};

export const CATEGORIES = [
  {
    slug: 'rings',
    name: 'Rings',
    numeral: 'I',
    tagline: 'A vow, set in the round.',
    description:
      'From the solitaire to the cocktail — every Jewar ring is turned over a single anvil, polished by thumb, and signed at the bench.',
    hero: { src: U(IMG.ring), position: '50% 40%' },
    accent: 'ink',
    pieces: 24,
    stats: [
      { n: '22k', l: 'Ingot origin' },
      { n: 'I—XX', l: 'Volumes' },
      { n: '7d', l: 'At the bench' },
    ],
    subtypeLabel: 'Ring Type',
    banner: { image: U(IMG.ringHand), word: 'RING' },
    products: [
      { id: 'r1', name: 'Aria Solitaire',         material: '18k Gold · 1.2ct Diamond',  image: U(IMG.ring),      style: 'Solitaire', subtype: 'Engagement' },
      { id: 'r2', name: 'Belle Époque Cluster',   material: 'Platinum · Sapphire',       image: U(IMG.ringHand),  style: 'Heritage',  subtype: 'Cocktail' },
      { id: 'r3', name: 'Vœu Eternity Band',      material: '18k Rose Gold · Pavé',      image: U(IMG.diamondCu), style: 'Modern',    subtype: 'Band' },
      { id: 'r4', name: 'Heritage Cushion',       material: '22k Gold · Emerald',        image: U(IMG.ring),      style: 'Heritage',  subtype: 'Cocktail' },
      { id: 'r5', name: 'Le Petit Halo',          material: '18k White Gold',            image: U(IMG.ringHand),  style: 'Modern',    subtype: 'Casual' },
      { id: 'r6', name: 'Marquise Royale',        material: 'Platinum · 0.85ct',         image: U(IMG.diamondCu), style: 'Solitaire', subtype: 'Engagement' },
    ],
  },
  {
    slug: 'pendants',
    name: 'Pendants',
    numeral: 'II',
    tagline: 'Worn against the hollow of the throat.',
    description:
      'A pendant should rest, not perform. Strung on a hand-woven 18k chain, each piece is sized to the breath.',
    hero: { src: U(IMG.pendant), position: '50% 45%' },
    accent: 'ink',
    pieces: 18,
    stats: [
      { n: 'Muzo', l: 'Emerald origin' },
      { n: '18k', l: 'Woven chain' },
      { n: 'No. 03', l: 'of XII' },
    ],
    subtypeLabel: 'Pendant Type',
    banner: { image: U(IMG.choker), word: 'PENDANT' },
    products: [
      { id: 'p1', name: 'Muzo Drop',     material: '18k Gold · 4.2ct Emerald',   image: U(IMG.pendant), style: 'Heritage',  subtype: 'Drop' },
      { id: 'p2', name: 'La Lune',       material: 'White Gold · Mother of Pearl', image: U(IMG.choker), style: 'Modern',   subtype: 'Solitaire' },
      { id: 'p3', name: 'Rosa Solitaire', material: '18k Rose Gold · Diamond',   image: U(IMG.pendant), style: 'Floral',    subtype: 'Solitaire' },
      { id: 'p4', name: 'Étoile du Soir', material: 'Platinum · Sapphire',       image: U(IMG.choker), style: 'Antique',   subtype: 'Drop' },
    ],
  },
  {
    slug: 'bangles',
    name: 'Bangles',
    numeral: 'III',
    tagline: 'Forged from a single ingot.',
    description:
      'The bangle is the most ancient form. Ours are drawn from one ingot of 22k, hand-forged over fire, and finished with the bench mark.',
    hero: { src: U(IMG.wrist), position: '50% 50%' },
    accent: 'ivory',
    pieces: 32,
    stats: [
      { n: '22k', l: 'Solid gold' },
      { n: '1', l: 'Ingot per piece' },
      { n: 'Hammered', l: 'By hand' },
    ],
    subtypeLabel: 'Bangle Type',
    banner: { image: U(IMG.wrist), word: 'BANGLE' },
    products: [
      { id: 'b1', name: 'Anvil Bangle',           material: '22k Hammered Gold',     image: U(IMG.wrist),   style: 'Heritage', subtype: 'Hand-Forged' },
      { id: 'b2', name: 'Maharani Set of Six',    material: '22k Gold · Polished',   image: U(IMG.flatlay), style: 'Bridal',   subtype: 'Polished' },
      { id: 'b3', name: 'Filigrane Étoilée',      material: '18k Gold · Engraved',   image: U(IMG.wrist),   style: 'Antique',  subtype: 'Engraved' },
      { id: 'b4', name: 'Saraswati Heritage',     material: '22k Gold · Repoussé',   image: U(IMG.flatlay), style: 'Heritage', subtype: 'Engraved' },
    ],
  },
  {
    slug: 'bracelets',
    name: 'Bracelets',
    numeral: 'IV',
    tagline: 'Fourteen links, clasped at the pulse.',
    description:
      'Each oval is rolled, filed, and turned by thumb. The clasp is hidden within the chain — so the bracelet never truly ends.',
    hero: { src: U(IMG.wrist), position: '50% 60%' },
    accent: 'ink',
    pieces: 16,
    stats: [
      { n: 'XIV', l: 'Oval links' },
      { n: '22k', l: 'Drawn ingot' },
      { n: 'Concealed', l: 'Clasp' },
    ],
    subtypeLabel: 'Bracelet Type',
    banner: { image: U(IMG.wrist), word: 'BRACELET' },
    products: [
      { id: 'br1', name: 'Quatorze Oval',     material: '22k Gold · Hand-drawn', image: U(IMG.wrist),   style: 'Modern',   subtype: 'Chain' },
      { id: 'br2', name: 'Tennis Eternity',   material: 'Platinum · 4.0ct Pavé', image: U(IMG.flatlay), style: 'Modern',   subtype: 'Tennis' },
      { id: 'br3', name: 'Cordon Tressé',     material: '18k Gold · Woven',      image: U(IMG.wrist),   style: 'Heritage', subtype: 'Cuff' },
      { id: 'br4', name: 'Charm de Voyage',   material: '22k Gold · Set of XII', image: U(IMG.flatlay), style: 'Antique',  subtype: 'Charm' },
    ],
  },
  {
    slug: 'kara',
    name: 'Kara',
    numeral: 'V',
    tagline: 'A circle without seam, without end.',
    description:
      'The kara is forged closed — there is no clasp, no opening. Slipped over the wrist as a covenant, worn for a lifetime.',
    hero: { src: U(IMG.flatlay), position: '50% 50%' },
    accent: 'ivory',
    pieces: 12,
    stats: [
      { n: '22k', l: 'Forged seamless' },
      { n: 'Punjab', l: 'Heritage' },
      { n: 'Sealed', l: 'No clasp' },
    ],
    subtypeLabel: 'Kara Type',
    banner: { image: U(IMG.wrist), word: 'KARA' },
    products: [
      { id: 'k1', name: 'Akhand Kara',            material: '22k Gold · Seamless',  image: U(IMG.wrist),   style: 'Heritage', subtype: 'Plain' },
      { id: 'k2', name: 'Sikh Heritage',          material: '22k Gold · Hammered',  image: U(IMG.flatlay), style: 'Heritage', subtype: 'Hammered' },
      { id: 'k3', name: 'Plain Forged Band',      material: '22k Gold · Polished',  image: U(IMG.wrist),   style: 'Modern',   subtype: 'Plain' },
      { id: 'k4', name: 'Engraved Mool Mantar',   material: '22k Gold · Inscribed', image: U(IMG.flatlay), style: 'Antique',  subtype: 'Engraved' },
    ],
  },
  {
    slug: 'mangalsutra',
    name: 'Mangalsutra',
    numeral: 'VI',
    tagline: 'Black bead and gold, knotted at the breath.',
    description:
      'The mangalsutra is sacred geometry — black beads strung against gold, the pendant a private vow worn close to the heart.',
    hero: { src: U(IMG.choker), position: '50% 45%' },
    accent: 'ink',
    pieces: 14,
    stats: [
      { n: '108', l: 'Sacred beads' },
      { n: '22k', l: 'Gold pendant' },
      { n: 'Hand-strung', l: 'Silk core' },
    ],
    subtypeLabel: 'Mangalsutra Type',
    banner: { image: U(IMG.choker), word: 'MANGALSUTRA' },
    products: [
      { id: 'm1', name: 'Sutra Classique',    material: '22k Gold · Black Onyx',     image: U(IMG.choker),  style: 'Heritage', subtype: 'Classic' },
      { id: 'm2', name: 'Vati Heritage',      material: '22k Gold · Diamond Vati',   image: U(IMG.pendant), style: 'Heritage', subtype: 'Vati' },
      { id: 'm3', name: 'Nallapusalu Long',   material: '22k Gold · Coral',          image: U(IMG.choker),  style: 'Antique',  subtype: 'Long' },
      { id: 'm4', name: 'Royal Bridal',       material: '22k Gold · Polki Diamond',  image: U(IMG.pendant), style: 'Bridal',   subtype: 'Bridal' },
    ],
  },
  {
    slug: 'necklaces',
    name: 'Necklaces',
    numeral: 'VII',
    tagline: 'A line drawn against the collarbone.',
    description:
      'From the slim choker to the bridal collar — necklaces from Jewar are cut, cast, and set against the architecture of the throat.',
    hero: { src: U(IMG.choker), position: '50% 35%' },
    accent: 'ink',
    pieces: 22,
    stats: [
      { n: 'XII', l: 'Fittings' },
      { n: '4.2', l: 'Carat centre' },
      { n: 'Bridal', l: 'Made-to-order' },
    ],
    subtypeLabel: 'Necklace Type',
    banner: { image: U(IMG.choker), word: 'NECKLACE' },
    products: [
      { id: 'n1', name: 'Eternal Choker',         material: 'Platinum · Emeralds',         image: U(IMG.choker),       style: 'Modern',   subtype: 'Choker' },
      { id: 'n2', name: 'Maharani Collar',        material: '22k Gold · Polki',            image: U(IMG.necklaceLay),  style: 'Bridal',   subtype: 'Collar' },
      { id: 'n3', name: 'Riviera de Diamants',    material: 'Platinum · 8.4ct Pavé',       image: U(IMG.choker),       style: 'Modern',   subtype: 'Choker' },
      { id: 'n4', name: 'Long Sautoir Tassel',    material: '18k Gold · Pearls',           image: U(IMG.necklaceLay),  style: 'Antique',  subtype: 'Sautoir' },
      { id: 'n5', name: 'Bib of the Mughal',      material: '22k Gold · Ruby & Emerald',   image: U(IMG.choker),       style: 'Heritage', subtype: 'Bib' },
      { id: 'n6', name: 'Modern Lariat',          material: '18k Rose Gold',               image: U(IMG.necklaceLay),  style: 'Modern',   subtype: 'Sautoir' },
    ],
  },
  {
    slug: 'earrings',
    name: 'Earrings',
    numeral: 'VIII',
    tagline: 'A whisper of wire, a single pearl.',
    description:
      'Earrings frame the face. Akoya pearls from the Ise Bay, capped in matte 18k — the wire is struck, never cast.',
    hero: { src: U(IMG.earring), position: '55% 50%' },
    accent: 'ivory',
    pieces: 28,
    stats: [
      { n: 'Ise', l: 'Bay of origin' },
      { n: '8mm', l: 'Bead diameter' },
      { n: 'II', l: 'Years of nacre' },
    ],
    subtypeLabel: 'Earring Type',
    banner: { image: U(IMG.earring), word: 'EARRING' },
    products: [
      { id: 'e1', name: 'Akoya Drop',                 material: '18k Gold · Pearl',           image: U(IMG.earring),     style: 'Modern',   subtype: 'Drop' },
      { id: 'e2', name: 'Jhumka Royale',              material: '22k Gold · Hand-engraved',   image: U(IMG.goldEarring), style: 'Heritage', subtype: 'Jhumka' },
      { id: 'e3', name: 'Stud Solitaire',             material: 'Platinum · Diamond',         image: U(IMG.earring),     style: 'Modern',   subtype: 'Stud' },
      { id: 'e4', name: 'Chandbali Heritage',         material: '22k Gold · Polki',           image: U(IMG.goldEarring), style: 'Bridal',   subtype: 'Chandbali' },
      { id: 'e5', name: 'Hoop de Paris',              material: '18k Gold · Polished',        image: U(IMG.earring),     style: 'Modern',   subtype: 'Hoop' },
      { id: 'e6', name: 'Tassel Lariat Earrings',     material: '18k Gold · Pearl',           image: U(IMG.goldEarring), style: 'Antique',  subtype: 'Drop' },
    ],
  },
  {
    slug: 'pendant-sets',
    name: 'Pendant Sets',
    numeral: 'IX',
    tagline: 'Pendant and earrings, written as one.',
    description:
      'A matched suite — pendant, chain, and earrings — composed at the bench so the geometry sings as a single phrase.',
    hero: { src: U(IMG.setEditorial), position: '50% 45%' },
    accent: 'ivory',
    pieces: 14,
    stats: [
      { n: '3 pcs', l: 'Suite' },
      { n: 'Matched', l: 'At the bench' },
      { n: 'Boxed', l: 'In velvet' },
    ],
    subtypeLabel: 'Suite Type',
    banner: { image: U(IMG.choker), word: 'SUITE' },
    products: [
      { id: 'ps1', name: 'Coffret Étoilé',        material: '18k Gold · Sapphire Suite',   image: U(IMG.setEditorial), style: 'Modern',   subtype: 'Sapphire' },
      { id: 'ps2', name: 'Bridal Polki Suite',    material: '22k Gold · Polki Diamond',    image: U(IMG.necklaceLay),  style: 'Bridal',   subtype: 'Bridal' },
      { id: 'ps3', name: 'Pearl Soirée',          material: '18k Gold · Akoya Pearls',     image: U(IMG.setEditorial), style: 'Modern',   subtype: 'Pearl' },
      { id: 'ps4', name: 'Emerald Maharani',      material: '22k Gold · Emerald & Diamond', image: U(IMG.necklaceLay), style: 'Heritage', subtype: 'Emerald' },
    ],
  },
  {
    slug: 'chains',
    name: 'Chains',
    numeral: 'X',
    tagline: 'A line, drawn in 22 carats.',
    description:
      'Chains are the foundation of the wardrobe. Each link is rolled, soldered closed, and tested at fifteen kilograms before it leaves the bench.',
    hero: { src: U(IMG.chain), position: '50% 50%' },
    accent: 'ink',
    pieces: 20,
    stats: [
      { n: '15kg', l: 'Pull-tested' },
      { n: '22k', l: 'Solid gold' },
      { n: 'XII', l: 'Link styles' },
    ],
    subtypeLabel: 'Chain Type',
    banner: { image: U(IMG.chain), word: 'CHAIN' },
    products: [
      { id: 'c1', name: 'Cuban Heritage',         material: '22k Gold · Solid Cuban',  image: U(IMG.chain), style: 'Heritage', subtype: 'Cuban' },
      { id: 'c2', name: 'Singapore Twist',        material: '22k Gold · Diamond Cut',  image: U(IMG.chain), style: 'Modern',   subtype: 'Singapore' },
      { id: 'c3', name: 'Box Chain Classique',    material: '18k Gold · Polished',     image: U(IMG.chain), style: 'Modern',   subtype: 'Box' },
      { id: 'c4', name: 'Belcher Heavyweight',    material: '22k Gold · Round Link',   image: U(IMG.chain), style: 'Heritage', subtype: 'Belcher' },
    ],
  },
];

export function findCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

// Suggest related categories (cross-sell), excluding self.
export function relatedCategories(slug, n = 3) {
  return CATEGORIES.filter((c) => c.slug !== slug).slice(0, n);
}
