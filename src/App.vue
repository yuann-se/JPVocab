<template>
    <router-view></router-view>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import router from './router/router';
import store from './store';

onBeforeMount(() => store.dispatch('initialiseStore'))

router.beforeEach((to, from, next) => {
    document.title = to.name?.toString() || 'JPVocab';
    next();
});

</script>
