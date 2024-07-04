<template>
    <router-link :to="{name: 'track', params: {id: trackId}}">
        <div class="track">
            <p class="index"> {{ index }}</p>
            <div class="track-first-info">
                <img v-if="track.image" :src="track.image" class="track-icon">
                <p> {{ track.name }} </p>
            </div>
            <div class="track-name" v-if="track.album">
                <p> {{ track.album }} </p>
            </div>
            <div class="track-popularity">
                <p> {{ lenght }}</p>
            </div>
        </div>
    </router-link>
</template>

<script lang="ts">
import { msToTime } from '@/functions/utils';
import { defineComponent, ref } from 'vue'
import type { Track } from '@/functions/spotifyTypes';

export default defineComponent({
    name: 'LongTrackComponent',
    props: {
        track: {
            type: Object as () => Track,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const lenght = ref<string>(msToTime(props.track.duration_ms));
        const trackId = ref<string>(props.track.id);

        //console.log(props.track);
        return { props, trackId, lenght };
    },
})
</script>

<style>
.track {
    display: grid;
    grid-template-columns: 0.1fr 1fr 1fr 0.5fr;
    background: var(--primary-50);
    padding: 10px 5px;
    margin: 5px 0;
    border-radius: 5px;
    transition: all 0.5s;
}

.track:hover {
    background: var(--primary);
    color: var(--white);
    cursor: pointer;
    transition: all 0.5s;
}

.track-first-info {
    display: flex;
    flex-direction: row;
    grid-column: 2;
}

.track-popularity {
    grid-column: -1;
    display: flex;
    justify-content: end;
}

.index {
    display: flex;
    align-items: start;
    grid-column: 1;
    padding: 0 10px;  
    color: rgba(255, 255, 255, 0.5);
}

.track-icon {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}

.track-name {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
}
</style>