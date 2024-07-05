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
                    <img v-if="trackData.album.images[0]" :src="trackData.album.images[0].url" alt="artist image" class="track-detail-icon canHover">
                    <img v-else src="../../assets/default-artist-pfp.jpg" alt="artist-icon" class="track-detail-icon canHover">
                </router-link>
                <h3> {{ trackData.album.name }} </h3>
            </div>
            <div class="track-icon-name" v-for="artist in artistData" :key="artist.id">
                <router-link :to="{name: 'artist', params: {id: artist.id}}">
                    <img v-if="artist.images[0]" :src="artist.images[0].url" alt="artist image" class="artist-icon canHover">
                    <img v-else src="../../assets/default-artist-pfp.jpg" alt="artist-icon" class="artist-icon canHover">
                </router-link>
                <h2> {{ artist.name }} </h2>
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
        const artistData = ref<Array<any>>([]);
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
                trackData.value.artists.forEach(async(artist: any) =>{
                const data = await getArtist(artist.id);
                if (!data) {
                    router.push({ name: 'unknown' });
                    return;
                } else {
                    console.log(data);
                    artistData.value.push(data);
                    console.log(artistData.value);
                } 
                });
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
    width: 30dvh;
    padding:0 40px;
    object-fit: cover;
}

.author-info {
    background: var(--spotify-green-50);
    transition: all 0.5s;
    border-radius: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px;
    margin: 1dvh 0;
    width: 100%;
}

.canHover {
    transition: all 1s;
}

.canHover:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: all 0.5s;
}
</style>