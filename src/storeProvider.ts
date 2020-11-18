import { provide, inject } from 'vue';
import { Store } from './types';

export function storeProvider<T, R>(store: Store<T, R>) {
  return {
    provideStore: () => provide(store.$provideSymbol, store),
    useStore: () => inject(store.$provideSymbol)!,
    useModule: (moduleName: keyof R) => inject(store.$provideSymbol)?.[moduleName],
  };
}
