<template>
    <div class="container">
        <button class="card" @click="isBackVisible = !isBackVisible" :class="{active: isBackVisible}">
            <transition name="slide" appear>
                <div class="card-inner" :key="props.i">
                    <div class="card-front">
                        <span class="label">{{from}}</span>
                        <span v-for="item in getData(from)" :key="item">{{item}}</span>
                        <div class="btnsWrapper" :class="{disabled: isBackVisible}">
                            <button class="actionBtn" @click.stop="handleNext(false)">Still learning</button>
                            <button class="actionBtn" @click.stop="handleNext(true)">Know</button>
                        </div>
                    </div>
                    <div class="card-back">
                        <span class="label">{{to}}</span>
                        <span v-for="item in getData(to)" :key="item">{{item}}</span>
                        <div class="btnsWrapper" :class="{disabled: !isBackVisible}">
                            <button class="actionBtn" @click.stop="handleNext(false)">Still learning</button>
                            <button class="actionBtn" @click.stop="handleNext(true)">Know</button>
                        </div>
                    </div>
                </div>
            </transition>
        </button>
    </div>
</template>

<script setup lang="ts">
import store, { IWord } from '@/store';
import { shuffle } from '@/utils';
import { ref, onMounted } from 'vue';
import { useRoute, LocationQueryValue } from 'vue-router';

interface IProps {
    i: number
    wordsArr: IWord[]
}

const props = defineProps<IProps>()
const emit = defineEmits(['increment'])

const isBackVisible = ref<boolean>(false)

const route = useRoute()
const from = route.query.from
const to = route.query.to

onMounted(() => shuffle(props.wordsArr))

const getData = (loc: LocationQueryValue | LocationQueryValue[]) => {
    switch (loc) {
        case ('Word'): {
            let newArr: string[] = []
            newArr.push(props.wordsArr[props.i].body)
            return newArr
        }
        case ('Reading'): return props.wordsArr[props.i].reading
        case ('Translation'): return props.wordsArr[props.i].translation
    }
}

const handleNext = (know: boolean) => {
    if (know) {
        const updatedWord = props.wordsArr[props.i]
        updatedWord.progress += 4
        store.dispatch('editWord', updatedWord)
    }

    emit('increment', know)
    isBackVisible.value = false
}

</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 100px);
}

.btnsWrapper {
    position: absolute;
    z-index: 100;
    bottom: 0;
    left: 0;
    width: 100%;

    &.disabled {
        pointer-events: none;
    }

    .actionBtn {
        width: 50%;
        height: 60px;
        font-size: 20px;
        font-weight: 500;

        &:nth-child(1) {
            background-color: #ffead2;
            color: #d08842;
        }

        &:nth-child(2) {
            background-color: #cce9e4;
            color: #518a81;
        }
    }
}

.card {
    position: relative;
    background-color: transparent;
    width: 100%;
    height: 500px;
    perspective: 1000px;
    margin-bottom: 50px;

    &.active .card-inner {
        transform: rotateX(-180deg);
    }
}

.card-inner {
    position: absolute;
    inset: 0;
    text-align: center;
    transition: transform 0.5s;
    transform-style: preserve-3d;
}

.card-front,
.card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: $black;
    font-size: 40px;

    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 30px;
    background-color: white;
    box-shadow: 2px 3px 5px 0px rgb(0 0 0 / 10%);
    overflow: hidden;

    .label {
        position: absolute;
        top: 20px;
        left: 30px;
        color: #999;
        font-size: 16px;
        font-weight: 500;
    }
}

.card-back {
    transform: rotateX(-180deg);
}

.slide-enter-active,
.slide-leave-active {
    opacity: 1;
    transform: none;
    transition: opacity 1s ease, transform 1s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}
</style>