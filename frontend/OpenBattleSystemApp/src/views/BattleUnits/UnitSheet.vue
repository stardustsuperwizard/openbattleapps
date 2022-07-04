<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from '@/components/NavBar.vue';

const route = useRoute();
const router= useRouter();

const pointCostStarting = ref(0);
const rangedCombatStarting = ref(0);
const closeCombatStarting = ref(0);
const physicalToughnessStarting = ref(0);
const mentalToughnessStarting = ref(0);
const hitPointsStarting = ref(0);
const combatSaveStarting = ref(0);
const movementStarting = ref(0);

const unitId = ref(null);
const unitName = ref('');
const rangedCombat = ref(0);
const closeCombat = ref(0);
const physicalToughness = ref(0);
const mentalToughness = ref(0);
const hitPoints = ref(1);
const combatSave = ref(0);
const movement = ref(0);

const units = ref([]);

const vMyDirective = {
    beforeMount: (el) => {
        if (route.params.id != 'new') {
            editBattleUnit(parseInt(route.params.id));
        }
    }
}

const valueRC = computed(() => { return rangedCombatStarting.value + rangedCombat.value });
const valueCC = computed(() => { return closeCombatStarting.value + closeCombat.value });
const valueCS = computed(() => { return combatSaveStarting.value + combatSave.value });
const valuePT = computed(() => { return physicalToughnessStarting.value + physicalToughness.value });
const valueMT = computed(() => { return mentalToughnessStarting.value + mentalToughness.value });
const valueHP = computed(() => { return hitPointsStarting.value + hitPoints.value });
const valueMV = computed(() => { return movementStarting.value + movement.value });

const pointcostRC = computed(() => { return rangedCombatPointCost(rangedCombat.value, hitPoints.value) });
const pointcostCC = computed(() => { return closeCombatPointCost(closeCombat.value, hitPoints.value) });
const pointcostCS = computed(() => { return combatSavePointCost(combatSave.value, hitPoints.value) });
const pointcostPT = computed(() => { return physicalToughnessPointCost(physicalToughness.value, hitPoints.value )});
const pointcostMT = computed(() => { return mentalToughnessPointCost(mentalToughness.value, hitPoints.value) });
const pointcostHP = computed(() => { return hitPointsPointCost(hitPoints.value ) });
const pointcostMV = computed(() => { return movementPointCost(movement.value, hitPoints.value) });

const totalCost = computed(() => { return totalCostCalculator() });

function totalCostCalculator() {
    return totalUnitPointCost( pointcostRC.value, pointcostCC.value, pointcostPT.value, pointcostMT.value, pointcostCS.value, pointcostMV.value, pointcostHP.value );

//     let baseCost = pointCostStarting.value + totalUnitPointCost( pointcostRC.value, pointcostCC.value, pointcostPT.value, pointcostMT.value, pointcostCS.value, pointcostMV.value, pointcostHP.value );
//     if (baseCost >= 11) {
//         return baseCost * (baseCost * 0.10)
//     } else {
//         return baseCost
//     }

// if (baseCost > 10 && baseCost < 16 ) {
    //     return baseCost * 1.5
    // } else if (baseCost >= 16) {
    //     return baseCost * (baseCost * 0.10)
    // } else {
    //     return baseCost
    // }
}

function addBattleUnit() {
    let tempUnit;
    if (unitId.value != null) {
        tempUnit = {
            id: unitId.value,
            unitName: unitName.value,
            rangedCombat: rangedCombat.value,
            closeCombat: closeCombat.value,
            physicalToughness: physicalToughness.value,
            mentalToughness: mentalToughness.value,
            hitPoints: hitPoints.value,
            combatSave: combatSave.value,
            movement: movement.value,
            totalPointCost: totalCost.value,
        }
    } else {
        tempUnit = {
            unitName: unitName.value,
            rangedCombat: rangedCombat.value,
            closeCombat: closeCombat.value,
            physicalToughness: physicalToughness.value,
            mentalToughness: mentalToughness.value,
            hitPoints: hitPoints.value,
            combatSave: combatSave.value,
            movement: movement.value,
            totalPointCost: totalCost.value,
        }
    }
    idb.createEntry('Units', tempUnit);
    router.back();
}

function deleteBattleUnit() {
    idb.deleteEntry('Units', unitId.value);
    router.push('/battleunits/list');
}

