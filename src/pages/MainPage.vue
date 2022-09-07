<template>
    <MainHeader />
    <Transition name="addPanel">
        <CreateNewWordFrom v-if="isAddPanelOpen" />
    </Transition>
    <ManageCardsBlock />
    <CardsList />
</template>

<script lang="ts">
import CreateNewWordFrom from "@/componenst/CreateNewWordFrom.vue";
import CardsList from "@/componenst/CardsList.vue";
import { defineComponent } from "vue";
import MainHeader from "@/componenst/MainHeader.vue";
import ManageCardsBlock from "@/componenst/ManageCardsBlock.vue";

export default defineComponent({
    components: {
        CreateNewWordFrom,
        CardsList,
        MainHeader,
        ManageCardsBlock
    },

    computed: {
        isAddPanelOpen() {
            return this.$store.state.isAddPanelOpen;
        }
    },

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
