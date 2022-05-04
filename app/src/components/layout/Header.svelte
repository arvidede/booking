<script>
    import { goto } from '$app/navigation'

    import Button from 'components/Button.svelte'

    const ROUTES = [
        { path: '/', title: 'Logo' },
        { path: '/features', title: 'Lösningar' },
        { path: '/pricing', title: 'Priser' },
        { path: '/contact', title: 'Kontakt' },
        { path: '/support', title: 'Support' },
        { path: '/about', title: 'Om' }
    ]
</script>

<header>
    <nav>
        {#each ROUTES as route}
            <a sveltekit:prefetch href={route.path}>{route.title}</a>
        {/each}
    </nav>
    <div class="actions">
        <Button on:click={() => goto('/login')}>Logga in</Button>
        <Button>Kom igång</Button>
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
