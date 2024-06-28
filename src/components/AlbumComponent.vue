<template>
    <div class="album">
        <h4>{{ album.name }}</h4>
    </div>
</template>
<script>
import { defineComponent} from 'vue';
export default {
    props: {
        album: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        return (props);
    },
}
</script>