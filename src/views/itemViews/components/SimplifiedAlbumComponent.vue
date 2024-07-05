<template>
    <router-link :to="{name: 'album', params: {id: albumId}}">
        <div class="simplified-album">
            <img v-if="album.image" :src="album.image" class="album-icon">
            <p> {{ album.name }}</p>
        </div>
    </router-link>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Album } from '@/functions/spotifyTypes';

export default defineComponent({
    name: 'LongTrackComponent',
    props: {
        album: {
            type: Object as () => Album,
            required: true
        }
    },
    setup(props) {
        const albumId = ref<string>(props.album.id);
        console.log(props.album);
        
        return { props, albumId };
    },
})
</script>

<style>

.simplified-album { 
    background: var(--primary-50);
    padding: 10px 5px;
    padding: 1dvh;
    border-radius: 5px;
    transition: all 0.5s;
    max-height: 30dvh;
}

.simplified-album:hover {
    background: var(--primary);
    color: var(--white);
    cursor: pointer;
    transition: all 0.5s;
}

.album-icon {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
</style>