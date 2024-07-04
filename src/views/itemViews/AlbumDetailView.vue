<template>
    <div class="data" v-if="albumData">
        <div class="generalInfo">
            <div class="album-info">
                <div class="icon-name">
                    <a  :href="albumData.external_urls.spotify">
                        <img v-if="albumData.images[0]" :src="albumData.images[0].url" alt="artist image" class="track-detail-icon canHover">
                        <img v-else src="../../assets/default-artist-pfp.jpg" alt="artist-icon" class="track-detail-icon canHover">
                    </a>
                </div>
                <div class="album-name-info">
                    <p> {{ albumData.album_type }}</p>
                    <h1> {{ albumData.name }} </h1>
                    <div class="more-info">
                        <p> <router-link :to="{name: 'artist', params: {id: albumData.artists[0].id}}"> <img :src="artistImage"> {{ albumData.artists[0].name}} </router-link> - {{ year }} - {{albumData.total_tracks}} tracks - {{ length }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="popularTracks">
            <h2> Tracks </h2>
            <div class="track-list">
                <LongTrackComponent :track="track" :index="index+1" v-for="(track, index) in tracks" :key="index"/>

            </div>
        </div>
    </div>
    <div v-else>
        <h1> Loading... </h1>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getAlbum, getArtistImage } from '@/functions/spotifyFunctions';
import { convertDate, getTotalAlbumLenght, msToTime } from '@/functions/utils';
import LongTrackComponent from './components/LongTrackComponent.vue';
import router from '@/router';
import { Track } from '@/functions/spotifyTypes';
export default defineComponent({
    name: 'AlbumDetailView',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        LongTrackComponent
    },
    setup(props) {
        const albumData = ref();

        const year = ref<string>('');
        const length = ref<string>('');
        const tracks = ref<Array<Track>>([]);
        const artistImage = ref();

        const getData = async () => {
            if (props.id) {
                const data = await getAlbum(props.id);
                if (!data) {
                    router.push({ name: 'unknown' });
                    return;
                }
                albumData.value = data;
                year.value = convertDate(data.release_date, 'year');
                length.value = msToTime(getTotalAlbumLenght(data.tracks.items));
                artistImage.value = await getArtistImage(data.artists[0].id);
                albumData.value.tracks.items.forEach((track: any) => {
                    let artistsList: Array<string> = [];
                    track.artists.forEach((artist: { name: string; }) => {
                        artistsList.push(artist.name);
                    });
                    let trackItem: Track = {
                        id: track.id,
                        name: track.name,
                        artists: artistsList,
                        duration_ms: track.duration_ms,
                    }
                    tracks.value.push(trackItem);
                });
            }
        }

        onMounted(() => {
            console.log('AlbumDetailView mounted');
            getData();
        });
        return { albumData, year, length, artistImage, tracks};
    },
})
</script>

<style>
.album-info {
    display: flex;
    align-items: center;
    margin: 10px;
}

.album-name-info {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    align-items: start;
}

.more-info p {
    font-size: 0.8em;
    display: flex;
    align-items: center;
}

.more-info p a {
    display: flex;
    align-items: center;
    font-weight: bold;
}

.more-info img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
}

</style>