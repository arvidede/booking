<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    export const type: 'button' | 'submit' | 'menu' | 'reset' = 'button'
    const dispatch = createEventDispatcher()
</script>

<button on:click|preventDefault={() => dispatch('click')} type="button"><slot /></button>

<style lang="scss">
    button {
        @extend %text-base-semi-bold;
        padding: $spacing-s-m;
        border-radius: $border-radius-xs;
        border: none;
        background-color: $primary-main;
        color: $secondary-main;
        cursor: pointer;
        transition: transform $transition-default;
        &:active {
            transform: scale(0.95);
        }

        &:disabled {
            cursor: default;
        }
    }
</style>
