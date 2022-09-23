<template>
    <router-view></router-view>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import store from './store';

onBeforeMount(() => store.dispatch('initialiseStore'))

</script>
