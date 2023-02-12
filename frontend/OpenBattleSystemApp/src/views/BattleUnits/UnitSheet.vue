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
const reflexStarting = ref(0);

const unitId = ref(null);
const unitName = ref('');
const rangedCombat = ref(0);
const closeCombat = ref(0);
const physicalToughness = ref(0);
const mentalToughness = ref(0);
const hitPoints = ref(1);
const combatSave = ref(0);
const movement = ref(0);
const reflex = ref(0);

const selectedRules = ref({});

const units = ref([]);

const specialRules = ref({
    "2592-9ca5-f72d-103a": {
        "name": "Fearless",
        "id": "2592-9ca5-f72d-103a",
        "points": 0.0,
        "description": "Squad passes all Mental Toughness checks for Morale."
    },
    "681a-9bd5-68e2-8dc5" : {
        "name": "Deepstrike",
        "id": "681a-9bd5-68e2-8dc5",
        "points": 0.0,
        "description": "Squad begins the game in reserve, starting on round 2 this squad can be placed in the order of battle based on their initiative. When this squad is activated, their movement action is used to deploy anywhere on the board including in the engagement zone of an opposing squad. This move counts as their movement actions. The squad can continue with their remaining actions based on their squad status."
    },
    "4c70-78fe-51c8-d2a9" : {
        "name": "Fly",
        "id": "4c70-78fe-51c8-d2a9",
        "points": 0.0,
        "description": "Squad may pass over impassible squads or terrain."
    },
    "ae7d-7a7e-3bb6-bf16" : {
        "name": "Hive Mind",
        "id": "ae7d-7a7e-3bb6-bf16",
        "points": 0.0,
        "description": "When two or more squads are within 12” of each other they may use the highest Mental Toughness value for Morale Checks. If one of the the squads has Fearless this ability is conferred to the additional squad."
    },
    "8eae-e69f-a6d9-6eee" : {
        "name": "Hold Steady!",
        "id": "8eae-e69f-a6d9-6eee",
        "points": 0.0,
        "description": "When a squad remains stationary in the Action phase, subtract 1 from the Range Combat Difficulty value."
    },
    "2c8c-6a6e-9704-3c6a" : {
        "name": "Individual Character",
        "id": "2c8c-6a6e-9704-3c6a",
        "points": 0.0,
        "description": "If squad size is 1 unit, that unit may become an individual character. Individual Characters may attach to a squad at either the start of the game or by moving into coherency with that squad.\nThis confers the following advantages\:\n- Squad may use the individual character’s Mental Toughness attribute for Morale Checks.\n- Individual Character can no longer be targeted as a separate squad.\nIndividual characters may leave a squad by moving out of coherency."
    },
    "0bfb-425f-c71f-5e46" : {
        "name": "Infiltration",
        "id": "0bfb-425f-c71f-5e46",
        "points": 0.0,
        "description": "Unit wearing this armor is able to start the game anywhere on the board, but must be at least 6” away from any enemy squads."
    },
    "1ed5-199d-88cb-ebc6" : {
        "name": "Lucky Shot",
        "id": "1ed5-199d-88cb-ebc6",
        "points": 0.0,
        "description": "Squad units are able to hit on a roll of 6 regardless of difficulty."
    },
    "9017-f2a1-0870-0856" : {
        "name": "Sniper",
        "id": "9017-f2a1-0870-0856",
        "points": 0.0,
        "description": "Can target individual units In a squad."
    },
    "3c46-3884-957f-ddeb" : {
        "name": "Mob Rule",
        "id": "3c46-3884-957f-ddeb",
        "points": 0.0,
        "description": "Squad becomes a rally point. When a squad that is in status fallback and also has “mob rule” comes into contact with this squad, both squads may combine and have a status of normal."
    },
    "06e4-bfa9-4af0-6dc3" : {
        "name": "Patient",
        "id": "06e4-bfa9-4af0-6dc3",
        "points": 0.0,
        "description": "Used once per round at the beginning of your turn before any movement action. When declared, this squad drops to the bottom of the order of battle and play continues to the next player\’s turn.\nAdditionally, the squad gains the ability to declare patient again as an interrupt to the game round. When used, move this squad up in the battle order to go immediately following the current player\’s turn (including if you are the current player)."
    },
    "5944-c02b-39fe-46f1" : {
        "name": "Rally to Me!",
        "id": "5944-c02b-39fe-46f1",
        "points": 0.0,
        "description": "Prerequisites: Individual Character, Regroup\nThe unit/squad is now a considered a rally point and friendly squads may make a fallback move towards it. Individual Characters, cannot be a rally point for themselves and must fallback to the next nearest rally point. If the individual character is attached to a squad, the individual character and attached squad will fallback to the nearest rally point that is not the individual character."
    },
    "83ed-5b2a-523f-914e" : {
        "name": "Regeneration",
        "id": "83ed-5b2a-523f-914e",
        "points": 0.0,
        "description": "In the morale phase before any morale tests are taken, for every HP lost the unit may make a roll to attempt to recover lost HP. Form a pool of d6, 1 for every HP lost and roll. For each result of 5+, one Hit Point is restored. This ability can negate a morale check if all lost HP is recovered and one was required."
    },
    "0369-d009-4bb5-066e" : {
        "name": "Regroup",
        "id": "0369-d009-4bb5-066e",
        "points": 0.0,
        "description": "When a Squad begins the turn with the status of Fallback, in the Morale Phase, they will automatically regroup. Squad Status shall change to Normal."
    },
    "cbc9-55bd-024d-e154" : {
        "name": "Wipe Them Out!",
        "id": "cbc9-55bd-024d-e154",
        "points": 0.0,
        "description": "During the movement phase, if this squad makes contact with a defending squad that has the status of \’Fallback\’ the attacking squad make attempt to remove defending squad from the game:\n- Form a pool of D6, 1 for each Hit Point in the defending squad.\n- Attacker rolls dice from the pool and for each roll of a 6, one hit point is removed from the defending squad. No \‘to save\’ roll is permitted."
    }
});


