<template>
    <MainHeader />
    <Transition name="addPanel">
        <CreateNewWordFrom v-show="isAddPanelOpen" />
    </Transition>
    <ManageCardsBlock />
    <CardsList />
</template>

<script lang="ts" setup>
import CreateNewWordFrom from "@/components/CreateNewWordFrom.vue";
import CardsList from "@/components/CardsList.vue";
import { computed } from "vue";
import MainHeader from "@/components/MainHeader.vue";
import ManageCardsBlock from "@/components/ManageCardsBlock.vue";
import store from "@/store";

const isAddPanelOpen = computed<boolean>(() => {
    return store.state.isAddPanelOpen;
})

</script>

<style lang="scss">
.addPanel-enter-active,
.addPanel-leave-active {
    transform: none;
    transition: transform 0.5s ease;
}

.addPanel-enter-from,
.addPanel-leave-to {
    transform: translateY(-100%);
}
</style>
