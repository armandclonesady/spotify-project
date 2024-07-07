<template>
    <div class="fullwidth   "> 
        <div v-if="trackResults.length > 0">
            <div @click="showTrack = !showTrack" class="result-type-container">
                <hr class="quarter-hr"> <h2> Tracks </h2> <hr>
            </div>
            <div class="track-list" v-if="showTrack">
                <div v-for="track in trackResults" :key="track.id">
                    <LongTrackComponent :track="track"/>
                </div>
            </div>
        </div>

        <div v-if="artistResults.length > 0">
            <div @click="showArtist = !showArtist" class="result-type-container">
                <hr class="quarter-hr"> <h2> Artists </h2> <hr>
            </div>
            <div class="artist-results results" v-if="showArtist">
                <div class="item" v-for="artist in artistResults" :key="artist.id">
                    <ItemPreview :result="artist"></ItemPreview>
                </div>
            </div>
        </div>

        <div v-if="albumResults.length > 0">
            <div @click="showAlbum = !showAlbum" class="result-type-container">
                <hr class="quarter-hr"> <h2> Albums </h2> <hr>
            </div>
            <div class="album-results results" v-if="showAlbum">
                <div class="item" v-for="album in albumResults" :key="album.id">
                    <ItemPreview :result="album"></ItemPreview>
                </div>
            </div>
        </div>

        <div v-if="playlistResults.length > 0" class="result-type-container">
            <div @click="showPlaylist = !showPlaylist">
                <hr class="quarter-hr"> <h2> Playlists </h2> <hr>
            </div>
            <div class="playlist-results results" v-if="showPlaylist">
                <div class="item" v-for="playlist in playlistResults" :key="playlist.id">
                    <ItemPreview :result="playlist"></ItemPreview>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { allowedTypes } from '@/functions/utils';
import { Track, Album } from '@/functions/spotifyTypes';
import ItemPreview from '@/views/ItemPreview.vue';
import { defineComponent, onMounted, ref, watch } from 'vue';
import LongTrackComponent from './itemViews/components/LongTrackComponent.vue';

export default defineComponent({
    props: {
        results: {
            type: Array,
            required: true
        }
    },
    components: {
        ItemPreview,
        LongTrackComponent
    },

    setup(props) {
        const searchResults = ref<Array<any>>([]);

        const albumResults = ref<Array<any>>([]);
        const artistResults = ref<Array<any>>([]);
        const playlistResults = ref<Array<any>>([]);
        const trackResults = ref<Array<any>>([]);

            
        const showAlbum = ref(false);
        const showArtist = ref(false);
        const showPlaylist = ref(false);
        const showTrack = ref(false);

        const updateArrays = () => {
            searchResults.value = props.results;
            albumResults.value = [];
            artistResults.value = [];
            playlistResults.value = [];
            trackResults.value = [];

            searchResults.value.forEach((item) => {
                if (item.type === "album") {
                    albumResults.value.push(item);
                } else if (item.type === "artist") {
                    artistResults.value.push(item);
                } else if (item.type === "playlist") {
                    playlistResults.value.push(item);
                } else if (item.type === "track") {
                    let artistsList: Array<any> = [];
                    item.artists.forEach((artist: { name: string; id: string; }) => {
                        const artistItem = {
                            name: artist.name,
                            id: artist.id,
                        }
                        artistsList.push(artistItem);
                    });
                    let track: Track = {
                        id: item.id,
                        name: item.name,
                        artists: artistsList,
                        album: item.album.name,
                        duration_ms: item.duration_ms,
                    };
                    if (item.album.images[0]) {
                        track.image = item.album.images[0].url;
                    }
                    trackResults.value.push(track);
                }
            });
            console.log("albumResults: ", albumResults.value);
            console.log("artistResults: ", artistResults.value);
            console.log("playlistResults: ", playlistResults.value);
            console.log("trackResults: ", trackResults.value);
        }

        onMounted(() => {
            console.log("itemsview.vue mounted");
            updateArrays();
        });

        watch(() => props.results, () => {
            console.log("itemsview.vue updated");
            updateArrays();
        }, { deep: true });
        return { albumResults, artistResults, playlistResults, trackResults, showAlbum, showArtist, showPlaylist, showTrack};
    },
})
</script>

<style>

.fullwidth {
    width: 100%;
}
.results {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
}

.result-type-container {
    display: flex;
    flex-direction: row;
    justify-content: start; 
    align-items: center;
    width: 100%;
    color: var(--white);
    margin: 0.5dvh;
    padding: 1dvh;
    transition: all 1s;
    border-radius: 50px;
}

.result-type-container hr {
    margin: 10px;
    width: 100%;
    border: 1px solid;
}

.result-type-container .quarter-hr {
    width: 10%;
}

.result-type-container:hover {
    color: var(--spotify-green);
    border-color: var(--spotify-green);
    cursor: pointer;
    transition: all 0.5s;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin: 1px;
    color: var(--white);
    transition: all 0.5s;
}

.item:hover {
    background: var(--spotify-green);
    cursor: pointer;
    transition: all 0.5s;
}

a {
    text-decoration: none;
    color: var(--white);
}

</style>