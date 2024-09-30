import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
// import store from './store'
// import Vuex from 'vuex'
import './assets/main.css'

const app = createApp(App);
router.base = '/'; // добавьте эту строку
    app.use(router)
    // .use(Vuex)
    // .use(store)
    app.mount('#app')