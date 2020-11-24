# Using in a component

Let’s say you've created your store and installed like this

```js
// main.js
import store from './store';
const app = createApp(/* ... */);

app.use(store);
```

## Global `$store` property

The store is provided at root of the App and exposed as a global property `$store`.

```js
// Vue Component
export default {
  computed: {
    store() {
      return this.$store;
    },
  },
};
```

## Injecting in `setup`

If you are using the composition API, you can `inject` the store using the `$injectKey`. However, instead of injecting yourself, you should use the `storeProvider` discussed below.

```js
// Vue Component

import { inject } from 'vue';
import $store from './store';

export default {
  setup() {
    const store = inject($store.$injectKey);

    return {
      store,
    };
  },
};
```

## Composition Functions

The recommended option for injecting your store is to use the `storeProvider` helper from `vune`. This will create three composition functions you can use in your components.

- `useStore` The same as the example above, injects the store into the component.
- `useModule` Injects a module from the store (only top-level modules are provided).
- `provideStore` Not needed in most cases because the store is provided at the top level.

```js
// useStore.js
import { storeProvider } from 'vune';
import store from './store';

export const { useStore, useModule, provideStore } = storeProvider(store);
```

### useStore

`useStore` injects the entire store into your component. The resulting value is type-complete and should show up with auto-complete features.

```js
// Vue Component

import { useStore } from './useStore';

export default {
  setup() {
    const store = useStore();
    // ...
  },
};
```

### useModule

This is an additional helper for accessing modules inside of the store. Provide a name of the module and it will be injected. Again, this is type-complete, so if you are using TypeScript, enjoy all the information at your fingertips!

```js
// Vue Component

import { useModule } from './useStore';

export default {
  setup() {
    const { activeRefineries, wormSign } = useModule('refineries');
    // ...
  },
};
```

## Destructuring the store

By destructuring `useStore` or `useModule` you can quickly create local variables for use in your component.

```js
// Vue Component

import { watch } from 'vue';
import { useStore } from './useStore';

export default {
  setup() {
    const {
      leader, // ref to state.leader
      setLeader, // mutation
      isDead, // getter
    } = useStore();

    watch(isDead('Paul'), (paulIsDead) => {
      setLeader('Gurney');
    });

    return {
      leader,
    };
  },
};
```

:::warning
Make sure not to destructure reactive objects too far. In the following example, `foo` is not reactive and will not trigger updates.

```js
// store.js
export default createStore({
  state: {
    foo: 1,
  },
  init(state) {
    return state;
  },
});
```

```js
// inside setup() of a component
const {
  state: { foo },
} = useStore();

return {
  foo, // NOT REACTIVE
};
```

:::
