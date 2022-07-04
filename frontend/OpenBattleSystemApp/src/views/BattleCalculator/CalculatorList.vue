<script setup>
import NavBar from '@/components/NavBar.vue';
</script>


<template>
<div>
    <NavBar>
        <template #left>
            <router-link to="/" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </router-link>
        </template>
        <!-- <template #right>
            <router-link to="/battlegear/sheet/new" class="align-items-center text-dark text-decoration-none">
                <span class="fs-4">Add +</span>
            </router-link>
        </template> -->
    </NavBar>

    <main class="container-md mt-5">
        <section class="row">
            <div class="col">
                <h1 class="fs-4">Battle Calculators</h1>
            </div>
        </section>

        <section>
            <router-link :to="`/battlecalculators/general`" class="text-decoration-none text-dark">
                <div class="row border-top border-bottom">
                    <div class="col-11">
                        <div class="row">
                            <div class="col">
                                <div class="d-flex flex-fill fs-3">General</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col fw-light">
                                All purpose calculator for comparing attribute value against difficulty value and returning the die roll required.
                            </div>
                            <div class="col"></div>
                        </div>
                    </div>
                    <div class="col-1 fs-1 align-self-center">
                        >
                    </div>
                </div>
            </router-link>

            <router-link :to="`/battlecalculators/rangedcombat`" class="text-decoration-none text-dark">
                <div class="row border-top border-bottom">
                    <div class="col-11">
                        <div class="row">
                            <div class="col">
                                <div class="d-flex flex-fill fs-3">Range Combat</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col fw-light">
                                Simplifies Ranged Combat by taking the distance and other modifiers and converts to Difficulty value.
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