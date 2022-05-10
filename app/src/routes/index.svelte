<script lang="ts">
    import Input from 'components/Input.svelte'
    import debounce from 'utils/useDebounce'
    import { search } from 'utils/user'
    let searchQuery = ''
    let res = []

    const handleInputChange = async () => {
        res = await search(searchQuery)
    }
</script>

<Input bind:value={searchQuery} action={debounce({ next: handleInputChange, delay: 500 })} />

{#await res}
    Loading...
{:then value}
    <pre>{JSON.stringify({ searchQuery, value }, null, 2)}</pre>
{/await}

<style lang="scss">
</style>
