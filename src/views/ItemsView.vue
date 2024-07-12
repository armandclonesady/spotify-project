<template>
    <div class="fullwidth"> 
        <div v-if="trackResults.length > 0">
            <div @click="showTrack = !showTrack" class="result-type-container">
                <hr class="quarter-hr"> <img src="../assets/list-icon.png" :class="{'list-activated': showTrack}" class="list-icon">  <h2> Tracks </h2> <hr>
            </div>
            <div v-if="showTrack">
                <div class="track-list" v-if="showAllTrack">
                    <div v-for="track in trackResults" :key="track.id">
                        <LongTrackComponent :track="track"/>
                    </div>
                    <div class="centered button" @click="showAllTrack = false">
                        <h3> See less</h3>
                    </div>
                </div>
                <div class="track-list" v-else>
                    <div v-for="(track, index) in trackResults" :key="track.id">
                        <LongTrackComponent :track="track" v-if="index < previewLimit"/>
                    </div>
                    <div class="centered button" @click="showAllTrack = true">
                        <h3> See more</h3>  
                    </div>
                </div>
            </div>
        </div>

        <div v-if="artistResults.length > 0">
            <div @click="showArtist = !showArtist" class="result-type-container">
                <hr class="quarter-hr"> <img src="../assets/list-icon.png" :class="{'list-activated': showArtist}" class="list-icon"> <h2> Artists </h2> <hr>
            </div>
            <div v-if="showArtist">
                <div v-if="showAllArtist">
                    <div class="artist-results results">
                        <div v-for="artist in artistResults" :key="artist.id">
                            <ArtistComponent :artist="artist"/>
                        </div>
                    </div>
                    <div class="centered button"  @click="showAllArtist = false">
                        <h3> See less</h3>  
                    </div>
                </div>
                <div v-else>
                    <div>
                        <div class="artist-results results" >
                            <div v-for="(artist, index) in artistResults" :key="artist.id">
                                <ArtistComponent :artist="artist" v-if="index < previewLimit"/>
                            </div>
                        </div>
                    </div>
                    <div class="centered button"  @click="showAllArtist = true">
                        <h3> See more</h3>  
                    </div>
                </div>
            </div>
        </div>

        <div v-if="albumResults.length > 0">
            <div @click="showAlbum = !showAlbum" class="result-type-container">
                <hr class="quarter-hr"> <img src="../assets/list-icon.png" :class="{'list-activated': showAlbum}" class="list-icon"> <h2> Albums </h2> <hr>
            </div>
            <div v-if="showAlbum">
                <div v-if="showAllAlbum">
                    <div class="album-results results">
                        <div v-for="album in albumResults" :key="album.id">
                            <AlbumComponent :album="album"/>
                        </div>
                        <div class="centered button"  @click="showAllAlbum = false">
                            <h3> See less</h3>  
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div>
                        <div class="album-results results">
                            <div v-for="(album, index) in albumResults" :key="album.id">
                                <AlbumComponent :album="album" v-if="index < previewLimit"/>
                            </div>
                        </div>
                    </div>
                    <div class="centered button"  @click="showAllAlbum = true">
                        <h3> See more</h3>  
                    </div>
                </div>
            </div>
        </div>

        <div v-if="playlistResults.length > 0" >
            <div @click="showPlaylist = !showPlaylist" class="result-type-container">
                <hr class="quarter-hr"> <img src="../assets/list-icon.png" :class="{'list-activated': showPlaylist}" class="list-icon"> <h2> Playlists </h2> <hr>
            </div>
            <div v-if="showPlaylist">
                <div class="playlist-results results" v-if="showAllPlaylist">
                    <div v-for="playlist in playlistResults" :key="playlist.id">
                        <PlaylistComponent :playlist="playlist"/>
                    </div>
                </div>
                <div class="centered button"  @click="showAllPlaylist = false">
                    <h3> See less</h3>  
                </div>
                <div v-if="!showAllPlaylist">
                    <div class="playlist-results results">
                        <div v-for="(playlist, index) in playlistResults" :key="playlist.id">
                            <PlaylistComponent :playlist="playlist" v-if="index < previewLimit"/>
                        </div>
                    </div>
                    <div class="centered button"  @click="showAllPlaylist = true">
                        <h3> See more</h3>  
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { allowedTypes, previewLimit } from '@/functions/utils';
import { Track, Album } from '@/functions/spotifyTypes';
import { defineComponent, onMounted, ref, watch } from 'vue';
import LongTrackComponent from './itemViews/components/LongTrackComponent.vue';
import { parseAlbums, parseArtists, parsePlaylists, parseTracks } from '@/functions/parseBrowseData';
import AlbumComponent from '@/components/AlbumComponent.vue';
import ArtistComponent from '@/components/ArtistComponent.vue';
import PlaylistComponent from '@/components/PlaylistComponent.vue';

