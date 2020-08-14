import { InjectionKey, provide, inject } from 'vue';

export function storeProvider<T extends object>(store: T) {
  const StoreSymbol: InjectionKey<T> = Symbol();

  return {
    provideStore: () => provide(StoreSymbol, store),
    useStore: () => inject(StoreSymbol)!,
  };
}
