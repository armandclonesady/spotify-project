<template>
    <router-link :to="{name: 'track', params: {id: trackId}}">
        <div class="track">
            <div class="track-first-info">
                <p class="index"> {{ index }}</p>
                <img v-if="hasImage" :src="track.album.images[0].url" class="track-icon">
                <p> {{ track.name }} </p>
            </div>
            <div class="track-name">
                <p> {{ track.album.name }} </p>
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

export default defineComponent({
    name: 'LongTrackComponent',
    props: {
        track: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const hasImage = ref<boolean>(props.track.album.images);
        const lenght = ref<string>(msToTime(props.track.duration_ms));
        const trackId = ref<string>(props.track.id);
        return { props, hasImage, trackId, lenght };
    },
})
</script>

<style>
.track {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
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
}

.track-popularity {
    display: flex;
    justify-content: end;
}

.index {
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