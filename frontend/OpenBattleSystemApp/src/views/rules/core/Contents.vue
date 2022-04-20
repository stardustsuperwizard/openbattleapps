<script setup>
import NavBar from '@/components/NavBar.vue';
</script>


<template>

<div>
    <NavBar>
        <template #left>
            <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </a>
        </template>
    </NavBar>
    <div class="container-md mt-5">
        <a href="/rules/core/playingsurface" class="text-decoration-none text-dark fs-3"><div class="border-bottom border-top d-flex flex-row p-3"><div class="d-flex flex-fill">Playing Surface</div><div class="d-inline-flex"> > </div></div></a>
        <a href="/rules/core/unitsandgear" class="text-decoration-none text-dark fs-3"><div class="border-bottom d-flex flex-row p-3"><div class="d-flex flex-fill">Units and Gear</div><div class="d-inline-flex"> > </div></div></a>
        <a href="/rules/core/squads" class="text-decoration-none text-dark fs-3"><div class="border-bottom d-flex flex-row p-3"><div class="d-flex flex-fill">Squads</div><div class="d-inline-flex"> > </div></div></a>
        <a href="/rules/core/gameround" class="text-decoration-none text-dark fs-3"><div class="border-bottom d-flex flex-row p-3"><div class="]d-flex flex-fill">Game Round</div><div class="d-inline-flex"> > </div></div></a>
        <a href="/rules/core/formulas" class="text-decoration-none text-dark fs-3"><div class="border-bottom d-flex flex-row p-3"><div class="d-flex flex-fill">Formulas</div><div class="d-inline-flex"> > </div></div></a>
    </div>
</div>
</template>