# Modules

Modules are a collection of related state, mutations, actions and getters. They serve the same purpose as modules in Vuex. Some of the differences are that modules are ALWAYS namespaced. They are automatically attached to the parent state object. For instance, if you register a module inside

A modules state is merged with the parent state to create a single state tree. This is similar to how Vuex manages state.

## Typescript

### `defineModule`

This is a helper function that works like `defineComponent`. It handles all the type completion within a module, but returns only what was passed in without any processing.

```ts
// modules/user.ts
import { defineModule } from 'vune'
import fetchUser from '../api'

export default defineModule({
  state: {
    loggedIn: false
    user: null
  },
  init(state) {
    const
  }
})
```
