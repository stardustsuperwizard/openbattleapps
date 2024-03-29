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
            <h2>Squads</h2>
            <p>A squad is made up of one or more models that perform actions during phases of a turn.</p>
            <h3>Movement through squads</h3>
                <p>Friendly squads may move through other friendly squads.</p>
                <p>Squads may not move through opposing squads.</p>
            <h3>Squad Cohesion</h3>
                <p>When a squad numbers two or more models it must maintain cohesion. Unit cohesion is achieved by ensuring that every model in the squad is no further than 2” from at least one other model in the squad, unless the squad is engaged in close combat.</p>
                <p>When a squad has at least one model that is more than 2” away from any other squad model and the squad is not in close combat with an enemy unit, the squad is no longer in cohesion and will be required to take a morale check in the morale check phase of the turn.</p>
                <p>If the morale check is passed, the unit may continue with their turn as normal but must make take a standard movement to bring all models into cohesion.</p>
            <h3>Squads as Defenders in Ranged Combat</h3>
                <p>Enemy units must target the entire squad and may not target individual squad members. When a Defending squad takes wounds, the defending player will allocate the wounds to individual model Hit Points.</p>
            <h3>Squad Movement Types</h3>
                <h3>Standard</h3>
                    <p>Basic movement that is done during the Movement Phase of the player’s turn.</p>
                <h3>Assault</h3>
                    <p>Charging movement that is done by an attacking squad to initiate Close Combat with a defending squad in the combat phase.</p>
                <h3>Fallback</h3>
                    <p>Retreating movement that is done by squad that has failed a morale check.</p>
                <h3>Advance</h3>
                    <p>Extra movement that is done by a squad that has been declared the winner of a close combat combat and the enemy squad has a status of Fallback.</p>
            <h3>Squad Status</h3>
                <h3>Normal</h3>
                    <p>The squad has no changes to normal rules.</p>
                <h3>Advance</h3>
                    <p>The squad may select one option:</p>
                    <ul>
                        <li>May make an advance move towards an enemy unit, to start Close Combat. If the unit’s movement results in one enemy model and one friendly model making physical contact, a new round of close combat is initiated. Additionally, if this defending unit has a status of “Fallback” the attacking unit make attempt to remove defending unit from the game:
                            <ul>
                                <li>Form a pool of D6, 1 for each Hit Point in the defending unit.</li>
                                <li>Attacker rolls dice from the pool and for each roll of a 6, one hit point is removed from the defending unit. No “to save” roll is permitted.</li>
                                <li>May make an advance move to anywhere else on the board. </li>
                            </ul>
                        </li>
                    </ul>
                <h3>Fallback</h3>
                    <p>Squad must use Fallback move to move towards the nearest Rally Point and may not take a Standard Move in Movement Phase.</p>
                    <p>In addition the following restrictions apply to the squad:</p>
                    <ul>
                        <li>Squad may not Assault.</li>
                        <li>Squad may not use Counter Offensive in close combat.</li>
                    </ul>
            <h3>Morale</h3>
                <h3>Morale Check</h3>
                    <p>A morale check is conducted by rolling a D6 and comparing the result against the Mental Toughness attribute. A successful result is when the die roll is less than or equal to the Mental Toughness value, plus or minus any modifiers.</p>
                <h3>Ranged Combat Morale Check</h3>
                    <p>After a squad has lost wounds to Ranged Combat a morale check is required. There is a modifier to the die roll of +1 for each Hit Point lost from the squad.</p>
                <h3>Rally Point</h3>
                    <p>When a squad with the status of fallback comes into contact with a rally point (such as a board edge), the squad will be permitted to take a morale check to remove the status of Fallback. The squad may make this morale check even if they have already taken and failed a morale check.</p>
        </div>
    </section>
</main>
</template>