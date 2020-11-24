![Vune logo](./assets/Logo.svg)

# What is Vune?

`vune` is a state-management plugin for Vue 3 inspired by the composition API. It is similar to vuex, but is meant to be fully type-complete through to your components.

Following the composition API pattern, everything is done inside the `init` function (similar to `setup` in a component). Everything is done with a composition function! These functions overlap with the vuex terminology to make things easier.

- `mutation()` – Wraps a mutation
- `action()` – Wraps an async action or group of mutations
- `getter()` – Returns a wrapped `ComputedRef` based on your state
- `module()` – Wraps a nested state module for logic groups

Here is a sample store:

```ts
import { createStore, mutation, action, module, getter } from 'vune';
import housesModule from './modules/houses';
import { wait } from './util';

const store = createStore({
  state: {
    spice: 0,
  },
  init(state) {
    const mineSpice = mutation(() => state.spice++);

    const dustStorm = action(async () => {
      await wait(1000);
      state.spice = 0; // No mutation needed, changes tracked automatically
    });

    // Nest grouped logic into a module
    const houses = module('houses', housesModule);
    const houseCount = getter(() => houses.list.length);

    return {
      houses,
      mineSpice,
      dustStorm,
      houseCount,
    };
  },
});

store.mineSpice(); // MUTATION: mineSpice

store.dustStorm(); // ACTION: dustStorm

store.houses.create('Atreides'); // MUTATION: messages.create

store.houseCount; // => number
```