function editBattleUnit(id) {
    idb.readTableEntry('Units', id)
        .then((resp) => {
            unitId.value = resp.id;
            unitName.value = resp.unitName;
            rangedCombat.value = resp.rangedCombat;
            closeCombat.value = resp.closeCombat;
            physicalToughness.value = resp.physicalToughness;
            mentalToughness.value = resp.mentalToughness;
            hitPoints.value = resp.hitPoints;
            combatSave.value = resp.combatSave;
            movement.value = resp.movement;
        });
}
</script>


<template>
<div v-my-directive>
    <NavBar>
        <template #left>
            <router-link to="/battleunits/list" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </router-link>
        </template>
        <template #right>
            <a href="#" v-on:click.prevent="addBattleUnit" class="d-flex align-items-center text-dark text-decoration-none"><span class="fs-4">Save +</span></a>
        </template>
    </NavBar>

    <div class="container-md mt-5">
        <div class="row pt-1">
            <div class="col">
                <form action="">

                    <div class="row mb-3">
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="unitName" id="unitName" class="form-control" v-model="unitName">
                                <label for="unitName">Battle Unit Name</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Ranged Combat</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="rangedCombat--" :disabled="rangedCombat == 0">-</button>
                            <input inputmode="text" type="text" name="rangedCombat" id="rangedCombat" class="form-control" v-bind:value="valueRC">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="rangedCombat++">+</button>
                        </div>
                        <div class="col-sm">
                           <div class="form-floating">
                                <input type="text" name="rangedCombatCost" id="rangedCombatCost" class="form-control" v-bind:value="pointcostRC" disabled>
                                <label for="rangedCombatCost">Cost</label>
                           </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Close Combat</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="closeCombat--" :disabled="closeCombat == 0">-</button>
                            <input inputmode="text" type="text" min="1" max="5" name="closeCombat" id="closeCombat" class="form-control"  v-bind:value="valueCC">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="closeCombat++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="closeCombatCost" id="closeCombatCost" class="form-control" v-bind:value="pointcostCC" disabled>
                                <label for="closeCombatCost">Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Physical Toughness</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="physicalToughness--" :disabled="physicalToughness == 0">-</button>
                            <input inputmode="text" type="text" min="0" name="physicalToughness" id="physicalToughness" class="form-control" v-bind:value="valuePT">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="physicalToughness++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="physicalToughnessCost" id="physicalToughnessCost" class="form-control" v-bind:value="pointcostPT" disabled>
                                <label for="physicalToughnessCost">Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Mental Toughness</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="mentalToughness--" :disabled="mentalToughness == 0">-</button>
                            <input inputmode="text" type="text" min="0" name="mentalToughness" id="mentalToughness" class="form-control" v-bind:value="valueMT">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="mentalToughness++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="mentalToughnessCost" id="mentalToughnessCost" class="form-control" v-bind:value="pointcostMT" disabled>
                                <label for="mentalToughnessCost">Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Hit Points</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="hitPoints--" :disabled="hitPoints == 0">-</button>
                            <input inputmode="text" type="text" min="0" name="hitPoints" id="hitPoints" class="form-control" v-bind:value="valueHP">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="hitPoints++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="hitPointsCost" id="hitPointsCost" class="form-control" v-bind:value="pointcostHP" disabled>
                                <label for="hitPointsCost">Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Combat Save</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="combatSave--" :disabled="combatSave == 0">-</button>
                            <input inputmode="text" type="text" min="1" max="5" name="combatSave" id="combatSave" class="form-control"  v-bind:value="valueCS">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="combatSave++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="combatSaveCost" id="combatSaveCost" class="form-control" v-bind:value="pointcostCS" disabled>
                                <label for="combatSaveCost">Cost</label>
                            </div>
                        </div>
                    </div>
        
                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Movement</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="movement--" :disabled="movement == 0">-</button>
                            <input inputmode="numeric" type="text" min="0" max="5" name="movement" id="movement" class="form-control" v-bind:value="valueMV">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="movement++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="movementCost" id="movementCost" class="form-control" v-bind:value="pointcostMV" disabled>
                                <label for="movementCost">Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="totalCost" id="totalCost" class="form-control" v-bind:value="totalCost" disabled>
                                <label for="totalCost">Total Cost</label>
                            </div>
                        </div>
                    </div>
                    <!-- <input type="Button" value="Clear" class="btn btn-secondary mt-3 mx-3" v-on:click.prevent="resetForm"> -->
                    <button class="btn btn-danger mt-3" v-on:click="deleteBattleUnit()">Delete</button>

                </form>
            </div>
        </div>
    </div>
</div>
</template>


<style>

</style>