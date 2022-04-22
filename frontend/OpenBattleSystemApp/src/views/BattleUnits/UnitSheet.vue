<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from '@/components/NavBar.vue';

const route = useRoute();
const router= useRouter();

const unitId = ref(null);
const unitName = ref('');
const rangedCombat = ref(0);
const closeCombat = ref(0);
const physicalToughness = ref(2);
const mentalToughness = ref(2);
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

const pointcostRC = computed(() =>  (Math.pow(1.50, rangedCombat.value) - 1 ) * hitPoints.value );
const pointcostCC = computed(() => { return ( Math.pow(1.50, closeCombat.value) - 1 ) * hitPoints.value });
const pointcostCS = computed(() => { return ( Math.pow(1.50, combatSave.value) - 1 ) * hitPoints.value });
const pointcostPT = computed(() => { return ( Math.pow(1.15, physicalToughness.value ) ) * hitPoints.value });
const pointcostMT = computed(() => { return ( Math.pow(1.15, mentalToughness.value ) ) * hitPoints.value });
const pointcostHP = computed(() => { return ( Math.pow(1.25, hitPoints.value) ) });
const pointcostMV = computed(() => { return ( 0.25 * movement.value ) * hitPoints.value });
const totalCost = computed(() => { return Math.round(( pointcostRC.value + pointcostCC.value + pointcostPT.value + pointcostMT.value + pointcostCS.value + pointcostMV.value + pointcostHP.value )) });

const rangedCombatValue = computed(() => { return levelToValue(rangedCombat) });
const closeCombatValue = computed(() => { return levelToValue(closeCombat) });
const combatSaveValue = computed(() => { return levelToValue(combatSave) });

function levelToValue(att) {
    if (att.value == 1) {
        return '6+'
    } else if (att.value == 2) {
        return '5+'
    } else if (att.value == 3) {
        return '4+'
    } else if (att.value == 4) {
        return '3+'
    } else if (att.value == 5) {
        return '2+'
    }
}

