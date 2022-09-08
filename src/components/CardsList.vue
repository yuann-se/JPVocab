<template>
    <div class="cards-wrapper">
        <div class=" container">
            <WordCard v-for="word in words" :key="word.id" :word='word' />
        </div>
    </div>
</template>

<script lang="ts" setup>
import store from '@/store';
import { computed } from 'vue';
import WordCard from './WordCard.vue';

const words = computed(() => { return store.state.words })

</script>

<style lang="scss" scoped>
@import '@/variables';

.cards-wrapper {
    position: absolute;
    inset: 0;
    top: 150px;
    padding-top: 50px;
}
</style>