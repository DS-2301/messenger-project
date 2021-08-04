export default function memoize(func) {
    let cache = new Map();
    const memoized = function (...args) {
      let key = args[0];
      if (cache.has(key)) {
        return cache.get(key);
      }
      let result = func.apply(this, args);
      cache.set(key, result);
      return result;
    };
  
    return memoized;
  }