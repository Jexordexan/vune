import { createStore, mutation, storeProvider, module } from '../../src';
import todosModule from './todos';

const store = createStore({
  state: {
    counter: 1,
  },
  init(state) {
    const increment = mutation(() => {
      state.counter += 1;
    });

    const todos = module('todos', todosModule);

    return {
      todos,
      increment,
    };
  },
});

export const { provideStore, useStore } = storeProvider(store);
