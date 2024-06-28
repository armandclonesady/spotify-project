<template>
    <div class="track">
        <p> {{ track.album.name }}</p>
        <div class="coverArt">
            <img :src="track.album.images[0].url" alt="" class="icon">
            <img src="../assets/play-icon.png" alt="play" class="preview" @click="playSnippet">
        </div>
        {{ msToTime(track.duration_ms) }}
        <h3> {{ track.artists[0].name}}</h3>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { msToTime } from '@/functions/utils';
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

        const playSnippet = () => {
            if (isPlaying.value) {
                audio.pause();
            } else {
                audio.play();
            }
            
            isPlaying.value = !isPlaying.value;
        }

        return { props, msToTime, playSnippet } 
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
</style>