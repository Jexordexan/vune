import { ActionFunction } from './types';
import { actionSubscriptions, getCurrentState, getRootState, modulePath } from './globals';
import { isPromise, isAction } from './util/helpers';
import logger from './util/logger';

export function nameActions<T>(storeObject: T) {
  Object.keys(storeObject).forEach((key) => {
    const val = storeObject[key as keyof T];
    if (isAction(val) && val.__action_key__ === '') {
      val.__action_key__ = key;
    }
  });
}

/**
 * Grouped mutations for a specific code action. It can return a value or a Promise.
 *
 * If the first argument is Function, the action is named how it is returned from the store or module.
 *
 * @param {Function} [actor] the action function if a name is supplied
 *
 * @example
 *
 * ```
 * const fetchUser = action(() => {
 *   startFetch()
 *   const user = await fetch('api/user')
 *   setUser(user)
 *   stopFetch()
 * })
 * ```
 */
export function action<A extends ActionFunction>(actor: A): A;

/**
 * Grouped mutations for a specific code action.
 *
 * @param {string} type the name or the action function
 * @param {Function} [actor] the action function if a name is supplied
 * @returns {Function} the function is wrapped and returned
 *
 * @example
 *
 * ```
 * const fetchUser = action('FETCH_USER', () => {
 *   startFetch()
 *   const user = await fetch('api/user')
 *   setUser(user)
 *   stopFetch()
 * })
 * ```
 */
export function action<A extends ActionFunction>(type: string, actor: A): A;
export function action<A extends ActionFunction>(arg1: string | A, arg2?: A): A {
  const name = typeof arg1 === 'string' ? arg1 : '';
  const actor = typeof arg1 === 'function' ? arg1 : arg2!;
  const localState = getCurrentState();
  const rootState = getRootState();

  const path = modulePath.join('/');
  const wrapped = ((payload: any) => {
    if (process.env.NODE_ENV === 'development') {
      logger.log({
        type: 'ACTION:START',
        path: `${path}/${wrapped.__action_key__}`,
        payload,
      });
    }
    const subscriberArgs: [any, any] = [
      {
        type: wrapped.__action_key__,
        path,
        payload,
      },
      localState,
    ];
    if (actionSubscriptions.has(rootState)) {
      const { before } = actionSubscriptions.get(rootState)!;
      if (before.length) {
        before.forEach((fn) => fn(...subscriberArgs));
      }
    }

    const ret = actor(payload);
    function onComplete() {
      if (process.env.NODE_ENV === 'development') {
        logger.log({
          type: 'ACTION:FINISH',
          path: `${path}/${wrapped.__action_key__}`,
        });
      }
      if (actionSubscriptions.has(rootState)) {
        const { after } = actionSubscriptions.get(rootState)!;
        if (after.length) {
          after.forEach((fn) => fn(...subscriberArgs));
        }
      }
    }
    if (isPromise(ret)) {
      ret.then(onComplete);
    } else {
      onComplete();
    }

    return ret;
  }) as A;

  Object.defineProperty(wrapped, '__action_key__', { value: name, writable: true });

  return wrapped;
}
