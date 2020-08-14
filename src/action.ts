import { ActionFunction } from './util/types';
import { concernPath } from './globals';
import { isPromise } from './util/helpers';

export function action<A extends ActionFunction>(actor: A): A;
export function action<A extends ActionFunction>(type: string, mutator: A): A;
export function action<A extends ActionFunction>(arg1: string | A, arg2?: A): A {
  const name = typeof arg1 === 'string' ? arg1 : '';
  const actor = typeof arg1 === 'function' ? arg1 : arg2!;

  const path = concernPath.join('/');
  const wrapped = ((payload: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('STARTED', `${path}/${wrapped.__action_key__}`);
    }

    const ret = actor(payload);
    if (process.env.NODE_ENV === 'development') {
      if (isPromise(ret)) {
        ret.then(() => console.log('FINISHED', `${path}/${wrapped.__action_key__}`));
      } else {
        console.log('FINISHED', `${path}/${wrapped.__action_key__}`);
      }
    }

    return ret;
  }) as A;

  Object.defineProperty(wrapped, '__action_key__', { value: name, writable: true });

  return wrapped;
}
