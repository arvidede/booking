<script context="module">
</script>

<script>
    import Footer from 'components/layout/Footer.svelte'
    import Header from 'components/layout/Header.svelte'
</script>

<svelte:head />

<Header />
<main>
    <slot />
</main>
<Footer />

<style lang="scss">
    main {
        flex: 1;
    }
</style>
