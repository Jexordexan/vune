import { states, modulePath, getIsInitializing, getCurrentMutation } from './globals';
import { watchEffect } from 'vue';
import { traverse } from './util/traverse';
import logger from './util/logger';

const onTrigger = (path: any[]) => ({ type, key, target, oldValue, newValue }: any) => {
  if (getIsInitializing()) return;
  const leftPad = getCurrentMutation() ? '  ' : '';
  const prettyType = type.toUpperCase();
  const prettyPath = path.join('/');
  switch (type) {
    case 'set':
      logger.log(leftPad, prettyType, prettyPath, key, oldValue, '=>', newValue);
      break;
    case 'add':
      logger.log(leftPad, prettyType, prettyPath, key, newValue);
      break;
    default:
      logger.log(leftPad, prettyType, prettyPath, key);
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
