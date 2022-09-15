<template>
    <div class="mainWrapper">
        <span class="legend">Sort:</span>
        <div class="sortWrapper" @click.stop>
            <button @click="setIsOpen(!isOpen)" class="option main">
                <span>{{sortBy}}</span>
                <select-arrow-icon :class="{isActive: isOpen}" />
            </button>
            <div class="optionsWrapper" :class="{isOpen: isOpen}">
                <button v-for="option in options" :key="option" class="option" :class="{selected: option === sortBy}"
                    @click="setSortBy(option)">{{option}}</button>
            </div>
        </div>
        <button class="sortIcon" @click="setSortDirection(ESortDirection.ascending)">
            <sort-arrow-icon :isActive="sortDirection === ESortDirection.ascending" />
        </button>
        <button class="sortIcon" @click="setSortDirection(ESortDirection.descending)">
            <sort-arrow-icon :isActive="sortDirection === ESortDirection.descending" />
        </button>
    </div>
</template>

<script lang="ts" setup>
import store, { ESortBy, ESortDirection } from '@/store';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import SelectArrowIcon from './icons/SelectArrowIcon.vue';
import SortArrowIcon from './icons/SortArrowIcon.vue';

const options = [ESortBy.alphabetical, ESortBy.createdDate, ESortBy.progress]

const sortBy = computed(() => { return store.state.sortBy })
const sortDirection = computed(() => { return store.state.sortDirection })

const isOpen = ref<boolean>(false);
const setIsOpen = (value: boolean) => { isOpen.value = value }

const setSortBy = (opt: ESortBy) => {
    store.dispatch('setSortBy', opt)
    setIsOpen(false)
}

const setSortDirection = (dir: ESortDirection) => {
    store.dispatch('setSortDirection', dir)
}

const closeModal = () => setIsOpen(false)

onMounted(() => {
    document.addEventListener('click', closeModal)
})

onUnmounted(() => {
    document.removeEventListener('click', closeModal)
})

</script>

<style lang="scss" scoped>
@import '@/assets/styles/SortBlock.scss';
</style>