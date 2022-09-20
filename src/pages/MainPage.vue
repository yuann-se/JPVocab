<template>
    <router-view v-slot="{ Component }">
        <transition name="modal">
            <component :is="Component" />
        </transition>
    </router-view>

    <MainHeader />

    <transition name="addPanel">
        <CreateNewWordForm v-if="isAddPanelOpen" />
    </transition>

    <ManageCardsBlock />
    <CardsList />
</template>

<script lang="ts" setup>
import CardsList from "@/components/WordsList.vue";
import { computed } from "vue";
import MainHeader from "@/components/MainHeader.vue";
import ManageCardsBlock from "@/components/ManageCardsBlock.vue";
import store from "@/store";
import CreateNewWordForm from "../components/CreateNewWordForm.vue";

const isAddPanelOpen = computed<boolean>(() => { return store.state.isAddPanelOpen })

</script>

<style lang="scss" scoped>
.addPanel-enter-active,
.addPanel-leave-active {
    transform: none;
    transition: all 0.5s ease;
}

.addPanel-enter-from,
.addPanel-leave-to {
    backdrop-filter: none;
    transform: translateY(-50vh);
}


.modal-enter-active,
.modal-leave-active {
    opacity: 1;
    transition: opacity .2s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>
