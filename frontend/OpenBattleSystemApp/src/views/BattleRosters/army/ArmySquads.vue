<script setup>
import { computed, ref } from "vue";
import NavBar from '@/components/NavBar.vue';
import UnitSelector from '@/components/UnitSelector.vue';
import GearSelector from '@/components/GearSelector.vue';
import { useRoute, useRouter } from "vue-router";

// Router Variables
const route = useRoute();
const router = useRouter();

// Roster Information
const rosterId = ref(null);
const rosterName = ref(null);
const rosterPoints = ref(0);
const rosterSquads = ref([]);
// Squad Information
const squadCount = ref(0);
const squadId = ref(null);
const squadName = ref(null);
const squadUnits = ref([]);
const squadTotal = ref(0);

// Loading of information when page starts.
const vMyDirective = {
    beforeMount: (el) => {
        if (route.params.squadid != 'new') {
            squadId.value = parseInt(route.params.squadid);
            getRoster(parseInt(route.params.armyid));
        } else {
            getRoster(parseInt(route.params.armyid));
        }
    }
}

function getRoster(armyId) {
    idb.readTableEntry('battleRosters', armyId)
        .then((resp) => {
            rosterId.value = resp.id;
            rosterName.value = resp.name;
            rosterPoints.value = resp.points;
            rosterSquads.value = resp.squads;
            if (squadId.value != null) {
                squadUnits.value = rosterSquads.value[squadId.value].units;
                squadName.value = rosterSquads.value[squadId.value].name;
                squadTotal.value = rosterSquads.value[squadId.value].totalCost;
            }
        });
}


// Creating Units and Gear Entries
function addUnit(){
    squadUnits.value.push({
        'id': squadUnits.value.length + 1,
        'name': '',
        'unitId': 0,
        'quantity': 0,
        'pointCost': 0.00,
        'totalCost': 0.00,
        'gear': {
            'gearList': [],
            'totalCost': 0.00
        },
        'armor': {
            'armorList': [],
            'totalCost': 0.00
        },
        'totalUnitCost': 0.00
    });
}

function addGear(unit){
    unit.gear.gearList.push({
        'id': unit.gear.gearList.length + 1,
        'gearId': 0,
        'quantity': 0,
        'pointCost': 0.00,
        'totalCost': 0.00
    });
}

function addArmor(unit){
    unit.armor.armorList.push({
        'id': unit.armor.armorList.length + 1,
        'armorId': 0,
        'quantity': 0,
        'pointCost': 0.00,
        'totalCost': 0.00
    });
}


// unit and gear management
const selectedGearId = ref(0);
const selectedGearCost = ref(0);
function selectedGear(gearItem) {
    gearItem.gearId = selectedGearId.value;
    gearItem.pointCost = selectedGearCost.value;
    gearItem.totalCost = gearItem.quantity * gearItem.pointCost;
    getTotalCost();
}

const selectedArmorId = ref(0);
const selectedArmorCost = ref(0);
function selectedArmor(armorItem) {
    armorItem.armorId = selectedArmorId.value;
    armorItem.pointCost = selectedArmorCost.value;
    armorItem.totalCost = armorItem.quantity * armorItem.pointCost;
    getTotalCost();
}

function deleteArmor(armorItemIndex, unitArmor) {
    unitArmor.splice(armorItemIndex, 1);
    getTotalCost();
}

function deleteGear(gearItemIndex, unitGear) {
    unitGear.splice(gearItemIndex, 1);
    getTotalCost();
}

const selectedUnitId = ref(0);
const selectedUnitCost = ref(0);
function selectedUnit(unit) {
    unit.unitId = selectedUnitId.value;
    unit.pointCost = selectedUnitCost.value;
    getTotalCost();
}
function deleteUnit(unitIndex) {
    squadUnits.value.splice(unitIndex, 1);
    getTotalCost();
}


// Totaling up the Cost of Squads.
function updateQuantityAndCost(element, direction) {
    if (direction == 'positive') {
        element.quantity++
    } else {
        element.quantity--
    }

    element.totalCost = element.quantity * element.pointCost;
    getTotalCost();
}
function getTotalCost() {
    squadCount.value = 0;
    squadTotal.value = 0;
    squadUnits.value.forEach((element) =>{
        let armorCost = 0;
        element.armor.armorList.forEach((e) => {
            armorCost = armorCost + e.totalCost;
        });
        element.armor.totalCost = armorCost;

        let gearCost = 0;
        element.gear.gearList.forEach((e) => {
            gearCost = gearCost + e.totalCost;
        });
        element.gear.totalCost = gearCost;
        
        element.totalUnitCost = element.totalCost + element.gear.totalCost + element.armor.totalCost;

        squadCount.value = squadCount.value + element.quantity;
        squadTotal.value = squadTotal.value + element.totalUnitCost;
    });
}


// Saving and Deleting Squads
function deleteSquad() {
    rosterSquads.value.forEach((element, index) => {
        if (index == squadId.value) {
            rosterSquads.value.splice(index, 1);
        }
    });

    let tempvar = {
        'id': rosterId.value,
        'name': rosterName.value,
        'squads': JSON.parse(JSON.stringify(rosterSquads.value))
    }

    idb.createEntry('battleRosters', tempvar)
        .then((resp) => {
            router.back()
        });
}

