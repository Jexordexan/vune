# Creating a Store

The `store` is the base object for your Vune state.
You can create nested state, called `modules` that wrap related state, mutations, and actions within your store.

A store is returned from the `createStore` function. This is what you will be using in your components.

A store requires an initial `state` and an `init` function that returns all the mutations, actions, etc.

```js
import { toRefs } from 'vue'
import { createStore } from 'vune'

const store = createStore({
  state: {
    house: 'Atreides',
    leader: 'Paul Atreides'
    spice: 12334,
    allies: ['Fremen', 'Bene Gesserit'],
    enemies: ['Harkonnen'],
    // ...
  },
  init(state) {
    // ...
    return {
      ...toRefs(state),
      // ...
    }
  }
})

export default store
```

It has a few special properties added to the properties returned from `init`

- `$state` The fully nested state, includes state from vune modules
- `$subscribe` Subscribe to named mutations
- `$subscribeAction` Subscribe to named actions
- `$injectKey` an `InjectionKey` that will provide the store
