<template>
    <div class="data track-detail" v-if="trackData">
        <div class="generalInfo">
            <div class="track-icon-name">
                <h1> {{ trackData.name }}</h1>
            </div>
            <h2> {{ lenght }} </h2>
        </div>
        <div class="author-info">
            <div class="track-icon-name">
                <router-link :to="{name: 'album', params: {id: trackData.album.id}}">
                    <img v-if="trackData.album.images[0]" :src="trackData.album.images[0].url" alt="artist image" class="track-detail-icon">
                    <img v-else src="../../assets/default-artist-pfp.jpg" alt="artist-icon" class="artist-icon">
                </router-link>
                <h3> {{ trackData.album.name }} </h3>
            </div>
            <div class="track-icon-name" v-if="artistData">
                <router-link :to="{name: 'artist', params: {id: artistData.id}}">
                    <img v-if="artistData.images[0]" :src="artistData.images[0].url" alt="artist image" class="artist-icon">
                    <img v-else src="../../assets/default-artist-pfp.jpg" alt="artist-icon" class="artist-icon">
                </router-link>
                <h2> {{ artistData.name }} </h2>
            </div>
            <div v-else>
                <h2> {{ trackData.artists[0].name }}</h2>
            </div>
        </div>
    </div>
    <div v-else>
        <p> loading...</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import router from '@/router';
import { getArtist, getTrack } from '@/functions/spotifyFunctions';
import { msToTime } from '@/functions/utils';

export default defineComponent({
    name: 'TrackDetailView',
    props: {
        id: {
            type: String,
            required: true
        },
        artist: {
            required: true
        }
    },
    setup(props) {
        const trackData = ref<any>();
        const artistData = ref<any>();
        const lenght = ref<string>('');
        const getTrackData = async() => {
            if (props.id) {
                const data = await getTrack(props.id);
                if (!data) {
                    router.push({ name: 'unknown' });
                    return;
                }
                trackData.value = data;
                lenght.value = msToTime(trackData.value.duration_ms);
                console.log(trackData.value);
                getArtistData();
            }
        }
        const getArtistData = async() => {
            if (trackData.value) {
                const data = await getArtist(trackData.value.artists[0].id);
                if (!data) {
                    router.push({ name: 'unknown' });
                    return;
                }
                artistData.value = data;
                console.log(artistData.value);
            }
        }
        onMounted(() => {
            getTrackData();
        });
        return { props, trackData, artistData, lenght };
    },
})
</script>

<style>

.track-detail .generalInfo{
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    height: 100%;
}

.track-detail-icon{
    display: flex;
    justify-items: start;
    width: 20dvh;
    height: 20dvh;
    padding:0 40px;
    object-fit: cover;
    transition: all 1s;
}

.track-detail-icon:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: all 0.5s;
}

.author-info {
    background: var(--spotify-green-50);
    transition: all 0.5s;
    border-radius: 25px;
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: space-between;
    padding: 20px;
    margin: 1dvh 0;
    width: 100%;
}
</style>