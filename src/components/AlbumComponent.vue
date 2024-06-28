<template>
        <div class="album">
            <div class="coverArt">
                <img v-if="album.images[0].url" :src="album.images[0].url" alt="cover art">
            </div>
            <div class="info">
                <h3> {{ albumName }}</h3>
                <p> {{ album.artists[0].name }}</p>
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
        if (nameTooLong(albumName.value)) {
            albumName.value = shortenName(albumName.value);
        }
        return  { props, albumName, convertDate };
    }
}
</script>

<style>
.album {
    display: flex;
    flex-direction: row;
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
    width: 40%;
}

.coverArt img {
    width: 100%;
    height: 100%;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
}   
</style>