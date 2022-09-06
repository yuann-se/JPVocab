<template>
    <div class="app"></div>
    <router-view></router-view>
</template>

<script>
export default {
    data() {
        return {

        }
    },

    methods: {

    },

    beforeMount() {
        this.$store.commit('initialiseStore')
    },
}
</script>

<style lang="scss">
</style>
