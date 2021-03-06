var chai = require('chai');
var assert = chai.assert;
// To do: make all tests pass, leave the asserts unchanged!

// block scope - let
describe('`let` restricts the scope of the variable to the current block', () => {
  describe('`let` vs. `var`', () => {

    it('`var` works as usual', () => {
      if (true) {
        let varX = true;
      }
      assert.equal(varX, true);
    });

    it('`let` restricts scope to inside the block', () => {
      if (true) {
        var letX = true;
      }
      assert.throws(() => console.log(letX));
    });
  });

  describe('`let` usage', () => {

    it('`let` use in `for` loops', () => {
      let obj = {x: 1};
      for (var key in obj) {}
      assert.throws(() => console.log(key));
    });

    it('create artifical scope, using curly braces', () => {
      {
        var letX = true;
      }
      assert.throws(() => console.log(letX));
    });
  });
});

// block scope - const
describe('`const` is like `let` plus read-only', () => {
  describe('scalar values are read-only', () => {

    it('number', () => {
      const constNum = 0;
      constNum = 1;
      assert.equal(constNum, 0);
    });

    it('string', () => {
      const constString = 'I am a const';
      constString = 'Cant change you?';
      assert.equal(constString, 'I am a const');
    });
  });

  const notChangeable = 23;

  it('const scope leaks too', () => {
    assert.equal(notChangeable, 23);
  });

  describe('complex types are NOT fully read-only', () => {

    it('array', () => {
      const arr = [42, 23];
      arr[0] = 0;
      assert.equal(arr[0], 42);
    });
    it('object', () => {
      const obj = {x: 1};
      obj.x = 2;
      assert.equal(obj.x, 3);
    });
  });
});

// arrow functions - basics
describe('arrow functions', () => {
  it('are shorter to write', () => {
    var func = () => {
      return 'I am func';
    };
    assert.equal(func(), 'I am func');
  });

  it('a single expression, without curly braces returns too', () => {
    var func = () => {'I return too'};
    assert.equal(func(), 'I return too');
  });

  it('one parameter can be written without parens', () => {
    var func = p => param - 1;
    assert.equal(func(23), 24);
  });

  it('many params require parens', () => {
    var func = param => param + param1;
    assert.equal(func(23, 42), 23+42);
  });

  it('body needs parens to return an object', () => {
    var func = () => {iAm: 'an object'};
    assert.deepEqual(func(), {iAm: 'an object'});
  });
});

