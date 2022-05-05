<script lang="ts" context="module">
    export async function load({ session }) {
        if (session.user) {
            return {
                status: 302,
                redirect: '/user'
            }
        }
        return {}
    }
</script>

<script lang="ts">
    import { goto } from '$app/navigation'
    import { session } from '$app/stores'
    import Button from 'components/Button.svelte'
    import Card from 'components/Card.svelte'
    import Input from 'components/Input.svelte'
    import type { User } from 'server/db/models'
    import { post } from 'utils/api'
    let email = 'user@mail.se'
    let password = 'password'
    let errors: string[] = []
    let loading = false

    async function handleLogin() {
        loading = true
        const response = await post<{ errors?: string[]; user: User }>('/api/login', {
            email,
            password
        })
        loading = false

        errors = response.errors || []

        if (response.user) {
            $session.user = response.user
            goto('/')
        }
    }
</script>

<div class="container">
    <Card>
        <form on:submit|preventDefault={handleLogin}>
            <Input type="email" placeholder="Email" bind:value={email} label="Email" />
            <Input type="password" placeholder="Lösenord" bind:value={password} label="Lösenord" />
            <Button type="submit" {loading}>Logga in</Button>
        </form>
    </Card>
</div>

{#if errors.length}
    {#each errors as err}
        <p>{err}</p>
    {/each}
{/if}

<style lang="scss">
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: cover;
        height: 100%;
        background-image: url('../assets/img/restaurant.jpg');

        h1 {
            margin: 0 0 $spacing-m;
        }

        form {
            row-gap: $spacing-m;
            width: min(425px, 90vw);
            display: flex;
            flex-direction: column;
        }
    }
</style>
