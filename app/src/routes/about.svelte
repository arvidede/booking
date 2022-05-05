<script context="module">
    import { protect } from 'utils/auth'

    export async function load({ session }) {
        const redirect = protect(session)
        if (redirect) return redirect
        return {}
    }
</script>

<h1>OM</h1>
