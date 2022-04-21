<script setup>
import { computed, ref } from "vue";
import NavBar from '@/components/NavBar.vue';

const gearList = ref([]);

const vMyDirective = {
  beforeMount: (el) => {
    getBattleGear()
  }
}

async function getBattleGear() {
    gearList.value = await idb.readTable('Gear');
    // console.log(this.units);
}

function editBattleGear(id) {
    // console.log(gearId);    
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
</script>


<template>
<div v-my-directive>
    <NavBar>
        <template #left>
            <router-link to="/" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </router-link>
        </template>
        <template #right>
            <router-link to="/battlegear/sheet/new" class="align-items-center text-dark text-decoration-none">
                <span class="fs-4">Add +</span>
            </router-link>
        </template>
    </NavBar>

    <div class="container-md mt-5">
        <div class="row">
            <div class="col">
                <h1 class="fs-4">Gear List</h1>
            </div>
        </div>

        <div v-for="(gear, index) in gearList">
            <router-link :to="`/battlegear/sheet/${gear.id}`" class="text-decoration-none text-dark">
                <div class="row border-top border-bottom">
                    <div class="col-11">
                        <div class="row">
                            <div class="col">
                                <div class="d-flex flex-fill fs-3">{{gear.gearName }}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col fw-light">
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>DST</th>
                                                <th>A</th>
                                                <th>S</th>
                                                <th>SM</th>
                                                <th>Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{{gear.distance}}</td>
                                                <td>{{gear.attacks}}</td>
                                                <td>{{gear.strength}}</td>
                                                <td>{{gear.saveModifier}}</td>
                                                <td>{{gear.totalPointCost}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col"></div>
                        </div>
                    </div>
                    <div class="col-1 fs-1 align-self-center">
                        >
                    </div>
                </div>
            </router-link>
        </div>

    </div>
</div>
</template>