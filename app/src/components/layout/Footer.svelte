<script>
    const date = new Date()
    const year = date.getFullYear()
</script>

<footer>{year}</footer>

<style lang="scss">
    footer {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        background-color: $secondary-main;
        padding: $spacing-xxl 10% $spacing-xl 10%;
        color: $color_white;
    }
</style>
