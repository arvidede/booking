<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    type InputEvent = KeyboardEvent & { currentTarget: HTMLInputElement }
    export let type: HTMLInputElement['type'] = 'text'
    export let placeholder: HTMLInputElement['placeholder'] = undefined
    export let value: HTMLInputElement['value'] = undefined
    export let name: HTMLInputElement['name'] = undefined
    export let id: HTMLInputElement['id'] = undefined
    export let label: HTMLInputElement['id'] = undefined
    export let required: HTMLInputElement['required'] = false
    export let error: boolean | string = undefined
    const pattern = type === 'password' ? '(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}' : undefined

    const dispatch = createEventDispatcher()

    const handleChange = (e: InputEvent) => {
        dispatch('change', { name, value: e.currentTarget.value })
    }
</script>

<div>
    <span>
        {#if label}
            <label for={id}>{label}</label>
        {/if}
        {#if error}
            <div class="error">{error}</div>
        {/if}
    </span>
    <input on:change={handleChange} {value} {placeholder} {type} {name} {id} {required} {pattern} class:error />
</div>

<style lang="scss">
    span {
        display: flex;
        margin-bottom: $spacing-s;

        label {
            @extend %text-xs;
            color: $text-main;
            text-transform: uppercase;
            display: inline-block;
        }

        .error {
            @extend %text-xs;
            color: $error;
            margin-left: auto;
        }
    }

    input {
        border: $border-light;
        width: 100%;
        line-height: normal;
        padding: $spacing-s-m;
        border-radius: $border-radius-xs;
        outline: none;
        transition: $transition-default;

        &:focus {
            box-shadow: $shadow-float-low;
            border-color: $primary-main;
        }

        &.error {
            border: 1px solid $error;
        }
    }
</style>
