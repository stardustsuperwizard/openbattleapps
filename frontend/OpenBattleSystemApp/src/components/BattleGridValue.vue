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
    let score = skillAttribute.value - difficulty.value;
    if (score >= 9) {
        return '2+ (Re-roll failed dice)'
    } else {
        let dividend = skillAttribute.value / difficulty.value;
        if (dividend < 0.5) {
            return 'Not possible.'
        } else if (dividend === 0.5) {
            return '6'
        } else if (dividend > 0.5 && dividend < 1) {
            return '5+'  
        } else if (dividend === 1) {
            return '4+'
        } else if (dividend > 1 && dividend < 2) {
            return '3+'
        } else if (dividend >= 2) {
            return '2+'
        }  
    }
});
</script>


<template>
    <div class="form-floating">
        <input type="text" name="gearTotalCost" id="gearTotalCost" class="form-control" v-bind:value="diceRollRequired" disabled>
        <label for="gearTotalCost">Required Roll</label>
    </div>
</template>


