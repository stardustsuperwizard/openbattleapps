<script setup>
import NavBar from '@/components/NavBar.vue';
</script>


<template>

<NavBar>
    <template #left>
        <router-link to="/" class="d-flex align-items-center text-dark text-decoration-none">
            <span class="fs-4">&lt; Back</span>
        </router-link>
    </template>
</NavBar>
<main class="container-md mt-5">
    <section class="row">
        <div class="col">
            <router-link to="/rules/core/playingsurface" class="text-decoration-none text-dark fs-3"><div class="border-bottom border-top d-flex flex-row p-3"><div class="d-flex flex-fill">Playing Surface</div><div class="d-inline-flex"> > </div></div></router-link>
            <router-link to="/rules/core/unitsandgear" class="text-decoration-none text-dark fs-3"><div class="border-bottom d-flex flex-row p-3"><div class="d-flex flex-fill">Units and Gear</div><div class="d-inline-flex"> > </div></div></router-link>
            <router-link to="/rules/core/squads" class="text-decoration-none text-dark fs-3"><div class="border-bottom d-flex flex-row p-3"><div class="d-flex flex-fill">Squads</div><div class="d-inline-flex"> > </div></div></router-link>
            <router-link to="/rules/core/gameround" class="text-decoration-none text-dark fs-3"><div class="border-bottom d-flex flex-row p-3"><div class="]d-flex flex-fill">Game Round</div><div class="d-inline-flex"> > </div></div></router-link>
            <router-link to="/rules/core/formulas" class="text-decoration-none text-dark fs-3"><div class="border-bottom d-flex flex-row p-3"><div class="d-flex flex-fill">Formulas</div><div class="d-inline-flex"> > </div></div></router-link>
        </div>
    </section>
</main>
</template>