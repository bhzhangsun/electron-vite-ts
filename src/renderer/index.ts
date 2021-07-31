import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus';

const components = [ElLoading, ElMessage, ElMessageBox, ElNotification];
const plugins = [ElLoading, ElMessage, ElMessageBox, ElNotification];

const app = createApp(App);

app.use(router);
components.forEach((component) => {
  app.component(component.name, component);
});
plugins.forEach((plugin) => {
  app.use(plugin);
});

app.mount('#app');
