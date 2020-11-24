# Getting started

Vune can be installed as a plugin to your existing vue app. You must create a `store` and pass that into the plugin options. The store will then be provided to all components, as well as being accessible on `$store`.

```js
// src/store.js
import { createStore, mutation } from 'vune';

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
```

```js
// src/main.js
import store from './store'

const app = createApp(...)

app.use(store)
```
