var find = require('../');
var test = require('tape');

function isPrimary(number, index, array) {
  var start = 2;
  while (start <= Math.sqrt(number)) {
    if (number % start++ < 1) {
      return false;
    }
  }
  return (number > 1);
}

test('return undefined', function (t) {

  t.plan(1);
  t.equal(
    find([4, 6, 8, 10], isPrimary),
    undefined
  );
});

test('return 5', function (t) {

  t.plan(1);
  t.equal(
    find([4, 5, 8, 10], isPrimary),
    5
  );
});
