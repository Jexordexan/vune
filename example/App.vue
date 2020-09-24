<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Example />
</template>

<script>
import Example from './components/Example.vue';
import { provideStore } from './store/store';

export default {
  name: 'App',
  components: {
    Example,
  },
  setup() {
    provideStore();
  },
};
</script>
