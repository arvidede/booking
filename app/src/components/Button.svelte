<script lang="ts">
    export let onClick: undefined | (() => void) = undefined
    export const type: 'button' | 'submit' | 'menu' | 'reset' = 'button'
</script>

<button on:click|preventDefault={onClick} type="button"><slot /></button>

<style lang="scss">
    button {
        @extend %text-base-semi-bold;
        padding: $spacing-s-m;
        border-radius: $border-radius-xs;
        border: none;
        background-color: $primary-main;
        color: $secondary-main;
    }
</style>
