<template>
    <div class="data" v-if="artistData">
        <div class="generalInfo">
            <div class="icon-name">
                <a  :href="artistData.external_urls.spotify">
                    <img v-if="artistData.images[0]" :src="artistData.images[0].url" alt="artist image" class="artist-icon">
                    <img v-else src="../../assets/default-artist-pfp.jpg" alt="artist-icon" class="artist-icon">
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
            <div class="album-list" v-if="albums">
            </div>
        </div>
        <div class="related-artists">
            <h2> Related Artists </h2>
            <div class="album-list">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getArtist, getArtistAlbums, getArtistTracks } from '@/functions/spotifyFunctions';
import { convertFollowers } from '@/functions/utils';
import LongTrackComponent from './components/LongTrackComponent.vue';
import router from '@/router';

export default defineComponent({
    name: 'ArtistDetailView',
    props: {
        id: {
            type: String,
        }
    },
    components: {
        LongTrackComponent
    },
    setup(props) {
        const artistData = ref<any>();
        const popularTracks = ref<any>();
        const albums = ref<any>();
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
                albums.value = albumsdata;
                popularTracks.value = tracksdata.tracks;
                followers.value = convertFollowers(artistData.value.followers.total);
            }
        }
        onMounted(() => {
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

.generalInfo, .albums, .related-artists {
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

.popularTracks {
    background: var(--spotify-green-50);
    transition: all 0.5s;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: space-between;
    padding: 20px;
    margin: 1dvh 0;

}

.generalInfo:hover, .albums:hover, .related-artists:hover {
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
    transition: all 1s;
}

.artist-icon:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: all 0.5s;
}
</style>
