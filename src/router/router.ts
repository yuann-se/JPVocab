import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import FlashcardsPage from "@/pages/FlashcardsPage.vue";
import ModalSelectGame from "@/components/ModalSelectGame.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: MainPage,
        children: [
            {
                path: 'selectGame',
                name: 'selectGame',
                component: ModalSelectGame
            }
        ]
    },
    {
        path: '/flashcards',
        name: 'flashcards',
        component: FlashcardsPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;