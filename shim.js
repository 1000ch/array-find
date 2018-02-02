var arrayFind = require('./');

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    enumerable: false,
    value: function find(predicate, context) {
      return arrayFind(this, predicate, context);
    }
  });
}
