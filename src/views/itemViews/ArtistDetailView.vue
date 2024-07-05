<template>
    <div class="data" v-if="artistData">
        <div class="generalInfo">
            <div class="icon-name">
                <a  :href="artistData.external_urls.spotify">
                    <img v-if="artistData.images[0]" :src="artistData.images[0].url" alt="artist image" class="artist-icon canHover">
                    <img v-else src="../../assets/default-artist-pfp.jpg" alt="artist-icon" class="artist-icon canHover">
                </a>
                <h1> {{ artistData.name }} </h1>
            </div>
            <h2> {{ followers }} monthly listeners</h2>
        </div>
        <div class="popularTracks">
            <h2> Popular Tracks </h2>
            <div class="track-list" v-if="popularTracks">
                <LongTrackComponent :track="track" :index="index+1" v-for="(track, index) in popularTracks" :key="index"/>
            </div>
            <div v-else>
                <p> loading...</p>
            </div>
        </div>
        <div class="albums">
            <h2> Albums </h2>
            <div class="album-list gridContainer" v-if="albums">
                <div v-for="album in albums" :key="album.id" class="gridObject">
                    <SimplifiedAlbumComponent :album="album"/>
                </div>
            </div>
            <div v-else>
                <p> loading...</p>
            </div>
        </div>
        <div class="related-artists">
            <h2> Related Artists </h2>
            <div class="artist-list">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { getArtist, getArtistAlbums, getArtistTracks } from '@/functions/spotifyFunctions';
import { convertFollowers } from '@/functions/utils';
import LongTrackComponent from './components/LongTrackComponent.vue';
import SimplifiedAlbumComponent from './components/SimplifiedAlbumComponent.vue';
import type { Album, Track } from '@/functions/spotifyTypes';
import router from '@/router';
import { onBeforeRouteUpdate } from 'vue-router';

export default defineComponent({
    name: 'ArtistDetailView',
    props: {
        id: {
            type: String,
        }
    },
    components: {
        LongTrackComponent,
        SimplifiedAlbumComponent,
    },
    setup(props) {
        const artistData = ref<any>();
        const popularTracks = ref<Array<Track>>([]);
        const albums = ref<Array<Album>>([]);
        const followers = ref<string>('');
        const isHovering = ref<boolean>(false);
        const getArtistData = async() => {
            if (props.id) {
                const data = await getArtist(props.id);
                const albumsdata = await getArtistAlbums(props.id);
                const tracksdata = await getArtistTracks(props.id);
                if (!data || !albumsdata || !tracksdata) {
                    router.push({ name: 'unknown' });
                    return;
                }
                artistData.value = data;
                tracksdata.tracks.forEach((track: any) => {
                    let artistsList: Array<any> = [];
                    track.artists.forEach((artist: { name: string; id: string; }) => {
                        const artistItem = {
                            name: artist.name,
                            id: artist.id,
                        }
                        artistsList.push(artistItem);
                    });
                    let trackItem: Track = {
                        id: track.id,
                        name: track.name,
                        album: track.album.name,
                        artists: artistsList,
                        duration_ms: track.duration_ms,
                    };
                    if (track.album.images[0]) {
                        const image = track.album.images[0].url;
                        trackItem.image = image;
                    }
                    popularTracks.value.push(trackItem);
                });
                albumsdata.items.forEach((album: any) => {
                    let artistsList: Array<string> = [];
                    album.artists.forEach((artist: { name: string; }) => {
                        artistsList.push(artist.name);
                    });
                    let albumItem: Album = {
                        id: album.id,
                        name: album.name,
                        type: album.album_type,
                        artists: artistsList,
                        image: album.images[0].url,
                        release_date: album.release_date,
                    };
                    albums.value.push(albumItem);
                });
                followers.value = convertFollowers(artistData.value.followers.total);
            }
        }
        onMounted(() => {
            getArtistData();
        });

        onBeforeRouteUpdate((to, from, next) => {
            console.log("test");
            getArtistData();
        });

        return { props, artistData, albums, popularTracks, followers, isHovering};
    },
})
</script>

<style>
.data {
    height: 100%;
    width: 100%;
}

.generalInfo, .related-artists {
    background: var(--spotify-green-50);
    transition: all 0.5s;
    border-radius: 25px;
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: space-between;
    padding: 20px;
    margin: 1dvh 0;
}

.track-list {
    width: 100%;
}

.popularTracks, .albums {
    background: var(--spotify-green-50);
    transition: all 0.5s;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: space-between;
    padding: 20px;
    margin: 1dvh 0;
    overflow: hidden;
}

.generalInfo:hover, .related-artists:hover {
    background: var(--spotify-green);
    transition: all 0.5s;
}

.icon-name {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.generalInfo h2, .icon-name h1 {
    margin: 0;
}

.artist-icon {
    width: 20dvh;
    height: 20dvh;
    padding:0 40px;
    object-fit: cover;
    border-radius: 100%;
}

.gridContainer {
    display: grid;
    grid-template-columns: repeat(6, [col-start] 1fr [col-end]);
    gap: 2dvw;
    width: 100%;
}
</style>
