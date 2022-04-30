<script setup lang="ts">
import { Type } from '~/typings'

interface Props {
    title: string
    prop2?: Type
}

const state = useSharedState()
const input = useState('input', () => ({ name: '', email: '' }))
const props = defineProps<Props>()
</script>

<template>
    <div>
        <div>State: {{ state }}</div>
        <pre>{{ { props } }}</pre>
        <input v-model="input.name" type="text" placeholder="Name" />
        <input v-model="input.email" type="text" placeholder="email" />
    </div>
</template>
