<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from '@/components/NavBar.vue';

const route = useRoute();
const router= useRouter();

const gearId = ref(null);
const gearName = ref('');
const combatSave = ref(0);
const durability = ref(1);

const gearList = ref([]);

const vMyDirective = {
    beforeMount: (el) => {
        if (route.params.id != 'new') {
            editBattleGear(parseInt(route.params.id));
        }
    }
}

const combatSaveCost = computed(() => { return combatSavePointCost(combatSave.value, durability.value) });
const totalCost = computed(() => { return totalArmorPointCost(combatSaveCost.value) });


function addBattleGear() {
    // console.log('hello')
    let tempGear;
    if (gearId.value != null) {
        tempGear = {
            'id': gearId.value,
            'gearName': gearName.value,
            'combatSave': combatSave.value,
            'durability': durability.value,
            'totalPointCost': totalCost.value
        }
    } else {
        tempGear = {
            'gearName': gearName.value,
            'combatSave': combatSave.value,
            'durability': durability.value,
            'totalPointCost': totalCost.value
        }
    }
    idb.createEntry('Armor', tempGear);
    router.back();
}

function editBattleGear(id) {
    // console.log(id);
    if (id != null) {
        idb.readTableEntry('Armor', id)
            .then((resp) => {
                // console.log(resp);
                gearId.value = resp.id;
                gearName.value = resp.gearName;
                combatSave.value = resp.combatSave;
                durability.value = resp.durability;
            });
    } else {
        resetForm()
    }
}

function deleteGear() {
    // console.log(gearId);
    idb.deleteEntry('Gear', gearId.value);
    router.push('/battlearmor/list');
        // .then((resp) => {
        //     getBattleGear();
        // });
}

function resetForm() {
    gearId.value = null;
    gearName.value = '';
    combatSave.value = 0;
    durability.value = 1;
}
</script>


<template>
<div v-my-directive>
    <NavBar>
        <template #left>
            <router-link to="/battlearmor/list" class="d-flex align-items-center text-dark text-decoration-none">
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
                                <label for="gearName">Battle Armor Name</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Combat Save</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="combatSave--" :disabled="combatSave == 0">-</button>
                            <input inputmode="numeric" type="text" min="0" name="gearCombatSaveLevel" id="gearCombatSaveLEvel" class="form-control" v-model.number="combatSave">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="combatSave++" :disabled="combatSave == 20">+</button>
                        </div>
                       <div class="col-sm">
                           <div class="form-floating">
                                <input type="text" name="gearCombatSaveCost" id="gearCombatSaveCost" class="form-control" v-bind:value="combatSaveCost" disabled>
                                <label for="gearCombatSaveCost">Cost</label>
                           </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Durability</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="durability--" :disabled="durability == 1">-</button>
                            <input inputmode="numeric" type="text" min="1" name="gearAttackLevel" id="gearAttackLevel" class="form-control" v-model.number="durability">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="durability++" :disabled="durability == 20">+</button>
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