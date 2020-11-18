import { reactive, readonly } from 'vue';

import { StoreOptions, Store } from './types';
import { setIsInitializing, stateStack } from './globals';
import { subscriber, actionSubscriber } from './subscriptions';
import { guard } from './state';
import { nameMutations } from './mutation';
import { nameActions } from './action';

export function createStore<RootState extends object, R>(config: StoreOptions<RootState, R>): Store<RootState, R> {
  setIsInitializing(true);
  const state = reactive(config.state) as RootState;
  stateStack.push(state);

  guard(state);
  const store = config.init(state);

  nameMutations(store);
  nameActions(store);

  const augmentedStore = Object.assign(store, {
    state: readonly(state),
    $subscribe: subscriber(state),
    $subscribeAction: actionSubscriber(state),
    $provideSymbol: Symbol(),
  });

  stateStack.pop();
  setIsInitializing(false);

  return augmentedStore as any;
}
