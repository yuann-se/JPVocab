<template>
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="21" cy="21" r="19.5" stroke="#faf9fc" stroke-width="3" />
        <circle cx="21" cy="21" r="19.5" :stroke="color" stroke-width="3" :style="style" />
    </svg>

</template>

<script setup lang="ts">

interface IProps {
    progress: number
}

const props = defineProps<IProps>()

const style = props.progress > 0
    ? { strokeDasharray: `${1.22 * props.progress} 122` }
    : { strokeDasharray: `122 0` }

const color = props.progress < 15
    ? '#d84f6a'
    : props.progress < 50
        ? '#ffd7ad'
        : props.progress < 75
            ? '#f7bb4e'
            : props.progress < 90
                ? '#a3d5cc'
                : '#95cc65'

</script>

<style lang="scss" scoped>
svg {
    position: relative;
}

circle {
    position: absolute;
    inset: 0;
}
</style>