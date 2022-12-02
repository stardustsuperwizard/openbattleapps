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
            <h1>Navigator</h1>
        </div>
    </section>
    <section class="row">
        <div class="col">
            <p>Battle Navigator is a tool to provide a guided turn-by-turn listing of the rules. When following the Navigator, you can complete a full game while ensuring that both players are following correct rules.</p>
        </div>
    </section>
    <section class="row">
        <div class="col">
            <router-link to="movement" class="text-decoration-none text-dark fs-3"><div class="border-bottom border-top d-flex flex-row p-3"><div class="d-flex flex-fill">Start New Round</div><div class="d-inline-flex"> > </div></div></router-link>
            <router-link to="movement" class="text-decoration-none text-dark fs-3"><div class="border-bottom d-flex flex-row p-3"><div class="d-flex flex-fill">Movement Phase</div><div class="d-inline-flex"> > </div></div></router-link>
            <router-link to="combat" class="text-decoration-none text-dark fs-3"><div class="border-bottom d-flex flex-row p-3"><div class="d-flex flex-fill">Combat Phase</div><div class="d-inline-flex"> > </div></div></router-link>
            <router-link to="morale" class="text-decoration-none text-dark fs-3"><div class="border-bottom d-flex flex-row p-3"><div class="d-flex flex-fill">Morale Phase</div><div class="d-inline-flex"> > </div></div></router-link>
            <router-link to="actions" class="text-decoration-none text-dark fs-3"><div class="border-bottom d-flex flex-row p-3"><div class="]d-flex flex-fill">Actions Phase</div><div class="d-inline-flex"> > </div></div></router-link>
        </div>
    </section>
</main>
</template>