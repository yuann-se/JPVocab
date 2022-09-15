<template>
    <div class="container">
        <div class="form">

            <label for="word">Word</label>
            <input type="text" autocomplete="off" name="word" v-model.trim="newWord.body">

            <form @submit.prevent="addItem('reading')" class="inputForm">
                <label for="reading">Reading</label>
                <div class="inputWrapper">
                    <input type="text" v-model.trim="readingRef" autocomplete="off" name="reading">
                    <button class="addReading">
                        <DeleteReadingIcon />
                    </button>
                </div>
                <transition-group name="item" tag="ul" class="list" v-if="newWord.reading">
                    <li class="listItem" v-for="item in newWord.reading" :key="item">
                        <span>{{item}}</span>
                        <button type="button" @click="deleteItem(item, 'reading')">
                            <DeleteReadingIcon />
                        </button>
                    </li>
                </transition-group>
            </form>

            <form @submit.prevent="addItem('translation')" class="inputForm">
                <label for="translation">Translation</label>
                <div class="inputWrapper">
                    <input type="text" v-model.trim="translationRef" autocomplete="off" name="translation">
                    <button class="addReading">
                        <DeleteReadingIcon />
                    </button>
                </div>

                <transition-group name="item" tag="ul" class="list" v-if="newWord.translation">
                    <li class="listItem" v-for="item in newWord.translation" :key="item">
                        <span>{{item}}</span>
                        <button type="button" @click="deleteItem(item, 'translation')">
                            <DeleteReadingIcon />
                        </button>
                    </li>
                </transition-group>
            </form>

            <button type="button" @click="addNewWord">{{wordToEdit.body ? 'Save' : 'Add'}}</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import store, { IWord, emptyWord } from '@/store';
import { computed, reactive, ref } from 'vue';
import DeleteReadingIcon from './icons/DeleteReadingIcon.vue';


const wordToEdit = computed(() => { return store.state.wordToEdit })
console.log(wordToEdit.value.body)

let newWord = reactive<IWord>(wordToEdit.value.body
    ? { ...wordToEdit.value }
    : { ...emptyWord })

const readingRef = ref<string>('')
const translationRef = ref<string>('')

const addItem = (listName: string) => {
    switch (listName) {
        case ('reading'):
            if (readingRef.value) newWord.reading = [...newWord.reading, readingRef.value]
            readingRef.value = ''
            return
        case ('translation'):
            if (translationRef.value) newWord.translation = [...newWord.translation, translationRef.value]
            translationRef.value = ''
    }
}

const deleteItem = (item: string, listName: string) => {
    switch (listName) {
        case ('reading'): return newWord.reading = newWord.reading.filter((li) => li !== item)
        case ('translation'): return newWord.translation = newWord.translation.filter((li) => li !== item)
    }
}

const addNewWord = () => {
    if (newWord.body && (newWord.translation.length || translationRef.value)) {
        if (!newWord.id) newWord.id = Date.now().toString()
        if (!newWord.isChecked) newWord.isChecked = false
        if (readingRef.value) {
            newWord.reading.push(readingRef.value)
            readingRef.value = ''
        }

        if (translationRef.value) {
            newWord.translation.push(translationRef.value)
            translationRef.value = ''
        }

        if (wordToEdit.value.body) {
            store.dispatch('editWord', newWord)
            store.dispatch('setWordToEdit', { ...emptyWord })
            store.dispatch('setIsAddPanelOpen', false)
            return
        }

        store.dispatch('addNewWord', newWord)
        newWord = { ...emptyWord }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/CreateNewWordForm.scss';
</style>