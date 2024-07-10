<template>
    <div class="playlist">
        <h4> {{ playlist.name }}</h4>
        <div class="coverArt">
            <img v-if="playlist.image !== undefined" :src="playlist.image" alt="" class="icon">
            <p>by {{ playlist.owner}}</p>
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