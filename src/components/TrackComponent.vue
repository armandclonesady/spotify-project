<template>
    <div class="track">
        <p> {{ trackName }}</p>
        <div class="coverArt">
            <img :src="track.album.images[0].url" alt="" class="icon">
            <img v-if="track.preview_url"  src="../assets/play-icon.png" alt="play" class="preview" @click.prevent="playSnippet">
        </div>
        {{ msToTime(track.duration_ms) }}
        <h4> {{ artist }}</h4>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { msToTime, nameTooLong, shortenName } from '@/functions/utils';
export default defineComponent({
    props: {
        track: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        console.log('TrackComponent');
        const audio = new Audio(props.track.preview_url);
        const isPlaying = ref<boolean>(false);

        const trackName = ref<string>(props.track.name);
        const artist = ref<string>(props.track.artists[0].name);
        if (nameTooLong(trackName.value)) {
            trackName.value = shortenName(trackName.value);
        }
        if (nameTooLong(artist.value)) {
            artist.value = shortenName(artist.value);
        }
        const playSnippet = () => {
            if (isPlaying.value) {
                audio.pause();
            } else {
                audio.play();
            }
            
            isPlaying.value = !isPlaying.value;
        }

        return { props, msToTime, playSnippet, trackName, artist} 
    },
})
</script>

<style>
.track {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.track .preview {
    width: 20%;
    height: 20%;
    margin-top: 0.5dvw;
    filter: invert(100%);
}

.track h4 {
    margin: 0;
    padding: 0;
}
</style>