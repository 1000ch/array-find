module.exports = function (array, predicate, context) {
  if (!Array.isArray(array)) {
    throw new TypeError('array is not a Array');
  }
  
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate is not a Function');
  }

  var item;
  for (var i = 0, l = array.length;i < l;i++) {
    item = array[i];
    if (predicate.call(context, item, i, array)) {
      return item;
    }
  }

  return undefined;
};