function save() {
    // console.log("hello!");
    // let tempsquads = JSON.parse(JSON.stringify(rosterSquads.value));
    let tempvar;
    if (squadId.value === null) {
        rosterSquads.value.push({
            'name': squadName.value,
            'unitCount': squadCount.value,
            'units': squadUnits.value,
            'totalCost': squadTotal.value
        });
    } else {
        rosterSquads.value[squadId.value] = {
            'name': squadName.value,
            'unitCount': squadCount.value,
            'units': squadUnits.value,
            'totalCost': squadTotal.value
        }
    }

    tempvar = {
        'id': rosterId.value,
        'name': rosterName.value,
        'points': rosterPoints.value,
        'squads': JSON.parse(JSON.stringify(rosterSquads.value))
    }

    // console.log(tempvar);
    idb.createEntry('battleRosters', tempvar)
        .then((resp) => {
            router.back()
        });
}
</script>


<template>
<div v-my-directive>
    <NavBar>
        <template #left>
            <router-link :to="`/battlerosters/army/list/${rosterId}`" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </router-link>
        </template>
        <template #center>
            <span>Cost: {{ squadTotal }}</span>
        </template>
        <template #right>
            <a href="#" v-on:click.prevent="save" class="d-flex align-items-center text-dark text-decoration-none"><span class="fs-4">Save</span></a>
        </template>
    </NavBar>

    <main class="container-md mt-5">
        <!-- <section class="row pr-1">
            <div class="col">
                <p>{{ rosterSquads }}</p>
            </div>
        </section> -->
        <section class="row pt-1">
            <div class="col">
                <form action="">
                    <fieldset class="row mb-5">
                        <div class="col-sm mb-1">
                            <div class="form-floating">
                                <input type="text" name="squadName" id="squadName" class="form-control" v-model="squadName">
                                <label for="unitName">Squad Name</label>
                            </div>
                        </div>
                        <div class="col-sm mb-1 d-flex">
                            <button class="btn btn-danger flex-fill" v-on:click.prevent="deleteSquad()">Delete Squad</button>
                        </div>
                        <!-- <div class="col-sm"></div> -->
                    </fieldset>
                    <fieldset class="row mb-1" v-for="(unit, unitIndex) in squadUnits">
                        <span class="my-2 border-top"></span>
                        <!-- <p>{{unit}}</p> -->
                        <div class="col">
                            <div class="row mb-1">
                                <div class="col-sm">
                                    <div class="form-floating">
                                        <input type="text" name="unitName" id="unitName" class="form-control" v-model="unit.name">
                                        <label for="unitName">Name (optional)</label>
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <UnitSelector :squadId="unit.id" :startingUnitId="unit.unitId" v-model:selectedUnitId="selectedUnitId" v-model:selectedUnitCost="selectedUnitCost" v-on:change="selectedUnit(unit)"></UnitSelector>
                                </div>
                                <div class="col-sm input-group">
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="updateQuantityAndCost(unit, 'negative')" :disabled="unit.quantity == 0">-</button>
                                    <input inputmode="numeric" type="text" name="gearDistanceLevel" id="gearDistanceLEvel" class="form-control" v-model.number="unit.quantity">
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="updateQuantityAndCost(unit, 'positive')">+</button>
                                </div>
                                <div class="col-sm my-1 d-flex">
                                    <button class="btn btn-danger flex-fill" v-on:click.prevent="deleteUnit(unitIndex)">Delete Unit</button>
                                </div>
                            </div>
                            <div class="row mb-1" v-for="(armorItem, armorItemIndex) in unit.armor.armorList">
                                <div class="col-sm"></div>
                                <div class="col-sm">
                                    <GearSelector tableName="Armor" :squadId="unit.id" :startingGearId="armorItem.armorId" v-model:selectedGearId="selectedArmorId" v-model:selectedGearCost="selectedArmorCost" v-on:change="selectedArmor(armorItem)"></GearSelector>
                                </div>
                                <div class="col-sm input-group">
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="updateQuantityAndCost(armorItem, 'negative')" :disabled="armorItem.quantity == 0">-</button>
                                    <input inputmode="numeric" type="text" min="0" name="armorQuantity" id="armorQuantityId" class="form-control" v-model.number="armorItem.quantity">
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="updateQuantityAndCost(armorItem, 'positive')">+</button>
                                </div>
                                <div class="col-sm my-1">
                                    <button class="btn btn-warning" v-on:click.prevent="deleteArmor(armorItemIndex, unit.armor.armorList)">Delete Armor</button>
                                </div>
                            </div>
                            <button class="btn btn-secondary" v-on:click.prevent="addArmor(unit)">Add Armor</button>
                            <div class="row mb-1" v-for="(gearItem, gearItemIndex) in unit.gear.gearList">
                                <div class="col-sm"></div>
                                <div class="col-sm">
                                    <GearSelector tableName="Gear" :squadId="unit.id" :startingGearId="gearItem.gearId" v-model:selectedGearId="selectedGearId" v-model:selectedGearCost="selectedGearCost" v-on:change="selectedGear(gearItem)"></GearSelector>
                                </div>
                                <div class="col-sm input-group">
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="updateQuantityAndCost(gearItem, 'negative')" :disabled="gearItem.quantity == 0">-</button>
                                    <input inputmode="numeric" type="text" min="0" name="gearDistanceLevel" id="gearDistanceLEvel" class="form-control" v-model.number="gearItem.quantity">
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="updateQuantityAndCost(gearItem, 'positive')">+</button>
                                </div>
                                <div class="col-sm my-1">
                                    <button class="btn btn-warning" v-on:click.prevent="deleteGear(gearItemIndex, unit.gear.gearList)">Delete Gear</button>
                                </div>
                            </div>
                            <button class="btn btn-dark" v-on:click.prevent="addGear(unit)">Add Gear</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </section>

        <section class="row">
            <div class="col">
                <div class="d-flex my-3">
                    <button class="btn btn-primary mb-3 flex-fill" type="addUnitToSquad" name="addUnitToSquad" v-on:click.prevent="addUnit">Create Unit</button>
                </div>
            </div>
        </section>
    </main>
</div>
</template>