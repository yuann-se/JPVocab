import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import FlashcardsPage from "@/pages/FlashcardsPage.vue";
import ModalSelectGame from "@/components/ModalSelectGame.vue";

const routes = [
    {
        path: '/',
        name: 'JPVocab | Home',
        component: MainPage,
        children: [
            {
                path: 'selectGame',
                name: 'JPVocab | Select Game',
                component: ModalSelectGame
            }
        ]
    },
    {
        path: '/flashcards/',
        name: 'JPVocab | Flashcards',
        component: FlashcardsPage,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;