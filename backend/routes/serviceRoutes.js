const Service = require('../models/Service');
const { buildCrudRouter } = require('../utils/crud');

module.exports = buildCrudRouter(Service);
