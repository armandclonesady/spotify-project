<template>
    <router-link :to="{name: 'playlist', params: {id: playlist.id}}"></router-link>
    <div class="item">
        <div class="playlist">
            <h4> {{ playlist.name }}</h4>
            <div class="coverArt">
                <img v-if="playlist.image !== undefined" :src="playlist.image" alt="" class="icon">
                <p>by {{ playlist.owner}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Playlist } from '../functions/spotifyTypes';

export default defineComponent({
    props: {
        playlist: {
            type: Object as () =>  Playlist,
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