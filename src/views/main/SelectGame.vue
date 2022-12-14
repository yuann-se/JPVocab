<template>
    <div class="modalWrapper" @click="handleClose" v-disable-scroll>
        <div class="content" @click.stop>

            <button class="closeBtn" @click="handleClose">
                <CloseIcon />
            </button>
            <ul class="gamesList">
                <li class="gameItemWrapper">
                    <button class="gameItem" @click="selectedGame = 'practice/flashcards'"
                        :class="{selected: selectedGame === 'practice/flashcards'}">
                        <FlashCardsIcon />
                        <span>Flashcards</span>
                    </button>
                </li>

                <li class="gameItemWrapper">
                    <button class="gameItem" @click="selectedGame = 'practice/test'"
                        :class="{selected: selectedGame === 'practice/test'}">
                        <TestIcon />
                        <span>Test</span>
                    </button>
                </li>

                <li class="gameItemWrapper"><button disabled class="gameItem">game_name</button></li>
                <li class="gameItemWrapper"><button disabled class="gameItem">game_name</button></li>
            </ul>

            <transition name="options">
                <div class="options">

                    <FlashcardsOption v-for="(opt, ind) in optionsArr" :key="ind" :option="opt"
                        @click="handleClick(ind)" :class="{selected: selectedOption === ind}" />

                    <router-link :to="{path: selectedGame, query: {'from': from, 'to': to}}" class="startBtn">
                        Start!</router-link>
                </div>
            </transition>

        </div>
    </div>
</template>

<script lang="ts" setup>
import CloseIcon from '@/components/icons/CloseIcon.vue';
import router from '@/router';
import { ref } from 'vue';
import FlashCardsIcon from '@/components/icons/FlashCardsIcon.vue';
import TestIcon from '@/components/icons/TestIcon.vue';
import FlashcardsOption from '@/components/FlashcardsOption.vue';

export interface IOption {
    fromOpt: string
    toOpt: string
    turned: boolean
}

const handleClose = () => router.push('/')

const from = ref<string>('Word')
const to = ref<string>('Translation')
const selectedOption = ref<number>(0)
const selectedGame = ref<string>('practice/flashcards')

const optionsArr = ref<IOption[]>([
    { fromOpt: 'Word', toOpt: 'Translation', turned: false },
    { fromOpt: 'Word', toOpt: 'Reading', turned: false },
    { fromOpt: 'Reading', toOpt: 'Translation', turned: false }
])

const handleClick = (optNumber: number) => {
    if ((selectedOption.value === optNumber && optionsArr.value[optNumber].turned) || (selectedOption.value !== optNumber && !optionsArr.value[optNumber].turned)) {
        from.value = optionsArr.value[optNumber].fromOpt
        to.value = optionsArr.value[optNumber].toOpt
        optionsArr.value[optNumber].turned = false

    } else {
        from.value = optionsArr.value[optNumber].toOpt
        to.value = optionsArr.value[optNumber].fromOpt
        optionsArr.value[optNumber].turned = true

    }
    selectedOption.value = optNumber
}

const height = () => {
    switch (selectedGame.value) {
        case ('practice/flashcards'): return '20px'
        case ('practice/test'): return '110px'
    }
}

</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.modalWrapper {
    @include modalOverlay;
    overflow-y: scroll;
    padding: 50px 70px 50px 50px;
}

.content {
    position: relative;
    display: flex;
    padding: 50px;
    width: 100%;
    max-width: 1000px;

    border-radius: 5px;
    background-color: white;
}

.closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
}

.gamesList {
    width: 100%;
    max-width: 300px;
}

.gameItem {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    width: 100%;
    height: 70px;
    background-color: $purple66;
    outline: transparent;
    outline-offset: 0;
    transition: outline .2s ease, outline-offset .2s ease;

    text-align: center;
    font-size: 30px;
    line-height: 50px;
    color: white;
    border-radius: 5px;

    &:disabled {
        background-color: $disabledGrey;
        pointer-events: none;
    }

    svg {
        width: 45px;
        margin-right: 15px;
    }

    &.selected {
        outline: 2px solid $purple66;
        outline-offset: 3px;
    }
}

.gameItemWrapper {
    background-color: $bg;
    border-radius: 5px;

    &:not(:last-child) {
        margin-bottom: 20px;
    }
}

.options {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-width: 400px;
    padding: 20px;
    margin-left: 50px;
    border-radius: 15px;
    will-change: width;
    background-color: $bg;
    box-shadow: 0 0 4px 1px $purple66;

    &::before {
        content: '';
        position: absolute;
        left: -11px;
        top: v-bind(height());
        width: 30px;
        height: 30px;
        box-shadow: 4px 4px 4px -3px #664dce;
        transform: rotate(135deg);
        background-color: $bg;
        transition: top .2s ease;
    }
}

.startBtn {
    display: block;
    width: 150px;
    height: 50px;
    margin: 0 auto;
    padding: 5px 15px;

    font-size: 20px;
    font-weight: 700;
    color: white;
    line-height: 40px;
    text-align: center;
    background-color: $pinkF8;
}

.modal-enter-active,
.modal-leave-active {
    opacity: 1;
    transition: opacity .2s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}


.options-enter-active,
.options-leave-active {
    opacity: 1;
    max-width: 500px;
    transition: max-width .2s ease, opacity .2s ease;
}

.options-enter-from,
.options-leave-to {
    opacity: 0;
    max-width: 0;
}

@media (max-width: $bpL) {

    .modalWrapper {
        align-items: flex-start;
        padding: 50px;
    }

    .content {
        flex-direction: column;
        align-items: center;
        width: fit-content;
    }

    .gamesList {
        max-width: none;
        margin-bottom: 30px;
    }

    .options {
        margin-left: 0;
        box-shadow: 1px 1px 5px 1px rgb(0 0 0 / 10%);

        &::before {
            display: none;
        }
    }
}

@media (max-width: $bpM) {

    .content {
        padding: 30px;
    }

    .options {
        min-width: 350px;
        padding: 10px;
    }

    .optionWrapper {
        font-size: 22px;
        padding: 10px;
        margin-bottom: 10px;
    }

    .gamesList {
        margin-bottom: 20px;
    }

    .gameItemWrapper:not(:last-child) {
        margin-bottom: 15px;
    }
}

@media (max-width: $bpS) {

    .modalWrapper {
        padding: 0;
        background-color: white;
    }

    .content {
        padding: 50px;
        width: 100%;
        border-radius: 0;
    }

    .options {
        min-width: 280px;
    }

    .optionWrapper {
        font-size: 18px;
    }

    .gamesList {
        min-width: 280px;
    }

    .gameItem {
        font-size: 25px;
    }

    .gameItemWrapper:not(:last-child) {
        margin-bottom: 15px;
    }

}
</style>