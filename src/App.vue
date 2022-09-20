<template>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import store from './store';

onBeforeMount(() => store.dispatch('initialiseStore'))

</script>

<style lang="scss">

</style>
