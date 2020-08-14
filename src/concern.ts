import { reactive } from 'vue';

import { ConcernOptions } from './util/types';
import { concernPath, getCurrentState, getIsInitializing, stateStack } from './globals';
import { guard } from './state';
import { isPromise } from './util/helpers';
import { nameMutations } from './mutation';

export function defineConcern<State extends object, R>(config: ConcernOptions<State, R>): ConcernOptions<State, R> {
  return config;
}

export function concern<State extends object, R>(name: string, config: ConcernOptions<State, R>): R {
  concernPath.push(name);
  const state = reactive(config.state) as State;
  const currentState = getCurrentState();

  if (!getIsInitializing) {
    throw new Error(`Cannot create concern outside of store init()`);
  }

  guard(state);

  Object.defineProperty(state, '__concern_key__', { value: name });

  if (currentState[name]) {
    throw new Error(`Concern name ${name} conflicts with existing state or concern`);
  } else {
    currentState[name] = state;
    stateStack.push(state);
  }

  const storeConcern = config.init(state);

  if (isPromise(storeConcern)) {
    storeConcern.then((resolvedConcern) => {
      nameMutations(resolvedConcern);
    });
  } else {
    nameMutations(storeConcern);
  }

  stateStack.pop();
  concernPath.pop();
  return storeConcern;
}
