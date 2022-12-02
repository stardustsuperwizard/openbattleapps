<script setup>
import { computed, ref } from "vue";
import BattleGridValue from '@/components/BattleGridValue.vue';

const cover = ref(0);
const distance = ref(0);
const skillAttribute = ref(1);

const difficulty = computed(() => {
    let distanceMod = distance.value / 6
    return (distanceMod - distanceMod % 1) + parseInt(cover.value)
});

</script>


<template>
<div>
    <div class="container-md mt-5">
        <div class="row pt-1">
            <div class="col">
                <section>
                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Ranged Combat value</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="skillAttribute--" :disabled="skillAttribute == 1">-</button>
                            <input inputmode="numeric" type="text" min="0" name="gearDistanceLevel" id="gearDistanceLEvel" class="form-control" v-model.number="skillAttribute">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="skillAttribute++" :disabled="skillAttribute == 20">+</button>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Distance</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="distance--" :disabled="distance == 0">-</button>
                            <input inputmode="numeric" type="text" min="1" name="gearAttackLevel" id="gearAttackLevel" class="form-control" v-model.number="distance">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="distance++">+</button>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-3">
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="gearAttackCost" id="gearAttackCost" class="form-control" v-bind:value="difficulty" disabled>
                                <label for="gearAttackCost">Difficulty value</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Cover</span>
                        </div>
                        <div class="col-sm">
                            <div class="form-floating">
                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value="0" v-model="cover" checked>
                                    <label class="btn btn-outline-primary" for="btnradio1">No Cover</label>

                                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" value="1" v-model="cover">
                                    <label class="btn btn-outline-primary" for="btnradio2">Light Cover</label>

                                    <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" value="2" v-model="cover">
                                    <label class="btn btn-outline-primary" for="btnradio3">Heavy Cover</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm">
                            <BattleGridValue :skillAttributeImported="skillAttribute" :difficultyImported="difficulty"></BattleGridValue>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
</template>


