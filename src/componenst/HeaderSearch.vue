<template>
    <input class="search-input" type="text" v-model.trim="searchQuery">
</template>
<script>
// import { mapMutations, mapState } from 'vuex';

export default {
    computed: {
        searchQuery: {
            get() {
                return this.$store.state.searchQuery
            },
            set(value) {
                this.$store.commit('setSearchQuery', value)
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/variables';

.search-input {
    height: 50px;
    min-width: 350px;
    padding: 0 15px;

    font-size: 20px;
    color: $black;
    background-color: white;
    border-radius: 30px;
}
</style>