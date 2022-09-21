<template>
    <div class="flashcardsPage">

        <header class="header" v-if="i<wordsArr.length">
            <div class="container">
                <span class="counter">{{i < wordsArr.length ? i + 1 : wordsArr.length}}/{{wordsArr.length}}</span>
                        <span class="progressBar"></span>
            </div>
        </header>

        <FlashcardsCard v-if="i<wordsArr.length" :i="i" :words-arr="wordsArr" @increment="handleIncrement" />

        <transition name="finish">
            <FlashcardsFinishScreen v-if="i>=wordsArr.length" :stats="gameStats" @continue-game="handleContinueGame"
                @restart-game="handleRestartGame" />
        </transition>

    </div>
</template>

<script setup lang="ts">
import store, { IWord } from '@/store';
import { shuffle } from '@/utils';
import { computed, ref } from 'vue';
import FlashcardsCard from '../components/FlashcardsCard.vue';
import FlashcardsFinishScreen from '../components/FlashcardsFinishScreen.vue';

const i = ref<number>(0)
const words = computed(() => { return store.state.words })
let wordsArr = ref<IWord[]>(shuffle(words.value))
const gameStats = ref<boolean[]>([])

const maxWidth = computed(() => { return `${100 / wordsArr.value.length * (i.value + 1)}vw` })

const handleIncrement = (know: boolean) => {
    gameStats.value = [...gameStats.value, know]
    if (i.value < wordsArr.value.length) ++i.value
}

const handleContinueGame = () => {
    const newArr = wordsArr.value.filter((_, ind) => !gameStats.value[ind])
    wordsArr.value = shuffle(newArr)
    i.value = 0
    gameStats.value = []
}

const handleRestartGame = () => {
    wordsArr.value = shuffle(wordsArr.value)
    i.value = 0
    gameStats.value = []
}

</script>

<style scoped lang="scss">
@import '@/scss/variables';

.flashcardsPage {
    background-color: $bg;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.header {
    position: relative;
    height: 100px;
    background-color: white;
    box-shadow: 0 0 5px rgb(0 0 0 / 10%);

    .counter {
        display: block;
        margin: 0 auto;
        font-size: 20px;
        line-height: 100px;
    }

    .progressBar {
        position: absolute;
        height: 2px;
        width: 100%;
        max-width: v-bind('maxWidth');
        bottom: 0;
        left: 0;
        background-color: $purple4F;
        transition: max-width 1s ease;
    }
}

.finish-enter-active,
.finish-leave-active {
    opacity: 1;
    transform: none;
    transition: opacity .3s ease, transform .3s ease;
}

.finish-enter-from,
.finish-leave-to {
    opacity: 0;
    transform: scale(.8);
}
</style>