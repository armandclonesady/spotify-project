<template>
    <div class="browse">
        <h1>Browse</h1>
        <div class="controls">
            <form @submit.prevent="handleSubmit">
                <div class="o">
                    <input type="text" v-model="searchQuerry" placeholder="Search for an artist, album, or song...">
                    <div>
                        <button v-for="type in allowedTypes" :key="type" @click.prevent="handleButton" :value="type" :class="{'activated': searchTypes.includes(type)}" class="type-button"> {{ type }}</button>
                    </div>
                </div>
                <input type="submit" value="Search Spotify!">
            </form>
        </div>
        <div v-if="errorMessage">
            <p> {{ errorMessage }}</p>
        </div>
        <div v-else class="results">
            <ItemsView :results="searchResults"></ItemsView>
        </div>
    </div>  
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { allowedTypes } from '@/functions/utils';
import { getSearch, getToken } from '@/functions/spotifyFunctions';
import ItemsView from './ItemsView.vue';
import router from '@/router';

export default defineComponent({
    name: 'BrowseView',
    components: {
        ItemsView
    },
    setup() {
        const searchQuerry = ref<string>('');
        const searchType = ref<string>('track');
        const searchTypes = ref<Array<string>>([]);
        const errorMessage = ref<string>('');
        const searchResults = ref<Array<any>>([]);

        const searchSpotify = async() => {
            getSearch(searchQuerry.value, searchTypes.value).then((response) => {   
                searchResults.value = [];
                errorMessage.value = '';
                if (response !== undefined) {
                    let computedResults: Array<any> = [];
                    allowedTypes.forEach((type) => {
                        if (response[type+"s"] !== undefined) {
                            computedResults = computedResults.concat(response[type+"s"].items);
                        }
                    });
                    if (computedResults.length === 0) {
                        errorMessage.value = "No results found";
                    } else {
                        searchResults.value = computedResults;
                    }
                } else {
                    errorMessage.value = "No results found";
                }
            });
        }

        const handleSubmit = async() => {
                if (searchQuerry.value === '') {
                    errorMessage.value = "Please enter a search query";
                    return;
                } else if (searchTypes.value.length === 0) {
                    errorMessage.value = "Please select at least one type";
                    return;
                }
                router.replace({query: {search: searchQuerry.value, type: searchTypes.value}});
                searchSpotify();
            }
        onMounted(() => {
            if (localStorage.getItem('token') === null) {
                getToken();
            }
        });
        if (router.currentRoute.value.query.search && router.currentRoute.value.query.type) {
            const search = router.currentRoute.value.query.search as string;
            const type = router.currentRoute.value.query.type as Array<string>;

            searchQuerry.value = search;
            searchTypes.value = Array.isArray(type) ? type : [type];
            searchSpotify();
        }

        const handleButton = async(event: any) => {
            const clickedType = event.target.value;
            if (!searchTypes.value.includes(clickedType)) {
                searchTypes.value.push(clickedType);
            } else {
                searchTypes.value.splice(searchTypes.value.indexOf(clickedType), 1);
            }
        }

        return { searchQuerry, allowedTypes, searchType, errorMessage , searchResults, handleSubmit, searchTypes, handleButton };
    },
});
</script>

<style>
.type-button {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 5px 15px;
    margin: 5px;
    cursor: pointer;
    border-radius: 15px;
}

.activated {
    background-color: var(--primary-50);
}
</style>