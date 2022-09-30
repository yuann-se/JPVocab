import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import FlashcardsPage from "@/pages/FlashcardsPage.vue";
import ModalSelectGame from "@/components/ModalSelectGame.vue";
import TestPageVue from "@/pages/TestPage.vue";
import GamePage from "@/pages/GamePage.vue";

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
        path: '/practice/',
        // name: 'JPVocab | Pra',
        component: GamePage,
        children: [
            {
                path: 'flashcards/',
                name: 'JPVocab | Flashcards',
                component: FlashcardsPage,
            },
            {
                path: 'test/',
                name: 'JPVocab | Test',
                component: TestPageVue,
            },
        ]
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;