export default defineComponent({
    props: {
        results: {
            type: Array,
            required: true
        }
    },
    components: {
        LongTrackComponent,
        AlbumComponent,
        ArtistComponent,
        PlaylistComponent
    },

    setup(props) {
        const searchResults = ref<Array<any>>([]);

        const albumResults = ref<Array<any>>([]);
        const artistResults = ref<Array<any>>([]);
        const playlistResults = ref<Array<any>>([]);
        const trackResults = ref<Array<Track>>([]);

            
        const showAlbum = ref(true);
        const showArtist = ref(true);
        const showPlaylist = ref(true);
        const showTrack = ref(true);
        const showAllAlbum = ref(false);
        const showAllArtist = ref(false);
        const showAllPlaylist = ref(false);
        const showAllTrack = ref(false);

        const updateArrays = () => {
            searchResults.value = props.results;
            albumResults.value = [];
            artistResults.value = [];
            playlistResults.value = [];

            trackResults.value = parseTracks(searchResults.value.filter((item) => item.type === "track"));
            albumResults.value = parseAlbums(searchResults.value.filter((item) => item.type === "album"));
            artistResults.value = parseArtists(searchResults.value.filter((item) => item.type === "artist"));
            playlistResults.value = parsePlaylists(searchResults.value.filter((item) => item.type === "playlist"));
            // searchResults.value.forEach((item) => {
            //     if (item.type === "album") {
            //         albumResults.value.push(item);
            //     } else if (item.type === "artist") {
            //         artistResults.value.push(item);
            //     } else if (item.type === "playlist") {
            //         playlistResults.value.push(item);
            //     } else if (item.type === "track") {
            //         let artistsList: Array<any> = [];
            //         item.artists.forEach((artist: { name: string; id: string; }) => {
            //             const artistItem = {
            //                 name: artist.name,
            //                 id: artist.id,
            //             }
            //             artistsList.push(artistItem);
            //         });
            //         let track: Track = {
            //             id: item.id,
            //             name: item.name,
            //             artists: artistsList,
            //             album: item.album.name,
            //             duration_ms: item.duration_ms,
            //         };
            //         if (item.album.images[0]) {
            //             track.image = item.album.images[0].url;
            //         }
            //         trackResults.value.push(track);
            //     }
            // });
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
        return { 
            albumResults, artistResults, playlistResults, trackResults, 
            showAlbum, showArtist, showPlaylist, showTrack,
            showAllAlbum, showAllArtist, showAllPlaylist, showAllTrack,
            previewLimit,
            };
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
    flex-wrap: nowrap;
    width: 100%;
    color: var(--white);
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
    margin: 1dvw;
}

.centered {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
}

.button:hover, .button:hover hr{
    color: var(--spotify-green);
    border-color: var(--spotify-green);
    cursor: pointer;
    transition: all 0.5s;
}

.result-type-container .list-icon {
    width: 20px;
    height: 20px;
    margin: 10px;
    filter: invert(1);
    transform: rotate(180deg);
    transition: all 0.5s;
}

.result-type-container .list-activated {
    transform: rotate(0deg);
    transition: all 0.5s;
}

.result-type-container:hover .list-icon {
    filter: invert(57%) sepia(20%) saturate(1691%) hue-rotate(88deg) brightness(96%) contrast(89%);
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
    height: 40dvh;
    width: 40dvh;
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