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

function previousMove() {
    let index;
    if (props.indexNumber == (props.playerList.length + 1)) {
        index = props.playerList.length - 1;
        emit("update:index", index);
    } else if (props.indexNumber > 0) {
        index = props.indexNumber;
        index--;
        emit("update:index", index);
    }
}
</script>


<template>
<button v-on:click.prevent="previousMove">Previous Move</button>
</template>