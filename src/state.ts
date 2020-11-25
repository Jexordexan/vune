import { states, modulePath, getIsInitializing, getCurrentMutation, getCurrentActions } from './globals';
import { watchEffect } from 'vue';
import { traverse } from './util/traverse';
import logger from './util/logger';

const onTrigger = (path: any[]) => ({ type, key, target, oldValue, newValue }: any) => {
  if (getIsInitializing()) return;
  const prettyType = type.toUpperCase();
  const prettyPath = path.join('/');
  const data = {
    type: prettyType,
    path: prettyPath,
    key: key,
    mutation: getCurrentMutation()?.path,
    actions: Array.from(getCurrentActions().values()).map((a) => a.path),
  };
  switch (type) {
    case 'set':
      logger.log({
        ...data,
        oldValue,
        newValue,
      });
      break;
    case 'add':
      logger.log({
        ...data,
        newValue,
      });
      break;
    default:
      logger.log(data);
  }
};

export function guard<T extends object>(state: T) {
  states.add(state);
  const path = ['root'].concat(modulePath);

  if (process.env.NODE_ENV === 'development') {
    watchEffect(() => traverse(state), {
      onTrigger: onTrigger(path),
    });
  }
}
