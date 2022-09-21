<template>
    <div class="modalWrapper" @click="handleClose">
        <div v-if="props.isModalOpen" class="content" @click.stop>
            <span class="text"> Delete selected words?</span>
            <button class="deleteBtn" @click="handleDelete">Delete</button>
            <button class="cancelBtn" @click="handleClose">Cancel</button>
            <button class="closeBtn" @click="handleClose">
                <CloseIcon />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CloseIcon from '@/components/icons/CloseIcon.vue';
import { useDisableScroll } from '@/utils';
import store from '@/store';

useDisableScroll()

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
@import '@/scss/variables';
@import '@/scss/mixins';

.modalWrapper {
    @include modalOverlay;
}

.content {
    position: relative;
    width: 300px;
    height: 200px;
    padding: 30px;

    text-align: center;
    border-radius: 5px;
    background-color: white;
}

.text {
    display: block;
    margin-bottom: 30px;
    margin-top: 20px;
    font-size: 20px;
}

.deleteBtn {
    display: block;
    width: 100px;
    height: 40px;
    margin: 0 auto;
    margin-bottom: 7px;

    color: white;
    background-color: $red;
    font-size: 18px;
}

.cancelBtn {
    font-size: 15px;
    text-decoration: underline;
}

.closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>