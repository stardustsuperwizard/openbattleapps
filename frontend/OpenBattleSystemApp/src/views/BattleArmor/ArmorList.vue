<script setup>
import { computed, ref } from "vue";
import NavBar from '@/components/NavBar.vue';

const gearList = ref([]);

const vMyDirective = {
  beforeMount: (el) => {
    getBattleGear();
  }
}

async function getBattleGear() {
    gearList.value = await idb.readTable('Armor');
    // console.log(this.units);
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
            <router-link to="/battlearmor/sheet/new" class="align-items-center text-dark text-decoration-none">
                <span class="fs-4">Add +</span>
            </router-link>
        </template>
    </NavBar>

    <main class="container-md mt-5">
        <section class="row">
            <div class="col">
                <h1 class="fs-4">Gear List</h1>
            </div>
        </section>

        <section v-for="(gear, index) in gearList">
            <router-link :to="`/battlearmor/sheet/${gear.id}`" class="text-decoration-none text-dark">
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
                                                <th>CS</th>
                                                <th>DB</th>
                                                <th>Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{{gear.combatSave}}</td>
                                                <td>{{gear.durability}}</td>
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
        </section>

    </main>
</div>
</template>