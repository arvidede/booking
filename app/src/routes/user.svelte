<script context="module">
    export { load } from 'utils/auth'
</script>

<script lang="ts">
    import { session } from '$app/stores'
    import Button from 'components/Button.svelte'
    import { post } from 'utils/api'
    import { goto } from '$app/navigation'
    import { deleteUser } from 'utils/user'
    const { user } = $session

    const logOut = () => {
        post<{ ok: boolean }>('/api/logout').then((res) => {
            if (res.ok) {
                $session.user = null
                goto('/')
            }
        })
    }

    const deleteAccount = async () => {
        if (confirm('Är du säker?')) {
            const ok = await deleteUser(user.id)
            if (ok) logOut()
        }
    }
</script>

<Button on:click={logOut}>Logga ut</Button>
<Button on:click={deleteAccount}>Avsluta konto</Button>
<pre>
    {JSON.stringify(user, null, 2)}
</pre>
