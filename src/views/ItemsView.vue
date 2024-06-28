<template>
    <div class="item" v-for="item in props.results" :key="item">
        <!-- <ItemPreview :result="item"/> -->
         <p> {{ item.name }}</p>
    </div>
</template>

<script lang="ts">
// import ItemPreview from '@/components/ItemPreview.vue';
import { defineComponent, ref } from 'vue'

export default defineComponent({
    props: {
        results: {
            type: Object,
            required: true
        }
    },
    components: {
        // ItemPreview
    },

    setup(props) {
        return { props }
    },
})
</script>