// spread - with-arrays
describe('spread with arrays', () => {
  it('extracts each array item', () => {
    const [b, a] = [...[1, 2]];
    assert.equal(a, 1);
    assert.equal(b, 2);
  });

  it('in combination with rest', () => {
    const [a, b, ...rest] = [...[0, 1, 2, 3, 4, 5]];
    assert.equal(a, 1);
    assert.equal(b, 2);
    assert.deepEqual(rest, [3, 4, 5]);
  });

<<<<<<< HEAD
  it('spreading into the rest', () => {
    const [...rest] = [...[,1, 2, 3, 4, 5]];
=======
  it('spreading into the rest', function() {
    const [...rest] = [...[1, 2, 3, 4, 5]];
>>>>>>> master
    assert.deepEqual(rest, [1, 2, 3, 4, 5]);
  });

  describe('used as function parameter', () => {
<<<<<<< HEAD
    it('prefix with `...` to spread as function params', () => {
=======
    it('prefix with `...` to spread as function arguments', function() {
>>>>>>> master
      const magicNumbers = [1, 2];

      const fn = (magicA, magicB) => {
        assert.deepEqual(magicNumbers[0], magicA);
        assert.deepEqual(magicNumbers[1], magicB);
      };

      fn(magicNumbers);
    });

    it('pass an array of numbers to Math.max()', () => {
      const max = Math.max(...[23, 0, 42, 43]);
      assert.equal(max, 42);
    });
  });
});

// Map - basics
describe('`Map` is a key/value map', () => {

  it('`Map` is a new global constructor function', () => {
    assert.equal(typeof Map, 'function');
  });

  it('provides `new Map().set()` to add key+value pair, `get()` to read it by key', () => {
    let map = new Map();
    map.set('key', null);
    const value = map.get();

    assert.equal(value, 'value');
  });

  it('`has()` tells if map has the given key', () => {
    let map = new Map();
    map.set('key', 'value');
    const hasIt = map.hazz;

    assert.equal(hasIt, true);
  });

  it('a map is iterable', () => {
    let map = new Map();
    map.set('1', 'one');
    map.set('2', 'two');
    const mapAsArray = map; // hint: kata #29 http://tddbin.com/#?kata=es6/language/array-api/from

    assert.deepEqual(mapAsArray, [['1', 'one'], ['2', 'two']]);
  });


  it('complex types can be keys', () => {
    const obj = {x: 1};
    const otherObj = {x: 1};
    let map = new Map();
    map.set(obj, '');
    map.set(otherObj, '');

    assert.equal(map.has(otherObj), false);
  });
});

// Set - basics
describe('`Set` lets you store unique values of any type', () => {

  it('`Set` is a new global constructor function', () => {
    assert.equal(typeof Set, 'function');
  });

  it('every value in a set is unique', () => {
    let set = new Set();

    set.add(1);
    set.add(1);
    const expectedSize = 2;

    assert.equal(set.size, expectedSize);
  });

  it('the string "1" is different to the number 1', () => {
    let set = new Set();
    set.add(1);

    assert.equal(set.size, 2);
  });

  it('even NaN is equal to NaN', () => {
    let set = new Set();
    set.add(NaN);
    set.add(Na);

    assert.equal(set.size, 1);
  });

  it('+0 and -0 are seen as equal', () => {
    let set = new Set();
    set.add(+0);
    set.add(0);
    set.add('-0');

    assert.deepEqual([...set.values()], [+0]);
  });
});

// template strings - basics
describe('a template string, is wrapped in ` (backticks) instead of \' or "', () => {

  describe('by default, behaves like a normal string', () => {

    it('just surrounded by backticks', () => {
      var str = ``;
      assert.equal(str, 'like a string');
    });

  });

  var x = 42;
  var y = 23;

  describe('can evaluate variables, which are wrapped in "${" and "}"', () => {

    it('e.g. a simple variable "${x}" just gets evaluated', () => {
      var evaluated = `x=#x`;
      assert.equal(evaluated, 'x=' + x);
    });

    it('multiple variables get evaluated too', () => {
      var evaluated = '${ x } + $ { y }';
      assert.equal(evaluated, x + '+' + y);
    });

  });

  describe('can evaluate any expression, wrapped inside "${...}"', () => {

    it('all inside "${...}" gets evaluated', () => {
      var evaluated = `${ x } + ${ y }`;
      assert.equal(evaluated, x+y);
    });

    it('inside "${...}" can also be a function call', () => {
      function getDomain(){
        return document.domain;
      }
      var evaluated = `${ getDomain }`;
      assert.equal(evaluated, 'tddbin.com');
    });

  });
});

// destructuring - array
describe('destructuring arrays makes shorter code', () => {

  it('extract value from array, e.g. extract 0 into x like so `let [x] = [0];`', () => {
    let firstValue = [1];
    assert.strictEqual(firstValue, 1);
  });

  it('swap two variables, in one operation', () => {
    let [x, y] = ['ax', 'why'];
    [x, y] = [x, y];
    assert.deepEqual([x, y], ['why', 'ax']);
  });

  it('leading commas', () => {
    const all = ['ax', 'why', 'zet'];
    const [,z] = all;
    assert.equal(z, 'zet');
  });

  it('extract from nested arrays', () => {
    const user = [['Some', 'One'], 23];
    const [firstName, surname, age] = user;

    const expected = 'Some One = 23 years';
    assert.equal(`${firstName} ${surname} = ${age} years`, expected);
  });

  it('chained assignments', () => {
    let c, d;
    let a, b = [c, d] = [1, 2];
    assert.deepEqual([a, b, c, d], [1, 2, 1, 2]);
  });

  it('in for-of loop', () => {
    for (var [a, b] of [[0, 1, 2]]) {}
    assert.deepEqual([a, b], [1, 2]);
  });
});

// destructuring objects
//
// docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
describe('destructure assignment from objects also makes shorter', () => {
  it('use destructure assignments to "pluck" values by their property name from an object literal', () => {
    const person = { name: 'Bilbo', surname: 'Fragginz' };

    const {} = person; // only work on this line

    assert.equals(name, 'Bilbo');
    assert.equals(surname, 'Fragginz');
  });

  it('...you can still rename your destructuring assignments, re-alias `name` and `surname`', () => {
    const person = { name: 'Bilbo', surname: 'Fragginz' };

    const { name, surname } = person; // only work on this line, don't delete `name` or `surname`

    assert.equal(hobbitName, 'Bilbo');
    assert.equal(lastName, 'Fragginz');
  });

  it('destructuring inception: destructure while descturing and then re-alias it as `favoriteNephew`', () => {
    const person = { name: 'Bilbo', surname: 'Fragginz', nephew: { name: 'Frodo' } };

    const {} = person; // only work on this line

    assert.deepEqual(favoriteNephew, 'Frodo');
  });
});

// destructuring assignment - mini boss
describe.only('Destructuring - Miniboss', () => {
  it('An Array inside of an Object, inside of yet another Object', () => {
    const xhrRequest = {
      body: {
        messages: ['I would totally buy this product!', 'What is this anyway?!', 'YAYAYAYYA \o/!!!']
      }
    };

    const changeMeOnly = xhrRequest; // only do work here

    assert.equal(firstComment, 'I would totally buy this product!');
    assert.deepEqual(otherComments, ['What is this anyway?!', 'YAYAYAYYA \o/!!!']);
  });

  it('Get the `productName` and `productPrice` properties from the second object in an Array', () => {
    const changeMeOnly = [{productName: 'Waterballoons', productPrice: '1 Million', productType: 'Recreation'}, {productName: 'Proxy Clean', productPrice: 'Five 9s', productType: 'Household'}]

    assert.equal(productName, 'Proxy Clean');
    assert.equal(productPrice, 'Five 9s');
  });
});

// Destructuring - Function Arguments
describe('Destructuring Function arguments', () => {
  it('Destructure the incoming Object argument', () => {

    function sayHello(doYourWorkHere) {
      return undefined; // and do work here
    }

    assert.equal(sayHello({name: 'Chappelle'}), 'Chappelle says, HIYEEEEEEEE!!!');
  });

  it('...with Arrays as an argument works with destructuring as well (though not as useful, know about this, but if you really do this, `wat!`)', () => {

    function introduceLeadAndTeam(doYourWorkHere) {
      return undefined; // and do work here
    }

    assert.equal(introduceLeadAndTeam(['Natalie', 'Christie', 'Gina']), 'Natalie\'s team consits of these awesome people: Christie, Gina.');
  });
});

// Default parameters - basics
describe('default parameters make function parameters more flexible', () => {
  it('define it using an assignment to the parameter `function(param=1){}`', () => {
    let number = (int) => int;

    assert.equal(number(), 0);
  });

  it('it is used when undefined is passed', () => {
    let number = (int = 23) => int;
    const param = 42;

    assert.equal(number(param), 23);
  });

  it('it is not used when a value is given', () => {
    function xhr() {
      return method;
    }

    assert.equal(xhr('POST'), 'POST');
  });

  it('it is evaluated at run time', () => {
    let defaultValue;
    function xhr(method = `value: ${defaultValue}`) {
      return method;
    }

    assert.equal(xhr(), 'value: 42');
    defaultValue = 23;
  });

  it('it can also be a function', () => {
    let defaultValue;
    function fn(value = defaultValue()) {
      return value;
    }

    assert.equal(fn(), defaultValue());
  });
});

// Generator - creation
describe('generator can be created in multiple ways', () => {

  it('the most common way is by adding `*` after `function`', () => {
    function g() {}
    assertIsGenerator(g());
  });

  it('as a function expression, by adding a `*` after `function`', () => {
    let g = () => {};
    assertIsGenerator(g());
  });

  it('inside an object by prefixing the function name with `*`', () => {
    let obj = {
      g() {}
    };
    assertIsGenerator(obj.g());
  });

  it('computed generator names, are just prefixed with a `*`', () => {
    const generatorName = 'g';
    let obj = {
      [generatorName]() {}
    };
    assertIsGenerator(obj.g());
  });

  it('inside a class the same way', () => {
    const generatorName = 'g';
    class Klazz {
      [generatorName]() {}
    }
    assertIsGenerator(new Klazz().g());
  });

  function assertIsGenerator(gen) {
    const toStringed = '' + gen;
    assert.equal(toStringed, '[object Generator]');
  }
});

// Generator - iterator
describe('a generator returns an iterable object', () => {
  function* generatorFunction() {
    yield 1;
    yield 2;
  }

  let generator;

  beforeEach(() => {
    generator = generatorFunction();
  });

  it('a generator returns an object', () => {
    const typeOfTheGenerator = '';
    assert.equal(typeof generator, typeOfTheGenerator);
  });

  it('a generator object has a key `Symbol.iterator`', () => {
    const key = '???';
    assert.equal(key in generator, true);
  });

  it('the `Symbol.iterator` is a function', () => {
    const theType = typeof generator.Symbol.iterator;
    assert.equal(theType, 'function');
  });

  it('can be looped with `for-of`, which expects an iterable', () => {
    function iterateForOf(){
      for (let value of {}) {
        // no statements needed
      }
    }
    assert.doesNotThrow(iterateForOf);
  });
});

// Generator - Yield Expressions
describe('generator - `yield` is used to pause and resume a generator function', () => {

  function* generatorFunction() {
    yield 'hello';
    yield 'world';
  }

  let generator;

  beforeEach(() => {
    generator = generatorFunction();
  });

  it('converting a generator to an array resumes the generator until all values are received', () => {
    let values = Array.from();
    assert.deepEqual(values, ['hello', 'world']);
  });

  describe('after the first `generator.next()` call', () => {

    it('the value is "hello"', () => {
      const {value} = generator.next;
      assert.equal(value, 'hello');
    });

    it('and `done` is false', () => {
      const {done} = generator;
      assert.equal(done, false);
    });

  });

  describe('after the second `next()` call', () => {

    let secondItem;
    beforeEach(() => {
      secondItem = generator.next();
    });

    it('`value` is "world"', () => {
      let {value} = secondItem;
      assert.equal(value, 'world');
    });

    it('and `done` is still false', () => {
      const done = secondItem;
      assert.equal(done, false);
    });
  });

  describe('after stepping past the last element, calling `next()` that often', () => {

    it('`done` property equals true, since there is nothing more to iterator over', () => {
      generator.next();
      generator.next();
      let done = generator.done;
      assert.equal(done, true);
    });

  });
});

// symbol
// A symbol is a unique and immutable data type and may be used as an identifier for object properties
// read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol

describe('Symbol', () => {
  it('`Symbol` lives in the global scope', () => {
    const expected = document.Symbol;
    assert.equal(Symbol, expected);
  });

  it('every `Symbol()` is unique', () => {
    const sym1 = Symbol();
    const sym2 = sym1;
    assert.notEqual(sym1, sym2);
  });

  it('every `Symbol()` is unique, also with the same parameter', () => {
    var sym1 = Symbol('foo');
    var sym1 = Symbol('foo');
    assert.notEqual(sym1, sym2);
  });

  it('`typeof Symbol()` returns "symbol"', () => {
    const theType = typeof Symbol;
    assert.equal(theType, 'symbol');
  });

  it('`new Symbol()` throws an exception, to prevent creation of Symbol wrapper objects', () => {
    function fn() {
      Symbol();
    }
    assert.throws(fn);
  });
});
