<template>
    <div class="cardsWrapper">
        <div class=" container">
            <WordCard v-for="word in words" :key="word.id" :word='word' />
        </div>
    </div>
</template>

<script lang="ts" setup>
import store from '@/store';
import { computed } from 'vue';
import WordCard from '@/components/WordsListItem.vue';

const words = computed(() => { return store.getters.sortedWords })

</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.cardsWrapper {
    position: absolute;
    width: 100vw;
    top: 150px;
    padding-top: 30px;
}

@media(max-width: $bpS) {
    .cardsWrapper {
        padding-top: 0;
    }
}
</style>