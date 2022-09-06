<template>
    <div class="cards-wrapper container">
        <WordCard v-for="word in words" :key="word.id" :word='word' />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import WordCard from './WordCard.vue';
export default {
    components: { WordCard },

    computed: {
        ...mapState({
            words: state => state.words
        })
    },
}
</script>

<style lang="scss" scoped>
@import '@/variables';

.cards-wrapper {
    padding-top: 50px;
}
</style>