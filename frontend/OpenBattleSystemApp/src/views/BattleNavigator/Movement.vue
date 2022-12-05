<script setup>
import { computed, ref } from "vue";
import NavBar from '@/components/NavBar.vue';
import NextMove from '@/components/NextMove.vue';
import PreviousMove from '@/components/PreviousMove.vue';
import BattleRules from '@/components/BattleNavigatorRules.vue';

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
</script>


<template>
    <NavBar>
    <template #left>
        <router-link to="start" class="d-flex align-items-center text-dark text-decoration-none">
            <span class="fs-4">&lt; Back</span>
        </router-link>
    </template>
</NavBar>
<main class="container-md mt-5">
    <section class="row mt-3">
        <div class="col">
            <h1>Movement Phase</h1>
        </div>
    </section>
    <section class="row">
        <div class="col">
            <h2>Instructions</h2>
                <p v-if="!doneVariable"><b>Player {{ currentPlayer }}</b>, if one or more of your squads have the ability to perform a movement, then those squads may make an action in this phase.</p>
                <p v-else>You are done! Continue to the next phase.</p>
                <div v-if="!doneVariable">
                    <PreviousMove class="btn btn-secondary mt-3 mx-1" v-bind:playerList="playerList" v-bind:indexNumber="index" v-model:index="index">Previous Move</PreviousMove>
                    <NextMove class="btn btn-primary mt-3 mx-1" v-bind:playerList="playerList" v-bind:indexNumber="index" v-model:index="index">Next Move</NextMove>
                </div>
                <div v-else>
                    <PreviousMove class="btn btn-secondary mt-3 mx-1" v-bind:playerList="playerList" v-bind:indexNumber="index" v-model:index="index">Previous Move</PreviousMove>
                    <router-link to="combat" class="btn btn-primary mt-3 mx-1">Next Phase</router-link>
                </div>
        </div>
    </section>
    <section class="row mt-3" v-if="!doneVariable">
        <div class="col">
            <h3 class="border-bottom">
                <a href="#" class="text-dark text-decoration-none" v-on:click.prevent="showRules = !showRules" v-if="!showRules"> > Additional Rules</a>
                <a href="#" class="text-dark text-decoration-none" v-on:click.prevent="showRules = !showRules" v-if="showRules"> v Additional Rules</a>
            </h3>
            <div v-if="showRules">
                <BattleRules :tags="['movement']"></BattleRules>
            </div>
        </div>
    </section>
</main>
</template>