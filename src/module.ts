import { reactive } from 'vue';

import { ModuleOptions } from './types';
import { modulePath, getCurrentState, getIsInitializing, stateStack } from './globals';
import { guard } from './state';
import { isPromise } from './util/helpers';
import { nameMutations } from './mutation';
import { nameActions } from './action';

export function defineModule<State extends object, R>(config: ModuleOptions<State, R>): ModuleOptions<State, R> {
  return config;
}

export function module<State extends object, R>(name: string, config: ModuleOptions<State, R>): R {
  modulePath.push(name);
  const state = reactive(config.state) as State;
  const currentState = getCurrentState();

  if (!getIsInitializing()) {
    throw new Error(`Cannot create module outside of store init()`);
  }

  guard(state);

  if (currentState[name]) {
    throw new Error(`Module name ${name} conflicts with existing state or module`);
  } else {
    currentState[name] = state;
    stateStack.push(state);
  }

  const storeModule = config.init(state);

  function onReady(resolvedModule: R) {
    Object.defineProperty(resolvedModule, '__module_key__', {
      value: modulePath.join('/'),
      enumerable: false,
      writable: false,
    });
    nameMutations(resolvedModule);
    nameActions(resolvedModule);
  }

  if (isPromise(storeModule)) {
    storeModule.then(onReady);
  } else {
    onReady(storeModule);
  }

  stateStack.pop();
  modulePath.pop();
  return storeModule;
}
