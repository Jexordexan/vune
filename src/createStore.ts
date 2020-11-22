import { App, reactive, readonly } from 'vue';
import devtoolsApi from '@vue/devtools-api';

import { StoreOptions, Store } from './types';
import { setIsInitializing, stateStack } from './globals';
import { subscriber, actionSubscriber } from './subscriptions';
import { guard } from './state';
import { nameMutations } from './mutation';
import { nameActions } from './action';
import logger from './util/logger';

const devtoolsLayerId = 'vune-store';
declare var __VUE_DEVTOOLS_GLOBAL_HOOK__: any;

export function createStore<RootState extends object, R>(config: StoreOptions<RootState, R>): Store<RootState, R> {
  setIsInitializing(true);
  const state = reactive(config.state) as RootState;
  stateStack.push(state);

  guard(state);
  const store = config.init(state);

  nameMutations(store);
  nameActions(store);

  const $injectKey = Symbol();

  const augmentedStore = Object.assign(store, {
    state: readonly(state),
    $subscribe: subscriber(state),
    $subscribeAction: actionSubscriber(state),
    $injectKey,
    install(app: App) {
      if (process.env.NODE_ENV === 'development') {
        /*@__PURE__*/ __VUE_DEVTOOLS_GLOBAL_HOOK__.once('init', () => {
          devtoolsApi.setupDevtoolsPlugin(
            {
              id: 'store',
              label: 'Vune',
              app,
            },
            function (devtools: any) {
              console.log('vune plugin registered');
              devtools.addTimelineLayer({
                id: devtoolsLayerId,
                label: 'Vune',
                color: 0x2299ff,
              });
              logger.devtools = devtools;
            }
          );
        });
      }

      app.provide($injectKey, augmentedStore);
      app.config.globalProperties.$store = augmentedStore;
    },
  });

  stateStack.pop();
  setIsInitializing(false);

  return augmentedStore as any;
}
