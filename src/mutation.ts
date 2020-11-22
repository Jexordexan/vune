import { MutationFunction } from './types';
import { getCurrentState, getRootState, modulePath, setCurrentMutation, subscriptions } from './globals';
import { isMutation } from './util/helpers';
import logger from './util/logger';

export function nameMutations<T>(storeObject: T) {
  Object.keys(storeObject).forEach((key) => {
    const val = storeObject[key as keyof T];
    if (isMutation(val) && val.__mutation_key__ === '') {
      val.__mutation_key__ = key;
    }
  });
}

export function mutation<M extends MutationFunction>(mutator: M): M;
export function mutation<M extends MutationFunction>(type: string, mutator: M): M;
export function mutation<M extends MutationFunction>(arg1: string | M, arg2?: M): M {
  const name = typeof arg1 === 'string' ? arg1 : '';
  const mutator = typeof arg1 === 'function' ? arg1 : arg2!;
  const rootState = getRootState();
  const localState = getCurrentState();

  const path = modulePath.join('/');
  const wrapped = ((payload: any) => {
    const subscriberArgs: [any, any] = [
      {
        type: wrapped.__mutation_key__!,
        path,
        payload,
      },
      localState,
    ];
    setCurrentMutation({
      type: name,
      path,
      payload,
    });

    if (subscriptions.has(rootState)) {
      const callbacks = subscriptions.get(rootState)!;
      if (callbacks.length) {
        callbacks.forEach((fn) => fn(...subscriberArgs));
      }
    }

    if (process.env.NODE_ENV === 'development') {
      logger.log({
        type: 'MUTATION',
        path: `${path}/${wrapped.__mutation_key__}`,
        payload,
      });
    }
    const ret = mutator(payload);
    setCurrentMutation(null);
    return ret;
  }) as M;

  Object.defineProperty(wrapped, '__mutation_key__', { value: name, writable: true });

  return wrapped;
}
