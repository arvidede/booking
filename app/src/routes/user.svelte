<script context="module">
    export { load } from 'utils/auth'
</script>

<script lang="ts">
    import { session } from '$app/stores'
    import Button from 'components/Button.svelte'
    import { post } from 'utils/api'
    import { goto } from '$app/navigation'

    const { user } = $session

    const logOut = () => {
        post<{ ok: boolean }>('/api/logout').then((res) => {
            if (res.ok) {
                $session.user = null
                goto('/')
            }
        })
    }
</script>

<Button on:click={logOut}>Logga ut</Button>
<pre>
    {JSON.stringify(user, null, 2)}
</pre>
