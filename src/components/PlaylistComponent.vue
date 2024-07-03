<template>
    <div class="playlist">
        <h4> {{ playlist.name }}</h4>
        <div class="coverArt">
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

<style>
.playlist {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
}
</style>