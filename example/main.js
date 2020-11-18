import { createApp } from 'vue';
import App from './App.vue';
import Vune from '../src';
import { store } from './store/store';
import './index.css';

const app = createApp(App);
app.use(Vune, { store });

app.mount('#app');
