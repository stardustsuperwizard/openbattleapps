<script setup>
import { defineProps } from "vue";

const props = defineProps({
    playerList: {
        type: Array,
        default: [1,2]
    },
    indexNumber: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits([
    "update:index"
])

function nextMove() {
    let index;
    if (props.indexNumber + 1 < props.playerList.length) {
        index = props.indexNumber;
        index++
        emit("update:index", index);
    } else {
        index = props.playerList.length + 1;
        emit("update:index", index);
    }
}
</script>


<template>
<button v-on:click.prevent="nextMove">Next Move</button>
</template>