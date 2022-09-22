<template>
    <div class="wrapper">
        <div class="container">
            <SortBlock />

            <div class="btnsWrapper">
                <button class="actionBtn showLearned" @click="handleShowLearned">
                    <ShowIcon v-if="showLearned" />
                    <HideIcon v-else />
                    <span>{{showLearned ? 'Hide Learned' : 'Show Learned'}}</span>
                </button>

                <button class="actionBtn removeLearned" :disabled="!isAnyChecked"
                    @click="setIsModalOpen(true, 'removeLearned')">
                    <RemoveIcon />
                    <span>Learning</span>
                </button>

                <button class="actionBtn learned" :disabled="!isAnyChecked" @click="setIsModalOpen(true, 'addLearned')">
                    <OkIcon />
                    <span>Learned</span>
                </button>

                <button class="actionBtn delete" :disabled="!isAnyChecked" @click="setIsModalOpen(true, 'delete')">
                    <DeleteWordIcon />
                </button>
            </div>

            <teleport to='#modal'>
                <transition name="modal">
                    <ModalWrapper :is-modal-open="isModalOpen.open" @close="setIsModalOpen(false)"
                        v-if="isModalOpen.open && isModalOpen.modalName === 'removeLearned'"
                        :caption="'Remove selected words from the Learned Words List?'">
                        <button class="removeLearnedBtn" @click="handleRemoveLearned">Remove</button>
                    </ModalWrapper>
                </transition>

                <transition name="modal">
                    <ModalWrapper :is-modal-open="isModalOpen.open"
                        v-if="isModalOpen.open && isModalOpen.modalName === 'addLearned'" @close="setIsModalOpen(false)"
                        :caption="'Add selected words to the Learned Words List?'">
                        <button class="addLearnedBtn" @click="handleAddLearned">Add</button>
                    </ModalWrapper>
                </transition>

                <transition name="modal">
                    <ModalWrapper :is-modal-open="isModalOpen.open" @close="setIsModalOpen(false)"
                        v-if="isModalOpen.open && isModalOpen.modalName === 'delete'"
                        :caption="'Delete selected words?'">
                        <button class="deleteBtn" @click="handleDelete">Delete</button>
                    </ModalWrapper>
                </transition>
            </teleport>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import DeleteWordIcon from '@/components/icons/DeleteWordIcon.vue';
import store from '@/store';
import SortBlock from './SortBlock.vue';
import ModalWrapper from './ModalWrapper.vue';
import OkIcon from './icons/OkIcon.vue';
import RemoveIcon from './icons/RemoveIcon.vue';
import HideIcon from './icons/HideIcon.vue';
import ShowIcon from './icons/ShowIcon.vue';

const isAnyChecked = computed<boolean>(() => { return store.state.isAnyChecked })
const showLearned = computed<boolean>(() => { return store.state.showLearned })

const isModalOpen = ref({ open: false, modalName: '' })
const setIsModalOpen = (value: boolean, modalName = '') => {
    isModalOpen.value.open = value
    isModalOpen.value.modalName = modalName
}

const handleDelete = () => {
    store.dispatch('deleteWords')
    setIsModalOpen(false)
}

const handleAddLearned = () => {
    store.dispatch('addToLearned')
    setIsModalOpen(false)
}

const handleRemoveLearned = () => {
    store.dispatch('removeFromLearned')
    setIsModalOpen(false)
}

const handleShowLearned = () => {
    store.dispatch('setShowLearned', !showLearned.value)
}

</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.wrapper {
    position: fixed;
    z-index: 300;
    top: 90px;
    width: 100vw;
    height: 50px;
    background-color: white;
    box-shadow: 0 0 10px 1px rgb(0 0 0 / 10%);
}

.container {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
}

.btnsWrapper {
    display: flex;
}

.actionBtn {

    &.learned,
    &.removeLearned,
    &.showLearned {
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 30px;

        svg {
            fill: $greenSat;
            transform: scale(.9);
        }

        span {
            font-size: 16px;
            line-height: 20px;
            color: $greenSat;
            transition: color .2s ease;
        }

        &::before {
            content: '';
            position: absolute;
            z-index: -1;
            inset: -1px -6px -1px -3px;
            background-color: $greenLight;
            opacity: .2;
            border-radius: 20px;
            transition: background-color .2s ease, opacity .2s ease;
        }
    }

    &.showLearned {
        span {
            color: $pinkDE;
        }

        &::before {
            background-color: $selected;
            opacity: .4;
        }

        svg {
            margin-right: 2px;
        }
    }

    &.removeLearned {
        span {
            color: $orangeSat;
        }

        svg {
            fill: $orangeSat;
            transform: scale(.75);
        }

        &::before {
            background-color: $orangeLight;
            opacity: .4;
        }
    }

    svg {
        transition: fill .2s ease;
    }

    &:disabled {
        pointer-events: none;

        svg {
            fill: $disabledGrey;
        }

        span {
            color: $disabledGrey;
        }

        &::before {
            background-color: $disabledGrey;
            opacity: .1;
        }
    }
}

.deleteBtn,
.addLearnedBtn,
.removeLearnedBtn {
    display: block;
    width: 100px;
    height: 40px;
    margin: 0 auto;
    margin-bottom: 7px;

    color: white;
    background-color: $red;
    font-size: 18px;
}

.removeLearnedBtn {
    background-color: $orangeSat;
}

.addLearnedBtn {
    background-color: $greenSat;
}

.modal-enter-active,
.modal-leave-active {
    opacity: 1;
    transition: opacity .2s ease;

    &:deep(>div) {
        transform: none;
        transition: transform .2s ease;
    }
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;

    &:deep(>div) {
        transform: scale(.8);
    }
}
</style>