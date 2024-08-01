function memoizeAsync(fn) {
  const cache = new Map();

  return async function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const promise = fn(...args).then(result => {
      cache.set(key, result);
      return result;
    }).catch(error => {
      cache.delete(key); // Remove the cache entry if the promise fails
      throw error;
    });

    cache.set(key, promise);
    return promise;
  };
}

function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

module.exports = {
  memoizeAsync,
  memoize
};