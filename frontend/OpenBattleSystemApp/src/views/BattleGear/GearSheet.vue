<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from '@/components/NavBar.vue';

const route = useRoute();
const router= useRouter();

const gearId = ref(null);
const gearName = ref('');
const armorPenetration = ref(0);
const strength = ref(0);
const attacks = ref(1);
const distance = ref(0);

const gearList = ref([]);

const stabilityRating = ref("1421-4890-a1d0-8af9");

const vMyDirective = {
    beforeMount: (el) => {
        if (route.params.id != 'new') {
            editBattleGear(route.params.id);
        }
    }
}

const selectedRules = ref({});

const specialRules = ref({
    "6e21-6971-0446-3cd5": {
        "name": "Blast",
        "id": "6e21-6971-0446-3cd5",
        "points": 0.0,
        "description": "Battle Weapon has the ability to hit anything within 3” from center of a placement marker."
    },
    "d02a-0438-a6c3-0872" : {
        "name": "Burst Shot",
        "id": "d02a-0438-a6c3-0872",
        "points": 0.0,
        "description": "Ranged weapon has capability of firing extra shots at close range foregoing a longer ranged aimed shot. When target is within 1/2 distance or less of the gear’s profile, double the number of attacks."
    },
    "2387-68c8-3314-b010" : {
        "name": "Heavy Blast",
        "id": "2387-68c8-3314-b010",
        "points": 0.0,
        "description": "Battle Weapon has the ability to hit anything within 5” from center of a placement marker."
    },
    "1e96-5536-ad0e-d478" : {
        "name": "Lucky Wound",
        "id": "1e96-5536-ad0e-d478",
        "points": 0.0,
        "description": "Weapon is able able to wound on a roll of 6 regardless of difficulty."
    },
    "3036-3edb-2480-4d7b" : {
        "name": "Overcharged",
        "id": "3036-3edb-2480-4d7b",
        "points": 0.0,
        "description": "At close ranges the weapon is able to 2x the original strength. Restrictions:\n- Ranged Combat: Opposing squad must be within 1/2 distance or less of the Battle Weapon\’s profile.\n- Close Combat: Battle Unit goes last in combat, regardless of Reflexes value."
    },
    "7921-9d40-6268-f2eb" : {
        "name": "Paired Gear",
        "id": "7921-9d40-6268-f2eb",
        "points": 0.0,
        "description": "When weapons is taken twice, the result is 1 additional attack."
    }
});

const armorPenetrationCost = computed(() => { return armorPenetrationPointCost(armorPenetration.value, attacks.value) });
const strengthCost = computed(() => { return strengthPointCost(strength.value, attacks.value) });
const attacksCost = computed(() => { return attacksPointCost(attacks.value) });
const distanceCost = computed(() => { return distancePointCost(distance.value, attacks.value) });
const baseCost = computed(() => { return totalGearPointCost(distanceCost.value, attacksCost.value, strengthCost.value, armorPenetrationCost.value) });

const totalCost = computed(() => {
    let stability;
    if ( stabilityRating.value === "1421-4890-a1d0-8af9"){
        stability = 1;
    } else if ( stabilityRating.value === "5762-a66c-0c7f-dab6") {
        stability = 0.75;
    } else if (stabilityRating.value === "a93f-2e00-f81f-b6ee"){
        stability = 0.50;
    } else if (stabilityRating.value === "2db7-7c35-4dd0-ad94"){
        stability = 0.25;
    }
    return (baseCost.value + ruleCost()) * stability
});

function ruleCost(){
    let x = 0.0;
    for (const rule in selectedRules.value) {
        x = x + specialRules.value[rule].points;
    }
    return x
}

function calculatedRuleCost(id) {
    if (id === '6e21-6971-0446-3cd5') { //Blast
        specialRules.value[id].points = attacks.value + strength.value + armorPenetration.value;
    } else if (id === 'd02a-0438-a6c3-0872') { //Burst Shot
        specialRules.value[id].points = attacks.value * attacks.value;
    } else if (id === '2387-68c8-3314-b010') { //Heavy Blast
        specialRules.value[id].points = (attacks.value + strength.value + armorPenetration.value) * 2;
    } else if (id === '1e96-5536-ad0e-d478') { //lucky wound
        specialRules.value[id].points = (strength.value * attacks.value) + 1;
    } else if (id === '3036-3edb-2480-4d7b') { //Overcharged
        specialRules.value[id].points = strength.value;
    } else if (id === '7921-9d40-6268-f2eb') { //Paired Gear
        specialRules.value[id].points = ((strength.value + armorPenetration.value) * attacks.value ) / 2;
    } 

    return specialRules.value[id].points

}


