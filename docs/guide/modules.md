# Modules

Modules are a collection of related state, mutations, actions and getters. They serve the same purpose as modules in vuex. Some of the differences are that modules are ALWAYS namespaced. They are automatically attached to the parent state object. For instance, if you register a module inside

## Typescript

### `defineModule`

This is a helper function that works like `defineComponent`. It handles all the type inferencing within a module, but returns only what was passed in without any processing.

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
