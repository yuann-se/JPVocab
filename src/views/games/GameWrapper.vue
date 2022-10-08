<template>
    <GameHeader :current="i<wordsArr.length ? i : wordsArr.length" :total="wordsArr.length" />

    <router-view v-if="i<wordsArr.length" @increment="handleIncrement" :current="i" :words-arr="wordsArr"></router-view>

    <transition name="finish">
        <GameFinishScreen v-if="i>=wordsArr.length" :stats="gameStats" @continue-game="handleContinueGame"
            @restart-game="handleRestartGame" />
    </transition>

</template>

<script setup lang="ts">
import store, { IWord } from '@/store';
import { shuffle } from '@/utils';
import { ref, computed } from 'vue';
import GameHeader from '@/components/GameHeader.vue';
import GameFinishScreen from '../../components/GameFinishScreen.vue';

const i = ref<number>(0)
const words = computed(() => { return store.state.words })
let wordsArr = ref<IWord[]>(shuffle(words.value))
const gameStats = ref<boolean[]>([])

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

<style lang="scss" scoped>
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