<template>
    <div class="sectionWrapper">
        <div class="container">
            <div class="form">
                <label for="word">Word</label>
                <div class="inputWrapper">
                    <input type="text" autocomplete="off" name="word" v-model.trim="newWord.body">
                </div>

                <CreateNewWordInput :list="newWord.reading" :input-name="'Reading'" :inputValue="readingRef"
                    @update="handleUpdate" @add-item="handleAddItem" @delete-item="handleDeleteItem" />

                <CreateNewWordInput :list="newWord.translation" :input-name="'Translation'" :inputValue="translationRef"
                    @update="handleUpdate" @add-item="handleAddItem" @delete-item="handleDeleteItem" />

                <button type="button" @click="addNewWord">{{wordToEdit.body ? 'Save' : 'Add'}}</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import store, { IWord, emptyWord } from '@/store';
import { computed, ref } from 'vue';
import CreateNewWordInput from './CreateNewWordInput.vue';
import { useDisableScroll } from '@/utils';

useDisableScroll()

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
@import '@/assets/styles/CreateNewWordForm.scss';
</style>