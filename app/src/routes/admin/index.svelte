<script lang="ts">
    import type { User } from 'types'
    import { del } from 'utils/api'
    export let users: User[] = []
    const handleDeleteUser = async (id: string) => {
        const ok = await del(`/api/user/${id}`)
        console.log(ok)
    }
</script>

<table>
    <tr>
        <th> Namn </th>
        <th> Email </th>
        <th> Telefon </th>
        <th />
    </tr>
    {#each users as user}
        <tr>
            <td>
                {user.name}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {user.phone}
            </td>
            <td>
                <button on:click={() => handleDeleteUser(user.id)}>X</button>
            </td>
        </tr>
    {/each}
</table>

<style lang="scss">
</style>
