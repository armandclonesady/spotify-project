<template>
    <div @click="onClick">
        <AlbumComponent v-if="item.type === 'album'" :album="item"/>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import allowedTypes from '@/types/searchType';
import AlbumComponent from '@/components/AlbumComponent.vue';

export default defineComponent({
    components: {
        AlbumComponent
    },
    props: {
        result: {
            type: Object,
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

</style>