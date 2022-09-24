<template>
    <div class="sectionWrapper" v-disable-scroll>
        <div class="container">
            <div class="content">
                <div class="form">
                    <label for="word">Word</label>
                    <div class="inputWrapper">
                        <input type="text" autocomplete="off" name="word" v-model.trim="newWord.body">
                    </div>

                    <CreateNewWordInput :list="newWord.reading" :input-name="'Reading'" :inputValue="readingRef"
                        @update="handleUpdate" @add-item="handleAddItem" @delete-item="handleDeleteItem" />

                    <CreateNewWordInput :list="newWord.translation" :input-name="'Translation'"
                        :inputValue="translationRef" @update="handleUpdate" @add-item="handleAddItem"
                        @delete-item="handleDeleteItem" />

                    <button type="button" @click="addNewWord">{{wordToEdit.body ? 'Save' : 'Add'}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import store, { IWord, emptyWord } from '@/store';
import { computed, ref } from 'vue';
import CreateNewWordInput from './CreateNewWordInput.vue';

const wordToEdit = computed(() => { return store.state.wordToEdit })
console.log(wordToEdit.value.body)

let newWord = ref<IWord>(wordToEdit.value.body
    ? { ...wordToEdit.value }
    : { ...emptyWord })

const readingRef = ref<string>('')
const translationRef = ref<string>('')

interface IInputActions {
    payload: string
    inputName: string
}

const handleUpdate = ({ payload, inputName }: IInputActions) => {
    switch (inputName) {
        case ('Reading'): return readingRef.value = payload
        case ('Translation'): return translationRef.value = payload
    }
}

const handleAddItem = ({ inputName }: IInputActions) => {
    switch (inputName) {
        case ('Reading'): {
            newWord.value.reading = [...newWord.value.reading, readingRef.value]
            readingRef.value = ''
            return
        }
        case ('Translation'): {
            newWord.value.translation = [...newWord.value.translation, translationRef.value]
            translationRef.value = ''
        }
    }
}

const handleDeleteItem = ({ payload, inputName }: IInputActions) => {
    switch (inputName) {
        case ('Reading'): return newWord.value.reading = newWord.value.reading.filter((li) => li !== payload)
        case ('Translation'): return newWord.value.translation = newWord.value.translation.filter((li) => li !== payload)
    }
}

const addNewWord = () => {
    if (newWord.value.body && (newWord.value.translation.length || translationRef.value)) {
        if (!newWord.value.id) newWord.value.id = Date.now().toString()
        if (!newWord.value.isChecked) newWord.value.isChecked = false
        if (readingRef.value) {
            newWord.value.reading = [...newWord.value.reading, readingRef.value]
            readingRef.value = ''
        }

        if (translationRef.value) {
            newWord.value.translation = [...newWord.value.translation, translationRef.value]
            translationRef.value = ''
        }

        if (wordToEdit.value.body) {
            store.dispatch('editWord', newWord.value)
            store.dispatch('setWordToEdit', { ...emptyWord })
            store.dispatch('setIsAddPanelOpen', false)
            return
        }

        store.dispatch('addNewWord', newWord.value)
        newWord.value = { ...emptyWord }
    }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.sectionWrapper {
    position: fixed;
    width: 100vw;
    top: 90px;
    z-index: 400;
    height: calc(100vh - 90px);
    backdrop-filter: blur(3px);
    overflow-y: scroll;
}

.content {
    width: 100%;
    padding: 40px;
    background-color: $bg;
    box-shadow: 0 0px 20px rgb(0 0 0 / 15%);
}

.form {
    display: flex;
    flex-direction: column;
    width: 60%;

    input {
        padding: 0 15px;
        height: 40px;
        font-size: 18px;
    }

    label {
        color: $purple4F;
        font-size: 14px;
    }

    &>button {
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

@media (max-width: $bpS) {
    .sectionWrapper {
        top: 70px;
        height: calc(100vh - 70px);
    }

    .container {
        padding: 0;
    }

    .form {
        width: 100%;
    }
}
</style>