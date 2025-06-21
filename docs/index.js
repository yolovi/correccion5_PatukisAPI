const basicInfo = require('./basicinfo');
const components = require('./components');
const products = require('./products');
const users = require('./users');
const categories = require('./category');
const orders = require('./orders');

module.exports = {
  ...basicInfo,
  ...components,
  paths: {
    ...products,
    ...users,
    ...categories,
    ...orders,
  },
};
