<template>
    <div class="wrapper">
        <div class="container">
            <button class="deleteBtn" :disabled="!isAnyChecked">
                <DeleteWordIcon />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DeleteWordIcon from '@/icons/DeleteWordIcon.vue';
import store from '@/store';

export default defineComponent({
    computed: {
        isAnyChecked() {
            return store.state.isAnyChecked;
        }
    },

    components: { DeleteWordIcon }
})
</script>
<style lang="scss" scoped>
@import '@/variables';

.wrapper {
    position: absolute;
    inset: 0;
    top: 100px;
}

.container {
    height: 50px;
    background-color: white;
    display: flex;
    align-items: center;
}

.deleteBtn {
    margin-left: auto;

    svg {
        transition: fill .2s ease;
    }

    &:disabled {
        pointer-events: none;

        svg {
            fill: $disabledGrey;
        }
    }
}
</style>