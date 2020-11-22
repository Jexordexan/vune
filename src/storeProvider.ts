import { provide, inject } from 'vue';
import { Store } from './types';

export function storeProvider<T, R>(store: Store<T, R>) {
  return {
    provideStore: () => provide(store.$injectKey, store),
    useStore: () => inject(store.$injectKey)!,
    useModule: (moduleName: keyof R) => inject(store.$injectKey)![moduleName],
  };
}
