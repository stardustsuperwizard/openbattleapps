<script setup>
import { ref } from "vue";
import NavBar from '@/components/NavBar.vue';

const rosters = ref([]);

const vMyDirective = {
  beforeMount: (el) => {
    getBattleRosters();
  }
}

async function getBattleRosters() {
    rosters.value = await idb.readTable('battleRosters');
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
            <router-link to="/battlerosters/army/list/new" class="align-items-center text-dark text-decoration-none">
                <span class="fs-4">New</span>
            </router-link>
        </template>
    </NavBar>

    <main class="container-md mt-5">
        <section class="row">
            <div class="col">
                <h1 class="fs-4">Battle Rosters</h1>
            </div>
        </section>

        <section v-for="(roster, index) in rosters">
            <router-link :to="`/battlerosters/army/list/${roster.id}`" class="text-decoration-none text-dark">
                <div class="row border-top border-bottom">
                    <div class="col-11">
                        <div class="row">
                            <div class="col">
                                <div class="d-flex flex-fill fs-3">{{ roster.name }}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col fw-light">
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Point Size</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{{ roster.points }}</td>
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