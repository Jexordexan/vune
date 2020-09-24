<template>
  <h1>Todos</h1>
  <form @submit.prevent="newTodo(newText)">
    <input type="text" v-model="newText" />
    <button>Submit</button>
  </form>
  <ul>
    <li v-for="todo in state.items" :key="todo.id">{{ todo.text }}</li>
  </ul>
</template>

<script>
import { ref } from 'vue';
import { useStore } from '../store/store';

export default {
  name: 'Example',
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
