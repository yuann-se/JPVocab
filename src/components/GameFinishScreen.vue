<template>
    <section class="finishScreenSection">
        <div class="container">
            <div class="content">
                <h2 class="h2">
                    <span>You're great!</span>
                    <ConfettiIcon />
                </h2>

                <div class="inner">
                    <div class="diagramWrapper">
                        <h3 class="h3">Your result:</h3>
                        <div class="legendWrapper">
                            <span class="legend"></span>
                            <span class="text">You've learned
                                <span v-if="chart.know === 1">{{chart.know}} word</span>
                                <span v-else>{{chart.know}} words</span>
                            </span>
                        </div>
                        <div class="legendWrapper">
                            <span class="legend"></span>
                            <span class="text">You're still learning
                                <span v-if="chart.learning === 1">{{chart.learning}} word</span>
                                <span v-else>{{chart.learning}} words</span>
                            </span>
                        </div>
                        <FlashcardsDiagramIcon />
                    </div>

                    <div class="actionsWrapper">
                        <h3 class="h3">Next step:</h3>

                        <FinishScreenActionBtn v-for="btn in actionBtns" :key="btn.btnName" :title="btn.title"
                            :descr="btn.descr" :btn-name="btn.btnName" :words-count="props.stats.length"
                            :to-repeat="chart.learning" @continue="emit('continueGame')"
                            @restart="emit('restartGame')" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import FlashcardsDiagramIcon from "./icons/FlashcardsDiagramIcon.vue";
import ConfettiIcon from "./icons/ConfettiIcon.vue";
import FinishScreenActionBtn from "./FinishScreenActionBtn.vue";

const props = defineProps<{ stats: boolean[] }>()

const chart = computed(() => {
    const knowArr = props.stats.filter((item) => !!item)
    return { know: knowArr.length, learning: props.stats.length - knowArr.length }
})

const dashoffset = computed(() => {
    const knowArr = props.stats.filter((item) => !!item)
    const knowRatio = knowArr.length / props.stats.length * 100
    if (knowRatio === 100) return '0'
    if (!knowArr.length) return '486'
    return `${486 - knowRatio * 4.86}`
})

const actionBtns = [
    { btnName: 'continue', title: 'Continue', descr: `Continue with the ${chart.value.learning} ${chart.value.learning === 1 ? 'word' : 'words'} marked as "Still learning"` },
    { btnName: 'restart', title: 'Restart', descr: `Study ${props.stats.length <= 1 ? '' : 'all'} ${props.stats.length} ${props.stats.length === 1 ? 'word' : 'words'} from the beginning` },
    { btnName: 'choose', title: 'Choose game', descr: `Go back to selecting games` },
    { btnName: 'home', title: 'Home', descr: `Go back to the list of words` }
]

const emit = defineEmits(['continueGame', 'restartGame'])

</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

.finishScreenSection {
    padding: 30px 0;
}

.content {
    width: 100%;
    padding: 40px 50px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 10%);
}

.h3 {
    margin-bottom: 30px;
    font-weight: 500;
    font-size: 18px;
    color: #666;
}

.inner {
    display: flex;
    justify-content: space-between;

    &>div {
        width: 50%;
    }
}

.h2 {
    position: relative;
    text-align: center;
    margin-bottom: 50px;
    font-size: 35px;

    &>span {
        padding-right: 100px;
    }

    &:deep(svg) {
        position: absolute;
        bottom: -80%;
        left: calc(50% + 45px);
    }
}

.diagramWrapper {
    min-width: 260px;
    margin-right: 40px;

    &:deep(svg) {
        opacity: .9;
        transform: rotate(-90deg);
        margin-top: 20px;
    }

    &:deep(circle:last-child) {
        stroke-dasharray: 486;
        stroke-dashoffset: 486;
        animation: dash 1s ease-in forwards;
    }

    @keyframes dash {
        to {
            stroke-dashoffset: v-bind(dashoffset);
        }
    }

    .legendWrapper {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .legend {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 15px;
            border-radius: 50%;
        }

        &:nth-child(2) {
            .legend {
                background-color: $greenSat;
            }

            .text span {
                color: $greenSat;
            }
        }

        &:nth-child(3) {
            .legend {
                background-color: $orangeSat;
            }

            .text span {
                color: $orangeSat;
            }
        }

        .text {
            font-size: 20px;

            span {
                font-weight: 500;
            }
        }
    }
}

@media (max-width: $bpL) {
    .content {
        padding: 40px 30px 40px 40px;
    }
}

@media (max-width: $bpM) {
    .inner {
        flex-direction: column;

        &>div {
            width: 100%;
        }
    }

    .diagramWrapper {
        margin-right: 0;
        margin-bottom: 50px;

        svg {
            display: block;
            margin: 0 auto;
        }
    }

    .legendWrapper {
        width: fit-content;
        margin: 0 auto;
        margin-bottom: 20px;
    }
}

@media (max-width: $bpS) {
    .finishScreenSection {
        padding: 0;
    }

    .container {
        padding: 0;
    }

    .content {
        padding: 20px;
        padding-top: 50px;
        border-radius: 0;
    }

    .legendWrapper {
        margin: 0;
        margin-bottom: 20px;
    }
}
</style>