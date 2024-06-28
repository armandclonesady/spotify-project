<template>
    <div @click="onClick">
        <!-- <div v-for="type in allowedTypes" :key="type">
            <div v-if="type === item.type">
                <p> this is {{ type }}</p>
            </div>
        </div> -->
        <p> {{ item.name }}</p>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import allowedTypes from '@/types/searchType';

export default defineComponent({
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