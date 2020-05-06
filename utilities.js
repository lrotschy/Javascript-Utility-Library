// utilities.js

// findWhere, return the first object with properties that match the supplied object. If no objects match all the supplied properties, undefined is returned.
// where, return an array of all objects with properties that match the supplied object.
// pluck, return an array of the values that match the supplied key from a collection of objects.
// keys, return an array of the keys from an object.
// values, return an array of the values from an object.
// extend, takes two or more objects, taking the properties and values from the last argument and adding them to the argument before it. Object extensions occur recursively from last argument to first. The first argument ends up being modified to include all properties and values from the other objects passed in.
// pick, return a new object with the passed in properties taken from the old object. Accepts one or more arguments.
// omit, return a new object with any passed in properties omitted.
// has, return true when the property passed in exists, false if it doesn't.

(function() {
  var _ = function(element) {
    u = {
      last: function() {
        return element[element.length - 1];
      },
      first: function() {
        return element[0];
      },
      without: function() {
        var new_arr = [];
        var args = [].slice.call(arguments);
        new_arr = element.filter(function(elem) {
          var keepElem= args.every(function(arg) {
            return arg !== elem;
          })
          if (keepElem) {
            return elem;
          }
        })
        element = new_arr;
        return element;
      },
      lastIndexOf: function(search) {

        for (var i = element.length - 1; i >= 0; i -= 1) {
          if (element[i] === search) {
            return i;
          }
        }
        return -1;
      },
      sample: function(quantity = 1) {
        var sampled = [];
        var elementCopy = element.slice();

        for (var i = 1; i <= quantity; i += 1) {
          var index = Math.floor(Math.random() * elementCopy.length);
          sampled.push(elementCopy[index]);
          elementCopy.splice(index, 1);
        }
        return sampled.length === 1 ? sampled[0] : sampled;
      },
      findWhere: function(values) {
        for (var i = 0; i < element.length; i += 1) {
          var match = Object.keys(values).every(function(key) {
            return values[key] === element[i][key];
          })
          if (match) {
            return element[i];
          }
        }
        return undefined;
      },
      where: function(values) {
        var result = [];
        for (var i = 0; i < element.length; i += 1) {
          var match = Object.keys(values).every(function(key) {
            return values[key] === element[i][key];
          })
          if (match) {
            result.push(element[i]);
          }
        }
        return result.length === 0 ? undefined : result;
      },
      pluck: function(key) {
        var result = [];
        element.forEach(function(object) {
          if (object[key]) {
            result.push(object[key]);
          }
        })
        return result;
      },
      keys: function() {
        return Object.getOwnPropertyNames(element);
      },
      values: function() {
        return Object.values(element);
      },
      pick: function() {
        var newObj = {};
        var properties = [].slice.call(arguments);

        properties.forEach(function(key) {
          if (element[key]) {
            newObj[key] = element[key];
          }
        })

        return newObj;
      },
      omit: function() {
        var newObj = {};
        var properties = [].slice.call(arguments);

        Object.keys(element).forEach(function(key) {
          if (properties.indexOf(key) === -1) {
            newObj[key] = element[key];
          }
        })

        return newObj;
      },
      has: function(property) {
        // return Object.keys(element).indexOf(property) >= 0;
        // return Object.keys(element).includes(property);
        return {}.hasOwnProperty.call(element, property);
      },
      isElement: function() {

      }
    };

    (["isElement", "isArray", "isObject", "isFunction", "isBoolean", "isString", "isNumber"]).forEach(function(method) {
      u[method] = function() { _[method].call(u, element); };
    });

    return u;
  };

  _.range = function(x, y = 0) {
    var start;
    var end;
    var result = [];

    if (x > y) {
      start = y;
      end = x;
    } else {
      start = x;
      end = y
    }

    for (var i = start; i < end; i += 1) {
      result.push(i);
    }
    return result;
  };

  _.extend = function() {
    // var args = [].slice.call(arguments);
    // var result = arguments[0];
    //
    // for (var i = arguments.length - 1; i > 0; i -= 1) {
    //   Object.assign(result, arguments[i]);
    // }
    //
    // return result;

    var args = [].slice.call(arguments)
    var oldObj = args.pop();
    var newObj = args[args.length - 1];

    for (var prop in oldObj) {
      newObj[prop] = oldObj[prop];
    }

    return args.length === 1 ? newObj : _.extend.apply(_, args);
  }

  _.isElement = function(obj) {
    return obj && obj.nodeType === 1;
  };

  _.isArray = Array.isArray || function(obj) {
    return toString.call(obj) === "[object Array]";
  };

  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  _.isFunction = function(obj) {
    return (typeof obj) === 'function';
  };

  (["Boolean", "String", "Number"]).forEach(function(method) {
    _["is" + method] = function(obj) {
      return toString.call(obj) === "[object " + method + "]";
    };
  })

  // _.isBoolean = function(obj) {
  //   return toString.call(obj) === "[object Boolean]";
  // };
  //
  // _.isString = function(obj) {
  //   return toString.call(obj) === "[object String]";
  // };

  // _.isNumber = function(obj) {
  //   return toString.call(obj) === "[object Number]";
  // };

  window._ = _;
  // global._ = _;
})();
