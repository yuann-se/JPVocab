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
        <div class="segment progress">
            <ProgressBar class="progressBar" :progress="word.progress" :key="word.progress" />
            <CheckMarkIcon v-if="word.progress === 100" class="learnedCheck" />
            <span v-else>{{props.word.progress}}%</span>
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
import ProgressBar from './ProgressBar.vue';

interface IProps {
    word: IWord
}

const props = defineProps<IProps>()

const setIsChecked = () => {
    store.dispatch('setIsChecked', props.word)
    store.dispatch('scanAllIfAnyChecked')
}

const handleEdit = () => {
    store.dispatch('setWordToEdit', { ...props.word })
    store.dispatch('setIsAddPanelOpen', true);
}

</script>

<style lang="scss" scoped>
@import '@/scss/variables';
@import '@/scss/mixins';

.card-wrapper {
    position: relative;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 30px;
    row-gap: 20px;
    padding: 20px;
    margin-bottom: 20px;

    border-radius: 5px;
    background-color: white;
    transition: background-color .2s ease;

    &.isChecked {
        background-color: $selected;
    }
}

.segment {
    &.name {
        grid-column: 1 / 4;
        font-size: 22px;
    }

    &.reading {
        grid-column: 4 / 7;
        font-size: 18px;
    }

    &.translation {
        grid-column: 7 / 10;
    }

    .readingsList {
        display: block;

        &:not(:last-child) {
            margin-bottom: 7px;
        }
    }

    &.progress {
        grid-column: 10;
        display: flex;
        align-items: center;
        justify-content: center;

        .progressBar {
            position: absolute;
            transform: rotate(-90deg);
        }

        .learnedCheck {
            fill: $greenSat;
            transform: rotate(5deg);

            &:deep(path) {
                stroke: $greenSat;
                stroke-width: 2px;
            }
        }
    }

    &.edit {
        position: relative;
        z-index: 100;
        @include makeLarger;
        grid-column: 11;
    }

    &.checkbox {
        grid-column: 12;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        cursor: pointer;

        &::before {
            content: '';
            position: absolute;
            right: 0;
            width: 50px;
            height: 100%;
        }

        input {
            opacity: 0;
            width: 0;
            height: 0;

            &:checked+.box .mark {
                max-width: 20px;
            }
        }

        .box {
            position: absolute;
            width: 10px;
            height: 10px;
            border: 1px solid $purple66;
        }

        .mark {
            max-width: 0;
            overflow: hidden;
            transition: max-width .2s ease;
            position: absolute;
            left: -4px;
            bottom: -2px;
            font-size: 0;
        }
    }
}
</style>