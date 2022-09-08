<template>
    <div class="container">
        <form @submit.prevent="addNewWord" class="form">
            <label for="word">Word</label>
            <input type="text" autocomplete="off" name="word" v-model.trim="newWord.body">
            <label for="reading">Reading</label>
            <input type="text" autocomplete="off" name="reading" v-model.trim="newWord.reading">
            <label for="translation">Translation</label>
            <input type="text" autocomplete="off" name="translation" v-model.trim="newWord.translation">
            <button>Add</button>
        </form>
    </div>
</template>

<script lang="ts" setup>
import store, { IWord } from '@/store';
import { ref } from 'vue';

const defaultValue: IWord = {
    id: '',
    body: '',
    reading: '',
    translation: '',
    isChecked: false
}

const newWord = ref<IWord>(defaultValue)

const addNewWord = () => {
    newWord.value.id = Date.now().toString()
    newWord.value.isChecked = false
    store.dispatch('addNewWord', newWord.value)
    newWord.value = defaultValue
}

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
        margin-bottom: 15px;
        padding: 0 15px;
        height: 40px;
        width: 60%;
        font-size: 18px;
    }

    label {
        color: $purple4F;
        font-size: 14px;
    }

    button {
        width: 120px;
        height: 40px;
        margin-top: 10px;
        padding: 5px 15px;

        font-size: 16px;
        font-weight: 700;
        color: white;
        background-color: $pinkF8;
    }
}
</style>