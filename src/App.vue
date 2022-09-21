<template>
    <router-view></router-view>

    <!-- <router-view v-slot="{ Component }">
        <transition name="main">
            <component :is="Component" />
        </transition>
    </router-view> -->
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import store from './store';

onBeforeMount(() => store.dispatch('initialiseStore'))

</script>

<style lang="scss" scoped>
// .main-enter-active,
// .main-leave-active {
//     opacity: 1;
//     transition: opacity 1s ease;
// }

// .main-enter-from,
// .main-leave-to {
//     opacity: 0;
// }
</style>
