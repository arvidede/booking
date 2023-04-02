<script lang="ts">
    import type { PublicUser } from 'types'
    import { deleteUser } from 'utils/user'
    export let users: PublicUser[] = []
    const handleDeleteUser = async (id: string) => deleteUser(id)
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
