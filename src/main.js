import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from "@/router/router";
import store from './store';
import './global.scss'

store.subscribe((mutation, state) => {
    localStorage.setItem('JPVocabStore', JSON.stringify(state));
})

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
