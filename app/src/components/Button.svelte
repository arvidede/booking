<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    export let type: 'button' | 'submit' | 'menu' | 'reset' = 'button'
    export let loading: boolean = false
    const dispatch = createEventDispatcher()
</script>

<button on:click={() => dispatch('click')} {type}>
    {#if loading}
        Loading
    {:else}
        <slot />
    {/if}
</button>

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
