<template>
    <svg :class="{isActive: props.isActive}" width="35" height="35" viewBox="0 0 35 35" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path class="path"
            d="M35 17.5C35 27.165 27.165 35 17.5 35C7.83502 35 0 27.165 0 17.5C0 7.83502 7.83502 0 17.5 0C27.165 0 35 7.83502 35 17.5Z"
            fill="#faf9fc" />
        <path class="path"
            d="M18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L10.9289 14.6569C10.5384 15.0474 10.5384 15.6805 10.9289 16.0711C11.3195 16.4616 11.9526 16.4616 12.3431 16.0711L18 10.4142L23.6569 16.0711C24.0474 16.4616 24.6805 16.4616 25.0711 16.0711C25.4616 15.6805 25.4616 15.0474 25.0711 14.6569L18.7071 8.29289ZM17 27C17 27.5523 17.4477 28 18 28C18.5523 28 19 27.5523 19 27H17ZM17 9V18H19V9H17ZM17 18V27H19V18H17Z"
            fill="#B5B5B5" />
    </svg>
</template>

<script setup lang="ts">

interface IProps {
    isActive: boolean
}

const props = defineProps<IProps>()
</script>

<style scoped lang="scss">
@import '@/scss/variables';

.isActive {
    .path {
        transition: fill .2s ease;
    }

    .path:first-child {
        fill: $selected;
    }

    .path:last-child {
        fill: $purple66;
    }
}
</style>