const HeroSlide = require('../models/HeroSlide');
const { buildCrudRouter } = require('../utils/crud');

module.exports = buildCrudRouter(HeroSlide);
