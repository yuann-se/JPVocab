<template>
    <header class="header">
        <div class="container">

            <img class="logo" src="../assets/logo.png" alt="Logo">
            <HeaderSearch />

            <button class="add" @click="openAddPanel" :class="{active: isAddPanelOpen}">
                <AddNewWordIcon />
            </button>

            <router-link to="/selectGame" class="practice">
                <PracticeIcon />
            </router-link>

        </div>
    </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import HeaderSearch from './HeaderSearch.vue';
import AddNewWordIcon from '@/components/icons/AddNewWordIcon.vue';
import store, { emptyWord } from '@/store';
import PracticeIcon from './icons/PracticeIcon.vue';

const isAddPanelOpen = computed<boolean>(() => { return store.state.isAddPanelOpen })
const openAddPanel = () => {
    store.dispatch('setIsAddPanelOpen', !store.state.isAddPanelOpen)
    if (!store.state.isAddPanelOpen && store.state.wordToEdit.body) store.dispatch('setWordToEdit', { ...emptyWord })
}

</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.header {
    position: relative;
    z-index: 400;
    height: 100px;
    background-color: $purple66;
}

.container {
    display: flex;
    height: 100%;
    align-items: center;
}

.logo {
    width: 65px;
    margin-right: 10px;
    opacity: .5;
}

.add {
    display: inline-block;
    margin-left: auto;
    margin-right: 30px;
    transform: none;
    transition: transform .5s ease;

    &.active {
        transform: rotate(225deg);
    }
}

.practice {
    position: relative;
    margin-right: 5px;

    &::before {
        content: '';
        position: absolute;
        inset: -5px;
        background-color: #ffead2;
        opacity: .4;
        border-radius: 7px;
    }
}
</style>