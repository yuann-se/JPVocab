<template>
    <div class="modalWrapper" @click="handleClose">
        <div class="content" @click.stop>

            <button class="closeBtn" @click="handleClose">
                <CloseIcon />
            </button>
            <ul class="gamesList">
                <li class="gameItemWrapper">
                    <button class="gameItem" @click="isOptionsOpen = !isOptionsOpen">
                        <FlashCardsIcon />
                        <span>Flashcards</span>
                    </button>
                </li>

                <li class="gameItemWrapper"><button disabled class="gameItem">game_name</button></li>
                <li class="gameItemWrapper"><button disabled class="gameItem">game_name</button></li>
                <li class="gameItemWrapper"><button disabled class="gameItem">game_name</button></li>
            </ul>

            <transition name="options">
                <div class="options" v-if="isOptionsOpen">

                    <FlashcardsOption v-for="(opt, ind) in optionsArr" :key="ind" :option="opt"
                        @click="handleClick(ind)" :class="{selected: selectedOption === ind}" />

                    <router-link :to="{name: 'flashcards', query: {'from': from, 'to': to}}" class="startBtn">
                        Start!</router-link>
                </div>
            </transition>

        </div>
    </div>
</template>

<script lang="ts" setup>
import CloseIcon from '@/components/icons/CloseIcon.vue';
import { useDisableScroll } from '@/utils';
import router from '@/router/router';
import { ref } from 'vue';
import FlashcardsOption from './FlashcardsOption.vue';
import FlashCardsIcon from './FlashCardsIcon.vue';

export interface IOption {
    fromOpt: string
    toOpt: string
    turned: boolean
}

useDisableScroll()

const handleClose = () => router.push('/')

const isOptionsOpen = ref<boolean>(false)

const from = ref<string>('Word')
const to = ref<string>('Translation')
const selectedOption = ref<number>(0)

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

</script>

<style lang="scss" scoped>
@import '@/scss/variables';
@import '@/scss/mixins';

.modalWrapper {
    @include modalOverlay;
    overflow-y: scroll;
    padding: 50px;
}

.content {
    position: relative;
    display: flex;
    padding: 50px;

    border-radius: 5px;
    background-color: white;
}

.closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
}

.gameItem {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    width: 300px;
    height: 70px;
    background-color: $purple66;

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
}

.gameItemWrapper {
    background-color: $bg;
    border-radius: 5px;

    &:not(:last-child) {
        margin-bottom: 20px;
    }
}

.options {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    padding: 20px 20px;
    margin-left: 30px;
    border-radius: 15px;
    will-change: width;
    background-color: $bg;
    box-shadow: 1px 1px 5px 1px rgb(0 0 0 / 10%);
}

.startBtn {
    display: block;
    width: 150px;
    height: 50px;
    margin: 0 auto;
    margin-top: 25px;
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
</style>