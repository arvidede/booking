<script lang="ts">
    import { goto } from '$app/navigation'
    import { session } from '$app/stores'
    import type { User } from 'server/db/models'
    import { post } from 'utils/api'
    let email = 'user@mail.se'
    let password = 'password'
    let errors: string[] = []
    async function handleLogin() {
        const response = await post<{ errors?: string[]; user: User }>('/api/login', {
            email,
            password
        })

        errors = response.errors || []

        if (response.user) {
            session.set({ user: response.user })
            goto('/')
        }
    }
</script>

<h1>Login</h1>

<form on:submit|preventDefault={handleLogin}>
    <input type="email" placeholder="Email" bind:value={email} />
    <input type="password" placeholder="Lösenord" bind:value={password} />
    <button>Login</button>
</form>

{#if errors.length}
    {#each errors as err}
        <p>{err}</p>
    {/each}
{/if}
