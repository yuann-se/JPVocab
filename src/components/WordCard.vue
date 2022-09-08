<template >
    <div class="card-wrapper" :class="{isChecked: props.word.isChecked}">
        <div class="segment name">
            {{props.word.body}}
        </div>
        <div class="segment reading">
            {{props.word.reading}}
        </div>
        <div class="segment translation">
            {{props.word.translation}}
        </div>
        <button class="segment edit">
            <EditWordIcon />
        </button>
        <label class="segment checkbox">
            <input type="checkbox" :checked="word.isChecked" @change="setIsChecked">
            <span class="box">
                <CheckMarkIcon class="mark" />
            </span>
        </label>
    </div>
</template>

<script lang="ts" setup>
import store, { IWord } from '@/store';
import EditWordIcon from '@/components/icons/EditWordIcon.vue';
import CheckMarkIcon from '@/components/icons/CheckMarkIcon.vue';

interface IProps {
    word: IWord
}

const props = defineProps<IProps>()

const setIsChecked = () => store.dispatch('setIsChecked', props.word)

</script>

<style lang="scss" scoped>
@import '@/assets/styles/WordCard.scss';
</style>