function addBattleUnit() {
    let tempUnit;
    if (unitId.value != null) {
        tempUnit = {
            id: unitId.value,
            unitName: unitName.value,
            rangedCombat: rangedCombat.value,
            rangedCombatValue: rangedCombatValue.value,
            closeCombat: closeCombat.value,
            closeCombatValue: closeCombatValue.value,
            physicalToughness: physicalToughness.value,
            mentalToughness: mentalToughness.value,
            hitPoints: hitPoints.value,
            combatSave: combatSave.value,
            combatSaveValue: combatSaveValue.value,
            movement: movement.value,
            totalPointCost: totalCost.value,
        }
    } else {
        tempUnit = {
            unitName: unitName.value,
            rangedCombat: rangedCombat.value,
            rangedCombatValue: rangedCombatValue.value,
            closeCombat: closeCombat.value,
            closeCombatValue: closeCombatValue.value,
            physicalToughness: physicalToughness.value,
            mentalToughness: mentalToughness.value,
            hitPoints: hitPoints.value,
            combatSave: combatSave.value,
            combatSaveValue: combatSaveValue.value,
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
                            <input inputmode="numeric" type="number" min="0" max="5" name="rangedCombat" id="rangedCombat" class="form-control" v-model="rangedCombat">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="rangedCombat--">-</button>
                            <button class="btn btn-outline-secondary" v-on:click.prevent="rangedCombat++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="rangedCombatValue" id="rangedCombatValue" class="form-control" v-bind:value="rangedCombatValue" disabled>
                                <label for="rangedCombatValue">Value</label>
                            </div>
                        </div>
                       <div class="col-sm">
                           <div class="form-floating">
                                <input type="number" name="rangedCombatCost" id="rangedCombatCost" class="form-control" v-bind:value="pointcostRC" disabled>
                                <label for="rangedCombatCost">Cost</label>
                           </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Close Combat</span>
                        </div>
                        <div class="col-sm input-group">
                            <input inputmode="numeric" type="number" min="1" max="5" name="closeCombat" id="closeCombat" class="form-control"  v-model="closeCombat">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="closeCombat--">-</button>
                            <button class="btn btn-outline-secondary" v-on:click.prevent="closeCombat++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="closeCombatValue" id="closeCombatValue" class="form-control" v-bind:value="closeCombatValue" disabled>
                                <label for="closeCombat">Value</label>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="number" name="closeCombatCost" id="closeCombatCost" class="form-control" v-bind:value="pointcostCC" disabled>
                                <label for="closeCombatCost">Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Physical Toughness</span>
                        </div>
                        <div class="col-sm input-group">
                            <input inputmode="numeric" type="number" min="0" name="physicalToughness" id="physicalToughness" class="form-control" v-model.number="physicalToughness">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="physicalToughness--">-</button>
                            <button class="btn btn-outline-secondary" v-on:click.prevent="physicalToughness++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="number" name="physicalToughnessValue" id="physicalToughnessValue" class="form-control" v-bind:value="physicalToughness" disabled>
                                <label for="physicalToughnessValue">Value</label>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="number" name="physicalToughnessCost" id="physicalToughnessCost" class="form-control" v-bind:value="pointcostPT" disabled>
                                <label for="physicalToughnessCost">Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Mental Toughness</span>
                        </div>
                        <div class="col-sm input-group">
                            <input inputmode="numeric" type="number" min="0" name="mentalToughness" id="mentalToughness" class="form-control" v-model.number="mentalToughness">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="mentalToughness--">-</button>
                            <button class="btn btn-outline-secondary" v-on:click.prevent="mentalToughness++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="number" name="mentalToughnessValue" id="mentalToughnessValue" class="form-control" v-bind:value="mentalToughness" disabled>
                                <label for="mentalToughnessValue">Value</label>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="number" name="mentalToughnessCost" id="mentalToughnessCost" class="form-control" v-bind:value="pointcostMT" disabled>
                                <label for="mentalToughnessCost">Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Hit Points</span>
                        </div>
                        <div class="col-sm input-group">
                            <input inputmode="numeric" type="number" min="0" name="hitPoints" id="hitPoints" class="form-control" v-model.number="hitPoints">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="hitPoints--">-</button>
                            <button class="btn btn-outline-secondary" v-on:click.prevent="hitPoints++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="number" name="hitPointsValue" id="hitPointsValue" class="form-control" v-bind:value="hitPoints" disabled>
                                <label for="hitPointsValue">Value</label>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="number" name="hitPointsCost" id="hitPointsCost" class="form-control" v-bind:value="pointcostHP" disabled>
                                <label for="hitPointsCost">Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Combat Save</span>
                        </div>
                        <div class="col-sm input-group">
                            <input inputmode="numeric" type="number" min="1" max="5" name="combatSave" id="combatSave" class="form-control"  v-model="combatSave">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="combatSave--">-</button>
                            <button class="btn btn-outline-secondary" v-on:click.prevent="combatSave++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="combatSaveValue" id="combatSaveValue" class="form-control" v-bind:value="combatSaveValue" disabled>
                                <label for="combatSaveValue">Value</label>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="number" name="combatSaveCost" id="combatSaveCost" class="form-control" v-bind:value="pointcostCS" disabled>
                                <label for="combatSaveCost">Cost</label>
                            </div>
                        </div>
                    </div>
        
                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Movement</span>
                        </div>
                        <div class="col-sm input-group">
                            <input inputmode="numeric" type="number" min="0" max="5" name="movement" id="movement" class="form-control" v-model.number="movement">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="movement--">-</button>
                            <button class="btn btn-outline-secondary" v-on:click.prevent="movement++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="number" name="movementValue" id="movementValue" class="form-control" v-bind:value="movement" disabled>
                                <label for="movementValue">Value</label>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="number" name="movementCost" id="movementCost" class="form-control" v-bind:value="pointcostMV" disabled>
                                <label for="movementCost">Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="number" name="totalCost" id="totalCost" class="form-control" v-bind:value="totalCost" disabled>
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