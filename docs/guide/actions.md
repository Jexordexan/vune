# Actions

Actions are groups of mutations related to a certain task. Actions can even be async!

## Creating an action

An `action` is created with function exported from vune. Your action will need a name, either defined as the first argument or by the key in the return statement of the `init` function. Note, actions can only be created within an `init` function of a store.

```js
import { action } from 'vune'
import fetchUser from './user'

export default {
  state: {
    user: null,
    loading: false
  },
  init(state) {
    const loadUser = action(() => {
      state.loading = true
      try {
        state.user = await fetchUser()
      } finally {
        state.loading = false
      }
    })
  }
}
```

Notice that you don't need to wrap every change to `state` in a `mutation`. This is where Vune differs from Vuex. Mutations are optional within actions.
