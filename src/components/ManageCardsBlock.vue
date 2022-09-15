<template>
    <div class="wrapper">
        <div class="container">
            <SortBlock />
            <button class="deleteBtn" :disabled="!isAnyChecked" @click="setIsModalOpen(true)">
                <DeleteWordIcon />
            </button>
            <teleport to='#modal'>
                <ModalDelete :isModalOpen="isModalOpen" @close="setIsModalOpen(false)" />
            </teleport>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import DeleteWordIcon from '@/components/icons/DeleteWordIcon.vue';
import store from '@/store';
import ModalDelete from './ModalDelete.vue';
import SortBlock from './SortBlock.vue';

const isAnyChecked = computed<boolean>(() => { return store.state.isAnyChecked })

const isModalOpen = ref<boolean>(false)
const setIsModalOpen = (value: boolean) => isModalOpen.value = value

</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.wrapper {
    position: absolute;
    inset: 0;
    top: 100px;
    height: 50px;
    background-color: white;
}

.container {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
}

.deleteBtn {
    margin-left: auto;

    svg {
        transition: fill .2s ease;
    }

    &:disabled {
        pointer-events: none;

        svg {
            fill: $disabledGrey;
        }
    }
}
</style>