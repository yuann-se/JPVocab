<template>
    <form @submit.prevent="addItem" class="inputForm">
        <label for="{{props.inputName}}">{{props.inputName}}</label>
        <div class="inputWrapper">
            <input type="text" @change="handleChange" :value="props.inputValue" autocomplete="off"
                name={{props.inputName}}>
            <button class="addReading">
                <DeleteReadingIcon />
            </button>
        </div>
        <transition-group name="item" tag="ul" class="list" v-if="props.list">
            <li class="listItem" v-for="item in props.list" :key="item">
                <span>{{item}}</span>
                <button type="button" @click="deleteItem(item)">
                    <DeleteReadingIcon />
                </button>
            </li>
        </transition-group>
    </form>
</template>

<script lang="ts" setup>

import DeleteReadingIcon from './icons/DeleteReadingIcon.vue';

interface IProps {
    list: string[]
    inputName: string
    inputValue: string
}

const props = defineProps<IProps>()

const emit = defineEmits(['update', 'addItem', 'deleteItem'])

const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.value.trim()) emit('update', { payload: target.value.trim(), inputName: props.inputName })
}

const addItem = () => { emit('addItem', { inputName: props.inputName }) }

const deleteItem = (item: string) => { emit('deleteItem', { payload: item, inputName: props.inputName }) }

</script>
<style lang="scss">
@import '@/scss/variables';

.inputForm {
    display: flex;
    flex-direction: column;
}

.inputWrapper {
    position: relative;
    display: flex;
    overflow: hidden;
    margin-bottom: 15px;

    input {
        flex-grow: 1;
    }

    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2px;
        max-width: 0;
        transition: max-width .2s ease;
        background-color: $purple4F;
    }

    &:focus-within::before {
        max-width: 1000px;
    }
}

.addReading {
    position: relative;
    z-index: 100;
    width: 40px;
    height: 40px;
    background-color: $selected;

    svg {
        transform: rotate(45deg);
    }

}

.list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
}

.listItem {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 5px;
    margin-bottom: 5px;
    height: 25px;
    width: fit-content;

    font-size: 14px;
    border-radius: 15px;
    background-color: $selected;

    &:not(:last-child) {
        margin-right: 5px;
    }

    span {
        margin-right: 5px;
    }

    button {
        scale: .9;
    }
}

.item-enter-active,
.item-leave-active {
    opacity: 1;
    transition: opacity 0.2s ease;
}

.item-enter-from,
.item-leave-to {
    opacity: 0;
}
</style>