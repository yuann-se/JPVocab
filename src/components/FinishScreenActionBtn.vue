<template>
    <button class="actionBtn" @click="handleClick"
        :style="props.btnName === 'continue' && !props.toRepeat ? { display: 'none'} : {}">
        <component :is="getIcon()"></component>
        <div>
            <p class="title">{{props.title}}</p>
            <p class="descr">{{props.descr}}</p>
        </div>
    </button>
</template>

<script setup lang="ts">
import router from '@/router';
import ChooseGameIconVue from './icons/ChooseGameIcon.vue';
import ContinueIconVue from './icons/ContinueIcon.vue';
import ListIconVue from './icons/ListIcon.vue';
import RestartIconVue from './icons/RestartIcon.vue';


interface IProps {
    title: string
    descr: string
    btnName: string
    wordsCount: number
    toRepeat: number
}

const getIcon = () => {
    switch (props.btnName) {
        case ('continue'): return ContinueIconVue
        case ('restart'): return RestartIconVue
        case ('choose'): return ChooseGameIconVue
        case ('home'): return ListIconVue
    }
}

const emit = defineEmits(['continue', 'restart'])

const props = defineProps<IProps>()

const handleClick = () => {
    switch (props.btnName) {
        case ('continue'): return emit('continue')
        case ('restart'): return emit('restart')
        case ('choose'): return router.push('/selectGame')
        case ('home'): return router.push('/')
    }
}

</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

.actionBtn {
    display: flex;
    align-items: center;
    width: 100%;
    height: fit-content;
    min-height: 100px;
    padding: 15px;
    text-align: start;

    background-color: $bg;
    transition: background-color .2s ease;
    border-radius: 20px;
    box-shadow: 1px 1px 5px 2px rgb(0 0 0 / 10%);

    &:hover {
        background-color: $selected;
    }

    &:not(:last-child) {
        margin-bottom: 20px;
    }

    .title {
        margin-bottom: 3px;
        font-weight: 500;
        font-size: 20px;
    }

    .descr {
        font-size: 16px;
    }

    svg {
        margin-right: 20px;
        min-width: 30px;
    }
}

@media (max-width: $bpL) {
    .actionBtn {
        svg {
            min-width: 25px;
            margin-right: 15px;
        }
    }
}
</style>