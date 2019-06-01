# array-find [![Build Status](https://travis-ci.org/1000ch/array-find.svg?branch=master)](https://travis-ci.org/1000ch/array-find)

Polyfill for Array.prototype.find.

[![testling badge](https://ci.testling.com/1000ch/array-find.png)](https://ci.testling.com/1000ch/array-find)

## Usage

Functionally:

```javascript
var find = require('@1000ch/array-find');

function isPrimary(item, index, array) {
  var start = 2;
  while (start <= Math.sqrt(number)) {
    if (number % start++ < 1) {
      return false;
    }
  }
  return (number > 1);
}

console.log(find([4, 5, 8, 10], isPrimary));
// => 5
```

From Array object:

```javascript
require('@1000ch/array-find/shim');

var array = [4, 5, 8, 10];

console.log(array.find(isPrimary));
// => 5
```

## License

MIT: http://1000ch.mit-license.org
