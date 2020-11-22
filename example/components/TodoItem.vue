<template>
  <div :class="{ done: todo.done }">
    {{ todo.text }}
    <button @click="$emit('toggle')">
      {{ todo.done ? 'Not done' : 'Done' }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TodoItem } from '../store/todos';
import { useModule } from '../store/store';

export default defineComponent({
  emits: ['toggle'],
  props: {
    todo: {
      type: Object as PropType<TodoItem>,
      required: true,
    },
  },
});
</script>

<style scoped>
.done {
  opacity: 0.5;
  text-decoration: line-through;
}
</style>
