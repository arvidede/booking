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

<pre>{JSON.stringify({ searchQuery }, null, 2)}</pre>

<style lang="scss">
</style>
