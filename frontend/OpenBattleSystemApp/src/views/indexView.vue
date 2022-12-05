<script setup>
import NavBar from '@/components/NavBar.vue'
</script>


<template>
<div>
<NavBar>
    <template #left>
        <span class="fs-4">Open Battle System&#8482;</span>
    </template>
</NavBar>
<div class="container mt-5" id="custom-cards">
    <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">

        <div class="col">
            <router-link to="/battlerules/complete" class="text-decoration-none">
                <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style="background-image: url('https://cdn.openbattlesystem.com/mikolaj-DCzpr09cTXY-unsplash.jpg')">
                    <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                    <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Battle Rules</h3>
                    </div>
                </div>
            </router-link>
        </div>

        <div class="col">
            <router-link to="/battlenavigator/start" class="text-decoration-none">
                <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg">
                    <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                    <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Battle Navigator</h3>
                    </div>
                </div>
            </router-link>
        </div>

        <div class="col">
            <router-link to="/battleunits/list" class="text-decoration-none">
                <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style="background-image: url('https://cdn.openbattlesystem.com/app/pic1.jpg');">
                    <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                        <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Battle Units</h3>
                    </div>
                </div>
            </router-link>
        </div>

        <div class="col">
            <router-link to="/battlearmor/list" class="text-decoration-none">
                <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg">
                    <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                        <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Battle Armor</h3>
                    </div>
                </div>
            </router-link>
        </div>

        <div class="col">
            <router-link to="/battlegear/list" class="text-decoration-none">
                <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style="background-image: url('https://cdn.openbattlesystem.com/app/pic2.jpg');">
                    <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                        <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Battle Gear</h3>
                    </div>
                </div>
            </router-link>
        </div>

        <div class="col">
            <a href="/battlerosters/list" class="text-decoration-none">
                <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style="background-image: url('https://cdn.openbattlesystem.com/app/pic3.jpg');">
                    <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                    <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Battle Roster</h3>
                    </div>
                </div>
            </a>
        </div>

        <div class="col">
            <a href="/battlecalculators/list" class="text-decoration-none">
                <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg">
                    <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                    <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Battle Calculators</h3>
                    </div>
                </div>
            </a>
        </div>

    </div>
</div>
</div>
</template>


<style>
    .overlay {
        background: rgba(33, 37, 41, .60);
    }
</style>