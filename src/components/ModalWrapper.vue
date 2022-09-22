<template>
    <div class="modalWrapper" @click="handleClose">
        <div v-if="props.isModalOpen" class="content" @click.stop>
            <span class="text">{{props.caption}}</span>
            <slot></slot>

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

useDisableScroll()

interface IProps {
    isModalOpen: boolean
    caption: string
}

const props = defineProps<IProps>()

const emit = defineEmits(['close'])

const handleClose = () => {
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
    width: 350px;
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
    line-height: 1.5;
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