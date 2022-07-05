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
    let score = parseInt(props.skillAttributeImported) - parseInt(props.difficultyImported);
    if (score === -3) {
        return '6 (roll second die, 6 required)'
    } else if (score === -2) {
        return '6'
    } else if (score === -1) {
        return '5+'
    } else if (score === 0) {
        return '4+'
    } else if (score === 1) {
        return '3+'
    } else if (score >= 2 && score <= 9) {
        return '2+'
    } else if (score >= 10) {
        return '2+ (Re-roll failed dice)'
    } else {
        return 'No chance'
    }
});
</script>


<template>
    <div class="form-floating">
        <input type="text" name="gearTotalCost" id="gearTotalCost" class="form-control" v-bind:value="diceRollRequired" disabled>
        <label for="gearTotalCost">Required Roll</label>
    </div>
</template>


