import { createStore, mutation, storeProvider } from '../../src';

const store = createStore({
  state: {
    counter: 1,
  },
  init(state) {
    const increment = mutation(() => {
      state.counter += 1;
    });

    return {
      increment,
    };
  },
});

export const { provideStore, useStore } = storeProvider(store);
