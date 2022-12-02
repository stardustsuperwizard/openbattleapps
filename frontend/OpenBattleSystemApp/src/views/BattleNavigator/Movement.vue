<script setup>
import { computed, ref } from "vue";
import NavBar from '@/components/NavBar.vue';
import NextMove from '@/components/NextMove.vue';
import PreviousMove from '@/components/PreviousMove.vue';

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
                        <h4>Squad Status and Movement</h4>
                    
                        <h5>Squad Status Types</h5>

                        <h6>Normal</h6>
                        <p>The squad has no changes to normal rules and makes this move in the Movement Phase.</p>

                        <h6>Engaged</h6>

                        <p>Squads engaged in a close combat scrum may make this move. Each player taking a turn to move a single unit up to their maximum movement. Units may disengage with other units and move around to a more advantageous position.</p>

                        <h6>Fallback</h6>

                        <p>Retreating movement that is done by squad, during the Movement phase, that has failed a morale check. Squad must use Fallback move to move towards the nearest Rally Point.</p>
                        <p>In addition the following restrictions apply to the squad:
                            <ul>
                                <li>Squad may not use ranged combat</li>
                                <li>Squad may not make an assault move but may still fight in close combat</li>
                            </ul>
                        </p>

                        <h5>Movement through squads</h5>
                        <p>Friendly squads may move through other friendly squads. Squads may not move through opposing squads.</p>

                        <h5>Squad Cohesion</h5>
                        <p>When a squad numbers two or more units it must maintain cohesion. Squad cohesion is achieved by ensuring that every unit in the squad is no further than 2” from at least one other unit in the squad, unless the squad is engaged in close combat.</p>                    
                        <p>When a squad has at least one unit that is more than 2” away from any other squad unit and the squad is not in close combat with an enemy unit, the squad is no longer in cohesion and will be required to take a morale check in the morale check phase of the turn. If the morale check is passed, the unit may continue with their turn as normal but must make take a standard movement to bring all models into cohesion.</p>
                    </div>
        </div>
    </section>
</main>
</template>