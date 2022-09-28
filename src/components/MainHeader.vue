<template>
    <header class="header">
        <div class="container">

            <img class="logo" src="../assets/logo.png" alt="JPVocab Logo">

            <HeaderSearch />

            <button class="add" @click="openAddPanel" :class="{active: isAddPanelOpen}" aria-label="Add word">
                <AddNewWordIcon />
            </button>

            <router-link to="/selectGame" class="practice" aria-label="Practice">
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
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 500;
    height: 90px;
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
    font-size: 0;

    &::before {
        content: '';
        position: absolute;
        inset: -5px;
        background-color: #ffead2;
        opacity: .4;
        border-radius: 7px;
    }
}

@media (max-width: $bpM) {
    .add {
        position: fixed;
        right: 50px;
        bottom: 50px;
        transform: scale(1.2);
        margin: 0;

        &:deep(circle) {
            opacity: .9;
        }

        &:deep(rect) {
            fill: $orangeSat;
        }

        &.active {
            transform: scale(1.2) rotate(225deg);
        }
    }

    .practice {
        margin-left: auto;
    }

    .logo {
        margin-right: 0;
    }
}

@media (max-width: $bpS) {
    .header {
        height: 70px;
    }

    .logo {
        width: 45px;
    }

    .searchInput {
        height: 40px;
        min-width: 0;
    }

    .practice {
        &:deep(svg) {
            width: 30px;
        }
    }
}
</style>