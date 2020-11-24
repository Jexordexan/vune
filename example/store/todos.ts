import { action, defineModule, mutation } from '../../src';

export interface TodoItem {
  id: string;
  text: string;
  done: boolean;
}

let id = 0;

export default defineModule({
  state: {
    items: [],
  },
  init(state) {
    const newTodo = mutation((text: string) =>
      state.items.push({
        id: id++,
        text,
        done: false,
      })
    );

    const toggleTodo = mutation((id: string) => {
      const todo = state.items.find((item) => item.id === id);
      if (todo) todo.done = !todo.done;
    });

    const removeTodo = mutation((id: string) => {
      state.items = state.items.filter((item) => item.id === id);
    });

    const toggleAll = action(() => {
      state.items.forEach((item) => {
        toggleTodo(item.id);
      });
    });

    return {
      state,
      newTodo,
      toggleTodo,
      removeTodo,
      toggleAll,
    };
  },
});
