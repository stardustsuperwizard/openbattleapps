<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from '@/components/NavBar.vue';

const route = useRoute();
const router= useRouter();

const gearId = ref(null);
const gearName = ref('');
const saveModifier = ref(0);
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


const saveModifierCost = computed(() => { return (Math.pow(1.50, saveModifier.value) - 1 ) * attacks.value });
const strengthCost = computed(() => { return Math.pow(1.15, strength.value) * attacks.value });
const attacksCost = computed(() => { return ( Math.pow(1.25, attacks.value) - 1 ) });
const distanceCost = computed(() => { return ( distance.value * 0.05) * attacks.value });
const totalCost = computed(() => { return Math.round(( distanceCost.value + attacksCost.value + strengthCost.value + saveModifierCost.value ))});


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
            'saveModifier': saveModifier.value,
            'totalPointCost': totalCost.value
        }
    } else {
        tempGear = {
            'gearName': gearName.value,
            'distance': distance.value,
            'attacks': attacks.value,
            'strength': strength.value,
            'saveModifier': saveModifier.value,
            'totalPointCost': totalCost.value
        }
    }
    // console.log(tempGear); 
    // console.log(this.squadId);
    idb.createEntry('Gear', tempGear)
    router.back()
        // .then((resp) => {
        //     // console.log(resp);
        //     // this.gearId = resp.result;
        //     resetForm();
        //     getBattleGear();
        // });
    // console.log(this.squadId);
}

function editBattleGear(id) {
    // console.log(id);    
    idb.readTableEntry('Gear', id)
        .then((resp) => {
            // console.log(resp);
            gearId.value = resp.id;
            gearName.value = resp.gearName;
            distance.value = resp.distance;
            attacks.value = resp.attacks;
            strength.value = resp.strength;
            saveModifier.value = resp.saveModifier;
        });
}

function deleteGear() {
    // console.log(gearId);
    idb.deleteEntry('Gear', gearId.value)
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
    saveModifier.value = 0;
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
    </NavBar>

    <div class="container mt-5" x-data="main()">
        <div class="row">
            <div class="col">
                <h1 class="fs-4">Gear Creator</h1>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <form action="">
                    <div>
                        <div>
                            <label class="form-label" for="gearName">Gear name:</label><br>
                            <input type="text" name="gearName" id="gearName" class="form-control" v-model="gearName">
                        </div>
        
                        <div>
                            <label class="form-label" for="gearDistanceValue">Distance:</label><br>
                            <input type="number" min="0" name="gearDistanceValue" id="gearDistanceValue" class="form-control" v-model.number="distance">
                            <input type="number" name="gearDistanceCost" id="gearDistanceCost" class="form-control" v-bind:value="distanceCost" disabled><br>
                        </div>
        
                        <div>
                            <label class="form-label" for="gearAttackValue">Attacks:</label><br>
                            <input type="number" min="1" name="gearAttackValue" id="gearAttackValue" class="form-control" v-model.number="attacks">
                            <input type="number" name="gearAttackCost" id="gearAttackCost" class="form-control" v-bind:value="attacksCost" disabled><br>
                        </div>
        
                        <div>
                            <label class="form-label" for="gearStrengthValue">Strength:</label><br>
                            <input type="number" min="0" name="gearStrengthValue" id="gearStrengthValue" class="form-control" v-model.number="strength">
                            <input type="number" name="gearStrengthCost" id="gearStrengthCost" class="form-control" v-bind:value="strengthCost" disabled><br>
                        </div>
        
                        <div>
                            <label class="form-label" for="gearSaveModifierValue">Save Modifier:</label><br>
                            <input type="number" min="0" max="5" name="gearSaveModifierValue" id="gearSaveModifierValue" class="form-control" v-model.number="saveModifier">
                            <input type="number" name="gearSaveModifierCost" id="gearSaveModifierCost" class="form-control" v-bind:value="saveModifierCost" disabled><br>
                        </div>
        
                        <div>
                            <label class="form-label" for="gearTotalCost">Total Cost:</label><br>
                            <input type="number" name="gearTotalCost" id="gearTotalCost" class="form-control" v-bind:value="totalCost" disabled>
                        </div>
                    </div>
                    <input type="Button" value="Save" class="btn btn-primary mt-3" v-on:click.prevent="addBattleGear">
                    <!-- <input type="Button" value="Clear" class="btn btn-secondary mt-3 mx-3" v-on:click.prevent="resetForm"> -->
                    <button class="btn btn-danger mt-3 ms-5" v-on:click="deleteGear()">Delete</button>

                </form>
            </div>
        </div>
    </div>
</div>
</template>