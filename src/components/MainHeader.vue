<template>
    <header class="header">
        <div class="container">
            <img class="logo" src="../assets/logo.png" alt="Logo">
            <HeaderSearch />
            <button class="add" @click="openAddPanel" :class="{active: isAddPanelOpen}">
                <AddNewWordIcon />
            </button>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import HeaderSearch from './HeaderSearch.vue';
import AddNewWordIcon from '@/components/icons/AddNewWordIcon.vue';
import store from '@/store';

const isAddPanelOpen = computed<boolean>(() => { return store.state.isAddPanelOpen })
const openAddPanel = () => store.dispatch('setIsAddPanelOpen', !store.state.isAddPanelOpen);

</script>

<style lang="scss" scoped>
@import '@/variables';

.header {
    position: relative;
    z-index: 200;
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
    transform: none;
    transition: transform .5s ease;

    &.active {
        transform: rotate(225deg);
    }

    svg rect {
        opacity: .5;
        fill: black;
    }
}
</style>