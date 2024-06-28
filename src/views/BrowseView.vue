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
        <div v-if="errorMessage">
            <p> {{ errorMessage }}</p>
        </div>
        <div class="results">
            <ItemsView :results="searchResults"></ItemsView>
        </div>
    </div>  
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { allowedTypes } from '@/functions/utils';
import { getSearch, getToken } from '@/functions/spotifyFunctions';
import ItemsView from './ItemsView.vue';

export default defineComponent({
    name: 'BrowseView',
    components: {
        ItemsView
    },
    setup() {
        const searchQuerry = ref<string>('');
        const searchType = ref<string>('');
        const errorMessage = ref<string>('');
        const searchResults = ref<Array<any>>([]);


        const searchSpotify = async() => {
            getSearch(searchQuerry.value, searchType.value).then((response) => {
                searchResults.value = [];
                errorMessage.value = '';
                if (response !== undefined) {
                    if (response["error"] !== undefined) {
                        getToken();
                        searchSpotify();
                    } else {
                        const computedResults = response[searchType.value+"s"].items.filter((item: any) => {
                            return item !== null;
                        })
                        if (computedResults.length === 0) {
                            errorMessage.value = "No results found";
                        } else {
                            searchResults.value = computedResults;
                        }
                    }
                }
            });
        }

        return { searchQuerry, allowedTypes, searchType, errorMessage , searchResults, searchSpotify };
    },
});
</script>
