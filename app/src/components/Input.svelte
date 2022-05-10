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
    export let error: boolean | string | string[] = undefined
    export let action
    const dispatch = createEventDispatcher()

    const handleChange = (e: InputEvent) => {
        value = e.currentTarget.value
        dispatch('change', { name, value: e.currentTarget.value })
    }

    function errorIsArray(err: typeof error): err is string[] {
        return typeof error === 'object'
    }
</script>

<div>
    <span>
        {#if label}
            <label for={id}>{label}</label>
        {/if}
        {#if error && !errorIsArray(error)}
            <div class="error">{error}</div>
        {/if}
    </span>
    <input use:action on:input={handleChange} {value} {placeholder} {type} {name} {id} {required} class:error />
    {#if error && errorIsArray(error)}
        {#each error as e}
            <div class="error">- {e}</div>
        {/each}
    {/if}
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
            margin-left: auto;
        }
    }

    div.error {
        @extend %text-xs;
        color: $error;
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
