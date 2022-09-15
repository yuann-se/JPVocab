<template>
    <input class="search-input" type="text" v-model.trim="searchQuery">
</template>

<script lang="ts" setup>
import store from '@/store';
import { computed, WritableComputedRef } from 'vue'

const searchQuery: WritableComputedRef<string> = computed<string>({
    get(): string {
        return store.state.searchQuery
    },
    set(value: string): void {
        store.dispatch('setSearchQuery', value)
    },
});

</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.search-input {
    height: 50px;
    min-width: 350px;
    padding: 0 15px;

    font-size: 20px;
    color: $black;
    background-color: white;
    border-radius: 30px;
}
</style>