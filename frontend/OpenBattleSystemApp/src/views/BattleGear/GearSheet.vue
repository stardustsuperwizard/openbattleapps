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

const vMyDirective = {
    beforeMount: (el) => {
        if (route.params.id != 'new') {
            editBattleGear(parseInt(route.params.id));
        }
    }
}

const armorPenetrationCost = computed(() => { return armorPenetrationPointCost(armorPenetration.value, attacks.value) });
const strengthCost = computed(() => { return strengthPointCost(strength.value, attacks.value) });
const attacksCost = computed(() => { return attacksPointCost(attacks.value) });
const distanceCost = computed(() => { return distancePointCost(distance.value, attacks.value) });
const totalCost = computed(() => { return totalGearPointCost(distanceCost.value, attacksCost.value, strengthCost.value, armorPenetrationCost.value) });


function addBattleGear() {
    // console.log('hello')
    let tempGear;
    if (gearId.value != null) {
        tempGear = {
            'id': gearId.value,
            'gearName': gearName.value,
            'distance': distance.value,
            'attacks': attacks.value,
            'strength': strength.value,
            'armorPenetration': armorPenetration.value,
            'totalPointCost': totalCost.value
        }
    } else {
        tempGear = {
            'gearName': gearName.value,
            'distance': distance.value,
            'attacks': attacks.value,
            'strength': strength.value,
            'armorPenetration': armorPenetration.value,
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
                gearName.value = resp.gearName;
                distance.value = resp.distance;
                attacks.value = resp.attacks;
                strength.value = resp.strength;
                armorPenetration.value = resp.armorPenetration;
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
                            <button class="btn btn-outline-secondary" v-on:click.prevent="distance--" :disabled="distance == 0">-</button>
                            <input inputmode="numeric" type="text" min="0" name="gearDistanceLevel" id="gearDistanceLEvel" class="form-control" v-model.number="distance">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="distance++">+</button>
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
                            <button class="btn btn-outline-secondary" v-on:click.prevent="attacks++">+</button>
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
                            <button class="btn btn-outline-secondary" v-on:click.prevent="strength++">+</button>
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
                            <button class="btn btn-outline-secondary" v-on:click.prevent="armorPenetration++">+</button>
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
                                <input type="text" name="gearTotalCost" id="gearTotalCost" class="form-control" v-bind:value="totalCost" disabled>
                                <label for="gearTotalCost">Total Cost</label>
                            </div>
                        </div>
                    </div>
                    <!-- <input type="Button" value="Clear" class="btn btn-secondary mt-3 mx-3" v-on:click.prevent="resetForm"> -->
                    <button class="btn btn-danger mt-3" v-on:click="deleteGear()">Delete</button>

                </form>
            </div>
        </div>
    </div>
</div>
</template>