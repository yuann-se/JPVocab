<template>
    <div class="wrapper">
        <form @submit.prevent="addNewWord">
            <input type="text" name="word" v-model.trim="newWord.word">
            <input type="text" name="reading" v-model.trim="newWord.reading">
            <input type="text" name="translation" v-model.trim="newWord.translation">
            <button>Add</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newWord: {
                word: '',
                reading: '',
                translation: ''
            }
        }
    },
    methods: {
        addNewWord() {
            this.newWord.id = Date.now();
            this.$store.commit('addNewWord', this.newWord)
            this.newWord = {
                word: '',
                reading: '',
                translation: ''
            }

        }
    }
}
</script>
<style lang="scss" scoped>
.wrapper {
    background-color: aqua;
}
</style>