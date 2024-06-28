<template>
    <div class="artist">
        <h3> {{ artist.name }}</h3>
        <div class="icon">
            <img v-if="artist.images[0]" :src="artist.images[0].url" alt="icon">
        </div>
        <p> {{ artist.followers.total }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        artist: {
            type: Object,
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
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
    height: 60%;
}

.icon img{
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 100%;
}
</style>