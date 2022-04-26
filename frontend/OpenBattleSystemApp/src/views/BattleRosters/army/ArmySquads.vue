<script setup>
import { computed, ref } from "vue";
import NavBar from '@/components/NavBar.vue';
import UnitSelector from '@/components/UnitSelector.vue';
import GearSelector from '@/components/GearSelector.vue';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const rosterId = ref(null);
const rosterName = ref(null);
const rosterSquads = ref([]);

const squadId = ref(null);
const squadName = ref(null);
const squadUnits = ref([]);

const squadTotal = ref(0);

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
            rosterSquads.value = resp.squads;
            if (squadId.value != null) {
                squadUnits.value = rosterSquads.value[squadId.value].units.unitList;
                squadName.value = rosterSquads.value[squadId.value].name;
                squadTotal.value = rosterSquads.value[squadId.value].totalCost;
            }
        });
}


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

const selectedGearId = ref(0);
const selectedGearCost = ref(0);
function selectedGear(gearItem) {
    gearItem.gearId = selectedGearId.value;
    gearItem.pointCost = selectedGearCost.value;
}

function deleteGear(gearItemIndex, unitGear) {
    unitGear.splice(gearItemIndex, 1);
}

const selectedUnitId = ref(0);
const selectedUnitCost = ref(0);
function selectedUnit(unit) {
    unit.unitId = selectedUnitId.value;
    unit.pointCost = selectedUnitCost.value;
}

function deleteUnit(unitIndex) {
    squadUnits.value.splice(unitIndex, 1);
}

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
    squadTotal.value = 0;
    squadUnits.value.forEach((element) =>{

        let gearCost = 0;
        element.gear.gearList.forEach((e) => {
            gearCost = gearCost + e.totalCost;
        });

        element.gear.totalCost = gearCost;
        element.totalUnitCost = element.totalCost + element.gear.totalCost;

        squadTotal.value = squadTotal.value + element.totalUnitCost;
    });
}

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
            'units': {
                'unitList': squadUnits.value,
                'pointCost': 0.00,
                'totalCost': 0.00
            },
            'totalCost': squadTotal.value
        });
    } else {
        rosterSquads.value[squadId.value] = {
            'name': squadName.value,
            'units': {
                'unitList': squadUnits.value,
                'pointCost': 0.00,
                'totalCost': 0.00
            },
            'totalCost': squadTotal.value
        }
    }

    tempvar = {
        'id': rosterId.value,
        'name': rosterName.value,
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
                    <div class="row mb-5">
                        <div class="col-sm mb-1">
                            <div class="form-floating">
                                <input type="text" name="squadName" id="squadName" class="form-control" v-model="squadName">
                                <label for="unitName">Squad Name (optional)</label>
                            </div>
                        </div>
                        <div class="col-sm mb-1 d-flex">
                            <button class="btn btn-danger flex-fill" v-on:click.prevent="deleteSquad()">Delete Squad</button>
                        </div>
                        <div class="col-sm"></div>
                    </div>
                    <div class="row mb-1" v-for="(unit, unitIndex) in squadUnits">
                        <!-- <p>{{unit}}</p> -->
                        <div class="col">
                            <div class="row mb-1">
                                <div class="col-sm">
                                    <div class="form-floating">
                                        <input type="text" name="unitName" id="unitName" class="form-control" v-model="unit.name">
                                        <label for="unitName">Unit Name (optional)</label>
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <UnitSelector :squadId="unit.id" :startingUnitId="unit.unitId" v-model:selectedUnitId="selectedUnitId" v-model:selectedUnitCost="selectedUnitCost" v-on:change="selectedUnit(unit)"></UnitSelector>
                                </div>
                                <div class="col-sm input-group">
                                    <input inputmode="numeric" type="number" min="0" name="gearDistanceLevel" id="gearDistanceLEvel" class="form-control" v-model.number="unit.quantity">
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="updateQuantityAndCost(unit, 'negative')">-</button>
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="updateQuantityAndCost(unit, 'positive')">+</button>
                                </div>
                                <div class="col-sm">
                                    <button class="btn btn-danger" v-on:click.prevent="deleteUnit(unitIndex)">Delete Unit</button>
                                </div>
                            </div>
                            <div class="row mb-1" v-for="(gearItem, gearItemIndex) in unit.gear.gearList">
                                <div class="col-sm"></div>
                                <div class="col-sm">
                                    <GearSelector :squadId="unit.id" :startingGearId="gearItem.gearId" v-model:selectedGearId="selectedGearId" v-model:selectedGearCost="selectedGearCost" v-on:change="selectedGear(gearItem)"></GearSelector>
                                </div>
                                <div class="col-sm input-group">
                                    <input inputmode="numeric" type="number" min="0" name="gearDistanceLevel" id="gearDistanceLEvel" class="form-control" v-model.number="gearItem.quantity">
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="updateQuantityAndCost(gearItem, 'negative')">-</button>
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="updateQuantityAndCost(gearItem, 'positive')">+</button>
                                </div>
                                <div class="col-sm">
                                    <button class="btn btn-warning" v-on:click.prevent="deleteGear(gearItemIndex, unit.gear.gearList)">Delete Gear</button>
                                </div>
                            </div>
                            <button class="btn btn-secondary" v-on:click.prevent="addGear(unit)">Add Gear</button>
                        </div>
                    </div>
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