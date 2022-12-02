<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from '@/components/NavBar.vue';
import RangedCombatCalculator from '@/components/calculators/RangedCombatCalculator.vue';


const route = useRoute();
const router= useRouter();

const cover = ref(0);
const distance = ref(0);
const skillAttribute = ref(1);

const diceRollRequired = computed(() => {
    let score = skillAttribute.value - difficulty.value;
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

const difficulty = computed(() => {
    let distanceMod = distance.value / 6
    return (distanceMod - distanceMod % 1) + parseInt(cover.value)
});

</script>


<template>
<div>
    <NavBar>
        <template #left>
            <router-link to="/battlecalculators/list" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </router-link>
        </template>
    </NavBar>

    <RangedCombatCalculator></RangedCombatCalculator>
</div>
</template>


