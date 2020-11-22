# Vune

`vune` is a state-management plugin for Vue 3. It is similar to vuex, but its fully type-complete through to your components.

Here is a sample store:

```ts
import { createStore, mutation, action, module, getter } from 'vune';
import messagesModule from './modules/messages';
import { wait } from './util';

const store = createStore({
  state: {
    counter: 0,
  },
  init(state) {
    const increment = mutation(() => state.counter++);
    const decrement = mutation(() => state.counter--);

    const asyncReset = action(async () => {
      await wait(1000);
      state.counter = 0;
    });

    // Nest grouped logic into a module
    const messages = module(messagesModule);

    const messageCount = getter(() => messages.all.length);

    return {
      // state is implicitly returned and made readonly
      increment,
      decrement,
      asyncReset,
      messages,
      messageCount,
    };
  },
});

store.increment(); // MUTATION: increment

store.decrement(); // MUTATION: increment

store.asyncReset(); // MUTATION: increment

store.messages.create('Hello friend'); // MUTATION: messages.create

store.messageCount; // => number
```

## Installation

Vunes only peer dependency is Vue 3.

```bash
npm install vune

# or

yarn add vune
```

## Getting started

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

## Store

The store is the base object, but you can create sub-state, called `modules` that nest state, mutations, and actions within your store.

A store has a few special properties added to the properties returned from `init`

- `state` The fully nested state, includes state from vune modules
- `$subscribe` Subscribe to named mutations
- `$subscribeAction` Subscribe to named actions
- `$injectKey` an `InjectionKey` that will provide the store
