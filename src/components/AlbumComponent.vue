<template>
        <router-link :to="{ name: 'album', params: {id: album.id}}" class="item">
            <div class="album">
                <div class="coverArt">
                    <img v-if="album.image" :src="album.image" alt="cover art">
                </div>
                <div class="info">
                    <h4> {{ albumName }}</h4>
                    <div v-if="artistList.length > 3">
                        <p> Various Artists </p>
                    </div>
                    <div v-else>
                        <p> <span v-for="(artist, index) in artistList" :key="index"> {{ artist.name }} </span> </p>
                    </div>
                </div>
            </div>
        </router-link>
</template>
<script lang="ts">
import { convertDate } from '@/functions/utils';
import { ref } from 'vue';
import { nameTooLong, shortenName } from '@/functions/utils';
import { Album } from '../functions/spotifyTypes';
export default {
    props: {
        album: {
            type: Object as () => Album,
            required: true
        }
    },
    setup(props: any) {
        const albumName = ref<string>(props.album.name);
        const artistList = ref<Array<string>>(props.album.artists);
        if (nameTooLong(albumName.value)) {
            albumName.value = shortenName(albumName.value);
        }
        for (let i = 0 ; i < artistList.value.length; i++) {
            if (nameTooLong(artistList.value[i])) {
                artistList.value[i] = shortenName(artistList.value[i]);
            }
        }
        return  { props, albumName, artistList, convertDate };
    }
}
</script>

<style>
.album {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.coverArt {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
}

.coverArt img {
    width: 20dvh;
    height: 20dvh;
    object-fit: cover;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
}   
</style>