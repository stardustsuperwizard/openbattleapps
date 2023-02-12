<script setup>
import { ref } from "vue";
import NavBar from '@/components/NavBar.vue';
import UnitSelector from '@/components/UnitSelector.vue';
import { useRoute, useRouter } from "vue-router";


// Router Variables
const route = useRoute();
const router = useRouter();


// Roster Information
const rosterId = ref(null);
const rosterName = ref(null);
const rosterSquads = ref([]);


// Squad Information
const squadId = ref(null);
const squadName = ref(null);
const squadUnits = ref([]);
const squadMin = ref(-1);
const squadMax = ref(-1);

const squadGear = ref([]);


// Loading of information when page starts.
const vMyDirective = {
    beforeMount: (el) => {
        if (route.params.squadid != 'new') {
            squadId.value = route.params.squadid;
            getRoster(route.params.armyid);
        } else {
            getRoster(route.params.armyid);
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
                squadUnits.value = rosterSquads.value[squadId.value].units;
                squadGear.value = rosterSquads.value[squadId.value].gear;
                squadName.value = rosterSquads.value[squadId.value].name;
            }
        });
}


// Selecting Units
const selectedUnitId = ref("");
const selectedUnitName = ref("");
function selectedUnit(unit) {
    unit.id = selectedUnitId.value;
}


const selectedGearId = ref("");
const selectedGearName = ref("")
function selectedGear(gearItem) {
    gearItem.id = selectedGearId.value;
}


// Creating Units and Gear Entries
function addUnit(){
    squadUnits.value.push({
        'id': "",
        'gear': [],
    });
}
function deleteUnit(unitIndex) {
    squadUnits.value.splice(unitIndex, 1);
}


function addGear(unit){
    unit.gear.push({
        'id': "",
    });
}
function deleteGear(gearItemIndex, unitGear) {
    unitGear.splice(gearItemIndex, 1);
}


function addSquadGear(){
    squadGear.value.push({
        'id': "",
    });
}
function deleteSquadGear(gearItemIndex) {
    squadGear.value.splice(gearItemIndex, 1);
}

// Save Squad
function save() {
    // console.log("hello!");
    // let tempsquads = JSON.parse(JSON.stringify(rosterSquads.value));
    let tempvar;
    if (squadId.value === null) {
        rosterSquads.value.push({
            'id': crypto.randomUUID(),
            'name': squadName.value,
            'min': squadMin.value,
            'max': squadMax.value,
            'units': squadUnits.value,
            'gear': squadGear.value
        });
    } else {
        rosterSquads.value[squadId.value] = {
            'id': squadId.value,
            'name': squadName.value,
            'min': squadMin.value,
            'max': squadMax.value,
            'units': squadUnits.value,
            'gear': squadGear.value
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
        </template>
        <template #right>
            <a href="#" v-on:click.prevent="save" class="d-flex align-items-center text-dark text-decoration-none"><span class="fs-4">Save</span></a>
        </template>
    </NavBar>

    <main class="container-md mt-5">

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
                    </fieldset>
                    <!-- <fieldset class="row mb-5">
                        <div class="col-sm mb-1 input-group">
                            <div class="form-floating">
                                <input inputmode="numeric" type="text" name="squadSizeMinimum" id="squadSizeMinimum" class="form-control" v-model.number="squadMin">
                                <label for="squadSizeMinimum">Minimum</label>
                            </div>
                        </div>
                        <div class="col-sm mb-1 input-group">
                            <div class="form-floating">
                                <input inputmode="numeric" type="text" name="squadSizeMaximum" id="squadSizeMaximum" class="form-control" v-model.number="squadMax">
                                <label for="squadSizeMaximum">Maxmium</label>
                            </div>
                        </div>
                    </fieldset> -->
                    <fieldset class="row mb-5">                    
                        <div class="col-sm mb-1">
                            <button class="btn btn-danger flex-fill" v-on:click.prevent="deleteSquad()">Delete Squad</button>
                        </div>
                        <!-- <div class="col-sm"></div> -->
                    </fieldset>
                    <fieldset class="row mb-1">
                        <p>Squad Units</p>
                    </fieldset>
                    <fieldset class="row mb-1" v-for="(unit, unitIndex) in squadUnits">
                        <span class="my-2 border-top"></span>
                        <!-- <p>{{unit}}</p> -->
                        <div class="col">
                            <div class="row mb-1">
                                <div class="col-sm">
                                    <UnitSelector tableName="Units" :startingUnitId="unit.id" v-model:selectedUnitId="selectedUnitId" v-model:selectedUnitName="selectedUnitName" v-on:change="selectedUnit(unit)"></UnitSelector>
                                </div>
                                <div class="col-sm my-1 d-flex">
                                    <button class="btn btn-danger flex-fill" v-on:click.prevent="deleteUnit(unitIndex)">Delete Unit</button>
                                </div>
                            </div>
                            <!-- <div class="row mb-1" v-for="(gearItem, gearItemIndex) in unit.gear">
                                <div class="col-sm"></div>
                                <div class="col-sm">
                                    <UnitSelector tableName="Gear" :startingUnitId="gearItem.id" v-model:selectedUnitId="selectedGearId" v-model:selectedUnitName="selectedGearName" v-on:change="selectedGear(gearItem)"></UnitSelector>
                                </div>
                                <div class="col-sm my-1">
                                    <button class="btn btn-warning" v-on:click.prevent="deleteGear(gearItemIndex, unit.gear)">Delete Gear</button>
                                </div>
                            </div>
                            <button class="btn btn-dark" v-on:click.prevent="addGear(unit)">Add Gear</button> -->
                        </div>
                    </fieldset>
                    <fieldset class="row">
                        <div class="col">
                            <div class="my-3 d-flex">
                                <button class="btn btn-primary mb-3 flex-fill" type="addUnitToSquad" name="addUnitToSquad" v-on:click.prevent="addUnit">Add Unit</button>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="row mb-1">
                        <p>Squad Gear</p>
                    </fieldset>
                    <fieldset class="row mb-1" v-for="(gear, gearIndex) in squadGear">
                        <span class="my-2 border-top"></span>
                        <!-- <p>{{unit}}</p> -->
                        <div class="col">
                            <div class="row mb-1">
                                <div class="col-sm">
                                    <UnitSelector tableName="Gear" :startingUnitId="gear.id" v-model:selectedUnitId="selectedGearId" v-model:selectedUnitName="selectedGearName" v-on:change="selectedGear(gear)"></UnitSelector>
                                </div>
                                <div class="col-sm my-1 d-flex">
                                    <button class="btn btn-warning" v-on:click.prevent="deleteSquadGear(gearIndex, gear)">Delete Gear</button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="row">
                        <div class="col">
                            <div class="my-3 d-flex">
                                <button class="btn btn-dark mb-3 flex-fill" type="addUnitToSquad" name="addUnitToSquad" v-on:click.prevent="addSquadGear(unit)">Add Gear</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </section>
    </main>
</div>
</template>