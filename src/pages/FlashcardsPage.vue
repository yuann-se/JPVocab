<template>
    <div class="flashcardsPage">

        <header class="header">
            <div class="container">
                <span class="counter">{{i < wordsArr.length ? i + 1 : wordsArr.length}}/{{wordsArr.length}}</span>
                        <span class="progressBar"></span>
            </div>
        </header>

        <FlashcardsCard v-if="i<wordsArr.length" :i="i" :words-arr="wordsArr" @increment="handleIncrement" />
        <FlashcardsFinishScreen v-else />

    </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { computed, ref } from 'vue';
import FlashcardsCard from '../components/FlashcardsCard.vue';
import FlashcardsFinishScreen from '../components/FlashcardsFinishScreen.vue';

const i = ref<number>(0)
const wordsArr = computed(() => { return store.state.words })
const gameStats = ref<boolean[]>([])

const maxWidth = computed(() => { return `${100 / wordsArr.value.length * (i.value + 1)}vw` })

const handleIncrement = (know: boolean) => {
    gameStats.value = [...gameStats.value, know]
    if (i.value < wordsArr.value.length) ++i.value
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
</style>