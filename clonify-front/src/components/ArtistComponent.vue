<template>
    <router-link :to="{name: 'artist', params:{id: artist.id}}">
        <div class="item">
            <div class="artist">
                <div class="icon">
                    <img v-if="artist.image" :src="artist.image" alt="icon">
                    <img v-else src="../assets/default-artist-pfp.jpg" alt="icon">
                </div>
                <h3> {{ artist.name }}</h3>
                <p> Artist </p>
            </div>
        </div>
    </router-link>
</template>

<script lang="ts">
import { Artist } from '@/functions/spotifyTypes';
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        artist: {
            type: Object as () => Artist,
            required: true
        }
    },
    setup(props) {
        console.log('ArtistComponent');
        return { props } 
    },
})
</script>

<style>
.artist {
    background: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.artist h3 {
    margin: 0;
    padding: 0;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

.icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.icon img{
    width: 20dvh;
    height: 20dvh;
    object-fit: cover;
    border-radius: 100%;
}
</style>