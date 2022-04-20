<script setup>
import NavBar from '@/components/NavBar.vue';
</script>


<template>

<div>
    <NavBar>
        <template #left>
            <a href="/rules/core/contents" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </a>
        </template>
    </NavBar>
    <div class="container-md mt-5">
        <section>
            <div class="row">
                <div class="col">
                    <h1>Formulas</h1>
                    <h2>Combat</h2>
                        <ul>
                            <li>To Hit
                                <ul>
                                    <li>Ranged Combat
                                        <ul>
                                            <li>D6 + (positive modifiers) + (negative modifiers) >= Attacker’s Ranged Combat Score (RC)</li>
                                        </ul>
                                    </li>
                                    <li>Close Combat
                                        <ul>
                                            <li>D6 + (positive modifiers) + (negative modifiers) >= Attacker’s Close Combat Score (CC)</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>To Wound
                                <ul>
                                    <li>D6 + (Attacker’s Weapon’s Strength Score (S) ) + (positive modifiers) + (negative modifiers) >= Defenders’s Toughness Score (T)</li>
                                </ul>
                            </li>
                            <li>To Save
                                <ul>
                                    <li>D6 - (Attacker’s Weapon’s Armor Penetration Score (AP) ) + (positive modifiers) + (negative modifiers) >= Defenders’s Armor Save Score (AS)</li>
                                </ul>
                            </li>
                        </ul>
                </div>
            </div>
        </section>
    </div>
</div>
</template>