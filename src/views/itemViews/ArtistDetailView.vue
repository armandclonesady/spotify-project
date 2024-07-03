<template>
    <div class="artist-data" v-if="artistData">
        <div class="generalInfo">
            <div class="icon-name">
                <a :href="artistData.external_urls.spotify">
                    <img :src="artistData.images[0].url" alt="artist image" class="artist-icon">
                </a>
                <h1> {{ artistData.name }} </h1>
            </div>
            <p> {{ followers }} monthly listeners</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getArtist } from '@/functions/spotifyFunctions';
import { convertFollowers } from '@/functions/utils';

export default defineComponent({
    name: 'ArtistDetailView',
    props: {
        id: {
            type: String,
        }
    },
    setup(props) {
        const artistData = ref<any>();
        const followers = ref<string>('');
        const isHovering = ref<boolean>(false);
        const getArtistData = async() => {
            if (props.id) {
                artistData.value = await getArtist(props.id);
                followers.value = convertFollowers(artistData.value.followers.total);
            }
        }


        onMounted(() => {
            getArtistData();
            console.log(artistData.value);
        });
        return { props, artistData, followers, isHovering};
    },
})
</script>

<style>
.artist-data {
    background: var(--primary);
    height: 100%;
    width: 100%;
    border-radius: 25px;
}

.generalInfo {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    padding: 20px;
}

.icon-name {
    display: flex;
    flex-direction: row;
    align-items: baseline;

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
