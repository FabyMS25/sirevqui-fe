export function Memoize() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cache = new WeakMap();

    descriptor.value = function(...args: any[]) {
      const obj = args[0];
      const prop = args[1];
      
      if (!obj || typeof obj !== 'object') {
        return originalMethod.apply(this, args);
      }

      if (!cache.has(obj)) {
        cache.set(obj, new Map());
      }

      const objCache = cache.get(obj);
      
      if (objCache.has(prop)) {
        return objCache.get(prop);
      }

      const result = originalMethod.apply(this, args);
      objCache.set(prop, result);
      return result;
    };

    return descriptor;
  };
}