<template>
  <h1>{{ msg }}</h1>
  <button @click="increment">count is: {{ state.counter }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
import { useStore } from '../store/store';
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    const { increment, state } = useStore();
    return {
      state,
      increment,
    };
  },
};
</script>
