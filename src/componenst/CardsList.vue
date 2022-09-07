<template>
    <div class="cards-wrapper">
        <div class=" container">
            <WordCard v-for="word in words" :key="word.id" :word='word' />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WordCard from './WordCard.vue';

export default defineComponent({
    components: { WordCard },

    computed: {
        words() {
            return this.$store.state.words
        }
    },
})
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