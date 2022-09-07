<template >
    <div class="card-wrapper" :class="{isChecked: word.isChecked}">
        <div class="segment name">
            {{word.body}}
        </div>
        <div class="segment reading">
            {{word.reading}}
        </div>
        <div class="segment translation">
            {{word.translation}}
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

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IWord } from '@/store';
import EditWordIcon from '@/icons/EditWordIcon.vue';
import CheckMarkIcon from '../icons/CheckMarkIcon.vue';

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<IWord>,
            required: true
        }
    },
    setup(props) {
        props.word;
    },

    methods: {
        setIsChecked() {
            this.$store.commit('setIsChecked', this.word)
        }
    },
    components: { EditWordIcon, CheckMarkIcon }
})
</script>
<style lang="scss" scoped>
@import '@/variables';
@import '@/mixins';

.card-wrapper {
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
        grid-column: 1 / 3;
    }

    &.reading {
        grid-column: 4 / 6;
    }

    &.translation {
        grid-column: 7 / 9;
    }

    &.edit {
        @include makeLarger;
        grid-column: 11;
    }

    &.checkbox {
        grid-column: 12;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        cursor: pointer;

        input {
            opacity: 0;
            width: 0;
            height: 0;

            &:checked+.box .mark {
                max-height: 20px;
            }
        }

        .box {
            position: absolute;
            width: 10px;
            height: 10px;
            border: 1px solid $purple66;
        }

        .mark {
            max-height: 0;
            transition: max-height .2s ease;
            position: absolute;
            left: -3px;
            bottom: -1px;
            font-size: 0;
        }
    }
}
</style>