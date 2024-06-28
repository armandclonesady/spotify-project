<template>
    <div class="playlist">
        <div class="coverArt">
            <h3> {{ playlist.name }}</h3>
            <img v-if="playlist.images[0] !== undefined" :src="playlist.images[0].url" alt="" class="icon">
            <p>by {{ playlist.owner.display_name}}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        playlist: {
            type: Object,
            required: true
        }
    },
    setup() {
        console.log('PlaylistComponent');
    },
})
</script>
