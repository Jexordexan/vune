import { ActionFunction } from './util/types';
import { modulePath } from './globals';
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

export function action<A extends ActionFunction>(actor: A): A;
export function action<A extends ActionFunction>(type: string, actor: A): A;
export function action<A extends ActionFunction>(arg1: string | A, arg2?: A): A {
  const name = typeof arg1 === 'string' ? arg1 : '';
  const actor = typeof arg1 === 'function' ? arg1 : arg2!;

  const path = modulePath.join('/');
  const wrapped = ((payload: any) => {
    if (process.env.NODE_ENV === 'development') {
      logger.log('STARTED', `${path}/${wrapped.__action_key__}`);
    }

    const ret = actor(payload);
    if (process.env.NODE_ENV === 'development') {
      if (isPromise(ret)) {
        ret.then(() => console.log('FINISHED', `${path}/${wrapped.__action_key__}`));
      } else {
        logger.log('FINISHED', `${path}/${wrapped.__action_key__}`);
      }
    }

    return ret;
  }) as A;

  Object.defineProperty(wrapped, '__action_key__', { value: name, writable: true });

  return wrapped;
}
