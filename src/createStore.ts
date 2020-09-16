import devtools from '@vue/devtools-api';
import { reactive, readonly } from 'vue';

import { StoreOptions, Store } from './util/types';
import { setIsInitializing, stateStack } from './globals';
import { subscriber, actionSubscriber } from './subscriptions';
import { guard } from './state';
import { nameMutations } from './mutation';
import { nameActions } from './action';

import logger from './util/logger';

const devtoolsLayerId = 'vune-store';

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
  });

  stateStack.pop();
  setIsInitializing(false);

  if (process.env.NODE_ENV === 'development') {
    // __VUE_DEVTOOLS_GLOBAL_HOOK__.on('app:add', (app: any) => {
    devtools.setupDevtoolsPlugin(
      {
        id: 'store',
        label: 'Vune',
        app: {},
      },
      function (devtools) {
        devtools.addTimelineLayer({
          id: devtoolsLayerId,
          label: 'Vune mutations',
          color: 3,
        });
        logger.devtools = devtools;
      }
    );
    // });
  }

  return augmentedStore as any;
}
