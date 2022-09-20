<template>
    <button class="optionWrapper">
        <span>
            {{props.option.fromOpt}}
        </span>
        <button class="switch" :class="{turned: props.option.turned}">
            <SwitchArrowIcon />
        </button>
        <span>
            {{props.option.toOpt}}
        </span>
    </button>
</template>

<script setup lang="ts">
import SwitchArrowIcon from './icons/SwitchArrowIcon.vue';
import { IOption } from './ModalSelectGame.vue';

interface IProps {
    option: IOption
}

const props = defineProps<IProps>()

</script>
<style lang="scss" scoped>
@import '@/scss/variables';

.optionWrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 15px;
    padding: 10px 20px;
    width: 100%;

    font-size: 24px;
    background-color: transparent;
    transition: background-color .2s ease;
    border-radius: 30px;

    &.selected {
        background-color: $selected;
    }
}

.switch {
    transform: none;
    transition: transform .2s ease;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    &.turned {
        transform: translateX(-50%) translateY(-50%) rotate(-180deg);
    }
}
</style>