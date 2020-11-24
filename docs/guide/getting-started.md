# Getting started

Make sure you have installed `vune` in your project. [Installation instructions](/guide/installation).

This guide assumes you have a standard project structure like the one created by the Vue CLI.

First, create a file called `store.js` in your `src` folder:

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

export default store;
```

Then import that into your `main.js` file and add it to your app.

```js
// src/main.js
import App from './App.vue';
import store from './store';

const app = createApp(App);

app.use(store);
```

From there the `$store` property can be accessed in any component

```html
<template>
  Counter: {{ $store.$state.counter }}
  <button @click="$store.increment">Increment</button>
</template>
```
