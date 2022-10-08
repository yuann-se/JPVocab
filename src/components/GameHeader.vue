<template>
    <header class="header">
        <div class="container">
            <button class="back" @click="router.push('/')">
                <ArrowBackIcon />
                <HomeIcon />
            </button>
            <span class="counter">{{props.current < props.total ? props.current + 1 :
            props.total}}/{{props.total}}</span>
        </div>
        <span class="progressBar"></span>
    </header>
</template>
<script setup lang="ts">
import router from '@/router';
import { computed } from 'vue';
import ArrowBackIcon from './icons/ArrowBackIcon.vue';
import HomeIcon from './icons/HomeIcon.vue';

interface IProps {
    current: number
    total: number
}

const props = defineProps<IProps>()

const maxWidth = computed(() => { return `${100 / props.total * (props.current + 1)}vw` })

</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

.container {
    position: relative;
    display: flex;
}

.header {
    position: relative;
    height: 100px;
    background-color: white;
    box-shadow: 0 0 5px rgb(0 0 0 / 10%);

    .back {
        position: absolute;
        top: 50%;
        margin-left: 10px;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        opacity: .9;

        &::before {
            content: '';
            position: absolute;
            z-index: -1;
            inset: -5px -10px;
            border-radius: 20px;
            background-color: $selected;
        }
    }

    .counter {
        display: block;
        margin: 0 auto;
        font-size: 20px;
        line-height: 100px;
    }

    .progressBar {
        position: absolute;
        height: 2px;
        left: 0;
        width: 100vw;
        max-width: v-bind('maxWidth');
        bottom: 0;
        left: 0;
        background-color: $purple4F;
        transition: max-width 1s ease;
    }
}

@media (max-width: $bpS) {
    .header {
        height: 80px;

        .counter {
            line-height: 80px;
        }
    }
}
</style>