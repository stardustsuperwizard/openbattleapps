<script setup>
import { ref } from "vue";
import NavBar from '@/components/NavBar.vue';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router= useRouter();

const squads = ref(null);

const rosterNew = ref(false);
const rosterId = ref(null);
const rosterName = ref(null);

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
            squads.value = resp.squads;
        });
}

function save() {
    // console.log(squads.value);
    let tempvar;
    if (rosterId.value != null) {
        tempvar = {
            'id': rosterId.value,
            'name': rosterName.value,
            'squads': squads.value
        }
    } else {
        tempvar = {
            'name': rosterName.value,
            'squads': []
        }
    }
    idb.createEntry('battleRosters', tempvar)
        .then((resp) => {
            if (route.params.id == 'new') {
                router.back()
            }
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
            <router-link to="/battlerosters/list" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </router-link>
        </template>
        <template #right>
            <router-link :to="`/battlerosters/army/list/${rosterId}/squads/new`" class="align-items-center text-dark text-decoration-none">
                <span class="fs-4" v-if="rosterNew != true">Add +</span>
            </router-link>
        </template>
    </NavBar>

    <div class="container-md mt-5">
        <div class="row">
            <div class="col">
                <h1 class="fs-4">Battle Rosters</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <form action="">
                    <div class="row mb-3">
                        <div class="col-sm">
                            <div class="form-floating">
                                <input type="text" name="rosterName" id="rosterName" class="form-control" v-model="rosterName">
                                <label for="rosterName">Battle Roster Name</label>
                            </div>
                            <div class="d-flex my-3">
                                <button class="btn btn-primary flex-fill" name="Save" v-on:click.prevent="save">Save</button>
                            </div>
                            <div class="d-flex my-3">
                                <button class="btn btn-danger flex-fill" name="deleteRoster" v-on:click.prevent="deleteRoster">Delete</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div v-for="(squad, index) in squads">
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
                                                <th>Squad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{{ squad.name }}</td>
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