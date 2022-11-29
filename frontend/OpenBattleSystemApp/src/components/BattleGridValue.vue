<script setup>
import { computed } from "vue";

const props = defineProps({
    skillAttributeImported: {
        type: Number,
        default: 0
    },
    difficultyImported: {
        type: Number,
        default: 0
    }
});

const diceRollRequired = computed(() => {
    // console.log(props.skillAttributeImported);
    // console.log(difficulty.value);
    
    
});
</script>


<template>
    <div class="form-floating">
        <input type="text" name="gearTotalCost" id="gearTotalCost" class="form-control" v-bind:value="diceRollRequired" disabled>
        <label for="gearTotalCost">Required Roll</label>
    </div>
</template>


