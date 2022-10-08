<template>
    <div class="wrapper">
        <div class="container">
            <SortBlock />

            <button class="burger" @click="showMenu = !showMenu"
                :aria-label="showMenu ? 'Hide options' : 'Show options'">
                <BurgerIcon />
            </button>

            <div class="btnsWrapper" :class="{isVisible: showMenu}">
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

                <button class="actionBtn delete" :disabled="!isAnyChecked" @click="setIsModalOpen(true, 'delete')"
                    aria-label="Delete words">
                    <DeleteWordIcon />
                    <span v-if="showMenu">Delete</span>
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
import BurgerIcon from './icons/BurgerIcon.vue';

const isAnyChecked = computed<boolean>(() => { return store.state.checkedCount > 0 })
const showLearned = computed<boolean>(() => { return store.state.showLearned })
const showMenu = ref(false)

const isModalOpen = ref({ open: false, modalName: '' })
const setIsModalOpen = (value: boolean, modalName = '') => {
    isModalOpen.value.open = value
    isModalOpen.value.modalName = modalName
}

const handleDelete = () => {
    store.dispatch('deleteWords')
    setIsModalOpen(false)
    showMenu.value = false
}

const handleAddLearned = () => {
    store.dispatch('addToLearned')
    setIsModalOpen(false)
    showMenu.value = false
}

const handleRemoveLearned = () => {
    store.dispatch('removeFromLearned')
    setIsModalOpen(false)
    showMenu.value = false
}

const handleShowLearned = () => {
    store.dispatch('setShowLearned', !showLearned.value)
    showMenu.value = false
}

</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

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
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
}

.btnsWrapper {
    display: flex;
}

.burger {
    display: none;
}

.showLearned {
    @include actionBtn($pinkDE, $selected, .4, scale(.75))
}

.removeLearned {
    @include actionBtn($orangeSat, $orangeLight, .4, scale(.75))
}

.learned {
    @include actionBtn($greenSat, $greenLight, .2, scale(.9))
}

.delete {
    @include actionBtn($red, $red, .05, scale(.7));

    &::before {
        inset: -1px -3px;
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

@media (max-width: $bpL) {
    .burger {
        display: block;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            z-index: -1;
            inset: -5px;
            background-color: $selected;
            border-radius: 50%;
        }
    }

    .btnsWrapper {
        position: absolute;
        top: 50px;
        right: 50px;
        padding: 20px;
        flex-direction: column;
        width: 300px;
        height: fit-content;

        background-color: white;
        visibility: hidden;
        opacity: 0;
        transform: translateY(-50px);
        transition: all .2s ease;
        box-shadow: 0 0 10px 1px rgb(0 0 0 / 10%);
        border-radius: 10px;

        &.isVisible {
            visibility: visible;
            opacity: 1;
            transform: none;
        }

        .actionBtn {
            margin-right: 0;

            &::before {
                z-index: 0;
            }

            &:not(:last-child) {
                margin-bottom: 10px;
            }

            span {
                font-size: 18px;
                line-height: 24px;
            }
        }
    }
}

@media (max-width: $bpM) {

    .btnsWrapper {
        right: 30px;
    }
}

@media (max-width: $bpS) {
    .wrapper {
        top: 70px;
    }

    .btnsWrapper {
        right: 15px;
    }
}
</style>