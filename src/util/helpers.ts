import { StoreConcern, MutationFunction, ActionFunction } from './types';

export function isArray(obj: any): obj is Array<any> {
  return Array.isArray(obj);
}

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}

export function isConcern(val: any): val is StoreConcern<any> {
  return val && typeof val === 'object' && val.hasOwnProperty('__concern_key__');
}

export function isMutation(val: any): val is MutationFunction {
  return val && typeof val === 'function' && val.hasOwnProperty('__mutation_key__');
}

export function isAction(val: any): val is ActionFunction {
  return val && typeof val === 'function' && val.hasOwnProperty('__action_key__');
}

export function isPromise(val: any): val is Promise<any> {
  return val instanceof Promise;
}
