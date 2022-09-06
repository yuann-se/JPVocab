<template>
    <header class="header">
        <div class="container">
            <HeaderSearch />
        </div>
    </header>
</template>
<script>
import HeaderSearch from './HeaderSearch.vue';
export default {
    components: { HeaderSearch }
}
</script>
<style lang="scss" scoped>
@import '@/variables';

.header {
    height: 100px;
    background-color: $purple66;
}

.container {
    display: flex;
    height: 100%;
    align-items: center;
}
</style>