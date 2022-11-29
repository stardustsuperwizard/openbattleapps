<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from '@/components/NavBar.vue';
import BattleGridValue from '@/components/BattleGridValue.vue';

const route = useRoute();
const router= useRouter();

const skillAttribute = ref(1);
const difficulty = ref(1);

const diceRollRequired = computed(() => {
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
                            <button class="btn btn-outline-secondary" v-on:click.prevent="skillAttribute--" :disabled="skillAttribute == 1">-</button>
                            <input inputmode="numeric" type="text" min="0" name="gearDistanceLevel" id="gearDistanceLEvel" class="form-control" v-model.number="skillAttribute">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="skillAttribute++">+</button>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Difficulty value</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="difficulty--" :disabled="difficulty == 1">-</button>
                            <input inputmode="numeric" type="text" min="1" name="gearAttackLevel" id="gearAttackLevel" class="form-control" v-model.number="difficulty">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="difficulty++" :disabled="difficulty == 20">+</button>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm">
                            <BattleGridValue :skillAttributeImported="skillAttribute" :difficultyImported="difficulty"></BattleGridValue>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
</template>


