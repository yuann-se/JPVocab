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
@import '@/scss/variables';

.mainWrapper {
    display: flex;
    align-items: center;
}

.legend {
    margin-right: 10px;
}

.sortWrapper {
    position: relative;
    width: 200px;
    margin-right: 15px;
    border-radius: $borderRadius;
    background-color: $bg;

    * {
        font-size: 16px;
        text-align: start;
    }
}

.optionsWrapper {
    position: absolute;
    z-index: 100;
    top: 17px;
    width: 100%;
    padding-top: 17px;

    display: flex;
    flex-direction: column;

    background-color: $bg;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    overflow: hidden;

    max-height: 0;
    opacity: 0;
    transition: max-height .2s ease, opacity .2s ease;

    &.isOpen {
        max-height: 100px;
        opacity: 1;
        box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    }
}

.option {
    position: relative;
    width: 100%;
    height: 40px;
    padding: 0 15px;
    background-color: $bg;
    transition: background-color .2s ease;

    &.selected {
        display: none;
    }

    &::before {
        content: '';
        position: absolute;
        inset: 0;
    }

    &:hover:not(.main) {
        background-color: $selected;
    }
}

.main {
    position: relative;
    z-index: 200;
    height: 35px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $bg;
    border-radius: $borderRadius;

    svg {
        transform: none;
        transition: transform .2s ease;

        &.isActive {
            transform: rotate(180deg);
        }
    }
}

.sortIcon {

    transform: scale(.8);

    &:last-child {
        transform: rotate(180deg) scale(.8);
        margin-left: 5px;
    }
}
</style>