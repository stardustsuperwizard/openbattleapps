<script setup>
import { computed, ref } from "vue";
import NavBar from '@/components/NavBar.vue';

const unitId = ref(null);
const unitName = ref('');
const rangedCombat = ref(0);
const closeCombat = ref(0);
const physicalToughness = ref(2);
const mentalToughness = ref(2);
const hitPoints = ref(1);
const combatSave = ref(0);
const movement = ref(0);
// const totalCost = 0;

const units = ref([]);

const vMyDirective = {
  beforeMount: (el) => {
    getBattleUnits()
  }
}

const pointcostRC = computed(() =>  (Math.pow(1.50, rangedCombat.value) - 1 ) * hitPoints.value )
const pointcostCC = computed(() => { return ( Math.pow(1.50, closeCombat.value) - 1 ) * hitPoints.value })
const pointcostCS = computed(() => { return ( Math.pow(1.50, combatSave.value) - 1 ) * hitPoints.value })
const pointcostPT = computed(() => { return ( Math.pow(1.15, physicalToughness.value ) ) * hitPoints.value })
const pointcostMT = computed(() => { return ( Math.pow(1.15, mentalToughness.value ) ) * hitPoints.value })
const pointcostHP = computed(() => { return ( Math.pow(1.25, hitPoints.value) ) })
const pointcostMV = computed(() => { return ( 0.25 * movement.value ) * hitPoints.value })
const totalCost = computed(() => { return Math.round(( pointcostRC.value + pointcostCC.value + pointcostPT.value + pointcostMT.value + pointcostCS.value + pointcostMV.value + pointcostHP.value )) })

async function getBattleUnits() {
    units.value = await idb.readTable('Units');
}

function addBattleUnit() {
    // console.log('hello')
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
    // console.log(tempUnit);
    // console.log(this.squadId);
    idb.createEntry('Units', tempUnit)
        .then((resp) => {
            // console.log(resp);
            // this.gearId = resp.result;
            resetForm();
            getBattleUnits();
        });
    // console.log(this.squadId);
}

function deleteBattleUnit(unitId) {
    // console.log(gearId);
    idb.deleteEntry('Units', unitId)
        .then((resp) => {
            this.getBattleUnits();
        });
}

function editBattleUnit(id) {
    // console.log(gearId);    
    idb.readTableEntry('Units', id)
        .then((resp) => {
            // console.log(resp);
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

function resetForm() {
    unitId.value = null,
    unitName.value = '';
    rangedCombat.value = 0;
    closeCombat.value = 0;
    physicalToughness.value = 2;
    mentalToughness.value = 2;
    hitPoints.value = 1;
    combatSave.value = 0;
    movement.value = 0;
}
</script>


<template>
<div v-my-directive>
    <NavBar>
        <template #left>
            <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </a>
        </template>
    </NavBar>
    <div class="container mt-5">

    <div class="row">
        <div class="col">
            <h1 class="fs-4">Unit Creator</h1>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <form action="">
                <div>
                    <div>
                        <label class="form-label" for="unitName">Unit name:</label>
                        <input class="form-control" type="text" name="unitName" id="unitName" v-model="unitName">
                    </div>
    
                    <div>
                        <label class="form-label" for="rangedCombat">Ranged Combat:</label><br>
                        <input type="number" min="0" max="5" name="rangedCombat" id="rangedCombat" class="form-control" v-model="rangedCombat">
                        <input type="number" name="rangedCombat" id="rangedCombat" class="form-control" disabled v-bind:value="pointcostRC">
                    </div>
    
                    <div>
                        <label class="form-label" for="closeCombat">Close Combat:</label><br>
                        <input type="number" min="0" max="5" name="closeCombat" id="closeCombat" class="form-control" v-model="closeCombat">
                        <input type="number" name="closeCombat" id="closeCombat" class="form-control" disabled v-bind:value="pointcostCC">
                    </div>
    
                    <div>
                        <label class="form-label" for="physicalToughness">Physical Toughness:</label><br>
                        <input type="number" min="2" name="physicalToughness" id="physicalToughness" class="form-control" v-model="physicalToughness">
                        <input type="number" name="physicalToughness" id="physicalToughness" class="form-control" disabled v-bind:value="pointcostPT">
                    </div>
    
                    <div>
                        <label class="form-label" for="mentalToughness">Mental Toughness:</label><br>
                        <input type="number" min="2" name="mentalToughness" id="mentalToughness" class="form-control" v-model="mentalToughness">
                        <input type="number" name="mentalToughness" id="mentalToughness" class="form-control" disabled v-bind:value="pointcostMT">
                    </div>
    
                    <div>
                        <label class="form-label" for="hitPoints">Hit Points:</label><br>
                        <input type="number" min="1" name="hitPoints" id="hitPoints" class="form-control" v-model="hitPoints">
                        <input type="number" name="hitPoints" id="hitPoints" class="form-control" disabled v-bind:value="pointcostHP">
                    </div>
    
                    <div>
                        <label class="form-label" for="combatSave">Combat Save:</label><br>
                        <input type="number" min="0" max="5" name="combatSave" id="combatSave" class="form-control" v-model="combatSave">
                        <input type="number" name="combatSave" id="combatSave" class="form-control" disabled v-bind:value="pointcostCS">
                    </div>
    
                    <div>
                        <label class="form-label" for="movement">Movement:</label><br>
                        <input type="number" min="0" name="movement" id="movement" class="form-control" v-model="movement">
                        <input type="number" name="movement" id="movement" class="form-control" disabled v-bind:value="pointcostMV">
                    </div>
    
                    <div>
                        <label class="form-label" for="TotalCost">Total Cost:</label><br>
                        <input type="number" name="TotalCost" id="TotalCost" class="form-control" disabled v-bind:value="totalCost">
                    </div>
                </div>
                <input type="Button" value="Save" class="btn btn-primary" v-on:click.prevent="addBattleUnit()">
                <input type="Button" value="Clear" class="btn btn-secondary" v-on:click.prevent="resetForm()">
            </form>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Unit Name</th>
                            <th>RC</th>
                            <th>CC</th>
                            <th>PT</th>
                            <th>MT</th>
                            <th>HP</th>
                            <th>CS</th>
                            <th>M</th>
                            <th>Point Cost</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="unit in units">
                            <td>{{ unit.id }}</td>
                            <td>{{ unit.unitName }}</td>
                            <td>{{ unit.rangedCombat }}</td>
                            <td>{{ unit.closeCombat }}</td>
                            <td>{{ unit.physicalToughness }}</td>
                            <td>{{ unit.mentalToughness }}</td>
                            <td>{{ unit.hitPoints }}</td>
                            <td>{{ unit.combatSave }}</td>
                            <td>{{ unit.movement }}</td>
                            <td>{{ unit.totalPointCost }}</td>
                            <td><button class="btn btn-sm btn-primary" v-on:click.prevent="editBattleUnit(unit.id)">Edit</button></td>
                            <td><button class="btn btn-sm btn-danger" v-on:click.prevent="deleteBattleUnit(unit.id)">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</div>

</div>
</template>


<style>

</style>