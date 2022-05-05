<div class="card">
    <slot />
</div>

<style lang="scss">
    .card {
        background-color: $color_white;
        padding: $spacing-m;
        box-shadow: $shadow_float-sticky;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: fit-content;
        border-radius: $border-radius-s;
    }
</style>
