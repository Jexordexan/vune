import { createStore, mutation, storeProvider, module } from '../../src';
import todosModule from './todos';

export const store = createStore({
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

export const { useStore, useModule } = storeProvider(store);
