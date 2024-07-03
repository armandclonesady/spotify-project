<template>
    <h1> PlayList {{ id }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PlayListDetailView',
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
