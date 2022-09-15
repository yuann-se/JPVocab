<template >
    <div class="card-wrapper" :class="{isChecked: props.word.isChecked}">
        <div class="segment name">
            {{props.word.body}}
        </div>
        <div class="segment reading">
            <span class="readingsList" v-for="item in props.word.reading" :key="item">{{item}}</span>
        </div>
        <div class="segment translation">
            <span class="readingsList" v-for="item in props.word.translation" :key="item">{{item}}</span>
        </div>
        <button class="segment edit" @click="handleEdit">
            <EditWordIcon />
        </button>
        <label class="segment checkbox">
            <input type="checkbox" :checked="word.isChecked" @change="setIsChecked">
            <span class="box">
                <span class="mark">
                    <CheckMarkIcon />
                </span>
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

const handleEdit = () => {
    store.dispatch('setWordToEdit', { ...props.word })
    store.dispatch('setIsAddPanelOpen', true);
}

</script>

<style lang="scss" scoped>
@import '@/assets/styles/WordsListItem.scss';
</style>