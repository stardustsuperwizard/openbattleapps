<script setup>
import NavBar from '@/components/NavBar.vue';
</script>


<template>
<NavBar>
    <template #left>
        <router-link to="/rules/core/contents" class="d-flex align-items-center text-dark text-decoration-none">
            <span class="fs-4">&lt; Back</span>
        </router-link>
    </template>
</NavBar>
<main class="container-md mt-5">
    <section class="row">
        <div class="col">
            <h1>Rules</h1>
        </div>
    </section>
    <section class="row">
        <div class="col">
            <h2>Units and Gear</h2>
            <h3>Unit</h3>
                <p>A unit is a single entity that exists in the tabletop. Models have the following profile stats:</p>
                <ul>
                    <li>Ranged Combat (RC)</li>
                    <li>Close Combat (CC)</li>
                    <li>Physical Toughnes (PT)</li>
                    <li>Mental Toughness (MT)</li>
                    <li>Hit Points (HP)</li>
                    <li>Combat Save (CS)</li>
                    <li>Movement (MV)</li>
                </ul>
            <h3>Gear</h3>
                <p>Gear are tools and abilities used by models to perform combat actions against other units. Weapons have the following profile stats:</p>
                <ul>
                    <li>Distance (Dst)</li>
                    <li>Attacks (A)</li>
                    <li>Strength (S)</li>
                    <li>Save Modifier (SM)</li>
                </ul>
        </div>
    </section>
</main>
</template>