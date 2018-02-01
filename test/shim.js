require('../shim');
var test = require('tape');
var Sym = typeof Symbol === 'undefined' ? {} : Symbol;
var isSymbol = function (sym) {
  return typeof Sym === 'function' && typeof sym === 'symbol';
};
var functionsHaveNames = (function foo() {}).name === 'foo';
var ifFunctionsHaveNamesTest = functionsHaveNames ? test : test.skip;
var ifSymbolUnscopablesTest = isSymbol(Sym.unscopables) ? test : test.skip;

if (!Object.prototype.hasOwnProperty.call(Array.prototype, 'find')) {
  return test('exists', function (t) {
    t.plan(1);

    t.same(!!Array.prototype, true);
  });
}

ifFunctionsHaveNamesTest('has the correct name', function (t) {
  t.plan(1);

  t.same(Array.prototype.find.name, 'find');
});

test('should have the right arity', function (t) {
  t.plan(1);

  t.same(Array.prototype.find.length, 1);
});

test('is not enumerable', function (t) {
  t.plan(1);

  var descriptor = Object.getOwnPropertyDescriptor(Array.prototype, 'find');

  t.same(descriptor.enumerable, false);
});

test('should throw TypeError when function was not passed', function (t) {
  t.plan(1);

  t.throws(function () {
    [5, 10, 15, 20].find();
  }, TypeError);
});

test('should receive all three parameters', function (t) {
  t.plan(9);

  var list = [5, 10, 15, 20];
  var foundIndex = list.find(function (value, index, arr) {
    t.same(list[index], value);
    t.same(list, arr);

    return false;
  });

  t.same(foundIndex, undefined);
});

test('should work with the context argument', function (t) {
  t.plan(1);

  var context = {};

  [1].find(function () {
    t.same(this, context);
  }, context);
});

test('should work with an array-like object', function (t) {
  t.plan(1);

  var found = Array.prototype.find.call({
    0: 1,
    1: 2,
    2: 3,
    length: 3
  }, function (item) {
    return item === 2;
  });

  t.same(found, 2);
});

test('should work with an array-like object with negative length', function (t) {
  t.plan(1);

  var found = Array.prototype.find.call({
    0: 1,
    1: 2,
    2: 3,
    length: -3
  }, function () {
    throw new Error('should not reach here');
  });

  t.same(found, undefined);
});

test('should work with a sparse array', function (t) {
  t.plan(3);

  var obj = [1, , undefined];
  t.same(1 in obj, false);
  var seen = [];
  var found = obj.find(function (item, idx) {
    seen.push([idx, item]);
    return false;
  });
  t.same(found, undefined);
  t.same(seen, [[0, 1], [1, undefined], [2, undefined]]);
});

test('should work with a sparse array-like object', function (t) {
  t.plan(2);

  var seen = [];
  var found = Array.prototype.find.call({
    0: 1,
    2: undefined,
    length: 3.2
  }, function (item, idx) {
    seen.push([idx, item]);
    return false;
  });

  t.same(found, undefined);
  t.same(seen, [[0, 1], [1, undefined], [2, undefined]]);
});

ifSymbolUnscopablesTest('should be unscopable if Symbols exist', function (t) {
  t.plan(2);

  var unscopables = Array.prototype[Sym.unscopables];

  t.same(!!unscopables, true);
  t.same(unscopables.find, true);
});
