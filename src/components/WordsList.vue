<template>
    <div class="cardsWrapper">
        <div class=" container">
            <WordCard v-for="word in words" :key="word.id" :word='word' :is-selection-mode="isSelectionMode"
                @change-mode="isSelectionMode = !isSelectionMode" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import store from '@/store';
import { computed, ref } from 'vue';
import WordCard from '@/components/WordsListItem.vue';

const words = computed(() => { return store.getters.sortedWords })
const isSelectionMode = ref(false)

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