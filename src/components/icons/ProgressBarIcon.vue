<template>
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="21" cy="21" r="19.5" stroke="#faf9fc" stroke-width="3" />
        <circle cx="21" cy="21" r="19.5" stroke="#faf9fc" stroke-width="3" :style="style" />
    </svg>

</template>

<script setup lang="ts">

interface IProps {
    progress: number
}

const props = defineProps<IProps>()

const style = props.progress > 0
    ? { strokeDasharray: `${1.2 * props.progress} 122`, stroke: '#d84f6a' }
    : { strokeDasharray: `122 0` }

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