<script setup>
import { ref } from "vue";
import BattleGridValue from '@/components/BattleGridValue.vue';



const skillAttribute = ref(1);
const difficulty = ref(1);

</script>


<template>
<div>
    <div class="container-md mt-5">
        <div class="row pt-1">
            <div class="col">
                <section>
                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Attribute value</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="skillAttribute--" :disabled="skillAttribute == 1">-</button>
                            <input inputmode="numeric" type="text" min="0" name="gearDistanceLevel" id="gearDistanceLEvel" class="form-control" v-model.number="skillAttribute">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="skillAttribute++">+</button>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-3">
                            <span>Difficulty value</span>
                        </div>
                        <div class="col-sm input-group">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="difficulty--" :disabled="difficulty == 1">-</button>
                            <input inputmode="numeric" type="text" min="1" name="gearAttackLevel" id="gearAttackLevel" class="form-control" v-model.number="difficulty">
                            <button class="btn btn-outline-secondary" v-on:click.prevent="difficulty++" :disabled="difficulty == 20">+</button>
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


