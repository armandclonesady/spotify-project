<template>
    <div class="results">
        <div class="item" v-for="item in props.results" :key="item">
            <ItemPreview :result="item"></ItemPreview>
        </div>
    </div>
</template>

<script lang="ts">
import ItemPreview from '@/views/ItemPreview.vue';
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        results: {
            type: Object,
            required: true
        }
    },
    components: {
        ItemPreview
    },

    setup(props) {
        return { props }
    },
})
</script>

<style>
.results {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 4%;
    width: 22%;
    aspect-ratio: 1 / 1;
    border-radius: 50px;

    background: var(--primary);
    color: var(--white);
}

.item:hover {
    background: var(--spotify-green);
    cursor: pointer;
}
</style>