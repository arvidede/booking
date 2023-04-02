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
    import Button from 'components/Button.svelte'
    import Card from 'components/Card.svelte'
    import Input from 'components/Input.svelte'
    import type { User } from 'server/db/models'
    import { post } from 'utils/api'
    import { page } from '$app/stores'
    type Errors = Record<string, string>
    let input = {
        name: 'restaurant',
        email: 'user@mail.se',
        password: 'Password1',
        phone: '073-5320103'
    }
    let errors: Errors = {}
    let loading = false
    let { user } = page

    async function handleRegister() {
        loading = true
        const response = await post<{ errors?: Errors; user: User }>('/api/register', input)
        loading = false

        if (response.user) {
            user = response.user
            goto('/')
        } else if (response.errors) {
            errors = response.errors
        }
    }

    const handleInputChange = (e: CustomEvent) => {
        input = { ...input, [e.detail.name]: e.detail.value }
    }

    const INPUTS = [
        {
            type: 'text',
            placeholder: 'Restaurangens namn',
            label: 'Restaurangens namn',
            name: 'name'
        },
        { type: 'email', placeholder: 'Email', label: 'Email', name: 'email' },
        { type: 'password', placeholder: 'Lösenord', label: 'Lösenord', name: 'password' },
        { type: 'text', placeholder: 'Telefonnummer', label: 'Telefonnummer', name: 'phone' }
    ]
</script>

<div class="container">
    <Card>
        <form on:submit|preventDefault={handleRegister}>
            {#each INPUTS as { name, type, label, placeholder } (name)}
                <Input
                    {type}
                    {placeholder}
                    {label}
                    {name}
                    required
                    value={input[name]}
                    on:change={handleInputChange}
                    error={errors[name]}
                />
            {/each}
            <Button type="submit" {loading}>Registrera</Button>
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
