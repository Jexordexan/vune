import { App } from 'vue';
import { setupDevtoolsPlugin } from '@vue/devtools-api';

export { computed as getter } from 'vue';
export { createStore } from './createStore';
export { module, defineModule } from './module';
export { mutation } from './mutation';
export { action } from './action';
export { storeProvider } from './storeProvider';
export * from './types';

import logger from './util/logger';

declare var __VUE_DEVTOOLS_GLOBAL_HOOK__: any;

const devtoolsLayerId = 'vune-store';

export default {
  install(app: App, options: any) {
    if (!options.store) {
      throw new Error('No store provided to Vune');
    }

    if (process.env.NODE_ENV === 'development') {
      /*@__PURE__*/ __VUE_DEVTOOLS_GLOBAL_HOOK__.once('init', () => {
        setupDevtoolsPlugin(
          {
            id: 'store',
            label: 'Vune',
            app,
          },
          function (devtools: any) {
            console.log('plugin registered');
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

    app.provide(options.store.$provideSymbol, options.store);
    app.config.globalProperties.$store = options.store;
  },
};
