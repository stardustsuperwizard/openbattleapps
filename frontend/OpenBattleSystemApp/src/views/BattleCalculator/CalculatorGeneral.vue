<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from '@/components/NavBar.vue';

const route = useRoute();
const router= useRouter();

const skillAttribute = ref(0);
const difficulty = ref(0);

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

    <div class="container-md mt-5">
        <div class="row pt-1">
            <div class="col">
                <section>
                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Attribute value</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="skillAttribute--" :disabled="skillAttribute == 0">-</button>
                            <input inputmode="numeric" type="text" min="0" name="gearDistanceLevel" id="gearDistanceLEvel" class="form-control" v-model.number="skillAttribute">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="skillAttribute++">+</button>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Difficulty value</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="difficulty--" :disabled="difficulty == 0">-</button>
                            <input inputmode="numeric" type="text" min="1" name="gearAttackLevel" id="gearAttackLevel" class="form-control" v-model.number="difficulty">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="difficulty++">+</button>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="gearTotalCost" id="gearTotalCost" class="form-control" v-bind:value="diceRollRequired" disabled>
                                <label for="gearTotalCost">Difficulty value</label>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
</template>


