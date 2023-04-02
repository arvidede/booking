<script>
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'
    import Button from 'components/Button.svelte'
    import { onDestroy } from 'svelte'

    let { user } = page

    const ROUTES = [
        { path: '/', title: 'Logo', protected: false },
        { path: '/features', title: 'Lösningar', protected: false },
        { path: '/pricing', title: 'Priser', protected: false },
        { path: '/contact', title: 'Kontakt', protected: false },
        { path: '/support', title: 'Support', protected: false },
        { path: '/about', title: 'Om', protected: true }
    ]
</script>

<header>
    <nav>
        {#each ROUTES as route}
            {#if !route.protected || (route.protected && user)}
                <a sveltekit:prefetch href={route.path}>{route.title}</a>
            {/if}
        {/each}
    </nav>
    <div class="actions">
        {#if user}
            <Button on:click={() => goto('/user')}>Mina sidor</Button>
        {:else}
            <Button on:click={() => goto('/login')}>Logga in</Button>
            <Button on:click={() => goto('/register')}>Kom igång</Button>
        {/if}
    </div>
</header>

<style lang="scss">
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100vw;
        padding: $spacing-s-m 10%;
        color: $secondary-main;
        background-color: $color_white;
        box-shadow: $shadow_float-default;
        nav,
        .actions {
            display: flex;
            column-gap: $spacing-l;
        }
    }
</style>
