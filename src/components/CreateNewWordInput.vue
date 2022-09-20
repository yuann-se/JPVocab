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
@import '@/assets/styles/CreateNewWordInput.scss';
</style>