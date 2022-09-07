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

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderSearch from './HeaderSearch.vue';
import AddNewWordIcon from '../icons/AddNewWordIcon.vue';

export default defineComponent({
    components: { HeaderSearch, AddNewWordIcon },

    computed: {
        isAddPanelOpen() {
            return this.$store.state.isAddPanelOpen
        }
    },

    methods: {
        openAddPanel() {
            this.$store.commit('setIsAddPanelOpen', !this.$store.state.isAddPanelOpen);
        }
    }
})
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
}
</style>