<template>
    <div class="container">
        <form @submit.prevent="addNewWord" class="form">
            <input type="text" name="word" v-model.trim="newWord.body">
            <label for="word">WORD</label>
            <input type="text" name="reading" v-model.trim="newWord.reading">
            <label for="reading">READING</label>
            <input type="text" name="translation" v-model.trim="newWord.translation">
            <label for="translation">TRANSLATION</label>
            <button>Add</button>
        </form>
    </div>
</template>

<script lang="ts">
import { IWord } from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            newWord: {} as IWord
        }
    },

    methods: {
        addNewWord() {
            this.newWord.id = Date.now().toString();
            this.newWord.isChecked = false;
            this.$store.commit('addNewWord', this.newWord)
            this.newWord = {
                id: '',
                body: '',
                reading: '',
                translation: '',
                isChecked: false
            }

        }
    }
})
</script>

<style lang="scss" scoped>
@import '@/variables';

.container {
    position: relative;
    z-index: 100;
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: $bg;
    box-shadow: 0 0px 20px rgb(0 0 0 / 15%);
}

.form {
    display: flex;
    flex-direction: column;

    input {
        margin-bottom: 3px;
        padding: 0 15px;
        height: 40px;
        width: 60%;
        font-size: 18px;
    }

    label {
        margin-bottom: 10px;
        color: $purple4F;
        font-size: 14px;
    }

    button {
        width: 120px;
        height: 40px;
        margin-top: 10px;
        padding: 5px 15px;

        font-size: 16px;
        font-weight: 500;
        color: white;
        background-color: $pinkF8;
    }
}
</style>