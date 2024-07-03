<template>
    <h1> Show {{ id }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ShowDetailView',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        return { props };
    },
})
</script>
