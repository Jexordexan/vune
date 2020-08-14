<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import { provideStore } from './store/store';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    provideStore();
  },
};
</script>
