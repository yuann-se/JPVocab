<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <rect width="176" height="144" x="24.008" y="72" rx="16" />
        <path d="M216.00781,40h-152a8,8,0,0,0,0,16h152V176a8,8,0,0,0,16,0V56A16.01833,16.01833,0,0,0,216.00781,40Z" />
    </svg>
</template>

<style lang="scss" scoped>
@import '@/scss/variables';

rect:nth-child(2) {
    fill: $selected
}

path {
    fill: $bg;
}
</style>