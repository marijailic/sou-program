import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { VueMasonryPlugin } from 'vue-masonry';

const app = createApp(App);

app.use(VueMasonryPlugin);
app.use(createPinia()).use(router).mount('#app');
