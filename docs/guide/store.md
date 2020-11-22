# Store

The store is the base object, but you can create sub-state, called `modules` that nest state, mutations, and actions within your store.

A store is returned from the `createStore` function. It has a few special properties added to the properties returned from `init`

- `state` The fully nested state, includes state from vune modules
- `$subscribe` Subscribe to named mutations
- `$subscribeAction` Subscribe to named actions
- `$injectKey` an `InjectionKey` that will provide the store
