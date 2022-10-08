import { createRouter, createWebHistory } from "vue-router";
import MainVue from "@/views/main/MainPage.vue";
import FlashcardsVue from "@/views/games/FlashcardsGame.vue";
import TestVue from "@/views/games/TestGame.vue";
import GameVue from "@/views/games/GameWrapper.vue";
import SelectGameVue from "@/views/main/SelectGame.vue";

const routes = [
    {
        path: '/',
        name: 'JPVocab | Home',
        component: MainVue,
        children: [
            {
                path: 'selectGame',
                name: 'JPVocab | Select Game',
                component: SelectGameVue
            }
        ]
    },

    {
        path: '/practice/',
        component: GameVue,
        children: [
            {
                path: 'flashcards/',
                name: 'JPVocab | Flashcards',
                component: FlashcardsVue,
            },
            {
                path: 'test/',
                name: 'JPVocab | Test',
                component: TestVue,
            },
        ]
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;