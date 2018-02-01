var find = require('../');
var test = require('tape');

test('should find item by predicate', function (t) {
  t.plan(1);

  var result = find([5, 10, 15, 20], function (item) {
    return item === 15;
  });

  t.same(result, 15);
});

test('should return undefined when nothing matched', function (t) {
  t.plan(1);

  var result = find([5, 10, 15, 20], function (item) {
    return item === 'a';
  });

  t.same(result, undefined);
});
