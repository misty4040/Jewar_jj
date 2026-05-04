const Collection = require('../models/Collection');
const { buildCrudRouter } = require('../utils/crud');

module.exports = buildCrudRouter(Collection);
