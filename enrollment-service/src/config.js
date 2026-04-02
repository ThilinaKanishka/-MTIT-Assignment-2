const path = require('path');

module.exports = {
  database: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../data/enrollment.db'),
    logging: false
  }
};