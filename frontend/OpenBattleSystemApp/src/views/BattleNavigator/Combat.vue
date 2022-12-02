<script setup>
import { computed, ref } from "vue";
import NavBar from '@/components/NavBar.vue';

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
const showRangedCalc = ref(false);
</script>


<template>
<NavBar>
    <template #left>
        <router-link to="movement" class="d-flex align-items-center text-dark text-decoration-none">
            <span class="fs-4">&lt; Back</span>
        </router-link>
    </template>
</NavBar>
<main class="container-md mt-5">
    <section class="row mt-3">
        <div class="col">
            <h1>Combat Phase</h1>
            <p></p>
        </div>
    </section>
    <section class="row">
        <div class="col">
            <h2>Instructions</h2>
            <p>Players may now select squads to fight in the combat phase. For a squad to be eligible to participate, the squad must have the appropriate attributes in their stat blocks. The Combat Phase starts with Ranged Combat and ends with Close Combat. </p>
            <p>
                A squad must choose one of the following combat methods to use:
                <ul>
                    <li>Ranged Combat (friendly squad RC vs DST)</li>
                    <li>Close Combat (friendly squad CC vs opposing squad CC)</li>
                </ul>                
            </p>
            <router-link to="combatranged" class="btn btn-primary mt-3 mx-1">Start Phase</router-link>
        </div>
    </section>
    <section class="row mt-3">
        <div class="col">
            <h3 class="border-bottom">
                <a href="#" class="text-dark text-decoration-none" v-on:click.prevent="showRules = !showRules" v-if="!showRules"> > Additional Rules</a>
                <a href="#" class="text-dark text-decoration-none" v-on:click.prevent="showRules = !showRules" v-if="showRules"> v Additional Rules</a>
            </h3>
                    <div v-if="showRules">
                        <h4>Combat Sequence</h4>
                        <h4>Ranged Combat</h4>
                        <h4>Close Combat</h4>
                        <h4>Ranged Combat in Close Combat</h4>
                    </div>
        </div>
    </section>

</main>
</template>