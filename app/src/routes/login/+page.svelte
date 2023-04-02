<script lang="ts">
    import { goto, invalidate } from '$app/navigation'
    import Button from 'components/Button.svelte'
    import Card from 'components/Card.svelte'
    import Input from 'components/Input.svelte'
    import { post } from 'utils/api'
    let email = 'user@mail.se'
    let password = 'Password1'
    let errors: string[] = []
    let loading = false

    async function handleLogin() {
        loading = true
        const response = await post<undefined | { errors: string[] }>('/api/login', {
            email,
            password
        })
        loading = false
        errors = response?.errors || []
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

<style lang="scss">
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: cover;
        height: 100%;
        background-image: url('/src/assets/img/restaurant.jpg');
        form {
            row-gap: $spacing-m;
            width: min(425px, 90vw);
            display: flex;
            flex-direction: column;
        }
    }
</style>
