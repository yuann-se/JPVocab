<template>
    <div class="app"></div>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {

        }
    },

    methods: {

    },

    beforeMount() {
        this.$store.commit('initialiseStore')
    },
})
</script>

<style lang="scss">

</style>
