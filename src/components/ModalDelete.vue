<template>
    <transition name="modal">
        <div v-if="props.isModalOpen" class="modalWrapper" @click="handleClose">
            <div class="content" @click.stop>
                <span class="text"> Delete selected words?</span>
                <button class="deleteBtn" @click="handleDelete">Delete</button>
                <button class="cancelBtn" @click="handleClose">Cancel</button>
                <button class="closeBtn" @click="handleClose">
                    <CloseIcon />
                </button>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import CloseIcon from '@/components/icons/CloseIcon.vue';
import store from '@/store';

interface IProps {
    isModalOpen: boolean
}

const props = defineProps<IProps>()

const emit = defineEmits(['close'])

const handleClose = () => {
    emit('close')
}

const handleDelete = () => {
    store.dispatch('deleteWords')
    emit('close')
}

</script>

<style lang="scss" scoped>
@import '@/assets/styles/ModalDelete.scss'
</style>