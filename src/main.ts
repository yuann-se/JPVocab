import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
import store from './store';
import '@/scss/global.scss'

store.subscribe((_, state) => {
    localStorage.setItem('JPVocabStore', JSON.stringify(state));
})

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
