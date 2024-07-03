<template>
    <h1> Album {{ id }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AlbumDetailView',
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
