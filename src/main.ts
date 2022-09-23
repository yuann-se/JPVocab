import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
import store from './store';
import '@/scss/global.scss'

store.subscribe((_, state) => {
    localStorage.setItem('JPVocabStore', JSON.stringify(state));
})

const app = createApp(App)
app.use(router)
    .use(store)
    .mount('#app')

app.directive("disable-scroll", {
    mounted() { document.body.style.overflowY = 'hidden' },
    unmounted() { document.body.style.overflowY = 'auto' }
})
