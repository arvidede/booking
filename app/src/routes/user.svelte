<script>
    import { session } from '$app/stores'
    import Button from 'components/Button.svelte'

    const { user } = $session

    const signOut = () => {
        console.log('Loggar ut')
    }
</script>

<Button on:click={signOut}>Logga ut</Button>
<pre>
    {JSON.stringify(user, null, 2)}
</pre>
