<script setup>
import NavBar from '@/components/NavBar.vue';
</script>


<template>

<div>
    <NavBar>
        <template #left>
            <router-link to="/rules/core/contents" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </router-link>
        </template>
    </NavBar>
    <div class="container-md mt-5">
        <section>
            <div class="row">
                <div class="col">
                    <h1>Playing Surface</h1>
                    <h2>Game Boundaries</h2>
                        <p>
                            The playing surface shall have a clearly defined boundary (also called “board edge") to delineate between in play and out of play.  A squad may not move beyond the board edge. Any squads that move beyond the board edge are removed from play and may not return.
                        </p>
                        <p>
                            A boundary or “board edge” is considered a rally point. If a squad has a status of Fallback and reaches a board edge, the squad will stop movement and may choose to take a morale check. Upon successful completion of the morale check the squad status shall become Normal and the squad continue play as normal. Any remaining Fallback movement is forfeited.
                        </p>
                    <h2>Terrain</h2>
                        <p>The game board may have objects on it that represent battlefield terrain. Terrain may have additional rules associated with it, but it is not required.</p>
                    <h2>Difficult Terrain</h2>
                        <p>Any area designated as difficult terrain shall incur a penalty to Movement of half distance when a unit is moves through this area.</p>
                    <h2>Cover Protection</h2>
                        <p>A unit that is partially obscured by a piece of terrain shall receive a bonus of +1 to the Combat Save or a value of 6 when no value is present.</p>
                </div>
            </div>
        </section>
    </div>
</div>
</template>