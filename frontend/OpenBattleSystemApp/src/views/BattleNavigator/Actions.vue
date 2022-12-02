<script setup>
import { computed, ref } from "vue";
import NavBar from '@/components/NavBar.vue';
import NextMove from '@/components/NextMove.vue';
import PreviousMove from '@/components/PreviousMove.vue';
import BattleCalculator from '@/components/calculators/BattleCalculatorBasic.vue';

const playerList = ref([1, 2]);
const index = ref(0);

const currentPlayer = computed(() => { return playerList.value[index.value] });
// const currentPlayer = playerList.slice(0, index.value);

const doneVariable = computed(() => { 
    if (index.value > playerList.value.length ) {
        return true
    } else {
        return false
    }
});

const showRules = ref(false);
const showCalculator = ref(false);
</script>


<template>
<NavBar>
    <template #left>
        <router-link to="morale" class="d-flex align-items-center text-dark text-decoration-none">
            <span class="fs-4">&lt; Back</span>
        </router-link>
    </template>
</NavBar>
<main class="container-md mt-5">
    <section class="row mt-3">
        <div class="col">
            <h1>Actions Phase</h1>
        </div>
    </section>
    <section class="row">
        <div class="col">
            <h2>Instructions</h2>
                <div v-if="!doneVariable">
                    <p><b>Player {{ currentPlayer }}</b>, may now perform any actions.</p>
                </div>
                <p v-else>You are done! This concludes 1 round of play. Click below to start a new round of play.</p>
                <div v-if="!doneVariable">
                    <PreviousMove class="btn btn-secondary mt-3 mx-1" v-bind:playerList="playerList" v-bind:indexNumber="index" v-model:index="index">Previous Move</PreviousMove>
                    <NextMove class="btn btn-primary mt-3 mx-1" v-bind:playerList="playerList" v-bind:indexNumber="index" v-model:index="index">Next Move</NextMove>
                </div>
                <div v-else>
                    <PreviousMove class="btn btn-secondary mt-3 mx-1" v-bind:playerList="playerList" v-bind:indexNumber="index" v-model:index="index">Previous Move</PreviousMove>
                    <router-link to="movement" class="btn btn-primary mt-3 mx-1">Next Round</router-link>
                </div>
        </div>
    </section>
    <!-- <section class="row mt-3" v-if="!doneVariable">
        <div class="col">
            <h2 class="border-bottom">
                <a href="#" class="text-dark text-decoration-none" v-on:click.prevent="(showCalculator = !showCalculator)" v-if="!showCalculator"> > Morale Difficulty Calculator</a>
                <a href="#" class="text-dark text-decoration-none" v-on:click.prevent="(showCalculator = !showCalculator)" v-if="showCalculator"> v Morale Difficulty Calculator</a>
            </h2>
            <div v-if="showCalculator">
                <BattleCalculator></BattleCalculator>
            </div>
        </div>
    </section> -->
    <section class="row mt-3" v-if="!doneVariable">
        <div class="col">
            <h2 class="border-bottom">
                <a href="#" class="text-dark text-decoration-none" v-on:click.prevent="showRules = !showRules" v-if="!showRules"> > Rules</a>
                <a href="#" class="text-dark text-decoration-none" v-on:click.prevent="showRules = !showRules" v-if="showRules"> v Rules</a>
            </h2>
            <div v-if="showRules">
                <h4>Stuff</h4>
            </div>
        </div>
    </section>
</main>
</template>