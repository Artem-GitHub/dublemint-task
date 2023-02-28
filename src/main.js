import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;
const apiId = process.env.VUE_APP_API_ID;
const apiKey = process.env.VUE_APP_API_KEY;
const token = Buffer.from(`${apiId}:${apiKey}`, 'utf8').toString('base64');
axios.defaults.headers.authorization = `Basic ${token}`;

const createdApp = createApp(App);

createdApp.use(VueAxios, axios);
createdApp.use(store);
createdApp.use(router);
createdApp.mount('#app');
