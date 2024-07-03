<template>
    <h1> Track {{ id }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TrackDetailView',
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
