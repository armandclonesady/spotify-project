<template>
        <div class="album">
            <div class="coverArt">
                <img v-if="album.images[0].url" :src="album.images[0].url" alt="cover art">
            </div>
            <div class="info">
                <h4> {{ albumName }}</h4>
                <p> {{ artist }}</p>
            </div>
        </div>
</template>
<script lang="ts">
import { convertDate } from '@/functions/utils';
import { ref } from 'vue';
import { nameTooLong, shortenName } from '@/functions/utils';
export default {
    props: {
        album: {
            type: Object,
            required: true
        }
    },
    setup(props: any) {
        const albumName = ref<string>(props.album.name);
        const artist = ref<string>(props.album.artists[0].name);
        if (nameTooLong(albumName.value)) {
            albumName.value = shortenName(albumName.value);
        }
        if (nameTooLong(artist.value)) {
            artist.value = shortenName(artist.value);
        }
        return  { props, albumName, artist, convertDate };
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