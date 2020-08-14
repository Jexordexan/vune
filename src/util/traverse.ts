import { isObject, isConcern, isArray } from './helpers';

export function traverse(value: unknown, seen: Set<object> = new Set()) {
  if (!isObject(value) || seen.has(value)) {
    return value;
  }

  if (seen.size > 0 && isConcern(value)) {
    return value;
  }

  seen.add(value);
  if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (value instanceof Map) {
    value.forEach((v, key) => {
      // to register mutation dep for existing keys
      traverse(value.get(key), seen);
    });
  } else if (value instanceof Set) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
