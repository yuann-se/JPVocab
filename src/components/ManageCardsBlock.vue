<template>
    <div class="wrapper">
        <div class="container">
            <SortBlock />
            <button class="deleteBtn" :disabled="!isAnyChecked" @click="setIsModalOpen(true)">
                <DeleteWordIcon />
            </button>
            <teleport to='#modal'>
                <transition name="modal">
                    <ModalDelete v-if="isModalOpen" :isModalOpen="isModalOpen" @close="setIsModalOpen(false)" />
                </transition>
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

.modal-enter-active,
.modal-leave-active {
    opacity: 1;
    transition: opacity .2s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.wrapper {
    position: absolute;
    width: 100vw;
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