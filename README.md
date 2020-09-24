# Vune

`vune` is a state-management library for Vue 3. It is similar to vuex, but its fully type-complete through to your components.

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

## Store

The store is the base object, but you can create sub-state, called `modules` that nest state, mutations, and actions within your store.