const vMyDirective = {
    beforeMount: (el) => {
        if (route.params.id != 'new') {
            editBattleUnit(route.params.id);
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
const valueRF = computed(() => { return reflexStarting.value + reflex.value });

const pointcostRC = computed(() => { return rangedCombatPointCost(rangedCombat.value, hitPoints.value) });
const pointcostCC = computed(() => { return closeCombatPointCost(closeCombat.value, hitPoints.value) });
const pointcostCS = computed(() => { return combatSavePointCost(combatSave.value, hitPoints.value) });
const pointcostPT = computed(() => { return physicalToughnessPointCost(physicalToughness.value, hitPoints.value )});
const pointcostMT = computed(() => { return mentalToughnessPointCost(mentalToughness.value, hitPoints.value) });
const pointcostHP = computed(() => { return hitPointsPointCost(hitPoints.value ) });
const pointcostMV = computed(() => { return movementPointCost(movement.value, hitPoints.value) });
const pointcostRF = computed(() => { return reflexPointCost(reflex.value, hitPoints.value) });

const baseCost = computed(() => { return totalUnitPointCost( pointcostRC.value, pointcostCC.value, pointcostPT.value, pointcostMT.value, pointcostMV.value, pointcostHP.value, pointcostRF.value, pointcostCS.value);});

const totalCost = computed(() => {
    return baseCost.value + ruleCost()
});


function ruleCost(){
    let x = 0.0;
    for (const rule in selectedRules.value) {
        x = x + specialRules.value[rule].points;
    }
    return x
}

function calculatedRuleCost(id) {
    if (id === '2592-9ca5-f72d-103a') { //fearless
        specialRules.value[id].points = (valueMT.value * valueHP.value) + 5;
    } else if (id === '681a-9bd5-68e2-8dc5') { //deepstrike
        specialRules.value[id].points = (valueMV.value + valueRF.value) * 3;
    } else if (id === '4c70-78fe-51c8-d2a9') { //Fly
        specialRules.value[id].points = valueMV.value * 5;
    } else if (id === 'ae7d-7a7e-3bb6-bf16') { //hivemind
        specialRules.value[id].points = valueMT.value * 2;
    } else if (id === '8eae-e69f-a6d9-6eee') { //hold steady
        specialRules.value[id].points = valueRC.value + 1;
    } else if (id === '2c8c-6a6e-9704-3c6a') { //individual character
        specialRules.value[id].points = 0;
    } else if (id === '0bfb-425f-c71f-5e46') { //infiltration
        specialRules.value[id].points = (valueMV.value * valueHP.value) + valueRF.value;
    } else if (id === '1ed5-199d-88cb-ebc6"') { //lucky shot
        specialRules.value[id].points = (valueRC.value * valueHP.value) + 1;
    } else if (id === '9017-f2a1-0870-0856') { //sniper
        specialRules.value[id].points = ( (valueRC.value + valueRF.value) * 5 ) + 5;
    } else if (id === '3c46-3884-957f-ddeb') { //mob rule
        specialRules.value[id].points = valueMT.value;
    } else if (id === '06e4-bfa9-4af0-6dc3') { //patient
        specialRules.value[id].points = valueRF.value * 5;
    } else if (id === '5944-c02b-39fe-46f1') { //Rally to me!
        specialRules.value[id].points = valueMT.value * 2;
    } else if (id === '83ed-5b2a-523f-914e') { //regeneration
        specialRules.value[id].points = (valueHP.value * valueHP.value) + 5;
    } else if (id === '0369-d009-4bb5-066e') { //regroup
        specialRules.value[id].points = valueMT.value * 2;
    } else if (id === 'cbc9-55bd-024d-e154') { //wipe them out!
        specialRules.value[id].points = (valueCC.value * 2) + 2;
    }



    return specialRules.value[id].points

}


function check(event) {
    console.log(event.target.id)
    console.log(event.target.checked)
    if (event.target.checked === true) {
        selectedRules.value[event.target.id] = {
            "id": specialRules.value[event.target.id].id,
            "name": specialRules.value[event.target.id].name
        }
    } else {
        delete selectedRules.value[event.target.id]
    }
    console.log(selectedRules.value)
}


function addBattleUnit() {
    let tempUnit;
    console.log(selectedRules.value);
    if (unitId.value != null) {
        tempUnit = {
            id: unitId.value,
            name: unitName.value,
            rangedCombat: rangedCombat.value,
            closeCombat: closeCombat.value,
            physicalToughness: physicalToughness.value,
            mentalToughness: mentalToughness.value,
            hitPoints: hitPoints.value,
            combatSave: combatSave.value,
            movement: movement.value,
            reflex: reflex.value,
            specialRules: JSON.parse(JSON.stringify(selectedRules.value)),
            totalPointCost: totalCost.value,
        }
    } else {
        tempUnit = {
            id: crypto.randomUUID(),
            name: unitName.value,
            rangedCombat: rangedCombat.value,
            closeCombat: closeCombat.value,
            physicalToughness: physicalToughness.value,
            mentalToughness: mentalToughness.value,
            hitPoints: hitPoints.value,
            combatSave: combatSave.value,
            movement: movement.value,
            reflex: reflex.value,
            specialRules: JSON.parse(JSON.stringify(selectedRules.value)),
            totalPointCost: totalCost.value,
        }
    }
    console.log(tempUnit);
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
            console.log(resp.specialRules)
            unitId.value = resp.id;
            unitName.value = resp.name;
            rangedCombat.value = resp.rangedCombat;
            closeCombat.value = resp.closeCombat;
            physicalToughness.value = resp.physicalToughness;
            mentalToughness.value = resp.mentalToughness;
            hitPoints.value = resp.hitPoints;
            combatSave.value = resp.combatSave;
            movement.value = resp.movement;
            reflex.value = resp.reflex;
            selectedRules.value = resp.specialRules
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
                            <input inputmode="text" type="text" min="0"  name="rangedCombat" id="rangedCombat" class="form-control" v-model="rangedCombat">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="rangedCombat++" :disabled="rangedCombat == 20">+</button>
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
                            <input inputmode="text" type="text" min="0" max="20" name="closeCombat" id="closeCombat" class="form-control" v-model="closeCombat">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="closeCombat++" :disabled="closeCombat == 20">+</button>
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
                            <input inputmode="text" type="text" min="0" name="physicalToughness" id="physicalToughness" class="form-control" v-model="physicalToughness">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="physicalToughness++" :disabled="physicalToughness == 20">+</button>
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
                            <input inputmode="text" type="text" min="0" name="mentalToughness" id="mentalToughness" class="form-control" v-model="mentalToughness">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="mentalToughness++" :disabled="mentalToughness == 20">+</button>
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
                            <button class="btn btn-outline-secondary" v-on:click.prevent="hitPoints--" :disabled="(hitPoints == 1)">-</button>
                            <input inputmode="text" type="text" min="0" name="hitPoints" id="hitPoints" class="form-control" v-model="hitPoints">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="hitPoints++" :disabled="hitPoints == 20">+</button>
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
                            <span>Reflexes</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="reflex--" :disabled="reflex == 0">-</button>
                            <input inputmode="text" type="text" min="0" name="reflex" id="relfex" class="form-control" v-model="reflex">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="reflex++" :disabled="reflex == 20">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="reflexCost" id="reflexCost" class="form-control" v-bind:value="pointcostRF" disabled>
                                <label for="reflexCost">Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Movement</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="movement--" :disabled="movement == 0">-</button>
                            <input inputmode="numeric" type="text" min="0" max="5" name="movement" id="movement" class="form-control" v-model="movement">
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
                        <div class="col-sm-3">
                            <span>Armor Value</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="combatSave--" :disabled="combatSave == 0">-</button>
                            <input inputmode="numeric" type="text" min="0" max="5" name="combatSave" id="combatSave" class="form-control" v-model="combatSave">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="combatSave++">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="combatSave" id="combatSave" class="form-control" v-bind:value="pointcostCS" disabled>
                                <label for="combatSave">Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="baseCost" id="baseCost" class="form-control" v-bind:value="baseCost" disabled>
                                <label for="baseCost">Base Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Special Rules</span>
                        </div>
                    </div>

                    <div class="row mb-3" v-for="(rule,index) in specialRules">
                        <div class="col-sm-6">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <span><input type="checkbox" v-bind:id="rule.id" @change="check($event)" :checked="selectedRules.hasOwnProperty(rule.id)"></span>
                                    </div>
                                </div>
                                <input type="text" class="form-control" aria-label="Text input with checkbox" v-bind:value="rule.name" disabled>
                                <div class="input-group-append">
                                    <span class="input-group-text" id="basic-addon2">{{ calculatedRuleCost(rule.id) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>                  

                    <div class="row mb-3">
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="baseCost" id="baseCost" class="form-control" v-bind:value="totalCost" disabled>
                                <label for="baseCost">Total Cost</label>
                            </div>
                        </div>
                    </div>
                    <!-- <input type="Button" value="Clear" class="btn btn-secondary mt-3 mx-3" v-on:click.prevent="resetForm"> -->
                    <div class="row mb-3">
                        <div class="col-sm d-flex">
                            <a href="#" class="btn btn-primary flex-fill" v-on:click="addBattleUnit()">Save</a>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm d-flex">
                            <a href="#" class="btn btn-danger flex-fill" v-on:click="deleteBattleUnit()">Delete</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>


<style>

</style>