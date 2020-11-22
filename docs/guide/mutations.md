# Mutations

Mutations are atomic alterations to your state. Although the state is not made immutable by default, it is recommended that all changes are wrapped inside mutations.

## Named mutations

A good way to document your code is to name your mutations when you create them. Just pass the name as the first argument and the function as the second.

```js
const increment = mutation('INCREMENT', () => state.counter++);
```

## Naming shorthand

Most of the time the variable name is enough, so when you return the mutation from the `init` function, it will adopt the key as its name.

```js
const store = createStore({
  state: {
    todos: [],
  },
  init(state) {
    const addTodo = mutation((text) => {
      state.todos.push(text);
    });

    const removeTodo = mutation((index) => {
      state.todos.slice(index, 1);
    });
    return {
      ADD_TODO: addTodo, // The mutation is named "ADD_TODO"
      removeTodo, // the mutation is named "removeTodo"
    };
  },
});
```
