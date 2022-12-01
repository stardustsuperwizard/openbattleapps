<script setup>
import { computed } from "vue";

const props = defineProps({
    skillAttributeImported: {
        type: Number,
        default: 1
    },
    difficultyImported: {
        type: Number,
        default: 1
    }
});

const diceRollRequired = computed(() => {
    // console.log(props.skillAttributeImported);
    // console.log(props.difficultyImported);
    let score = props.skillAttributeImported - props.difficultyImported;
    if (score >= 9) {
        return '2+ (Re-roll failed dice)'
    } else {
        let dividend = props.skillAttributeImported / props.difficultyImported;
        if (dividend < 0.5) {
            if (props.difficultyImported.value - (props.skillAttributeImported.value * 2) === 1) {
                return '6'
            } else { 
                return 'Not possible.'
            } 
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