function check(event) {
    if (selectedRules.value == undefined) {
        selectedRules.value = {}
    }
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


function addBattleGear() {
    // console.log('hello')
    let tempGear;
    if (gearId.value != null) {
        tempGear = {
            'id': gearId.value,
            'name': gearName.value,
            'distance': distance.value,
            'attacks': attacks.value,
            'strength': strength.value,
            'armorPenetration': armorPenetration.value,
            'specialRules': JSON.parse(JSON.stringify(selectedRules.value)),
            'stability': stabilityRating.value,
            'totalPointCost': totalCost.value
        }
    } else {
        tempGear = {
            'id': crypto.randomUUID(),
            'name': gearName.value,
            'distance': distance.value,
            'attacks': attacks.value,
            'strength': strength.value,
            'armorPenetration': armorPenetration.value,
            'specialRules': JSON.parse(JSON.stringify(selectedRules.value)),
            'stability': stabilityRating.value,
            'totalPointCost': totalCost.value
        }
    }
    idb.createEntry('Gear', tempGear);
    router.back();
}

function editBattleGear(id) {
    // console.log(id);
    if (id != null) {
        idb.readTableEntry('Gear', id)
            .then((resp) => {
                // console.log(resp);
                gearId.value = resp.id;
                gearName.value = resp.name;
                distance.value = resp.distance;
                attacks.value = resp.attacks;
                strength.value = resp.strength;
                selectedRules.value = resp.specialRules;
                armorPenetration.value = resp.armorPenetration;
                stabilityRating.value = resp.stability
            });
    }
}

function deleteGear() {
    // console.log(gearId);
    idb.deleteEntry('Gear', gearId.value);
    router.push('/battlegear/list');
        // .then((resp) => {
        //     getBattleGear();
        // });
}

function resetForm() {
    gearId.value = null;
    gearName.value = '';
    distance.value = 0;
    attacks.value = 1;
    strength.value = 0;
    armorPenetration.value = 0;
}
</script>


<template>
<div v-my-directive>
    <NavBar>
        <template #left>
            <router-link to="/battlegear/list" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </router-link>
        </template>
        <template #right>
            <a href="#" v-on:click.prevent="addBattleGear" class="d-flex align-items-center text-dark text-decoration-none"><span class="fs-4">Save +</span></a>
        </template>
    </NavBar>

    <div class="container-md mt-5">
        <div class="row pt-1">
            <div class="col">
                <form action="">

                    <div class="row mb-3">
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="gearName" id="gearName" class="form-control" v-model="gearName">
                                <label for="gearName">Battle Gear Name</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Distance</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="distance=distance-3" :disabled="distance == 0">-</button>
                            <input inputmode="numeric" type="text" min="0" name="gearDistanceLevel" id="gearDistanceLEvel" class="form-control" v-model.number="distance">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="distance=distance+3">+</button>
                        </div>
                       <div class="col-sm">
                           <div class="form-floating">
                                <input type="text" name="gearDistanceCost" id="gearDistanceCost" class="form-control" v-bind:value="distanceCost" disabled>
                                <label for="gearDistanceCost">Cost</label>
                           </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Attacks</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="attacks--" :disabled="attacks == 0">-</button>
                            <input inputmode="numeric" type="text" min="1" name="gearAttackLevel" id="gearAttackLevel" class="form-control" v-model.number="attacks">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="attacks++" :disabled="attacks == 20">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="gearAttackCost" id="gearAttackCost" class="form-control" v-bind:value="attacksCost" disabled>
                                <label for="gearAttackCost">Cost</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Strength</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="strength--" :disabled="strength == 0">-</button>
                            <input inputmode="numeric" type="text" min="0" name="gearStrengthLevel" id="gearStrengthLevel" class="form-control" v-model.number="strength">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="strength++" :disabled="strength == 20">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="gearStrengthCost" id="gearStrengthCost" class="form-control" v-bind:value="strengthCost" disabled>
                                <label for="gearStrengthCost">Cost</label>
                            </div>
                        </div>
                    </div>
        
                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Armor Penetration</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="armorPenetration--" :disabled="armorPenetration == 0">-</button>
                            <input inputmode="numeric" type="text" min="0" max="5" name="geararmorPenetrationLevel" id="geararmorPenetrationLevel" class="form-control" v-model.number="armorPenetration">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="armorPenetration++" :disabled="armorPenetration == 20">+</button>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="gearArmorPenetrationCost" id="gearArmorPenetrationCost" class="form-control" v-bind:value="armorPenetrationCost" disabled>
                                <label for="gearArmorPenetrationCost">Cost</label>
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
                        <div class="col-sm-3">
                            <span>Stability</span>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1421-4890-a1d0-8af9" v-model="stabilityRating" :checked="stabilityRating==='1421-4890-a1d0-8af9'">
                                <label class="form-check-label" for="inlineRadio1">Stable</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="5762-a66c-0c7f-dab6" v-model="stabilityRating" :checked="stabilityRating==='5762-a66c-0c7f-dab6'">
                                <label class="form-check-label" for="inlineRadio2">Unstable</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="a93f-2e00-f81f-b6ee" v-model="stabilityRating" :checked="stabilityRating==='a93f-2e00-f81f-b6ee'">
                                <label class="form-check-label" for="inlineRadio3">Highly Unstable</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="2db7-7c35-4dd0-ad94" v-model="stabilityRating" :checked="stabilityRating==='2db7-7c35-4dd0-ad94'">
                                <label class="form-check-label" for="inlineRadio3">Critically Unstable</label>
                            </div>
                        </div>
                    </div> 

                    <div class="row mb-3">
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="gearTotalCost" id="gearTotalCost" class="form-control" v-bind:value="totalCost" disabled>
                                <label for="gearTotalCost">Total Cost</label>
                            </div>
                        </div>
                    </div>
                    <!-- <input type="Button" value="Clear" class="btn btn-secondary mt-3 mx-3" v-on:click.prevent="resetForm"> -->
                    <div class="row mb-3">
                        <div class="col-sm d-flex">
                            <a href="#" class="btn btn-primary flex-fill" v-on:click="addBattleGear()">Save</a>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm d-flex">
                            <a href="#" class="btn btn-danger flex-fill" v-on:click="deleteGear()">Delete</a>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>
</template>