import { states, concernPath, getIsInitializing, getCurrentMutation } from './globals';
import { watchEffect } from 'vue';
import { traverse } from './util/traverse';

const onTrigger = (path: any[]) => ({ type, key, target, oldValue, newValue }: any) => {
  if (getIsInitializing()) return;
  const leftPad = getCurrentMutation() ? '  ' : '';
  const prettyType = type.toUpperCase();
  const prettyPath = path.join('/');
  switch (type) {
    case 'set':
      console.log(leftPad, prettyType, prettyPath, key, oldValue, '=>', newValue);
      break;
    case 'add':
      console.log(leftPad, prettyType, prettyPath, key, newValue);
      break;
    default:
      console.log(leftPad, prettyType, prettyPath, key);
  }
};

export function guard<T extends object>(state: T) {
  states.add(state);
  const path = ['root'].concat(concernPath);

  if (process.env.NODE_ENV === 'development') {
    watchEffect(() => traverse(state), {
      onTrigger: onTrigger(path),
    });
  }
}
