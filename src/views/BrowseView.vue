<template>
    <div class="browse">
        <h1>Browse</h1>
        <div class="controls">
            <input type="text" v-model="searchQuerry" placeholder="Search for an artist, album, or song...">
            <select name="type" v-model="searchType">
                <option v-for="type in allowedTypes" :key="type" :value="type"> {{ type }}</option>
            </select>
        </div>
        <button @click="searchSpotify"> Search </button>
        <div class="results">
            <ItemsView :results="searchResults"></ItemsView>
        </div>
    </div>  
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import allowedTypes from '@/types/searchType';
import { getSearch } from '@/functions/spotifyFunctions';
import ItemsView from './ItemsView.vue';

export default defineComponent({
    name: 'BrowseView',
    components: {
        ItemsView
    },
    setup() {
        const searchQuerry = ref<string>('');
        const searchType = ref('');

        const searchResults = ref<Array<any>>([]);


        const searchSpotify = async() => {
            getSearch(searchQuerry.value, searchType.value).then((response) => {
                if (response !== undefined) {
                    console.log(response[searchType.value+"s"].items);
                    searchResults.value = response[searchType.value+"s"].items;

                } else if (searchResults.value.length === 0) {
                    searchResults.value = [];
                }
            });
        }

        computed(() => {
            console.log(searchResults.value);
            return true;
        });

        return { searchQuerry, allowedTypes, searchType, searchResults, searchSpotify };
    },
});
</script>

<style>
</style>