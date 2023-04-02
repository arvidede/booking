<script lang="ts">
    import { page } from '$app/stores'
    import Button from 'components/Button.svelte'
    import { post } from 'utils/api'
    import { deleteUser } from 'utils/user'
    const { user } = $page.data
    let loading = false

    const logOut = () => {
        loading = true
        post('/api/logout').then((res) => {
            loading = false
        })
    }

    const deleteAccount = async () => {
        if (confirm('Är du säker?')) {
            const ok = await deleteUser(user.id)
            if (ok) logOut()
        }
    }
</script>

<Button {loading} on:click={logOut}>Logga ut</Button>
<Button on:click={deleteAccount}>Avsluta konto</Button>
<pre>
    {JSON.stringify(user, null, 2)}
</pre>
