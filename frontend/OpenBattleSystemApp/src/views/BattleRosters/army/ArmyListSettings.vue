<script setup>
import { computed, ref } from "vue";
import NavBar from '@/components/NavBar.vue';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router= useRouter();

const squads = ref([]);

const rosterNew = ref(false);
const rosterId = ref(null);
const rosterName = ref(null);
const rosterPoints = ref(0);
const rosterPointsAvailable = computed(() => { return rosterPoints.value - rosterPointsUsed.value });


const rosterPointsUsed = computed(() => {
    let pointCost = 0;
    squads.value.forEach(element => {
        pointCost = pointCost + element.totalCost;
    });
    return pointCost
});

const vMyDirective = {
    beforeMount: (el) => {
        if (route.params.id != 'new') {
            getSquads(parseInt(route.params.id));
        } else {
            rosterNew.value = true;
        }
    }
}

function getSquads(id) {
    idb.readTableEntry('battleRosters', id)
        .then((resp) => {
            // console.log(resp);
            // console.log(resp.squads);
            rosterId.value = resp.id;
            rosterName.value = resp.name;
            rosterPoints.value = resp.points;
            squads.value = resp.squads;
        });
}

function save() {
    // console.log(rosterName.value);
    let tempvar;
    if (rosterId.value != null) {
        tempvar = {
            'id': rosterId.value,
            'name': rosterName.value,
            'points': rosterPoints.value,
            'squads': JSON.parse(JSON.stringify(squads.value))
        }
    } else {
        tempvar = {
            'name': rosterName.value,
            'points': rosterPoints.value,
            'squads': []
        }
    }
    // console.log(tempvar);
    idb.createEntry('battleRosters', tempvar)
        .then((resp) => {
            router.back()
            // if (route.params.id == 'new') {
            //     router.back()
            // }
        });
}

function deleteRoster() {
    idb.deleteEntry('battleRosters', rosterId.value);
    router.push('/battlerosters/list');
}
</script>


<template>
<div v-my-directive>
    <NavBar>
        <template #left>
            <router-link :to="`/battlerosters/army/list/${rosterId}`" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </router-link>
        </template>
        <template #right>
            <router-link :to="`/battlerosters/army/list/${rosterId}/squads/new`" class="align-items-center text-dark text-decoration-none">
                <span class="fs-4" v-if="rosterNew != true">Add +</span>
            </router-link>
        </template>
    </NavBar>

    <main class="container-md mt-5">
        <section class="row">
            <div class="col">
                <h1 class="fs-4">Battle Rosters</h1>
            </div>
        </section>
        <section class="row">
            <div class="col">
                <form action="">
                    <fieldset class="row mb-3">
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="rosterName" id="rosterName" class="form-control" v-model="rosterName">
                                <label for="rosterName">Battle Roster Name</label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="row mb-3">
                        <div class="col-sm mb-3">
                            <div class="form-floating">
                                <input type="text" name="rosterPoints" id="rosterPoints" class="form-control" v-model="rosterPoints">
                                <label for="rosterPoints">Total Roster Points</label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="row mb-3">
                        <div class="col-sm mb-1 d-flex">
                            <button class="btn btn-primary flex-fill" name="Save" v-on:click.prevent="save">Save</button>
                        </div>
                        <div class="col-sm mb-1 d-flex">
                            <button class="btn btn-danger flex-fill" name="deleteRoster" v-on:click.prevent="deleteRoster">Delete</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </section>

        <section v-for="(squad, index) in squads">
            <router-link :to="`/battlerosters/army/list/${rosterId}/squads/${index}`" class="text-decoration-none text-dark">
                <div class="row border-top border-bottom">
                    <div class="col-11">
                        <div class="row">
                            <div class="col">
                                <!-- <p>{{squads}}</p> -->
                                <div class="d-flex flex-fill fs-3">{{ squad.name }}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col fw-light">
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Units</th>
                                                <th>Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{{ squad.unitCount }}</td>
                                                <td>{{ squad.totalCost }}</td>
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