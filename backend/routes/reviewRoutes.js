const Review = require('../models/Review');
const { buildCrudRouter } = require('../utils/crud');

module.exports = buildCrudRouter(Review);
