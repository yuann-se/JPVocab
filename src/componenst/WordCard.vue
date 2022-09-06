<template >
    <div class="card-wrapper">
        <div class="segment name">
            {{word.word}}
        </div>
        <div class="segment reading">
            {{word.reading}}
        </div>
        <div class="segment translation">
            {{word.translation}}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        word: {
            type: Object,
            required: true
        }
    }

}
</script>
<style lang="scss" scoped>
@import '@/variables';

.card-wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 30px;
    row-gap: 20px;
    background-color: white;

    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
}

.segment {
    &.name {
        grid-column: 1 / 4;
    }

    &.reading {
        grid-column: 5 / 8;
    }

    &.translation {
        grid-column: 9 / 13;
    }
}
</style>