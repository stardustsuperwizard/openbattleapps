<script setup>
import { ref } from "vue";
import NavBar from '@/components/NavBar.vue';
import UnitSelector from '@/components/UnitSelector.vue';
import GearSelector from '@/components/GearSelector.vue';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const rosterId = ref(null);
const rosterName = ref(null);
const rosterSquads = ref([]);

const squadId = ref(0);
// const squadName = ref(null);
const squadUnits = ref([]);


const vMyDirective = {
    beforeMount: (el) => {
        
        if (route.params.id != 'new') {
            getRoster(parseInt(route.params.army));
        } else {
            squadId.value = route.params.id;
        }
    }
}

function getRoster(armyId) {
    idb.readTableEntry('battleRosters', armyId)
        .then((resp) => {
            squadId.value = route.params.id;
            // console.log(resp);
            rosterId.value = resp.id;
            rosterName.value = resp.name;
            rosterSquads.value = resp.squads;
            squadUnits.value = rosterSquads.value[squadId.value];
        });
}


function addUnit(){
    squadUnits.value.push({
        'id': squadUnits.value.length + 1,
        'name': '',
        'unitId': 0,
        'quantity': 0,
        'gear': []
    });
}

function addGear(unit){
    unit.gear.push({
        'id': unit.gear.length + 1,
        'gearId': 0,
        'quantity': 0
    });
}

function deleteGear(gearItemIndex, unitGear) {
    unitGear.splice(gearItemIndex, 1);
}

function deleteUnit(unitIndex) {
    squadUnits.value.splice(unitIndex, 1);
}

const selectedGearId = ref(0);
function selectedGear(gearItem) {
    gearItem.gearId = selectedGearId.value;
}

const selectedUnitId = ref(0);
function selectedUnit(unit) {
    unit.unitId = selectedUnitId.value;
}

function save() {
    // let tempsquads = JSON.parse(JSON.stringify(rosterSquads.value));
    let tempvar;
    if (squadId.value === 0) {
        rosterSquads.value.push(squadUnits.value);
    } else {
        rosterSquads.value[squadId.value] = squadUnits.value;
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
        <template #right>
            <a href="#" v-on:click.prevent="save" class="d-flex align-items-center text-dark text-decoration-none"><span class="fs-4">Save</span></a>
        </template>
    </NavBar>

    <div class="container-md mt-5">
        <div class="row pt-1">
            <div class="col">
                <form action="">
                    <div class="row mb-1" v-for="(unit, unitIndex) in squadUnits">
                        <div class="col">
                            <div class="row mb-1">
                                <div class="col-sm">
                                    <div class="form-floating">
                                        <input type="text" name="unitName" id="unitName" class="form-control" v-model="unit.name">
                                        <label for="unitName">Unit Name (optional)</label>
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <UnitSelector squadId="unit.id" v-model:selectedUnitId="selectedUnitId" v-on:change="selectedUnit(unit)"></UnitSelector>
                                    <!-- <span>{{ selectedUnitId }}</span> -->
                                </div>
                                <div class="col-sm input-group">
                                    <input inputmode="numeric" type="number" min="0" name="gearDistanceLevel" id="gearDistanceLEvel" class="form-control" v-model.number="unit.quantity">
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="unit.quantity--">-</button>
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="unit.quantity++">+</button>
                                </div>
                                <div class="col-sm">
                                    <button class="btn btn-danger" v-on:click.prevent="deleteUnit(unitIndex)">Delete Unit</button>
                                </div>
                            </div>
                            <div class="row mb-1" v-for="(gearItem, gearItemIndex) in unit.gear">
                                <div class="col-sm"></div>
                                <div class="col-sm">
                                    <GearSelector squadId="unit.id" v-model:selectedGearId="selectedGearId" v-on:change="selectedGear(gearItem)"></GearSelector>
                                    <!-- <span>{{ selectedUnitId }}</span> -->
                                </div>
                                <div class="col-sm input-group">
                                    <input inputmode="numeric" type="number" min="0" name="gearDistanceLevel" id="gearDistanceLEvel" class="form-control" v-model.number="gearItem.quantity">
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="gearItem.quantity--">-</button>
                                    <button class="btn btn-outline-secondary" v-on:click.prevent="gearItem.quantity++">+</button>
                                </div>
                                <div class="col-sm">
                                    <button class="btn btn-danger" v-on:click.prevent="deleteGear(gearItemIndex, unit.gear)">Delete Gear</button>
                                </div>
                            </div>
                            <p>{{unit}}</p>
                            <button class="btn btn-secondary" v-on:click.prevent="addGear(unit)">Add Gear</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="d-flex my-3">
                    <button class="btn btn-primary mb-3 flex-fill" type="addUnitToSquad" name="addUnitToSquad" v-on:click.prevent="addUnit">Add to Squad</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>