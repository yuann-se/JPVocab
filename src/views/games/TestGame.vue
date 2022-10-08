<template>
    <div class="container">
        <div class="card">
            <transition name="slide" appear>
                <div class="card-inner" :key="props.current">
                    <span v-for="item in getData(from)" :key="item">{{item}}</span>
                    <div class="btnsWrapper">
                        <button v-for="option, ind in optionsArr" class="actionBtn" :key="ind"
                            :class="{correct: isChoiceMade && ((to === 'Word' && props.wordsArr[props.current].body === option[0]) || (to === 'Reading' && props.wordsArr[props.current].reading === option) || (to === 'Translation' && props.wordsArr[props.current].translation === option))}"
                            @click.stop="handleNext(option)($event)">
                            <span v-for="(item, ind) in option" :key="ind">{{item}}<span
                                    v-if="ind + 1 < option.length">,&ensp;</span>
                            </span>
                        </button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import store, { IWord } from '@/store';
import { shuffle } from '@/utils';
import { ref } from 'vue';
import { useRoute, LocationQueryValue } from 'vue-router';

interface IProps {
    current: number
    wordsArr: IWord[]
}

const props = defineProps<IProps>()

const isChoiceMade = ref(false)

const route = useRoute()
const from = route.query.from
const to = route.query.to

const getData = (loc: LocationQueryValue | LocationQueryValue[]) => {
    switch (loc) {
        case ('Word'): {
            let newArr: string[] = []
            newArr.push(props.wordsArr[props.current].body)
            return newArr
        }
        case ('Reading'): return props.wordsArr[props.current].reading
        case ('Translation'): return props.wordsArr[props.current].translation
    }
}

const getOptions = () => {
    const correct = props.wordsArr[props.current]
    const notCorrect = props.wordsArr.filter((item, ind) => ind !== props.current && correct.body !== item.body && correct.reading !== item.reading && correct.translation !== item.translation)
    const shuffledNotCorrect: IWord[] = shuffle(notCorrect)

    const optArr = shuffle([correct, shuffledNotCorrect[0], shuffledNotCorrect[1], shuffledNotCorrect[2]])
    let options: string[][] = []
    if (to === 'Word') optArr.forEach((item) => options.push([item.body]))
    else if (to === 'Reading') optArr.forEach((item) => options.push(item.reading))
    else optArr.forEach((item) => options.push(item.translation))
    return options
}

const optionsArr = ref(getOptions())

const emit = defineEmits(['increment'])

const handleNext = (option: string[]) => (e: Event) => {
    isChoiceMade.value = true
    const target = e.target as HTMLButtonElement;
    if ((to === 'Word' && props.wordsArr[props.current].body === option[0]) || (to === 'Reading' && props.wordsArr[props.current].reading === option) || (to === 'Translation' && props.wordsArr[props.current].translation === option)) {
        setTimeout(() => {
            emit('increment', true)
        }, 1000);
        const updatedWord = props.wordsArr[props.current]
        if (updatedWord.progress === 100) return
        updatedWord.progress += 4
        if (updatedWord.progress > 100) updatedWord.progress = 100
        store.dispatch('editWord', updatedWord)

    } else {
        target.classList.add('wrong')
        setTimeout(() => {
            emit('increment', false)
        }, 1000);
    }
    setTimeout(() => {
        optionsArr.value = getOptions()
        isChoiceMade.value = false
    }, 1000);
}

</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 100px);
}

.card {
    position: relative;
    width: 100%;
    height: 500px;
    margin-top: 15px;
    background-color: transparent;

    .card-inner {
        position: absolute;
        inset: 0;
        text-align: center;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: $black;
        font-size: 40px;

        background-color: white;
        border-radius: 30px;
        box-shadow: 2px 3px 5px 0px rgb(0 0 0 / 10%);

        &>span {
            transform: translateY(-100%);
        }
    }
}

.btnsWrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 10px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &.disabled {
        pointer-events: none;
    }

    .actionBtn {
        width: calc(50% - 5px);
        min-height: 60px;
        margin-bottom: 10px;
        padding: 5px 15px;
        font-size: 22px;
        font-weight: 500;
        outline: 1px solid $disabledGrey;
        border-radius: 30px;
        transition: all .2s ease;

        &:hover {
            background-color: $selected;
            color: $purple4F;
            box-shadow: 0px 0px 4px 1px $purple66;
        }

        &.correct {
            background-color: #cce9e480;
            box-shadow: 0px 0px 4px 1px $greenDark;
            color: $greenDark;
        }

        &.wrong {
            background-color: #d84f6a30;
            box-shadow: 0px 0px 4px 1px $red;
            color: $red;
        }
    }
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

@media (max-width: $bpS) {
    .btnsWrapper .actionBtn {
        font-size: 18px;
    }
}
</style>