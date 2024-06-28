<template>
    <div class="item" v-for="item in props.results" :key="item">
         <h3> {{ item.name }}</h3>
         <ItemPreview :result="item"></ItemPreview>

    </div>
</template>

<script lang="ts">
import ItemPreview from '@/components/ItemPreview.vue';
import { defineComponent, ref } from 'vue'

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
.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5dvh;
    margin: 3dvh 20%;
    border-radius: 3dvw;

    background: var(--primary);
    color: var(--white);
}
</style>