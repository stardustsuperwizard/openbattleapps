<script setup>
import { computed, ref } from "vue";
import NavBar from '@/components/NavBar.vue';

const units = ref([]);

const vMyDirective = {
  beforeMount: (el) => {
    getBattleUnits();
  }
}

async function getBattleUnits() {
    units.value = await idb.readTable('Units');
    // console.log(this.units);
}
// function getTotalCost(unit) {
//     console.log(unit);
//     let pointcostRC = rangedCombatPointCost(unit.rangedCombatValue, unit.hitPoints);
//     let pointcostCC = closeCombatPointCost(unit.closeCombatValue, unit.hitPoints);
//     let pointcostCS = combatSavePointCost(unit.combatSaveValue, unit.hitPoints);
//     let pointcostPT = physicalToughnessPointCost(unit.physicalToughnessValue, unit.hitPoints);
//     let pointcostMT = mentalToughnessPointCost(unit.mentalToughnessValue, unit.hitPoints);
//     let pointcostHP = hitPointsPointCost(unit.hitPoints);
//     let pointcostMV = movementPointCost(unit.movement, unit.hitPoints);
//     return totalUnitPointCost(pointcostRC, pointcostCC, pointcostPT, pointcostMT, pointcostCS, pointcostMV, pointcostHP );
// }
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
            <router-link to="/battleunits/sheet/new" class="align-items-center text-dark text-decoration-none">
                <span class="fs-4">Add +</span>
            </router-link>
        </template>
    </NavBar>

    <main class="container-md mt-5">
        <section class="row">
            <div class="col">
                <h1 class="fs-4">Unit Roster</h1>
            </div>
        </section>

        <section v-for="(unit, index) in units">
            <router-link :to="`/battleunits/sheet/${unit.id}`" class="text-decoration-none text-dark">
                <div class="row border-top border-bottom">
                    <div class="col-11">
                        <div class="row">
                            <div class="col">
                                <div class="d-flex flex-fill fs-3">{{unit.unitName }}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col fw-light">
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>RC</th>
                                                <th>CC</th>
                                                <th>PT</th>
                                                <th>MT</th>
                                                <th>HP</th>
                                                <th>RF</th>
                                                <th>MV</th>
                                                <th>Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{{ unit.rangedCombat }}</td>
                                                <td>{{ unit.closeCombat }}</td>
                                                <td>{{ unit.physicalToughness }}</td>
                                                <td>{{ unit.mentalToughness }}</td>
                                                <td>{{ unit.hitPoints }}</td>
                                                <td>{{ unit.reflex }}</td>
                                                <td>{{ unit.movement }}</td>
                                                <td>{{ unit.totalPointCost }}</td>
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