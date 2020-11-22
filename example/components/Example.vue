<template>
  <h1>Todos</h1>
  <form @submit.prevent="newTodo(newText)">
    <input type="text" v-model="newText" />
    <button>Submit</button>
  </form>
  <ul>
    <li v-for="todo in state.items" :key="todo.id">
      <Todo :todo="todo" @toggle="toggleTodo(todo.id)" />
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue';
import { useStore } from '../store/store';
import Todo from './TodoItem.vue';

export default {
  name: 'Example',
  components: {
    Todo,
  },
  setup() {
    const {
      todos: { state, newTodo, toggleTodo },
    } = useStore();
    const newText = ref('');
    return {
      state,
      newText,
      newTodo,
      toggleTodo,
    };
  },
};
</script>
