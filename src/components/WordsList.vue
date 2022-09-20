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
import WordCard from '@/components/WordsListItem.vue';

const words = computed(() => { return store.getters.sortedWords })

</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.cards-wrapper {
    position: absolute;
    width: 100vw;
    top: 150px;
    padding-top: 50px;
}
</style>