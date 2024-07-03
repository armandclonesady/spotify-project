<template>
    <div v-if="item !== null" class="item">
        <router-link :to="{ name: item.type, params: {id: item.id}}">
            <AlbumComponent v-if="item.type === 'album'" :album="item"/>
            <ArtistComponent v-else-if="item.type === 'artist'" :artist="item"/>
            <TrackComponent v-else-if="item.type === 'track'" :track="item"/>
            <PlaylistComponent v-else-if="item.type === 'playlist'" :playlist="item"/>
            <ShowComponent v-else-if="item.type === 'show'" :show="item"/>
        </router-link>
    </div>
    <div v-else>

    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { allowedTypes } from '@/functions/utils';
import AlbumComponent from '@/components/AlbumComponent.vue';
import ArtistComponent from '@/components/ArtistComponent.vue';
import TrackComponent from '@/components/TrackComponent.vue';
import PlaylistComponent from '@/components/PlaylistComponent.vue';
import ShowComponent from '@/components/ShowComponent.vue';

export default defineComponent({
    components: {
        AlbumComponent,
        ArtistComponent,
        TrackComponent,
        PlaylistComponent,
        ShowComponent
    },
    props: {
        result: {
            required: true
        }
    },
    setup(props) {
        const item = ref(props.result);
        const onClick = () => {
            console.log(item.value);
        };
        return { allowedTypes, item, onClick }
    },
})
</script>

<style>
.item {
    width: 300px;
    height: 300px;
    overflow: hidden;
}
</style>